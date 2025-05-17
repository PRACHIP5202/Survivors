# EmberEye: AI-Powered Wildfire Risk Prediction

EmberEye is a modern web application built with React and Vite that uses AI to predict and visualize wildfire risks based on environmental factors and real-time weather data.

![Wildfire Risk Prediction Tool](firepre/src/assets/wildfire.webp)

## 🔥 Project Overview

EmberEye helps communities prepare for and mitigate wildfire risks through:

- **AI-powered risk prediction**: Analyzes temperature, humidity, wind speed, and vegetation to calculate risk levels
- **Interactive map visualization**: Displays regional risk levels with color-coded zones
- **Real-time weather data integration**: Connects to OpenWeatherMap API for current weather conditions
- **Personalized recommendations**: Provides safety suggestions based on location risk profiles

## 🚀 Features

- **Predictive AI Model**: Advanced algorithms assess risk based on environmental factors and historical data
- **Real-time Data**: Live weather data from OpenWeatherMap API for up-to-the-minute accuracy
- **Regional Risk Levels**: Color-coded visualization of risk zones using Leaflet maps
- **Interactive UI**: Beautiful, responsive interface built with React and enhanced with Framer Motion animations

## 📋 Pages

- **Home**: Introduction to the application with key features overview
- **Risk Map**: Interactive map with location-based risk assessment tool
- **How It Works**: Explanation of the prediction methodology
- **Resources**: Educational material and preparedness information
- **Contact**: Feedback form and support resources

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router 7
- **UI/Animation**: Framer Motion, Tailwind CSS
- **Map Visualization**: Leaflet, React Leaflet
- **Data Visualization**: Recharts
- **API Integration**: Axios
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/firepre.git
cd firepre
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
```
VITE_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 📦 Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

To preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

## 🧪 Future Enhancements

- Integration with more weather data sources
- Machine learning model improvement with historical wildfire data
- Push notifications for high-risk alerts
- Community reporting features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- OpenWeatherMap API for weather data
- Leaflet for map visualization
- React and Vite communities for excellent documentation
