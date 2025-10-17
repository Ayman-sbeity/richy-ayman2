import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Divider,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  Google,
  Facebook,
  Apple,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  position: 'relative',
  background: 'linear-gradient(135deg, rgba(0, 30, 60, 0.85) 0%, rgba(0, 60, 100, 0.9) 100%)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    opacity: 0.3,
    zIndex: 0,
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: 20,
  maxWidth: 480,
  width: '100%',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
  animation: 'fadeInUp 0.6s ease-out',
  position: 'relative',
  zIndex: 1,
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  backdropFilter: 'blur(10px)',
  '@keyframes fadeInUp': {
    from: {
      opacity: 0,
      transform: 'translateY(30px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
    },
    '&.Mui-focused': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.25)',
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: '12px 24px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

const SocialButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: '10px',
  border: '1px solid #e0e0e0',
  textTransform: 'none',
  flex: 1,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderColor: '#667eea',
  },
}));

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (formData.email && formData.password) {
        // Success
        console.log('Login successful:', formData);
        navigate('/');
      } else {
        setError('Please enter valid credentials');
      }
      setLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    setLoading(true);
    console.log(`Initiating ${provider} login...`);
    
    // Simulate social login process
    setTimeout(() => {
      if (provider === 'Google') {
        // Google OAuth URL (replace with your actual OAuth configuration)
        // window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email%20profile';
        console.log('Google OAuth initiated');
        setError(`${provider} login will be available soon!`);
      } else if (provider === 'Facebook') {
        // Facebook OAuth URL (replace with your actual OAuth configuration)
        // window.location.href = 'https://www.facebook.com/v12.0/dialog/oauth?client_id=YOUR_APP_ID&redirect_uri=YOUR_REDIRECT_URI&scope=email,public_profile';
        console.log('Facebook OAuth initiated');
        setError(`${provider} login will be available soon!`);
      } else if (provider === 'Apple') {
        // Apple OAuth URL (replace with your actual OAuth configuration)
        // window.location.href = 'https://appleid.apple.com/auth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code';
        console.log('Apple OAuth initiated');
        setError(`${provider} login will be available soon!`);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <StyledContainer maxWidth={false}>
      <StyledPaper elevation={8}>
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h4"
            fontWeight="700"
            gutterBottom
            sx={{
              background: 'linear-gradient(135deg, #d92228 0%, #b91c22 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'fadeIn 0.8s ease-out',
              '@keyframes fadeIn': {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
            }}
          >
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Log in to find your dream property
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2.5}>
            {/* Email Field */}
            <StyledTextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Password Field */}
            <StyledTextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Remember Me & Forgot Password */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Link
                component={RouterLink}
                to="/forgot-password"
                sx={{
                  textDecoration: 'none',
                  color: '#d92228',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Forgot Password?
              </Link>
            </Box>

            {/* Login Button */}
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                background: 'linear-gradient(135deg, #d92228 0%, #b91c22 100%)',
                mt: 1,
                color: 'white',
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Log In'
              )}
            </StyledButton>
          </Box>
        </form>

        {/* Divider */}
        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>

        {/* Social Login */}
        <Box display="flex" gap={1.5} mb={3}>
          <SocialButton
            onClick={() => handleSocialLogin('Google')}
            startIcon={<Google />}
          >
            Google
          </SocialButton>
          <SocialButton
            onClick={() => handleSocialLogin('Facebook')}
            startIcon={<Facebook />}
          >
            Facebook
          </SocialButton>
          <SocialButton
            onClick={() => handleSocialLogin('Apple')}
            startIcon={<Apple />}
          >
            Apple
          </SocialButton>
        </Box>

        {/* Sign Up Link */}
        <Box textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link
              component={RouterLink}
              to="/signup"
              sx={{
                color: '#d92228',
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Login;
