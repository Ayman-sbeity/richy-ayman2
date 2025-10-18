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
    adsbygoogle?: Array<{ push: (config: object) => void }>;
  }
}

const AdSenseAd: React.FC<AdSenseAdProps> = ({
  adSlot,
  adFormat = 'auto',
  fullWidth = false,
  style,
}) => {
  const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

  useEffect(() => {
    try {
      // This will push a new ad configuration to AdSense
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle as any).push({});
      }
    } catch (err) {
      console.log('AdSense is not available yet. This is normal in development.');
    }
  }, []);

  return (
    <Box
      sx={{
        my: 3,
        display: 'flex',
        justifyContent: 'center',
        ...style,
      }}
    >
      {isDevelopment && (
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
          }}
        >
          <div>
            Google AdSense Ad<br />
            (Slot: {adSlot})<br />
            <small>Ads only show in production</small>
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
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your publisher ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidth}
      />
    </Box>
  );
};

export default AdSenseAd;
