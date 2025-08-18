import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  Home,
  Users,
  Globe,
  GraduationCap,
  TrendingUp,
  FileText,
  Award,
  HelpCircle,
  User,
  BarChart3,
  MessageCircle,
  Calendar,
  Clock,
  Star,
  MapPin,
  Building2,
  Plane,
  BookOpen,
  UserCheck,
  ChevronDown,
  ChevronRight
} from 'lucide-react'

const SidebarNew = ({ onMobileMenuClose }) => {
  const { user, userRole, isAuthenticated } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [expandedItems, setExpandedItems] = useState({})

  // Derive authentication states from the correct context properties
  const isLoggedIn = isAuthenticated()
  const isStudent = userRole === 'student'
  const isCounselor = userRole === 'counselor'
  const isAdmin = userRole === 'admin'

  // Toggle submenu expansion
  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  // Check if path is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  // Handle menu item click
  const handleItemClick = (item) => {
    if (item.submenu) {
      toggleExpanded(item.id)
    } else if (item.path) {
      navigate(item.path)
      if (onMobileMenuClose) {
        onMobileMenuClose()
      }
    }
  }

  // Handle submenu item click
  const handleSubmenuClick = (subItem) => {
    if (subItem.path) {
      navigate(subItem.path)
      if (onMobileMenuClose) {
        onMobileMenuClose()
      }
    }
  }

  // Define menu items based on authentication status
  const getMenuItems = () => {
    const menuItems = []

    // Always show Home
    menuItems.push({
      id: 'home',
      name: 'Home',
      path: '/',
      icon: Home,
      badge: null
    })

    // If user is NOT logged in - show public menu items
    if (!isLoggedIn) {
      menuItems.push(
        {
          id: 'find-counselors',
          name: 'Find Counselors',
          icon: Users,
          badge: null,
          submenu: [
            { name: 'Browse Counselors', path: '/counselor/directory', icon: Users },
            { name: 'Select Counselors', path: '/counselor/select', icon: Star },
            { name: 'Become a Counselor', path: '/counselor/register', icon: User }
          ]
        }
      )
    }

    // If user is a STUDENT - show student-specific menu items
    if (isLoggedIn && isStudent) {
      menuItems.push(
        {
          id: 'my-profile',
          name: 'My Profile',
          path: '/student/profile',
          icon: User,
          badge: null
        },
        {
          id: 'my-dashboard',
          name: 'My Dashboard',
          path: '/student/dashboard',
          icon: BarChart3,
          badge: null
        },
        {
          id: 'choose-counselor',
          name: 'Choose Counselor',
          path: '/student/choose-counselor',
          icon: UserCheck,
          badge: null
        },
        {
          id: 'my-connections',
          name: 'My Connections',
          path: '/student/connections',
          icon: MessageCircle,
          badge: '0'
        },
        {
          id: 'student-forums',
          name: 'Student Forums',
          path: '/student-forums',
          icon: Users,
          badge: '24'
        },
        {
          id: 'alumni-network',
          name: 'Alumni Network',
          path: '/alumni-network',
          icon: Users,
          badge: null
        },
        {
          id: 'travel-help',
          name: 'Travel Help',
          path: '/travel-help',
          icon: Plane,
          badge: null
        },
        {
          id: 'accommodation-help',
          name: 'Accommodation Help',
          path: '/accommodation-help',
          icon: Building2,
          badge: null
        }
      )
    }

    // If user is a COUNSELOR - show counselor-specific menu items
    if (isLoggedIn && isCounselor) {
      menuItems.push(
        {
          id: 'counselor-dashboard',
          name: 'My Dashboard',
          path: '/counselor/dashboard',
          icon: BarChart3,
          badge: null
        },
        {
          id: 'my-students',
          name: 'My Students',
          path: '/counselor/students',
          icon: Users,
          badge: '18'
        },
        {
          id: 'counselor-profile',
          name: 'My Profile',
          path: '/counselor/profile',
          icon: User,
          badge: null
        },
        {
          id: 'meetings-schedule',
          name: 'Meetings & Schedule',
          path: '/counselor/meetings',
          icon: MessageCircle,
          badge: '3'
        },
        {
          id: 'student-applications',
          name: 'Student Applications',
          path: '/counselor/applications',
          icon: FileText,
          badge: '12'
        },
        {
          id: 'counselor-network',
          name: 'Counselor Network',
          path: '/counselor/network',
          icon: Users,
          badge: null
        },
        {
          id: 'resources-tools',
          name: 'Resources & Tools',
          path: '/counselor/resources',
          icon: BookOpen,
          badge: null
        }
      )
    }

    // Always show these menu items for everyone
    menuItems.push(
      {
        id: 'global-education',
        name: 'Global Education',
        icon: Globe,
        badge: null,
        submenu: [
          { name: 'All Universities', path: '/global/universities', badge: '400+' },
          { name: 'All Courses', path: '/global/courses', badge: '1600+' },
          { name: 'Study Destinations', path: '/global/destinations', badge: '8' }
        ]
      },
      {
        id: 'australia-process',
        name: 'Australia Process',
        icon: GraduationCap,
        badge: null,
        submenu: [
          { name: 'Universities', path: '/universities', badge: '850+' },
          { name: 'Pathways', path: '/pathways', badge: '2400+' },
          { name: 'Courses', path: '/courses', badge: '12500+' },
          { name: 'ATAR Calculator', path: '/atar-calculator' }
        ]
      },
      {
        id: 'career-insights',
        name: 'Career Insights',
        path: '/career-insights',
        icon: TrendingUp,
        badge: null
      },
      {
        id: 'smart-apply',
        name: 'Smart Apply',
        icon: FileText,
        badge: null,
        submenu: [
          { name: 'SOP Builder', path: '/smart-apply/sop-builder' },
          { name: 'Resume Builder', path: '/smart-apply/resume-builder' },
          { name: 'Reference Letter Toolkit', path: '/smart-apply/reference-letter-toolkit' }
        ]
      },
      {
        id: 'scholarships-assist',
        name: 'Scholarships Assist',
        icon: Award,
        badge: null,
        submenu: [
          { name: 'Scholarship Finder', path: '/scholarships-assist/scholarship-finder' },
          { name: 'Eligibility Checker', path: '/scholarships-assist/eligibility-checker' },
          { name: 'Application Assistance', path: '/scholarships-assist/application-assistance' }
        ]
      },
      {
        id: 'visa-international',
        name: 'Visa & International Students',
        icon: Globe,
        badge: null,
        submenu: [
          { name: 'GTE & Visa Statement Builder', path: '/visa-international/gte-visa-statement-builder' },
          { name: 'Visa Document Checklist', path: '/visa-international/visa-document-checklist' },
          { name: 'Test Preparation Resources', path: '/visa-international/test-preparation-resources' }
        ]
      },
      {
        id: 'help-resources',
        name: 'Help & Resources',
        icon: HelpCircle,
        badge: null,
        submenu: [
          { name: 'FAQ', path: '/faq' },
          { name: 'Contact Us', path: '/contact-us' },
          { name: 'Tutorials and Guides', path: '/help-resources/tutorials-guides' }
        ]
      }
    )

    return menuItems
  }

  const menuItems = getMenuItems()

  return (
    <div className="h-full bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SK</span>
          </div>
          <span className="font-semibold text-gray-900">StudentKonnect</span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.path || '#')
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                {item.submenu && (
                  <div className="ml-2">
                    {expandedItems[item.id] ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                )}
              </button>

              {/* Submenu */}
              {item.submenu && expandedItems[item.id] && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.submenu.map((subItem, index) => (
                    <button
                      key={index}
                      onClick={() => handleSubmenuClick(subItem)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                        isActive(subItem.path || '#')
                          ? 'bg-purple-50 text-purple-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {subItem.icon && <subItem.icon className="w-4 h-4" />}
                        <span>{subItem.name}</span>
                      </div>
                      {subItem.badge && (
                        <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
                          {subItem.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User info section at bottom */}
        {isLoggedIn && user && (
          <div className="mt-8 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 px-3 py-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {user.firstName ? user.firstName.charAt(0) : 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {isStudent ? 'Student' : isCounselor ? 'Counselor' : isAdmin ? 'Admin' : 'User'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SidebarNew

