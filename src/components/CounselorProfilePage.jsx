import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  Award, 
  MessageCircle, 
  Calendar, 
  CheckCircle, 
  Globe, 
  BookOpen, 
  TrendingUp,
  Phone,
  Video,
  Mail,
  Shield,
  Trophy,
  Heart,
  ArrowLeft,
  Send,
  X,
  ChevronRight,
  Zap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { counselorService } from '../services/counselorService';
import Sidebar from './Sidebar';

const CounselorProfilePage = ({ isMobileMenuOpen, onMobileMenuClose }) => {
  const { counselorId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [counselor, setCounselor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [connectionMessage, setConnectionMessage] = useState('');
  const [connectionType, setConnectionType] = useState('consultation');
  const [selectedReviewFilter, setSelectedReviewFilter] = useState('all');
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  useEffect(() => {
    if (counselorId) {
      loadCounselorProfile();
    }
  }, [counselorId]);

  const loadCounselorProfile = async () => {
    try {
      setLoading(true);
      const counselorData = await counselorService.getCounselorById(counselorId);
      setCounselor(counselorData);
    } catch (error) {
      console.error('Error loading counselor profile:', error);
      // Fallback to mock data
      loadMockCounselorData();
    } finally {
      setLoading(false);
    }
  };

  const loadMockCounselorData = () => {
    const mockCounselor = {
      id: counselorId,
      first_name: 'Sarah',
      last_name: 'Johnson',
      display_name: 'Dr. Sarah Johnson',
      counselor_type: 'education',
      specializations: ['University Applications', 'Scholarship Guidance', 'Career Planning', 'STEM Programs', 'International Students'],
      bio: 'Dr. Sarah Johnson is a highly experienced education counselor with over 8 years of expertise in helping international students navigate the complex world of university applications. She specializes in STEM programs and has a proven track record of securing scholarships and admissions for her students at top-tier universities across Australia, Canada, and the United States.',
      years_experience: 8,
      average_rating: 4.9,
      total_reviews: 127,
      hourly_rate: 120,
      currency: 'AUD',
      languages_spoken: ['English', 'Mandarin', 'Spanish'],
      is_available: true,
      total_students_helped: 340,
      success_rate: 0.94,
      profile_image_url: '/api/placeholder/200/200',
      coverage: [
        { country: 'Australia', state_province: 'NSW', city: 'Sydney', is_primary_location: true },
        { country: 'Canada', state_province: 'ON', city: 'Toronto', is_primary_location: false }
      ],
      credentials: [
        { 
          credential_type: 'Education', 
          credential_name: 'PhD in Education Psychology', 
          issuing_organization: 'University of Sydney',
          verification_status: 'verified',
          issue_date: '2015-06-01'
        },
        { 
          credential_type: 'Certification', 
          credential_name: 'Certified International Education Counselor', 
          issuing_organization: 'AIRC',
          verification_status: 'verified',
          issue_date: '2016-03-15'
        }
      ],
      reviews: [
        {
          overall_rating: 5,
          communication_rating: 5,
          expertise_rating: 5,
          responsiveness_rating: 4,
          value_rating: 5,
          review_title: 'Exceptional guidance throughout my application process',
          review_content: 'Dr. Johnson provided incredible support during my university application process. Her expertise in STEM programs helped me secure admission to my dream engineering program at University of Toronto with a substantial scholarship. Highly recommended!',
          would_recommend: true,
          created_at: '2024-01-15',
          student_name: 'Alex Chen'
        },
        {
          overall_rating: 5,
          communication_rating: 5,
          expertise_rating: 5,
          responsiveness_rating: 5,
          value_rating: 4,
          review_title: 'Made my dreams come true',
          review_content: 'Sarah helped me navigate the complex scholarship application process. Thanks to her guidance, I received a full scholarship to study Computer Science at University of Sydney. Her knowledge of the system is unparalleled.',
          would_recommend: true,
          created_at: '2024-02-20',
          student_name: 'Priya Sharma'
        },
        {
          overall_rating: 4,
          communication_rating: 4,
          expertise_rating: 5,
          responsiveness_rating: 4,
          value_rating: 4,
          review_title: 'Great expertise, very helpful',
          review_content: 'Dr. Johnson\'s expertise in university applications is evident. She helped me understand the requirements and prepare a strong application. The only minor issue was response time during busy periods, but overall excellent service.',
          would_recommend: true,
          created_at: '2024-03-10',
          student_name: 'Michael Brown'
        }
      ],
      availability: [
        { day_of_week: 'Monday', start_time: '09:00', end_time: '17:00', is_available: true },
        { day_of_week: 'Tuesday', start_time: '09:00', end_time: '17:00', is_available: true },
        { day_of_week: 'Wednesday', start_time: '09:00', end_time: '17:00', is_available: true },
        { day_of_week: 'Thursday', start_time: '09:00', end_time: '17:00', is_available: true },
        { day_of_week: 'Friday', start_time: '09:00', end_time: '15:00', is_available: true }
      ],
      response_time: '< 2 hours',
      consultation_types: ['Initial Consultation', 'Application Review', 'Interview Preparation', 'Scholarship Guidance'],
      achievements: [
        '340+ students successfully placed',
        '94% success rate in university admissions',
        '$2.3M+ in scholarships secured for students',
        'Featured expert on Education Today podcast'
      ]
    };
    setCounselor(mockCounselor);
  };

  const handleConnect = async () => {
    if (!user) {
      alert('Please sign in to connect with counselors');
      return;
    }

    try {
      await counselorService.createCounselorAssignment(
        user.id,
        counselor.id,
        {
          type: connectionType,
          description: connectionMessage || 'Initial consultation request',
          priority: 3
        }
      );
      setShowConnectionModal(false);
      alert('Connection request sent successfully! The counselor will contact you soon.');
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

  const getFilteredReviews = () => {
    if (!counselor?.reviews) return [];
    
    switch (selectedReviewFilter) {
      case '5':
        return counselor.reviews.filter(r => r.overall_rating === 5);
      case '4':
        return counselor.reviews.filter(r => r.overall_rating === 4);
      case 'recent':
        return counselor.reviews.slice(0, 5);
      default:
        return counselor.reviews;
    }
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
            <p className="mt-6 text-lg text-gray-600">Loading counselor profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!counselor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex">
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen} 
          onMobileMenuClose={onMobileMenuClose} 
        />
        <div className="flex-1 w-full md:w-auto transition-all duration-300 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Counselor Not Found</h2>
            <p className="text-gray-600 mb-6">The counselor you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate('/find-counselors')}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Back to Counselor Directory
            </button>
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
        {/* Header with Back Button */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Directory
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Profile Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Header */}
              <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
                <div className="bg-gradient-to-r from-orange-600 to-red-600 px-8 py-6">
                  <div className="flex items-start space-x-6">
                    <div className="relative">
                      <img
                        src={counselor.profile_image_url || '/api/placeholder/120/120'}
                        alt={counselor.display_name || `${counselor.first_name} ${counselor.last_name}`}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full border-4 border-white ${
                        counselor.is_available ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                    </div>
                    <div className="flex-1 text-white">
                      <h1 className="text-3xl font-bold mb-2">
                        {counselor.display_name || `${counselor.first_name} ${counselor.last_name}`}
                      </h1>
                      <p className="text-xl text-orange-100 mb-3 capitalize">
                        {counselor.counselor_type} Counselor
                      </p>
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-300 fill-current mr-1" />
                          <span className="text-lg font-semibold">
                            {counselor.average_rating?.toFixed(1) || 'N/A'}
                          </span>
                          <span className="text-orange-100 ml-2">
                            ({counselor.total_reviews || 0} reviews)
                          </span>
                        </div>
                        <div className="flex items-center text-orange-100">
                          <Clock className="h-4 w-4 mr-1" />
                          {counselor.years_experience} years experience
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{counselor.total_students_helped || 0}</div>
                      <div className="text-sm text-gray-600">Students Helped</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{Math.round((counselor.success_rate || 0) * 100)}%</div>
                      <div className="text-sm text-gray-600">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">${counselor.hourly_rate || 0}</div>
                      <div className="text-sm text-gray-600">Per Hour ({counselor.currency || 'AUD'})</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{counselor.response_time || '< 24h'}</div>
                      <div className="text-sm text-gray-600">Response Time</div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">About</h3>
                    <p className="text-gray-700 leading-relaxed">{counselor.bio}</p>
                  </div>

                  {/* Specializations */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Specializations</h3>
                    <div className="flex flex-wrap gap-3">
                      {(counselor.specializations || []).map((spec, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-orange-100 text-orange-800 border border-orange-200"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  {counselor.achievements && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Achievements</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {counselor.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
                            <Trophy className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                            <span className="text-sm text-green-800">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Languages & Coverage */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {(counselor.languages_spoken || ['English']).map((lang, index) => (
                          <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200">
                            <Globe className="h-3 w-3 mr-1" />
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Coverage Areas</h3>
                      <div className="space-y-2">
                        {(counselor.coverage || []).map((area, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 text-orange-500 mr-2" />
                            {area.city}, {area.country}
                            {area.is_primary_location && (
                              <span className="ml-2 px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">Primary</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Credentials */}
              {counselor.credentials && counselor.credentials.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg border p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Credentials & Certifications</h3>
                  <div className="space-y-4">
                    {counselor.credentials.map((credential, index) => (
                      <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg border">
                        <div className="flex-shrink-0">
                          {credential.verification_status === 'verified' ? (
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          ) : (
                            <Shield className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                        <div className="ml-4 flex-1">
                          <h4 className="font-semibold text-gray-900">{credential.credential_name}</h4>
                          <p className="text-sm text-gray-600">{credential.issuing_organization}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {credential.credential_type} • Issued {new Date(credential.issue_date).getFullYear()}
                          </p>
                        </div>
                        {credential.verification_status === 'verified' && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Verified
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews Section */}
              <div className="bg-white rounded-xl shadow-lg border p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Student Reviews</h3>
                  <select
                    value={selectedReviewFilter}
                    onChange={(e) => setSelectedReviewFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="all">All Reviews</option>
                    <option value="5">5 Stars Only</option>
                    <option value="4">4 Stars Only</option>
                    <option value="recent">Most Recent</option>
                  </select>
                </div>

                <div className="space-y-6">
                  {getFilteredReviews().map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.overall_rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">{review.student_name}</span>
                          </div>
                          <h4 className="font-semibold text-gray-900">{review.review_title}</h4>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{review.review_content}</p>
                      {review.would_recommend && (
                        <div className="flex items-center text-sm text-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Would recommend
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Action Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-6">
                {/* Connection Card */}
                <div className="bg-white rounded-xl shadow-lg border p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      ${counselor.hourly_rate || 0}
                    </div>
                    <div className="text-sm text-gray-600">per hour ({counselor.currency || 'AUD'})</div>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={() => setShowConnectionModal(true)}
                      className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-200 font-semibold flex items-center justify-center"
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Connect Now
                    </button>

                    <button
                      onClick={() => setShowScheduleModal(true)}
                      className="w-full border-2 border-orange-200 text-orange-700 px-6 py-3 rounded-lg hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 font-semibold flex items-center justify-center"
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      Schedule Consultation
                    </button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Consultation Types</h4>
                    <div className="space-y-2">
                      {(counselor.consultation_types || ['Initial Consultation', 'Application Review']).map((type, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {type}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Availability Card */}
                {counselor.availability && (
                  <div className="bg-white rounded-xl shadow-lg border p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Availability</h4>
                    <div className="space-y-2">
                      {counselor.availability.map((slot, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-gray-700 capitalize">{slot.day_of_week}</span>
                          <span className={`${slot.is_available ? 'text-green-600' : 'text-gray-400'}`}>
                            {slot.is_available ? `${slot.start_time} - ${slot.end_time}` : 'Unavailable'}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center text-sm text-green-800">
                        <Zap className="h-4 w-4 mr-2" />
                        Typically responds within {counselor.response_time || '24 hours'}
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Options */}
                <div className="bg-white rounded-xl shadow-lg border p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Contact Methods</h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Video className="h-4 w-4 text-blue-500 mr-3" />
                      Video Consultation
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 text-green-500 mr-3" />
                      Phone Consultation
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 text-purple-500 mr-3" />
                      Email Support
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MessageCircle className="h-4 w-4 text-orange-500 mr-3" />
                      Live Chat
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Modal */}
        {showConnectionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Connect with {counselor.first_name}</h3>
                  <button
                    onClick={() => setShowConnectionModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Consultation Type
                    </label>
                    <select
                      value={connectionType}
                      onChange={(e) => setConnectionType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="consultation">Initial Consultation</option>
                      <option value="application_review">Application Review</option>
                      <option value="interview_prep">Interview Preparation</option>
                      <option value="scholarship_guidance">Scholarship Guidance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      value={connectionMessage}
                      onChange={(e) => setConnectionMessage(e.target.value)}
                      placeholder="Tell the counselor about your goals and what you'd like to discuss..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-800 mb-2">What happens next?</h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• Your request will be sent to {counselor.first_name}</li>
                      <li>• They typically respond within {counselor.response_time || '24 hours'}</li>
                      <li>• You'll receive a notification when they reply</li>
                      <li>• You can then schedule your consultation</li>
                    </ul>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowConnectionModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConnect}
                      className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-200 flex items-center justify-center"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CounselorProfilePage;

