import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { realDatabaseService } from '../../services/realDatabaseService';
import MobileAuthHeader from './MobileAuthHeader';

const MobileCounselorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [counselorData, setCounselorData] = useState(null);
  const [students, setStudents] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'counselor') {
      navigate('/signin');
      return;
    }
    loadCounselorData();
  }, [user, navigate]);

  const loadCounselorData = async () => {
    try {
      setLoading(true);
      
      // Get counselor profile
      const counselorResult = await realDatabaseService.getCounselorByEmail(user.email);
      if (counselorResult.success && counselorResult.data) {
        setCounselorData(counselorResult.data);
        
        // Get counselor's students
        const studentsResult = await realDatabaseService.getApprovedStudentsForCounselor(counselorResult.data.id);
        if (studentsResult.success && studentsResult.data) {
          setStudents(studentsResult.data);
        }
      }

      // Get pending requests
      const requestsResult = await realDatabaseService.getPendingRequestsForCounselor(user.email);
      if (requestsResult.success && requestsResult.data) {
        setRequests(requestsResult.data);
      }

      // Mock sessions for now
      setSessions([
        {
          id: 1,
          student: 'Priya Dubey',
          type: 'Initial Consultation',
          date: '2025-08-25',
          time: '14:00',
          status: 'scheduled'
        }
      ]);

    } catch (err) {
      console.error('Error loading counselor data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveRequest = async (requestId) => {
    try {
      const result = await realDatabaseService.updateConnectionStatus(requestId, 'approved');
      if (result.success) {
        // Refresh data
        loadCounselorData();
      } else {
        alert('Failed to approve request');
      }
    } catch (err) {
      console.error('Error approving request:', err);
      alert('Failed to approve request');
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      const result = await realDatabaseService.updateConnectionStatus(requestId, 'rejected');
      if (result.success) {
        // Refresh data
        loadCounselorData();
      } else {
        alert('Failed to reject request');
      }
    } catch (err) {
      console.error('Error rejecting request:', err);
      alert('Failed to reject request');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
              <span className="text-2xl">👨‍🏫</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                Welcome, {counselorData?.users?.first_name || 'Counselor'}!
              </h1>
              <p className="text-purple-100">
                {counselorData?.specialization || 'Education Counselor'}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'students', label: 'Students', icon: '👨‍🎓' },
              { id: 'requests', label: 'Requests', icon: '📋', badge: requests.length },
              { id: 'sessions', label: 'Sessions', icon: '📅' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-2 text-center text-sm font-medium border-b-2 transition-colors relative ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <div className="relative">
                    <span className="text-lg">{tab.icon}</span>
                    {tab.badge > 0 && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {tab.badge}
                      </span>
                    )}
                  </div>
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
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                  <div className="text-2xl font-bold text-purple-600">{students.length}</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                  <div className="text-2xl font-bold text-orange-600">{requests.length}</div>
                  <div className="text-sm text-gray-600">Requests</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                  <div className="text-2xl font-bold text-green-600">{sessions.length}</div>
                  <div className="text-sm text-gray-600">Sessions</div>
                </div>
              </div>

              {/* Profile Summary */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Specialization:</span>
                    <span className="font-medium">{counselorData?.specialization || 'General'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">{counselorData?.experience_years || 0} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <span className="font-medium">⭐ {counselorData?.rating || 4.5}</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                {requests.length > 0 ? (
                  <div className="space-y-3">
                    {requests.slice(0, 3).map((request, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                        <span className="text-lg">📋</span>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">
                            New request from {request.student_name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(request.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <span className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded-full font-medium">
                          Pending
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-4">No recent activity</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">My Students</h2>

              {students.length > 0 ? (
                <div className="space-y-3">
                  {students.map((student, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold">
                            {student.name?.charAt(0) || 'S'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{student.name}</h3>
                          <p className="text-sm text-gray-600">{student.email}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-gray-500">📚 {student.fieldOfStudy}</span>
                            <span className="text-xs text-gray-500">🌍 {student.targetCountry}</span>
                          </div>
                          <div className="flex space-x-2 mt-3">
                            <button className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                              Schedule Session
                            </button>
                            <button className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
                              View Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">👨‍🎓</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No students yet</h3>
                  <p className="text-gray-600">Students will appear here once they connect with you</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Connection Requests</h2>

              {requests.length > 0 ? (
                <div className="space-y-3">
                  {requests.map((request, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-600 font-bold">
                            {request.student_name?.charAt(0) || 'S'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{request.student_name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{request.request_reason}</p>
                          <div className="text-xs text-gray-500 mt-2">
                            📅 {new Date(request.created_at).toLocaleDateString()}
                          </div>
                          <div className="flex space-x-2 mt-3">
                            <button
                              onClick={() => handleApproveRequest(request.id)}
                              className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectRequest(request.id)}
                              className="text-sm bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📋</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No pending requests</h3>
                  <p className="text-gray-600">New connection requests will appear here</p>
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
                          <p className="text-sm text-gray-600">with {session.student}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-500">📅 {session.date}</span>
                            <span className="text-sm text-gray-500">🕐 {session.time}</span>
                          </div>
                          <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(session.status)}`}>
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
                  <p className="text-gray-600">Sessions with your students will appear here</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileCounselorDashboard;

