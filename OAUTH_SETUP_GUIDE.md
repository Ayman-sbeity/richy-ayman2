# Social Authentication Setup Guide

## Overview
This guide will help you set up Google, Facebook, and Apple authentication for your real estate application.

---

## 🎨 Current Design Features

### Real Estate Themed Background
- **Login Page**: Modern house exterior with blue overlay
- **Signup Page**: Luxury apartment interior with blue overlay
- **Forgot Password**: Beautiful residential property with blue overlay
- **Colors**: Red gradient (#d92228 to #b91c22) matching your brand
- **Effects**: Glass-morphism with backdrop blur for premium feel

### Authentication Flow
- ✅ Form validation with real-time feedback
- ✅ Password strength indicator
- ✅ Loading states with spinners
- ✅ Error handling with alerts
- ✅ Success animations
- ✅ Responsive design (mobile & desktop)

---

## 🔐 Setting Up OAuth Providers

### 1. Google OAuth Setup

#### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Navigate to "APIs & Services" > "Credentials"

#### Step 2: Create OAuth 2.0 Client ID
1. Click "Create Credentials" > "OAuth client ID"
2. Configure consent screen if prompted
3. Select "Web application" as application type
4. Add authorized redirect URIs:
   ```
   http://localhost:3000/auth/google/callback
   https://yourdomain.com/auth/google/callback
   ```
5. Save and copy your `Client ID` and `Client Secret`

#### Step 3: Update Login.tsx and Signup.tsx
```typescript
// In handleSocialLogin/handleSocialSignup function
if (provider === 'Google') {
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
  const params = new URLSearchParams({
    client_id: 'YOUR_GOOGLE_CLIENT_ID',
    redirect_uri: `${window.location.origin}/auth/google/callback`,
    response_type: 'code',
    scope: 'email profile',
    access_type: 'offline',
    prompt: 'consent',
  });
  window.location.href = `${googleAuthUrl}?${params.toString()}`;
}
```

---

### 2. Facebook OAuth Setup

#### Step 1: Create Facebook App
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "Create App" > "Consumer" type
3. Enter app name and contact email

#### Step 2: Configure Facebook Login
1. In your app dashboard, click "Add Product"
2. Find "Facebook Login" and click "Set Up"
3. Select "Web" platform
4. Enter your site URL: `http://localhost:3000`

#### Step 3: Configure OAuth Redirect
1. Go to "Facebook Login" > "Settings"
2. Add Valid OAuth Redirect URIs:
   ```
   http://localhost:3000/auth/facebook/callback
   https://yourdomain.com/auth/facebook/callback
   ```
3. Save changes

#### Step 4: Get App Credentials
1. Go to "Settings" > "Basic"
2. Copy your `App ID` and `App Secret`

#### Step 5: Update Login.tsx and Signup.tsx
```typescript
// In handleSocialLogin/handleSocialSignup function
if (provider === 'Facebook') {
  const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth`;
  const params = new URLSearchParams({
    client_id: 'YOUR_FACEBOOK_APP_ID',
    redirect_uri: `${window.location.origin}/auth/facebook/callback`,
    scope: 'email,public_profile',
    response_type: 'code',
  });
  window.location.href = `${facebookAuthUrl}?${params.toString()}`;
}
```

---

### 3. Apple Sign In Setup

#### Step 1: Enroll in Apple Developer Program
1. Visit [Apple Developer](https://developer.apple.com/)
2. Enroll in the program ($99/year)

#### Step 2: Create App ID
1. Go to "Certificates, Identifiers & Profiles"
2. Click "Identifiers" > "+" to create new
3. Select "App IDs" > "App"
4. Enter description and Bundle ID (e.g., `com.yourcompany.realestate`)
5. Enable "Sign in with Apple" capability
6. Save

#### Step 3: Create Service ID
1. Click "Identifiers" > "+" to create new
2. Select "Services IDs"
3. Enter identifier (e.g., `com.yourcompany.realestate.web`)
4. Enable "Sign in with Apple"
5. Configure:
   - Domains: `yourdomain.com`, `localhost`
   - Return URLs:
     ```
     http://localhost:3000/auth/apple/callback
     https://yourdomain.com/auth/apple/callback
     ```
6. Save

#### Step 4: Create Private Key
1. Go to "Keys" section
2. Click "+" to create new key
3. Enable "Sign in with Apple"
4. Configure and download the `.p8` file (save securely!)
5. Note the Key ID

#### Step 5: Update Login.tsx and Signup.tsx
```typescript
// In handleSocialLogin/handleSocialSignup function
if (provider === 'Apple') {
  const appleAuthUrl = `https://appleid.apple.com/auth/authorize`;
  const params = new URLSearchParams({
    client_id: 'YOUR_SERVICE_ID',
    redirect_uri: `${window.location.origin}/auth/apple/callback`,
    response_type: 'code',
    scope: 'name email',
    response_mode: 'form_post',
    state: generateRandomState(), // Add CSRF protection
  });
  window.location.href = `${appleAuthUrl}?${params.toString()}`;
}
```

---

## 🔧 Backend Implementation

### Create Callback Routes
Create API endpoints to handle OAuth callbacks:

```typescript
// routes/auth.ts (Node.js/Express example)

// Google callback
app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  
  try {
    // Exchange code for tokens
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.APP_URL}/auth/google/callback`,
      grant_type: 'authorization_code',
    });
    
    const { access_token } = tokenResponse.data;
    
    // Get user info
    const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    
    const user = userResponse.data;
    
    // Create/update user in your database
    // Generate JWT token
    // Redirect to app with token
    
    res.redirect(`/?token=${yourJWTToken}`);
  } catch (error) {
    res.redirect('/?error=auth_failed');
  }
});

// Facebook callback
app.get('/auth/facebook/callback', async (req, res) => {
  const { code } = req.query;
  
  try {
    // Exchange code for tokens
    const tokenResponse = await axios.get('https://graph.facebook.com/v18.0/oauth/access_token', {
      params: {
        client_id: process.env.FACEBOOK_APP_ID,
        client_secret: process.env.FACEBOOK_APP_SECRET,
        redirect_uri: `${process.env.APP_URL}/auth/facebook/callback`,
        code,
      },
    });
    
    const { access_token } = tokenResponse.data;
    
    // Get user info
    const userResponse = await axios.get('https://graph.facebook.com/me', {
      params: {
        fields: 'id,name,email,picture',
        access_token,
      },
    });
    
    const user = userResponse.data;
    
    // Create/update user in your database
    // Generate JWT token
    // Redirect to app with token
    
    res.redirect(`/?token=${yourJWTToken}`);
  } catch (error) {
    res.redirect('/?error=auth_failed');
  }
});

// Apple callback
app.post('/auth/apple/callback', async (req, res) => {
  const { code, id_token } = req.body;
  
  try {
    // Verify Apple ID token
    const decodedToken = jwt.decode(id_token);
    
    // Create/update user in your database
    // Generate JWT token
    // Redirect to app with token
    
    res.redirect(`/?token=${yourJWTToken}`);
  } catch (error) {
    res.redirect('/?error=auth_failed');
  }
});
```

---

## 📦 Recommended NPM Packages

```bash
# For OAuth implementation
npm install axios jsonwebtoken

# For Google OAuth (alternative)
npm install google-auth-library

# For Facebook OAuth (alternative)
npm install passport passport-facebook

# For Apple OAuth (alternative)
npm install apple-signin-auth

# For environment variables
npm install dotenv
```

---

## 🔒 Security Best Practices

### 1. Environment Variables
Create a `.env` file (never commit this!):
```env
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Facebook OAuth
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

# Apple OAuth
APPLE_CLIENT_ID=your_service_id
APPLE_TEAM_ID=your_team_id
APPLE_KEY_ID=your_key_id
APPLE_PRIVATE_KEY=your_private_key_content

# App
APP_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_key
```

### 2. CSRF Protection
```typescript
// Generate random state for OAuth
const generateRandomState = () => {
  return Math.random().toString(36).substring(2, 15);
};

// Store state in sessionStorage before redirect
sessionStorage.setItem('oauth_state', state);

// Verify state in callback
const savedState = sessionStorage.getItem('oauth_state');
if (savedState !== receivedState) {
  throw new Error('Invalid state parameter');
}
```

### 3. HTTPS in Production
- Always use HTTPS in production
- Update redirect URIs to use `https://`
- Enable secure cookies

---

## 🧪 Testing

### Test URLs
- **Login**: `http://localhost:3000/login`
- **Signup**: `http://localhost:3000/signup`
- **Forgot Password**: `http://localhost:3000/forgot-password`

### Test Social Login
1. Click on Google/Facebook/Apple button
2. Currently shows "will be available soon" message
3. After implementing OAuth, it will redirect to provider
4. User authenticates
5. Redirects back to your callback URL
6. Backend processes authentication
7. User is logged in

---

## 📱 Mobile Considerations

### Deep Linking
For mobile apps, configure deep links:
```
myapp://auth/google/callback
myapp://auth/facebook/callback
myapp://auth/apple/callback
```

### Progressive Web App (PWA)
If using PWA, ensure OAuth works in standalone mode.

---

## 🎯 Next Steps

1. **Set up backend API** for handling OAuth callbacks
2. **Configure environment variables** with your OAuth credentials
3. **Implement token exchange** logic in callback routes
4. **Add user database** to store authenticated users
5. **Implement JWT tokens** for session management
6. **Add protected routes** that require authentication
7. **Test thoroughly** with each provider

---

## 🆘 Troubleshooting

### Common Issues

**"Redirect URI mismatch"**
- Ensure callback URLs match exactly in OAuth console and code
- Check for trailing slashes
- Verify protocol (http vs https)

**"Invalid client"**
- Double-check client ID and secret
- Ensure credentials are for correct environment

**"Scope not allowed"**
- Verify requested scopes are enabled in OAuth console
- Check app review status (Facebook/Apple)

**CORS errors**
- Backend must allow CORS from your frontend domain
- Add proper CORS headers

---

## 📚 Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login/web)
- [Apple Sign In Documentation](https://developer.apple.com/sign-in-with-apple/)
- [OAuth 2.0 Simplified](https://www.oauth.com/)

---

## ✅ Current Status

- ✅ UI Design completed with real estate theme
- ✅ Beautiful background images with overlay
- ✅ Social login buttons (Google, Facebook, Apple)
- ✅ Click handlers with placeholder messages
- ⏳ OAuth configuration (follow this guide)
- ⏳ Backend API implementation (follow this guide)
- ⏳ Production deployment

**The frontend is ready! Now you need to:**
1. Set up OAuth credentials with each provider
2. Implement backend callback endpoints
3. Replace placeholder code with actual OAuth URLs
