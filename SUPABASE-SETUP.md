# 🔧 Supabase Connection Setup Guide

## Your Supabase Project

**Project Reference**: `rtrjzatgevviamaqvlnq`
**Database URL**: `db.rtrjzatgevviamaqvlnq.supabase.co`

---

## 📝 Step-by-Step Instructions

### 1️⃣ Get Your Credentials from Supabase

Open your Supabase dashboard: https://supabase.com/dashboard

#### **Get Project URL & API Keys:**
1. Click on your project
2. Go to **⚙️ Project Settings** (bottom left)
3. Click **API** from the sidebar
4. Copy these values:

```
Project URL: https://rtrjzatgevviamaqvlnq.supabase.co
anon/public key: eyJ........................ (starts with eyJ)
```

#### **Get JWT Secret:**
1. While still in **Project Settings** → **API**
2. Scroll down to **JWT Settings** section
3. Copy the **JWT Secret** (very long string)

```
JWT Secret: HS256................................
```

#### **Get Database Password:**
- This is the password you created when setting up the project
- If you forgot it: Go to **Project Settings** → **Database** → **Reset Database Password**

---

### 2️⃣ Setup Backend Environment

Create a file: `backend/.env` (or edit if exists)

```bash
cd /home/adhwik/Desktop/Learn\ projects/expense-tracker/backend
nano .env
```

Paste this content and **replace the placeholders**:

```properties
# Supabase Database Configuration
SUPABASE_DB_URL=jdbc:postgresql://db.rtrjzatgevviamaqvlnq.supabase.co:5432/postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=your_actual_password_here
SUPABASE_JWT_SECRET=your_jwt_secret_here

# CORS Configuration
CORS_ORIGINS=http://localhost:5173
```

**Replace:**
- `your_actual_password_here` → Your database password
- `your_jwt_secret_here` → JWT secret from Supabase

Save and exit (Ctrl+O, Enter, Ctrl+X in nano)

---

### 3️⃣ Setup Frontend Environment

Create a file: `frontend/.env`

```bash
cd /home/adhwik/Desktop/Learn\ projects/expense-tracker/frontend
nano .env
```

Paste this content and **replace the placeholder**:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://rtrjzatgevviamaqvlnq.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Backend API
VITE_API_BASE_URL=http://localhost:8080
```

**Replace:**
- `your_anon_key_here` → Your anon/public key from Supabase

Save and exit

---

### 4️⃣ Run Database Setup Script

1. Go to Supabase Dashboard
2. Click **SQL Editor** (from left sidebar)
3. Click **New query**
4. Open the file: `/home/adhwik/Desktop/Learn projects/expense-tracker/database-setup.sql`
5. Copy ALL the content
6. Paste into Supabase SQL Editor
7. Click **RUN** button (or press Ctrl+Enter)
8. ✅ Should see "Success" message

This creates:
- `categories` table
- `transactions` table
- Row Level Security policies
- Default categories trigger

---

### 5️⃣ Verify Connection

#### Test Backend:
```bash
cd /home/adhwik/Desktop/Learn\ projects/expense-tracker/backend
mvn spring-boot:run
```

Look for:
```
✅ Started ExpenseTrackerApplication in X seconds
✅ Tomcat started on port(s): 8080
```

If you see database connection errors, check your password and JWT secret.

#### Test Frontend:
```bash
cd /home/adhwik/Desktop/Learn\ projects/expense-tracker/frontend
npm run dev
```

Look for:
```
✅ VITE ready in X ms
✅ Local: http://localhost:5173/
```

Open http://localhost:5173 and try to sign up!

---

## 🔍 Quick Reference Card

Copy this to keep handy:

```
╔══════════════════════════════════════════════════════╗
║           YOUR SUPABASE CREDENTIALS                  ║
╠══════════════════════════════════════════════════════╣
║ Project ID: rtrjzatgevviamaqvlnq                    ║
║                                                      ║
║ Database URL (for backend):                          ║
║ jdbc:postgresql://db.rtrjzatgevviamaqvlnq           ║
║              .supabase.co:5432/postgres              ║
║                                                      ║
║ Project URL (for frontend):                          ║
║ https://rtrjzatgevviamaqvlnq.supabase.co           ║
║                                                      ║
║ Get from Supabase Dashboard:                         ║
║ • Database Password: [Your password]                 ║
║ • JWT Secret: [From API settings]                    ║
║ • Anon Key: [From API settings]                      ║
╚══════════════════════════════════════════════════════╝
```

---

## 🐛 Troubleshooting

### Backend won't connect to database:
```
Error: authentication failed for user "postgres"
```
**Fix**: Check `SUPABASE_DB_PASSWORD` in `backend/.env`

### Frontend can't authenticate users:
```
Error: Invalid API key
```
**Fix**: Check `VITE_SUPABASE_ANON_KEY` in `frontend/.env`

### JWT validation fails:
```
Error: Invalid JWT token
```
**Fix**: Make sure backend's `SUPABASE_JWT_SECRET` matches Supabase dashboard

### Connection refused:
```
Error: Connection refused to db.rtrjzatgevviamaqvlnq.supabase.co
```
**Fix**: 
1. Check if your Supabase project is active
2. Verify the database URL is correct
3. Check your internet connection

---

## ✅ Verification Checklist

- [ ] Ran `database-setup.sql` in Supabase SQL Editor
- [ ] Created `backend/.env` with correct credentials
- [ ] Created `frontend/.env` with correct credentials
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can sign up a new user
- [ ] Can login successfully
- [ ] Can see dashboard after login

---

## 📞 Need Help?

If something doesn't work:

1. **Check Environment Variables**: Make sure no typos in `.env` files
2. **Check Supabase Dashboard**: Make sure project is not paused
3. **Check Logs**: 
   - Backend: Look at terminal where mvn runs
   - Frontend: Look at browser console (F12)
4. **Test Supabase Connection**: Use Supabase dashboard's SQL editor to run:
   ```sql
   SELECT * FROM categories LIMIT 5;
   ```

---

**You're almost there! Just need to fill in those credentials! 🚀**
