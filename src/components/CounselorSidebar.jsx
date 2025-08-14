import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  Home, Users, Calendar, MessageCircle, Settings, 
  User, BarChart3, FileText, Star, Award, 
  ChevronDown, ChevronRight, LogOut
} from 'lucide-react'

const CounselorSidebar = ({ isMobileMenuOpen, onMobileMenuClose }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const handleNavigation = (path) => {
    navigate(path)
    if (onMobileMenuClose) {
      onMobileMenuClose()
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/',
      type: 'single'
    },
    {
      id: 'dashboard',
      label: 'My Dashboard',
      icon: BarChart3,
      path: '/counselor/dashboard',
      type: 'single'
    },
    {
      id: 'profile',
      label: 'My Profile',
      icon: User,
      path: '/counselor/profile',
      type: 'single'
    },
    {
      id: 'students',
      label: 'My Students',
      icon: Users,
      path: '/counselor/students',
      type: 'single',
      badge: '12'
    },
    {
      id: 'sessions',
      label: 'Sessions',
      icon: Calendar,
      type: 'expandable',
      children: [
        { label: 'Upcoming Sessions', path: '/counselor/sessions/upcoming', badge: '3' },
        { label: 'Past Sessions', path: '/counselor/sessions/past' },
        { label: 'Schedule Session', path: '/counselor/sessions/schedule' }
      ]
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: MessageCircle,
      path: '/counselor/messages',
      type: 'single',
      badge: '5'
    },
    {
      id: 'resources',
      label: 'Resources',
      icon: FileText,
      type: 'expandable',
      children: [
        { label: 'University Database', path: '/global/universities' },
        { label: 'Course Database', path: '/global/courses' },
        { label: 'Scholarship Finder', path: '/scholarship-finder' },
        { label: 'ATAR Calculator', path: '/atar-calculator' }
      ]
    },
    {
      id: 'reviews',
      label: 'Reviews & Ratings',
      icon: Star,
      path: '/counselor/reviews',
      type: 'single'
    },
    {
      id: 'earnings',
      label: 'Earnings',
      icon: Award,
      path: '/counselor/earnings',
      type: 'single'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/counselor/settings',
      type: 'single'
    }
  ]

  return (
    <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
      isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
    } md:translate-x-0 md:static md:h-screen overflow-y-auto`}>
      
      {/* Counselor Profile Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold truncate">
              {user?.name || 'Counselor'}
            </h3>
            <p className="text-xs text-blue-100 truncate">
              {user?.email || 'counselor@email.com'}
            </p>
            <div className="flex items-center mt-1">
              <Star className="h-3 w-3 text-yellow-300 mr-1" />
              <span className="text-xs text-blue-100">4.8 Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <div key={item.id}>
            {item.type === 'single' ? (
              <button
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-purple-100 text-purple-700 border-l-4 border-purple-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-purple-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ) : (
              <div>
                <button
                  onClick={() => toggleSection(item.id)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-purple-600 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  {expandedSections[item.id] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                
                {expandedSections[item.id] && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item.children.map((child, index) => (
                      <button
                        key={index}
                        onClick={() => handleNavigation(child.path)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          isActive(child.path)
                            ? 'bg-purple-50 text-purple-700 border-l-2 border-purple-600'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                        }`}
                      >
                        <span>{child.label}</span>
                        {child.badge && (
                          <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                            {child.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default CounselorSidebar

