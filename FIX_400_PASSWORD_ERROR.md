# 🔧 Fix: 400 Bad Request on Password Login

## 🎯 Quick Fix: Disable Email Confirmation (For Development)

### **Step 1: Go to Supabase Email Settings**

```
https://supabase.com/dashboard/project/lfgskefpkzxecywvylrq/auth/providers
```

Or:
1. Dashboard → Authentication → Providers
2. Click on "Email"

---

### **Step 2: Disable "Confirm email"**

**For DEVELOPMENT (easier testing):**

```
Email Settings:
☑️ Enable Email provider
☐ Confirm email ← UNCHECK THIS!
☑️ Enable Email OTP
☑️ Secure email change enabled (optional)
```

**Click "Save"**

This allows users to login immediately after signup without email confirmation.

---

### **Step 3: Clear Existing Test Users**

If you created accounts before, they might be stuck in "unconfirmed" state.

**Option A: Delete Test Users**
```
Dashboard → Authentication → Users
├─ Find your test user
├─ Click "..." menu
└─ Delete user
```

**Option B: Manually Confirm Users**
```
Dashboard → Authentication → Users
├─ Find your test user
├─ Click on the user
├─ Check "Email Confirmed"
└─ Save
```

---

## 🧪 **Test Again:**

### **Step 1: Create Fresh Account**

1. Go to: http://localhost:5173/login
2. Click: "Don't have an account? 🎯 Sign up now"
3. Enter:
   ```
   Email: test@example.com
   Password: Test123456
   ```
4. Click "Sign Up"

**Expected:**
```
✅ "Sign up successful!" message
✅ Auto-redirect to dashboard
✅ No email confirmation needed
```

---

### **Step 2: Test Login**

1. Sign out (if logged in)
2. Go to: http://localhost:5173/login
3. Enter same credentials:
   ```
   Email: test@example.com
   Password: Test123456
   ```
4. Click "Login"

**Expected:**
```
✅ "Login successful!" message
✅ Redirect to dashboard
✅ No 400 error
```

---

## 🔍 **If Still Getting 400 Error:**

### **Check 1: Verify Email Format**

```javascript
// Valid emails:
test@example.com ✅
john.doe@gmail.com ✅
user+test@outlook.com ✅

// Invalid:
test ❌
test@ ❌
@example.com ❌
```

---

### **Check 2: Password Requirements**

Based on your screenshot:
```
Minimum length: 6 characters
Requirements: Letters and digits

Valid passwords:
Test123456 ✅
Password1 ✅
Abc12345 ✅

Invalid:
test ❌ (too short)
testtest ❌ (no digits)
123456 ❌ (no letters)
```

---

### **Check 3: Browser Console Error Details**

1. Press F12 (DevTools)
2. Go to Console tab
3. Look for detailed error message

**Common errors:**

```javascript
// Error 1: Email not confirmed
{
  "error": "Email not confirmed",
  "error_description": "Email not confirmed"
}
→ Solution: Disable "Confirm email" in Supabase

// Error 2: Invalid login credentials
{
  "error": "Invalid login credentials"
}
→ Solution: Check email/password are correct

// Error 3: User not found
{
  "error": "User not found"
}
→ Solution: Sign up first!
```

---

### **Check 4: Network Tab Details**

1. Press F12 → Network tab
2. Try to login
3. Find the request to `/auth/v1/token`
4. Click it and check:

**Request Payload:**
```json
{
  "email": "test@example.com",
  "password": "Test123456",
  "gotrue_meta_security": {}
}
```

**Response (if 400):**
```json
{
  "error": "...",
  "error_description": "..."
}
```

Copy the error message and share it.

---

## 🎯 **Recommended Supabase Settings for Development:**

```
Email Settings:
├─ ☑️ Enable Email provider
├─ ☐ Confirm email (DISABLED for dev)
├─ ☑️ Enable Email OTP
├─ ☐ Secure email change (DISABLED for dev)
└─ ☐ Secure password change (DISABLED for dev)

Password Settings:
├─ Minimum length: 6 characters
├─ Requirements: Letters and digits
└─ No leaked passwords: Disabled

Email OTP Settings:
├─ Expiration: 300 seconds (5 min)
└─ Length: 6 or 8 digits
```

**For Production:**
Enable all security features later!

---

## ✅ **Quick Fix Summary:**

1. **Go to Supabase:**
   ```
   Dashboard → Auth → Providers → Email
   ```

2. **Uncheck "Confirm email"**
   ```
   ☐ Confirm email
   ```

3. **Save settings**

4. **Delete old test users:**
   ```
   Dashboard → Auth → Users → Delete all
   ```

5. **Try signup/login again**

---

## 🆘 **Still Not Working?**

### **Nuclear Option: Reset Auth State**

```bash
1. Clear ALL users:
   Dashboard → Auth → Users → Delete all

2. Disable ALL security:
   ☐ Confirm email
   ☐ Secure email change
   ☐ Secure password change

3. Save and wait 30 seconds

4. Hard refresh browser:
   Ctrl + Shift + R

5. Try signup again
```

---

## 📸 **What I Need If Still Broken:**

1. **Screenshot of Supabase Email Settings** (top of the page)
2. **Browser console error** (full JSON response)
3. **Network tab response** (the 400 error details)

---

**Next Step:** Go to Supabase and uncheck "Confirm email" ✅
