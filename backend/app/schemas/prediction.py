from pydantic import BaseModel
from typing import Dict, List, Optional, Any

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
