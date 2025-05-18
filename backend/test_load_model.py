"""
Test script to verify model loading with Python 3.
"""
import os
import sys
import tensorflow as tf
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Add the project root to the path to ensure imports work
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import the model loading function
from app.services.model_service import load_model

def test_model_loading():
    """Test that the model can be loaded successfully"""
    logger.info("Testing model loading with Python 3...")
    model = load_model()
    
    if model is not None:
        logger.info("Model loaded successfully!")
        logger.info(f"Model type: {type(model)}")
        logger.info(f"Model summary: {model.summary()}")
        return True
    else:
        logger.error("Failed to load model!")
        return False

if __name__ == "__main__":
    success = test_model_loading()
    if success:
        print("\n✅ Model loaded successfully with Python 3")
    else:
        print("\n❌ Model loading failed with Python 3")