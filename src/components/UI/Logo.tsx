import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { styled } from "@mui/material/styles";

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: "#d92228",
  cursor: "pointer",
  "&:hover": {
    textDecoration: "none",
  },
}));

const LogoImage = styled("img")(({ theme }) => ({
  height: 40,
  width: 40,
  marginRight: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    height: 32,
    width: 32,
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.5rem",
  color: "#d92228",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.25rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.125rem",
  },
}));

interface LogoProps {
  href?: string;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
}

const Logo: React.FC<LogoProps> = ({
  href = "/",
  onClick,
  size = "medium",
}) => {
  const getSizes = () => {
    switch (size) {
      case "small":
        return { imageSize: 32, fontSize: "1.125rem" };
      case "large":
        return { imageSize: 48, fontSize: "1.75rem" };
      default:
        return { imageSize: 40, fontSize: "1.5rem" };
    }
  };

  const { imageSize, fontSize } = getSizes();

  const logoContent = (
    <>
      <LogoImage
        src="/logo192.png"
        alt="RealtyFinder Logo"
        sx={{ height: imageSize, width: imageSize }}
      />
      <LogoText sx={{ fontSize }}>Manzilocom</LogoText>
    </>
  );

  if (href) {
    return (
      <Link href={href} underline="none" onClick={onClick}>
        <LogoContainer>{logoContent}</LogoContainer>
      </Link>
    );
  }

  return <LogoContainer onClick={onClick}>{logoContent}</LogoContainer>;
};

export default Logo;
