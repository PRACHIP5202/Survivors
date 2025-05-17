import requests
import json
import time

# Base URL for the API
API_URL = "http://localhost:8000/api/predict"

# Test cases with different input values
test_cases = [
    {
        "name": "Low Risk Scenario",
        "data": {
            "latitude": 34.05,
            "longitude": -118.24,
            "temperature": 20.0,
            "humidity": 70.0,
            "wind_speed": 5.0,
            "precipitation": 5.0,
            "vegetation_density": 0.3
        }
    },
    {
        "name": "Medium Risk Scenario",
        "data": {
            "latitude": 34.05,
            "longitude": -118.24,
            "temperature": 25.0,
            "humidity": 50.0,
            "wind_speed": 10.0,
            "precipitation": 1.0,
            "vegetation_density": 0.5
        }
    },
    {
        "name": "High Risk Scenario",
        "data": {
            "latitude": 34.05,
            "longitude": -118.24,
            "temperature": 35.0,
            "humidity": 20.0,
            "wind_speed": 25.0,
            "precipitation": 0.0,
            "vegetation_density": 0.8
        }
    },
    {
        "name": "Extreme Values",
        "data": {
            "latitude": 34.05,
            "longitude": -118.24,
            "temperature": 45.0,
            "humidity": 10.0,
            "wind_speed": 40.0,
            "precipitation": 0.0,
            "vegetation_density": 0.9
        }
    }
]

# Run the test cases
print("Running API Test Cases...\n")
print("=" * 60)

for i, test_case in enumerate(test_cases):
    print(f"\nTest Case {i+1}: {test_case['name']}")
    print("-" * 60)
    
    try:
        # Make the API request
        start_time = time.time()
        response = requests.post(API_URL, json=test_case['data'])
        end_time = time.time()
        
        # Print the results
        print(f"Status Code: {response.status_code}")
        print(f"Response Time: {(end_time - start_time)*1000:.2f} ms")
        
        if response.status_code == 200:
            result = response.json()
            print(f"Risk Level: {result['risk_level']}")
            print(f"Risk Score: {result['risk_score']:.4f}")
            print(f"Confidence: {result['confidence']}")
            print("\nRecommendations:")
            for rec in result['recommendations']:
                print(f"- {rec}")
        else:
            print(f"Error: {response.text}")
            
    except Exception as e:
        print(f"Exception: {str(e)}")
    
    print("-" * 60)
    print("")

print("=" * 60)
print("\nTest completed.")
