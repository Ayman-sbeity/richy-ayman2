import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Email, ArrowBack, CheckCircle } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

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
      'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    opacity: 0.3,
    zIndex: 0,
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
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
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.15)",
    },
    "&.Mui-focused": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.25)",
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
}));

const ForgotPassword: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError(t.pages.forgotPassword.validation.emailRequired);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(t.pages.forgotPassword.validation.invalidEmail);
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Password reset email sent to:", email);
      setSuccess(true);
      setLoading(false);
    }, 1500);
  };

  if (success) {
    return (
      <StyledContainer maxWidth={false}>
        <StyledPaper elevation={8}>
          <Box textAlign="center" py={2}>
            <CheckCircle
              sx={{
                fontSize: 80,
                color: "#4caf50",
                mb: 2,
                animation: "scaleIn 0.5s ease-out",
                "@keyframes scaleIn": {
                  from: { transform: "scale(0)" },
                  to: { transform: "scale(1)" },
                },
              }}
            />
            <Typography variant="h4" fontWeight="700" gutterBottom>
              {t.pages.forgotPassword.success.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              {t.pages.forgotPassword.success.description}
            </Typography>
            <Typography
              variant="body1"
              fontWeight="600"
              color="primary"
              sx={{ mb: 3 }}
            >
              {email}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={4}>
              {t.pages.forgotPassword.success.checkSpam}
            </Typography>
            <StyledButton
              href="/login"
              variant="contained"
              fullWidth
              sx={{
                background: "linear-gradient(135deg, #d92228 0%, #b91c22 100%)",
                color: "white",
              }}
            >
              {t.pages.forgotPassword.success.backToLogin}
            </StyledButton>
          </Box>
        </StyledPaper>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer maxWidth={false}>
      <StyledPaper elevation={8}>
        {/* Back Button */}
        <Box mb={3}>
          <Button
            component={RouterLink}
            to="/login"
            startIcon={<ArrowBack />}
            sx={{
              color: "#d92228",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "rgba(217, 34, 40, 0.05)",
              },
            }}
          >
            {t.pages.forgotPassword.backToLogin}
          </Button>
        </Box>

        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h4"
            fontWeight="700"
            gutterBottom
            sx={{
              background: "linear-gradient(135deg, #d92228 0%, #b91c22 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "fadeIn 0.8s ease-out",
              "@keyframes fadeIn": {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
            }}
          >
            {t.pages.forgotPassword.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t.pages.forgotPassword.subtitle}
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {/* Reset Form */}
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={3}>
            {/* Email Field */}
            <StyledTextField
              fullWidth
              label={t.pages.forgotPassword.form.email}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Submit Button */}
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                background: "linear-gradient(135deg, #d92228 0%, #b91c22 100%)",
                color: "white",
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                t.pages.forgotPassword.form.sendResetLink
              )}
            </StyledButton>
          </Box>
        </form>

        {/* Additional Help */}
        <Box textAlign="center" mt={4}>
          <Typography variant="body2" color="text.secondary">
            {t.pages.forgotPassword.remember.question}{" "}
            <Link
              component={RouterLink}
              to="/login"
              sx={{
                color: "#d92228",
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {t.pages.forgotPassword.remember.link}
            </Link>
          </Typography>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default ForgotPassword;
