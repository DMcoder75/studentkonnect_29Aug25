import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { realDatabaseService } from '../../services/realDatabaseService';

const MobileCounselorCardsReal = () => {
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [connectingId, setConnectingId] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadCounselors();
  }, []);

  const loadCounselors = async () => {
    try {
      setLoading(true);
      const result = await realDatabaseService.getAllCounselors();
      
      if (result.success && result.data) {
        // Transform data for mobile display
        const transformedCounselors = result.data.map(counselor => ({
          id: counselor.id,
          name: `${counselor.users?.first_name || ''} ${counselor.users?.last_name || ''}`.trim() || 'Counselor',
          email: counselor.users?.email || '',
          title: getTitle(counselor.specialization),
          experience: `${counselor.experience_years || 0}y exp`,
          specialization: counselor.specialization ? counselor.specialization.split(',').map(s => s.trim()) : [],
          rating: counselor.rating || 4.5,
          reviews: Math.floor(Math.random() * 30) + 10, // Mock reviews count
          description: counselor.bio || `Experienced ${counselor.specialization} counselor with ${counselor.experience_years} years of expertise.`,
          helped: Math.floor(Math.random() * 50) + 10, // Mock helped count
          successRate: Math.floor(Math.random() * 20) + 80, // Mock success rate
          languages: ['English'], // Default languages
          avatar: getAvatarUrl(counselor.users?.first_name, counselor.users?.last_name),
          isAvailable: true
        }));
        
        setCounselors(transformedCounselors);
      } else {
        setError('Failed to load counselors');
      }
    } catch (err) {
      console.error('Error loading counselors:', err);
      setError('Failed to load counselors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getTitle = (specialization) => {
    if (!specialization) return 'Academic Counselor';
    if (specialization.toLowerCase().includes('business') || specialization.toLowerCase().includes('finance')) {
      return 'Career Counselor';
    }
    return 'Academic Counselor';
  };

  const getAvatarUrl = (firstName, lastName) => {
    const name = `${firstName || ''} ${lastName || ''}`.trim();
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
                  {counselor.specialization.slice(0, 3).map((spec, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                  {counselor.specialization.length > 3 && (
                    <span className="text-xs bg-gray-50 text-gray-600 px-3 py-1 rounded-full font-medium">
                      +{counselor.specialization.length - 3} more
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
                    <div className="text-lg font-bold text-purple-600">{counselor.helped}</div>
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

