import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { 
  User, 
  GraduationCap, 
  Globe, 
  MessageCircle, 
  Target, 
  Star,
  Edit,
  CheckCircle,
  AlertCircle,
  Calendar,
  Award,
  Languages,
  MapPin,
  TrendingUp
} from 'lucide-react'
import StudentProfileForm from './StudentProfileForm'
import Sidebar from './Sidebar'
import realDatabaseService from '../services/realDatabaseService'

export default function StudentProfileDashboardFixed({ isMobileMenuOpen, onMobileMenuClose }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [profileData, setProfileData] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [completionPercentage, setCompletionPercentage] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        console.log('🔄 Loading student profile for user:', user.email)
        
        // Fetch student profile from database using the same method as mobile
        const studentResult = await realDatabaseService.getStudentByEmail(user.email)
        console.log('📊 Student data result:', studentResult)
        
        if (studentResult.success && studentResult.data) {
          console.log('✅ Profile data loaded:', studentResult.data)
          setProfileData(studentResult.data)
          setCompletionPercentage(calculateCompletion(studentResult.data))
        } else {
          console.log('❌ No student data found or error:', studentResult)
        }
        
        setLoading(false)
      } catch (error) {
        console.error('❌ Error in fetchProfileData:', error)
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [user])

  const calculateCompletion = (data) => {
    if (!data) return 0
    
    const fields = [
      'full_name', 'email', 'phone', 'current_country', 'current_location',
      'current_institution', 'study_level', 'graduation_year', 'gpa',
      'preferred_countries', 'preferred_programs', 'budget_range',
      'languages', 'communication_style', 'timezone', 'areas_of_support',
      'urgency_level', 'extracurricular_activities', 'academic_achievements'
    ]
    
    const completedFields = fields.filter(field => {
      const value = data[field]
      return value && value !== '' && value !== null && value !== undefined
    })
    return Math.round((completedFields.length / fields.length) * 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (isEditing) {
    return (
      <div className="w-full">
        <div className="flex">
          <Sidebar 
            isMobileMenuOpen={isMobileMenuOpen} 
            onMobileMenuClose={onMobileMenuClose}
          />
          <main className="flex-1">
            <StudentProfileForm 
              initialData={profileData}
              onSave={(updatedData) => {
                setProfileData(updatedData)
                setIsEditing(false)
                setCompletionPercentage(calculateCompletion(updatedData))
              }}
              onCancel={() => setIsEditing(false)}
            />
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Hero Section - Full Width */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white py-12 w-full">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold">P</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Welcome back, {profileData?.users?.first_name && profileData?.users?.last_name 
                    ? `${profileData.users.first_name} ${profileData.users.last_name}` 
                    : 'Student'}</h1>
                  <p className="text-purple-100">Student Profile</p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm">📈 {completionPercentage}% Complete</span>
                    <div className="flex ml-2">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-4 h-4 ${i <= Math.floor(completionPercentage/20) ? 'text-yellow-400 fill-current' : 'text-white/50'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-8 text-center">
                <div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-purple-100">Connections</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-purple-100">Applications</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-purple-100">Documents</div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-sm text-purple-100 mb-2">Profile Completion</div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{width: `${completionPercentage}%`}}></div>
              </div>
              <div className="text-right text-sm text-purple-100 mt-1">{completionPercentage}%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className="flex">
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen} 
          onMobileMenuClose={onMobileMenuClose}
        />
        <main className="flex-1">
          <div className="px-6 py-8">
            <div className="max-w-7xl">
              
              {/* Edit Profile Button */}
              <div className="flex justify-end mb-6">
                <Button onClick={() => setIsEditing(true)} className="bg-purple-600 hover:bg-purple-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              {/* Profile Sections Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                
                {/* Personal Information */}
                <Card>
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="flex items-center text-blue-700">
                      <User className="h-5 w-5 mr-2" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Full Name</label>
                      <div className="text-base text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">
                        {profileData?.users?.first_name && profileData?.users?.last_name 
                          ? `${profileData.users.first_name} ${profileData.users.last_name}` 
                          : 'Not specified'}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Nationality</label>
                      <div className="text-base text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">
                        {profileData?.current_country || 'Not specified'}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Current Location</label>
                      <div className="text-base text-gray-900 bg-gray-50 px-4 py-3 rounded-lg flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        {profileData?.current_location || 'Not specified'}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Phone</label>
                      <div className="text-base text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">
                        {profileData?.users?.phone || 'Not specified'}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Academic Background */}
                <Card>
                  <CardHeader className="bg-green-50">
                    <CardTitle className="flex items-center text-green-700">
                      <GraduationCap className="h-5 w-5 mr-2" />
                      Academic Background
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Current Institution</label>
                      <div className="text-base text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">
                        {profileData?.current_institution || 'Not specified'}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Current Education Level</label>
                      <div className="text-base text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">
                        {profileData?.study_level || 'Not specified'}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Expected Graduation Year</label>
                      <div className="text-base text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">
                        {profileData?.graduation_year || 'Not specified'}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Current GPA/Grade</label>
                      <div className="text-base text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">
                        {profileData?.gpa || 'Not specified'}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Study Goals */}
                <Card>
                  <CardHeader className="bg-orange-50">
                    <CardTitle className="flex items-center text-orange-700">
                      <Target className="h-5 w-5 mr-2" />
                      Study Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Intended Field of Study</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                        {profileData?.preferred_programs || 'Not specified'}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Study Level</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                        {profileData?.study_level || 'Not specified'}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Career Interests</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                        {profileData?.career_interests || 'Not specified'}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Preferred Start Date</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                        {profileData?.preferred_start_date || 'Not specified'}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Study Preferences */}
                <Card>
                  <CardHeader className="bg-purple-50">
                    <CardTitle className="flex items-center text-purple-700">
                      <Globe className="h-5 w-5 mr-2" />
                      Study Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Target Countries</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                        {profileData?.preferred_countries || 'Not specified'}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Target Universities</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                        {profileData?.target_universities || 'Not specified'}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Interested Programs</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                        {profileData?.preferred_programs || 'Not specified'}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Budget Range</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                        {profileData?.budget_range || 'Not specified'}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Communication */}
                <Card>
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="flex items-center text-blue-700">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Communication
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Languages</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                        {profileData?.languages || 'Not specified'}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Communication Style</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                        {profileData?.communication_style || 'Not specified'}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Timezone</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                        {profileData?.timezone || 'Not specified'}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Counseling Needs */}
                <Card>
                  <CardHeader className="bg-yellow-50">
                    <CardTitle className="flex items-center text-yellow-700">
                      <Star className="h-5 w-5 mr-2" />
                      Counseling Needs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Areas of Support</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                        {profileData?.areas_of_support || 'Not specified'}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Urgency Level</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                        {profileData?.urgency_level || 'Not specified'}
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </div>

              {/* Activities & Achievements - Full Width */}
              <Card className="mb-8">
                <CardHeader className="bg-purple-50">
                  <CardTitle className="flex items-center text-purple-700">
                    <Award className="h-5 w-5 mr-2" />
                    Activities & Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Extracurricular Activities</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg border min-h-[100px]">
                        {profileData?.extracurricular_activities || 'Not specified'}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Academic Achievements</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg border min-h-[100px]">
                        {profileData?.academic_achievements || 'Not specified'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                  <CardContent className="p-6 text-center">
                    <Star className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Find Counselors</h3>
                    <p className="text-purple-100 mb-4">Get matched with counselors based on your profile</p>
                    <Button 
                      onClick={() => navigate('/counselors')}
                      className="bg-white text-gray-800 hover:bg-gray-100 w-full font-semibold"
                    >
                      Start Matching
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">My Sessions</h3>
                    <p className="text-blue-100 mb-4">View upcoming and past counseling sessions</p>
                    <Button 
                      onClick={() => navigate('/student/sessions')}
                      className="bg-white text-gray-800 hover:bg-gray-100 w-full font-semibold"
                    >
                      View Sessions
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Track Progress</h3>
                    <p className="text-green-100 mb-4">Monitor your application and goal progress</p>
                    <Button 
                      onClick={() => navigate('/student/progress')}
                      className="bg-white text-gray-800 hover:bg-gray-100 w-full font-semibold"
                    >
                      View Progress
                    </Button>
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

