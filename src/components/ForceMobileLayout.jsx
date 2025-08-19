import React, { useEffect } from 'react'

const ForceMobileLayout = () => {
  useEffect(() => {
    const forceMobileStyles = () => {
      // Check if we're on mobile
      const isMobile = window.innerWidth <= 767
      
      if (isMobile) {
        console.log('🔧 Forcing mobile layout...')
        
        // Force hide sidebar with multiple selectors
        const hideElements = [
          'aside',
          '[class*="sidebar"]',
          '[class*="Sidebar"]', 
          '[class*="w-64"]',
          '.desktop-sidebar'
        ]
        
        hideElements.forEach(selector => {
          const elements = document.querySelectorAll(selector)
          elements.forEach(el => {
            el.style.setProperty('display', 'none', 'important')
            el.style.setProperty('visibility', 'hidden', 'important')
            el.style.setProperty('width', '0', 'important')
          })
        })
        
        // Force hide top header dropdowns
        const headerElements = document.querySelectorAll('.bg-gradient-to-r')
        headerElements.forEach(el => {
          if (el.textContent && (
            el.textContent.includes('Destinations') || 
            el.textContent.includes('Universities') ||
            el.textContent.includes('Courses') ||
            el.textContent.includes('Featured')
          )) {
            el.style.setProperty('display', 'none', 'important')
          }
        })
        
        // Force main content to full width
        const mainElements = document.querySelectorAll('main, .main-content')
        mainElements.forEach(el => {
          el.style.setProperty('width', '100%', 'important')
          el.style.setProperty('margin-left', '0', 'important')
          el.style.setProperty('padding', '1rem', 'important')
        })
        
        // Force grids to horizontal scroll
        const grids = document.querySelectorAll('.grid')
        grids.forEach(grid => {
          grid.style.setProperty('display', 'flex', 'important')
          grid.style.setProperty('overflow-x', 'auto', 'important')
          grid.style.setProperty('gap', '1rem', 'important')
          grid.style.setProperty('padding', '0 1rem', 'important')
          grid.style.setProperty('-webkit-overflow-scrolling', 'touch', 'important')
          
          // Force grid items to fixed width
          const items = grid.children
          Array.from(items).forEach(item => {
            item.style.setProperty('flex', '0 0 280px', 'important')
            item.style.setProperty('max-width', '280px', 'important')
          })
        })
        
        console.log('✅ Mobile layout forced!')
      }
    }
    
    // Apply immediately
    forceMobileStyles()
    
    // Apply on resize
    window.addEventListener('resize', forceMobileStyles)
    
    // Apply with delay to catch dynamic content
    setTimeout(forceMobileStyles, 1000)
    setTimeout(forceMobileStyles, 3000)
    
    return () => {
      window.removeEventListener('resize', forceMobileStyles)
    }
  }, [])
  
  return null // This component doesn't render anything
}

export default ForceMobileLayout

