import os
import pickle
import numpy as np
import pandas as pd
from surprise import Dataset, Reader, SVD
from surprise.model_selection import train_test_split
from config.settings import TOP_N_RECOMMENDATIONS

class CollaborativeRecommender:
    """
    Collaborative Filtering Recommender using Matrix Factorization (SVD)
    """
    def __init__(self, mongodb_connector):
        self.mongodb_connector = mongodb_connector
        self.model = None
        self.user_course_matrix = None
        self.model_path = "output/model_artifacts/collaborative/"
        os.makedirs(self.model_path, exist_ok=True)

    def _load_data(self):
        """ Load user-course interactions from MongoDB """
        enrollments_df = self.mongodb_connector.get_enrollment_data()
        if enrollments_df.empty:
            raise ValueError("No enrollment data available to train the model")
        
        return enrollments_df
    
    def train(self):
        """
        Train the collaborative filtering model using SVD.
        """
        enrollments_df = self._load_data()
        reader = Reader(rating_scale=(1, 5))
        data = Dataset.load_from_df(enrollments_df[['userId', 'courseId', 'rating']], reader)
        trainset, _ = train_test_split(data, test_size=0.2)
        
        self.model = SVD()
        self.model.fit(trainset)
        
        # Save the trained model
        self._save_model()
        return self
    
    def _save_model(self):
        """ Save trained model to disk """
        with open(os.path.join(self.model_path, 'svd_model.pkl'), 'wb') as f:
            pickle.dump(self.model, f)
    
    def _load_model(self):
        """ Load trained model from disk """
        try:
            with open(os.path.join(self.model_path, 'svd_model.pkl'), 'rb') as f:
                self.model = pickle.load(f)
            return True
        except FileNotFoundError:
            return False
    
    def recommend_courses(self, user_id, n=TOP_N_RECOMMENDATIONS):
        """
        Recommend top N courses to a user based on collaborative filtering.
        """
        if self.model is None:
            if not self._load_model():
                raise ValueError("Model not trained, call train() first")
        
        enrollments_df = self._load_data()
        unique_courses = enrollments_df['courseId'].unique()
        
        predictions = [(course, self.model.predict(user_id, course).est) for course in unique_courses]
        recommendations = sorted(predictions, key=lambda x: x[1], reverse=True)[:n]
        
        recommended_courses = pd.DataFrame(recommendations, columns=['courseId', 'score'])
        return recommended_courses
    
    def find_similar_users(self, user_id, n=5):
        """
        Find users with similar course preferences.
        """
        if self.model is None:
            if not self._load_model():
                raise ValueError("Model not trained, call train() first")
        
        enrollments_df = self._load_data()
        unique_users = enrollments_df['userId'].unique()
        
        predictions = [(uid, self.model.predict(user_id, uid).est) for uid in unique_users if uid != user_id]
        similar_users = sorted(predictions, key=lambda x: x[1], reverse=True)[:n]
        
        return pd.DataFrame(similar_users, columns=['userId', 'similarity_score'])
    
    def explain_recommendation(self, user_id, course_id):
        """
        Explain why a course was recommended to a user.
        """
        if self.model is None:
            if not self._load_model():
                raise ValueError("Model not trained, call train() first")
        
        prediction = self.model.predict(user_id, course_id)
        return {"courseId": course_id, "predicted_rating": prediction.est}
