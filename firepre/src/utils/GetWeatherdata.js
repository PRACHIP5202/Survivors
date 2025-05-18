import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; 

export async function getWeatherData(lat, lon) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat,
          lon,
          units: 'metric',
          appid: API_KEY,
        },
      }
    );

    const { temp, humidity } = response.data.main;
    const wind = response.data.wind.speed;

    return {
      temperature: parseFloat(temp.toFixed(1)),
      humidity: Math.round(humidity),
      windSpeed: parseFloat(wind.toFixed(1)),
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}
