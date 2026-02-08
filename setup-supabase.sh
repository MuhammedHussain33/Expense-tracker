#!/bin/bash

# 🚀 Supabase Setup Helper Script
# Run this after getting your credentials from Supabase

echo "================================================"
echo "   Expense Tracker - Supabase Setup Helper"
echo "================================================"
echo ""
echo "Your Supabase Project: lfgskefpkzxecywvylrq"
echo "Dashboard: https://supabase.com/dashboard/project/lfgskefpkzxecywvylrq"
echo ""
echo "================================================"
echo "STEP 1: Get Your Credentials"
echo "================================================"
echo ""
echo "Visit: https://supabase.com/dashboard/project/lfgskefpkzxecywvylrq/settings/api"
echo ""
echo "Copy these 3 values:"
echo "  1. anon/public key (very long string starting with 'eyJ...')"
echo "  2. JWT Secret (scroll down to JWT Settings)"
echo "  3. Database Password (Settings → Database)"
echo ""
echo "================================================"
echo "STEP 2: Enter Your Credentials"
echo "================================================"
echo ""

# Get credentials from user
read -p "Enter your anon/public key: " ANON_KEY
read -p "Enter your JWT Secret: " JWT_SECRET
read -sp "Enter your Database Password: " DB_PASSWORD
echo ""
echo ""

# Update Backend .env
echo "Updating backend/.env..."
cat > backend/.env << EOF
SUPABASE_DB_URL=jdbc:postgresql://db.lfgskefpkzxecywvylrq.supabase.co:5432/postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=$DB_PASSWORD
SUPABASE_JWT_SECRET=$JWT_SECRET
CORS_ORIGINS=http://localhost:5175
EOF

echo "✅ Backend .env updated!"

# Update Frontend .env
echo "Updating frontend/.env..."
cat > frontend/.env << EOF
VITE_SUPABASE_URL=https://lfgskefpkzxecywvylrq.supabase.co
VITE_SUPABASE_ANON_KEY=$ANON_KEY
VITE_API_BASE_URL=http://localhost:8080
EOF

echo "✅ Frontend .env updated!"
echo ""
echo "================================================"
echo "STEP 3: Run Database Setup"
echo "================================================"
echo ""
echo "1. Go to: https://supabase.com/dashboard/project/lfgskefpkzxecywvylrq/sql"
echo "2. Click 'New query'"
echo "3. Copy ALL content from: database-setup.sql"
echo "4. Paste and click RUN"
echo ""
echo "================================================"
echo "STEP 4: Start Your Applications"
echo "================================================"
echo ""
echo "Backend (Terminal 1):"
echo "  cd backend && mvn spring-boot:run"
echo ""
echo "Frontend (Terminal 2):"
echo "  cd frontend && npm run dev"
echo ""
echo "================================================"
echo "✅ Setup Complete!"
echo "================================================"
echo ""
echo "Open: http://localhost:5175"
echo ""
