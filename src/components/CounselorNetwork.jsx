import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import { 
  Users, 
  MessageCircle, 
  Video, 
  Calendar, 
  Search, 
  Filter,
  Star,
  MapPin,
  GraduationCap,
  Award,
  Phone,
  Mail,
  Clock,
  UserPlus,
  MessageSquare,
  BookOpen,
  TrendingUp
} from 'lucide-react';

const CounselorNetwork = () => {
  const { user } = useAuth();
  const [counselors, setCounselors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const onMobileMenuClose = () => setIsMobileMenuOpen(false);

  // Sample counselor network data
  const sampleCounselors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Senior Education Counselor',
      email: 'sarah.johnson@studentkonnect.com',
      phone: '+1 (555) 123-4567',
      location: 'Toronto, Canada',
      specializations: ['Computer Science', 'Engineering', 'Technology'],
      experience: '8 years',
      rating: 4.9,
      totalStudents: 523,
      successRate: 95.5,
      availability: 'Available',
      lastActive: '2 hours ago',
      profileImage: null,
      expertise: ['University Applications', 'Visa Guidance', 'Career Counseling'],
      languages: ['English', 'French'],
      isOnline: true
    },
    {
      id: 2,
      name: 'Dr. James Wilson',
      title: 'Medicine & Health Sciences Expert',
      email: 'james.wilson@studentkonnect.com',
      phone: '+1 (555) 234-5678',
      location: 'Montreal, Canada',
      specializations: ['Medicine', 'Health Sciences', 'Nursing'],
      experience: '12 years',
      rating: 4.8,
      totalStudents: 445,
      successRate: 94.2,
      availability: 'Busy',
      lastActive: '1 hour ago',
      profileImage: null,
      expertise: ['Medical School Applications', 'MCAT Preparation', 'Research Opportunities'],
      languages: ['English', 'Spanish'],
      isOnline: true
    },
    {
      id: 3,
      name: 'Dr. Priya Sharma',
      title: 'Engineering & Technology Specialist',
      email: 'priya.sharma@studentkonnect.com',
      phone: '+1 (555) 345-6789',
      location: 'Vancouver, Canada',
      specializations: ['Engineering', 'Technology', 'Computer Science'],
      experience: '6 years',
      rating: 4.7,
      totalStudents: 312,
      successRate: 92.8,
      availability: 'Available',
      lastActive: '30 minutes ago',
      profileImage: null,
      expertise: ['Engineering Programs', 'Tech Industry Connections', 'Internship Placement'],
      languages: ['English', 'Hindi', 'Punjabi'],
      isOnline: false
    },
    {
      id: 4,
      name: 'Dr. Emma Davis',
      title: 'Law & Legal Studies Counselor',
      email: 'emma.davis@studentkonnect.com',
      phone: '+1 (555) 456-7890',
      location: 'Calgary, Canada',
      specializations: ['Law', 'Legal Studies', 'Political Science'],
      experience: '10 years',
      rating: 4.9,
      totalStudents: 387,
      successRate: 96.1,
      availability: 'Available',
      lastActive: '15 minutes ago',
      profileImage: null,
      expertise: ['Law School Applications', 'LSAT Preparation', 'Legal Career Guidance'],
      languages: ['English'],
      isOnline: true
    }
  ];

  useEffect(() => {
    // Simulate loading counselors
    setTimeout(() => {
      // Filter out current user from the network
      const filteredCounselors = sampleCounselors.filter(
        counselor => counselor.email !== user?.email
      );
      setCounselors(filteredCounselors);
    }, 1000);
  }, [user]);

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Busy': return 'bg-red-100 text-red-800';
      case 'Away': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOnlineStatus = (isOnline) => {
    return isOnline ? 'bg-green-500' : 'bg-gray-400';
  };

  const filteredCounselors = counselors.filter(counselor => {
    const matchesSearch = counselor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         counselor.specializations.some(spec => 
                           spec.toLowerCase().includes(searchTerm.toLowerCase())
                         ) ||
                         counselor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = specializationFilter === 'all' || 
                                 counselor.specializations.includes(specializationFilter);
    return matchesSearch && matchesSpecialization;
  });

  const stats = {
    totalCounselors: counselors.length,
    onlineCounselors: counselors.filter(c => c.isOnline).length,
    availableCounselors: counselors.filter(c => c.availability === 'Available').length,
    averageRating: counselors.length > 0 ? 
      (counselors.reduce((sum, c) => sum + c.rating, 0) / counselors.length).toFixed(1) : 0
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Counselor Network</h1>
            <p className="text-gray-600">Connect and collaborate with fellow education counselors</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Counselors</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCounselors}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Online Now</p>
                  <p className="text-2xl font-bold text-green-600">{stats.onlineCounselors}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.availableCounselors}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <UserPlus className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.averageRating}</p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-600" />
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
                    placeholder="Search counselors by name, specialization, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="md:w-48">
                <select
                  value={specializationFilter}
                  onChange={(e) => setSpecializationFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Specializations</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Law">Law</option>
                  <option value="Business">Business</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button className="flex items-center space-x-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span>Start Group Chat</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                <Video className="h-5 w-5" />
                <span>Schedule Meeting</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                <BookOpen className="h-5 w-5" />
                <span>Share Resources</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
                <TrendingUp className="h-5 w-5" />
                <span>View Analytics</span>
              </button>
            </div>
          </div>

          {/* Counselors List */}
          <div className="space-y-6">
            {filteredCounselors.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No counselors found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              filteredCounselors.map((counselor) => (
                <div key={counselor.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Users className="h-8 w-8 text-white" />
                          </div>
                          <div className={`absolute -bottom-1 -right-1 h-5 w-5 ${getOnlineStatus(counselor.isOnline)} rounded-full border-2 border-white`}></div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{counselor.name}</h3>
                          <p className="text-sm text-gray-600 mb-1">{counselor.title}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{counselor.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Award className="h-4 w-4" />
                              <span>{counselor.experience} experience</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span>{counselor.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(counselor.availability)}`}>
                          {counselor.availability}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-gray-600">Total Students</p>
                        <p className="text-lg font-bold text-gray-900">{counselor.totalStudents}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-gray-600">Success Rate</p>
                        <p className="text-lg font-bold text-green-600">{counselor.successRate}%</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-gray-600">Last Active</p>
                        <p className="text-lg font-bold text-blue-600">{counselor.lastActive}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-600 mb-2">Specializations</h4>
                      <div className="flex flex-wrap gap-2">
                        {counselor.specializations.map((spec, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-600 mb-2">Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {counselor.expertise.map((exp, index) => (
                          <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-4 w-4" />
                          <span>{counselor.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="h-4 w-4" />
                          <span>{counselor.phone}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <MessageSquare className="h-4 w-4 inline mr-1" />
                          Message
                        </button>
                        <button className="px-4 py-2 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Video className="h-4 w-4 inline mr-1" />
                          Video Call
                        </button>
                        <button className="px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                          <Calendar className="h-4 w-4 inline mr-1" />
                          Schedule
                        </button>
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

export default CounselorNetwork;

