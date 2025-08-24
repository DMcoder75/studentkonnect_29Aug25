import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import GlobalSidebarManager from './GlobalSidebarManager'
import { supabase } from '../lib/supabase'
import { Edit, User, GraduationCap, Settings, FileText, Star, TrendingUp, Award, Calendar, MapPin, Phone, Mail, Globe, MessageCircle, X, BarChart3, Users, Video } from 'lucide-react'

const StudentProfile = () => {
  const { user, loading } = useAuth()
  const [activeTab, setActiveTab] = useState('personal')
  const [activeMobileTab, setActiveMobileTab] = useState('profile')
  const [isMobile, setIsMobile] = useState(false)
  const [showCounselorModal, setShowCounselorModal] = useState(false)
  const [counselors, setCounselors] = useState([])
  const [loadingCounselors, setLoadingCounselors] = useState(false)

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const isMobileWidth = window.innerWidth <= 768
      const userAgent = navigator.userAgent || navigator.vendor || window.opera
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
      
      setIsMobile(isMobileWidth || isMobileDevice)
      console.log('Mobile detection:', { 
        width: window.innerWidth, 
        isMobileWidth, 
        isMobileDevice, 
        finalIsMobile: isMobileWidth || isMobileDevice 
      })
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Fetch counselors from database
  const fetchCounselors = async () => {
    setLoadingCounselors(true)
    try {
      const { data, error } = await supabase
        .from('counselors')
        .select('*')
        .limit(10)
      
      if (error) throw error
      setCounselors(data || [])
    } catch (error) {
      console.error('Error fetching counselors:', error)
    } finally {
      setLoadingCounselors(false)
    }
  }

  const handleStartMatching = () => {
    setShowCounselorModal(true)
    fetchCounselors()
  }

  const handleConnectToCounselor = (counselor) => {
    alert(`Connecting to ${counselor.name}...`)
    setShowCounselorModal(false)
  }

  // Show loading spinner while authentication is being checked
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

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
    name: user.full_name || user.name || 'Priya Dubey',
    firstName: user.firstName || user.full_name?.split(' ')[0] || 'Priya',
    email: user.email,
    profileCompletion: user.profile?.profile_completion || 33,
    connections: 12,
    personalInfo: {
      fullName: user.full_name || user.name || 'Priya Dubey',
      nationality: 'India',
      currentLocation: 'Mumbai, India',
      phone: '+91-9876543210'
    },
    academicBackground: {
      currentInstitution: 'Delhi University',
      currentEducationLevel: "Bachelor's",
      expectedGraduationYear: '2024',
      currentGPA: '8.5/10'
    },
    preferences: {
      targetCountries: ['Australia'],
      targetUniversities: ['University of Melbourne'],
      interestedPrograms: ['Law', 'International Relations'],
      budgetRange: '$30,000 - $50,000 AUD'
    }
  }

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <div className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SK</span>
              </div>
              <span className="font-semibold text-gray-900">StudentKonnect</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-medium text-sm">P</span>
              </div>
              <span className="text-sm text-gray-600">Student</span>
              <button className="p-1">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Hero */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-6">
          <div className="text-center">
            <h1 className="text-xl font-bold mb-1">Your academic journey awaits</h1>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="bg-white border-b">
          <div className="flex">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'connections', label: 'Connections', icon: Users },
              { id: 'sessions', label: 'Sessions', icon: Video },
              { id: 'profile', label: 'Profile', icon: User }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveMobileTab(tab.id)}
                  className={`flex-1 flex flex-col items-center py-3 px-2 text-xs font-medium transition-colors ${
                    activeMobileTab === tab.id
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Mobile Content */}
        <div className="p-4">
          {activeMobileTab === 'profile' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">My Profile</h2>
              
              {/* Profile-specific tabs */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    { id: 'personal', label: 'Personal' },
                    { id: 'academic', label: 'Academic' },
                    { id: 'goals', label: 'Goals' },
                    { id: 'preferences', label: 'Preferences' },
                    { id: 'communication', label: 'Communication' },
                    { id: 'counseling', label: 'Counseling' },
                    { id: 'activities', label: 'Activities' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                
                {/* Profile tab content */}
                <div className="bg-white rounded-lg border p-4">
                  {activeTab === 'personal' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <p className="text-gray-900">{studentData.personalInfo.fullName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <p className="text-gray-900">{studentData.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <p className="text-gray-900">{studentData.personalInfo.phone}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                        <p className="text-gray-900">{studentData.personalInfo.nationality}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Location</label>
                        <p className="text-gray-900">{studentData.personalInfo.currentLocation}</p>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'academic' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Institution</label>
                        <p className="text-gray-900">{studentData.academicBackground.currentInstitution}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Education Level</label>
                        <p className="text-gray-900">{studentData.academicBackground.currentEducationLevel}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expected Graduation Year</label>
                        <p className="text-gray-900">{studentData.academicBackground.expectedGraduationYear}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current GPA/Grade</label>
                        <p className="text-gray-900">{studentData.academicBackground.currentGPA}</p>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'goals' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Intended Field of Study</label>
                        <p className="text-gray-900">Law, International Relations</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Study Level</label>
                        <p className="text-gray-900">Master's Degree</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Career Interests</label>
                        <p className="text-gray-900">International Law, Human Rights</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Start Date</label>
                        <p className="text-gray-900">September 2024</p>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'preferences' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Target Countries</label>
                        <p className="text-gray-900">{studentData.preferences.targetCountries.join(', ')}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Target Universities</label>
                        <p className="text-gray-900">{studentData.preferences.targetUniversities.join(', ')}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Interested Programs</label>
                        <p className="text-gray-900">{studentData.preferences.interestedPrograms.join(', ')}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
                        <p className="text-gray-900">{studentData.preferences.budgetRange}</p>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'communication' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
                        <p className="text-gray-900">English, Hindi</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Communication Style</label>
                        <p className="text-gray-900">Professional</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                        <p className="text-gray-900">Asia/Kolkata (GMT+5:30)</p>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'counseling' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Areas of Support</label>
                        <p className="text-gray-900">University Selection, Application Process, Visa Guidance</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Urgency Level</label>
                        <p className="text-gray-900">Medium Priority</p>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'activities' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Extracurricular Activities</label>
                        <p className="text-gray-900">Debate Club President, Model UN Participant, Volunteer at Legal Aid Society</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Academic Achievements</label>
                        <p className="text-gray-900">Dean's List (2022-2023), Best Student Award in Constitutional Law, Merit Scholarship Recipient</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {activeMobileTab === 'overview' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Overview</h2>
              <div className="text-center py-12 text-gray-500">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Overview content coming soon</p>
              </div>
            </div>
          )}
          
          {activeMobileTab === 'connections' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Connections</h2>
              <div className="text-center py-12 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>No connections yet</p>
              </div>
            </div>
          )}
          
          {activeMobileTab === 'sessions' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Sessions</h2>
              <div className="text-center py-12 text-gray-500">
                <Video className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>No sessions scheduled</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Desktop Layout
  return (
    <div className="flex min-h-screen">
      <GlobalSidebarManager />
      <main className="flex-1 lg:ml-64 bg-gray-50">
        <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white w-full">
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
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <p className="text-gray-900">{studentData.personalInfo.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-gray-900">{studentData.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <p className="text-gray-900">{studentData.personalInfo.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nationality</label>
                    <p className="text-gray-900">{studentData.personalInfo.nationality}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Current Location</label>
                    <p className="text-gray-900">{studentData.personalInfo.currentLocation}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Current Institution</label>
                    <p className="text-gray-900">{studentData.academicBackground.currentInstitution}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl shadow-lg border border-purple-200 p-6 text-center">
                <Award className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Find Counselors</h3>
                <p className="text-sm text-gray-600 mb-4">Get matched with counselors based on your profile</p>
                <button 
                  onClick={handleStartMatching}
                  className="w-full bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Start Matching
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Counselor Modal */}
        {showCounselorModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Available Counselors</h2>
                  <button 
                    onClick={() => setShowCounselorModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                {loadingCounselors && (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="text-gray-600 mt-4">Loading counselors...</p>
                  </div>
                )}

                {!loadingCounselors && counselors.length > 0 && (
                  <div className="space-y-4">
                    {counselors.map((counselor) => (
                      <div key={counselor.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{counselor.name}</h3>
                            <p className="text-sm text-gray-600">{counselor.specialization}</p>
                            <p className="text-sm text-gray-500 mt-1">{counselor.experience} years experience</p>
                          </div>
                          <button 
                            onClick={() => handleConnectToCounselor(counselor)}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            Connect
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {!loadingCounselors && counselors.length === 0 && (
                  <div className="text-center py-12">
                    <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Counselors Found</h3>
                    <p className="text-gray-600">Please try again later or contact support.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default StudentProfile

