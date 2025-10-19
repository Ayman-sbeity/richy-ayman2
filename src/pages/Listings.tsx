import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { listings } from '../data/listingsData';
import { FilterSidebar, PropertyCard, Pagination } from '../components/listings';
import { useLanguage } from '../contexts/LanguageContext';

const PageHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #d92228 0%, #b91c22 100%)',
  color: 'white',
  padding: theme.spacing(8, 3),
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(6, 2),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(5, 2),
  },
}));

const FilterSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(3),
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  marginBottom: theme.spacing(3),
  position: 'sticky',
  top: 20,
  [theme.breakpoints.down('md')]: {
    position: 'static',
  },
}));

const ITEMS_PER_PAGE = 9;

const Listings: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Get initial filter from URL
  const initialType = searchParams.get('type') || 'all';
  const initialCity = searchParams.get('city') || '';

  // Filter states
  const [transactionType, setTransactionType] = useState(initialType);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000000]);
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Filtered listings
  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      // Transaction type filter
      if (transactionType !== 'all') {
        if (transactionType === 'sale' && listing.priceType !== 'sale')
          return false;
        if (transactionType === 'rent' && listing.priceType !== 'rent')
          return false;
      }

      // City filter
      if (selectedCity && listing.location.city !== selectedCity) return false;

      // Property type filter
      if (
        selectedPropertyType &&
        listing.propertyType !== selectedPropertyType.toLowerCase()
      )
        return false;

      // Price filter
      if (listing.price < priceRange[0] || listing.price > priceRange[1])
        return false;

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
  }, [
    transactionType,
    selectedCity,
    selectedPropertyType,
    priceRange,
    bedrooms,
    bathrooms,
    selectedFeatures,
  ]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE);
  const paginatedListings = filteredListings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    transactionType,
    selectedCity,
    selectedPropertyType,
    priceRange,
    bedrooms,
    bathrooms,
    selectedFeatures,
  ]);

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

  const handleClearFilters = () => {
    setTransactionType('all');
    setSelectedCity('');
    setSelectedPropertyType('');
    setPriceRange([0, 2000000]);
    setBedrooms('');
    setBathrooms('');
    setSelectedFeatures([]);
    setCurrentPage(1);
    setSearchParams({});
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <PageHeader>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 600,
              mb: 2,
              fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
              fontFamily: 'Georgia, serif',
            }}
          >
            {t.pages.listings.title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
            }}
          >
            {filteredListings.length}{' '}
            {filteredListings.length === 1 ? t.pages.listings.property : t.pages.listings.properties}{' '}
            {t.pages.listings.available}
          </Typography>
        </Container>
      </PageHeader>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
        <Box sx={{ display: 'flex', gap: { xs: 2, md: 4 } }}>
          {/* Desktop Filters */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              width: { md: 280, lg: 320 },
              flexShrink: 0,
            }}
          >
            <FilterSection>
              <FilterSidebar
                transactionType={transactionType}
                setTransactionType={setTransactionType}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                selectedPropertyType={selectedPropertyType}
                setSelectedPropertyType={setSelectedPropertyType}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                bedrooms={bedrooms}
                setBedrooms={setBedrooms}
                bathrooms={bathrooms}
                setBathrooms={setBathrooms}
                selectedFeatures={selectedFeatures}
                handleFeatureToggle={handleFeatureToggle}
                onClearFilters={handleClearFilters}
              />
            </FilterSection>
          </Box>

          {/* Listings Content */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Mobile Filter Button */}
            <Box
              sx={{
                display: { xs: 'block', md: 'none' },
                mb: 2,
                position: 'sticky',
                top: 0,
                zIndex: 10,
                backgroundColor: '#f8f9fa',
                py: 1,
              }}
            >
              <Button
                fullWidth
                variant="contained"
                startIcon={<FilterListIcon />}
                onClick={() => setMobileFilterOpen(true)}
                sx={{
                  backgroundColor: '#d92228',
                  py: 1.5,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  fontWeight: 600,
                  '&:hover': { backgroundColor: '#b91c22' },
                  boxShadow: '0 2px 8px rgba(217, 34, 40, 0.3)',
                }}
              >
                {t.pages.listings.filter.filtersButton} ({filteredListings.length} {t.pages.listings.filter.results})
              </Button>
            </Box>

            {/* No Results */}
            {filteredListings.length === 0 ? (
              <Box
                sx={{
                  textAlign: 'center',
                  py: { xs: 6, sm: 8, md: 10 },
                  px: 2,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    color: '#666',
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  }}
                >
                  {t.pages.listings.noResults.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#999',
                    mb: 3,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                  }}
                >
                  {t.pages.listings.noResults.subtitle}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handleClearFilters}
                  sx={{
                    borderColor: '#d92228',
                    color: '#d92228',
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      borderColor: '#b91c22',
                      backgroundColor: 'rgba(217, 34, 40, 0.05)',
                    },
                  }}
                >
                  {t.pages.listings.noResults.clearButton}
                </Button>
              </Box>
            ) : (
              <>
                {/* Property Grid */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: 'repeat(2, 1fr)',
                      lg: 'repeat(3, 1fr)',
                    },
                    gap: { xs: 2, sm: 2.5, md: 3 },
                  }}
                >
                  {paginatedListings.map((listing) => (
                    <PropertyCard
                      key={listing.id}
                      listing={listing}
                      onClick={handleViewDetails}
                    />
                  ))}
                </Box>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  itemsPerPage={ITEMS_PER_PAGE}
                  totalItems={filteredListings.length}
                />
              </>
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
        <Box sx={{ width: { xs: 280, sm: 320 }, p: 3 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {t.pages.listings.filter.filtersButton}
            </Typography>
            <IconButton onClick={() => setMobileFilterOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <FilterSidebar
            transactionType={transactionType}
            setTransactionType={setTransactionType}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            selectedPropertyType={selectedPropertyType}
            setSelectedPropertyType={setSelectedPropertyType}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            bedrooms={bedrooms}
            setBedrooms={setBedrooms}
            bathrooms={bathrooms}
            setBathrooms={setBathrooms}
            selectedFeatures={selectedFeatures}
            handleFeatureToggle={handleFeatureToggle}
            onClearFilters={() => {
              handleClearFilters();
              setMobileFilterOpen(false);
            }}
          />
        </Box>
      </Drawer>
    </Box>
  );
};

export default Listings;
