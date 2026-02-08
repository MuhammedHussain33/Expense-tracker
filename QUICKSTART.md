# 🚀 Expense Tracker - Quick Start Guide

## 📁 New Project Structure

```
/home/adhwik/Desktop/Learn projects/
├── backend/              ← Spring Boot API (separate project)
├── frontend/             ← React App (separate project)
├── database-setup.sql    ← Run this in Supabase
├── EXPENSE-TRACKER-README.md
├── QUICKSTART.md         ← You are here
└── *.md                  ← Documentation files
```

---

## ⚡ Quick Setup (5 Minutes)

### Step 1: Setup Supabase (2 minutes)

**Your Supabase URL:** `https://lfgskefpkzxecywvylrq.supabase.co`

1. Go to https://supabase.com/dashboard/project/lfgskefpkzxecywvylrq
2. Click **SQL Editor** → **New query**
3. Copy ALL content from: `/home/adhwik/Desktop/Learn projects/database-setup.sql`
4. Paste and click **RUN** ✅

5. Get your credentials:
   - Go to **Settings** → **API**
   - Copy: **anon/public key** (starts with `eyJ...`)
   - Scroll to **JWT Settings** → Copy **JWT Secret**
   - Go to **Settings** → **Database** → Note your **password**

---

### Step 2: Configure Backend (1 minute)

```bash
# Edit the .env file
nano /home/adhwik/Desktop/Learn\ projects/backend/.env
```

Update these 2 values:
- `SUPABASE_DB_PASSWORD=` → Your database password
- `SUPABASE_JWT_SECRET=` → Your JWT secret

Save: Ctrl+O, Enter, Ctrl+X

**Start backend:**
```bash
cd /home/adhwik/Desktop/Learn\ projects/backend
mvn spring-boot:run
```

✅ Should see: "Started ExpenseTrackerApplication on port 8080"

---

### Step 3: Configure Frontend (1 minute)

```bash
# Edit the .env file
nano /home/adhwik/Desktop/Learn\ projects/frontend/.env
```

Update:
- `VITE_SUPABASE_ANON_KEY=` → Your anon/public key

Save: Ctrl+O, Enter, Ctrl+X

**Start frontend:**
```bash
cd /home/adhwik/Desktop/Learn\ projects/frontend
npm run dev
```

✅ Should see: "Local: http://localhost:5173/"

---

### Step 4: Use the App! (1 minute)

1. Open http://localhost:5173
2. Click **Sign Up**
3. Create account: `your-email@example.com` / `password123`
4. Login and add your first transaction! 🎉

---

## 🎯 Your Supabase Info

```
Project URL: https://lfgskefpkzxecywvylrq.supabase.co
Dashboard: https://supabase.com/dashboard/project/lfgskefpkzxecywvylrq

Need to add to .env files:
✅ Backend: Database password + JWT secret
✅ Frontend: Anon/public key
```

---

## 📋 Quick Commands Reference

```bash
# Backend (Terminal 1)
cd /home/adhwik/Desktop/Learn\ projects/backend
mvn spring-boot:run

# Frontend (Terminal 2)
cd /home/adhwik/Desktop/Learn\ projects/frontend
npm run dev

# Edit backend config
nano /home/adhwik/Desktop/Learn\ projects/backend/.env

# Edit frontend config
nano /home/adhwik/Desktop/Learn\ projects/frontend/.env
```

---

## 🐛 Troubleshooting

**Backend won't start?**
- Check database password in `backend/.env`
- Make sure Supabase project is active

**Frontend auth errors?**
- Check anon key in `frontend/.env`
- Make sure it matches Supabase dashboard

**Can't connect?**
- Run `database-setup.sql` in Supabase SQL Editor
- Verify all credentials are correct

---

## ✅ Verification Checklist

- [ ] Ran `database-setup.sql` in Supabase
- [ ] Updated `backend/.env` with password & JWT secret
- [ ] Updated `frontend/.env` with anon key
- [ ] Backend running on port 8080
- [ ] Frontend running on port 5173
- [ ] Can sign up a new user
- [ ] Can login successfully
- [ ] Can add transactions

---

**See SUPABASE-SETUP.md for detailed credential instructions!** 🔧

**Happy Tracking! 💰**
