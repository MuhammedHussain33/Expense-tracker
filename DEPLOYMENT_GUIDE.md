# 🚀 Complete Deployment Guide - Expense Tracker

## 📋 **Overview**

Your Expense Tracker has 3 components:
1. **Frontend** (React + Vite) → Deploy to Vercel/Netlify
2. **Backend** (Spring Boot) → Deploy to Railway/Render
3. **Database** (Supabase) → Already hosted! ✅

---

## 🎯 **Deployment Plan**

```
┌─────────────────────────────────────────────────┐
│  Frontend (React)                               │
│  ├─ Vercel (Recommended) ✨                     │
│  └─ Netlify (Alternative)                       │
└─────────────────────────────────────────────────┘
         │
         │ API Calls
         ▼
┌─────────────────────────────────────────────────┐
│  Backend (Spring Boot)                          │
│  ├─ Railway (Recommended) ✨                    │
│  ├─ Render (Alternative)                        │
│  └─ AWS/DigitalOcean (Advanced)                 │
└─────────────────────────────────────────────────┘
         │
         │ Database Queries
         ▼
┌─────────────────────────────────────────────────┐
│  Database (Supabase)                            │
│  ✅ Already Hosted!                             │
└─────────────────────────────────────────────────┘
```

---

## 📦 **Part 1: Prepare Your Project**

### **Step 1: Create Git Repository**

```bash
cd /home/adhwik/Desktop/Learn\ projects

# Initialize git (if not already done)
git init

# Create .gitignore
cat > .gitignore << 'EOF'
# Frontend
frontend/node_modules/
frontend/dist/
frontend/.env
frontend/.env.local

# Backend
backend/target/
backend/.env
backend/.DS_Store
backend/*.log

# IDEs
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
EOF

# Add all files
git add .

# Commit
git commit -m "Initial commit - Expense Tracker with OTP auth"
```

### **Step 2: Create GitHub Repository**

1. Go to: https://github.com/new
2. Repository name: `expense-tracker-app`
3. Description: "Full-stack expense tracker with OTP authentication"
4. Public or Private: Your choice
5. Click "Create repository"

### **Step 3: Push to GitHub**

```bash
# Add remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/expense-tracker-app.git

# Push
git branch -M main
git push -u origin main
```

---

## 🎨 **Part 2: Deploy Frontend (Vercel)**

### **Why Vercel?**
- ✅ Free tier (perfect for this project)
- ✅ Automatic deployments from GitHub
- ✅ Built-in CI/CD
- ✅ Fast CDN
- ✅ Zero configuration for Vite/React

### **Step 1: Sign Up for Vercel**

1. Go to: https://vercel.com/signup
2. Sign up with GitHub
3. Authorize Vercel to access your repositories

### **Step 2: Import Project**

1. Click "New Project"
2. Select your repository: `expense-tracker-app`
3. Click "Import"

### **Step 3: Configure Build Settings**

```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### **Step 4: Add Environment Variables**

In Vercel dashboard → Settings → Environment Variables:

```
VITE_SUPABASE_URL=https://lfgskefpkzxecywvylrq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZ3NrZWZwa3p4ZWN5d3Z5bHJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0NzEzMTUsImV4cCI6MjA4NjA0NzMxNX0.CxPimdq6AXK4QnTO2shE-o6gB4BVy05Dzz7ZsIAgIcE
VITE_API_BASE_URL=https://your-backend-url.railway.app
```

**Note:** Leave `VITE_API_BASE_URL` empty for now. We'll update it after deploying backend.

### **Step 5: Deploy**

1. Click "Deploy"
2. Wait 2-3 minutes
3. Your frontend will be live at: `https://your-app.vercel.app`

---

## 🖥️ **Part 3: Deploy Backend (Railway)**

### **Why Railway?**
- ✅ Free tier ($5 credit/month)
- ✅ Easy Java/Spring Boot deployment
- ✅ PostgreSQL support
- ✅ Automatic HTTPS
- ✅ Environment variables

### **Step 1: Prepare Backend for Deployment**

#### **Create `railway.json` in backend folder:**

```bash
cd backend
cat > railway.json << 'EOF'
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "java -jar target/expense-tracker-0.0.1-SNAPSHOT.jar",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
EOF
```

#### **Update `application.properties`:**

Add these lines to handle production:

```properties
# Server Configuration
server.port=${PORT:8080}
spring.datasource.url=${SUPABASE_DB_URL:jdbc:postgresql://localhost:5432/postgres}
spring.datasource.username=${SUPABASE_DB_USER:postgres}
spring.datasource.password=${SUPABASE_DB_PASSWORD}

# CORS Configuration
cors.allowed.origins=${CORS_ORIGINS:http://localhost:5173}

# JWT Configuration
jwt.secret=${SUPABASE_JWT_SECRET}

# Supabase Configuration
supabase.url=${SUPABASE_URL:https://lfgskefpkzxecywvylrq.supabase.co}
supabase.key=${SUPABASE_ANON_KEY}
```

#### **Update `pom.xml` - Add Railway-specific configuration:**

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <executable>true</executable>
            </configuration>
        </plugin>
    </plugins>
    <finalName>expense-tracker</finalName>
</build>
```

### **Step 2: Sign Up for Railway**

1. Go to: https://railway.app
2. Sign up with GitHub
3. Authorize Railway

### **Step 3: Create New Project**

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose: `expense-tracker-app`
4. Railway will auto-detect Spring Boot

### **Step 4: Configure Build Settings**

1. Click on your service
2. Settings → Build & Deploy:

```
Build Command: cd backend && mvn clean install -DskipTests
Start Command: cd backend && java -jar target/expense-tracker-0.0.1-SNAPSHOT.jar
```

### **Step 5: Add Environment Variables**

In Railway → Variables:

```
PORT=8080
SUPABASE_DB_URL=jdbc:postgresql://db.lfgskefpkzxecywvylrq.supabase.co:5432/postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=pRRiyqDVQTSx9EfL
SUPABASE_JWT_SECRET=sb_publishable_bioVXjNQ5Qh4fqN2WxjnnA_4I62q_-S
CORS_ORIGINS=https://your-app.vercel.app,http://localhost:5173
SUPABASE_URL=https://lfgskefpkzxecywvylrq.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZ3NrZWZwa3p4ZWN5d3Z5bHJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0NzEzMTUsImV4cCI6MjA4NjA0NzMxNX0.CxPimdq6AXK4QnTO2shE-o6gB4BVy05Dzz7ZsIAgIcE
```

### **Step 6: Deploy**

1. Click "Deploy"
2. Wait 5-10 minutes for build
3. Your backend will be live at: `https://your-backend.railway.app`

### **Step 7: Enable Public Domain**

1. Settings → Networking
2. Click "Generate Domain"
3. Copy the URL (e.g., `expense-tracker-backend.up.railway.app`)

---

## 🔗 **Part 4: Connect Frontend to Backend**

### **Step 1: Update Frontend Environment Variables**

Go back to Vercel:
1. Settings → Environment Variables
2. Update `VITE_API_BASE_URL`:

```
VITE_API_BASE_URL=https://your-backend.railway.app
```

### **Step 2: Redeploy Frontend**

1. Vercel → Deployments
2. Click "..." on latest deployment
3. Click "Redeploy"
4. Or push a new commit to trigger auto-deploy

### **Step 3: Update CORS in Backend**

Update Railway environment variable:

```
CORS_ORIGINS=https://your-app.vercel.app
```

Redeploy backend.

---

## ✅ **Part 5: Test Your Deployment**

### **Step 1: Test Frontend**

Visit: `https://your-app.vercel.app`

Expected:
- ✅ Login page loads
- ✅ Animated logo appears
- ✅ UI looks correct
- ✅ No console errors

### **Step 2: Test Backend Connection**

1. Try to login
2. Check browser console (F12)
3. Look for API calls to Railway URL
4. Should see 200 responses

### **Step 3: Test Full Flow**

```
1. Sign Up:
   ✅ Create account
   ✅ Redirect to dashboard

2. Dashboard:
   ✅ See summary cards
   ✅ Animated logo visible
   ✅ Navigation works

3. Add Transaction:
   ✅ Create income/expense
   ✅ See Mustache messages
   ✅ PDF download works

4. Settings:
   ✅ View profile
   ✅ Change password
   ✅ See all tabs

5. OTP Login:
   ✅ Send OTP email
   ✅ Receive email
   ✅ Login with code
```

---

## 🔧 **Part 6: Update Supabase Configuration**

### **Update Allowed URLs in Supabase**

1. Go to: https://supabase.com/dashboard
2. Your project → Authentication → URL Configuration
3. Add your production URLs:

**Site URL:**
```
https://your-app.vercel.app
```

**Redirect URLs:**
```
https://your-app.vercel.app/**
http://localhost:5173/**
```

**Additional Allowed URLs:**
```
https://your-app.vercel.app
https://your-backend.railway.app
```

---

## 📊 **Part 7: Custom Domain (Optional)**

### **For Frontend (Vercel):**

1. Buy domain (e.g., expensetracker.com)
2. Vercel → Settings → Domains
3. Add your domain
4. Update DNS records as shown
5. Wait for DNS propagation (5 minutes - 48 hours)

### **For Backend (Railway):**

1. Railway → Settings → Domains
2. Add custom domain
3. Update DNS records
4. Update CORS to include new domain

---

## 🐛 **Troubleshooting**

### **Issue 1: Frontend can't connect to backend**

**Error:** `Failed to fetch` or `CORS error`

**Solution:**
1. Check `VITE_API_BASE_URL` in Vercel
2. Verify CORS_ORIGINS in Railway includes your Vercel URL
3. Make sure both URLs use HTTPS
4. Check Railway logs for errors

### **Issue 2: Backend won't start**

**Error:** `Application failed to start`

**Solution:**
1. Check Railway logs (View Logs)
2. Verify all environment variables are set
3. Check database connection
4. Ensure `pom.xml` is correct

### **Issue 3: OTP emails not sending**

**Solution:**
1. Check Supabase → Authentication → Email Templates
2. Verify Supabase SMTP is configured
3. Check Supabase logs
4. Ensure email provider allows sending

### **Issue 4: "Invalid JWT" error**

**Solution:**
1. Verify `SUPABASE_JWT_SECRET` matches in backend
2. Check if secret is correct format
3. Try regenerating JWT secret in Supabase

---

## 💰 **Cost Breakdown**

### **Free Tier (Recommended for Start):**

| Service | Free Tier | Limits |
|---------|-----------|--------|
| **Vercel** | ✅ Free | Unlimited sites, 100GB bandwidth |
| **Railway** | $5 credit/month | ~500 hours runtime |
| **Supabase** | ✅ Free | 500MB database, 2GB bandwidth |
| **GitHub** | ✅ Free | Unlimited public repos |
| **Total** | **$0-5/month** | Perfect for personal use |

### **Paid Tier (If You Grow):**

| Service | Paid Tier | Cost |
|---------|-----------|------|
| **Vercel Pro** | More bandwidth | $20/month |
| **Railway** | More credits | $20/month |
| **Supabase Pro** | More storage | $25/month |
| **Total** | **$65/month** | For production apps |

---

## 🚀 **Quick Deployment Checklist**

```
□ Push code to GitHub
□ Deploy frontend to Vercel
□ Add frontend environment variables
□ Deploy backend to Railway
□ Add backend environment variables
□ Update CORS configuration
□ Update Supabase URLs
□ Test login flow
□ Test transactions
□ Test OTP authentication
□ Test PDF download
□ Test all features
□ Share your live app! 🎉
```

---

## 🎯 **Alternative Hosting Options**

### **Frontend Alternatives:**

**1. Netlify**
```
Pros: Free, easy, continuous deployment
Cons: Similar to Vercel, no major advantage
```

**2. GitHub Pages**
```
Pros: Free, integrated with GitHub
Cons: Static only, need custom backend URL
```

**3. AWS Amplify**
```
Pros: Scalable, AWS ecosystem
Cons: More complex, steeper learning curve
```

### **Backend Alternatives:**

**1. Render**
```
Pros: Free tier, easy Java deployment
Cons: Cold starts on free tier
Deploy: Similar to Railway
```

**2. Heroku**
```
Pros: Popular, many resources
Cons: No free tier anymore ($7/month minimum)
```

**3. DigitalOcean App Platform**
```
Pros: Reliable, good performance
Cons: $5/month minimum
```

**4. AWS Elastic Beanstalk**
```
Pros: Scalable, professional
Cons: Complex setup, not beginner-friendly
```

---

## 📝 **Post-Deployment Tasks**

### **1. Setup Monitoring**

**Vercel:**
- Analytics → Enable Web Analytics
- Monitor page views, performance

**Railway:**
- Observability → View Metrics
- Monitor CPU, memory, requests

**Supabase:**
- Reports → Database Health
- Monitor queries, storage

### **2. Setup Backups**

**Database:**
1. Supabase → Database → Backups
2. Enable automatic backups
3. Schedule daily backups

### **3. Add Error Tracking**

Consider adding:
- Sentry (error tracking)
- LogRocket (session replay)
- Google Analytics (user tracking)

### **4. Performance Optimization**

- Enable caching in Vercel
- Optimize images
- Minify assets
- Enable compression

---

## 🎉 **Success! Your App is Live!**

### **Your Live URLs:**

```
Frontend: https://your-app.vercel.app
Backend: https://your-backend.railway.app
Database: Supabase (already hosted)
GitHub: https://github.com/USERNAME/expense-tracker-app
```

### **Share Your App:**

```
📱 Direct Link: https://your-app.vercel.app
🔐 Features:
   ✨ Animated Logo
   🔐 OTP Authentication
   💰 Expense Tracking
   📊 PDF Reports
   ⚙️ Settings Page
   🎨 Beautiful UI
```

---

## 📚 **Additional Resources**

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Supabase Docs: https://supabase.com/docs
- Spring Boot Deployment: https://spring.io/guides/gs/spring-boot-docker/

---

## 🆘 **Need Help?**

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test locally first
4. Check CORS configuration
5. Review this guide again

---

**Ready to deploy? Let's start with Step 1!** 🚀
