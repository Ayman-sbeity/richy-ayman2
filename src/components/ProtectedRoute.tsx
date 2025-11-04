import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Box, Container, Typography, Button, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useAuth } from "../contexts/AuthContext";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  textAlign: "center",
  maxWidth: 500,
  margin: "80px auto",
  borderRadius: 16,
  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
  animation: "fadeInUp 0.6s ease-out",
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
}));

const LockIconWrapper = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 80,
  height: 80,
  borderRadius: "50%",
  backgroundColor: "rgba(217, 34, 40, 0.1)",
  marginBottom: theme.spacing(3),
}));

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Show authentication required message instead of redirecting immediately
    return (
      <Container>
        <StyledPaper elevation={3}>
          <LockIconWrapper>
            <LockIcon sx={{ fontSize: 40, color: "#d92228" }} />
          </LockIconWrapper>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "#1a1a1a",
            }}
          >
            Authentication Required
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#666",
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            You need to be logged in to access this page. Please sign in to your
            account or create a new one to continue.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<LoginIcon />}
              href={`/login?redirect=${encodeURIComponent(location.pathname)}`}
              sx={{
                backgroundColor: "#d92228",
                color: "white",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(217, 34, 40, 0.3)",
                "&:hover": {
                  backgroundColor: "#b91c22",
                  boxShadow: "0 6px 16px rgba(217, 34, 40, 0.4)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Log In
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<PersonAddIcon />}
              href={`/signup?redirect=${encodeURIComponent(location.pathname)}`}
              sx={{
                borderColor: "#d92228",
                color: "#d92228",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2,
                borderWidth: 2,
                "&:hover": {
                  borderColor: "#b91c22",
                  backgroundColor: "rgba(217, 34, 40, 0.05)",
                  borderWidth: 2,
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Sign Up
            </Button>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: "#999",
              mt: 3,
              fontSize: "0.9rem",
            }}
          >
            Don't have an account? Sign up now and start listing your
            properties.
          </Typography>
        </StyledPaper>
      </Container>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
