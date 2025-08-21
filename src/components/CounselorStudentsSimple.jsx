import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { realDatabaseService } from '../services/realDatabaseService';
import { useNavigate } from 'react-router-dom';
import { Users, Search, Eye, MessageSquare, Phone, Video, Mail } from 'lucide-react';
import GlobalSidebarManager from './GlobalSidebarManager';

const CounselorStudents = () => {
  const { isAuthenticated, user, userRole } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isAuthenticated() && userRole === 'counselor') {
      loadStudents();
    } else if (userRole && userRole !== 'counselor') {
      navigate('/');
    }
  }, [isAuthenticated, userRole, navigate]);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const result = await realDatabaseService.getAllUsers();
      
      if (result.success && result.data) {
        const studentUsers = result.data
          .filter(user => user.role === 'student')
          .map(student => ({
            id: student.user_id,
            name: student.name || student.email.split('@')[0],
            email: student.email,
            phone: student.phone || 'Not provided',
            fieldOfStudy: student.field_of_study || 'Not specified',
            targetCountry: student.target_country || 'Not specified',
            status: student.status || 'active',
            joinedDate: student.created_at ? new Date(student.created_at).toLocaleDateString() : 'Unknown'
          }));
        setStudents(studentUsers);
      }
    } catch (error) {
      console.error('Error loading students:', error);
      // Fallback sample data
      setStudents([
        {
          id: 1,
          name: 'Sample Student',
          email: 'student@example.com',
          phone: '+1 234 567 8900',
          fieldOfStudy: 'Computer Science',
          targetCountry: 'Australia',
          status: 'active',
          joinedDate: '2025-01-01'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.fieldOfStudy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated() || userRole !== 'counselor') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Restricted</h3>
          <p className="text-gray-600 mb-4">This page is only accessible to counselors.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading students...</p>
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
                  My Students
                  <br />
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Management Dashboard
                  </span>
                </h1>
                <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                  Manage and track your assigned students. Monitor their progress and guide them through their educational journey.
                </p>
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
            {/* Header */}
            <div className="bg-white shadow rounded-lg mb-6 p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">My Students</h1>
                  <p className="text-gray-600">Manage and track your assigned students</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold">{filteredStudents.length}</span>
                  <span className="text-gray-500">students</span>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-lg shadow mb-6 p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search students by name, email, or field of study..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Students List */}
            <div className="space-y-4">
              {filteredStudents.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
                  <p className="text-gray-600">
                    {searchTerm ? 'Try adjusting your search criteria.' : 'No students assigned yet.'}
                  </p>
                </div>
              ) : (
                filteredStudents.map((student) => (
                  <div key={student.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-lg">
                              {student.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{student.name}</h3>
                            <p className="text-gray-600">{student.email}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Contact</p>
                            <p className="font-medium">{student.phone}</p>
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

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            Joined: {student.joinedDate}
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                              <Phone className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                              <Video className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                              <Mail className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselorStudents;

