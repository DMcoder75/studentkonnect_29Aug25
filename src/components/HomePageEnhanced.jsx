import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  ArrowRight, TrendingUp, Users, BookOpen, GraduationCap, Star, Heart, 
  Globe, Target, Building, Search, ChevronDown, Mail, Phone, MapPin 
} from 'lucide-react'
import GlobalSidebarManager from './GlobalSidebarManager'
import Footer from './Footer'
import { globalEducationService } from '../services/globalEducationService'

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
  
  .hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(139, 92, 246, 0.2);
  }
`

export default function HomePageEnhanced({ isMobileMenuOpen, onMobileMenuClose }) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [universities, setUniversities] = useState([])
  const [stats, setStats] = useState({
    totalCountries: 8,
    totalUniversities: 866,
    totalCourses: 1000,
    totalPathways: 2400,
    totalCareerPaths: 450
  })
  const [loading, setLoading] = useState(true)
  const [selectedProfession, setSelectedProfession] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedUniversity, setSelectedUniversity] = useState('')

  // Sample data for enhanced sections
  const counselors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      type: "Academic Counselor",
      experience: "8y exp",
      rating: 4.9,
      reviews: 18,
      specializations: ["Computer Science", "Engineering"],
      description: "Experienced Computer Science counselor specializing in AI and Software Engineering. Passionate about helping students achieve their academic goals in technology fields.",
      studentsHelped: 23,
      successRate: 95,
      languages: ["English", "Mandarin"],
      price: 150,
      currency: "AUD"
    },
    {
      id: 2,
      name: "Dr. Emma Wilson",
      type: "Academic Counselor",
      experience: "10y exp",
      rating: 4.8,
      reviews: 12,
      specializations: ["Medicine", "Health Sciences"],
      description: "Medical education specialist with a decade of experience in health sciences. Dedicated to guiding aspiring healthcare professionals through their academic journey.",
      studentsHelped: 15,
      successRate: 93,
      languages: ["English"],
      price: 180,
      currency: "AUD"
    },
    {
      id: 3,
      name: "Michael Kumar",
      type: "Career Counselor",
      experience: "6y exp",
      rating: 4.7,
      reviews: 15,
      specializations: ["Business", "Finance"],
      description: "Business and Finance expert with extensive experience in MBA programs and career guidance. Helping students navigate their path to business success.",
      studentsHelped: 18,
      successRate: 89,
      languages: ["English", "Hindi"],
      price: 120,
      currency: "AUD"
    }
  ]

  const featuredUniversities = [
    {
      id: 1,
      name: "Harvard University",
      category: "Ivy League",
      ranking: 1,
      globalRanking: "#1",
      country: "USA",
      description: "World's leading research university"
    },
    {
      id: 2,
      name: "University of Oxford",
      category: "Russell Group",
      ranking: 2,
      globalRanking: "#2",
      country: "UK",
      description: "Oldest university in the English-speaking world"
    },
    {
      id: 3,
      name: "University of Toronto",
      category: "Research University",
      ranking: 18,
      globalRanking: "#18",
      country: "Canada",
      description: "Leading Canadian research institution"
    },
    {
      id: 4,
      name: "University of Melbourne",
      category: "Go8 University",
      ranking: 33,
      globalRanking: "#33",
      country: "Australia",
      description: "Australia's premier research university"
    },
    {
      id: 5,
      name: "ETH Zurich",
      category: "Technical University",
      ranking: 7,
      globalRanking: "#7",
      country: "Switzerland",
      description: "Leading science and technology university"
    },
    {
      id: 6,
      name: "National University of Singapore",
      category: "Research University",
      ranking: 11,
      globalRanking: "#11",
      country: "Singapore",
      description: "Asia's leading global university"
    }
  ]

  const careerPathways = [
    {
      id: 1,
      title: "Medicine & Health Sciences",
      status: "Popular",
      growth: "Growing",
      description: "Global pathway to medical careers including medicine, nursing, pharmacy, and allied health professions with international recognition and mobility.",
      trending: true
    },
    {
      id: 2,
      title: "Engineering & Technology",
      status: "Popular",
      growth: "Growing",
      description: "International engineering disciplines from civil to software engineering, preparing students for global technology careers and innovation.",
      trending: true
    },
    {
      id: 3,
      title: "Business & Commerce",
      status: "Popular",
      growth: "Growing",
      description: "Global business pathways covering international finance, marketing, management, and entrepreneurship with worldwide industry connections.",
      trending: false
    },
    {
      id: 4,
      title: "Law & Legal Studies",
      status: "Popular",
      growth: "Growing",
      description: "International legal education pathways from comparative law to specialized legal practice in global legal systems.",
      trending: true
    }
  ]

  const professions = [
    "Software Engineer", "Doctor", "Business Analyst", "Data Scientist", 
    "Lawyer", "Teacher", "Architect", "Pharmacist", "Nurse", "Accountant"
  ]

  const countries = [
    "All countries...", "Australia", "United States", "United Kingdom", 
    "Canada", "Germany", "Switzerland", "Singapore", "Netherlands"
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch real data from Supabase
        const [universitiesData, statsData] = await Promise.all([
          globalEducationService.getAllUniversities(),
          globalEducationService.getGlobalStatistics()
        ])

        setUniversities(universitiesData || [])
        setStats(statsData || stats)
        
      } catch (error) {
        console.error('Error fetching data:', error)
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

  const handleStartJourney = () => {
    if (!selectedProfession) {
      alert('Please select a profession to continue')
      return
    }
    
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
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-4 w-full h-[320px] flex items-center mt-12 sm:mt-0">
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
        <GlobalSidebarManager 
          isMobileMenuOpen={isMobileMenuOpen} 
          onMobileMenuClose={onMobileMenuClose}
          isHomepage={true}
        />
        
        <main className="flex-1 w-full md:w-auto transition-all duration-300 min-h-screen">
          
          {/* Global Statistics Section */}
          <section className="py-12 bg-gradient-to-br from-purple-100 via-pink-50 to-cyan-100 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="absolute top-20 right-20 w-24 h-24 bg-cyan-500 rounded-full animate-bounce"></div>
              <div className="absolute bottom-10 left-1/4 w-20 h-20 bg-pink-500 rounded-full animate-ping"></div>
              <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-yellow-500 rounded-full animate-pulse"></div>
            </div>
            <div className="container mx-auto px-6 relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                  🌟 Global Education at Your Fingertips 🌟
                </h2>
                <p className="text-base text-gray-700 font-medium">Discover endless possibilities across the world</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div className="text-center cursor-pointer group transform hover:scale-110 transition-all duration-300 hover:rotate-2">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-green-300 transition-all duration-300 animate-pulse">
                    <Globe className="h-10 w-10" />
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300 font-mono tracking-wider">
                    {stats.totalCountries}+
                  </div>
                  <div className="text-gray-700 font-bold text-base group-hover:text-green-700 transition-colors duration-200">Countries</div>
                </div>
                
                <div className="text-center cursor-pointer group transform hover:scale-110 transition-all duration-300 hover:-rotate-2">
                  <div className="bg-gradient-to-br from-purple-500 to-violet-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-purple-300 transition-all duration-300 animate-bounce">
                    <GraduationCap className="h-10 w-10" />
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-violet-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300 font-mono tracking-wider">
                    {stats.totalUniversities}+
                  </div>
                  <div className="text-gray-700 font-bold text-base group-hover:text-purple-700 transition-colors duration-200">Universities</div>
                </div>
                
                <div className="text-center cursor-pointer group transform hover:scale-110 transition-all duration-300 hover:rotate-2">
                  <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-pink-300 transition-all duration-300 animate-pulse">
                    <BookOpen className="h-10 w-10" />
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-pink-600 to-rose-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300 font-mono tracking-wider">
                    {stats.totalCourses}+
                  </div>
                  <div className="text-gray-700 font-bold text-base group-hover:text-pink-700 transition-colors duration-200">Courses</div>
                </div>
                
                <div className="text-center cursor-pointer group transform hover:scale-110 transition-all duration-300 hover:-rotate-2">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-cyan-300 transition-all duration-300 animate-bounce">
                    <TrendingUp className="h-10 w-10" />
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300 font-mono tracking-wider">
                    {stats.totalPathways}+
                  </div>
                  <div className="text-gray-700 font-bold text-base group-hover:text-cyan-700 transition-colors duration-200">Pathways</div>
                </div>
                
                <div className="text-center cursor-pointer group transform hover:scale-110 transition-all duration-300 hover:rotate-2">
                  <div className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-yellow-300 transition-all duration-300 animate-pulse">
                    <Users className="h-10 w-10" />
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-yellow-600 to-orange-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300 font-mono tracking-wider">
                    {stats.totalCareerPaths}+
                  </div>
                  <div className="text-gray-700 font-bold text-base group-hover:text-yellow-700 transition-colors duration-200">Career Paths</div>
                </div>
              </div>
            </div>
          </section>

          {/* Start Your Journey Section */}
          <section className="py-12 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-5 left-5 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float"></div>
              <div className="absolute top-10 right-10 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-float-delayed"></div>
              <div className="absolute bottom-5 left-1/3 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-float"></div>
            </div>
            <div className="container mx-auto px-6 relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 flex items-center justify-center animate-pulse">
                  <Target className="h-12 w-12 mr-4 text-purple-600 animate-spin-slow" />
                  🚀 Start Your Journey! 🎯
                </h2>
                <p className="text-xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed">
                  Begin your educational adventure by connecting with expert counselors and exploring university pathways.
                  <span className="text-purple-600 font-bold"> Your future starts here! ✨</span>
                </p>
              </div>
            </div>
          </section>

          {/* Build Your Perfect Pathway Section */}
          <section className="py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                  🍎 Build Your Perfect Pathway ⚙️
                </h2>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                  Discover your perfect university pathway by selecting your preferred profession, country, and university. 
                  <span className="text-blue-600 font-bold"> Get personalized course combinations and admission requirements globally! 🚀</span>
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      🎓 Key Profession *
                    </label>
                    <select 
                      value={selectedProfession}
                      onChange={(e) => setSelectedProfession(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a profession...</option>
                      {professions.map((profession) => (
                        <option key={profession} value={profession}>{profession}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      🌍 Country (Optional)
                    </label>
                    <select 
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      🏛️ University (Optional)
                    </label>
                    <select 
                      value={selectedUniversity}
                      onChange={(e) => setSelectedUniversity(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All universities...</option>
                      <option value="Harvard University">Harvard University</option>
                      <option value="University of Oxford">University of Oxford</option>
                      <option value="MIT">MIT</option>
                      <option value="University of Melbourne">University of Melbourne</option>
                    </select>
                  </div>
                </div>
                
                <div className="text-center">
                  <button 
                    onClick={handleStartJourney}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
                  >
                    <Search className="mr-2 h-5 w-5" />
                    Get Started Now →
                  </button>
                  {!selectedProfession && (
                    <p className="text-gray-500 text-sm mt-2">Please select a profession to continue</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Find Your Perfect Counselor Section */}
          <section className="py-6 bg-gradient-to-br from-orange-50 via-white to-red-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 mr-3 text-orange-600" />
                  Find Your Perfect Counselor
                </h2>
                <p className="text-base text-gray-600 max-w-3xl mx-auto">
                  Connect with experienced education counselors who understand your unique journey and goals. 
                  Get personalized guidance for your university applications and career planning.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
                {counselors.map((counselor) => (
                  <div key={counselor.id} className="rounded-lg border bg-white text-card-foreground shadow-sm group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-white">
                    <div className="flex flex-col space-y-1.5 p-6 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-orange-100 text-orange-700">
                          {counselor.type}
                        </div>
                        <div className="flex items-center text-yellow-600">
                          <Star className="h-4 w-4 mr-1 fill-current" />
                          <span className="text-sm font-semibold">{counselor.rating}</span>
                          <span className="text-xs text-gray-500 ml-1">({counselor.reviews} reviews)</span>
                        </div>
                      </div>
                      <h3 className="text-xl group-hover:text-orange-600 transition-colors font-semibold">
                        {counselor.name}
                      </h3>
                      <div className="text-sm text-gray-600">{counselor.experience}</div>
                    </div>
                    
                    <div className="p-6 pt-0">
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-1">
                          {counselor.specializations.map((spec) => (
                            <div key={spec} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-gray-700 border-gray-300 text-xs">
                              {spec}
                            </div>
                          ))}
                        </div>
                        
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {counselor.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Users className="h-4 w-4 mr-1" />
                            {counselor.studentsHelped} helped
                          </div>
                          <div className="flex items-center text-green-600">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            {counselor.successRate}% success
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Languages: </span>
                          {counselor.languages.join(', ')}
                        </div>
                        
                        <div className="flex space-x-2 pt-2">
                          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 h-9 rounded-md px-3 flex-1">
                            Message
                          </button>
                          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white h-9 rounded-md px-3 flex-1">
                            Connect Now
                          </button>
                        </div>
                        
                        <div className="text-center pt-2 border-t">
                          <span className="text-base font-bold text-gray-900">
                            ${counselor.price}
                          </span>
                          <span className="text-sm text-gray-600 ml-1">
                            /{counselor.currency}/hour
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <button 
                  onClick={() => navigate('/counselor/directory')}
                  className="inline-flex items-center rounded-full border px-6 py-3 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-orange-300 text-orange-700 hover:bg-orange-50"
                >
                  View All Counselors →
                </button>
              </div>
            </div>
          </section>

          {/* Featured Universities Section */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Universities</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Explore Australia's top-ranked universities and discover the programs that align with your career goals.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {featuredUniversities.map((university) => (
                  <div key={university.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-purple-100 text-purple-700">
                          {university.category}
                        </div>
                        <div className="flex items-center text-yellow-600">
                          <Star className="h-4 w-4 mr-1 fill-current" />
                          <span className="text-sm font-semibold">{university.globalRanking}</span>
                          <Heart className="h-4 w-4 ml-2 text-gray-400 hover:text-red-500 cursor-pointer" />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{university.name}</h3>
                      <p className="text-gray-600 mb-4">Global Ranking: {university.globalRanking}</p>
                      
                      <button 
                        onClick={() => navigate(`/university/${university.id}`)}
                        className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 h-9 rounded-md px-3"
                      >
                        View Courses →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Popular Career Pathways Section */}
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Popular Career Pathways</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Trending career paths chosen by students like you
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {careerPathways.map((pathway) => (
                  <div key={pathway.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-purple-100 text-purple-700">
                          {pathway.status}
                        </div>
                        {pathway.trending && (
                          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-green-100 text-green-700">
                            📈 {pathway.growth}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{pathway.title}</h3>
                    <p className="text-gray-600 mb-6">{pathway.description}</p>
                    
                    <button 
                      onClick={() => navigate(`/pathway/${pathway.id}`)}
                      className="inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 h-9 rounded-md px-3"
                    >
                      Explore Pathway →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </main>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

