import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  UserCheck,
  UserX,
  RefreshCw,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Star,
  TrendingUp,
  FileText,
  MessageSquare
} from 'lucide-react';

const AdminCounselorManagement = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [requests, setRequests] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showReassignModal, setShowReassignModal] = useState(false);

  // Mock data - replace with actual API calls
  useEffect(() => {
    setTimeout(() => {
      // Mock counselor requests
      setRequests([
        {
          id: 1,
          studentId: 'student-001',
          studentName: 'Arjun Patel',
          studentEmail: 'arjun.patel@email.com',
          requestedCounselorId: 1,
          requestedCounselorName: 'Sarah Johnson',
          requestDate: '2024-07-28 10:30',
          status: 'pending',
          priority: 'high',
          reason: 'I am interested in studying law in Canada and Sarah has excellent reviews for Canadian university admissions. Her expertise in visa guidance would be very helpful for my application process.',
          preferredMeetingTime: 'Morning (9 AM - 12 PM)',
          studentProfile: {
            country: 'India',
            targetCountry: 'Canada',
            fieldOfStudy: 'Law',
            currentEducation: 'Bachelor of Arts (Final Year)',
            gpa: 8.5
          }
        },
        {
          id: 2,
          studentId: 'student-002',
          studentName: 'Meera Singh',
          studentEmail: 'meera.singh@email.com',
          requestedCounselorId: 4,
          requestedCounselorName: 'Michael Chen',
          requestDate: '2024-07-27 15:45',
          status: 'pending',
          priority: 'medium',
          reason: 'Looking for guidance on engineering programs in Singapore and Australia. Michael\'s global expertise and high success rate make him ideal for my needs.',
          preferredMeetingTime: 'Afternoon (12 PM - 5 PM)',
          studentProfile: {
            country: 'India',
            targetCountry: 'Singapore',
            fieldOfStudy: 'Computer Engineering',
            currentEducation: 'Bachelor of Technology (3rd Year)',
            gpa: 9.2
          }
        },
        {
          id: 3,
          studentId: 'student-003',
          studentName: 'Rohit Kumar',
          studentEmail: 'rohit.kumar@email.com',
          requestedCounselorId: 2,
          requestedCounselorName: 'James Wilson',
          requestDate: '2024-07-26 09:15',
          status: 'approved',
          priority: 'low',
          reason: 'Interested in UK universities for business studies. James specializes in UK education system and has good experience with business programs.',
          preferredMeetingTime: 'Evening (5 PM - 8 PM)',
          studentProfile: {
            country: 'India',
            targetCountry: 'United Kingdom',
            fieldOfStudy: 'Business Administration',
            currentEducation: 'Bachelor of Commerce (Final Year)',
            gpa: 7.8
          },
          approvedBy: 'Admin User',
          approvedDate: '2024-07-26 14:30'
        }
      ]);

      // Mock active assignments
      setAssignments([
        {
          id: 1,
          studentId: 'student-004',
          studentName: 'Priya Dubey',
          studentEmail: 'priya.dubey@email.com',
          counselorId: 1,
          counselorName: 'Sarah Johnson',
          assignedDate: '2024-07-15',
          status: 'active',
          progress: 35,
          currentStage: 'University Selection',
          nextMeeting: '2024-07-30 14:00',
          totalMeetings: 3,
          lastActivity: '2024-07-28 10:30',
          studentProfile: {
            country: 'India',
            targetCountry: 'Canada',
            fieldOfStudy: 'Law',
            currentEducation: 'Bachelor of Arts (Completed)',
            gpa: 8.7
          }
        },
        {
          id: 2,
          studentId: 'student-005',
          studentName: 'Rahul Patel',
          studentEmail: 'rahul.patel@email.com',
          counselorId: 1,
          counselorName: 'Sarah Johnson',
          assignedDate: '2024-07-10',
          status: 'active',
          progress: 65,
          currentStage: 'Document Preparation',
          nextMeeting: '2024-07-29 16:00',
          totalMeetings: 5,
          lastActivity: '2024-07-27 15:45',
          studentProfile: {
            country: 'India',
            targetCountry: 'Australia',
            fieldOfStudy: 'Engineering',
            currentEducation: 'Bachelor of Technology (Completed)',
            gpa: 9.1
          }
        }
      ]);

      // Mock counselors
      setCounselors([
        {
          id: 1,
          name: 'Sarah Johnson',
          email: 'sarah.johnson@studentkonnect.com',
          specializations: ['University Admissions', 'Visa Guidance', 'Scholarship Assistance'],
          countries: ['Australia', 'Canada'],
          currentStudents: 18,
          maxStudents: 25,
          rating: 4.8,
          availability: 'Available'
        },
        {
          id: 2,
          name: 'James Wilson',
          email: 'james.wilson@studentkonnect.com',
          specializations: ['University Admissions', 'Scholarship Assistance', 'Career Guidance'],
          countries: ['United Kingdom', 'Germany'],
          currentStudents: 12,
          maxStudents: 20,
          rating: 4.6,
          availability: 'Available'
        },
        {
          id: 3,
          name: 'Priya Sharma',
          email: 'priya.sharma@studentkonnect.com',
          specializations: ['University Admissions', 'Test Preparation', 'Scholarship Assistance'],
          countries: ['United States', 'Canada'],
          currentStudents: 8,
          maxStudents: 15,
          rating: 4.4,
          availability: 'Busy'
        },
        {
          id: 4,
          name: 'Michael Chen',
          email: 'michael.chen@studentkonnect.com',
          specializations: ['University Admissions', 'Career Guidance', 'Visa Guidance'],
          countries: ['Singapore', 'Australia', 'United States'],
          currentStudents: 22,
          maxStudents: 30,
          rating: 4.9,
          availability: 'Available'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      active: 'bg-blue-100 text-blue-800',
      completed: 'bg-gray-100 text-gray-800',
      paused: 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-red-600',
      medium: 'text-yellow-600',
      low: 'text-green-600'
    };
    return colors[priority] || 'text-gray-600';
  };

  const handleApproveRequest = (requestId) => {
    setRequests(requests.map(req => 
      req.id === requestId 
        ? { ...req, status: 'approved', approvedBy: 'Current Admin', approvedDate: new Date().toISOString() }
        : req
    ));
  };

  const handleRejectRequest = (requestId) => {
    setRequests(requests.map(req => 
      req.id === requestId 
        ? { ...req, status: 'rejected', rejectedBy: 'Current Admin', rejectedDate: new Date().toISOString() }
        : req
    ));
  };

  const handleReassignRequest = (requestId, newCounselorId) => {
    const newCounselor = counselors.find(c => c.id === newCounselorId);
    setRequests(requests.map(req => 
      req.id === requestId 
        ? { 
            ...req, 
            requestedCounselorId: newCounselorId,
            requestedCounselorName: newCounselor.name,
            status: 'reassigned',
            reassignedBy: 'Current Admin',
            reassignedDate: new Date().toISOString()
          }
        : req
    ));
    setShowReassignModal(false);
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requestedCounselorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || request.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.counselorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || assignment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Counselor Management</h1>
              <p className="text-gray-600">Manage counselor requests and assignments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                <p className="text-2xl font-bold text-gray-900">
                  {requests.filter(r => r.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Assignments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {assignments.filter(a => a.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved Today</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">94%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'requests', name: 'Counselor Requests', icon: Clock },
                { id: 'assignments', name: 'Active Assignments', icon: Users },
                { id: 'counselors', name: 'Counselor Overview', icon: UserCheck }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search students, counselors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  {activeTab === 'requests' && (
                    <>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </>
                  )}
                  {activeTab === 'assignments' && (
                    <>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="paused">Paused</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            {/* Counselor Requests Tab */}
            {activeTab === 'requests' && (
              <div className="space-y-4">
                {filteredRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{request.studentName}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                          <AlertCircle className={`w-4 h-4 ${getPriorityColor(request.priority)}`} />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Student Email</p>
                            <p className="font-medium">{request.studentEmail}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Requested Counselor</p>
                            <p className="font-medium">{request.requestedCounselorName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Request Date</p>
                            <p className="font-medium">{request.requestDate}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Target Country</p>
                            <p className="font-medium">{request.studentProfile.targetCountry}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Field of Study</p>
                            <p className="font-medium">{request.studentProfile.fieldOfStudy}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-1">Reason for Request</p>
                          <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{request.reason}</p>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Preferred meeting: {request.preferredMeetingTime}</span>
                          <span>Priority: <span className={getPriorityColor(request.priority)}>{request.priority}</span></span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {request.status === 'pending' && (
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => handleApproveRequest(request.id)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-1"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => {
                              setSelectedRequest(request);
                              setShowReassignModal(true);
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-1"
                          >
                            <RefreshCw className="w-4 h-4" />
                            <span>Reassign</span>
                          </button>
                          <button
                            onClick={() => handleRejectRequest(request.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-1"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Active Assignments Tab */}
            {activeTab === 'assignments' && (
              <div className="space-y-4">
                {filteredAssignments.map((assignment) => (
                  <div key={assignment.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{assignment.studentName}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                            {assignment.currentStage}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Counselor</p>
                            <p className="font-medium">{assignment.counselorName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Assigned Date</p>
                            <p className="font-medium">{assignment.assignedDate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Total Meetings</p>
                            <p className="font-medium">{assignment.totalMeetings}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Next Meeting</p>
                            <p className="font-medium">{assignment.nextMeeting}</p>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">Progress</span>
                            <span className="text-sm text-gray-500">{assignment.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${assignment.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Target: {assignment.studentProfile.targetCountry}</span>
                          <span>Field: {assignment.studentProfile.fieldOfStudy}</span>
                          <span>Last activity: {assignment.lastActivity}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2 ml-4">
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Counselors Overview Tab */}
            {activeTab === 'counselors' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {counselors.map((counselor) => (
                  <div key={counselor.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{counselor.name}</h3>
                        <p className="text-gray-600">{counselor.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{counselor.rating}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            counselor.availability === 'Available' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {counselor.availability}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Specializations</p>
                      <div className="flex flex-wrap gap-1">
                        {counselor.specializations.map((spec, index) => (
                          <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Countries</p>
                      <p className="text-sm text-gray-600">{counselor.countries.join(', ')}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">{counselor.currentStudents}</div>
                        <div className="text-xs text-gray-500">Current Students</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">{counselor.maxStudents}</div>
                        <div className="text-xs text-gray-500">Max Capacity</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reassign Modal */}
      {showReassignModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Reassign Counselor for {selectedRequest.studentName}
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select New Counselor
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onChange={(e) => {
                  if (e.target.value) {
                    handleReassignRequest(selectedRequest.id, parseInt(e.target.value));
                  }
                }}
              >
                <option value="">Choose a counselor...</option>
                {counselors
                  .filter(c => c.id !== selectedRequest.requestedCounselorId && c.availability === 'Available')
                  .map(counselor => (
                    <option key={counselor.id} value={counselor.id}>
                      {counselor.name} ({counselor.currentStudents}/{counselor.maxStudents} students)
                    </option>
                  ))
                }
              </select>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowReassignModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCounselorManagement;

