import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
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
  X
} from 'lucide-react'

export default function Sidebar({ isOpen, onClose, isHomepage, isMobileMenuOpen, onMobileMenuClose }) {
  const [expandedItems, setExpandedItems] = useState({})
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  const menuItems = [
    {
      id: 'home',
      name: 'Home',
      path: '/',
      icon: Home,
      badge: null
    },
    {
      id: 'universities',
      name: 'Universities',
      icon: GraduationCap,
      badge: '84',
      submenu: [
        { name: 'All Universities', path: '/universities' },
        { name: 'Group of Eight', path: '/universities?type=go8' },
        { name: 'Technology Network', path: '/universities?type=tech' },
        { name: 'Regional Universities', path: '/universities?type=regional' }
      ]
    },
    {
      id: 'pathways',
      name: 'Pathways',
      icon: Route,
      badge: '407',
      submenu: [
        { name: 'All Pathways', path: '/pathways' },
        { name: 'Business & Finance', path: '/pathways?category=business' },
        { name: 'Engineering & Tech', path: '/pathways?category=engineering' },
        { name: 'Health & Medicine', path: '/pathways?category=health' },
        { name: 'Arts & Creative', path: '/pathways?category=arts' }
      ]
    },
    {
      id: 'courses',
      name: 'Courses',
      icon: BookOpen,
      badge: '1000+',
      submenu: [
        { name: 'All Courses', path: '/courses' },
        { name: 'Undergraduate', path: '/courses?level=undergraduate' },
        { name: 'Postgraduate', path: '/courses?level=postgraduate' },
        { name: 'Research', path: '/courses?level=research' }
      ]
    },
    {
      id: 'atar-calculator',
      name: 'ATAR Calculator',
      path: '/atar-calculator',
      icon: Calculator,
      badge: 'New'
    },
    {
      id: 'career-insights',
      name: 'Career Insights',
      path: '/career-insights',
      icon: TrendingUp,
      badge: null
    },
    ...(isAuthenticated() ? [{
      id: 'profile',
      name: 'Profile',
      path: '/profile',
      icon: User,
      badge: null
    }] : [])
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

  const handleSubmenuClick = (path) => {
    navigate(path)
    if (onMobileMenuClose) {
      onMobileMenuClose()
    }
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-white border-r border-gray-200 transition-all duration-300">
        <div className="p-6">
          <div 
            className="flex items-center mb-6 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          >
            <div className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg p-2 font-bold text-lg mr-3">
              UP
            </div>
            <span className="text-xl font-bold text-gray-800">Your Uni Pathway</span>
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
                      <button
                        key={index}
                        onClick={() => handleSubmenuClick(subItem.path)}
                        className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${
                          isActive(subItem.path)
                            ? 'bg-purple-50 text-purple-600'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {subItem.name}
                      </button>
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
          
          <div className="fixed top-0 left-0 bottom-0 w-80 bg-white shadow-xl">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div 
                className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => {
                  navigate('/')
                  onMobileMenuClose()
                }}
              >
                <div className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg p-2 font-bold text-lg mr-3">
                  UP
                </div>
                <span className="text-xl font-bold text-gray-800">Your Uni Pathway</span>
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
            <div className="p-6 overflow-y-auto h-full">
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
                          <button
                            key={index}
                            onClick={() => handleSubmenuClick(subItem.path)}
                            className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${
                              isActive(subItem.path)
                                ? 'bg-purple-50 text-purple-600'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {subItem.name}
                          </button>
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

