import React from "react";
import { Container, Typography, Box } from "@mui/material";

const About: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          About RealtyFinder
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          RealtyFinder helps you discover curated listings, connect with
          agents, and manage your property search all in one place.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
