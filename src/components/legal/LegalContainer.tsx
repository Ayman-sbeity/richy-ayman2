import React from 'react';
import { Container, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(8),
  background: 'linear-gradient(135deg, rgba(0, 30, 60, 0.02) 0%, rgba(0, 60, 100, 0.05) 100%)',
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(6),
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: 20,
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
  animation: 'slideIn 0.6s ease-out',
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  backdropFilter: 'blur(10px)',
  '@keyframes slideIn': {
    from: {
      opacity: 0,
      transform: 'translateY(30px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 3),
    borderRadius: 16,
  },
}));

interface LegalContainerProps {
  children: React.ReactNode;
}

const LegalContainer: React.FC<LegalContainerProps> = ({ children }) => {
  return (
    <StyledContainer maxWidth="md">
      <StyledPaper elevation={3}>
        <Box sx={{ position: 'relative' }}>
          {children}
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default LegalContainer;
