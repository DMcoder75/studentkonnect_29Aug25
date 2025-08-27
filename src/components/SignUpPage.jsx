import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, MapPin, GraduationCap, Eye, EyeOff, ChevronDown } from 'lucide-react';
import Sidebar from './SidebarNew';
import { authService } from '../services/authService';

// Country codes data
const countryCodes = [
  { code: '+1', country: 'US', name: 'United States', flag: '🇺🇸' },
  { code: '+1', country: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: '+44', country: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+61', country: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: '+91', country: 'IN', name: 'India', flag: '🇮🇳' },
  { code: '+86', country: 'CN', name: 'China', flag: '🇨🇳' },
  { code: '+81', country: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: '+82', country: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: '+65', country: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: '+60', country: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: '+66', country: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: '+63', country: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: '+84', country: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: '+62', country: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: '+49', country: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'FR', name: 'France', flag: '🇫🇷' },
  { code: '+39', country: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: '+31', country: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: '+41', country: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: '+46', country: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: '+47', country: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: '+45', country: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: '+358', country: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: '+7', country: 'RU', name: 'Russia', flag: '🇷🇺' },
  { code: '+55', country: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: '+52', country: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: '+54', country: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: '+56', country: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: '+57', country: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: '+27', country: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: '+20', country: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: '+234', country: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: '+254', country: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: '+971', country: 'AE', name: 'UAE', flag: '🇦🇪' },
  { code: '+966', country: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+974', country: 'QA', name: 'Qatar', flag: '🇶🇦' },
  { code: '+965', country: 'KW', name: 'Kuwait', flag: '🇰🇼' },
  { code: '+973', country: 'BH', name: 'Bahrain', flag: '🇧🇭' },
  { code: '+968', country: 'OM', name: 'Oman', flag: '🇴🇲' }
];

const SignUpPage = ({ isMobileMenuOpen, onMobileMenuClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    countryCode: '+1',
    phoneNumber: '',
    currentLocation: '',
    role: 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [userCountry, setUserCountry] = useState('US');

  // Auto-detect user's country based on IP
  useEffect(() => {
    const detectUserLocation = async () => {
      try {
        // Try to get user's location from IP
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.country_code) {
          const detectedCountry = data.country_code.toUpperCase();
          setUserCountry(detectedCountry);
          
          // Find matching country code
          const matchingCountryCode = countryCodes.find(cc => cc.country === detectedCountry);
          if (matchingCountryCode) {
            setFormData(prev => ({
              ...prev,
              countryCode: matchingCountryCode.code,
              currentLocation: data.city && data.country_name ? `${data.city}, ${data.country_name}` : prev.currentLocation
            }));
          }
        }
      } catch (error) {
        console.log('Could not detect location, using default');
        // Fallback to default US
      }
    };

    detectUserLocation();
  }, []);

  // Location autocomplete
  const handleLocationChange = async (value) => {
    setFormData(prev => ({ ...prev, currentLocation: value }));
    
    if (value.length > 2) {
      try {
        // Using multiple APIs for better coverage
        let suggestions = [];
        
        // Try Teleport API first
        try {
          const teleportResponse = await fetch(`https://api.teleport.org/api/cities/?search=${encodeURIComponent(value)}&limit=5`);
          const teleportData = await teleportResponse.json();
          
          if (teleportData._embedded && teleportData._embedded['city:search-results']) {
            suggestions = teleportData._embedded['city:search-results'].map(city => {
              return city.matching_full_name;
            }).slice(0, 5);
          }
        } catch (teleportError) {
          console.log('Teleport API error:', teleportError);
        }
        
        // If no results from Teleport, use fallback suggestions
        if (suggestions.length === 0) {
          const fallbackSuggestions = [
            'Mumbai, India',
            'Delhi, India', 
            'Bangalore, India',
            'Chennai, India',
            'Hyderabad, India',
            'Pune, India',
            'Kolkata, India',
            'Ahmedabad, India',
            'London, United Kingdom',
            'Manchester, United Kingdom',
            'Birmingham, United Kingdom',
            'New York, United States',
            'Los Angeles, United States',
            'Chicago, United States',
            'Houston, United States',
            'Sydney, Australia',
            'Melbourne, Australia',
            'Brisbane, Australia',
            'Perth, Australia',
            'Toronto, Canada',
            'Vancouver, Canada',
            'Montreal, Canada',
            'Singapore, Singapore',
            'Dubai, UAE',
            'Abu Dhabi, UAE',
            'Tokyo, Japan',
            'Osaka, Japan',
            'Seoul, South Korea',
            'Bangkok, Thailand',
            'Kuala Lumpur, Malaysia',
            'Jakarta, Indonesia',
            'Manila, Philippines',
            'Ho Chi Minh City, Vietnam',
            'Berlin, Germany',
            'Munich, Germany',
            'Paris, France',
            'Lyon, France',
            'Rome, Italy',
            'Milan, Italy',
            'Madrid, Spain',
            'Barcelona, Spain',
            'Amsterdam, Netherlands',
            'Stockholm, Sweden',
            'Oslo, Norway',
            'Copenhagen, Denmark',
            'Zurich, Switzerland',
            'Vienna, Austria',
            'Brussels, Belgium',
            'Dublin, Ireland',
            'Edinburgh, United Kingdom',
            'Glasgow, United Kingdom'
          ].filter(location => 
            location.toLowerCase().includes(value.toLowerCase())
          ).slice(0, 5);
          
          suggestions = fallbackSuggestions;
        }
        
        setLocationSuggestions(suggestions);
        setShowLocationSuggestions(suggestions.length > 0);
        
      } catch (error) {
        console.log('Location API error:', error);
        // Even if API fails, show some basic suggestions
        const basicSuggestions = [
          'Mumbai, India',
          'Delhi, India',
          'London, United Kingdom',
          'New York, United States',
          'Sydney, Australia'
        ].filter(location => 
          location.toLowerCase().includes(value.toLowerCase())
        );
        
        setLocationSuggestions(basicSuggestions);
        setShowLocationSuggestions(basicSuggestions.length > 0);
      }
    } else {
      setShowLocationSuggestions(false);
      setLocationSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'currentLocation') {
      handleLocationChange(value);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const selectCountryCode = (countryCode) => {
    setFormData(prev => ({ ...prev, countryCode: countryCode.code }));
    setShowCountryDropdown(false);
  };

  const selectLocation = (location) => {
    setFormData(prev => ({ ...prev, currentLocation: location }));
    setShowLocationSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🚀 HANDLESUBMIT CALLED - Starting signup process...');
    console.log('📋 Form data:', formData);
    
    setError('');
    setSuccess('');

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('All required fields must be filled');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      // Import auth service
      const { authService } = await import('../services/authService');
      
      // Create account data
      const accountData = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.countryCode + formData.phoneNumber,
        currentLocation: formData.currentLocation,
        role: formData.role
      };

      console.log('Creating account with data:', accountData);

      console.log('📤 Submitting user data:', accountData);

      // Create user account
      const result = await authService.createUser(accountData);
      
      console.log('📥 Signup result:', result);
      
      if (result.error) {
        console.error('❌ Signup failed:', result.error);
        setError(result.error);
        setSuccess(''); // Clear any previous success message
        return;
      }

      if (result.success) {
        console.log('✅ Signup successful:', result.message);
        setError(''); // Clear any previous error message
        
        // Personalized success message based on user's name and role
        const userName = `${formData.firstName} ${formData.lastName}`;
        const userRole = formData.role === 'student' ? 'Student' : 'Counselor';
        
        setSuccess(`🎉 Welcome to StudentKonnect, ${userName}!

Your ${userRole.toLowerCase()} account has been created successfully.

📧 **IMPORTANT: Email Verification Required**
We've sent a verification email to: **${formData.email}**

✅ **Next Steps:**
1. Check your email inbox (and spam folder)
2. Click the verification link in the email
3. Return here and sign in to access your dashboard

🚀 Once verified, you'll have access to:
${formData.role === 'student' 
  ? '• Connect with expert counselors\n• Explore 850+ universities\n• Apply for scholarships\n• Join student forums' 
  : '• Manage your counseling profile\n• Connect with students\n• Schedule counseling sessions\n• Access counselor tools'
}

⏰ Redirecting to sign-in page in 8 seconds...`);
        
        // Clear form data
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          countryCode: '+1',
          phoneNumber: '',
          currentLocation: '',
          role: 'student'
        });

        // Redirect to signin after 8 seconds to give user time to read message
        setTimeout(() => {
          navigate('/signin', { 
            state: { 
              message: `Welcome ${userName}! Please check your email (${accountData.email}) for verification, then sign in.`,
              email: accountData.email,
              userName: userName
            }
          });
        }, 8000);
      } else {
        console.error('❌ Signup failed: Unknown error');
        setError(`❌ **Account Creation Failed**

We encountered an unexpected error while creating your account. This could be due to:

• Server connectivity issues
• Database temporarily unavailable
• Invalid account information

🔄 **Please try again in a few moments.**

If the problem persists, please contact our support team at support@studentkonnect.com`);
        setSuccess('');
      }
      
    } catch (error) {
      console.error('Signup error:', error);
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Join StudentKonnect
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8">
              Start your journey to finding the perfect university and connect with expert counselors
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-5 h-5" />
                <span>850+ Universities</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Expert Counselors</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Global Destinations</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex">
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen} 
          onMobileMenuClose={onMobileMenuClose} 
        />
        
        <main className="flex-1">
          <div className="px-6 py-8">
            <div className="max-w-2xl mx-auto">
              
              {/* Sign Up Form */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
                  <p className="text-gray-600">Join thousands of students finding their perfect university</p>
                </div>

                {error && (
                  <div className="border border-gray-300 rounded-lg p-6 mb-6">
                    <div className="text-gray-700">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Account Creation Failed</h3>
                      <div className="text-lg leading-relaxed whitespace-pre-line">
                        {error}
                      </div>
                    </div>
                  </div>
                )}

                {success && (
                  <div className="border border-gray-300 rounded-lg p-6 mb-6">
                    <div className="text-gray-700">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Account Created Successfully</h3>
                      <div className="text-lg leading-relaxed whitespace-pre-line">
                        {success}
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        First Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter your first name"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Last Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  {/* Password Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Create a password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Phone Number with Country Code */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Phone Number
                    </label>
                    <div className="flex">
                      {/* Country Code Dropdown */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                          className="flex items-center space-x-2 px-3 py-3 border border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <span className="text-lg">
                            {countryCodes.find(cc => cc.code === formData.countryCode)?.flag || '🌍'}
                          </span>
                          <span className="text-sm font-medium">{formData.countryCode}</span>
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>
                        
                        {/* Country Code Dropdown Menu */}
                        {showCountryDropdown && (
                          <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                            {countryCodes.map((countryCode, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => selectCountryCode(countryCode)}
                                className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 text-left"
                              >
                                <span className="text-lg">{countryCode.flag}</span>
                                <span className="flex-1 text-sm">{countryCode.name}</span>
                                <span className="text-sm font-medium text-gray-600">{countryCode.code}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Phone Number Input */}
                      <div className="flex-1 relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-l-0 border-gray-300 rounded-r-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                  </div>
                    
                  {/* Location with Autocomplete */}
                  <div className="relative">
                    <label className="block text-gray-700 font-medium mb-2">
                      Current Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="currentLocation"
                        value={formData.currentLocation}
                        onChange={handleInputChange}
                        onFocus={() => formData.currentLocation.length > 2 && setShowLocationSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Start typing your city..."
                      />
                      
                      {/* Location Suggestions Dropdown */}
                      {showLocationSuggestions && locationSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                          {locationSuggestions.map((location, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => selectLocation(location)}
                              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                            >
                              <MapPin className="inline w-4 h-4 mr-2 text-gray-400" />
                              {location}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Role Selection */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      I am a *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="role"
                          value="student"
                          checked={formData.role === 'student'}
                          onChange={handleInputChange}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                        <span className="ml-3 text-gray-700">Student</span>
                      </label>
                      <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="role"
                          value="counselor"
                          checked={formData.role === 'counselor'}
                          onChange={handleInputChange}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                        <span className="ml-3 text-gray-700">Counselor</span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 focus:ring-4 focus:ring-purple-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>

                  {/* Sign In Link */}
                  <div className="text-center pt-4">
                    <p className="text-gray-600">
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => navigate('/signin')}
                        className="text-purple-600 hover:text-purple-700 font-semibold"
                      >
                        Sign In
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SignUpPage;

