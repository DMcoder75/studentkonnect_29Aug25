import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { globalEducationService } from '../services/globalEducationService'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Home, 
  GraduationCap, 
  Route, 
  BookOpen, 
  TrendingUp, 
  User,
  Calculator,
  ChevronDown,
  ChevronRight,
  X,
  FileText,
  Award,
  Globe,
  HelpCircle,
  BarChart3,
  MessageCircle,
  Plane,
  Users,
  MapPin,
  Building2
} from 'lucide-react'

export default function Sidebar({ isOpen, onClose, isHomepage, isMobileMenuOpen, onMobileMenuClose }) {
  const [expandedItems, setExpandedItems] = useState({})
  const [countries, setCountries] = useState([])
  const [loadingCountries, setLoadingCountries] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()

  // Check if user is a counselor
  const isCounselor = user?.user_type === 'counselor' || user?.role === 'counselor'

  // Load countries on component mount
  useEffect(() => {
    fetchCountries()
  }, [])

  const fetchCountries = async () => {
    try {
      setLoadingCountries(true)
      const { data, error } = await globalEducationService.getAllCountries()
      
      if (error) {
        console.error('Error fetching countries:', error)
        return
      }

      setCountries(data || [])
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoadingCountries(false)
    }
  }

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  const menuItems = [
    // Home should always be first
    {
      id: 'home',
      name: 'Home',
      path: '/',
      icon: Home,
      badge: null
    },
    // Counselor-specific items (when counselor is authenticated)
    ...(isAuthenticated() && isCounselor ? [
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
    ] : []),
    // Student-related items (when student is authenticated)
    ...(isAuthenticated() && !isCounselor ? [
      {
        id: 'student-dashboard',
        name: 'My Dashboard',
        path: '/student/dashboard',
        icon: BarChart3,
        badge: null
      },
      {
        id: 'my-profile',
        name: 'My Profile',
        path: '/student/profile',
        icon: User,
        badge: null
      },
      {
        id: 'my-connections',
        name: 'My Connections',
        path: '/student/connections',
        icon: MessageCircle,
        badge: '2'
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
        icon: Home,
        badge: null
      }
    ] : []),
    // Show Counselor Connect menu for students only
    ...(isAuthenticated() && !isCounselor ? [{
      id: 'counselor-connect',
      name: 'Counselor Connect',
      icon: User,
      badge: null,
      submenu: [
        { name: 'Find Counselors', path: '/counselor/directory' },
        { name: 'Select Counselor', path: '/counselor/select' },
        { name: 'Become a Counselor', path: '/counselor/register' }
      ]
    }] : []),
    // Global Education - Parent menu for Universities, Pathways, and Courses by Country
    {
      id: 'global-education',
      name: 'Global Education',
      icon: Globe,
      badge: null,
      submenu: [
        {
          name: 'All Universities',
          path: '/global/universities',
          badge: loadingCountries ? '...' : `${countries.length * 50}+`,
          submenu: [
            { name: 'All Countries', path: '/global/universities' },
            ...(countries.map(country => ({
              name: country.country_name,
              path: `/global/universities?country=${country.country_id}`,
              icon: MapPin
            })))
          ]
        },
        {
          name: 'All Courses',
          path: '/global/courses',
          badge: loadingCountries ? '...' : `${countries.length * 200}+`,
          submenu: [
            { name: 'All Countries', path: '/global/courses' },
            ...(countries.map(country => ({
              name: country.country_name,
              path: `/global/courses?country=${country.country_id}`,
              icon: MapPin
            })))
          ]
        },
        {
          name: 'Study Destinations',
          path: '/global/destinations',
          badge: loadingCountries ? '...' : `${countries.length}`,
          submenu: countries.map(country => ({
            name: country.country_name,
            path: `/global/destination/${country.country_id}`,
            icon: Building2
          }))
        }
      ]
    },
    // Australia Process - Keep for backward compatibility
    {
      id: 'aus-functions',
      name: 'Australia Process',
      icon: GraduationCap,
      badge: null,
      submenu: [
        {
          name: 'Universities',
          path: '/universities',
          badge: '850+',
          submenu: [
            { name: 'All Universities', path: '/universities' },
            { name: 'Group of Eight', path: '/universities?type=go8' },
            { name: 'Technology Network', path: '/universities?type=tech' },
            { name: 'Regional Universities', path: '/universities?type=regional' }
          ]
        },
        {
          name: 'Pathways',
          path: '/pathways',
          badge: '2400+',
          submenu: [
            { name: 'All Pathways', path: '/pathways' },
            { name: 'Business & Finance', path: '/pathways?category=business' },
            { name: 'Engineering & Tech', path: '/pathways?category=engineering' },
            { name: 'Health & Medicine', path: '/pathways?category=health' },
            { name: 'Arts & Creative', path: '/pathways?category=arts' }
          ]
        },
        {
          name: 'Courses',
          path: '/courses',
          badge: '12500+',
          submenu: [
            { name: 'All Courses', path: '/courses' },
            { name: 'Undergraduate', path: '/courses?level=undergraduate' },
            { name: 'Postgraduate', path: '/courses?level=postgraduate' },
            { name: 'Research', path: '/courses?level=research' }
          ]
        },
        {
          name: 'ATAR Calculator',
          path: '/atar-calculator',
          badge: null
        }
      ]
    },
    // Find Counselors - Always visible for all users, positioned after Courses
    {
      id: 'find-counselors',
      name: 'Find Counselors',
      icon: User,
      badge: null,
      submenu: [
        { name: 'Browse Counselors', path: '/counselor/directory' },
        { name: 'Select Counselor', path: '/counselor/select' },
        ...(isCounselor ? [
          { name: 'Counselor Dashboard', path: '/counselor/dashboard' },
          { name: 'My Students', path: '/counselor/students' }
        ] : [])
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
  ]

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

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

  const handleSubmenuClick = (subItem) => {
    if (subItem.submenu) {
      // Handle nested submenu expansion
      const nestedId = `${subItem.name.toLowerCase().replace(/\s+/g, '-')}`
      toggleExpanded(nestedId)
    } else if (subItem.path) {
      navigate(subItem.path)
      if (onMobileMenuClose) {
        onMobileMenuClose()
      }
    }
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-gradient-to-b from-white via-purple-50/30 to-cyan-50/30 border-r border-gray-200 transition-all duration-300 h-screen backdrop-blur-sm">
        <div className="p-6 flex-1 overflow-y-auto">
          <div 
            className="flex items-center mb-6 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          >
            <div className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg p-2 font-bold text-lg mr-3 shadow-lg">
              SK
            </div>
            <span className="text-xl font-bold text-gray-800">StudentKonnect</span>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => handleItemClick(item)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
                    isActive(item.path) 
                      ? 'bg-purple-100 text-purple-700 border-l-4 border-purple-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 mr-3" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center">
                    {item.badge && (
                      <Badge 
                        variant="secondary" 
                        className={`mr-2 text-xs font-semibold ${
                          item.badge === 'New' 
                            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200 shadow-sm' 
                            : 'bg-gradient-to-r from-purple-100 to-cyan-100 text-purple-700 border border-purple-200 shadow-sm'
                        }`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                    {item.submenu && (
                      expandedItems[item.id] ? 
                        <ChevronDown className="h-4 w-4" /> : 
                        <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                </button>
                
                {item.submenu && expandedItems[item.id] && (
                  <div className="ml-8 mt-2 space-y-1">
                    {item.submenu.map((subItem, index) => (
                      <div key={index}>
                        <button
                          onClick={() => handleSubmenuClick(subItem)}
                          className={`w-full flex items-center justify-between px-4 py-2 text-sm rounded-md transition-colors ${
                            isActive(subItem.path)
                              ? 'bg-purple-50 text-purple-600'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center">
                            <span>{subItem.name}</span>
                            {subItem.badge && (
                              <Badge 
                                variant="secondary" 
                                className="ml-2 text-xs bg-gray-100 text-gray-600"
                              >
                                {subItem.badge}
                              </Badge>
                            )}
                          </div>
                          {subItem.submenu && (
                            expandedItems[`${subItem.name.toLowerCase().replace(/\s+/g, '-')}`] ? 
                              <ChevronDown className="h-3 w-3" /> : 
                              <ChevronRight className="h-3 w-3" />
                          )}
                        </button>
                        
                        {subItem.submenu && expandedItems[`${subItem.name.toLowerCase().replace(/\s+/g, '-')}`] && (
                          <div className="ml-6 mt-1 space-y-1">
                            {subItem.submenu.map((nestedItem, nestedIndex) => (
                              <button
                                key={nestedIndex}
                                onClick={() => navigate(nestedItem.path)}
                                className={`w-full text-left px-3 py-1 text-xs rounded-md transition-colors ${
                                  isActive(nestedItem.path)
                                    ? 'bg-purple-50 text-purple-600'
                                    : 'text-gray-500 hover:bg-gray-50'
                                }`}
                              >
                                {nestedItem.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={onMobileMenuClose}></div>
          
          <div className="fixed top-0 left-0 bottom-0 w-80 bg-gradient-to-b from-white via-purple-50/30 to-cyan-50/30 shadow-xl backdrop-blur-sm">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div 
                className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => {
                  navigate('/')
                  onMobileMenuClose()
                }}
              >
                <div className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg p-2 font-bold text-lg mr-3 shadow-lg">
                  SK
                </div>
                <span className="text-xl font-bold text-gray-800">StudentKonnect</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onMobileMenuClose}
                className="p-2"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex-1 p-6 overflow-y-auto" style={{ height: 'calc(100vh - 100px)' }}>
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={() => handleItemClick(item)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
                        isActive(item.path) 
                          ? 'bg-purple-100 text-purple-700 border-l-4 border-purple-600' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className="h-5 w-5 mr-3" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center">
                        {item.badge && (
                          <Badge 
                            variant="secondary" 
                            className={`mr-2 text-xs ${
                              item.badge === 'New' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {item.badge}
                          </Badge>
                        )}
                        {item.submenu && (
                          expandedItems[item.id] ? 
                            <ChevronDown className="h-4 w-4" /> : 
                            <ChevronRight className="h-4 w-4" />
                        )}
                      </div>
                    </button>
                    
                    {item.submenu && expandedItems[item.id] && (
                      <div className="ml-8 mt-2 space-y-1">
                        {item.submenu.map((subItem, index) => (
                          <div key={index}>
                            <button
                              onClick={() => handleSubmenuClick(subItem)}
                              className={`w-full flex items-center justify-between px-4 py-2 text-sm rounded-md transition-colors ${
                                isActive(subItem.path)
                                  ? 'bg-purple-50 text-purple-600'
                                  : 'text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center">
                                <span>{subItem.name}</span>
                                {subItem.badge && (
                                  <Badge 
                                    variant="secondary" 
                                    className="ml-2 text-xs bg-gray-100 text-gray-600"
                                  >
                                    {subItem.badge}
                                  </Badge>
                                )}
                              </div>
                              {subItem.submenu && (
                                expandedItems[`${subItem.name.toLowerCase().replace(/\s+/g, '-')}`] ? 
                                  <ChevronDown className="h-3 w-3" /> : 
                                  <ChevronRight className="h-3 w-3" />
                              )}
                            </button>
                            
                            {subItem.submenu && expandedItems[`${subItem.name.toLowerCase().replace(/\s+/g, '-')}`] && (
                              <div className="ml-6 mt-1 space-y-1">
                                {subItem.submenu.map((nestedItem, nestedIndex) => (
                                  <button
                                    key={nestedIndex}
                                    onClick={() => {
                                      navigate(nestedItem.path)
                                      onMobileMenuClose()
                                    }}
                                    className={`w-full text-left px-3 py-1 text-xs rounded-md transition-colors ${
                                      isActive(nestedItem.path)
                                        ? 'bg-purple-50 text-purple-600'
                                        : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                                  >
                                    {nestedItem.name}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

