import React, { useEffect } from 'react';
import { Box } from '@mui/material';

interface AdSenseAdProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

const AdSenseAd: React.FC<AdSenseAdProps> = ({
  adSlot,
  adFormat = 'auto',
  fullWidth = false,
  style,
}) => {
  // Always show ads in production (Vercel automatically sets NODE_ENV to 'production')
  const isProduction = process.env.NODE_ENV === 'production';

  useEffect(() => {
    try {
      // Push ad configuration after component mounts
      const timer = setTimeout(() => {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          window.adsbygoogle.push({});
        }
      }, 100);
      
      return () => clearTimeout(timer);
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <Box
      sx={{
        my: 3,
        display: 'flex',
        justifyContent: 'center',
        minHeight: '250px',
        position: 'relative',
        ...style,
      }}
    >
      {/* Show placeholder ONLY in development */}
      {!isProduction && (
        <Box
          sx={{
            width: fullWidth ? '100%' : '300px',
            height: '250px',
            backgroundColor: '#e0e0e0',
            border: '2px dashed #999',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            fontWeight: 'bold',
            color: '#666',
            fontSize: '14px',
            textAlign: 'center',
            padding: '16px',
            zIndex: 1,
          }}
        >
          <div>
            📢 Google AdSense Ad<br />
            (Slot: {adSlot})<br />
            <small style={{ fontSize: '12px', fontWeight: 'normal' }}>
              Ads only show in production
            </small>
          </div>
        </Box>
      )}
      <ins
        className="adsbygoogle"
        style={{
          display: fullWidth ? 'block' : 'inline-block',
          width: fullWidth ? '100%' : '300px',
          height: '250px',
          ...style,
        }}
        data-ad-client="ca-pub-3544612181938151"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidth ? 'true' : 'false'}
      />
    </Box>
  );
};

export default AdSenseAd;
