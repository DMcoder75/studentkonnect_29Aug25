import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import GlobalSidebarManager from './GlobalSidebarManager'

const MobileWrapper = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      {/* Mobile Header - Always render, CSS controls visibility */}
      <header className="mobile-header-fixed fixed top-0 left-0 right-0 z-[9999] bg-white border-b border-gray-200 hidden">
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
        <div className="fixed inset-0 z-[9998] bg-white pt-16">
          <GlobalSidebarManager isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={() => setIsMobileMenuOpen(false)} />
        </div>
      )}

      {/* Content */}
      {children}
    </>
  )
}

export default MobileWrapper

