import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, TrendingUp, Users, BookOpen, GraduationCap, Star, Heart, Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Send, ChevronDown, Search, Target, Building, Globe } from 'lucide-react'
import Sidebar from './Sidebar'
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
`

export default function HomePage({ isMobileMenuOpen, onMobileMenuClose }) {
  const navigate = useNavigate()
  const [universities, setUniversities] = useState([])
  const [pathways, setPathways] = useState([])
  const [favorites, setFavorites] = useState([])
  const [countries, setCountries] = useState([])
  const [stats, setStats] = useState({
    totalCountries: 0,
    totalUniversities: 0,
    totalCourses: 0,
    totalPathways: 2400,
    totalProfessions: 450
  })
  const [loading, setLoading] = useState(true)
  
  // Journey form states
  const [selectedProfession, setSelectedProfession] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedUniversity, setSelectedUniversity] = useState('')
  const [countryUniversities, setCountryUniversities] = useState([])

  // Sample data for dropdowns
  const professions = [
    'Medicine', 'Engineering', 'Law', 'Business', 'Education', 'Psychology', 
    'Computer Science', 'Nursing', 'Architecture', 'Accounting', 'Marketing', 
    'Journalism', 'Design', 'Social Work', 'Environmental Science'
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch global statistics and countries
        const [statsResult, countriesResult] = await Promise.all([
          globalEducationService.getGlobalStatistics(),
          globalEducationService.getAllCountries()
        ])

        if (statsResult.data) {
          setStats(prev => ({
            ...prev,
            totalCountries: statsResult.data.countries,
            totalUniversities: statsResult.data.universities,
            totalCourses: statsResult.data.courses
          }))
        }

        if (countriesResult.data) {
          setCountries(countriesResult.data)
        }
        
        // Sample featured universities data - now global
        const featuredUniversities = [
          {
            id: 1,
            name: "Harvard University",
            type: "Ivy League",
            country: "United States",
            global_ranking: 1,
            website_url: "https://www.harvard.edu",
            description: "World's leading university with excellence in research and education"
          },
          {
            id: 2,
            name: "University of Oxford",
            type: "Russell Group", 
            country: "United Kingdom",
            global_ranking: 2,
            website_url: "https://www.ox.ac.uk",
            description: "Oldest university in the English-speaking world, established in 1096"
          },
          {
            id: 3,
            name: "University of Toronto",
            type: "Research University",
            country: "Canada",
            global_ranking: 18,
            website_url: "https://www.utoronto.ca",
            description: "Canada's leading university with global research excellence"
          },
          {
            id: 4,
            name: "University of Melbourne",
            type: "Go8 University",
            country: "Australia",
            global_ranking: 33,
            website_url: "https://www.unimelb.edu.au",
            description: "Australia's leading university with world-class research"
          },
          {
            id: 5,
            name: "ETH Zurich",
            type: "Technical University",
            country: "Switzerland",
            global_ranking: 7,
            website_url: "https://ethz.ch",
            description: "Premier technical university in Europe for science and technology"
          },
          {
            id: 6,
            name: "National University of Singapore",
            type: "Research University",
            country: "Singapore",
            global_ranking: 11,
            website_url: "https://www.nus.edu.sg",
            description: "Asia's leading global university with diverse programs"
          }
        ]
        
        // Sample pathways data - now global
        const samplePathways = [
          {
            id: 1,
            name: "Medicine & Health Sciences",
            description: "Global pathway to medical careers including medicine, nursing, pharmacy, and allied health professions with international recognition and mobility."
          },
          {
            id: 2,
            name: "Engineering & Technology",
            description: "International engineering disciplines from civil to software engineering, preparing students for global technology careers and innovation."
          },
          {
            id: 3,
            name: "Business & Commerce",
            description: "Global business pathways covering international finance, marketing, management, and entrepreneurship with worldwide industry connections."
          },
          {
            id: 4,
            name: "Law & Legal Studies",
            description: "International legal education pathways from comparative law to specialized programs in various global legal systems and practices."
          }
        ]
        
        setUniversities(featuredUniversities)
        setPathways(samplePathways)
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

  const toggleFavorite = (universityId) => {
    setFavorites(prev => 
      prev.includes(universityId) 
        ? prev.filter(id => id !== universityId)
        : [...prev, universityId]
    )
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
      {/* Hero Section - Full Width, No Sidebar */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-4 w-full h-[320px] flex items-center mt-12 sm:mt-0">
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
                  <Button 
                    size="lg" 
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                    onClick={() => scrollToSection('pathways')}
                  >
                    Explore Pathways <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-purple-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                    onClick={() => scrollToSection('universities')}
                  >
                    Browse Universities
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two-Column Layout Starts Here - Below Hero Section */}
      <div className="flex">
        {/* Sidebar - Only visible on medium screens and above */}
        <Sidebar 
          isOpen={true}
          onClose={() => {}}
          isHomepage={true}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={onMobileMenuClose}
        />

        {/* Main Content Area - Full width on mobile, reduced width on desktop */}
        <main className="flex-1 w-full md:w-auto transition-all duration-300 min-h-screen">
          {/* Stats Section - Enhanced with Jazzy Styling */}
          <section className="py-12 bg-gradient-to-br from-purple-100 via-pink-50 to-cyan-100 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="absolute top-20 right-20 w-24 h-24 bg-cyan-500 rounded-full animate-bounce"></div>
              <div className="absolute bottom-10 left-1/4 w-20 h-20 bg-pink-500 rounded-full animate-ping"></div>
              <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-yellow-500 rounded-full animate-pulse"></div>
            </div>
            
            <div className="container mx-auto px-6 relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                  🌟 Global Education at Your Fingertips 🌟
                </h2>
                <p className="text-lg text-gray-700 font-medium">Discover endless possibilities across the world</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div 
                  className="text-center cursor-pointer group transform hover:scale-110 transition-all duration-300 hover:rotate-2"
                  onClick={() => navigate('/countries')}
                >
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-green-300 transition-all duration-300 animate-pulse">
                    <Globe className="h-10 w-10" />
                  </div>
                  <div className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300 font-mono tracking-wider">
                    {stats.totalCountries || 8}+
                  </div>
                  <div className="text-gray-700 font-bold text-lg group-hover:text-green-700 transition-colors duration-200">Countries</div>
                </div>
                
                <div 
                  className="text-center cursor-pointer group transform hover:scale-110 transition-all duration-300 hover:-rotate-2"
                  onClick={() => navigate('/universities')}
                >
                  <div className="bg-gradient-to-br from-purple-500 to-violet-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-purple-300 transition-all duration-300 animate-bounce">
                    <GraduationCap className="h-10 w-10" />
                  </div>
                  <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-violet-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300 font-mono tracking-wider">
                    {stats.totalUniversities || 866}+
                  </div>
                  <div className="text-gray-700 font-bold text-lg group-hover:text-purple-700 transition-colors duration-200">Universities</div>
                </div>
                
                <div 
                  className="text-center cursor-pointer group transform hover:scale-110 transition-all duration-300 hover:rotate-2"
                  onClick={() => navigate('/courses')}
                >
                  <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-pink-300 transition-all duration-300 animate-pulse">
                    <BookOpen className="h-10 w-10" />
                  </div>
                  <div className="text-4xl font-black bg-gradient-to-r from-pink-600 to-rose-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300 font-mono tracking-wider">
                    {stats.totalCourses || 1000}+
                  </div>
                  <div className="text-gray-700 font-bold text-lg group-hover:text-pink-700 transition-colors duration-200">Courses</div>
                </div>
                
                <div 
                  className="text-center cursor-pointer group transform hover:scale-110 transition-all duration-300 hover:-rotate-2"
                  onClick={() => navigate('/pathways')}
                >
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-cyan-300 transition-all duration-300 animate-bounce">
                    <TrendingUp className="h-10 w-10" />
                  </div>
                  <div className="text-4xl font-black bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300 font-mono tracking-wider">
                    {stats.totalPathways}+
                  </div>
                  <div className="text-gray-700 font-bold text-lg group-hover:text-cyan-700 transition-colors duration-200">Pathways</div>
                </div>
                
                <div 
                  className="text-center cursor-pointer group transform hover:scale-110 transition-all duration-300 hover:rotate-2"
                  onClick={() => navigate('/career-insights')}
                >
                  <div className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-yellow-300 transition-all duration-300 animate-pulse">
                    <Users className="h-10 w-10" />
                  </div>
                  <div className="text-4xl font-black bg-gradient-to-r from-yellow-600 to-orange-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300 font-mono tracking-wider">
                    {stats.totalProfessions}+
                  </div>
                  <div className="text-gray-700 font-bold text-lg group-hover:text-yellow-700 transition-colors duration-200">Career Paths</div>
                </div>
              </div>
            </div>
          </section>

          {/* Start Your Journey Section - Enhanced with Jazzy Styling */}
          <section className="py-12 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
            {/* Floating Elements */}
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

          {/* Find Counselor Section */}
          <section className="py-6 bg-gradient-to-br from-orange-50 via-white to-red-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 mr-3 text-orange-600" />
                  Find Your Perfect Counselor
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Connect with experienced education counselors who understand your unique journey and goals. 
                  Get personalized guidance for your university applications and career planning.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
                {/* Sample counselor cards */}
                {[
                  {
                    id: 1,
                    name: "Dr. Sarah Chen",
                    type: "Academic Counselor",
                    rating: 4.9,
                    reviews: 18,
                    experience: "8y exp",
                    specializations: ["Computer Science", "Engineering"],
                    description: "Experienced Computer Science counselor specializing in AI and Software Engineering. Passionate about helping students achieve their academic goals in technology fields.",
                    rate: 150,
                    currency: "AUD",
                    languages: ["English", "Mandarin"],
                    studentsHelped: 23,
                    successRate: 95
                  },
                  {
                    id: 2,
                    name: "Dr. Emma Wilson",
                    type: "Academic Counselor", 
                    rating: 4.8,
                    reviews: 12,
                    experience: "10y exp",
                    specializations: ["Medicine", "Health Sciences"],
                    description: "Medical education specialist with a decade of experience in health sciences. Dedicated to guiding aspiring healthcare professionals through their academic journey.",
                    rate: 180,
                    currency: "AUD",
                    languages: ["English"],
                    studentsHelped: 15,
                    successRate: 93
                  },
                  {
                    id: 3,
                    name: "Michael Kumar",
                    type: "Career Counselor",
                    rating: 4.7,
                    reviews: 15,
                    experience: "6y exp", 
                    specializations: ["Business", "Finance"],
                    description: "Business and Finance expert with extensive experience in MBA programs and career guidance. Helping students navigate the complex world of business education.",
                    rate: 120,
                    currency: "AUD",
                    languages: ["English", "Hindi"],
                    studentsHelped: 18,
                    successRate: 89
                  }
                ].map((counselor) => (
                  <Card key={counselor.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-white">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                          {counselor.type}
                        </Badge>
                        <div className="flex items-center text-yellow-600">
                          <Star className="h-4 w-4 mr-1 fill-current" />
                          <span className="text-sm font-semibold">{counselor.rating}</span>
                          <span className="text-xs text-gray-500 ml-1">({counselor.reviews} reviews)</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-orange-600 transition-colors">
                        {counselor.name}
                      </CardTitle>
                      <div className="text-sm text-gray-600">{counselor.experience}</div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Specializations */}
                        <div className="flex flex-wrap gap-1">
                          {counselor.specializations.map((spec, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {counselor.description}
                        </p>
                        
                        {/* Stats */}
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
                        
                        {/* Languages */}
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Languages: </span>
                          {counselor.languages.join(", ")}
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex space-x-2 pt-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="flex-1"
                            onClick={() => navigate('/sign-in')}
                          >
                            Message
                          </Button>
                          <Button 
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                            onClick={() => navigate('/sign-in')}
                          >
                            Connect Now
                          </Button>
                        </div>
                        
                        {/* Rate */}
                        <div className="text-center pt-2 border-t">
                          <span className="text-lg font-bold text-gray-900">
                            ${counselor.rate}
                          </span>
                          <span className="text-sm text-gray-600 ml-1">/{counselor.currency}/hour</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* View All Counselors Button */}
              <div className="text-center mt-10">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                  onClick={() => navigate('/counselor/directory')}
                >
                  View All Counselors
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
          </section>

          {/* Journey Builder Section - Enhanced with Jazzy Styling */}
          <section className="py-12 bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 relative overflow-hidden">
            {/* Animated Background Shapes */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 right-0 w-32 h-32 bg-gradient-to-r from-pink-400 to-red-400 rounded-full animate-bounce"></div>
              <div className="absolute bottom-0 left-1/2 w-36 h-36 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full animate-pulse"></div>
            </div>
            
            <div className="container mx-auto px-6 relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  🎯 Build Your Perfect Pathway 🌟
                </h2>
                <p className="text-xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed">
                  Discover your perfect university pathway by selecting your preferred profession, country, and university. 
                  <span className="text-indigo-600 font-bold"> Get personalized course combinations and admission requirements globally! 🚀</span>
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-lg rounded-3xl overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-2"></div>
                  <CardContent className="p-10">
                    <div className="grid md:grid-cols-3 gap-8 mb-10">
                      
                      {/* Profession Dropdown */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center">
                          <GraduationCap className="h-4 w-4 mr-2 text-purple-600" />
                          Key Profession *
                        </label>
                        <div className="relative">
                          <select
                            value={selectedProfession}
                            onChange={(e) => setSelectedProfession(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer"
                          >
                            <option value="">Select a profession...</option>
                            {professions.map((profession) => (
                              <option key={profession} value={profession}>
                                {profession}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      {/* Country Dropdown */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center">
                          <Globe className="h-4 w-4 mr-2 text-cyan-600" />
                          Country (Optional)
                        </label>
                        <div className="relative">
                          <select
                            value={selectedCountry}
                            onChange={(e) => handleCountryChange(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none cursor-pointer"
                          >
                            <option value="">All countries...</option>
                            {Object.keys({
                              'United States': ['Harvard University', 'Stanford University', 'MIT', 'Yale University'],
                              'United Kingdom': ['University of Oxford', 'University of Cambridge', 'Imperial College London', 'UCL'],
                              'Canada': ['University of Toronto', 'McGill University', 'University of British Columbia', 'University of Waterloo'],
                              'Australia': ['University of Melbourne', 'University of Sydney', 'Australian National University', 'UNSW Sydney'],
                              'Germany': ['Technical University of Munich', 'Heidelberg University', 'Humboldt University', 'RWTH Aachen'],
                              'Switzerland': ['ETH Zurich', 'University of Zurich', 'EPFL', 'University of Geneva'],
                              'Singapore': ['National University of Singapore', 'Nanyang Technological University'],
                              'Netherlands': ['University of Amsterdam', 'Delft University of Technology', 'Leiden University']
                            }).map((country) => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      {/* University Dropdown */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center">
                          <Building className="h-4 w-4 mr-2 text-pink-600" />
                          University (Optional)
                        </label>
                        <div className="relative">
                          <select
                            value={selectedUniversity}
                            onChange={(e) => setSelectedUniversity(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none cursor-pointer"
                          >
                            <option value="">All universities...</option>
                            {filteredUniversities.map((university) => (
                              <option key={university} value={university}>
                                {university}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <Button
                        onClick={handleStartJourney}
                        disabled={!selectedProfession}
                        size="lg"
                        className="bg-gray-900 hover:bg-black text-white px-12 py-4 text-lg font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-gray-800 hover:border-gray-900"
                      >
                        <Search className="h-5 w-5 mr-2" />
                        Get Started Now
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                      {!selectedProfession && (
                        <p className="text-sm text-gray-500 mt-2">
                          Please select a profession to continue
                        </p>
                      )}
                    </div>

                    {/* Selected Options Preview */}
                    {selectedProfession && (
                      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-cyan-50 rounded-lg border border-purple-200">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Your Selection:</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                            {selectedProfession}
                          </Badge>
                          {selectedState && (
                            <Badge className="bg-cyan-100 text-cyan-700 border-cyan-200">
                              {selectedState}
                            </Badge>
                          )}
                          {selectedUniversity && (
                            <Badge className="bg-pink-100 text-pink-700 border-pink-200">
                              {selectedUniversity}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Featured Universities Section */}
          <section id="universities" className="py-6">
            <div className="container mx-auto px-6">
              <div className="text-center mb-6">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Universities</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Explore Australia's top-ranked universities and discover the programs that align with your career goals.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {universities.map((university) => (
                  <Card key={university.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                          {university.type || 'University'}
                        </Badge>
                        <div className="flex items-center gap-2">
                          {university.global_ranking && (
                            <div className="flex items-center text-yellow-600">
                              <Star className="h-4 w-4 mr-1" />
                              <span className="text-sm font-semibold">#{university.global_ranking}</span>
                            </div>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(university.id)}
                            className="p-1 h-8 w-8"
                          >
                            <Heart 
                              className={`h-4 w-4 ${
                                favorites.includes(university.id) 
                                  ? 'fill-red-500 text-red-500' 
                                  : 'text-gray-400 hover:text-red-500'
                              }`} 
                            />
                          </Button>
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
                        {university.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-sm text-gray-600">
                          {university.global_ranking ? `Global Ranking: #${university.global_ranking}` : 'Leading Australian University'}
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full group-hover:bg-purple-600 group-hover:text-white transition-all duration-200"
                          onClick={() => window.open(university.website_url, '_blank')}
                        >
                          View Courses <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          {/* Popular Career Pathways Section */}
          <section id="pathways" className="py-6 bg-gradient-to-br from-gray-50 to-purple-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-6">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Popular Career Pathways</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Trending career paths chosen by students like you
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {pathways.map((pathway, index) => (
                  <Card key={pathway.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge 
                          variant="secondary" 
                          className={`${
                            index === 0 ? 'bg-purple-100 text-purple-700' :
                            index === 1 ? 'bg-pink-100 text-pink-700' :
                            index === 2 ? 'bg-cyan-100 text-cyan-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          Popular
                        </Badge>
                        <div className="flex items-center text-green-600">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          <span className="text-sm font-semibold">Growing</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
                        {pathway.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {pathway.description || 'Explore this exciting career pathway with multiple entry points and progression opportunities.'}
                        </p>
                        <Button 
                          variant="outline" 
                          className="w-full group-hover:bg-purple-600 group-hover:text-white transition-all duration-200"
                          onClick={() => navigate(`/pathways/${pathway.id}`)}
                        >
                          Explore Pathway <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="py-8 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
                Join thousands of students who have found their perfect university pathway. 
                Start exploring today and take the first step towards your dream career.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                onClick={() => navigate('/pathways')}
              >
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

