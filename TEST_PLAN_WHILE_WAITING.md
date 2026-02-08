# 🔑 Test Plan: Use Password Login While Waiting

## ✅ While OTP is Rate Limited, Test Everything Else!

### **Step 1: Create Account with Password**

1. Go to: http://localhost:5173/login
2. Click: "Don't have an account? 🎯 Sign up now"
3. Enter:
   ```
   Email: your-real-email@gmail.com
   Password: Test123456
   ```
4. Click: "Sign Up"
5. Check email for confirmation link (if required)
6. Login with same credentials

---

### **Step 2: Test Dashboard**

1. After login, you'll see Dashboard
2. Check:
   - ✅ Total Income card
   - ✅ Total Expenses card
   - ✅ Balance card
   - ✅ Recent transactions
   - ✅ Category breakdown

---

### **Step 3: Add Categories**

1. Click: "Categories" (top right)
2. Click: "Create Default Categories"
3. Verify categories created:
   - Food & Dining
   - Transportation
   - Shopping
   - Bills & Utilities
   - Entertainment
   - Salary
   - Business
   - etc.

---

### **Step 4: Add Transactions**

1. Click: "Transactions"
2. Click: "Add Transaction"
3. Add an Income:
   ```
   Type: Income
   Amount: 50000
   Category: Salary
   Description: Monthly salary
   Date: Today
   ```
4. Click: "Save Transaction"
5. See Mustache message: ✅ Success! Your INCOME of ₹50000...

---

### **Step 5: Test Expense Threshold Messages**

**Test 1: Low Expense (< ₹10,000)**
```
Type: Expense
Amount: 5000
Category: Food & Dining
Description: Groceries
```
Expected: "Great job! Your EXPENSE of ₹5000 is under control."

**Test 2: High Expense (> ₹10,000)**
```
Type: Expense
Amount: 15000
Category: Shopping
Description: New laptop
```
Expected: "⚠️ Notice: Your EXPENSE of ₹15000 is quite high."

---

### **Step 6: Test PDF Download**

1. Add a few more transactions (3-4)
2. Click: "📄 Download PDF Report"
3. Wait for PDF to generate
4. Check downloaded PDF:
   - ✅ Summary section (Income, Expenses, Balance)
   - ✅ Category breakdown
   - ✅ All transactions listed
   - ✅ Indian Rupee (₹) symbol
   - ✅ Mustache-powered formatting

---

### **Step 7: Verify Features**

**Check All These Work:**
- ✅ Login with password
- ✅ Dashboard displays correctly
- ✅ Create/Edit/Delete categories
- ✅ Add transactions (Income/Expense)
- ✅ Mustache messages appear
- ✅ Threshold warnings (₹10,000)
- ✅ PDF generation
- ✅ Indian Rupee (₹) everywhere
- ✅ Loading animations
- ✅ Beautiful UI with gradients

---

### **Step 8: Sign Out & Test Login Again**

1. Click: "Sign Out"
2. Login again with same credentials
3. Verify all your data is still there

---

## ⏰ After 30 Minutes: Test OTP

Once rate limit resets:

1. Sign out from password account
2. Go to: http://localhost:5173/otp-login
3. Use REAL email (Gmail, Outlook, etc.)
4. Click "Send OTP Code" (ONCE!)
5. Check email (inbox + spam)
6. Enter 8-digit code
7. Login via OTP successful! 🎉

---

## 📊 Feature Checklist

While waiting for OTP rate limit, test:

- [x] Password authentication
- [x] Sign up / Sign in
- [x] Dashboard view
- [x] Category management
- [x] Transaction CRUD
- [x] Mustache messages
- [x] Expense thresholds
- [x] PDF download
- [x] Indian Rupee (₹)
- [x] Loading animations
- [x] Toast notifications
- [ ] OTP login (test after 30 min wait)

---

## 🎯 Current Status

```
✅ Password Login: Working (use now!)
⏰ OTP Login: Rate limited (wait 30 min)
✅ Frontend: Running on port 5173
✅ Backend: Running on port 8080
✅ All Features: Ready to test
```

---

**Start testing now:** http://localhost:5173/login

**Test OTP later:** After 30 minutes have passed! ⏰
