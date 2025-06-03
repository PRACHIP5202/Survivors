# Deployment Guide

## Overview
This guide covers deploying EmberEye to production environments.

## Frontend Deployment (Vercel/Netlify)

### Vercel Deployment
1. **Build Command**: `npm run build`
2. **Output Directory**: `dist`
3. **Environment Variables**:
   - `VITE_WEATHER_API_KEY`
   - `VITE_API_BASE_URL` (your backend URL)

### Netlify Deployment
1. **Build Command**: `npm run build`
2. **Publish Directory**: `dist`
3. **Environment Variables**: Same as Vercel

## Backend Deployment

### Railway/Render/Heroku Deployment
1. **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
2. **Environment Variables**:
   - `WEATHER_API_KEY`
   - `MODEL_PATH`
   - `DEBUG=False`

### Heroku Deployment
1. Create `Procfile`:
   ```
   web: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```
2. Set environment variables in Heroku dashboard

## Environment Configuration

### Production Environment Variables

#### Backend (.env)
```env
WEATHER_API_KEY=your_production_api_key
DEBUG=False
LOG_LEVEL=INFO
API_HOST=0.0.0.0
API_PORT=8000
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
