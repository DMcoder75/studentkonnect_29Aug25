import React, { useState, useEffect } from 'react'
import { Search, User, Settings, Globe, GraduationCap, BookOpen, Star, ChevronDown, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { realDatabaseService } from '../services/realDatabaseService'

const HeaderWithDropdowns = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [dropdownStates, setDropdownStates] = useState({
    destinations: false,
    universities: false,
    courses: false,
    featured: false,
    userMenu: false
  })
  
  // Data states
  const [countries, setCountries] = useState([])
  const [universities, setUniversities] = useState([])
  const [courses, setCourses] = useState([])
  const [featuredItems, setFeaturedItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchDropdownData()
  }, [])

  const fetchDropdownData = async () => {
    try {
      setLoading(true)
      
      // Fetch countries for Study Destinations
      const countriesResult = await realDatabaseService.getAllCountries()
      if (countriesResult.data) {
        setCountries(countriesResult.data.slice(0, 8)) // Limit to 8 countries
      }

      // Fetch universities
      const universitiesResult = await realDatabaseService.getAllUniversities()
      if (universitiesResult.data) {
        setUniversities(universitiesResult.data.slice(0, 10)) // Limit to 10 universities
      }

      // Fetch courses
      const coursesResult = await realDatabaseService.getAllCourses()
      if (coursesResult.data) {
        setCourses(coursesResult.data.slice(0, 10)) // Limit to 10 courses
      }

      // Featured items (mix of top universities and courses)
      if (universitiesResult.data && coursesResult.data) {
        const featured = [
          ...universitiesResult.data.slice(0, 5).map(uni => ({ ...uni, type: 'university' })),
          ...coursesResult.data.slice(0, 5).map(course => ({ ...course, type: 'course' }))
        ]
        setFeaturedItems(featured)
      }

    } catch (error) {
      console.error('Error fetching dropdown data:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleDropdown = (dropdown) => {
    setDropdownStates(prev => ({
      destinations: false,
      universities: false,
      courses: false,
      featured: false,
      [dropdown]: !prev[dropdown]
    }))
  }

  const closeAllDropdowns = () => {
    setDropdownStates({
      destinations: false,
      universities: false,
      courses: false,
      featured: false,
      userMenu: false
    })
  }

  const handleCountryClick = (country) => {
    navigate(`/global/universities?country=${encodeURIComponent(country.name)}`)
    closeAllDropdowns()
  }

  const handleUniversityClick = (university) => {
    navigate(`/university/${university.id}`)
    closeAllDropdowns()
  }

  const handleCourseClick = (course) => {
    navigate(`/global/courses?course=${encodeURIComponent(course.name)}`)
    closeAllDropdowns()
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    closeAllDropdowns()
  }

  return (
    <>
      {/* Top Navigation Bar - Purple Gradient with Dropdowns */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-2 shadow-lg relative z-[10000]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-6">
              
              {/* Study Destinations Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('destinations')}
                  className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm text-xs sm:text-sm"
                >
                  <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="font-medium hidden sm:inline">Study Destinations</span>
                  <span className="font-medium sm:hidden">Destinations</span>
                  <ChevronDown className={`h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-200 ${dropdownStates.destinations ? 'rotate-180' : ''}`} />
                </button>
                
                {dropdownStates.destinations && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-800 text-sm">Study Destinations</h3>
                    </div>
                    {loading ? (
                      <div className="px-4 py-2 text-gray-500 text-sm">Loading...</div>
                    ) : (
                      countries.map((country) => (
                        <button
                          key={country.id}
                          onClick={() => handleCountryClick(country)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm transition-colors"
                        >
                          🌍 {country.name}
                        </button>
                      ))
                    )}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button 
                        onClick={() => { navigate('/global/universities'); closeAllDropdowns(); }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-purple-600 text-sm font-medium"
                      >
                        View All Destinations →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4 text-sm">
                
                {/* Universities Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => toggleDropdown('universities')}
                    className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer"
                  >
                    <GraduationCap className="h-4 w-4" />
                    <span>866+ Universities</span>
                    <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${dropdownStates.universities ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {dropdownStates.universities && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-800 text-sm">Top Universities</h3>
                      </div>
                      {loading ? (
                        <div className="px-4 py-2 text-gray-500 text-sm">Loading...</div>
                      ) : (
                        universities.map((university) => (
                          <button
                            key={university.id}
                            onClick={() => handleUniversityClick(university)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm transition-colors"
                          >
                            <div className="flex items-center space-x-2">
                              <GraduationCap className="h-4 w-4 text-purple-600" />
                              <div>
                                <div className="font-medium">{university.name}</div>
                                <div className="text-xs text-gray-500">{university.location || 'Global'}</div>
                              </div>
                            </div>
                          </button>
                        ))
                      )}
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button 
                          onClick={() => { navigate('/global/universities'); closeAllDropdowns(); }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 text-purple-600 text-sm font-medium"
                        >
                          View All Universities →
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Courses Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => toggleDropdown('courses')}
                    className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>1000+ Courses</span>
                    <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${dropdownStates.courses ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {dropdownStates.courses && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-800 text-sm">Popular Courses</h3>
                      </div>
                      {loading ? (
                        <div className="px-4 py-2 text-gray-500 text-sm">Loading...</div>
                      ) : (
                        courses.map((course) => (
                          <button
                            key={course.id}
                            onClick={() => handleCourseClick(course)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm transition-colors"
                          >
                            <div className="flex items-center space-x-2">
                              <BookOpen className="h-4 w-4 text-blue-600" />
                              <div>
                                <div className="font-medium">{course.name}</div>
                                <div className="text-xs text-gray-500">{course.field || 'General'}</div>
                              </div>
                            </div>
                          </button>
                        ))
                      )}
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button 
                          onClick={() => { navigate('/global/courses'); closeAllDropdowns(); }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 text-purple-600 text-sm font-medium"
                        >
                          View All Courses →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Featured Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('featured')}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm text-xs sm:text-sm"
              >
                <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="font-medium">Featured</span>
                <ChevronDown className={`h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-200 ${dropdownStates.featured ? 'rotate-180' : ''}`} />
              </button>
              
              {dropdownStates.featured && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800 text-sm">Featured Items</h3>
                  </div>
                  {loading ? (
                    <div className="px-4 py-2 text-gray-500 text-sm">Loading...</div>
                  ) : (
                    featuredItems.map((item) => (
                      <button
                        key={`${item.type}-${item.id}`}
                        onClick={() => {
                          if (item.type === 'university') {
                            handleUniversityClick(item)
                          } else {
                            handleCourseClick(item)
                          }
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          {item.type === 'university' ? (
                            <GraduationCap className="h-4 w-4 text-purple-600" />
                          ) : (
                            <BookOpen className="h-4 w-4 text-blue-600" />
                          )}
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-gray-500">
                              {item.type === 'university' ? 'University' : 'Course'}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button 
                      onClick={() => { navigate('/featured'); closeAllDropdowns(); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-purple-600 text-sm font-medium"
                    >
                      View All Featured →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - White Background */}
      <header className="bg-white shadow-sm border-b border-gray-200 py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => navigate('/')}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">SK</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">StudentKonnect</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search universities, courses, pathways..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-16 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 text-gray-700"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              // Logged in user menu
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('userMenu')}
                  className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium px-4 py-2 rounded-lg hover:bg-purple-50 transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.full_name ? user.full_name.charAt(0) : (user.firstName ? user.firstName.charAt(0) : 'U')}
                  </div>
                  <span>Hi, {user.full_name || user.firstName || user.name}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${dropdownStates.userMenu ? 'rotate-180' : ''}`} />
                </button>
                
                {dropdownStates.userMenu && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.full_name ? user.full_name.charAt(0) : (user.firstName ? user.firstName.charAt(0) : 'U')}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{user.full_name || user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => { navigate('/student/profile'); closeAllDropdowns(); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm transition-colors flex items-center space-x-2"
                    >
                      <User className="h-4 w-4" />
                      <span>My Profile</span>
                    </button>
                    
                    <button
                      onClick={() => { navigate('/student/dashboard'); closeAllDropdowns(); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm transition-colors flex items-center space-x-2"
                    >
                      <Settings className="h-4 w-4" />
                      <span>My Dashboard</span>
                    </button>
                    
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600 text-sm transition-colors flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Not logged in - show sign in button
              <button 
                onClick={() => navigate('/signin')}
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium px-4 py-2 rounded-lg hover:bg-purple-50 transition-all duration-300"
              >
                <User className="w-5 h-5" />
                <span>Sign In</span>
              </button>
            )}
            
            <button 
              onClick={() => navigate('/admin')}
              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors shadow-md"
            >
              <Settings className="w-4 h-4" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay to close dropdowns when clicking outside */}
      {(dropdownStates.destinations || dropdownStates.universities || dropdownStates.courses || dropdownStates.featured || dropdownStates.userMenu) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={closeAllDropdowns}
        />
      )}
    </>
  )
}

export default HeaderWithDropdowns

