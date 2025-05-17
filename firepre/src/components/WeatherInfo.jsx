import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export default function WeatherInfo({ weatherData }) {
  if (!weatherData) return null;

  const { temperature, humidity, windSpeed } = weatherData;

  // Get appropriate icons based on weather
  const getTempIcon = (temp) => {
    if (temp > 30) return '🔥';
    if (temp > 20) return '☀️';
    if (temp > 10) return '🌤️';
    return '❄️';
  };

  const getHumidityIcon = (hum) => {
    if (hum > 70) return '💧';
    if (hum > 40) return '💦';
    return '🏜️';
  };

  const getWindIcon = (wind) => {
    if (wind > 20) return '🌪️';
    if (wind > 10) return '💨';
    return '🍃';
  };

  return (
    <motion.div 
      className="weather-info-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="weather-info-header">
        <h3 className="weather-info-title">Current Weather Conditions</h3>
        <span className="weather-update-time">
          Updated {new Date().toLocaleTimeString()}
        </span>
      </div>
      
      <div className="weather-data-grid">
        <div className="weather-data-item">
          <div className="weather-icon">{getTempIcon(temperature)}</div>
          <div className="weather-data">
            <span className="weather-value">{temperature}°C</span>
            <span className="weather-label">Temperature</span>
          </div>
        </div>
        
        <div className="weather-data-item">
          <div className="weather-icon">{getHumidityIcon(humidity)}</div>
          <div className="weather-data">
            <span className="weather-value">{humidity}%</span>
            <span className="weather-label">Humidity</span>
          </div>
        </div>
        
        <div className="weather-data-item">
          <div className="weather-icon">{getWindIcon(windSpeed)}</div>
          <div className="weather-data">
            <span className="weather-value">{windSpeed} km/h</span>
            <span className="weather-label">Wind Speed</span>
          </div>
        </div>
      </div>
      
      <div className="weather-footer">
        <button className="refresh-button">
          <span className="refresh-icon">🔄</span>
          <span>Refresh Data</span>
        </button>
      </div>
    </motion.div>
  );
}

WeatherInfo.propTypes = {
  weatherData: PropTypes.shape({
    temperature: PropTypes.number,
    humidity: PropTypes.number,
    windSpeed: PropTypes.number,
  }),
};
