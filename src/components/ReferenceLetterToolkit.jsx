import React, { useState } from 'react';
import { FileText, Download, Send, User, Mail, Phone, Building, Calendar, Star, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';
import Sidebar from './Sidebar';

const ReferenceLetterToolkit = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('request');
  const [referenceData, setReferenceData] = useState({
    referee: {
      name: '',
      title: '',
      organization: '',
      email: '',
      phone: '',
      relationship: '',
      duration: ''
    },
    student: {
      name: '',
      program: '',
      institution: '',
      achievements: '',
      skills: '',
      character: ''
    },
    letter: {
      purpose: '',
      deadline: '',
      specificRequirements: '',
      additionalInfo: ''
    }
  });

  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Academic Reference Letter',
      type: 'Academic',
      description: 'For university applications and academic programs',
      template: `Dear Admissions Committee,

I am writing to provide my strongest recommendation for [Student Name], who has been my student in [Course/Program] at [Institution] for [Duration]. In my [Years] years of teaching and research, [Student Name] stands out as one of the most dedicated and capable students I have encountered.

Academic Performance:
[Student Name] consistently demonstrated exceptional academic ability, achieving [Specific Achievements]. Their analytical skills and critical thinking abilities are particularly noteworthy, as evidenced by [Specific Examples].

Personal Qualities:
Beyond academic excellence, [Student Name] possesses remarkable [Character Traits]. They have shown [Specific Examples of Character], which makes them an ideal candidate for your program.

Research/Project Work:
[Student Name] has contributed significantly to [Research/Project Details], demonstrating their ability to work independently and collaboratively.

I recommend [Student Name] without reservation for admission to your program. They have the intellectual capacity, dedication, and character to excel in their chosen field.

Sincerely,
[Referee Name]
[Title]
[Institution]
[Contact Information]`
    },
    {
      id: 2,
      name: 'Professional Reference Letter',
      type: 'Professional',
      description: 'For job applications and professional programs',
      template: `Dear Hiring Manager,

I am pleased to recommend [Student Name] for [Position/Program]. As [Referee Title] at [Organization], I have had the privilege of working with [Student Name] for [Duration] in the capacity of [Relationship].

Professional Performance:
[Student Name] has consistently exceeded expectations in their role, demonstrating [Specific Skills and Achievements]. Their ability to [Specific Examples] has been invaluable to our team.

Key Strengths:
- [Skill 1]: [Specific Example]
- [Skill 2]: [Specific Example]
- [Skill 3]: [Specific Example]

Leadership and Teamwork:
[Student Name] has shown exceptional leadership qualities by [Specific Examples]. They work collaboratively and have earned the respect of colleagues at all levels.

I am confident that [Student Name] will be a valuable addition to your organization/program. Their combination of technical skills, professional attitude, and personal integrity makes them an outstanding candidate.

Please feel free to contact me if you need any additional information.

Best regards,
[Referee Name]
[Title]
[Organization]
[Contact Information]`
    },
    {
      id: 3,
      name: 'Character Reference Letter',
      type: 'Character',
      description: 'For scholarship applications and character assessments',
      template: `To Whom It May Concern,

I am writing to provide a character reference for [Student Name], whom I have known for [Duration] in my capacity as [Relationship]. I am pleased to recommend them based on their outstanding character and personal qualities.

Personal Character:
[Student Name] is a person of exceptional integrity and moral character. They have consistently demonstrated [Character Traits] in all their interactions. Their commitment to [Values/Principles] is evident in [Specific Examples].

Community Involvement:
[Student Name] has shown remarkable dedication to community service through [Specific Activities]. Their volunteer work with [Organizations/Causes] demonstrates their compassion and social responsibility.

Reliability and Trustworthiness:
Throughout our relationship, [Student Name] has proven to be completely reliable and trustworthy. They have [Specific Examples of Reliability] and can always be counted upon to fulfill their commitments.

I recommend [Student Name] without hesitation. They possess the character, values, and personal qualities that make them deserving of your consideration.

Sincerely,
[Referee Name]
[Title/Position]
[Contact Information]`
    }
  ]);

  const [requestStatus, setRequestStatus] = useState('draft'); // draft, sent, received

  const handleInputChange = (section, field, value) => {
    setReferenceData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const generatePersonalizedLetter = (template) => {
    let personalizedTemplate = template.template;
    
    // Replace placeholders with actual data
    personalizedTemplate = personalizedTemplate.replace(/\[Student Name\]/g, referenceData.student.name || '[Student Name]');
    personalizedTemplate = personalizedTemplate.replace(/\[Referee Name\]/g, referenceData.referee.name || '[Referee Name]');
    personalizedTemplate = personalizedTemplate.replace(/\[Title\]/g, referenceData.referee.title || '[Title]');
    personalizedTemplate = personalizedTemplate.replace(/\[Organization\]/g, referenceData.referee.organization || '[Organization]');
    personalizedTemplate = personalizedTemplate.replace(/\[Institution\]/g, referenceData.student.institution || '[Institution]');
    personalizedTemplate = personalizedTemplate.replace(/\[Program\]/g, referenceData.student.program || '[Program]');
    personalizedTemplate = personalizedTemplate.replace(/\[Duration\]/g, referenceData.referee.duration || '[Duration]');
    personalizedTemplate = personalizedTemplate.replace(/\[Relationship\]/g, referenceData.referee.relationship || '[Relationship]');
    personalizedTemplate = personalizedTemplate.replace(/\[Contact Information\]/g, 
      `${referenceData.referee.email || '[Email]'}\n${referenceData.referee.phone || '[Phone]'}`);
    
    return personalizedTemplate;
  };

  const downloadLetter = (template) => {
    const personalizedLetter = generatePersonalizedLetter(template);
    const blob = new Blob([personalizedLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name.replace(/\s+/g, '_')}_${referenceData.student.name || 'Student'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sendReferenceRequest = () => {
    // Simulate sending request
    setRequestStatus('sent');
    setTimeout(() => {
      setRequestStatus('received');
    }, 3000);
  };

  const renderRequestForm = () => (
    <div className="space-y-8">
      {/* Referee Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-purple-600" />
          Referee Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={referenceData.referee.name}
              onChange={(e) => handleInputChange('referee', 'name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Professor John Smith"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title/Position</label>
            <input
              type="text"
              value={referenceData.referee.title}
              onChange={(e) => handleInputChange('referee', 'title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Professor of Computer Science"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organization/Institution</label>
            <input
              type="text"
              value={referenceData.referee.organization}
              onChange={(e) => handleInputChange('referee', 'organization', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="University of Technology"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={referenceData.referee.email}
              onChange={(e) => handleInputChange('referee', 'email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="john.smith@university.edu"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={referenceData.referee.phone}
              onChange={(e) => handleInputChange('referee', 'phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
            <select
              value={referenceData.referee.relationship}
              onChange={(e) => handleInputChange('referee', 'relationship', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select Relationship</option>
              <option value="Professor">Professor</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Manager">Manager</option>
              <option value="Mentor">Mentor</option>
              <option value="Colleague">Colleague</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration of Relationship</label>
            <input
              type="text"
              value={referenceData.referee.duration}
              onChange={(e) => handleInputChange('referee', 'duration', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="2 years"
            />
          </div>
        </div>
      </div>

      {/* Student Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-purple-600" />
          Student Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
            <input
              type="text"
              value={referenceData.student.name}
              onChange={(e) => handleInputChange('student', 'name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Program/Course</label>
            <input
              type="text"
              value={referenceData.student.program}
              onChange={(e) => handleInputChange('student', 'program', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Master of Computer Science"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
            <input
              type="text"
              value={referenceData.student.institution}
              onChange={(e) => handleInputChange('student', 'institution', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Target University"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Key Achievements</label>
            <textarea
              value={referenceData.student.achievements}
              onChange={(e) => handleInputChange('student', 'achievements', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="List key achievements, awards, projects..."
            />
          </div>
        </div>
      </div>

      {/* Reference Request Details */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-purple-600" />
          Reference Request Details
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Purpose of Reference</label>
            <select
              value={referenceData.letter.purpose}
              onChange={(e) => handleInputChange('letter', 'purpose', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select Purpose</option>
              <option value="University Application">University Application</option>
              <option value="Job Application">Job Application</option>
              <option value="Scholarship Application">Scholarship Application</option>
              <option value="Internship Application">Internship Application</option>
              <option value="Graduate Program">Graduate Program</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
            <input
              type="date"
              value={referenceData.letter.deadline}
              onChange={(e) => handleInputChange('letter', 'deadline', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Specific Requirements</label>
            <textarea
              value={referenceData.letter.specificRequirements}
              onChange={(e) => handleInputChange('letter', 'specificRequirements', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Any specific requirements or points to address..."
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={sendReferenceRequest}
          disabled={requestStatus !== 'draft'}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center"
        >
          <Send className="w-4 h-4 mr-2" />
          {requestStatus === 'draft' ? 'Send Request' : requestStatus === 'sent' ? 'Request Sent' : 'Request Received'}
        </button>
      </div>

      {/* Status Display */}
      {requestStatus !== 'draft' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-center space-x-2">
            {requestStatus === 'sent' && (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                <span className="text-purple-600 font-medium">Request sent to {referenceData.referee.name}</span>
              </>
            )}
            {requestStatus === 'received' && (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-medium">Reference letter received!</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg">
        <div className="flex items-start space-x-2">
          <Lightbulb className="w-5 h-5 text-purple-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-purple-800 mb-2">How to Use Templates:</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Fill out the student and referee information first</li>
              <li>• Choose the appropriate template for your purpose</li>
              <li>• Customize the template with specific details</li>
              <li>• Download or share with your referee</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{template.name}</h3>
                <p className="text-gray-600 text-sm">{template.description}</p>
                <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded mt-2">
                  {template.type}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => downloadLetter(template)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm flex items-center"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Template Preview:</h4>
              <pre className="text-xs text-gray-700 whitespace-pre-wrap overflow-x-auto max-h-40 overflow-y-auto">
                {generatePersonalizedLetter(template).substring(0, 500)}...
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Reference Letter Toolkit</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Request, manage, and create professional reference letters with ease
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
            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-sm mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab('request')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'request'
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Request Reference
                  </button>
                  <button
                    onClick={() => setActiveTab('templates')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'templates'
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Letter Templates
                  </button>
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'request' && renderRequestForm()}
            {activeTab === 'templates' && renderTemplates()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferenceLetterToolkit;

