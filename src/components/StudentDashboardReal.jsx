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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.email) {
      fetchRealStudentData()
    }
  }, [user])

  const fetchRealStudentData = async () => {
    try {
      setLoading(true)
      console.log('🔍 Fetching real student data for:', user.email)
      
      // Get student profile from database
      const studentResult = await realDatabaseService.getUserByEmail(user.email)
      
      if (studentResult.success && studentResult.data) {
        const student = studentResult.data
        console.log('👤 Student profile found:', student.full_name)
        
        // Calculate real profile completion percentage
        const profileFields = [
          student.full_name, student.nationality, student.current_location, 
          student.phone, student.current_institution, student.current_education_level,
          student.intended_field_of_study, student.target_countries, student.target_universities
        ]
        const completedFields = profileFields.filter(field => field && field.trim() !== '').length
        const profileCompletion = Math.round((completedFields / profileFields.length) * 100)
        
        // Get real counselor connection data
        const counselorData = await fetchAssignedCounselor(student.id)
        
        // Get real session data (placeholder for now - will implement session tracking)
        const sessionData = await fetchStudentSessions(student.id)
        
        // Get real application data (placeholder for now - will implement application tracking)
        const applicationData = await fetchStudentApplications(student.id)
        
        // Set real student data
        setStudentData({
          id: student.id,
          name: student.full_name || student.email.split('@')[0],
          email: student.email,
          profileCompletion: profileCompletion,
          targetCountry: student.target_countries || 'Not specified',
          fieldOfStudy: student.intended_field_of_study || 'Not specified',
          activeConnections: counselorData.hasActiveCounselor ? 1 : 0,
          totalConnections: counselorData.totalConnections,
          sessionsCompleted: sessionData.completedSessions,
          upcomingSessions: sessionData.upcomingSessions,
          upcomingDeadlines: applicationData.upcomingDeadlines,
          recentActivity: await fetchRecentActivity(student.id)
        })
        
        setAssignedCounselor(counselorData.counselor)
        
      } else {
        console.error('❌ Student profile not found in database')
        // Set minimal data to prevent blank page
        setStudentData({
          name: user?.name || 'Student',
          email: user?.email || '',
          profileCompletion: 0,
          targetCountry: 'Not specified',
          fieldOfStudy: 'Not specified',
          activeConnections: 0,
          totalConnections: 0,
          sessionsCompleted: 0,
          upcomingSessions: 0,
          upcomingDeadlines: 0,
          recentActivity: []
        })
      }
      
    } catch (error) {
      console.error('Error fetching real student data:', error)
      // Fallback to prevent blank page
      setStudentData({
        name: user?.name || 'Student',
        email: user?.email || '',
        profileCompletion: 0,
        targetCountry: 'Not specified',
        fieldOfStudy: 'Not specified',
        activeConnections: 0,
        totalConnections: 0,
        sessionsCompleted: 0,
        upcomingSessions: 0,
        upcomingDeadlines: 0,
        recentActivity: []
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchAssignedCounselor = async (studentId) => {
    try {
      console.log('🔍 Fetching counselor for student ID:', studentId)
      
      // Get all counselor requests for this student
      const requestsResult = await realDatabaseService.getAllCounselorRequests()
      
      if (requestsResult.success && requestsResult.data) {
        const studentRequests = requestsResult.data.filter(req => req.student_id === studentId)
        const approvedRequest = studentRequests.find(req => req.status === 'approved')
        
        if (approvedRequest && approvedRequest.counselors) {
          console.log('✅ Found assigned counselor:', approvedRequest.counselors.full_name)
          
          return {
            hasActiveCounselor: true,
            totalConnections: studentRequests.length,
            counselor: {
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
              connectionDate: approvedRequest.approved_at
            }
          }
        }
      }
      
      console.log('❌ No assigned counselor found')
      return {
        hasActiveCounselor: false,
        totalConnections: 0,
        counselor: null
      }
      
    } catch (error) {
      console.error('Error fetching assigned counselor:', error)
      return {
        hasActiveCounselor: false,
        totalConnections: 0,
        counselor: null
      }
    }
  }

  const fetchStudentSessions = async (studentId) => {
    // TODO: Implement real session tracking from database
    // For now, return empty data to prevent demo values
    return {
      completedSessions: 0,
      upcomingSessions: 0
    }
  }

  const fetchStudentApplications = async (studentId) => {
    // TODO: Implement real application tracking from database
    // For now, return empty data to prevent demo values
    return {
      upcomingDeadlines: 0
    }
  }

  const fetchRecentActivity = async (studentId) => {
    // TODO: Implement real activity logging from database
    // For now, return empty array to prevent demo values
    return []
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-gray-600">Unable to load student data</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Retry
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Student Dashboard</h1>
            <p className="text-xl opacity-90">Welcome, Student! Track your progress and manage your university journey</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        <GlobalSidebarManager 
          isMobileMenuOpen={isMobileMenuOpen} 
          onMobileMenuClose={onMobileMenuClose} 
        />
        
        <div className="flex-1 p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {studentData.name}! 👋</h2>
                <p className="text-gray-600">Your journey to {studentData.targetCountry} in your preferred destination</p>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => navigate('/counselor/directory')}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Find Counselors
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/student/profile')}
                >
                  <User className="w-4 h-4 mr-2" />
                  My Profile
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Profile Completion</p>
                    <p className="text-2xl font-bold text-gray-900">{studentData.profileCompletion}%</p>
                  </div>
                  <User className="h-8 w-8 text-purple-600" />
                </div>
                <Progress value={studentData.profileCompletion} className="mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Connections</p>
                    <p className="text-2xl font-bold text-gray-900">{studentData.activeConnections}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {studentData.activeConnections === 0 ? 'No counselor assigned' : 'Counselor connected'}
                    </p>
                  </div>
                  <MessageCircle className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Sessions Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{studentData.sessionsCompleted}</p>
                    <p className="text-xs text-gray-500 mt-1">{studentData.upcomingSessions} upcoming</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Upcoming Deadlines</p>
                    <p className="text-2xl font-bold text-gray-900">{studentData.upcomingDeadlines}</p>
                    <p className="text-xs text-gray-500 mt-1">Next: Not specified</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* My Counselor Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  My Counselor
                </CardTitle>
              </CardHeader>
              <CardContent>
                {assignedCounselor ? (
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{assignedCounselor.name}</h3>
                        <p className="text-sm text-gray-600">{assignedCounselor.type || 'Academic Counselor'}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{assignedCounselor.rating}</span>
                          <span className="text-sm text-gray-500">({assignedCounselor.totalReviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                    
                    {assignedCounselor.specializations && assignedCounselor.specializations.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Specializations:</p>
                        <div className="flex flex-wrap gap-2">
                          {assignedCounselor.specializations.map((spec, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {spec.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline">
                        <Video className="w-4 h-4 mr-2" />
                        Video
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-medium text-gray-900 mb-2">No Counselor Assigned</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Connect with a counselor to get personalized guidance for your university journey.
                    </p>
                    <Button 
                      onClick={() => navigate('/counselor/directory')}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Find a Counselor
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Sessions
                  </span>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {studentData.upcomingSessions === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-4">No upcoming sessions scheduled</p>
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Book a Session
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* TODO: Display actual upcoming sessions from database */}
                    <p className="text-sm text-gray-600">Sessions will appear here when scheduled</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity & Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Recent Activity
                  </span>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {studentData.recentActivity.length === 0 ? (
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600">No recent activity</p>
                    <p className="text-xs text-gray-500 mt-1">Your activities will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* TODO: Display actual recent activities from database */}
                    <p className="text-sm text-gray-600">Activities will appear here when you take actions</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Award className="h-4 w-4 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">English Proficiency Test</h4>
                      <p className="text-sm text-gray-600 mt-1">Take IELTS or TOEFL to meet university requirements</p>
                      <Button size="sm" className="mt-3">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Book Test
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

