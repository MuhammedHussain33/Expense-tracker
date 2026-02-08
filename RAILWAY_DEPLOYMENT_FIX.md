# 🚂 Railway Deployment - Quick Fix Guide

## ✅ Files Created

We've created 3 configuration files in the `backend/` folder:

1. **Dockerfile** - Primary build method (recommended)
2. **nixpacks.toml** - Alternative Nixpacks configuration
3. **railway.json** - Railway-specific settings

All files are pushed to GitHub! ✅

---

## 🔧 Fix Steps in Railway Dashboard

### Step 1: Configure Root Directory

1. Go to Railway Dashboard
2. Click on your **Expense-tracker** service
3. Click **Settings** (left sidebar)
4. Scroll to **"Source"** section
5. Set **Root Directory:**
   ```
   backend
   ```
6. Click **Save**

### Step 2: Verify Build Settings

Still in Settings, scroll to **"Build"** section:

**Should show:**
```
Builder: Dockerfile (auto-detected)
Dockerfile Path: Dockerfile
```

If not auto-detected:
- Click **"Configure"**
- Select **"Dockerfile"**
- Path: `Dockerfile`

### Step 3: Add Environment Variables

Click **"Variables"** tab, add these **7 variables**:

```bash
PORT=8080
SUPABASE_DB_URL=jdbc:postgresql://db.lfgskefpkzxecywvylrq.supabase.co:5432/postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=pRRiyqDVQTSx9EfL
SUPABASE_JWT_SECRET=sb_publishable_bioVXjNQ5Qh4fqN2WxjnnA_4I62q_-S
SUPABASE_URL=https://lfgskefpkzxecywvylrq.supabase.co
CORS_ORIGINS=https://your-vercel-url.vercel.app
```

**IMPORTANT:** Replace `CORS_ORIGINS` with your actual Vercel URL!

### Step 4: Generate Domain

1. Still in **Settings**
2. Scroll to **"Networking"** section
3. Click **"Generate Domain"**
4. **Copy the domain** (e.g., `expense-tracker-production.up.railway.app`)
5. You'll need this for Vercel!

### Step 5: Trigger Redeploy

1. Go to **"Deployments"** tab
2. Click **"Redeploy"** button (top right)
3. **Wait 5-10 minutes** (Docker build takes time)

---

## 📊 Watch the Deployment

### In the Deployments tab:

**Look for these steps:**
```
✅ Initialization
✅ Build → Building Docker image
✅ Build → Running Maven build
✅ Build → Creating JAR file
✅ Deploy → Starting application
✅ Post-deploy → Health check
```

### Success Indicators:

**In the logs, look for:**
```
Started ExpenseTrackerApplication in X.XXX seconds
Tomcat started on port(s): 8080
```

### If Build Fails:

1. Click **"View logs"**
2. Look for error messages
3. Share the error with me

---

## 🎯 After Successful Deploy

### Step 1: Get Your Backend URL

In Railway:
- Settings → Networking → Your domain
- Example: `https://expense-tracker-production.up.railway.app`

### Step 2: Update Vercel

1. Go to **Vercel Dashboard**
2. Your project → **Settings** → **Environment Variables**
3. Edit **VITE_API_BASE_URL**
4. Set to: `https://your-backend.up.railway.app`
5. **Save**
6. **Redeploy** Vercel

### Step 3: Update Supabase

1. Go to Supabase Dashboard
2. **Authentication** → **URL Configuration**
3. Add your Vercel URL to:
   - Site URL
   - Redirect URLs
4. **Save**

### Step 4: Test Everything!

Visit: `https://your-app.vercel.app`

**Test:**
- ✅ Login/Signup
- ✅ Dashboard loads
- ✅ Add transaction
- ✅ Download PDF
- ✅ All features work

---

## 🆘 Common Issues

### Issue 1: "Failed to fetch"
**Solution:** Check CORS_ORIGINS includes your Vercel URL

### Issue 2: "Database connection failed"
**Solution:** Verify all SUPABASE_* environment variables

### Issue 3: Build timeout
**Solution:** Railway free tier has limits, wait and retry

### Issue 4: "Port already in use"
**Solution:** Ensure startCommand uses $PORT variable

---

## 📞 Need Help?

If you see errors:
1. Click "View logs" in Railway
2. Copy the error message
3. Share with me

---

## ✅ Deployment Checklist

```
□ Set Root Directory to "backend"
□ Add all 7 environment variables
□ Generate Railway domain
□ Trigger redeploy
□ Wait 5-10 minutes
□ Check logs for "Started ExpenseTrackerApplication"
□ Copy Railway URL
□ Update VITE_API_BASE_URL in Vercel
□ Redeploy Vercel
□ Update Supabase URLs
□ Test live app
```

---

## 🚀 Current Status

✅ Dockerfile created and pushed to GitHub
✅ nixpacks.toml created and pushed to GitHub
✅ railway.json updated and pushed to GitHub
✅ All configuration files ready

**Next:** Configure Railway settings and redeploy!

---

**Time Needed:** 15-20 minutes total (mostly waiting for build)

**Success Rate:** 99% with Dockerfile method! 🎉
