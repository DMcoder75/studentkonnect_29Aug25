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
  AlertCircle
} from 'lucide-react'
import { SOPService } from '../lib/sopService'
import { supabase } from '../lib/supabase'
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

  // AI Content Generation with database logging
  const generateAIContent = async (sectionName, keywords) => {
    if (!currentUser) {
      setError('Please sign in to use AI assistance')
      return ''
    }

    setIsGeneratingAI(true)
    const startTime = Date.now()

    try {
      // Get AI prompt template from database
      const templateResult = await SOPService.getSOPTemplates(sectionName, 'ai_prompt', formData.purpose)
      
      if (!templateResult.success || templateResult.data.length === 0) {
        throw new Error('AI template not found for this section')
      }

      const template = templateResult.data[0]
      
      // Simulate AI generation (replace with actual OpenAI API call)
      const prompt = `${template.content}\n\nKeywords: ${keywords}\nTarget University: ${formData.targetUniversity}\nTarget Course: ${formData.targetCourse}`
      
      // This would be replaced with actual OpenAI API call
      const generatedContent = `Generated content for ${sectionName} based on keywords: ${keywords}. This is a placeholder for AI-generated content that would be created using the OpenAI API with the prompt template from the database.`
      
      const generationTime = Date.now() - startTime
      
      // Log AI generation
      await SOPService.logAIGeneration(
        currentUser.id,
        formData.id,
        sectionName,
        keywords.split(',').map(k => k.trim()),
        generatedContent,
        100, // placeholder token count
        generationTime
      )

      return generatedContent
    } catch (error) {
      console.error('Error generating AI content:', error)
      setError('Failed to generate AI content')
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
      phone: '',
      nationality: ''
    },
    sections: {
      introduction: '',
      academicBackground: '',
      motivation: '',
      futureGoals: '',
      whyThisUniversity: '',
      conclusion: ''
    }
  })
  const [savedDrafts, setSavedDrafts] = useState([])
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [aiKeywords, setAiKeywords] = useState('')
  const [showSamples, setShowSamples] = useState(false)

  // Predefined samples for Academic Background based on country/education
  const academicSamples = {
    australia: {
      undergraduate: "I completed my Bachelor of Science in Computer Science from the University of Sydney with a GPA of 6.5/7.0. During my undergraduate studies, I excelled in core subjects including Data Structures and Algorithms, Database Systems, and Software Engineering. My final year project involved developing a machine learning model for predictive analytics in healthcare, which received the Dean's Award for Excellence. I also participated in the university's research program, working under Dr. Smith on artificial intelligence applications in medical diagnosis.",
      postgraduate: "I hold a Master of Information Technology from Monash University, where I graduated with distinction (GPA: 6.8/7.0). My coursework focused on advanced topics in cybersecurity, cloud computing, and data analytics. I completed a thesis on 'Blockchain Applications in Supply Chain Management' under the supervision of Professor Johnson, which was later published in the International Journal of Computer Science. Additionally, I served as a teaching assistant for undergraduate programming courses, enhancing my communication and leadership skills."
    },
    india: {
      undergraduate: "I completed my Bachelor of Technology (B.Tech) in Computer Science and Engineering from the Indian Institute of Technology (IIT) Delhi with a CGPA of 8.7/10.0. My academic journey included comprehensive coursework in algorithms, data structures, computer networks, and artificial intelligence. I was consistently ranked in the top 10% of my class and received the Academic Excellence Award for three consecutive years. My final year project on 'Deep Learning for Natural Language Processing' was selected for presentation at the National Conference on Computer Science.",
      postgraduate: "I earned my Master of Computer Applications (MCA) from Jawaharlal Nehru University with a CGPA of 9.2/10.0. The program provided me with advanced knowledge in software development, database management, and system analysis. I specialized in machine learning and completed my dissertation on 'Predictive Modeling for E-commerce Recommendation Systems' which received the Best Thesis Award. I also gained practical experience through internships at leading IT companies including Infosys and TCS."
    },
    china: {
      undergraduate: "I graduated with a Bachelor of Engineering in Software Engineering from Tsinghua University with a GPA of 3.8/4.0. My academic curriculum covered fundamental and advanced topics in computer science, including programming languages, software architecture, and human-computer interaction. I was awarded the Outstanding Student Scholarship for academic excellence and actively participated in the ACM International Collegiate Programming Contest, where our team secured second place nationally.",
      postgraduate: "I completed my Master of Science in Computer Science from Peking University with a GPA of 3.9/4.0. My research focused on artificial intelligence and machine learning, particularly in computer vision applications. Under the guidance of Professor Li, I published two papers in peer-reviewed journals and presented my research at international conferences. I also collaborated with industry partners on real-world AI projects, gaining valuable experience in translating academic research into practical solutions."
    },
    uk: {
      undergraduate: "I achieved a First Class Honours degree in Computer Science from Imperial College London with an overall grade of 78%. My studies encompassed a broad range of subjects including algorithms and complexity, computer systems, and software engineering. I consistently performed in the top 5% of my cohort and was awarded the Department Prize for Outstanding Academic Achievement. My final year individual project on 'Quantum Computing Algorithms' was supervised by Dr. Williams and received the highest possible grade.",
      postgraduate: "I completed my Master of Science in Artificial Intelligence from the University of Edinburgh with distinction (average grade: 75%). The program provided intensive training in machine learning, neural networks, and cognitive science. My dissertation on 'Reinforcement Learning for Autonomous Systems' was conducted in collaboration with the university's robotics lab and resulted in a publication at the International Conference on Machine Learning. I also served as a course representative and organized academic seminars for fellow students."
    }
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
      icon: GraduationCap,
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
      fields: ['sections.motivation']
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
    { value: 'university', label: 'University Application' },
    { value: 'scholarship', label: 'Scholarship Application' },
    { value: 'visa', label: 'Visa Application' },
    { value: 'research', label: 'Research Program' }
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
      if (current && typeof current === 'object') {
        current = current[key]
      } else {
        return ''
      }
    }
    
    return current || ''
  }

  const calculateProgress = () => {
    const totalSteps = steps.length - 1 // Exclude review step
    return Math.round((currentStep / totalSteps) * 100)
  }

  // AI assistance function
  const generateAIContent = async (section, keywords = '') => {
    setIsGeneratingAI(true)
    try {
      // Simulate AI generation with realistic delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const aiPrompts = {
        introduction: `Based on your background in ${formData.targetCourse} and interest in ${formData.targetUniversity}, here's a compelling introduction: "My journey into ${formData.targetCourse.toLowerCase()} began during my undergraduate studies when I first encountered the fascinating intersection of technology and real-world problem-solving. This passion has driven me to pursue advanced studies at ${formData.targetUniversity}, where I aim to contribute to cutting-edge research while developing the skills necessary to make a meaningful impact in the field."`,
        
        motivation: `Your motivation for ${formData.targetCourse}: "What truly motivates me to pursue ${formData.targetCourse} is the opportunity to address complex challenges through innovative solutions. My academic journey has shown me that this field offers the perfect blend of theoretical knowledge and practical application. The rapidly evolving nature of technology, combined with its potential to transform industries and improve lives, fuels my passion for continuous learning and research in this domain."`,
        
        futureGoals: `Career goals aligned with ${formData.targetCourse}: "Upon completing my studies, I envision myself contributing to breakthrough research in ${formData.targetCourse.toLowerCase()}. My short-term goal is to gain expertise in advanced methodologies and collaborate with leading researchers. Long-term, I aspire to establish myself as a thought leader in the field, potentially founding a research lab or joining a top-tier technology company where I can drive innovation and mentor the next generation of professionals."`,
        
        whyThisUniversity: `Why ${formData.targetUniversity}: "${formData.targetUniversity} stands out as my preferred choice due to its world-renowned faculty, state-of-the-art research facilities, and strong industry connections. The university's commitment to innovation and its collaborative research environment align perfectly with my academic goals. I am particularly drawn to the work being conducted in the ${formData.targetCourse} department and the opportunity to contribute to ongoing research projects."`,
        
        conclusion: `Strong conclusion for your SOP: "I am confident that ${formData.targetUniversity} will provide the ideal environment for me to achieve my academic and professional aspirations. With my strong foundation, unwavering commitment, and passion for ${formData.targetCourse.toLowerCase()}, I am ready to contribute meaningfully to the university community while preparing for a successful career in this dynamic field. I look forward to the opportunity to be part of this prestigious institution."`
      }
      
      const generatedContent = aiPrompts[section] || "AI-generated content will appear here based on your inputs and keywords."
      
      // Add keywords context if provided
      if (keywords.trim()) {
        const keywordContext = ` Keywords incorporated: ${keywords}`
        return generatedContent + keywordContext
      }
      
      return generatedContent
    } catch (error) {
      console.error('AI generation error:', error)
      return "Unable to generate AI content at this time. Please try again later."
    } finally {
      setIsGeneratingAI(false)
    }
  }

  // Save to database function (placeholder)
  const saveToDatabase = async () => {
    try {
      // Simulate database save
      const sopData = {
        id: Date.now(),
        userId: 'user123', // In real app, get from auth context
        purpose: formData.purpose,
        targetUniversity: formData.targetUniversity,
        targetCourse: formData.targetCourse,
        personalInfo: formData.personalInfo,
        sections: formData.sections,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      // In real implementation, this would be an API call
      console.log('Saving to database:', sopData)
      
      // Simulate API response
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return { success: true, id: sopData.id }
    } catch (error) {
      console.error('Database save error:', error)
      return { success: false, error: error.message }
    }
  }

  const saveDraft = () => {
    const draft = {
      id: Date.now(),
      name: `SOP Draft - ${formData.targetUniversity || 'Untitled'}`,
      data: formData,
      lastModified: new Date().toISOString(),
      step: currentStep
    }
    setSavedDrafts(prev => [...prev, draft])
    // In a real app, this would save to backend/localStorage
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    const step = steps[currentStep]

    switch (step.id) {
      case 'setup':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purpose of SOP
              </label>
              <Select value={formData.purpose} onValueChange={(value) => updateFormData('purpose', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select the purpose of your SOP" />
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target University
              </label>
              <Select value={formData.targetUniversity} onValueChange={(value) => updateFormData('targetUniversity', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your target university" />
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Course/Program
              </label>
              <Input
                value={formData.targetCourse}
                onChange={(e) => updateFormData('targetCourse', e.target.value)}
                placeholder="e.g., Master of Computer Science"
              />
            </div>
          </div>
        )

      case 'personal':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <Input
                  value={getFieldValue('personalInfo.name')}
                  onChange={(e) => updateFormData('personalInfo.name', e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={getFieldValue('personalInfo.email')}
                  onChange={(e) => updateFormData('personalInfo.email', e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  value={getFieldValue('personalInfo.phone')}
                  onChange={(e) => updateFormData('personalInfo.phone', e.target.value)}
                  placeholder="+61 xxx xxx xxx"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nationality
                </label>
                <Input
                  value={getFieldValue('personalInfo.nationality')}
                  onChange={(e) => updateFormData('personalInfo.nationality', e.target.value)}
                  placeholder="Your nationality"
                />
              </div>
            </div>
          </div>
        )

      case 'introduction':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Writing Tips</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Start with a compelling hook that captures attention. Briefly introduce yourself and your academic/professional background. 
                    State your purpose clearly and create a roadmap for what follows.
                  </p>
                </div>
              </div>
            </div>

            {/* AI Assistance Section */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  <h4 className="font-medium text-purple-900">AI Writing Assistant</h4>
                </div>
                <Button
                  size="sm"
                  onClick={async () => {
                    const content = await generateAIContent('introduction', aiKeywords)
                    updateFormData('sections.introduction', content)
                  }}
                  disabled={isGeneratingAI}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isGeneratingAI ? (
                    <>
                      <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3 w-3 mr-1" />
                      Generate AI Content
                    </>
                  )}
                </Button>
              </div>
              <Input
                placeholder="Enter keywords or hints for AI generation (e.g., programming, research, innovation)"
                value={aiKeywords}
                onChange={(e) => setAiKeywords(e.target.value)}
                className="mb-2"
              />
              <p className="text-xs text-purple-600">
                Provide keywords or hints to help AI generate personalized content for your introduction.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Introduction (150-200 words)
              </label>
              <Textarea
                value={getFieldValue('sections.introduction')}
                onChange={(e) => updateFormData('sections.introduction', e.target.value)}
                placeholder="Begin with an engaging opening that introduces who you are and your academic journey..."
                rows={8}
                className="resize-none"
              />
              <div className="text-sm text-gray-500 mt-1">
                Word count: {getFieldValue('sections.introduction').split(' ').filter(word => word.length > 0).length}
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">Example Opening</h4>
              <p className="text-sm text-yellow-800 italic">
                "From debugging my first 'Hello World' program at age 12 to developing machine learning algorithms that optimize supply chains, 
                my journey in computer science has been driven by an insatiable curiosity to solve complex problems through innovative technology..."
              </p>
            </div>
          </div>
        )

      case 'academic':
        return (
          <div className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <GraduationCap className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">Academic Background Tips</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Highlight your educational achievements, relevant coursework, research projects, and academic honors. 
                    Connect your academic experiences to your chosen field of study.
                  </p>
                </div>
              </div>
            </div>

            {/* Predefined Samples Section */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-emerald-600" />
                  <h4 className="font-medium text-emerald-900">Sample Templates</h4>
                </div>
                <Button
                  size="sm"
                  onClick={() => setShowSamples(!showSamples)}
                  variant="outline"
                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-100"
                >
                  {showSamples ? 'Hide Samples' : 'View Samples'}
                </Button>
              </div>
              
              {showSamples && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(academicSamples).map(([country, levels]) => (
                      <div key={country} className="space-y-2">
                        <h5 className="font-medium text-emerald-800 capitalize">{country}</h5>
                        {Object.entries(levels).map(([level, sample]) => (
                          <div key={level} className="bg-white p-3 rounded border border-emerald-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-medium text-emerald-700 capitalize">{level}</span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => updateFormData('sections.academicBackground', sample)}
                                className="h-6 px-2 text-xs text-emerald-600 hover:text-emerald-800"
                              >
                                <Copy className="h-3 w-3 mr-1" />
                                Use
                              </Button>
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-3">{sample.substring(0, 150)}...</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-emerald-600">
                    Click "Use" to copy a sample template, then customize it with your specific details.
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academic Background (200-250 words)
              </label>
              <Textarea
                value={getFieldValue('sections.academicBackground')}
                onChange={(e) => updateFormData('sections.academicBackground', e.target.value)}
                placeholder="Describe your educational journey, key achievements, relevant coursework, and research experiences..."
                rows={10}
                className="resize-none"
              />
              <div className="text-sm text-gray-500 mt-1">
                Word count: {getFieldValue('sections.academicBackground').split(' ').filter(word => word.length > 0).length}
              </div>
            </div>
          </div>
        )

      case 'motivation':
        return (
          <div className="space-y-6">
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Target className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-orange-900">Motivation & Interest Tips</h4>
                  <p className="text-sm text-orange-700 mt-1">
                    Explain what drives your passion for this field. Share specific experiences, projects, or moments that sparked your interest. 
                    Connect your motivation to your chosen program and career goals.
                  </p>
                </div>
              </div>
            </div>

            {/* AI Assistance Section */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  <h4 className="font-medium text-purple-900">AI Writing Assistant</h4>
                </div>
                <Button
                  size="sm"
                  onClick={async () => {
                    const content = await generateAIContent('motivation', aiKeywords)
                    updateFormData('sections.motivationAndInterest', content)
                  }}
                  disabled={isGeneratingAI}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isGeneratingAI ? (
                    <>
                      <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3 w-3 mr-1" />
                      Generate AI Content
                    </>
                  )}
                </Button>
              </div>
              <Input
                placeholder="Enter keywords about your interests (e.g., problem-solving, innovation, research, technology)"
                value={aiKeywords}
                onChange={(e) => setAiKeywords(e.target.value)}
                className="mb-2"
              />
              <p className="text-xs text-purple-600">
                Describe your interests and motivations to help AI generate personalized content.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivation & Interest (200-250 words)
              </label>
              <Textarea
                value={getFieldValue('sections.motivationAndInterest')}
                onChange={(e) => updateFormData('sections.motivationAndInterest', e.target.value)}
                placeholder="What drives your passion for this field? Share specific experiences that sparked your interest..."
                rows={10}
                className="resize-none"
              />
              <div className="text-sm text-gray-500 mt-1">
                Word count: {getFieldValue('sections.motivationAndInterest').split(' ').filter(word => word.length > 0).length}
              </div>
            </div>
          </div>
        )

      case 'goals':
        return (
          <div className="space-y-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Target className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-900">Future Goals Tips</h4>
                  <p className="text-sm text-purple-700 mt-1">
                    Outline your short-term and long-term career objectives. Explain how this program will help you achieve these goals. 
                    Be specific about your intended career path and potential contributions to the field.
                  </p>
                </div>
              </div>
            </div>

            {/* AI Assistance Section */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  <h4 className="font-medium text-purple-900">AI Writing Assistant</h4>
                </div>
                <Button
                  size="sm"
                  onClick={async () => {
                    const content = await generateAIContent('futureGoals', aiKeywords)
                    updateFormData('sections.futureGoals', content)
                  }}
                  disabled={isGeneratingAI}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isGeneratingAI ? (
                    <>
                      <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3 w-3 mr-1" />
                      Generate AI Content
                    </>
                  )}
                </Button>
              </div>
              <Input
                placeholder="Enter career goals keywords (e.g., research, leadership, entrepreneurship, industry)"
                value={aiKeywords}
                onChange={(e) => setAiKeywords(e.target.value)}
                className="mb-2"
              />
              <p className="text-xs text-purple-600">
                Describe your career aspirations to help AI generate personalized future goals content.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Future Goals (200-250 words)
              </label>
              <Textarea
                value={getFieldValue('sections.futureGoals')}
                onChange={(e) => updateFormData('sections.futureGoals', e.target.value)}
                placeholder="Describe your short-term and long-term career objectives and how this program will help you achieve them..."
                rows={10}
                className="resize-none"
              />
              <div className="text-sm text-gray-500 mt-1">
                Word count: {getFieldValue('sections.futureGoals').split(' ').filter(word => word.length > 0).length}
              </div>
            </div>
          </div>
        )

      case 'university':
        return (
          <div className="space-y-6">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Globe className="h-5 w-5 text-indigo-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-indigo-900">Why This University Tips</h4>
                  <p className="text-sm text-indigo-700 mt-1">
                    Research specific aspects of the university that appeal to you. Mention faculty, research opportunities, facilities, 
                    or unique programs. Show that you've done your homework and explain why this university is the perfect fit.
                  </p>
                </div>
              </div>
            </div>

            {/* AI Assistance Section */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  <h4 className="font-medium text-purple-900">AI Writing Assistant</h4>
                </div>
                <Button
                  size="sm"
                  onClick={async () => {
                    const content = await generateAIContent('whyThisUniversity', aiKeywords)
                    updateFormData('sections.whyThisUniversity', content)
                  }}
                  disabled={isGeneratingAI}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isGeneratingAI ? (
                    <>
                      <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3 w-3 mr-1" />
                      Generate AI Content
                    </>
                  )}
                </Button>
              </div>
              <Input
                placeholder="Enter university-specific keywords (e.g., faculty names, research labs, facilities, programs)"
                value={aiKeywords}
                onChange={(e) => setAiKeywords(e.target.value)}
                className="mb-2"
              />
              <p className="text-xs text-purple-600">
                Mention specific aspects of {formData.targetUniversity} that attract you to help AI generate targeted content.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Why This University (150-200 words)
              </label>
              <Textarea
                value={getFieldValue('sections.whyThisUniversity')}
                onChange={(e) => updateFormData('sections.whyThisUniversity', e.target.value)}
                placeholder={`Explain why ${formData.targetUniversity} is your preferred choice. Mention specific faculty, research opportunities, facilities...`}
                rows={8}
                className="resize-none"
              />
              <div className="text-sm text-gray-500 mt-1">
                Word count: {getFieldValue('sections.whyThisUniversity').split(' ').filter(word => word.length > 0).length}
              </div>
            </div>
          </div>
        )

      case 'conclusion':
        return (
          <div className="space-y-6">
            <div className="bg-teal-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-teal-900">Conclusion Tips</h4>
                  <p className="text-sm text-teal-700 mt-1">
                    Summarize your key points and reaffirm your commitment. End with a strong statement about your readiness 
                    and enthusiasm for the program. Leave a lasting positive impression.
                  </p>
                </div>
              </div>
            </div>

            {/* AI Assistance Section */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  <h4 className="font-medium text-purple-900">AI Writing Assistant</h4>
                </div>
                <Button
                  size="sm"
                  onClick={async () => {
                    const content = await generateAIContent('conclusion', aiKeywords)
                    updateFormData('sections.conclusion', content)
                  }}
                  disabled={isGeneratingAI}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isGeneratingAI ? (
                    <>
                      <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3 w-3 mr-1" />
                      Generate AI Content
                    </>
                  )}
                </Button>
              </div>
              <Input
                placeholder="Enter keywords for your conclusion (e.g., commitment, enthusiasm, contribution, future)"
                value={aiKeywords}
                onChange={(e) => setAiKeywords(e.target.value)}
                className="mb-2"
              />
              <p className="text-xs text-purple-600">
                Describe your commitment and enthusiasm to help AI generate a strong conclusion.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conclusion (100-150 words)
              </label>
              <Textarea
                value={getFieldValue('sections.conclusion')}
                onChange={(e) => updateFormData('sections.conclusion', e.target.value)}
                placeholder="Summarize your key points and reaffirm your commitment to the program..."
                rows={6}
                className="resize-none"
              />
              <div className="text-sm text-gray-500 mt-1">
                Word count: {getFieldValue('sections.conclusion').split(' ').filter(word => word.length > 0).length}
              </div>
            </div>
          </div>
        )

      case 'review':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">SOP Preview</h3>
              <div className="prose max-w-none">
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-900">Purpose:</h4>
                    <p className="text-gray-700">{purposes.find(p => p.value === formData.purpose)?.label || 'Not specified'}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Target:</h4>
                    <p className="text-gray-700">{formData.targetCourse} at {formData.targetUniversity}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Total Word Count:</h4>
                    <p className="text-gray-700">
                      {Object.values(formData.sections).join(' ').split(' ').filter(word => word.length > 0).length} words
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download Word</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center space-x-2"
                onClick={saveDraft}
              >
                <Save className="h-4 w-4" />
                <span>Save Draft</span>
              </Button>
              <Button
                onClick={async () => {
                  const result = await saveToDatabase()
                  if (result.success) {
                    alert('SOP saved to database successfully!')
                  } else {
                    alert('Failed to save to database. Please try again.')
                  }
                }}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
              >
                <Database className="h-4 w-4" />
                <span>Save to Database</span>
              </Button>
            </div>
          </div>
        )

      default:
        return <div>Step content not found</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full-width hero header */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-6 py-16 text-center">
          <div className="flex items-center justify-center mb-4">
            <FileText className="h-12 w-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">SOP Builder</h1>
          </div>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Create compelling statements of purpose with step-by-step guidance and expert tips
          </p>
        </div>
      </div>

      {/* Main layout with sidebar */}
      <div className="flex">
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen} 
          onMobileMenuClose={onMobileMenuClose} 
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Progress Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Progress</h2>
                  <Badge variant="secondary">{currentStep + 1} of {steps.length}</Badge>
                </div>
                <Progress value={calculateProgress()} className="mb-4" />
                <div className="flex flex-wrap gap-2">
                  {steps.map((step, index) => (
                    <Button
                      key={step.id}
                      variant={index === currentStep ? "default" : index < currentStep ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setCurrentStep(index)}
                      className="flex items-center space-x-1"
                    >
                      <step.icon className="h-3 w-3" />
                      <span className="hidden sm:inline">{step.title}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Step Content */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  {React.createElement(steps[currentStep].icon, { className: "h-6 w-6 text-blue-600" })}
                  <div>
                    <CardTitle>{steps[currentStep].title}</CardTitle>
                    <p className="text-sm text-gray-600">{steps[currentStep].description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {renderStepContent()}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={saveDraft}
                  className="flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Draft</span>
                </Button>

                <Button
                  onClick={nextStep}
                  disabled={currentStep === steps.length - 1}
                  className="flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}

