import React, { useState } from "react";
import { Box, Typography, Container, Button, Select, MenuItem, FormControl, InputLabel, Stack, Card, CardMedia, CardContent, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ApartmentIcon from '@mui/icons-material/Apartment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import VerifiedIcon from '@mui/icons-material/Verified';

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
                    <MenuItem value="beirut">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon sx={{ color: '#d92228', fontSize: '1.2rem' }} />
                        Beirut
                      </Box>
                    </MenuItem>
                    <MenuItem value="jounieh">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon sx={{ color: '#d92228', fontSize: '1.2rem' }} />
                        Jounieh
                      </Box>
                    </MenuItem>
                    <MenuItem value="byblos">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon sx={{ color: '#d92228', fontSize: '1.2rem' }} />
                        Byblos (Jbeil)
                      </Box>
                    </MenuItem>
                    <MenuItem value="tripoli">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon sx={{ color: '#d92228', fontSize: '1.2rem' }} />
                        Tripoli
                      </Box>
                    </MenuItem>
                    <MenuItem value="saida">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon sx={{ color: '#d92228', fontSize: '1.2rem' }} />
                        Saida (Sidon)
                      </Box>
                    </MenuItem>
                    <MenuItem value="batroun">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon sx={{ color: '#d92228', fontSize: '1.2rem' }} />
                        Batroun
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

      {/* Stats Section */}
      <Box sx={{ backgroundColor: '#fff', py: 6 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 4,
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <ApartmentIcon sx={{ fontSize: '3rem', color: '#d92228', mb: 2 }} />
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
                5,000+
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
                Properties Listed
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <PeopleIcon sx={{ fontSize: '3rem', color: '#d92228', mb: 2 }} />
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
                200+
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
                Expert Agents
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <TrendingUpIcon sx={{ fontSize: '3rem', color: '#d92228', mb: 2 }} />
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
                15+
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
                Cities Covered
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <VerifiedIcon sx={{ fontSize: '3rem', color: '#d92228', mb: 2 }} />
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
                98%
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
                Customer Satisfaction
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Featured Properties Section */}
      <ContentSection>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: "center",
              mb: 2,
              color: "#1a1a1a",
              fontWeight: 500,
              fontSize: { xs: "1.875rem", sm: "2.25rem", md: "2.75rem" },
              letterSpacing: '0.5px',
              fontFamily: 'Georgia, serif',
            }}
          >
            Featured Properties
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "#666",
              mb: 6,
              fontSize: '1.1rem',
            }}
          >
            Discover our handpicked selection of premium properties across Lebanon
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 4,
            }}
          >
            {/* Property 1 */}
            <Card
              sx={{
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="240"
                image="/mountainhead-house.webp"
                alt="Luxury Villa in Beirut"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Chip
                  label="For Sale"
                  size="small"
                  sx={{
                    backgroundColor: '#d92228',
                    color: 'white',
                    fontWeight: 500,
                    mb: 2,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Luxury Villa in Beirut
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#666', mb: 2, display: 'flex', alignItems: 'center', gap: 0.5 }}
                >
                  <LocationOnIcon sx={{ fontSize: '1rem', color: '#d92228' }} />
                  Achrafieh, Beirut
                </Typography>
                <Typography variant="h5" sx={{ color: '#d92228', fontWeight: 700 }}>
                  $850,000
                </Typography>
                <Typography variant="body2" sx={{ color: '#999', mt: 1 }}>
                  4 Beds • 3 Baths • 3,200 sqft
                </Typography>
              </CardContent>
            </Card>

            {/* Property 2 */}
            <Card
              sx={{
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="240"
                image="/mountainhead-house.webp"
                alt="Modern Apartment in Jounieh"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Chip
                  label="For Rent"
                  size="small"
                  sx={{
                    backgroundColor: '#28a745',
                    color: 'white',
                    fontWeight: 500,
                    mb: 2,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Modern Apartment in Jounieh
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#666', mb: 2, display: 'flex', alignItems: 'center', gap: 0.5 }}
                >
                  <LocationOnIcon sx={{ fontSize: '1rem', color: '#d92228' }} />
                  Maameltein, Jounieh
                </Typography>
                <Typography variant="h5" sx={{ color: '#d92228', fontWeight: 700 }}>
                  $2,500/mo
                </Typography>
                <Typography variant="body2" sx={{ color: '#999', mt: 1 }}>
                  3 Beds • 2 Baths • 1,800 sqft
                </Typography>
              </CardContent>
            </Card>

            {/* Property 3 */}
            <Card
              sx={{
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="240"
                image="/mountainhead-house.webp"
                alt="Beachfront Property in Byblos"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Chip
                  label="For Sale"
                  size="small"
                  sx={{
                    backgroundColor: '#d92228',
                    color: 'white',
                    fontWeight: 500,
                    mb: 2,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Beachfront Property in Byblos
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#666', mb: 2, display: 'flex', alignItems: 'center', gap: 0.5 }}
                >
                  <LocationOnIcon sx={{ fontSize: '1rem', color: '#d92228' }} />
                  Old Souk, Byblos
                </Typography>
                <Typography variant="h5" sx={{ color: '#d92228', fontWeight: 700 }}>
                  $1,200,000
                </Typography>
                <Typography variant="body2" sx={{ color: '#999', mt: 1 }}>
                  5 Beds • 4 Baths • 4,500 sqft
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#d92228',
                color: '#d92228',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#b91c22',
                  backgroundColor: 'rgba(217, 34, 40, 0.05)',
                },
              }}
            >
              View All Properties
            </Button>
          </Box>
        </Container>
      </ContentSection>
    </Box>
  );
};

export default Home;
