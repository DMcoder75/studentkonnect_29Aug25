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
          {user.personalInfo.fullName}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Nationality</label>
        <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm">
          {user.personalInfo.nationality}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Current Location</label>
        <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 flex items-center text-sm">
          <MapPin className="h-3 w-3 mr-1" />
          {user.personalInfo.currentLocation}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
        <div className="p-2 bg-gray-50 rounded-lg border text-sm flex items-center">
          <Phone className="h-3 w-3 mr-1" />
          {user.personalInfo.phone}
        </div>
      </div>
    </div>
  )

  const renderAcademicBackground = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Current Institution</label>
        <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm">
          {user.academicBackground.currentInstitution}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Current Education Level</label>
        <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm">
          {user.academicBackground.currentEducationLevel}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Expected Graduation Year</label>
        <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm">
          {user.academicBackground.expectedGraduationYear}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Current GPA/Grade</label>
        <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm">
          {user.academicBackground.currentGPA}
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
          {user.preferences.targetCountries.length > 0 ? user.preferences.targetCountries.join(', ') : 'Not specified'}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Target Universities</label>
        <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm">
          {user.preferences.targetUniversities.length > 0 ? user.preferences.targetUniversities.join(', ') : 'Not specified'}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Interested Programs</label>
        <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm">
          {user.preferences.interestedPrograms.length > 0 ? user.preferences.interestedPrograms.join(', ') : 'Not specified'}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Budget Range</label>
        <div className="p-2 bg-gray-50 rounded-lg border text-gray-500 text-sm">
          {user.preferences.budgetRange}
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
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      {/* Left Sidebar */}
      <GlobalSidebarManager />
      
      {/* Right Detail Section with Profile Content */}
      <main className="flex-1 w-full md:w-auto transition-all duration-300">
        <div className="container mx-auto px-6 py-8">
          {/* Beautiful Profile Header with Gradient */}
          <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl shadow-xl p-6 mb-6 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-16 translate-y-16"></div>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                {/* Enhanced Profile Picture */}
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-white to-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xl shadow-lg ring-2 ring-white/30">
                    {user.firstName.charAt(0)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div className="text-white">
                  <h1 className="text-xl font-bold mb-1">{user.name}</h1>
                  <div className="flex items-center space-x-2 mb-2">
                    <Mail className="h-3 w-3" />
                    <p className="text-sm text-purple-100">{user.email}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3 text-yellow-300" />
                      <span className="text-xs font-medium text-yellow-100">{user.profileCompletion}% Complete</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < 4 ? 'text-yellow-300 fill-current' : 'text-purple-300'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-300 flex items-center space-x-2 border border-white/30 hover:scale-105 transform text-sm">
                <Edit className="h-4 w-4" />
                <span className="font-medium">Edit Profile</span>
              </button>
            </div>
            
            {/* Enhanced Progress Bar */}
            <div className="relative z-10 mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-white/90">Profile Completion</span>
                <span className="text-xs text-white/80">{user.profileCompletion}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 backdrop-blur-sm">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden" 
                  style={{ width: `${user.profileCompletion}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Profile Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

            {/* Study Preferences Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
                  <Settings className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-gray-800">Study Preferences</h2>
              </div>
              {renderPreferences()}
            </div>

            {/* Enhanced Quick Stats Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-gray-800">Quick Stats</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 hover:shadow-md transition-all duration-300">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{user.connections}</div>
                  <div className="text-xs text-purple-700 font-medium">Connections</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-300">
                  <div className="text-2xl font-bold text-blue-600 mb-1">0</div>
                  <div className="text-xs text-blue-700 font-medium">Applications</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 hover:shadow-md transition-all duration-300">
                  <div className="text-2xl font-bold text-green-600 mb-1">0</div>
                  <div className="text-xs text-green-700 font-medium">Documents</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-center mb-1">
                    <Calendar className="h-4 w-4 text-orange-600 mr-1" />
                    <div className="text-sm font-bold text-orange-600">Jan 2024</div>
                  </div>
                  <div className="text-xs text-orange-700 font-medium">Joined</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default StudentProfile

