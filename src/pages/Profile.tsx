import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Chip,
  Tabs,
  Tab,
  CircularProgress,
  Divider,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { authService } from "../services/authService";
import { listingsService } from "../services/listingsService";
import { useNavigate } from "react-router-dom";

const HeroSection = styled(Box)(({ theme }) => ({
  position: "relative",
  background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)`,
  color: "white",
  padding: theme.spacing(8, 3, 12),
  marginBottom: theme.spacing(-6),
}));

const ProfileCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
  marginBottom: theme.spacing(4),
  position: "relative",
  zIndex: 1,
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  fontSize: "3rem",
  backgroundColor: "#d92228",
  marginBottom: theme.spacing(2),
  border: "4px solid white",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
}));

const ListingCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s ease",
  borderRadius: 12,
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
  },
}));

const UploadBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: 8,
  padding: theme.spacing(2),
  textAlign: "center",
  cursor: "pointer",
  transition: "all 0.3s ease",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),
  "&:hover": {
    borderColor: "#d92228",
    backgroundColor: "rgba(217,34,40,0.03)",
  },
}));

const ImagePreview = styled(Box)(({ theme }) => ({
  position: "relative",
  width: 120,
  height: 90,
  borderRadius: 8,
  overflow: "hidden",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundColor: theme.palette.background.default,
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 6,
  right: 6,
  backgroundColor: "rgba(255,255,255,0.9)",
  zIndex: 2,
  "&:hover": {
    backgroundColor: "#fff",
    color: "#d92228",
  },
}));

const StatusChip = styled(Chip)<{ status: string }>(({ theme, status }) => ({
  position: "absolute",
  top: 16,
  right: 16,
  fontWeight: 600,
  backgroundColor:
    status === "available"
      ? "#4caf50"
      : status === "pending"
      ? "#ff9800"
      : "#f44336",
  color: "white",
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const Profile: React.FC = () => {
  const { user, login } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listingsLoading, setListingsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState<string | null>(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info",
  });

  const [profileData, setProfileData] = useState({
    _id: user?._id || "",
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    type: user?.type || "",
  });

  const [userListings, setUserListings] = useState<any[]>([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [listingToEdit, setListingToEdit] = useState<any | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [editSaving, setEditSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        _id: user._id,
        name: user.name,
        email: user.email,
  phone: user.phone || "",
        type: user.type,
      });
      fetchUserListings();
    }
  }, [user]);

  const formatPhoneNumber = (phone?: string) => {
    if (!phone) return "";
    const trimmed = phone.trim();
    if (!trimmed) return "";
    if (/[A-Za-z]/.test(trimmed)) return trimmed;
    const digits = trimmed.replace(/[^+0-9]/g, "");
    if (digits.startsWith("+")) {
      const rest = digits.slice(1);
      const groups: string[] = [];
      for (let i = 0; i < rest.length; i += 2) {
        groups.push(rest.slice(i, i + 2));
      }
      return `+${groups.join(" ")}`;
    }
    const onlyDigits = digits.replace(/\D/g, "");
    if (onlyDigits.length === 10) {
      return `(${onlyDigits.slice(0, 3)}) ${onlyDigits.slice(3, 6)}-${onlyDigits.slice(6)}`;
    }
    if (onlyDigits.length === 11) {
      return `+${onlyDigits.slice(0, 1)} ${onlyDigits.slice(1, 4)} ${onlyDigits.slice(4, 7)} ${onlyDigits.slice(7)}`;
    }
    return onlyDigits.replace(/(\d{3})(?=\d)/g, "$1 ");
  };

  const fetchUserListings = async () => {
    try {
      setListingsLoading(true);
      const response = await listingsService.getListings({
        user_id: user?._id,
      });

      const listings = Array.isArray(response) ? response : response.data || [];
      setUserListings(listings);
    } catch (error) {
      console.error("Error fetching listings:", error);
      showSnackbar("Failed to fetch listings", "error");
    } finally {
      setListingsLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      setLoading(true);
      const userId = profileData._id || user?._id;
      if (!userId) throw new Error("Missing user id");
      const { _id, ...payload } = profileData;
      const token = localStorage.getItem("token") || "";
      if (!token) {
        showSnackbar("You must be logged in to update your profile", "error");
        navigate("/login");
        return;
      }
    const updatedUser = await authService.updateProfile(userId, payload, token);
    const currentToken = localStorage.getItem("token");
    // Merge the returned user with the existing user to avoid overwriting
    // existing fields if the API returns a partial user object
    const mergedUser = { ...(user as any), ...(updatedUser as any) };
    // Prefer token returned by the server, then localStorage, then existing
    mergedUser.token = updatedUser.token || currentToken || (user as any)?.token;
    login(mergedUser as any);
    setProfileData({ _id: mergedUser._id || profileData._id, name: mergedUser.name || profileData.name, email: mergedUser.email || profileData.email, phone: mergedUser.phone || profileData.phone, type: mergedUser.type || profileData.type });
      setEditMode(false);
      showSnackbar("Profile updated successfully!", "success");
    } catch (error: any) {
      showSnackbar(error.message || "Failed to update profile", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteListing = async () => {
    if (!listingToDelete) return;

    try {
      setLoading(true);
      await listingsService.deleteListing(listingToDelete);
      setUserListings(userListings.filter((l) => l._id !== listingToDelete));
      showSnackbar("Listing deleted successfully!", "success");
      setDeleteDialogOpen(false);
      setListingToDelete(null);
    } catch (error: any) {
      showSnackbar(error.message || "Failed to delete listing", "error");
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "info"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleEditListing = (listing: any) => {
    setListingToEdit(listing);
    setEditForm({
      title: listing.title || "",
      description: listing.description || "",
      property_type: listing.property_type || listing.propertyType || "",
      listing_type: listing.listing_type || listing.listingType || "",
      price: listing.price || "",
      location: listing.location || "",
      city: listing.city || "",
      bedrooms: listing.bedrooms || 0,
      bathrooms: listing.bathrooms || 0,
      area: listing.area || 0,
      parking_spaces: listing.parking_spaces || listing.parkingSpaces || 0,
      year_built: listing.year_built || listing.yearBuilt || 0,
  features: Array.isArray(listing.features) ? listing.features.slice() : (typeof listing.features === 'string' ? listing.features.split(',').map((f: string)=>f.trim()).filter(Boolean) : []),
  images: Array.isArray(listing.images) ? listing.images.slice() : (listing.images ? [listing.images] : []),
      seller_type: listing.seller_type || listing.sellerType || "",
      contact_name: listing.contact_name || listing.contactName || "",
      contact_email: listing.contact_email || listing.contactEmail || "",
      contact_phone: listing.contact_phone || listing.contactPhone || "",
      status: listing.status || "",
    });
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (listingId: string) => {
    setListingToDelete(listingId);
    setDeleteDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setListingToEdit(null);
    setEditForm({});
  };

  const handleEditImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const maxFileSize = 5 * 1024 * 1024; // 5 MB
    const maxImages = 10;
    const currentImages = Array.isArray(editForm.images) ? editForm.images : [];
    if (currentImages.length + files.length > maxImages) {
      showSnackbar(`Maximum ${maxImages} images allowed. You can upload ${maxImages - currentImages.length} more.`, "error");
      return;
    }

    let loadedCount = 0;
    const newImages: string[] = [];

    Array.from(files).forEach((file) => {
      if (file.size > maxFileSize) {
        showSnackbar(`Image ${file.name} is too large. Maximum size is 5MB.`, "error");
        loadedCount++;
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const base64String = e.target.result as string;
          newImages.push(base64String);
        }
        loadedCount++;
        if (loadedCount === files.length) {
          setEditForm((prev: any) => ({ ...prev, images: [...(prev.images || []), ...newImages] }));
        }
      };

      reader.onerror = () => {
        loadedCount++;
        showSnackbar(`Failed to read image ${file.name}`, "error");
      };

      reader.readAsDataURL(file);
    });
  };

  const handleDeleteEditImage = (index: number) => {
    setEditForm((prev: any) => ({ ...prev, images: (prev.images || []).filter((_: any, i: number) => i !== index) }));
  };

  const handleEditFormChange = (field: string, value: any) => {
    setEditForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = async () => {
    if (!listingToEdit) return;
    try {
      setEditSaving(true);
      // Prepare payload
      const payload: any = {
        title: editForm.title,
        description: editForm.description,
        propertyType: editForm.property_type || editForm.propertyType,
        listingType: editForm.listing_type || editForm.listingType,
        price: editForm.price,
        location: editForm.location,
        city: editForm.city,
        bedrooms: Number(editForm.bedrooms) || 0,
        bathrooms: Number(editForm.bathrooms) || 0,
        area: Number(editForm.area) || 0,
        parkingSpaces: Number(editForm.parking_spaces) || Number(editForm.parkingSpaces) || 0,
        yearBuilt: Number(editForm.year_built) || Number(editForm.yearBuilt) || 0,
        features: Array.isArray(editForm.features) ? editForm.features : (typeof editForm.features === "string" ? editForm.features.split(",").map((f: string) => f.trim()).filter(Boolean) : []),
        images: Array.isArray(editForm.images) ? editForm.images : (typeof editForm.images === "string" ? editForm.images.split(",").map((f: string) => f.trim()).filter(Boolean) : []),
        sellerType: editForm.seller_type || editForm.sellerType,
        contactName: editForm.contact_name || editForm.contactName,
        contactEmail: editForm.contact_email || editForm.contactEmail,
        contactPhone: editForm.contact_phone || editForm.contactPhone,
        status: editForm.status,
      };

      await listingsService.updateListing(listingToEdit._id, payload);
      // Fetch updated listing and update UI
      const updated = await listingsService.getListingById(listingToEdit._id);
      setUserListings((prev) => prev.map((l) => (l._id === updated._id ? updated : l)));
      showSnackbar("Listing updated successfully", "success");
      handleEditDialogClose();
    } catch (error: any) {
      console.error("Failed to update listing", error);
      showSnackbar(error.message || "Failed to update listing", "error");
    } finally {
      setEditSaving(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <>
      <HeroSection>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            My Profile
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Manage your account and listings
          </Typography>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <ProfileCard>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
            }}
          >
            <Box
              sx={{
                flex: { xs: "1", md: "0 0 300px" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <StyledAvatar>{getInitials(user.name)}</StyledAvatar>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                {user.name}
              </Typography>
              <Chip
                label={profileData?.type}
                color="primary"
                sx={{ textTransform: "capitalize", mb: 2 }}
              />
              {(profileData.phone || user?.phone) && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <PhoneIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {formatPhoneNumber(profileData.phone || user?.phone)}
                  </Typography>
                </Box>
              )}
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Member since {new Date().getFullYear()}
              </Typography>
              {!editMode && (
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => setEditMode(true)}
                  fullWidth
                >
                  Edit Profile
                </Button>
              )}
            </Box>

            <Box sx={{ flex: 1 }}>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <PersonIcon color="primary" />
                  Personal Information
                </Typography>

                <Stack spacing={3}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                      },
                      gap: 3,
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                      disabled={!editMode}
                      variant={editMode ? "outlined" : "filled"}
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
                      }
                      disabled={!editMode}
                      variant={editMode ? "outlined" : "filled"}
                      type="email"
                    />
                    <TextField
                      fullWidth
                      label="Phone Number"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phone: e.target.value,
                        })
                      }
                      disabled={!editMode}
                      variant={editMode ? "outlined" : "filled"}
                    />
                    <TextField
                      fullWidth
                      label="Account Type"
                      value={profileData.type}
                      disabled
                      variant="filled"
                    />
                  </Box>
                </Stack>

                {editMode && (
                  <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={handleProfileUpdate}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : "Save Changes"}
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<CancelIcon />}
                      onClick={() => {
                        setEditMode(false);
                        setProfileData({
                          _id: user?._id || profileData._id,
                          name: user ? user.name : profileData.name,
                          email: user ? user.email : profileData.email,
                          phone: user?.phone || profileData.phone || "",
                          type: user ? user.type : profileData.type,
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </ProfileCard>

        <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{ px: 2 }}
            >
              <Tab
                label={`My Listings (${userListings.length})`}
                icon={<HomeIcon />}
                iconPosition="start"
              />
            </Tabs>
          </Box>

          <TabPanel value={activeTab} index={0}>
            <Container>
              {listingsLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 200,
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : userListings.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 8 }}>
                  <HomeIcon
                    sx={{ fontSize: 80, color: "text.secondary", mb: 2 }}
                  />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No listings yet
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    Start by creating your first property listing
                  </Typography>
                  <Button variant="contained" onClick={() => navigate("/sell")}>
                    Create Listing
                  </Button>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "1fr 1fr",
                      md: "1fr 1fr 1fr",
                    },
                    gap: 3,
                  }}
                >
                  {userListings.map((listing) => (
                    <ListingCard key={listing._id}>
                      <Box sx={{ position: "relative" }}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={
                            listing.images?.[0] || "/mountainhead-house.webp"
                          }
                          alt={listing.title}
                        />
                        <StatusChip
                          label={listing.status || "available"}
                          status={listing.status || "available"}
                          size="small"
                        />
                      </Box>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            mb: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {listing.title}
                        </Typography>
                        <Typography
                          variant="h6"
                          color="primary"
                          sx={{ mb: 2, fontWeight: 700 }}
                        >
                          {formatPrice(parseInt(listing.price))}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            mb: 1,
                            alignItems: "center",
                          }}
                        >
                          <LocationOnIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {listing.location}{" "}
                            {listing.city && `, ${listing.city}`}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                          {listing.bedrooms && (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              <BedIcon fontSize="small" color="action" />
                              <Typography variant="body2">
                                {listing.bedrooms}
                              </Typography>
                            </Box>
                          )}
                          {listing.bathrooms && (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              <BathtubIcon fontSize="small" color="action" />
                              <Typography variant="body2">
                                {listing.bathrooms}
                              </Typography>
                            </Box>
                          )}
                          {listing.area && (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              <SquareFootIcon fontSize="small" color="action" />
                              <Typography variant="body2">
                                {listing.area} sqft
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </CardContent>
                      <Divider />
                      <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                        <Button
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleEditListing(listing)}
                        >
                          Edit
                        </Button>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => openDeleteDialog(listing._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </ListingCard>
                  ))}
                </Box>
              )}
            </Container>
          </TabPanel>
        </Paper>
      </Container>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Listing</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this listing? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteListing}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Listing Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Listing</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Title"
              value={editForm.title || ""}
              onChange={(e) => handleEditFormChange("title", e.target.value)}
              fullWidth
            />
            <TextField
              label="Price"
              value={String(editForm.price ?? "")}
              onChange={(e) => handleEditFormChange("price", e.target.value)}
              fullWidth
            />
            <TextField
              label="Location"
              value={editForm.location || ""}
              onChange={(e) => handleEditFormChange("location", e.target.value)}
              fullWidth
            />
            <TextField
              label="City"
              value={editForm.city || ""}
              onChange={(e) => handleEditFormChange("city", e.target.value)}
              fullWidth
            />
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
              <TextField
                label="Bedrooms"
                value={String(editForm.bedrooms ?? "")}
                onChange={(e) => handleEditFormChange("bedrooms", e.target.value)}
                fullWidth
              />
              <TextField
                label="Bathrooms"
                value={String(editForm.bathrooms ?? "")}
                onChange={(e) => handleEditFormChange("bathrooms", e.target.value)}
                fullWidth
              />
              <TextField
                label="Area (sqft)"
                value={String(editForm.area ?? "")}
                onChange={(e) => handleEditFormChange("area", e.target.value)}
                fullWidth
              />
            </Box>
            <TextField
              label="Features (comma separated)"
              value={Array.isArray(editForm.features) ? editForm.features.join(", ") : editForm.features || ""}
              onChange={(e) => handleEditFormChange("features", e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))}
              fullWidth
            />

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
              {(editForm.images || []).map((img: string, idx: number) => (
                <Box key={idx} sx={{ position: "relative" }}>
                  <ImagePreview sx={{ backgroundImage: `url(${img})` }} />
                  <DeleteButton size="small" onClick={() => handleDeleteEditImage(idx)}>
                    <DeleteIcon fontSize="small" />
                  </DeleteButton>
                </Box>
              ))}

              <div>
                <input
                  id="edit-image-upload"
                  accept="image/*"
                  style={{ display: "none" }}
                  multiple
                  type="file"
                  onChange={handleEditImageUpload}
                />
                <label htmlFor="edit-image-upload">
                  <UploadBox>
                    <CloudUploadIcon sx={{ fontSize: 36, color: "#d92228" }} />
                    <Typography variant="caption">Upload images</Typography>
                  </UploadBox>
                </label>
              </div>
            </Box>
            <TextField
              label="Contact Name"
              value={editForm.contact_name || ""}
              onChange={(e) => handleEditFormChange("contact_name", e.target.value)}
              fullWidth
            />
            <TextField
              label="Contact Email"
              value={editForm.contact_email || ""}
              onChange={(e) => handleEditFormChange("contact_email", e.target.value)}
              fullWidth
            />
            <TextField
              label="Contact Phone"
              value={editForm.contact_phone || ""}
              onChange={(e) => handleEditFormChange("contact_phone", e.target.value)}
              fullWidth
            />
            <TextField
              label="Status"
              value={editForm.status || ""}
              onChange={(e) => handleEditFormChange("status", e.target.value)}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" disabled={editSaving}>
            {editSaving ? <CircularProgress size={20} /> : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Profile;
