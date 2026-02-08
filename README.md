# 💰 Expense Tracker

> A modern, full-stack expense tracking application with OTP authentication, real-time updates, and beautiful UI.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F.svg?logo=springboot)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E.svg?logo=supabase)

---

## ✨ Features

### 🔐 **Authentication**
- Password-based login & signup
- **OTP-based authentication** (passwordless)
- Secure JWT tokens
- Email verification
- Password reset functionality

### 💰 **Expense Management**
- Add, edit, delete transactions
- Income and expense tracking
- Category management
- Transaction history
- Real-time balance calculation

### 📊 **Reporting**
- **PDF report generation** using Mustache templates
- Transaction summaries
- Category breakdown
- Date range filtering
- Download reports

### 🎨 **Modern UI/UX**
- **Animated logo** with gradient effects
- Beautiful glassmorphism design
- Loading animations
- Toast notifications
- Responsive design (mobile-friendly)
- Indian Rupee (₹) support

### ⚙️ **Settings**
- User profile management
- Password reset (no email required)
- Notification preferences
- Account information
- About page with app info

### 💡 **Smart Features**
- **Expense threshold warnings** (> ₹10,000)
- Mustache-powered dynamic messages
- Real-time validation
- Error handling with helpful messages
- Rate limit protection

---

## 🛠️ Technology Stack

### **Frontend**
- **React** 18 - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **TailwindCSS** - Styling
- **Shadcn UI** - Component library
- **Framer Motion** - Animations
- **Supabase JS** - Backend client

### **Backend**
- **Spring Boot** 3.x - Java framework
- **Spring Data JPA** - ORM
- **Spring Security** - Authentication
- **Mustache** - Templating
- **iText** - PDF generation
- **Maven** - Build tool

### **Database & Auth**
- **Supabase** - PostgreSQL database
- **Supabase Auth** - Authentication
- **Row Level Security** - Data protection

---

## 🚀 Quick Start

### **Prerequisites**

```bash
- Node.js 18+ (for frontend)
- Java 17+ (for backend)
- Maven 3.8+ (for backend)
- Supabase account (free)
```

### **1. Clone Repository**

```bash
git clone https://github.com/YOUR_USERNAME/expense-tracker.git
cd expense-tracker
```

### **2. Setup Frontend**

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cat > .env << 'EOF'
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_BASE_URL=http://localhost:8080
EOF

# Start dev server
npm run dev
```

Frontend runs on: **http://localhost:5173**

### **3. Setup Backend**

```bash
cd backend

# Create application.properties or use environment variables
export SUPABASE_DB_URL="jdbc:postgresql://your-supabase-url/postgres"
export SUPABASE_DB_USER="postgres"
export SUPABASE_DB_PASSWORD="your_password"
export SUPABASE_JWT_SECRET="your_jwt_secret"
export CORS_ORIGINS="http://localhost:5173"

# Run with Maven
mvn spring-boot:run
```

Backend runs on: **http://localhost:8080**

### **4. Setup Supabase**

1. Create project at https://supabase.com
2. Go to **Authentication** → **Providers** → **Email**
3. Enable:
   - ☑️ Enable Email provider
   - ☑️ Enable Email OTP
4. Get your credentials from **Settings** → **API**

---

## 📸 Screenshots

### Dashboard
```
┌────────────────────────────────────────────────────┐
│ [✨ Logo] Expense Tracker    [Categories][Settings]│
├────────────────────────────────────────────────────┤
│                                                    │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│ │ Income   │ │ Expenses │ │ Balance  │          │
│ │ ₹50,000  │ │ ₹35,000  │ │ ₹15,000  │          │
│ └──────────┘ └──────────┘ └──────────┘          │
│                                                    │
│ Recent Transactions                     [Download] │
│ ┌────────────────────────────────────────────┐   │
│ │ Feb 8  INCOME   Salary      +₹50,000      │   │
│ │ Feb 7  EXPENSE  Shopping    -₹15,000      │   │
│ │ Feb 6  EXPENSE  Food        -₹5,000       │   │
│ └────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────┘
```

### OTP Login
```
┌────────────────────────────────────────────────────┐
│              🔐 OTP Login                          │
│      Secure passwordless authentication            │
│                                                    │
│  ┌──────────────────────────────────────────┐    │
│  │  📧 Enter Your Email                     │    │
│  │                                          │    │
│  │  Email: [your@email.com]                │    │
│  │                                          │    │
│  │      [📨 Send OTP Code]                 │    │
│  │                                          │    │
│  │  ─────────── or ───────────             │    │
│  │                                          │    │
│  │      🔑 Login with Password              │    │
│  └──────────────────────────────────────────┘    │
└────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
expense-tracker/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Auth/       # Login, OTP, etc.
│   │   │   └── ui/         # UI components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── lib/            # Utilities
│   ├── public/             # Static assets
│   └── package.json        # Dependencies
│
├── backend/                 # Spring Boot backend
│   ├── src/main/
│   │   ├── java/com/expensetracker/
│   │   │   ├── config/    # Configuration
│   │   │   ├── controller/ # REST controllers
│   │   │   ├── dto/       # Data transfer objects
│   │   │   ├── model/     # Entity models
│   │   │   ├── repository/ # Data repositories
│   │   │   └── service/   # Business logic
│   │   └── resources/
│   │       ├── templates/ # Mustache templates
│   │       └── application.properties
│   └── pom.xml            # Maven dependencies
│
├── .gitignore             # Git ignore rules
├── vercel.json            # Vercel config
├── DEPLOYMENT_GUIDE.md    # Deployment instructions
├── QUICK_DEPLOY.md        # Quick deploy steps
└── README.md              # This file
```

---

## 🎯 API Endpoints

### **Authentication**
```
POST   /api/auth/login      - Login with password
POST   /api/auth/signup     - Create account
POST   /api/auth/otp        - Send OTP
POST   /api/auth/verify-otp - Verify OTP
```

### **Transactions**
```
GET    /api/transactions          - Get all transactions
GET    /api/transactions/{id}     - Get transaction by ID
POST   /api/transactions          - Create transaction
PUT    /api/transactions/{id}     - Update transaction
DELETE /api/transactions/{id}     - Delete transaction
GET    /api/transactions/summary  - Get summary stats
GET    /api/transactions/download/pdf - Download PDF report
```

### **Categories**
```
GET    /api/categories            - Get all categories
GET    /api/categories/{id}       - Get category by ID
POST   /api/categories            - Create category
PUT    /api/categories/{id}       - Update category
DELETE /api/categories/{id}       - Delete category
```

---

## 🚀 Deployment

### **Quick Deploy (15 minutes)**

See **[QUICK_DEPLOY.md](./QUICK_DEPLOY.md)** for fast deployment guide.

### **Full Deployment Guide**

See **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** for complete instructions.

### **Recommended Services:**

| Component | Service | Cost |
|-----------|---------|------|
| Frontend | Vercel | Free |
| Backend | Railway | $5/month (includes $5 credit) |
| Database | Supabase | Free |
| **Total** | | **$0-5/month** |

---

## 📚 Documentation

- **[NEW_FEATURES_GUIDE.md](./NEW_FEATURES_GUIDE.md)** - Latest features & usage
- **[OTP_AUTHENTICATION_GUIDE.md](./OTP_AUTHENTICATION_GUIDE.md)** - OTP setup & troubleshooting
- **[QUICK_START_OTP.md](./QUICK_START_OTP.md)** - Quick OTP setup
- **[ERROR_429_GUIDE.md](./ERROR_429_GUIDE.md)** - Rate limit troubleshooting
- **[FIX_NO_API_KEY.md](./FIX_NO_API_KEY.md)** - API key issues
- **[FIX_400_PASSWORD_ERROR.md](./FIX_400_PASSWORD_ERROR.md)** - Password login issues
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete deployment guide

---

## 🔧 Configuration

### **Frontend Environment Variables**

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_API_BASE_URL=http://localhost:8080
```

### **Backend Environment Variables**

```env
PORT=8080
SUPABASE_DB_URL=jdbc:postgresql://...
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=your_password
SUPABASE_JWT_SECRET=your_jwt_secret
CORS_ORIGINS=http://localhost:5173
```

---

## 🧪 Testing

### **Frontend**
```bash
cd frontend
npm run dev
```

Visit: http://localhost:5173

### **Backend**
```bash
cd backend
mvn spring-boot:run
```

API: http://localhost:8080

### **Test Accounts**
```
Email: test@example.com
Password: Test123456
```

---

## 🐛 Troubleshooting

### **Common Issues**

1. **CORS Error**
   - Update `CORS_ORIGINS` in backend
   - Restart backend

2. **API Key Not Found**
   - Check `.env` file in frontend
   - Restart frontend dev server

3. **OTP Not Received**
   - Enable OTP in Supabase Dashboard
   - Check spam folder
   - Wait for rate limit to reset

4. **Database Connection Error**
   - Verify Supabase credentials
   - Check database URL format
   - Ensure database is not paused

See documentation files for detailed troubleshooting.

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Adhwik**

- Project: Expense Tracker with OTP Authentication
- Stack: React + Spring Boot + Supabase
- Features: OTP Auth, PDF Reports, Animated UI

---

## 🙏 Acknowledgments

- **Supabase** - Amazing backend service
- **Vercel** - Easy frontend deployment
- **Railway** - Simple backend hosting
- **Shadcn UI** - Beautiful components
- **TailwindCSS** - Utility-first CSS
- **iText** - PDF generation library
- **Mustache** - Templating engine

---

## 📧 Support

Need help? Check the documentation:
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [OTP Setup Guide](./OTP_AUTHENTICATION_GUIDE.md)
- [Feature Guide](./NEW_FEATURES_GUIDE.md)

---

## 🎯 Roadmap

### **Completed ✅**
- ✅ User authentication (password + OTP)
- ✅ Transaction management (CRUD)
- ✅ Category system
- ✅ PDF report generation
- ✅ Animated logo
- ✅ Settings page
- ✅ Password reset
- ✅ Indian Rupee support
- ✅ Loading animations
- ✅ Expense threshold alerts

### **Future Features 🚀**
- 📊 Charts and visualizations
- 🌙 Dark/light theme toggle
- 📱 Progressive Web App (PWA)
- 🔔 Push notifications
- 📈 Advanced analytics
- 🌍 Multi-language support
- 📤 Data export (CSV, Excel)
- 🔗 Bank integration

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Made with ❤️ using React, Spring Boot, and Supabase**

**Live Demo:** [https://your-app.vercel.app](https://your-app.vercel.app)
