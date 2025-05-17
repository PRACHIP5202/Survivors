import requests
import json

# Test data for the prediction API
test_data = {
    "latitude": 34.05,
    "longitude": -118.24,
    "temperature": 30.5,
    "humidity": 40.0,
    "wind_speed": 15.0,
    "precipitation": 0.0,
    "vegetation_density": 0.6,
    "elevation": None,
    "drought_index": None
}

# Make a request to the prediction API
response = requests.post(
    "http://localhost:8000/api/predict", 
    json=test_data
)

# Print the status code and response data
print(f"Status Code: {response.status_code}")
print("\nResponse Data:")
print(json.dumps(response.json(), indent=4))
