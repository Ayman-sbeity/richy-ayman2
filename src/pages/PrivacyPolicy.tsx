import React from 'react';
import { Typography, Box, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import { Security, CheckCircle, Warning, Info, VpnLock, Cookie, Language, AccountCircle } from '@mui/icons-material';
import Layout from '../layout/Layout';
import { LegalContainer, LegalHeader, LegalSection } from '../components/legal';

const PrivacyPolicy: React.FC = () => {
  return (
    <Layout>
      <LegalContainer>
        <LegalHeader
          title="Privacy Policy"
          subtitle="Your privacy is our priority. Learn how we protect your data."
          icon="security"
          lastUpdated="October 17, 2025"
        />

        <LegalSection
          title="1. Overview"
          content={
            <>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary', lineHeight: 1.8, textAlign: 'justify' }}>
                This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our real estate application. We are committed to protecting your personal data and your right to privacy. This policy applies to all information collected through our website, mobile applications, and any related services.
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip icon={<VpnLock />} label="Data Encryption" color="success" size="small" />
                <Chip icon={<Security />} label="Secure Storage" color="success" size="small" />
                <Chip icon={<AccountCircle />} label="User Control" color="primary" size="small" />
              </Box>
            </>
          }
          delay={0.1}
        />

        <LegalSection
          title="2. Information We Collect"
          content={
            <>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary', lineHeight: 1.8, textAlign: 'justify' }}>
                We collect several types of information to provide and improve our services:
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#d92228', mb: 1 }}>
                  Personal Information
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon><CheckCircle sx={{ color: '#4caf50' }} /></ListItemIcon>
                    <ListItemText 
                      primary="Identity Data"
                      secondary="Full name, username, email address, phone number, and profile photo"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle sx={{ color: '#4caf50' }} /></ListItemIcon>
                    <ListItemText 
                      primary="Authentication Data"
                      secondary="Passwords, security questions, and authentication tokens"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle sx={{ color: '#4caf50' }} /></ListItemIcon>
                    <ListItemText 
                      primary="Property Preferences"
                      secondary="Saved searches, favorite listings, and property viewing history"
                    />
                  </ListItem>
                </List>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#d92228', mb: 1 }}>
                  Technical Information
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon><Info sx={{ color: '#2196f3' }} /></ListItemIcon>
                    <ListItemText 
                      primary="Device Data"
                      secondary="IP address, browser type, operating system, device identifiers"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Info sx={{ color: '#2196f3' }} /></ListItemIcon>
                    <ListItemText 
                      primary="Usage Data"
                      secondary="Pages visited, time spent, click patterns, and interaction data"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Info sx={{ color: '#2196f3' }} /></ListItemIcon>
                    <ListItemText 
                      primary="Location Data"
                      secondary="Geolocation information (with your permission)"
                    />
                  </ListItem>
                </List>
              </Box>
            </>
          }
          delay={0.2}
        />

        <LegalSection
          title="3. How We Use Your Information"
          content={
            <>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary', lineHeight: 1.8, textAlign: 'justify' }}>
                We use the information we collect for the following purposes:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><CheckCircle sx={{ color: '#4caf50' }} /></ListItemIcon>
                  <ListItemText 
                    primary="Service Delivery"
                    secondary="To create and maintain your account, process transactions, and deliver requested services"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle sx={{ color: '#4caf50' }} /></ListItemIcon>
                  <ListItemText 
                    primary="Personalization"
                    secondary="To customize your experience with property recommendations and tailored content"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle sx={{ color: '#4caf50' }} /></ListItemIcon>
                  <ListItemText 
                    primary="Communication"
                    secondary="To send you updates, newsletters, marketing materials, and respond to inquiries"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle sx={{ color: '#4caf50' }} /></ListItemIcon>
                  <ListItemText 
                    primary="Security & Fraud Prevention"
                    secondary="To protect against unauthorized access and detect fraudulent activity"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle sx={{ color: '#4caf50' }} /></ListItemIcon>
                  <ListItemText 
                    primary="Analytics & Improvement"
                    secondary="To analyze usage patterns and improve our platform's functionality"
                  />
                </ListItem>
              </List>
            </>
          }
          delay={0.3}
        />

        <LegalSection
          title="4. Data Security Measures"
          content={
            <>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary', lineHeight: 1.8, textAlign: 'justify' }}>
                We implement industry-standard security measures to protect your information from unauthorized access, disclosure, alteration, or destruction. Our security practices include:
              </Typography>
              <Box sx={{ mt: 2, p: 3, bgcolor: 'rgba(76, 175, 80, 0.05)', borderRadius: 2, border: '2px solid rgba(76, 175, 80, 0.2)' }}>
                <List>
                  <ListItem>
                    <ListItemIcon><VpnLock sx={{ color: '#4caf50' }} /></ListItemIcon>
                    <ListItemText primary="256-bit SSL/TLS encryption for all data transmission" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><VpnLock sx={{ color: '#4caf50' }} /></ListItemIcon>
                    <ListItemText primary="Encrypted database storage with regular security audits" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><VpnLock sx={{ color: '#4caf50' }} /></ListItemIcon>
                    <ListItemText primary="Multi-factor authentication options for enhanced account security" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><VpnLock sx={{ color: '#4caf50' }} /></ListItemIcon>
                    <ListItemText primary="Regular security assessments and penetration testing" />
                  </ListItem>
                </List>
              </Box>
              <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(255, 152, 0, 0.05)', borderRadius: 2, borderLeft: '4px solid #ff9800' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#ff9800' }}>
                  Important: While we take extensive precautions, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security of your data.
                </Typography>
              </Box>
            </>
          }
          delay={0.4}
        />

        <LegalSection
          title="5. Third-Party Disclosure and Data Sharing"
          content={
            <>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary', lineHeight: 1.8, textAlign: 'justify' }}>
                We do not sell or rent your personal information to third parties. However, we may share your data in the following circumstances:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><Info sx={{ color: '#2196f3' }} /></ListItemIcon>
                  <ListItemText 
                    primary="Service Providers"
                    secondary="Trusted third-party vendors who assist in operating our platform (e.g., payment processors, email services)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Info sx={{ color: '#2196f3' }} /></ListItemIcon>
                  <ListItemText 
                    primary="Legal Compliance"
                    secondary="When required by law, subpoena, or legal process"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Info sx={{ color: '#2196f3' }} /></ListItemIcon>
                  <ListItemText 
                    primary="Business Transfers"
                    secondary="In connection with mergers, acquisitions, or asset sales"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Info sx={{ color: '#2196f3' }} /></ListItemIcon>
                  <ListItemText 
                    primary="With Your Consent"
                    secondary="When you explicitly authorize us to share your information"
                  />
                </ListItem>
              </List>
              <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary', fontStyle: 'italic' }}>
                All third-party service providers are contractually obligated to protect your data and use it only for specified purposes.
              </Typography>
            </>
          }
          delay={0.5}
        />

        <LegalSection
          title="6. Cookies and Tracking Technologies"
          content={
            <>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary', lineHeight: 1.8, textAlign: 'justify' }}>
                We use cookies and similar tracking technologies to enhance your experience, analyze traffic, and personalize content. By using our services, you consent to our use of such technologies.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#d92228', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Cookie /> Types of Cookies We Use
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon><CheckCircle sx={{ color: '#4caf50' }} /></ListItemIcon>
                    <ListItemText 
                      primary="Essential Cookies"
                      secondary="Required for basic site functionality and security"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle sx={{ color: '#4caf50' }} /></ListItemIcon>
                    <ListItemText 
                      primary="Performance Cookies"
                      secondary="Help us understand how visitors interact with our platform"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle sx={{ color: '#4caf50' }} /></ListItemIcon>
                    <ListItemText 
                      primary="Functional Cookies"
                      secondary="Enable personalized features and remember your preferences"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle sx={{ color: '#4caf50' }} /></ListItemIcon>
                    <ListItemText 
                      primary="Advertising Cookies"
                      secondary="Deliver relevant advertisements based on your interests"
                    />
                  </ListItem>
                </List>
                <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                  You can manage cookie preferences through your browser settings. Note that disabling certain cookies may limit platform functionality.
                </Typography>
              </Box>
            </>
          }
          delay={0.6}
        />

        <LegalSection
          title="7. International Data Transfers"
          content={
            <>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary', lineHeight: 1.8, textAlign: 'justify', display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <Language sx={{ color: '#2196f3', mt: 0.5 }} />
                <span>
                  Your information may be transferred to and maintained on servers located outside of your state, province, or country where data protection laws may differ. By using our services, you consent to the transfer of your data to our facilities and third-party service providers. We take steps to ensure that your data is treated securely and in accordance with this Privacy Policy, implementing appropriate safeguards such as Standard Contractual Clauses (SCCs) for international transfers.
                </span>
              </Typography>
            </>
          }
          delay={0.7}
        />

        <LegalSection
          title="8. Your Privacy Rights"
          content={
            <>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary', lineHeight: 1.8, textAlign: 'justify' }}>
                You have the following rights regarding your personal data:
              </Typography>
              <Box sx={{ mt: 2, p: 3, bgcolor: 'rgba(33, 150, 243, 0.05)', borderRadius: 2, border: '2px solid rgba(33, 150, 243, 0.2)' }}>
                <List>
                  <ListItem>
                    <ListItemIcon><AccountCircle sx={{ color: '#2196f3' }} /></ListItemIcon>
                    <ListItemText 
                      primary="Right to Access"
                      secondary="Request copies of your personal data"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><AccountCircle sx={{ color: '#2196f3' }} /></ListItemIcon>
                    <ListItemText 
                      primary="Right to Rectification"
                      secondary="Correct inaccurate or incomplete information"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><AccountCircle sx={{ color: '#2196f3' }} /></ListItemIcon>
                    <ListItemText 
                      primary="Right to Erasure"
                      secondary="Request deletion of your personal data"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><AccountCircle sx={{ color: '#2196f3' }} /></ListItemIcon>
                    <ListItemText 
                      primary="Right to Object"
                      secondary="Object to certain data processing practices"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><AccountCircle sx={{ color: '#2196f3' }} /></ListItemIcon>
                    <ListItemText 
                      primary="Right to Data Portability"
                      secondary="Receive your data in a structured, machine-readable format"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><AccountCircle sx={{ color: '#2196f3' }} /></ListItemIcon>
                    <ListItemText 
                      primary="Right to Withdraw Consent"
                      secondary="Withdraw consent for data processing at any time"
                    />
                  </ListItem>
                </List>
              </Box>
              <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                To exercise any of these rights, please contact us at privacy@realestate.com. We will respond to your request within 30 days.
              </Typography>
            </>
          }
          delay={0.8}
        />

        <LegalSection
          title="9. Children's Privacy"
          content={
            <>
              <Box sx={{ p: 2, bgcolor: 'rgba(217, 34, 40, 0.05)', borderRadius: 2, borderLeft: '4px solid #d92228' }}>
                <Typography variant="body1" paragraph sx={{ color: 'text.secondary', lineHeight: 1.8, fontWeight: 600 }}>
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
                </Typography>
              </Box>
              <Typography variant="body1" paragraph sx={{ mt: 2, color: 'text.secondary', lineHeight: 1.8, textAlign: 'justify' }}>
                If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately. If we become aware that we have collected personal data from children without parental consent, we will take steps to remove that information from our servers.
              </Typography>
            </>
          }
          delay={0.9}
        />

        <LegalSection
          title="10. Data Retention"
          content="We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it. Retention periods vary based on the type of data and the purpose for which it was collected, typically ranging from 3 to 7 years for transactional data and as long as your account remains active for profile information."
          delay={1.0}
        />

        <LegalSection
          title="11. Policy Amendments"
          content={
            <>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary', lineHeight: 1.8, textAlign: 'justify' }}>
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Material changes will be communicated via:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><Info sx={{ color: '#2196f3' }} /></ListItemIcon>
                  <ListItemText primary="Email notification to registered users" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Info sx={{ color: '#2196f3' }} /></ListItemIcon>
                  <ListItemText primary="Prominent notice on our platform" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Info sx={{ color: '#2196f3' }} /></ListItemIcon>
                  <ListItemText primary="Updated effective date on this page" />
                </ListItem>
              </List>
              <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary', fontStyle: 'italic' }}>
                We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
              </Typography>
            </>
          }
          delay={1.1}
        />

        <LegalSection
          title="12. Contact Us"
          content={
            <Box sx={{ p: 3, bgcolor: 'rgba(76, 175, 80, 0.05)', borderRadius: 2, mt: 2 }}>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Data Protection Officer:
              </Typography>
              <Typography variant="body1" sx={{ color: '#d92228', fontWeight: 600 }}>
                Email: privacy@realestate.com
              </Typography>
              <Typography variant="body1" sx={{ color: '#d92228', fontWeight: 600 }}>
                Phone: +1 (555) 123-4567
              </Typography>
              <Typography variant="body1" sx={{ color: '#d92228', fontWeight: 600 }}>
                Address: 123 Real Estate Ave, Suite 100, City, State 12345
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                Data Protection Officer: Jane Smith, DPO
              </Typography>
            </Box>
          }
          delay={1.2}
        />

        <Box sx={{ mt: 4, pt: 3, borderTop: '2px solid rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: 'text.disabled', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Security sx={{ fontSize: 16 }} />
            This Privacy Policy is effective as of October 17, 2025
          </Typography>
        </Box>
      </LegalContainer>
    </Layout>
  );
};

export default PrivacyPolicy;
