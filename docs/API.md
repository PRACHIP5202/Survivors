# EmberEye API Documentation

## Overview
EmberEye provides a RESTful API for wildfire risk prediction using machine learning models and real-time weather data.

## Base URL
```
http://localhost:8000/api
```

## Authentication
Currently, no authentication is required for API access.

## Endpoints

### Health Check
- **GET** `/`
- **GET** `/health`

Returns the API status and health information.

### Weather Data
- **GET** `/weather`
- **POST** `/weather/location`

Retrieve weather information for specific locations.

### Risk Prediction
- **POST** `/predict`

Predicts wildfire risk based on environmental factors.

#### Request Body
```json
{
  "latitude": 37.7749,
  "longitude": -122.4194,
  "temperature": 28.5,
  "humidity": 45.0,
  "windSpeed": 12.3,
  "precipitation": 0.0,
  "vegetation": 70.0,
  "elevation": 150.0,
  "droughtIndex": 0.3
}
```

#### Response
```json
{
  "riskLevel": "Medium",
  "riskPercentage": 65.5,
  "factors": {
    "temperature": "high",
    "humidity": "moderate",
    "wind": "moderate",
    "vegetation": "high"
  },
  "recommendations": [
    "Monitor weather conditions closely",
    "Maintain defensible space around property"
  ]
}
```

## Error Handling
All errors return a JSON response with the following structure:
```json
{
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Rate Limiting
Currently, no rate limiting is implemented. In production, consider implementing appropriate limits.
