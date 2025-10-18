import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Gavel, Security } from '@mui/icons-material';

const HeaderContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  animation: 'fadeIn 0.8s ease-out',
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  background: 'linear-gradient(135deg, #d92228 0%, #b91c22 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(1),
  fontSize: '2.5rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const HeaderSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '1.1rem',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 70,
  height: 70,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #d92228 0%, #b91c22 100%)',
  color: 'white',
  marginBottom: theme.spacing(2),
  boxShadow: '0 8px 24px rgba(217, 34, 40, 0.3)',
  animation: 'scaleIn 0.5s ease-out',
  '@keyframes scaleIn': {
    from: { transform: 'scale(0)' },
    to: { transform: 'scale(1)' },
  },
  [theme.breakpoints.down('sm')]: {
    width: 60,
    height: 60,
  },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(3, 0),
  height: 3,
  background: 'linear-gradient(90deg, transparent 0%, #d92228 50%, transparent 100%)',
  border: 'none',
}));

interface LegalHeaderProps {
  title: string;
  subtitle: string;
  icon?: 'gavel' | 'security';
  lastUpdated?: string;
}

const LegalHeader: React.FC<LegalHeaderProps> = ({ 
  title, 
  subtitle, 
  icon = 'gavel',
  lastUpdated = 'October 17, 2025'
}) => {
  return (
    <HeaderContainer>
      <IconWrapper>
        {icon === 'gavel' ? (
          <Gavel sx={{ fontSize: { xs: 32, sm: 40 } }} />
        ) : (
          <Security sx={{ fontSize: { xs: 32, sm: 40 } }} />
        )}
      </IconWrapper>
      <HeaderTitle variant="h3">{title}</HeaderTitle>
      <HeaderSubtitle variant="body1">{subtitle}</HeaderSubtitle>
      <Typography 
        variant="caption" 
        sx={{ 
          color: 'text.disabled',
          fontSize: { xs: '0.75rem', sm: '0.813rem' }
        }}
      >
        Last Updated: {lastUpdated}
      </Typography>
      <StyledDivider />
    </HeaderContainer>
  );
};

export default LegalHeader;
