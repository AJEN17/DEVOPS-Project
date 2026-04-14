from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from datetime import datetime
import json
from typing import List, Dict

from .schemas import SurveyResponse, PredictionResponse, HistoricalData
from .ml_model import predictor

app = FastAPI(title="NeuroBalance API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for demo (use database in production)
historical_data = []

@app.on_event("startup")
async def startup_event():
    """Initialize the ML model on startup"""
    predictor.load_model()

@app.get("/")
async def root():
    return {"message": "NeuroBalance Burnout Prediction API"}

@app.post("/predict", response_model=PredictionResponse)
async def predict_burnout(survey: SurveyResponse):
    try:
        # Predict burnout score
        burnout_score = predictor.predict(survey)
        
        # Determine risk level
        if burnout_score < 30:
            risk_level = "Low"
        elif burnout_score < 60:
            risk_level = "Medium"
        elif burnout_score < 80:
            risk_level = "High"
        else:
            risk_level = "Severe"
        
        # Get recommendations
        recommendations = predictor.get_recommendations(survey, burnout_score)
        
        # Get feature importance for insights
        feature_importance = predictor.get_feature_importance()
        
        # Store historical data
        historical_entry = {
            "timestamp": datetime.now().isoformat(),
            "burnout_score": float(burnout_score),
            "survey_data": survey.dict()
        }
        historical_data.append(historical_entry)
        
        # Keep only last 10 entries for demo
        if len(historical_data) > 10:
            historical_data.pop(0)
        
        return PredictionResponse(
            burnout_score=float(burnout_score),
            risk_level=risk_level,
            recommendations=recommendations,
            factors=feature_importance
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.get("/historical")
async def get_historical_data():
    """Get historical burnout data for trend analysis"""
    return historical_data

@app.get("/trends")
async def get_trend_analysis():
    """Analyze trends from historical data"""
    if not historical_data:
        return {"message": "No historical data available"}
    
    scores = [entry["burnout_score"] for entry in historical_data]
    timestamps = [entry["timestamp"] for entry in historical_data]
    
    # Calculate trend
    if len(scores) > 1:
        trend = "improving" if scores[-1] < scores[0] else "worsening"
        change_percentage = ((scores[-1] - scores[0]) / scores[0]) * 100
    else:
        trend = "stable"
        change_percentage = 0
    
    return {
        "timestamps": timestamps,
        "scores": scores,
        "trend": trend,
        "change_percentage": change_percentage,
        "average_score": sum(scores) / len(scores)
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model_loaded": predictor.model is not None}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)