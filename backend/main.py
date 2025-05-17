from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import os
import sys
import logging
from typing import Dict, Any, List, Optional

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="Wildfire Risk Prediction API",
    description="API for predicting wildfire risk based on weather data and other factors",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import routers
from app.routers import prediction, weather

# Include routers
app.include_router(prediction.router, prefix="/api", tags=["prediction"])
app.include_router(weather.router, prefix="/api", tags=["weather"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Wildfire Risk Prediction API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
