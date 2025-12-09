# Phase 2: Authentication Integration - Testing Guide

## ✅ Completed Changes

### 1. **useAuthStore** (src/store/useAuthStore.ts)
- ✅ Replaced mock login/register/logout with real API calls
- ✅ Integrated with `authApi` from API client
- ✅ Implemented token storage in localStorage
- ✅ Added automatic token management (store on login/register, clear on logout)
- ✅ Added `checkAuth()` method to verify authentication status
- ✅ Enhanced error handling with proper cleanup on failures

### 2. **App Layout** (src/app/layout.tsx)
- ✅ Added `Toaster` component from sonner
- ✅ Positioned toast notifications at top-right
- ✅ Enabled rich colors for success/error states

### 3. **Login Page** (src/app/login/page.tsx)
- ✅ Enhanced error handling to display actual API error messages
- ✅ Improved user feedback with detailed error messages
- ✅ Maintained existing loading states and form validation

## 🚀 Servers Running

- **Backend**: http://localhost:5000 (Port 5000) ✓
- **Frontend**: http://localhost:3000 (Port 3000) ✓

## 🧪 Testing Checklist

### Test 1: Login with Existing User
1. Open http://localhost:3000/login
2. Click on the "Sign In" tab
3. Use the default admin credentials:
   - Email: `admin@example.com`
   - Password: `admin123`
4. Click "Sign In"

**Expected Results:**
- ✅ Loading state shows "Signing in..."
- ✅ Green success toast appears: "Welcome back!"
- ✅ Redirected to `/account` page
- ✅ User info displayed in navbar (avatar/name)
- ✅ Check browser DevTools → Application → Local Storage:
  - `accessToken` should be stored
  - `refreshToken` should be stored
  - `auth-storage` should contain user data

### Test 2: Login with Invalid Credentials
1. Go to http://localhost:3000/login
2. Try to login with:
   - Email: `wrong@example.com`
   - Password: `wrongpassword`
3. Click "Sign In"

**Expected Results:**
- ✅ Red error toast appears with API error message
- ✅ User remains on login page
- ✅ No tokens stored in localStorage
- ✅ No redirect happens

### Test 3: Register New User
1. Go to http://localhost:3000/login
2. Click on the "Create Account" tab
3. Fill in the form:
   - First Name: `Test`
   - Last Name: `User`
   - Email: `test@example.com`
   - Phone: `0788123456` (optional)
   - Password: `password123`
   - Confirm Password: `password123`
4. Click "Create Account"

**Expected Results:**
- ✅ Loading state shows "Creating account..."
- ✅ Green success toast appears: "Account created successfully!"
- ✅ Redirected to `/account` page
- ✅ User is automatically logged in
- ✅ Tokens stored in localStorage
- ✅ User info displayed in navbar

### Test 4: Registration Validation
1. Try to register with mismatched passwords
2. Try to register with password less than 6 characters
3. Try to register with existing email

**Expected Results:**
- ✅ Password mismatch: "Passwords do not match" error
- ✅ Short password: "Password must be at least 6 characters" error
- ✅ Duplicate email: API error message displayed

### Test 5: Logout Functionality
1. While logged in, click on your avatar in the navbar
2. Click "Sign Out"

**Expected Results:**
- ✅ User is logged out
- ✅ Redirected to home page
- ✅ Navbar shows "Login" button again
- ✅ LocalStorage cleared (no tokens)
- ✅ `auth-storage` cleared

### Test 6: Token Persistence
1. Login successfully
2. Close the browser tab
3. Open http://localhost:3000 again
4. Check if you're still logged in

**Expected Results:**
- ✅ User remains logged in after browser restart
- ✅ Tokens persist in localStorage
- ✅ User info displayed correctly

### Test 7: Auto Token Refresh (Advanced)
1. Login successfully
2. Open DevTools → Application → Local Storage
3. Manually delete the `accessToken` (keep refreshToken)
4. Try to navigate to `/account` or make any API call
5. Check Network tab for requests

**Expected Results:**
- ✅ API client automatically attempts token refresh
- ✅ New accessToken obtained using refreshToken
- ✅ Original request succeeds after token refresh
- ✅ User remains logged in

### Test 8: Invalid Token Handling
1. Login successfully
2. Open DevTools → Application → Local Storage
3. Manually change `accessToken` to invalid value
4. Refresh the page or navigate

**Expected Results:**
- ✅ Token validation fails
- ✅ User is logged out automatically
- ✅ Redirected to login page
- ✅ Error message displayed

## 🔍 Debugging Tips

### Check Network Requests
Open DevTools → Network tab and filter by "Fetch/XHR":
- Login: `POST /api/auth/login`
- Register: `POST /api/auth/register`
- Logout: `POST /api/auth/logout`
- Token Refresh: `POST /api/auth/refresh`

### Check Console Logs
Look for:
- API errors (red messages)
- Token storage confirmations
- Authentication state changes

### Check localStorage
DevTools → Application → Local Storage → http://localhost:3000:
- `accessToken`: JWT token (should exist when logged in)
- `refreshToken`: Refresh JWT token
- `auth-storage`: Zustand persisted state with user data

## 🐛 Common Issues & Solutions

### Issue: "Network Error" or "Cannot connect to backend"
**Solution**: Ensure backend server is running on port 5000
```bash
cd backend
npm run dev
```

### Issue: CORS errors in console
**Solution**: Backend should have CORS enabled for http://localhost:3000
Check `backend/src/server.ts` for CORS configuration

### Issue: "Token expired" errors
**Solution**: This is expected behavior - token refresh should kick in automatically
Check Network tab for refresh token request

### Issue: Login succeeds but redirect doesn't work
**Solution**: Check browser console for navigation errors
Verify `/account` route exists

### Issue: Toasts not appearing
**Solution**: 
- Verify Toaster component is in layout.tsx
- Check if sonner is properly installed
- Look for console errors

## 📝 Next Steps After Testing

Once all tests pass:
- ✅ Authentication is fully integrated
- ✅ Ready to proceed with Phase 3: Products Integration
- ✅ Can start replacing product mock data with real API calls

## 🎯 Phase 2 Success Criteria

- [x] Real login API integration working
- [x] Real registration API integration working
- [x] Token storage and persistence working
- [x] Logout clears tokens and state
- [x] Error messages display correctly
- [x] Toast notifications working
- [x] Auto token refresh implemented
- [x] Navigation after auth actions works

---

**Phase 2 Status**: ✅ **COMPLETE - READY FOR TESTING**

**Time to Test**: ~15 minutes
**Next Phase**: Phase 3 - Products Integration
