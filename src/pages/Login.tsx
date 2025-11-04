import React, { useState } from "react";
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
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  Google,
  Facebook,
  Apple,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { authService } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(3),
  position: "relative",
  background:
    "linear-gradient(135deg, rgba(0, 30, 60, 0.85) 0%, rgba(0, 60, 100, 0.9) 100%)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      'url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    opacity: 0.3,
    zIndex: 0,
  },
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(2),
    alignItems: "flex-start",
    paddingTop: theme.spacing(4),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2, 1.5),
    paddingTop: theme.spacing(3),
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: 20,
  maxWidth: 480,
  width: "100%",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
  animation: "fadeInUp 0.6s ease-out",
  position: "relative",
  zIndex: 1,
  backgroundColor: "rgba(255, 255, 255, 0.98)",
  backdropFilter: "blur(10px)",
  "@keyframes fadeInUp": {
    from: {
      opacity: 0,
      transform: "translateY(30px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(4),
    borderRadius: 16,
    maxWidth: 440,
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3, 2.5),
    borderRadius: 12,
    maxWidth: "100%",
    margin: theme.spacing(0, 1),
  },
  [theme.breakpoints.down(400)]: {
    padding: theme.spacing(2.5, 2),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    transition: "all 0.3s ease",
    fontSize: "1rem",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.15)",
    },
    "&.Mui-focused": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.25)",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "1rem",
  },
  "& .MuiOutlinedInput-input": {
    padding: "14px",
    [theme.breakpoints.down("sm")]: {
      padding: "12px",
      fontSize: "16px", // Prevents zoom on iOS
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: "12px 24px",
  fontSize: "1rem",
  fontWeight: 600,
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
  },
  "&:active": {
    transform: "translateY(0)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "12px 20px",
    fontSize: "0.95rem",
  },
}));

const SocialButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: "10px 8px",
  border: "1px solid #e0e0e0",
  textTransform: "none",
  flex: 1,
  minWidth: 0,
  transition: "all 0.3s ease",
  fontSize: "0.875rem",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    borderColor: "#667eea",
  },
  "& .MuiButton-startIcon": {
    marginRight: theme.spacing(0.5),
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(0.25),
      marginLeft: 0,
    },
  },
  [theme.breakpoints.down("sm")]: {
    padding: "10px 6px",
    fontSize: "0.75rem",
  },
  [theme.breakpoints.down(400)]: {
    padding: "8px 4px",
    fontSize: "0.7rem",
    "& .MuiButton-startIcon": {
      fontSize: "1rem",
    },
  },
}));

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const redirectPath = searchParams.get("redirect") || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rememberMe" ? checked : value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      login(user);

      console.log("Login successful:", user);
      navigate(redirectPath);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setLoading(true);
    console.log(`Initiating ${provider} login...`);

    // Simulate social login process
    setTimeout(() => {
      if (provider === "Google") {
        // Google OAuth URL (replace with your actual OAuth configuration)
        // window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email%20profile';
        console.log("Google OAuth initiated");
        setError(`${provider} login will be available soon!`);
      } else if (provider === "Facebook") {
        // Facebook OAuth URL (replace with your actual OAuth configuration)
        // window.location.href = 'https://www.facebook.com/v12.0/dialog/oauth?client_id=YOUR_APP_ID&redirect_uri=YOUR_REDIRECT_URI&scope=email,public_profile';
        console.log("Facebook OAuth initiated");
        setError(`${provider} login will be available soon!`);
      } else if (provider === "Apple") {
        // Apple OAuth URL (replace with your actual OAuth configuration)
        // window.location.href = 'https://appleid.apple.com/auth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code';
        console.log("Apple OAuth initiated");
        setError(`${provider} login will be available soon!`);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <StyledContainer maxWidth={false}>
      <StyledPaper elevation={8}>
        {/* Header */}
        <Box textAlign="center" mb={4} sx={{ mb: { xs: 3, sm: 4 } }}>
          <Typography
            variant="h4"
            fontWeight="700"
            gutterBottom
            sx={{
              background: "linear-gradient(135deg, #d92228 0%, #b91c22 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "fadeIn 0.8s ease-out",
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.125rem" },
              "@keyframes fadeIn": {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
            }}
          >
            {t.pages.login.title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            {t.pages.login.subtitle}
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: { xs: 2, sm: 3 },
              borderRadius: 2,
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            {error}
          </Alert>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={{ xs: 2, sm: 2.5 }}>
            {/* Email Field */}
            <StyledTextField
              fullWidth
              label={t.pages.login.email}
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
              label={t.pages.login.password}
              name="password"
              type={showPassword ? "text" : "password"}
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
              flexWrap="wrap"
              gap={1}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    color="primary"
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: { xs: "1.25rem", sm: "1.5rem" },
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                    {t.pages.login.rememberMe}
                  </Typography>
                }
              />
              <Link
                component={RouterLink}
                to="/forgot-password"
                sx={{
                  textDecoration: "none",
                  color: "#d92228",
                  fontWeight: 500,
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {t.pages.login.forgotPassword}
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
                background: "linear-gradient(135deg, #d92228 0%, #b91c22 100%)",
                mt: 1,
                color: "white",
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                t.pages.login.loginButton
              )}
            </StyledButton>
          </Box>
        </form>

        {/* Divider */}
        <Divider sx={{ my: { xs: 2.5, sm: 3 } }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.813rem", sm: "0.875rem" } }}
          >
            {t.pages.login.orContinueWith}
          </Typography>
        </Divider>

        {/* Social Login */}
        <Box display="flex" gap={{ xs: 1, sm: 1.5 }} mb={{ xs: 2.5, sm: 3 }}>
          <SocialButton
            onClick={() => handleSocialLogin("Google")}
            startIcon={
              <Google sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }} />
            }
          >
            Google
          </SocialButton>
          <SocialButton
            onClick={() => handleSocialLogin("Facebook")}
            startIcon={
              <Facebook sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }} />
            }
          >
            Facebook
          </SocialButton>
          <SocialButton
            onClick={() => handleSocialLogin("Apple")}
            startIcon={
              <Apple sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }} />
            }
          >
            Apple
          </SocialButton>
        </Box>

        {/* Sign Up Link */}
        <Box textAlign="center">
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            {t.pages.login.noAccount}{" "}
            <Link
              component={RouterLink}
              to="/signup"
              sx={{
                color: "#d92228",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: { xs: "0.875rem", sm: "1rem" },
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {t.pages.login.signupLink}
            </Link>
          </Typography>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Login;
