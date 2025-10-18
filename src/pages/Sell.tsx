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
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
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
import StarIcon from '@mui/icons-material/Star';
import { subscriptionPlans, getPlansByUserType, calculateYearlySavings } from '../data/subscriptionPlans';

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
    subscriptionPlan: '', // plan id
    billingCycle: 'monthly' as 'monthly' | 'yearly',
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

  const steps = ['Account Type', 'Subscription Plan', 'Property Details', 'Features & Amenities', 'Photos & Contact'];

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
        // Account type selection
        return formData.sellerType !== '';
      case 1:
        // Subscription plan selection
        return formData.subscriptionPlan !== '';
      case 2:
        // Property details
        return formData.title && formData.propertyType && formData.listingType && 
               formData.price && formData.location && formData.city;
      case 3:
        // Features & amenities
        return formData.bedrooms && formData.bathrooms && formData.area;
      case 4:
        // Photos & contact
        const basicContactValid = images.length > 0 && formData.contactName && 
                                   formData.contactEmail && formData.contactPhone;
        // If realtor, also require agency name and license
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

        {/* Step 1: Subscription Plan Selection */}
        {activeStep === 1 && formData.sellerType && (
          <FormSection>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 800, 
                mb: 1.5, 
                textAlign: 'center',
                background: 'linear-gradient(135deg, #d92228 0%, #b01820 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: { xs: '1.75rem', md: '2.25rem' }
              }}
            >
              Choose Your Perfect Plan
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#666', 
                mb: 5, 
                textAlign: 'center',
                fontSize: '1.1rem',
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              Select the plan that best fits your property listing needs
            </Typography>

            {/* Billing Cycle Toggle */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <ToggleButtonGroup
                value={formData.billingCycle}
                exclusive
                onChange={(e, value) => value && handleInputChange('billingCycle', value)}
                sx={{
                  '& .MuiToggleButton-root': {
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    '&.Mui-selected': {
                      backgroundColor: '#d92228',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#b91c22',
                      },
                    },
                  },
                }}
              >
                <ToggleButton value="monthly">
                  Monthly
                </ToggleButton>
                <ToggleButton value="yearly">
                  Yearly <Chip label="Save up to 20%" size="small" sx={{ ml: 1, backgroundColor: '#28a745', color: 'white' }} />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Subscription Plans */}
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: { xs: 2, md: 3 },
              flexWrap: { xs: 'wrap', md: 'nowrap' },
              px: 2,
              mt: 2,
              minHeight: '450px'
            }}>
              {getPlansByUserType(formData.sellerType as 'owner' | 'realtor').map((plan) => {
                const isSelected = formData.subscriptionPlan === plan.id;
                const price = formData.billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
                const savings = formData.billingCycle === 'yearly' ? Number(calculateYearlySavings(plan.monthlyPrice, plan.yearlyPrice).toFixed(2)) : 0;
                
                return (
                  <Card
                    key={plan.id}
                    elevation={isSelected ? 8 : plan.highlighted ? 6 : 2}
                    onClick={() => handleInputChange('subscriptionPlan', plan.id)}
                    sx={{
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.2s ease',
                      width: { xs: '100%', sm: '280px', md: '280px' },
                      height: '420px',
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'visible',
                      // Enhanced styling for Professional plan
                      ...(plan.highlighted && {
                        background: 'linear-gradient(145deg, #ffffff 0%, #fff9f9 50%, #fff0f0 100%)',
                        border: isSelected ? '3px solid #d92228' : '2px solid #f0a500',
                        boxShadow: isSelected 
                          ? '0 12px 40px rgba(217, 34, 40, 0.25)'
                          : '0 8px 30px rgba(240, 165, 0, 0.15)',
                      }),
                      // Styling for other plans
                      ...(!plan.highlighted && {
                        border: isSelected ? '2px solid #d92228' : '1px solid #e0e0e0',
                        backgroundColor: '#ffffff',
                        boxShadow: isSelected 
                          ? '0 8px 24px rgba(217, 34, 40, 0.15)'
                          : '0 2px 12px rgba(0,0,0,0.06)',
                      }),
                      '&:hover': {
                        boxShadow: plan.highlighted 
                          ? '0 16px 50px rgba(240, 165, 0, 0.2)' 
                          : '0 6px 20px rgba(0,0,0,0.12)',
                        ...(plan.highlighted && {
                          borderColor: isSelected ? '#d92228' : '#e0a500',
                        }),
                      },
                    }}
                  >
                    {/* Selection Checkmark - Small and positioned at top right */}
                    {isSelected && (
                      <Box sx={{ 
                        position: 'absolute', 
                        top: 12, 
                        right: 12,
                        zIndex: 10,
                        backgroundColor: '#d92228',
                        borderRadius: '50%',
                        width: 24,
                        height: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 3px 10px rgba(217, 34, 40, 0.4)',
                      }}>
                        <CheckCircleIcon sx={{ fontSize: 16, color: 'white' }} />
                      </Box>
                    )}

                    {/* Most Popular Badge */}
                    {plan.highlighted && (
                      <Chip
                        label="⭐ MOST POPULAR"
                        sx={{
                          position: 'absolute',
                          top: -14,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'linear-gradient(135deg, #f0a500 0%, #e0a500 100%)',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          letterSpacing: '0.5px',
                          height: 28,
                          px: 2,
                          boxShadow: '0 4px 14px rgba(240, 165, 0, 0.4)',
                          '& .MuiChip-label': {
                            px: 1.5,
                          },
                        }}
                      />
                    )}
                    
                    <CardContent sx={{ 
                      p: plan.highlighted ? 2.5 : 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      flex: 1,
                      '&:last-child': {
                        pb: plan.highlighted ? 2.5 : 2,
                      }
                    }}>
                      {/* Plan Name */}
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 700, 
                          mb: 0.8, 
                          textAlign: 'center',
                          color: plan.highlighted ? '#d92228' : '#1a1a1a',
                          fontSize: plan.highlighted ? '1.15rem' : '1rem',
                          letterSpacing: '-0.3px',
                          textTransform: 'uppercase',
                          ...(plan.highlighted && {
                            background: 'linear-gradient(135deg, #d92228 0%, #b01820 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          })
                        }}
                      >
                        {plan.name}
                      </Typography>
                      
                      {/* Description */}
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: plan.highlighted ? '#555' : '#666', 
                          mb: 2, 
                          textAlign: 'center', 
                          minHeight: 32,
                          lineHeight: 1.4,
                          fontSize: plan.highlighted ? '0.85rem' : '0.8rem',
                          fontWeight: plan.highlighted ? 500 : 400
                        }}
                      >
                        {plan.description}
                      </Typography>
                      
                      {/* Price Section */}
                      <Box sx={{ 
                        textAlign: 'center', 
                        mb: 2,
                        py: plan.highlighted ? 2 : 1.5,
                        px: 1.5,
                        borderRadius: 2,
                        background: plan.highlighted 
                          ? 'linear-gradient(135deg, rgba(217, 34, 40, 0.08) 0%, rgba(217, 34, 40, 0.02) 100%)'
                          : 'rgba(0,0,0,0.02)',
                        ...(plan.highlighted && {
                          border: '1px solid rgba(217, 34, 40, 0.15)',
                        })
                      }}>
                        <Typography 
                          variant="h4" 
                          sx={{ 
                            fontWeight: 900, 
                            color: plan.highlighted ? '#d92228' : '#333',
                            display: 'inline',
                            fontSize: plan.highlighted ? '2rem' : '1.75rem',
                            lineHeight: 1,
                            ...(plan.highlighted && {
                              textShadow: '0 2px 8px rgba(217, 34, 40, 0.15)',
                            })
                          }}
                        >
                          ${price}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: plan.highlighted ? '#d92228' : '#666', 
                            display: 'inline', 
                            ml: 1,
                            fontSize: plan.highlighted ? '0.95rem' : '0.85rem',
                            fontWeight: plan.highlighted ? 600 : 500
                          }}
                        >
                          /{formData.billingCycle === 'monthly' ? 'mo' : 'yr'}
                        </Typography>
                        
                        {savings > 0 && (
                          <Box sx={{ 
                            mt: 1,
                            display: 'block', // changed from inline-block to block to place savings below the price
                            px: 1.5,
                            py: 0.35,
                            borderRadius: 0.8,
                            backgroundColor: '#28a745',
                          }}>
                            <Typography variant="caption" sx={{ color: 'white', fontWeight: 700, fontSize: '0.7rem' }}>
                              💰 Save ${savings}/yr
                            </Typography>
                          </Box>
                        )}
                      </Box>
                      
                      <Divider sx={{ 
                        mb: 2, 
                        borderColor: plan.highlighted ? 'rgba(217, 34, 40, 0.2)' : '#e0e0e0', 
                        borderWidth: plan.highlighted ? 1 : 0.5,
                      }} />
                      

                      <List dense sx={{ mb: 0, flex: 1, py: 0 }}>
                        {plan.features.slice(0, 5).map((feature, index) => (
                          <ListItem key={index} sx={{ 
                            px: 0, 
                            py: 0.4,
                            ...(plan.highlighted && {
                              borderRadius: 0.5,
                              transition: 'all 0.15s',
                              '&:hover': {
                                backgroundColor: 'rgba(217, 34, 40, 0.02)',
                              }
                            })
                          }}>
                            <ListItemIcon sx={{ minWidth: 28 }}>
                              <CheckCircleIcon sx={{ 
                                fontSize: 16, 
                                color: plan.highlighted ? '#d92228' : '#4caf50',
                              }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={feature}
                              primaryTypographyProps={{
                                fontSize: plan.highlighted ? '0.8rem' : '0.75rem',
                                color: '#333',
                                fontWeight: plan.highlighted ? 500 : 400,
                                lineHeight: 1.3
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                      
       
                    </CardContent>
                  </Card>
                );
              })}
            </Box>

       
          </FormSection>
        )}

        {activeStep === 2 && (
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

        {/* Step 3: Features & Amenities */}
        {activeStep === 3 && (
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

        {/* Step 4: Photos & Contact */}
        {activeStep === 4 && (
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
