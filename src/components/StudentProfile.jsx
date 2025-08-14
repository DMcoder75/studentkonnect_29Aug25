import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import GlobalSidebarManager from './GlobalSidebarManager'
import { Edit, User, GraduationCap, Settings, FileText, Star, TrendingUp, Award, Calendar, MapPin, Phone, Mail, Globe } from 'lucide-react'

const StudentProfile = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('personal')

  if (!user) {
    return (
      <div className="flex min-h-screen">
        <GlobalSidebarManager />
        <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to view your profile</h2>
            <button 
              onClick={() => window.location.href = '/signin'}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Sign In
            </button>
          </div>
        </main>
      </div>
    )
  }

  // Create student data structure from user object
  const studentData = {
    name: user.full_name || user.name || 'Student',
    firstName: user.firstName || user.full_name?.split(' ')[0] || 'Student',
    email: user.email,
    profileCompletion: user.profile?.profile_completion || 33,
    connections: 12,
    personalInfo: {
      fullName: user.full_name || user.name || 'Student',
      nationality: user.profile?.nationality || 'Not specified',
      currentLocation: 'Mumbai, India',
      phone: user.profile?.phone || 'Not specified'
    },
    academicBackground: {
      currentInstitution: 'Delhi University',
      currentEducationLevel: user.profile?.current_education_level || 'Bachelor\'s',
      expectedGraduationYear: '2024',
      currentGPA: '8.5/10'
    },
    preferences: {
      targetCountries: [user.profile?.target_country || 'Australia'],
      targetUniversities: [user.profile?.target_university || 'University of Melbourne'],
      interestedPrograms: ['Law', 'International Relations'],
      budgetRange: '$30,000 - $50,000 AUD'
    }
  }

  const profileSections = [
    { id: 'personal', label: 'Personal Information', icon: '👤' },
    { id: 'academic', label: 'Academic Background', icon: '🎓' },
    { id: 'preferences', label: 'Study Preferences', icon: '⚙️' },
    { id: 'documents', label: 'Documents', icon: '📄' }
  ]

  const renderPersonalInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
        <div className="p-2 bg-gray-50 rounded-lg border text-sm">
          {studentData.personalInfo.fullName}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Nationality</label>
        <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm">
          {studentData.personalInfo.nationality}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Current Location</label>
        <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 flex items-center text-sm">
          <MapPin className="h-3 w-3 mr-1" />
          {studentData.personalInfo.currentLocation}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
        <div className="p-2 bg-gray-50 rounded-lg border text-sm flex items-center">
          <Phone className="h-3 w-3 mr-1" />
          {studentData.personalInfo.phone}
        </div>
      </div>
    </div>
  )

  const renderAcademicBackground = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Current Institution</label>
        <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm">
          {studentData.academicBackground.currentInstitution}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Current Education Level</label>
        <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm">
          {studentData.academicBackground.currentEducationLevel}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Expected Graduation Year</label>
        <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm">
          {studentData.academicBackground.expectedGraduationYear}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Current GPA/Grade</label>
        <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm">
          {studentData.academicBackground.currentGPA}
        </div>
      </div>
    </div>
  )

  const renderPreferences = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Target Countries</label>
        <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm flex items-center">
          <Globe className="h-3 w-3 mr-1" />
          {studentData.preferences.targetCountries.length > 0 ? studentData.preferences.targetCountries.join(', ') : 'Not specified'}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Target Universities</label>
        <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm">
          {studentData.preferences.targetUniversities.length > 0 ? studentData.preferences.targetUniversities.join(', ') : 'Not specified'}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Interested Programs</label>
        <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm">
          {studentData.preferences.interestedPrograms.length > 0 ? studentData.preferences.interestedPrograms.join(', ') : 'Not specified'}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Budget Range</label>
        <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm">
          {studentData.preferences.budgetRange}
        </div>
      </div>
    </div>
  )

  const renderDocuments = () => (
    <div className="space-y-4">
      <div className="text-center py-12 text-gray-500">
        <div className="text-6xl mb-4">📄</div>
        <h3 className="text-lg font-medium mb-2">No Documents Uploaded</h3>
        <p className="text-sm">Upload your academic transcripts, certificates, and other documents here.</p>
        <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
          Upload Documents
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full-Width Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-2xl font-bold">{studentData.firstName.charAt(0)}</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Welcome back, {studentData.name}</h1>
                  <p className="text-white/80 text-lg">Student Profile</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-medium text-yellow-100">{studentData.profileCompletion}% Complete</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < 4 ? 'text-yellow-300 fill-current' : 'text-white/30'}`} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6 mt-6 md:mt-0">
              <div className="text-center">
                <div className="text-2xl font-bold">{studentData.connections}</div>
                <p className="text-white/80 text-sm">Connections</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">0</div>
                <p className="text-white/80 text-sm">Applications</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">0</div>
                <p className="text-white/80 text-sm">Documents</p>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-white/90">Profile Completion</span>
              <span className="text-sm text-white/80">{studentData.profileCompletion}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 backdrop-blur-sm">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-1000 ease-out shadow-lg" 
                style={{ width: `${studentData.profileCompletion}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column Layout: Sidebar + Content */}
      <div className="flex">
        {/* Sidebar */}
        <GlobalSidebarManager />
        
        {/* Main Content Area */}
        <main className="flex-1 w-full md:w-auto transition-all duration-300">
          <div className="container mx-auto px-6 py-8">
            {/* Edit Profile Button */}
            <div className="flex justify-end mb-6">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2 shadow-lg">
                <Edit className="h-4 w-4" />
                <span className="font-medium">Edit Profile</span>
              </button>
            </div>

            {/* Profile Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Personal Information Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">Personal Information</h2>
                </div>
                {renderPersonalInfo()}
              </div>

              {/* Academic Background Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">Academic Background</h2>
                </div>
                {renderAcademicBackground()}
              </div>

              {/* Study Goals Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
                    <Settings className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">Study Goals</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Intended Field of Study</label>
                    <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm">
                      Law, International Relations
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Study Level</label>
                    <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm">
                      Master's Degree
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Career Interests</label>
                    <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm">
                      International Law, Human Rights
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Preferred Start Date</label>
                    <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      September 2024
                    </div>
                  </div>
                </div>
              </div>

              {/* Study Preferences Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">Study Preferences</h2>
                </div>
                {renderPreferences()}
              </div>

              {/* Communication Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">Communication</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Languages</label>
                    <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm">
                      English, Hindi
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Communication Style</label>
                    <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm">
                      Professional
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Timezone</label>
                    <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm">
                      Asia/Kolkata (GMT+5:30)
                    </div>
                  </div>
                </div>
              </div>

              {/* Counseling Needs Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">Counseling Needs</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Areas of Support</label>
                    <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm">
                      University Selection, Application Process, Visa Guidance
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Urgency Level</label>
                    <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm">
                      Medium Priority
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activities & Achievements Section - Full Width */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mb-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-gray-800">Activities & Achievements</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Extracurricular Activities</label>
                  <div className="p-3 bg-gray-50 rounded-lg border text-gray-500 text-sm">
                    Debate Club President, Model UN Participant, Volunteer at Legal Aid Society
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Academic Achievements</label>
                  <div className="p-3 bg-gray-50 rounded-lg border text-gray-500 text-sm">
                    Dean's List (2022-2023), Best Student Award in Constitutional Law, Merit Scholarship Recipient
                  </div>
                </div>
              </div>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl shadow-lg border border-purple-200 p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <Award className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Find Counselors</h3>
                <p className="text-sm text-gray-600 mb-4">Get matched with counselors based on your profile</p>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Start Matching
                </button>
              </div>

              <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-xl shadow-lg border border-cyan-200 p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <Calendar className="h-8 w-8 text-cyan-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">My Sessions</h3>
                <p className="text-sm text-gray-600 mb-4">View upcoming and past counseling sessions</p>
                <button className="w-full border border-cyan-600 text-cyan-600 hover:bg-cyan-50 px-4 py-2 rounded-lg transition-colors">
                  View Sessions
                </button>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl shadow-lg border border-green-200 p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Track Progress</h3>
                <p className="text-sm text-gray-600 mb-4">Monitor your application and goal progress</p>
                <button className="w-full border border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg transition-colors">
                  View Progress
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default StudentProfile

