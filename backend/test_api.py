"""
Tests for the EmberEye backend model services.
"""

import pytest
import sys
import os
import numpy as np

# Add the backend directory to path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app.services.model_service import load_model, preprocess_features

def test_model_loading():
    """Test if the model can be loaded"""
    model = load_model()
    assert model is not None

def test_feature_preprocessing():
    """Test if features can be preprocessed correctly"""
    # Sample weather features
    features = [32.5, 45.0, 15.0, 0.0, 0.7, 350.0, 0.8]
    coordinates = (37.7749, -122.4194)  # San Francisco
    
    preprocessed = preprocess_features(features, coordinates)
    assert preprocessed is not None
    # Model is using image-based input (CNN), so shape should be (1, 128, 128, 3)
    assert preprocessed.shape == (1, 128, 128, 3)
