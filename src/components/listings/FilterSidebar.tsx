import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Slider,
  Typography,
  Button,
} from '@mui/material';
import { cities, propertyTypes, features } from '../../data/listingsData';

interface FilterSidebarProps {
  transactionType: string;
  setTransactionType: (value: string) => void;
  selectedCity: string;
  setSelectedCity: (value: string) => void;
  selectedPropertyType: string;
  setSelectedPropertyType: (value: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  bedrooms: string;
  setBedrooms: (value: string) => void;
  bathrooms: string;
  setBathrooms: (value: string) => void;
  selectedFeatures: string[];
  handleFeatureToggle: (feature: string) => void;
  onClearFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  transactionType,
  setTransactionType,
  selectedCity,
  setSelectedCity,
  selectedPropertyType,
  setSelectedPropertyType,
  priceRange,
  setPriceRange,
  bedrooms,
  setBedrooms,
  bathrooms,
  setBathrooms,
  selectedFeatures,
  handleFeatureToggle,
  onClearFilters,
}) => {
  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontWeight: 600,
          fontSize: { xs: '1.1rem', md: '1.25rem' },
        }}
      >
        Filter Listings
      </Typography>

      {/* Transaction Type */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Transaction Type</InputLabel>
        <Select
          value={transactionType}
          label="Transaction Type"
          onChange={(e) => setTransactionType(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#e0e0e0',
            },
          }}
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
        <Typography gutterBottom sx={{ fontWeight: 500, color: '#333' }}>
          Price Range: ${priceRange[0].toLocaleString()} - $
          {priceRange[1].toLocaleString()}
        </Typography>
        <Slider
          value={priceRange}
          onChange={(_, newValue) => setPriceRange(newValue as number[])}
          valueLabelDisplay="auto"
          min={0}
          max={2000000}
          step={50000}
          sx={{
            color: '#d92228',
            '& .MuiSlider-thumb': {
              '&:hover, &.Mui-focusVisible': {
                boxShadow: '0 0 0 8px rgba(217, 34, 40, 0.16)',
              },
            },
          }}
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
      <Typography
        variant="subtitle2"
        sx={{ mb: 2, fontWeight: 600, color: '#333' }}
      >
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
            label={
              <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                {feature}
              </Typography>
            }
          />
        ))}
      </FormGroup>

      {/* Clear Filters Button */}
      <Button
        fullWidth
        variant="outlined"
        onClick={onClearFilters}
        sx={{
          borderColor: '#d92228',
          color: '#d92228',
          py: 1.5,
          fontWeight: 600,
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
};

export default FilterSidebar;
