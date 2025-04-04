import numpy as np
import pandas as pd  # type: ignore
from sklearn.feature_extraction.text import TfidfVectorizer  # type: ignore
from sklearn.metrics.pairwise import cosine_similarity  # type: ignore
import pickle
import os
from config.settings import MAX_FEATURES, SIMILARITY_METRIC, TOP_N_RECOMMENDATIONS

class ContentBasedRecommender:
    """
    Content-based recommender that suggests courses based on course features
    and student preferences/history
    """
    def __init__(self, mongodb_connector):
        self.mongodb_connector = mongodb_connector
        self.vectorizer = TfidfVectorizer(max_features=MAX_FEATURES, stop_words='english')
        self.course_features = None
        self.course_vectors = None
        self.course_similarity_matrix = None
        self.course_info = None
        self.model_path = "output/model_artifacts/content_based/"
        
        os.makedirs(self.model_path, exist_ok=True)
    
    def train(self):
        """
        Train the content-based recommender
        """
        courses_df = self.mongodb_connector.get_course_data()
        if courses_df.empty:
            raise ValueError("No course data available to train the model")
        
        courses_df = self._extract_course_features(courses_df)
        self.course_vectors = self.vectorizer.fit_transform(courses_df['features_text'])
        self.course_similarity_matrix = cosine_similarity(self.course_vectors)
        self.course_info = courses_df[['course_id', 'course_name', 'course_description', 'course_department']]
        self.course_features = courses_df
        
        self._save_model()
        return self
    
    def recommend_courses(self, user_id, n=TOP_N_RECOMMENDATIONS, exclude_enrolled=True):
        """
        Generate course recommendations for a user based on content similarity
        """
        if self.course_vectors is None and not self._load_model():
            raise ValueError("Model not trained, call train() first")
        
        user_profile, enrolled_course_ids = self._get_user_profile(user_id)
        if user_profile is None:
            return None
        
        similarities = cosine_similarity(user_profile, self.course_vectors).flatten()
        course_ids = self.course_features['course_id'].values
        courses_df = pd.DataFrame({'course_id': course_ids, 'score': similarities})
        recommendations = courses_df.merge(self.course_info, on='course_id')
        
        if exclude_enrolled and enrolled_course_ids:
            recommendations = recommendations[~recommendations['course_id'].isin(enrolled_course_ids)]
        
        return recommendations.sort_values('score', ascending=False).head(n)
    
    def find_similar_courses(self, course_id, n=5):
        """
        Find courses similar to the given course
        """
        if self.course_similarity_matrix is None and not self._load_model():
            raise ValueError("Model not trained, call train() first")
        
        course_idx = self.course_features[self.course_features['course_id'] == course_id].index[0]
        similarities = self.course_similarity_matrix[course_idx]
        course_indices = np.argsort(similarities)[::-1][1:n+1]
        
        similar_courses = [
            {
                'course_id': self.course_features.iloc[idx]['course_id'],
                'course_name': self.course_features.iloc[idx]['course_name'],
                'score': similarities[idx]
            }
            for idx in course_indices
        ]
        
        return pd.DataFrame(similar_courses)
    
    def _extract_course_features(self, courses_df):
        """
        Combine course name, description, and department into a single feature text
        """
        courses_df['features_text'] = (
            courses_df['course_name'] + " " + 
            courses_df['course_description'] + " " + 
            courses_df['course_department']
        ).fillna("")
        return courses_df
    
    def _get_user_profile(self, user_id):
        """
        Create a user profile vector based on their enrolled courses
        """
        user_data = self.mongodb_connector.get_user_enrollments(user_id)
        if user_data.empty:
            return None, []
        
        enrolled_courses = user_data['course_id'].values
        enrolled_vectors = self.course_vectors[self.course_features['course_id'].isin(enrolled_courses)]
        user_profile_vector = np.mean(enrolled_vectors, axis=0)
        
        return user_profile_vector, enrolled_courses
    
    def _save_model(self):
        """
        Save the trained model artifacts
        """
        with open(os.path.join(self.model_path, 'vectorizer.pkl'), 'wb') as f:
            pickle.dump(self.vectorizer, f)
        with open(os.path.join(self.model_path, 'course_features.pkl'), 'wb') as f:
            pickle.dump(self.course_features, f)
        with open(os.path.join(self.model_path, 'course_similarity.pkl'), 'wb') as f:
            pickle.dump(self.course_similarity_matrix, f)
    
    def _load_model(self):
        """
        Load the trained model artifacts
        """
        try:
            with open(os.path.join(self.model_path, 'vectorizer.pkl'), 'rb') as f:
                self.vectorizer = pickle.load(f)
            with open(os.path.join(self.model_path, 'course_features.pkl'), 'rb') as f:
                self.course_features = pickle.load(f)
            with open(os.path.join(self.model_path, 'course_similarity.pkl'), 'rb') as f:
                self.course_similarity_matrix = pickle.load(f)
            return True
        except FileNotFoundError:
            return False
