# 🚀 LectureLens Netlify Deployment Guide

## 📋 Quick Setup

### Step 1: Deploy to Netlify

1. **Go to Netlify Dashboard**
   - Visit: https://app.netlify.com/
   - Click "Add new site" → "Import an existing project"

2. **Connect GitHub Repository**
   - Select GitHub as your Git provider
   - Choose your repository: `AA7304-MEH/lecturelens`
   - Click "Deploy site"

3. **Build Settings** (auto-detected)
   ```
   Build command: npm run build
   Publish directory: .next
   ```

### Step 2: Environment Variables

Go to **Site settings** → **Environment variables** and add these:

```
GOOGLE_AI_API_KEY
AIzaSyB11ouybVWoJ8cEZjqyvWpQLOXZLV1cVEc

NEXT_PUBLIC_SUPABASE_URL
https://jlftcryoscvofazjmjbm.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZnRjcnlvc2N2b2ZhemptamJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NTMxOTgsImV4cCI6MjA3NDAyOTE5OH0.91hymcNQvOyAJSqHKJ73SzqSD2s3sTLd8KHmuOGhtao
```

### Step 3: Redeploy

After adding environment variables:
1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Deploy site"**

## 🌐 Your Live URL

After deployment, you'll get a URL like: `https://amazing-app-123.netlify.app`

## ✅ Features Enabled

- ✅ **Next.js 15** with Node.js 20
- ✅ **API Routes** properly configured
- ✅ **CORS Headers** for API access
- ✅ **Automatic GitHub Deployment**
- ✅ **Environment Variables** secure
- ✅ **Mobile Responsive** design

## 🔧 Troubleshooting

If build fails:
1. Check environment variables are set correctly
2. Ensure API keys are valid
3. Review build logs in Netlify dashboard

## 🎯 Competition Ready

Your Netlify URL can be submitted for competitions, portfolios, and demos!

---

**🎉 Your LectureLens application is now ready for Netlify deployment!**