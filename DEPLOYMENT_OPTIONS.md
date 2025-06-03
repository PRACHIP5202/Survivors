# Deployment Options

EmberEye can be deployed using various platform-specific options for both the frontend and backend components.

## Frontend Deployment Options

### Vercel (Recommended)
```bash
# Deploy to Vercel
npm run deploy:vercel
```

### Netlify
```bash
# Deploy to Netlify
npm run deploy:netlify
```

### Firebase Hosting
```bash
# Deploy to Firebase
npm run deploy:firebase
```

## Backend Deployment Options

### Heroku
```bash
# Deploy to Heroku
npm run deploy:heroku
```

### Render
Connect your GitHub repository to Render.com for continuous deployment.
```bash
# View Render deployment instructions
npm run deploy:render
```

### Railway
Connect your GitHub repository to Railway.app for continuous deployment.

## Deployment Documentation

For detailed deployment instructions, please refer to:
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Deployment Plan](DEPLOYMENT_PLAN.md)
- [Deployment Checklist](DEPLOYMENT_CHECKLIST.md)

## Environment Setup

Before deploying, make sure to create the required environment files:

### Frontend (.env.production)
```
VITE_API_BASE_URL=https://your-backend-domain.com/api
VITE_WEATHER_API_KEY=your_production_api_key
```

### Backend (.env)
```
WEATHER_API_KEY=your_production_api_key
DEBUG=False
LOG_LEVEL=INFO
API_HOST=0.0.0.0
API_PORT=8000
CORS_ORIGINS=https://your-frontend-domain.com
```
