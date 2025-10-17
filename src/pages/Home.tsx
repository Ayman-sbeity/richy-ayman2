import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SearchBar } from "../components/UI";

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  background: `url('/mountainhead-house.webp') no-repeat center center`,
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
  color: "white",
  padding: theme.spacing(15, 3),
  textAlign: "center",
  minHeight: '70vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    zIndex: 1,
  },
}));

const HeroContent = styled(Box)(({ theme }) => ({
  maxWidth: 850,
  margin: "0 auto",
  position: 'relative',
  zIndex: 2,
}));

const ContentSection = styled(Box)(({ theme }) => ({
  padding: "80px 24px",
  backgroundColor: "#f8f9fa",
  position: 'relative',
}));

const Home: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  return (
    <Box>
      <HeroSection>
        <HeroContent>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 600,
              mb: 3,
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
              fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
              letterSpacing: '0.5px',
              lineHeight: 1.3,
              color: '#ffffff',
              fontFamily: 'Georgia, serif',
            }}
          >
            Find Your Dream Home
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 5,
              opacity: 0.95,
              fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.35rem" },
              textShadow: "0 1px 4px rgba(0, 0, 0, 0.5)",
              fontWeight: 300,
              letterSpacing: '0.3px',
              lineHeight: 1.6,
              maxWidth: '650px',
              margin: '0 auto 40px',
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
            }}
          >
            Discover the perfect property with our comprehensive real estate
            platform
          </Typography>
          <Box 
            sx={{ 
              maxWidth: 600, 
              margin: "0 auto",
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
                transition: 'box-shadow 0.3s ease',
                '&:hover': {
                  boxShadow: '0 6px 24px rgba(0, 0, 0, 0.35)',
                },
              },
            }}
          >
            <SearchBar onSearch={handleSearch} variant="hero" fullWidth />
          </Box>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: "center",
              mb: 3,
              color: "#1a1a1a",
              fontWeight: 500,
              fontSize: { xs: "1.875rem", sm: "2.25rem", md: "2.75rem" },
              letterSpacing: '0.5px',
              fontFamily: 'Georgia, serif',
              position: 'relative',
              paddingBottom: '16px',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '2px',
                backgroundColor: '#d92228',
              },
            }}
          >
            Welcome to RealtyFinder
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              color: "#555555",
              maxWidth: 650,
              margin: "24px auto 0",
              lineHeight: 1.7,
              fontSize: { xs: "1.05rem", sm: "1.15rem", md: "1.2rem" },
              fontWeight: 400,
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
            }}
          >
            Your trusted partner in finding the perfect home.
          </Typography>
        </Container>
      </ContentSection>
    </Box>
  );
};

export default Home;
