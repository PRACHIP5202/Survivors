# EmberEye: AI-Powered Wildfire Risk Prediction

EmberEye is a full-stack web application that uses AI and machine learning to predict and visualize wildfire risks based on environmental factors and real-time weather data.

![Wildfire Risk Prediction Tool](firepre/src/assets/wildfire.webp)

## 🔥 Project Overview

EmberEye helps communities prepare for and mitigate wildfire risks through:

- **AI-powered risk prediction**: Machine learning models analyze temperature, humidity, wind speed, and vegetation
- **Interactive map visualization**: Real-time risk assessment with color-coded zones
- **Real-time weather integration**: Live data from OpenWeatherMap API
- **Responsive web interface**: Modern React frontend with beautiful animations

## 🏗️ Architecture

- **Frontend**: React 19 + Vite (Modern web interface)
- **Backend**: FastAPI + Python (ML inference and API services)
- **AI/ML**: TensorFlow CNN models for risk prediction
- **Maps**: Leaflet for interactive visualization
- **Styling**: Tailwind CSS + Framer Motion

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- Python (v3.11+)
- OpenWeatherMap API key

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/embereye.git
cd embereye

# Quick setup (installs everything)
npm run setup

# Add your API keys to .env files
# backend/.env - Add WEATHER_API_KEY
# firepre/.env - Add VITE_WEATHER_API_KEY

# Start development servers
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

## 📁 Project Structure

```
embereye/
├── backend/                 # FastAPI backend
│   ├── app/                # Application modules
│   │   ├── routers/        # API route handlers
│   │   ├── schemas/        # Pydantic models
│   │   └── services/       # Business logic
│   ├── models/             # ML model files
│   ├── main.py             # FastAPI application
│   └── requirements.txt    # Python dependencies
├── firepre/                # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   ├── contexts/       # React contexts
│   │   └── styles/         # CSS styles
│   └── package.json        # Frontend dependencies
├── tests/                  # Test files
├── docs/                   # Documentation
├── scripts/                # Utility scripts
└── package.json            # Root package.json
```
## 📚 Documentation

- [Development Setup](docs/DEVELOPMENT.md) - Complete setup and development guide
- [API Reference](docs/API.md) - Backend API documentation
- [Deployment Guide](docs/DEPLOYMENT.md) - Production deployment instructions
- [CSS Minification Fix](docs/CSS_MINIFICATION_FIX.md) - Handling CSS build warnings

## 🛠️ Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend
- `npm run build` - Build frontend for production
- `npm run build:safe` - Build frontend without CSS minification
- `npm run setup` - Initial project setup
- `npm run test` - Run all tests

### Development
- `npm run dev:frontend` - Start only frontend
- `npm run dev:backend` - Start only backend
- `npm run install:all` - Install all dependencies

## 🔧 Configuration

### Environment Variables

Create `.env` files from the provided templates:

**Backend (.env)**
```env
WEATHER_API_KEY=your_openweathermap_api_key
DEBUG=True
LOG_LEVEL=INFO
```

**Frontend (.env)**
```env
VITE_WEATHER_API_KEY=your_openweathermap_api_key
VITE_API_BASE_URL=http://localhost:8000/api
```

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run specific test suites
npm run test:frontend
npm run test:backend
```

## 🚀 Features

- **Real-time Risk Assessment**: ML-powered wildfire risk prediction
- **Interactive Maps**: Leaflet-based visualization with risk zones
- **Weather Integration**: Live weather data from OpenWeatherMap
- **Responsive Design**: Mobile-friendly interface
- **Modern UI**: Tailwind CSS with Framer Motion animations

## 🔮 Future Enhancements

- Integration with satellite imagery
- Historical wildfire data analysis
- Push notifications for risk alerts
- Community reporting features
- Mobile application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🚢 Deployment

EmberEye can be deployed using various platform-specific options:

### Frontend Deployment
- **Vercel** (recommended): `npm run deploy:vercel`
- **Netlify**: `npm run deploy:netlify`
- **Firebase**: `npm run deploy:firebase`

**Build Options**:
- Standard build: `npm run build`
- Safe build (bypasses CSS warnings): `npm run build:safe`

### Backend Deployment
- **Heroku**: `npm run deploy:heroku`
- **Render**: Connect GitHub repository to Render.com
- **Railway**: Connect GitHub repository to Railway.app

For complete deployment instructions, see:
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Deployment Options](DEPLOYMENT_OPTIONS.md)
- [Deployment Checklist](DEPLOYMENT_CHECKLIST.md)
- [CSS Minification Fix](docs/CSS_MINIFICATION_FIX.md)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- OpenWeatherMap API for weather data
- Leaflet for map visualization
- React and Vite communities for excellent documentation
