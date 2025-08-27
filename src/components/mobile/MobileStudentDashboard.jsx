import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { realDatabaseService } from '../../services/realDatabaseService';
import MobileAuthHeader from './MobileAuthHeader';

const MobileStudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [profileTab, setProfileTab] = useState('personal');
  const [studentData, setStudentData] = useState(null);
  const [connections, setConnections] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if we're sure the user is not authenticated
    // Don't redirect while loading or if user exists
    if (user === null) {
      // User is explicitly null (not authenticated)
      navigate('/signin');
      return;
    }
    
    // If user exists, load data regardless of role
    // (The role check can be handled elsewhere if needed)
    if (user) {
      loadStudentData();
    }
  }, [user, navigate]);

  const loadStudentData = async () => {
    try {
      setLoading(true);
      
      // Get student profile
      const studentResult = await realDatabaseService.getStudentByEmail(user.email);
      if (studentResult.success && studentResult.data) {
        setStudentData(studentResult.data);
      }

      // Get student connections
      const connectionsResult = await realDatabaseService.getStudentConnections(user.email);
      if (connectionsResult.success && connectionsResult.data) {
        setConnections(connectionsResult.data);
      }

      // Get student sessions (mock for now)
      setSessions([
        {
          id: 1,
          counselor: 'Dr. Sarah Chen',
          type: 'Initial Consultation',
          date: '2025-08-25',
          time: '14:00',
          status: 'scheduled'
        }
      ]);

    } catch (err) {
      console.error('Error loading student data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return '✅';
      case 'pending': return '⏳';
      case 'rejected': return '❌';
      default: return '📋';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 md:hidden">
        <MobileAuthHeader />
        <div className="pt-16 flex justify-center items-center h-64">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 md:hidden">
      <MobileAuthHeader />
      
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">
                {user.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                Welcome, {studentData?.users?.first_name || 'Student'}!
              </h1>
              <p className="text-purple-100">
                {studentData?.field_of_study || 'Your academic journey awaits'}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'connections', label: 'Connections', icon: '🔗' },
              { id: 'sessions', label: 'Sessions', icon: '📅' },
              { id: 'profile', label: 'Profile', icon: '👤' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-2 text-center text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Profile Completion Status */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Profile Completion</h3>
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">📊</span>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1 text-gray-700">
                    <span>Progress</span>
                    <span className="font-semibold text-pink-600">85%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Complete your profile to get better counselor matches!</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-purple-600">{connections.length}</div>
                  <div className="text-sm text-gray-600">Connections</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-green-600">{sessions.length}</div>
                  <div className="text-sm text-gray-600">Sessions</div>
                </div>
              </div>

              {/* Student Journey Status */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Journey Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">Profile Created</div>
                      <div className="text-xs text-gray-500">Welcome to StudentKonnect!</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 text-sm">⏳</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">Find Counselors</div>
                      <div className="text-xs text-gray-500">Connect with expert counselors</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-400 text-sm">○</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-400">University Applications</div>
                      <div className="text-xs text-gray-400">Apply to your dream universities</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                {connections.length > 0 ? (
                  <div className="space-y-3">
                    {connections.slice(0, 3).map((connection, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <span className="text-lg">{getStatusIcon(connection.status)}</span>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">
                            Connection with {connection.counselor_name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(connection.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(connection.status)}`}>
                          {connection.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🚀</div>
                    <p className="text-gray-600 mb-4">No connections yet</p>
                    <button
                      onClick={() => navigate('/find-counselors')}
                      className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium"
                    >
                      Find Counselors
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => navigate('/find-counselors')}
                    className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
                  >
                    <div className="text-2xl mb-2">👥</div>
                    <div className="text-sm font-medium text-gray-900">Find Counselors</div>
                  </button>
                  <button
                    onClick={() => navigate('/universities')}
                    className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    <div className="text-2xl mb-2">🏛️</div>
                    <div className="text-sm font-medium text-gray-900">Browse Universities</div>
                  </button>
                  <button
                    onClick={() => navigate('/courses')}
                    className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
                  >
                    <div className="text-2xl mb-2">📚</div>
                    <div className="text-sm font-medium text-gray-900">Explore Courses</div>
                  </button>
                  <button
                    onClick={() => navigate('/career-insights')}
                    className="p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors"
                  >
                    <div className="text-2xl mb-2">💼</div>
                    <div className="text-sm font-medium text-gray-900">Career Insights</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'connections' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">My Connections</h2>
                <button
                  onClick={() => navigate('/find-counselors')}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
                >
                  + Add New
                </button>
              </div>

              {connections.length > 0 ? (
                <div className="space-y-3">
                  {connections.map((connection, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-bold">
                            {connection.counselor_name?.charAt(0) || 'C'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{connection.counselor_name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{connection.request_reason}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(connection.status)}`}>
                              {connection.status}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(connection.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔗</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No connections yet</h3>
                  <p className="text-gray-600 mb-6">Start connecting with counselors to get personalized guidance</p>
                  <button
                    onClick={() => navigate('/find-counselors')}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium"
                  >
                    Find Counselors
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'sessions' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">My Sessions</h2>

              {sessions.length > 0 ? (
                <div className="space-y-3">
                  {sessions.map((session) => (
                    <div key={session.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-bold">📅</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{session.type}</h3>
                          <p className="text-sm text-gray-600">with {session.counselor}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-500">📅 {session.date}</span>
                            <span className="text-sm text-gray-500">🕐 {session.time}</span>
                          </div>
                          <span className="inline-block mt-2 text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                            {session.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No sessions scheduled</h3>
                  <p className="text-gray-600 mb-6">Connect with counselors to schedule your first session</p>
                  <button
                    onClick={() => navigate('/find-counselors')}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium"
                  >
                    Find Counselors
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6 px-4">
              {/* Clean Profile Header */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
                    <p className="text-gray-600">Manage your information</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Profile-specific tabs */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { id: 'personal', label: 'Personal', icon: '👤', color: 'bg-pink-500' },
                    { id: 'academic', label: 'Academic', icon: '🎓', color: 'bg-pink-500' },
                    { id: 'goals', label: 'Goals', icon: '🎯', color: 'bg-pink-500' },
                    { id: 'preferences', label: 'Preferences', icon: '⚙️', color: 'bg-pink-500' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setProfileTab(tab.id)}
                      className={`
                        relative overflow-hidden rounded-xl p-4 text-sm font-semibold transition-all duration-300 transform
                        ${profileTab === tab.id
                          ? `${tab.color} text-white shadow-lg scale-105`
                          : 'bg-white text-gray-600 hover:bg-gray-50 hover:scale-102 shadow-md border border-gray-100'
                        }
                      `}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-lg">{tab.icon}</span>
                        <span>{tab.label}</span>
                      </div>
                      {profileTab === tab.id && (
                        <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'communication', label: 'Communication', icon: '💬', color: 'from-teal-500 to-teal-600' },
                    { id: 'counseling', label: 'Counseling', icon: '🤝', color: 'from-indigo-500 to-indigo-600' },
                    { id: 'activities', label: 'Activities', icon: '🏆', color: 'from-pink-500 to-pink-600' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setProfileTab(tab.id)}
                      className={`
                        relative overflow-hidden rounded-xl p-3 text-xs font-semibold transition-all duration-300 transform
                        ${profileTab === tab.id
                          ? tab.color.startsWith('bg-') ? `${tab.color} text-white shadow-lg scale-105` : `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105`
                          : 'bg-white text-gray-600 hover:bg-gray-50 hover:scale-102 shadow-md border border-gray-100'
                        }
                      `}
                    >
                      <div className="flex flex-col items-center space-y-1">
                        <span className="text-base">{tab.icon}</span>
                        <span className="leading-tight text-center">{tab.label}</span>
                      </div>
                      {profileTab === tab.id && (
                        <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Enhanced Profile tab content */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mt-6">
                  {profileTab === 'personal' && (
                    <div className="space-y-6">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-white text-sm">👤</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                      </div>
                      
                      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 border border-pink-100">
                        <div className="flex items-center mb-2">
                          <span className="text-pink-500 mr-2">👤</span>
                          <label className="text-sm font-semibold text-pink-700">Full Name</label>
                        </div>
                        <p className="text-gray-800 font-medium">{studentData?.users?.first_name} {studentData?.users?.last_name}</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                        <div className="flex items-center mb-2">
                          <span className="text-green-500 mr-2">📧</span>
                          <label className="text-sm font-semibold text-green-700">Email</label>
                        </div>
                        <p className="text-gray-800 font-medium">{user.email}</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-100">
                        <div className="flex items-center mb-2">
                          <span className="text-purple-500 mr-2">📱</span>
                          <label className="text-sm font-semibold text-purple-700">Phone</label>
                        </div>
                        <p className="text-gray-800 font-medium">{studentData?.users?.phone || 'Not specified'}</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
                        <div className="flex items-center mb-2">
                          <span className="text-orange-500 mr-2">🌍</span>
                          <label className="text-sm font-semibold text-orange-700">Nationality</label>
                        </div>
                        <p className="text-gray-800 font-medium">{studentData?.current_country || 'Not specified'}</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-100">
                        <div className="flex items-center mb-2">
                          <span className="text-teal-500 mr-2">📍</span>
                          <label className="text-sm font-semibold text-teal-700">Current Location</label>
                        </div>
                        <p className="text-gray-800 font-medium">{studentData?.current_country || 'Not specified'}</p>
                      </div>
                    </div>
                  )}
                  
                  {profileTab === 'academic' && (
                    <div className="space-y-6">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-white text-sm">🎓</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Academic Information</h3>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                        <div className="flex items-center mb-2">
                          <span className="text-green-500 mr-2">🏫</span>
                          <label className="text-sm font-semibold text-green-700">Current Institution</label>
                        </div>
                        <p className="text-gray-800 font-medium">{studentData?.current_institution || 'Not specified'}</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                        <div className="flex items-center mb-2">
                          <span className="text-blue-500 mr-2">📚</span>
                          <label className="text-sm font-semibold text-blue-700">Study Level</label>
                        </div>
                        <p className="text-gray-800 font-medium">{studentData?.study_level || 'Not specified'}</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-100">
                        <div className="flex items-center mb-2">
                          <span className="text-purple-500 mr-2">📅</span>
                          <label className="text-sm font-semibold text-purple-700">Graduation Year</label>
                        </div>
                        <p className="text-gray-800 font-medium">{studentData?.graduation_year || 'Not specified'}</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
                        <div className="flex items-center mb-2">
                          <span className="text-orange-500 mr-2">⭐</span>
                          <label className="text-sm font-semibold text-orange-700">GPA</label>
                        </div>
                        <p className="text-gray-800 font-medium">{studentData?.gpa || 'Not specified'}</p>
                      </div>
                    </div>
                  )}
                  
                  {profileTab === 'goals' && (
                    <div className="space-y-6">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-white text-sm">🎯</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Goals & Aspirations</h3>
                      </div>
                      
                      <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-100">
                        <div className="flex items-center mb-2">
                          <span className="text-purple-500 mr-2">📖</span>
                          <label className="text-sm font-semibold text-purple-700">Field of Study</label>
                        </div>
                        <p className="text-gray-800 font-medium">{studentData?.field_of_study || 'Not specified'}</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100">
                        <div className="flex items-center mb-2">
                          <span className="text-indigo-500 mr-2">🎓</span>
                          <label className="text-sm font-semibold text-indigo-700">Interested Degree</label>
                        </div>
                        <p className="text-gray-800 font-medium">{studentData?.interested_degree || 'Not specified'}</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-100">
                        <div className="flex items-center mb-2">
                          <span className="text-pink-500 mr-2">💼</span>
                          <label className="text-sm font-semibold text-pink-700">Career Interests</label>
                        </div>
                        <p className="text-gray-800 font-medium">{studentData?.career_interests ? studentData.career_interests.join(', ') : 'Not specified'}</p>
                      </div>
                    </div>
                  )}
                  
                  {profileTab === 'preferences' && (
                    <div className="space-y-6">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-white text-sm">⚙️</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Study Preferences</h3>
                      </div>
                      
                      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
                        <div className="flex items-center mb-2">
                          <span className="text-orange-500 mr-2">🌍</span>
                          <label className="text-sm font-semibold text-orange-700">Preferred Location</label>
                        </div>
                        <p className="text-gray-800 font-medium">{studentData?.preferred_location || 'Not specified'}</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                        <div className="flex items-center mb-2">
                          <span className="text-blue-500 mr-2">🏛️</span>
                          <label className="text-sm font-semibold text-blue-700">University Preferences</label>
                        </div>
                        <p className="text-gray-800 font-medium">{studentData?.university_preferences ? studentData.university_preferences.join(', ') : 'Not specified'}</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                        <div className="flex items-center mb-2">
                          <span className="text-green-500 mr-2">💰</span>
                          <label className="text-sm font-semibold text-green-700">Budget Range</label>
                        </div>
                        <p className="text-gray-800 font-medium">{studentData?.budget_range || 'Not specified'}</p>
                      </div>
                    </div>
                  )}
                  
                  {profileTab === 'communication' && (
                    <div className="space-y-6">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-white text-sm">💬</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Communication</h3>
                      </div>
                      
                      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-100">
                        <div className="flex items-center mb-2">
                          <span className="text-teal-500 mr-2">🌐</span>
                          <label className="text-sm font-semibold text-teal-700">Languages</label>
                        </div>
                        <p className="text-gray-800 font-medium">{studentData?.languages ? studentData.languages.join(', ') : 'Not specified'}</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                        <div className="flex items-center mb-2">
                          <span className="text-blue-500 mr-2">💭</span>
                          <label className="text-sm font-semibold text-blue-700">Communication Style</label>
                        </div>
                        <p className="text-gray-800 font-medium">{studentData?.communication_style || 'Not specified'}</p>
                      </div>
                    </div>
                  )}
                  
                  {profileTab === 'counseling' && (
                    <div className="space-y-6">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-white text-sm">🤝</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Counseling Support</h3>
                      </div>
                      
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
                        <div className="flex items-center mb-2">
                          <span className="text-indigo-500 mr-2">🎯</span>
                          <label className="text-sm font-semibold text-indigo-700">Areas of Support</label>
                        </div>
                        <p className="text-gray-800 font-medium">{studentData?.support_areas || 'University Selection, Application Process, Visa Guidance'}</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100">
                        <div className="flex items-center mb-2">
                          <span className="text-orange-500 mr-2">⚡</span>
                          <label className="text-sm font-semibold text-orange-700">Urgency Level</label>
                        </div>
                        <p className="text-gray-800 font-medium">{studentData?.urgency_level || 'Medium Priority'}</p>
                      </div>
                    </div>
                  )}
                  
                  {profileTab === 'activities' && (
                    <div className="space-y-6">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-white text-sm">🏆</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Activities & Achievements</h3>
                      </div>
                      
                      <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-100">
                        <div className="flex items-center mb-2">
                          <span className="text-pink-500 mr-2">🎭</span>
                          <label className="text-sm font-semibold text-pink-700">Extracurricular Activities</label>
                        </div>
                        <p className="text-gray-800 font-medium">{studentData?.extracurricular_activities ? studentData.extracurricular_activities.join(', ') : 'Not specified'}</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-100">
                        <div className="flex items-center mb-2">
                          <span className="text-yellow-500 mr-2">🏅</span>
                          <label className="text-sm font-semibold text-yellow-700">Achievements</label>
                        </div>
                        <p className="text-gray-800 font-medium">{studentData?.achievements ? studentData.achievements.join(', ') : 'Not specified'}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileStudentDashboard;

