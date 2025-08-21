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
import GlobalSidebarManager from './GlobalSidebarManager';

const CounselorDashboard = ({ isMobileMenuOpen, onMobileMenuClose }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [counselorData, setCounselorData] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load real data from database
  useEffect(() => {
    if (user?.email) {
      loadCounselorData();
    }
  }, [user]);

  // Calculate real counselor stats from database
  const calculateCounselorStats = async (counselorId) => {
    try {
      console.log('📊 Calculating real stats for counselor ID:', counselorId);
      
      // Get all counselor requests for this counselor
      const requestsResult = await realDatabaseService.getAllCounselorRequests();
      
      if (requestsResult.success && requestsResult.data) {
        const counselorRequests = requestsResult.data.filter(req => 
          req.counselor_id === counselorId
        );
        
        const totalStudents = counselorRequests.length;
        const activeStudents = counselorRequests.filter(req => req.status === 'approved').length;
        const completedStudents = counselorRequests.filter(req => req.status === 'completed').length;
        
        // Calculate success rate (completed / total)
        const successRate = totalStudents > 0 ? 
          Math.round((completedStudents / totalStudents) * 100) : 0;
        
        console.log('📊 Real stats calculated:', {
          totalStudents,
          activeStudents,
          successRate
        });
        
        return {
          totalStudents,
          activeStudents,
          successRate
        };
      }
      
      // Return empty stats if no data found
      return {
        totalStudents: 0,
        activeStudents: 0,
        successRate: 0
      };
      
    } catch (error) {
      console.error('Error calculating counselor stats:', error);
      return {
        totalStudents: 0,
        activeStudents: 0,
        successRate: 0
      };
    }
  };

  const loadCounselorData = async () => {
    try {
      setLoading(true);
      
      // Get counselor profile from database
      const counselorResult = await realDatabaseService.getAllUsers();
      let counselorProfile = null;
      
      if (counselorResult.success && counselorResult.data) {
        // Find the current counselor's profile
        counselorProfile = counselorResult.data.find(u => 
          u.email === user.email && u.role === 'counselor'
        );
      }
      
      // Calculate real stats from database
      const realStats = await calculateCounselorStats(counselorProfile?.id || user.id);
      
      // Set counselor data with real values from database
      setCounselorData({
        id: counselorProfile?.id || user.id,
        name: counselorProfile?.full_name || user.name || 'Counselor',
        email: user.email,
        specializations: counselorProfile?.specializations ? 
          counselorProfile.specializations.split(',') : 
          ['Business', 'Finance', 'MBA Programs'],
        rating: counselorProfile?.rating || 4.7,
        totalStudents: realStats.totalStudents,
        activeStudents: realStats.activeStudents,
        successRate: realStats.successRate,
        totalReviews: counselorProfile?.total_reviews || 0
      });
      // Get students assigned to this counselor
      const studentsResult = await realDatabaseService.getAllUsers();
      let counselorId = null;
      
      if (studentsResult.success && studentsResult.data) {
        // Find the counselor's ID from the users table
        const counselorUser = studentsResult.data.find(u => 
          u.email === user.email && u.role === 'counselor'
        );
        counselorId = counselorUser?.user_id;
      }

      if (counselorId) {
        // Get students specifically assigned to this counselor
        const assignedStudentsResult = await realDatabaseService.getCounselorStudents(counselorId);
        
        if (assignedStudentsResult.success && assignedStudentsResult.data && assignedStudentsResult.data.length > 0) {
          // Get full student details for assigned students
          const allUsersResult = await realDatabaseService.getAllUsers();
          
          if (allUsersResult.success && allUsersResult.data) {
            const assignedStudentIds = assignedStudentsResult.data.map(req => req.student_id);
            
            const assignedStudents = allUsersResult.data
              .filter(user => user.role === 'student' && assignedStudentIds.includes(user.user_id))
              .map(student => ({
                id: student.user_id,
                name: student.name || student.email.split('@')[0],
                email: student.email,
                fieldOfStudy: student.field_of_study || 'Not specified',
                targetCountry: student.target_country || 'Not specified',
                currentStage: student.current_stage || 'Initial Consultation',
                progress: student.progress || 0,
                priority: student.priority || 'medium',
                status: student.status || 'active',
                lastContact: student.last_contact || 'Never',
                nextMeeting: student.next_meeting || 'Not scheduled',
                joinedDate: student.created_at ? new Date(student.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                targetUniversities: student.target_universities ? 
                  student.target_universities.split(',') : 
                  [],
                gpa: student.gpa || 'Not provided',
                englishScore: student.english_score || 'Not provided',
                workflow: {
                  counseling: { completed: student.counseling_completed || false, completedAt: student.counseling_completed_at || null },
                  universitySelection: { completed: student.university_selection_completed || false, completedAt: student.university_selection_completed_at || null },
                  applicationPrep: { completed: student.application_prep_completed || false, inProgress: student.application_prep_in_progress || false },
                  applicationSubmission: { completed: student.application_submission_completed || false },
                  visaGuidance: { completed: student.visa_guidance_completed || false, inProgress: student.visa_guidance_in_progress || false },
                  travelSupport: { completed: student.travel_support_completed || false },
                  accommodationHelp: { completed: student.accommodation_help_completed || false }
                }
              }));

            setStudents(assignedStudents);
            
            // Update counselor data with actual assigned student count
            setCounselorData(prev => ({
              ...prev,
              activeStudents: assignedStudents.length
            }));
          } else {
            // No users data available
            setStudents([]);
          }
        } else {
          // No assigned students found - show empty list
          setStudents([]);
        }
      } else {
        // No counselor ID found - show empty list
        setStudents([]);
      }
      
    } catch (error) {
      console.error('Error loading counselor data:', error);
      
      // Fallback data if database fails - use real empty values
      setCounselorData({
        id: 1,
        name: user.name || 'Michael Kumar',
        email: user.email,
        specializations: ['Business', 'Finance', 'MBA Programs'],
        rating: 4.7,
        totalStudents: 0,
        activeStudents: 0,
        successRate: 0,
        totalReviews: 0
      });
      
      setStudents([]);  // Empty array instead of sample students
    } finally {
      setLoading(false);
    }
  };

  const getSampleStudents = () => {
    return [
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
        joinedDate: '2024-01-15',
        targetUniversities: ['York University', 'University of Toronto', 'McGill University'],
        gpa: '8.5/10',
        englishScore: 'IELTS 7.5',
        workflow: {
          counseling: { completed: true, completedAt: '2024-01-15' },
          universitySelection: { completed: true, completedAt: '2024-01-20' },
          applicationPrep: { completed: false, inProgress: true },
          applicationSubmission: { completed: false },
          visaGuidance: { completed: false },
          travelSupport: { completed: false },
          accommodationHelp: { completed: false }
        }
      }
    ];
  };

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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!counselorData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to load counselor data</h3>
          <p className="text-gray-600">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-4 w-full h-[320px] flex items-center mt-12 sm:mt-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(/HeroUniPathway.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="relative min-h-[280px] sm:min-h-[300px] flex items-center">
              <div className="w-full text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  Welcome back, 
                  <br />
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    {counselorData.name}
                  </span>
                </h1>
                <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                  Counselor Dashboard
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  {counselorData.specializations.map((spec, index) => (
                    <span key={index} className="px-3 py-1 bg-white/20 rounded-full">
                      {spec}
                    </span>
                  ))}
                </div>
                <div className="flex justify-center items-center space-x-8 mt-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="h-5 w-5 text-yellow-300 fill-current" />
                      <span className="text-2xl font-bold">{counselorData.rating}</span>
                    </div>
                    <p className="text-sm opacity-90">({counselorData.totalReviews} reviews)</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{counselorData.successRate}%</div>
                    <p className="text-sm opacity-90">Success Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{counselorData.totalStudents}</div>
                    <p className="text-sm opacity-90">Students Helped</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content with Sidebar Layout */}
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <GlobalSidebarManager />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 bg-gradient-to-br from-purple-50 via-white to-cyan-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Active Students</p>
                    <p className="text-2xl font-bold text-gray-900">{counselorData.activeStudents}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{counselorData.successRate}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Total Helped</p>
                    <p className="text-2xl font-bold text-gray-900">{counselorData.totalStudents}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">This Week</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-xs text-gray-500">meetings</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
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
                    <div className="flex flex-col lg:flex-row gap-4 mb-6">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search students..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
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

                    {/* Students List */}
                    <div className="space-y-4">
                      {filteredStudents.map((student) => (
                        <div key={student.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                <span className="text-indigo-600 font-semibold">
                                  {student.name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{student.name}</h3>
                                <p className="text-sm text-gray-600">{student.currentStage}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">
                                <Phone className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">
                                <Video className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">
                                <Mail className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">
                                <MessageSquare className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                            <div>
                              <p className="text-gray-600">Email</p>
                              <p className="font-medium">{student.email}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Field of Study</p>
                              <p className="font-medium">{student.fieldOfStudy}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Target Country</p>
                              <p className="font-medium">{student.targetCountry}</p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
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

                          <div className="flex items-center justify-between text-sm">
                            <div>
                              <span className="text-gray-600">Last contact: </span>
                              <span className="font-medium">{student.lastContact}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Next meeting: </span>
                              <span className="font-medium">{student.nextMeeting}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'meetings' && (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No meetings scheduled</h3>
                    <p className="text-gray-600">Your upcoming meetings will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselorDashboard;

