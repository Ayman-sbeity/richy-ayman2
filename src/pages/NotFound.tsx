import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Page not found
        </Typography>
        <Button variant="contained" component={RouterLink} to="/">
          Go home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
