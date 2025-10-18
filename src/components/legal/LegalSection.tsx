import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const SectionContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  animation: 'fadeInUp 0.6s ease-out',
  '@keyframes fadeInUp': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: '#d92228',
  marginBottom: theme.spacing(2),
  fontSize: '1.5rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.25rem',
  },
}));

const SectionContent = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  lineHeight: 1.8,
  fontSize: '1rem',
  textAlign: 'justify',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.95rem',
    lineHeight: 1.7,
  },
}));

interface LegalSectionProps {
  title: string;
  content: string | React.ReactNode;
  delay?: number;
}

const LegalSection: React.FC<LegalSectionProps> = ({ title, content, delay = 0 }) => {
  return (
    <SectionContainer sx={{ animationDelay: `${delay}s` }}>
      <SectionTitle variant="h5">{title}</SectionTitle>
      {typeof content === 'string' ? (
        <SectionContent variant="body1" paragraph>
          {content}
        </SectionContent>
      ) : (
        content
      )}
    </SectionContainer>
  );
};

export default LegalSection;
