import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
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
  MapPin
} from 'lucide-react'
import StudentProfileForm from './StudentProfileForm'
import Sidebar from './Sidebar'
import realDatabaseService from '../services/realDatabaseService'

export default function StudentProfileDashboard({ isMobileMenuOpen, onMobileMenuClose }) {
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
        
        // Fetch student profile from database
        const { data: studentProfile, error } = await realDatabaseService.supabase
          .from('student_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()

        let profileFromDB = null
        if (!error && studentProfile) {
          profileFromDB = studentProfile
          console.log('✅ Found student profile in database:', profileFromDB)
        } else {
          console.log('❌ No student profile found, using basic user data')
        }
        
        // Create comprehensive profile data
        const data = {
          // Basic info from users table
          firstName: user.first_name || '',
          lastName: user.last_name || '',
          email: user.email || '',
          phone: user.phone || '',
          
          // Profile data from student_profiles table
          currentInstitution: profileFromDB?.current_institution || '',
          studyLevel: profileFromDB?.study_level || '',
          intendedFieldOfStudy: profileFromDB?.field_of_study || '',
          graduationYear: profileFromDB?.graduation_year || '',
          gpa: profileFromDB?.gpa || '',
          preferredLocation: profileFromDB?.preferred_location || '',
          currentLocation: profileFromDB?.current_country || '',
          budgetRange: profileFromDB?.budget_range || '',
          interestedDegree: profileFromDB?.interested_degree || '',
          
          // Parse JSON arrays safely
          universityPreferences: profileFromDB?.university_preferences || [],
          careerInterests: profileFromDB?.career_interests || [],
          extracurricularActivities: profileFromDB?.extracurricular_activities || [],
          achievements: profileFromDB?.achievements || [],
          languages: profileFromDB?.languages || ['English'],
          
          // Additional fields
          communicationStyle: profileFromDB?.communication_style || '',
          
          // Legacy compatibility fields
          currentEducationLevel: profileFromDB?.study_level || '',
          preferredCountries: profileFromDB?.preferred_location ? [profileFromDB.preferred_location] : [],
          counselingAreas: profileFromDB?.career_interests || [],
          englishProficiency: 'Advanced',
          nationality: 'International',
          studentType: '',
          yearLevel: '',
          profilePictureUrl: '',
          location: profileFromDB?.current_country || '',
          targetUniversity: '',
          timeline: '',
          ieltsScore: '',
          toeflScore: '',
          satScore: '',
          greScore: '',
          gmatScore: '',
          scholarshipInterest: false,
          applicationStatus: '',
          intakePreference: '',
          additionalInfo: ''
        }

        console.log('📊 Final profile data:', data)
        setProfileData(data)
        setCompletionPercentage(calculateCompletion(data))
      } catch (error) {
        console.error('❌ Error loading profile:', error)
        // Set basic profile data on error
        setProfileData({
          firstName: user.first_name || '',
          lastName: user.last_name || '',
          email: user.email || '',
          phone: user.phone || '',
          currentInstitution: '',
          studyLevel: '',
          intendedFieldOfStudy: '',
          graduationYear: '',
          gpa: '',
          preferredLocation: '',
          currentLocation: '',
          budgetRange: '',
          universityPreferences: [],
          careerInterests: [],
          extracurricularActivities: [],
          achievements: [],
          languages: ['English']
        })
        setCompletionPercentage(0)
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [user])

  const calculateCompletion = (data) => {
    const requiredFields = [
      'firstName', 'lastName', 'email', 'currentEducationLevel',
      'intendedFieldOfStudy', 'studyLevel', 'preferredCountries',
      'counselingAreas', 'englishProficiency'
    ]
    
    const completedFields = requiredFields.filter(field => {
      const value = data[field]
      return value && value !== '' && (!Array.isArray(value) || value.length > 0)
    })
    
    return Math.round((completedFields.length / requiredFields.length) * 100)
  }
          calculateCompletion(data)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [user])

  const calculateCompletion = (data) => {
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
    
    const percentage = (completedFields.length / requiredFields.length) * 100
    setCompletionPercentage(Math.round(percentage))
  }

  const handleProfileUpdate = (updatedData) => {
    setProfileData(updatedData)
    calculateCompletion(updatedData)
    setIsEditing(false)
  }

  const getCompletionStatus = () => {
    if (completionPercentage >= 90) return { status: 'complete', color: 'text-green-600', bg: 'bg-green-100' }
    if (completionPercentage >= 70) return { status: 'good', color: 'text-blue-600', bg: 'bg-blue-100' }
    if (completionPercentage >= 50) return { status: 'partial', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    return { status: 'incomplete', color: 'text-red-600', bg: 'bg-red-100' }
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
                  My Profile
                </h1>
              </div>
              <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
                Loading your profile information...
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
                  <p className="text-gray-600">Loading profile data...</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  // Only show edit mode when explicitly requested by user action
  if (isEditing) {
    return (
      <StudentProfileForm 
        onComplete={handleProfileUpdate}
        initialData={profileData || {}}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={onMobileMenuClose}
      />
    )
  }

  // Ensure we always have some profile data to display
  if (!profileData) {
    const defaultData = {
      firstName: user?.first_name || '',
      lastName: user?.last_name || '',
      email: user?.email || '',
      phone: user?.phone || '',
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
      satScore: '',
      greScore: '',
      gmatScore: '',
      englishProficiency: '',
      scholarshipInterest: false,
      applicationStatus: '',
      intakePreference: '',
      currentInstitution: '',
      graduationYear: '',
      preferredLocation: '',
      universityPreferences: '',
      careerInterests: '',
      extracurricularActivities: '',
      achievements: '',
      counselingAreas: [],
      additionalInfo: ''
    }
    setProfileData(defaultData)
    calculateCompletion(defaultData)
  }

  const completionStatus = getCompletionStatus()

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
                My Profile
              </h1>
            </div>
            <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
              Manage your personal information and study preferences
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
            <div className="max-w-6xl mx-auto p-6 space-y-6">
              
              {/* Show loading or error state if profileData is not available */}
              {!profileData ? (
                <div className="text-center py-12">
                  <User className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h2 className="text-xl font-semibold text-gray-600 mb-2">Loading Profile...</h2>
                  <p className="text-gray-500">Please wait while we fetch your profile information.</p>
                </div>
              ) : (
                <>
      {/* Header Card */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-50 to-cyan-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-full p-3">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {profileData.firstName} {profileData.lastName}
                </h1>
                <p className="text-gray-600">{profileData.email}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={`${completionStatus.bg} ${completionStatus.color} border-0`}>
                    {completionStatus.status === 'complete' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {completionStatus.status !== 'complete' && <AlertCircle className="h-3 w-3 mr-1" />}
                    {completionPercentage}% Complete
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Profile Completion</span>
              <span>{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <User className="h-5 w-5 mr-2 text-purple-600" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-medium">{profileData.firstName} {profileData.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Nationality</p>
                <p className="font-medium">{profileData.nationality || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Location</p>
                <p className="font-medium flex items-center">
                  <Globe className="h-4 w-4 mr-1 text-gray-400" />
                  {profileData.currentLocation || profileData.location || 'Not specified'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{profileData.phone || 'Not provided'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Background */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <GraduationCap className="h-5 w-5 mr-2 text-purple-600" />
              Academic Background
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Current Institution</p>
              <p className="font-medium">{profileData.currentInstitution || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Education Level</p>
              <p className="font-medium capitalize">{profileData.currentEducationLevel?.replace('-', ' ') || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Expected Graduation Year</p>
              <p className="font-medium">{profileData.graduationYear || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Current GPA/Grade</p>
              <p className="font-medium">{profileData.gpa || 'Not provided'}</p>
            </div>
            {profileData.testScores && Object.values(profileData.testScores).some(score => score) && (
              <div>
                <p className="text-sm text-gray-600">Test Scores</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {Object.entries(profileData.testScores).map(([test, score]) => 
                    score && (
                      <Badge key={test} variant="secondary" className="text-xs">
                        {test.toUpperCase()}: {score}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Study Goals */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Target className="h-5 w-5 mr-2 text-purple-600" />
              Study Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Intended Field of Study</p>
              <p className="font-medium">{profileData.intendedFieldOfStudy || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Study Level</p>
              <p className="font-medium capitalize">{profileData.studyLevel?.replace('-', ' ') || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Career Interests</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {profileData.careerInterests?.length > 0 ? 
                  profileData.careerInterests.map(interest => (
                    <Badge key={interest} variant="outline" className="text-xs bg-blue-50 text-blue-700">
                      {interest}
                    </Badge>
                  )) : <p className="text-sm text-gray-500">Not specified</p>
                }
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Preferred Start Date</p>
              <p className="font-medium flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                {profileData.preferredStartDate || 'Flexible'}
              </p>
            </div>
            {profileData.careerGoals && (
              <div>
                <p className="text-sm text-gray-600">Career Goals</p>
                <p className="text-sm text-gray-700 line-clamp-3">{profileData.careerGoals}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Globe className="h-5 w-5 mr-2 text-purple-600" />
              Study Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Preferred Countries</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {profileData.preferredCountries?.length > 0 ? 
                  profileData.preferredCountries.map(country => (
                    <Badge key={country} variant="outline" className="text-xs">
                      {country}
                    </Badge>
                  )) : 
                  profileData.preferredLocation ? (
                    <Badge variant="outline" className="text-xs">
                      {profileData.preferredLocation}
                    </Badge>
                  ) : <p className="text-sm text-gray-500">None selected</p>
                }
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">University Preferences</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {profileData.universityPreferences?.length > 0 ? 
                  profileData.universityPreferences.map(university => (
                    <Badge key={university} variant="secondary" className="text-xs">
                      {university}
                    </Badge>
                  )) : <p className="text-sm text-gray-500">Not specified</p>
                }
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Budget Range</p>
              <p className="font-medium">{profileData.budgetRange || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Scholarship Interest</p>
              <Badge className={profileData.scholarshipInterest ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}>
                {profileData.scholarshipInterest ? 'Yes' : 'No'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Communication */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <MessageCircle className="h-5 w-5 mr-2 text-purple-600" />
              Communication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Languages</p>
              <div className="flex items-center space-x-2">
                <Languages className="h-4 w-4 text-gray-400" />
                <div className="flex flex-wrap gap-1">
                  {profileData.languages?.map(lang => (
                    <Badge key={lang} variant="secondary" className="text-xs">
                      {lang}
                    </Badge>
                  )) || <p className="text-sm text-gray-500">Not specified</p>}
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Communication Style</p>
              <p className="font-medium">{profileData.communicationStyle || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Timezone</p>
              <p className="font-medium">{profileData.timezone || 'Not specified'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Counseling Needs */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Star className="h-5 w-5 mr-2 text-purple-600" />
              Counseling Needs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Areas of Support</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {profileData.counselingAreas?.map(area => (
                  <Badge key={area} className="bg-purple-100 text-purple-800 text-xs">
                    {area}
                  </Badge>
                )) || <p className="text-sm text-gray-500">None selected</p>}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Urgency Level</p>
              <p className="font-medium capitalize">{profileData.urgencyLevel?.replace('-', ' ') || 'Not specified'}</p>
            </div>
            {profileData.specificChallenges && (
              <div>
                <p className="text-sm text-gray-600">Specific Challenges</p>
                <p className="text-sm text-gray-700 line-clamp-3">{profileData.specificChallenges}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Extracurricular Activities & Achievements */}
        <Card className="shadow-lg border-0 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Award className="h-5 w-5 mr-2 text-purple-600" />
              Activities & Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Extracurricular Activities</p>
              <div className="flex flex-wrap gap-2">
                {profileData.extracurricularActivities?.length > 0 ? 
                  profileData.extracurricularActivities.map(activity => (
                    <Badge key={activity} variant="secondary" className="text-xs bg-green-50 text-green-700">
                      {activity}
                    </Badge>
                  )) : <p className="text-sm text-gray-500">Not specified</p>
                }
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Academic Achievements</p>
              <div className="flex flex-wrap gap-2">
                {profileData.achievements?.length > 0 ? 
                  profileData.achievements.map(achievement => (
                    <Badge key={achievement} variant="secondary" className="text-xs bg-yellow-50 text-yellow-700">
                      {achievement}
                    </Badge>
                  )) : <p className="text-sm text-gray-500">Not specified</p>
                }
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="p-6 text-center">
            <Award className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Find Counselors</h3>
            <p className="text-sm text-gray-600 mb-4">Get matched with counselors based on your profile</p>
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={() => navigate('/counselor/directory')}
            >
              Start Matching
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-r from-cyan-50 to-cyan-100">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-cyan-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">My Sessions</h3>
            <p className="text-sm text-gray-600 mb-4">View upcoming and past counseling sessions</p>
            <Button variant="outline" className="w-full border-cyan-600 text-cyan-600 hover:bg-cyan-50">
              View Sessions
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Track Progress</h3>
            <p className="text-sm text-gray-600 mb-4">Monitor your application and goal progress</p>
            <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
              View Progress
            </Button>
          </CardContent>
        </Card>
      </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

