import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  maxWidth: 500,
  margin: "0 auto",
}));

const StyledTextField = styled(TextField)<{
  $variant: "navbar" | "hero" | "mobile";
}>`
  & .MuiOutlinedInput-root {
    background-color: #ffffff;
    border-radius: 8px;
    position: relative; /* make this the containing block for absolute adornments */
    padding-right: ${(props) =>
      props.$variant === "hero"
        ? "72px"
        : "60px"}; /* reserve space for the button */

    & fieldset {
      border: 2px solid #e0e0e0;
    }

    &:hover fieldset {
      border-color: #d73502;
    }

    &.Mui-focused fieldset {
      border-color: #d73502;
      border-width: 2px;
    }
  }

  & .MuiInputBase-input {
    font-size: ${(props) => (props.$variant === "hero" ? "16px" : "14px")};
    padding: ${(props) =>
      props.$variant === "hero"
        ? "14px 16px 14px 16px"
        : "12px 16px 12px 16px"};
  }
`;

const SearchButton = styled(IconButton)<{
  variant?: "navbar" | "hero" | "mobile";
}>`
  background-color: #d73502;
  color: white;
  border-radius: 6px;
  min-width: ${(props) => (props.variant === "hero" ? "44px" : "36px")};
  min-height: ${(props) => (props.variant === "hero" ? "44px" : "36px")};
  margin: 0;
  position: absolute;
  right: 4px; /* sit a little inside the field so the white radius isn't visible */
  top: 50%;
  transform: translateY(-50%);
  z-index: 2; /* ensure it's above the input background */

  &:hover {
    background-color: #c12e02;
    color: white;
  }

  & .MuiSvgIcon-root {
    font-size: ${(props) => (props.variant === "hero" ? "20px" : "16px")};
  }
`;

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  variant?: "navbar" | "hero" | "mobile";
  fullWidth?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Enter an address, neighborhood, city, or ZIP code",
  onSearch,
  variant = "navbar",
  fullWidth = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSearch = () => {
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Dynamic styles based on variant
  const containerMaxWidth =
    variant === "hero" ? 600 : variant === "mobile" ? "100%" : 500;

  return (
    <SearchContainer
      sx={{
        maxWidth: containerMaxWidth,
        width: fullWidth ? "100%" : "auto",
      }}
    >
      <StyledTextField
        $variant={variant}
        fullWidth
        variant="outlined"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        sx={{
          maxWidth: containerMaxWidth,
          ...(variant === "mobile" && {
            "& .MuiOutlinedInput-root": {
              fontSize: "14px",
            },
          }),
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchButton
                variant={variant}
                onClick={handleSearch}
                size="small"
                aria-label="search"
              >
                <SearchIcon />
              </SearchButton>
            </InputAdornment>
          ),
        }}
      />
    </SearchContainer>
  );
};

export default SearchBar;
