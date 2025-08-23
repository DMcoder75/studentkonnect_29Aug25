import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { counselorService } from '../../services/counselorService';

const MobileCounselorCardsReal = () => {
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [connectingId, setConnectingId] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const ITEMS_PER_PAGE = 4;

  useEffect(() => {
    loadCounselors(1, false);
  }, []);

  const loadCounselors = async (pageNum = 1, append = false) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);
      
      const result = await counselorService.getAllCounselors();
      
      console.log('Mobile counselors loaded:', result);
      
      if (result && Array.isArray(result)) {
        // Transform data for mobile display - use the actual data structure
        const transformedCounselors = result.map(counselor => ({
          id: counselor.id,
          name: `${counselor.first_name || ''} ${counselor.last_name || ''}`.trim() || counselor.display_name || 'Counselor',
          email: counselor.email || '',
          title: counselor.display_name || 'Academic Counselor',
          experience: `${counselor.years_experience || 0}y exp`,
          specializations: counselor.specializations || [],
          rating: counselor.average_rating || 4.5,
          reviews: counselor.total_reviews || 0,
          description: counselor.bio || `Experienced counselor with ${counselor.years_experience || 0} years of expertise in ${(counselor.specializations || []).join(', ')}.`,
          studentsHelped: counselor.total_students_helped || 0,
          successRate: counselor.success_rate || 85,
          languages: counselor.languages_spoken || ['English'],
          avatar: getAvatarUrl(counselor.first_name || counselor.display_name),
          isAvailable: counselor.is_available || true,
          price: counselor.hourly_rate || 50,
          currency: counselor.currency || 'USD'
        }));
        
        console.log('Transformed mobile counselors:', transformedCounselors);
        
        // Implement pagination
        const startIndex = (pageNum - 1) * ITEMS_PER_PAGE;
        const endIndex = pageNum * ITEMS_PER_PAGE;
        const pageData = transformedCounselors.slice(startIndex, endIndex);
        
        if (append) {
          setCounselors(prev => [...prev, ...pageData]);
        } else {
          setCounselors(pageData);
        }
        
        // Check if there are more items
        setHasMore(endIndex < transformedCounselors.length);
        setError('');
      } else {
        console.log('Invalid counselor data format:', result);
        setError('Failed to load counselors');
      }
    } catch (err) {
      console.error('Error loading counselors:', err);
      setError('Failed to load counselors. Please try again.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Scroll event handler for infinite scroll
  const handleScroll = useCallback(() => {
    if (loadingMore || !hasMore) return;

    const container = document.querySelector('.mobile-counselor-container');
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    // Load more when user is near the end of horizontal scroll
    if (scrollLeft + clientWidth >= scrollWidth - 100) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadCounselors(nextPage, true);
    }
  }, [loadingMore, hasMore, page]);

  useEffect(() => {
    const container = document.querySelector('.mobile-counselor-container');
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const getTitle = (specialization) => {
    if (!specialization) return 'Academic Counselor';
    if (specialization.toLowerCase().includes('business') || specialization.toLowerCase().includes('finance')) {
      return 'Career Counselor';
    }
    return 'Academic Counselor';
  };

  const getAvatarUrl = (name) => {
    if (!name) return 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face';
    
    // Generate different avatar based on name
    const avatars = [
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face'
    ];
    return avatars[name.length % avatars.length];
  };

  const handleConnect = async (counselor) => {
    if (!user) {
      navigate('/signin');
      return;
    }

    if (user.role !== 'student') {
      alert('Only students can connect with counselors');
      return;
    }

    try {
      setConnectingId(counselor.id);
      
      // Create connection request
      const result = await realDatabaseService.createCounselorRequest(
        user.email,
        counselor.id,
        `I would like to connect with you for guidance in ${counselor.specialization.join(', ')}.`
      );

      if (result.success) {
        alert('Connection request sent successfully! The counselor will review your request.');
      } else {
        alert('Failed to send connection request. Please try again.');
      }
    } catch (err) {
      console.error('Error connecting with counselor:', err);
      alert('Failed to connect. Please try again.');
    } finally {
      setConnectingId(null);
    }
  };

  const handleMessage = (counselor) => {
    if (!user) {
      navigate('/signin');
      return;
    }
    
    // For now, redirect to connection - in future could be direct messaging
    handleConnect(counselor);
  };

  const handleViewAll = () => {
    navigate('/find-counselors');
  };

  if (loading) {
    return (
      <div className="md:hidden py-6">
        <div className="px-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Find Your Perfect Counselor
          </h2>
          <p className="text-gray-600 text-sm">Loading counselors...</p>
        </div>
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="md:hidden py-6">
        <div className="px-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Find Your Perfect Counselor
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">{error}</p>
            <button 
              onClick={loadCounselors}
              className="mt-2 text-red-600 hover:text-red-800 font-medium text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:hidden py-6">
      {/* Section Header */}
      <div className="px-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Find Your Perfect Counselor
        </h2>
        <p className="text-gray-600 text-sm">
          Connect with experienced education counselors who understand your unique journey and goals. 
          Get personalized guidance for your university applications and career planning.
        </p>
      </div>

      {/* Horizontal Scrolling Cards */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4 px-4 pb-4">
          {counselors.map((counselor) => (
            <div
              key={counselor.id}
              className="flex-none w-80 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={counselor.avatar}
                    alt={counselor.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-100"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                        {counselor.title}
                      </span>
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-900">{counselor.rating}</span>
                        <span className="text-xs text-gray-500">({counselor.reviews} reviews)</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{counselor.name}</h3>
                    <p className="text-sm text-gray-600">{counselor.experience}</p>
                    {counselor.isAvailable && (
                      <div className="flex items-center space-x-1 mt-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs text-green-600 font-medium">Available</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Specializations */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {(counselor.specializations || []).slice(0, 3).map((spec, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                  {(counselor.specializations || []).length > 3 && (
                    <span className="text-xs bg-gray-50 text-gray-600 px-3 py-1 rounded-full font-medium">
                      +{(counselor.specializations || []).length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="px-6 pb-4">
                <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                  {counselor.description}
                </p>

                {/* Stats */}
                <div className="flex justify-between items-center mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{counselor.studentsHelped}</div>
                    <div className="text-xs text-gray-500">helped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{counselor.successRate}%</div>
                    <div className="text-xs text-gray-500">success</div>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-4">
                  <span className="text-xs text-gray-500">Languages: </span>
                  <span className="text-xs text-gray-700 font-medium">
                    {counselor.languages.join(', ')}
                  </span>
                </div>
              </div>

              {/* Card Actions */}
              <div className="px-6 pb-6">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleMessage(counselor)}
                    className="flex-1 bg-purple-100 text-purple-700 py-3 px-4 rounded-xl font-medium text-sm hover:bg-purple-200 transition-colors"
                  >
                    Message
                  </button>
                  <button 
                    onClick={() => handleConnect(counselor)}
                    disabled={connectingId === counselor.id}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-colors ${
                      connectingId === counselor.id
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    {connectingId === counselor.id ? (
                      <div className="flex items-center justify-center space-x-1">
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Connecting...</span>
                      </div>
                    ) : (
                      'Connect Now'
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="px-4 mt-4">
        <button 
          onClick={handleViewAll}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
        >
          View All Counselors →
        </button>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default MobileCounselorCardsReal;

