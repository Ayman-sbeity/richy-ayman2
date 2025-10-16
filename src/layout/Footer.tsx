import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Twitter,
  Facebook,
  Instagram,
  Pinterest,
  Apple,
  Google,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Logo } from "../components/UI";

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#2d2d2d",
  color: "#ffffff",
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(3),
  marginTop: "auto",
}));

const FooterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  color: "#ffffff",
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  fontSize: "1.125rem",
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: "#cccccc",
  textDecoration: "none",
  fontSize: "0.875rem",
  display: "block",
  marginBottom: theme.spacing(1),
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#d92228",
    textDecoration: "none",
  },
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "#444",
  color: "#cccccc",
  width: 40,
  height: 40,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#d92228",
    color: "#ffffff",
    transform: "translateY(-2px)",
  },
}));

const AppButton = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1, 2),
  backgroundColor: "#444",
  borderRadius: theme.spacing(1),
  textDecoration: "none",
  color: "#ffffff",
  transition: "background-color 0.3s ease",
  minWidth: 140,
  marginBottom: theme.spacing(1),
  "&:hover": {
    backgroundColor: "#555",
    textDecoration: "none",
  },
}));

interface FooterLinkType {
  label: string;
  href: string;
}

interface FooterSectionType {
  title: string;
  links: FooterLinkType[];
}

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const footerSections: FooterSectionType[] = [
    {
      title: "Buy",
      links: [
        { label: "Homes for sale", href: "/homes-for-sale" },
        { label: "Open houses", href: "/open-houses" },
        { label: "New homes", href: "/new-homes" },
        { label: "Recently sold", href: "/recently-sold" },
        { label: "Price reduced", href: "/price-reduced" },
      ],
    },
    {
      title: "Sell",
      links: [
        { label: "Sell your home", href: "/sell-your-home" },
        { label: "Get home value", href: "/market-analysis" },
        { label: "Seller's guide", href: "/sellers-guide" },
        { label: "Closing costs calculator", href: "/closing-costs" },
        { label: "Find a seller's agent", href: "/find-agent" },
      ],
    },
    {
      title: "Rent",
      links: [
        { label: "Apartments for rent", href: "/apartments" },
        { label: "Houses for rent", href: "/houses-for-rent" },
        { label: "Post a rental listing", href: "/post-rental" },
        { label: "Rental manager", href: "/rental-manager" },
        { label: "Rental guide", href: "/rental-guide" },
      ],
    },
    {
      title: "Mortgage & Finance",
      links: [
        { label: "Mortgage rates", href: "/mortgage-rates" },
        { label: "Refinance rates", href: "/refinance-rates" },
        { label: "Mortgage calculator", href: "/mortgage-calculator" },
        {
          label: "Affordability calculator",
          href: "/affordability-calculator",
        },
        { label: "Mortgage guide", href: "/mortgage-guide" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Find an agent", href: "/agents" },
        { label: "Market data", href: "/market-data" },
        { label: "Home buying guide", href: "/home-buying-guide" },
        { label: "Real estate news", href: "/real-estate-news" },
        { label: "Mobile apps", href: "/mobile-apps" },
      ],
    },
  ];

  const socialIcons = [
    { icon: <Twitter />, href: "#", label: "Twitter" },
    { icon: <Facebook />, href: "#", label: "Facebook" },
    { icon: <Instagram />, href: "#", label: "Instagram" },
    { icon: <Pinterest />, href: "#", label: "Pinterest" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Accessibility", href: "/accessibility" },
    { label: "Sitemap", href: "/sitemap" },
  ];

  return (
    <FooterContainer>
      <Container maxWidth="xl">
        {/* Top Section - Navigation Links */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(5, 1fr)",
            },
            gap: isMobile ? 3 : 4,
            mb: 4,
          }}
        >
          {footerSections.map((section, index) => (
            <FooterSection key={index}>
              <FooterTitle variant="h6">{section.title}</FooterTitle>
              {section.links.map((link, linkIndex) => (
                <FooterLink key={linkIndex} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterSection>
          ))}
        </Box>

        <Divider sx={{ my: 4, borderColor: "#444" }} />

        {/* Middle Section - App Download & Social */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
            mb: 4,
          }}
        >
          <FooterSection>
            <FooterTitle variant="h6">Get the RealtyFinder app</FooterTitle>
            <Stack direction={isMobile ? "column" : "row"} spacing={2}>
              <AppButton href="#">
                <Apple sx={{ mr: 1 }} />
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "#cccccc", display: "block" }}
                  >
                    Download on the
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    App Store
                  </Typography>
                </Box>
              </AppButton>
              <AppButton href="#">
                <Google sx={{ mr: 1 }} />
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "#cccccc", display: "block" }}
                  >
                    Get it on
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Google Play
                  </Typography>
                </Box>
              </AppButton>
            </Stack>
          </FooterSection>

          <FooterSection>
            <FooterTitle variant="h6">Follow us</FooterTitle>
            <Stack direction="row" spacing={2}>
              {socialIcons.map((social, index) => (
                <Link key={index} href={social.href} sx={{ color: "inherit" }}>
                  <SocialIconButton aria-label={social.label}>
                    {social.icon}
                  </SocialIconButton>
                </Link>
              ))}
            </Stack>
          </FooterSection>
        </Box>

        <Divider sx={{ my: 4, borderColor: "#444" }} />

        {/* Bottom Section - Legal & Copyright */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
          }}
        >
          <Box>
            <Box sx={{ mb: 2 }}>
              <Logo size="small" />
            </Box>
            <Stack
              direction={isMobile ? "column" : "row"}
              spacing={isMobile ? 1 : 3}
              sx={{ mb: 2 }}
            >
              {legalLinks.map((link, index) => (
                <FooterLink key={index} href={link.href} sx={{ mb: 0 }}>
                  {link.label}
                </FooterLink>
              ))}
            </Stack>
          </Box>

          <Box sx={{ textAlign: isMobile ? "left" : "right" }}>
            <Typography variant="body2" sx={{ color: "#cccccc", mb: 1 }}>
              © 2024 RealtyFinder. All rights reserved.
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#999",
                lineHeight: 1.4,
                display: "block",
                maxWidth: isMobile ? "100%" : 300,
                marginLeft: isMobile ? 0 : "auto",
              }}
            >
              All information provided is deemed reliable but is not guaranteed
              and should be independently verified.
            </Typography>
          </Box>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
