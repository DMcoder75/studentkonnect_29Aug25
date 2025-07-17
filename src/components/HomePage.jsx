import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, TrendingUp, Users, BookOpen, GraduationCap, Star, Heart, Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Send, ChevronDown, Search, Target } from 'lucide-react'
import { dbHelpers } from '../lib/supabase'
import Sidebar from './Sidebar'

export default function HomePage({ isMobileMenuOpen, onMobileMenuClose }) {
  const navigate = useNavigate()
  const [universities, setUniversities] = useState([])
  const [pathways, setPathways] = useState([])
  const [favorites, setFavorites] = useState([])
  const [stats, setStats] = useState({
    totalUniversities: 0,
    totalCourses: 0,
    totalPathways: 0,
    totalProfessions: 0
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
        
        // Fetch featured universities (top ranked)
        const universitiesData = await dbHelpers.getUniversities()
        const featuredUniversities = universitiesData
          .filter(uni => uni.global_ranking)
          .sort((a, b) => a.global_ranking - b.global_ranking)
          .slice(0, 6)
        
        // Fetch pathways
        const pathwaysData = await dbHelpers.getPathways()
        
        // Fetch courses for stats
        const coursesData = await dbHelpers.getCourses()
        
        // Fetch professions for stats
        const professionsData = await dbHelpers.getProfessions()
        
        setUniversities(featuredUniversities)
        setPathways(pathwaysData.slice(0, 4)) // Show first 4 pathways
        setStats({
          totalUniversities: universitiesData.length,
          totalCourses: coursesData.length,
          totalPathways: pathwaysData.length,
          totalProfessions: professionsData.length
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
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-8 w-full h-[400px] flex items-center">
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
            <div className="relative min-h-[460px] flex items-center">
              {/* Full Width Text Content */}
              <div className="w-full text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent animate-pulse">
                  Find Your Perfect
                  <br />
                  <span className="text-yellow-300">University Pathway</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-4xl mx-auto">
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
          <section className="py-16 bg-gradient-to-r from-purple-50 to-cyan-50">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
          <section className="py-16 bg-gradient-to-br from-purple-50 via-white to-cyan-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                  <Target className="h-10 w-10 mr-3 text-purple-600" />
                  Start Your Journey!
                </h2>
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
                          <BookOpen className="h-4 w-4 mr-2 text-pink-600" />
                          University (Optional)
                        </label>
                        <div className="relative">
                          <select
                            value={selectedUniversity}
                            onChange={(e) => setSelectedUniversity(e.target.value)}
                            disabled={!selectedState}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
                          >
                            <option value="">
                              {selectedState ? 'Select university...' : 'Select state first...'}
                            </option>
                            {stateUniversities.map((university) => (
                              <option key={university} value={university}>
                                {university}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Start Button */}
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
          <section id="universities" className="py-16">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Universities</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Explore Australia's top-ranked universities and discover the programs that align with your career goals.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

          {/* Popular Pathways Section */}
          <section id="pathways" className="py-16 bg-gradient-to-br from-gray-50 to-purple-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Popular Career Pathways</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Trending career paths chosen by students like you
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
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
          <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white">
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

      {/* Comprehensive Footer - Now Outside Main Container for Full Width */}
      <footer className="bg-gray-900 text-white w-full">
            {/* Main Footer Content */}
            <div className="w-full max-w-[1200px] mx-auto px-6 py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                
                {/* Brand and Newsletter Section */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg p-2">
                        <GraduationCap className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">Your Uni Pathway</h3>
                        <p className="text-gray-400 text-sm">Find Your Perfect University Course</p>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      Discover your ideal university course through personalized pathways. Connect your passions with career opportunities at Australia's top universities.
                    </p>
                  </div>
                  
                  {/* Newsletter Signup */}
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-3 flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-cyan-400" />
                      Stay Updated
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Get the latest updates on university courses, pathways, and career insights.
                    </p>
                    <div className="flex space-x-2">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                      <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 px-4 py-2 rounded-lg transition-all duration-200">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Navigation Menu */}
                <div>
                  <h4 className="text-lg font-semibold mb-6 text-cyan-400">Navigation</h4>
                  <ul className="space-y-3">
                    <li><button onClick={() => navigate('/')} className="text-gray-300 hover:text-white transition-colors duration-200 text-left">Home</button></li>
                    <li><button onClick={() => navigate('/universities')} className="text-gray-300 hover:text-white transition-colors duration-200 text-left">Universities</button></li>
                    <li><button onClick={() => navigate('/courses')} className="text-gray-300 hover:text-white transition-colors duration-200 text-left">Courses</button></li>
                    <li><button onClick={() => navigate('/pathways')} className="text-gray-300 hover:text-white transition-colors duration-200 text-left">Career Pathways</button></li>
                    <li><button onClick={() => navigate('/career-insights')} className="text-gray-300 hover:text-white transition-colors duration-200 text-left">Career Insights</button></li>
                  </ul>
                </div>

                {/* Academic Tools */}
                <div>
                  <h4 className="text-lg font-semibold mb-6 text-purple-400">Academic Tools</h4>
                  <ul className="space-y-3">
                    <li><button onClick={() => navigate('/atar-calculator')} className="text-gray-300 hover:text-white transition-colors duration-200 text-left">ATAR Calculator</button></li>
                    <li><button className="text-gray-300 hover:text-white transition-colors duration-200 text-left">Course Finder</button></li>
                    <li><button className="text-gray-300 hover:text-white transition-colors duration-200 text-left">University Rankings</button></li>
                    <li><button className="text-gray-300 hover:text-white transition-colors duration-200 text-left">Scholarship Search</button></li>
                    <li><button className="text-gray-300 hover:text-white transition-colors duration-200 text-left">Study Planner</button></li>
                  </ul>
                </div>

                {/* Support & Info */}
                <div>
                  <h4 className="text-lg font-semibold mb-6 text-pink-400">Support & Info</h4>
                  <ul className="space-y-3">
                    <li><button className="text-gray-300 hover:text-white transition-colors duration-200 text-left">About Us</button></li>
                    <li><button className="text-gray-300 hover:text-white transition-colors duration-200 text-left">Contact Us</button></li>
                    <li><button className="text-gray-300 hover:text-white transition-colors duration-200 text-left">FAQ</button></li>
                    <li><button className="text-gray-300 hover:text-white transition-colors duration-200 text-left">Help Center</button></li>
                    <li><button className="text-gray-300 hover:text-white transition-colors duration-200 text-left">Privacy Policy</button></li>
                    <li><button className="text-gray-300 hover:text-white transition-colors duration-200 text-left">Terms of Service</button></li>
                  </ul>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t border-gray-800 mt-12 pt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-600 rounded-full p-2">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Call Us</p>
                      <p className="text-white font-medium">1800 UNI PATH</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-cyan-600 rounded-full p-2">
                      <Mail className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email Us</p>
                      <p className="text-white font-medium">info@yourunipathway.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-pink-600 rounded-full p-2">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Visit Us</p>
                      <p className="text-white font-medium">Sydney, Australia</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-800 bg-gray-950 w-full">
              <div className="w-full max-w-[1200px] mx-auto px-6 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  
                  {/* Copyright */}
                  <div className="text-center md:text-left">
                    <p className="text-gray-400 text-sm">
                      © 2025 <span className="text-white font-medium">Dalsi Music Studio</span>. All rights reserved.
                    </p>
                  </div>

                  {/* Social Media Links */}
                  <div className="flex items-center space-x-4">
                    <p className="text-gray-400 text-sm mr-4">Follow Us:</p>
                    <div className="flex space-x-3">
                      <a 
                        href="https://facebook.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition-all duration-200 transform hover:scale-110"
                      >
                        <Facebook className="h-4 w-4 text-white" />
                      </a>
                      <a 
                        href="https://twitter.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-gray-800 hover:bg-blue-400 p-2 rounded-full transition-all duration-200 transform hover:scale-110"
                      >
                        <Twitter className="h-4 w-4 text-white" />
                      </a>
                      <a 
                        href="https://instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-gray-800 hover:bg-pink-600 p-2 rounded-full transition-all duration-200 transform hover:scale-110"
                      >
                        <Instagram className="h-4 w-4 text-white" />
                      </a>
                      <a 
                        href="https://linkedin.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-gray-800 hover:bg-blue-700 p-2 rounded-full transition-all duration-200 transform hover:scale-110"
                      >
                        <Linkedin className="h-4 w-4 text-white" />
                      </a>
                      <a 
                        href="https://youtube.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-gray-800 hover:bg-red-600 p-2 rounded-full transition-all duration-200 transform hover:scale-110"
                      >
                        <Youtube className="h-4 w-4 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
    </div>
  )
}

