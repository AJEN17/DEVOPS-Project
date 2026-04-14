import requests
import json

BASE_URL = "http://localhost:8000"

def test_api():
    # Test root endpoint
    response = requests.get(f"{BASE_URL}/")
    print("Root endpoint:", response.json())
    
    # Test health check
    response = requests.get(f"{BASE_URL}/health")
    print("Health check:", response.json())
    
    # Test prediction
    survey_data = {
        "work_hours": 50,
        "sleep_quality": 5,
        "exercise_frequency": 2,
        "social_support": 4,
        "workload": 8,
        "job_satisfaction": 3,
        "stress_level": 9,
        "anxiety_level": 8,
        "mood": 3,
        "personal_life_satisfaction": 4
    }
    
    response = requests.post(f"{BASE_URL}/predict", json=survey_data)
    print("Prediction result:", json.dumps(response.json(), indent=2))
    
    # Test historical data
    response = requests.get(f"{BASE_URL}/historical")
    print("Historical data count:", len(response.json()))
    
    # Test trends
    response = requests.get(f"{BASE_URL}/trends")
    print("Trends:", response.json())

if __name__ == "__main__":
    test_api()