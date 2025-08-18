import React, { useState } from 'react';
import { FileText, Download, Save, Eye, Lightbulb, AlertCircle, CheckCircle } from 'lucide-react';
import Sidebar from './Sidebar';

const GTEVisaStatementBuilder = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      dateOfBirth: '',
      nationality: '',
      passportNumber: ''
    },
    educationBackground: '',
    workExperience: '',
    courseDetails: {
      courseName: '',
      institution: '',
      duration: '',
      startDate: ''
    },
    financialCapacity: '',
    familyTies: '',
    returnPlans: '',
    additionalInfo: ''
  });

  const [currentSection, setCurrentSection] = useState('personal');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const sections = [
    { id: 'personal', title: 'Personal Information', icon: FileText },
    { id: 'education', title: 'Education Background', icon: FileText },
    { id: 'course', title: 'Course Details', icon: FileText },
    { id: 'financial', title: 'Financial Capacity', icon: FileText },
    { id: 'ties', title: 'Family & Home Ties', icon: FileText },
    { id: 'return', title: 'Return Plans', icon: FileText },
    { id: 'additional', title: 'Additional Information', icon: FileText }
  ];

  const handleInputChange = (section, field, value) => {
    if (section === 'personalInfo' || section === 'courseDetails') {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const generateStatement = () => {
    return `GENUINE TEMPORARY ENTRANT (GTE) STATEMENT

Personal Information:
Name: ${formData.personalInfo.fullName}
Date of Birth: ${formData.personalInfo.dateOfBirth}
Nationality: ${formData.personalInfo.nationality}
Passport Number: ${formData.personalInfo.passportNumber}

Education Background:
${formData.educationBackground}

Work Experience:
${formData.workExperience}

Course Details:
Course: ${formData.courseDetails.courseName}
Institution: ${formData.courseDetails.institution}
Duration: ${formData.courseDetails.duration}
Start Date: ${formData.courseDetails.startDate}

Financial Capacity:
${formData.financialCapacity}

Family and Home Country Ties:
${formData.familyTies}

Return Plans:
${formData.returnPlans}

Additional Information:
${formData.additionalInfo}

I declare that the information provided in this statement is true and accurate to the best of my knowledge.`;
  };

  const downloadStatement = () => {
    const statement = generateStatement();
    const blob = new Blob([statement], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'GTE_Statement.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderPersonalSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={formData.personalInfo.fullName}
            onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your full name as per passport"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
          <input
            type="date"
            value={formData.personalInfo.dateOfBirth}
            onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
          <input
            type="text"
            value={formData.personalInfo.nationality}
            onChange={(e) => handleInputChange('personalInfo', 'nationality', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Your nationality"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Passport Number</label>
          <input
            type="text"
            value={formData.personalInfo.passportNumber}
            onChange={(e) => handleInputChange('personalInfo', 'passportNumber', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Your passport number"
          />
        </div>
      </div>
    </div>
  );

  const renderTextAreaSection = (field, title, placeholder, tips) => (
    <div className="space-y-4">
      <div className="bg-purple-50 p-4 rounded-lg">
        <div className="flex items-start space-x-2">
          <Lightbulb className="w-5 h-5 text-purple-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-purple-800 mb-2">Tips for {title}:</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              {tips.map((tip, index) => (
                <li key={index}>• {tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{title}</label>
        <textarea
          value={formData[field]}
          onChange={(e) => handleInputChange(null, field, e.target.value)}
          rows={8}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder={placeholder}
        />
      </div>
    </div>
  );

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'personal':
        return renderPersonalSection();
      case 'education':
        return renderTextAreaSection(
          'educationBackground',
          'Education Background',
          'Describe your educational qualifications, institutions attended, grades achieved...',
          [
            'List all your educational qualifications chronologically',
            'Include institution names, dates, and grades/scores',
            'Mention any academic achievements or honors',
            'Explain how your education relates to your chosen course'
          ]
        );
      case 'course':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Name</label>
                <input
                  type="text"
                  value={formData.courseDetails.courseName}
                  onChange={(e) => handleInputChange('courseDetails', 'courseName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Name of the course you're applying for"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                <input
                  type="text"
                  value={formData.courseDetails.institution}
                  onChange={(e) => handleInputChange('courseDetails', 'institution', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Name of the educational institution"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <input
                  type="text"
                  value={formData.courseDetails.duration}
                  onChange={(e) => handleInputChange('courseDetails', 'duration', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Course duration (e.g., 2 years)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={formData.courseDetails.startDate}
                  onChange={(e) => handleInputChange('courseDetails', 'startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );
      case 'financial':
        return renderTextAreaSection(
          'financialCapacity',
          'Financial Capacity',
          'Describe your financial situation, funding sources, bank statements...',
          [
            'Provide details about your financial resources',
            'Include information about bank statements and savings',
            'Mention any scholarships, loans, or sponsorships',
            'Show evidence of ability to cover tuition and living expenses'
          ]
        );
      case 'ties':
        return renderTextAreaSection(
          'familyTies',
          'Family and Home Country Ties',
          'Describe your family situation, property, employment ties in home country...',
          [
            'Describe your family members and their occupations',
            'Mention any property or assets you own',
            'Include employment or business ties',
            'Explain social and cultural connections to your home country'
          ]
        );
      case 'return':
        return renderTextAreaSection(
          'returnPlans',
          'Return Plans',
          'Explain your plans after completing your studies...',
          [
            'Describe your career plans after graduation',
            'Explain how the course will benefit your home country',
            'Mention specific job opportunities or business plans',
            'Show commitment to returning to your home country'
          ]
        );
      case 'additional':
        return renderTextAreaSection(
          'additionalInfo',
          'Additional Information',
          'Any other relevant information you would like to include...',
          [
            'Include any other relevant information',
            'Mention special circumstances if any',
            'Add details that strengthen your application',
            'Keep it concise and relevant'
          ]
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">GTE Visa Statement Builder</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Create a comprehensive Genuine Temporary Entrant statement for your Australian student visa application
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
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Navigation Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                  <h3 className="font-semibold text-gray-900 mb-4">Statement Sections</h3>
                  <nav className="space-y-2">
                    {sections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <button
                          key={section.id}
                          onClick={() => setCurrentSection(section.id)}
                          className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                            currentSection === section.id
                              ? 'bg-purple-100 text-purple-700 border border-purple-200'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className="w-4 h-4 mr-3" />
                          {section.title}
                        </button>
                      );
                    })}
                  </nav>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setIsPreviewMode(!isPreviewMode)}
                      className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {isPreviewMode ? 'Edit Mode' : 'Preview'}
                    </button>
                    
                    <button
                      onClick={downloadStatement}
                      className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mt-2"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  {isPreviewMode ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Statement Preview</h2>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setIsPreviewMode(false)}
                            className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50"
                          >
                            Edit
                          </button>
                          <button
                            onClick={downloadStatement}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                          >
                            <Download className="w-4 h-4 mr-2 inline" />
                            Download
                          </button>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                          {generateStatement()}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {sections.find(s => s.id === currentSection)?.title}
                        </h2>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <CheckCircle className="w-4 h-4" />
                          <span>Auto-saved</span>
                        </div>
                      </div>
                      
                      {renderCurrentSection()}
                      
                      <div className="flex justify-between pt-6 border-t border-gray-200">
                        <button
                          onClick={() => {
                            const currentIndex = sections.findIndex(s => s.id === currentSection);
                            if (currentIndex > 0) {
                              setCurrentSection(sections[currentIndex - 1].id);
                            }
                          }}
                          className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                          disabled={sections.findIndex(s => s.id === currentSection) === 0}
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => {
                            const currentIndex = sections.findIndex(s => s.id === currentSection);
                            if (currentIndex < sections.length - 1) {
                              setCurrentSection(sections[currentIndex + 1].id);
                            }
                          }}
                          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                          disabled={sections.findIndex(s => s.id === currentSection) === sections.length - 1}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GTEVisaStatementBuilder;

