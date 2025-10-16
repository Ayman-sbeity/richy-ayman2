import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SearchBar } from "../components/UI";

const HeroSection = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #d92228 0%, #b91c22 100%)",
  color: "white",
  padding: theme.spacing(10, 3),
  textAlign: "center",
}));

const HeroContent = styled(Box)(({ theme }) => ({
  maxWidth: 800,
  margin: "0 auto",
}));

const ContentSection = styled(Box)(({ theme }) => ({
  padding: "64px 24px",
  backgroundColor: "#f8f9fa",
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
              fontWeight: 700,
              mb: 3,
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
            }}
          >
            Find Your Dream Home
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 5,
              opacity: 0.95,
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            Discover the perfect property with our comprehensive real estate
            platform
          </Typography>
          <Box sx={{ maxWidth: 600, margin: "0 auto" }}>
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
              color: "#333",
              fontWeight: 600,
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
            }}
          >
            Welcome to RealtyFinder
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              color: "#666",
              maxWidth: 600,
              margin: "0 auto",
              lineHeight: 1.6,
              fontSize: { xs: "1rem", sm: "1.1rem" },
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
