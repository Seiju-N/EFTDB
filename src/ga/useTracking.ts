import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag?: (key: string, trackingId: string, config: { page_path: string }) => void;
  }
}

export const useTracking = (trackingId: string | undefined = "G-93Z965NJ8Q") => {
  const location = useLocation();

  useEffect(() => {
    if (!window.gtag) return;
    if (!trackingId) {
      console.log(
        'Tracking not enabled, as `trackingId` was not given and there is no `GA_MEASUREMENT_ID`.',
      );
      return;
    }
    window.gtag('config', trackingId, { page_path: location.pathname });
  }, [location.pathname, trackingId]);
};
