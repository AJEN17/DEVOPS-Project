from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# Database models would go here if using a real database
# For now, we're using in-memory storage for demo purposes

class UserSurvey(BaseModel):
    work_hours: int
    sleep_quality: int
    exercise_frequency: int
    social_support: int
    workload: int
    job_satisfaction: int
    stress_level: int
    anxiety_level: int
    mood: int
    personal_life_satisfaction: int
    timestamp: Optional[datetime] = None

class PredictionResult(BaseModel):
    survey_id: str
    burnout_score: float
    risk_level: str
    recommendations: List[str]
    feature_importance: dict
    timestamp: datetime

class TrendAnalysis(BaseModel):
    timestamps: List[str]
    scores: List[float]
    trend: str
    change_percentage: float
    average_score: float

# In production, you would use SQLAlchemy models like:
"""
from sqlalchemy import Column, Integer, String, Float, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class SurveyResponse(Base):
    __tablename__ = "survey_responses"
    
    id = Column(String, primary_key=True, index=True)
    work_hours = Column(Integer)
    sleep_quality = Column(Integer)
    exercise_frequency = Column(Integer)
    social_support = Column(Integer)
    workload = Column(Integer)
    job_satisfaction = Column(Integer)
    stress_level = Column(Integer)
    anxiety_level = Column(Integer)
    mood = Column(Integer)
    personal_life_satisfaction = Column(Integer)
    burnout_score = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)
"""