import React from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useLanguage } from "../../contexts/LanguageContext";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}) => {
  const theme = useTheme();
  const { t } = useLanguage();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = isMobile ? 3 : 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        end = Math.min(maxVisible - 1, totalPages - 1);
      }

      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - (maxVisible - 2));
      }

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        mt: 4,
        pt: 3,
        borderTop: "1px solid #e0e0e0",
      }}
    >
      {/* Items Count */}
      <Typography
        variant="body2"
        sx={{
          color: "#666",
          fontSize: { xs: "0.85rem", sm: "0.9rem" },
          order: { xs: 2, sm: 1 },
        }}
      >
        {t.pages.listings.pagination.showing} {startItem} - {endItem}{" "}
        {t.pages.listings.pagination.of} {totalItems}{" "}
        {totalItems === 1
          ? t.pages.listings.property
          : t.pages.listings.properties}
      </Typography>

      {/* Pagination Buttons */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          order: { xs: 1, sm: 2 },
        }}
      >
        <Button
          variant="outlined"
          size={isMobile ? "small" : "medium"}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          sx={{
            minWidth: { xs: "36px", sm: "40px" },
            px: { xs: 1, sm: 1.5 },
            borderColor: "#d92228",
            color: "#d92228",
            "&:hover": {
              borderColor: "#b91c22",
              backgroundColor: "rgba(217, 34, 40, 0.05)",
            },
            "&.Mui-disabled": {
              borderColor: "#e0e0e0",
              color: "#bbb",
            },
          }}
        >
          <NavigateBeforeIcon fontSize={isMobile ? "small" : "medium"} />
        </Button>

        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <Typography
                sx={{
                  px: { xs: 1, sm: 1.5 },
                  color: "#666",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                ...
              </Typography>
            ) : (
              <Button
                variant={currentPage === page ? "contained" : "outlined"}
                size={isMobile ? "small" : "medium"}
                onClick={() => onPageChange(page as number)}
                sx={{
                  minWidth: { xs: "36px", sm: "40px" },
                  px: { xs: 1, sm: 1.5 },
                  borderColor: currentPage === page ? "#d92228" : "#e0e0e0",
                  backgroundColor:
                    currentPage === page ? "#d92228" : "transparent",
                  color: currentPage === page ? "white" : "#666",
                  fontWeight: currentPage === page ? 600 : 400,
                  fontSize: { xs: "0.85rem", sm: "0.9rem" },
                  "&:hover": {
                    borderColor: "#d92228",
                    backgroundColor:
                      currentPage === page
                        ? "#b91c22"
                        : "rgba(217, 34, 40, 0.05)",
                    color: currentPage === page ? "white" : "#d92228",
                  },
                }}
              >
                {page}
              </Button>
            )}
          </React.Fragment>
        ))}

        {/* Next Button */}
        <Button
          variant="outlined"
          size={isMobile ? "small" : "medium"}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          sx={{
            minWidth: { xs: "36px", sm: "40px" },
            px: { xs: 1, sm: 1.5 },
            borderColor: "#d92228",
            color: "#d92228",
            "&:hover": {
              borderColor: "#b91c22",
              backgroundColor: "rgba(217, 34, 40, 0.05)",
            },
            "&.Mui-disabled": {
              borderColor: "#e0e0e0",
              color: "#bbb",
            },
          }}
        >
          <NavigateNextIcon fontSize={isMobile ? "small" : "medium"} />
        </Button>
      </Box>
    </Box>
  );
};

export default Pagination;
