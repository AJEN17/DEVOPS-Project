from pydantic import BaseModel
from typing import List

class SurveyResponse(BaseModel):
    work_hours: int
    sleep_quality: int  # 1-10 scale
    exercise_frequency: int  # 1-10 scale
    social_support: int  # 1-10 scale
    workload: int  # 1-10 scale
    job_satisfaction: int  # 1-10 scale
    stress_level: int  # 1-10 scale
    anxiety_level: int  # 1-10 scale
    mood: int  # 1-10 scale
    personal_life_satisfaction: int  # 1-10 scale

class PredictionResponse(BaseModel):
    burnout_score: float
    risk_level: str
    recommendations: List[str]
    factors: dict

class HistoricalData(BaseModel):
    timestamp: str
    burnout_score: float
    survey_data: dict