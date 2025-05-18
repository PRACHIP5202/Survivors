import axios from 'axios';

// The base URL for your FastAPI backend
const API_BASE_URL = 'http://localhost:8000/api';

// Client-side prediction as a fallback
export function clientPredictRisk({ temperature, humidity, windSpeed, vegetation }) {
  // Make sure all inputs are valid numbers
  const temp = parseFloat(temperature) || 0;
  const humid = parseFloat(humidity) || 0;
  const wind = parseFloat(windSpeed) || 0;
  const veg = parseFloat(vegetation) || 0;
  
  console.log("Client prediction using values:", { temp, humid, wind, veg });
  
  let score = 0;

  if (temp > 35) score += 30;
  if (humid < 30) score += 20;
  if (wind > 15) score += 30;
  if (veg > 70) score += 20;

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
    // Ensure temperature and windSpeed have only one decimal place
    const formattedTemperature = parseFloat(parseFloat(temperature).toFixed(1));
    const formattedWindSpeed = parseFloat(parseFloat(windSpeed).toFixed(1));
    
    // Log API request for debugging
    console.log("Sending API request to backend:", {
      url: `${API_BASE_URL}/predict`,
      data: {
        latitude,
        longitude,
        temperature: formattedTemperature,
        humidity,
        wind_speed: formattedWindSpeed,
        precipitation,
        vegetation_density: vegetation / 100,
        elevation,
        drought_index: droughtIndex
      }
    });

    const response = await axios.post(`${API_BASE_URL}/predict`, {
      latitude,
      longitude,
      temperature: formattedTemperature,
      humidity,
      wind_speed: formattedWindSpeed,
      precipitation,
      vegetation_density: vegetation / 100, // Convert from percentage (0-100) to decimal (0-1)
      elevation,
      drought_index: droughtIndex
    });

    // Log API response for debugging
    console.log("Received API response:", response.data);

    const { risk_level, risk_score, confidence, factors, recommendations } = response.data;
    
    // Convert the risk_score from 0-1 to 0-100 percentage
    // Make sure risk_score is a valid number before multiplying
    const riskScoreValue = parseFloat(risk_score);
    const percentage = !isNaN(riskScoreValue) ? Math.round(riskScoreValue * 100) : 0;
    
    // Log the risk score calculation for debugging
    console.log("Risk score calculation:", { 
      original: risk_score, 
      parsed: riskScoreValue, 
      percentage: percentage 
    });
    
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
    console.log('Falling back to client-side prediction...', { temperature, humidity, windSpeed, vegetation });
    
    // Log the input values for debugging
    console.log("Input values for fallback:", {
      temperature: typeof temperature + " - " + temperature,
      humidity: typeof humidity + " - " + humidity,
      windSpeed: typeof windSpeed + " - " + windSpeed,
      vegetation: typeof vegetation + " - " + vegetation
    });
    
    // Fallback to client-side prediction if API call fails
    return clientPredictRisk({ temperature, humidity, windSpeed, vegetation });
  }
}
  