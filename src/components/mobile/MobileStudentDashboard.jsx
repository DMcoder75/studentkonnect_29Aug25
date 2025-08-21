import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { realDatabaseService } from '../../services/realDatabaseService';
import MobileAuthHeader from './MobileAuthHeader';

const MobileStudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [studentData, setStudentData] = useState(null);
  const [connections, setConnections] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'student') {
      navigate('/signin');
      return;
    }
    loadStudentData();
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
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">My Profile</h2>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-lg text-gray-900">
                      {user.email}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-lg text-gray-900">
                      {studentData?.users?.first_name} {studentData?.users?.last_name}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Field of Study</label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-lg text-gray-900">
                      {studentData?.field_of_study || 'Not specified'}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Target Country</label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-lg text-gray-900">
                      {studentData?.target_country || 'Not specified'}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/student-profile')}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    Edit Profile
                  </button>
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

