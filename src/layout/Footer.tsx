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
import { useLanguage } from "../contexts/LanguageContext";

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
  const { t } = useLanguage();

  const footerSections: FooterSectionType[] = [
    {
      title: t.footer.sections.buy.title,
      links: [
        { label: t.footer.sections.buy.homesForSale, href: "/homes-for-sale" },
        { label: t.footer.sections.buy.openHouses, href: "/open-houses" },
        { label: t.footer.sections.buy.newHomes, href: "/new-homes" },
        { label: t.footer.sections.buy.recentlySold, href: "/recently-sold" },
        { label: t.footer.sections.buy.priceReduced, href: "/price-reduced" },
      ],
    },
    {
      title: t.footer.sections.sell.title,
      links: [
        { label: t.footer.sections.sell.sellYourHome, href: "/sell-your-home" },
        { label: t.footer.sections.sell.getHomeValue, href: "/market-analysis" },
        { label: t.footer.sections.sell.sellersGuide, href: "/sellers-guide" },
        { label: t.footer.sections.sell.closingCosts, href: "/closing-costs" },
        { label: t.footer.sections.sell.findAgent, href: "/find-agent" },
      ],
    },
    {
      title: t.footer.sections.rent.title,
      links: [
        { label: t.footer.sections.rent.apartments, href: "/apartments" },
        { label: t.footer.sections.rent.houses, href: "/houses-for-rent" },
        { label: t.footer.sections.rent.postRental, href: "/post-rental" },
        { label: t.footer.sections.rent.rentalManager, href: "/rental-manager" },
        { label: t.footer.sections.rent.rentalGuide, href: "/rental-guide" },
      ],
    },
    {
      title: t.footer.sections.mortgage.title,
      links: [
        { label: t.footer.sections.mortgage.mortgageRates, href: "/mortgage-rates" },
        { label: t.footer.sections.mortgage.refinanceRates, href: "/refinance-rates" },
        { label: t.footer.sections.mortgage.mortgageCalc, href: "/mortgage-calculator" },
        {
          label: t.footer.sections.mortgage.affordabilityCalc,
          href: "/affordability-calculator",
        },
        { label: t.footer.sections.mortgage.mortgageGuide, href: "/mortgage-guide" },
      ],
    },
    {
      title: t.footer.sections.resources.title,
      links: [
        { label: t.footer.sections.resources.findAgent, href: "/agents" },
        { label: t.footer.sections.resources.marketData, href: "/market-data" },
        { label: t.footer.sections.resources.buyingGuide, href: "/home-buying-guide" },
        { label: t.footer.sections.resources.realEstateNews, href: "/real-estate-news" },
        { label: t.footer.sections.resources.mobileApps, href: "/mobile-apps" },
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
    { label: t.footer.legal.privacyPolicy, href: "/privacy" },
    { label: t.footer.legal.termsOfService, href: "/terms" },
    { label: t.footer.legal.cookiePolicy, href: "/cookies" },
    { label: t.footer.legal.accessibility, href: "/accessibility" },
    { label: t.footer.legal.sitemap, href: "/sitemap" },
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
            <FooterTitle variant="h6">{t.footer.app.title}</FooterTitle>
            <Stack direction={isMobile ? "column" : "row"} spacing={2}>
              <AppButton href="#">
                <Apple sx={{ mr: 1 }} />
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "#cccccc", display: "block" }}
                  >
                    {t.footer.app.downloadOn}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {t.footer.app.appStore}
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
                    {t.footer.app.getItOn}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {t.footer.app.googlePlay}
                  </Typography>
                </Box>
              </AppButton>
            </Stack>
          </FooterSection>

          <FooterSection>
            <FooterTitle variant="h6">{t.footer.social.title}</FooterTitle>
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
              {t.footer.copyright}
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
              {t.footer.disclaimer}
            </Typography>
          </Box>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
