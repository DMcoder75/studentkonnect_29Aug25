import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import realDatabaseService from '../services/realDatabaseService'
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
  ChevronRight,
  LogOut
} from 'lucide-react'

const UnifiedLeftSidebar = ({ onMobileMenuClose }) => {
  const { user, userRole, isAuthenticated, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [expandedItems, setExpandedItems] = useState({})
  const [realCounts, setRealCounts] = useState({
    students: 0,
    meetings: 0,
    applications: 0,
    forums: 0,
    connections: 0
  })

  // Derive authentication states from the correct context properties
  const isLoggedIn = isAuthenticated
  const isStudent = userRole === 'student'
  const isCounselor = userRole === 'counselor'
  const isAdmin = userRole === 'admin'

  // Load real counts from database
  useEffect(() => {
    const loadRealCounts = async () => {
      if (isCounselor && user?.email) {
        try {
          // Get counselor's real student count
          const counselorStudents = await realDatabaseService.getCounselorStudents(user.email)
          setRealCounts(prev => ({
            ...prev,
            students: counselorStudents?.length || 0
          }))
        } catch (error) {
          console.error('Error loading real counts:', error)
        }
      }
    }

    if (isLoggedIn) {
      loadRealCounts()
    }
  }, [isCounselor, user?.email, isLoggedIn])

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
    if (item.action === 'logout') {
      // Handle logout
      logout()
      navigate('/')
      if (onMobileMenuClose) {
        onMobileMenuClose()
      }
    } else if (item.submenu) {
      toggleExpanded(item.id)
    } else if (item.path) {
      navigate(item.path)
      if (onMobileMenuClose) {
        onMobileMenuClose()
      }
    }
  }

  // Get menu items based on authentication state
  const getMenuItems = () => {
    const menuItems = []

    // Always show Home first
    menuItems.push({
      id: 'home',
      name: 'Home',
      path: '/',
      icon: Home,
      badge: null
    })

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
          id: 'my-applications',
          name: 'My Applications',
          path: '/student/applications',
          icon: FileText,
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
          badge: realCounts.students > 0 ? realCounts.students.toString() : null
        },
        {
          id: 'my-profile-counselor',
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
          badge: realCounts.meetings > 0 ? realCounts.meetings.toString() : null
        },
        {
          id: 'student-applications',
          name: 'Student Applications',
          path: '/counselor/applications',
          icon: FileText,
          badge: realCounts.applications > 0 ? realCounts.applications.toString() : null
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

    // Always show Find Counselors
    menuItems.push({
      id: 'find-counselors',
      name: 'Find Counselors',
      path: '/find-counselors',
      icon: UserCheck,
      badge: null
    })

    // Student-specific menu items (only for students)
    if (isLoggedIn && isStudent) {
      menuItems.push(
        {
          id: 'my-connections',
          name: 'My Connections',
          path: '/student/connections',
          icon: Users,
          badge: realCounts.connections > 0 ? realCounts.connections.toString() : '0'
        },
        {
          id: 'student-forums',
          name: 'Student Forums',
          path: '/student-forums',
          icon: Users,
          badge: realCounts.forums > 0 ? realCounts.forums.toString() : null
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
          { name: 'Pathways', path: '/pathways', badge: '5000+' },
          { name: 'Courses', path: '/courses', badge: '12500+' },
          { name: 'ATAR Calculator', path: '/atar-calculator' },
          { name: 'Course Finder', path: '/course-finder' }
        ]
      },
      {
        id: 'career-insights',
        name: 'Career Insights',
        icon: TrendingUp,
        badge: null,
        submenu: [
          { name: 'Career Trends', path: '/career-insights/career-trends' },
          { name: 'Industry Reports', path: '/career-insights/industry-reports' },
          { name: 'Salary Insights', path: '/career-insights/salary-insights' }
        ]
      },
      {
        id: 'smart-apply',
        name: 'Smart Apply',
        icon: FileText,
        badge: null,
        submenu: [
          { name: 'SOP Builder', path: '/sop-builder' },
          { name: 'Resume Builder', path: '/resume-builder' },
          { name: 'Application Tracker', path: '/smart-apply/application-tracker' }
        ]
      },
      {
        id: 'scholarships-assist',
        name: 'Scholarships Assist',
        icon: Award,
        badge: null,
        submenu: [
          { name: 'Scholarship Finder', path: '/scholarships' },
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

    // Add logout at the bottom for authenticated users
    if (isLoggedIn) {
      menuItems.push({
        id: 'logout',
        name: 'Logout',
        action: 'logout',
        icon: LogOut,
        badge: null,
        className: 'text-red-600 hover:text-red-700 hover:bg-red-50'
      })
    }

    return menuItems
  }

  const menuItems = getMenuItems()

  return (
    <div className="h-full bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SK</span>
          </div>
          <span className="font-semibold text-gray-900">StudentKonnect</span>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  item.className || ''
                } ${
                  isActive(item.path || '#')
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3 text-left">
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-left">{item.name}</span>
                  {item.badge && (
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                {item.submenu && (
                  <div className="ml-2 flex-shrink-0">
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
                      onClick={() => {
                        navigate(subItem.path)
                        if (onMobileMenuClose) {
                          onMobileMenuClose()
                        }
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                        isActive(subItem.path)
                          ? 'bg-purple-50 text-purple-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-left">{subItem.name}</span>
                      {subItem.badge && (
                        <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
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

        {/* User Profile Section (if logged in) */}
        {isLoggedIn && user && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user.email ? user.email.substring(0, 2).toUpperCase() : 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.user_metadata?.full_name || user.email}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {userRole || 'User'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UnifiedLeftSidebar

