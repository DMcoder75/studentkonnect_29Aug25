import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MobileRouteHandler = ({ desktopComponent: DesktopComponent, mobileComponent: MobileComponent }) => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileUA = mobileRegex.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      const isTouchDevice = 'ontouchstart' in window;
      
      setIsMobile(isMobileUA || (isSmallScreen && isTouchDevice) || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // If mobile and we have a mobile component, render it
  if (isMobile && MobileComponent) {
    return <MobileComponent />;
  }

  // Otherwise render desktop component
  return <DesktopComponent />;
};

export default MobileRouteHandler;

