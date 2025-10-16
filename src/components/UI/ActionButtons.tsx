import React from "react";
import { Button, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme }) => ({
  padding: "10px 20px",
  borderRadius: 6,
  fontWeight: 600,
  fontSize: "0.875rem",
  textTransform: "none",
  transition: "all 0.3s ease",
  border: "2px solid #d92228",
  "&.MuiButton-outlined": {
    backgroundColor: "transparent",
    color: "#d92228",
    "&:hover": {
      backgroundColor: "#d92228",
      color: "white",
    },
  },
  "&.MuiButton-contained": {
    backgroundColor: "#d92228",
    color: "white",
    "&:hover": {
      backgroundColor: "#b91c22",
    },
  },
}));

interface ActionButton {
  label: string;
  variant?: "outlined" | "contained";
  onClick?: () => void;
  href?: string;
}

interface ActionButtonsProps {
  buttons: ActionButton[];
  variant?: "desktop" | "mobile";
  gap?: number;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  buttons,
  variant = "desktop",
  gap = 12,
}) => {
  const stackDirection = variant === "mobile" ? "column" : "row";

  return (
    <Stack
      direction={stackDirection}
      spacing={gap / 8}
      sx={{
        alignItems: variant === "mobile" ? "stretch" : "center",
        width: variant === "mobile" ? "100%" : "auto",
      }}
    >
      {buttons.map((button, index) => (
        <StyledButton
          key={index}
          variant={button.variant || "outlined"}
          onClick={button.onClick}
          href={button.href}
          sx={
            variant === "mobile"
              ? {
                  padding: "12px 20px",
                  fontSize: "1rem",
                  width: "100%",
                }
              : {}
          }
        >
          {button.label}
        </StyledButton>
      ))}
    </Stack>
  );
};

export default ActionButtons;

