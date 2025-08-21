import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { counselorConnectionService } from '../services/counselorConnectionService'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Search,
  Star,
  Clock,
  MapPin,
  Shield,
  CheckCircle2,
  Award,
  Users,
  DollarSign,
  Globe,
  Calendar,
  TrendingUp,
  BookOpen,
  Loader2
} from 'lucide-react'
import Sidebar from './Sidebar'
import ContactCounselorModal from './ContactCounselorModal'

export default function CounselorDirectorySimple({ isMobileMenuOpen, onMobileMenuClose }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [selectedCounselor, setSelectedCounselor] = useState(null)
  const [connectionStates, setConnectionStates] = useState({})
  const [studentConnections, setStudentConnections] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated, user, userRole } = useAuth()

  // Load student connections on component mount
  useEffect(() => {
    if (isAuthenticated() && userRole === 'student' && user?.email) {
      loadStudentConnections()
    }
  }, [isAuthenticated, userRole, user])

  const loadStudentConnections = async () => {
    try {
      const result = await counselorConnectionService.getStudentConnections(user.email)
      if (result.success) {
        setStudentConnections(result.connections)
      }
    } catch (error) {
      console.error('Error loading student connections:', error)
    }
  }

  // Handle counselor connection
  const handleConnect = async (counselor) => {
    if (!isAuthenticated()) {
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
        user.full_name || user.email,
        user.email,
        counselor.email,
        counselor.name,
        `Student interested in connecting with ${counselor.name} for ${counselor.specializations.join(', ')} guidance`
      )

      if (result.success) {
        setConnectionStates(prev => ({ ...prev, [counselor.id]: 'pending' }))
        await loadStudentConnections()
        alert(result.message)
      } else {
        setConnectionStates(prev => ({ ...prev, [counselor.id]: 'error' }))
        if (result.existingRequest) {
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
      const cancelResult = await counselorConnectionService.cancelConnectionRequest(existingConnectionId, user.id)
      if (cancelResult.success) {
        await handleConnect(newCounselor)
      } else {
        alert('Failed to cancel existing request')
      }
    } catch (error) {
      alert('Failed to process request')
    }
  }

  // Get connection status for a counselor
  const getConnectionStatus = (counselorEmail) => {
    const connection = studentConnections.find(conn => conn.counselor_id === counselorEmail)
    return connection ? connection.status : null
  }

  // Enhanced counselor data with comprehensive professional information
  const counselors = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      email: 'sarah.chen@studentkonnect.com',
      title: 'Senior Migration Counselor',
      rank: 'Expert Level',
      location: 'Sydney, NSW',
      profileImage: '/api/placeholder/150/150',
      bio: 'Registered Migration Agent (MARN: 1578963) with 8+ years helping international students navigate Australian immigration.',
      
      // Professional Details
      experience: '8+ years',
      qualification: 'PhD in International Education, Master of Migration Law',
      languages: ['English', 'Mandarin', 'Cantonese'],
      
      // Performance Metrics
      credibilityScore: 96,
      averageRating: 4.9,
      totalReviews: 127,
      responseTime: 0.8,
      successRate: 94,
      studentsHelped: 450,
      
      // Areas of Expertise
      specializations: [
        'Student Visa Applications',
        'Post-Study Work Visas',
        'Permanent Residency Pathways',
        'Visa Compliance & Extensions'
      ],
      
      // Services Offered
      services: [
        'Visa Application Assistance',
        'Document Preparation',
        'Immigration Consultation',
        'Compliance Monitoring'
      ],
      
      // Availability & Pricing
      hourlyRate: 120,
      currency: 'AUD',
      availableSlots: ['Morning', 'Afternoon'],
      timezone: 'AEST',
      
      // Status
      isAvailable: true,
      isVerified: true,
      isPremium: true,
      
      // Achievements & Badges
      badges: ['Top Performer', 'Quick Responder', 'Student Favorite', 'Migration Expert'],
      achievements: [
        '94% visa approval rate',
        '450+ students successfully placed',
        'MARA Registered Agent'
      ]
    },
    {
      id: 2,
      name: 'Michael Thompson',
      email: 'michael.thompson@studentkonnect.com',
      title: 'University Admissions Specialist',
      rank: 'Senior Level',
      location: 'Melbourne, VIC',
      profileImage: '/api/placeholder/150/150',
      bio: 'Former university admissions officer with 12+ years experience in Australian higher education sector.',
      
      // Professional Details
      experience: '12+ years',
      qualification: 'Master of Education Administration, Bachelor of Arts',
      languages: ['English', 'French'],
      
      // Performance Metrics
      credibilityScore: 92,
      averageRating: 4.7,
      totalReviews: 89,
      responseTime: 1.2,
      successRate: 89,
      studentsHelped: 320,
      
      // Areas of Expertise
      specializations: [
        'University Applications',
        'Course Selection Guidance',
        'Scholarship Applications',
        'Academic Planning'
      ],
      
      // Services Offered
      services: [
        'University Application Review',
        'Personal Statement Writing',
        'Interview Preparation',
        'Academic Pathway Planning'
      ],
      
      // Availability & Pricing
      hourlyRate: 95,
      currency: 'AUD',
      availableSlots: ['Evening', 'Weekend'],
      timezone: 'AEST',
      
      // Status
      isAvailable: true,
      isVerified: true,
      isPremium: false,
      
      // Achievements & Badges
      badges: ['University Insider', 'Verified Expert', 'Scholarship Specialist'],
      achievements: [
        '89% admission success rate',
        '320+ students placed',
        'Former Admissions Officer'
      ]
    },
    {
      id: 3,
      name: 'Prof. Rajesh Kumar',
      email: 'rajesh.kumar@studentkonnect.com',
      title: 'Academic Excellence Advisor',
      rank: 'Master Level',
      location: 'Perth, WA',
      profileImage: '/api/placeholder/150/150',
      bio: 'Professor of Engineering with extensive experience in guiding international students through technical programs.',
      
      // Professional Details
      experience: '15+ years',
      qualification: 'PhD in Mechanical Engineering, MEng, BEng',
      languages: ['English', 'Hindi', 'Punjabi'],
      
      // Performance Metrics
      credibilityScore: 98,
      averageRating: 4.95,
      totalReviews: 156,
      responseTime: 0.5,
      successRate: 97,
      studentsHelped: 580,
      
      // Areas of Expertise
      specializations: [
        'Engineering Programs',
        'Research Opportunities',
        'PhD Applications',
        'Technical Career Guidance'
      ],
      
      // Services Offered
      services: [
        'Academic Mentoring',
        'Research Proposal Review',
        'Technical Interview Prep',
        'Career Development'
      ],
      
      // Availability & Pricing
      hourlyRate: 150,
      currency: 'AUD',
      availableSlots: ['Morning', 'Evening'],
      timezone: 'AWST',
      
      // Status
      isAvailable: true,
      isVerified: true,
      isPremium: true,
      
      // Achievements & Badges
      badges: ['Master Counselor', 'Research Expert', 'Top Rated', 'Engineering Specialist'],
      achievements: [
        '97% program acceptance rate',
        '580+ students mentored',
        'Published Researcher'
      ]
    },
    {
      id: 4,
      name: 'Emma Williams',
      email: 'emma.williams@studentkonnect.com',
      title: 'Student Support Coordinator',
      rank: 'Professional Level',
      location: 'Brisbane, QLD',
      profileImage: '/api/placeholder/150/150',
      bio: 'Dedicated student counselor specializing in holistic support for international students throughout their journey.',
      
      // Professional Details
      experience: '6+ years',
      qualification: 'Master of Counseling Psychology, Bachelor of Social Work',
      languages: ['English', 'Spanish'],
      
      // Performance Metrics
      credibilityScore: 88,
      averageRating: 4.6,
      totalReviews: 73,
      responseTime: 1.5,
      successRate: 85,
      studentsHelped: 240,
      
      // Areas of Expertise
      specializations: [
        'Student Wellbeing',
        'Cultural Adaptation',
        'Academic Support',
        'Career Counseling'
      ],
      
      // Services Offered
      services: [
        'Personal Counseling',
        'Study Skills Development',
        'Stress Management',
        'Goal Setting'
      ],
      
      // Availability & Pricing
      hourlyRate: 80,
      currency: 'AUD',
      availableSlots: ['Afternoon', 'Evening'],
      timezone: 'AEST',
      
      // Status
      isAvailable: true,
      isVerified: true,
      isPremium: false,
      
      // Achievements & Badges
      badges: ['Student Advocate', 'Wellness Expert', 'Caring Mentor'],
      achievements: [
        '85% student satisfaction',
        '240+ students supported',
        'Certified Counselor'
      ]
    },
    {
      id: 5,
      name: 'Dr. James Mitchell',
      email: 'james.mitchell@studentkonnect.com',
      title: 'Business & MBA Specialist',
      rank: 'Expert Level',
      location: 'Adelaide, SA',
      profileImage: '/api/placeholder/150/150',
      bio: 'Former business school dean with deep expertise in MBA admissions and business career development.',
      
      // Professional Details
      experience: '20+ years',
      qualification: 'PhD in Business Administration, MBA, CPA',
      languages: ['English', 'German'],
      
      // Performance Metrics
      credibilityScore: 95,
      averageRating: 4.8,
      totalReviews: 112,
      responseTime: 1.0,
      successRate: 92,
      studentsHelped: 380,
      
      // Areas of Expertise
      specializations: [
        'MBA Applications',
        'Business School Selection',
        'Executive Programs',
        'Career Transitions'
      ],
      
      // Services Offered
      services: [
        'MBA Application Strategy',
        'Essay Review & Editing',
        'Interview Coaching',
        'Career Planning'
      ],
      
      // Availability & Pricing
      hourlyRate: 140,
      currency: 'AUD',
      availableSlots: ['Morning', 'Afternoon'],
      timezone: 'ACST',
      
      // Status
      isAvailable: false,
      isVerified: true,
      isPremium: true,
      
      // Achievements & Badges
      badges: ['MBA Expert', 'Former Dean', 'Business Leader', 'Executive Coach'],
      achievements: [
        '92% MBA acceptance rate',
        '380+ business students guided',
        'Former Business School Dean'
      ]
    }
  ]

  const [filteredCounselors, setFilteredCounselors] = useState(counselors)

  useEffect(() => {
    const filtered = counselors.filter(counselor => 
      searchQuery === '' || 
      counselor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      counselor.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredCounselors(filtered)
  }, [searchQuery])

  const getCredibilityLevel = (score) => {
    if (score >= 95) return { level: 'Exceptional', color: 'text-purple-600', bg: 'bg-purple-100' }
    if (score >= 90) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' }
    if (score >= 85) return { level: 'Very Good', color: 'text-blue-600', bg: 'bg-blue-100' }
    return { level: 'Good', color: 'text-yellow-600', bg: 'bg-yellow-100' }
  }

  const getRankColor = (rank) => {
    switch (rank) {
      case 'Master Level':
        return { bg: 'bg-gradient-to-r from-purple-500 to-pink-500', text: 'text-white' }
      case 'Expert Level':
        return { bg: 'bg-gradient-to-r from-blue-500 to-cyan-500', text: 'text-white' }
      case 'Senior Level':
        return { bg: 'bg-gradient-to-r from-green-500 to-emerald-500', text: 'text-white' }
      case 'Professional Level':
        return { bg: 'bg-gradient-to-r from-orange-500 to-yellow-500', text: 'text-white' }
      default:
        return { bg: 'bg-gray-500', text: 'text-white' }
    }
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
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
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search counselors by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                />
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCounselors.map((counselor) => {
                const credibilityLevel = getCredibilityLevel(counselor.credibilityScore)
                const rankColor = getRankColor(counselor.rank)
                
                return (
                  <Card key={counselor.id} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6">
                      {/* Header with Photo and Basic Info */}
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="relative">
                          <img 
                            src={counselor.profileImage} 
                            alt={counselor.name}
                            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                          />
                          {counselor.isVerified && (
                            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                              <CheckCircle2 className="h-4 w-4 text-white" />
                            </div>
                          )}
                          {counselor.isPremium && (
                            <div className="absolute -top-1 -left-1 bg-yellow-500 rounded-full p-1">
                              <Award className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 mb-1">{counselor.name}</h3>
                          <p className="text-sm font-medium text-gray-700 mb-2">{counselor.title}</p>
                          
                          {/* Professional Rank */}
                          <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${rankColor.bg} ${rankColor.text}`}>
                            {counselor.rank}
                          </div>
                          
                          <div className="flex items-center space-x-2 mb-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{counselor.location}</span>
                          </div>
                          
                          {/* Experience & Languages */}
                          <div className="flex items-center space-x-3 text-xs text-gray-600 mb-2">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {counselor.experience}
                            </div>
                            <div className="flex items-center">
                              <Globe className="h-3 w-3 mr-1" />
                              {counselor.languages.slice(0, 2).join(', ')}
                            </div>
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
                              <Badge variant="secondary" className="bg-red-100 text-red-800">
                                Busy
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Key Performance Metrics */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
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
                          <p className="text-xs text-gray-600">Response</p>
                        </div>

                        <div className="text-center p-2 bg-green-50 rounded-lg">
                          <div className="flex items-center justify-center mb-1">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span className="ml-1 font-bold text-sm">{counselor.successRate}%</span>
                          </div>
                          <p className="text-xs text-gray-600">Success</p>
                        </div>
                      </div>

                      {/* Additional Metrics */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="text-center p-2 bg-purple-50 rounded-lg">
                          <div className="flex items-center justify-center mb-1">
                            <Users className="h-4 w-4 text-purple-500" />
                            <span className="ml-1 font-bold text-sm">{counselor.studentsHelped}</span>
                          </div>
                          <p className="text-xs text-gray-600">Students helped</p>
                        </div>
                        
                        <div className="text-center p-2 bg-orange-50 rounded-lg">
                          <div className="flex items-center justify-center mb-1">
                            <DollarSign className="h-4 w-4 text-orange-500" />
                            <span className="ml-1 font-bold text-sm">${counselor.hourlyRate}</span>
                          </div>
                          <p className="text-xs text-gray-600">{counselor.currency}/hour</p>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{counselor.bio}</p>

                      {/* Specializations */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          Specializations
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {counselor.specializations.slice(0, 3).map((spec, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                              {spec}
                            </Badge>
                          ))}
                          {counselor.specializations.length > 3 && (
                            <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600">
                              +{counselor.specializations.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Top Achievements */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                          <Award className="h-4 w-4 mr-1" />
                          Key Achievements
                        </h4>
                        <div className="space-y-1">
                          {counselor.achievements.slice(0, 2).map((achievement, index) => (
                            <div key={index} className="flex items-center text-xs text-gray-600">
                              <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                              {achievement}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Professional Badges */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {counselor.badges.slice(0, 3).map((badge, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                            {badge}
                          </Badge>
                        ))}
                      </div>

                      {/* Availability */}
                      <div className="mb-4 p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Available:</span>
                          <span className="font-medium text-gray-800">
                            {counselor.availableSlots.join(', ')} ({counselor.timezone})
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <Button 
                          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                          disabled={!counselor.isAvailable}
                          onClick={() => navigate(`/counselor/profile/${counselor.id}`)}
                        >
                          View Profile
                        </Button>
                        
                        {/* Connect Button - Only for students */}
                        {userRole === 'student' && (
                          <Button 
                            variant="default"
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            disabled={!counselor.isAvailable || loading}
                            onClick={() => handleConnect(counselor)}
                          >
                            {connectionStates[counselor.id] === 'connecting' ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                Connecting...
                              </>
                            ) : getConnectionStatus(counselor.email) === 'pending' ? (
                              <>
                                <Clock className="h-4 w-4 mr-1" />
                                Pending
                              </>
                            ) : getConnectionStatus(counselor.email) === 'approved' ? (
                              <>
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Connected
                              </>
                            ) : (
                              <>
                                <Users className="h-4 w-4 mr-1" />
                                Connect
                              </>
                            )}
                          </Button>
                        )}
                        
                        <Button 
                          variant="outline" 
                          className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50"
                          disabled={!counselor.isAvailable}
                          onClick={() => {
                            setSelectedCounselor(counselor)
                            setContactModalOpen(true)
                          }}
                        >
                          Contact Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredCounselors.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No counselors found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria to find more counselors.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchQuery('')}
                  >
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>

      {/* Contact Modal */}
      <ContactCounselorModal
        counselor={selectedCounselor}
        isOpen={contactModalOpen}
        onClose={() => {
          setContactModalOpen(false)
          setSelectedCounselor(null)
        }}
      />
    </div>
  )
}

