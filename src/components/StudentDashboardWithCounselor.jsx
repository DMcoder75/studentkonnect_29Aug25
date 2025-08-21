import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { realDatabaseService } from '../services/realDatabaseService'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  User,
  MessageCircle,
  Calendar,
  Search,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  BookOpen,
  Target,
  Award,
  ArrowRight,
  Plus,
  Eye,
  Phone,
  Video,
  Mail,
  UserCheck
} from 'lucide-react'
import GlobalSidebarManager from './GlobalSidebarManager'

export default function StudentDashboard({ isMobileMenuOpen, onMobileMenuClose }) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [studentData, setStudentData] = useState(null)
  const [assignedCounselor, setAssignedCounselor] = useState(null)
  const [recentActivity, setRecentActivity] = useState([])
  const [upcomingSessions, setUpcomingSessions] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        // Use comprehensive data mapping like StudentProfileDashboard
        const mappedData = mapUserDataToProfile(user)
        
        const realStudentData = {
          name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Student',
          email: user.email || '',
          profileCompletion: calculateProfileCompletion(user),
          targetCountry: mappedData.targetCountry || 'Not specified',
          fieldOfStudy: mappedData.fieldOfStudy || 'Not specified',
          currentEducationLevel: mappedData.currentEducationLevel || 'Not specified',
          gpa: mappedData.gpa || 'Not specified',
          englishProficiency: mappedData.englishProficiency || 'Not specified',
          targetUniversities: mappedData.targetUniversities || [],
          activeConnections: 1, // Will be updated based on counselor assignment
          totalConnections: 1,
          sessionsCompleted: 1,
          upcomingSessions: 0,
          upcomingDeadlines: 2
        }

        setStudentData(realStudentData)

        // Fetch assigned counselor data
        await fetchAssignedCounselor()

        // Set sample data for other sections
        setRecentActivity([
          {
            id: 1,
            type: 'profile',
            title: 'Profile Updated',
            description: 'Updated study preferences and target universities',
            timestamp: '18 Aug, 11:38 pm',
            icon: User
          },
          {
            id: 2,
            type: 'application',
            title: 'Application Progress',
            description: 'Ready to start applications',
            timestamp: '15 Aug, 11:38 pm',
            icon: BookOpen
          },
          {
            id: 3,
            type: 'counselor',
            title: 'Counselor Consultation',
            description: 'Discussed university options and requirements',
            timestamp: '13 Aug, 11:38 pm',
            icon: MessageCircle
          }
        ])

        setUpcomingSessions([])

        setRecommendations([
          {
            id: 1,
            title: 'English Proficiency Test',
            description: 'Take IELTS or TOEFL to meet university requirements',
            priority: 'high',
            action: 'Book Test',
            icon: Award
          }
        ])

      } catch (error) {
        console.error('Error fetching student data:', error)
        
        // Fallback data
        setStudentData({
          name: user?.name || 'Student',
          email: user?.email || '',
          profileCompletion: 11,
          targetCountry: 'Not specified',
          fieldOfStudy: 'Not specified',
          activeConnections: 1,
          totalConnections: 1,
          sessionsCompleted: 1,
          upcomingSessions: 0,
          upcomingDeadlines: 2
        })
      } finally {
        setLoading(false)
      }
    }

    const fetchAssignedCounselor = async () => {
      try {
        console.log('🔍 Fetching assigned counselor for user:', user.email)
        
        // Get student's user ID using the more efficient getUserByEmail function
        const studentResult = await realDatabaseService.getUserByEmail(user.email)
        console.log('👤 Student lookup result:', studentResult.success, studentResult.data?.user_id)
        
        if (studentResult.success && studentResult.data) {
          const studentId = studentResult.data.user_id
          console.log('🎯 Student ID found:', studentId)
          
          // Get ALL counselor requests for debugging
          const allRequestsResult = await realDatabaseService.getAllCounselorRequests()
          console.log('📋 All counselor requests:', allRequestsResult.success, allRequestsResult.data?.length)
          
          if (allRequestsResult.success && allRequestsResult.data) {
            // Find any request for this student
            const studentRequests = allRequestsResult.data.filter(req => 
              req.student_id === studentId
            )
            console.log('🎯 Student requests found:', studentRequests.length, studentRequests.map(r => r.status))
            
            // Find approved request for this student
            const approvedRequest = studentRequests.find(req => req.status === 'approved')
            console.log('✅ Approved request:', approvedRequest ? 'YES' : 'NO')
            
            if (approvedRequest && approvedRequest.counselors) {
              console.log('👨‍🏫 Counselor data:', approvedRequest.counselors.full_name)
              
              // Set the assigned counselor data
              setAssignedCounselor({
                id: approvedRequest.counselors.id,
                name: approvedRequest.counselors.full_name,
                email: approvedRequest.counselors.email,
                type: approvedRequest.counselors.counselor_type,
                bio: approvedRequest.counselors.bio,
                experience: approvedRequest.counselors.years_experience,
                specializations: approvedRequest.counselors.specializations ? 
                  approvedRequest.counselors.specializations.split(',') : [],
                rating: approvedRequest.counselors.average_rating || 4.7,
                totalReviews: approvedRequest.counselors.total_reviews || 15,
                hourlyRate: approvedRequest.counselors.hourly_rate,
                currency: approvedRequest.counselors.currency || 'AUD',
                isAvailable: approvedRequest.counselors.is_available,
                connectionDate: approvedRequest.approved_at
              })
              
              // Update active connections count
              setStudentData(prev => ({
                ...prev,
                activeConnections: 1,
                totalConnections: 1
              }))
              
              console.log('✅ Counselor assigned successfully!')
            } else {
              console.log('❌ No approved counselor request found for this student')
              setAssignedCounselor(null)
              setStudentData(prev => ({
                ...prev,
                activeConnections: 0,
                totalConnections: 0
              }))
            }
          } else {
            console.log('❌ Failed to get counselor requests')
          }
        } else {
          console.log('❌ Student not found in database')
        }
      } catch (error) {
        console.error('❌ Error fetching assigned counselor:', error)
      }
    }

    fetchStudentData()
  }, [user])

  const calculateProfileCompletion = (userData) => {
    if (!userData) return 0
    
    // Use the same calculation method as StudentProfileDashboard
    const data = mapUserDataToProfile(userData)
    
    const requiredFields = [
      'firstName', 'lastName', 'email', 'currentEducationLevel',
      'intendedFieldOfStudy', 'preferredCountries', 'timeline'
    ]
    
    const completedFields = requiredFields.filter(field => {
      const value = data[field]
      return value && value !== '' && value !== 'Not specified' && 
             (Array.isArray(value) ? value.length > 0 : true)
    })
    
    return Math.round((completedFields.length / requiredFields.length) * 100)
  }

  const mapUserDataToProfile = (userData) => {
    if (!userData) return {}
    
    return {
      firstName: userData.first_name || '',
      lastName: userData.last_name || '',
      email: userData.email || '',
      currentEducationLevel: userData.student_data?.current_education_level || '',
      intendedFieldOfStudy: userData.student_data?.intended_field_of_study || '',
      preferredCountries: userData.student_data?.preferred_countries || [],
      timeline: userData.student_data?.timeline || '',
      targetCountry: userData.student_data?.preferred_countries?.[0] || 'Not specified',
      fieldOfStudy: userData.student_data?.intended_field_of_study || 'Not specified',
      gpa: userData.student_data?.gpa || 'Not specified',
      englishProficiency: userData.student_data?.english_proficiency || 'Not specified',
      targetUniversities: userData.student_data?.target_universities || []
    }
  }

  if (loading) {
    return (
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-12 w-full">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative w-full px-6">
            <div className="max-w-6xl mx-auto text-center">
              <div className="flex items-center justify-center mb-4">
                <User className="h-12 w-12 mr-4" />
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                  Student Dashboard
                </h1>
              </div>
              <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
                Loading your dashboard...
              </p>
            </div>
          </div>
        </section>

        {/* Two-Column Layout */}
        <div className="flex">
          {/* Left Sidebar */}
          <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
            <GlobalSidebarManager />
          </div>
          
          {/* Main Content */}
          <div className="flex-1 bg-gradient-to-br from-purple-50 via-white to-cyan-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!studentData) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-12 w-full">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <User className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Student Dashboard
              </h1>
            </div>
            <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
              Welcome, {studentData?.name || 'Student'}! Track your progress and manage your university journey
            </p>
          </div>
        </div>
      </section>

      {/* Two-Column Layout */}
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <GlobalSidebarManager />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 bg-gradient-to-br from-purple-50 via-white to-cyan-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Welcome Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {studentData.name}! 👋</h2>
                  <p className="text-gray-600">
                    Your journey to {studentData.targetCountry} in your preferred destination
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Button 
                    onClick={() => navigate('/counselor/directory')}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Find Counselors
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/student/profile')}
                  >
                    <User className="h-4 w-4 mr-2" />
                    My Profile
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Profile Completion</p>
                      <p className="text-2xl font-bold text-gray-900">{studentData.profileCompletion}%</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <Progress value={studentData.profileCompletion} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Connections</p>
                      <p className="text-2xl font-bold text-gray-900">{assignedCounselor ? 1 : 0}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {assignedCounselor ? '1 counselor assigned' : 'No counselor assigned'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Sessions Completed</p>
                      <p className="text-2xl font-bold text-gray-900">{studentData.sessionsCompleted}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {studentData.upcomingSessions} upcoming
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Upcoming Deadlines</p>
                      <p className="text-2xl font-bold text-gray-900">{studentData.upcomingDeadlines}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Next: {studentData.targetCountry}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* My Counselor Section */}
            {assignedCounselor ? (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserCheck className="h-5 w-5 mr-2 text-green-600" />
                    My Counselor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {assignedCounselor.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{assignedCounselor.name}</h3>
                          <p className="text-gray-600">{assignedCounselor.type}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{assignedCounselor.rating}</span>
                          <span className="text-gray-500 text-sm">({assignedCounselor.totalReviews} reviews)</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{assignedCounselor.bio}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {assignedCounselor.specializations.map((spec, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {spec.trim()}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-gray-600">Experience</p>
                          <p className="font-medium">{assignedCounselor.experience} years</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Rate</p>
                          <p className="font-medium">{assignedCounselor.currency} {assignedCounselor.hourlyRate}/hour</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Status</p>
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${assignedCounselor.isAvailable ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                            <span className="font-medium">{assignedCounselor.isAvailable ? 'Available' : 'Busy'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline">
                          <Video className="h-4 w-4 mr-2" />
                          Video Call
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="mb-6">
                <CardContent className="p-6 text-center">
                  <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Counselor Assigned</h3>
                  <p className="text-gray-600 mb-4">
                    Connect with a counselor to get personalized guidance for your university journey.
                  </p>
                  <Button 
                    onClick={() => navigate('/counselor/directory')}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Find a Counselor
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Two Column Layout for remaining sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Left Column */}
              <div className="space-y-6">
                
                {/* Upcoming Sessions */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Upcoming Sessions
                    </CardTitle>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {upcomingSessions.length === 0 ? (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">No upcoming sessions scheduled</p>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <Plus className="h-4 w-4 mr-2" />
                          Book a Session
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {upcomingSessions.map((session) => (
                          <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">{session.title}</p>
                              <p className="text-sm text-gray-600">{session.date} at {session.time}</p>
                            </div>
                            <Button size="sm" variant="outline">Join</Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Recent Activity
                    </CardTitle>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <activity.icon className="h-4 w-4 text-purple-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900">{activity.title}</p>
                            <p className="text-sm text-gray-600">{activity.description}</p>
                            <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                
                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recommendations.map((rec) => (
                        <div key={rec.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <rec.icon className="h-5 w-5 text-purple-600" />
                              <h4 className="font-medium">{rec.title}</h4>
                            </div>
                            <Badge 
                              variant={rec.priority === 'high' ? 'destructive' : 'secondary'}
                              className="text-xs"
                            >
                              {rec.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                          <Button size="sm" variant="outline" className="w-full">
                            <ArrowRight className="h-4 w-4 mr-2" />
                            {rec.action}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-3">
                      <Button 
                        variant="outline" 
                        className="justify-start h-auto p-4"
                        onClick={() => navigate('/student/profile')}
                      >
                        <User className="h-5 w-5 mr-3" />
                        <div className="text-left">
                          <div className="font-medium">Complete Profile</div>
                          <div className="text-sm text-gray-600">Add more details to your profile</div>
                        </div>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="justify-start h-auto p-4"
                        onClick={() => navigate('/counselor/directory')}
                      >
                        <Search className="h-5 w-5 mr-3" />
                        <div className="text-left">
                          <div className="font-medium">Find Counselors</div>
                          <div className="text-sm text-gray-600">Connect with education experts</div>
                        </div>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="justify-start h-auto p-4"
                        onClick={() => navigate('/universities')}
                      >
                        <BookOpen className="h-5 w-5 mr-3" />
                        <div className="text-left">
                          <div className="font-medium">Explore Universities</div>
                          <div className="text-sm text-gray-600">Discover your perfect match</div>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

