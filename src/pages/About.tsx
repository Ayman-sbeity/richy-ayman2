import React from "react";
import { Container, Typography, Box, Card, CardContent, Avatar, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { useLanguage } from '../contexts/LanguageContext';

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)`,
  color: "white",
  padding: theme.spacing(12, 3),
  textAlign: "center",
  minHeight: '50vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 50%, rgba(217, 34, 40, 0.1) 0%, transparent 50%)',
    zIndex: 1,
  },
}));

const HeroContent = styled(Box)(({ theme }) => ({
  maxWidth: 900,
  margin: "0 auto",
  position: 'relative',
  zIndex: 2,
}));

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
}));

const TeamCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  transition: 'all 0.3s ease',
  borderRadius: '12px',
  border: '1px solid #f0f0f0',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
    borderColor: '#d92228',
  },
}));

const About: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700, 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              letterSpacing: '-0.5px'
            }}
          >
            {t.pages.about.hero.title}
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mt: 2, 
              fontWeight: 300,
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              opacity: 0.95
            }}
          >
            {t.pages.about.hero.subtitle}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mt: 3, 
              fontSize: '1.1rem',
              maxWidth: 700,
              margin: '24px auto 0',
              opacity: 0.9
            }}
          >
            {t.pages.about.hero.description}
          </Typography>
        </HeroContent>
      </HeroSection>

      <Container maxWidth="lg">
        {/* Our Story Section */}
        <Section>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            align="center"
            sx={{ fontWeight: 700, mb: 3 }}
          >
            {t.pages.about.ourStory.title}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mt: 4, 
              fontSize: '1.1rem', 
              lineHeight: 1.8,
              color: '#333',
              textAlign: 'justify'
            }}
          >
            {t.pages.about.ourStory.paragraph1}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mt: 3, 
              fontSize: '1.1rem', 
              lineHeight: 1.8,
              color: '#333',
              textAlign: 'justify'
            }}
          >
            {t.pages.about.ourStory.paragraph2}
          </Typography>
        </Section>

        <Divider />

        {/* Mission & Vision */}
        <Section>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
            <Box sx={{ 
              p: 4, 
              borderRadius: 2, 
              background: 'linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 700, color: '#d92228' }}>
                {t.pages.about.mission.title}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#444' }}>
                {t.pages.about.mission.description}
              </Typography>
            </Box>
            <Box sx={{ 
              p: 4, 
              borderRadius: 2, 
              background: 'linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 700, color: '#d92228' }}>
                {t.pages.about.vision.title}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#444' }}>
                {t.pages.about.vision.description}
              </Typography>
            </Box>
          </Box>
        </Section>

        <Divider />

        {/* Our Team */}
        <Section>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            align="center"
            sx={{ fontWeight: 700, mb: 2 }}
          >
            {t.pages.about.founders.title}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mt: 2, 
              mb: 6, 
              textAlign: 'center',
              fontSize: '1.1rem',
              color: '#666',
              maxWidth: 800,
              margin: '16px auto 48px'
            }}
          >
            {t.pages.about.founders.subtitle}
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, 
            gap: 5,
            maxWidth: 900,
            margin: '0 auto'
          }}>
            <TeamCard elevation={2}>
              <Avatar 
                sx={{ 
                  width: 120, 
                  height: 120, 
                  mx: 'auto', 
                  mb: 3,
                  background: 'linear-gradient(135deg, #d92228 0%, #b71c1c 100%)',
                  fontSize: '3rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 12px rgba(217, 34, 40, 0.3)'
                }}
              >
                AS
              </Avatar>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  {t.pages.about.founders.ayman.name}
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#d92228', 
                    mb: 2, 
                    fontWeight: 600,
                    fontSize: '1rem'
                  }}
                >
                  {t.pages.about.founders.ayman.title}
                </Typography>
                <Box sx={{ 
                  display: 'inline-block',
                  px: 2,
                  py: 0.5,
                  mb: 3,
                  borderRadius: '20px',
                  backgroundColor: '#f0f0f0'
                }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                    {t.pages.about.founders.ayman.deals}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.7, color: '#555' }}>
                  {t.pages.about.founders.ayman.description}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <PhoneIcon sx={{ fontSize: 18, color: '#d92228' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {t.pages.about.founders.ayman.phone}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 1 }}>
                  <EmailIcon sx={{ fontSize: 18, color: '#d92228' }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {t.pages.about.founders.ayman.email}
                  </Typography>
                </Box>
              </CardContent>
            </TeamCard>
            
            <TeamCard elevation={2}>
              <Avatar 
                sx={{ 
                  width: 120, 
                  height: 120, 
                  mx: 'auto', 
                  mb: 3,
                  background: 'linear-gradient(135deg, #d92228 0%, #b71c1c 100%)',
                  fontSize: '3rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 12px rgba(217, 34, 40, 0.3)'
                }}
              >
                R
              </Avatar>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  {t.pages.about.founders.richy.name}
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#d92228', 
                    mb: 2, 
                    fontWeight: 600,
                    fontSize: '1rem'
                  }}
                >
                  {t.pages.about.founders.richy.title}
                </Typography>
                <Box sx={{ 
                  display: 'inline-block',
                  px: 2,
                  py: 0.5,
                  mb: 3,
                  borderRadius: '20px',
                  backgroundColor: '#f0f0f0'
                }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                    {t.pages.about.founders.richy.deals}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.7, color: '#555' }}>
                  {t.pages.about.founders.richy.description}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <PhoneIcon sx={{ fontSize: 18, color: '#d92228' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {t.pages.about.founders.richy.phone}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 1 }}>
                  <EmailIcon sx={{ fontSize: 18, color: '#d92228' }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {t.pages.about.founders.richy.email}
                  </Typography>
                </Box>
              </CardContent>
            </TeamCard>
          </Box>
        </Section>

        <Divider />

        {/* Contact Information */}
        <Section>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            align="center"
            sx={{ fontWeight: 700, mb: 2 }}
          >
            {t.pages.about.contact.title}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              textAlign: 'center',
              fontSize: '1.1rem',
              color: '#666',
              mb: 5
            }}
          >
            {t.pages.about.contact.subtitle}
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, 
            gap: 4, 
            mt: 4 
          }}>
            <Box sx={{ 
              textAlign: 'center',
              p: 3,
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#f8f9fa',
                transform: 'translateY(-4px)'
              }
            }}>
              <LocationOnIcon sx={{ fontSize: 56, color: '#d92228', mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {t.pages.about.contact.visitUs}
              </Typography>
              <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                {t.pages.about.contact.visitAddress}
              </Typography>
            </Box>
            <Box sx={{ 
              textAlign: 'center',
              p: 3,
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#f8f9fa',
                transform: 'translateY(-4px)'
              }
            }}>
              <PhoneIcon sx={{ fontSize: 56, color: '#d92228', mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {t.pages.about.contact.callUs}
              </Typography>
              <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                {t.pages.about.contact.callDetails}
              </Typography>
            </Box>
            <Box sx={{ 
              textAlign: 'center',
              p: 3,
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#f8f9fa',
                transform: 'translateY(-4px)'
              }
            }}>
              <EmailIcon sx={{ fontSize: 56, color: '#d92228', mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {t.pages.about.contact.emailUs}
              </Typography>
              <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                {t.pages.about.contact.emailDetails}
              </Typography>
            </Box>
          </Box>
        </Section>
      </Container>
    </Box>
  );
};

export default About;
