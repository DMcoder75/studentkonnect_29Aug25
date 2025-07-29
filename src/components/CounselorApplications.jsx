import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Search, 
  Filter,
  Download,
  Eye,
  Edit,
  Send,
  Calendar,
  User,
  GraduationCap,
  MapPin,
  Star
} from 'lucide-react';

const CounselorApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const onMobileMenuClose = () => setIsMobileMenuOpen(false);

  // Sample application data for Michael Chen
  const sampleApplications = [
    {
      id: 1,
      studentName: 'Priya Dubey',
      studentEmail: 'priya.dubey@email.com',
      university: 'University of Toronto',
      program: 'Bachelor of Laws (LLB)',
      country: 'Canada',
      status: 'submitted',
      submissionDate: '2025-07-25',
      deadline: '2025-08-15',
      progress: 85,
      documents: ['Transcript', 'SOP', 'LOR', 'Resume'],
      priority: 'high'
    },
    {
      id: 2,
      studentName: 'Arjun Patel',
      studentEmail: 'arjun.patel@email.com',
      university: 'McGill University',
      program: 'Master of Business Administration',
      country: 'Canada',
      status: 'in_review',
      submissionDate: '2025-07-20',
      deadline: '2025-08-10',
      progress: 95,
      documents: ['Transcript', 'SOP', 'LOR', 'Resume', 'GMAT'],
      priority: 'medium'
    },
    {
      id: 3,
      studentName: 'Sneha Sharma',
      studentEmail: 'sneha.sharma@email.com',
      university: 'York University',
      program: 'Bachelor of Commerce',
      country: 'Canada',
      status: 'draft',
      submissionDate: null,
      deadline: '2025-09-01',
      progress: 45,
      documents: ['Transcript', 'SOP'],
      priority: 'low'
    },
    {
      id: 4,
      studentName: 'Rahul Kumar',
      studentEmail: 'rahul.kumar@email.com',
      university: 'University of British Columbia',
      program: 'Master of Computer Science',
      country: 'Canada',
      status: 'accepted',
      submissionDate: '2025-07-15',
      deadline: '2025-07-30',
      progress: 100,
      documents: ['Transcript', 'SOP', 'LOR', 'Resume', 'Portfolio'],
      priority: 'high'
    }
  ];

  useEffect(() => {
    // Simulate loading applications
    setTimeout(() => {
      setApplications(sampleApplications);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'in_review': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'draft': return <Edit className="h-4 w-4" />;
      case 'submitted': return <Clock className="h-4 w-4" />;
      case 'in_review': return <Eye className="h-4 w-4" />;
      case 'accepted': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.program.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: applications.length,
    submitted: applications.filter(app => app.status === 'submitted').length,
    inReview: applications.filter(app => app.status === 'in_review').length,
    accepted: applications.filter(app => app.status === 'accepted').length,
    draft: applications.filter(app => app.status === 'draft').length
  };

  return (
    <div className="flex">
      <Sidebar 
        isOpen={true}
        onClose={() => {}}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={onMobileMenuClose}
      />
      
      <main className="flex-1 w-full md:w-auto transition-all duration-300 min-h-screen bg-gray-50">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Applications</h1>
            <p className="text-gray-600">Track and manage your students' university applications</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Submitted</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.submitted}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Send className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Review</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.inReview}</p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Accepted</p>
                  <p className="text-2xl font-bold text-green-600">{stats.accepted}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Draft</p>
                  <p className="text-2xl font-bold text-gray-600">{stats.draft}</p>
                </div>
                <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Edit className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="md:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="submitted">Submitted</option>
                  <option value="in_review">In Review</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Applications List */}
          <div className="space-y-6">
            {filteredApplications.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              filteredApplications.map((application) => (
                <div key={application.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{application.studentName}</h3>
                          <p className="text-sm text-gray-600">{application.studentEmail}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-1">
                              <GraduationCap className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{application.university}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{application.country}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className={`h-5 w-5 ${getPriorityColor(application.priority)}`} />
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)} flex items-center space-x-1`}>
                          {getStatusIcon(application.status)}
                          <span className="capitalize">{application.status.replace('_', ' ')}</span>
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-1">{application.program}</h4>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Application Progress</span>
                        <span>{application.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${application.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Deadline: {new Date(application.deadline).toLocaleDateString()}</span>
                        </div>
                        {application.submissionDate && (
                          <div className="flex items-center space-x-1">
                            <Send className="h-4 w-4" />
                            <span>Submitted: {new Date(application.submissionDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="h-4 w-4 inline mr-1" />
                          View
                        </button>
                        <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          <Download className="h-4 w-4 inline mr-1" />
                          Download
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-600">Documents: </span>
                          <span className="text-sm font-medium text-gray-900">
                            {application.documents.join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CounselorApplications;

