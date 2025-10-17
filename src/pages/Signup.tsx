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
  LinearProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
  Phone,
  Google,
  Facebook,
  Apple,
  CheckCircle,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  maxHeight: 'none',
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
    backgroundImage: 'url("https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1996&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    opacity: 0.3,
    zIndex: 0,
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3, 2),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    alignItems: 'flex-start',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 1.5),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: 20,
  maxWidth: 500,
  width: '100%',
  maxHeight: '95vh',
  overflowY: 'auto',
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
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(0,0,0,0.05)',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(217,34,40,0.3)',
    borderRadius: '10px',
    '&:hover': {
      background: 'rgba(217,34,40,0.5)',
    },
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4),
    borderRadius: 16,
    maxWidth: 460,
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 2.5),
    borderRadius: 12,
    maxWidth: '100%',
    margin: theme.spacing(0, 1),
    maxHeight: '92vh',
  },
  [theme.breakpoints.down(400)]: {
    padding: theme.spacing(2.5, 2),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
    },
    '&.Mui-focused': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.25)',
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: '1rem',
  },
  '& .MuiOutlinedInput-input': {
    padding: '14px',
    [theme.breakpoints.down('sm')]: {
      padding: '12px',
      fontSize: '16px', // Prevents zoom on iOS
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
  [theme.breakpoints.down('sm')]: {
    padding: '12px 20px',
    fontSize: '0.95rem',
  },
}));

const SocialButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: '10px 8px',
  border: '1px solid #e0e0e0',
  textTransform: 'none',
  flex: 1,
  minWidth: 0,
  transition: 'all 0.3s ease',
  fontSize: '0.875rem',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderColor: '#667eea',
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(0.5),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(0.25),
      marginLeft: 0,
    },
  },
  [theme.breakpoints.down('sm')]: {
    padding: '10px 6px',
    fontSize: '0.75rem',
  },
  [theme.breakpoints.down(400)]: {
    padding: '8px 4px',
    fontSize: '0.7rem',
    '& .MuiButton-startIcon': {
      fontSize: '1rem',
    },
  },
}));

const PasswordStrengthBar = styled(Box)<{ strength: number }>(
  ({ theme, strength }) => ({
    height: 4,
    borderRadius: 2,
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
    marginTop: 8,
    '& .strength-fill': {
      height: '100%',
      width: `${strength}%`,
      backgroundColor:
        strength < 30
          ? '#f44336'
          : strength < 60
          ? '#ff9800'
          : strength < 80
          ? '#2196f3'
          : '#4caf50',
      transition: 'all 0.3s ease',
    },
  })
);

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
    return Math.min(strength, 100);
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'agreeToTerms' ? checked : value,
    }));
    setError('');
  };

  const validateForm = (): boolean => {
    if (!formData.fullName || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the Terms and Conditions');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Signup successful:', formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }, 1500);
  };

  const handleSocialSignup = (provider: string) => {
    setLoading(true);
    console.log(`Initiating ${provider} signup...`);
    
    // Simulate social signup process
    setTimeout(() => {
      if (provider === 'Google') {
        // Google OAuth URL (replace with your actual OAuth configuration)
        // const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
        // const params = new URLSearchParams({
        //   client_id: 'YOUR_GOOGLE_CLIENT_ID',
        //   redirect_uri: `${window.location.origin}/auth/google/callback`,
        //   response_type: 'code',
        //   scope: 'email profile',
        //   access_type: 'offline',
        //   prompt: 'consent',
        // });
        // window.location.href = `${googleAuthUrl}?${params.toString()}`;
        console.log('Google OAuth initiated for signup');
        setError(`${provider} signup will be available soon!`);
      } else if (provider === 'Facebook') {
        // Facebook OAuth URL (replace with your actual OAuth configuration)
        // const facebookAuthUrl = `https://www.facebook.com/v12.0/dialog/oauth`;
        // const params = new URLSearchParams({
        //   client_id: 'YOUR_FACEBOOK_APP_ID',
        //   redirect_uri: `${window.location.origin}/auth/facebook/callback`,
        //   scope: 'email,public_profile',
        //   response_type: 'code',
        // });
        // window.location.href = `${facebookAuthUrl}?${params.toString()}`;
        console.log('Facebook OAuth initiated for signup');
        setError(`${provider} signup will be available soon!`);
      } else if (provider === 'Apple') {
        // Apple OAuth URL (replace with your actual OAuth configuration)
        // const appleAuthUrl = `https://appleid.apple.com/auth/authorize`;
        // const params = new URLSearchParams({
        //   client_id: 'YOUR_APPLE_CLIENT_ID',
        //   redirect_uri: `${window.location.origin}/auth/apple/callback`,
        //   response_type: 'code',
        //   scope: 'name email',
        //   response_mode: 'form_post',
        // });
        // window.location.href = `${appleAuthUrl}?${params.toString()}`;
        console.log('Apple OAuth initiated for signup');
        setError(`${provider} signup will be available soon!`);
      }
      setLoading(false);
    }, 1000);
  };

  if (success) {
    return (
      <StyledContainer maxWidth={false}>
        <StyledPaper elevation={8}>
          <Box textAlign="center" py={4}>
            <CheckCircle
              sx={{
                fontSize: 80,
                color: '#4caf50',
                mb: 2,
                animation: 'scaleIn 0.5s ease-out',
                '@keyframes scaleIn': {
                  from: { transform: 'scale(0)' },
                  to: { transform: 'scale(1)' },
                },
              }}
            />
            <Typography 
              variant="h4" 
              fontWeight="700" 
              gutterBottom
              sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' } }}
            >
              Account Created!
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              mb={2}
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            >
              Your account has been successfully created.
            </Typography>
            <LinearProgress sx={{ borderRadius: 2 }} />
            <Typography 
              variant="body2" 
              color="text.secondary" 
              mt={2}
              sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' } }}
            >
              Redirecting to login...
            </Typography>
          </Box>
        </StyledPaper>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer maxWidth={false}>
      <StyledPaper elevation={8}>
        {/* Header */}
        <Box textAlign="center" mb={{ xs: 3, sm: 4 }}>
          <Typography
            variant="h4"
            fontWeight="700"
            gutterBottom
            sx={{
              background: 'linear-gradient(135deg, #d92228 0%, #b91c22 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'fadeIn 0.8s ease-out',
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' },
              '@keyframes fadeIn': {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
            }}
          >
            Create Account
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            Join us to discover amazing properties
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: { xs: 2, sm: 3 }, 
              borderRadius: 2,
              fontSize: { xs: '0.875rem', sm: '1rem' },
            }}
          >
            {error}
          </Alert>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={{ xs: 2, sm: 2.5 }}>
            {/* Full Name Field */}
            <StyledTextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
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
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Phone Field */}
            <StyledTextField
              fullWidth
              label="Phone Number (Optional)"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="action" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Password Field */}
            <Box>
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
              {formData.password && (
                <PasswordStrengthBar strength={passwordStrength}>
                  <div className="strength-fill" />
                </PasswordStrengthBar>
              )}
              {formData.password && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 0.5, display: 'block' }}
                >
                  Password strength:{' '}
                  {passwordStrength < 30
                    ? 'Weak'
                    : passwordStrength < 60
                    ? 'Fair'
                    : passwordStrength < 80
                    ? 'Good'
                    : 'Strong'}
                </Typography>
              )}
            </Box>

            {/* Confirm Password Field */}
            <StyledTextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              error={
                formData.confirmPassword !== '' &&
                formData.password !== formData.confirmPassword
              }
              helperText={
                formData.confirmPassword !== '' &&
                formData.password !== formData.confirmPassword
                  ? 'Passwords do not match'
                  : ''
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Terms and Conditions */}
            <FormControlLabel
              control={
                <Checkbox
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  color="primary"
                  sx={{
                    '& .MuiSvgIcon-root': {
                      fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    },
                  }}
                />
              }
              label={
                <Typography 
                  variant="body2"
                  sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' } }}
                >
                  I agree to the{' '}
                  <Link
                    href="/terms"
                    sx={{ 
                      color: '#d92228', 
                      textDecoration: 'none',
                      fontSize: { xs: '0.813rem', sm: '0.875rem' },
                    }}
                  >
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/privacy"
                    sx={{ 
                      color: '#d92228', 
                      textDecoration: 'none',
                      fontSize: { xs: '0.813rem', sm: '0.875rem' },
                    }}
                  >
                    Privacy Policy
                  </Link>
                </Typography>
              }
            />

            {/* Sign Up Button */}
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
                'Create Account'
              )}
            </StyledButton>
          </Box>
        </form>

        {/* Divider */}
        <Divider sx={{ my: { xs: 2.5, sm: 3 } }}>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' } }}
          >
            OR
          </Typography>
        </Divider>

        {/* Social Signup */}
        <Box display="flex" gap={{ xs: 1, sm: 1.5 }} mb={{ xs: 2.5, sm: 3 }}>
          <SocialButton
            onClick={() => handleSocialSignup('Google')}
            startIcon={<Google sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }} />}
          >
            Google
          </SocialButton>
          <SocialButton
            onClick={() => handleSocialSignup('Facebook')}
            startIcon={<Facebook sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }} />}
          >
            Facebook
          </SocialButton>
          <SocialButton
            onClick={() => handleSocialSignup('Apple')}
            startIcon={<Apple sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }} />}
          >
            Apple
          </SocialButton>
        </Box>

        {/* Login Link */}
        <Box textAlign="center">
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            Already have an account?{' '}
            <Link
              component={RouterLink}
              to="/login"
              sx={{
                color: '#d92228',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: { xs: '0.875rem', sm: '1rem' },
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Log In
            </Link>
          </Typography>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Signup;
