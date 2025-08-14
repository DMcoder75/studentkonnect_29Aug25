import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  Home, 
  User, 
  BarChart3, 
  Users, 
  MessageSquare, 
  GraduationCap, 
  Plane, 
  MapPin,
  ChevronRight,
  ChevronDown,
  FileText,
  Award,
  BookOpen,
  Target,
  HelpCircle
} from 'lucide-react'

const StudentSidebar = ({ isOpen, onClose, isMobileMenuOpen, onMobileMenuClose }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const [expandedItems, setExpandedItems] = useState({})

  const toggleExpanded = (item) => {
    setExpandedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }))
  }

  const handleNavigation = (path) => {
    navigate(path)
    if (onMobileMenuClose) {
      onMobileMenuClose()
    }
  }

  const studentMenuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/',
      color: 'text-blue-600'
    },
    {
      id: 'profile',
      label: 'My Profile',
      icon: User,
      path: '/student/profile',
      color: 'text-purple-600',
      badge: user?.profileCompletion < 100 ? `${user?.profileCompletion}%` : null
    },
    {
      id: 'dashboard',
      label: 'My Dashboard',
      icon: BarChart3,
      path: '/student/dashboard',
      color: 'text-green-600'
    },
    {
      id: 'connections',
      label: 'My Connections',
      icon: Users,
      path: '/student/connections',
      color: 'text-blue-600',
      badge: user?.connections || '0'
    },
    {
      id: 'forums',
      label: 'Student Forums',
      icon: MessageSquare,
      path: '/student/forums',
      color: 'text-orange-600',
      badge: '24'
    },
    {
      id: 'alumni',
      label: 'Alumni Network',
      icon: GraduationCap,
      path: '/student/alumni',
      color: 'text-indigo-600'
    },
    {
      id: 'travel',
      label: 'Travel Help',
      icon: Plane,
      path: '/student/travel-help',
      color: 'text-cyan-600'
    },
    {
      id: 'accommodation',
      label: 'Accommodation Help',
      icon: MapPin,
      path: '/student/accommodation-help',
      color: 'text-pink-600'
    }
  ]

  const smartApplyItems = [
    {
      id: 'resume-builder',
      label: 'Resume Builder',
      icon: FileText,
      path: '/smart-apply/resume-builder'
    },
    {
      id: 'sop-builder',
      label: 'SOP Builder',
      icon: BookOpen,
      path: '/smart-apply/sop-builder'
    }
  ]

  const otherMenuItems = [
    {
      id: 'career-insights',
      label: 'Career Insights',
      icon: Target,
      expandable: true,
      items: [
        { label: 'Career Pathways', path: '/pathways' },
        { label: 'Industry Trends', path: '/career-trends' },
        { label: 'Salary Insights', path: '/salary-insights' }
      ]
    },
    {
      id: 'scholarships',
      label: 'Scholarships Assist',
      icon: Award,
      expandable: true,
      items: [
        { label: 'Find Scholarships', path: '/scholarships/search' },
        { label: 'Application Tips', path: '/scholarships/tips' },
        { label: 'Success Stories', path: '/scholarships/stories' }
      ]
    },
    {
      id: 'visa',
      label: 'Visa & International Students',
      icon: Plane,
      expandable: true,
      items: [
        { label: 'Visa Requirements', path: '/visa/requirements' },
        { label: 'Application Process', path: '/visa/process' },
        { label: 'Document Checklist', path: '/visa/documents' }
      ]
    },
    {
      id: 'help',
      label: 'Help & Resources',
      icon: HelpCircle,
      expandable: true,
      items: [
        { label: 'FAQ', path: '/help/faq' },
        { label: 'Contact Support', path: '/help/contact' },
        { label: 'User Guide', path: '/help/guide' }
      ]
    }
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onMobileMenuClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-lg z-50
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 w-80 overflow-y-auto
      `}>
        <div className="p-6">
          {/* User Info Section */}
          {user && (
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.firstName ? user.firstName.charAt(0) : 'U'}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <div className="flex items-center mt-1">
                    <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                      <div 
                        className="bg-purple-600 h-1.5 rounded-full" 
                        style={{ width: `${user.profileCompletion}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{user.profileCompletion}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Student Menu Items */}
          <div className="space-y-2 mb-6">
            {studentMenuItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center justify-between p-3 text-left rounded-lg transition-colors group ${
                    isActive 
                      ? 'bg-purple-50 border-l-4 border-purple-500' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className={`h-5 w-5 ${isActive ? 'text-purple-600' : item.color}`} />
                    <span className={`font-medium ${
                      isActive 
                        ? 'text-purple-700' 
                        : 'text-gray-700 group-hover:text-gray-900'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  {item.badge && (
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Smart Apply Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Smart Apply</h3>
              <button
                onClick={() => toggleExpanded('smart-apply')}
                className="p-1 hover:bg-gray-100 rounded"
              >
                {expandedItems['smart-apply'] ? (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
            
            {expandedItems['smart-apply'] && (
              <div className="space-y-1 ml-4">
                {smartApplyItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path)}
                    className="w-full flex items-center space-x-3 p-2 text-left hover:bg-gray-50 rounded-lg transition-colors text-sm"
                  >
                    <item.icon className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Other Menu Items */}
          <div className="space-y-2">
            {otherMenuItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5 text-gray-500" />
                    <span className="font-medium text-gray-700 group-hover:text-gray-900">
                      {item.label}
                    </span>
                  </div>
                  {item.expandable && (
                    expandedItems[item.id] ? (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    )
                  )}
                </button>
                
                {item.expandable && expandedItems[item.id] && (
                  <div className="ml-8 mt-2 space-y-1">
                    {item.items.map((subItem, index) => (
                      <button
                        key={index}
                        onClick={() => handleNavigation(subItem.path)}
                        className="w-full text-left p-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentSidebar

