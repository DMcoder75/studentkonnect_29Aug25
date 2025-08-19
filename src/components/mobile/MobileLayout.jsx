import React, { useState, useEffect } from 'react';
import MobileHeader from './MobileHeader';
import MobilePathwayForm from './MobilePathwayForm';
import MobileCounselorCards from './MobileCounselorCards';

const MobileLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

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

  if (!isMobile) {
    // Return desktop layout unchanged
    return children;
  }

  // Mobile layout with custom components
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <MobileHeader />
      
      {/* Mobile Content */}
      <div className="pt-16">
        {/* Hero Section - Keep original but mobile optimized */}
        <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white">
          <div className="px-4 py-12 text-center">
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
              <button className="bg-cyan-400 text-purple-900 py-3 px-6 rounded-xl font-semibold hover:bg-cyan-300 transition-colors">
                Explore Pathways →
              </button>
              <button className="border-2 border-white text-white py-3 px-6 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                Browse Universities
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Pathway Form */}
        <MobilePathwayForm />

        {/* Mobile Counselor Cards */}
        <MobileCounselorCards />

        {/* Start Your Journey Section */}
        <div className="px-4 py-8">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white text-center">
            <div className="text-4xl mb-4">🎯 🚀</div>
            <h2 className="text-2xl font-bold mb-3">Start Your Journey!</h2>
            <p className="text-purple-100 mb-6 text-sm leading-relaxed">
              Begin your educational adventure by connecting with expert counselors and exploring university 
              pathways. Your future starts here! ✨
            </p>
            <button className="bg-yellow-400 text-purple-900 py-3 px-8 rounded-xl font-bold hover:bg-yellow-300 transition-colors">
              Get Started Now
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
              <a href="#" className="hover:text-purple-600">About</a>
              <a href="#" className="hover:text-purple-600">Contact</a>
              <a href="#" className="hover:text-purple-600">Privacy</a>
              <a href="#" className="hover:text-purple-600">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileLayout;

