import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import GlobalSidebarManager from './GlobalSidebarManager'

const ResponsiveLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) {
    return (
      <div className="min-h-screen">
        {/* Mobile Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="w-6"></div>
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <div className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg p-2 font-bold text-sm mr-2">SK</div>
              <span className="text-lg font-bold text-gray-800">StudentKonnect</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-white pt-16">
            <GlobalSidebarManager isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={() => setIsMobileMenuOpen(false)} />
          </div>
        )}

        {/* Mobile Content - Hide desktop header completely */}
        <main className="pt-16">
          <div style={{ display: 'none' }}>
            {/* Hide desktop header on mobile */}
          </div>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { isMobile: true, hideDesktopHeader: true })
            }
            return child
          })}
        </main>
      </div>
    )
  }

  // Desktop - return children as-is for desktop layout with sidebar
  return <>{children}</>
}

export default ResponsiveLayout

