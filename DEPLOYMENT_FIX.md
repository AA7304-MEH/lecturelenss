# 🔧 Quick Deployment Fix

## Problem
Error: Environment Variable "GOOGLE_AI_API_KEY" references Secret "google-ai-api-key", which does not exist.

## ✅ Solution

### Method 1: Remove Vercel Secret References (Recommended)

The issue is in `vercel.json` using `@secret-name` syntax, but we haven't created Vercel secrets. Let's use direct environment variables instead:

1. **Remove the `env` section from vercel.json** or set environment variables directly in Vercel dashboard

2. **Go to Vercel Dashboard**:
   - Visit your project: https://vercel.com/dashboard
   - Go to: Settings → Environment Variables

3. **Add these environment variables directly**:

   ```
   GOOGLE_AI_API_KEY = AIzaSyB11ouybVWoJ8cEZjqyvWpQLOXZLV1cVEc
   NEXT_PUBLIC_SUPABASE_URL = https://jlftcryoscvofazjmjbm.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZnRjcnlvc2N2b2ZhemptamJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NTMxOTgsImV4cCI6MjA3NDAyOTE5OH0.91hymcNQvOyAJSqHKJ73SzqSD2s3sTLd8KHmuOGhtao
   ```

4. **Make sure to check all environments**: Production, Preview, Development

5. **Redeploy**: Click "Redeploy" button or push a new commit

### Method 2: Alternative - Remove env section entirely

You can also remove the entire `env` section from `vercel.json` since we'll set variables directly in dashboard.

## 🚀 Quick Steps

1. Go to Vercel project settings
2. Add the 3 environment variables above
3. Select all environments (Production, Preview, Development)
4. Click "Save"
5. Go to Deployments tab
6. Click "Redeploy" on latest deployment

Your deployment should work perfectly after this fix! 🎉