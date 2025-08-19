// Mobile Forcer - ONLY the 3 specific requested changes (NO body hiding)
export const forceMobileLayout = () => {
  if (typeof window === 'undefined') return

  const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  
  if (isMobile) {
    // Remove any existing mobile styles
    const existingStyle = document.getElementById('js-mobile-force')
    if (existingStyle) existingStyle.remove()
    
    // Create and inject mobile styles - ONLY for the 3 specific changes
    const style = document.createElement('style')
    style.id = 'js-mobile-force'
    style.innerHTML = `
      /* 1. HIDE ENTIRE STATS SECTION including text */
      .grid.grid-cols-2.md\\:grid-cols-5 {
        display: none !important;
      }
      
      /* 2. FORM FIELDS VERTICAL in "Build Your Perfect Pathway" */
      .space-x-4 {
        display: flex !important;
        flex-direction: column !important;
        gap: 1rem !important;
      }
      
      .space-x-4 > * {
        margin: 0 !important;
        width: 100% !important;
      }
      
      /* 3. COUNSELOR CARDS HORIZONTAL SCROLL */
      .grid.grid-cols-1.md\\:grid-cols-3 {
        display: flex !important;
        overflow-x: auto !important;
        gap: 1rem !important;
        padding-bottom: 1rem !important;
        -webkit-overflow-scrolling: touch !important;
      }
      
      .grid.grid-cols-1.md\\:grid-cols-3 > * {
        flex: 0 0 280px !important;
        min-width: 280px !important;
      }
    `
    
    document.head.appendChild(style)
    
    // DOM manipulation for the 3 specific changes only
    setTimeout(() => {
      // 1. Hide entire stats section including text
      document.querySelectorAll('.grid.grid-cols-2').forEach(el => {
        if (el.classList.contains('md:grid-cols-5')) {
          el.style.display = 'none'
        }
      })
      
      // Hide stats section text by content
      document.querySelectorAll('h2, h3, p, div').forEach(el => {
        if (el.textContent && (
            el.textContent.includes('Global Education at Your Fingertips') || 
            el.textContent.includes('Discover endless possibilities across the world')
        )) {
          el.style.display = 'none'
        }
      })
      
      // 2. Fix form fields to be vertical
      document.querySelectorAll('.space-x-4').forEach(el => {
        el.style.display = 'flex'
        el.style.flexDirection = 'column'
        el.style.gap = '1rem'
        
        Array.from(el.children).forEach(child => {
          child.style.margin = '0'
          child.style.width = '100%'
        })
      })
      
      // 3. Fix counselor cards to horizontal scroll
      document.querySelectorAll('.grid.grid-cols-1').forEach(el => {
        if (el.classList.contains('md:grid-cols-3')) {
          el.style.display = 'flex'
          el.style.overflowX = 'auto'
          el.style.gap = '1rem'
          el.style.paddingBottom = '1rem'
          el.style.webkitOverflowScrolling = 'touch'
          
          Array.from(el.children).forEach(child => {
            child.style.flex = '0 0 280px'
            child.style.minWidth = '280px'
          })
        }
      })
    }, 100)
  }
}

// Auto-run on load and resize
export const initMobileForcer = () => {
  forceMobileLayout()
  window.addEventListener('resize', forceMobileLayout)
  window.addEventListener('orientationchange', () => {
    setTimeout(forceMobileLayout, 100)
  })
}

// Run immediately if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileForcer)
} else {
  initMobileForcer()
}

