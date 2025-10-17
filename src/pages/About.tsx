import React from "react";
import { Container, Typography, Box, Card, CardContent, Avatar, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

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
            About Manzilocom Lebanon
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
            Lebanon's Premier Real Estate Discovery Platform
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
            Connecting Lebanese property seekers with their dream homes across Beirut, Mount Lebanon, and beyond.
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
            Our Story
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
            Born from a passion for Lebanon's diverse real estate landscape, Manzilocom was founded in 2020 by two 
            visionary real estate professionals—Ayman Sbeity and Richy—who recognized the need for a modern, transparent 
            platform to connect property seekers with their ideal homes. With deep roots in the Lebanese market and an 
            intimate understanding of the unique challenges facing buyers, sellers, and investors, our founders combined 
            their decades of experience to create a solution that truly serves the Lebanese community.
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
            From the coastal properties of Beirut to the mountain retreats of Mount Lebanon, from bustling commercial spaces 
            in Tripoli to elegant villas in Jounieh, we've built our reputation on trust, expertise, and an unwavering commitment 
            to our clients' success. Today, Manzilocom stands as Lebanon's trusted partner in real estate discovery, having 
            facilitated over 380 successful transactions and counting.
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
                Our Mission
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#444' }}>
                To empower the Lebanese community with innovative tools, comprehensive market insights, and personalized 
                service that makes real estate decisions confident and informed. We're committed to maintaining the highest 
                standards of transparency, integrity, and professionalism while honoring Lebanon's rich cultural heritage 
                and architectural diversity.
              </Typography>
            </Box>
            <Box sx={{ 
              p: 4, 
              borderRadius: 2, 
              background: 'linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 700, color: '#d92228' }}>
                Our Vision
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#444' }}>
                To be recognized as Lebanon's most trusted and innovative real estate platform, setting new benchmarks for 
                excellence in property services while contributing to the growth and prosperity of Lebanese communities. 
                We envision a future where every Lebanese resident and diaspora member can effortlessly connect with their 
                dream property in their homeland.
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
            Meet Our Founders
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
            With over 380 successful deals combined, our founders bring unparalleled expertise and dedication to every client.
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
                  Ayman Sbeity
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
                  Luxury Properties & Investment Specialist
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
                    200+ Successful Deals
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.7, color: '#555' }}>
                  Co-founder and luxury property expert with an exceptional track record in high-end residential and 
                  investment properties across Lebanon. Ayman's deep market knowledge and client-first approach have 
                  made him a trusted advisor for discerning buyers and investors.
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <PhoneIcon sx={{ fontSize: 18, color: '#d92228' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      +961 3 123 456
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 1 }}>
                  <EmailIcon sx={{ fontSize: 18, color: '#d92228' }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    ayman@realty.com
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
                  Richy
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
                  Residential & Commercial Sales Expert
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
                    180+ Successful Deals
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.7, color: '#555' }}>
                  Co-founder specializing in residential and commercial properties throughout Lebanon. Richy's dedication 
                  to understanding client needs and delivering exceptional results has earned him recognition as one of 
                  Lebanon's most reliable real estate professionals.
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <PhoneIcon sx={{ fontSize: 18, color: '#d92228' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      +961 3 234 567
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 1 }}>
                  <EmailIcon sx={{ fontSize: 18, color: '#d92228' }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    richy@realty.com
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
            Get In Touch
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
            Ready to find your dream property in Lebanon? We're here to help you every step of the way.
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
                Visit Us
              </Typography>
              <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.7 }}>
                Downtown Beirut<br />
                Martyr's Square District<br />
                Beirut, Lebanon
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
                Call Us
              </Typography>
              <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.7 }}>
                Ayman: +961 3 123 456<br />
                Richy: +961 3 234 567<br />
                Available 7 days a week
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
                Email Us
              </Typography>
              <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.7 }}>
                info@realtyfinder.com<br />
                support@realtyfinder.com<br />
                Quick response guaranteed
              </Typography>
            </Box>
          </Box>
        </Section>
      </Container>
    </Box>
  );
};

export default About;
