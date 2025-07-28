import React, { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Progress } from '../components/ui/progress'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { FileText, Target, User, PenTool, GraduationCap, Heart, Trophy, Building, CheckCircle, Save, Sparkles, Brain } from 'lucide-react'
import Sidebar from './Sidebar'
import geminiAIService from '../lib/geminiAIService';
import exportService from '../lib/exportService';

const SOPBuilderProper = ({ isMobileMenuOpen, onMobileMenuClose }) => {
  const [currentStep, setCurrentStep] = useState('setup')
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    setup: {
      purpose: '',
      targetUniversity: '',
      targetCourse: ''
    },
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      nationality: ''
    },
    introduction: {
      content: '',
      keywords: ''
    },
    academicBackground: {
      content: '',
      selectedSample: ''
    },
    motivation: {
      content: '',
      keywords: ''
    },
    futureGoals: {
      content: '',
      keywords: ''
    },
    whyUniversity: {
      content: '',
      keywords: ''
    },
    conclusion: {
      content: '',
      keywords: ''
    }
  })

  const steps = [
    { id: 'setup', title: 'Setup & Purpose', icon: Target },
    { id: 'personalInfo', title: 'Personal Information', icon: User },
    { id: 'introduction', title: 'Introduction', icon: PenTool },
    { id: 'academicBackground', title: 'Academic Background', icon: GraduationCap },
    { id: 'motivation', title: 'Motivation & Interest', icon: Heart },
    { id: 'futureGoals', title: 'Future Goals', icon: Trophy },
    { id: 'whyUniversity', title: 'Why This University', icon: Building },
    { id: 'conclusion', title: 'Conclusion', icon: CheckCircle },
    { id: 'review', title: 'Review & Export', icon: FileText }
  ]

  const universities = [
    'University of Melbourne',
    'University of Sydney',
    'Australian National University',
    'University of Queensland',
    'Monash University',
    'University of New South Wales',
    'University of Western Australia',
    'University of Adelaide'
  ]

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep)
  }

  const getProgress = () => {
    return ((getCurrentStepIndex() + 1) / steps.length) * 100
  }

  const updateFormData = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const generateAIContent = async (section, keywords) => {
    if (!keywords.trim()) return

    setIsLoading(true)
    try {
      const context = {
        targetUniversity: formData.setup.targetUniversity,
        targetCourse: formData.setup.targetCourse,
        purpose: formData.setup.purpose,
        studentType: 'Year 12 Student'
      }

      console.log('Generating AI content for:', section, 'with keywords:', keywords)
      const result = await geminiAIService.generateSOPContent(section, keywords, context)
      
      if (result.success) {
        updateFormData(section, 'content', result.content)
        console.log('AI content generated successfully:', result.content.substring(0, 100) + '...')
      } else {
        console.error('AI generation failed:', result.error)
        alert('AI generation failed: ' + result.error)
      }
    } catch (error) {
      console.error('AI generation error:', error)
      alert('AI generation error: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Export handler functions
  const handleExportPDF = async () => {
    setIsLoading(true)
    try {
      const exportData = {
        setup: formData.setup,
        personalInfo: formData.personalInfo,
        introduction: formData.introduction.content,
        academicBackground: formData.academicBackground.content,
        motivationAndInterest: formData.motivation.content,
        futureGoals: formData.futureGoals.content,
        whyThisUniversity: formData.whyUniversity.content,
        conclusion: formData.conclusion.content
      }
      
      const result = await exportService.exportToPDF(exportData)
      if (result.success) {
        alert(result.message)
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.error('PDF export error:', error)
      alert('Failed to export PDF: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportWord = async () => {
    setIsLoading(true)
    try {
      const exportData = {
        setup: formData.setup,
        personalInfo: formData.personalInfo,
        introduction: formData.introduction.content,
        academicBackground: formData.academicBackground.content,
        motivationAndInterest: formData.motivation.content,
        futureGoals: formData.futureGoals.content,
        whyThisUniversity: formData.whyUniversity.content,
        conclusion: formData.conclusion.content
      }
      
      const result = await exportService.exportToWord(exportData)
      if (result.success) {
        alert(result.message)
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.error('Word export error:', error)
      alert('Failed to export Word document: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportText = async () => {
    setIsLoading(true)
    try {
      const exportData = {
        setup: formData.setup,
        personalInfo: formData.personalInfo,
        introduction: formData.introduction.content,
        academicBackground: formData.academicBackground.content,
        motivationAndInterest: formData.motivation.content,
        futureGoals: formData.futureGoals.content,
        whyThisUniversity: formData.whyUniversity.content,
        conclusion: formData.conclusion.content
      }
      
      const result = exportService.exportToText(exportData)
      if (result.success) {
        alert(result.message)
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.error('Text export error:', error)
      alert('Failed to export text file: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 'setup':
        return (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-6">
              <Target className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Setup & Purpose</h3>
                <p className="text-sm text-gray-600">Define your SOP purpose and target</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purpose of SOP
                </label>
                <Select value={formData.setup.purpose} onValueChange={(value) => updateFormData('setup', 'purpose', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="university_application">University Application</SelectItem>
                    <SelectItem value="scholarship">Scholarship Application</SelectItem>
                    <SelectItem value="visa">Visa Application</SelectItem>
                    <SelectItem value="research_program">Research Program</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target University
                </label>
                <Select value={formData.setup.targetUniversity} onValueChange={(value) => updateFormData('setup', 'targetUniversity', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select university" />
                  </SelectTrigger>
                  <SelectContent>
                    {universities.map(uni => (
                      <SelectItem key={uni} value={uni}>{uni}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Course/Program
                </label>
                <Input
                  value={formData.setup.targetCourse}
                  onChange={(e) => updateFormData('setup', 'targetCourse', e.target.value)}
                  placeholder="e.g., Master of Computer Science"
                />
              </div>
            </div>
          </div>
        )

      case 'personalInfo':
        return (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                <p className="text-sm text-gray-600">Provide your personal details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <Input
                  value={formData.personalInfo.fullName}
                  onChange={(e) => updateFormData('personalInfo', 'fullName', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <Input
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) => updateFormData('personalInfo', 'email', e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  value={formData.personalInfo.phone}
                  onChange={(e) => updateFormData('personalInfo', 'phone', e.target.value)}
                  placeholder="+61 400 000 000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nationality
                </label>
                <Input
                  value={formData.personalInfo.nationality}
                  onChange={(e) => updateFormData('personalInfo', 'nationality', e.target.value)}
                  placeholder="e.g., Australian, Indian, Chinese"
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">💡 Tips for Personal Information</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Use your full legal name as it appears on official documents</li>
                <li>• Provide a professional email address</li>
                <li>• Include country code for international phone numbers</li>
              </ul>
            </div>
          </div>
        )

      case 'introduction':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-6">
                <PenTool className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Introduction</h3>
                  <p className="text-sm text-gray-600">Create a compelling opening for your SOP</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <h4 className="font-medium text-purple-900">AI Writing Assistant</h4>
                </div>
                <div className="space-y-3">
                  <Input
                    placeholder="Enter keywords (e.g., programming, innovation, research)"
                    value={formData.introduction.keywords}
                    onChange={(e) => updateFormData('introduction', 'keywords', e.target.value)}
                  />
                  <Button
                    onClick={() => generateAIContent('introduction', formData.introduction.keywords)}
                    disabled={isLoading || !formData.introduction.keywords.trim()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {isLoading ? 'Generating...' : 'Generate AI Content'}
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Introduction Content (100-150 words)
                </label>
                <Textarea
                  value={formData.introduction.content}
                  onChange={(e) => updateFormData('introduction', 'content', e.target.value)}
                  placeholder="Write your compelling introduction here..."
                  rows={6}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Word count: {formData.introduction.content.split(' ').filter(word => word.length > 0).length}
                </p>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">💡 Introduction Tips</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Start with a compelling hook that captures attention</li>
                  <li>• Briefly introduce your passion for the field</li>
                  <li>• Mention your target program and university</li>
                  <li>• Keep it concise but impactful (100-150 words)</li>
                </ul>
              </div>
            </div>
          </div>
        )

      case 'academicBackground':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Academic Background</h3>
                  <p className="text-sm text-gray-600">Describe your educational journey (200-250 words)</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-blue-900">Sample Templates</h4>
                </div>
                <p className="text-sm text-blue-800 mb-3">Choose a sample based on your educational background:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateFormData('academicBackground', 'content', 'I completed my Bachelor of Engineering in Computer Science from the University of Melbourne with a GPA of 6.5/7.0. During my undergraduate studies, I developed a strong foundation in software development, data structures, and algorithms. My final year project on machine learning applications in healthcare received the Dean\'s Award for Excellence. I also participated in various coding competitions and hackathons, which enhanced my problem-solving skills and teamwork abilities.')}
                  >
                    Australian Bachelor Sample
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateFormData('academicBackground', 'content', 'I completed my B.Tech in Computer Science and Engineering from the Indian Institute of Technology with a CGPA of 8.7/10.0. Throughout my four-year program, I excelled in subjects like Data Structures, Database Management Systems, and Software Engineering. I was actively involved in the Computer Science Society and led a team that developed a mobile application for campus management. My academic performance consistently placed me in the top 10% of my class.')}
                  >
                    Indian B.Tech Sample
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Academic Background Content (200-250 words)
                </label>
                <Textarea
                  value={formData.academicBackground.content}
                  onChange={(e) => updateFormData('academicBackground', 'content', e.target.value)}
                  placeholder="Describe your educational background, achievements, and relevant coursework..."
                  rows={8}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Word count: {formData.academicBackground.content.split(' ').filter(word => word.length > 0).length}
                </p>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium text-yellow-900 mb-2">💡 Academic Background Tips</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Include your degree, institution, and GPA/grades</li>
                  <li>• Mention relevant coursework and projects</li>
                  <li>• Highlight academic achievements and awards</li>
                  <li>• Connect your background to your target program</li>
                </ul>
              </div>
            </div>
          </div>
        )

      case 'motivation':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Motivation & Interest</h3>
                  <p className="text-sm text-gray-600">Explain your passion and interest in the field</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <h4 className="font-medium text-purple-900">AI Writing Assistant</h4>
                </div>
                <div className="space-y-3">
                  <Input
                    placeholder="Enter keywords (e.g., passion, technology, innovation, impact)"
                    value={formData.motivation.keywords}
                    onChange={(e) => updateFormData('motivation', 'keywords', e.target.value)}
                  />
                  <Button
                    onClick={() => generateAIContent('motivation', formData.motivation.keywords)}
                    disabled={isLoading || !formData.motivation.keywords.trim()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {isLoading ? 'Generating...' : 'Generate AI Content'}
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motivation & Interest Content (150-200 words)
                </label>
                <Textarea
                  value={formData.motivation.content}
                  onChange={(e) => updateFormData('motivation', 'content', e.target.value)}
                  placeholder="Explain what drives your passion for this field..."
                  rows={6}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Word count: {formData.motivation.content.split(' ').filter(word => word.length > 0).length}
                </p>
              </div>

              <div className="mt-6 p-4 bg-red-50 rounded-lg">
                <h4 className="font-medium text-red-900 mb-2">💡 Motivation Tips</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• Share personal experiences that sparked your interest</li>
                  <li>• Explain how your passion developed over time</li>
                  <li>• Connect your motivation to real-world impact</li>
                  <li>• Be authentic and personal in your storytelling</li>
                </ul>
              </div>
            </div>
          </div>
        )

      case 'futureGoals':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Future Goals</h3>
                  <p className="text-sm text-gray-600">Outline your career objectives and aspirations</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <h4 className="font-medium text-purple-900">AI Writing Assistant</h4>
                </div>
                <div className="space-y-3">
                  <Input
                    placeholder="Enter keywords (e.g., career, leadership, research, entrepreneurship)"
                    value={formData.futureGoals.keywords}
                    onChange={(e) => updateFormData('futureGoals', 'keywords', e.target.value)}
                  />
                  <Button
                    onClick={() => generateAIContent('futureGoals', formData.futureGoals.keywords)}
                    disabled={isLoading || !formData.futureGoals.keywords.trim()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {isLoading ? 'Generating...' : 'Generate AI Content'}
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Future Goals Content (150-200 words)
                </label>
                <Textarea
                  value={formData.futureGoals.content}
                  onChange={(e) => updateFormData('futureGoals', 'content', e.target.value)}
                  placeholder="Describe your short-term and long-term career goals..."
                  rows={6}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Word count: {formData.futureGoals.content.split(' ').filter(word => word.length > 0).length}
                </p>
              </div>

              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">💡 Future Goals Tips</h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Define both short-term (2-5 years) and long-term (5+ years) goals</li>
                  <li>• Show how the program will help achieve these goals</li>
                  <li>• Be specific about your career aspirations</li>
                  <li>• Demonstrate ambition while being realistic</li>
                </ul>
              </div>
            </div>
          </div>
        )

      case 'whyUniversity':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-6">
                <Building className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Why This University</h3>
                  <p className="text-sm text-gray-600">Explain your specific interest in this institution</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <h4 className="font-medium text-purple-900">AI Writing Assistant</h4>
                </div>
                <div className="space-y-3">
                  <Input
                    placeholder="Enter keywords (e.g., research, faculty, facilities, reputation)"
                    value={formData.whyUniversity.keywords}
                    onChange={(e) => updateFormData('whyUniversity', 'keywords', e.target.value)}
                  />
                  <Button
                    onClick={() => generateAIContent('whyUniversity', formData.whyUniversity.keywords)}
                    disabled={isLoading || !formData.whyUniversity.keywords.trim()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {isLoading ? 'Generating...' : 'Generate AI Content'}
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why This University Content (150-200 words)
                </label>
                <Textarea
                  value={formData.whyUniversity.content}
                  onChange={(e) => updateFormData('whyUniversity', 'content', e.target.value)}
                  placeholder="Explain why you chose this specific university and program..."
                  rows={6}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Word count: {formData.whyUniversity.content.split(' ').filter(word => word.length > 0).length}
                </p>
              </div>

              <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                <h4 className="font-medium text-indigo-900 mb-2">💡 Why This University Tips</h4>
                <ul className="text-sm text-indigo-800 space-y-1">
                  <li>• Research specific faculty members and their work</li>
                  <li>• Mention unique programs, facilities, or opportunities</li>
                  <li>• Show genuine knowledge about the university</li>
                  <li>• Connect university strengths to your goals</li>
                </ul>
              </div>
            </div>
          </div>
        )

      case 'conclusion':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Conclusion</h3>
                  <p className="text-sm text-gray-600">Create a strong closing statement</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <h4 className="font-medium text-purple-900">AI Writing Assistant</h4>
                </div>
                <div className="space-y-3">
                  <Input
                    placeholder="Enter keywords (e.g., commitment, contribution, future, impact)"
                    value={formData.conclusion.keywords}
                    onChange={(e) => updateFormData('conclusion', 'keywords', e.target.value)}
                  />
                  <Button
                    onClick={() => generateAIContent('conclusion', formData.conclusion.keywords)}
                    disabled={isLoading || !formData.conclusion.keywords.trim()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {isLoading ? 'Generating...' : 'Generate AI Content'}
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conclusion Content (100-150 words)
                </label>
                <Textarea
                  value={formData.conclusion.content}
                  onChange={(e) => updateFormData('conclusion', 'content', e.target.value)}
                  placeholder="Write a compelling conclusion that ties everything together..."
                  rows={6}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Word count: {formData.conclusion.content.split(' ').filter(word => word.length > 0).length}
                </p>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">💡 Conclusion Tips</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Summarize your key points concisely</li>
                  <li>• Reaffirm your commitment to the program</li>
                  <li>• End with a forward-looking statement</li>
                  <li>• Leave a lasting positive impression</li>
                </ul>
              </div>
            </div>
          </div>
        )

      case 'review':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Review & Export</h3>
                  <p className="text-sm text-gray-600">Review your complete SOP and export</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-4">Complete SOP Preview</h4>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h5 className="font-medium text-gray-800">Introduction</h5>
                      <p className="text-gray-600">{formData.introduction.content || 'Not completed'}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Academic Background</h5>
                      <p className="text-gray-600">{formData.academicBackground.content || 'Not completed'}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Motivation & Interest</h5>
                      <p className="text-gray-600">{formData.motivation.content || 'Not completed'}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Future Goals</h5>
                      <p className="text-gray-600">{formData.futureGoals.content || 'Not completed'}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Why This University</h5>
                      <p className="text-gray-600">{formData.whyUniversity.content || 'Not completed'}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Conclusion</h5>
                      <p className="text-gray-600">{formData.conclusion.content || 'Not completed'}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    className="flex items-center gap-2"
                    onClick={handleExportPDF}
                    disabled={isLoading}
                  >
                    <FileText className="h-4 w-4" />
                    {isLoading ? 'Exporting...' : 'Export as PDF'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={handleExportWord}
                    disabled={isLoading}
                  >
                    <FileText className="h-4 w-4" />
                    {isLoading ? 'Exporting...' : 'Export as Word'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={handleExportText}
                    disabled={isLoading}
                  >
                    <Save className="h-4 w-4" />
                    Export as Text
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <p className="text-gray-600">Step content for {currentStep} will be implemented here.</p>
          </div>
        )
    }
  }

  const nextStep = () => {
    const currentIndex = getCurrentStepIndex()
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id)
    }
  }

  const previousStep = () => {
    const currentIndex = getCurrentStepIndex()
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full-width hero header - EXACTLY like ContactUsPage */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-6 py-16 text-center">
          <div className="flex items-center justify-center mb-4">
            <FileText className="h-12 w-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">SOP Builder</h1>
          </div>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Create compelling statements of purpose with AI assistance and expert guidance
          </p>
        </div>
      </div>

      {/* Main layout with sidebar - EXACTLY like ContactUsPage */}
      <div className="flex">
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen} 
          onMobileMenuClose={onMobileMenuClose} 
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Progress Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Progress</h2>
                <span className="text-sm text-gray-500">{getCurrentStepIndex() + 1} of 9</span>
              </div>
              
              <Progress value={getProgress()} className="mb-6" />
              
              {/* Step Navigation */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-3">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = step.id === currentStep
                  const isCompleted = index < getCurrentStepIndex()
                  
                  return (
                    <Button
                      key={step.id}
                      variant={isActive ? "default" : isCompleted ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setCurrentStep(step.id)}
                      className="flex flex-col items-center p-3 h-auto min-h-[80px] text-xs whitespace-normal"
                    >
                      <Icon className="h-4 w-4 mb-2" />
                      <span className="text-xs text-center leading-tight break-words">
                        {step.title}
                      </span>
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Step Content */}
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                onClick={previousStep}
                disabled={getCurrentStepIndex() === 0}
                variant="outline"
                className="flex items-center gap-2"
              >
                Previous
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Draft
                </Button>

                <Button
                  onClick={nextStep}
                  disabled={getCurrentStepIndex() === steps.length - 1}
                  className="flex items-center gap-2"
                >
                  Next
                </Button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}

export default SOPBuilderProper

