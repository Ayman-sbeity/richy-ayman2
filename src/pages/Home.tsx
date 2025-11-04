import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Box,
  Typography,
  Container,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Avatar,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ApartmentIcon from "@mui/icons-material/Apartment";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import VerifiedIcon from "@mui/icons-material/Verified";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import MapIcon from "@mui/icons-material/Map";
import ArticleIcon from "@mui/icons-material/Article";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { AdSenseAd } from "../components/UI";

const HeroSection = styled(Box)(({ theme }) => ({
  position: "relative",
  background: `url('/mountainhead-house.webp') no-repeat center center`,
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
  color: "white",
  padding: theme.spacing(15, 3),
  textAlign: "center",
  minHeight: "70vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    zIndex: 1,
  },
}));

const HeroContent = styled(Box)(({ theme }) => ({
  maxWidth: 850,
  margin: "0 auto",
  position: "relative",
  zIndex: 2,
}));

const ContentSection = styled(Box)(({ theme }) => ({
  padding: "80px 24px",
  backgroundColor: "#f8f9fa",
  position: "relative",
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.98)",
  borderRadius: "8px",
  padding: "32px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  maxWidth: "800px",
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {
    padding: "24px 16px",
  },
}));

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSearch = () => {
    // Build query params
    const params = new URLSearchParams();
    if (location) params.append("city", location);
    if (propertyType) params.append("type", propertyType);
    if (priceRange) params.append("price", priceRange);

    // Navigate to listings with filters
    navigate(`/listings?${params.toString()}`);
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
              letterSpacing: "0.5px",
              lineHeight: 1.3,
              color: "#ffffff",
              fontFamily: "Georgia, serif",
            }}
          >
            {t.pages.home.hero.title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 5,
              opacity: 0.95,
              fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.35rem" },
              textShadow: "0 1px 4px rgba(0, 0, 0, 0.5)",
              fontWeight: 300,
              letterSpacing: "0.3px",
              lineHeight: 1.6,
              maxWidth: "650px",
              margin: "0 auto 40px",
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
            }}
          >
            {t.pages.home.hero.subtitle}
          </Typography>
          <SearchContainer>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                color: "#333",
                fontWeight: 500,
                textAlign: "center",
                fontSize: { xs: "1rem", sm: "1.1rem" },
              }}
            >
              {t.pages.home.hero.searchStartLabel}
            </Typography>

            <Stack spacing={2}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                  gap: 2,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel>{t.pages.home.hero.location}</InputLabel>
                  <Select
                    value={location}
                    label={t.pages.home.hero.location}
                    onChange={(e) => setLocation(e.target.value)}
                    sx={{
                      "& .MuiSelect-select": {
                        display: "flex",
                        alignItems: "center",
                      },
                    }}
                  >
                    <MenuItem value="beirut">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <LocationOnIcon
                          sx={{ color: "#d92228", fontSize: "1.2rem" }}
                        />
                        Beirut
                      </Box>
                    </MenuItem>
                    <MenuItem value="jounieh">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <LocationOnIcon
                          sx={{ color: "#d92228", fontSize: "1.2rem" }}
                        />
                        Jounieh
                      </Box>
                    </MenuItem>
                    <MenuItem value="byblos">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <LocationOnIcon
                          sx={{ color: "#d92228", fontSize: "1.2rem" }}
                        />
                        Byblos (Jbeil)
                      </Box>
                    </MenuItem>
                    <MenuItem value="tripoli">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <LocationOnIcon
                          sx={{ color: "#d92228", fontSize: "1.2rem" }}
                        />
                        Tripoli
                      </Box>
                    </MenuItem>
                    <MenuItem value="saida">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <LocationOnIcon
                          sx={{ color: "#d92228", fontSize: "1.2rem" }}
                        />
                        Saida (Sidon)
                      </Box>
                    </MenuItem>
                    <MenuItem value="batroun">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <LocationOnIcon
                          sx={{ color: "#d92228", fontSize: "1.2rem" }}
                        />
                        Batroun
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>{t.pages.home.featured.propertyType}</InputLabel>
                  <Select
                    value={propertyType}
                    label={t.pages.home.featured.propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                    <MenuItem value="house">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <HomeIcon
                          sx={{ color: "#d92228", fontSize: "1.2rem" }}
                        />
                        House
                      </Box>
                    </MenuItem>
                    <MenuItem value="apartment">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <HomeIcon
                          sx={{ color: "#d92228", fontSize: "1.2rem" }}
                        />
                        Apartment
                      </Box>
                    </MenuItem>
                    <MenuItem value="condo">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <HomeIcon
                          sx={{ color: "#d92228", fontSize: "1.2rem" }}
                        />
                        Condo
                      </Box>
                    </MenuItem>
                    <MenuItem value="townhouse">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <HomeIcon
                          sx={{ color: "#d92228", fontSize: "1.2rem" }}
                        />
                        Townhouse
                      </Box>
                    </MenuItem>
                    <MenuItem value="villa">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <HomeIcon
                          sx={{ color: "#d92228", fontSize: "1.2rem" }}
                        />
                        Villa
                      </Box>
                    </MenuItem>
                    <MenuItem value="land">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <HomeIcon
                          sx={{ color: "#d92228", fontSize: "1.2rem" }}
                        />
                        Land
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>{t.pages.home.hero.priceRange}</InputLabel>
                  <Select
                    value={priceRange}
                    label={t.pages.home.hero.priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                  >
                    <MenuItem value="0-200k">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <AttachMoneyIcon
                          sx={{ color: "#d92228", fontSize: "1.2rem" }}
                        />
                        $0 - $200,000
                      </Box>
                    </MenuItem>
                    <MenuItem value="200k-400k">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <AttachMoneyIcon
                          sx={{ color: "#d92228", fontSize: "1.2rem" }}
                        />
                        $200,000 - $400,000
                      </Box>
                    </MenuItem>
                    <MenuItem value="400k-600k">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <AttachMoneyIcon
                          sx={{ color: "#d92228", fontSize: "1.2rem" }}
                        />
                        $400,000 - $600,000
                      </Box>
                    </MenuItem>
                    <MenuItem value="600k-800k">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <AttachMoneyIcon
                          sx={{ color: "#d92228", fontSize: "1.2rem" }}
                        />
                        $600,000 - $800,000
                      </Box>
                    </MenuItem>
                    <MenuItem value="800k-1m">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <AttachMoneyIcon
                          sx={{ color: "#d92228", fontSize: "1.2rem" }}
                        />
                        $800,000 - $1,000,000
                      </Box>
                    </MenuItem>
                    <MenuItem value="1m+">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <AttachMoneyIcon
                          sx={{ color: "#d92228", fontSize: "1.2rem" }}
                        />
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
                  backgroundColor: "#d92228",
                  color: "white",
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  textTransform: "none",
                  boxShadow: "0 4px 12px rgba(217, 34, 40, 0.3)",
                  "&:hover": {
                    backgroundColor: "#b91c22",
                    boxShadow: "0 6px 16px rgba(217, 34, 40, 0.4)",
                  },
                }}
              >
                {t.pages.common.searchProperties}
              </Button>
            </Stack>
          </SearchContainer>
        </HeroContent>
      </HeroSection>

      {/* Stats Section */}
      <Box sx={{ backgroundColor: "#fff", py: 6 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 4,
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <ApartmentIcon
                sx={{ fontSize: "3rem", color: "#d92228", mb: 2 }}
              />
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "#1a1a1a", mb: 1 }}
              >
                5,000+
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#666", fontWeight: 500 }}
              >
                {t.pages.home.stats.propertiesLabel}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <PeopleIcon sx={{ fontSize: "3rem", color: "#d92228", mb: 2 }} />
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "#1a1a1a", mb: 1 }}
              >
                200+
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#666", fontWeight: 500 }}
              >
                {t.pages.home.stats.agentsLabel}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <TrendingUpIcon
                sx={{ fontSize: "3rem", color: "#d92228", mb: 2 }}
              />
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "#1a1a1a", mb: 1 }}
              >
                15+
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#666", fontWeight: 500 }}
              >
                {t.pages.home.stats.citiesLabel}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <VerifiedIcon
                sx={{ fontSize: "3rem", color: "#d92228", mb: 2 }}
              />
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "#1a1a1a", mb: 1 }}
              >
                98%
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#666", fontWeight: 500 }}
              >
                {t.pages.home.stats.satisfactionLabel}
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
              letterSpacing: "0.5px",
              fontFamily: "Georgia, serif",
            }}
          >
            {t.pages.home.featured.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "#666",
              mb: 6,
              fontSize: "1.1rem",
            }}
          >
            {t.pages.home.featured.subtitle}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 4,
            }}
          >
            {/* Property 1 */}
            <Card
              sx={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="240"
                image="/mountainhead-house.webp"
                alt="Luxury Villa in Beirut"
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Chip
                  label={t.pages.home.featured.forSale}
                  size="small"
                  sx={{
                    backgroundColor: "#d92228",
                    color: "white",
                    fontWeight: 500,
                    mb: 2,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Luxury Villa in Beirut
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <LocationOnIcon sx={{ fontSize: "1rem", color: "#d92228" }} />
                  Achrafieh, Beirut
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: "#d92228", fontWeight: 700 }}
                >
                  $850,000
                </Typography>
                <Typography variant="body2" sx={{ color: "#999", mt: 1 }}>
                  4 Beds • 3 Baths • 3,200 sqft
                </Typography>
              </CardContent>
            </Card>

            {/* Property 2 */}
            <Card
              sx={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="240"
                image="/mountainhead-house.webp"
                alt="Modern Apartment in Jounieh"
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Chip
                  label={t.pages.home.featured.forRent}
                  size="small"
                  sx={{
                    backgroundColor: "#28a745",
                    color: "white",
                    fontWeight: 500,
                    mb: 2,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Modern Apartment in Jounieh
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <LocationOnIcon sx={{ fontSize: "1rem", color: "#d92228" }} />
                  Maameltein, Jounieh
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: "#d92228", fontWeight: 700 }}
                >
                  $2,500/mo
                </Typography>
                <Typography variant="body2" sx={{ color: "#999", mt: 1 }}>
                  3 Beds • 2 Baths • 1,800 sqft
                </Typography>
              </CardContent>
            </Card>

            {/* Property 3 */}
            <Card
              sx={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="240"
                image="/mountainhead-house.webp"
                alt="Beachfront Property in Byblos"
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Chip
                  label={t.pages.home.featured.forSale}
                  size="small"
                  sx={{
                    backgroundColor: "#d92228",
                    color: "white",
                    fontWeight: 500,
                    mb: 2,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Beachfront Property in Byblos
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <LocationOnIcon sx={{ fontSize: "1rem", color: "#d92228" }} />
                  Old Souk, Byblos
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: "#d92228", fontWeight: 700 }}
                >
                  $1,200,000
                </Typography>
                <Typography variant="body2" sx={{ color: "#999", mt: 1 }}>
                  5 Beds • 4 Baths • 4,500 sqft
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: "#d92228",
                color: "#d92228",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 500,
                textTransform: "none",
                "&:hover": {
                  borderColor: "#b91c22",
                  backgroundColor: "rgba(217, 34, 40, 0.05)",
                },
              }}
            >
              {t.pages.home.featured.viewAll}
            </Button>
          </Box>
        </Container>
      </ContentSection>

      {/* Interactive Map Section */}
      <Box sx={{ backgroundColor: "#fff", py: 8 }}>
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
              letterSpacing: "0.5px",
              fontFamily: "Georgia, serif",
            }}
          >
            {t.pages.home.locations.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "#666",
              mb: 6,
              fontSize: "1.1rem",
            }}
          >
            {t.pages.home.locations.subtitle}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 3,
            }}
          >
            {[
              {
                name: t.pages.home.locations.beirut,
                properties: 1250,
                icon: "🏙️",
              },
              {
                name: t.pages.home.locations.jounieh,
                properties: 680,
                icon: "🏖️",
              },
              {
                name: t.pages.home.locations.byblos,
                properties: 420,
                icon: "🏰",
              },
              {
                name: t.pages.home.locations.tripoli,
                properties: 550,
                icon: "🕌",
              },
              {
                name: t.pages.home.locations.saida,
                properties: 380,
                icon: "🏛️",
              },
              {
                name: t.pages.home.locations.batroun,
                properties: 290,
                icon: "⛵",
              },
              {
                name: t.pages.home.locations.zahle,
                properties: 310,
                icon: "🏔️",
              },
              {
                name: t.pages.home.locations.tyre,
                properties: 240,
                icon: "🌊",
              },
            ].map((location, index) => (
              <Card
                key={index}
                sx={{
                  textAlign: "center",
                  p: 3,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 20px rgba(217, 34, 40, 0.15)",
                    backgroundColor: "#fffaf0",
                  },
                }}
              >
                <Typography sx={{ fontSize: "3rem", mb: 1 }}>
                  {location.icon}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 0.5, color: "#1a1a1a" }}
                >
                  {location.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#d92228", fontWeight: 500 }}
                >
                  {location.properties} {t.pages.home.locations.properties}
                </Typography>
              </Card>
            ))}
          </Box>

          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<MapIcon />}
              sx={{
                backgroundColor: "#d92228",
                color: "white",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 500,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#b91c22",
                },
              }}
            >
              View Interactive Map
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Meet Our Agents Section */}
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
              letterSpacing: "0.5px",
              fontFamily: "Georgia, serif",
            }}
          >
            {t.pages.home.agents.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "#666",
              mb: 6,
              fontSize: "1.1rem",
            }}
          >
            {t.pages.home.agents.subtitle}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
              gap: 4,
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            {[
              {
                name: "Ayman Sbeity",
                specialty: "Luxury Properties & Investment",
                phone: "+961 3 123 456",
                email: "ayman@realty.com",
                deals: 200,
              },
              {
                name: "Richy",
                specialty: "Residential & Commercial Sales",
                phone: "+961 3 234 567",
                email: "richy@realty.com",
                deals: 180,
              },
            ].map((agent, index) => (
              <Card
                key={index}
                sx={{
                  textAlign: "center",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardContent>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      margin: "0 auto 16px",
                      backgroundColor: "#d92228",
                      fontSize: "2.5rem",
                      fontWeight: 600,
                    }}
                  >
                    {agent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {agent.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#d92228", mb: 2, fontWeight: 500 }}
                  >
                    {agent.specialty}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#999", display: "block", mb: 2 }}
                  >
                    {agent.deals}+ Successful Deals
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <IconButton
                      size="small"
                      sx={{
                        backgroundColor: "#f0f0f0",
                        "&:hover": {
                          backgroundColor: "#d92228",
                          color: "white",
                        },
                      }}
                    >
                      <PhoneIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{
                        backgroundColor: "#f0f0f0",
                        "&:hover": {
                          backgroundColor: "#d92228",
                          color: "white",
                        },
                      }}
                    >
                      <EmailIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: "#d92228",
                      color: "#d92228",
                      textTransform: "none",
                      "&:hover": {
                        borderColor: "#b91c22",
                        backgroundColor: "rgba(217, 34, 40, 0.05)",
                      },
                    }}
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: "#d92228",
                color: "#d92228",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 500,
                textTransform: "none",
                "&:hover": {
                  borderColor: "#b91c22",
                  backgroundColor: "rgba(217, 34, 40, 0.05)",
                },
              }}
            >
              Meet All Our Agents
            </Button>
          </Box>
        </Container>
      </ContentSection>

      {/* Latest Blog/News Section */}
      <Box sx={{ backgroundColor: "#fff", py: 8 }}>
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
              letterSpacing: "0.5px",
              fontFamily: "Georgia, serif",
            }}
          >
            {t.pages.home.news.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "#666",
              mb: 6,
              fontSize: "1.1rem",
            }}
          >
            {t.pages.home.news.subtitle}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 4,
            }}
          >
            {[
              {
                title: "Lebanon Real Estate Market Trends 2025",
                excerpt:
                  "Discover the latest trends shaping Lebanon's real estate market and what it means for buyers and investors...",
                date: "October 15, 2025",
                category: "Market Analysis",
                readTime: "5 min read",
              },
              {
                title: "Top 10 Neighborhoods in Beirut for Families",
                excerpt:
                  "Looking for a family-friendly neighborhood in Beirut? Here are our top picks with excellent schools and amenities...",
                date: "October 12, 2025",
                category: "Buying Guide",
                readTime: "7 min read",
              },
              {
                title: "Investment Opportunities in Lebanese Coastal Cities",
                excerpt:
                  "Explore lucrative investment opportunities in Jounieh, Byblos, and other coastal gems of Lebanon...",
                date: "October 8, 2025",
                category: "Investment",
                readTime: "6 min read",
              },
            ].map((article, index) => (
              <Card
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image="/mountainhead-house.webp"
                  alt={article.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <Chip
                    label={article.category}
                    size="small"
                    sx={{
                      alignSelf: "flex-start",
                      backgroundColor: "#fff3f0",
                      color: "#d92228",
                      fontWeight: 500,
                      mb: 2,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 2, lineHeight: 1.4 }}
                  >
                    {article.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#666", mb: 3, flexGrow: 1 }}
                  >
                    {article.excerpt}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#999",
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <CalendarTodayIcon sx={{ fontSize: "0.875rem" }} />
                      {article.date}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#999" }}>
                      {article.readTime}
                    </Typography>
                  </Box>
                  <Button
                    fullWidth
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      color: "#d92228",
                      textTransform: "none",
                      fontWeight: 500,
                      justifyContent: "space-between",
                      "&:hover": {
                        backgroundColor: "rgba(217, 34, 40, 0.05)",
                      },
                    }}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArticleIcon />}
              sx={{
                backgroundColor: "#d92228",
                color: "white",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 500,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#b91c22",
                },
              }}
            >
              {t.pages.home.news.viewAllArticles}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Google AdSense Ad */}
      <Box sx={{ backgroundColor: "#f8f9fa", py: 6 }}>
        <Container maxWidth="lg">
          <AdSenseAd adSlot="4007518640" fullWidth={true} />

          {/* Second Ad Unit - Fluid Format */}
          <Box sx={{ mt: 6, pt: 3, borderTop: "1px solid #e0e0e0" }}>
            <AdSenseAd adSlot="9340764048" adFormat="auto" fullWidth={true} />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
