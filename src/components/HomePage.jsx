import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, TrendingUp, Users, BookOpen, GraduationCap, Star, Heart, Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Send, ChevronDown, Search, Target, Building, Globe } from 'lucide-react'
import Sidebar from './Sidebar'
import MobileHeader from './MobileHeader'
import MobileMenu from './MobileMenu'
import { globalEducationService } from '../services/globalEducationService'
import { statisticsService } from '../services/statisticsService'

// Custom CSS for animations
const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
  
  @keyframes float-delayed {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(-180deg); }
  }
  
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-float-delayed {
    animation: float-delayed 8s ease-in-out infinite;
    animation-delay: 2s;
  }
  
  .animate-spin-slow {
    animation: spin-slow 8s linear infinite;
  }
  
  .gradient-text {
    background: linear-gradient(135deg, #8b5cf6, #06b6d4, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .glass-effect {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  
  .hover-lift {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(139, 92, 246, 0.2);
  }
`

export default function HomePage({ isMobileMenuOpen, onMobileMenuClose, onMobileMenuOpen }) {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [universities, setUniversities] = useState([])
  const [pathways, setPathways] = useState([])
  const [favorites, setFavorites] = useState([])
  const [countries, setCountries] = useState([])
  const [stats, setStats] = useState({
    totalCountries: '8+',
    totalUniversities: '866+',
    totalCourses: '15K+',
    totalPathways: '5+',
    totalCareerPaths: '24+'
  })
  const [loading, setLoading] = useState(true)
  const [selectedProfession, setSelectedProfession] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedUniversity, setSelectedUniversity] = useState('')
  const [countryUniversities, setCountryUniversities] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        console.log('🔍 Fetching real statistics from database...')
        
        // Fetch real statistics from database
        const realStats = await statisticsService.getHomePageStatistics()
        console.log('📊 Raw statistics from database:', realStats)
        
        // Format the statistics for display
        const formattedStats = {
          totalCountries: statisticsService.formatNumber(realStats.countries),
          totalUniversities: statisticsService.formatNumber(realStats.universities),
          totalCourses: statisticsService.formatNumber(realStats.courses),
          totalPathways: statisticsService.formatNumber(realStats.pathways),
          totalCareerPaths: statisticsService.formatNumber(realStats.careerPaths)
        }
        
        console.log('🎯 Formatted statistics for display:', formattedStats)
        
        // Fetch other data in parallel
        const [universitiesData, pathwaysData, countriesData] = await Promise.all([
          globalEducationService.getAllUniversities(),
          globalEducationService.getAllPathways(),
          globalEducationService.getAllCountries()
        ])

        setUniversities(universitiesData || [])
        setPathways(pathwaysData || [])
        setCountries(countriesData || [])
        setStats(formattedStats)
        
        console.log('✅ Statistics updated in state:', formattedStats)
        
        // Load favorites from localStorage
        const savedFavorites = JSON.parse(localStorage.getItem('favoriteUniversities') || '[]')
        setFavorites(savedFavorites)
        
      } catch (error) {
        console.error('❌ Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Computed value for filtered universities
  const filteredUniversities = selectedCountry ? countryUniversities : []

  // Journey form handlers
  const handleCountryChange = (country) => {
    setSelectedCountry(country)
    setSelectedUniversity('') // Reset university when country changes
    
    // Filter universities by country (simplified mapping)
    const countryUniversityMap = {
      'United States': ['Harvard University', 'Stanford University', 'MIT', 'Yale University'],
      'United Kingdom': ['University of Oxford', 'University of Cambridge', 'Imperial College London', 'UCL'],
      'Canada': ['University of Toronto', 'McGill University', 'University of British Columbia', 'University of Waterloo'],
      'Australia': ['University of Melbourne', 'University of Sydney', 'Australian National University', 'UNSW Sydney'],
      'Germany': ['Technical University of Munich', 'Heidelberg University', 'Humboldt University', 'RWTH Aachen'],
      'Switzerland': ['ETH Zurich', 'University of Zurich', 'EPFL', 'University of Geneva'],
      'Singapore': ['National University of Singapore', 'Nanyang Technological University'],
      'Netherlands': ['University of Amsterdam', 'Delft University of Technology', 'Leiden University']
    }
    
    setCountryUniversities(countryUniversityMap[country] || [])
  }

  const handleStartJourney = () => {
    if (!selectedProfession) {
      alert('Please select a profession to continue')
      return
    }
    
    // Navigate to results page with selected parameters
    const params = new URLSearchParams({
      profession: selectedProfession,
      country: selectedCountry || '',
      university: selectedUniversity || ''
    })
    
    navigate(`/journey-results?${params.toString()}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Inject Custom CSS */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Mobile Header */}
      <MobileHeader onMobileMenuOpen={() => setMobileMenuOpen(true)} />
      
      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
      
      {/* Hero Section - Full Width, No Sidebar */}
      <section className="hero-section relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-4 w-full h-[320px] flex items-center mt-12 md:mt-0">
        {/* Background Image Overlay with 70% transparency */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(/HeroUniPathway.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="relative min-h-[280px] sm:min-h-[300px] flex items-center">
              {/* Full Width Text Content */}
              <div className="w-full text-center">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent animate-pulse">
                  Find Your Perfect
                  <br />
                  <span className="text-yellow-300">Global University</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 text-purple-100 max-w-4xl mx-auto px-2">
                  Discover your ideal university course through personalized pathways worldwide. 
                  Connect your passions with career opportunities at top universities globally.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                  <button 
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                    onClick={() => scrollToSection('pathways')}
                  >
                    Explore Pathways <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button 
                    className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-purple-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                    onClick={() => scrollToSection('universities')}
                  >
                    Browse Universities
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className="flex">
        <Sidebar isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={onMobileMenuClose} />
        
        {/* Main Content - Full width on mobile */}
        <main className="main-content flex-1 w-full transition-all duration-300 min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 py-8">
            
            {/* Global Statistics Section */}
            <section id="statistics" className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                  🌸 Global Education at Your Fingertips 🌸
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Discover endless possibilities across the world
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
                <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-8 rounded-3xl text-center hover-lift shadow-xl">
                  <Globe className="w-16 h-16 mx-auto mb-4 animate-float" />
                  <div className="text-4xl font-bold mb-2">{stats.totalCountries}+</div>
                  <div className="text-lg font-medium opacity-90">Countries</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white p-8 rounded-3xl text-center hover-lift shadow-xl">
                  <GraduationCap className="w-16 h-16 mx-auto mb-4 animate-float-delayed" />
                  <div className="text-4xl font-bold mb-2">{stats.totalUniversities}+</div>
                  <div className="text-lg font-medium opacity-90">Universities</div>
                </div>
                
                <div className="bg-gradient-to-br from-pink-400 to-pink-600 text-white p-8 rounded-3xl text-center hover-lift shadow-xl">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 animate-spin-slow" />
                  <div className="text-4xl font-bold mb-2">{stats.totalCourses}+</div>
                  <div className="text-lg font-medium opacity-90">Courses</div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-8 rounded-3xl text-center hover-lift shadow-xl">
                  <TrendingUp className="w-16 h-16 mx-auto mb-4 animate-float" />
                  <div className="text-4xl font-bold mb-2">{stats.totalPathways}+</div>
                  <div className="text-lg font-medium opacity-90">Pathways</div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white p-8 rounded-3xl text-center hover-lift shadow-xl">
                  <Target className="w-16 h-16 mx-auto mb-4 animate-float-delayed" />
                  <div className="text-4xl font-bold mb-2">{stats.totalCareerPaths}+</div>
                  <div className="text-lg font-medium opacity-90">Career Paths</div>
                </div>
              </div>
            </section>

            {/* Start Your Journey Section */}
            <section id="pathways" className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                  🎯 🚀 Start Your Journey! 🍎
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Begin your educational adventure by connecting with expert counselors and exploring university pathways. Your future starts here! ✨
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                <div 
                  onClick={() => navigate('/sop-builder')}
                  className="bg-white p-8 rounded-3xl shadow-xl hover-lift cursor-pointer group"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">SOP Builder</h3>
                  <p className="text-gray-600 text-center">Create compelling statements of purpose that showcase your unique story</p>
                </div>

                <div 
                  onClick={() => navigate('/resume-builder')}
                  className="bg-white p-8 rounded-3xl shadow-xl hover-lift cursor-pointer group"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Resume Builder</h3>
                  <p className="text-gray-600 text-center">Build professional resumes that stand out to admissions committees</p>
                </div>

                <div 
                  onClick={() => navigate('/atar-calculator')}
                  className="bg-white p-8 rounded-3xl shadow-xl hover-lift cursor-pointer group"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">ATAR Calculator</h3>
                  <p className="text-gray-600 text-center">Calculate your ATAR score and understand your university options</p>
                </div>

                <div 
                  onClick={() => navigate('/course-finder')}
                  className="bg-white p-8 rounded-3xl shadow-xl hover-lift cursor-pointer group"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Search className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Course Finder</h3>
                  <p className="text-gray-600 text-center">Discover courses that perfectly match your interests and career goals</p>
                </div>
              </div>
            </section>

            {/* Featured Universities Section */}
            <section id="universities" className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                  🏛️ Featured Universities
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Explore top-ranked universities from around the world
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="bg-white p-8 rounded-3xl shadow-xl hover-lift">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl">H</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Rank</div>
                      <div className="text-2xl font-bold text-red-600">#1</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Harvard University</h3>
                  <p className="text-gray-600 mb-4">Cambridge, Massachusetts, USA</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>Founded: 1636</span>
                    <span>Students: 23,000+</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-gray-600 ml-1">4.9 (2,847 reviews)</span>
                  </div>
                  <button 
                    onClick={() => navigate('/university/harvard')}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Learn More
                  </button>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-xl hover-lift">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl">O</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Rank</div>
                      <div className="text-2xl font-bold text-blue-600">#2</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">University of Oxford</h3>
                  <p className="text-gray-600 mb-4">Oxford, England, UK</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>Founded: 1096</span>
                    <span>Students: 24,000+</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-gray-600 ml-1">4.8 (1,923 reviews)</span>
                  </div>
                  <button 
                    onClick={() => navigate('/university/oxford')}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Learn More
                  </button>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-xl hover-lift">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl">M</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Rank</div>
                      <div className="text-2xl font-bold text-purple-600">#3</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">MIT</h3>
                  <p className="text-gray-600 mb-4">Cambridge, Massachusetts, USA</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>Founded: 1861</span>
                    <span>Students: 11,000+</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-gray-600 ml-1">4.9 (1,654 reviews)</span>
                  </div>
                  <button 
                    onClick={() => navigate('/university/mit')}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Learn More
                  </button>
                </div>
              </div>

              <div className="text-center mt-12">
                <button 
                  onClick={() => navigate('/global/universities')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  View All Universities
                </button>
              </div>
            </section>

            {/* Find Your Perfect Counselor Section */}
            <section className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                  👥 Find Your Perfect Counselor
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Connect with experienced education counselors who understand your unique journey and goals. Get personalized guidance for your university applications and career planning.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="bg-white p-8 rounded-3xl shadow-xl hover-lift">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <GraduationCap className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Academic Counselor</h3>
                  <div className="flex items-center justify-center mb-4">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-gray-600 ml-1">4.9 (14 reviews)</span>
                  </div>
                  <p className="text-gray-600 mb-6 text-center">Expert guidance for course selection and academic planning</p>
                  <button className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors">
                    Connect Now
                  </button>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-xl hover-lift">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Globe className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Academic Counselor</h3>
                  <div className="flex items-center justify-center mb-4">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-gray-600 ml-1">4.8 (12 reviews)</span>
                  </div>
                  <p className="text-gray-600 mb-6 text-center">Specialized in international university applications</p>
                  <button className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors">
                    Connect Now
                  </button>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-xl hover-lift">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Career Counselor</h3>
                  <div className="flex items-center justify-center mb-4">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-gray-600 ml-1">4.7 (15 reviews)</span>
                  </div>
                  <p className="text-gray-600 mb-6 text-center">Career pathway planning and industry insights</p>
                  <button className="w-full bg-purple-500 text-white py-3 rounded-xl font-semibold hover:bg-purple-600 transition-colors">
                    Connect Now
                  </button>
                </div>
              </div>

              <div className="text-center mt-12">
                <button 
                  onClick={() => navigate('/counselor/directory')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  View All Counselors
                </button>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  )
}

