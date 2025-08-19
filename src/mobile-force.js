// Force mobile layout when screen is small
function forceMobileLayout() {
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Force show mobile header
    const mobileHeader = document.querySelector('.mobile-header');
    if (mobileHeader) {
      mobileHeader.style.display = 'block';
      mobileHeader.style.visibility = 'visible';
      mobileHeader.style.position = 'fixed';
      mobileHeader.style.top = '0';
      mobileHeader.style.left = '0';
      mobileHeader.style.right = '0';
      mobileHeader.style.zIndex = '9999';
      mobileHeader.style.background = 'white';
      mobileHeader.style.borderBottom = '1px solid #e5e7eb';
      mobileHeader.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
    
    // Hide desktop elements
    const desktopElements = [
      '.bg-gradient-to-r.from-indigo-600.via-purple-600.to-pink-600',
      '.desktop-header-search',
      'aside',
      '.desktop-sidebar',
      '[class*="sidebar"]',
      '[class*="w-64"]'
    ];
    
    desktopElements.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.style.opacity = '0';
      });
    });
    
    // Adjust main content
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.style.paddingTop = '80px';
      mainContent.style.width = '100%';
      mainContent.style.marginLeft = '0';
    }
    
    // Hide navigation buttons in content
    const navButtons = document.querySelectorAll('button');
    navButtons.forEach(button => {
      const text = button.textContent;
      if (text.includes('Home') || text.includes('Find Counselors') || 
          text.includes('Global Education') || text.includes('Australia Process') ||
          text.includes('Career Insights') || text.includes('Smart Apply') ||
          text.includes('Scholarships Assist') || text.includes('Visa & International') ||
          text.includes('Help & Resources')) {
        button.style.display = 'none';
      }
    });
    
    console.log('Mobile layout forced');
  }
}

// Run on load and resize
document.addEventListener('DOMContentLoaded', forceMobileLayout);
window.addEventListener('resize', forceMobileLayout);

// Also run immediately if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', forceMobileLayout);
} else {
  forceMobileLayout();
}

