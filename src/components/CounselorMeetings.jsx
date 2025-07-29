import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Calendar, 
  Clock, 
  Video, 
  Phone, 
  Mail, 
  User, 
  MapPin, 
  Plus,
  Edit,
  Trash2,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Users
} from 'lucide-react';
import Sidebar from './Sidebar';

const CounselorMeetings = ({ isMobileMenuOpen, onMobileMenuClose }) => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock meetings data
  useEffect(() => {
    setTimeout(() => {
      setMeetings([
        {
          id: 1,
          title: 'University Selection Discussion',
          student: 'Priya Dubey',
          studentEmail: 'priya.dubey@email.com',
          date: new Date(2024, 6, 29, 14, 0), // July 29, 2024, 2:00 PM
          duration: 60,
          type: 'video',
          status: 'scheduled',
          description: 'Discuss university options for Law programs in Canada',
          meetingLink: 'https://meet.google.com/abc-defg-hij',
          priority: 'high'
        },
        {
          id: 2,
          title: 'Application Review',
          student: 'Rahul Sharma',
          studentEmail: 'rahul.sharma@email.com',
          date: new Date(2024, 6, 30, 10, 0), // July 30, 2024, 10:00 AM
          duration: 45,
          type: 'phone',
          status: 'scheduled',
          description: 'Review application documents for Computer Science programs',
          phone: '+1 (555) 123-4567',
          priority: 'medium'
        },
        {
          id: 3,
          title: 'Visa Guidance Session',
          student: 'Anita Patel',
          studentEmail: 'anita.patel@email.com',
          date: new Date(2024, 6, 31, 16, 30), // July 31, 2024, 4:30 PM
          duration: 90,
          type: 'video',
          status: 'scheduled',
          description: 'Complete visa application guidance and document checklist',
          meetingLink: 'https://meet.google.com/xyz-uvwx-yz',
          priority: 'high'
        },
        {
          id: 4,
          title: 'Follow-up Consultation',
          student: 'David Kim',
          studentEmail: 'david.kim@email.com',
          date: new Date(2024, 6, 28, 11, 0), // July 28, 2024, 11:00 AM (past)
          duration: 30,
          type: 'phone',
          status: 'completed',
          description: 'Follow-up on scholarship applications',
          phone: '+1 (555) 987-6543',
          priority: 'low'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'rescheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const getMeetingTypeIcon = (type) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4 text-blue-500" />;
      case 'phone': return <Phone className="w-4 h-4 text-green-500" />;
      case 'in-person': return <MapPin className="w-4 h-4 text-purple-500" />;
      default: return <Calendar className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameDay = (date1, date2) => {
    return date1.toDateString() === date2.toDateString();
  };

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || meeting.status === filterStatus;
    const matchesDate = viewMode === 'list' || isSameDay(meeting.date, selectedDate);
    return matchesSearch && matchesFilter && matchesDate;
  });

  const upcomingMeetings = meetings.filter(meeting => 
    meeting.date > new Date() && meeting.status === 'scheduled'
  ).sort((a, b) => a.date - b.date);

  if (loading) {
    return (
      <div className="flex">
        <Sidebar 
          isOpen={true}
          onClose={() => {}}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={onMobileMenuClose}
        />
        <main className="flex-1 w-full md:w-auto transition-all duration-300 min-h-screen">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading meetings...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Meetings & Schedule</h1>
            <p className="text-gray-600 mt-2">Manage your student meetings and appointments</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Today's Meetings</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {meetings.filter(m => isToday(m.date) && m.status === 'scheduled').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {meetings.filter(m => m.status === 'completed').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-orange-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Students</p>
                  <p className="text-2xl font-bold text-gray-900">15</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-lg shadow mb-6 p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('calendar')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'calendar' 
                        ? 'bg-white text-gray-900 shadow' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Calendar
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-white text-gray-900 shadow' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    List
                  </button>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search meetings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Schedule Meeting
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Meetings List/Calendar */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {viewMode === 'calendar' ? formatDate(selectedDate) : 'All Meetings'}
                  </h2>
                </div>
                
                <div className="p-6">
                  {filteredMeetings.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No meetings found</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredMeetings.map((meeting) => (
                        <div
                          key={meeting.id}
                          className={`border-l-4 ${getPriorityColor(meeting.priority)} bg-gray-50 p-4 rounded-r-lg hover:bg-gray-100 transition-colors`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {getMeetingTypeIcon(meeting.type)}
                                <h3 className="font-semibold text-gray-900">{meeting.title}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                                  {meeting.status}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                <div className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  {meeting.student}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {formatTime(meeting.date)} ({meeting.duration} min)
                                </div>
                              </div>
                              
                              <p className="text-sm text-gray-600 mb-2">{meeting.description}</p>
                              
                              {meeting.meetingLink && (
                                <a
                                  href={meeting.meetingLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                                >
                                  <Video className="h-4 w-4" />
                                  Join Meeting
                                </a>
                              )}
                              
                              {meeting.phone && (
                                <a
                                  href={`tel:${meeting.phone}`}
                                  className="inline-flex items-center gap-1 text-sm text-green-600 hover:text-green-800"
                                >
                                  <Phone className="h-4 w-4" />
                                  {meeting.phone}
                                </a>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <button className="p-2 text-gray-400 hover:text-gray-600">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Upcoming Meetings Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Upcoming Meetings</h3>
                </div>
                <div className="p-6">
                  {upcomingMeetings.length === 0 ? (
                    <p className="text-gray-500 text-sm">No upcoming meetings</p>
                  ) : (
                    <div className="space-y-3">
                      {upcomingMeetings.slice(0, 5).map((meeting) => (
                        <div key={meeting.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          {getMeetingTypeIcon(meeting.type)}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {meeting.student}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatTime(meeting.date)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                </div>
                <div className="p-6 space-y-3">
                  <button className="w-full text-left p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <Plus className="h-5 w-5" />
                      <span className="font-medium">Schedule New Meeting</span>
                    </div>
                  </button>
                  
                  <button className="w-full text-left p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5" />
                      <span className="font-medium">View Calendar</span>
                    </div>
                  </button>
                  
                  <button className="w-full text-left p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5" />
                      <span className="font-medium">Send Reminder</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CounselorMeetings;

