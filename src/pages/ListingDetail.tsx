import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Avatar,
  CircularProgress,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { Listing } from "../data/listingsData";
import { listingsService } from "../services/listingsService";
import { useLanguage } from "../contexts/LanguageContext";

const ImageGallery = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(4),
  height: "500px",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    height: "400px",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    height: "300px",
  },
}));

const MainImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
  },
});

const SpecCard = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  padding: theme.spacing(2),
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
}));

const ListingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  
  // API states
  const [listing, setListing] = useState<any>(null);
  const [similarListings, setSimilarListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch listing details
  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await listingsService.getListingById(id);
        
        // Normalize the data: convert _id to id if needed
        const normalizedListing = {
          ...data,
          id: data.id || data._id,
        };
        
        setListing(normalizedListing);
        
        // Fetch similar listings
        const response = await listingsService.getListings({
          limit: 3,
        });
        
        const allListings = Array.isArray(response) ? response : response.data;
        
        // Normalize all listings data
        const normalizedAllListings = allListings.map((l: any) => ({
          ...l,
          id: l.id || l._id,
        }));
        
        const similar = normalizedAllListings
          .filter((l: Listing) => 
            l.id !== id && 
            (l.location?.city === normalizedListing.location?.city || l.propertyType === normalizedListing.propertyType)
          )
          .slice(0, 3);
        
        setSimilarListings(similar);
      } catch (err: any) {
        console.error('Error fetching listing:', err);
        setError(err.message || 'Failed to fetch listing details');
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t.pages.listingDetail.agent.successMessage);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  // Loading state
  if (loading) {
    return (
      <Box sx={{ backgroundColor: "#fff", minHeight: "100vh" }}>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "60vh",
            }}
          >
            <CircularProgress size={60} sx={{ color: "#d92228" }} />
          </Box>
        </Container>
      </Box>
    );
  }

  // Error state
  if (error || !listing) {
    return (
      <Box sx={{ backgroundColor: "#fff", minHeight: "100vh" }}>
        <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error || t.pages.listingDetail.propertyNotFound}
          </Alert>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {t.pages.listingDetail.propertyNotFound}
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/listings")}
            sx={{
              backgroundColor: "#d92228",
              "&:hover": { backgroundColor: "#b91c22" },
            }}
          >
            {t.pages.listingDetail.backToListings}
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#fff", pb: 6 }}>
      {/* Back Button */}
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/listings")}
          sx={{
            color: "#666",
            "&:hover": { color: "#d92228", backgroundColor: "transparent" },
          }}
        >
          Back to Listings
        </Button>
      </Container>

      {/* Image Gallery */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {listing.images && listing.images.length > 0 ? (
          <ImageGallery>
            <Box
              sx={{
                gridColumn: { xs: "1", md: "1 / 3" },
                gridRow: { xs: "1", md: "1 / 3" },
              }}
            >
              <MainImage
                src={listing.images[selectedImage]}
                alt={listing.title}
                onClick={() =>
                  setSelectedImage((selectedImage + 1) % listing.images.length)
                }
              />
            </Box>
            {listing.images.slice(1, 5).map((image: string, index: number) => (
              <Box key={index} sx={{ height: { xs: "150px", md: "245px" } }}>
                <MainImage
                  src={image}
                  alt={`${listing.title} - Image ${index + 2}`}
                  onClick={() => setSelectedImage(index + 1)}
                  style={{
                    border:
                      selectedImage === index + 1 ? "3px solid #d92228" : "none",
                  }}
                />
              </Box>
            ))}
          </ImageGallery>
        ) : (
          <Box
            sx={{
              height: 400,
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 4,
            }}
          >
            <Typography variant="h6" sx={{ color: "#999" }}>
              No images available
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 600,
                    fontFamily: "Georgia, serif",
                    fontSize: { xs: "1.8rem", md: "2.5rem" },
                  }}
                >
                  {listing.title}
                </Typography>
                <Chip
                  label={listing.priceType === "sale" ? "For Sale" : "For Rent"}
                  sx={{
                    backgroundColor:
                      listing.priceType === "sale" ? "#d92228" : "#28a745",
                    color: "white",
                    fontWeight: 500,
                  }}
                />
              </Box>
              <Typography
                variant="body1"
                sx={{
                  color: "#666",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <LocationOnIcon sx={{ color: "#d92228" }} />
                {listing.location?.address && `${listing.location.address}, `}
                {listing.location?.neighborhood && `${listing.location.neighborhood}, `}
                {listing.location?.city || "Location not specified"}
              </Typography>
              <Typography
                variant="h4"
                sx={{ color: "#d92228", fontWeight: 700 }}
              >
                ${listing.price.toLocaleString()}
                {listing.priceType === "rent" && (
                  <span style={{ fontSize: "1.2rem" }}>/month</span>
                )}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(4, 1fr)",
                },
                gap: 2,
                mb: 4,
              }}
            >
              <SpecCard>
                <BedIcon sx={{ fontSize: "2rem", color: "#d92228" }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {listing.bedrooms || 0}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    Bedrooms
                  </Typography>
                </Box>
              </SpecCard>
              <SpecCard>
                <BathtubIcon sx={{ fontSize: "2rem", color: "#d92228" }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {listing.bathrooms || 0}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    Bathrooms
                  </Typography>
                </Box>
              </SpecCard>
              <SpecCard>
                <SquareFootIcon sx={{ fontSize: "2rem", color: "#d92228" }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {listing.area?.toLocaleString() || 0}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    Sqft
                  </Typography>
                </Box>
              </SpecCard>
              <SpecCard>
                <LocalParkingIcon sx={{ fontSize: "2rem", color: "#d92228" }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {listing.parking || listing.parkingSpaces || 0}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    Parking
                  </Typography>
                </Box>
              </SpecCard>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, mb: 2, fontFamily: "Georgia, serif" }}
              >
                Description
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#666", lineHeight: 1.8 }}
              >
                {listing.description}
              </Typography>
            </Box>

            {/* Property Details */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, mb: 2, fontFamily: "Georgia, serif" }}
              >
                Property Details
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="body2" sx={{ color: "#999" }}>
                    Property Type
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, textTransform: "capitalize" }}
                  >
                    {listing.propertyType}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: "#999" }}>
                    Year Built
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {listing.yearBuilt}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: "#999" }}>
                    Furnished
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {listing.furnished ? "Yes" : "No"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: "#999" }}>
                    Status
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, textTransform: "capitalize" }}
                  >
                    {listing.status}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, mb: 2, fontFamily: "Georgia, serif" }}
              >
                Features & Amenities
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                  gap: 1.5,
                }}
              >
                {listing.features && listing.features.length > 0 ? (
                  listing.features.map((feature: string, index: number) => (
                    <Box
                      key={index}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <CheckCircleIcon
                        sx={{ color: "#28a745", fontSize: "1.2rem" }}
                      />
                      <Typography variant="body1">{feature}</Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" sx={{ color: "#999" }}>
                    No features listed
                  </Typography>
                )}
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, mb: 2, fontFamily: "Georgia, serif" }}
              >
                Location
              </Typography>
              <Box
                sx={{
                  height: 300,
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px dashed #ddd",
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <LocationOnIcon
                    sx={{ fontSize: "4rem", color: "#d92228", mb: 1 }}
                  />
                  <Typography variant="h6" sx={{ color: "#666" }}>
                    {listing.location?.neighborhood && `${listing.location.neighborhood}, `}
                    {listing.location?.city || "Location"}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#999" }}>
                    Interactive map coming soon
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ width: { xs: "100%", md: 350 } }}>
            <Card
              sx={{
                position: "sticky",
                top: 20,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent>
                {/* Agent Info */}
                <Box
                  sx={{
                    textAlign: "center",
                    mb: 3,
                    pb: 3,
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      margin: "0 auto 12px",
                      backgroundColor: "#d92228",
                      fontSize: "2rem",
                    }}
                  >
                    {listing.agentName?.charAt(0) || listing.contactName?.charAt(0) || "A"}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {listing.agentName || listing.contactName || "Agent"}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
                    Real Estate Agent
                  </Typography>
                  {(listing.agentPhone || listing.contactPhone) && (
                    <Box
                      sx={{ display: "flex", justifyContent: "center", gap: 2 }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <PhoneIcon sx={{ fontSize: "1rem", color: "#d92228" }} />
                        <Typography variant="body2">
                          {listing.agentPhone || listing.contactPhone}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  {(listing.agentEmail || listing.contactEmail) && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 0.5,
                        mt: 1,
                      }}
                    >
                      <EmailIcon sx={{ fontSize: "1rem", color: "#d92228" }} />
                      <Typography variant="body2">
                        {listing.agentEmail || listing.contactEmail}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Contact Form */}
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Send Inquiry
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="I'm interested in this property..."
                    required
                    sx={{ mb: 2 }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: "#d92228",
                      py: 1.5,
                      fontWeight: 600,
                      "&:hover": { backgroundColor: "#b91c22" },
                    }}
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Similar Properties */}
        {similarListings.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, mb: 3, fontFamily: "Georgia, serif" }}
            >
              {t.pages.listingDetail.similar.title}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 3,
              }}
            >
              {similarListings.map((similar) => (
                <Card
                  key={similar.id}
                  sx={{
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "translateY(-4px)" },
                  }}
                  onClick={() => navigate(`/listings/${similar.id}`)}
                >
                  {similar.images && similar.images.length > 0 && (
                    <CardMedia
                      component="img"
                      height="180"
                      image={similar.images[0]}
                      alt={similar.title}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {similar.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                      {similar.location?.city || "Location"}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: "#d92228", fontWeight: 700 }}
                    >
                      ${similar.price?.toLocaleString() || 0}
                      {similar.priceType === "rent" && "/mo"}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ListingDetail;
