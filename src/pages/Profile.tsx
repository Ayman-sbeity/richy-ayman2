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
  login({ ...(updatedUser as any), token: updatedUser.token || currentToken || undefined });
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

  const handleEditListing = (listingId: string) => {
    navigate(`/sell?edit=${listingId}`);
  };

  const openDeleteDialog = (listingId: string) => {
    setListingToDelete(listingId);
    setDeleteDialogOpen(true);
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
                          phone: "",
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
                          onClick={() => handleEditListing(listing._id)}
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
