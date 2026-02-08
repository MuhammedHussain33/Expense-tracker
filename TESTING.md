# 🧪 Testing Guide - Expense Tracker

## Manual Testing Checklist

### 🔐 Authentication Tests

#### Sign Up Flow
- [ ] Open http://localhost:5173
- [ ] Click "Don't have an account? Sign up"
- [ ] Enter email: `test@example.com`
- [ ] Enter password: `Test123!@#`
- [ ] Click "Sign Up"
- [ ] ✅ Should see success message
- [ ] ✅ Should receive welcome email (check Supabase email settings)

#### Login Flow
- [ ] Go to login page
- [ ] Enter the registered email and password
- [ ] Click "Login"
- [ ] ✅ Should redirect to Dashboard
- [ ] ✅ Email should appear in header

#### Protected Routes
- [ ] Try accessing http://localhost:5173/dashboard without login
- [ ] ✅ Should redirect to login page
- [ ] Login and access dashboard
- [ ] ✅ Should show dashboard content

#### Logout
- [ ] Click "Sign Out" button
- [ ] ✅ Should redirect to login page
- [ ] Try accessing dashboard
- [ ] ✅ Should redirect to login

---

### 📊 Dashboard Tests

#### Initial State
- [ ] Login to dashboard
- [ ] ✅ Should show $0.00 for all summary cards
- [ ] ✅ Should show "No transactions yet" message
- [ ] ✅ Email should display in header

#### After Adding Transactions
- [ ] Add an income transaction
- [ ] Return to dashboard
- [ ] ✅ Total Income should update
- [ ] ✅ Balance should update
- [ ] ✅ Transaction should appear in recent list

---

### 💰 Transaction CRUD Tests

#### Create Transaction (Income)
1. Navigate to Transactions page
2. Click "Add Transaction"
3. Fill form:
   - Type: Income
   - Amount: 5000
   - Category: Salary
   - Description: Monthly salary
   - Date: Today
4. Click "Save Transaction"
5. ✅ Should see Mustache-generated success message
6. ✅ Transaction should appear in table with green color
7. ✅ Amount should show as +$5000.00

#### Create Transaction (Expense)
1. Click "Add Transaction"
2. Fill form:
   - Type: Expense
   - Amount: 150.50
   - Category: Food & Dining
   - Description: Grocery shopping
   - Date: Today
3. Click "Save Transaction"
4. ✅ Should see success message
5. ✅ Transaction should appear in table with red color
6. ✅ Amount should show as -$150.50

#### Read Transactions
- [ ] View all transactions in table
- [ ] ✅ Should show Date, Type, Description, Amount
- [ ] ✅ Income badge should be green
- [ ] ✅ Expense badge should be red
- [ ] ✅ Transactions sorted by date (newest first)

#### Update Transaction
1. Click "Edit" on any transaction
2. Change amount to 200.00
3. Change description
4. Click "Save Transaction"
5. ✅ Should see update success message (Mustache template)
6. ✅ Table should update immediately
7. ✅ Changes should persist on page refresh

#### Delete Transaction
1. Click "Delete" on any transaction
2. ✅ Should show confirmation dialog
3. Click "OK" to confirm
4. ✅ Should see delete success message
5. ✅ Transaction should disappear from table
6. ✅ Summary should update

---

### 📂 Category Tests

#### Default Categories
- [ ] After signup, open transaction form
- [ ] Switch between Income/Expense types
- [ ] ✅ Should see default categories:
  - **Expense**: Food & Dining, Transportation, Shopping, Entertainment, Bills & Utilities, Healthcare, Other Expenses
  - **Income**: Salary, Freelance, Investment, Other Income

#### Category Switching
1. Select "Expense" type
2. ✅ Should only show expense categories
3. Select "Income" type
4. ✅ Should only show income categories

---

### 🎨 Mustache Template Tests

#### Transaction Success Message
- [ ] Create a new transaction
- [ ] ✅ Message should include:
  - Transaction type (INCOME/EXPENSE)
  - Amount with $ sign
  - Description if provided
  - Success emoji/icon

#### Transaction Update Message
- [ ] Edit a transaction
- [ ] ✅ Message should include:
  - "Updated" confirmation
  - Transaction type
  - New amount

#### Transaction Delete Message
- [ ] Delete a transaction
- [ ] ✅ Should show deletion confirmation
- [ ] ✅ Clean, simple message

---

### 📱 UI/UX Tests

#### Responsive Design
- [ ] Open in desktop browser (1920x1080)
- [ ] ✅ Layout should be wide and spacious
- [ ] Resize to tablet (768px)
- [ ] ✅ Should adapt layout
- [ ] Resize to mobile (375px)
- [ ] ✅ Should stack vertically, readable

#### Form Validation
- [ ] Try submitting empty transaction form
- [ ] ✅ Required fields should show validation
- [ ] Enter negative amount
- [ ] ✅ Should not accept (min="0")
- [ ] Enter invalid date
- [ ] ✅ Browser validation should trigger

#### Loading States
- [ ] Refresh page
- [ ] ✅ Should briefly show "Loading..." message
- [ ] Submit form
- [ ] ✅ Button should show "Saving..." during request

---

### 🔒 Security Tests

#### User Data Isolation
1. Create user1@test.com and add transactions
2. Logout
3. Create user2@test.com
4. ✅ user2 should NOT see user1's transactions
5. ✅ Categories should be separate

#### JWT Token Validation
- [ ] Open browser DevTools → Network
- [ ] Create a transaction
- [ ] ✅ Request should include Authorization header
- [ ] ✅ Header format: "Bearer eyJ..."

#### Unauthorized Access
1. Logout
2. Try to manually call API:
   ```bash
   curl http://localhost:8080/api/transactions
   ```
3. ✅ Should return 401 or 403 error

---

### 🌐 API Tests (Backend)

#### Using curl or Postman

**Get Token First:**
```bash
# Login via Supabase to get token
# Then use it in subsequent requests
```

**Get All Transactions:**
```bash
curl -X GET http://localhost:8080/api/transactions \
  -H "Authorization: Bearer YOUR_TOKEN"
```
✅ Should return user's transactions

**Create Transaction:**
```bash
curl -X POST http://localhost:8080/api/transactions \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100.00,
    "type": "EXPENSE",
    "categoryId": "category-uuid",
    "description": "Test transaction",
    "date": "2026-02-07"
  }'
```
✅ Should return success with Mustache message

**Get Summary:**
```bash
curl -X GET http://localhost:8080/api/transactions/summary \
  -H "Authorization: Bearer YOUR_TOKEN"
```
✅ Should return financial summary

---

### 💾 Database Tests (Supabase)

#### Row Level Security
1. Open Supabase SQL Editor
2. Run query as authenticated user:
   ```sql
   SELECT * FROM transactions;
   ```
3. ✅ Should only return current user's transactions

#### Cascade Delete
1. Note down a category ID
2. Delete the category
3. Check transactions with that categoryId
4. ✅ categoryId should be set to NULL (not deleted)

#### Default Categories Trigger
1. Create a new user via Supabase Auth
2. Check categories table
3. ✅ Should have 11 default categories created

---

### 🎯 Integration Tests

#### Full User Journey
1. **Start**: New user visits site
2. **Sign Up**: Creates account
3. **Welcome**: Sees welcome (check logs for Mustache message)
4. **Dashboard**: Views empty dashboard
5. **Add Income**: Adds salary transaction
6. **Add Expenses**: Adds multiple expense transactions
7. **View Summary**: Checks dashboard - all numbers correct?
8. **Edit**: Modifies a transaction
9. **Delete**: Removes a transaction
10. **Summary Update**: Dashboard reflects changes?
11. **Logout**: Signs out
12. **Re-login**: Signs back in
13. **Data Persists**: All transactions still there?

✅ All steps should work smoothly

---

### 🐛 Error Handling Tests

#### Network Errors
- [ ] Stop backend server
- [ ] Try creating transaction
- [ ] ✅ Should show error message
- [ ] ✅ Should not crash the app

#### Invalid Data
- [ ] Send malformed JSON to API
- [ ] ✅ Should return 400 Bad Request
- [ ] Try to access other user's transaction
- [ ] ✅ Should return 403 Forbidden

#### Edge Cases
- [ ] Create transaction with amount 0.00
- [ ] ✅ Should accept (or reject based on requirements)
- [ ] Create transaction with no category
- [ ] ✅ Should save with null categoryId
- [ ] Enter very long description (1000+ chars)
- [ ] ✅ Should handle gracefully

---

## 🎉 Test Results Summary

After completing all tests, verify:

✅ **Authentication**: Sign up, login, logout all work  
✅ **CRUD Operations**: Create, read, update, delete transactions  
✅ **Mustache Templates**: All messages display correctly  
✅ **Dashboard**: Summary calculations are accurate  
✅ **Security**: RLS works, JWT required, data isolated  
✅ **UI/UX**: Responsive, forms validate, loading states  
✅ **API**: All endpoints return expected responses  
✅ **Database**: Triggers work, constraints enforced  

---

## 📝 Test Results Template

```
Test Date: ___________
Tester: ___________

Authentication:     [ PASS / FAIL ]
Dashboard:          [ PASS / FAIL ]
Transactions CRUD:  [ PASS / FAIL ]
Categories:         [ PASS / FAIL ]
Mustache Templates: [ PASS / FAIL ]
UI/UX:             [ PASS / FAIL ]
Security:          [ PASS / FAIL ]
API:               [ PASS / FAIL ]
Database:          [ PASS / FAIL ]
Integration:       [ PASS / FAIL ]

Notes:
________________
________________
```

---

## 🚀 Automated Testing (Future Enhancement)

Consider adding:
- Jest/React Testing Library for frontend
- JUnit/Mockito for backend
- Cypress for E2E testing
- Postman collections for API testing

**Happy Testing!** 🧪✅
