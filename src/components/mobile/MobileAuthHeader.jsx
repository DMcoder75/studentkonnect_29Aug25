import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const MobileAuthHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignIn = () => {
    setIsMenuOpen(false);
    navigate('/signin');
  };

  const handleAdmin = () => {
    setIsMenuOpen(false);
    navigate('/admin');
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleNavigation = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  // Get user role-specific menu items
  const getMenuItems = () => {
    const baseItems = [
      { path: '/', icon: '🏠', label: 'Home' },
      { path: '/find-counselors', icon: '👥', label: 'Find Counselors' },
      { path: '/global-education', icon: '🌍', label: 'Global Education' },
      { path: '/australia-process', icon: '🇦🇺', label: 'Australia Process' },
      { path: '/career-insights', icon: '💼', label: 'Career Insights' },
      { path: '/scholarships-assist', icon: '💰', label: 'Scholarships' },
    ];

    if (user?.role === 'student') {
      return [
        ...baseItems,
        { path: '/student-dashboard', icon: '📊', label: 'My Dashboard' },
        { path: '/student-connections', icon: '🔗', label: 'My Connections' },
        { path: '/student-sessions', icon: '📅', label: 'My Sessions' },
      ];
    }

    if (user?.role === 'counselor') {
      return [
        ...baseItems,
        { path: '/counselor-dashboard', icon: '📊', label: 'Dashboard' },
        { path: '/counselor-students', icon: '👨‍🎓', label: 'My Students' },
        { path: '/counselor-sessions', icon: '📅', label: 'Sessions' },
      ];
    }

    return baseItems;
  };

  return (
    <>
      {/* Mobile Header - Only visible on mobile */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation('/')}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SK</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">StudentKonnect</span>
          </div>
          
          {/* User Info or Hamburger Menu */}
          <div className="flex items-center space-x-3">
            {user && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-medium text-sm">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700 max-w-20 truncate">
                  {user.role === 'student' ? 'Student' : user.role === 'counselor' ? 'Counselor' : 'User'}
                </span>
              </div>
            )}
            
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleMenu}
          ></div>
          
          {/* Menu Panel */}
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 overflow-y-auto">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SK</span>
                </div>
                <span className="text-lg font-semibold text-gray-900">StudentKonnect</span>
              </div>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* User Profile Section */}
            {user && (
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 truncate max-w-40">
                      {user.email}
                    </div>
                    <div className="text-xs text-purple-600 font-medium capitalize">
                      {user.role || 'User'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Menu Items */}
            <div className="p-4 space-y-2">
              {getMenuItems().map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-50 transition-colors w-full text-left"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-gray-900 font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
              <div className="space-y-2">
                {!user ? (
                  <>
                    <button 
                      onClick={handleSignIn}
                      className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={handleAdmin}
                      className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                      Admin Portal
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => handleNavigation('/profile')}
                      className="w-full bg-purple-100 text-purple-700 py-3 px-4 rounded-lg font-medium hover:bg-purple-200 transition-colors"
                    >
                      My Profile
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full bg-red-100 text-red-700 py-3 px-4 rounded-lg font-medium hover:bg-red-200 transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileAuthHeader;

