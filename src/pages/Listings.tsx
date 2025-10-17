import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Drawer,
  IconButton,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Slider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { listings, cities, propertyTypes, features } from '../data/listingsData';

const PageHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #d92228 0%, #b91c22 100%)',
  color: 'white',
  padding: theme.spacing(8, 3),
  textAlign: 'center',
}));

const FilterSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(3),
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  marginBottom: theme.spacing(3),
}));

const Listings: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get initial filter from URL
  const initialType = searchParams.get('type') || 'all';
  
  // Filter states
  const [transactionType, setTransactionType] = useState(initialType);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000000]);
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filtered listings
  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      // Transaction type filter
      if (transactionType !== 'all') {
        if (transactionType === 'sale' && listing.priceType !== 'sale') return false;
        if (transactionType === 'rent' && listing.priceType !== 'rent') return false;
      }

      // City filter
      if (selectedCity && listing.location.city !== selectedCity) return false;

      // Property type filter
      if (selectedPropertyType && listing.propertyType !== selectedPropertyType.toLowerCase()) return false;

      // Price filter
      if (listing.price < priceRange[0] || listing.price > priceRange[1]) return false;

      // Bedrooms filter
      if (bedrooms && listing.bedrooms < parseInt(bedrooms)) return false;

      // Bathrooms filter
      if (bathrooms && listing.bathrooms < parseInt(bathrooms)) return false;

      // Features filter
      if (selectedFeatures.length > 0) {
        const hasAllFeatures = selectedFeatures.every((feature) =>
          listing.features.includes(feature)
        );
        if (!hasAllFeatures) return false;
      }

      return true;
    });
  }, [transactionType, selectedCity, selectedPropertyType, priceRange, bedrooms, bathrooms, selectedFeatures]);

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const handleViewDetails = (id: string) => {
    navigate(`/listings/${id}`);
  };

  const FilterContent = () => (
    <Box>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Filter Listings
      </Typography>

      {/* Transaction Type */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Transaction Type</InputLabel>
        <Select
          value={transactionType}
          label="Transaction Type"
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="sale">For Sale</MenuItem>
          <MenuItem value="rent">For Rent</MenuItem>
        </Select>
      </FormControl>

      {/* City */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>City</InputLabel>
        <Select
          value={selectedCity}
          label="City"
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <MenuItem value="">All Cities</MenuItem>
          {cities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Property Type */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Property Type</InputLabel>
        <Select
          value={selectedPropertyType}
          label="Property Type"
          onChange={(e) => setSelectedPropertyType(e.target.value)}
        >
          <MenuItem value="">All Types</MenuItem>
          {propertyTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Price Range */}
      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}</Typography>
        <Slider
          value={priceRange}
          onChange={(_, newValue) => setPriceRange(newValue as number[])}
          valueLabelDisplay="auto"
          min={0}
          max={2000000}
          step={50000}
          sx={{ color: '#d92228' }}
        />
      </Box>

      {/* Bedrooms */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Minimum Bedrooms</InputLabel>
        <Select
          value={bedrooms}
          label="Minimum Bedrooms"
          onChange={(e) => setBedrooms(e.target.value)}
        >
          <MenuItem value="">Any</MenuItem>
          <MenuItem value="1">1+</MenuItem>
          <MenuItem value="2">2+</MenuItem>
          <MenuItem value="3">3+</MenuItem>
          <MenuItem value="4">4+</MenuItem>
          <MenuItem value="5">5+</MenuItem>
        </Select>
      </FormControl>

      {/* Bathrooms */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Minimum Bathrooms</InputLabel>
        <Select
          value={bathrooms}
          label="Minimum Bathrooms"
          onChange={(e) => setBathrooms(e.target.value)}
        >
          <MenuItem value="">Any</MenuItem>
          <MenuItem value="1">1+</MenuItem>
          <MenuItem value="2">2+</MenuItem>
          <MenuItem value="3">3+</MenuItem>
          <MenuItem value="4">4+</MenuItem>
        </Select>
      </FormControl>

      {/* Features */}
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
        Features
      </Typography>
      <FormGroup sx={{ mb: 3 }}>
        {features.slice(0, 8).map((feature) => (
          <FormControlLabel
            key={feature}
            control={
              <Checkbox
                checked={selectedFeatures.includes(feature)}
                onChange={() => handleFeatureToggle(feature)}
                sx={{
                  color: '#d92228',
                  '&.Mui-checked': { color: '#d92228' },
                }}
              />
            }
            label={feature}
          />
        ))}
      </FormGroup>

      <Button
        fullWidth
        variant="outlined"
        onClick={() => {
          setTransactionType('all');
          setSelectedCity('');
          setSelectedPropertyType('');
          setPriceRange([0, 2000000]);
          setBedrooms('');
          setBathrooms('');
          setSelectedFeatures([]);
        }}
        sx={{
          borderColor: '#d92228',
          color: '#d92228',
          '&:hover': {
            borderColor: '#b91c22',
            backgroundColor: 'rgba(217, 34, 40, 0.05)',
          },
        }}
      >
        Clear All Filters
      </Button>
    </Box>
  );

  return (
    <Box>
      {/* Header */}
      <PageHeader>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 600,
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontFamily: 'Georgia, serif',
            }}
          >
            Property Listings
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            {filteredListings.length} {filteredListings.length === 1 ? 'property' : 'properties'} available
          </Typography>
        </Container>
      </PageHeader>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', gap: 4 }}>
          {/* Desktop Filters */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              width: 300,
              flexShrink: 0,
            }}
          >
            <FilterSection>
              <FilterContent />
            </FilterSection>
          </Box>

          {/* Mobile Filter Button */}
          <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 2, width: '100%' }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<FilterListIcon />}
              onClick={() => setMobileFilterOpen(true)}
              sx={{
                backgroundColor: '#d92228',
                '&:hover': { backgroundColor: '#b91c22' },
              }}
            >
              Filters
            </Button>
          </Box>

          {/* Listings Grid */}
          <Box sx={{ flex: 1 }}>
            {filteredListings.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h5" sx={{ mb: 2, color: '#666' }}>
                  No properties found
                </Typography>
                <Typography variant="body1" sx={{ color: '#999' }}>
                  Try adjusting your filters to see more results
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                  gap: 3,
                }}
              >
                {filteredListings.map((listing) => (
                  <Card
                    key={listing.id}
                    sx={{
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                      },
                    }}
                    onClick={() => handleViewDetails(listing.id)}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={listing.images[0]}
                        alt={listing.title}
                        sx={{ objectFit: 'cover' }}
                      />
                      <Chip
                        label={listing.priceType === 'sale' ? 'For Sale' : 'For Rent'}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          backgroundColor: listing.priceType === 'sale' ? '#d92228' : '#28a745',
                          color: 'white',
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {listing.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#666',
                          mb: 2,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                        }}
                      >
                        <LocationOnIcon sx={{ fontSize: '1rem', color: '#d92228' }} />
                        {listing.location.neighborhood}, {listing.location.city}
                      </Typography>
                      <Typography variant="h5" sx={{ color: '#d92228', fontWeight: 700, mb: 2 }}>
                        ${listing.price.toLocaleString()}
                        {listing.priceType === 'rent' && <span style={{ fontSize: '0.9rem' }}>/mo</span>}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <BedIcon sx={{ fontSize: '1.2rem', color: '#666' }} />
                          <Typography variant="body2" sx={{ color: '#666' }}>
                            {listing.bedrooms} Beds
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <BathtubIcon sx={{ fontSize: '1.2rem', color: '#666' }} />
                          <Typography variant="body2" sx={{ color: '#666' }}>
                            {listing.bathrooms} Baths
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <SquareFootIcon sx={{ fontSize: '1.2rem', color: '#666' }} />
                          <Typography variant="body2" sx={{ color: '#666' }}>
                            {listing.area.toLocaleString()} sqft
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {listing.features.slice(0, 3).map((feature, index) => (
                          <Chip
                            key={index}
                            label={feature}
                            size="small"
                            sx={{ fontSize: '0.75rem', backgroundColor: '#f5f5f5' }}
                          />
                        ))}
                        {listing.features.length > 3 && (
                          <Chip
                            label={`+${listing.features.length - 3}`}
                            size="small"
                            sx={{ fontSize: '0.75rem', backgroundColor: '#f5f5f5' }}
                          />
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="left"
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <Box sx={{ width: 300, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Filters
            </Typography>
            <IconButton onClick={() => setMobileFilterOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <FilterContent />
        </Box>
      </Drawer>
    </Box>
  );
};

export default Listings;
