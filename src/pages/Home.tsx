import React, { useState } from "react";
import { Box, Typography, Container, Button, Select, MenuItem, FormControl, InputLabel, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

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

const SearchContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  borderRadius: '8px',
  padding: '32px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  maxWidth: '800px',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    padding: '24px 16px',
  },
}));

const Home: React.FC = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleSearch = () => {
    console.log("Search:", { location, propertyType, priceRange });
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
          <SearchContainer>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                color: '#333',
                fontWeight: 500,
                textAlign: 'center',
                fontSize: { xs: '1rem', sm: '1.1rem' },
              }}
            >
              Start Your Property Search
            </Typography>
            
            <Stack spacing={2}>
              <Box 
                sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                  gap: 2,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel>Location</InputLabel>
                  <Select
                    value={location}
                    label="Location"
                    onChange={(e) => setLocation(e.target.value)}
                    sx={{
                      '& .MuiSelect-select': {
                        display: 'flex',
                        alignItems: 'center',
                      },
                    }}
                  >
                    <MenuItem value="new-york">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon sx={{ color: '#d92228', fontSize: '1.2rem' }} />
                        New York, NY
                      </Box>
                    </MenuItem>
                    <MenuItem value="los-angeles">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon sx={{ color: '#d92228', fontSize: '1.2rem' }} />
                        Los Angeles, CA
                      </Box>
                    </MenuItem>
                    <MenuItem value="chicago">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon sx={{ color: '#d92228', fontSize: '1.2rem' }} />
                        Chicago, IL
                      </Box>
                    </MenuItem>
                    <MenuItem value="houston">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon sx={{ color: '#d92228', fontSize: '1.2rem' }} />
                        Houston, TX
                      </Box>
                    </MenuItem>
                    <MenuItem value="miami">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon sx={{ color: '#d92228', fontSize: '1.2rem' }} />
                        Miami, FL
                      </Box>
                    </MenuItem>
                    <MenuItem value="seattle">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon sx={{ color: '#d92228', fontSize: '1.2rem' }} />
                        Seattle, WA
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Property Type</InputLabel>
                  <Select
                    value={propertyType}
                    label="Property Type"
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                    <MenuItem value="house">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <HomeIcon sx={{ color: '#d92228', fontSize: '1.2rem' }} />
                        House
                      </Box>
                    </MenuItem>
                    <MenuItem value="apartment">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <HomeIcon sx={{ color: '#d92228', fontSize: '1.2rem' }} />
                        Apartment
                      </Box>
                    </MenuItem>
                    <MenuItem value="condo">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <HomeIcon sx={{ color: '#d92228', fontSize: '1.2rem' }} />
                        Condo
                      </Box>
                    </MenuItem>
                    <MenuItem value="townhouse">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <HomeIcon sx={{ color: '#d92228', fontSize: '1.2rem' }} />
                        Townhouse
                      </Box>
                    </MenuItem>
                    <MenuItem value="villa">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <HomeIcon sx={{ color: '#d92228', fontSize: '1.2rem' }} />
                        Villa
                      </Box>
                    </MenuItem>
                    <MenuItem value="land">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <HomeIcon sx={{ color: '#d92228', fontSize: '1.2rem' }} />
                        Land
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Price Range</InputLabel>
                  <Select
                    value={priceRange}
                    label="Price Range"
                    onChange={(e) => setPriceRange(e.target.value)}
                  >
                    <MenuItem value="0-200k">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AttachMoneyIcon sx={{ color: '#d92228', fontSize: '1.2rem' }} />
                        $0 - $200,000
                      </Box>
                    </MenuItem>
                    <MenuItem value="200k-400k">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AttachMoneyIcon sx={{ color: '#d92228', fontSize: '1.2rem' }} />
                        $200,000 - $400,000
                      </Box>
                    </MenuItem>
                    <MenuItem value="400k-600k">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AttachMoneyIcon sx={{ color: '#d92228', fontSize: '1.2rem' }} />
                        $400,000 - $600,000
                      </Box>
                    </MenuItem>
                    <MenuItem value="600k-800k">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AttachMoneyIcon sx={{ color: '#d92228', fontSize: '1.2rem' }} />
                        $600,000 - $800,000
                      </Box>
                    </MenuItem>
                    <MenuItem value="800k-1m">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AttachMoneyIcon sx={{ color: '#d92228', fontSize: '1.2rem' }} />
                        $800,000 - $1,000,000
                      </Box>
                    </MenuItem>
                    <MenuItem value="1m+">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AttachMoneyIcon sx={{ color: '#d92228', fontSize: '1.2rem' }} />
                        $1,000,000+
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleSearch}
                startIcon={<SearchIcon />}
                sx={{
                  backgroundColor: '#d92228',
                  color: 'white',
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  textTransform: 'none',
                  boxShadow: '0 4px 12px rgba(217, 34, 40, 0.3)',
                  '&:hover': {
                    backgroundColor: '#b91c22',
                    boxShadow: '0 6px 16px rgba(217, 34, 40, 0.4)',
                  },
                }}
              >
                Search Properties
              </Button>
            </Stack>
          </SearchContainer>
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
