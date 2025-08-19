import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MobileHeader = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile Header - Only shows on mobile */}
      <header className="mobile-header-only fixed top-0 left-0 right-0 z-[9999] bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left spacer */}
          <div className="w-6"></div>
          
          {/* Centered Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg p-2 font-bold text-sm mr-2">
              SK
            </div>
            <span className="text-lg font-bold text-gray-800">StudentKonnect</span>
          </div>
          
          {/* Right Hamburger */}
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Open menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay fixed inset-0 z-[9998] bg-white">
          <div className="pt-16 px-4">
            <nav className="space-y-4">
              <a href="/" className="block py-3 px-4 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                🏠 Home
              </a>
              <a href="/counselor/directory" className="block py-3 px-4 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                👥 Find Counselors
              </a>
              <a href="/global/universities" className="block py-3 px-4 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                🌍 Global Education
              </a>
              <a href="/australia/application" className="block py-3 px-4 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                🇦🇺 Australia Process
              </a>
              <a href="/career-insights" className="block py-3 px-4 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                📈 Career Insights
              </a>
              <a href="/smart-apply/sop-builder" className="block py-3 px-4 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                📝 Smart Apply
              </a>
              <a href="/scholarship-finder" className="block py-3 px-4 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                💰 Scholarships Assist
              </a>
              <a href="/visa/guide" className="block py-3 px-4 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                ✈️ Visa & International
              </a>
              <a href="/help-center" className="block py-3 px-4 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                ❓ Help & Resources
              </a>
              
              {/* Bottom buttons */}
              <div className="pt-6 space-y-3">
                <button className="w-full py-3 px-4 text-purple-600 border border-purple-600 rounded-lg font-medium">
                  Sign In
                </button>
                <button className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg font-medium">
                  Admin
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

export default MobileHeader

