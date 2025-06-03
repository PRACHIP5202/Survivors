# EmberEye Vercel Deployment Guide

This guide provides steps to deploy the EmberEye frontend to [Vercel](https://vercel.com).

## Prerequisites

- A Vercel account
- The [Vercel CLI](https://vercel.com/docs/cli) installed:
  ```
  npm install -g vercel
  ```
- Environment variables configured in `.env.production`

## Deployment Steps

### 1. Login to Vercel

```bash
vercel login
```

### 2. Deploy to Vercel

Option 1: Using the CLI:

```bash
cd firepre
vercel --prod
```

Option 2: Using GitHub Integration:

1. Push your code to GitHub
2. Connect your GitHub repository in the Vercel dashboard
3. Configure the following settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 3. Configure Environment Variables

In the Vercel Dashboard:
1. Go to Project Settings > Environment Variables
2. Add the following variables:
   - `VITE_API_BASE_URL`
   - `VITE_WEATHER_API_KEY`
   - Any other variables defined in your `.env.production`

### 4. Configure Custom Domain (Optional)

1. In the Vercel Dashboard, go to Project Settings > Domains
2. Add your custom domain
3. Follow the instructions to verify domain ownership

### 5. Verify Deployment

1. Check that the deployment was successful
2. Visit your Vercel deployment URL
3. Test core functionality
4. Check for any console errors

## Troubleshooting

### Build Errors

- Check the build logs for errors
- Verify your dependencies are correctly listed in `package.json`
- Make sure all required environment variables are set

### API Connection Issues

- Verify your backend API is accessible
- Check the `VITE_API_BASE_URL` is correct
- Check CORS is configured correctly on your backend

### Performance Issues

- Check the Network tab for slow requests
- Consider using a CDN for static assets
- Enable Vercel Edge Functions for improved performance

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React SPA Routing in Vercel](https://vercel.com/guides/deploying-react-with-vercel-router)
