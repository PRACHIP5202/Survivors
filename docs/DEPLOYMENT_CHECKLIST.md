# Deployment Checklist

## Pre-Deployment Validation

### ✅ Code Quality
- [ ] All tests passing (`npm run test`)
- [ ] No linting errors (`npm run lint`)
- [ ] Frontend builds successfully (`npm run build`)
- [ ] Backend dependencies verified (`python3 backend/check_dependencies.py`)

### ✅ Configuration
- [ ] Production environment variables set
- [ ] API keys configured
- [ ] Database connections tested (if applicable)
- [ ] CORS settings updated for production domains

### ✅ Security
- [ ] Remove debug flags (`DEBUG=False`)
- [ ] Environment variables secured
- [ ] No sensitive data in version control
- [ ] HTTPS configured
- [ ] Security headers enabled
- [ ] Security audit passed (`npm run audit`)
- [ ] No high severity vulnerabilities in dependencies
- [ ] Authentication systems tested (if applicable)

### ✅ Performance
- [ ] Frontend bundle size optimized
- [ ] Model loading performance tested
- [ ] API response times validated
- [ ] Error handling tested

## Deployment Steps

### Frontend (Vercel/Netlify)
1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18+

2. **Environment Variables**
   ```
   VITE_WEATHER_API_KEY=your_production_key
   VITE_API_BASE_URL=https://your-backend-domain.com/api
   ```

### Backend (Railway/Render/Heroku)
1. **Build Settings**
   - Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Python version: 3.11

2. **Environment Variables**
   ```
   WEATHER_API_KEY=your_production_key
   DEBUG=False
   LOG_LEVEL=INFO
   PORT=8000
   ```

### Local Development
```bash
# Start all development servers
npm run dev

# Or start individual servers
npm run dev:frontend  # Frontend on port 5173
npm run dev:backend   # Backend on port 8000
```

## Post-Deployment Validation

### ✅ Health Checks
- [ ] Frontend loads correctly
- [ ] Backend health endpoint responds (`/health`)
- [ ] API endpoints functional (`/api/predict`)
- [ ] Error pages work correctly

### ✅ Integration Tests
- [ ] Weather data fetching works
- [ ] Risk prediction API works
- [ ] Map visualization loads
- [ ] Contact form submits

### ✅ Performance
- [ ] Page load times < 3 seconds
- [ ] API response times < 2 seconds
- [ ] Images optimized and loading
- [ ] Mobile responsiveness verified

### ✅ Monitoring
- [ ] Error tracking enabled
- [ ] Performance monitoring active
- [ ] Log aggregation working
- [ ] Uptime monitoring configured

## Rollback Plan

### If Deployment Fails
1. **Frontend Issues**
   - Revert to previous Vercel/Netlify deployment
   - Check build logs for errors
   - Verify environment variables

2. **Backend Issues**
   - Revert to previous deployment version
   - Check application logs
   - Verify model file accessibility

3. **Database Issues** (if applicable)
   - Restore from backup
   - Check connection strings
   - Verify migrations

## Quick Commands

```bash
# Validate project
npm run validate

# Run all tests
npm run test

# Build for production
npm run build

# Check dependencies
python3 backend/check_dependencies.py

# Start local development
npm run dev
```

## Support and Maintenance

### Regular Tasks
- [ ] Monitor application performance
- [ ] Update dependencies monthly
- [ ] Review security advisories
- [ ] Backup model files and configurations

### Emergency Contacts
- **DevOps**: [Contact Information]
- **API Provider**: OpenWeatherMap Support
- **Cloud Provider**: Platform-specific support

### Documentation
- API Documentation: `docs/API.md`
- Development Guide: `docs/DEVELOPMENT.md`
- Project Structure: `docs/PROJECT_STRUCTURE.md`
