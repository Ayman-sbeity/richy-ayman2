import React, { useState, useEffect } from "react";
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
  Snackbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DescriptionIcon from "@mui/icons-material/Description";
import {
  subscriptionPlans,
  getPlansByUserType,
  calculateYearlySavings,
} from "../data/subscriptionPlans";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { listingsService } from "../services/listingsService";
import {
  subscriptionService,
  Subscription,
} from "../services/subscriptionService";

const HeroSection = styled(Box)(({ theme }) => ({
  position: "relative",
  background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)`,
  color: "white",
  padding: theme.spacing(8, 3),
  textAlign: "center",
  marginBottom: theme.spacing(6),
}));

const FormSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  borderRadius: 12,
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
}));

const UploadBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: 8,
  padding: theme.spacing(4),
  textAlign: "center",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: "#d92228",
    backgroundColor: "rgba(217, 34, 40, 0.05)",
  },
}));

const ImagePreview = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  paddingTop: "66.67%",
  borderRadius: 8,
  overflow: "hidden",
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 8,
  right: 8,
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#d92228",
  },
}));

const Sell: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [currentSubscription, setCurrentSubscription] =
    useState<Subscription | null>(null);
  const [loadingSubscription, setLoadingSubscription] = useState(true);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    sellerType: "",
    subscriptionPlan: "free",
    billingCycle: "monthly" as "monthly" | "yearly",
    title: "",
    description: "",
    propertyType: "",
    listingType: "",
    price: "",
    location: "",
    city: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    parkingSpaces: "",
    yearBuilt: "",
    features: [] as string[],
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    agencyName: "",
    licenseNumber: "",
  });

  useEffect(() => {
    const loadSubscription = async () => {
      try {
        const subscription = await subscriptionService.getCurrentSubscription();
        setCurrentSubscription(subscription);

        if (subscription) {
          setFormData((prev) => ({
            ...prev,
            subscriptionPlan: subscription.plan,
            billingCycle: subscription.billingCycle,
          }));
        }
      } catch (error) {
        console.error("Failed to load subscription:", error);
      } finally {
        setLoadingSubscription(false);
      }
    };

    if (user) {
      loadSubscription();
    } else {
      setLoadingSubscription(false);
    }
  }, [user]);

  const steps = [
    t.pages.sell.steps.accountType,
    t.pages.sell.steps.propertyDetails,
    t.pages.sell.steps.features,
    t.pages.sell.steps.photos,
  ];

  const getStepLabel = (label: string) => {
    // Shorter labels for mobile screens
    const shortLabels: { [key: string]: string } = {
      "Account Type": "Account",
      "Property Details": "Details",
      "Features & Amenities": "Features",
      "Photos & Contact": "Photos",
    };
    return shortLabels[label] || label;
  };

  const propertyTypes = [
    { value: "Apartment", label: t.pages.sell.propertyTypes.apartment },
    { value: "House", label: t.pages.sell.propertyTypes.house },
    { value: "Villa", label: t.pages.sell.propertyTypes.villa },
    { value: "Penthouse", label: t.pages.sell.propertyTypes.penthouse },
    { value: "Studio", label: t.pages.sell.propertyTypes.studio },
    { value: "Duplex", label: t.pages.sell.propertyTypes.duplex },
    { value: "Land", label: t.pages.sell.propertyTypes.land },
    { value: "Commercial", label: t.pages.sell.propertyTypes.commercial },
  ];

  const cities = [
    { value: "Beirut", label: t.pages.sell.cities.beirut },
    { value: "Mount Lebanon", label: t.pages.sell.cities.mountLebanon },
    { value: "Tripoli", label: t.pages.sell.cities.tripoli },
    { value: "Sidon", label: t.pages.sell.cities.sidon },
    { value: "Tyre", label: t.pages.sell.cities.tyre },
    { value: "Jounieh", label: t.pages.sell.cities.jounieh },
    { value: "Byblos", label: t.pages.sell.cities.byblos },
    { value: "Zahle", label: t.pages.sell.cities.zahle },
  ];

  const availableFeatures = [
    t.pages.sell.features.balcony,
    t.pages.sell.features.garden,
    t.pages.sell.features.pool,
    t.pages.sell.features.gym,
    t.pages.sell.features.security,
    t.pages.sell.features.elevator,
    t.pages.sell.features.heating,
    t.pages.sell.features.ac,
    t.pages.sell.features.furnished,
    t.pages.sell.features.seaView,
    t.pages.sell.features.mountainView,
    t.pages.sell.features.parkingSpace,
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFeatureToggle = (feature: string) => {
    const currentFeatures = formData.features;
    if (currentFeatures.includes(feature)) {
      handleInputChange(
        "features",
        currentFeatures.filter((f) => f !== feature)
      );
    } else {
      handleInputChange("features", [...currentFeatures, feature]);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const maxFileSize = 5 * 1024 * 1024;
      const maxImages = 10;

      if (images.length + files.length > maxImages) {
        setNotification({
          open: true,
          message: `Maximum ${maxImages} images allowed. You can upload ${
            maxImages - images.length
          } more.`,
          severity: "error",
        });
        return;
      }

      let loadedCount = 0;
      const newImages: string[] = [];

      Array.from(files).forEach((file, index) => {
        if (file.size > maxFileSize) {
          setNotification({
            open: true,
            message: `Image ${file.name} is too large. Maximum size is 5MB.`,
            severity: "error",
          });
          loadedCount++;
          if (loadedCount === files.length) {
            setUploadProgress(0);
          }
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            const base64String = e.target.result as string;
            newImages.push(base64String);
            loadedCount++;

            const progress = Math.round((loadedCount / files.length) * 100);
            setUploadProgress(progress);

            if (loadedCount === files.length) {
              setImages([...images, ...newImages]);
              setTimeout(() => setUploadProgress(0), 500);
            }
          }
        };

        reader.onerror = () => {
          loadedCount++;
          setNotification({
            open: true,
            message: `Failed to read image ${file.name}`,
            severity: "error",
          });
          if (loadedCount === files.length) {
            setUploadProgress(0);
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

    try {
      const token = user?.token || localStorage.getItem("token");

      if (!token) {
        setNotification({
          open: true,
          message:
            "You must be logged in to create a listing. Please log in first.",
          severity: "error",
        });
        setSubmitting(false);
        return;
      }

      if (!user?._id) {
        setNotification({
          open: true,
          message: "User information is missing. Please log in again.",
          severity: "error",
        });
        setSubmitting(false);
        return;
      }

      const isActive =
        subscriptionService.isSubscriptionActive(currentSubscription);
      const planChanged =
        currentSubscription?.plan !== formData.subscriptionPlan;
      const billingChanged =
        currentSubscription?.billingCycle !== formData.billingCycle;

      if (!currentSubscription || !isActive || planChanged || billingChanged) {
        try {
          const startDate = new Date();
          const expirationDate = new Date();
          if (formData.billingCycle === "monthly") {
            expirationDate.setMonth(expirationDate.getMonth() + 1);
          } else {
            expirationDate.setFullYear(expirationDate.getFullYear() + 1);
          }

          const prices: Record<string, { monthly: number; yearly: number }> = {
            free: { monthly: 0, yearly: 0 },
            basic: { monthly: 19, yearly: 199 },
            premium: { monthly: 49, yearly: 499 },
            professional: { monthly: 99, yearly: 999 },
          };

          const price =
            prices[formData.subscriptionPlan]?.[formData.billingCycle] || 0;

          const subscriptionData = {
            plan: formData.subscriptionPlan,
            billingCycle: formData.billingCycle,
            billing_cycle: formData.billingCycle,
            startDate: startDate.toISOString(),
            start_date: startDate.toISOString(), 
            expirationDate: expirationDate.toISOString(),
            expiration_date: expirationDate.toISOString(), 
            status: "active",
            autoRenew: false,
            auto_renew: false,
            price,
          };

          console.log("Subscription data to be sent:", subscriptionData);
          console.log("User ID:", user._id);

          let newSubscription;
          if (!currentSubscription || !isActive) {
            // Create new subscription
            newSubscription = await subscriptionService.subscribe(
              subscriptionData
            );
            setNotification({
              open: true,
              message: `Successfully subscribed to ${formData.subscriptionPlan} plan!`,
              severity: "success",
            });
          } else {
            // Update existing subscription
            newSubscription = await subscriptionService.updateSubscription(
              subscriptionData
            );
            setNotification({
              open: true,
              message: `Subscription updated to ${formData.subscriptionPlan} plan!`,
              severity: "success",
            });
          }

          setCurrentSubscription(newSubscription);
        } catch (error: any) {
          setNotification({
            open: true,
            message:
              error.message ||
              "Failed to process subscription. Please try again.",
            severity: "error",
          });
          setSubmitting(false);
          return;
        }
      } else {
        console.log("User already has an active subscription with this plan. Skipping subscription API call.");
      }
      const payload = {
        user_id: user._id,
        sellerType: formData.sellerType,
        title: formData.title,
        description: formData.description,
        propertyType: formData.propertyType,
        listingType: formData.listingType,
        price: formData.price,
        location: formData.location,
        city: formData.city,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        area: formData.area,
        parkingSpaces: formData.parkingSpaces,
        yearBuilt: formData.yearBuilt,
        features: formData.features,
        images: images,
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        ...(formData.sellerType === "realtor" && {
          agencyName: formData.agencyName,
          licenseNumber: formData.licenseNumber,
        }),
      };

      const response = await listingsService.addListing(payload, token);

      // Success notification
      setNotification({
        open: true,
        message:
          "Property listing created successfully! Our team will review it shortly.",
        severity: "success",
      });

      // Reset form after successful submission
      setTimeout(() => {
        setActiveStep(0);
        setFormData({
          sellerType: "",
          subscriptionPlan: currentSubscription?.plan || "free",
          billingCycle: currentSubscription?.billingCycle || "monthly",
          title: "",
          description: "",
          propertyType: "",
          listingType: "",
          price: "",
          location: "",
          city: "",
          bedrooms: "",
          bathrooms: "",
          area: "",
          parkingSpaces: "",
          yearBuilt: "",
          features: [],
          contactName: "",
          contactEmail: "",
          contactPhone: "",
          agencyName: "",
          licenseNumber: "",
        });
        setImages([]);
      }, 2000);
    } catch (error: any) {
      setNotification({
        open: true,
        message: error.message || "Failed to create listing. Please try again.",
        severity: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return formData.sellerType !== "";
      case 1:
        return (
          formData.title &&
          formData.propertyType &&
          formData.listingType &&
          formData.price &&
          formData.location &&
          formData.city
        );
      case 2:
        return formData.bedrooms && formData.bathrooms && formData.area;
      case 3:
        const basicContactValid =
          images.length > 0 &&
          formData.contactName &&
          formData.contactEmail &&
          formData.contactPhone;
        if (formData.sellerType === "realtor") {
          return (
            basicContactValid && formData.agencyName && formData.licenseNumber
          );
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
              fontSize: { xs: "2rem", md: "3rem" },
              mb: 2,
            }}
          >
            {t.pages.sell.hero.title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 300,
              opacity: 0.9,
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            {t.pages.sell.hero.subtitle}
          </Typography>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            mb: 4,
            "& .MuiStepLabel-label": {
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              mt: 1,
              textAlign: "center",
              lineHeight: 1.2,
            },
            "& .MuiStepIcon-root": {
              fontSize: { xs: "1.5rem", sm: "2rem" },
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    fontSize: { xs: "0.7rem", sm: "0.875rem" },
                    fontWeight: 500,
                  },
                }}
              >
                {getStepLabel(label)}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <FormSection>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, mb: 2, textAlign: "center" }}
            >
              {t.pages.sell.accountType.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#666", mb: 4, textAlign: "center" }}
            >
              {t.pages.sell.accountType.description}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                gap: 3,
                maxWidth: 800,
                margin: "0 auto",
              }}
            >
              <Paper
                elevation={formData.sellerType === "owner" ? 8 : 2}
                onClick={() => handleInputChange("sellerType", "owner")}
                sx={{
                  p: 4,
                  cursor: "pointer",
                  textAlign: "center",
                  border:
                    formData.sellerType === "owner"
                      ? "3px solid #d92228"
                      : "3px solid transparent",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <HomeIcon
                  sx={{
                    fontSize: 64,
                    color: formData.sellerType === "owner" ? "#d92228" : "#666",
                    mb: 2,
                  }}
                />
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                  {t.pages.sell.accountType.owner.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#666", lineHeight: 1.6 }}
                >
                  {t.pages.sell.accountType.owner.description}
                </Typography>
                {formData.sellerType === "owner" && (
                  <CheckCircleIcon
                    sx={{ fontSize: 48, color: "#d92228", mt: 2 }}
                  />
                )}
              </Paper>

              <Paper
                elevation={formData.sellerType === "realtor" ? 8 : 2}
                onClick={() => handleInputChange("sellerType", "realtor")}
                sx={{
                  p: 4,
                  cursor: "pointer",
                  textAlign: "center",
                  border:
                    formData.sellerType === "realtor"
                      ? "3px solid #d92228"
                      : "3px solid transparent",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <HomeIcon
                  sx={{
                    fontSize: 64,
                    color:
                      formData.sellerType === "realtor" ? "#d92228" : "#666",
                    mb: 2,
                  }}
                />
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                  {t.pages.sell.accountType.realtor.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#666", lineHeight: 1.6 }}
                >
                  {t.pages.sell.accountType.realtor.description}
                </Typography>
                {formData.sellerType === "realtor" && (
                  <CheckCircleIcon
                    sx={{ fontSize: 48, color: "#d92228", mt: 2 }}
                  />
                )}
              </Paper>
            </Box>

            {formData.sellerType && (
              <Alert
                severity="info"
                sx={{ mt: 4, maxWidth: 800, margin: "32px auto 0" }}
              >
                {formData.sellerType === "owner"
                  ? t.pages.sell.accountType.ownerInfo
                  : t.pages.sell.accountType.realtorInfo}
              </Alert>
            )}
          </FormSection>
        )}

        {activeStep === 1 && (
          <FormSection>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <DescriptionIcon sx={{ color: "#d92228" }} />
              {t.pages.sell.propertyDetails.title}
            </Typography>

            {/* Subscription Plans Section */}
            {formData.sellerType && (
              <>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    textAlign: "center",
                    color: "#d92228",
                  }}
                >
                  {t.pages.sell.subscription.title}
                </Typography>

                {/* Current Subscription Status */}
                {currentSubscription &&
                  subscriptionService.isSubscriptionActive(
                    currentSubscription
                  ) && (
                    <Alert
                      severity="info"
                      sx={{ mb: 3, maxWidth: 800, mx: "auto" }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, mb: 0.5 }}
                      >
                        Current Plan: {currentSubscription.plan.toUpperCase()} (
                        {currentSubscription.billingCycle})
                      </Typography>
                      <Typography variant="caption">
                        Expires:{" "}
                        {new Date(
                          currentSubscription.expirationDate
                        ).toLocaleDateString()}{" "}
                        (
                        {subscriptionService.getDaysUntilExpiration(
                          currentSubscription
                        )}{" "}
                        days remaining)
                      </Typography>
                    </Alert>
                  )}

                {/* Billing Cycle Toggle */}
                <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                  <ToggleButtonGroup
                    value={formData.billingCycle}
                    exclusive
                    onChange={(e, value) =>
                      value && handleInputChange("billingCycle", value)
                    }
                    sx={{
                      "& .MuiToggleButton-root": {
                        px: 3,
                        py: 1,
                        textTransform: "none",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        "&.Mui-selected": {
                          backgroundColor: "#d92228",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#b91c22",
                          },
                        },
                      },
                    }}
                  >
                    <ToggleButton value="monthly">
                      {t.pages.sell.subscription.monthly}
                    </ToggleButton>
                    <ToggleButton value="yearly">
                      {t.pages.sell.subscription.yearly}{" "}
                      <Chip
                        label={t.pages.sell.subscription.savingsBadge}
                        size="small"
                        sx={{
                          ml: 1,
                          backgroundColor: "#28a745",
                          color: "white",
                        }}
                      />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: { xs: 2, md: 2 },
                    flexWrap: { xs: "wrap", md: "nowrap" },
                    px: 2,
                    mb: 4,
                    minHeight: "350px",
                  }}
                >
                  {getPlansByUserType(
                    formData.sellerType as "owner" | "realtor"
                  ).map((plan) => {
                    const isSelected = formData.subscriptionPlan === plan.id;
                    const price =
                      formData.billingCycle === "monthly"
                        ? plan.monthlyPrice
                        : plan.yearlyPrice;
                    const savings =
                      formData.billingCycle === "yearly"
                        ? Number(
                            calculateYearlySavings(
                              plan.monthlyPrice,
                              plan.yearlyPrice
                            ).toFixed(2)
                          )
                        : 0;

                    return (
                      <Card
                        key={plan.id}
                        elevation={isSelected ? 6 : plan.highlighted ? 4 : 2}
                        onClick={() =>
                          handleInputChange("subscriptionPlan", plan.id)
                        }
                        sx={{
                          cursor: "pointer",
                          position: "relative",
                          transition: "all 0.2s ease",
                          width: { xs: "100%", sm: "240px", md: "240px" },
                          height: "320px",
                          display: "flex",
                          flexDirection: "column",
                          overflow: "visible",
                          ...(plan.highlighted && {
                            background:
                              "linear-gradient(145deg, #ffffff 0%, #fff9f9 50%, #fff0f0 100%)",
                            border: isSelected
                              ? "2px solid #d92228"
                              : "2px solid #f0a500",
                          }),
                          ...(!plan.highlighted && {
                            border: isSelected
                              ? "2px solid #d92228"
                              : "1px solid #e0e0e0",
                            backgroundColor: "#ffffff",
                          }),
                          "&:hover": {
                            boxShadow: plan.highlighted
                              ? "0 12px 40px rgba(240, 165, 0, 0.2)"
                              : "0 6px 20px rgba(0,0,0,0.12)",
                          },
                        }}
                      >
                        {isSelected && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              zIndex: 10,
                              backgroundColor: "#d92228",
                              borderRadius: "50%",
                              width: 20,
                              height: 20,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <CheckCircleIcon
                              sx={{ fontSize: 14, color: "white" }}
                            />
                          </Box>
                        )}

                        {plan.highlighted && (
                          <Chip
                            label="⭐ POPULAR"
                            sx={{
                              position: "absolute",
                              top: -12,
                              left: "50%",
                              transform: "translateX(-50%)",
                              background:
                                "linear-gradient(135deg, #f0a500 0%, #e0a500 100%)",
                              color: "white",
                              fontWeight: 700,
                              fontSize: "0.7rem",
                              letterSpacing: "0.5px",
                              height: 24,
                              px: 1.5,
                            }}
                          />
                        )}

                        <CardContent
                          sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            flex: 1,
                            "&:last-child": {
                              pb: 2,
                            },
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              mb: 0.5,
                              textAlign: "center",
                              color: plan.highlighted ? "#d92228" : "#1a1a1a",
                              fontSize: "1rem",
                              textTransform: "uppercase",
                            }}
                          >
                            {plan.name}
                          </Typography>

                          <Box
                            sx={{
                              textAlign: "center",
                              mb: 1.5,
                              py: 1,
                              borderRadius: 1,
                              background: plan.highlighted
                                ? "linear-gradient(135deg, rgba(217, 34, 40, 0.08) 0%, rgba(217, 34, 40, 0.02) 100%)"
                                : "rgba(0,0,0,0.02)",
                            }}
                          >
                            <Typography
                              variant="h5"
                              sx={{
                                fontWeight: 900,
                                color: plan.highlighted ? "#d92228" : "#333",
                                fontSize: "1.5rem",
                                lineHeight: 1,
                              }}
                            >
                              ${price}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: plan.highlighted ? "#d92228" : "#666",
                                fontSize: "0.8rem",
                                fontWeight: 500,
                              }}
                            >
                              /
                              {formData.billingCycle === "monthly"
                                ? "mo"
                                : "yr"}
                            </Typography>

                            {savings > 0 && (
                              <Box
                                sx={{
                                  mt: 0.5,
                                  display: "inline-block",
                                  px: 1,
                                  py: 0.25,
                                  borderRadius: 0.5,
                                  backgroundColor: "#28a745",
                                }}
                              >
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: "0.65rem",
                                  }}
                                >
                                  Save ${savings}/yr
                                </Typography>
                              </Box>
                            )}
                          </Box>

                          <List dense sx={{ mb: 0, flex: 1, py: 0 }}>
                            {plan.features.slice(0, 4).map((feature, index) => (
                              <ListItem key={index} sx={{ px: 0, py: 0.3 }}>
                                <ListItemIcon sx={{ minWidth: 24 }}>
                                  <CheckCircleIcon
                                    sx={{
                                      fontSize: 14,
                                      color: plan.highlighted
                                        ? "#d92228"
                                        : "#4caf50",
                                    }}
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  primary={feature}
                                  primaryTypographyProps={{
                                    fontSize: "0.7rem",
                                    color: "#333",
                                    fontWeight: 400,
                                    lineHeight: 1.2,
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

                <Divider sx={{ my: 3 }} />
              </>
            )}

            <Box sx={{ display: "grid", gap: 3 }}>
              <TextField
                fullWidth
                label={t.pages.sell.propertyDetails.propertyTitle}
                placeholder={
                  t.pages.sell.propertyDetails.propertyTitlePlaceholder
                }
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                  gap: 3,
                }}
              >
                <FormControl fullWidth required>
                  <InputLabel>
                    {t.pages.sell.propertyDetails.propertyType}
                  </InputLabel>
                  <Select
                    value={formData.propertyType}
                    label={t.pages.sell.propertyDetails.propertyType}
                    onChange={(e) =>
                      handleInputChange("propertyType", e.target.value)
                    }
                  >
                    {propertyTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth required>
                  <InputLabel>
                    {t.pages.sell.propertyDetails.listingType}
                  </InputLabel>
                  <Select
                    value={formData.listingType}
                    label={t.pages.sell.propertyDetails.listingType}
                    onChange={(e) =>
                      handleInputChange("listingType", e.target.value)
                    }
                  >
                    <MenuItem value="Sale">
                      {t.pages.sell.propertyDetails.forSale}
                    </MenuItem>
                    <MenuItem value="Rent">
                      {t.pages.sell.propertyDetails.forRent}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                  gap: 3,
                }}
              >
                <TextField
                  fullWidth
                  label={t.pages.sell.propertyDetails.price}
                  type="number"
                  placeholder={t.pages.sell.propertyDetails.pricePlaceholder}
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon sx={{ color: "#d92228" }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <FormControl fullWidth required>
                  <InputLabel>{t.pages.sell.propertyDetails.city}</InputLabel>
                  <Select
                    value={formData.city}
                    label={t.pages.sell.propertyDetails.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city.value} value={city.value}>
                        {city.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <TextField
                fullWidth
                label={t.pages.sell.propertyDetails.location}
                placeholder={t.pages.sell.propertyDetails.locationPlaceholder}
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon sx={{ color: "#d92228" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label={t.pages.sell.propertyDetails.description}
                placeholder={
                  t.pages.sell.propertyDetails.descriptionPlaceholder
                }
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
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
              {t.pages.sell.features.title}
            </Typography>

            <Box sx={{ display: "grid", gap: 3 }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    md: "repeat(4, 1fr)",
                  },
                  gap: 2,
                }}
              >
                <TextField
                  fullWidth
                  label={t.pages.sell.features.bedrooms}
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) =>
                    handleInputChange("bedrooms", e.target.value)
                  }
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BedIcon sx={{ color: "#d92228" }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label={t.pages.sell.features.bathrooms}
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) =>
                    handleInputChange("bathrooms", e.target.value)
                  }
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BathtubIcon sx={{ color: "#d92228" }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label={t.pages.sell.features.area}
                  type="number"
                  value={formData.area}
                  onChange={(e) => handleInputChange("area", e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SquareFootIcon sx={{ color: "#d92228" }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label={t.pages.sell.features.parking}
                  type="number"
                  value={formData.parkingSpaces}
                  onChange={(e) =>
                    handleInputChange("parkingSpaces", e.target.value)
                  }
                />
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                  gap: 3,
                }}
              >
                <TextField
                  fullWidth
                  label={t.pages.sell.features.yearBuilt}
                  type="number"
                  placeholder={t.pages.sell.features.yearBuiltPlaceholder}
                  value={formData.yearBuilt}
                  onChange={(e) =>
                    handleInputChange("yearBuilt", e.target.value)
                  }
                />
              </Box>

              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  {t.pages.sell.features.selectFeatures}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {availableFeatures.map((feature) => (
                    <Chip
                      key={feature}
                      label={feature}
                      onClick={() => handleFeatureToggle(feature)}
                      color={
                        formData.features.includes(feature)
                          ? "primary"
                          : "default"
                      }
                      sx={{
                        backgroundColor: formData.features.includes(feature)
                          ? "#d92228"
                          : undefined,
                        "&:hover": {
                          backgroundColor: formData.features.includes(feature)
                            ? "#b91c22"
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
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <PhotoCameraIcon sx={{ color: "#d92228" }} />
                {t.pages.sell.photos.title}
              </Typography>

              <input
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload"
                multiple
                type="file"
                onChange={handleImageUpload}
              />

              <label htmlFor="image-upload">
                <UploadBox>
                  <CloudUploadIcon
                    sx={{ fontSize: 48, color: "#d92228", mb: 2 }}
                  />
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {t.pages.sell.photos.upload}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {t.pages.sell.photos.dragDrop}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{ mt: 1, display: "block" }}
                  >
                    {t.pages.sell.photos.maxImages}
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
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "repeat(2, 1fr)",
                      md: "repeat(4, 1fr)",
                    },
                    gap: 2,
                    mt: 2,
                  }}
                >
                  {images.map((image, index) => (
                    <ImagePreview
                      key={index}
                      style={{ backgroundImage: `url(${image})` }}
                    >
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
                {t.pages.sell.photos.contactTitle}
              </Typography>

              <Box sx={{ display: "grid", gap: 3 }}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                    gap: 3,
                  }}
                >
                  <TextField
                    fullWidth
                    label={t.pages.sell.photos.fullName}
                    value={formData.contactName}
                    onChange={(e) =>
                      handleInputChange("contactName", e.target.value)
                    }
                    required
                  />

                  <TextField
                    fullWidth
                    label={t.pages.sell.photos.email}
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) =>
                      handleInputChange("contactEmail", e.target.value)
                    }
                    required
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                    gap: 3,
                  }}
                >
                  <TextField
                    fullWidth
                    label={t.pages.sell.photos.phone}
                    value={formData.contactPhone}
                    onChange={(e) =>
                      handleInputChange("contactPhone", e.target.value)
                    }
                    required
                    placeholder={t.pages.sell.photos.phonePlaceholder}
                  />
                </Box>

                {/* Realtor-specific fields */}
                {formData.sellerType === "realtor" && (
                  <>
                    <Alert severity="warning" sx={{ mt: 2 }}>
                      {t.pages.sell.photos.warningRealtor}
                    </Alert>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "1fr",
                          md: "repeat(2, 1fr)",
                        },
                        gap: 3,
                        mt: 2,
                      }}
                    >
                      <TextField
                        fullWidth
                        label={t.pages.sell.photos.agencyName}
                        value={formData.agencyName}
                        onChange={(e) =>
                          handleInputChange("agencyName", e.target.value)
                        }
                        required
                        placeholder={t.pages.sell.photos.agencyPlaceholder}
                      />

                      <TextField
                        fullWidth
                        label={t.pages.sell.photos.licenseNumber}
                        value={formData.licenseNumber}
                        onChange={(e) =>
                          handleInputChange("licenseNumber", e.target.value)
                        }
                        required
                        placeholder={t.pages.sell.photos.licensePlaceholder}
                      />
                    </Box>
                  </>
                )}
              </Box>

              <Alert severity="info" sx={{ mt: 3 }}>
                {formData.sellerType === "owner"
                  ? t.pages.sell.photos.infoOwner
                  : t.pages.sell.photos.infoRealtor}
              </Alert>
            </FormSection>
          </>
        )}

        {/* Navigation Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={{
              borderColor: "#d92228",
              color: "#d92228",
              "&:hover": {
                borderColor: "#b91c22",
                backgroundColor: "rgba(217, 34, 40, 0.05)",
              },
            }}
          >
            {t.pages.sell.buttons.back}
          </Button>

          {activeStep < steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!isStepValid()}
              sx={{
                backgroundColor: "#d92228",
                "&:hover": {
                  backgroundColor: "#b91c22",
                },
              }}
            >
              {t.pages.sell.buttons.next}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!isStepValid() || submitting}
              startIcon={submitting ? undefined : <CheckCircleIcon />}
              sx={{
                backgroundColor: "#d92228",
                px: 4,
                "&:hover": {
                  backgroundColor: "#b91c22",
                },
              }}
            >
              {submitting
                ? t.pages.sell.buttons.submitting
                : t.pages.sell.buttons.submit}
            </Button>
          )}
        </Box>

        {submitting && <LinearProgress sx={{ mt: 2 }} />}
      </Container>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Sell;
