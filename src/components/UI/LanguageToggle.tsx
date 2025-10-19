import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useLanguage } from '../../contexts/LanguageContext';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: '#333',
  width: 40,
  height: 40,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    color: '#d92228',
  },
}));

const LanguageText = styled('span')(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 600,
  marginLeft: theme.spacing(0.5),
}));

interface LanguageToggleProps {
  showLabel?: boolean;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ showLabel = false }) => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const label = language === 'en' ? 'العربية' : 'English';
  const tooltip = language === 'en' ? 'Switch to Arabic' : 'Switch to English';

  return (
    <Tooltip title={tooltip}>
      <StyledIconButton onClick={toggleLanguage} aria-label={tooltip}>
        <LanguageIcon />
        {showLabel && <LanguageText>{label}</LanguageText>}
      </StyledIconButton>
    </Tooltip>
  );
};

export default LanguageToggle;
