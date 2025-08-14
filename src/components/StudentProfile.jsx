import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import StudentSidebar from './StudentSidebar'
import { Edit, User, GraduationCap, Settings, FileText } from 'lucide-react'

const StudentProfile = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('personal')

  if (!user) {
    return (
      <div className="flex min-h-screen">
        <StudentSidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to view your profile</h2>
            <button 
              onClick={() => window.location.href = '/signin'}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
        <div className="p-3 bg-gray-50 rounded-lg border">
          {user.personalInfo.fullName}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
        <div className="p-3 bg-gray-50 rounded-lg border text-gray-500">
          {user.personalInfo.nationality}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Current Location</label>
        <div className="p-3 bg-gray-50 rounded-lg border text-gray-500 flex items-center">
          <span className="mr-2">🌍</span>
          {user.personalInfo.currentLocation}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
        <div className="p-3 bg-gray-50 rounded-lg border">
          {user.personalInfo.phone}
        </div>
      </div>
    </div>
  )

  const renderAcademicBackground = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Current Institution</label>
        <div className="p-3 bg-gray-50 rounded-lg border text-gray-500">
          {user.academicBackground.currentInstitution}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Current Education Level</label>
        <div className="p-3 bg-gray-50 rounded-lg border text-gray-500">
          {user.academicBackground.currentEducationLevel}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Expected Graduation Year</label>
        <div className="p-3 bg-gray-50 rounded-lg border text-gray-500">
          {user.academicBackground.expectedGraduationYear}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Current GPA/Grade</label>
        <div className="p-3 bg-gray-50 rounded-lg border text-gray-500">
          {user.academicBackground.currentGPA}
        </div>
      </div>
    </div>
  )

  const renderPreferences = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Target Countries</label>
        <div className="p-3 bg-gray-50 rounded-lg border text-gray-500">
          {user.preferences.targetCountries.length > 0 ? user.preferences.targetCountries.join(', ') : 'Not specified'}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Target Universities</label>
        <div className="p-3 bg-gray-50 rounded-lg border text-gray-500">
          {user.preferences.targetUniversities.length > 0 ? user.preferences.targetUniversities.join(', ') : 'Not specified'}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Interested Programs</label>
        <div className="p-3 bg-gray-50 rounded-lg border text-gray-500">
          {user.preferences.interestedPrograms.length > 0 ? user.preferences.interestedPrograms.join(', ') : 'Not specified'}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
        <div className="p-3 bg-gray-50 rounded-lg border text-gray-500">
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
    <div className="flex min-h-screen">
      {/* Left StudentSidebar */}
      <StudentSidebar />
      
      {/* Right Detail Section with Profile Content */}
      <main className="flex-1 w-full md:w-auto transition-all duration-300">
        <div className="container mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-2xl">
                {user.firstName.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-red-600 mr-2">⚠️ {user.profileCompletion}% Complete</span>
                </div>
              </div>
            </div>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
              <span className="mr-2">✏️</span>
              Edit Profile
            </button>
          </div>
          
          {/* Profile Completion Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Profile Completion</span>
              <span className="text-sm text-gray-600">{user.profileCompletion}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${user.profileCompletion}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Personal Information Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">👤</span>
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              </div>
              {renderPersonalInfo()}
            </div>
          </div>

          {/* Academic Background Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🎓</span>
                <h2 className="text-xl font-semibold text-gray-900">Academic Background</h2>
              </div>
              {renderAcademicBackground()}
            </div>
          </div>

          {/* Study Preferences Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">⚙️</span>
                <h2 className="text-xl font-semibold text-gray-900">Study Preferences</h2>
              </div>
              {renderPreferences()}
            </div>
          </div>

          {/* Quick Stats Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">📊</span>
                <h2 className="text-xl font-semibold text-gray-900">Quick Stats</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{user.connections}</div>
                  <div className="text-sm text-gray-600">Connections</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-gray-600">Applications</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-sm text-gray-600">Documents</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">Jan 2024</div>
                  <div className="text-sm text-gray-600">Joined</div>
                </div>
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

