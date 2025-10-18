import React from 'react';
import { Typography, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CheckCircle, Warning, Info, Gavel } from '@mui/icons-material';
import Layout from '../layout/Layout';
import { LegalContainer, LegalHeader, LegalSection } from '../components/legal';

const TermsAndConditions: React.FC = () => {
  return (
    <Layout>
      <LegalContainer>
        <LegalHeader
          title="Terms and Conditions"
          subtitle="Please read these terms carefully before using our services"
          icon="gavel"
          lastUpdated="October 17, 2025"
        />

        <LegalSection
          title="1. Introduction"
          content="Welcome to our real estate platform. These Terms and Conditions constitute a legally binding agreement between you and our company governing your use of our services, website, and mobile applications. By accessing or using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree with any part of these Terms, you must discontinue use of our services immediately."
          delay={0.1}
        />

        <LegalSection
          title="2. Acceptance of Terms"
          content={
            <>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary', lineHeight: 1.8, textAlign: 'justify' }}>
                By creating an account, accessing our platform, or using any of our services, you explicitly agree to be bound by these Terms and Conditions, along with our Privacy Policy. Your continued use of the platform constitutes ongoing acceptance of these terms, including any modifications we may make from time to time.
              </Typography>
              <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(217, 34, 40, 0.05)', borderRadius: 2, borderLeft: '4px solid #d92228' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#d92228' }}>
                  Important: If you do not agree to these terms, you must immediately cease all use of our services and delete your account.
                </Typography>
              </Box>
            </>
          }
          delay={0.2}
        />

        <LegalSection
          title="3. User Eligibility and Account Responsibilities"
          content={
            <>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary', lineHeight: 1.8, textAlign: 'justify' }}>
                To use our services, you must be at least 18 years of age or the age of majority in your jurisdiction. By registering, you represent and warrant that:
              </Typography>
              <List sx={{ mt: 1 }}>
                <ListItem>
                  <ListItemIcon><CheckCircle sx={{ color: '#4caf50' }} /></ListItemIcon>
                  <ListItemText primary="You are legally capable of entering into binding contracts" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle sx={{ color: '#4caf50' }} /></ListItemIcon>
                  <ListItemText primary="All information you provide is accurate, current, and complete" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle sx={{ color: '#4caf50' }} /></ListItemIcon>
                  <ListItemText primary="You will maintain the security of your account credentials" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle sx={{ color: '#4caf50' }} /></ListItemIcon>
                  <ListItemText primary="You will promptly update any changes to your account information" />
                </ListItem>
              </List>
            </>
          }
          delay={0.3}
        />

        <LegalSection
          title="4. Modifications to Terms"
          content="We reserve the right to update, modify, or replace these Terms at any time at our sole discretion. Material changes will be communicated via email or prominent notice on our platform. Your continued use of the services following such modifications constitutes your acceptance of the updated Terms. We recommend reviewing these Terms periodically to stay informed of any changes."
          delay={0.4}
        />

        <LegalSection
          title="5. Legal Compliance and User Conduct"
          content={
            <>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary', lineHeight: 1.8, textAlign: 'justify' }}>
                All users must comply with applicable local, state, national, and international laws and regulations. You agree not to use our platform for any unlawful purpose or in any way that could damage, disable, or impair our services. Prohibited activities include, but are not limited to:
              </Typography>
              <List sx={{ mt: 1 }}>
                <ListItem>
                  <ListItemIcon><Warning sx={{ color: '#d92228' }} /></ListItemIcon>
                  <ListItemText primary="Posting false, misleading, or fraudulent property listings" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning sx={{ color: '#d92228' }} /></ListItemIcon>
                  <ListItemText primary="Engaging in harassment, discrimination, or abusive behavior" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning sx={{ color: '#d92228' }} /></ListItemIcon>
                  <ListItemText primary="Attempting to gain unauthorized access to our systems" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning sx={{ color: '#d92228' }} /></ListItemIcon>
                  <ListItemText primary="Scraping, data mining, or automated data collection without permission" />
                </ListItem>
              </List>
              <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary', fontStyle: 'italic' }}>
                Violation of these provisions may result in immediate termination of your access and potential legal action.
              </Typography>
            </>
          }
          delay={0.5}
        />

        <LegalSection
          title="6. Intellectual Property Rights"
          content="All content, features, and functionality of our platform, including but not limited to text, graphics, logos, images, software, and compilation thereof, are the exclusive property of our company or our licensors and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission."
          delay={0.6}
        />

        <LegalSection
          title="7. Limitation of Liability"
          content={
            <>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary', lineHeight: 1.8, textAlign: 'justify' }}>
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL OUR COMPANY, ITS AFFILIATES, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION:
              </Typography>
              <List sx={{ mt: 1 }}>
                <ListItem>
                  <ListItemIcon><Info sx={{ color: '#2196f3' }} /></ListItemIcon>
                  <ListItemText primary="Loss of profits, revenue, or business opportunities" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Info sx={{ color: '#2196f3' }} /></ListItemIcon>
                  <ListItemText primary="Loss of data or information" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Info sx={{ color: '#2196f3' }} /></ListItemIcon>
                  <ListItemText primary="Business interruption or system failures" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Info sx={{ color: '#2196f3' }} /></ListItemIcon>
                  <ListItemText primary="Any damages arising from transactions with other users" />
                </ListItem>
              </List>
              <Typography variant="body1" paragraph sx={{ mt: 2, color: 'text.secondary', lineHeight: 1.8, textAlign: 'justify' }}>
                Our total liability to you for all claims arising from or relating to these Terms or your use of our services shall not exceed the amount you have paid to us in the twelve (12) months preceding the claim, or $100 USD, whichever is greater.
              </Typography>
            </>
          }
          delay={0.7}
        />

        <LegalSection
          title="8. Disclaimer of Warranties"
          content='Our services are provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, either express or implied. We disclaim all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement. We do not guarantee that our services will be uninterrupted, secure, or error-free, nor do we make any warranty regarding the quality, accuracy, or reliability of any information obtained through our platform. Users acknowledge and accept all risks associated with their use of our services.'
          delay={0.8}
        />

        <LegalSection
          title="9. Indemnification"
          content="You agree to indemnify, defend, and hold harmless our company, its affiliates, officers, directors, employees, agents, and licensors from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from: (a) your use or misuse of our services; (b) your violation of these Terms; (c) your violation of any rights of another party; or (d) any content you submit, post, or transmit through our platform."
          delay={0.9}
        />

        <LegalSection
          title="10. Governing Law and Dispute Resolution"
          content={
            <>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary', lineHeight: 1.8, textAlign: 'justify' }}>
                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions. Any disputes arising out of or relating to these Terms or our services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, except that either party may seek injunctive relief in a court of competent jurisdiction.
              </Typography>
              <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(33, 150, 243, 0.05)', borderRadius: 2, borderLeft: '4px solid #2196f3' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#2196f3' }}>
                  Note: By agreeing to these Terms, you waive your right to a jury trial and the right to participate in class actions.
                </Typography>
              </Box>
            </>
          }
          delay={1.0}
        />

        <LegalSection
          title="11. Termination"
          content="We reserve the right to suspend or terminate your account and access to our services at any time, with or without cause, and with or without notice. Upon termination, your right to use our services will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive, including but not limited to ownership provisions, warranty disclaimers, indemnity, and limitations of liability."
          delay={1.1}
        />

        <LegalSection
          title="12. Contact Information"
          content={
            <Box sx={{ p: 3, bgcolor: 'rgba(76, 175, 80, 0.05)', borderRadius: 2, mt: 2 }}>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                For any questions, concerns, or requests regarding these Terms and Conditions, please contact us at:
              </Typography>
              <Typography variant="body1" sx={{ color: '#d92228', fontWeight: 600 }}>
                Email: legal@realestate.com
              </Typography>
              <Typography variant="body1" sx={{ color: '#d92228', fontWeight: 600 }}>
                Phone: +1 (555) 123-4567
              </Typography>
              <Typography variant="body1" sx={{ color: '#d92228', fontWeight: 600 }}>
                Address: 123 Real Estate Ave, Suite 100, City, State 12345
              </Typography>
            </Box>
          }
          delay={1.2}
        />

        <Box sx={{ mt: 4, pt: 3, borderTop: '2px solid rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: 'text.disabled', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Gavel sx={{ fontSize: 16 }} />
            These Terms and Conditions are effective as of October 17, 2025
          </Typography>
        </Box>
      </LegalContainer>
    </Layout>
  );
};

export default TermsAndConditions;
