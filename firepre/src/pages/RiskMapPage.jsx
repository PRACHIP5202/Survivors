import { useState } from 'react';
import MapView from '../components/MapView';
import PredictionPanel from '../components/PredictionPanel';
import RiskLevelCard from '../components/RiskLevelCard';
import WeatherInfo from '../components/WeatherInfo';
import { getWeatherData } from '../utils/getWeatherData';
import { predictRisk } from '../utils/predictor';

export default function RiskMapPage() {
  const [weather, setWeather] = useState(null);
  const [riskResult, setRiskResult] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationChange = async ({ lat, lng }) => {
    setSelectedLocation({ lat, lng });
    const data = await getWeatherData(lat, lng);
    setWeather(data);
  };

  const handlePrediction = (inputs) => {
    const result = predictRisk(inputs);
    setRiskResult(result);
  };

  return (
    <div className="risk-map-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">AI Risk Map</h1>
          <p className="page-description">
            Explore our interactive map to visualize and predict wildfire risks in your area.
            Click anywhere on the map to get location-specific weather data and risk assessment.
          </p>
        </div>

        <div className="risk-map-content">
          <div className="map-container">
            <MapView onLocationChange={handleLocationChange} />
            <div className="map-overlay">
              <div className="map-legend">
                <h3 className="legend-title">Risk Levels</h3>
                <div className="legend-item">
                  <div className="color-box low"></div>
                  <span>Low Risk (0-40%)</span>
                </div>
                <div className="legend-item">
                  <div className="color-box medium"></div>
                  <span>Medium Risk (41-70%)</span>
                </div>
                <div className="legend-item">
                  <div className="color-box high"></div>
                  <span>High Risk (71-100%)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="sidebar-container">
            {selectedLocation && (
              <div className="location-info">
                <h3 className="location-title">Selected Location</h3>
                <p className="location-coordinates">
                  Lat: {selectedLocation.lat.toFixed(6)}, Lng: {selectedLocation.lng.toFixed(6)}
                </p>
              </div>
            )}

            {weather && <WeatherInfo weatherData={weather} />}

            <PredictionPanel weatherData={weather} onPredict={handlePrediction} />

            {riskResult && <RiskLevelCard riskResult={riskResult} />}
          </div>
        </div>
      </div>
    </div>
  );
}
