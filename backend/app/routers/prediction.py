from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Dict, List, Optional, Any
import logging
import joblib
import os
import numpy as np
from app.services.model_service import predict_risk
from app.schemas.prediction import PredictionRequest, PredictionResponse

router = APIRouter()
logger = logging.getLogger(__name__)

class PredictionRequest(BaseModel):
    latitude: float
    longitude: float
    temperature: float
    humidity: float
    wind_speed: float
    precipitation: float
    vegetation_density: Optional[float] = None
    elevation: Optional[float] = None
    drought_index: Optional[float] = None

class PredictionResponse(BaseModel):
    risk_level: str
    risk_score: float
    confidence: float
    factors: Dict[str, Any]
    recommendations: List[str]

@router.post("/predict", response_model=PredictionResponse)
async def predict_wildfire_risk(request: PredictionRequest):
    """
    Predict wildfire risk based on weather and environmental data
    """
    try:
        # Log the prediction request
        logger.info(f"Prediction request received: {request}")
        
        # Process the request and call the ML model service
        result = predict_risk(
            latitude=request.latitude,
            longitude=request.longitude,
            temperature=request.temperature,
            humidity=request.humidity,
            wind_speed=request.wind_speed,
            precipitation=request.precipitation,
            vegetation_density=request.vegetation_density,
            elevation=request.elevation,
            drought_index=request.drought_index
        )
        
        return result
        
    except Exception as e:
        logger.error(f"Error predicting wildfire risk: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/risk-factors")
async def get_risk_factors():
    """
    Get information about risk factors used in the prediction model
    """
    return {
        "factors": [
            {
                "name": "Temperature",
                "description": "Higher temperatures increase wildfire risk",
                "impact_level": "High"
            },
            {
                "name": "Humidity",
                "description": "Lower humidity increases wildfire risk",
                "impact_level": "High"
            },
            {
                "name": "Wind Speed",
                "description": "Higher wind speeds can spread wildfires faster",
                "impact_level": "High"
            },
            {
                "name": "Precipitation",
                "description": "Lower precipitation leads to drier conditions and higher risk",
                "impact_level": "Medium"
            },
            {
                "name": "Vegetation Density",
                "description": "Higher vegetation density provides more fuel for wildfires",
                "impact_level": "Medium"
            },
            {
                "name": "Elevation",
                "description": "Elevation affects fire behavior due to temperature and humidity variations",
                "impact_level": "Low"
            },
            {
                "name": "Drought Index",
                "description": "Higher drought index indicates drier conditions and higher risk",
                "impact_level": "High"
            }
        ]
    }
