import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  Logo,
  SearchBar,
  NavigationMenu,
  ActionButtons,
  NavigationItem,
  LanguageToggle,
} from "../components/UI";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#ffffff",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  borderBottom: "1px solid #e6e6e6",
  color: "#333",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: 70,
  padding: "0 20px",
  [theme.breakpoints.down("md")]: {
    padding: "0 16px",
  },
  [theme.breakpoints.down("sm")]: {
    height: 60,
    padding: "0 12px",
  },
}));

const DesktopNavContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flex: 1,
  justifyContent: "space-between",
  maxWidth: 1400,
  margin: "0 auto",
  width: "100%",
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: 500,
  margin: "0 40px",
  [theme.breakpoints.down("lg")]: {
    maxWidth: 300,
    margin: "0 20px",
  },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  color: "#333",
  padding: 8,
}));

const DrawerContent = styled(Box)(({ theme }) => ({
  width: 280,
  padding: theme.spacing(2),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();

  const navigationItems: NavigationItem[] = [
    { label: t.nav.buy, href: "/listings?type=sale" },
    { label: t.nav.sell, href: "/sell" },
    { label: t.nav.rent, href: "/listings?type=rent" },
    { label: t.nav.aboutUs, href: "/about" },
    { label: t.nav.contact, href: "/contact" },
  ];

  const actionButtons = isAuthenticated
    ? []
    : [
        { label: t.nav.login, variant: "outlined" as const, href: "/login" },
        { label: t.nav.signup, variant: "contained" as const, href: "/signup" },
      ];

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigate = useNavigate();
  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
  };

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    // Implement search functionality here
  };

  return (
    <>
      <StyledAppBar position="sticky">
        <StyledToolbar>
          <DesktopNavContainer>
            {/* Logo */}
            <Logo href="/" />

            {!isMobile ? (
              <>
                <Box sx={{ ml: 2 }}>
                  <NavigationMenu items={navigationItems} gap={30} />
                </Box>

                <SearchContainer>
                  <SearchBar onSearch={handleSearch} variant="navbar" />
                </SearchContainer>

                <LanguageToggle />

                {isAuthenticated && user ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body1" sx={{ color: "#333" }}>
                      {t.nav.welcome}, {user.name}
                    </Typography>
                    <Button
                      onClick={handleUserMenuOpen}
                      sx={{
                        color: "#333",
                        textTransform: "none",
                        "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
                      }}
                    >
                      ▼
                    </Button>
                    <Menu
                      anchorEl={userMenuAnchor}
                      open={Boolean(userMenuAnchor)}
                      onClose={handleUserMenuClose}
                    >
                      <MenuItem onClick={() => { handleUserMenuClose(); navigate('/profile'); }}>{t.nav.profile || "Profile"}</MenuItem>
                      <MenuItem onClick={handleLogout}>{t.nav.logout}</MenuItem>
                    </Menu>
                  </Box>
                ) : (
                  <ActionButtons buttons={actionButtons} />
                )}
              </>
            ) : (
              <>
                <Box sx={{ marginLeft: "auto", display: "flex", gap: 1 }}>
                  <LanguageToggle />
                  <MobileMenuButton
                    onClick={handleMobileMenuToggle}
                    aria-label="open menu"
                  >
                    <MenuIcon />
                  </MobileMenuButton>
                </Box>
              </>
            )}
          </DesktopNavContainer>
        </StyledToolbar>
      </StyledAppBar>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
          },
        }}
      >
        <DrawerContent>
          <Box>
            <SearchBar onSearch={handleSearch} variant="mobile" fullWidth />
          </Box>

          <NavigationMenu items={navigationItems} variant="mobile" />

          {isAuthenticated && user ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography
                variant="body1"
                sx={{ color: "#333", textAlign: "center" }}
              >
                {t.nav.welcome}, {user.name}
              </Typography>
              <Button
                onClick={() => {
                  window.location.href = '/profile';
                  setMobileMenuOpen(false);
                }}
                variant="contained"
                fullWidth
              >
                {t.nav.profile || "Profile"}
              </Button>
              <Button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                variant="outlined"
                fullWidth
              >
                {t.nav.logout}
              </Button>
            </Box>
          ) : (
            <ActionButtons buttons={actionButtons} variant="mobile" />
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
