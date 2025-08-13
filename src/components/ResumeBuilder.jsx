import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import { Progress } from '../components/ui/progress'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { FileText, Target, User, PenTool, GraduationCap, Briefcase, Award, Users, Settings, CheckCircle, Save, Sparkles, Brain, Upload, Download, Eye, Plus, Trash2, Edit, Wand2 } from 'lucide-react'
import Sidebar from './Sidebar'
import exportService from '../lib/exportService'
import geminiAIService from '../lib/geminiAIService'
import { 
  renderEducationStep, 
  renderExperienceStep, 
  renderSkillsStep, 
  renderProjectsStep, 
  renderActivitiesStep, 
  renderAwardsStep, 
  renderReferencesStep, 
  renderReviewStep 
} from './ResumeBuilderSteps'

const ResumeBuilder = ({ isMobileMenuOpen, onMobileMenuClose }) => {
  const [currentStep, setCurrentStep] = useState('setup')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('modern')
  const [formData, setFormData] = useState({
    setup: {
      resumeTitle: '',
      template: 'modern',
      uploadedFile: null,
      careerField: '',
      experienceLevel: '',
      targetRole: '',
      industry: '',
      currentRole: '',
      yearsExperience: '',
      careerGoals: ''
    },
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'Australia',
      linkedinUrl: '',
      portfolioUrl: '',
      githubUrl: '',
      professionalSummary: ''
    },
    education: [],
    experience: [],
    skills: {
      technical: [],
      soft: [],
      languages: [],
      certifications: []
    },
    projects: [],
    activities: [],
    awards: [],
    references: {
      includeReferences: false,
      availableOnRequest: true,
      referenceList: []
    }
  })

  const steps = [
    { id: 'setup', title: 'Setup & Template', icon: Target },
    { id: 'personalInfo', title: 'Personal Information', icon: User },
    { id: 'education', title: 'Education', icon: GraduationCap },
    { id: 'experience', title: 'Work Experience', icon: Briefcase },
    { id: 'skills', title: 'Skills', icon: Settings },
    { id: 'projects', title: 'Projects', icon: PenTool },
    { id: 'activities', title: 'Activities & Volunteering', icon: Users },
    { id: 'awards', title: 'Awards & Certifications', icon: Award },
    { id: 'references', title: 'References', icon: Users },
    { id: 'review', title: 'Review & Export', icon: FileText }
  ]

  const templates = [
    { id: 'modern', name: 'Modern Professional', description: 'Clean, modern design perfect for tech and business roles' },
    { id: 'classic', name: 'Classic Traditional', description: 'Traditional format suitable for conservative industries' },
    { id: 'academic', name: 'Academic CV', description: 'Comprehensive format for academic and research positions' },
    { id: 'creative', name: 'Creative Portfolio', description: 'Visually appealing design for creative fields' },
    { id: 'ats-friendly', name: 'ATS Optimized', description: 'Simple format optimized for Applicant Tracking Systems' }
  ]

  const skillCategories = [
    { id: 'technical', name: 'Technical Skills', placeholder: 'e.g., Python, JavaScript, React' },
    { id: 'soft', name: 'Soft Skills', placeholder: 'e.g., Leadership, Communication, Problem Solving' },
    { id: 'languages', name: 'Languages', placeholder: 'e.g., English (Native), Spanish (Intermediate)' },
    { id: 'certifications', name: 'Certifications', placeholder: 'e.g., AWS Certified, Google Analytics' }
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

  const updateArrayData = (section, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }))
  }

  const updateReferenceData = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      references: {
        ...prev.references,
        referenceList: prev.references.referenceList.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }))
  }

  const addArrayItem = (section, newItem, subSection = null) => {
    if (subSection) {
      // Handle nested arrays like references.referenceList
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [subSection]: [...prev[section][subSection], newItem]
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: [...prev[section], newItem]
      }))
    }
  }

  const removeArrayItem = (section, index, subSection = null) => {
    if (subSection) {
      // Handle nested arrays like references.referenceList
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [subSection]: prev[section][subSection].filter((_, i) => i !== index)
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: prev[section].filter((_, i) => i !== index)
      }))
    }
  }

  const addSkill = (category, skill) => {
    if (!skill.trim()) return
    setFormData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: [...prev.skills[category], skill.trim()]
      }
    }))
  }

  const removeSkill = (category, index) => {
    setFormData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((_, i) => i !== index)
      }
    }))
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setIsLoading(true)
    try {
      updateFormData('setup', 'uploadedFile', file)
      
      // Parse the resume file and extract data
      const parsedData = await parseResumeFile(file)
      
      if (parsedData) {
        // Pre-fill all sections with parsed data
        await prefillFormWithParsedData(parsedData)
        console.log('Resume parsed and form pre-filled successfully')
      }
    } catch (error) {
      console.error('Error uploading and parsing file:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const parseResumeFile = async (file) => {
    try {
      // Use AI service to parse the resume
      const result = await geminiAIService.parseResume(file)
      
      if (result.success) {
        return result.data
      } else {
        console.error('Resume parsing failed:', result.error)
        return null
      }
    } catch (error) {
      console.error('Error parsing resume:', error)
      return null
    }
  }

  const prefillFormWithParsedData = async (parsedData) => {
    try {
      // Pre-fill personal information
      if (parsedData.personalInfo) {
        Object.keys(parsedData.personalInfo).forEach(key => {
          if (parsedData.personalInfo[key]) {
            updateFormData('personalInfo', key, parsedData.personalInfo[key])
          }
        })
      }

      // Pre-fill education
      if (parsedData.education && Array.isArray(parsedData.education)) {
        setFormData(prev => ({
          ...prev,
          education: parsedData.education.map(edu => ({
            id: Date.now() + Math.random(),
            ...edu
          }))
        }))
      }

      // Pre-fill work experience
      if (parsedData.experience && Array.isArray(parsedData.experience)) {
        setFormData(prev => ({
          ...prev,
          experience: parsedData.experience.map(exp => ({
            id: Date.now() + Math.random(),
            ...exp
          }))
        }))
      }

      // Pre-fill skills
      if (parsedData.skills) {
        setFormData(prev => ({
          ...prev,
          skills: {
            technical: parsedData.skills.technical || [],
            soft: parsedData.skills.soft || [],
            languages: parsedData.skills.languages || [],
            certifications: parsedData.skills.certifications || []
          }
        }))
      }

      // Pre-fill projects
      if (parsedData.projects && Array.isArray(parsedData.projects)) {
        setFormData(prev => ({
          ...prev,
          projects: parsedData.projects.map(project => ({
            id: Date.now() + Math.random(),
            ...project
          }))
        }))
      }

      // Pre-fill activities
      if (parsedData.activities && Array.isArray(parsedData.activities)) {
        setFormData(prev => ({
          ...prev,
          activities: parsedData.activities.map(activity => ({
            id: Date.now() + Math.random(),
            ...activity
          }))
        }))
      }

      // Pre-fill awards
      if (parsedData.awards && Array.isArray(parsedData.awards)) {
        setFormData(prev => ({
          ...prev,
          awards: parsedData.awards.map(award => ({
            id: Date.now() + Math.random(),
            ...award
          }))
        }))
      }

      console.log('Form pre-filled with parsed resume data')
    } catch (error) {
      console.error('Error pre-filling form:', error)
    }
  }

  const exportResume = async (format) => {
    setIsLoading(true)
    try {
      const result = await exportService.exportResume(formData, format)
      if (result.success) {
        console.log('Resume exported successfully')
      } else {
        console.error('Export failed:', result.message)
      }
    } catch (error) {
      console.error('Export error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // AI Generation Functions
  const generateAIContent = async (sectionType, inputData, targetField) => {
    setIsLoading(true)
    try {
      const context = {
        careerField: formData.setup.careerField || 'General',
        experienceLevel: formData.setup.experienceLevel || 'Entry Level',
        targetRole: formData.setup.targetRole || 'General Position',
        industry: formData.setup.industry || 'General'
      }

      const result = await geminiAIService.generateResumeContent(sectionType, inputData, context)
      
      if (result.success) {
        // Update the specific field with AI-generated content
        if (targetField.includes('.')) {
          const [section, field] = targetField.split('.')
          updateFormData(section, field, result.content)
        } else {
          // Handle array updates for experience, projects, etc.
          const [section, index, field] = targetField.split('.')
          if (index !== undefined && field !== undefined) {
            updateArrayData(section, parseInt(index), field, result.content)
          }
        }
        
        console.log('AI content generated successfully')
      } else {
        console.error('AI generation failed:', result.error)
      }
    } catch (error) {
      console.error('AI generation error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateProfessionalSummary = async () => {
    const inputData = {
      fullName: formData.personalInfo.fullName,
      currentRole: formData.setup.currentRole || 'Job Seeker',
      yearsExperience: formData.setup.yearsExperience || 'New Graduate',
      keySkills: Object.values(formData.skills).flat().slice(0, 5).join(', '),
      careerGoals: formData.setup.careerGoals || 'Career advancement'
    }
    
    await generateAIContent('professional_summary', inputData, 'personalInfo.professionalSummary')
  }

  const generateJobDescription = async (experienceIndex) => {
    const experience = formData.experience[experienceIndex]
    if (!experience) return

    const inputData = {
      jobTitle: experience.jobTitle,
      company: experience.companyName,
      employmentType: experience.employmentType,
      startDate: experience.startDate,
      endDate: experience.endDate,
      isCurrent: experience.isCurrent,
      basicDescription: experience.description
    }
    
    await generateAIContent('job_description', inputData, `experience.${experienceIndex}.description`)
  }

  const generateAchievements = async (experienceIndex) => {
    const experience = formData.experience[experienceIndex]
    if (!experience) return

    const inputData = {
      jobTitle: experience.jobTitle,
      company: experience.companyName,
      responsibilities: experience.description,
      projects: 'Various projects and initiatives',
      skills: Object.values(formData.skills).flat().join(', ')
    }
    
    await generateAIContent('achievements', inputData, `experience.${experienceIndex}.achievements`)
  }

  const generateProjectDescription = async (projectIndex) => {
    const project = formData.projects[projectIndex]
    if (!project) return

    const inputData = {
      projectName: project.projectName,
      projectType: project.projectType,
      technologies: project.technologiesUsed,
      basicDescription: project.description,
      role: 'Developer/Contributor'
    }
    
    await generateAIContent('project_description', inputData, `projects.${projectIndex}.description`)
  }

  const generateActivityDescription = async (activityIndex) => {
    const activity = formData.activities[activityIndex]
    if (!activity) return

    const inputData = {
      activityName: activity.activityName,
      organization: activity.organization,
      role: activity.role,
      activityType: activity.activityType,
      basicDescription: activity.description
    }
    
    await generateAIContent('activity_description', inputData, `activities.${activityIndex}.description`)
  }

  const generateSkillSuggestions = async () => {
    setIsLoading(true)
    try {
      const careerField = formData.setup.careerField || 'General'
      const experienceLevel = formData.setup.experienceLevel || 'Entry Level'
      const currentSkills = Object.values(formData.skills).flat()

      const result = await geminiAIService.generateSkillSuggestions(careerField, experienceLevel, currentSkills)
      
      if (result.success && result.suggestions) {
        // Show suggestions to user (you could implement a modal or suggestion panel)
        console.log('Skill suggestions:', result.suggestions)
        // For now, we'll just log the suggestions
        // In a full implementation, you'd show these in a modal for user selection
      }
    } catch (error) {
      console.error('Skill suggestions error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const analyzeResumeATS = async () => {
    setIsLoading(true)
    try {
      const targetRole = formData.setup.targetRole || 'General Position'
      const result = await geminiAIService.analyzeResumeForATS(formData, targetRole)
      
      if (result.success) {
        console.log('ATS Analysis:', result.analysis)
        // In a full implementation, you'd show this analysis in a modal or dedicated section
      }
    } catch (error) {
      console.error('ATS analysis error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepContent = () => {
    const aiHelpers = {
      generateJobDescription,
      generateAchievements,
      generateProjectDescription,
      generateActivityDescription,
      generateSkillSuggestions,
      analyzeResumeATS,
      isLoading
    }

    switch (currentStep) {
      case 'setup':
        return renderSetupStep()
      case 'personalInfo':
        return renderPersonalInfoStep()
      case 'education':
        return renderEducationStep(formData, updateFormData, addArrayItem, removeArrayItem, updateArrayData, aiHelpers)
      case 'experience':
        return renderExperienceStep(formData, updateFormData, addArrayItem, removeArrayItem, updateArrayData, aiHelpers)
      case 'skills':
        return renderSkillsStep(formData, updateFormData, addSkill, removeSkill, aiHelpers)
      case 'projects':
        return renderProjectsStep(formData, updateFormData, addArrayItem, removeArrayItem, updateArrayData, aiHelpers)
      case 'activities':
        return renderActivitiesStep(formData, updateFormData, addArrayItem, removeArrayItem, updateArrayData, aiHelpers)
      case 'awards':
        return renderAwardsStep(formData, updateFormData, addArrayItem, removeArrayItem, updateArrayData, aiHelpers)
      case 'references':
        return renderReferencesStep(formData, updateFormData, addArrayItem, removeArrayItem, updateReferenceData)
      case 'review':
        return renderReviewStep(formData, exportResume, analyzeResumeATS)
      default:
        return renderSetupStep()
    }
  }

  const renderSetupStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Setup Your Resume</h2>
        <p className="text-gray-600">Choose a template, upload an existing resume (optional), and provide career context for AI assistance</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Resume Title</label>
          <Input
            placeholder="e.g., Software Engineer Resume"
            value={formData.setup.resumeTitle}
            onChange={(e) => updateFormData('setup', 'resumeTitle', e.target.value)}
          />
        </div>

        {/* Career Context for AI */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-blue-900 mb-3 flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            Career Context for AI Assistance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Career Field</label>
              <Select
                value={formData.setup.careerField}
                onValueChange={(value) => updateFormData('setup', 'careerField', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select career field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
              <Select
                value={formData.setup.experienceLevel}
                onValueChange={(value) => updateFormData('setup', 'experienceLevel', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="junior">Junior (1-2 years)</SelectItem>
                  <SelectItem value="mid">Mid-Level (3-5 years)</SelectItem>
                  <SelectItem value="senior">Senior (5-8 years)</SelectItem>
                  <SelectItem value="lead">Lead/Principal (8+ years)</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Role</label>
              <Input
                placeholder="e.g., Software Engineer, Marketing Manager"
                value={formData.setup.targetRole}
                onChange={(e) => updateFormData('setup', 'targetRole', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
              <Input
                placeholder="e.g., Fintech, Healthcare, E-commerce"
                value={formData.setup.industry}
                onChange={(e) => updateFormData('setup', 'industry', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Role/Status</label>
              <Input
                placeholder="e.g., Student, Software Developer, Job Seeker"
                value={formData.setup.currentRole}
                onChange={(e) => updateFormData('setup', 'currentRole', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
              <Input
                placeholder="e.g., 3 years, New Graduate"
                value={formData.setup.yearsExperience}
                onChange={(e) => updateFormData('setup', 'yearsExperience', e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Career Goals</label>
              <Input
                placeholder="e.g., Transition to senior role, Enter tech industry"
                value={formData.setup.careerGoals}
                onChange={(e) => updateFormData('setup', 'careerGoals', e.target.value)}
              />
            </div>
          </div>
          <p className="text-sm text-blue-600 mt-2">This information helps our AI generate more relevant and personalized content for your resume.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Existing Resume (Optional)</label>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label htmlFor="resume-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> your existing resume
                  </p>
                  <p className="text-xs text-gray-500">PDF, DOC, or DOCX (MAX. 10MB)</p>
                </div>
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            {formData.setup.uploadedFile && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700">
                  ✓ Uploaded: {formData.setup.uploadedFile.name}
                </p>
              </div>
            )}
            <p className="text-sm text-gray-600 text-center">
              Upload your existing resume to auto-populate fields
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Choose Template</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedTemplate === template.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => {
                  setSelectedTemplate(template.id)
                  updateFormData('setup', 'template', template.id)
                }}
              >
                <h3 className="font-medium text-gray-900">{template.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{template.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderPersonalInfoStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Enter your contact details and professional summary</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <Input
            placeholder="John Doe"
            value={formData.personalInfo.fullName}
            onChange={(e) => updateFormData('personalInfo', 'fullName', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <Input
            type="email"
            placeholder="john.doe@email.com"
            value={formData.personalInfo.email}
            onChange={(e) => updateFormData('personalInfo', 'email', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <Input
            placeholder="+61 400 000 000"
            value={formData.personalInfo.phone}
            onChange={(e) => updateFormData('personalInfo', 'phone', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
          <Input
            placeholder="https://linkedin.com/in/johndoe"
            value={formData.personalInfo.linkedinUrl}
            onChange={(e) => updateFormData('personalInfo', 'linkedinUrl', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio URL</label>
          <Input
            placeholder="https://johndoe.com"
            value={formData.personalInfo.portfolioUrl}
            onChange={(e) => updateFormData('personalInfo', 'portfolioUrl', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
          <Input
            placeholder="https://github.com/johndoe"
            value={formData.personalInfo.githubUrl}
            onChange={(e) => updateFormData('personalInfo', 'githubUrl', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
        <Input
          placeholder="123 Main Street"
          value={formData.personalInfo.address}
          onChange={(e) => updateFormData('personalInfo', 'address', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <Input
            placeholder="Sydney"
            value={formData.personalInfo.city}
            onChange={(e) => updateFormData('personalInfo', 'city', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
          <Select
            value={formData.personalInfo.state}
            onValueChange={(value) => updateFormData('personalInfo', 'state', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NSW">New South Wales</SelectItem>
              <SelectItem value="VIC">Victoria</SelectItem>
              <SelectItem value="QLD">Queensland</SelectItem>
              <SelectItem value="WA">Western Australia</SelectItem>
              <SelectItem value="SA">South Australia</SelectItem>
              <SelectItem value="TAS">Tasmania</SelectItem>
              <SelectItem value="ACT">Australian Capital Territory</SelectItem>
              <SelectItem value="NT">Northern Territory</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
          <Input
            placeholder="2000"
            value={formData.personalInfo.postalCode}
            onChange={(e) => updateFormData('personalInfo', 'postalCode', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
          <Input
            placeholder="Australia"
            value={formData.personalInfo.country}
            onChange={(e) => updateFormData('personalInfo', 'country', e.target.value)}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">Professional Summary (Optional)</label>
          <Button
            variant="outline"
            size="sm"
            onClick={generateProfessionalSummary}
            disabled={isLoading}
            className="flex items-center"
          >
            <Wand2 className="h-4 w-4 mr-2" />
            {isLoading ? 'Generating...' : 'Generate with AI'}
          </Button>
        </div>
        <Textarea
          placeholder="A brief summary of your professional background and career objectives..."
          rows={4}
          value={formData.personalInfo.professionalSummary}
          onChange={(e) => updateFormData('personalInfo', 'professionalSummary', e.target.value)}
        />
        <p className="text-sm text-gray-500 mt-1">2-3 sentences highlighting your key qualifications and career goals</p>
      </div>
    </div>
  )

  // Continue with other step rendering functions...
  // Due to length constraints, I'll create separate files for the remaining steps

   return (
    <div className="min-h-screen bg-gray-50">
      {/* Full-width hero header - EXACTLY like SOP Builder */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-6 py-16 text-center">
          <div className="flex items-center justify-center mb-4">
            <FileText className="h-12 w-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Resume Builder</h1>
          </div>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Create professional resumes with AI assistance and expert guidance
          </p>
        </div>
      </div>

      {/* Main layout with sidebar - EXACTLY like CareerInsightsPage */}
      <div className="flex">
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen} 
          onMobileMenuClose={onMobileMenuClose} 
        />
        
        {/* Main Content Area */}
        <main className="flex-1 w-full md:w-auto transition-all duration-300">
          {/* Progress Section */}
          <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Progress</h2>
                <span className="text-sm text-gray-600">
                  {getCurrentStepIndex() + 1} of {steps.length}
                </span>
              </div>
              <Progress value={getProgress()} className="mb-6" />
              
              {/* Step Navigation */}
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = step.id === currentStep
                  const isCompleted = getCurrentStepIndex() > index
                  
                  return (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStep(step.id)}
                      className={`p-3 rounded-lg text-center transition-all ${
                        isActive
                          ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                          : isCompleted
                          ? 'bg-green-100 text-green-700 border-2 border-green-300'
                          : 'bg-gray-100 text-gray-600 border-2 border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="h-6 w-6 mx-auto mb-1" />
                      <div className="text-xs font-medium">{step.title}</div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Processing...</p>
                  </div>
                </div>
              ) : (
                renderStepContent()
              )}
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  const currentIndex = getCurrentStepIndex()
                  if (currentIndex > 0) {
                    setCurrentStep(steps[currentIndex - 1].id)
                  }
                }}
                disabled={getCurrentStepIndex() === 0}
              >
                Previous
              </Button>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                <Button
                  onClick={() => {
                    const currentIndex = getCurrentStepIndex()
                    if (currentIndex < steps.length - 1) {
                      setCurrentStep(steps[currentIndex + 1].id)
                    }
                  }}
                  disabled={getCurrentStepIndex() === steps.length - 1}
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

export default ResumeBuilder

