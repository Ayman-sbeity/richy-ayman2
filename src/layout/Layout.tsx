import React from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const LayoutContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
}));

const MainContent = styled("main")(({ theme }) => ({
  flex: 1,
  minHeight: "calc(100vh - 160px)", // Adjust based on navbar and footer height
}));

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Navbar />
      <MainContent>{children ?? <Outlet />}</MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
