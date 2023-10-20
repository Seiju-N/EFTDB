import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag?: (key: string, trackingId: string, config?: { page_path?: string ,page_location?: string | undefined, debug_mode?: boolean }) => void;
  }
}

export const useTracking = (trackingId: string | undefined = "G-93Z965NJ8Q") => {
  const location = useLocation();

  useEffect(() => {
    if (!window.gtag) return;
    console.log('Sending data to Google Analytics');
    if (!trackingId) {
      console.log(
        'Tracking not enabled, as `trackingId` was not given and there is no `GA_MEASUREMENT_ID`.',
      );
      return;
    }
    const pagePath = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;

    window.gtag('config', trackingId, {
      page_path: location.pathname,
      page_location: pagePath,
      debug_mode: true
    });
    
    console.log(location.pathname)
  }, [location.pathname, trackingId]);
};
