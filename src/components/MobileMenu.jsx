import React from 'react'
import { X, Home, Users, Globe, GraduationCap, TrendingUp, FileText, Shield, HelpCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MobileMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate()

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Users, label: 'Find Counselors', path: '/counselor/directory' },
    { icon: Globe, label: 'Global Education', path: '/global-universities' },
    { icon: GraduationCap, label: 'Australia Process', path: '/australia-process' },
    { icon: TrendingUp, label: 'Career Insights', path: '/career-insights' },
    { icon: FileText, label: 'Smart Apply', path: '/smart-apply' },
    { icon: Shield, label: 'Scholarships Assist', path: '/scholarships-assist' },
    { icon: Globe, label: 'Visa & International', path: '/visa-international' },
    { icon: HelpCircle, label: 'Help & Resources', path: '/help-resources' }
  ]

  const handleItemClick = (path) => {
    navigate(path)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        onClick={onClose}
      />
      
      {/* Mobile Menu */}
      <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-cyan-500">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-purple-600 font-bold text-lg">SK</span>
            </div>
            <span className="text-white font-bold text-lg">StudentKonnect</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="py-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(item.path)}
              className="w-full flex items-center space-x-4 px-6 py-4 hover:bg-purple-50 transition-colors text-left"
            >
              <item.icon className="h-6 w-6 text-purple-600" />
              <span className="text-gray-800 font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-center">
            <p className="text-sm text-gray-600">StudentKonnect</p>
            <p className="text-xs text-gray-500">Your pathway to global education</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileMenu

