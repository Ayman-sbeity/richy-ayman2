# Testing the Sell Section

## Quick Test Steps

### 1. Test Authentication Protection

Open your browser console and run:
```javascript
// Clear authentication
localStorage.clear()
```

Then navigate to: `http://localhost:3000/sell`

**Expected**: You should see the authentication required page with Login and Sign Up buttons.

### 2. Test Login with Redirect

1. Click the "Log In" button on the auth required page
2. Notice the URL: `http://localhost:3000/login?redirect=/sell`
3. Enter any email (e.g., `test@example.com`) and password (e.g., `password123`)
4. Click "Log in"

**Expected**: You should be automatically redirected to `/sell` page and see the property listing form.

### 3. Test the Sell Form

#### Step 1 - Property Details:
- Title: "Luxury 3BR Apartment in Achrafieh"
- Property Type: "Apartment"
- Listing Type: "Sale"
- Price: "450000"
- City: "Beirut"
- Location: "Sassine Square, Achrafieh"
- Description: "Beautiful modern apartment with amazing views..."

Click **Next** (button should be enabled when all required fields are filled)

#### Step 2 - Features & Amenities:
- Bedrooms: "3"
- Bathrooms: "2"
- Area: "180"
- Parking Spaces: "2"
- Year Built: "2020"
- Select features: Click on chips like "Balcony", "Sea View", "Elevator", etc.

Click **Next**

#### Step 3 - Photos & Contact:
- Click the upload box to select images (or prepare some property images)
- After uploading, you should see image previews
- You can delete images by clicking the delete icon
- Fill contact information:
  - Full Name: "John Doe"
  - Email: "john@example.com"
  - Phone: "+961 3 123 456"

Click **Submit Listing**

**Expected**: You should see a success alert and the form should simulate submission.

### 4. Test Mobile Responsiveness

1. Open Chrome DevTools (F12 or Cmd+Option+I)
2. Click the device toolbar icon (or Cmd+Shift+M)
3. Select different devices (iPhone, iPad, etc.)
4. Navigate through the form

**Expected**: All elements should be properly sized and usable on mobile devices.

### 5. Test Form Validation

Try to click "Next" without filling required fields:

**Expected**: The button should be disabled until all required fields in that step are filled.

### 6. Test Logout

In browser console, run:
```javascript
localStorage.removeItem('isAuthenticated')
```

Then try to access `/sell` again:

**Expected**: You should see the authentication required page again.

---

## Browser Console Commands

### Check Authentication Status:
```javascript
console.log('Is Authenticated:', localStorage.getItem('isAuthenticated'));
```

### Manually Login (for testing):
```javascript
localStorage.setItem('isAuthenticated', 'true');
console.log('Logged in!');
// Then refresh the page or navigate to /sell
```

### Manually Logout:
```javascript
localStorage.removeItem('isAuthenticated');
console.log('Logged out!');
```

---

## Expected Behavior Summary

| Action | Expected Result |
|--------|----------------|
| Visit `/sell` (not authenticated) | Shows auth required page |
| Click "Log In" button | Redirects to `/login?redirect=/sell` |
| Login successfully | Redirects back to `/sell` page |
| Visit `/sell` (authenticated) | Shows property listing form |
| Fill Step 1 partially | "Next" button is disabled |
| Fill Step 1 completely | "Next" button is enabled |
| Click "Next" in Step 1 | Shows Step 2 |
| Click "Back" in Step 2 | Shows Step 1 |
| Upload images | Shows image previews |
| Delete image | Removes image preview |
| Submit form (incomplete) | Button is disabled |
| Submit form (complete) | Shows success message |

---

## Troubleshooting

### Issue: Not redirecting after login
**Solution**: Check browser console for errors. Make sure `redirectPath` is being captured correctly.

### Issue: Images not uploading
**Solution**: Make sure you're selecting valid image files (JPG, PNG). Check file size is reasonable.

### Issue: Form validation not working
**Solution**: Check that all required fields have values. Open console to see validation logic.

### Issue: Authentication not persisting
**Solution**: Check if localStorage is working in your browser (some privacy modes disable it).

---

## Next Steps After Testing

1. ✅ Connect to real authentication API
2. ✅ Integrate backend for listing submission
3. ✅ Add image upload to cloud storage (S3, Cloudinary)
4. ✅ Implement user dashboard to view listings
5. ✅ Add email notifications
6. ✅ Implement listing moderation/approval workflow
