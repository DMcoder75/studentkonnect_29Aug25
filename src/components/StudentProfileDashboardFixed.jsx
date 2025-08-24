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
  const [activeTab, setActiveTab] = useState('personal')

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
          nationality: profileFromDB?.current_country || profileFromDB?.nationality || 'India'
        }

        console.log('📊 Final profile data:', data)
        console.log('🔍 Nationality debug:', {
          current_country: profileFromDB?.current_country,
          nationality_set: data.nationality,
          profileFromDB: profileFromDB
        })
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
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <Sidebar 
            isMobileMenuOpen={isMobileMenuOpen} 
            onMobileMenuClose={onMobileMenuClose}
          />
          <div className="flex-1 lg:ml-64">
            <StudentProfileForm 
              initialData={profileData}
              onSave={(updatedData) => {
                setProfileData(updatedData)
                setIsEditing(false)
                setCompletionPercentage(calculateCompletion(updatedData))
              }}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen} 
          onMobileMenuClose={onMobileMenuClose}
        />
        <div className="flex-1 lg:ml-64">
          {/* Desktop View - Keep existing layout */}
          <div className="hidden md:block p-6">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
                <p className="text-gray-600">Manage your personal information and preferences</p>
              </div>

              {/* Profile Completion */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Profile Completion</h3>
                      <p className="text-sm text-gray-600">Complete your profile to get better recommendations</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">{completionPercentage}%</div>
                      <div className="text-sm text-gray-500">Complete</div>
                    </div>
                  </div>
                  <Progress value={completionPercentage} className="h-2" />
                </CardContent>
              </Card>

              {/* Basic Information */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Basic Information
                    </span>
                    <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <p className="text-gray-900">{profileData?.email || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Name</label>
                      <p className="text-gray-900">
                        {profileData?.firstName && profileData?.lastName 
                          ? `${profileData.firstName} ${profileData.lastName}` 
                          : 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Nationality</label>
                      <p className="text-gray-900">{profileData?.nationality || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Phone</label>
                      <p className="text-gray-900">{profileData?.phone || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Field of Study</label>
                      <p className="text-gray-900">{profileData?.intendedFieldOfStudy || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Target Country</label>
                      <p className="text-gray-900">{profileData?.preferredLocation || 'Not specified'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Academic Information */}
              {(profileData?.currentInstitution || profileData?.gpa || profileData?.graduationYear) && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <GraduationCap className="h-5 w-5 mr-2" />
                      Academic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {profileData?.currentInstitution && (
                        <div>
                          <label className="text-sm font-medium text-gray-700">Current Institution</label>
                          <p className="text-gray-900">{profileData.currentInstitution}</p>
                        </div>
                      )}
                      {profileData?.gpa && (
                        <div>
                          <label className="text-sm font-medium text-gray-700">GPA</label>
                          <p className="text-gray-900">{profileData.gpa}</p>
                        </div>
                      )}
                      {profileData?.graduationYear && (
                        <div>
                          <label className="text-sm font-medium text-gray-700">Graduation Year</label>
                          <p className="text-gray-900">{profileData.graduationYear}</p>
                        </div>
                      )}
                      {profileData?.studyLevel && (
                        <div>
                          <label className="text-sm font-medium text-gray-700">Study Level</label>
                          <p className="text-gray-900">{profileData.studyLevel}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Preferences */}
              {(profileData?.universityPreferences?.length > 0 || profileData?.careerInterests?.length > 0) && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      Preferences & Interests
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {profileData?.universityPreferences?.length > 0 && (
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">University Preferences</label>
                        <div className="flex flex-wrap gap-2">
                          {profileData.universityPreferences.map((uni, index) => (
                            <Badge key={index} variant="secondary">{uni}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {profileData?.careerInterests?.length > 0 && (
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Career Interests</label>
                        <div className="flex flex-wrap gap-2">
                          {profileData.careerInterests.map((interest, index) => (
                            <Badge key={index} variant="outline">{interest}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Mobile View - Add tabs */}
          <div className="block md:hidden p-4">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h1>
              <Button onClick={() => setIsEditing(true)} className="w-full mb-4">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>

            {/* Mobile Tabs */}
            <div className="mb-6">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'personal'
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Personal
                </button>
                <button
                  onClick={() => setActiveTab('academic')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'academic'
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Academic
                </button>
                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'preferences'
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Goals
                </button>
              </div>
            </div>

            {/* Mobile Tab Content */}
            {activeTab === 'personal' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <p className="text-gray-900 mt-1">
                      {profileData?.firstName && profileData?.lastName 
                        ? `${profileData.firstName} ${profileData.lastName}` 
                        : 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-gray-900 mt-1">{profileData?.email || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <p className="text-gray-900 mt-1">{profileData?.phone || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nationality</label>
                    <p className="text-gray-900 mt-1">{profileData?.nationality || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Current Location</label>
                    <p className="text-gray-900 mt-1">{profileData?.currentLocation || 'Not specified'}</p>
                  </div>
                  {profileData?.languages?.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Languages</label>
                      <div className="flex flex-wrap gap-2">
                        {profileData.languages.map((lang, index) => (
                          <Badge key={index} variant="outline">{lang}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === 'academic' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Academic Background
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Current Institution</label>
                    <p className="text-gray-900 mt-1">{profileData?.currentInstitution || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Current Education Level</label>
                    <p className="text-gray-900 mt-1">{profileData?.studyLevel || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Expected Graduation Year</label>
                    <p className="text-gray-900 mt-1">{profileData?.graduationYear || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Current GPA/Grade</label>
                    <p className="text-gray-900 mt-1">{profileData?.gpa || 'Not specified'}</p>
                  </div>
                  {profileData?.achievements?.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Achievements</label>
                      <div className="flex flex-wrap gap-2">
                        {profileData.achievements.map((achievement, index) => (
                          <Badge key={index} variant="secondary">{achievement}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {profileData?.extracurricularActivities?.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Extracurricular Activities</label>
                      <div className="flex flex-wrap gap-2">
                        {profileData.extracurricularActivities.map((activity, index) => (
                          <Badge key={index} variant="outline">{activity}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === 'preferences' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Study Goals & Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Intended Field of Study</label>
                    <p className="text-gray-900 mt-1">{profileData?.intendedFieldOfStudy || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Study Level</label>
                    <p className="text-gray-900 mt-1">{profileData?.interestedDegree || profileData?.studyLevel || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Target Countries</label>
                    <p className="text-gray-900 mt-1">{profileData?.preferredLocation || 'Not specified'}</p>
                  </div>
                  {profileData?.universityPreferences?.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Target Universities</label>
                      <div className="flex flex-wrap gap-2">
                        {profileData.universityPreferences.map((uni, index) => (
                          <Badge key={index} variant="secondary">{uni}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {profileData?.careerInterests?.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Career Interests</label>
                      <div className="flex flex-wrap gap-2">
                        {profileData.careerInterests.map((interest, index) => (
                          <Badge key={index} variant="outline">{interest}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {profileData?.budgetRange && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Budget Range</label>
                      <p className="text-gray-900 mt-1">{profileData.budgetRange}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

