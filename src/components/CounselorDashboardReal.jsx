import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { realDatabaseService } from '../services/realDatabaseService';
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  TrendingUp,
  MessageSquare,
  FileText,
  Plane,
  Home,
  GraduationCap,
  Star,
  Filter,
  Search,
  MoreVertical,
  Eye,
  Edit,
  Phone,
  Video,
  Mail
} from 'lucide-react';

const CounselorDashboardReal = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [counselorData, setCounselorData] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get counselor ID from email mapping
  const getCounselorIdFromEmail = (email) => {
    const emailToCounselorId = {
      'sarah.chen@studentkonnect.com': 11,
      'michael.thompson@studentkonnect.com': 12,
      'rajesh.kumar@studentkonnect.com': 13,
      'emma.williams@studentkonnect.com': 14,
      'james.mitchell@studentkonnect.com': 15,
      'michael.kumar@email.com': 2  // Add our test counselor
    };
    return emailToCounselorId[email] || 11; // Default to Dr. Sarah Chen
  };

  // Load counselor data and assigned students
  useEffect(() => {
    const loadCounselorData = async () => {
      if (!user?.email) return;

      try {
        setLoading(true);
        setError(null);

        // Get counselor ID from email
        const counselorId = getCounselorIdFromEmail(user.email);
        
        // Get counselor details
        const counselorResult = await realDatabaseService.getCounselorById(counselorId);
        if (counselorResult.success && counselorResult.data) {
          setCounselorData(counselorResult.data);
        }

        // Get approved students for this counselor
        const studentsResult = await realDatabaseService.getApprovedStudentsForCounselor(counselorId);
        if (studentsResult.success) {
          // Transform the data to match the component's expected format
          const transformedStudents = studentsResult.data.map(request => ({
            id: request.students.id,
            name: `${request.students.first_name} ${request.students.last_name}`,
            email: request.students.email,
            phone: request.students.phone,
            connectionId: request.id,
            requestReason: request.request_reason,
            approvedAt: request.approved_at,
            createdAt: request.created_at,
            // Default values for fields not in database yet
            fieldOfStudy: 'Not specified',
            targetCountry: 'Not specified',
            currentStage: 'Initial Consultation',
            progress: 10,
            priority: 'medium',
            status: 'active',
            lastContact: 'Recently connected',
            nextMeeting: 'To be scheduled'
          }));
          
          setStudents(transformedStudents);
        } else {
          setError('Failed to load students');
        }
      } catch (err) {
        console.error('Error loading counselor data:', err);
        setError('Failed to load counselor data');
      } finally {
        setLoading(false);
      }
    };

    loadCounselorData();
  }, [user?.email]);

  // Filter students based on search and status
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const stats = {
    totalStudents: students.length,
    activeStudents: students.filter(s => s.status === 'active').length,
    completedApplications: students.filter(s => s.progress >= 90).length,
    upcomingMeetings: students.filter(s => s.nextMeeting !== 'To be scheduled').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading counselor dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <p className="mt-4 text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Counselor Dashboard</h1>
              <p className="text-gray-600">
                Welcome back, {counselorData?.first_name || user?.email}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming Meetings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.upcomingMeetings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed Apps</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedApplications}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: Home },
                { id: 'students', name: 'My Students', icon: Users },
                { id: 'meetings', name: 'Meetings', icon: Calendar },
                { id: 'applications', name: 'Applications', icon: FileText }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              {students.length > 0 ? (
                <div className="space-y-4">
                  {students.slice(0, 3).map((student) => (
                    <div key={student.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-600">Connected on {new Date(student.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {student.lastContact}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No students assigned yet</p>
                  <p className="text-sm text-gray-500 mt-2">Students will appear here after admin approval</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Students</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="on-hold">On Hold</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Students List */}
            <div className="bg-white rounded-xl shadow-sm">
              {filteredStudents.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <div key={student.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-lg">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                            <p className="text-gray-600">{student.email}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-sm text-gray-500">
                                Connected: {new Date(student.createdAt).toLocaleDateString()}
                              </span>
                              <span className="text-sm text-gray-500">
                                Approved: {new Date(student.approvedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                            <MessageSquare className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg">
                            <Phone className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg">
                            <Video className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg">
                            <MoreVertical className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      
                      {student.requestReason && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>Connection Request:</strong> {student.requestReason}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
                  <p className="text-gray-600">
                    {searchTerm || filterStatus !== 'all' 
                      ? 'Try adjusting your search or filter criteria'
                      : 'Students will appear here after admin approval of connection requests'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'meetings' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Meetings</h3>
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No meetings scheduled</p>
              <p className="text-sm text-gray-500 mt-2">Schedule meetings with your students to track progress</p>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Applications</h3>
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No applications in progress</p>
              <p className="text-sm text-gray-500 mt-2">Track your students' university applications here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CounselorDashboardReal;

