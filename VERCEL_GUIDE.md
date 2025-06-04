# 📖 Visual Vercel Deployment Guide

## 🚀 Quick Start: Deploy EmberEye to Vercel

### Step 1: Access Vercel Dashboard
```
Browser: https://vercel.com/new
Action: Sign in with GitHub account
```

### Step 2: Import Your Repository
```
Repository URL: https://github.com/PRACHIP5202/Survivors
Click: "Import Git Repository"
```

### Step 3: Configuration Settings

**IMPORTANT**: Use these exact settings for successful deployment:

```
┌─────────────────────────────────────┐
│ PROJECT CONFIGURATION               │
├─────────────────────────────────────┤
│ Framework Preset:     Other         │
│ Root Directory:       firepre       │
│ Build Command:        npm run build │
│ Output Directory:     dist          │
│ Install Command:      npm install   │
└─────────────────────────────────────┘
```

### Step 4: Environment Variables (Optional)
```
VITE_API_URL=https://your-backend-url.com
```

### Step 5: Deploy!
```
Click: "Deploy"
Wait: ~2-3 minutes for deployment
Result: https://your-project-name.vercel.app
```

## 🔧 Configuration Details

### Why These Settings?
- **Root Directory: `firepre`** → Points to React frontend folder
- **Framework Preset: `Other`** → Vite projects need custom config
- **Build Command: `npm run build`** → Uses Vite's production build
- **Output Directory: `dist`** → Vite's default output folder

### Security Features Included
- ✅ HTTPS automatic
- ✅ Security headers configured
- ✅ Static file optimization
- ✅ CDN distribution

## 🎯 Expected Results

### Build Process
```
⚡ Vercel Build Process
├── 📥 Cloning repository...
├── 📦 Installing dependencies...
├── 🏗️  Running build command...
├── ✅ Build completed successfully
└── 🌐 Deploying to global CDN...
```

### Success Indicators
```
✅ Build completed in ~2-3 minutes
✅ Deployment URL provided
✅ All static assets served via CDN
✅ Website accessible globally
```

## 🚨 Common Issues & Solutions

### Issue 1: Build Fails
```
Cause: Wrong root directory
Fix: Set "Root Directory" to "firepre"
```

### Issue 2: 404 Errors
```
Cause: Incorrect routing configuration
Fix: Verify vercel.json file exists in firepre/
```

### Issue 3: Assets Not Loading
```
Cause: Build output directory mismatch
Fix: Confirm "Output Directory" is set to "dist"
```

## 📋 Pre-Deployment Checklist

Run this command to verify readiness:
```bash
cd /Users/aditya/Documents/Survivors
./scripts/deploy-prep.sh
```

Expected output:
```
🔥 EmberEye Deployment Preparation
==================================
✅ Security audit complete
✅ Frontend build successful
✅ Git repository ready
✅ All pre-deployment checks passed
```

## 🎉 Post-Deployment Verification

After deployment, test these features:
1. **Homepage loads** → Main landing page displays
2. **Navigation works** → All menu items functional
3. **Maps render** → Interactive wildfire risk maps
4. **Responsive design** → Works on mobile/desktop
5. **Performance** → Fast loading times

## 📞 Next Steps After Frontend Deployment

1. **Backend Deployment** (Choose one):
   - Railway.app (Recommended for Python)
   - Render.com
   - Heroku

2. **API Integration**:
   - Update API endpoints in frontend
   - Configure CORS for cross-origin requests
   - Test end-to-end functionality

3. **Domain Setup** (Optional):
   - Add custom domain in Vercel dashboard
   - Configure DNS settings
   - Enable SSL certificate

---

**🚀 You're ready to deploy! Go to [vercel.com/new](https://vercel.com/new) now!**
