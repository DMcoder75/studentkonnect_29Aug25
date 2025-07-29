import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, User, Users, Search, Globe, Calendar, GraduationCap, BookOpen, MapPin } from 'lucide-react';

const OnboardingModal = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    firstName: '',
    lastName: '',
    email: '',
    degreeType: '',
    userType: '',
    coursesOfInterest: [],
    
    // Step 2: Timeline & Location
    startYear: '',
    startIntake: '',
    studyCountries: [],
    budgetRange: '',
    scholarshipInterest: false,
    
    // Step 3: Academic Background
    currentGrade: '',
    schoolBoard: '',
    
    // Step 4: Contact Information
    phoneNumber: '',
    countryCode: '+91'
  });

  const totalSteps = 4;

  const fieldsOfStudy = [
    'Engineering', 'Computer Science', 'Business & Management', 'Medicine', 
    'Law', 'Psychology', 'Education', 'Arts & Humanities', 'Sciences', 
    'Architecture', 'Design', 'Nursing', 'Social Work'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Save comprehensive profile data to localStorage
    localStorage.setItem('studentProfile', JSON.stringify(formData));
    onComplete(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-400 via-orange-300 to-pink-300 p-8 flex-col justify-between relative">
          <div className="absolute top-6 left-6">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
          </div>
          
          {/* Floating Cards */}
          <div className="absolute top-20 left-8">
            <div className="bg-white rounded-lg p-3 shadow-lg transform rotate-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium">Upcoming events</span>
              </div>
              <div className="mt-1 bg-red-500 text-white text-xs px-2 py-1 rounded">LIVE</div>
            </div>
          </div>
          
          <div className="absolute top-32 right-8">
            <div className="bg-white rounded-lg p-3 shadow-lg transform -rotate-2">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">Explore Universities</span>
              </div>
            </div>
          </div>
          
          <div className="absolute top-44 left-16">
            <div className="bg-white rounded-lg p-3 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">$</span>
                </div>
                <span className="text-sm font-medium">Education Loan</span>
              </div>
            </div>
          </div>

          {/* Main Illustration */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative">
              <div className="w-64 h-64 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <div className="w-48 h-48 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                  <User className="w-24 h-24 text-white" />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="text-center text-white">
            <h3 className="text-2xl font-bold mb-2">
              {currentStep === 1 && "Get complete assistance with Premium Counselling"}
              {currentStep === 2 && "Welcome to India's #1 study abroad community"}
              {currentStep === 3 && "Explore a pool of features to study abroad"}
              {currentStep === 4 && "Way to go, your account is all set and ready"}
            </h3>
            {currentStep === 4 && (
              <p className="text-white text-opacity-80">
                Pat your back! You are taking the first step to change your life.
              </p>
            )}
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full ${
                    step <= currentStep ? 'bg-orange-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Hi there, let's begin!
                </h2>
                <p className="text-gray-600">
                  It's a one-time set up, takes less than 2 mins, promise 😊
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Degree you're planning for (NOT the one you have)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleInputChange('degreeType', 'bachelors')}
                    className={`p-4 border-2 rounded-lg text-center transition-all ${
                      formData.degreeType === 'bachelors'
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">I want to do</div>
                    <div className="text-orange-500 font-bold">Bachelors</div>
                  </button>
                  <button
                    onClick={() => handleInputChange('degreeType', 'masters')}
                    className={`p-4 border-2 rounded-lg text-center transition-all ${
                      formData.degreeType === 'masters'
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">I want to do</div>
                    <div className="text-orange-500 font-bold">Masters/MBA</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tell us about yourself. You are the...
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleInputChange('userType', 'student')}
                    className={`p-4 border-2 rounded-lg text-center transition-all ${
                      formData.userType === 'student'
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <User className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                    <div className="font-bold text-orange-500">Student</div>
                  </button>
                  <button
                    onClick={() => handleInputChange('userType', 'parent')}
                    className={`p-4 border-2 rounded-lg text-center transition-all ${
                      formData.userType === 'parent'
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Users className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                    <div className="font-medium text-gray-600">Guardian/Parent</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Field of interest *
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <select
                    value={formData.coursesOfInterest[0] || ''}
                    onChange={(e) => handleInputChange('coursesOfInterest', [e.target.value])}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select your field of interest</option>
                    {fieldsOfStudy.map(field => (
                      <option key={field} value={field}>{field}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded" />
                <span>I've read and I agree to StudentKonnect's privacy policy.</span>
              </div>
            </div>
          )}

          {/* Step 2: Timeline & Location */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                <button onClick={prevStep} className="mr-4 text-gray-400 hover:text-gray-600">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    When & where are you going?
                  </h2>
                  <p className="text-gray-600">
                    Quick as a cat! You're faster than the average time taken
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Year you plan to start studying
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['2025', '2026', '2027'].map((year) => (
                    <button
                      key={year}
                      onClick={() => handleInputChange('startYear', year)}
                      className={`p-3 border-2 rounded-lg text-center transition-all ${
                        formData.startYear === year
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-sm text-gray-600">Beginning</div>
                      <div className="font-bold">{year}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Intake you plan to start studying
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleInputChange('startIntake', 'fall')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      formData.startIntake === 'fall'
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Calendar className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                    <div className="font-medium">Aug - Nov</div>
                    <div className="text-sm text-gray-600">Fall</div>
                  </button>
                  <button
                    onClick={() => handleInputChange('startIntake', 'spring')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      formData.startIntake === 'spring'
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Globe className="w-6 h-6 mx-auto mb-2 text-gray-500" />
                    <div className="font-medium">Jan - April</div>
                    <div className="text-sm text-gray-600">Spring</div>
                  </button>
                  <button
                    onClick={() => handleInputChange('startIntake', 'summer')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      formData.startIntake === 'summer'
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-6 h-6 mx-auto mb-2 bg-yellow-400 rounded-full"></div>
                    <div className="font-medium">May - Aug</div>
                    <div className="text-sm text-gray-600">Summer</div>
                  </button>
                  <button
                    onClick={() => handleInputChange('startIntake', 'winter')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      formData.startIntake === 'winter'
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-6 h-6 mx-auto mb-2 bg-blue-400 rounded-full"></div>
                    <div className="font-medium">Dec - Feb</div>
                    <div className="text-sm text-gray-600">Winter</div>
                  </button>
                </div>
                <button 
                  onClick={() => handleInputChange('startIntake', 'flexible')}
                  className={`w-full mt-3 p-3 border-2 rounded-lg transition-all ${
                    formData.startIntake === 'flexible'
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  Not decided yet
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Countries you aspire to study in
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['USA', 'Canada', 'UK', 'Australia', 'Germany', 'Ireland'].map((country) => (
                    <button
                      key={country}
                      onClick={() => handleArrayToggle('studyCountries', country)}
                      className={`p-3 border-2 rounded-lg text-center transition-all ${
                        formData.studyCountries.includes(country)
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <MapPin className="w-5 h-5 mx-auto mb-1" />
                      <div className="font-medium">{country}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Budget range (Annual tuition)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'under-20k', label: 'Under $20,000' },
                    { value: '20k-40k', label: '$20,000 - $40,000' },
                    { value: '40k-60k', label: '$40,000 - $60,000' },
                    { value: 'over-60k', label: 'Over $60,000' }
                  ].map((budget) => (
                    <button
                      key={budget.value}
                      onClick={() => handleInputChange('budgetRange', budget.value)}
                      className={`p-3 border-2 rounded-lg text-center transition-all ${
                        formData.budgetRange === budget.value
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-sm">{budget.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="scholarshipInterest"
                  checked={formData.scholarshipInterest}
                  onChange={(e) => handleInputChange('scholarshipInterest', e.target.checked)}
                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <label htmlFor="scholarshipInterest" className="text-sm font-medium text-gray-700">
                  I'm interested in scholarships and financial aid
                </label>
              </div>
            </div>
          )}

          {/* Step 3: Academic Background */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                <button onClick={prevStep} className="mr-4 text-gray-400 hover:text-gray-600">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Let's know you better!
                  </h2>
                  <p className="text-gray-600">
                    Way to go! Your setup is almost done here...
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Which grade are you currently in?
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {['9th', '10th', '11th', '12th'].map((grade) => (
                    <button
                      key={grade}
                      onClick={() => handleInputChange('currentGrade', grade)}
                      className={`p-3 border-2 rounded-lg text-center transition-all ${
                        formData.currentGrade === grade
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-bold">{grade}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What is your current school board?
                </label>
                <select
                  value={formData.schoolBoard}
                  onChange={(e) => handleInputChange('schoolBoard', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select board</option>
                  <option value="cbse">CBSE</option>
                  <option value="icse">ICSE</option>
                  <option value="state">State Board</option>
                  <option value="ib">IB</option>
                  <option value="cambridge">Cambridge</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 4: Contact Information */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                <button onClick={prevStep} className="mr-4 text-gray-400 hover:text-gray-600">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Finally! Let's verify & get started!
                  </h2>
                  <p className="text-gray-600">
                    To keep it real and candid, always!
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Enter your number to begin
                </label>
                <div className="flex space-x-3">
                  <select
                    value={formData.countryCode}
                    onChange={(e) => handleInputChange('countryCode', e.target.value)}
                    className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="+91">IN + (91)</option>
                    <option value="+1">US + (1)</option>
                    <option value="+44">UK + (44)</option>
                    <option value="+61">AU + (61)</option>
                  </select>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="Mobile Number"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={handleComplete}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                Request OTP
              </button>

              <div className="text-center text-sm text-gray-600">
                Can't login or sign up on StudentKonnect? 
                <span className="text-orange-500 ml-1">Let us help</span>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-end mt-8">
              <button
                onClick={nextStep}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center space-x-2"
              >
                <span>Proceed To Next</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;

