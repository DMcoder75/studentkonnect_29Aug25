import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
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
import Sidebar from './Sidebar';

const CounselorDashboard = ({ isMobileMenuOpen, onMobileMenuClose }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [counselorData, setCounselorData] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get counselor data based on logged-in user
  const getCounselorData = (userEmail) => {
    const counselorProfiles = {
      'sarah.johnson@studentkonnect.com': {
        id: 1,
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@studentkonnect.com',
        specializations: ['Computer Science', 'Engineering', 'Technology'],
        rating: 4.9,
        totalStudents: 523,
        activeStudents: 18,
        successRate: 95.5,
        totalReviews: 156
      },
      'michael.chen@studentkonnect.com': {
        id: 2,
        name: 'Dr. Michael Chen',
        email: 'michael.chen@studentkonnect.com',
        specializations: ['Business Administration', 'Commerce', 'Economics'],
        rating: 4.8,
        totalStudents: 445,
        activeStudents: 15,
        successRate: 94.2,
        totalReviews: 128
      },
      'james.wilson@studentkonnect.com': {
        id: 3,
        name: 'Dr. James Wilson',
        email: 'james.wilson@studentkonnect.com',
        specializations: ['Medicine', 'Health Sciences', 'Nursing'],
        rating: 4.9,
        totalStudents: 380,
        activeStudents: 22,
        successRate: 96.8,
        totalReviews: 142
      },
      'priya.sharma@studentkonnect.com': {
        id: 4,
        name: 'Dr. Priya Sharma',
        email: 'priya.sharma@studentkonnect.com',
        specializations: ['Engineering', 'Technology', 'Computer Science'],
        rating: 4.7,
        totalStudents: 290,
        activeStudents: 20,
        successRate: 93.5,
        totalReviews: 98
      },
      'emma.davis@studentkonnect.com': {
        id: 5,
        name: 'Dr. Emma Davis',
        email: 'emma.davis@studentkonnect.com',
        specializations: ['Law', 'Legal Studies', 'Political Science'],
        rating: 4.8,
        totalStudents: 315,
        activeStudents: 16,
        successRate: 95.0,
        totalReviews: 112
      }
    };

    return counselorProfiles[userEmail] || counselorProfiles['sarah.johnson@studentkonnect.com'];
  };

  // Mock data - replace with actual API calls
  useEffect(() => {
    if (user?.email) {
      // Simulate API call
      setTimeout(() => {
        const data = getCounselorData(user.email);
        setCounselorData(data);

      setStudents([
        {
          id: 1,
          name: 'Priya Dubey',
          email: 'priya.dubey@email.com',
          fieldOfStudy: 'Law',
          targetCountry: 'Canada',
          currentStage: 'Application Prep',
          progress: 65,
          priority: 'high',
          status: 'active',
          lastContact: '2 days ago',
          nextMeeting: 'Tomorrow 2:00 PM',
          workflow: {
            counseling: { completed: true, completedAt: '2024-01-15' },
            universitySelection: { completed: true, completedAt: '2024-01-20' },
            applicationPrep: { completed: false, inProgress: true },
            applicationSubmission: { completed: false },
            visaGuidance: { completed: false },
            travelSupport: { completed: false },
            accommodationHelp: { completed: false }
          }
        },
        {
          id: 2,
          name: 'Rahul Sharma',
          email: 'rahul.sharma@email.com',
          fieldOfStudy: 'Computer Science',
          targetCountry: 'Australia',
          currentStage: 'Visa Guidance',
          progress: 85,
          priority: 'medium',
          status: 'active',
          lastContact: '1 week ago',
          nextMeeting: 'Friday 10:00 AM',
          workflow: {
            counseling: { completed: true, completedAt: '2024-01-10' },
            universitySelection: { completed: true, completedAt: '2024-01-15' },
            applicationPrep: { completed: true, completedAt: '2024-02-01' },
            applicationSubmission: { completed: true, completedAt: '2024-02-15' },
            visaGuidance: { completed: false, inProgress: true },
            travelSupport: { completed: false },
            accommodationHelp: { completed: false }
          }
        }
      ]);

      setLoading(false);
    }, 1000);
    }
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getWorkflowStageIcon = (stage, data) => {
    if (data.completed) return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (data.inProgress) return <Clock className="w-4 h-4 text-blue-500" />;
    return <AlertCircle className="w-4 h-4 text-gray-400" />;
  };

  const getWorkflowStageText = (stage) => {
    const stages = {
      counseling: '🗣️ Counseling',
      universitySelection: '🎓 University Selection',
      applicationPrep: '📝 Application Prep',
      applicationSubmission: '✅ Application Submission',
      visaGuidance: '📋 Visa Guidance',
      travelSupport: '✈️ Travel Support',
      accommodationHelp: '🏠 Accommodation Help'
    };
    return stages[stage] || stage;
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.fieldOfStudy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading counselor dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Two-Column Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={true}
          onClose={() => {}}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={onMobileMenuClose}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full md:w-auto transition-all duration-300 min-h-screen">
          {/* Header */}
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Counselor Dashboard</h1>
                  <p className="text-gray-600">Welcome back, {counselorData?.name}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold">{counselorData?.rating}</span>
                    <span className="text-gray-500">({counselorData?.totalReviews} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Students</p>
                    <p className="text-2xl font-bold text-gray-900">{counselorData?.activeStudents}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{counselorData?.successRate}%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Helped</p>
                    <p className="text-2xl font-bold text-gray-900">{counselorData?.totalStudents}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">This Week</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-xs text-gray-500">meetings</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'overview'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Users className="w-4 h-4 inline mr-2" />
                    Students Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('meetings')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'meetings'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Meetings
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div>
                    {/* Search and Filter */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            placeholder="Search students..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Filter className="w-4 h-4 text-gray-400" />
                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="all">All Status</option>
                          <option value="active">Active</option>
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>

                    {/* Students List */}
                    <div className="space-y-4">
                      {filteredStudents.map((student) => (
                        <div key={student.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                                  {student.currentStage}
                                </span>
                                <AlertCircle className={`w-4 h-4 ${getPriorityColor(student.priority)}`} />
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                  <p className="text-sm text-gray-600">Email</p>
                                  <p className="font-medium">{student.email}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Field of Study</p>
                                  <p className="font-medium">{student.fieldOfStudy}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Target Country</p>
                                  <p className="font-medium">{student.targetCountry}</p>
                                </div>
                              </div>

                              {/* Progress Bar */}
                              <div className="mb-4">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                                  <span className="text-sm text-gray-500">{student.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${student.progress}%` }}
                                  ></div>
                                </div>
                              </div>

                              {/* Workflow Status */}
                              <div className="mb-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">Workflow Progress</p>
                                <div className="flex flex-wrap gap-2">
                                  {Object.entries(student.workflow).map(([stage, data]) => (
                                    <div key={stage} className="flex items-center space-x-1">
                                      {getWorkflowStageIcon(stage, data)}
                                      <span className={`text-xs ${data.completed ? 'text-green-600' : data.inProgress ? 'text-blue-600' : 'text-gray-400'}`}>
                                        {getWorkflowStageText(stage)}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>Last contact: {student.lastContact}</span>
                                <span>Next meeting: {student.nextMeeting}</span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 ml-4">
                              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                                <Phone className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                                <Video className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                                <Mail className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'meetings' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Meeting Schedule</h3>
                    <div className="bg-gray-50 rounded-lg p-6 text-center">
                      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Meeting calendar integration coming soon...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CounselorDashboard;

