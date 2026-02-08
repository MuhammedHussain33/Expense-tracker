# 🔗 Frontend .env Configuration Update

## ✅ Updated Local Development File

**File:** `frontend/.env`

**Changed:**
```diff
- VITE_API_BASE_URL=http://localhost:8080
+ VITE_API_BASE_URL=https://expense-tracker-production.up.railway.app
```

---

## 🚨 IMPORTANT: Get Your Actual Railway URL!

The URL I used (`expense-tracker-production.up.railway.app`) is a **placeholder**!

### **How to Get Your Real Railway URL:**

1. Go to **Railway Dashboard**
2. Click your **Expense-tracker** service
3. Click **"Settings"** tab
4. Scroll to **"Networking"** section
5. Click **"Generate Domain"** (if not done)
6. **Copy the domain** shown (e.g., `expense-tracker-production-abc123.up.railway.app`)

### **Update .env with Your Real URL:**

Once you have your Railway URL, update the file:

```bash
cd "/home/adhwik/Desktop/Learn projects"
```

Edit `frontend/.env` and replace with YOUR actual Railway URL:

```env
VITE_API_BASE_URL=https://YOUR-ACTUAL-RAILWAY-URL.up.railway.app
```

---

## 🔄 Restart Frontend Development Server

**IMPORTANT:** Vite needs to reload environment variables!

### **Step 1: Stop the Current Server**

In your terminal where frontend is running:
- Press `Ctrl + C` to stop

### **Step 2: Restart the Server**

```bash
cd "/home/adhwik/Desktop/Learn projects/frontend"
npm run dev
```

**The app will now connect to Railway backend instead of localhost!** ✅

---

## 🌐 For Vercel Deployment

**This local .env file is for development only!**

For production (Vercel), you need to set environment variables in Vercel Dashboard:

1. Go to **Vercel Dashboard**
2. Your project → **Settings**
3. **Environment Variables**
4. Edit `VITE_API_BASE_URL`
5. Set to: `https://your-actual-railway-url.up.railway.app`
6. Click **"Save"**
7. **Redeploy** your app

---

## 📊 Environment Variable Locations

### **Local Development:**
```
File: frontend/.env (this file - for local testing)
Used by: npm run dev
```

### **Production (Vercel):**
```
Location: Vercel Dashboard → Settings → Environment Variables
Used by: Deployed app on Vercel
```

**Both need to be updated with the Railway URL!** ⚠️

---

## ✅ Current Configuration:

**Local Development (.env):**
```env
VITE_SUPABASE_URL=https://lfgskefpkzxecywvylrq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_API_BASE_URL=https://expense-tracker-production.up.railway.app
```

**Vercel Production:**
- Go update in Vercel Dashboard manually
- Set `VITE_API_BASE_URL` to your Railway URL
- Redeploy

---

## 🎯 Next Steps:

### **1. Get Railway Backend URL** (if not done)
- Railway → Settings → Networking → Generate Domain
- Copy the URL

### **2. Update Local .env** (if Railway URL is different)
```bash
# Edit frontend/.env
VITE_API_BASE_URL=https://YOUR-ACTUAL-URL.up.railway.app
```

### **3. Restart Frontend Dev Server**
```bash
cd frontend
# Press Ctrl+C to stop current server
npm run dev
```

### **4. Update Vercel Environment Variable**
- Vercel Dashboard → Settings → Environment Variables
- Update `VITE_API_BASE_URL`
- Redeploy

### **5. Test Everything!**
- Test local: `http://localhost:5173`
- Test production: `https://expense-tracker-delta-sable.vercel.app`

---

## 🆘 Troubleshooting

### Issue: "Failed to fetch" or CORS errors

**Solution:**
1. Verify Railway `CORS_ORIGINS` includes your Vercel URL
2. Restart Railway service
3. Check backend logs for CORS errors

### Issue: "Network Error" or "ERR_CONNECTION_REFUSED"

**Solution:**
1. Verify Railway backend is running
2. Check Railway logs for errors
3. Verify `VITE_API_BASE_URL` is correct
4. No typos in the URL

### Issue: Changes not reflecting

**Solution:**
1. Stop frontend dev server (Ctrl+C)
2. Clear browser cache
3. Restart: `npm run dev`
4. Hard refresh browser (Ctrl+Shift+R)

---

## ✅ Checklist:

```
✅ Updated frontend/.env with Railway URL
□ Get actual Railway URL from dashboard
□ Replace placeholder URL with real URL
□ Restart frontend dev server
□ Update Vercel environment variable
□ Redeploy Vercel
□ Test local development
□ Test production deployment
```

---

## 🚀 You're Almost Done!

**Current Status:**
```
✅ Frontend .env updated (placeholder URL)
⏳ Need: Real Railway URL
⏳ Need: Restart dev server
⏳ Need: Update Vercel
```

**Once Railway deployment completes:**
1. Get the URL
2. Update both .env files (local and Vercel)
3. Restart/redeploy
4. **DONE!** 🎉

---

**Good luck!** 💪
