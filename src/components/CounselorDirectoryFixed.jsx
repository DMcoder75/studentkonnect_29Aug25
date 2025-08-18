import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { counselorService } from '../services/counselorService';
import { useAuth } from '../contexts/AuthContext';
import { 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  Award, 
  MessageSquare, 
  Filter,
  Search,
  ArrowLeft,
  TrendingUp,
  Zap
} from 'lucide-react';

const CounselorDirectoryFixed = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const onMobileMenuClose = () => setIsMobileMenuOpen(false);
  
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');

  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        setLoading(true);
        const data = await counselorService.getAllCounselors();
        setCounselors(data || []);
      } catch (error) {
        console.error('Error fetching counselors:', error);
        setCounselors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCounselors();
  }, []);

  const filteredCounselors = counselors.filter(counselor => {
    const matchesSearch = counselor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         counselor.specializations?.some(spec => 
                           spec.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    
    const matchesSpecialization = selectedSpecialization === 'all' || 
                                 counselor.specializations?.includes(selectedSpecialization);
    
    const matchesLocation = selectedLocation === 'all' || 
                           counselor.location?.includes(selectedLocation);
    
    const matchesRating = selectedRating === 'all' || 
                         counselor.rating >= parseFloat(selectedRating);

    return matchesSearch && matchesSpecialization && matchesLocation && matchesRating;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Find Your Perfect Counselor</h1>
              <p className="text-xl text-purple-100">Loading counselors...</p>
            </div>
          </div>
        </div>
        <div className="flex">
          <Sidebar 
            isMobileMenuOpen={isMobileMenuOpen} 
            onMobileMenuClose={onMobileMenuClose} 
          />
            <div className="flex-1 w-full md:w-auto transition-all duration-300 flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto"></div>
                <p className="mt-6 text-lg text-gray-600">Finding your perfect counselor matches...</p>
              </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full-width Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Find Your Perfect Counselor</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Connect with experienced education counselors who understand your unique journey and goals
            </p>
            
            {/* Statistics */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="bg-white bg-opacity-20 rounded-lg p-6">
                <div className="flex items-center justify-center text-center">
                  <Users className="h-8 w-8 mr-3 text-white" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{counselors.length}</div>
                    <div className="font-medium text-gray-800">Available Counselors</div>
                  </div>
                </div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-6">
                <div className="flex items-center justify-center text-center">
                  <Star className="h-8 w-8 mr-3 text-white" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">4.8</div>
                    <div className="font-medium text-gray-800">Average Rating</div>
                  </div>
                </div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-6">
                <div className="flex items-center justify-center text-center">
                  <TrendingUp className="h-8 w-8 mr-3 text-white" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">94%</div>
                    <div className="font-medium text-gray-800">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar and Content Layout */}
      <div className="flex">
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen} 
          onMobileMenuClose={onMobileMenuClose} 
        />
        <div className="flex-1 w-full md:w-auto transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <div className="lg:w-80 flex-shrink-0">
                <div className="bg-white rounded-xl shadow-lg border p-6 sticky top-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                    <Filter className="h-5 w-5 text-gray-400" />
                  </div>

                  {/* Search */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search counselors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Specialization Filter */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                    <select
                      value={selectedSpecialization}
                      onChange={(e) => setSelectedSpecialization(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="all">All Specializations</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Medicine">Medicine</option>
                      <option value="Business">Business</option>
                      <option value="Engineering">Engineering</option>
                    </select>
                  </div>

                  {/* Location Filter */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="all">All Locations</option>
                      <option value="Australia">Australia</option>
                      <option value="Canada">Canada</option>
                      <option value="UK">UK</option>
                      <option value="USA">USA</option>
                    </select>
                  </div>

                  {/* Rating Filter */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                    <select
                      value={selectedRating}
                      onChange={(e) => setSelectedRating(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="all">All Ratings</option>
                      <option value="4.5">4.5+ Stars</option>
                      <option value="4.0">4.0+ Stars</option>
                      <option value="3.5">3.5+ Stars</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Counselors Grid */}
              <div className="flex-1">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Counselors</h2>
                  <p className="text-gray-600">
                    Showing {filteredCounselors.length} of {counselors.length} counselors
                  </p>
                </div>

                {filteredCounselors.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No counselors found</h3>
                    <p className="text-gray-500">Try adjusting your filters to see more results.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredCounselors.map((counselor) => (
                      <div key={counselor.id} className="bg-white rounded-xl shadow-lg border hover:shadow-xl transition-shadow duration-300">
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {counselor.name?.charAt(0) || 'C'}
                              </div>
                              <div className="ml-3">
                                <h3 className="text-lg font-semibold text-gray-900">{counselor.name}</h3>
                                <p className="text-sm text-gray-500">{counselor.title || 'Education Counselor'}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="ml-1 text-sm font-medium text-gray-900">
                                {counselor.rating || '4.8'}
                              </span>
                              <span className="ml-1 text-sm text-gray-500">
                                ({counselor.total_reviews || '0'} reviews)
                              </span>
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <MapPin className="h-4 w-4 mr-1" />
                              {counselor.location || 'Global'}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <Clock className="h-4 w-4 mr-1" />
                              {counselor.years_experience || '5'}+ years experience
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="h-4 w-4 mr-1" />
                              {counselor.students_helped || '50'}+ students helped
                            </div>
                          </div>

                          <div className="mb-4">
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {counselor.bio || 'Experienced education counselor helping students achieve their academic goals.'}
                            </p>
                          </div>

                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {(counselor.specializations || ['General Counseling']).slice(0, 2).map((spec, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                                >
                                  {spec}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            {isAdmin && (
                              <div className="text-lg font-bold text-gray-900">
                                ${counselor.hourly_rate || '150'}/AUD/hour
                              </div>
                            )}
                            <div className={`flex space-x-2 ${!isAdmin ? 'w-full justify-end' : ''}`}>
                              <button className="px-4 py-2 border border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-200">
                                <MessageSquare className="h-4 w-4 inline mr-1" />
                                Message
                              </button>
                              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
                                Connect Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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

export default CounselorDirectoryFixed;

