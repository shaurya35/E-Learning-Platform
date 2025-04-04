from fastapi import FastAPI, HTTPException # type: ignore
from pydantic import BaseModel # type: ignore
from data.mongodb_connector import get_mongo_connection
from models.content_recommender import ContentBasedRecommender
from models.collaborative_recommender import CollaborativeRecommender
from models.hybrid_recommender import HybridRecommender

# Initialize FastAPI app
app = FastAPI()

# Initialize recommendation models
content_recommender = ContentBasedRecommender()
collaborative_recommender = CollaborativeRecommender()
hybrid_recommender = HybridRecommender()

# Pydantic model for request
class RecommendationRequest(BaseModel):
    user_id: str
    num_recommendations: int = 5

@app.get("/")
def home():
    return {"message": "Welcome to the Recommendation API"}

@app.post("/recommend/content")
def get_content_based_recommendations(request: RecommendationRequest):
    try:
        recommendations = content_recommender.recommend(request.user_id, request.num_recommendations)
        return {"recommendations": recommendations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/recommend/collaborative")
def get_collaborative_recommendations(request: RecommendationRequest):
    try:
        recommendations = collaborative_recommender.recommend(request.user_id, request.num_recommendations)
        return {"recommendations": recommendations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/recommend/hybrid")
def get_hybrid_recommendations(request: RecommendationRequest):
    try:
        recommendations = hybrid_recommender.recommend(request.user_id, request.num_recommendations)
        return {"recommendations": recommendations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn # type: ignore
    uvicorn.run(app, host="0.0.0.0", port=8000)
