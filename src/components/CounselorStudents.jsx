import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  MessageSquare, 
  Phone, 
  Video, 
  Mail, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  MoreVertical,
  FileText,
  TrendingUp,
  Star,
  MapPin,
  GraduationCap
} from 'lucide-react';
import Sidebar from './Sidebar';

const CounselorStudents = ({ isMobileMenuOpen, onMobileMenuClose }) => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    setTimeout(() => {
      setStudents([
        {
          id: 1,
          name: 'Priya Dubey',
          email: 'priya.dubey@email.com',
          phone: '+91 98765 43210',
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
        },
        {
          id: 2,
          name: 'Rahul Sharma',
          email: 'rahul.sharma@email.com',
          phone: '+91 87654 32109',
          fieldOfStudy: 'Computer Science',
          targetCountry: 'Australia',
          currentStage: 'Visa Guidance',
          progress: 85,
          priority: 'medium',
          status: 'active',
          lastContact: '1 week ago',
          nextMeeting: 'Friday 10:00 AM',
          joinedDate: '2024-01-10',
          targetUniversities: ['University of Melbourne', 'Australian National University', 'University of Sydney'],
          gpa: '9.2/10',
          englishScore: 'IELTS 8.0',
          workflow: {
            counseling: { completed: true, completedAt: '2024-01-10' },
            universitySelection: { completed: true, completedAt: '2024-01-15' },
            applicationPrep: { completed: true, completedAt: '2024-02-01' },
            applicationSubmission: { completed: true, completedAt: '2024-02-15' },
            visaGuidance: { completed: false, inProgress: true },
            travelSupport: { completed: false },
            accommodationHelp: { completed: false }
          }
        },
        {
          id: 3,
          name: 'Ananya Patel',
          email: 'ananya.patel@email.com',
          phone: '+91 76543 21098',
          fieldOfStudy: 'Medicine',
          targetCountry: 'United Kingdom',
          currentStage: 'University Selection',
          progress: 45,
          priority: 'high',
          status: 'active',
          lastContact: '3 days ago',
          nextMeeting: 'Monday 3:00 PM',
          joinedDate: '2024-02-01',
          targetUniversities: ['Oxford University', 'Cambridge University', 'Imperial College London'],
          gpa: '9.8/10',
          englishScore: 'IELTS 8.5',
          workflow: {
            counseling: { completed: true, completedAt: '2024-02-01' },
            universitySelection: { completed: false, inProgress: true },
            applicationPrep: { completed: false },
            applicationSubmission: { completed: false },
            visaGuidance: { completed: false },
            travelSupport: { completed: false },
            accommodationHelp: { completed: false }
          }
        },
        {
          id: 4,
          name: 'Arjun Singh',
          email: 'arjun.singh@email.com',
          phone: '+91 65432 10987',
          fieldOfStudy: 'Business Administration',
          targetCountry: 'United States',
          currentStage: 'Travel Support',
          progress: 95,
          priority: 'low',
          status: 'active',
          lastContact: '1 day ago',
          nextMeeting: 'Next week',
          joinedDate: '2023-12-01',
          targetUniversities: ['Harvard Business School', 'Stanford Graduate School', 'Wharton School'],
          gpa: '9.0/10',
          englishScore: 'TOEFL 110',
          workflow: {
            counseling: { completed: true, completedAt: '2023-12-01' },
            universitySelection: { completed: true, completedAt: '2023-12-15' },
            applicationPrep: { completed: true, completedAt: '2024-01-15' },
            applicationSubmission: { completed: true, completedAt: '2024-02-01' },
            visaGuidance: { completed: true, completedAt: '2024-02-20' },
            travelSupport: { completed: false, inProgress: true },
            accommodationHelp: { completed: false }
          }
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
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
                         student.fieldOfStudy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.targetCountry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || student.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading students...</p>
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
                  <h1 className="text-2xl font-bold text-gray-900">My Students</h1>
                  <p className="text-gray-600">Manage and track your assigned students</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-indigo-500" />
                    <span className="font-semibold">{filteredStudents.length}</span>
                    <span className="text-gray-500">students</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow mb-6 p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search students by name, email, field of study, or country..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
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
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <select
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="all">All Priority</option>
                      <option value="high">High Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="low">Low Priority</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Students Grid */}
            <div className="space-y-6">
              {filteredStudents.map((student) => (
                <div key={student.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    {/* Student Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600 font-semibold text-lg">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{student.name}</h3>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                              {student.currentStage}
                            </span>
                            <AlertCircle className={`w-4 h-4 ${getPriorityColor(student.priority)}`} />
                            <span className="text-sm text-gray-500">Joined {student.joinedDate}</span>
                          </div>
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
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Student Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-600">Contact</p>
                        <p className="font-medium">{student.email}</p>
                        <p className="text-sm text-gray-500">{student.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Field of Study</p>
                        <p className="font-medium">{student.fieldOfStudy}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-500">{student.targetCountry}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Academic Performance</p>
                        <p className="font-medium">GPA: {student.gpa}</p>
                        <p className="text-sm text-gray-500">{student.englishScore}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Next Meeting</p>
                        <p className="font-medium">{student.nextMeeting}</p>
                        <p className="text-sm text-gray-500">Last contact: {student.lastContact}</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
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

                    {/* Workflow Progress */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-3">Workflow Progress</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                        {Object.entries(student.workflow).map(([stage, data]) => (
                          <div key={stage} className="flex flex-col items-center space-y-1">
                            {getWorkflowStageIcon(stage, data)}
                            <span className={`text-xs text-center ${data.completed ? 'text-green-600' : data.inProgress ? 'text-blue-600' : 'text-gray-400'}`}>
                              {getWorkflowStageText(stage).split(' ')[0]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Target Universities */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Target Universities</p>
                      <div className="flex flex-wrap gap-2">
                        {student.targetUniversities.map((university, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {university}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredStudents.length === 0 && (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CounselorStudents;

