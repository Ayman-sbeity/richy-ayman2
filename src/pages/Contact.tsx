import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useLanguage } from "../contexts/LanguageContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const HeroSection = styled(Box)(({ theme }) => ({
  position: "relative",
  background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)`,
  color: "white",
  padding: theme.spacing(10, 3),
  textAlign: "center",
  minHeight: "40vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "radial-gradient(circle at 20% 50%, rgba(217, 34, 40, 0.15) 0%, transparent 50%)",
    zIndex: 1,
  },
}));

const HeroContent = styled(Box)(() => ({
  maxWidth: 800,
  margin: "0 auto",
  position: "relative",
  zIndex: 2,
}));

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
}));

const InfoCard = styled(Card)(({ theme }) => ({
  height: "100%",
  transition: "all 0.3s ease",
  borderRadius: "12px",
  border: "1px solid #f0f0f0",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
    borderColor: "#d92228",
  },
}));

const ContactForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "#f5f5f5",
  margin: theme.spacing(1),
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
  },
  "&.whatsapp:hover": {
    backgroundColor: "#25D366",
    color: "#fff",
  },
  "&.facebook:hover": {
    backgroundColor: "#1877F2",
    color: "#fff",
  },
  "&.instagram:hover": {
    backgroundColor: "#E4405F",
    color: "#fff",
  },
  "&.linkedin:hover": {
    backgroundColor: "#0A66C2",
    color: "#fff",
  },
}));

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Simulate form submission
      console.log("Form submitted:", formData);

      setSnackbar({
        open: true,
        message: t.pages.contact.form.messageSentSuccess,
        severity: "success",
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } else {
      setSnackbar({
        open: true,
        message: t.pages.contact.form.messageSentError,
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleWhatsAppClick = (phone: string) => {
    window.open(`https://wa.me/${phone.replace(/\s/g, "")}`, "_blank");
  };

  const handleCallClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

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
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              letterSpacing: "-0.5px",
            }}
          >
            {t.pages.contact.hero.title}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mt: 2,
              fontWeight: 300,
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              opacity: 0.95,
            }}
          >
            {t.pages.contact.hero.subtitle}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 3,
              fontSize: "1.1rem",
              maxWidth: 700,
              margin: "24px auto 0",
              opacity: 0.9,
            }}
          >
            {t.pages.contact.hero.description}
          </Typography>
        </HeroContent>
      </HeroSection>

      <Container maxWidth="lg">
        {/* Contact Information Cards */}
        <Section>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 4,
            }}
          >
            {/* Location Card */}
            <InfoCard elevation={2}>
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    backgroundColor: "rgba(217, 34, 40, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <LocationOnIcon sx={{ fontSize: 36, color: "#d92228" }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 2, color: "#333" }}
                >
                  {t.pages.contact.info.location}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#666", lineHeight: 1.8 }}
                >
                  Downtown Beirut
                  <br />
                  Martyr's Square District
                  <br />
                  Beirut, Lebanon
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    mt: 2,
                    borderColor: "#d92228",
                    color: "#d92228",
                    "&:hover": {
                      borderColor: "#b71c1c",
                      backgroundColor: "rgba(217, 34, 40, 0.05)",
                    },
                  }}
                  onClick={() =>
                    window.open(
                      "https://maps.google.com/?q=Martyrs+Square+Beirut",
                      "_blank"
                    )
                  }
                >
                  {t.pages.contact.info.getDirections}
                </Button>
              </CardContent>
            </InfoCard>

            {/* Phone Card */}
            <InfoCard elevation={2}>
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    backgroundColor: "rgba(217, 34, 40, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <PhoneIcon sx={{ fontSize: 36, color: "#d92228" }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 2, color: "#333" }}
                >
                  {t.pages.contact.info.callUs}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    lineHeight: 1.8,
                    mb: 1,
                    cursor: "pointer",
                    "&:hover": { color: "#d92228" },
                  }}
                  onClick={() => handleCallClick("+961 3 123 456")}
                >
                  Ayman: +961 3 123 456
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    lineHeight: 1.8,
                    cursor: "pointer",
                    "&:hover": { color: "#d92228" },
                  }}
                  onClick={() => handleCallClick("+961 3 234 567")}
                >
                  Richy: +961 3 234 567
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<WhatsAppIcon />}
                    sx={{
                      backgroundColor: "#25D366",
                      "&:hover": { backgroundColor: "#1faa52" },
                    }}
                    onClick={() => handleWhatsAppClick("+96176883720")}
                  >
                    {t.pages.contact.info.whatsapp}
                  </Button>
                </Box>
              </CardContent>
            </InfoCard>

            {/* Email Card */}
            <InfoCard elevation={2}>
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    backgroundColor: "rgba(217, 34, 40, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <EmailIcon sx={{ fontSize: 36, color: "#d92228" }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 2, color: "#333" }}
                >
                  {t.pages.contact.info.email}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    lineHeight: 1.8,
                    mb: 1,
                    cursor: "pointer",
                    "&:hover": { color: "#d92228" },
                  }}
                  onClick={() => handleEmailClick("info@manzilocom.com")}
                >
                  info@manzilocom.com
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    lineHeight: 1.8,
                    cursor: "pointer",
                    "&:hover": { color: "#d92228" },
                  }}
                  onClick={() => handleEmailClick("support@manzilocom.com")}
                >
                  support@manzilocom.com
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    mt: 2,
                    borderColor: "#d92228",
                    color: "#d92228",
                    "&:hover": {
                      borderColor: "#b71c1c",
                      backgroundColor: "rgba(217, 34, 40, 0.05)",
                    },
                  }}
                  onClick={() => handleEmailClick("info@manzilocom.com")}
                >
                  {t.pages.contact.info.sendEmail}
                </Button>
              </CardContent>
            </InfoCard>

            {/* Business Hours Card */}
            <InfoCard elevation={2}>
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    backgroundColor: "rgba(217, 34, 40, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <AccessTimeIcon sx={{ fontSize: 36, color: "#d92228" }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 2, color: "#333" }}
                >
                  {t.pages.contact.info.hours}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#666", lineHeight: 1.8 }}
                >
                  {t.pages.contact.info.businessHours
                    .split("\n")
                    .map((line: string, idx: number) => (
                      <React.Fragment key={idx}>
                        {line}
                        {idx <
                          t.pages.contact.info.businessHours.split("\n")
                            .length -
                            1 && <br />}
                      </React.Fragment>
                    ))}
                </Typography>
              </CardContent>
            </InfoCard>
          </Box>
        </Section>

        {/* Contact Form Section */}
        <Section sx={{ pb: 8 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
              gap: 6,
            }}
          >
            {/* Form */}
            <ContactForm elevation={3}>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ fontWeight: 700, mb: 1, color: "#333" }}
              >
                {t.pages.contact.form.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#666", mb: 4, lineHeight: 1.6 }}
              >
                {t.pages.contact.form.description}
              </Typography>

              <form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                    gap: 3,
                  }}
                >
                  <TextField
                    fullWidth
                    label={t.pages.contact.form.name}
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={!!errors.fullName}
                    helperText={errors.fullName}
                    required
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "#d92228" },
                        "&.Mui-focused fieldset": { borderColor: "#d92228" },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#d92228",
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label={t.pages.contact.form.email}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "#d92228" },
                        "&.Mui-focused fieldset": { borderColor: "#d92228" },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#d92228",
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label={t.pages.contact.form.phone}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    required
                    variant="outlined"
                    placeholder="+961 XX XXX XXX"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "#d92228" },
                        "&.Mui-focused fieldset": { borderColor: "#d92228" },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#d92228",
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label={t.pages.contact.form.subject}
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    error={!!errors.subject}
                    helperText={errors.subject}
                    required
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "#d92228" },
                        "&.Mui-focused fieldset": { borderColor: "#d92228" },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#d92228",
                      },
                    }}
                  />
                </Box>
                <Box sx={{ mt: 3 }}>
                  <TextField
                    fullWidth
                    label={t.pages.contact.form.message}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    error={!!errors.message}
                    helperText={errors.message}
                    required
                    multiline
                    rows={6}
                    variant="outlined"
                    placeholder="Tell us about your property needs, budget, preferred location, or any questions you have..."
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "#d92228" },
                        "&.Mui-focused fieldset": { borderColor: "#d92228" },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#d92228",
                      },
                    }}
                  />
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<SendIcon />}
                    sx={{
                      backgroundColor: "#d92228",
                      color: "#fff",
                      padding: "12px 48px",
                      fontSize: "1rem",
                      fontWeight: 600,
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#b71c1c",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 16px rgba(217, 34, 40, 0.3)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {t.pages.contact.form.send}
                  </Button>
                </Box>
              </form>
            </ContactForm>

            {/* Sidebar - Why Choose Us */}
            <Box>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: "12px",
                  backgroundColor: "#f8f9fa",
                  mb: 3,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, mb: 3, color: "#333" }}
                >
                  {t.pages.contact.sidebar.title}
                </Typography>
                {t.pages.contact.sidebar.features.map(
                  (item: string, index: number) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        "&:last-child": { mb: 0 },
                      }}
                    >
                      <CheckCircleIcon
                        sx={{ color: "#d92228", mr: 2, fontSize: 24 }}
                      />
                      <Typography variant="body1" sx={{ color: "#555" }}>
                        {item}
                      </Typography>
                    </Box>
                  )
                )}
              </Paper>

              <Paper
                elevation={3}
                sx={{ p: 4, borderRadius: "12px", textAlign: "center" }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 2, color: "#333" }}
                >
                  {t.pages.contact.connectWith}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#666", mb: 3, lineHeight: 1.6 }}
                >
                  {t.pages.contact.followUs}
                </Typography>
                <Box>
                  <SocialButton
                    className="whatsapp"
                    onClick={() => handleWhatsAppClick("+9613123456")}
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon />
                  </SocialButton>
                  <SocialButton
                    className="facebook"
                    onClick={() =>
                      window.open("https://facebook.com", "_blank")
                    }
                    aria-label="Facebook"
                  >
                    <FacebookIcon />
                  </SocialButton>
                  <SocialButton
                    className="instagram"
                    onClick={() =>
                      window.open("https://instagram.com", "_blank")
                    }
                    aria-label="Instagram"
                  >
                    <InstagramIcon />
                  </SocialButton>
                  <SocialButton
                    className="linkedin"
                    onClick={() =>
                      window.open("https://linkedin.com", "_blank")
                    }
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon />
                  </SocialButton>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Section>

        {/* Map Section */}
        <Section sx={{ pt: 0, pb: 8 }}>
          <Paper
            elevation={3}
            sx={{
              borderRadius: "12px",
              overflow: "hidden",
              height: 400,
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.4267344556873!2d35.50148831521106!3d33.89626998064952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f17215880a78f%3A0x729182bae99836b4!2sMartyr&#39;s%20Square%2C%20Beirut%2C%20Lebanon!5e0!3m2!1sen!2s!4v1634567890123!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Manzilocom Office Location"
            />
          </Paper>
        </Section>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
