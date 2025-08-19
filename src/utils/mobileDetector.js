// Mobile Detection Utility - Actually works on real devices
export const isMobileDevice = () => {
  // Multiple detection methods for reliability
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  // Check user agent
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isMobileUA = mobileRegex.test(userAgent);
  
  // Check screen size
  const isMobileScreen = window.innerWidth <= 768;
  
  // Check touch capability
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Check orientation API (mobile specific)
  const hasOrientationAPI = 'orientation' in window;
  
  // Return true if any mobile indicator is present
  return isMobileUA || (isMobileScreen && isTouchDevice) || hasOrientationAPI;
};

// Apply mobile styles directly via JavaScript
export const applyMobileStyles = () => {
  if (!isMobileDevice()) {
    // Remove mobile class if not mobile
    document.body.classList.remove('js-mobile');
    return;
  }
  
  // Add mobile class to body for CSS targeting
  document.body.classList.add('js-mobile');
  
  // Remove existing mobile styles
  const existingStyle = document.getElementById('js-mobile-styles');
  if (existingStyle) existingStyle.remove();
  
  // Create and inject comprehensive mobile styles
  const style = document.createElement('style');
  style.id = 'js-mobile-styles';
  style.innerHTML = `
    /* COMPREHENSIVE MOBILE STYLES */
    
    /* HIDE ALL DESKTOP HEADERS - Aggressive targeting */
    .js-mobile .bg-gradient-to-r,
    .js-mobile .bg-white.shadow-sm,
    .js-mobile .bg-white.border-b,
    .js-mobile header:not(.mobile-header-only),
    .js-mobile nav:not(.mobile-nav),
    .js-mobile .desktop-header,
    .js-mobile .header-desktop {
      display: none !important;
      visibility: hidden !important;
    }
    
    /* HIDE ALL DESKTOP SIDEBARS */
    .js-mobile .w-64,
    .js-mobile aside,
    .js-mobile .sidebar,
    .js-mobile .desktop-sidebar {
      display: none !important;
      visibility: hidden !important;
    }
    
    /* SHOW MOBILE HEADER */
    .js-mobile .mobile-header-only {
      display: flex !important;
      visibility: visible !important;
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      z-index: 9999 !important;
      background: white !important;
      border-bottom: 1px solid #e5e7eb !important;
      padding: 0.75rem 1rem !important;
    }
    
    /* HIDE MODAL ON MOBILE */
    .js-mobile .modal,
    .js-mobile .popup,
    .js-mobile [role="dialog"],
    .js-mobile .fixed.inset-0 {
      display: none !important;
      visibility: hidden !important;
    }
    
    /* 1. HIDE ENTIRE STATS SECTION including text */
    .js-mobile .grid.grid-cols-2.md\\:grid-cols-5,
    .js-mobile section:has(.grid.grid-cols-2.md\\:grid-cols-5) {
      display: none !important;
    }
    
    /* 2. FORM FIELDS VERTICAL in "Build Your Perfect Pathway" */
    .js-mobile .space-x-4 {
      display: flex !important;
      flex-direction: column !important;
      gap: 1rem !important;
    }
    
    .js-mobile .space-x-4 > * {
      margin: 0 !important;
      width: 100% !important;
    }
    
    /* 3. COUNSELOR CARDS HORIZONTAL SCROLL */
    .js-mobile .grid.grid-cols-1.md\\:grid-cols-3 {
      display: flex !important;
      overflow-x: auto !important;
      gap: 1rem !important;
      padding-bottom: 1rem !important;
      -webkit-overflow-scrolling: touch !important;
      scroll-snap-type: x mandatory !important;
    }
    
    .js-mobile .grid.grid-cols-1.md\\:grid-cols-3 > * {
      flex: 0 0 280px !important;
      min-width: 280px !important;
      scroll-snap-align: start !important;
    }
    
    /* MOBILE BODY ADJUSTMENTS */
    .js-mobile body {
      padding-top: 64px !important;
      overflow-x: hidden !important;
    }
    
    /* MOBILE CONTENT FULL WIDTH */
    .js-mobile .flex > .flex-1,
    .js-mobile .flex > .w-full,
    .js-mobile main,
    .js-mobile .container {
      width: 100% !important;
      max-width: 100% !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      padding-left: 1rem !important;
      padding-right: 1rem !important;
      flex: none !important;
    }
    
    /* MOBILE FORM OPTIMIZATIONS */
    .js-mobile input,
    .js-mobile select,
    .js-mobile textarea,
    .js-mobile button {
      font-size: 16px !important;
    }
  `;
  
  document.head.appendChild(style);
  
  // Also apply styles via DOM manipulation for extra reliability
  setTimeout(() => {
    // Hide all desktop headers aggressively
    document.querySelectorAll('.bg-gradient-to-r, .bg-white.shadow-sm, .bg-white.border-b, header:not(.mobile-header-only)').forEach(el => {
      el.style.display = 'none';
      el.style.visibility = 'hidden';
    });
    
    // Hide all sidebars
    document.querySelectorAll('.w-64, aside, .sidebar').forEach(el => {
      el.style.display = 'none';
      el.style.visibility = 'hidden';
    });
    
    // Hide modals
    document.querySelectorAll('.modal, .popup, [role="dialog"], .fixed.inset-0').forEach(el => {
      el.style.display = 'none';
      el.style.visibility = 'hidden';
    });
    
    // 1. Hide stats section
    document.querySelectorAll('.grid.grid-cols-2').forEach(el => {
      if (el.classList.contains('md:grid-cols-5')) {
        el.style.display = 'none';
        // Hide parent section too
        let parent = el.closest('section') || el.closest('div');
        if (parent && parent.textContent.includes('Global Education')) {
          parent.style.display = 'none';
        }
      }
    });
    
    // 2. Make form fields vertical
    document.querySelectorAll('.space-x-4').forEach(el => {
      el.style.display = 'flex';
      el.style.flexDirection = 'column';
      el.style.gap = '1rem';
      Array.from(el.children).forEach(child => {
        child.style.margin = '0';
        child.style.width = '100%';
      });
    });
    
    // 3. Make counselor cards horizontal scroll
    document.querySelectorAll('.grid.grid-cols-1').forEach(el => {
      if (el.classList.contains('md:grid-cols-3')) {
        el.style.display = 'flex';
        el.style.overflowX = 'auto';
        el.style.gap = '1rem';
        el.style.paddingBottom = '1rem';
        el.style.webkitOverflowScrolling = 'touch';
        
        Array.from(el.children).forEach(child => {
          child.style.flex = '0 0 280px';
          child.style.minWidth = '280px';
        });
      }
    });
    
    // Show mobile header if it exists
    const mobileHeader = document.querySelector('.mobile-header-only');
    if (mobileHeader) {
      mobileHeader.style.display = 'flex';
      mobileHeader.style.visibility = 'visible';
    }
    
  }, 100);
};

// Initialize mobile detection and styles
export const initMobileStyles = () => {
  // Apply immediately
  applyMobileStyles();
  
  // Reapply on resize
  window.addEventListener('resize', applyMobileStyles);
  
  // Reapply on orientation change
  window.addEventListener('orientationchange', () => {
    setTimeout(applyMobileStyles, 100);
  });
  
  // Watch for DOM changes and reapply
  const observer = new MutationObserver(() => {
    if (isMobileDevice()) {
      applyMobileStyles();
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Expose function globally for testing
  window.applyMobileStyles = applyMobileStyles;
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileStyles);
} else {
  initMobileStyles();
}

