import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Link,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "#333",
  fontWeight: 600,
  fontSize: "1rem",
  padding: "8px 0",
  transition: "color 0.3s ease",
  position: "relative",
  "&:hover": {
    color: "#d92228",
    textDecoration: "none",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-2px",
    left: 0,
    width: 0,
    height: "2px",
    backgroundColor: "#d92228",
    transition: "width 0.3s ease",
  },
  "&:hover::after": {
    width: "100%",
  },
}));

const MobileListItem = styled(ListItem)(({ theme }) => ({
  padding: 0,
  borderBottom: "1px solid #e6e6e6",
  "&:last-child": {
    borderBottom: "none",
  },
}));

const MobileLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "#333",
  fontWeight: 600,
  fontSize: "1rem",
  width: "100%",
  "&:hover": {
    color: "#d92228",
    textDecoration: "none",
  },
}));

export interface NavigationItem {
  label: string;
  href: string;
  onClick?: () => void;
}

interface NavigationMenuProps {
  items: NavigationItem[];
  variant?: "desktop" | "mobile";
  gap?: number;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  items,
  variant = "desktop",
  gap = 30,
}) => {
  if (variant === "mobile") {
    return (
      <List sx={{ width: "100%", padding: 0 }}>
        {items.map((item, index) => (
          <MobileListItem key={index}>
            <ListItemButton sx={{ padding: "16px 0" }}>
              <MobileLink href={item.href} onClick={item.onClick}>
                <ListItemText
                  primary={item.label}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: 600,
                      fontSize: "1rem",
                    },
                  }}
                />
              </MobileLink>
            </ListItemButton>
          </MobileListItem>
        ))}
      </List>
    );
  }

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: `${gap}px`,
      }}
    >
      {items.map((item, index) => (
        <StyledLink key={index} href={item.href} onClick={item.onClick}>
          {item.label}
        </StyledLink>
      ))}
    </Box>
  );
};

export default NavigationMenu;
