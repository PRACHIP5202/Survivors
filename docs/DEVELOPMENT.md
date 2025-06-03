# Development Setup Guide

## Prerequisites

### Required Software
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.11 or higher) - [Download](https://python.org/)
- **Git** - [Download](https://git-scm.com/)

### Recommended Tools
- **VS Code** - [Download](https://code.visualstudio.com/)
- **Postman** - For API testing
- **Python virtual environment** - For dependency isolation

## Quick Start

### 1. Clone and Setup
```bash
git clone https://github.com/yourusername/embereye.git
cd embereye
npm run setup
```

### 2. Environment Configuration
```bash
# Copy environment templates
cp backend/.env.example backend/.env
cp firepre/.env.example firepre/.env

# Edit the .env files and add your API keys
# Backend: Add weather API key and model configuration
# Frontend: Add weather API key and backend URL
```

### 3. Install Dependencies
```bash
# Install all dependencies (frontend + backend)
npm run install:all

# Or install separately:
npm run install:frontend
npm run install:backend
```

### 4. Start Development Server
```bash
# Start both frontend and backend
npm run dev

# Or start separately:
npm run dev:frontend  # React app on http://localhost:5173
npm run dev:backend   # FastAPI on http://localhost:8000
```

## API Keys Setup

### OpenWeatherMap API
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Create a free account
3. Generate an API key
4. Add it to both `.env` files:
   - Backend: `WEATHER_API_KEY=your_key_here`
   - Frontend: `VITE_WEATHER_API_KEY=your_key_here`

## Project Structure
```
embereye/
├── backend/           # FastAPI backend
│   ├── app/          # Application modules
│   ├── models/       # ML models
│   └── requirements.txt
├── firepre/          # React frontend
│   ├── src/          # Source code
│   └── package.json
├── tests/            # Test files
├── docs/             # Documentation
└── scripts/          # Utility scripts
```

## Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend
- `npm run build` - Build frontend for production
- `npm run test` - Run all tests
- `npm run setup` - Initial project setup

### Frontend (firepre/)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend (backend/)
- `python -m uvicorn main:app --reload` - Start development server
- `python -m pytest` - Run tests
- `python recreate_model.py` - Recreate ML model

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Frontend: Change port in `vite.config.js`
   - Backend: Use `--port` flag or change in `main.py`

2. **Module not found errors**
   - Run `npm run install:all` to ensure all dependencies are installed
   - For Python: Activate virtual environment and run `pip install -r requirements.txt`

3. **API connection errors**
   - Check that backend is running on port 8000
   - Verify API keys in `.env` files
   - Check CORS configuration in backend

4. **Model loading errors**
   - Ensure model files exist in `backend/models/`
   - Run `python setup_model.py` to initialize models

### Getting Help
- Check the [API Documentation](./API.md)
- Review the [README](../README.md)
- Open an issue on GitHub
