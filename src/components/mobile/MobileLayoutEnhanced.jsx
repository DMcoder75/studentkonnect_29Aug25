import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import MobileAuthHeader from './MobileAuthHeader';
import MobilePathwayFormReal from './MobilePathwayFormReal';
import MobileCounselorCardsReal from './MobileCounselorCardsReal';

const MobileLayoutEnhanced = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileUA = mobileRegex.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      const isTouchDevice = 'ontouchstart' in window;
      
      setIsMobile(isMobileUA || (isSmallScreen && isTouchDevice) || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // If not mobile, return desktop layout unchanged
  if (!isMobile) {
    return children;
  }

  // Mobile home page layout with enhanced components

  // Handle quick actions
  const handleQuickAction = (action) => {
    switch (action) {
      case 'explore-pathways':
        navigate('/pathways');
        break;
      case 'browse-universities':
        navigate('/universities');
        break;
      case 'find-counselors':
        navigate('/find-counselors');
        break;
      case 'career-insights':
        navigate('/career-insights');
        break;
      case 'smart-apply':
        navigate('/smart-apply');
        break;
      case 'scholarships':
        navigate('/scholarships-assist');
        break;
      case 'get-started':
        if (user) {
          if (user.role === 'student') {
            navigate('/student-dashboard');
          } else if (user.role === 'counselor') {
            navigate('/counselor-dashboard');
          } else {
            navigate('/signin');
          }
        } else {
          navigate('/signin');
        }
        break;
      default:
        break;
    }
  };

  // Mobile home page layout with enhanced components

  // Mobile layout with enhanced components
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Content - No separate mobile header to avoid white space */}
      <div className="">
        {/* Hero Section - Enhanced with user-specific content */}
        <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white">
          <div className="px-4 py-12 text-center">
            {user ? (
              <>
                <h1 className="text-3xl font-bold mb-4">
                  Welcome back,
                  <br />
                  <span className="text-yellow-300">
                    {user.role === 'student' ? 'Student' : user.role === 'counselor' ? 'Counselor' : 'User'}!
                  </span>
                </h1>
                <p className="text-purple-100 mb-8 text-sm leading-relaxed">
                  {user.role === 'student' 
                    ? 'Continue your journey to find the perfect university and connect with expert counselors.'
                    : user.role === 'counselor'
                    ? 'Manage your students and help them achieve their academic goals.'
                    : 'Discover your ideal university course through personalized pathways worldwide.'
                  }
                </p>
                <div className="flex flex-col space-y-3">
                  <button 
                    onClick={() => handleQuickAction('get-started')}
                    className="bg-cyan-400 text-purple-900 py-3 px-6 rounded-xl font-semibold hover:bg-cyan-300 transition-colors"
                  >
                    {user.role === 'student' ? 'Go to Dashboard →' : user.role === 'counselor' ? 'Manage Students →' : 'Get Started →'}
                  </button>
                  <button 
                    onClick={() => handleQuickAction('browse-universities')}
                    className="border-2 border-white text-white py-3 px-6 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors"
                  >
                    Browse Universities
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold mb-4">
                  Find Your Perfect
                  <br />
                  <span className="text-yellow-300">Global University</span>
                </h1>
                <p className="text-purple-100 mb-8 text-sm leading-relaxed">
                  Discover your ideal university course through personalized pathways worldwide. 
                  Connect your passions with career opportunities at top universities globally.
                </p>
                <div className="flex flex-col space-y-3">
                  <button 
                    onClick={() => handleQuickAction('explore-pathways')}
                    className="bg-cyan-400 text-purple-900 py-3 px-6 rounded-xl font-semibold hover:bg-cyan-300 transition-colors"
                  >
                    Explore Pathways →
                  </button>
                  <button 
                    onClick={() => handleQuickAction('browse-universities')}
                    className="border-2 border-white text-white py-3 px-6 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors"
                  >
                    Browse Universities
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Pathway Form - Enhanced with Database Integration */}
        <MobilePathwayFormReal />

        {/* Mobile Counselor Cards - Enhanced with Real Data and Connection Functionality */}
        <MobileCounselorCardsReal />

        {/* Global Education Stats */}
        <div className="px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              🌟 Global Education at Your Fingertips 🌟
            </h2>
            <p className="text-gray-600 text-sm">
              Discover endless possibilities across the world
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-3xl mb-2">🌍</div>
              <div className="text-2xl font-bold text-green-600">8+</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-3xl mb-2">🏛️</div>
              <div className="text-2xl font-bold text-purple-600">850+</div>
              <div className="text-sm text-gray-600">Universities</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-3xl mb-2">📚</div>
              <div className="text-2xl font-bold text-red-600">8500+</div>
              <div className="text-sm text-gray-600">Courses</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-3xl mb-2">🚀</div>
              <div className="text-2xl font-bold text-blue-600">5000+</div>
              <div className="text-sm text-gray-600">Pathways</div>
            </div>
          </div>
        </div>

        {/* Quick Access Features */}
        <div className="px-4 py-8 bg-white">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            🚀 Quick Access Features
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleQuickAction('career-insights')}
              className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200 hover:from-orange-100 hover:to-orange-200 transition-all"
            >
              <div className="text-2xl mb-2">💼</div>
              <div className="text-sm font-medium text-gray-900">Career Insights</div>
            </button>
            <button
              onClick={() => handleQuickAction('smart-apply')}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all"
            >
              <div className="text-2xl mb-2">📝</div>
              <div className="text-sm font-medium text-gray-900">Smart Apply</div>
            </button>
            <button
              onClick={() => handleQuickAction('scholarships')}
              className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200 hover:from-green-100 hover:to-green-200 transition-all"
            >
              <div className="text-2xl mb-2">💰</div>
              <div className="text-sm font-medium text-gray-900">Scholarships</div>
            </button>
            <button
              onClick={() => handleQuickAction('find-counselors')}
              className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200 hover:from-purple-100 hover:to-purple-200 transition-all"
            >
              <div className="text-2xl mb-2">👥</div>
              <div className="text-sm font-medium text-gray-900">Find Counselors</div>
            </button>
          </div>
        </div>

        {/* Start Your Journey Section */}
        <div className="px-4 py-8">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white text-center">
            <div className="text-4xl mb-4">🎯 🚀</div>
            <h2 className="text-2xl font-bold mb-3">Start Your Journey!</h2>
            <p className="text-purple-100 mb-6 text-sm leading-relaxed">
              Begin your educational adventure by connecting with expert counselors and exploring university 
              pathways. Your future starts here! ✨
            </p>
            <button 
              onClick={() => handleQuickAction('get-started')}
              className="bg-yellow-400 text-purple-900 py-3 px-8 rounded-xl font-bold hover:bg-yellow-300 transition-colors"
            >
              {user ? 'Continue Journey' : 'Get Started Now'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-8 bg-gray-100">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SK</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">StudentKonnect</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Your trusted partner in global education
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <a href="/about" className="hover:text-purple-600">About</a>
              <a href="/contact" className="hover:text-purple-600">Contact</a>
              <a href="/privacy" className="hover:text-purple-600">Privacy</a>
              <a href="/terms" className="hover:text-purple-600">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileLayoutEnhanced;

