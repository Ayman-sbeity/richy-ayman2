import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { 
  Logo, 
  SearchBar, 
  NavigationMenu, 
  ActionButtons,
  NavigationItem,
  LanguageToggle
} from '../components/UI';
import { useLanguage } from '../contexts/LanguageContext';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  borderBottom: '1px solid #e6e6e6',
  color: '#333',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: 70,
  padding: '0 20px',
  [theme.breakpoints.down('md')]: {
    padding: '0 16px',
  },
  [theme.breakpoints.down('sm')]: {
    height: 60,
    padding: '0 12px',
  },
}));

const DesktopNavContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  justifyContent: 'space-between',
  maxWidth: 1400,
  margin: '0 auto',
  width: '100%',
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: 500,
  margin: '0 40px',
  [theme.breakpoints.down('lg')]: {
    maxWidth: 300,
    margin: '0 20px',
  },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  color: '#333',
  padding: 8,
}));

const DrawerContent = styled(Box)(({ theme }) => ({
  width: 280,
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useLanguage();

  const navigationItems: NavigationItem[] = [
    { label: t.nav.buy, href: '/listings?type=sale' },
    { label: t.nav.sell, href: '/sell' },
    { label: t.nav.rent, href: '/listings?type=rent' },
    { label: t.nav.aboutUs, href: '/about' },
    { label: t.nav.contact, href: '/contact' },
  ];

  const actionButtons = [
    { label: t.nav.login, variant: 'outlined' as const, href: '/login' },
    { label: t.nav.signup, variant: 'contained' as const, href: '/signup' },
  ];

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
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
                {/* Desktop Navigation */}
                <NavigationMenu items={navigationItems} gap={30} />

                {/* Search Bar */}
                <SearchContainer>
                  <SearchBar 
                    onSearch={handleSearch}
                    variant="navbar"
                  />
                </SearchContainer>

                {/* Language Toggle */}
                <LanguageToggle />

                {/* Action Buttons */}
                <ActionButtons buttons={actionButtons} />
              </>
            ) : (
              <>
                {/* Mobile Menu Button */}
                <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>
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

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
          },
        }}
      >
        <DrawerContent>
          {/* Mobile Search */}
          <Box>
            <SearchBar 
              onSearch={handleSearch}
              variant="mobile"
              fullWidth
            />
          </Box>

          {/* Mobile Navigation */}
          <NavigationMenu 
            items={navigationItems} 
            variant="mobile" 
          />

          {/* Mobile Actions */}
          <ActionButtons 
            buttons={actionButtons} 
            variant="mobile" 
          />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;