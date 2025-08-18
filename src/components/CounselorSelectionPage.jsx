import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  Award, 
  MessageSquare, 
  Filter,
  Search,
  ChevronDown,
  Check,
  Globe,
  GraduationCap,
  TrendingUp,
  Heart,
  Calendar,
  DollarSign
} from 'lucide-react';

const CounselorSelectionPage = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const onMobileMenuClose = () => setIsMobileMenuOpen(false);
  
  const [counselors, setCounselors] = useState([]);
  const [filteredCounselors, setFilteredCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [filters, setFilters] = useState({
    specialization: 'all',
    country: 'all',
    experience: 'all',
    rating: 'all',
    availability: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  // Mock data - replace with actual API calls
  useEffect(() => {
    setTimeout(() => {
      const mockCounselors = [
        {
          id: 1,
          name: 'Sarah Johnson',
          displayName: 'Sarah J. - Australia Expert',
          email: 'sarah.johnson@studentkonnect.com',
          profileImage: '/api/placeholder/100/100',
          rating: 4.8,
          totalReviews: 156,
          yearsExperience: 8,
          specializations: ['University Admissions', 'Visa Guidance', 'Scholarship Assistance'],
          countries: ['Australia', 'New Zealand'],
          languages: ['English', 'Hindi', 'Mandarin'],
          hourlyRate: 150,
          currency: 'AUD',
          totalStudentsHelped: 523,
          successRate: 95.5,
          responseTime: '< 2 hours',
          availability: 'Available',
          isFeatured: true,
          bio: 'Experienced education counselor specializing in Australian universities and visa processes. Helped over 500 students achieve their study abroad dreams with a 95% success rate.',
          achievements: ['Top Counselor 2023', 'Visa Success Expert', '500+ Students Helped'],
          nextAvailable: '2024-07-30 14:00'
        },
        {
          id: 2,
          name: 'James Wilson',
          displayName: 'James W. - UK & Europe Guide',
          email: 'james.wilson@studentkonnect.com',
          profileImage: '/api/placeholder/100/100',
          rating: 4.6,
          totalReviews: 89,
          yearsExperience: 5,
          specializations: ['University Admissions', 'Scholarship Assistance', 'Career Guidance'],
          countries: ['United Kingdom', 'Germany', 'Netherlands'],
          languages: ['English', 'French', 'German'],
          hourlyRate: 120,
          currency: 'AUD',
          totalStudentsHelped: 287,
          successRate: 92.3,
          responseTime: '< 4 hours',
          availability: 'Available',
          isFeatured: false,
          bio: 'Dedicated counselor with expertise in UK and European education systems. Specializes in Russell Group universities and EU scholarship programs.',
          achievements: ['Russell Group Expert', 'EU Scholarship Specialist', '200+ Applications'],
          nextAvailable: '2024-07-31 10:00'
        },
        {
          id: 3,
          name: 'Priya Sharma',
          displayName: 'Priya S. - North America Expert',
          email: 'priya.sharma@studentkonnect.com',
          profileImage: '/api/placeholder/100/100',
          rating: 4.4,
          totalReviews: 47,
          yearsExperience: 3,
          specializations: ['University Admissions', 'Test Preparation', 'Scholarship Assistance'],
          countries: ['United States', 'Canada'],
          languages: ['English', 'Hindi', 'Punjabi'],
          hourlyRate: 100,
          currency: 'AUD',
          totalStudentsHelped: 145,
          successRate: 88.7,
          responseTime: '< 6 hours',
          availability: 'Busy',
          isFeatured: false,
          bio: 'Enthusiastic counselor specializing in US and Canadian universities. Expert in SAT/ACT preparation and scholarship applications for international students.',
          achievements: ['SAT/ACT Expert', 'Scholarship Winner', 'Rising Star 2024'],
          nextAvailable: '2024-08-02 16:00'
        },
        {
          id: 4,
          name: 'Michael Chen',
          displayName: 'Michael C. - Global Education Expert',
          email: 'michael.chen@studentkonnect.com',
          profileImage: '/api/placeholder/100/100',
          rating: 4.9,
          totalReviews: 203,
          yearsExperience: 10,
          specializations: ['University Admissions', 'Career Guidance', 'Visa Guidance', 'Scholarship Assistance'],
          countries: ['Singapore', 'Australia', 'United States', 'United Kingdom'],
          languages: ['English', 'Mandarin', 'Cantonese'],
          hourlyRate: 180,
          currency: 'AUD',
          totalStudentsHelped: 678,
          successRate: 96.8,
          responseTime: '< 1 hour',
          availability: 'Available',
          isFeatured: true,
          bio: 'Senior counselor with global expertise across multiple education systems. Specializes in engineering and technology programs worldwide.',
          achievements: ['Global Expert', 'Tech Program Specialist', '600+ Success Stories'],
          nextAvailable: '2024-07-29 11:00'
        },
        {
          id: 5,
          name: 'Emma Davis',
          displayName: 'Emma D. - Business Programs Expert',
          email: 'emma.davis@studentkonnect.com',
          profileImage: '/api/placeholder/100/100',
          rating: 4.7,
          totalReviews: 78,
          yearsExperience: 6,
          specializations: ['University Admissions', 'Test Preparation', 'Career Guidance'],
          countries: ['Australia', 'United Kingdom'],
          languages: ['English', 'Spanish'],
          hourlyRate: 130,
          currency: 'AUD',
          totalStudentsHelped: 234,
          successRate: 91.2,
          responseTime: '< 3 hours',
          availability: 'Available',
          isFeatured: false,
          bio: 'Specialized counselor focusing on business, finance, and MBA programs. Expert in GMAT preparation and top business school admissions.',
          achievements: ['MBA Expert', 'GMAT Specialist', 'Business School Pro'],
          nextAvailable: '2024-07-30 09:00'
        }
      ];
      
      setCounselors(mockCounselors);
      setFilteredCounselors(mockCounselors);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = counselors.filter(counselor => {
      const matchesSearch = counselor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           counselor.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           counselor.countries.some(country => country.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesSpecialization = filters.specialization === 'all' || 
                                   counselor.specializations.includes(filters.specialization);
      
      const matchesCountry = filters.country === 'all' || 
                            counselor.countries.includes(filters.country);
      
      const matchesExperience = filters.experience === 'all' || 
                               (filters.experience === '0-3' && counselor.yearsExperience <= 3) ||
                               (filters.experience === '4-7' && counselor.yearsExperience >= 4 && counselor.yearsExperience <= 7) ||
                               (filters.experience === '8+' && counselor.yearsExperience >= 8);
      
      const matchesRating = filters.rating === 'all' || 
                           (filters.rating === '4+' && counselor.rating >= 4) ||
                           (filters.rating === '4.5+' && counselor.rating >= 4.5);
      
      const matchesAvailability = filters.availability === 'all' || 
                                 counselor.availability === filters.availability;
      
      return matchesSearch && matchesSpecialization && matchesCountry && 
             matchesExperience && matchesRating && matchesAvailability;
    });

    // Sort logic
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.yearsExperience - a.yearsExperience;
        case 'price_low':
          return a.hourlyRate - b.hourlyRate;
        case 'price_high':
          return b.hourlyRate - a.hourlyRate;
        case 'students':
          return b.totalStudentsHelped - a.totalStudentsHelped;
        default:
          return b.rating - a.rating;
      }
    });

    setFilteredCounselors(filtered);
  }, [counselors, searchTerm, filters, sortBy]);

  const handleRequestCounselor = (counselor) => {
    setSelectedCounselor(counselor);
    setShowRequestModal(true);
  };

  const submitCounselorRequest = () => {
    // API call to submit counselor request
    console.log('Requesting counselor:', selectedCounselor);
    setShowRequestModal(false);
    setSelectedCounselor(null);
    // Show success message
    alert('Counselor request submitted! You will receive a confirmation email shortly.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading counselors...</p>
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
            <h1 className="text-4xl font-bold mb-4">Choose Your Education Counselor</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Connect with expert counselors who will guide you through your study abroad journey
            </p>
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
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, specialization, or country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="rating">Sort by Rating</option>
                <option value="experience">Sort by Experience</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="students">Most Students Helped</option>
              </select>
            </div>

            {/* Filter Toggle */}
            <div>
              <button className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Filter Options */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <select
              value={filters.specialization}
              onChange={(e) => setFilters({...filters, specialization: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Specializations</option>
              <option value="University Admissions">University Admissions</option>
              <option value="Visa Guidance">Visa Guidance</option>
              <option value="Scholarship Assistance">Scholarship Assistance</option>
              <option value="Test Preparation">Test Preparation</option>
              <option value="Career Guidance">Career Guidance</option>
            </select>

            <select
              value={filters.country}
              onChange={(e) => setFilters({...filters, country: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Countries</option>
              <option value="Australia">Australia</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="Germany">Germany</option>
              <option value="Singapore">Singapore</option>
            </select>

            <select
              value={filters.experience}
              onChange={(e) => setFilters({...filters, experience: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">Any Experience</option>
              <option value="0-3">0-3 years</option>
              <option value="4-7">4-7 years</option>
              <option value="8+">8+ years</option>
            </select>

            <select
              value={filters.rating}
              onChange={(e) => setFilters({...filters, rating: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">Any Rating</option>
              <option value="4+">4+ Stars</option>
              <option value="4.5+">4.5+ Stars</option>
            </select>

            <select
              value={filters.availability}
              onChange={(e) => setFilters({...filters, availability: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">Any Availability</option>
              <option value="Available">Available</option>
              <option value="Busy">Busy</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCounselors.length} of {counselors.length} counselors
          </p>
        </div>

        {/* Counselors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCounselors.map((counselor) => (
            <div key={counselor.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Featured Badge */}
              {counselor.isFeatured && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-2 text-sm font-medium">
                  ⭐ Featured Counselor
                </div>
              )}

              <div className="p-6">
                {/* Header */}
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={counselor.profileImage}
                    alt={counselor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{counselor.name}</h3>
                    <p className="text-gray-600">{counselor.displayName}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{counselor.rating}</span>
                        <span className="text-gray-500">({counselor.totalReviews})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{counselor.yearsExperience} years exp</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">${counselor.hourlyRate}</div>
                    <div className="text-sm text-gray-500">per hour</div>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                      counselor.availability === 'Available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {counselor.availability}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-600 mb-4 line-clamp-2">{counselor.bio}</p>

                {/* Specializations */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {counselor.specializations.map((spec, index) => (
                      <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Countries & Languages */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Countries</h4>
                    <div className="flex items-center space-x-1">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{counselor.countries.join(', ')}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Languages</h4>
                    <span className="text-sm text-gray-600">{counselor.languages.join(', ')}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 py-3 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{counselor.totalStudentsHelped}</div>
                    <div className="text-xs text-gray-500">Students Helped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{counselor.successRate}%</div>
                    <div className="text-xs text-gray-500">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{counselor.responseTime}</div>
                    <div className="text-xs text-gray-500">Response Time</div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Achievements</h4>
                  <div className="flex flex-wrap gap-1">
                    {counselor.achievements.map((achievement, index) => (
                      <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                        <Award className="w-3 h-3 inline mr-1" />
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Next Available */}
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Next Available:</span>
                    <span className="text-sm text-blue-700">{counselor.nextAvailable}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleRequestCounselor(counselor)}
                    className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 font-medium transition-colors"
                  >
                    Request This Counselor
                  </button>
                  <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCounselors.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No counselors found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Request Modal */}
      {showRequestModal && selectedCounselor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Request Counselor: {selectedCounselor.name}
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Why do you want to work with this counselor?
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Tell us about your goals and why this counselor is a good fit..."
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred meeting time
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                <option>Morning (9 AM - 12 PM)</option>
                <option>Afternoon (12 PM - 5 PM)</option>
                <option>Evening (5 PM - 8 PM)</option>
                <option>Flexible</option>
              </select>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowRequestModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitCounselorRequest}
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default CounselorSelectionPage;

