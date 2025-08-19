import React, { useState } from 'react';

const MobilePathwayForm = () => {
  const [selectedProfession, setSelectedProfession] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');

  const professions = [
    'Software Engineer',
    'Doctor',
    'Business Analyst',
    'Data Scientist',
    'Lawyer',
    'Teacher',
    'Architect',
    'Pharmacist',
    'Nurse',
    'Accountant'
  ];

  const countries = [
    'Australia',
    'United States',
    'United Kingdom',
    'Canada',
    'Germany',
    'Switzerland',
    'Singapore',
    'Netherlands'
  ];

  const universities = [
    'Harvard University',
    'University of Oxford',
    'MIT',
    'University of Melbourne'
  ];

  const handleGetStarted = () => {
    if (!selectedProfession) {
      alert('Please select a profession to continue');
      return;
    }
    // Handle form submission
    console.log('Form submitted:', { selectedProfession, selectedCountry, selectedUniversity });
  };

  return (
    <div className="md:hidden bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl mx-4 my-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🍎 Build Your Perfect Pathway ⚙️
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Discover your perfect university pathway by selecting your preferred profession, country, and university. 
          <span className="text-purple-600 font-medium"> Get personalized course combinations and admission requirements globally!</span> 🚀
        </p>
      </div>

      {/* Form Fields - Vertical Stack */}
      <div className="space-y-4">
        {/* Profession Field */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            🎓 Key Profession *
          </label>
          <select
            value={selectedProfession}
            onChange={(e) => setSelectedProfession(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white"
          >
            <option value="">Select a profession...</option>
            {professions.map((profession, index) => (
              <option key={index} value={profession}>{profession}</option>
            ))}
          </select>
        </div>

        {/* Country Field */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            🌍 Country (Optional)
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white"
          >
            <option value="">All countries...</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* University Field */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            🏛️ University (Optional)
          </label>
          <select
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white"
          >
            <option value="">All universities...</option>
            {universities.map((university, index) => (
              <option key={index} value={university}>{university}</option>
            ))}
          </select>
        </div>

        {/* Get Started Button */}
        <button
          onClick={handleGetStarted}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          Get Started Now →
        </button>

        {/* Helper Text */}
        {!selectedProfession && (
          <p className="text-center text-sm text-gray-500 mt-2">
            Please select a profession to continue
          </p>
        )}
      </div>
    </div>
  );
};

export default MobilePathwayForm;

