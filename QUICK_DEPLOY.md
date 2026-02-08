# 🚀 Quick Deployment Steps

## ⚡ **Super Fast Deploy (15 Minutes)**

### **Step 1: Push to GitHub (2 min)**
```bash
cd "/home/adhwik/Desktop/Learn projects"
git init
git add .
git commit -m "Initial commit - Expense Tracker"

# Create repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/expense-tracker.git
git push -u origin main
```

### **Step 2: Deploy Frontend to Vercel (5 min)**

1. **Go to:** https://vercel.com/new
2. **Import** your GitHub repo
3. **Root Directory:** `frontend`
4. **Framework:** Vite
5. **Add Environment Variables:**
   ```
   VITE_SUPABASE_URL=https://lfgskefpkzxecywvylrq.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZ3NrZWZwa3p4ZWN5d3Z5bHJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0NzEzMTUsImV4cCI6MjA4NjA0NzMxNX0.CxPimdq6AXK4QnTO2shE-o6gB4BVy05Dzz7ZsIAgIcE
   VITE_API_BASE_URL=(leave empty for now)
   ```
6. **Deploy!**

### **Step 3: Deploy Backend to Railway (8 min)**

1. **Go to:** https://railway.app
2. **New Project** → Deploy from GitHub
3. **Add Environment Variables:**
   ```
   PORT=8080
   SUPABASE_DB_URL=jdbc:postgresql://db.lfgskefpkzxecywvylrq.supabase.co:5432/postgres
   SUPABASE_DB_USER=postgres
   SUPABASE_DB_PASSWORD=pRRiyqDVQTSx9EfL
   SUPABASE_JWT_SECRET=sb_publishable_bioVXjNQ5Qh4fqN2WxjnnA_4I62q_-S
   CORS_ORIGINS=https://your-vercel-url.vercel.app
   ```
4. **Settings** → Generate Domain
5. Copy backend URL

### **Step 4: Connect Them**

1. Go back to **Vercel**
2. **Settings** → Environment Variables
3. Update `VITE_API_BASE_URL` with your Railway URL
4. **Redeploy**

### **Step 5: Update Supabase**

1. **Supabase Dashboard** → Authentication → URL Configuration
2. Add your Vercel URL to allowed URLs
3. Done! ✅

---

## 🎯 **Your Live App:**

```
Frontend: https://your-app.vercel.app
Backend: https://your-backend.railway.app
```

---

## 🆘 **Common Issues:**

### CORS Error?
- Update `CORS_ORIGINS` in Railway to include your Vercel URL
- Redeploy backend

### Frontend can't find backend?
- Check `VITE_API_BASE_URL` in Vercel
- Make sure it points to Railway URL with HTTPS

### OTP not working?
- Update Supabase allowed URLs
- Check email settings in Supabase

---

## ✅ **Checklist:**

- [ ] Code on GitHub
- [ ] Frontend on Vercel
- [ ] Backend on Railway
- [ ] Environment variables set
- [ ] Supabase URLs updated
- [ ] CORS configured
- [ ] Test login
- [ ] Test OTP
- [ ] Test transactions
- [ ] Share your app! 🎉

---

**Full Guide:** See `DEPLOYMENT_GUIDE.md` for detailed instructions.
