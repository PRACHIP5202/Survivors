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
from dotenv import load_dotenv
load_dotenv()  # Load environment variables from .env file

# Get allowed origins from environment variable or use default in development
allowed_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
logger.info(f"Configured CORS with allowed origins: {allowed_origins}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)

# Import routers
from app.routers import prediction, weather

# Health check endpoint
@app.get("/health", tags=["Health"])
def health_check():
    """Health check endpoint to verify API is running"""
    return {
        "status": "healthy",
        "version": app.version,
        "environment": "production" if not os.getenv("DEBUG", "False").lower() == "true" else "development"
    }

# API version prefix
api_prefix = "/api/v1"
app.include_router(prediction.router, prefix=api_prefix, tags=["Prediction"])
app.include_router(weather.router, prefix=api_prefix, tags=["Weather"])

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
