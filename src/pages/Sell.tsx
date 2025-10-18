import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Chip,
  IconButton,
  Alert,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DescriptionIcon from '@mui/icons-material/Description';

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)`,
  color: 'white',
  padding: theme.spacing(8, 3),
  textAlign: 'center',
  marginBottom: theme.spacing(6),
}));

const FormSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  borderRadius: 12,
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
}));

const UploadBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: 8,
  padding: theme.spacing(4),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: '#d92228',
    backgroundColor: 'rgba(217, 34, 40, 0.05)',
  },
}));

const ImagePreview = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingTop: '66.67%',
  borderRadius: 8,
  overflow: 'hidden',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  '&:hover': {
    backgroundColor: '#fff',
    color: '#d92228',
  },
}));

const Sell: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    sellerType: '', // 'owner' or 'realtor'
    title: '',
    description: '',
    propertyType: '',
    listingType: '',
    price: '',
    location: '',
    city: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    parkingSpaces: '',
    yearBuilt: '',
    features: [] as string[],
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    // Realtor specific fields
    agencyName: '',
    licenseNumber: '',
  });

  const steps = ['Account Type', 'Property Details', 'Features & Amenities', 'Photos & Contact'];

  const propertyTypes = ['Apartment', 'House', 'Villa', 'Penthouse', 'Studio', 'Duplex', 'Land', 'Commercial'];
  const listingTypes = ['Sale', 'Rent'];
  const cities = ['Beirut', 'Mount Lebanon', 'Tripoli', 'Sidon', 'Tyre', 'Jounieh', 'Byblos', 'Zahle'];
  const availableFeatures = [
    'Balcony',
    'Garden',
    'Swimming Pool',
    'Gym',
    'Security',
    'Elevator',
    'Central Heating',
    'Air Conditioning',
    'Furnished',
    'Sea View',
    'Mountain View',
    'Parking',
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFeatureToggle = (feature: string) => {
    const currentFeatures = formData.features;
    if (currentFeatures.includes(feature)) {
      handleInputChange('features', currentFeatures.filter((f) => f !== feature));
    } else {
      handleInputChange('features', [...currentFeatures, feature]);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            if (newImages.length === files.length) {
              setImages([...images, ...newImages]);
              setUploadProgress(100);
              setTimeout(() => setUploadProgress(0), 1000);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDeleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData, images);
      setSubmitting(false);
      alert('Property listing submitted successfully! Our team will review it shortly.');
      // Reset form or redirect
    }, 2000);
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return formData.sellerType !== '';
      case 1:
        return formData.title && formData.propertyType && formData.listingType && 
               formData.price && formData.location && formData.city;
      case 2:
        return formData.bedrooms && formData.bathrooms && formData.area;
      case 3:
        const basicContactValid = images.length > 0 && formData.contactName && 
                                   formData.contactEmail && formData.contactPhone;
        if (formData.sellerType === 'realtor') {
          return basicContactValid && formData.agencyName && formData.licenseNumber;
        }
        return basicContactValid;
      default:
        return false;
    }
  };

  return (
    <Box>
      <HeroSection>
        <Container maxWidth="lg">
          <HomeIcon sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '3rem' },
              mb: 2,
            }}
          >
            List Your Property
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 300,
              opacity: 0.9,
              maxWidth: 600,
              margin: '0 auto',
            }}
          >
            Reach thousands of potential buyers and renters across Lebanon
          </Typography>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step 0: Account Type Selection */}
        {activeStep === 0 && (
          <FormSection>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}>
              Who are you?
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', mb: 4, textAlign: 'center' }}>
              Please select your account type to continue
            </Typography>

            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, 
              gap: 3,
              maxWidth: 800,
              margin: '0 auto'
            }}>
              {/* Owner Card */}
              <Paper
                elevation={formData.sellerType === 'owner' ? 8 : 2}
                onClick={() => handleInputChange('sellerType', 'owner')}
                sx={{
                  p: 4,
                  cursor: 'pointer',
                  textAlign: 'center',
                  border: formData.sellerType === 'owner' ? '3px solid #d92228' : '3px solid transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <HomeIcon sx={{ fontSize: 64, color: formData.sellerType === 'owner' ? '#d92228' : '#666', mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                  Property Owner
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                  I own the property and want to sell or rent it directly
                </Typography>
                {formData.sellerType === 'owner' && (
                  <CheckCircleIcon sx={{ fontSize: 48, color: '#d92228', mt: 2 }} />
                )}
              </Paper>

              {/* Realtor Card */}
              <Paper
                elevation={formData.sellerType === 'realtor' ? 8 : 2}
                onClick={() => handleInputChange('sellerType', 'realtor')}
                sx={{
                  p: 4,
                  cursor: 'pointer',
                  textAlign: 'center',
                  border: formData.sellerType === 'realtor' ? '3px solid #d92228' : '3px solid transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <HomeIcon sx={{ fontSize: 64, color: formData.sellerType === 'realtor' ? '#d92228' : '#666', mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                  Real Estate Agent
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                  I'm a licensed realtor representing the property owner
                </Typography>
                {formData.sellerType === 'realtor' && (
                  <CheckCircleIcon sx={{ fontSize: 48, color: '#d92228', mt: 2 }} />
                )}
              </Paper>
            </Box>

            {formData.sellerType && (
              <Alert severity="info" sx={{ mt: 4, maxWidth: 800, margin: '32px auto 0' }}>
                {formData.sellerType === 'owner' 
                  ? 'As a property owner, you can list your property directly without any agency fees.'
                  : 'As a realtor, you\'ll need to provide your agency information and license number.'}
              </Alert>
            )}
          </FormSection>
        )}

        {/* Step 1: Property Details */}
        {activeStep === 1 && (
          <FormSection>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <DescriptionIcon sx={{ color: '#d92228' }} />
              Property Details
            </Typography>

            <Box sx={{ display: 'grid', gap: 3 }}>
              <TextField
                fullWidth
                label="Property Title"
                placeholder="e.g., Luxury 3BR Apartment in Achrafieh"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
                <FormControl fullWidth required>
                  <InputLabel>Property Type</InputLabel>
                  <Select
                    value={formData.propertyType}
                    label="Property Type"
                    onChange={(e) => handleInputChange('propertyType', e.target.value)}
                  >
                    {propertyTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth required>
                  <InputLabel>Listing Type</InputLabel>
                  <Select
                    value={formData.listingType}
                    label="Listing Type"
                    onChange={(e) => handleInputChange('listingType', e.target.value)}
                  >
                    {listingTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        For {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  placeholder="e.g., 450000"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon sx={{ color: '#d92228' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <FormControl fullWidth required>
                  <InputLabel>City</InputLabel>
                  <Select
                    value={formData.city}
                    label="City"
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <TextField
                fullWidth
                label="Location / Address"
                placeholder="e.g., Sassine Square, Achrafieh"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon sx={{ color: '#d92228' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Property Description"
                placeholder="Describe your property in detail..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                multiline
                rows={4}
                required
              />
            </Box>
          </FormSection>
        )}

        {/* Step 2: Features & Amenities */}
        {activeStep === 2 && (
          <FormSection>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Features & Amenities
            </Typography>

            <Box sx={{ display: 'grid', gap: 3 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
                <TextField
                  fullWidth
                  label="Bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BedIcon sx={{ color: '#d92228' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BathtubIcon sx={{ color: '#d92228' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Area (sqm)"
                  type="number"
                  value={formData.area}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SquareFootIcon sx={{ color: '#d92228' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Parking Spaces"
                  type="number"
                  value={formData.parkingSpaces}
                  onChange={(e) => handleInputChange('parkingSpaces', e.target.value)}
                />
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
                <TextField
                  fullWidth
                  label="Year Built"
                  type="number"
                  placeholder="e.g., 2020"
                  value={formData.yearBuilt}
                  onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                />
              </Box>

              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Select Features
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {availableFeatures.map((feature) => (
                    <Chip
                      key={feature}
                      label={feature}
                      onClick={() => handleFeatureToggle(feature)}
                      color={formData.features.includes(feature) ? 'primary' : 'default'}
                      sx={{
                        backgroundColor: formData.features.includes(feature)
                          ? '#d92228'
                          : undefined,
                        '&:hover': {
                          backgroundColor: formData.features.includes(feature)
                            ? '#b91c22'
                            : undefined,
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </FormSection>
        )}

        {/* Step 3: Photos & Contact */}
        {activeStep === 3 && (
          <>
            <FormSection>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhotoCameraIcon sx={{ color: '#d92228' }} />
                Property Photos
              </Typography>

              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                multiple
                type="file"
                onChange={handleImageUpload}
              />

              <label htmlFor="image-upload">
                <UploadBox>
                  <CloudUploadIcon sx={{ fontSize: 48, color: '#d92228', mb: 2 }} />
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Upload Property Images
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Click to select or drag and drop images here
                  </Typography>
                  <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                    Maximum 10 images, JPG or PNG
                  </Typography>
                </UploadBox>
              </label>

              {uploadProgress > 0 && (
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress}
                  sx={{ mt: 2 }}
                />
              )}

              {images.length > 0 && (
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2, mt: 2 }}>
                  {images.map((image, index) => (
                    <ImagePreview key={index} style={{ backgroundImage: `url(${image})` }}>
                      <DeleteButton
                        onClick={() => handleDeleteImage(index)}
                        size="small"
                      >
                        <DeleteIcon />
                      </DeleteButton>
                    </ImagePreview>
                  ))}
                </Box>
              )}
            </FormSection>

            <FormSection>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Contact Information
              </Typography>

              <Box sx={{ display: 'grid', gap: 3 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    required
                  />

                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    required
                  />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    required
                    placeholder="+961 3 XXX XXX"
                  />
                </Box>

                {/* Realtor-specific fields */}
                {formData.sellerType === 'realtor' && (
                  <>
                    <Alert severity="warning" sx={{ mt: 2 }}>
                      As a real estate agent, please provide your professional credentials
                    </Alert>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mt: 2 }}>
                      <TextField
                        fullWidth
                        label="Agency Name"
                        value={formData.agencyName}
                        onChange={(e) => handleInputChange('agencyName', e.target.value)}
                        required
                        placeholder="e.g., Century 21 Lebanon"
                      />

                      <TextField
                        fullWidth
                        label="License Number"
                        value={formData.licenseNumber}
                        onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                        required
                        placeholder="e.g., RE-123456"
                      />
                    </Box>
                  </>
                )}
              </Box>

              <Alert severity="info" sx={{ mt: 3 }}>
                {formData.sellerType === 'owner' 
                  ? 'Your contact information will be displayed to interested buyers/renters.'
                  : 'Your agency information and license will be verified before listing approval.'}
              </Alert>
            </FormSection>
          </>
        )}

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={{
              borderColor: '#d92228',
              color: '#d92228',
              '&:hover': {
                borderColor: '#b91c22',
                backgroundColor: 'rgba(217, 34, 40, 0.05)',
              },
            }}
          >
            Back
          </Button>

          {activeStep < steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!isStepValid()}
              sx={{
                backgroundColor: '#d92228',
                '&:hover': {
                  backgroundColor: '#b91c22',
                },
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!isStepValid() || submitting}
              startIcon={submitting ? undefined : <CheckCircleIcon />}
              sx={{
                backgroundColor: '#d92228',
                px: 4,
                '&:hover': {
                  backgroundColor: '#b91c22',
                },
              }}
            >
              {submitting ? 'Submitting...' : 'Submit Listing'}
            </Button>
          )}
        </Box>

        {submitting && <LinearProgress sx={{ mt: 2 }} />}
      </Container>
    </Box>
  );
};

export default Sell;
