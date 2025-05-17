import axios from 'axios';

// The base URL for your FastAPI backend
const API_BASE_URL = 'http://localhost:8000/api';

// Client-side prediction as a fallback
export function clientPredictRisk({ temperature, humidity, windSpeed, vegetation }) {
  let score = 0;

  if (temperature > 35) score += 30;
  if (humidity < 30) score += 20;
  if (windSpeed > 15) score += 30;
  if (vegetation > 70) score += 20;

  const percentage = Math.min(score, 100);

  let level = 'Low';
  if (percentage > 70) level = 'High';
  else if (percentage > 40) level = 'Medium';

  return { percentage, level };
}

// API-based prediction
export async function predictRisk({ 
  latitude, 
  longitude, 
  temperature, 
  humidity, 
  windSpeed, 
  precipitation = 0, 
  vegetation = 50,
  elevation = null,
  droughtIndex = null
}) {
  try {
    // Log API request for debugging
    console.log("Sending API request to backend:", {
      url: `${API_BASE_URL}/predict`,
      data: {
        latitude,
        longitude,
        temperature,
        humidity,
        wind_speed: windSpeed,
        precipitation,
        vegetation_density: vegetation / 100,
        elevation,
        drought_index: droughtIndex
      }
    });

    const response = await axios.post(`${API_BASE_URL}/predict`, {
      latitude,
      longitude,
      temperature,
      humidity,
      wind_speed: windSpeed,
      precipitation,
      vegetation_density: vegetation / 100, // Convert from percentage (0-100) to decimal (0-1)
      elevation,
      drought_index: droughtIndex
    });

    // Log API response for debugging
    console.log("Received API response:", response.data);

    const { risk_level, risk_score, confidence, factors, recommendations } = response.data;
    
    // Convert the risk_score from 0-1 to 0-100 percentage
    const percentage = Math.round(risk_score * 100);
    
    // Prepare factor contributions for visualization
    const factorContributions = {};
    if (factors) {
      Object.keys(factors).forEach(key => {
        if (factors[key].hasOwnProperty('contribution')) {
          factorContributions[key] = Math.round(factors[key].contribution * 100);
        }
      });
    }
    
    // Get model details if available
    const modelInfo = response.data.model_details || {};
    
    return {
      percentage,
      level: risk_level,
      confidence: Math.round(confidence * 100),
      factors,
      factorContributions,
      recommendations,
      modelInfo
    };
  } catch (error) {
    console.error('Error fetching prediction from API:', error);
    console.log('Falling back to client-side prediction...');
    
    // Fallback to client-side prediction if API call fails
    return clientPredictRisk({ temperature, humidity, windSpeed, vegetation });
  }
}
  