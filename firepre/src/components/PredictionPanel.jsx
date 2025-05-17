import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import RiskLevelCard from './RiskLevelCard';
import EvacuationSteps from './EvacuationSteps';

export default function PredictionPanel({ weatherData, onPredict }) {
  const [inputs, setInputs] = useState({
    temperature: '',
    humidity: '',
    windSpeed: '',
    vegetation: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showEvacuationSteps, setShowEvacuationSteps] = useState(false);

  // Autofill weather data if available
  useEffect(() => {
    if (weatherData) {
      setInputs((prev) => ({
        ...prev,
        temperature: weatherData.temperature || '',
        humidity: weatherData.humidity || '',
        windSpeed: weatherData.windSpeed || '',
      }));
    }
  }, [weatherData]);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Set loading state
    setIsLoading(true);
    
    // Simulate API delay for demonstration purposes
    setTimeout(() => {
      // Call the prediction handler
      onPredict(inputs);
      setIsLoading(false);
    }, 1500);
  };

  const vegetationOptions = [
    { value: 10, label: 'Urban/Low Vegetation (0-20%)' },
    { value: 30, label: 'Mixed Urban/Shrubs (21-40%)' },
    { value: 50, label: 'Grassland/Light Forest (41-60%)' },
    { value: 70, label: 'Dense Forest (61-80%)' },
    { value: 90, label: 'Very Dense/Dry Vegetation (81-100%)' }
  ];

  return (
    <motion.div 
      className="prediction-panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="prediction-header">
        <h2 className="prediction-title">Wildfire Risk Prediction</h2>
        <p className="prediction-description">
          Enter environmental data to get a real-time wildfire risk assessment for your selected location.
        </p>
      </div>

      <div className="prediction-content">
        <div className="prediction-form-container">
          <form className="prediction-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="temperature">Temperature (°C)</label>
              <input
                type="number"
                id="temperature"
                name="temperature"
                value={inputs.temperature}
                onChange={handleChange}
                placeholder="Enter temperature"
                required
                min="-50"
                max="60"
                step="0.1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="humidity">Humidity (%)</label>
              <input
                type="number"
                id="humidity"
                name="humidity"
                value={inputs.humidity}
                onChange={handleChange}
                placeholder="Enter humidity"
                required
                min="0"
                max="100"
              />
            </div>

            <div className="form-group">
              <label htmlFor="windSpeed">Wind Speed (km/h)</label>
              <input
                type="number"
                id="windSpeed"
                name="windSpeed"
                value={inputs.windSpeed}
                onChange={handleChange}
                placeholder="Enter wind speed"
                required
                min="0"
                max="200"
                step="0.1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="vegetation">Vegetation Density</label>
              <select
                id="vegetation"
                name="vegetation"
                value={inputs.vegetation}
                onChange={handleChange}
                required
              >
                <option value="">Select vegetation density</option>
                {vegetationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="predict-button" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    <span className="loading-text">Calculating...</span>
                  </>
                ) : (
                  'Calculate Risk'
                )}
              </button>
              <button 
                type="button" 
                className="secondary-button"
                onClick={() => setShowEvacuationSteps(!showEvacuationSteps)}
                disabled={isLoading}
              >
                {showEvacuationSteps ? 'Hide Evacuation Steps' : 'Show Evacuation Steps'}
              </button>
            </div>

            {weatherData && (
              <div className="weather-info">
                <h4>Current Weather Data</h4>
                <p>Weather data has been automatically populated from your selected location.</p>
              </div>
            )}
          </form>
        </div>
      </div>

      {showEvacuationSteps && (
        <motion.div 
          className="evacuation-steps-container"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5 }}
        >
          <EvacuationSteps />
        </motion.div>
      )}
    </motion.div>
  );
}

PredictionPanel.propTypes = {
  weatherData: PropTypes.shape({
    temperature: PropTypes.number,
    humidity: PropTypes.number,
    windSpeed: PropTypes.number,
  }),
  onPredict: PropTypes.func.isRequired,
};
