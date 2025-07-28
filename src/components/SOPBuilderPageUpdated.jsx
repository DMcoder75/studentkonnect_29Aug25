import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Progress } from '../components/ui/progress'
import { 
  FileText, 
  User, 
  BookOpen, 
  GraduationCap, 
  Target, 
  Globe, 
  CheckCircle, 
  Eye,
  Save,
  Download,
  Sparkles,
  RefreshCw,
  Database,
  AlertCircle,
  Lightbulb
} from 'lucide-react'
import { SOPService } from '../lib/sopService'
import { supabase } from '../lib/supabase'
import GeminiAIService from '../lib/geminiAIService'
import Sidebar from './Sidebar'

export default function SOPBuilderPage() {
  const [currentStep, setCurrentStep] = useState('setup')
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [aiKeywords, setAiKeywords] = useState('')
  const [showSamples, setShowSamples] = useState(false)
  const [academicSamples, setAcademicSamples] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const [formData, setFormData] = useState({
    id: null,
    purpose: '',
    targetUniversity: '',
    targetCourse: '',
    personalInfo: {
      fullName: '',
      email: '',
      phoneNumber: '',
      nationality: ''
    },
    sections: {
      introduction: '',
      academicBackground: '',
      motivationAndInterest: '',
      futureGoals: '',
      whyThisUniversity: '',
      conclusion: ''
    }
  })

  // Initialize user and load data
  useEffect(() => {
    initializeUser()
  }, [])

  // Load academic samples when component mounts
  useEffect(() => {
    loadAcademicSamples()
  }, [])

  const initializeUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        setCurrentUser(user)
        const userProfile = await SOPService.getOrCreateUserProfile(user)
        if (userProfile.success && userProfile.data) {
          // Pre-fill personal info if available
          setFormData(prev => ({
            ...prev,
            personalInfo: {
              fullName: userProfile.data.full_name || '',
              email: userProfile.data.email || '',
              phoneNumber: userProfile.data.phone_number || '',
              nationality: userProfile.data.nationality || ''
            }
          }))
        }
      }
    } catch (error) {
      console.error('Error initializing user:', error)
      setError('Failed to initialize user session')
    } finally {
      setIsLoading(false)
    }
  }

  const loadAcademicSamples = async () => {
    try {
      const result = await SOPService.getAcademicSamples()
      if (result.success) {
        setAcademicSamples(result.data)
      } else {
        console.error('Failed to load academic samples:', result.error)
      }
    } catch (error) {
      console.error('Error loading academic samples:', error)
    }
  }

  // Database operations
  const saveToDatabase = async () => {
    if (!currentUser) {
      setError('Please sign in to save your SOP')
      return { success: false, error: 'User not authenticated' }
    }

    try {
      setIsLoading(true)
      
      // Update user profile with personal info
      if (formData.personalInfo.fullName || formData.personalInfo.phoneNumber || formData.personalInfo.nationality) {
        await SOPService.updateUserProfile(currentUser.id, formData.personalInfo)
      }

      // Save SOP
      const result = await SOPService.saveSOP(formData, currentUser.id)
      
      if (result.success) {
        setFormData(prev => ({ ...prev, id: result.data.id }))
        return { success: true, data: result.data }
      } else {
        setError(result.error)
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Error saving to database:', error)
      setError('Failed to save SOP to database')
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  // AI Content Generation with Gemini AI integration
  const generateAIContent = async (sectionName, keywords) => {
    if (!currentUser) {
      setError('Please sign in to use AI assistance')
      return ''
    }

    if (!GeminiAIService.isConfigured()) {
      setError('AI service is not configured. Please check your Gemini API key.')
      return ''
    }

    setIsGeneratingAI(true)
    const startTime = Date.now()

    try {
      // Get AI prompt template from database
      const templateResult = await SOPService.getSOPTemplates(sectionName, 'ai_prompt', formData.purpose)
      
      let template = ''
      if (templateResult.success && templateResult.data.length > 0) {
        template = templateResult.data[0].content
      }

      // Prepare context for AI generation
      const context = {
        targetUniversity: formData.targetUniversity,
        targetCourse: formData.targetCourse,
        purpose: formData.purpose,
        studentType: 'Year 12 Student' // You can make this dynamic based on student data
      }

      // Generate content using Gemini AI
      const result = await GeminiAIService.generateSOPContent(sectionName, keywords, context, template)
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to generate AI content')
      }

      const generationTime = Date.now() - startTime
      
      // Log AI generation to database
      await SOPService.logAIGeneration(
        currentUser.id,
        formData.id,
        sectionName,
        keywords.split(',').map(k => k.trim()),
        result.content,
        result.metadata.tokensUsed,
        generationTime
      )

      return result.content
    } catch (error) {
      console.error('Error generating AI content:', error)
      setError(`Failed to generate AI content: ${error.message}`)
      return ''
    } finally {
      setIsGeneratingAI(false)
    }
  }

  // Use academic sample from database
  const useAcademicSample = (sample) => {
    updateFormData('sections.academicBackground', sample.sample_content)
    setShowSamples(false)
  }

  // Get filtered academic samples
  const getFilteredSamples = () => {
    if (!academicSamples.length) return []
    
    // Group samples by country
    const groupedSamples = academicSamples.reduce((acc, sample) => {
      if (!acc[sample.country]) {
        acc[sample.country] = []
      }
      acc[sample.country].push(sample)
      return acc
    }, {})

    return groupedSamples
  }

  const onMobileMenuClose = () => setIsMobileMenuOpen(false)

  const steps = [
    {
      id: 'setup',
      title: 'Setup & Purpose',
      description: 'Define your SOP purpose and target',
      icon: Target,
      fields: ['purpose', 'targetUniversity', 'targetCourse']
    },
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Basic details for personalization',
      icon: User,
      fields: ['personalInfo']
    },
    {
      id: 'introduction',
      title: 'Introduction',
      description: 'Opening statement and hook',
      icon: BookOpen,
      fields: ['sections.introduction']
    },
    {
      id: 'academic',
      title: 'Academic Background',
      description: 'Education and achievements',
      icon: GraduationCap,
      fields: ['sections.academicBackground']
    },
    {
      id: 'motivation',
      title: 'Motivation & Interest',
      description: 'Why this field and course',
      icon: Lightbulb,
      fields: ['sections.motivationAndInterest']
    },
    {
      id: 'goals',
      title: 'Future Goals',
      description: 'Career aspirations and plans',
      icon: Target,
      fields: ['sections.futureGoals']
    },
    {
      id: 'university',
      title: 'Why This University',
      description: 'University-specific reasons',
      icon: Globe,
      fields: ['sections.whyThisUniversity']
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      description: 'Strong closing statement',
      icon: CheckCircle,
      fields: ['sections.conclusion']
    },
    {
      id: 'review',
      title: 'Review & Export',
      description: 'Final review and download',
      icon: Eye,
      fields: []
    }
  ]

  const universities = [
    'University of Melbourne',
    'Australian National University',
    'University of Sydney',
    'University of Queensland',
    'Monash University',
    'University of Western Australia',
    'University of Adelaide',
    'UNSW Sydney'
  ]

  const purposes = [
    { value: 'university_application', label: 'University Application' },
    { value: 'scholarship', label: 'Scholarship Application' },
    { value: 'visa', label: 'Visa Application' },
    { value: 'research_program', label: 'Research Program' }
  ]

  const updateFormData = (path, value) => {
    setFormData(prev => {
      const newData = { ...prev }
      const keys = path.split('.')
      let current = newData
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {}
        current = current[keys[i]]
      }
      
      current[keys[keys.length - 1]] = value
      return newData
    })
  }

  const getFieldValue = (path) => {
    const keys = path.split('.')
    let current = formData
    
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key]
      } else {
        return ''
      }
    }
    
    return current || ''
  }

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep)
  }

  const getProgress = () => {
    return ((getCurrentStepIndex() + 1) / steps.length) * 100
  }

  const canProceedToNext = () => {
    const step = steps.find(s => s.id === currentStep)
    if (!step || !step.fields) return true
    
    return step.fields.every(field => {
      const value = getFieldValue(field)
      return value && value.toString().trim().length > 0
    })
  }

  const nextStep = () => {
    const currentIndex = getCurrentStepIndex()
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id)
    }
  }

  const prevStep = () => {
    const currentIndex = getCurrentStepIndex()
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id)
    }
  }

  const handleAIGenerate = async (sectionName) => {
    if (!aiKeywords.trim()) {
      setError('Please enter some keywords for AI generation')
      return
    }

    const generatedContent = await generateAIContent(sectionName, aiKeywords)
    if (generatedContent) {
      updateFormData(`sections.${sectionName}`, generatedContent)
      setAiKeywords('')
    }
  }

  const renderStepContent = () => {
    if (isLoading) {
      return (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2">Loading...</span>
          </CardContent>
        </Card>
      )
    }

    if (error) {
      return (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <AlertCircle className="h-8 w-8 text-red-600" />
            <span className="ml-2 text-red-600">{error}</span>
          </CardContent>
        </Card>
      )
    }

    switch (currentStep) {
      case 'setup':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Setup & Purpose
                <span className="text-sm text-gray-500">Define your SOP purpose and target</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Purpose of SOP</label>
                  <Select value={formData.purpose} onValueChange={(value) => updateFormData('purpose', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      {purposes.map(purpose => (
                        <SelectItem key={purpose.value} value={purpose.value}>
                          {purpose.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Target University</label>
                  <Select value={formData.targetUniversity} onValueChange={(value) => updateFormData('targetUniversity', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select university" />
                    </SelectTrigger>
                    <SelectContent>
                      {universities.map(uni => (
                        <SelectItem key={uni} value={uni}>
                          {uni}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Target Course/Program</label>
                <Input
                  placeholder="e.g., Master of Computer Science"
                  value={formData.targetCourse}
                  onChange={(e) => updateFormData('targetCourse', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        )

      case 'personal':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
                <span className="text-sm text-gray-500">Basic details for personalization</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    placeholder="Your full name"
                    value={formData.personalInfo.fullName}
                    onChange={(e) => updateFormData('personalInfo.fullName', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    placeholder="your.email@example.com"
                    value={formData.personalInfo.email}
                    onChange={(e) => updateFormData('personalInfo.email', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input
                    placeholder="+61 xxx xxx xxx"
                    value={formData.personalInfo.phoneNumber}
                    onChange={(e) => updateFormData('personalInfo.phoneNumber', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Nationality</label>
                  <Input
                    placeholder="Your nationality"
                    value={formData.personalInfo.nationality}
                    onChange={(e) => updateFormData('personalInfo.nationality', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 'academic':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Academic Background
                <span className="text-sm text-gray-500">Education and achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Academic Background Tips */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <BookOpen className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800">Academic Background Tips</h4>
                    <p className="text-green-700 text-sm mt-1">
                      Highlight your educational achievements, relevant coursework, research projects, 
                      and academic honors. Connect your academic experiences to your chosen field of study.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sample Templates */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Sample Templates</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSamples(!showSamples)}
                    className="text-blue-600 border-blue-300"
                  >
                    {showSamples ? 'Hide Samples' : 'View Samples'}
                  </Button>
                </div>

                {showSamples && (
                  <div className="mt-4 space-y-4">
                    {Object.entries(getFilteredSamples()).map(([country, samples]) => (
                      <div key={country} className="space-y-3">
                        <h4 className="font-medium text-gray-800 capitalize">{country}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {samples.map((sample, index) => (
                            <div key={index} className="bg-white border rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700 capitalize">
                                  {sample.education_level}
                                </span>
                                <Button
                                  size="sm"
                                  onClick={() => useAcademicSample(sample)}
                                  className="h-6 px-2 text-xs"
                                >
                                  Use
                                </Button>
                              </div>
                              <p className="text-xs text-gray-600 line-clamp-3">
                                {sample.field_of_study} - {sample.degree_name} from {sample.university_name} ({sample.gpa_value})
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    {Object.keys(getFilteredSamples()).length === 0 && (
                      <div className="text-center py-4">
                        <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">No samples available. Please check your database connection.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Academic Background Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Academic Background (200-250 words)</label>
                <Textarea
                  placeholder="Describe your educational journey, key achievements, relevant coursework, and research experiences..."
                  value={getFieldValue('sections.academicBackground')}
                  onChange={(e) => updateFormData('sections.academicBackground', e.target.value)}
                  className="min-h-[200px]"
                />
                <div className="text-xs text-gray-500">
                  Word count: {getFieldValue('sections.academicBackground').split(' ').filter(word => word.length > 0).length}
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 'review':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Review & Export
                <span className="text-sm text-gray-500">Final review and download</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">SOP Summary</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p><strong>Purpose:</strong> {formData.purpose}</p>
                  <p><strong>University:</strong> {formData.targetUniversity}</p>
                  <p><strong>Course:</strong> {formData.targetCourse}</p>
                  <p><strong>Total Word Count:</strong> {
                    Object.values(formData.sections)
                      .join(' ')
                      .split(' ')
                      .filter(word => word.length > 0).length
                  }</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={saveToDatabase}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <Database className="h-4 w-4" />
                  {isLoading ? 'Saving...' : 'Save to Database'}
                </Button>
                
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export as PDF
                </Button>
                
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export as Word
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">Section under development</p>
            </CardContent>
          </Card>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        onMobileMenuClose={onMobileMenuClose}
      />
      
      <div className="lg:ml-64">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
          <div className="px-6 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <FileText className="h-16 w-16 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-2">SOP Builder</h1>
              <p className="text-xl opacity-90">
                Create compelling statements of purpose with step-by-step guidance and expert tips
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Progress Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Progress</h2>
                <span className="text-sm text-gray-500">
                  {getCurrentStepIndex() + 1} of {steps.length}
                </span>
              </div>
              
              <Progress value={getProgress()} className="mb-6" />
              
              {/* Step Navigation */}
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
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
                      className="flex flex-col items-center p-2 h-auto"
                    >
                      <Icon className="h-4 w-4 mb-1" />
                      <span className="text-xs text-center leading-tight">
                        {step.title}
                      </span>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Step Content */}
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={getCurrentStepIndex() === 0}
              className="flex items-center gap-2"
            >
              Previous
            </Button>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={saveToDatabase}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save Draft
              </Button>

              <Button
                onClick={nextStep}
                disabled={getCurrentStepIndex() === steps.length - 1 || !canProceedToNext()}
                className="flex items-center gap-2"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

