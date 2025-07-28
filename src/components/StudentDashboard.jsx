import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
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
  Eye
} from 'lucide-react'
import Sidebar from './Sidebar'

export default function StudentDashboard({ isMobileMenuOpen, onMobileMenuClose }) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [studentData, setStudentData] = useState(null)
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
          studyGoal: mappedData.intendedFieldOfStudy ? 
            `${mappedData.currentEducationLevel || 'Degree'} in ${mappedData.intendedFieldOfStudy}` : 
            'Not specified',
          preferredCountries: mappedData.preferredCountries || [],
          timeline: mappedData.timeline || 'Not specified',
          totalConnections: 3, // This could be fetched from database
          activeConnections: 2,
          completedSessions: 1,
          upcomingDeadlines: 2,
          targetUniversity: mappedData.targetUniversity || 'Not specified',
          applicationStatus: user.student_data?.application_status || 'Prospective',
          gpa: mappedData.gpa || null,
          ieltsScore: mappedData.ieltsScore || null,
          budgetRange: mappedData.budgetRange || 'Not specified',
          nationality: mappedData.nationality || 'International',
          location: mappedData.location || 'Not specified'
        }

        setStudentData(realStudentData)

        // Generate realistic activity based on user data
        const realActivity = [
          {
            id: 1,
            type: 'profile_update',
            title: 'Profile Updated',
            description: 'Updated study preferences and target universities',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            icon: 'user'
          },
          {
            id: 2,
            type: 'application_submitted',
            title: 'Application Progress',
            description: user.student_data?.target_university ? 
              `Application status: ${user.student_data.application_status}` : 
              'Ready to start applications',
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            icon: 'file'
          },
          {
            id: 3,
            type: 'counselor_message',
            title: 'Counselor Consultation',
            description: 'Discussed university options and requirements',
            timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            icon: 'message'
          }
        ]

        setRecentActivity(realActivity)

        // Generate recommendations based on mapped user data
        const realRecommendations = generateRecommendations(mappedData)
        setRecommendations(realRecommendations)

      } catch (error) {
        console.error('Error fetching student data:', error)
        // Fallback to basic user info
        setStudentData({
          name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Student',
          email: user.email || '',
          profileCompletion: 50,
          studyGoal: 'Not specified',
          preferredCountries: [],
          timeline: 'Not specified',
          totalConnections: 0,
          activeConnections: 0,
          completedSessions: 0,
          upcomingDeadlines: 0
        })
      } finally {
        setLoading(false)
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
      'intendedFieldOfStudy', 'studyLevel', 'preferredCountries',
      'counselingAreas', 'englishProficiency'
    ]
    
    const completedFields = requiredFields.filter(field => {
      if (Array.isArray(data[field])) {
        return data[field].length > 0
      }
      return data[field] && data[field].trim() !== ''
    })
    
    return Math.round((completedFields.length / requiredFields.length) * 100)
  }

  const mapUserDataToProfile = (userData) => {
    if (!userData) return {}
    
    // Create comprehensive data mapping like StudentProfileDashboard
    const data = {
      firstName: userData.first_name || '',
      lastName: userData.last_name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      currentEducationLevel: '',
      intendedFieldOfStudy: '',
      studyLevel: '',
      nationality: '',
      location: '',
      preferredCountries: [],
      targetUniversity: '',
      budgetRange: '',
      timeline: '',
      gpa: '',
      ieltsScore: '',
      toeflScore: '',
      englishProficiency: '',
      counselingAreas: []
    }

    // Override with actual data from students table if available
    if (userData.student_data) {
      Object.assign(data, {
        nationality: userData.student_data.nationality || 'International',
        location: userData.student_data.location || '',
        intendedFieldOfStudy: userData.student_data.field_of_study || '',
        currentEducationLevel: userData.student_data.degree_level || '',
        targetUniversity: userData.student_data.target_university || '',
        preferredCountries: userData.student_data.target_country ? [userData.student_data.target_country] : [],
        budgetRange: userData.student_data.budget_range || '',
        timeline: userData.student_data.start_year ? `${userData.student_data.start_year}` : '',
        gpa: userData.student_data.gpa || '',
        ieltsScore: userData.student_data.ielts_score || '',
        toeflScore: userData.student_data.toefl_score || ''
      })
    }

    // Override with actual data from student_profiles table if available
    if (userData.profile_data) {
      Object.assign(data, {
        currentEducationLevel: userData.profile_data.study_level || userData.student_data?.degree_level || '',
        intendedFieldOfStudy: userData.profile_data.field_of_study || userData.student_data?.field_of_study || '',
        studyLevel: userData.profile_data.study_level || '',
        location: userData.profile_data.current_country || userData.student_data?.location || 'India',
        preferredCountries: userData.profile_data.preferred_location ? [userData.profile_data.preferred_location] : 
                           (userData.student_data?.target_country ? [userData.student_data.target_country] : []),
        budgetRange: userData.profile_data.budget_range || userData.student_data?.budget_range || '',
        gpa: userData.profile_data.gpa || userData.student_data?.gpa || ''
      })
    }

    // Map counseling areas from field of study and career interests
    data.counselingAreas = [
      ...(data.intendedFieldOfStudy ? [data.intendedFieldOfStudy] : []),
      ...(userData.profile_data?.career_interests && Array.isArray(userData.profile_data.career_interests) ? 
          userData.profile_data.career_interests : [])
    ].filter(Boolean)

    // Set englishProficiency based on test scores
    if (data.ieltsScore || data.toeflScore) {
      data.englishProficiency = data.ieltsScore ? `IELTS ${data.ieltsScore}` : `TOEFL ${data.toeflScore}`
    }

    // Format data for human readability
    data.currentEducationLevel = formatForDisplay(data.currentEducationLevel)
    data.studyLevel = formatForDisplay(data.studyLevel)

    return data
  }

  const formatForDisplay = (value) => {
    if (!value) return value
    
    // Convert underscores to spaces and capitalize words
    return value
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  const generateRecommendations = (mappedData) => {
    if (!mappedData) return []
    
    const recommendations = []
    
    if (mappedData.intendedFieldOfStudy) {
      recommendations.push({
        id: 1,
        title: `${mappedData.intendedFieldOfStudy} Programs`,
        description: `Explore top universities for ${mappedData.intendedFieldOfStudy}`,
        type: 'university',
        priority: 'high',
        action: 'Explore Programs'
      })
    }
    
    if (mappedData.preferredCountries && mappedData.preferredCountries.length > 0) {
      recommendations.push({
        id: 2,
        title: `Study in ${mappedData.preferredCountries[0]}`,
        description: `Learn about visa requirements and application process`,
        type: 'visa',
        priority: 'medium',
        action: 'Learn More'
      })
    }
    
    if (!mappedData.ieltsScore && !mappedData.toeflScore) {
      recommendations.push({
        id: 3,
        title: 'English Proficiency Test',
        description: 'Take IELTS or TOEFL to meet university requirements',
        type: 'test',
        priority: 'high',
        action: 'Book Test'
      })
    }
    
    return recommendations
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
          <Sidebar 
            isOpen={true}
            onClose={() => {}}
            isHomepage={false}
            isMobileMenuOpen={isMobileMenuOpen}
            onMobileMenuClose={onMobileMenuClose}
          />

          <main className="flex-1 w-full md:w-auto transition-all duration-300">
            <div className="container mx-auto px-6 py-12">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading dashboard data...</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (!studentData) {
    return <div className="p-6">No student data available</div>
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'profile_update':
        return <User className="h-4 w-4 text-purple-500" />
      case 'application_submitted':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'counselor_message':
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
        <Sidebar 
          isOpen={true}
          onClose={() => {}}
          isHomepage={false}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={onMobileMenuClose}
        />

        <main className="flex-1 w-full md:w-auto transition-all duration-300">
          <div className="container mx-auto px-6 py-12">
            <div className="p-6 space-y-6">
              {/* Welcome Header */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Welcome, {studentData?.name || 'Student'}! 👋
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Your journey to {studentData?.studyGoal || 'your dream degree'} in {studentData?.preferredCountries?.join(' or ') || 'your preferred destination'}
                  </p>
                </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={() => navigate('/counselor/directory')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <p className="text-2xl font-bold text-gray-900">{studentData.activeConnections}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {studentData.totalConnections} total connections
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sessions Completed</p>
                <p className="text-2xl font-bold text-gray-900">{studentData.completedSessions}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {upcomingSessions.length} upcoming
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
              Next: {studentData.timeline}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Sessions */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Upcoming Sessions
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/student/connections')}
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            {upcomingSessions.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No upcoming sessions scheduled</p>
                <Button onClick={() => navigate('/counselor/directory')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Book a Session
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {session.counselor.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{session.counselor}</p>
                        <p className="text-sm text-gray-600">{session.topic}</p>
                        <p className="text-xs text-gray-500">
                          {formatDate(`${session.date}T${session.time}`)} • {session.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={session.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {session.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        {session.status === 'confirmed' ? 'Join' : 'View'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

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
                <div key={rec.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm text-gray-900">{rec.title}</h4>
                    <Badge size="sm" className={getPriorityColor(rec.priority)}>
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">{rec.description}</p>
                  <Button size="sm" variant="outline" className="w-full">
                    {rec.action}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

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
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(activity.timestamp)}
                  </p>
                </div>
                <Badge 
                  size="sm" 
                  className={activity.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                >
                  {activity.status}
                </Badge>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => navigate('/student/profile')}
            >
              <User className="h-6 w-6 mb-2" />
              <span>Complete Profile</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => navigate('/counselor/directory')}
            >
              <Search className="h-6 w-6 mb-2" />
              <span>Find Counselors</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => navigate('/universities')}
            >
              <BookOpen className="h-6 w-6 mb-2" />
              <span>Explore Universities</span>
            </Button>
          </div>
        </CardContent>
      </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

