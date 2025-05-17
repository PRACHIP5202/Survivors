import { useState } from 'react';
import MapView from './components/MapView';
import PredictionPanel from './components/PredictionPanel';
import { getWeatherData } from './utils/getWeatherData';
import { predictRisk } from './utils/predictor';

function App() {
  const [weather, setWeather] = useState(null);
  const [riskResult, setRiskResult] = useState(null);

  const handleLocationChange = async ({ lat, lng }) => {
    const data = await getWeatherData(lat, lng);
    setWeather(data);
  };

  const handlePrediction = (inputs) => {
    const result = predictRisk(inputs);
    setRiskResult(result);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🔥 Wildfire Prediction App</h1>

      <MapView onLocationChange={handleLocationChange} />

      <PredictionPanel weatherData={weather} onPredict={handlePrediction} />

      {riskResult && (
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#fffbe6', border: '1px solid #ffd666', borderRadius: '10px' }}>
          <h3>🚨 Prediction Result</h3>
          <p>🔥 Risk Percentage: <b>{riskResult.percentage}%</b></p>
          <p>⚠️ Risk Level: <b style={{ color: riskResult.level === 'High' ? 'red' : riskResult.level === 'Medium' ? 'orange' : 'green' }}>
            {riskResult.level}
          </b></p>
        </div>
      )}
    </div>
  );
}

export default App;
