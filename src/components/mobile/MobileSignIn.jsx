import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import MobileAuthHeader from './MobileAuthHeader';

const MobileSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        // Sign up
        const result = await signup(email, password, role, firstName, lastName);
        if (result.success) {
          // Navigate based on role
          if (role === 'student') {
            navigate('/student-dashboard');
          } else if (role === 'counselor') {
            navigate('/counselor-dashboard');
          } else {
            navigate('/');
          }
        } else {
          setError(result.error || 'Failed to create account');
        }
      } else {
        // Sign in
        const result = await login(email, password);
        if (result.success) {
          // Navigate based on role
          if (result.user.role === 'student') {
            navigate('/student-dashboard');
          } else if (result.user.role === 'counselor') {
            navigate('/counselor-dashboard');
          } else {
            navigate('/');
          }
        } else {
          setError(result.error || 'Invalid email or password');
        }
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (userType) => {
    if (userType === 'student') {
      setEmail('priya.dubey@email.com');
      setPassword('student123');
      setRole('student');
    } else if (userType === 'counselor') {
      setEmail('michael.kumar@email.com');
      setPassword('counselor123');
      setRole('counselor');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 md:hidden">
      <MobileAuthHeader />
      
      <div className="pt-16">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">
              {isSignUp ? 'Join StudentKonnect' : 'Welcome Back'}
            </h1>
            <p className="text-purple-100">
              {isSignUp 
                ? 'Create your account to start your educational journey'
                : 'Sign in to continue your educational journey'
              }
            </p>
          </div>
        </div>

        {/* Sign In Form */}
        <div className="p-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* Quick Login Options */}
            {!isSignUp && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Login (Demo)</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleQuickLogin('student')}
                    className="p-3 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    <div className="text-2xl mb-1">👨‍🎓</div>
                    <div className="text-sm font-medium text-gray-900">Student</div>
                  </button>
                  <button
                    onClick={() => handleQuickLogin('counselor')}
                    className="p-3 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors"
                  >
                    <div className="text-2xl mb-1">👨‍🏫</div>
                    <div className="text-sm font-medium text-gray-900">Counselor</div>
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with your account</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields (Sign Up Only) */}
              {isSignUp && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I am a
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`p-3 border-2 rounded-xl transition-colors ${
                      role === 'student'
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-2xl mb-1">👨‍🎓</div>
                    <div className="text-sm font-medium">Student</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('counselor')}
                    className={`p-3 border-2 rounded-xl transition-colors ${
                      role === 'counselor'
                        ? 'border-purple-600 bg-purple-50 text-purple-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-2xl mb-1">👨‍🏫</div>
                    <div className="text-sm font-medium">Counselor</div>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-colors ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
                  </div>
                ) : (
                  isSignUp ? 'Create Account' : 'Sign In'
                )}
              </button>
            </form>

            {/* Toggle Sign Up/Sign In */}
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setEmail('');
                  setPassword('');
                  setFirstName('');
                  setLastName('');
                }}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                {isSignUp 
                  ? 'Already have an account? Sign In' 
                  : "Don't have an account? Sign Up"
                }
              </button>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-6 bg-blue-50 rounded-xl p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
            <p className="text-blue-700 text-sm mb-3">
              Choose "Student" if you're looking for university guidance, or "Counselor" if you're an education professional.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-blue-600">👨‍🎓</span>
                <span className="text-blue-700">Students: Connect with counselors, explore universities, get guidance</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-600">👨‍🏫</span>
                <span className="text-blue-700">Counselors: Manage students, provide guidance, schedule sessions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSignIn;

