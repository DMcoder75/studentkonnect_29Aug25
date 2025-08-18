import React, { useState } from 'react';
import { Award, CheckCircle, Clock, FileText, User, DollarSign, Calendar, AlertCircle, Star, Download, Upload, Eye } from 'lucide-react';
import Sidebar from './Sidebar';

const ScholarshipApplicationAssistance = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [applicationData, setApplicationData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      nationality: '',
      address: ''
    },
    academic: {
      currentLevel: '',
      institution: '',
      gpa: '',
      fieldOfStudy: '',
      graduationDate: ''
    },
    scholarship: {
      name: '',
      provider: '',
      amount: '',
      deadline: '',
      requirements: ''
    },
    essays: {
      personalStatement: '',
      motivationLetter: '',
      careerGoals: '',
      whyScholarship: ''
    },
    documents: {
      transcript: null,
      cv: null,
      certificates: null,
      passport: null
    }
  });

  const [completedSteps, setCompletedSteps] = useState([]);

  const steps = [
    { id: 1, title: 'Personal Information', icon: User, description: 'Basic personal details' },
    { id: 2, title: 'Academic Background', icon: FileText, description: 'Education and qualifications' },
    { id: 3, title: 'Scholarship Details', icon: Award, description: 'Target scholarship information' },
    { id: 4, title: 'Essays & Statements', icon: FileText, description: 'Personal statements and essays' },
    { id: 5, title: 'Document Upload', icon: Upload, description: 'Required documents' },
    { id: 6, title: 'Review & Submit', icon: CheckCircle, description: 'Final review and submission' }
  ];

  const scholarshipTips = {
    1: [
      'Ensure all personal information matches your official documents',
      'Use a professional email address',
      'Double-check spelling and formatting'
    ],
    2: [
      'Include all relevant academic achievements',
      'Convert GPA to the required scale if necessary',
      'Highlight academic honors and awards'
    ],
    3: [
      'Research the scholarship thoroughly',
      'Understand the selection criteria',
      'Note all specific requirements'
    ],
    4: [
      'Be authentic and personal in your writing',
      'Address the specific prompts given',
      'Show, don\'t just tell your achievements',
      'Proofread multiple times'
    ],
    5: [
      'Ensure all documents are in the required format',
      'Check file size limits',
      'Use clear, high-quality scans'
    ],
    6: [
      'Review all information for accuracy',
      'Check all requirements are met',
      'Submit before the deadline'
    ]
  };

  const handleInputChange = (section, field, value) => {
    setApplicationData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleFileUpload = (field, file) => {
    setApplicationData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file
      }
    }));
  };

  const markStepComplete = (stepId) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps(prev => [...prev, stepId]);
    }
  };

  const isStepComplete = (stepId) => {
    return completedSteps.includes(stepId);
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg">
        <h4 className="font-medium text-purple-800 mb-2">Tips for Personal Information:</h4>
        <ul className="text-sm text-purple-700 space-y-1">
          {scholarshipTips[1].map((tip, index) => (
            <li key={index}>• {tip}</li>
          ))}
        </ul>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            value={applicationData.personalInfo.fullName}
            onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your full name as per passport"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            value={applicationData.personalInfo.email}
            onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="your.email@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <input
            type="tel"
            value={applicationData.personalInfo.phone}
            onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
          <input
            type="date"
            value={applicationData.personalInfo.dateOfBirth}
            onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nationality *</label>
          <input
            type="text"
            value={applicationData.personalInfo.nationality}
            onChange={(e) => handleInputChange('personalInfo', 'nationality', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Your nationality"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
          <textarea
            value={applicationData.personalInfo.address}
            onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Your complete address"
          />
        </div>
      </div>
    </div>
  );

  const renderAcademicBackground = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg">
        <h4 className="font-medium text-purple-800 mb-2">Tips for Academic Background:</h4>
        <ul className="text-sm text-purple-700 space-y-1">
          {scholarshipTips[2].map((tip, index) => (
            <li key={index}>• {tip}</li>
          ))}
        </ul>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Academic Level *</label>
          <select
            value={applicationData.academic.currentLevel}
            onChange={(e) => handleInputChange('academic', 'currentLevel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select Level</option>
            <option value="High School">High School</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Graduate">Graduate</option>
            <option value="Postgraduate">Postgraduate</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Institution *</label>
          <input
            type="text"
            value={applicationData.academic.institution}
            onChange={(e) => handleInputChange('academic', 'institution', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Name of your current institution"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">GPA/Grade *</label>
          <input
            type="text"
            value={applicationData.academic.gpa}
            onChange={(e) => handleInputChange('academic', 'gpa', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., 3.8/4.0 or 85%"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study *</label>
          <input
            type="text"
            value={applicationData.academic.fieldOfStudy}
            onChange={(e) => handleInputChange('academic', 'fieldOfStudy', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., Computer Science"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Expected Graduation Date</label>
          <input
            type="date"
            value={applicationData.academic.graduationDate}
            onChange={(e) => handleInputChange('academic', 'graduationDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderScholarshipDetails = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg">
        <h4 className="font-medium text-purple-800 mb-2">Tips for Scholarship Details:</h4>
        <ul className="text-sm text-purple-700 space-y-1">
          {scholarshipTips[3].map((tip, index) => (
            <li key={index}>• {tip}</li>
          ))}
        </ul>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Scholarship Name *</label>
          <input
            type="text"
            value={applicationData.scholarship.name}
            onChange={(e) => handleInputChange('scholarship', 'name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Name of the scholarship"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Scholarship Provider *</label>
          <input
            type="text"
            value={applicationData.scholarship.provider}
            onChange={(e) => handleInputChange('scholarship', 'provider', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Organization providing the scholarship"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Scholarship Amount</label>
          <input
            type="text"
            value={applicationData.scholarship.amount}
            onChange={(e) => handleInputChange('scholarship', 'amount', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., $10,000 or Full Tuition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline *</label>
          <input
            type="date"
            value={applicationData.scholarship.deadline}
            onChange={(e) => handleInputChange('scholarship', 'deadline', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Specific Requirements</label>
          <textarea
            value={applicationData.scholarship.requirements}
            onChange={(e) => handleInputChange('scholarship', 'requirements', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="List any specific requirements mentioned in the scholarship description..."
          />
        </div>
      </div>
    </div>
  );

  const renderEssays = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg">
        <h4 className="font-medium text-purple-800 mb-2">Tips for Essays & Statements:</h4>
        <ul className="text-sm text-purple-700 space-y-1">
          {scholarshipTips[4].map((tip, index) => (
            <li key={index}>• {tip}</li>
          ))}
        </ul>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Personal Statement</label>
          <textarea
            value={applicationData.essays.personalStatement}
            onChange={(e) => handleInputChange('essays', 'personalStatement', e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Write about your background, experiences, and what makes you unique..."
          />
          <div className="text-sm text-gray-500 mt-1">
            {applicationData.essays.personalStatement.length} characters
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Motivation Letter</label>
          <textarea
            value={applicationData.essays.motivationLetter}
            onChange={(e) => handleInputChange('essays', 'motivationLetter', e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Explain your motivation for applying to this scholarship..."
          />
          <div className="text-sm text-gray-500 mt-1">
            {applicationData.essays.motivationLetter.length} characters
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Career Goals</label>
          <textarea
            value={applicationData.essays.careerGoals}
            onChange={(e) => handleInputChange('essays', 'careerGoals', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Describe your short-term and long-term career goals..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Why This Scholarship?</label>
          <textarea
            value={applicationData.essays.whyScholarship}
            onChange={(e) => handleInputChange('essays', 'whyScholarship', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Explain why you are applying for this specific scholarship and how it aligns with your goals..."
          />
        </div>
      </div>
    </div>
  );

  const renderDocumentUpload = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg">
        <h4 className="font-medium text-purple-800 mb-2">Tips for Document Upload:</h4>
        <ul className="text-sm text-purple-700 space-y-1">
          {scholarshipTips[5].map((tip, index) => (
            <li key={index}>• {tip}</li>
          ))}
        </ul>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { key: 'transcript', label: 'Academic Transcript', required: true },
          { key: 'cv', label: 'CV/Resume', required: true },
          { key: 'certificates', label: 'Certificates/Awards', required: false },
          { key: 'passport', label: 'Passport Copy', required: true }
        ].map((doc) => (
          <div key={doc.key} className="border border-gray-300 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {doc.label} {doc.required && <span className="text-red-500">*</span>}
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                {applicationData.documents[doc.key] 
                  ? applicationData.documents[doc.key].name 
                  : 'Click to upload or drag and drop'
                }
              </p>
              <input
                type="file"
                onChange={(e) => handleFileUpload(doc.key, e.target.files[0])}
                className="hidden"
                id={`upload-${doc.key}`}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <label
                htmlFor={`upload-${doc.key}`}
                className="cursor-pointer bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm"
              >
                Choose File
              </label>
              <p className="text-xs text-gray-500 mt-2">
                PDF, DOC, DOCX, JPG, PNG (Max 5MB)
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      <div className="bg-green-50 p-4 rounded-lg">
        <h4 className="font-medium text-green-800 mb-2">Application Review Checklist:</h4>
        <ul className="text-sm text-green-700 space-y-1">
          {scholarshipTips[6].map((tip, index) => (
            <li key={index}>• {tip}</li>
          ))}
        </ul>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Personal Information</h4>
          <div className="space-y-2 text-sm">
            <div><strong>Name:</strong> {applicationData.personalInfo.fullName || 'Not provided'}</div>
            <div><strong>Email:</strong> {applicationData.personalInfo.email || 'Not provided'}</div>
            <div><strong>Phone:</strong> {applicationData.personalInfo.phone || 'Not provided'}</div>
            <div><strong>Nationality:</strong> {applicationData.personalInfo.nationality || 'Not provided'}</div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Academic Background</h4>
          <div className="space-y-2 text-sm">
            <div><strong>Level:</strong> {applicationData.academic.currentLevel || 'Not provided'}</div>
            <div><strong>Institution:</strong> {applicationData.academic.institution || 'Not provided'}</div>
            <div><strong>GPA:</strong> {applicationData.academic.gpa || 'Not provided'}</div>
            <div><strong>Field:</strong> {applicationData.academic.fieldOfStudy || 'Not provided'}</div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Scholarship Details</h4>
          <div className="space-y-2 text-sm">
            <div><strong>Name:</strong> {applicationData.scholarship.name || 'Not provided'}</div>
            <div><strong>Provider:</strong> {applicationData.scholarship.provider || 'Not provided'}</div>
            <div><strong>Deadline:</strong> {applicationData.scholarship.deadline || 'Not provided'}</div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Documents</h4>
          <div className="space-y-2 text-sm">
            {Object.entries(applicationData.documents).map(([key, file]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                {file ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Essays Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Personal Statement:</strong> {applicationData.essays.personalStatement.length} characters
          </div>
          <div>
            <strong>Motivation Letter:</strong> {applicationData.essays.motivationLetter.length} characters
          </div>
          <div>
            <strong>Career Goals:</strong> {applicationData.essays.careerGoals.length} characters
          </div>
          <div>
            <strong>Why This Scholarship:</strong> {applicationData.essays.whyScholarship.length} characters
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
          Submit Application
        </button>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (activeStep) {
      case 1: return renderPersonalInfo();
      case 2: return renderAcademicBackground();
      case 3: return renderScholarshipDetails();
      case 4: return renderEssays();
      case 5: return renderDocumentUpload();
      case 6: return renderReview();
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Scholarship Application Assistance</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Get step-by-step guidance to create winning scholarship applications
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
              {/* Progress Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                  <h3 className="font-semibold text-gray-900 mb-4">Application Progress</h3>
                  <div className="space-y-3">
                    {steps.map((step) => {
                      const Icon = step.icon;
                      const isActive = activeStep === step.id;
                      const isCompleted = isStepComplete(step.id);
                      
                      return (
                        <button
                          key={step.id}
                          onClick={() => setActiveStep(step.id)}
                          className={`w-full flex items-start p-3 rounded-lg text-left transition-colors ${
                            isActive 
                              ? 'bg-purple-100 border border-purple-200' 
                              : isCompleted 
                              ? 'bg-green-50 border border-green-200' 
                              : 'hover:bg-gray-50 border border-transparent'
                          }`}
                        >
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                            isCompleted 
                              ? 'bg-green-600 text-white' 
                              : isActive 
                              ? 'bg-purple-600 text-white' 
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <Icon className="w-4 h-4" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`text-sm font-medium ${
                              isActive ? 'text-purple-900' : isCompleted ? 'text-green-900' : 'text-gray-900'
                            }`}>
                              {step.title}
                            </div>
                            <div className={`text-xs ${
                              isActive ? 'text-purple-700' : isCompleted ? 'text-green-700' : 'text-gray-500'
                            }`}>
                              {step.description}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-600 mb-2">
                      Progress: {completedSteps.length}/{steps.length} steps
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {steps.find(s => s.id === activeStep)?.title}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        {steps.find(s => s.id === activeStep)?.description}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      Step {activeStep} of {steps.length}
                    </div>
                  </div>
                  
                  {renderStepContent()}
                  
                  <div className="flex justify-between pt-6 border-t border-gray-200 mt-8">
                    <button
                      onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                      disabled={activeStep === 1}
                      className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => markStepComplete(activeStep)}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Mark Complete
                      </button>
                      <button
                        onClick={() => setActiveStep(Math.min(steps.length, activeStep + 1))}
                        disabled={activeStep === steps.length}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipApplicationAssistance;

