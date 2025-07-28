import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, TrendingUp, Users, BookOpen, GraduationCap, Star, Heart, Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Send, ChevronDown, Search, Target, Building } from 'lucide-react'
import Sidebar from './Sidebar'

export default function HomePage({ isMobileMenuOpen, onMobileMenuClose }) {
  const navigate = useNavigate()
  const [universities, setUniversities] = useState([])
  const [pathways, setPathways] = useState([])
  const [favorites, setFavorites] = useState([])
  const [stats, setStats] = useState({
    totalUniversities: 850,
    totalCourses: 12500,
    totalPathways: 2400,
    totalProfessions: 450
  })
  const [loading, setLoading] = useState(true)
  
  // Journey form states
  const [selectedProfession, setSelectedProfession] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [selectedUniversity, setSelectedUniversity] = useState('')
  const [stateUniversities, setStateUniversities] = useState([])

  // Sample data for dropdowns
  const professions = [
    'Medicine', 'Engineering', 'Law', 'Business', 'Education', 'Psychology', 
    'Computer Science', 'Nursing', 'Architecture', 'Accounting', 'Marketing', 
    'Journalism', 'Design', 'Social Work', 'Environmental Science'
  ]
  
  const states = [
    'New South Wales', 'Victoria', 'Queensland', 'Western Australia', 
    'South Australia', 'Tasmania', 'Australian Capital Territory', 'Northern Territory'
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Sample featured universities data
        const featuredUniversities = [
          {
            id: 1,
            name: "University of Melbourne",
            type: "Go8 University",
            global_ranking: 33,
            website_url: "https://www.unimelb.edu.au",
            description: "Australia's leading university with world-class research and teaching"
          },
          {
            id: 2,
            name: "University of Sydney",
            type: "Go8 University", 
            global_ranking: 41,
            website_url: "https://www.sydney.edu.au",
            description: "Australia's first university, established in 1850"
          },
          {
            id: 3,
            name: "Australian National University",
            type: "Go8 University",
            global_ranking: 30,
            website_url: "https://www.anu.edu.au",
            description: "Australia's national university with excellence in research"
          },
          {
            id: 4,
            name: "UNSW Sydney",
            type: "Go8 University",
            global_ranking: 45,
            website_url: "https://www.unsw.edu.au",
            description: "Leading university in engineering, business and medicine"
          },
          {
            id: 5,
            name: "University of Queensland",
            type: "Go8 University",
            global_ranking: 50,
            website_url: "https://www.uq.edu.au",
            description: "Premier research university in Queensland"
          },
          {
            id: 6,
            name: "Monash University",
            type: "Go8 University",
            global_ranking: 57,
            website_url: "https://www.monash.edu",
            description: "Global university with campuses worldwide"
          }
        ]
        
        // Sample pathways data
        const samplePathways = [
          {
            id: 1,
            name: "Medicine & Health Sciences",
            description: "Comprehensive pathway to medical careers including medicine, nursing, pharmacy, and allied health professions with multiple entry points and specialization options."
          },
          {
            id: 2,
            name: "Engineering & Technology",
            description: "Diverse engineering disciplines from civil to software engineering, preparing students for the future of technology and innovation."
          },
          {
            id: 3,
            name: "Business & Commerce",
            description: "Business pathways covering finance, marketing, management, and entrepreneurship with strong industry connections and practical experience."
          },
          {
            id: 4,
            name: "Law & Legal Studies",
            description: "Legal education pathways from undergraduate law to specialized postgraduate programs in various areas of legal practice."
          }
        ]
        
        setUniversities(featuredUniversities)
        setPathways(samplePathways)
        setStats({
          totalUniversities: 850,
          totalCourses: 12500,
          totalPathways: 2400,
          totalProfessions: 450
        })
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
  const filteredUniversities = selectedState ? stateUniversities : []

  // Journey form handlers
  const handleStateChange = (state) => {
    setSelectedState(state)
    setSelectedUniversity('') // Reset university when state changes
    
    // Filter universities by state (simplified mapping)
    const stateUniversityMap = {
      'New South Wales': ['University of Sydney', 'UNSW Sydney', 'University of Technology Sydney', 'Macquarie University'],
      'Victoria': ['University of Melbourne', 'Monash University', 'RMIT University', 'Deakin University'],
      'Queensland': ['University of Queensland', 'Queensland University of Technology', 'Griffith University', 'James Cook University'],
      'Western Australia': ['University of Western Australia', 'Curtin University', 'Murdoch University', 'Edith Cowan University'],
      'South Australia': ['University of Adelaide', 'University of South Australia', 'Flinders University'],
      'Tasmania': ['University of Tasmania'],
      'Australian Capital Territory': ['Australian National University', 'University of Canberra'],
      'Northern Territory': ['Charles Darwin University']
    }
    
    setStateUniversities(stateUniversityMap[state] || [])
  }

  const handleStartJourney = () => {
    if (!selectedProfession) {
      alert('Please select a profession to continue')
      return
    }
    
    // Navigate to results page with selected parameters
    const params = new URLSearchParams({
      profession: selectedProfession,
      state: selectedState || '',
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
      {/* Hero Section - Full Width, No Sidebar */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-4 w-full h-[320px] flex items-center">
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
        <div className="relative w-full px-6">
          <div className="max-w-6xl mx-auto">
            <div className="relative min-h-[300px] flex items-center">
              {/* Full Width Text Content */}
              <div className="w-full text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent animate-pulse">
                  Find Your Perfect
                  <br />
                  <span className="text-yellow-300">University</span>
                </h1>
                <p className="text-lg md:text-xl mb-6 text-purple-100 max-w-4xl mx-auto">
                  Discover your ideal university course through personalized pathways. 
                  Connect your passions with career opportunities at Australia's top universities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                    onClick={() => scrollToSection('pathways')}
                  >
                    Explore Pathways <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
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
          {/* Stats Section */}
          <section className="py-8 bg-gradient-to-r from-purple-50 to-cyan-50">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div 
                  className="text-center cursor-pointer group transform hover:scale-105 transition-all duration-200"
                  onClick={() => navigate('/universities')}
                >
                  <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-700 transition-colors duration-200">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold text-purple-600 mb-2 group-hover:text-purple-700 transition-colors duration-200">{stats.totalUniversities}+</div>
                  <div className="text-gray-600 group-hover:text-gray-800 transition-colors duration-200">Universities</div>
                </div>
                <div 
                  className="text-center cursor-pointer group transform hover:scale-105 transition-all duration-200"
                  onClick={() => navigate('/courses')}
                >
                  <div className="bg-pink-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-700 transition-colors duration-200">
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold text-pink-600 mb-2 group-hover:text-pink-700 transition-colors duration-200">{stats.totalCourses}+</div>
                  <div className="text-gray-600 group-hover:text-gray-800 transition-colors duration-200">Courses</div>
                </div>
                <div 
                  className="text-center cursor-pointer group transform hover:scale-105 transition-all duration-200"
                  onClick={() => navigate('/pathways')}
                >
                  <div className="bg-cyan-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-700 transition-colors duration-200">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold text-cyan-600 mb-2 group-hover:text-cyan-700 transition-colors duration-200">{stats.totalPathways}+</div>
                  <div className="text-gray-600 group-hover:text-gray-800 transition-colors duration-200">Pathways</div>
                </div>
                <div 
                  className="text-center cursor-pointer group transform hover:scale-105 transition-all duration-200"
                  onClick={() => navigate('/career-insights')}
                >
                  <div className="bg-yellow-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-700 transition-colors duration-200">
                    <Users className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold text-yellow-600 mb-2 group-hover:text-yellow-700 transition-colors duration-200">{stats.totalProfessions}+</div>
                  <div className="text-gray-600 group-hover:text-gray-800 transition-colors duration-200">Career Paths</div>
                </div>
              </div>
            </div>
          </section>

          {/* Start Your Journey Section */}
          <section className="py-6 bg-gradient-to-br from-purple-50 via-white to-cyan-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-6">
                <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                  <Target className="h-10 w-10 mr-3 text-purple-600" />
                  Start Your Journey!
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Begin your educational journey by connecting with expert counselors and exploring university pathways.
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

          {/* Journey Builder Section */}
          <section className="py-6 bg-gradient-to-br from-purple-50 via-white to-cyan-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-6">
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Discover your perfect university pathway by selecting your preferred profession, state, and university. 
                  Get personalized course combinations and grade requirements.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      
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

                      {/* State Dropdown */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-cyan-600" />
                          State (Optional)
                        </label>
                        <div className="relative">
                          <select
                            value={selectedState}
                            onChange={(e) => handleStateChange(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none cursor-pointer"
                          >
                            <option value="">All states...</option>
                            {states.map((state) => (
                              <option key={state} value={state}>
                                {state}
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
                        className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-600 text-white px-12 py-4 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        <Search className="h-5 w-5 mr-2" />
                        Start My Journey
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

