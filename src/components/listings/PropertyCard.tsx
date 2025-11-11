import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import { Listing } from "../../data/listingsData";
import {
  useLanguage,
  translateCity,
  translateNeighborhood,
  translateListingTitle,
} from "../../contexts/LanguageContext";

interface PropertyCardProps {
  listing: Listing;
  onClick: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ listing, onClick }) => {
  const { t, language } = useLanguage();

  return (
    <Card
      sx={{
        cursor: "pointer",
        transition: "all 0.3s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: { xs: "translateY(-4px)", md: "translateY(-8px)" },
          boxShadow: {
            xs: "0 8px 16px rgba(0,0,0,0.12)",
            md: "0 12px 24px rgba(0,0,0,0.15)",
          },
        },
      }}
      onClick={() => onClick(listing.id)}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image={listing.images[0]}
          alt={listing.title}
          sx={{
            objectFit: "cover",
            height: { xs: "180px", sm: "200px", md: "220px" },
          }}
        />
        <Chip
          label={
            ((listing as any).listing_type) === "Sale"
              ? t.components.propertyCard.forSale
              : t.components.propertyCard.forRent
          }
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            backgroundColor:
              ((listing as any).listing_type || listing.priceType) === "sale" ? "#d92228" : "#28a745",
            color: "white",
            fontWeight: 600,
            fontSize: { xs: "0.75rem", sm: "0.8rem" },
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        />
        {listing.featured && (
          <Chip
            label={t.components.propertyCard.featured}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              backgroundColor: "#ff9800",
              color: "white",
              fontWeight: 600,
              fontSize: { xs: "0.75rem", sm: "0.8rem" },
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          />
        )}
      </Box>
      <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5 } }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1,
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
            lineHeight: 1.3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {translateListingTitle(listing.id, language) || listing.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#666",
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            fontSize: { xs: "0.85rem", sm: "0.9rem" },
          }}
        >
          <LocationOnIcon sx={{ fontSize: "1rem", color: "#d92228" }} />
          {translateNeighborhood(listing.location.neighborhood, language)},{" "}
          {translateCity(listing.location.city, language)}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "#d92228",
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: "1.3rem", sm: "1.4rem", md: "1.5rem" },
          }}
        >
          ${listing.price.toLocaleString()}
          {((listing as any).listing_type || listing.priceType) === "rent" && (
            <span style={{ fontSize: "0.85em", fontWeight: 500 }}>
              {t.components.propertyCard.perMonth}
            </span>
          )}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: { xs: 1.5, sm: 2 },
            mb: 2,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <BedIcon
              sx={{ fontSize: { xs: "1.1rem", sm: "1.2rem" }, color: "#666" }}
            />
            <Typography
              variant="body2"
              sx={{ color: "#666", fontSize: { xs: "0.85rem", sm: "0.9rem" } }}
            >
              {listing.bedrooms} {t.components.propertyCard.beds}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <BathtubIcon
              sx={{ fontSize: { xs: "1.1rem", sm: "1.2rem" }, color: "#666" }}
            />
            <Typography
              variant="body2"
              sx={{ color: "#666", fontSize: { xs: "0.85rem", sm: "0.9rem" } }}
            >
              {listing.bathrooms} {t.components.propertyCard.baths}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <SquareFootIcon
              sx={{ fontSize: { xs: "1.1rem", sm: "1.2rem" }, color: "#666" }}
            />
            <Typography
              variant="body2"
              sx={{ color: "#666", fontSize: { xs: "0.85rem", sm: "0.9rem" } }}
            >
              {listing.area.toLocaleString()} {t.components.propertyCard.sqft}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {listing.features.slice(0, 3).map((feature, index) => (
            <Chip
              key={index}
              label={feature}
              size="small"
              sx={{
                fontSize: { xs: "0.7rem", sm: "0.75rem" },
                backgroundColor: "#f5f5f5",
                height: { xs: "22px", sm: "24px" },
              }}
            />
          ))}
          {listing.features.length > 3 && (
            <Chip
              label={`+${listing.features.length - 3}`}
              size="small"
              sx={{
                fontSize: { xs: "0.7rem", sm: "0.75rem" },
                backgroundColor: "#f5f5f5",
                fontWeight: 600,
                height: { xs: "22px", sm: "24px" },
              }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
