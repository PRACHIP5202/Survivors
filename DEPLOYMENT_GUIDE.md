# EmberEye Deployment Guide

## 🚀 Vercel Frontend Deployment

### Prerequisites
- GitHub repository: `https://github.com/PRACHIP5202/Survivors.git`
- All security vulnerabilities resolved ✅
- Frontend build tested and working ✅

### Step-by-Step Deployment Process

#### 1. Access Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project" or "Import Git Repository"

#### 2. Import Repository
1. Select "Import Git Repository"
2. Enter repository URL: `https://github.com/PRACHIP5202/Survivors`
3. Click "Import"

#### 3. Configure Project Settings
When importing, use these settings:

**Framework Preset**: `Other`
**Root Directory**: `firepre` (important!)
**Build Command**: `npm run build`
**Output Directory**: `dist`
**Install Command**: `npm install`

#### 4. Environment Variables (if needed)
Set any required environment variables in the Vercel dashboard:
```
VITE_API_URL=https://your-backend-url.com
```

#### 5. Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Your frontend will be available at: `https://your-project-name.vercel.app`

### 📁 Project Structure for Deployment

```
/Users/aditya/Documents/Survivors/
├── firepre/                    # Frontend (React + Vite)
│   ├── vercel.json            # Vercel configuration ✅
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.js         # Vite configuration
│   └── dist/                  # Build output directory
├── backend/                   # Python FastAPI backend
├── package.json               # Root package.json
└── README.md
```

### ⚙️ Vercel Configuration

The `vercel.json` file in `/firepre/` directory contains:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist",
        "buildCommand": "npm run build"
      }
    }
  ],
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## 🔧 Backend Deployment Options

Since Vercel is optimized for frontend/serverless functions, the Python FastAPI backend needs a separate deployment platform:

### Option 1: Railway (Recommended for FastAPI)
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Select the `backend` directory
4. Railway will auto-detect Python and deploy

### Option 2: Render
1. Go to [render.com](https://render.com)
2. Create new "Web Service"
3. Connect GitHub repository
4. Set root directory to `backend`
5. Set build command: `pip install -r requirements.txt`
6. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Option 3: Heroku
1. Install Heroku CLI
2. Create `Procfile` in backend directory:
```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```
3. Deploy using Heroku CLI

## 🔐 Security Features

✅ **Security Audit Passed**: All dependencies are secure
✅ **Security Headers**: Added to Vercel configuration
✅ **Vulnerability-Free**: 0 known vulnerabilities in dependencies

## 🧪 Pre-Deployment Validation

The following checks have been completed:

### Frontend
- ✅ Build process works (`npm run build`)
- ✅ Security audit passed (0 vulnerabilities)
- ✅ Vercel configuration validated
- ✅ Static assets properly configured

### Backend
- ✅ Security audit passed (5 vulnerabilities fixed)
- ✅ Dependencies updated to secure versions
- ✅ Python packages compatible

### CI/CD
- ✅ GitHub Actions workflow includes security audits
- ✅ Automated vulnerability scanning enabled

## 📋 Post-Deployment Checklist

After deployment, verify:

1. **Frontend Accessibility**
   - [ ] Website loads correctly
   - [ ] All pages render properly
   - [ ] Interactive elements work
   - [ ] API calls function (once backend is deployed)

2. **Security Headers**
   - [ ] Verify security headers are present
   - [ ] Check SSL certificate is active
   - [ ] Test CSP (Content Security Policy) if configured

3. **Performance**
   - [ ] Run Lighthouse audit
   - [ ] Verify build optimization
   - [ ] Check loading speeds

## 🔗 Important URLs

- **Repository**: https://github.com/PRACHIP5202/Survivors
- **Frontend Deployment**: Will be available at your Vercel URL
- **Backend Deployment**: Will be available at your chosen platform URL

## 📞 Support

If you encounter issues during deployment:
1. Check Vercel deployment logs
2. Verify build commands and configuration
3. Ensure all dependencies are properly installed
4. Check security audit status

---

**Status**: Ready for deployment ✅
**Last Updated**: $(date)
**Security Audit**: Passed (0 vulnerabilities)
