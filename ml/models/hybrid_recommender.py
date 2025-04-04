import numpy as np
import pandas as pd # type: ignore
from models.content_based import ContentBasedRecommender
from models.collaborative import CollaborativeRecommender
from config.settings import CONTENT_BASED_WEIGHT, COLLABORATIVE_WEIGHT, TOP_N_RECOMMENDATIONS

class HybridRecommender:
    """
    Hybrid recommender system that combines content-based and collaborative filtering
    """
    def __init__(self, mongodb_connector):
        self.mongodb_connector = mongodb_connector
        self.content_based = ContentBasedRecommender(mongodb_connector)
        self.collaborative = CollaborativeRecommender(mongodb_connector)
        self.content_weight = CONTENT_BASED_WEIGHT
        self.collab_weight = COLLABORATIVE_WEIGHT
        
    def train(self):
        """
        Train both recommender systems
        """
        # Train content-based model
        print("Training content-based recommender...")
        self.content_based.train()
        
        # Train collaborative model
        print("Training collaborative recommender...")
        self.collaborative.train()
        
        print("Both models trained successfully")
        
    def recommend_courses(self, user_id, n=TOP_N_RECOMMENDATIONS, exclude_enrolled=True):
        """
        Generate hybrid recommendations for a specific user
        
        Args:
            user_id (str): The ID of the user to generate recommendations for
            n (int): Number of recommendations to generate
            exclude_enrolled (bool): Whether to exclude courses the user is already enrolled in
            
        Returns:
            DataFrame: Top n course recommendations with scores
        """
        # Get recommendations from both models
        content_recs = self.content_based.recommend_courses(user_id, n=n*2, exclude_enrolled=exclude_enrolled)
        collab_recs = self.collaborative.recommend_courses(user_id, n=n*2, exclude_enrolled=exclude_enrolled)
        
        # If either recommender couldn't generate recommendations, use the other one
        if content_recs is None or content_recs.empty:
            print(f"No content-based recommendations for user {user_id}, using collaborative only.")
            return collab_recs.head(n) if collab_recs is not None and not collab_recs.empty else None
        
        if collab_recs is None or collab_recs.empty:
            print(f"No collaborative recommendations for user {user_id}, using content-based only.")
            return content_recs.head(n)
        
        # Combine recommendations
        # Normalize scores from each recommender to 0-1 range
        if not content_recs.empty:
            max_content_score = content_recs['score'].max()
            min_content_score = content_recs['score'].min()
            score_range = max_content_score - min_content_score
            if score_range > 0:
                content_recs['norm_score'] = (content_recs['score'] - min_content_score) / score_range
            else:
                content_recs['norm_score'] = 1.0
        
        if not collab_recs.empty:
            max_collab_score = collab_recs['score'].max()
            min_collab_score = collab_recs['score'].min()
            score_range = max_collab_score - min_collab_score
            if score_range > 0:
                collab_recs['norm_score'] = (collab_recs['score'] - min_collab_score) / score_range
            else:
                collab_recs['norm_score'] = 1.0
        
        # Combine the recommendations
        content_recs = content_recs.set_index('courseId')
        collab_recs = collab_recs.set_index('courseId')
        
        # Get all unique course IDs
        all_course_ids = set(content_recs.index).union(set(collab_recs.index))
        
        # Create a new DataFrame for the hybrid scores
        hybrid_scores = []
        
        for course_id in all_course_ids:
            # Calculate weighted score
            content_score = content_recs.loc[course_id, 'norm_score'] if course_id in content_recs.index else 0
            collab_score = collab_recs.loc[course_id, 'norm_score'] if course_id in collab_recs.index else 0
            
            # Calculate weighted average
            hybrid_score = (self.content_weight * content_score + self.collab_weight * collab_score) / (self.content_weight + self.collab_weight)
            
            # Use title from whichever recommender has it
            if course_id in content_recs.index:
                title = content_recs.loc[course_id, 'title']
            else:
                title = collab_recs.loc[course_id, 'title']
                
            hybrid_scores.append({
                'courseId': course_id,
                'title': title,
                'score': hybrid_score,
                'content_score': content_score,
                'collab_score': collab_score
            })
        
        # Convert to DataFrame and sort by score
        hybrid_df = pd.DataFrame(hybrid_scores)
        sorted_recommendations = hybrid_df.sort_values('score', ascending=False).head(n)
        
        # Get additional course information
        courses_df = self.mongodb_connector.get_course_data()
        courses_info = courses_df.set_index('courseId')
        
        # Add course details to recommendations
        for col in ['description', 'department', 'instructor', 'difficulty', 'tags']:
            if col in courses_info.columns:
                for idx, row in sorted_recommendations.iterrows():
                    course_id = row['courseId']
                    if course_id in courses_info.index:
                        sorted_recommendations.at[idx, col] = courses_info.loc[course_id, col]
        
        return sorted_recommendations
    
    def batch_recommend_for_all_users(self, n=TOP_N_RECOMMENDATIONS, exclude_enrolled=True):
        """
        Generate recommendations for all users in the system
        
        Returns:
            Dict: Mapping of user_id to their recommended courses
        """
        students_df = self.mongodb_connector.get_student_data()
        student_ids = students_df['userId'].unique()
        
        all_recommendations = {}
        for user_id in student_ids:
            try:
                user_recs = self.recommend_courses(user_id, n=n, exclude_enrolled=exclude_enrolled)
                if user_recs is not None and not user_recs.empty:
                    all_recommendations[user_id] = user_recs
            except Exception as e:
                print(f"Error generating recommendations for user {user_id}: {e}")
                
        return all_recommendations
    
    def explain_recommendation(self, user_id, course_id):
        """
        Provide an explanation for why a course was recommended to a user
        
        Args:
            user_id (str): The ID of the user
            course_id (str): The ID of the recommended course
            
        Returns:
            dict: Explanation of the recommendation
        """
        # Get explanations from both recommenders
        content_explanation = self.content_based.explain_recommendation(user_id, course_id)
        collab_explanation = self.collaborative.explain_recommendation(user_id, course_id)
        
        # Get the recommendation details
        hybrid_recs = self.recommend_courses(user_id)
        course_rec = hybrid_recs[hybrid_recs['courseId'] == course_id]
        
        if course_rec.empty:
            return {
                "message": f"Course {course_id} was not recommended to user {user_id}"
            }
        
        # Create a hybrid explanation
        explanation = {
            "overall_score": float(course_rec['score'].iloc[0]),
            "content_based": {
                "contribution": f"{self.content_weight * 100 / (self.content_weight + self.collab_weight):.1f}%",
                "score": float(course_rec['content_score'].iloc[0]),
                "explanation": content_explanation
            },
            "collaborative": {
                "contribution": f"{self.collab_weight * 100 / (self.content_weight + self.collab_weight):.1f}%",
                "score": float(course_rec['collab_score'].iloc[0]),
                "explanation": collab_explanation
            }
        }
        
        return explanation