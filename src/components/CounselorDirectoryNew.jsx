import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Star, MapPin, Clock, Users, Award, MessageCircle, Calendar, Heart, Zap, CheckCircle, Globe, BookOpen, TrendingUp, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { counselorService } from '../services/counselorService';
import Sidebar from './Sidebar';

const CounselorDirectoryNew = ({ isMobileMenuOpen, onMobileMenuClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [counselors, setCounselors] = useState([]);
  const [matchedCounselors, setMatchedCounselors] = useState([]);
  const [filteredCounselors, setFilteredCounselors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    specialization: '',
    location: '',
    rating: '',
    availability: '',
    matchScore: ''
  });
  const [loading, setLoading] = useState(true);
  const [showMatched, setShowMatched] = useState(true);
  const [selectedCounselor, setSelectedCounselor] = useState(null);

  useEffect(() => {
    loadCounselors();
  }, [user]);

  useEffect(() => {
    filterCounselors();
  }, [searchTerm, filters, counselors, matchedCounselors, showMatched]);

  const loadCounselors = async () => {
    try {
      setLoading(true);
      
      // Get all counselors
      const allCounselors = await counselorService.getAllCounselors();
      setCounselors(allCounselors);

      // If user is logged in and has profile data, find matches
      if (user && user.student_data) {
        const matches = await counselorService.findMatchingCounselors(
          user.student_data,
          { limit: 20, minScore: 0.3 }
        );
        setMatchedCounselors(matches);
      }
    } catch (error) {
      console.error('Error loading counselors:', error);
      // Fallback to mock data if service fails
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  const loadMockData = () => {
    const mockCounselors = [
      {
        id: 1,
        first_name: 'Sarah',
        last_name: 'Johnson',
        display_name: 'Dr. Sarah Johnson',
        counselor_type: 'education',
        specializations: ['University Applications', 'Scholarship Guidance', 'Career Planning'],
        bio: 'Specialized in helping international students navigate Australian university applications with a focus on STEM programs.',
        years_experience: 8,
        average_rating: 4.9,
        total_reviews: 127,
        hourly_rate: 120,
        currency: 'AUD',
        languages_spoken: ['English', 'Mandarin'],
        is_available: true,
        total_students_helped: 340,
        success_rate: 0.94,
        profile_image_url: '/api/placeholder/150/150',
        coverage: [
          { country: 'Australia', state_province: 'NSW', city: 'Sydney', is_primary_location: true }
        ],
        credentials: [
          { credential_type: 'Education', credential_name: 'PhD Education Psychology', verification_status: 'verified' }
        ],
        reviews: [],
        matchScore: 0.92,
        matchReasons: ['Specializes in Law', 'Local expertise in Canada', 'Highly rated (4.9/5.0)', '8+ years experience']
      },
      {
        id: 2,
        first_name: 'Michael',
        last_name: 'Chen',
        display_name: 'Michael Chen',
        counselor_type: 'visa',
        specializations: ['Visa Guidance', 'Cultural Adaptation', 'Academic Support'],
        bio: 'Former international student turned counselor, specializing in helping Asian students adapt to Australian education system.',
        years_experience: 6,
        average_rating: 4.8,
        total_reviews: 89,
        hourly_rate: 100,
        currency: 'AUD',
        languages_spoken: ['English', 'Cantonese', 'Mandarin'],
        is_available: false,
        total_students_helped: 256,
        success_rate: 0.91,
        profile_image_url: '/api/placeholder/150/150',
        coverage: [
          { country: 'Australia', state_province: 'VIC', city: 'Melbourne', is_primary_location: true }
        ],
        credentials: [
          { credential_type: 'Immigration', credential_name: 'Registered Migration Agent', verification_status: 'verified' }
        ],
        reviews: [],
        matchScore: 0.85,
        matchReasons: ['Experience in related fields', 'Speaks English, Mandarin', '6+ years experience']
      },
      {
        id: 3,
        first_name: 'Emma',
        last_name: 'Williams',
        display_name: 'Emma Williams',
        counselor_type: 'career',
        specializations: ['Career Counseling', 'Industry Connections', 'Professional Development'],
        bio: 'Corporate background in HR and talent acquisition, now helping students build successful career pathways.',
        years_experience: 10,
        average_rating: 4.7,
        total_reviews: 156,
        hourly_rate: 110,
        currency: 'AUD',
        languages_spoken: ['English', 'Spanish'],
        is_available: true,
        total_students_helped: 412,
        success_rate: 0.89,
        profile_image_url: '/api/placeholder/150/150',
        coverage: [
          { country: 'Australia', state_province: 'QLD', city: 'Brisbane', is_primary_location: true }
        ],
        credentials: [
          { credential_type: 'Career', credential_name: 'Certified Career Coach', verification_status: 'verified' }
        ],
        reviews: [],
        matchScore: 0.78,
        matchReasons: ['Experience in related fields', 'Highly rated (4.7/5.0)', '10+ years experience']
      }
    ];

    setCounselors(mockCounselors);
    if (user && user.student_data) {
      setMatchedCounselors(mockCounselors.map(c => ({ ...c, matchScore: Math.random() * 0.4 + 0.6 })));
    }
  };

  const filterCounselors = () => {
    const sourceData = showMatched && matchedCounselors.length > 0 ? matchedCounselors : counselors;
    let filtered = [...sourceData];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(counselor =>
        `${counselor.first_name} ${counselor.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        counselor.specializations?.some(spec => 
          spec.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        counselor.coverage?.some(cov => 
          cov.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cov.country?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply other filters
    if (filters.specialization) {
      filtered = filtered.filter(counselor =>
        counselor.specializations?.some(spec => 
          spec.toLowerCase().includes(filters.specialization.toLowerCase())
        )
      );
    }

    if (filters.location) {
      filtered = filtered.filter(counselor =>
        counselor.coverage?.some(cov =>
          cov.city?.toLowerCase().includes(filters.location.toLowerCase()) ||
          cov.country?.toLowerCase().includes(filters.location.toLowerCase())
        )
      );
    }

    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(counselor => counselor.average_rating >= minRating);
    }

    if (filters.availability) {
      filtered = filtered.filter(counselor =>
        filters.availability === 'available' ? counselor.is_available : !counselor.is_available
      );
    }

    if (filters.matchScore && showMatched) {
      const minScore = parseFloat(filters.matchScore);
      filtered = filtered.filter(counselor => counselor.matchScore >= minScore);
    }

    setFilteredCounselors(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      specialization: '',
      location: '',
      rating: '',
      availability: '',
      matchScore: ''
    });
    setSearchTerm('');
  };

  const handleConnect = async (counselor) => {
    if (!user) {
      navigate('/sign-in');
      return;
    }

    try {
      await counselorService.createCounselorAssignment(
        user.id,
        counselor.id,
        {
          type: 'consultation',
          description: 'Initial consultation request',
          priority: 3
        }
      );
      alert('Connection request sent successfully!');
    } catch (error) {
      console.error('Error connecting with counselor:', error);
      alert('Failed to send connection request. Please try again.');
    }
  };

  const getLocationString = (coverage) => {
    if (!coverage || coverage.length === 0) return 'Location not specified';
    const primary = coverage.find(c => c.is_primary_location) || coverage[0];
    return `${primary.city || ''}, ${primary.country || ''}`.replace(/^,\s*/, '');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex">
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen} 
          onMobileMenuClose={onMobileMenuClose} 
        />
        <div className="flex-1 w-full md:w-auto transition-all duration-300 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-600 mx-auto"></div>
            <p className="mt-6 text-lg text-gray-600">Finding your perfect counselor matches...</p>
            <p className="mt-2 text-sm text-gray-500">Analyzing your profile and preferences</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex">
      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        onMobileMenuClose={onMobileMenuClose} 
      />
      <div className="flex-1 w-full md:w-auto transition-all duration-300">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Back Button */}
            <div className="mb-6">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-white hover:text-orange-100 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </button>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-12 w-12 mr-4" />
                <h1 className="text-4xl font-bold">Find Your Perfect Counselor</h1>
              </div>
              <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-8">
                Connect with experienced education counselors who understand your unique journey and goals
              </p>

              {/* Match Toggle */}
              {user && matchedCounselors.length > 0 && (
                <div className="flex justify-center mb-6">
                  <div className="bg-white bg-opacity-20 rounded-lg p-1 flex">
                    <button
                      onClick={() => setShowMatched(true)}
                      className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                        showMatched 
                          ? 'bg-white text-orange-600 shadow-md' 
                          : 'text-white hover:bg-white hover:bg-opacity-10'
                      }`}
                    >
                      <Zap className="h-4 w-4 inline mr-2" />
                      Best Matches ({matchedCounselors.length})
                    </button>
                    <button
                      onClick={() => setShowMatched(false)}
                      className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                        !showMatched 
                          ? 'bg-white text-orange-600 shadow-md' 
                          : 'text-white hover:bg-white hover:bg-opacity-10'
                      }`}
                    >
                      <Users className="h-4 w-4 inline mr-2" />
                      All Counselors ({counselors.length})
                    </button>
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white bg-opacity-20 rounded-lg p-6">
                  <div className="flex items-center justify-center text-center">
                    <Users className="h-8 w-8 mr-3 text-white" />
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{ color: 'oklch(64.6% .222 41.116)' }}>{filteredCounselors.length}</div>
                      <div className="font-medium" style={{ color: 'oklch(64.6% .222 41.116)' }}>Available Counselors</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-6">
                  <div className="flex items-center justify-center text-center">
                    <Star className="h-8 w-8 mr-3 text-white" />
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{ color: 'oklch(64.6% .222 41.116)' }}>4.8</div>
                      <div className="font-medium" style={{ color: 'oklch(64.6% .222 41.116)' }}>Average Rating</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-6">
                  <div className="flex items-center justify-center text-center">
                    <TrendingUp className="h-8 w-8 mr-3 text-white" />
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{ color: 'oklch(64.6% .222 41.116)' }}>94%</div>
                      <div className="font-medium" style={{ color: 'oklch(64.6% .222 41.116)' }}>Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Enhanced Filters Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-lg border p-6 sticky top-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Filter className="h-5 w-5 mr-2 text-orange-600" />
                    Filters
                  </h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
                  >
                    Clear all
                  </button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by name, specialization, or location"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Match Score Filter (only for matched view) */}
                {showMatched && matchedCounselors.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Match Score
                    </label>
                    <select
                      value={filters.matchScore}
                      onChange={(e) => handleFilterChange('matchScore', e.target.value)}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    >
                      <option value="">All matches</option>
                      <option value="0.9">Excellent (90%+)</option>
                      <option value="0.8">Very Good (80%+)</option>
                      <option value="0.7">Good (70%+)</option>
                      <option value="0.6">Fair (60%+)</option>
                    </select>
                  </div>
                )}

                {/* Specialization Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization
                  </label>
                  <select
                    value={filters.specialization}
                    onChange={(e) => handleFilterChange('specialization', e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  >
                    <option value="">All specializations</option>
                    <option value="University Applications">University Applications</option>
                    <option value="Scholarship Guidance">Scholarship Guidance</option>
                    <option value="Career Planning">Career Planning</option>
                    <option value="Visa Guidance">Visa Guidance</option>
                    <option value="Study Skills">Study Skills</option>
                    <option value="Cultural Adaptation">Cultural Adaptation</option>
                  </select>
                </div>

                {/* Location Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  >
                    <option value="">All locations</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  >
                    <option value="">Any rating</option>
                    <option value="4.8">4.8+ stars</option>
                    <option value="4.5">4.5+ stars</option>
                    <option value="4.0">4.0+ stars</option>
                    <option value="3.5">3.5+ stars</option>
                  </select>
                </div>

                {/* Availability Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability
                  </label>
                  <select
                    value={filters.availability}
                    onChange={(e) => handleFilterChange('availability', e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  >
                    <option value="">All counselors</option>
                    <option value="available">Available now</option>
                    <option value="busy">Busy</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Enhanced Counselors Grid */}
            <div className="flex-1">
              {filteredCounselors.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg border p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Users className="h-20 w-20 mx-auto" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No counselors found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search terms</p>
                </div>
              ) : (
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-2">
                  {filteredCounselors.map((counselor) => (
                    <div key={counselor.id} className="bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 overflow-hidden group">
                      {/* Match Score Badge */}
                      {showMatched && counselor.matchScore && (
                        <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 text-center">
                          <div className="flex items-center justify-center">
                            <Zap className="h-4 w-4 mr-2" />
                            <span className="font-semibold">
                              {Math.round(counselor.matchScore * 100)}% Match
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start space-x-4 mb-4">
                          <div className="relative">
                            <img
                              src={counselor.profile_image_url || '/api/placeholder/80/80'}
                              alt={counselor.display_name || `${counselor.first_name} ${counselor.last_name}`}
                              className="w-20 h-20 rounded-full object-cover border-4 border-orange-100"
                            />
                            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
                              counselor.is_available ? 'bg-green-500' : 'bg-yellow-500'
                            }`}></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {counselor.display_name || `${counselor.first_name} ${counselor.last_name}`}
                            </h3>
                            <p className="text-sm text-gray-600 mb-3 capitalize">
                              {counselor.counselor_type} Counselor
                            </p>
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-semibold text-gray-900 ml-1">
                                  {counselor.average_rating?.toFixed(1) || 'N/A'}
                                </span>
                              </div>
                              <span className="text-sm text-gray-500">
                                ({counselor.total_reviews || 0} reviews)
                              </span>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="h-3 w-3 mr-1" />
                                {counselor.years_experience}y exp
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Match Reasons (for matched counselors) */}
                        {showMatched && counselor.matchReasons && (
                          <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                            <h4 className="text-sm font-semibold text-green-800 mb-2 flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Why this is a great match:
                            </h4>
                            <ul className="text-xs text-green-700 space-y-1">
                              {counselor.matchReasons.slice(0, 3).map((reason, index) => (
                                <li key={index} className="flex items-center">
                                  <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
                                  {reason}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Specializations */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {(counselor.specializations || []).slice(0, 3).map((spec, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200"
                              >
                                {spec}
                              </span>
                            ))}
                            {(counselor.specializations || []).length > 3 && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                +{counselor.specializations.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Bio */}
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                          {counselor.bio}
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 text-orange-500" />
                            <span className="truncate">{getLocationString(counselor.coverage)}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users className="h-4 w-4 mr-2 text-orange-500" />
                            {counselor.total_students_helped || 0} helped
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Award className="h-4 w-4 mr-2 text-orange-500" />
                            {Math.round((counselor.success_rate || 0) * 100)}% success
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Globe className="h-4 w-4 mr-2 text-orange-500" />
                            {(counselor.languages_spoken || ['English']).slice(0, 2).join(', ')}
                          </div>
                        </div>

                        {/* Credentials */}
                        {counselor.verifiedCredentials > 0 && (
                          <div className="mb-4 flex items-center text-sm text-green-600">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {counselor.verifiedCredentials} verified credential{counselor.verifiedCredentials !== 1 ? 's' : ''}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex space-x-3">
                          <button 
                            onClick={() => handleConnect(counselor)}
                            className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-3 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-200 text-sm font-semibold flex items-center justify-center group-hover:shadow-lg"
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Connect Now
                          </button>
                          <button className="px-4 py-3 border-2 border-orange-200 text-orange-700 rounded-lg hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 text-sm font-semibold flex items-center justify-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule
                          </button>
                        </div>

                        {/* Rate */}
                        <div className="mt-4 text-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-2xl font-bold text-gray-900">
                            ${counselor.hourly_rate || 0}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">
                            /{counselor.currency || 'AUD'} per hour
                          </span>
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
  );
};

export default CounselorDirectoryNew;

