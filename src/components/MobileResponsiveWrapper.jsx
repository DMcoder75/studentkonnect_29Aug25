import React, { useState, useEffect } from 'react'

const MobileResponsiveWrapper = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Apply mobile styles directly
  useEffect(() => {
    if (isMobile) {
      // Hide desktop sidebar
      const sidebarElements = document.querySelectorAll('aside, [class*="sidebar"], [class*="w-64"]')
      sidebarElements.forEach(el => {
        el.style.display = 'none'
      })

      // Hide top header dropdowns
      const headerDropdowns = document.querySelectorAll('.bg-gradient-to-r.from-purple-600')
      headerDropdowns.forEach(el => {
        if (el.textContent.includes('Destinations') || el.textContent.includes('Universities')) {
          el.style.display = 'none'
        }
      })

      // Make main content full width
      const mainContent = document.querySelector('main')
      if (mainContent) {
        mainContent.style.width = '100%'
        mainContent.style.marginLeft = '0'
      }

      // Convert grids to horizontal scroll
      const grids = document.querySelectorAll('.grid')
      grids.forEach(grid => {
        grid.style.display = 'flex'
        grid.style.overflowX = 'auto'
        grid.style.gap = '1rem'
        grid.style.padding = '0 1rem'
        grid.style.webkitOverflowScrolling = 'touch'
        
        // Make grid items fixed width
        const gridItems = grid.children
        Array.from(gridItems).forEach(item => {
          item.style.flex = '0 0 280px'
          item.style.maxWidth = '280px'
        })
      })
    } else {
      // Restore desktop styles
      const sidebarElements = document.querySelectorAll('aside, [class*="sidebar"], [class*="w-64"]')
      sidebarElements.forEach(el => {
        el.style.display = ''
      })

      const headerDropdowns = document.querySelectorAll('.bg-gradient-to-r.from-purple-600')
      headerDropdowns.forEach(el => {
        el.style.display = ''
      })

      const grids = document.querySelectorAll('.grid')
      grids.forEach(grid => {
        grid.style.display = 'grid'
        grid.style.overflowX = ''
        grid.style.gap = ''
        grid.style.padding = ''
        
        const gridItems = grid.children
        Array.from(gridItems).forEach(item => {
          item.style.flex = ''
          item.style.maxWidth = ''
        })
      })
    }
  }, [isMobile])

  return <>{children}</>
}

export default MobileResponsiveWrapper

