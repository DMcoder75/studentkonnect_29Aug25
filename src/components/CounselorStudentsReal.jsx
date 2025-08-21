import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { realDatabaseService } from '../services/realDatabaseService';
import GlobalSidebarManager from './GlobalSidebarManager';
import SessionBookingModal from './SessionBookingModal';

const CounselorStudentsReal = ({ isMobileMenuOpen = false, onMobileMenuClose = () => {} }) => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [counselorId, setCounselorId] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter students based on search term
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.fieldOfStudy.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    fetchStudents();
  }, [user]);

  const fetchStudents = async () => {
    if (!user?.email) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Get counselor by email
      const counselorResult = await realDatabaseService.getCounselorByEmail(user.email);
      if (!counselorResult.success || !counselorResult.data) {
        setError('Counselor not found');
        setLoading(false);
        return;
      }

      const fetchedCounselorId = counselorResult.data.id;
      setCounselorId(fetchedCounselorId);
      console.log('Counselor ID:', fetchedCounselorId);

      // Get approved students for this counselor
      const studentsResult = await realDatabaseService.getApprovedStudentsForCounselor(fetchedCounselorId);
      if (studentsResult.success) {
        // Transform the data to match the component's expected format
        const transformedStudents = studentsResult.data.map(request => ({
          id: request.students.id,
          name: `${request.students.users.first_name} ${request.students.users.last_name}`,
          email: request.students.users.email,
          phone: request.students.users.phone || 'Not provided',
          connectionId: request.id,
          requestReason: request.request_reason,
          approvedAt: request.approved_at,
          createdAt: request.created_at,
          // Default values for fields not in database yet
          fieldOfStudy: 'Business & Finance',
          targetCountry: 'Australia',
          currentStage: 'Initial Consultation',
          progress: 15,
          priority: 'medium',
          status: 'active',
          lastContact: new Date(request.approved_at).toLocaleDateString(),
          nextMeeting: 'To be scheduled',
          university: 'University of Melbourne',
          course: 'Master of Business Administration',
          applicationStatus: 'In Progress'
        }));
        
        setStudents(transformedStudents);
        console.log('Students loaded:', transformedStudents);
      } else {
        console.error('Error fetching students:', studentsResult.error);
        setError('Failed to load students');
      }
    } catch (err) {
      console.error('Error in fetchStudents:', err);
      setError('Failed to load students');
    } finally {
      setLoading(false);
    }
    };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-bold text-white mb-2">My Students</h1>
            <p className="text-white/80">Loading your assigned students...</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-bold text-white mb-2">My Students</h1>
            <p className="text-white/80">Manage and track your assigned students</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 text-xl mb-2">⚠️</div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Students</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchStudents}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Students</h1>
          <p className="text-white/80">Manage and track your assigned students</p>
        </div>
      </div>

      {/* Two-Column Layout: Sidebar + Content */}
      <div className="flex">
        {/* Sidebar */}
        <GlobalSidebarManager 
          isOpen={true}
          onClose={() => {}}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={onMobileMenuClose}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full md:w-auto transition-all duration-300 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Students Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Students</h2>
              <p className="text-gray-600">Manage and track your assigned students</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">👥</span>
              <span className="text-lg font-semibold text-purple-600">{students.length} students</span>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search students by name, email, or field of study..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Students List */}
          {filteredStudents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No students found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'No students match your search criteria.' : 'No students assigned yet.'}
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredStudents.map((student) => (
                <div key={student.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-semibold text-lg">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                        <p className="text-gray-600">{student.email}</p>
                        <p className="text-sm text-gray-500">{student.phone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        student.status === 'active' ? 'bg-green-100 text-green-800' :
                        student.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {student.status}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">Connected: {student.lastContact}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Field of Study</p>
                      <p className="text-gray-900">{student.fieldOfStudy}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Target Country</p>
                      <p className="text-gray-900">{student.targetCountry}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Current Stage</p>
                      <p className="text-gray-900">{student.currentStage}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Target University</p>
                      <p className="text-gray-900">{student.university}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Course</p>
                      <p className="text-gray-900">{student.course}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium text-gray-700">Application Progress</p>
                      <span className="text-sm text-gray-600">{student.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium text-blue-800 mb-1">Connection Request</p>
                    <p className="text-blue-700 text-sm">{student.requestReason}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => {
                        setSelectedStudent(student);
                        setShowBookingModal(true);
                      }}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
                      📅 Schedule Meeting
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      💬 Send Message
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                      📄 View Documents
                    </button>
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm">
                      📊 Update Progress
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
            </div>
          </div>
        </main>
      </div>

      {/* Session Booking Modal */}
      <SessionBookingModal
        isOpen={showBookingModal}
        onClose={() => {
          setShowBookingModal(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
        counselorId={counselorId}
      />
    </div>
  );
};

export default CounselorStudentsReal;

