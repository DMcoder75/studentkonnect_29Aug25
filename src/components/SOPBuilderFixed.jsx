import React, { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Progress } from '../components/ui/progress'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { FileText, Target, User, PenTool, GraduationCap, Heart, Trophy, Building, CheckCircle, Save, Sparkles, Brain } from 'lucide-react'
import Sidebar from './Sidebar'
import geminiAIService from '../lib/geminiAIService'

const SOPBuilderFixed = ({ isMobileMenuOpen, onMobileMenuClose }) => {
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
        university: formData.setup.targetUniversity,
        course: formData.setup.targetCourse,
        purpose: formData.setup.purpose,
        keywords: keywords
      }

      const content = await geminiAIService.generateSOPSection(section, context)
      updateFormData(section, 'content', content)
    } catch (error) {
      console.error('AI generation failed:', error)
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
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative px-6 py-16 text-center">
          <FileText className="h-16 w-16 mx-auto mb-4 text-white" />
          <h1 className="text-4xl font-bold mb-4">SOP Builder</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Create compelling statements of purpose with AI assistance and expert guidance
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="lg:grid lg:grid-cols-4 min-h-screen">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar 
            isMobileMenuOpen={isMobileMenuOpen} 
            onMobileMenuClose={onMobileMenuClose} 
          />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 p-6 lg:pl-2">{/* Reduced left padding to minimize gap */}
          {/* Progress Section */}
          <div className="mb-8">
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
          </div>

          {/* Step Content */}
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
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
      </div>
    </div>
  )
}

export default SOPBuilderFixed

