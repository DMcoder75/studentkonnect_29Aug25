import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, Globe, GraduationCap, BookOpen, TrendingUp, Star, Award, Crown } from 'lucide-react'

export default function HelperMenu() {
  const navigate = useNavigate()
  const [showCountriesMenu, setShowCountriesMenu] = useState(false)
  const [showFeaturedMenu, setShowFeaturedMenu] = useState(false)
  const countriesRef = useRef(null)
  const featuredRef = useRef(null)

  // Countries data with flags and statistics
  const countries = [
    {
      id: 1,
      name: 'United States',
      code: 'US',
      flag: '🇺🇸',
      universities: 450,
      courses: 2500,
      pathways: 850,
      featured: true
    },
    {
      id: 2,
      name: 'United Kingdom',
      code: 'UK',
      flag: '🇬🇧',
      universities: 165,
      courses: 1200,
      pathways: 420,
      featured: true
    },
    {
      id: 3,
      name: 'Canada',
      code: 'CA',
      flag: '🇨🇦',
      universities: 96,
      courses: 800,
      pathways: 350,
      featured: true
    },
    {
      id: 4,
      name: 'Australia',
      code: 'AU',
      flag: '🇦🇺',
      universities: 43,
      courses: 650,
      pathways: 280,
      featured: true
    },
    {
      id: 5,
      name: 'Germany',
      code: 'DE',
      flag: '🇩🇪',
      universities: 120,
      courses: 900,
      pathways: 380,
      featured: true
    },
    {
      id: 6,
      name: 'Switzerland',
      code: 'CH',
      flag: '🇨🇭',
      universities: 25,
      courses: 300,
      pathways: 150,
      featured: true
    },
    {
      id: 7,
      name: 'Singapore',
      code: 'SG',
      flag: '🇸🇬',
      universities: 15,
      courses: 200,
      pathways: 120,
      featured: true
    },
    {
      id: 8,
      name: 'Netherlands',
      code: 'NL',
      flag: '🇳🇱',
      universities: 35,
      courses: 400,
      pathways: 180,
      featured: true
    }
  ]

  // Featured items data
  const featuredItems = {
    universities: [
      { name: 'Harvard University', country: 'United States', ranking: 1, type: 'Ivy League' },
      { name: 'University of Oxford', country: 'United Kingdom', ranking: 2, type: 'Russell Group' },
      { name: 'Stanford University', country: 'United States', ranking: 3, type: 'Private Research' },
      { name: 'University of Cambridge', country: 'United Kingdom', ranking: 4, type: 'Russell Group' },
      { name: 'MIT', country: 'United States', ranking: 5, type: 'Private Research' }
    ],
    courses: [
      { name: 'Computer Science', universities: 450, countries: 8, trending: true },
      { name: 'Medicine', universities: 320, countries: 8, trending: true },
      { name: 'Business Administration', universities: 380, countries: 8, trending: false },
      { name: 'Engineering', universities: 420, countries: 8, trending: true },
      { name: 'Law', universities: 280, countries: 7, trending: false }
    ],
    pathways: [
      { name: 'Medical Career Pathway', universities: 320, duration: '6-8 years', popular: true },
      { name: 'Tech Innovation Track', universities: 450, duration: '4-6 years', popular: true },
      { name: 'Business Leadership Path', universities: 380, duration: '4-5 years', popular: false },
      { name: 'Legal Professional Route', universities: 280, duration: '7-9 years', popular: false },
      { name: 'Research & Academia', universities: 200, duration: '8-12 years', popular: true }
    ]
  }

  // Close menus when clicking outside or when modals are open
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countriesRef.current && !countriesRef.current.contains(event.target)) {
        setShowCountriesMenu(false)
      }
      if (featuredRef.current && !featuredRef.current.contains(event.target)) {
        setShowFeaturedMenu(false)
      }
    }

    // Close dropdowns when any modal or overlay is detected
    const handleModalOpen = () => {
      const hasModal = document.querySelector('.fixed.inset-0') || 
                      document.querySelector('[role="dialog"]') ||
                      document.querySelector('.modal') ||
                      document.querySelector('.overlay')
      
      if (hasModal) {
        setShowCountriesMenu(false)
        setShowFeaturedMenu(false)
      }
    }

    // Check for modals periodically
    const modalCheckInterval = setInterval(handleModalOpen, 100)

    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      clearInterval(modalCheckInterval)
    }
  }, [])

  const handleCountryClick = (country) => {
    navigate(`/global/universities?country=${country.id}`)
    setShowCountriesMenu(false)
  }

  const handleFeaturedItemClick = (item, type) => {
    if (type === 'universities') {
      navigate(`/universities?search=${encodeURIComponent(item.name)}`)
    } else if (type === 'courses') {
      navigate(`/courses?search=${encodeURIComponent(item.name)}`)
    } else if (type === 'pathways') {
      navigate(`/pathways?search=${encodeURIComponent(item.name)}`)
    }
    setShowFeaturedMenu(false)
  }

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-2 shadow-lg relative z-40">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Left side - Countries Menu */}
          <div className="flex items-center space-x-2 sm:space-x-6">
            <div className="relative" ref={countriesRef}>
              <button
                onClick={() => setShowCountriesMenu(!showCountriesMenu)}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm text-xs sm:text-sm"
              >
                <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="font-medium hidden sm:inline">Study Destinations</span>
                <span className="font-medium sm:hidden">Destinations</span>
                <ChevronDown className={`h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-200 ${showCountriesMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Countries Dropdown */}
              {showCountriesMenu && (
                <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white text-gray-800 rounded-xl shadow-2xl z-[100] border border-gray-200 max-h-96 overflow-y-auto">
                  <div className="p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
                      <Globe className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-indigo-600" />
                      Global Study Destinations
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {countries.map((country) => (
                        <div
                          key={country.id}
                          onClick={() => handleCountryClick(country)}
                          className="flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 group"
                        >
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <span className="text-lg sm:text-2xl">{country.flag}</span>
                            <div>
                              <div className="font-semibold text-gray-800 group-hover:text-indigo-600 text-sm sm:text-base">
                                {country.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {country.universities} universities • {country.courses} courses
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-gray-400">
                            <GraduationCap className="h-3 w-3" />
                            <span>{country.universities}</span>
                            <BookOpen className="h-3 w-3 ml-1 sm:ml-2" />
                            <span>{country.courses}</span>
                            <TrendingUp className="h-3 w-3 ml-1 sm:ml-2" />
                            <span>{country.pathways}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Globe className="h-4 w-4" />
                <span>8+ Countries</span>
              </div>
              <div className="flex items-center space-x-1">
                <GraduationCap className="h-4 w-4" />
                <span>850+ Universities</span>
              </div>
              <div className="flex items-center space-x-1">
                <BookOpen className="h-4 w-4" />
                <span>8500+ Courses</span>
              </div>
            </div>
          </div>

          {/* Right side - Featured Menu */}
          <div className="relative" ref={featuredRef}>
            <button
              onClick={() => setShowFeaturedMenu(!showFeaturedMenu)}
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm text-xs sm:text-sm"
            >
              <Star className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="font-medium">Featured</span>
              <ChevronDown className={`h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-200 ${showFeaturedMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* Featured Dropdown */}
            {showFeaturedMenu && (
              <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white text-gray-800 rounded-xl shadow-2xl z-[100] border border-gray-200 max-h-96 overflow-y-auto">
                <div className="p-3 sm:p-4">
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
                    <Crown className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-yellow-500" />
                    Featured Content
                  </h3>

                  {/* Featured Universities */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-sm font-semibold text-indigo-600 mb-2 sm:mb-3 flex items-center">
                      <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      Top Universities
                    </h4>
                    <div className="space-y-2">
                      {featuredItems.universities.slice(0, 3).map((uni, index) => (
                        <div
                          key={index}
                          onClick={() => handleFeaturedItemClick(uni, 'universities')}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200"
                        >
                          <div>
                            <div className="font-medium text-xs sm:text-sm">{uni.name}</div>
                            <div className="text-xs text-gray-500">{uni.country} • {uni.type}</div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Award className="h-3 w-3 text-yellow-500" />
                            <span className="text-xs font-semibold">#{uni.ranking}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-pink-600 mb-3 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Popular Courses
                    </h4>
                    <div className="space-y-2">
                      {featuredItems.courses.slice(0, 3).map((course, index) => (
                        <div
                          key={index}
                          onClick={() => handleFeaturedItemClick(course, 'courses')}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200"
                        >
                          <div>
                            <div className="font-medium text-sm">{course.name}</div>
                            <div className="text-xs text-gray-500">{course.universities} universities</div>
                          </div>
                          {course.trending && (
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="h-3 w-3 text-green-500" />
                              <span className="text-xs text-green-600 font-medium">Trending</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Featured Pathways */}
                  <div>
                    <h4 className="text-sm font-semibold text-cyan-600 mb-3 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Career Pathways
                    </h4>
                    <div className="space-y-2">
                      {featuredItems.pathways.slice(0, 3).map((pathway, index) => (
                        <div
                          key={index}
                          onClick={() => handleFeaturedItemClick(pathway, 'pathways')}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200"
                        >
                          <div>
                            <div className="font-medium text-sm">{pathway.name}</div>
                            <div className="text-xs text-gray-500">{pathway.duration} • {pathway.universities} unis</div>
                          </div>
                          {pathway.popular && (
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span className="text-xs text-yellow-600 font-medium">Popular</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

