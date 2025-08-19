import React, { useState, useEffect } from 'react'
import { Menu, X, Home, Users, Globe, TrendingUp, FileText, Award, Plane, HelpCircle } from 'lucide-react'

const MobileOnlyLayout = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 767
      setIsMobile(mobile)
      
      if (mobile) {
        // Apply mobile-only styles
        applyMobileStyles()
      } else {
        // Remove mobile styles for desktop
        removeMobileStyles()
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const applyMobileStyles = () => {
    // Only apply if mobile
    if (window.innerWidth > 767) return
    
    // Hide desktop sidebar
    const sidebarElements = document.querySelectorAll('aside, [class*="sidebar"], [class*="w-64"]')
    sidebarElements.forEach(el => {
      el.style.setProperty('display', 'none', 'important')
    })
    
    // Hide main menu items on mobile (since hamburger is available)
    const mainMenuItems = document.querySelectorAll('button:has(svg), a:has(svg)')
    mainMenuItems.forEach(el => {
      const text = el.textContent
      if (text && (text.includes('Home') || text.includes('Find Counselors') || 
                   text.includes('Global Education') || text.includes('Australia Process') ||
                   text.includes('Career Insights') || text.includes('Smart Apply') ||
                   text.includes('Scholarships') || text.includes('Visa') || text.includes('Help'))) {
        el.style.setProperty('display', 'none', 'important')
      }
    })
    
    // Hide the main menu container if it exists
    const menuContainers = document.querySelectorAll('[class*="space-y"], [class*="flex-col"]')
    menuContainers.forEach(container => {
      const hasMenuItems = container.querySelector('button, a')
      if (hasMenuItems && container.textContent && 
          (container.textContent.includes('Home') && container.textContent.includes('Find Counselors'))) {
        container.style.setProperty('display', 'none', 'important')
      }
    })
    
    // Hide the second header with four dropdowns (Destinations, Universities, Courses, Featured)
    const headerDropdowns = document.querySelectorAll('.bg-gradient-to-r.from-purple-600')
    headerDropdowns.forEach(el => {
      if (el.textContent && (el.textContent.includes('Destinations') || 
                             el.textContent.includes('Universities') || 
                             el.textContent.includes('Courses') || 
                             el.textContent.includes('Featured'))) {
        el.style.setProperty('display', 'none', 'important')
      }
    })
    
    // Hide the entire second header section if it contains the dropdowns
    const headerSections = document.querySelectorAll('div')
    headerSections.forEach(section => {
      if (section.textContent && 
          section.textContent.includes('Destinations') && 
          section.textContent.includes('Universities') &&
          section.textContent.includes('Courses') &&
          section.textContent.includes('Featured')) {
        section.style.setProperty('display', 'none', 'important')
      }
    })
    
    // Fix third section layout: SK logo left, Sign In/Admin right
    const signInButtons = document.querySelectorAll('button')
    signInButtons.forEach(button => {
      if (button.textContent && (button.textContent.includes('Sign In') || button.textContent.includes('Admin'))) {
        const parentContainer = button.closest('div')
        if (parentContainer) {
          parentContainer.style.setProperty('display', 'flex', 'important')
          parentContainer.style.setProperty('justify-content', 'space-between', 'important')
          parentContainer.style.setProperty('align-items', 'center', 'important')
          parentContainer.style.setProperty('width', '100%', 'important')
        }
      }
    })
    
    // Make main content full width
    const mainContent = document.querySelector('main')
    if (mainContent) {
      mainContent.style.setProperty('width', '100%', 'important')
      mainContent.style.setProperty('margin-left', '0', 'important')
    }
  }

  const removeMobileStyles = () => {
    // Restore desktop styles
    const sidebarElements = document.querySelectorAll('aside, [class*="sidebar"], [class*="w-64"]')
    sidebarElements.forEach(el => {
      el.style.removeProperty('display')
    })
    
    const headerDropdowns = document.querySelectorAll('.bg-gradient-to-r.from-purple-600')
    headerDropdowns.forEach(el => {
      el.style.removeProperty('display')
    })
    
    const mainContent = document.querySelector('main')
    if (mainContent) {
      mainContent.style.removeProperty('width')
      mainContent.style.removeProperty('margin-left')
    }
  }

  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Users, label: 'Find Counselors', href: '/counselor/directory' },
    { icon: Globe, label: 'Global Education', href: '/global/universities' },
    { icon: TrendingUp, label: 'Career Insights', href: '/career-insights' },
    { icon: FileText, label: 'Smart Apply', href: '/smart-apply' },
    { icon: Award, label: 'Scholarships', href: '/scholarships' },
    { icon: Plane, label: 'Visa & International', href: '/visa' },
    { icon: HelpCircle, label: 'Help & Resources', href: '/help' }
  ]

  if (!isMobile) return null // Don't render anything on desktop

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md md:hidden">
        <div className="flex items-center justify-between p-4">
          {/* Center: Logo and Name */}
          <div className="flex-1 flex items-center justify-center space-x-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SK</span>
            </div>
            <span className="font-semibold text-gray-800">StudentKonnect</span>
          </div>
          
          {/* Right: Hamburger Menu */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-lg bg-purple-100 text-purple-600"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)} />
          
          <div className="absolute top-0 right-0 h-full w-80 bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SK</span>
                </div>
                <span className="font-semibold text-gray-800">StudentKonnect</span>
              </div>
              
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg bg-gray-100 text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <nav className="space-y-2">
                {menuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Content Spacer */}
      <div className="h-16 md:hidden" />
    </>
  )
}

export default MobileOnlyLayout

