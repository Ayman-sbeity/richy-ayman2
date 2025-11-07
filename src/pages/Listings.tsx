import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { listingsService } from '../services/listingsService';
import { Listing } from '../data/listingsData';
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

  const initialType = searchParams.get('type') || 'all';
  const initialCity = searchParams.get('city') || '';

  const [transactionType, setTransactionType] = useState(initialType);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000000]);
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // API states
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch listings from API
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const filters: Record<string, any> = {
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        };

        if (transactionType !== 'all') {
          filters.listing_type = transactionType;
        }

        if (selectedCity) {
          filters.city = selectedCity;
        }

        if (selectedPropertyType) {
          filters.propertyType = selectedPropertyType.toLowerCase();
        }

        if (priceRange[0] > 0) {
          filters.minPrice = priceRange[0];
        }

        if (priceRange[1] < 2000000) {
          filters.maxPrice = priceRange[1];
        }

        if (bedrooms) {
          filters.minBedrooms = parseInt(bedrooms);
        }

        if (bathrooms) {
          filters.minBathrooms = parseInt(bathrooms);
        }

        if (selectedFeatures.length > 0) {
          filters.features = selectedFeatures.join(',');
        }

        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            params.set(key, value.toString());
          }
        });
        setSearchParams(params);

        const response = await listingsService.getListings(filters);
        
        let fetchedListings: Listing[] = [];
        if (Array.isArray(response)) {
          fetchedListings = response;
          setTotalCount(response.length);
        } else if (response.data && Array.isArray(response.data)) {
          fetchedListings = response.data;
          setTotalCount(response.total || response.data.length);
        } else {
          setListings([]);
          setTotalCount(0);
          return;
        }
        
        // Normalize the data: convert _id to id if needed
        const normalizedListings = fetchedListings.map((listing: any) => ({
          ...listing,
          id: listing.id || listing._id,
        }));
        
        setListings(normalizedListings);
      } catch (err: any) {
        console.error('Error fetching listings:', err);
        setError(err.message || 'Failed to fetch listings');
        setListings([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [
    currentPage,
    transactionType,
    selectedCity,
    selectedPropertyType,
    priceRange,
    bedrooms,
    bathrooms,
    selectedFeatures,
    setSearchParams,
  ]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

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

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

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
            {loading ? (
              'Loading...'
            ) : (
              <>
                {totalCount}{' '}
                {totalCount === 1 ? t.pages.listings.property : t.pages.listings.properties}{' '}
                {t.pages.listings.available}
              </>
            )}
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

          <Box sx={{ flex: 1, minWidth: 0 }}>
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
                {t.pages.listings.filter.filtersButton} ({totalCount} {t.pages.listings.filter.results})
              </Button>
            </Box>

            {/* Loading State */}
            {loading && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  py: { xs: 8, sm: 10, md: 12 },
                }}
              >
                <CircularProgress
                  size={60}
                  sx={{ color: '#d92228' }}
                />
              </Box>
            )}

            {/* Error State */}
            {error && !loading && (
              <Box sx={{ mb: 3 }}>
                <Alert 
                  severity="error" 
                  onClose={() => setError(null)}
                  sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                >
                  {error}
                </Alert>
              </Box>
            )}

            {/* No Results */}
            {!loading && !error && listings.length === 0 ? (
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
                  {listings.map((listing: Listing) => (
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
                  totalItems={totalCount}
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
