import React, { useState, useEffect } from 'react'
import { Search, User, Settings, Globe, GraduationCap, BookOpen, Star, ChevronDown, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { realDatabaseService } from '../services/realDatabaseService'

const Header = () => {
  const navigate = useNavigate()
  const { isAuthenticated, user, userRole, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [dropdownStates, setDropdownStates] = useState({
    destinations: false,
    universities: false,
    courses: false,
    featured: false
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

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const fetchDropdownData = async () => {
    try {
      setLoading(true)
      
      // Fetch countries for Study Destinations
      const countriesResult = await realDatabaseService.getAllCountries()
      if (countriesResult.data) {
        const formattedCountries = countriesResult.data.map(country => ({
          id: country.country_id,
          name: country.country_name,
          flag: country.flag_url || '🌍'
        }))
        setCountries(formattedCountries.slice(0, 8)) // Limit to 8 countries
      }

      // Fetch universities
      const universitiesResult = await realDatabaseService.getAllUniversities()
      if (universitiesResult.data) {
        const formattedUniversities = universitiesResult.data.map(uni => ({
          id: uni.university_id,
          name: uni.university_name,
          location: uni.location || uni.country_name || 'Global',
          logo: uni.logo_url
        }))
        setUniversities(formattedUniversities.slice(0, 5)) // Limit to 5 universities
      }

      // Fetch courses
      const coursesResult = await realDatabaseService.getAllCourses()
      if (coursesResult.data) {
        const formattedCourses = coursesResult.data.map(course => ({
          id: course.course_id,
          name: course.course_name,
          category: course.category || 'General',
          duration: course.duration
        }))
        setCourses(formattedCourses.slice(0, 5)) // Limit to 5 courses
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
      featured: false
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

  return (
    <>
      {/* Top Navigation Bar - Purple Gradient with Dropdowns - Hidden on Mobile */}
      <div className="hidden md:block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-2 shadow-lg relative z-[10000]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-6">
              
              {/* Study Destinations Dropdown - EXACT */}
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('destinations')}
                  className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm text-xs sm:text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                    <path d="M2 12h20"></path>
                  </svg>
                  <span className="font-medium hidden sm:inline">Study Destinations</span>
                  <span className="font-medium sm:hidden">Destinations</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-chevron-down h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-200 ${dropdownStates.destinations ? 'rotate-180' : ''}`} aria-hidden="true">
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
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
                          {country.flag} {country.name}
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
                
                {/* Universities Dropdown - EXACT */}
                <div className="relative">
                  <button 
                    onClick={() => toggleDropdown('universities')}
                    className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap h-4 w-4" aria-hidden="true">
                      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
                      <path d="M22 10v6"></path>
                      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
                    </svg>
                    <span>850+ Universities</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-chevron-down h-3 w-3 transition-transform duration-200 ${dropdownStates.universities ? 'rotate-180' : ''}`} aria-hidden="true">
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
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
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap h-4 w-4 text-purple-600" aria-hidden="true">
                                <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
                                <path d="M22 10v6"></path>
                                <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
                              </svg>
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

                {/* Courses Dropdown - EXACT */}
                <div className="relative">
                  <button 
                    onClick={() => toggleDropdown('courses')}
                    className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open h-4 w-4" aria-hidden="true">
                      <path d="M12 7v14"></path>
                      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                    </svg>
                    <span>8500+ Courses</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-chevron-down h-3 w-3 transition-transform duration-200 ${dropdownStates.courses ? 'rotate-180' : ''}`} aria-hidden="true">
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
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
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open h-4 w-4 text-blue-600" aria-hidden="true">
                                <path d="M12 7v14"></path>
                                <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                              </svg>
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

            {/* Featured Dropdown - EXACT */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('featured')}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm text-xs sm:text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true">
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                </svg>
                <span className="font-medium">Featured</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-chevron-down h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-200 ${dropdownStates.featured ? 'rotate-180' : ''}`} aria-hidden="true">
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap h-4 w-4 text-purple-600" aria-hidden="true">
                              <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
                              <path d="M22 10v6"></path>
                              <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open h-4 w-4 text-blue-600" aria-hidden="true">
                              <path d="M12 7v14"></path>
                              <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                            </svg>
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
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
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
          <div className="flex items-center space-x-1 md:space-x-4">
            {isAuthenticated() ? (
              <div className="flex items-center space-x-1 md:space-x-4">
                {/* User Greeting */}
                <div className="hidden lg:flex items-center space-x-2 text-purple-600 font-medium">
                  <User className="w-5 h-5" />
                  <span>Hi {user?.name || user?.email?.split('@')[0] || 'User'}</span>
                </div>
                
                {/* Logout Button */}
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 md:space-x-2 text-red-600 hover:text-red-700 font-medium px-1 md:px-4 py-2 rounded-lg hover:bg-red-50 transition-all duration-300 text-xs md:text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => navigate('/signin')}
                className="flex items-center space-x-1 md:space-x-2 text-purple-600 hover:text-purple-700 font-medium px-1 md:px-4 py-2 rounded-lg hover:bg-purple-50 transition-all duration-300 text-xs md:text-sm"
              >
                <User className="w-4 h-4" />
                <span className="hidden md:inline">Sign In</span>
              </button>
            )}
            
            <button 
              onClick={() => navigate('/admin')}
              className="flex items-center space-x-1 md:space-x-2 bg-purple-600 text-white px-1 md:px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors shadow-md text-xs md:text-sm"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden md:inline">Admin</span>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay to close dropdowns when clicking outside */}
      {(dropdownStates.destinations || dropdownStates.universities || dropdownStates.courses || dropdownStates.featured) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={closeAllDropdowns}
        />
      )}
    </>
  )
}

export default Header

