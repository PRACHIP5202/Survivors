"""
Test script for the CNN model integration.
This script checks if the model can be loaded and used for predictions.
"""

import os
import sys
import numpy as np

# Add the parent directory to the path so we can import from app
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(parent_dir)

from app.services.model_service import load_model, preprocess_features, predict_risk

def test_model_loading():
    """Test if the model can be loaded"""
    print("Testing model loading...")
    model = load_model()
    if model is not None:
        print("✓ Model loaded successfully!")
    else:
        print("✗ Model loading failed. Using mock predictions instead.")
    return model

def test_feature_preprocessing():
    """Test if features can be preprocessed correctly"""
    print("\nTesting feature preprocessing...")
    # Sample weather features
    features = [32.5, 45.0, 15.0, 0.0, 0.7, 350.0, 0.8]
    coordinates = (37.7749, -122.4194)  # San Francisco
    
    try:
        preprocessed = preprocess_features(features, coordinates)
        print(f"✓ Features preprocessed successfully: Shape {preprocessed.shape}")
        return preprocessed
    except Exception as e:
        print(f"✗ Feature preprocessing failed: {str(e)}")
        return None

def test_prediction():
    """Test the prediction function"""
    print("\nTesting prediction functionality...")
    try:
        # Sample input data
        latitude = 37.7749
        longitude = -122.4194
        temperature = 32.5  # Celsius
        humidity = 45.0     # Percentage
        wind_speed = 15.0   # km/h
        precipitation = 0.0 # mm
        vegetation_density = 0.7
        elevation = 350.0
        drought_index = 0.8
        
        # Get prediction
        result = predict_risk(
            latitude=latitude,
            longitude=longitude,
            temperature=temperature,
            humidity=humidity,
            wind_speed=wind_speed,
            precipitation=precipitation,
            vegetation_density=vegetation_density,
            elevation=elevation,
            drought_index=drought_index
        )
        
        print("\nPrediction Results:")
        print(f"Risk Level: {result['risk_level']}")
        print(f"Risk Score: {result['risk_score']:.2f}")
        print(f"Confidence: {result['confidence']:.2f}")
        print("\nRisk Factors:")
        for factor, details in result['factors'].items():
            print(f"  - {factor}: {details['value']} ({details['impact']} impact)")
        
        print("\nRecommendations:")
        for recommendation in result['recommendations']:
            print(f"  - {recommendation}")
            
        print("\n✓ Prediction completed successfully!")
        return result
    except Exception as e:
        print(f"✗ Prediction failed: {str(e)}")
        return None

if __name__ == "__main__":
    print("=" * 50)
    print("WILDFIRE CNN MODEL INTEGRATION TEST")
    print("=" * 50)
    
    model = test_model_loading()
    preprocessed = test_feature_preprocessing()
    result = test_prediction()
    
    print("\n" + "=" * 50)
    if model is not None and preprocessed is not None and result is not None:
        print("ALL TESTS PASSED! The model integration is working.")
    else:
        if model is None:
            print("⚠️ Model loading failed, but the system will use mock predictions.")
        else:
            print("⚠️ Some tests failed. Check the logs above for details.")
    print("=" * 50)
