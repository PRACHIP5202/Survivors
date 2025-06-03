# Deployment Guide

## Overview
This guide covers deploying EmberEye to production environments using platform-specific options.

## Prerequisites

- Node.js (v18+)
- Python (v3.11+)
- npm or yarn
- Git

## Frontend Deployment Options

### Vercel Deployment (Recommended)
1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   npm run deploy:vercel
   # OR
   cd firepre && vercel --prod
   ```

3. **Build Settings**:
   - **Build Command**: `npm run build:robust` (recommended) or `npm run build:safe` (if issues persist)
   - **Output Directory**: `dist`
   - **Environment Variables**:
     - `VITE_WEATHER_API_KEY`
     - `VITE_API_BASE_URL` (your backend URL)

### Netlify Deployment
1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy to Netlify**:
   ```bash
   npm run deploy:netlify
   # OR
   cd firepre && netlify deploy --prod
   ```

3. **Build Settings**:
   - **Build Command**: `npm run build:robust` (recommended)
   - **Publish Directory**: `dist`
   - **Environment Variables**: Same as Vercel

### Firebase Hosting
1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase** (first time only):
   ```bash
   cd firepre
   firebase init hosting
   ```

3. **Deploy to Firebase**:
   ```bash
   npm run deploy:firebase
   # OR
   cd firepre && firebase deploy
   ```

## Backend Deployment Options

### Heroku Deployment
1. **Install Heroku CLI**:
   ```bash
   brew install heroku
   ```

2. **Login to Heroku**:
   ```bash
   heroku login
   ```

3. **Create a new Heroku app** (first time only):
   ```bash
   cd backend
   heroku create your-app-name
   ```

4. **Deploy to Heroku**:
   ```bash
   npm run deploy:heroku
   # OR
   cd backend && git push heroku main
   ```

5. **Environment Setup**:
   - Create `Procfile` (already included):
     ```
     web: uvicorn main:app --host 0.0.0.0 --port $PORT
     ```
   - Set environment variables in Heroku dashboard

### Render Deployment
1. **Create a new Web Service** on Render.com
2. **Connect your GitHub repository**
3. **Configure build settings**:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. **Add environment variables** in the Render dashboard

### Railway Deployment
1. **Create new project** on Railway.app
2. **Connect your GitHub repository**
3. **Configure settings**:
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. **Set environment variables** in Railway dashboard

## Environment Configuration

### Production Environment Variables

#### Backend (.env)
```env
WEATHER_API_KEY=your_production_api_key
DEBUG=False
LOG_LEVEL=INFO
API_HOST=0.0.0.0
API_PORT=8000
CORS_ORIGINS=https://your-frontend-domain.com
```

#### Frontend (.env)
```env
VITE_WEATHER_API_KEY=your_production_api_key
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

## Pre-deployment Checklist

### Security
- [ ] Remove debug flags in production
- [ ] Configure CORS for specific domains
- [ ] Use HTTPS for all communications
- [ ] Secure API keys and environment variables
- [ ] Enable rate limiting
- [ ] Set up monitoring and logging

### Performance
- [ ] Optimize model loading
- [ ] Enable gzip compression
- [ ] Configure CDN for static assets
- [ ] Set up database connection pooling (if applicable)
- [ ] Implement caching strategies

### Testing
- [ ] Run all tests in production environment
- [ ] Test API endpoints with production data
- [ ] Verify environment variable loading
- [ ] Test error handling and logging

## Monitoring and Maintenance

### Logging
- Configure structured logging for both frontend and backend
- Set up log aggregation (e.g., Datadog, LogRocket)
- Monitor API response times and error rates

### Health Checks
- Backend: Use `/health` endpoint
- Frontend: Monitor build and deployment status
- Set up uptime monitoring (e.g., Pingdom, UptimeRobot)

### Performance Monitoring
- Use application performance monitoring (APM) tools
- Monitor model inference times
- Track API usage patterns

## Scaling Considerations

### Horizontal Scaling
- Use load balancers for backend instances
- Implement stateless backend design
- Consider microservices architecture for future growth

### Vertical Scaling
- Monitor CPU and memory usage
- Optimize model loading and caching
- Database optimization if applicable

## Backup and Recovery
- Regular model backups
- Environment configuration backups
- Database backups (if applicable)
- Disaster recovery procedures

## Troubleshooting

### CSS Minification Warnings
If you encounter CSS minification warnings during the build process, you have two options:

1. **Use the safe build command**:
   ```bash
   npm run build:safe
   ```
   This will build the application without CSS minification, avoiding the warnings.

2. **For more details**: See the [CSS_MINIFICATION_FIX.md](./CSS_MINIFICATION_FIX.md) document for a complete explanation of the issue and solutions.

### API Connection Issues
- Check CORS configuration in backend
- Verify API base URL in frontend environment
- Ensure API keys are properly set
- Check network request/response in browser developer tools
