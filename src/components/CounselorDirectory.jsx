import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { counselorConnectionService } from '../services/counselorConnectionService'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Checkbox } from '../components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
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
  ArrowRight
} from 'lucide-react'
import Sidebar from './Sidebar'

export default function CounselorDirectory({ isMobileMenuOpen, onMobileMenuClose }) {
  const navigate = useNavigate()
  const { isAuthenticated, user, userRole } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState({
    counselorType: '',
    specialization: '',
    location: '',
    rating: '',
    responseTime: '',
    priceRange: '',
    availability: ''
  })
  const [sortBy, setSortBy] = useState('credibility')
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [connectionStates, setConnectionStates] = useState({}) // Track connection states per counselor
  const [studentConnections, setStudentConnections] = useState([]) // Student's existing connections
  const [loading, setLoading] = useState(false)

  // Load student connections on component mount
  useEffect(() => {
    if (isAuthenticated && userRole === 'student' && user?.id) {
      loadStudentConnections()
    }
  }, [isAuthenticated, userRole, user])

  const loadStudentConnections = async () => {
    try {
      const result = await counselorConnectionService.getStudentConnections(user.id)
      if (result.success) {
        setStudentConnections(result.connections)
      }
    } catch (error) {
      console.error('Error loading student connections:', error)
    }
  }

  // Handle counselor connection
  const handleConnect = async (counselor) => {
    if (!isAuthenticated) {
      navigate('/signin')
      return
    }

    if (userRole !== 'student') {
      alert('Only students can connect with counselors')
      return
    }

    setLoading(true)
    setConnectionStates(prev => ({ ...prev, [counselor.id]: 'connecting' }))

    try {
      const result = await counselorConnectionService.createConnectionRequest(
        user.id,
        user.name || user.email,
        user.email,
        counselor.id,
        counselor.name,
        `Student interested in connecting with ${counselor.name} for ${counselor.specializations.join(', ')} guidance`
      )

      if (result.success) {
        setConnectionStates(prev => ({ ...prev, [counselor.id]: 'pending' }))
        await loadStudentConnections() // Refresh connections
        alert(result.message)
      } else {
        setConnectionStates(prev => ({ ...prev, [counselor.id]: 'error' }))
        if (result.existingRequest) {
          // Show option to cancel existing request
          const shouldCancel = window.confirm(
            `${result.error}\n\nWould you like to cancel your existing request and create a new one with ${counselor.name}?`
          )
          if (shouldCancel) {
            await handleCancelAndConnect(result.existingRequest.id, counselor)
          }
        } else {
          alert(result.error)
        }
      }
    } catch (error) {
      setConnectionStates(prev => ({ ...prev, [counselor.id]: 'error' }))
      alert('Failed to create connection request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelAndConnect = async (existingConnectionId, newCounselor) => {
    try {
      // Cancel existing request
      const cancelResult = await counselorConnectionService.cancelConnectionRequest(existingConnectionId, user.id)
      if (cancelResult.success) {
        // Create new request
        await handleConnect(newCounselor)
      } else {
        alert('Failed to cancel existing request')
      }
    } catch (error) {
      alert('Failed to process request')
    }
  }

  // Get connection status for a counselor
  const getConnectionStatus = (counselorId) => {
    const connection = studentConnections.find(conn => conn.counselorId === counselorId)
    if (connection) {
      return connection.status
    }
    return connectionStates[counselorId] || 'none'
  }

  // Get connection button text and style
  const getConnectionButton = (counselor) => {
    const status = getConnectionStatus(counselor.id)
    
    switch (status) {
      case 'pending':
        return {
          text: 'Connection Pending',
          variant: 'outline',
          disabled: true,
          icon: Clock
        }
      case 'approved':
        return {
          text: 'Connected',
          variant: 'default',
          disabled: true,
          icon: CheckCircle2
        }
      case 'connecting':
        return {
          text: 'Connecting...',
          variant: 'outline',
          disabled: true,
          icon: Clock
        }
      default:
        return {
          text: 'Connect',
          variant: 'default',
          disabled: false,
          icon: Users
        }
    }
  }

  // Sample counselor data with comprehensive performance metrics
  const [counselors] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      displayName: 'Sarah C. - Migration Expert',
      type: 'migration_agent',
      specializations: ['visa_immigration', 'postgraduate', 'career_guidance'],
      location: 'Sydney, NSW',
      languages: ['English', 'Mandarin', 'Cantonese'],
      profileImage: '/api/placeholder/150/150',
      bio: 'Registered Migration Agent with 8+ years helping international students achieve their Australian education dreams.',
      
      // Performance Metrics
      credibilityScore: 96,
      averageRating: 4.9,
      totalReviews: 127,
      responseTime: 0.8, // hours
      successRate: 94,
      totalStudents: 156,
      activeStudents: 8,
      yearsExperience: 8,
      
      // Pricing
      hourlyRate: 150,
      currency: 'AUD',
      
      // Availability
      isAvailable: true,
      nextAvailable: 'Today 2:00 PM',
      
      // Badges
      badges: ['Top Performer', 'Quick Responder', 'Student Favorite', 'Verified Expert'],
      
      // Recent Success Stories
      recentSuccesses: [
        'University of Melbourne - Master of Engineering',
        'UNSW - PhD in Computer Science',
        'Monash University - Bachelor of Business'
      ],
      
      // Verification
      isVerified: true,
      verificationDate: '2024-01-15',
      credentials: ['MARA Registration', 'Graduate Certificate in Migration Law']
    },
    {
      id: 2,
      name: 'Michael Kumar',
      displayName: 'Mike K. - Education Counselor',
      type: 'education_counselor',
      specializations: ['undergraduate', 'scholarships', 'english_language'],
      location: 'Melbourne, VIC',
      languages: ['English', 'Hindi', 'Punjabi'],
      profileImage: '/api/placeholder/150/150',
      bio: 'Passionate education counselor specializing in undergraduate programs and scholarship applications.',
      
      credibilityScore: 91,
      averageRating: 4.7,
      totalReviews: 89,
      responseTime: 1.2,
      successRate: 87,
      totalStudents: 98,
      activeStudents: 12,
      yearsExperience: 5,
      
      hourlyRate: 120,
      currency: 'AUD',
      
      isAvailable: true,
      nextAvailable: 'Tomorrow 10:00 AM',
      
      badges: ['Scholarship Expert', 'Quick Responder', 'Rising Star'],
      
      recentSuccesses: [
        'University of Sydney - Bachelor of Medicine',
        'ANU - Bachelor of Engineering',
        'UTS - Bachelor of Information Technology'
      ],
      
      isVerified: true,
      verificationDate: '2024-02-20',
      credentials: ['Bachelor of Education', 'Certified Education Counselor']
    },
    {
      id: 3,
      name: 'Emma Wilson',
      displayName: 'Emma W. - University Representative',
      type: 'university_representative',
      specializations: ['postgraduate', 'phd', 'research'],
      location: 'Brisbane, QLD',
      languages: ['English', 'French'],
      profileImage: '/api/placeholder/150/150',
      bio: 'University of Queensland representative with deep knowledge of research programs and PhD applications.',
      
      credibilityScore: 88,
      averageRating: 4.6,
      totalReviews: 64,
      responseTime: 2.1,
      successRate: 91,
      totalStudents: 72,
      activeStudents: 6,
      yearsExperience: 4,
      
      hourlyRate: 100,
      currency: 'AUD',
      
      isAvailable: false,
      nextAvailable: 'Monday 9:00 AM',
      
      badges: ['Research Expert', 'University Insider'],
      
      recentSuccesses: [
        'UQ - PhD in Environmental Science',
        'Griffith University - Master of Research',
        'QUT - Master of Data Science'
      ],
      
      isVerified: true,
      verificationDate: '2024-03-10',
      credentials: ['University of Queensland Staff ID', 'PhD in Education']
    },
    {
      id: 4,
      name: 'David Park',
      displayName: 'David P. - Visa Specialist',
      type: 'visa_specialist',
      specializations: ['visa_immigration', 'vocational', 'career_guidance'],
      location: 'Perth, WA',
      languages: ['English', 'Korean', 'Japanese'],
      profileImage: '/api/placeholder/150/150',
      bio: 'Specialized visa consultant with expertise in student visas and post-study work arrangements.',
      
      credibilityScore: 93,
      averageRating: 4.8,
      totalReviews: 103,
      responseTime: 1.5,
      successRate: 89,
      totalStudents: 134,
      activeStudents: 10,
      yearsExperience: 6,
      
      hourlyRate: 140,
      currency: 'AUD',
      
      isAvailable: true,
      nextAvailable: 'Today 4:30 PM',
      
      badges: ['Visa Expert', 'Student Favorite', 'Verified Expert'],
      
      recentSuccesses: [
        'Curtin University - Bachelor of Engineering',
        'Murdoch University - Master of Business',
        'ECU - Diploma in Information Technology'
      ],
      
      isVerified: true,
      verificationDate: '2024-01-28',
      credentials: ['Migration Agent License', 'Diploma in Immigration Law']
    }
  ])

  const [filteredCounselors, setFilteredCounselors] = useState(counselors)

  const counselorTypes = [
    { value: 'migration_agent', label: 'Migration Agent' },
    { value: 'education_counselor', label: 'Education Counselor' },
    { value: 'university_representative', label: 'University Representative' },
    { value: 'visa_specialist', label: 'Visa Specialist' },
    { value: 'independent_consultant', label: 'Independent Consultant' }
  ]

  const specializations = [
    { value: 'undergraduate', label: 'Undergraduate Programs' },
    { value: 'postgraduate', label: 'Postgraduate Programs' },
    { value: 'phd', label: 'PhD & Research' },
    { value: 'vocational', label: 'Vocational Education' },
    { value: 'english_language', label: 'English Language' },
    { value: 'visa_immigration', label: 'Visa & Immigration' },
    { value: 'scholarships', label: 'Scholarships' },
    { value: 'career_guidance', label: 'Career Guidance' }
  ]

  const locations = [
    { value: 'sydney', label: 'Sydney, NSW' },
    { value: 'melbourne', label: 'Melbourne, VIC' },
    { value: 'brisbane', label: 'Brisbane, QLD' },
    { value: 'perth', label: 'Perth, WA' },
    { value: 'adelaide', label: 'Adelaide, SA' },
    { value: 'canberra', label: 'Canberra, ACT' }
  ]

  const getCredibilityLevel = (score) => {
    if (score >= 95) return { level: 'Exceptional', color: 'text-purple-600', bg: 'bg-purple-100' }
    if (score >= 90) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' }
    if (score >= 85) return { level: 'Very Good', color: 'text-blue-600', bg: 'bg-blue-100' }
    if (score >= 80) return { level: 'Good', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    return { level: 'Fair', color: 'text-orange-600', bg: 'bg-orange-100' }
  }

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'Top Performer': return Trophy
      case 'Quick Responder': return Zap
      case 'Student Favorite': return Heart
      case 'Verified Expert': return Shield
      case 'Scholarship Expert': return Award
      case 'Rising Star': return TrendingUp
      case 'Research Expert': return BookOpen
      case 'University Insider': return GraduationCap
      case 'Visa Expert': return FileText
      default: return CheckCircle2
    }
  }

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Top Performer': return 'text-yellow-600 bg-yellow-100'
      case 'Quick Responder': return 'text-blue-600 bg-blue-100'
      case 'Student Favorite': return 'text-pink-600 bg-pink-100'
      case 'Verified Expert': return 'text-green-600 bg-green-100'
      case 'Scholarship Expert': return 'text-purple-600 bg-purple-100'
      case 'Rising Star': return 'text-orange-600 bg-orange-100'
      case 'Research Expert': return 'text-indigo-600 bg-indigo-100'
      case 'University Insider': return 'text-cyan-600 bg-cyan-100'
      case 'Visa Expert': return 'text-emerald-600 bg-emerald-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const filterCounselors = () => {
    let filtered = counselors.filter(counselor => {
      const matchesSearch = searchQuery === '' || 
        counselor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        counselor.specializations.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase())) ||
        counselor.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType = selectedFilters.counselorType === '' || counselor.type === selectedFilters.counselorType
      const matchesSpecialization = selectedFilters.specialization === '' || counselor.specializations.includes(selectedFilters.specialization)
      const matchesLocation = selectedFilters.location === '' || counselor.location.toLowerCase().includes(selectedFilters.location)
      const matchesRating = selectedFilters.rating === '' || counselor.averageRating >= parseFloat(selectedFilters.rating)
      const matchesResponseTime = selectedFilters.responseTime === '' || counselor.responseTime <= parseFloat(selectedFilters.responseTime)
      const matchesAvailability = selectedFilters.availability === '' || 
        (selectedFilters.availability === 'available' && counselor.isAvailable) ||
        (selectedFilters.availability === 'all')

      return matchesSearch && matchesType && matchesSpecialization && matchesLocation && 
             matchesRating && matchesResponseTime && matchesAvailability
    })

    // Sort counselors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'credibility':
          return b.credibilityScore - a.credibilityScore
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
        default:
          return b.credibilityScore - a.credibilityScore
      }
    })

    setFilteredCounselors(filtered)
  }

  useEffect(() => {
    filterCounselors()
  }, [searchQuery, selectedFilters, sortBy])

  const renderCounselorCard = (counselor) => {
    const credibilityLevel = getCredibilityLevel(counselor.credibilityScore)
    
    return (
      <Card key={counselor.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-6">
          {/* Header with Photo and Basic Info */}
          <div className="flex items-start space-x-4 mb-4">
            <div className="relative">
              <img 
                src={counselor.profileImage} 
                alt={counselor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              {counselor.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                  <CheckCircle2 className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900">{counselor.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{counselor.displayName}</p>
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{counselor.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${credibilityLevel.bg} ${credibilityLevel.color}`}>
                  {credibilityLevel.level} ({counselor.credibilityScore}%)
                </div>
                {counselor.isAvailable ? (
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Available
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    Next: {counselor.nextAvailable}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
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

          {/* Specializations */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {counselor.specializations.slice(0, 3).map((spec) => (
                <Badge key={spec} variant="outline" className="text-xs">
                  {specializations.find(s => s.value === spec)?.label}
                </Badge>
              ))}
              {counselor.specializations.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{counselor.specializations.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {counselor.badges.slice(0, 2).map((badge) => {
                const BadgeIcon = getBadgeIcon(badge)
                return (
                  <div key={badge} className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(badge)}`}>
                    <BadgeIcon className="h-3 w-3 mr-1" />
                    {badge}
                  </div>
                )
              })}
              {counselor.badges.length > 2 && (
                <div className="flex items-center px-2 py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-100">
                  +{counselor.badges.length - 2} more
                </div>
              )}
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{counselor.bio}</p>

          {/* Recent Successes */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Recent Successes</h4>
            <div className="space-y-1">
              {counselor.recentSuccesses.slice(0, 2).map((success, index) => (
                <div key={index} className="flex items-center text-xs text-gray-600">
                  <CheckCircle2 className="h-3 w-3 text-green-500 mr-2" />
                  {success}
                </div>
              ))}
            </div>
          </div>

          {/* Pricing and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <p className="text-lg font-bold text-gray-900">
                ${counselor.hourlyRate} <span className="text-sm font-normal text-gray-600">/{counselor.currency}/hour</span>
              </p>
              <p className="text-xs text-gray-600">{counselor.yearsExperience} years experience</p>
            </div>
            <div className="flex space-x-2">
              {/* Connect Button - Only for students */}
              {userRole === 'student' && (
                <Button 
                  size="sm"
                  variant={getConnectionButton(counselor).variant}
                  disabled={getConnectionButton(counselor).disabled}
                  onClick={() => handleConnect(counselor)}
                >
                  {React.createElement(getConnectionButton(counselor).icon, { className: "h-4 w-4 mr-1" })}
                  {getConnectionButton(counselor).text}
                </Button>
              )}
              
              {/* Message Button - Available for all authenticated users */}
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate('/signin')
                  } else {
                    // Handle message functionality for authenticated users
                    console.log('Message counselor:', counselor.name)
                  }
                }}
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Message
              </Button>
              
              {/* Book Call Button - Available for all authenticated users */}
              <Button 
                size="sm"
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate('/signin')
                  } else {
                    // Handle book call functionality for authenticated users
                    console.log('Book call with counselor:', counselor.name)
                  }
                }}
              >
                <Video className="h-4 w-4 mr-1" />
                Book Call
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full">
      {/* Hero Section - Full Width */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 text-white py-12 w-full">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              Find Your Perfect Counselor
            </h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
              Connect with verified education counselors with transparent performance metrics and proven success rates.
            </p>
          </div>
        </div>
      </section>

      {/* Two-Column Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={true}
          onClose={() => {}}
          isHomepage={false}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={onMobileMenuClose}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full md:w-auto transition-all duration-300">
          <div className="container mx-auto px-6 py-8">
            
            {/* Search and Filters */}
            <Card className="shadow-lg border-0 mb-8">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by name, specialization, or location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Filters */}
                  <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <Select value={selectedFilters.counselorType} onValueChange={(value) => setSelectedFilters(prev => ({...prev, counselorType: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Counselor Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Types</SelectItem>
                        {counselorTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedFilters.specialization} onValueChange={(value) => setSelectedFilters(prev => ({...prev, specialization: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Specializations</SelectItem>
                        {specializations.map((spec) => (
                          <SelectItem key={spec.value} value={spec.value}>
                            {spec.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedFilters.location} onValueChange={(value) => setSelectedFilters(prev => ({...prev, location: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Locations</SelectItem>
                        {locations.map((location) => (
                          <SelectItem key={location.value} value={location.value}>
                            {location.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedFilters.rating} onValueChange={(value) => setSelectedFilters(prev => ({...prev, rating: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Min Rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Rating</SelectItem>
                        <SelectItem value="4.5">4.5+ Stars</SelectItem>
                        <SelectItem value="4.0">4.0+ Stars</SelectItem>
                        <SelectItem value="3.5">3.5+ Stars</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedFilters.responseTime} onValueChange={(value) => setSelectedFilters(prev => ({...prev, responseTime: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Response Time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Time</SelectItem>
                        <SelectItem value="1">Within 1 hour</SelectItem>
                        <SelectItem value="2">Within 2 hours</SelectItem>
                        <SelectItem value="6">Within 6 hours</SelectItem>
                        <SelectItem value="24">Within 24 hours</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedFilters.availability} onValueChange={(value) => setSelectedFilters(prev => ({...prev, availability: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All</SelectItem>
                        <SelectItem value="available">Available Now</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sort and View Options */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <Label>Sort by:</Label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="credibility">Credibility Score</SelectItem>
                          <SelectItem value="rating">Rating</SelectItem>
                          <SelectItem value="experience">Experience</SelectItem>
                          <SelectItem value="responseTime">Response Time</SelectItem>
                          <SelectItem value="successRate">Success Rate</SelectItem>
                          <SelectItem value="price">Price (Low to High)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="text-sm text-gray-600">
                      {filteredCounselors.length} counselor{filteredCounselors.length !== 1 ? 's' : ''} found
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Counselor Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCounselors.map(renderCounselorCard)}
            </div>

            {/* No Results */}
            {filteredCounselors.length === 0 && (
              <Card className="shadow-lg border-0">
                <CardContent className="p-12 text-center">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No counselors found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or filters to find more counselors.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedFilters({
                        counselorType: '',
                        specialization: '',
                        location: '',
                        rating: '',
                        responseTime: '',
                        priceRange: '',
                        availability: ''
                      })
                    }}
                  >
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

