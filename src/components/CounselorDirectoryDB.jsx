import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { 
  Search,
  Filter,
  Star,
  Clock,
  Users,
  Target,
  Award,
  MapPin,
  Globe,
  MessageSquare,
  Video,
  Phone,
  Mail,
  CheckCircle2,
  Shield,
  TrendingUp,
  Eye,
  ThumbsUp,
  GraduationCap,
  Briefcase,
  Languages,
  Calendar,
  DollarSign,
  Zap,
  Trophy,
  Flame,
  BookOpen,
  FileText,
  Heart,
  ArrowRight,
  Loader2
} from 'lucide-react'
import Sidebar from './Sidebar'

export default function CounselorDirectoryDB({ isMobileMenuOpen, onMobileMenuClose }) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [counselors, setCounselors] = useState([])
  const [filteredCounselors, setFilteredCounselors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedFilters, setSelectedFilters] = useState({
    specialization: '',
    location: '',
    rating: '',
    availability: ''
  })
  const [sortBy, setSortBy] = useState('rating')

  // Fetch counselors from Supabase database
  const fetchCounselors = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('counselors')
        .select(`
          id,
          name,
          email,
          specialization,
          location,
          bio,
          experience_years,
          rating,
          total_reviews,
          hourly_rate,
          currency,
          languages,
          is_available,
          profile_image,
          credentials,
          success_rate,
          response_time_hours,
          total_students_helped,
          created_at,
          updated_at
        `)
        .eq('is_active', true)
        .order('rating', { ascending: false })

      if (error) {
        console.error('Error fetching counselors:', error)
        setError('Failed to load counselors. Please try again.')
        return
      }

      // Transform the data to match the expected format
      const transformedCounselors = data.map(counselor => ({
        id: counselor.id,
        name: counselor.name,
        email: counselor.email,
        displayName: `${counselor.name} - ${counselor.specialization}`,
        specializations: counselor.specialization ? counselor.specialization.split(',').map(s => s.trim()) : [],
        location: counselor.location || 'Remote',
        languages: counselor.languages ? counselor.languages.split(',').map(l => l.trim()) : ['English'],
        profileImage: counselor.profile_image || '/api/placeholder/150/150',
        bio: counselor.bio || 'Experienced education counselor dedicated to helping students achieve their academic goals.',
        
        // Performance Metrics
        averageRating: counselor.rating || 4.5,
        totalReviews: counselor.total_reviews || 0,
        responseTime: counselor.response_time_hours || 2,
        successRate: counselor.success_rate || 90,
        totalStudents: counselor.total_students_helped || 0,
        yearsExperience: counselor.experience_years || 1,
        
        // Pricing
        hourlyRate: counselor.hourly_rate || 100,
        currency: counselor.currency || 'AUD',
        
        // Availability
        isAvailable: counselor.is_available || true,
        nextAvailable: counselor.is_available ? 'Available Now' : 'Next Available Soon',
        
        // Verification
        isVerified: true,
        credentials: counselor.credentials ? counselor.credentials.split(',').map(c => c.trim()) : ['Certified Education Counselor'],
        
        // Badges based on performance
        badges: generateBadges(counselor)
      }))

      setCounselors(transformedCounselors)
      setFilteredCounselors(transformedCounselors)
      
    } catch (err) {
      console.error('Error in fetchCounselors:', err)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Generate badges based on counselor performance
  const generateBadges = (counselor) => {
    const badges = []
    
    if (counselor.rating >= 4.8) badges.push('Top Performer')
    if (counselor.response_time_hours <= 1) badges.push('Quick Responder')
    if (counselor.success_rate >= 95) badges.push('High Success Rate')
    if (counselor.total_students_helped >= 50) badges.push('Experienced')
    if (counselor.experience_years >= 5) badges.push('Veteran Counselor')
    if (counselor.total_reviews >= 20) badges.push('Student Favorite')
    
    badges.push('Verified Expert')
    
    return badges
  }

  // Filter and sort counselors
  const filterCounselors = () => {
    let filtered = counselors.filter(counselor => {
      const matchesSearch = searchQuery === '' || 
        counselor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        counselor.specializations.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase())) ||
        counselor.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesSpecialization = selectedFilters.specialization === '' || 
        counselor.specializations.some(spec => spec.toLowerCase().includes(selectedFilters.specialization.toLowerCase()))
      
      const matchesLocation = selectedFilters.location === '' || 
        counselor.location.toLowerCase().includes(selectedFilters.location.toLowerCase())
      
      const matchesRating = selectedFilters.rating === '' || 
        counselor.averageRating >= parseFloat(selectedFilters.rating)
      
      const matchesAvailability = selectedFilters.availability === '' || 
        (selectedFilters.availability === 'available' && counselor.isAvailable) ||
        (selectedFilters.availability === 'all')

      return matchesSearch && matchesSpecialization && matchesLocation && matchesRating && matchesAvailability
    })

    // Sort counselors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.averageRating - a.averageRating
        case 'experience':
          return b.yearsExperience - a.yearsExperience
        case 'responseTime':
          return a.responseTime - b.responseTime
        case 'successRate':
          return b.successRate - a.successRate
        case 'price':
          return a.hourlyRate - b.hourlyRate
        case 'students':
          return b.totalStudents - a.totalStudents
        default:
          return b.averageRating - a.averageRating
      }
    })

    setFilteredCounselors(filtered)
  }

  useEffect(() => {
    fetchCounselors()
  }, [])

  useEffect(() => {
    filterCounselors()
  }, [searchQuery, selectedFilters, sortBy, counselors])

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'Top Performer': return Trophy
      case 'Quick Responder': return Zap
      case 'Student Favorite': return Heart
      case 'Verified Expert': return Shield
      case 'High Success Rate': return Target
      case 'Experienced': return Award
      case 'Veteran Counselor': return GraduationCap
      default: return CheckCircle2
    }
  }

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Top Performer': return 'text-yellow-600 bg-yellow-100'
      case 'Quick Responder': return 'text-blue-600 bg-blue-100'
      case 'Student Favorite': return 'text-pink-600 bg-pink-100'
      case 'Verified Expert': return 'text-green-600 bg-green-100'
      case 'High Success Rate': return 'text-purple-600 bg-purple-100'
      case 'Experienced': return 'text-orange-600 bg-orange-100'
      case 'Veteran Counselor': return 'text-indigo-600 bg-indigo-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const handleConnectNow = (counselor) => {
    // Professional connection logic
    console.log('Connecting to counselor:', counselor.name)
    // You can implement booking/connection logic here
    alert(`Connecting you with ${counselor.name}. This feature will be implemented with booking system.`)
  }

  const handleViewProfile = (counselor) => {
    // Navigate to detailed counselor profile
    navigate(`/counselor/profile/${counselor.id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <Sidebar isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={onMobileMenuClose} />
          <div className="flex-1 ml-64">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-gray-600">Loading counselors from database...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <Sidebar isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={onMobileMenuClose} />
          <div className="flex-1 ml-64">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <p>{error}</p>
                </div>
                <Button onClick={fetchCounselors} className="bg-blue-600 hover:bg-blue-700">
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={onMobileMenuClose} />
        
        <div className="flex-1 ml-64">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
                <h1 className="text-3xl font-bold mb-2">Professional Counselor Directory</h1>
                <p className="text-blue-100">Connect with verified education counselors from our database</p>
                <div className="mt-4 flex items-center space-x-6 text-sm">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{counselors.length} Professional Counselors</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    <span>All Verified & Active</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Real-time Availability</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <Label htmlFor="search">Search Counselors</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search by name, specialization..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="specialization">Specialization</Label>
                  <select
                    id="specialization"
                    value={selectedFilters.specialization}
                    onChange={(e) => setSelectedFilters({...selectedFilters, specialization: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">All Specializations</option>
                    <option value="undergraduate">Undergraduate Programs</option>
                    <option value="postgraduate">Postgraduate Programs</option>
                    <option value="visa">Visa & Immigration</option>
                    <option value="scholarship">Scholarships</option>
                    <option value="career">Career Guidance</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="rating">Minimum Rating</Label>
                  <select
                    id="rating"
                    value={selectedFilters.rating}
                    onChange={(e) => setSelectedFilters({...selectedFilters, rating: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Any Rating</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4.0">4.0+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="sort">Sort By</Label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="experience">Most Experienced</option>
                    <option value="responseTime">Fastest Response</option>
                    <option value="students">Most Students Helped</option>
                    <option value="price">Lowest Price</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {filteredCounselors.length} of {counselors.length} counselors
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedFilters({
                      specialization: '',
                      location: '',
                      rating: '',
                      availability: ''
                    })
                  }}
                  variant="outline"
                  size="sm"
                >
                  Clear Filters
                </Button>
              </div>
            </div>

            {/* Counselors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCounselors.map((counselor) => (
                <Card key={counselor.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    {/* Header with Photo and Basic Info */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                          {counselor.name.charAt(0)}
                        </div>
                        {counselor.isVerified && (
                          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                            <CheckCircle2 className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900">{counselor.name}</h3>
                        <p className="text-sm text-gray-600 mb-1">{counselor.specializations.join(', ')}</p>
                        <div className="flex items-center space-x-2 mb-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{counselor.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {counselor.isAvailable ? (
                            <Badge className="bg-green-100 text-green-800">
                              Available Now
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              {counselor.nextAvailable}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="text-center p-2 bg-yellow-50 rounded-lg">
                        <div className="flex items-center justify-center mb-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="ml-1 font-bold text-sm">{counselor.averageRating}</span>
                        </div>
                        <p className="text-xs text-gray-600">{counselor.totalReviews} reviews</p>
                      </div>
                      
                      <div className="text-center p-2 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-center mb-1">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span className="ml-1 font-bold text-sm">{counselor.responseTime}h</span>
                        </div>
                        <p className="text-xs text-gray-600">Response time</p>
                      </div>
                      
                      <div className="text-center p-2 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-center mb-1">
                          <Target className="h-4 w-4 text-green-500" />
                          <span className="ml-1 font-bold text-sm">{counselor.successRate}%</span>
                        </div>
                        <p className="text-xs text-gray-600">Success rate</p>
                      </div>
                      
                      <div className="text-center p-2 bg-purple-50 rounded-lg">
                        <div className="flex items-center justify-center mb-1">
                          <Users className="h-4 w-4 text-purple-500" />
                          <span className="ml-1 font-bold text-sm">{counselor.totalStudents}</span>
                        </div>
                        <p className="text-xs text-gray-600">Students helped</p>
                      </div>
                    </div>

                    {/* Achievement Badges */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {counselor.badges.slice(0, 3).map((badge) => {
                          const IconComponent = getBadgeIcon(badge)
                          return (
                            <div key={badge} className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(badge)}`}>
                              <IconComponent className="h-3 w-3 mr-1" />
                              {badge}
                            </div>
                          )
                        })}
                        {counselor.badges.length > 3 && (
                          <div className="px-2 py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-100">
                            +{counselor.badges.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {counselor.bio}
                    </p>

                    {/* Languages */}
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <Languages className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm font-medium text-gray-700">Languages:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {counselor.languages.map((language) => (
                          <Badge key={language} variant="outline" className="text-xs">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                        <span className="font-bold text-lg text-green-600">
                          ${counselor.hourlyRate}
                        </span>
                        <span className="text-sm text-gray-600 ml-1">
                          /{counselor.currency}/hour
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{counselor.yearsExperience} years exp</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleConnectNow(counselor)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Connect Now
                      </Button>
                      <Button
                        onClick={() => handleViewProfile(counselor)}
                        variant="outline"
                        className="flex-1"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredCounselors.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No counselors found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or filters to find more counselors.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedFilters({
                      specialization: '',
                      location: '',
                      rating: '',
                      availability: ''
                    })
                  }}
                  variant="outline"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

