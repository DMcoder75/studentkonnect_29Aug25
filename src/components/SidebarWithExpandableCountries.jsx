import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Home, 
  Globe, 
  MapPin, 
  Users, 
  TrendingUp, 
  Send, 
  Award, 
  Plane, 
  HelpCircle,
  ChevronRight,
  ChevronDown,
  GraduationCap,
  BookOpen
} from 'lucide-react'
import { realDatabaseService } from '../services/realDatabaseService'

export default function SidebarWithExpandableCountries() {
  const navigate = useNavigate()
  const [expandedItems, setExpandedItems] = useState({})
  const [countries, setCountries] = useState([])
  const [stats, setStats] = useState({
    universities: 0,
    courses: 0,
    pathways: 0
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch countries and statistics
        const [countriesResult, statsResult] = await Promise.all([
          realDatabaseService.getAllCountries(),
          realDatabaseService.getStatistics()
        ])

        if (countriesResult.data) {
          setCountries(countriesResult.data)
        }

        setStats({
          universities: statsResult.universities || 866,
          courses: statsResult.courses || 1000,
          pathways: statsResult.pathways || 2400
        })
      } catch (error) {
        console.error('Error fetching sidebar data:', error)
      }
    }

    fetchData()
  }, [])

  const toggleExpanded = (item) => {
    setExpandedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }))
  }

  const handleCountryClick = (countryId, type = 'universities') => {
    if (type === 'universities') {
      navigate(`/global/universities?country=${countryId}`)
    } else if (type === 'courses') {
      navigate(`/global/courses?country=${countryId}`)
    }
  }

  const menuItems = [
    {
      id: 'home',
      icon: Home,
      label: 'Home',
      path: '/',
      color: 'text-purple-600'
    },
    {
      id: 'all-universities',
      icon: GraduationCap,
      label: 'All Universities',
      color: 'text-blue-600',
      expandable: true,
      count: stats.universities,
      subItems: [
        { label: 'All Countries', path: '/global/universities', isAllCountries: true },
        ...countries.map(country => ({
          label: country.country_name,
          countryId: country.country_id,
          onClick: () => handleCountryClick(country.country_id, 'universities')
        }))
      ]
    },
    {
      id: 'all-courses',
      icon: BookOpen,
      label: 'All Courses',
      color: 'text-pink-600',
      expandable: true,
      count: stats.courses,
      subItems: [
        { label: 'All Countries', path: '/global/courses', isAllCountries: true },
        ...countries.map(country => ({
          label: country.country_name,
          countryId: country.country_id,
          onClick: () => handleCountryClick(country.country_id, 'courses')
        }))
      ]
    },
    {
      id: 'australia-process',
      icon: MapPin,
      label: 'Australia Process',
      color: 'text-green-600',
      expandable: true,
      subItems: [
        { label: 'Application Process', path: '/australia/application' },
        { label: 'Visa Requirements', path: '/australia/visa' },
        { label: 'Living in Australia', path: '/australia/living' }
      ]
    },
    {
      id: 'find-counselors',
      icon: Users,
      label: 'Find Counselors',
      path: '/counselor/directory',
      color: 'text-pink-600'
    },
    {
      id: 'career-insights',
      icon: TrendingUp,
      label: 'Career Insights',
      path: '/career-insights',
      color: 'text-orange-600'
    },
    {
      id: 'smart-apply',
      icon: Send,
      label: 'Smart Apply',
      color: 'text-indigo-600',
      expandable: true,
      subItems: [
        { label: 'Application Tracker', path: '/smart-apply/tracker' },
        { label: 'Document Manager', path: '/smart-apply/documents' },
        { label: 'Deadline Calendar', path: '/smart-apply/calendar' }
      ]
    },
    {
      id: 'scholarships-assist',
      icon: Award,
      label: 'Scholarships Assist',
      path: '/scholarship-finder',
      color: 'text-yellow-600'
    },
    {
      id: 'visa-international',
      icon: Plane,
      label: 'Visa & International Students',
      color: 'text-teal-600',
      expandable: true,
      subItems: [
        { label: 'Visa Guide', path: '/visa/guide' },
        { label: 'International Support', path: '/visa/support' },
        { label: 'Pre-departure', path: '/visa/predeparture' }
      ]
    },
    {
      id: 'help-resources',
      icon: HelpCircle,
      label: 'Help & Resources',
      color: 'text-gray-600',
      expandable: true,
      subItems: [
        { label: 'Help Center', path: '/help-center' },
        { label: 'FAQ', path: '/faq' },
        { label: 'Contact Us', path: '/contact-us' },
        { label: 'Live Chat', path: '/chat' }
      ]
    }
  ]

  return (
    <div className="w-64 bg-white h-screen shadow-lg border-r border-gray-200 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">SK</span>
          </div>
          <span className="text-lg font-bold text-gray-900">StudentKonnect</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-3">
          {menuItems.map((item) => (
            <div key={item.id}>
              {/* Main Menu Item */}
              <div
                onClick={() => {
                  if (item.expandable) {
                    toggleExpanded(item.id)
                  } else if (item.path) {
                    navigate(item.path)
                  }
                }}
                className={`
                  flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200
                  hover:bg-gray-50 group
                  ${item.path === window.location.pathname ? 'bg-purple-50 border-r-2 border-purple-600' : ''}
                `}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                  <div className="flex flex-col">
                    <span className="text-gray-700 font-medium group-hover:text-gray-900">
                      {item.label}
                    </span>
                    {item.count && (
                      <span className="text-xs text-gray-500">
                        {item.count}+
                      </span>
                    )}
                  </div>
                </div>
                
                {item.expandable && (
                  <div className="text-gray-400 group-hover:text-gray-600">
                    {expandedItems[item.id] ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                )}
              </div>

              {/* Submenu Items */}
              {item.expandable && expandedItems[item.id] && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.subItems?.map((subItem, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        if (subItem.onClick) {
                          subItem.onClick()
                        } else if (subItem.path) {
                          navigate(subItem.path)
                        }
                      }}
                      className={`
                        px-3 py-2 rounded-lg cursor-pointer transition-all duration-200
                        hover:bg-gray-50 text-sm text-gray-600 hover:text-gray-900
                        ${subItem.path === window.location.pathname ? 'bg-purple-50 text-purple-700 font-medium' : ''}
                        ${subItem.isAllCountries ? 'font-medium text-gray-700' : ''}
                      `}
                    >
                      {subItem.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => navigate('/counselor/directory')}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Find Counselor
        </button>
      </div>
    </div>
  )
}

