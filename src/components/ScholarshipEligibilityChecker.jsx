import React, { useState } from 'react';
import { Award, CheckCircle, XCircle, AlertCircle, Search, Filter, Star, DollarSign, Calendar, MapPin, GraduationCap } from 'lucide-react';
import Sidebar from './Sidebar';

const ScholarshipEligibilityChecker = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    academicLevel: '',
    fieldOfStudy: '',
    country: '',
    nationality: '',
    gpa: '',
    testScores: {
      ielts: '',
      toefl: '',
      gre: '',
      gmat: '',
      sat: ''
    },
    financialNeed: '',
    workExperience: '',
    extracurriculars: '',
    age: ''
  });

  const [results, setResults] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  // Mock scholarship data
  const scholarships = [
    {
      id: 1,
      name: 'Australia Awards Scholarship',
      provider: 'Australian Government',
      amount: '$50,000 - $70,000',
      type: 'Full Scholarship',
      level: 'Masters',
      fields: ['All Fields'],
      countries: ['Australia'],
      requirements: {
        minGPA: 3.5,
        minIELTS: 6.5,
        maxAge: 35,
        workExperience: 2
      },
      deadline: '2024-04-30',
      description: 'Prestigious scholarship for international students to study in Australia',
      eligibilityScore: 0
    },
    {
      id: 2,
      name: 'Endeavour Leadership Program',
      provider: 'Australian Government',
      amount: '$15,000 - $25,000',
      type: 'Partial Scholarship',
      level: 'Masters',
      fields: ['Engineering', 'Science', 'Technology'],
      countries: ['Australia'],
      requirements: {
        minGPA: 3.0,
        minIELTS: 6.0,
        maxAge: 40,
        workExperience: 1
      },
      deadline: '2024-06-15',
      description: 'Leadership development program with financial support',
      eligibilityScore: 0
    },
    {
      id: 3,
      name: 'Vice-Chancellor\'s International Scholarship',
      provider: 'University of Melbourne',
      amount: '$10,000 - $30,000',
      type: 'Merit-based',
      level: 'Undergraduate',
      fields: ['All Fields'],
      countries: ['Australia'],
      requirements: {
        minGPA: 3.7,
        minIELTS: 7.0,
        maxAge: 25,
        workExperience: 0
      },
      deadline: '2024-03-31',
      description: 'Merit-based scholarship for high-achieving international students',
      eligibilityScore: 0
    },
    {
      id: 4,
      name: 'Fulbright Scholarship',
      provider: 'Fulbright Commission',
      amount: '$40,000 - $60,000',
      type: 'Full Scholarship',
      level: 'PhD',
      fields: ['Research', 'All Fields'],
      countries: ['USA'],
      requirements: {
        minGPA: 3.5,
        minTOEFL: 100,
        maxAge: 35,
        workExperience: 3
      },
      deadline: '2024-05-15',
      description: 'Prestigious international exchange program',
      eligibilityScore: 0
    },
    {
      id: 5,
      name: 'Commonwealth Scholarship',
      provider: 'Commonwealth Scholarship Commission',
      amount: '$25,000 - $45,000',
      type: 'Full Scholarship',
      level: 'Masters',
      fields: ['Development Studies', 'Public Health', 'Engineering'],
      countries: ['UK'],
      requirements: {
        minGPA: 3.3,
        minIELTS: 6.5,
        maxAge: 35,
        workExperience: 2
      },
      deadline: '2024-12-15',
      description: 'For students from Commonwealth countries',
      eligibilityScore: 0
    }
  ];

  const calculateEligibility = () => {
    setIsChecking(true);
    
    setTimeout(() => {
      const eligibleScholarships = scholarships.map(scholarship => {
        let score = 0;
        let maxScore = 0;
        let reasons = [];

        // Academic Level Match
        maxScore += 20;
        if (scholarship.level.toLowerCase() === formData.academicLevel.toLowerCase()) {
          score += 20;
          reasons.push(`✓ Academic level matches (${scholarship.level})`);
        } else {
          reasons.push(`✗ Academic level mismatch (requires ${scholarship.level})`);
        }

        // Field of Study Match
        maxScore += 15;
        if (scholarship.fields.includes('All Fields') || 
            scholarship.fields.some(field => field.toLowerCase().includes(formData.fieldOfStudy.toLowerCase()))) {
          score += 15;
          reasons.push(`✓ Field of study matches`);
        } else {
          reasons.push(`✗ Field of study doesn't match (requires: ${scholarship.fields.join(', ')})`);
        }

        // GPA Requirement
        maxScore += 20;
        const gpa = parseFloat(formData.gpa);
        if (gpa >= scholarship.requirements.minGPA) {
          score += 20;
          reasons.push(`✓ GPA requirement met (${gpa} ≥ ${scholarship.requirements.minGPA})`);
        } else {
          reasons.push(`✗ GPA too low (${gpa} < ${scholarship.requirements.minGPA})`);
        }

        // Test Scores
        maxScore += 15;
        const ielts = parseFloat(formData.testScores.ielts);
        const toefl = parseFloat(formData.testScores.toefl);
        
        if (scholarship.requirements.minIELTS && ielts >= scholarship.requirements.minIELTS) {
          score += 15;
          reasons.push(`✓ IELTS requirement met (${ielts} ≥ ${scholarship.requirements.minIELTS})`);
        } else if (scholarship.requirements.minTOEFL && toefl >= scholarship.requirements.minTOEFL) {
          score += 15;
          reasons.push(`✓ TOEFL requirement met (${toefl} ≥ ${scholarship.requirements.minTOEFL})`);
        } else {
          reasons.push(`✗ English test requirement not met`);
        }

        // Age Requirement
        maxScore += 10;
        const age = parseInt(formData.age);
        if (age <= scholarship.requirements.maxAge) {
          score += 10;
          reasons.push(`✓ Age requirement met (${age} ≤ ${scholarship.requirements.maxAge})`);
        } else {
          reasons.push(`✗ Age exceeds limit (${age} > ${scholarship.requirements.maxAge})`);
        }

        // Work Experience
        maxScore += 10;
        const experience = parseInt(formData.workExperience) || 0;
        if (experience >= scholarship.requirements.workExperience) {
          score += 10;
          reasons.push(`✓ Work experience requirement met (${experience} ≥ ${scholarship.requirements.workExperience} years)`);
        } else {
          reasons.push(`✗ Insufficient work experience (${experience} < ${scholarship.requirements.workExperience} years)`);
        }

        // Country Match
        maxScore += 10;
        if (scholarship.countries.includes(formData.country)) {
          score += 10;
          reasons.push(`✓ Country matches`);
        } else {
          reasons.push(`✗ Country doesn't match (available in: ${scholarship.countries.join(', ')})`);
        }

        const eligibilityPercentage = Math.round((score / maxScore) * 100);
        
        return {
          ...scholarship,
          eligibilityScore: eligibilityPercentage,
          reasons: reasons,
          isEligible: eligibilityPercentage >= 70
        };
      });

      // Sort by eligibility score
      eligibleScholarships.sort((a, b) => b.eligibilityScore - a.eligibilityScore);
      
      setResults(eligibleScholarships);
      setIsChecking(false);
      setHasChecked(true);
    }, 2000);
  };

  const getEligibilityColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getEligibilityIcon = (score) => {
    if (score >= 80) return CheckCircle;
    if (score >= 60) return AlertCircle;
    return XCircle;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Scholarship Eligibility Checker</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Discover scholarships you're eligible for and get personalized recommendations
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen} 
          onMobileMenuClose={() => setIsMobileMenuOpen(false)} 
        />
        
        <div className="flex-1 w-full md:w-auto transition-all duration-300">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                  <h3 className="font-semibold text-gray-900 mb-6">Your Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Academic Level</label>
                      <select
                        value={formData.academicLevel}
                        onChange={(e) => setFormData({...formData, academicLevel: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select Level</option>
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Masters">Masters</option>
                        <option value="PhD">PhD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
                      <input
                        type="text"
                        value={formData.fieldOfStudy}
                        onChange={(e) => setFormData({...formData, fieldOfStudy: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g., Computer Science"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Country</label>
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select Country</option>
                        <option value="Australia">Australia</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="Canada">Canada</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">GPA (4.0 scale)</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="4"
                        value={formData.gpa}
                        onChange={(e) => setFormData({...formData, gpa: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g., 3.5"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Your age"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Work Experience (years)</label>
                      <input
                        type="number"
                        value={formData.workExperience}
                        onChange={(e) => setFormData({...formData, workExperience: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Years of work experience"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">Test Scores</label>
                      <input
                        type="number"
                        step="0.5"
                        value={formData.testScores.ielts}
                        onChange={(e) => setFormData({
                          ...formData, 
                          testScores: {...formData.testScores, ielts: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="IELTS Score (e.g., 7.0)"
                      />
                      <input
                        type="number"
                        value={formData.testScores.toefl}
                        onChange={(e) => setFormData({
                          ...formData, 
                          testScores: {...formData.testScores, toefl: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="TOEFL Score (e.g., 100)"
                      />
                    </div>

                    <button
                      onClick={calculateEligibility}
                      disabled={isChecking}
                      className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      {isChecking ? 'Checking Eligibility...' : 'Check Eligibility'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="lg:col-span-2">
                {isChecking && (
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Analyzing Your Profile</h3>
                    <p className="text-gray-600">Matching you with suitable scholarships...</p>
                  </div>
                )}

                {hasChecked && !isChecking && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Found {results.filter(r => r.isEligible).length} Eligible Scholarships
                      </h3>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {results.filter(r => r.eligibilityScore >= 80).length}
                          </div>
                          <div className="text-sm text-green-700">High Match</div>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">
                            {results.filter(r => r.eligibilityScore >= 60 && r.eligibilityScore < 80).length}
                          </div>
                          <div className="text-sm text-yellow-700">Medium Match</div>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">
                            {results.filter(r => r.eligibilityScore < 60).length}
                          </div>
                          <div className="text-sm text-red-700">Low Match</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {results.map((scholarship) => {
                        const EligibilityIcon = getEligibilityIcon(scholarship.eligibilityScore);
                        return (
                          <div key={scholarship.id} className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                                  {scholarship.name}
                                </h4>
                                <p className="text-gray-600 mb-2">{scholarship.provider}</p>
                                <p className="text-sm text-gray-500">{scholarship.description}</p>
                              </div>
                              <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getEligibilityColor(scholarship.eligibilityScore)}`}>
                                <EligibilityIcon className="w-4 h-4 mr-1" />
                                {scholarship.eligibilityScore}% Match
                              </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div className="flex items-center text-sm text-gray-600">
                                <DollarSign className="w-4 h-4 mr-1" />
                                {scholarship.amount}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <GraduationCap className="w-4 h-4 mr-1" />
                                {scholarship.level}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="w-4 h-4 mr-1" />
                                {scholarship.countries.join(', ')}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Calendar className="w-4 h-4 mr-1" />
                                {scholarship.deadline}
                              </div>
                            </div>

                            <div className="border-t pt-4">
                              <h5 className="font-medium text-gray-900 mb-2">Eligibility Analysis:</h5>
                              <div className="space-y-1">
                                {scholarship.reasons.map((reason, index) => (
                                  <div key={index} className={`text-sm ${reason.startsWith('✓') ? 'text-green-600' : 'text-red-600'}`}>
                                    {reason}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex justify-between items-center mt-4 pt-4 border-t">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                scholarship.type === 'Full Scholarship' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {scholarship.type}
                              </span>
                              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                                Learn More
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {!hasChecked && !isChecking && (
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <Award className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Find Your Scholarships?</h3>
                    <p className="text-gray-600">Fill out the form on the left to get personalized scholarship recommendations based on your profile.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipEligibilityChecker;

