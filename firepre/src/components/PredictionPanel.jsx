import { useState, useEffect } from 'react';

export default function PredictionPanel({ weatherData, onPredict }) {
  const [inputs, setInputs] = useState({
    temperature: '',
    humidity: '',
    windSpeed: '',
    vegetation: '',
  });

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

  const handleSubmit = () => {
    // Call the prediction handler
    onPredict(inputs);
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '10px',
      padding: '1rem',
      marginTop: '1rem',
      maxWidth: '400px',
      background: '#f9f9f9'
    }}>
      <h3>🔍 Enter Data for Wildfire Prediction</h3>

      <label>
        🌡️ Temperature (°C):
        <input type="number" name="temperature" value={inputs.temperature} onChange={handleChange} />
      </label>

      <br />

      <label>
        💧 Humidity (%):
        <input type="number" name="humidity" value={inputs.humidity} onChange={handleChange} />
      </label>

      <br />

      <label>
        💨 Wind Speed (m/s):
        <input type="number" name="windSpeed" value={inputs.windSpeed} onChange={handleChange} />
      </label>

      <br />

      <label>
        🌿 Vegetation Index (0–100):
        <input type="number" name="vegetation" value={inputs.vegetation} onChange={handleChange} />
      </label>

      <br />

      <button style={{ marginTop: '1rem' }} onClick={handleSubmit}>
        🔥 Predict Wildfire Risk
      </button>
    </div>
  );
}
