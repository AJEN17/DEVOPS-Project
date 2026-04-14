import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import joblib
import os

class BurnoutPredictor:
    def __init__(self):
        self.model = None
        self.features = [
            'work_hours', 'sleep_quality', 'exercise_frequency', 
            'social_support', 'workload', 'job_satisfaction', 
            'stress_level', 'anxiety_level', 'mood', 'personal_life_satisfaction'
        ]
        
    def generate_sample_data(self, n_samples=1000):
        """Generate realistic sample data for training"""
        np.random.seed(42)
        
        data = {
            'work_hours': np.random.normal(45, 8, n_samples).astype(int),
            'sleep_quality': np.random.randint(1, 11, n_samples),
            'exercise_frequency': np.random.randint(1, 11, n_samples),
            'social_support': np.random.randint(1, 11, n_samples),
            'workload': np.random.randint(1, 11, n_samples),
            'job_satisfaction': np.random.randint(1, 11, n_samples),
            'stress_level': np.random.randint(1, 11, n_samples),
            'anxiety_level': np.random.randint(1, 11, n_samples),
            'mood': np.random.randint(1, 11, n_samples),
            'personal_life_satisfaction': np.random.randint(1, 11, n_samples),
        }
        
        # Generate burnout score based on weighted factors
        df = pd.DataFrame(data)
        
        # Calculate burnout score (higher scores indicate worse burnout)
        burnout_score = (
            df['work_hours'] * 0.8 +
            (11 - df['sleep_quality']) * 2.0 +
            (11 - df['exercise_frequency']) * 1.5 +
            (11 - df['social_support']) * 1.8 +
            df['workload'] * 1.5 +
            (11 - df['job_satisfaction']) * 1.7 +
            df['stress_level'] * 2.0 +
            df['anxiety_level'] * 1.8 +
            (11 - df['mood']) * 1.5 +
            (11 - df['personal_life_satisfaction']) * 1.3
        )
        
        # Normalize to 0-100 scale
        burnout_score = (burnout_score - burnout_score.min()) / (burnout_score.max() - burnout_score.min()) * 100
        df['burnout_score'] = burnout_score.astype(int)
        
        return df
    
    def train_model(self):
        """Train the Random Forest model"""
        # Generate or load sample data
        if os.path.exists('sample_data.csv'):
            df = pd.read_csv('sample_data.csv')
        else:
            df = self.generate_sample_data(1000)
            df.to_csv('sample_data.csv', index=False)
        
        X = df[self.features]
        y = df['burnout_score']
        
        # Split the data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Train model
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.model.fit(X_train, y_train)
        
        # Evaluate
        y_pred = self.model.predict(X_test)
        mae = mean_absolute_error(y_test, y_pred)
        print(f"Model trained with MAE: {mae:.2f}")
        
        # Save model
        joblib.dump(self.model, 'burnout_model.pkl')
    
    def load_model(self):
        """Load trained model"""
        if os.path.exists('burnout_model.pkl'):
            self.model = joblib.load('burnout_model.pkl')
        else:
            self.train_model()
    
    def predict(self, survey_data):
        """Predict burnout score from survey data"""
        if self.model is None:
            self.load_model()
        
        # Create feature array
        features = np.array([[
            survey_data.work_hours,
            survey_data.sleep_quality,
            survey_data.exercise_frequency,
            survey_data.social_support,
            survey_data.workload,
            survey_data.job_satisfaction,
            survey_data.stress_level,
            survey_data.anxiety_level,
            survey_data.mood,
            survey_data.personal_life_satisfaction
        ]])
        
        # Make prediction
        burnout_score = self.model.predict(features)[0]
        burnout_score = max(0, min(100, burnout_score))  # Clamp between 0-100
        
        return burnout_score
    
    def get_feature_importance(self):
        """Get feature importance for insights"""
        if self.model is None:
            self.load_model()
        
        importance = dict(zip(self.features, self.model.feature_importances_))
        return dict(sorted(importance.items(), key=lambda x: x[1], reverse=True))
    
    def get_recommendations(self, survey_data, burnout_score):
        """Generate personalized recommendations based on survey responses"""
        recommendations = []
        
        # Work-related recommendations
        if survey_data.work_hours > 50:
            recommendations.append("Consider discussing workload management with your manager")
        if survey_data.job_satisfaction < 5:
            recommendations.append("Explore professional development opportunities or new challenges")
        if survey_data.workload > 7:
            recommendations.append("Practice time management techniques and prioritize tasks")
        
        # Lifestyle recommendations
        if survey_data.sleep_quality < 6:
            recommendations.append("Improve sleep hygiene: consistent schedule, dark room, no screens before bed")
        if survey_data.exercise_frequency < 4:
            recommendations.append("Incorporate 30 minutes of moderate exercise 3-4 times per week")
        if survey_data.social_support < 5:
            recommendations.append("Schedule regular social activities with friends or family")
        
        # Mental health recommendations
        if survey_data.stress_level > 7:
            recommendations.append("Practice daily mindfulness or meditation for 10-15 minutes")
        if survey_data.anxiety_level > 7:
            recommendations.append("Try deep breathing exercises when feeling anxious")
        if survey_data.mood < 5:
            recommendations.append("Consider talking to a mental health professional")
        
        # Personal life recommendations
        if survey_data.personal_life_satisfaction < 5:
            recommendations.append("Dedicate time for hobbies and personal interests")
        
        # General recommendations based on burnout level
        if burnout_score > 70:
            recommendations.append("Consider speaking with HR about workplace stress management resources")
            recommendations.append("Prioritize self-care and consider taking time off if needed")
        elif burnout_score > 50:
            recommendations.append("Implement regular breaks throughout your workday")
            recommendations.append("Practice setting boundaries between work and personal life")
        
        return recommendations[:6]  # Return top 6 recommendations

# Global predictor instance
predictor = BurnoutPredictor()