// Mobile Fixer - Aggressive initialization that actually works
window.isMobile = function() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isMobileUA = mobileRegex.test(userAgent);
  const isSmallScreen = window.innerWidth <= 768;
  const isTouchDevice = 'ontouchstart' in window;
  
  return isMobileUA || (isSmallScreen && isTouchDevice) || isSmallScreen;
};

window.applyMobileChanges = function() {
  console.log('Applying mobile changes...');
  
  // 1. HIDE ENTIRE STATS SECTION including text
  const statsSection = document.querySelector('.grid.grid-cols-2.md\\:grid-cols-5');
  if (statsSection) {
    statsSection.style.display = 'none';
    // Hide parent section with "Global Education" text
    let parent = statsSection.closest('section');
    if (parent && parent.textContent.includes('Global Education')) {
      parent.style.display = 'none';
    }
  }
  
  // 2. FORM FIELDS VERTICAL in "Build Your Perfect Pathway"
  const formContainer = document.querySelector('.space-x-4');
  if (formContainer) {
    formContainer.style.display = 'flex';
    formContainer.style.flexDirection = 'column';
    formContainer.style.gap = '1rem';
    
    // Make all children full width
    Array.from(formContainer.children).forEach(child => {
      child.style.margin = '0';
      child.style.width = '100%';
    });
  }
  
  // 3. COUNSELOR CARDS HORIZONTAL SCROLL
  const counselorGrid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-3');
  if (counselorGrid) {
    counselorGrid.style.display = 'flex';
    counselorGrid.style.overflowX = 'auto';
    counselorGrid.style.gap = '1rem';
    counselorGrid.style.paddingBottom = '1rem';
    counselorGrid.style.webkitOverflowScrolling = 'touch';
    
    // Make cards fixed width
    Array.from(counselorGrid.children).forEach(child => {
      child.style.flex = '0 0 280px';
      child.style.minWidth = '280px';
    });
  }
  
  // HIDE ALL DESKTOP HEADERS
  document.querySelectorAll('.bg-gradient-to-r, .bg-white.shadow-sm, .bg-white.border-b').forEach(el => {
    if (!el.classList.contains('mobile-header-only')) {
      el.style.display = 'none';
    }
  });
  
  // HIDE DESKTOP SIDEBAR
  document.querySelectorAll('.w-64, aside').forEach(el => {
    el.style.display = 'none';
  });
  
  // SHOW MOBILE HEADER
  const mobileHeader = document.querySelector('.mobile-header-only');
  if (mobileHeader) {
    mobileHeader.style.display = 'flex';
    mobileHeader.style.position = 'fixed';
    mobileHeader.style.top = '0';
    mobileHeader.style.left = '0';
    mobileHeader.style.right = '0';
    mobileHeader.style.zIndex = '9999';
    mobileHeader.style.background = 'white';
    mobileHeader.style.borderBottom = '1px solid #e5e7eb';
  }
  
  // ADJUST BODY FOR MOBILE
  document.body.style.paddingTop = '64px';
  document.body.style.overflowX = 'hidden';
  
  // MAKE CONTENT FULL WIDTH
  document.querySelectorAll('.flex > .flex-1, .flex > .w-full, main, .container').forEach(el => {
    el.style.width = '100%';
    el.style.maxWidth = '100%';
    el.style.marginLeft = '0';
    el.style.marginRight = '0';
    el.style.paddingLeft = '1rem';
    el.style.paddingRight = '1rem';
  });
  
  console.log('Mobile changes applied successfully');
};

// AGGRESSIVE INITIALIZATION - Run multiple times
function initializeMobile() {
  if (window.isMobile()) {
    console.log('Mobile device detected, applying changes...');
    window.applyMobileChanges();
  }
}

// Run immediately
initializeMobile();

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMobile);
} else {
  initializeMobile();
}

// Run on window load
window.addEventListener('load', initializeMobile);

// Run on resize
window.addEventListener('resize', function() {
  if (window.isMobile()) {
    initializeMobile();
  }
});

// Force run multiple times with delays
setTimeout(initializeMobile, 100);
setTimeout(initializeMobile, 500);
setTimeout(initializeMobile, 1000);
setTimeout(initializeMobile, 2000);
setTimeout(initializeMobile, 3000);

// Watch for DOM changes and reapply
const observer = new MutationObserver(() => {
  if (window.isMobile()) {
    initializeMobile();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

