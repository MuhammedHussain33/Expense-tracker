# 🚀 Deploy Now: Vercel + Railway Step-by-Step

## 📋 **What You'll Need:**
- ✅ GitHub account (you have this!)
- ⏳ Vercel account (we'll create)
- ⏳ Railway account (we'll create)
- ⏱️ Time: 20-30 minutes

---

## 🎨 **PART 1: Deploy Frontend to Vercel (10 minutes)**

### **Step 1: Create Vercel Account**

1. **Go to:** https://vercel.com/signup
2. **Click:** "Continue with GitHub"
3. **Authorize Vercel** to access your repositories
4. Done! You're logged in ✅

### **Step 2: Import Your Project**

1. **Go to:** https://vercel.com/new
2. You'll see: "Import Git Repository"
3. **Click:** "Import" next to `MuhammedHussain33/Expense-tracker`
4. If you don't see it, click "Add GitHub Account" and authorize

### **Step 3: Configure Project**

**Important Settings:**

```
Project Name: expense-tracker (or your choice)
Framework Preset: Vite
Root Directory: frontend  ← IMPORTANT!
Build Command: npm run build (auto-detected)
Output Directory: dist (auto-detected)
Install Command: npm install (auto-detected)
```

**Screenshot Reference:**
```
┌─────────────────────────────────────────┐
│ Configure Project                       │
├─────────────────────────────────────────┤
│ Project Name: [expense-tracker]         │
│ Framework: [Vite ▼]                    │
│ Root Directory: [frontend/] ← CHANGE!  │
│ Build Command: npm run build           │
│ Output Directory: dist                 │
│ Install Command: npm install           │
└─────────────────────────────────────────┘
```

### **Step 4: Add Environment Variables**

**CRITICAL STEP!** Click "Environment Variables" section:

Add these 3 variables:

**Variable 1:**
```
Name: VITE_SUPABASE_URL
Value: https://lfgskefpkzxecywvylrq.supabase.co
```

**Variable 2:**
```
Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZ3NrZWZwa3p4ZWN5d3Z5bHJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0NzEzMTUsImV4cCI6MjA4NjA0NzMxNX0.CxPimdq6AXK4QnTO2shE-o6gB4BVy05Dzz7ZsIAgIcE
```

**Variable 3:**
```
Name: VITE_API_BASE_URL
Value: (leave empty for now - we'll add backend URL later)
```

**How to add:**
1. Click "+ Add Environment Variable"
2. Enter Name and Value
3. Select "Production, Preview, and Development"
4. Click "Add"
5. Repeat for all 3 variables

### **Step 5: Deploy!**

1. **Click:** "Deploy" button (bottom of page)
2. **Wait:** 2-5 minutes for build
3. **Watch:** Build logs (shows progress)
4. **Success:** You'll see "Congratulations! 🎉"

### **Step 6: Get Your Frontend URL**

After deployment:
```
Your URL: https://expense-tracker-[random].vercel.app

Example: https://expense-tracker-abc123.vercel.app
```

**Copy this URL!** You'll need it for Railway.

### **Step 7: Test Frontend**

1. Click "Visit" button or your URL
2. Should see your login page
3. Animated logo should appear ✨
4. **Note:** Backend won't work yet (we haven't deployed it)

---

## 🖥️ **PART 2: Deploy Backend to Railway (15 minutes)**

### **Step 1: Create Railway Account**

1. **Go to:** https://railway.app
2. **Click:** "Login" (top right)
3. **Click:** "Login with GitHub"
4. **Authorize Railway** to access repositories
5. Done! You're logged in ✅

### **Step 2: Create New Project**

1. **Dashboard:** Click "New Project"
2. **Select:** "Deploy from GitHub repo"
3. **Find:** `MuhammedHussain33/Expense-tracker`
4. **Click:** on the repository
5. Railway will start analyzing...

### **Step 3: Configure Service**

Railway will create a service. Now configure it:

1. **Click:** on your service (shows "expense-tracker")
2. **Go to:** "Settings" tab
3. **Scroll to:** "Build & Deploy"

**Root Directory:**
```
backend
```

**Build Command:**
```
mvn clean install -DskipTests
```

**Start Command:**
```
java -jar target/expense-tracker-0.0.1-SNAPSHOT.jar
```

Click "Save" after each change.

### **Step 4: Add Environment Variables**

**CRITICAL!** Click "Variables" tab:

Add these 7 variables (click "+ New Variable" for each):

**Variable 1:**
```
Name: PORT
Value: 8080
```

**Variable 2:**
```
Name: SUPABASE_DB_URL
Value: jdbc:postgresql://db.lfgskefpkzxecywvylrq.supabase.co:5432/postgres
```

**Variable 3:**
```
Name: SUPABASE_DB_USER
Value: postgres
```

**Variable 4:**
```
Name: SUPABASE_DB_PASSWORD
Value: pRRiyqDVQTSx9EfL
```

**Variable 5:**
```
Name: SUPABASE_JWT_SECRET
Value: sb_publishable_bioVXjNQ5Qh4fqN2WxjnnA_4I62q_-S
```

**Variable 6:**
```
Name: SUPABASE_URL
Value: https://lfgskefpkzxecywvylrq.supabase.co
```

**Variable 7:**
```
Name: CORS_ORIGINS
Value: [YOUR VERCEL URL]
```
For CORS_ORIGINS, use your Vercel URL from Part 1, Step 6.
Example: `https://expense-tracker-abc123.vercel.app`

**Important:** Make sure to add your actual Vercel URL, not the example!

### **Step 5: Generate Domain**

1. **Go to:** "Settings" tab
2. **Scroll to:** "Networking" section
3. **Click:** "Generate Domain"
4. Railway will create a URL like: `expense-tracker-production.up.railway.app`
5. **Copy this URL!** You'll need it for frontend

### **Step 6: Deploy Backend**

1. **Go to:** "Deployments" tab
2. Railway should auto-deploy
3. **Wait:** 5-10 minutes for Maven build
4. **Watch:** Build logs (click on deployment to see logs)
5. **Look for:** "Started ExpenseTrackerApplication" in logs
6. **Success:** Status shows "Success" with green checkmark ✅

### **Step 7: Test Backend**

Test the backend is working:

**In browser, visit:**
```
https://your-backend.up.railway.app/actuator/health
```

Should show:
```json
{"status":"UP"}
```

If you see this, backend is running! ✅

---

## 🔗 **PART 3: Connect Frontend to Backend (5 minutes)**

### **Step 1: Update Frontend Environment Variable**

1. **Go to:** https://vercel.com/dashboard
2. **Click:** your `expense-tracker` project
3. **Go to:** Settings → Environment Variables
4. **Find:** `VITE_API_BASE_URL`
5. **Click:** "Edit" (pencil icon)
6. **Update Value:** Your Railway URL
   ```
   https://your-backend.up.railway.app
   ```
7. **Click:** "Save"

### **Step 2: Redeploy Frontend**

1. **Go to:** Deployments tab
2. **Click:** "..." menu on latest deployment
3. **Click:** "Redeploy"
4. **Wait:** 2 minutes
5. Done! ✅

### **Step 3: Update Backend CORS**

1. **Go to:** Railway dashboard
2. **Click:** your service
3. **Variables** tab
4. **Edit:** `CORS_ORIGINS`
5. **Update:** Make sure it has your Vercel URL
6. Railway will auto-redeploy

---

## 🎯 **PART 4: Update Supabase URLs**

### **Step 1: Update Allowed URLs**

1. **Go to:** https://supabase.com/dashboard/project/lfgskefpkzxecywvylrq
2. **Navigate:** Authentication → URL Configuration
3. **Site URL:** Add your Vercel URL
4. **Redirect URLs:** Add:
   ```
   https://your-app.vercel.app/**
   http://localhost:5173/**
   ```
5. **Click:** "Save"

---

## ✅ **PART 5: Test Your Live App!**

### **Test Checklist:**

Visit your Vercel URL: `https://your-app.vercel.app`

```
□ Page loads (animated logo appears)
□ Login form works
□ Create account (sign up)
□ Login successful
□ Dashboard loads
□ Summary cards show (Income/Expense/Balance)
□ Add transaction works
□ View transactions
□ Download PDF works
□ Settings page loads
□ Change password works
□ OTP login works (if enabled)
□ Sign out works
```

If all these work: **🎉 CONGRATULATIONS! YOUR APP IS LIVE!**

---

## 🌐 **Your Live URLs:**

```
Frontend: https://your-app.vercel.app
Backend: https://your-backend.railway.app
Repository: https://github.com/MuhammedHussain33/Expense-tracker
```

---

## 🐛 **Troubleshooting:**

### **Issue 1: Frontend shows "Failed to fetch"**

**Solution:**
- Check `VITE_API_BASE_URL` in Vercel
- Verify it points to Railway URL (with HTTPS)
- Redeploy frontend after updating

### **Issue 2: CORS Error**

**Solution:**
- Check `CORS_ORIGINS` in Railway
- Must include your Vercel URL
- Must use HTTPS (not HTTP)
- No trailing slash
- Example: `https://expense-tracker-abc123.vercel.app`

### **Issue 3: Backend not starting**

**Solution:**
- Check Railway logs (Deployments → Click deployment → View Logs)
- Look for errors
- Verify all environment variables are set
- Check database connection

### **Issue 4: Login doesn't work**

**Solution:**
- Update Supabase allowed URLs
- Include your Vercel URL
- Check browser console for errors
- Verify Supabase credentials in Railway

### **Issue 5: OTP emails not arriving**

**Solution:**
- Check Supabase → Authentication → Providers → Email
- Ensure "Enable Email OTP" is checked
- Check spam folder
- Wait a few minutes for email delivery

---

## 📊 **Deployment Summary:**

```
Time Spent:
├─ Vercel Setup: 10 minutes
├─ Railway Setup: 15 minutes
├─ Connecting: 5 minutes
└─ Total: 30 minutes ✅

Services Used:
├─ Vercel (Frontend) - FREE ✅
├─ Railway (Backend) - $5 credit/month ✅
├─ Supabase (Database) - FREE ✅
└─ GitHub (Code) - FREE ✅

Total Cost: $0-5/month
```

---

## 🎉 **Success! What's Next?**

### **1. Share Your App:**
```
Share: https://your-app.vercel.app
LinkedIn: Add to profile
Portfolio: Add to portfolio site
Resume: List the project
```

### **2. Monitor Your App:**
```
Vercel Analytics: Monitor traffic
Railway Metrics: Monitor backend health
Supabase Dashboard: Monitor database
```

### **3. Custom Domain (Optional):**
```
Buy domain: namecheap.com, domains.google
Add to Vercel: Settings → Domains
Add to Railway: Settings → Domains
Update DNS: Follow instructions
```

### **4. Keep Improving:**
```
Add features: Charts, dark mode, etc.
Fix bugs: Monitor error logs
Optimize: Improve performance
Update: Keep dependencies current
```

---

## 🆘 **Need Help?**

1. **Check logs:**
   - Vercel: Deployments → Click → Function Logs
   - Railway: Deployments → Click → View Logs

2. **Review docs:**
   - Vercel: https://vercel.com/docs
   - Railway: https://docs.railway.app
   - Supabase: https://supabase.com/docs

3. **Common issues:**
   - See DEPLOYMENT_GUIDE.md
   - See ERROR_429_GUIDE.md
   - See FIX_NO_API_KEY.md

---

## ✅ **Final Checklist:**

```
□ Vercel account created
□ Frontend deployed to Vercel
□ Frontend URL copied
□ Railway account created
□ Backend deployed to Railway
□ Backend URL copied
□ Environment variables set (both services)
□ CORS configured
□ Supabase URLs updated
□ Frontend redeployed with backend URL
□ Tested login
□ Tested transactions
□ Tested all features
□ Shared with friends! 🎉
```

---

**You're ready! Start with Part 1 (Vercel) now!** 🚀

**Go to:** https://vercel.com/signup
