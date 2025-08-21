import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { realDatabaseService } from '../../services/realDatabaseService';

const MobilePathwayFormReal = () => {
  const [selectedProfession, setSelectedProfession] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [pathways, setPathways] = useState([]);
  const [countries, setCountries] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Load data on component mount
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      
      // Load pathways (professions)
      const pathwaysResult = await realDatabaseService.getAllPathways();
      if (pathwaysResult.data) {
        setPathways(pathwaysResult.data);
      }

      // Load countries
      const countriesResult = await realDatabaseService.getAllCountries();
      if (countriesResult.data) {
        setCountries(countriesResult.data);
      }

      // Load popular universities
      const universitiesResult = await realDatabaseService.getAllUniversities();
      if (universitiesResult.data) {
        setUniversities(universitiesResult.data.slice(0, 50)); // Limit to first 50 for mobile
      }

    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetStarted = async () => {
    if (!selectedProfession) {
      setError('Please select a profession to continue');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Create search criteria
      const searchCriteria = {
        profession: selectedProfession,
        country: selectedCountry,
        university: selectedUniversity
      };

      // Store search criteria in localStorage for the results page
      localStorage.setItem('mobilePathwaySearch', JSON.stringify(searchCriteria));

      // Navigate to results page
      navigate('/pathway-results');

    } catch (err) {
      console.error('Error processing search:', err);
      setError('Failed to process your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'find-counselors':
        navigate('/find-counselors');
        break;
      case 'browse-universities':
        navigate('/universities');
        break;
      case 'explore-courses':
        navigate('/courses');
        break;
      case 'career-insights':
        navigate('/career-insights');
        break;
      default:
        break;
    }
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

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Form Fields - Vertical Stack */}
      <div className="space-y-4">
        {/* Profession Field */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            🎓 Key Profession *
          </label>
          <select
            value={selectedProfession}
            onChange={(e) => {
              setSelectedProfession(e.target.value);
              setError('');
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white"
            disabled={loading}
          >
            <option value="">Select a profession...</option>
            {pathways.map((pathway) => (
              <option key={pathway.id} value={pathway.name}>
                {pathway.name}
              </option>
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
            disabled={loading}
          >
            <option value="">All countries...</option>
            {countries.map((country) => (
              <option key={country.country_id} value={country.country_name}>
                {country.country_name}
              </option>
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
            disabled={loading}
          >
            <option value="">All universities...</option>
            {universities.map((university) => (
              <option key={university.id} value={university.name}>
                {university.name}
              </option>
            ))}
          </select>
        </div>

        {/* Get Started Button */}
        <button
          onClick={handleGetStarted}
          disabled={loading || !selectedProfession}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all duration-200 ${
            loading || !selectedProfession
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl transform hover:scale-105'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Loading...</span>
            </div>
          ) : (
            'Get Started Now →'
          )}
        </button>

        {/* Helper Text */}
        {!selectedProfession && !loading && (
          <p className="text-center text-sm text-gray-500 mt-2">
            Please select a profession to continue
          </p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 pt-6 border-t border-purple-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleQuickAction('find-counselors')}
            className="bg-white p-4 rounded-xl border border-purple-100 hover:bg-purple-50 transition-colors"
          >
            <div className="text-2xl mb-2">👥</div>
            <div className="text-sm font-medium text-gray-900">Find Counselors</div>
          </button>
          <button
            onClick={() => handleQuickAction('browse-universities')}
            className="bg-white p-4 rounded-xl border border-purple-100 hover:bg-purple-50 transition-colors"
          >
            <div className="text-2xl mb-2">🏛️</div>
            <div className="text-sm font-medium text-gray-900">Browse Universities</div>
          </button>
          <button
            onClick={() => handleQuickAction('explore-courses')}
            className="bg-white p-4 rounded-xl border border-purple-100 hover:bg-purple-50 transition-colors"
          >
            <div className="text-2xl mb-2">📚</div>
            <div className="text-sm font-medium text-gray-900">Explore Courses</div>
          </button>
          <button
            onClick={() => handleQuickAction('career-insights')}
            className="bg-white p-4 rounded-xl border border-purple-100 hover:bg-purple-50 transition-colors"
          >
            <div className="text-2xl mb-2">💼</div>
            <div className="text-sm font-medium text-gray-900">Career Insights</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobilePathwayFormReal;

