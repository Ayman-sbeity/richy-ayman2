// OAuth Configuration Constants
// These will be used in your React app once OAuth is set up

interface GoogleConfig {
  authUrl: string;
  clientId: string;
  redirectUri: string;
  scope: string;
  responseType: string;
}

interface FacebookConfig {
  authUrl: string;
  appId: string;
  redirectUri: string;
  scope: string;
  responseType: string;
}

interface AppleConfig {
  authUrl: string;
  clientId: string;
  redirectUri: string;
  scope: string;
  responseType: string;
  responseMode: string;
}

export const OAUTH_CONFIG = {
  google: {
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
    redirectUri: `${window.location.origin}/auth/google/callback`,
    scope: 'email profile',
    responseType: 'code',
  } as GoogleConfig,
  
  facebook: {
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    appId: process.env.REACT_APP_FACEBOOK_APP_ID || '',
    redirectUri: `${window.location.origin}/auth/facebook/callback`,
    scope: 'email,public_profile',
    responseType: 'code',
  } as FacebookConfig,
  
  apple: {
    authUrl: 'https://appleid.apple.com/auth/authorize',
    clientId: process.env.REACT_APP_APPLE_CLIENT_ID || '',
    redirectUri: `${window.location.origin}/auth/apple/callback`,
    scope: 'name email',
    responseType: 'code',
    responseMode: 'form_post',
  } as AppleConfig,
};

// Helper function to generate OAuth URL
export const generateOAuthUrl = (
  provider: 'google' | 'facebook' | 'apple',
  state?: string
): string => {
  const config = OAUTH_CONFIG[provider];
  
  let clientIdParam: string;
  if (provider === 'facebook') {
    clientIdParam = (config as FacebookConfig).appId;
  } else {
    clientIdParam = (config as GoogleConfig | AppleConfig).clientId;
  }
  
  const params: Record<string, string> = {
    client_id: clientIdParam,
    redirect_uri: config.redirectUri,
    response_type: config.responseType,
    scope: config.scope,
  };
  
  if (state) {
    params.state = state;
  }
  
  if (provider === 'apple') {
    params.response_mode = (config as AppleConfig).responseMode;
  }
  
  const searchParams = new URLSearchParams(params);
  return `${config.authUrl}?${searchParams.toString()}`;
};

// Helper function to generate random state for CSRF protection
export const generateRandomState = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Example usage in Login.tsx or Signup.tsx:
/*
import { generateOAuthUrl, generateRandomState } from './config/oauthConfig';

const handleSocialLogin = (provider: 'google' | 'facebook' | 'apple') => {
  const state = generateRandomState();
  sessionStorage.setItem('oauth_state', state);
  
  const authUrl = generateOAuthUrl(provider, state);
  window.location.href = authUrl;
};
*/
