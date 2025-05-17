import joblib
import os
import logging
import numpy as np
import tensorflow as tf
from PIL import Image
from io import BytesIO
from typing import Dict, List, Any, Optional

logger = logging.getLogger(__name__)

# Define the path to the CNN model file
CNN_MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 
                         "models", "wildfire_cnn_model.h5")
CONVERTED_MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 
                         "models", "wildfire_cnn_model_converted.h5")
NEW_MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 
                         "models", "wildfire_cnn_model_new.h5")

# Risk levels mapping
RISK_LEVELS = {
    0: "Low",
    1: "Moderate",
    2: "High",
    3: "Very High",
    4: "Extreme"
}

# Recommendations based on risk levels
RECOMMENDATIONS = {
    "Low": [
        "Stay informed about weather conditions",
        "Ensure your property maintains a defensible space",
        "Review your emergency plan periodically"
    ],
    "Moderate": [
        "Clear dead vegetation from your property",
        "Keep updated on local fire restrictions",
        "Prepare an emergency kit with essentials",
        "Review evacuation routes with your family"
    ],
    "High": [
        "Avoid outdoor activities that could cause sparks",
        "Keep garden hoses and fire extinguishers accessible",
        "Move flammable materials away from your home",
        "Be prepared to evacuate if conditions worsen",
        "Stay tuned to local emergency notifications"
    ],
    "Very High": [
        "Consider voluntary evacuation, especially for vulnerable individuals",
        "Shut off gas at the meter if you leave your home",
        "Close all windows and doors before evacuating",
        "Move patio furniture away from your home",
        "Charge phones and keep vehicles fueled"
    ],
    "Extreme": [
        "Evacuate immediately if authorities recommend it",
        "Follow designated evacuation routes",
        "Take only essential items with you",
        "Notify friends and family of your location",
        "Register with local emergency services for updates"
    ]
}

def load_model():
    """
    Load the CNN model from disk
    """
    try:
        # First try to load the new model
        if os.path.exists(NEW_MODEL_PATH):
            model = tf.keras.models.load_model(
                NEW_MODEL_PATH,
                compile=True
            )
            logger.info("New CNN model loaded successfully")
            return model
        # Then try the converted model
        elif os.path.exists(CONVERTED_MODEL_PATH):
            model = tf.keras.models.load_model(
                CONVERTED_MODEL_PATH,
                compile=False
            )
            logger.info("Converted CNN model loaded successfully")
            return model
        # Finally try the original model
        elif os.path.exists(CNN_MODEL_PATH):
            # Use a custom loader with specific options to handle version differences
            try:
                model = tf.keras.models.load_model(
                    CNN_MODEL_PATH,
                    compile=False
                )
                logger.info("Original CNN model loaded successfully")
                return model
            except Exception as e:
                logger.error(f"Error loading original model: {str(e)}")
                logger.warning("Using mock prediction due to model loading error")
                return None
        else:
            logger.warning(f"CNN model not found at any location. Using mock model for development.")
            return None
    except Exception as e:
        logger.error(f"Error loading CNN model: {str(e)}")
        return None

def preprocess_features(features, coordinates=None, img_size=128):
    """
    Convert input features to a format suitable for the CNN model.
    
    Args:
        features: List of numerical weather features
        coordinates: Tuple of (latitude, longitude) if available
        img_size: Size of images the model was trained on
    
    Returns:
        Preprocessed image tensor suitable for CNN model input
    """
    try:
        # Extract features
        temperature = features[0] if len(features) > 0 else 25.0
        humidity = features[1] if len(features) > 1 else 50.0
        wind_speed = features[2] if len(features) > 2 else 10.0
        precipitation = features[3] if len(features) > 3 else 0.0
        vegetation_density = features[4] if len(features) > 4 else 0.5
        elevation = features[5] if len(features) > 5 else 300.0
        drought_index = features[6] if len(features) > 6 else 0.3
        
        # Create a heatmap representation of the features for CNN input
        # This approach creates a synthetic image from our weather data
        # For a real implementation, you might fetch actual satellite imagery
        heatmap = np.zeros((img_size, img_size, 3), dtype=np.float32)
        
        # Normalize values
        temp_norm = min(1.0, max(0.0, (temperature - 15) / 25))  # Normalize temp between 15-40°C
        humidity_norm = min(1.0, max(0.0, humidity / 100))
        wind_norm = min(1.0, max(0.0, wind_speed / 50))  # Normalize wind speed between 0-50 km/h
        precip_norm = min(1.0, max(0.0, precipitation / 25))  # Normalize precipitation between 0-25 mm
        veg_norm = min(1.0, max(0.0, vegetation_density))
        drought_norm = min(1.0, max(0.0, drought_index))
        
        # Generate a heatmap representation of the data:
        # Red channel - temperature and drought (higher = redder)
        # Green channel - humidity and vegetation (higher = greener)
        # Blue channel - precipitation (higher = bluer)
        
        # Fill the red channel with temperature (higher = redder)
        heatmap[:, :, 0] = temp_norm * (1 + drought_norm * 0.5)
        
        # Fill the green channel with humidity and vegetation (higher = greener)
        heatmap[:, :, 1] = (humidity_norm + veg_norm) / 2
        
        # Fill the blue channel with precipitation (higher = bluer)
        heatmap[:, :, 2] = precip_norm
        
        # Add some variation based on wind speed
        # This creates patterns in the image
        for i in range(img_size):
            for j in range(img_size):
                # Add wind effect (creates directional patterns)
                wind_effect = wind_norm * (j / img_size)
                
                # Apply wind effect - increases red, decreases blue to simulate drying effect
                heatmap[i, j, 0] = min(1.0, heatmap[i, j, 0] + (wind_effect * 0.2))
                heatmap[i, j, 2] = max(0.0, heatmap[i, j, 2] - (wind_effect * 0.1))
        
        # Add batch dimension for CNN model
        input_tensor = np.expand_dims(heatmap, axis=0)
        
        # Scale to 0-255 range if your model expects it
        # input_tensor = input_tensor * 255.0
        
        return input_tensor
        
    except Exception as e:
        logger.error(f"Error in preprocessing features: {str(e)}")
        # Return a default tensor for error cases
        return np.zeros((1, img_size, img_size, 3), dtype=np.float32)

def mock_prediction(features):
    """
    Generate a mock prediction for development purposes
    """
    # Calculate a risk score based on simplified rules
    temperature_weight = 0.3
    humidity_weight = -0.25  # Negative because higher humidity reduces risk
    wind_speed_weight = 0.25
    precipitation_weight = -0.2  # Negative because higher precipitation reduces risk
    
    temp_norm = min(1.0, max(0.0, (features[0] - 15) / 25))  # Normalize temp between 15-40°C
    humidity_norm = min(1.0, max(0.0, features[1] / 100))
    wind_norm = min(1.0, max(0.0, features[2] / 50))  # Normalize wind speed between 0-50 km/h
    precip_norm = min(1.0, max(0.0, features[3] / 25))  # Normalize precipitation between 0-25 mm
    
    # Calculate risk score (0-1 scale)
    risk_score = (
        temp_norm * temperature_weight + 
        humidity_norm * humidity_weight + 
        wind_norm * wind_speed_weight + 
        precip_norm * precipitation_weight + 
        0.5  # baseline
    )
    
    # Clamp between 0 and 1
    risk_score = min(1.0, max(0.0, risk_score))
    
    # Map to risk level (0-4)
    risk_level_idx = int(risk_score * 4)
    
    # Add some randomness to confidence (between 0.7 and 0.95)
    confidence = 0.7 + (np.random.random() * 0.25)
    
    return {
        "risk_level_idx": risk_level_idx,
        "risk_score": float(risk_score),
        "confidence": float(confidence)
    }

def predict_risk(
    latitude: float,
    longitude: float,
    temperature: float,
    humidity: float,
    wind_speed: float,
    precipitation: float,
    vegetation_density: Optional[float] = None,
    elevation: Optional[float] = None,
    drought_index: Optional[float] = None
):
    """
    Predict wildfire risk based on weather and environmental data
    """
    # Detailed logging of input parameters
    logger.info(f"Prediction request received with parameters:")
    logger.info(f"  Location: lat={latitude}, lng={longitude}")
    logger.info(f"  Weather: temp={temperature}°C, humidity={humidity}%, wind={wind_speed}km/h, precip={precipitation}mm")
    logger.info(f"  Environmental: vegetation={vegetation_density}, elevation={elevation}, drought={drought_index}")
    
    # Prepare features for the model
    features = [temperature, humidity, wind_speed, precipitation]
    
    # Add optional features if available
    if vegetation_density is not None:
        features.append(vegetation_density)
    else:
        # Default value or computed from location
        features.append(0.5)  # Default medium vegetation density
        
    if elevation is not None:
        features.append(elevation)
    else:
        # Could be fetched from an elevation API based on lat/long
        features.append(300)  # Default elevation
        
    if drought_index is not None:
        features.append(drought_index)
    else:
        # Could be computed from historical weather data
        features.append(0.3)  # Default moderate drought index
    
    # Load the CNN model
    cnn_model = load_model()
    
    # Initialize variables to store both original and adjusted predictions
    original_risk_score = None
    original_risk_level_idx = None
    model_source = "unknown"
    
    # Make prediction
    if cnn_model is not None:
        # If we have the real CNN model, use it
        try:
            # Preprocess features for CNN model
            coordinates = (latitude, longitude)
            preprocessed_input = preprocess_features(features, coordinates)
            
            # Get prediction from CNN model
            logger.info("Making prediction with CNN model...")
            prediction = cnn_model.predict(preprocessed_input, verbose=0)
            wildfire_probability = float(prediction[0][0])
            logger.info(f"Raw model output: {wildfire_probability}")
            
            # Store the original model prediction
            original_risk_score = wildfire_probability
            original_risk_level_idx = min(4, max(0, int(original_risk_score * 5)))
            model_source = "cnn_model"
            
            # If the new model is used, log this information
            if os.path.exists(NEW_MODEL_PATH):
                logger.info("Using newly created model for prediction")
            elif os.path.exists(CONVERTED_MODEL_PATH):
                logger.info("Using converted model for prediction")
            elif os.path.exists(CNN_MODEL_PATH):
                logger.info("Using original model for prediction")
            
        except Exception as e:
            logger.error(f"Error during prediction with CNN model: {str(e)}")
            # Fallback to mock prediction
            logger.warning("Using mock prediction due to CNN model error")
            mock_result = mock_prediction(features)
            original_risk_score = mock_result["risk_score"]
            original_risk_level_idx = mock_result["risk_level_idx"]
            model_source = "mock_due_to_error"
    else:
        # Use mock prediction for development if model is not available
        logger.warning("No model available, using mock prediction")
        mock_result = mock_prediction(features)
        original_risk_score = mock_result["risk_score"]
        original_risk_level_idx = mock_result["risk_level_idx"]
        model_source = "mock_no_model"
    
    # ---- Calculate adjusted score based directly on input features ----
    # Normalize input features to 0-1 range
    temp_factor = min(1.0, max(0.0, (temperature - 15) / 30))  # 15-45°C range
    humidity_factor = 1.0 - min(1.0, max(0.0, humidity / 100))  # Invert so lower humidity = higher risk
    wind_factor = min(1.0, max(0.0, wind_speed / 40))  # 0-40 km/h range
    precip_factor = 1.0 - min(1.0, max(0.0, precipitation / 10))  # Invert so lower precip = higher risk
    veg_factor = vegetation_density if vegetation_density is not None else 0.5
    
    # Log the normalized factors
    logger.info(f"Normalized factors for adjusted score:")
    logger.info(f"  Temperature: {temp_factor:.4f} (from {temperature}°C)")
    logger.info(f"  Humidity: {humidity_factor:.4f} (from {humidity}%)")
    logger.info(f"  Wind: {wind_factor:.4f} (from {wind_speed} km/h)")
    logger.info(f"  Precipitation: {precip_factor:.4f} (from {precipitation} mm)")
    logger.info(f"  Vegetation: {veg_factor:.4f}")
    
    # Define factor weights
    weights = {
        "temperature": 0.3,
        "humidity": 0.25,
        "wind": 0.2,
        "precipitation": 0.15,
        "vegetation": 0.1
    }
    
    # Calculate weighted contributions
    contributions = {
        "temperature": temp_factor * weights["temperature"],
        "humidity": humidity_factor * weights["humidity"],
        "wind": wind_factor * weights["wind"],
        "precipitation": precip_factor * weights["precipitation"],
        "vegetation": veg_factor * weights["vegetation"]
    }
    
    # Calculate adjusted risk score
    adjusted_risk_score = sum(contributions.values())
    
    # Ensure score is within 0-1 range
    adjusted_risk_score = min(1.0, max(0.0, adjusted_risk_score))
    
    # Log comparison between original and adjusted scores
    logger.info(f"Risk score comparison:")
    logger.info(f"  Original model score: {original_risk_score:.4f} (source: {model_source})")
    logger.info(f"  Adjusted score: {adjusted_risk_score:.4f}")
    
    # Use the adjusted score for the final prediction
    risk_score = adjusted_risk_score
    risk_level_idx = min(4, max(0, int(risk_score * 5)))  # Scale to 0-4 index
    
    # Adjust confidence based on model source
    if model_source.startswith("mock"):
        confidence = 0.6  # Lower confidence for mock predictions
    else:
        confidence = 0.8  # Higher confidence for actual model predictions
    
    # Get the risk level string
    risk_level = RISK_LEVELS[risk_level_idx]
    
    # Prepare factors for response with detailed contributions
    factor_descriptions = {
        "temperature": {
            "value": temperature,
            "impact": "High" if temp_factor > 0.7 else "Medium" if temp_factor > 0.3 else "Low",
            "description": "Higher temperatures increase wildfire risk",
            "contribution": float(f"{contributions['temperature']:.4f}")
        },
        "humidity": {
            "value": humidity,
            "impact": "High" if humidity_factor > 0.7 else "Medium" if humidity_factor > 0.3 else "Low",
            "description": "Lower humidity increases wildfire risk",
            "contribution": float(f"{contributions['humidity']:.4f}")
        },
        "wind_speed": {
            "value": wind_speed,
            "impact": "High" if wind_factor > 0.7 else "Medium" if wind_factor > 0.3 else "Low",
            "description": "Higher wind speeds can spread wildfires faster",
            "contribution": float(f"{contributions['wind']:.4f}")
        },
        "precipitation": {
            "value": precipitation,
            "impact": "High" if precip_factor > 0.7 else "Medium" if precip_factor > 0.3 else "Low",
            "description": "Lower precipitation leads to drier conditions and higher risk",
            "contribution": float(f"{contributions['precipitation']:.4f}")
        },
        "vegetation_density": {
            "value": vegetation_density if vegetation_density is not None else 0.5,
            "impact": "High" if veg_factor > 0.7 else "Medium" if veg_factor > 0.3 else "Low",
            "description": "Higher vegetation density provides more fuel for wildfires",
            "contribution": float(f"{contributions['vegetation']:.4f}")
        }
    }
    
    # Get appropriate recommendations based on risk level
    recommendations = RECOMMENDATIONS[risk_level]
    
    # Log the final prediction
    logger.info(f"Final prediction: Risk level: {risk_level}, Risk score: {risk_score:.4f}")
    
    # Return full prediction result with detailed information
    return {
        "risk_level": risk_level,
        "risk_score": float(f"{risk_score:.6f}"),  # Format to 6 decimal places
        "confidence": float(f"{confidence:.2f}"),
        "factors": factor_descriptions,
        "recommendations": recommendations,
        "model_details": {
            "source": model_source,
            "original_score": float(f"{original_risk_score:.6f}"),
            "original_level": RISK_LEVELS[original_risk_level_idx],
            "adjustment_applied": model_source.startswith("mock") or abs(risk_score - original_risk_score) > 0.01
        }
    }
