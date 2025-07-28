import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  User,
  GraduationCap,
  MapPin,
  DollarSign,
  Calendar,
  Award,
  TrendingUp,
  Shield,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Star,
  Users,
  Target,
  FileText,
  Camera,
  Phone,
  Mail,
  Globe,
  Briefcase,
  CreditCard,
  Settings,
  Eye,
  Lock,
  Zap
} from 'lucide-react'
import Sidebar from './Sidebar'

export default function CounselorRegistration({ isMobileMenuOpen, onMobileMenuClose }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    phone: '',
    countryCode: '+61',
    profileImage: null,
    bio: '',
    
    // Professional Information
    counselorType: '',
    yearsExperience: '',
    specializations: [],
    languagesSpoken: [],
    timeZone: 'Australia/Sydney',
    
    // Credentials and Verification
    credentials: [],
    
    // Service Information
    hourlyRate: '',
    currency: 'AUD',
    commissionType: 'per_lead',
    commissionRate: '',
    maxActiveStudents: '20',
    
    // Availability
    availability: {
      monday: { available: false, startTime: '09:00', endTime: '17:00' },
      tuesday: { available: false, startTime: '09:00', endTime: '17:00' },
      wednesday: { available: false, startTime: '09:00', endTime: '17:00' },
      thursday: { available: false, startTime: '09:00', endTime: '17:00' },
      friday: { available: false, startTime: '09:00', endTime: '17:00' },
      saturday: { available: false, startTime: '09:00', endTime: '17:00' },
      sunday: { available: false, startTime: '09:00', endTime: '17:00' }
    },
    
    // Geographic Coverage
    coverage: [],
    
    // Performance Tracking Setup
    performanceGoals: {
      monthlyLeadTarget: '',
      responseTimeTarget: '2', // hours
      satisfactionTarget: '4.5', // out of 5
      conversionTarget: '70' // percentage
    },
    
    // Terms and Agreements
    agreeToTerms: false,
    agreeToPerformanceTracking: false,
    agreeToPublicProfile: false
  })

  const [uploadedFiles, setUploadedFiles] = useState({})
  const [validationErrors, setValidationErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const counselorTypes = [
    { value: 'migration_agent', label: 'Migration Agent (MARA Registered)' },
    { value: 'education_counselor', label: 'Education Counselor' },
    { value: 'university_representative', label: 'University Representative' },
    { value: 'independent_consultant', label: 'Independent Consultant' },
    { value: 'visa_specialist', label: 'Visa Specialist' }
  ]

  const specializationOptions = [
    { value: 'undergraduate', label: 'Undergraduate Programs' },
    { value: 'postgraduate', label: 'Postgraduate Programs' },
    { value: 'phd', label: 'PhD & Research Programs' },
    { value: 'vocational', label: 'Vocational Education (VET)' },
    { value: 'english_language', label: 'English Language Programs' },
    { value: 'visa_immigration', label: 'Visa & Immigration' },
    { value: 'scholarships', label: 'Scholarships & Funding' },
    { value: 'career_guidance', label: 'Career Guidance' }
  ]

  const languageOptions = [
    'English', 'Mandarin', 'Hindi', 'Spanish', 'Arabic', 'French', 
    'German', 'Japanese', 'Korean', 'Vietnamese', 'Thai', 'Indonesian',
    'Portuguese', 'Russian', 'Italian', 'Dutch', 'Other'
  ]

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Professional Details', icon: Briefcase },
    { id: 3, title: 'Credentials & Verification', icon: Shield },
    { id: 4, title: 'Service & Pricing', icon: DollarSign },
    { id: 5, title: 'Availability & Coverage', icon: Calendar },
    { id: 6, title: 'Performance Tracking', icon: TrendingUp },
    { id: 7, title: 'Review & Submit', icon: CheckCircle2 }
  ]

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateNestedFormData = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const addToArray = (field, value) => {
    if (value && !formData[field].includes(value)) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value]
      }))
    }
  }

  const removeFromArray = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter(item => item !== value)
    }))
  }

  const addCredential = () => {
    const newCredential = {
      id: Date.now(),
      type: '',
      name: '',
      organization: '',
      number: '',
      issueDate: '',
      expiryDate: '',
      document: null
    }
    setFormData(prev => ({
      ...prev,
      credentials: [...prev.credentials, newCredential]
    }))
  }

  const updateCredential = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      credentials: prev.credentials.map(cred => 
        cred.id === id ? { ...cred, [field]: value } : cred
      )
    }))
  }

  const removeCredential = (id) => {
    setFormData(prev => ({
      ...prev,
      credentials: prev.credentials.filter(cred => cred.id !== id)
    }))
  }

  const addCoverage = () => {
    const newCoverage = {
      id: Date.now(),
      country: 'Australia',
      state: '',
      city: '',
      isPrimary: false
    }
    setFormData(prev => ({
      ...prev,
      coverage: [...prev.coverage, newCoverage]
    }))
  }

  const updateCoverage = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      coverage: prev.coverage.map(cov => 
        cov.id === id ? { ...cov, [field]: value } : cov
      )
    }))
  }

  const removeCoverage = (id) => {
    setFormData(prev => ({
      ...prev,
      coverage: prev.coverage.filter(cov => cov.id !== id)
    }))
  }

  const handleFileUpload = (field, file) => {
    setUploadedFiles(prev => ({
      ...prev,
      [field]: file
    }))
  }

  const validateStep = (step) => {
    const errors = {}
    
    switch (step) {
      case 1:
        if (!formData.firstName) errors.firstName = 'First name is required'
        if (!formData.lastName) errors.lastName = 'Last name is required'
        if (!formData.email) errors.email = 'Email is required'
        if (!formData.phone) errors.phone = 'Phone number is required'
        break
      case 2:
        if (!formData.counselorType) errors.counselorType = 'Counselor type is required'
        if (!formData.yearsExperience) errors.yearsExperience = 'Years of experience is required'
        if (formData.specializations.length === 0) errors.specializations = 'At least one specialization is required'
        break
      case 3:
        if (formData.credentials.length === 0) errors.credentials = 'At least one credential is required'
        break
      case 4:
        if (!formData.hourlyRate) errors.hourlyRate = 'Hourly rate is required'
        break
      case 6:
        if (!formData.agreeToPerformanceTracking) errors.agreeToPerformanceTracking = 'Performance tracking agreement is required'
        break
      case 7:
        if (!formData.agreeToTerms) errors.agreeToTerms = 'Terms agreement is required'
        break
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 7))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(7)) return
    
    setIsSubmitting(true)
    try {
      // Here you would submit to your backend API
      console.log('Submitting counselor registration:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('Registration submitted successfully! You will receive an email confirmation shortly.')
    } catch (error) {
      console.error('Registration error:', error)
      alert('Registration failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getCompletionPercentage = () => {
    const totalSteps = 7
    return Math.round((currentStep / totalSteps) * 100)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      placeholder="John"
                      className={validationErrors.firstName ? 'border-red-500' : ''}
                    />
                    {validationErrors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      placeholder="Smith"
                      className={validationErrors.lastName ? 'border-red-500' : ''}
                    />
                    {validationErrors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.lastName}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="displayName">Display Name (Optional)</Label>
                    <Input
                      id="displayName"
                      value={formData.displayName}
                      onChange={(e) => updateFormData('displayName', e.target.value)}
                      placeholder="John S. - Education Expert"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      placeholder="john.smith@example.com"
                      className={validationErrors.email ? 'border-red-500' : ''}
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="flex gap-2">
                      <Select value={formData.countryCode} onValueChange={(value) => updateFormData('countryCode', value)}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+61">+61</SelectItem>
                          <SelectItem value="+1">+1</SelectItem>
                          <SelectItem value="+44">+44</SelectItem>
                          <SelectItem value="+91">+91</SelectItem>
                          <SelectItem value="+86">+86</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        placeholder="412 345 678"
                        className={`flex-1 ${validationErrors.phone ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {validationErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="timeZone">Time Zone</Label>
                    <Select value={formData.timeZone} onValueChange={(value) => updateFormData('timeZone', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Australia/Sydney">Australia/Sydney (AEDT)</SelectItem>
                        <SelectItem value="Australia/Melbourne">Australia/Melbourne (AEDT)</SelectItem>
                        <SelectItem value="Australia/Brisbane">Australia/Brisbane (AEST)</SelectItem>
                        <SelectItem value="Australia/Perth">Australia/Perth (AWST)</SelectItem>
                        <SelectItem value="Australia/Adelaide">Australia/Adelaide (ACDT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="profileImage">Profile Image</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                      {uploadedFiles.profileImage ? (
                        <img 
                          src={URL.createObjectURL(uploadedFiles.profileImage)} 
                          alt="Profile" 
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <Camera className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        id="profileImageUpload"
                        accept="image/*"
                        onChange={(e) => handleFileUpload('profileImage', e.target.files[0])}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('profileImageUpload').click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Photo
                      </Button>
                      <p className="text-sm text-gray-600 mt-1">JPG, PNG up to 5MB</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => updateFormData('bio', e.target.value)}
                    placeholder="Tell students about your background, expertise, and how you can help them achieve their education goals..."
                    rows={4}
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    {formData.bio.length}/500 characters
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-green-600" />
                  Professional Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="counselorType">Counselor Type *</Label>
                    <Select 
                      value={formData.counselorType} 
                      onValueChange={(value) => updateFormData('counselorType', value)}
                    >
                      <SelectTrigger className={validationErrors.counselorType ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select counselor type" />
                      </SelectTrigger>
                      <SelectContent>
                        {counselorTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {validationErrors.counselorType && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.counselorType}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="yearsExperience">Years of Experience *</Label>
                    <Input
                      id="yearsExperience"
                      type="number"
                      value={formData.yearsExperience}
                      onChange={(e) => updateFormData('yearsExperience', e.target.value)}
                      placeholder="5"
                      min="0"
                      max="50"
                      className={validationErrors.yearsExperience ? 'border-red-500' : ''}
                    />
                    {validationErrors.yearsExperience && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.yearsExperience}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Specializations *</Label>
                  <div className="grid md:grid-cols-2 gap-2 mt-2">
                    {specializationOptions.map((spec) => (
                      <div key={spec.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={spec.value}
                          checked={formData.specializations.includes(spec.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              addToArray('specializations', spec.value)
                            } else {
                              removeFromArray('specializations', spec.value)
                            }
                          }}
                        />
                        <Label htmlFor={spec.value} className="text-sm">
                          {spec.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {validationErrors.specializations && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.specializations}</p>
                  )}
                </div>

                <div>
                  <Label>Languages Spoken</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.languagesSpoken.map((lang) => (
                      <Badge key={lang} variant="secondary" className="flex items-center gap-1">
                        {lang}
                        <button
                          type="button"
                          onClick={() => removeFromArray('languagesSpoken', lang)}
                          className="ml-1 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <Select onValueChange={(value) => addToArray('languagesSpoken', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Add a language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languageOptions
                        .filter(lang => !formData.languagesSpoken.includes(lang))
                        .map((lang) => (
                          <SelectItem key={lang} value={lang}>
                            {lang}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                  Performance Tracking & Credibility
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Set your performance goals and agree to transparent tracking for platform credibility
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Performance Goals */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Performance Goals & Targets
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="monthlyLeadTarget">Monthly Lead Target</Label>
                      <Input
                        id="monthlyLeadTarget"
                        type="number"
                        value={formData.performanceGoals.monthlyLeadTarget}
                        onChange={(e) => updateNestedFormData('performanceGoals', 'monthlyLeadTarget', e.target.value)}
                        placeholder="20"
                        min="1"
                        max="100"
                      />
                      <p className="text-sm text-gray-600 mt-1">Number of new students you aim to help monthly</p>
                    </div>

                    <div>
                      <Label htmlFor="responseTimeTarget">Response Time Target (hours)</Label>
                      <Input
                        id="responseTimeTarget"
                        type="number"
                        value={formData.performanceGoals.responseTimeTarget}
                        onChange={(e) => updateNestedFormData('performanceGoals', 'responseTimeTarget', e.target.value)}
                        placeholder="2"
                        min="0.5"
                        max="24"
                        step="0.5"
                      />
                      <p className="text-sm text-gray-600 mt-1">Maximum time to respond to student inquiries</p>
                    </div>

                    <div>
                      <Label htmlFor="satisfactionTarget">Satisfaction Rating Target</Label>
                      <Select 
                        value={formData.performanceGoals.satisfactionTarget} 
                        onValueChange={(value) => updateNestedFormData('performanceGoals', 'satisfactionTarget', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4.0">4.0+ Stars</SelectItem>
                          <SelectItem value="4.2">4.2+ Stars</SelectItem>
                          <SelectItem value="4.5">4.5+ Stars</SelectItem>
                          <SelectItem value="4.7">4.7+ Stars</SelectItem>
                          <SelectItem value="4.9">4.9+ Stars</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-600 mt-1">Minimum average rating from student reviews</p>
                    </div>

                    <div>
                      <Label htmlFor="conversionTarget">Success Rate Target (%)</Label>
                      <Input
                        id="conversionTarget"
                        type="number"
                        value={formData.performanceGoals.conversionTarget}
                        onChange={(e) => updateNestedFormData('performanceGoals', 'conversionTarget', e.target.value)}
                        placeholder="70"
                        min="50"
                        max="100"
                      />
                      <p className="text-sm text-gray-600 mt-1">Percentage of students achieving their goals</p>
                    </div>
                  </div>
                </div>

                {/* Credibility Features */}
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Credibility & Transparency Features
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Real-time Performance Dashboard</p>
                        <p className="text-sm text-gray-600">Your performance metrics will be displayed on your public profile</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Student Success Tracking</p>
                        <p className="text-sm text-gray-600">Track university acceptances, visa approvals, and scholarship awards</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Verified Reviews System</p>
                        <p className="text-sm text-gray-600">Only students you've worked with can leave reviews</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Response Time Monitoring</p>
                        <p className="text-sm text-gray-600">Automatic tracking of communication response times</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Tracking Agreement */}
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold text-yellow-800 mb-3 flex items-center">
                    <Eye className="h-5 w-5 mr-2" />
                    Performance Tracking Agreement
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToPerformanceTracking"
                        checked={formData.agreeToPerformanceTracking}
                        onCheckedChange={(checked) => updateFormData('agreeToPerformanceTracking', checked)}
                        className={validationErrors.agreeToPerformanceTracking ? 'border-red-500' : ''}
                      />
                      <Label htmlFor="agreeToPerformanceTracking" className="text-sm leading-relaxed">
                        I agree to transparent performance tracking and understand that my metrics will be publicly displayed to maintain platform credibility. This includes response times, student satisfaction ratings, success rates, and verified reviews.
                      </Label>
                    </div>
                    {validationErrors.agreeToPerformanceTracking && (
                      <p className="text-red-500 text-sm">{validationErrors.agreeToPerformanceTracking}</p>
                    )}

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToPublicProfile"
                        checked={formData.agreeToPublicProfile}
                        onCheckedChange={(checked) => updateFormData('agreeToPublicProfile', checked)}
                      />
                      <Label htmlFor="agreeToPublicProfile" className="text-sm leading-relaxed">
                        I agree to have my profile, credentials, and performance metrics displayed publicly to help students make informed decisions.
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Quality Standards */}
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-800 mb-3 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Quality Standards & Consequences
                  </h3>
                  <div className="space-y-2 text-sm text-red-700">
                    <p>• Counselors with satisfaction ratings below 3.5 stars will receive performance warnings</p>
                    <p>• Response times consistently above 24 hours may result in reduced lead allocation</p>
                    <p>• Success rates below 50% will trigger a performance review</p>
                    <p>• Verified complaints or misconduct may result in account suspension</p>
                    <p>• All performance data is updated in real-time and visible to students</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" />
                  Review & Submit Application
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Application Summary */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-800">Personal Information</h3>
                      <p className="text-gray-600">{formData.firstName} {formData.lastName}</p>
                      <p className="text-gray-600">{formData.email}</p>
                      <p className="text-gray-600">{formData.countryCode} {formData.phone}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800">Professional Details</h3>
                      <p className="text-gray-600">
                        {counselorTypes.find(t => t.value === formData.counselorType)?.label}
                      </p>
                      <p className="text-gray-600">{formData.yearsExperience} years experience</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {formData.specializations.map(spec => (
                          <Badge key={spec} variant="secondary" className="text-xs">
                            {specializationOptions.find(s => s.value === spec)?.label}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800">Service Information</h3>
                      <p className="text-gray-600">${formData.hourlyRate} {formData.currency}/hour</p>
                      <p className="text-gray-600">Max {formData.maxActiveStudents} active students</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-800">Performance Goals</h3>
                      <p className="text-gray-600">Monthly Target: {formData.performanceGoals.monthlyLeadTarget} students</p>
                      <p className="text-gray-600">Response Time: {formData.performanceGoals.responseTimeTarget} hours</p>
                      <p className="text-gray-600">Satisfaction Target: {formData.performanceGoals.satisfactionTarget}+ stars</p>
                      <p className="text-gray-600">Success Rate: {formData.performanceGoals.conversionTarget}%</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800">Credentials</h3>
                      <p className="text-gray-600">{formData.credentials.length} credential(s) uploaded</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800">Coverage Areas</h3>
                      <p className="text-gray-600">{formData.coverage.length} location(s) covered</p>
                    </div>
                  </div>
                </div>

                {/* Final Agreements */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Final Agreements</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => updateFormData('agreeToTerms', checked)}
                        className={validationErrors.agreeToTerms ? 'border-red-500' : ''}
                      />
                      <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                        I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
                      </Label>
                    </div>
                    {validationErrors.agreeToTerms && (
                      <p className="text-red-500 text-sm">{validationErrors.agreeToTerms}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-8 py-3 text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="h-5 w-5 mr-2 animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-5 w-5 mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">
                    Your application will be reviewed within 2-3 business days
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return <div>Step content not implemented</div>
    }
  }

  return (
    <div className="w-full">
      {/* Hero Section - Full Width */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 text-white py-12 w-full">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              Join as a Counselor
            </h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
              Help students achieve their education dreams while building your practice with transparent performance tracking and credibility.
            </p>
          </div>
        </div>
      </section>

      {/* Two-Column Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={true}
          onClose={() => {}}
          isHomepage={false}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={onMobileMenuClose}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full md:w-auto transition-all duration-300">
          <div className="container mx-auto px-6 py-12">
            
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Counselor Registration</h2>
                <div className="text-sm text-gray-600">
                  Step {currentStep} of {steps.length}
                </div>
              </div>
              <Progress value={getCompletionPercentage()} className="mb-4" />
              
              {/* Step Navigation */}
              <div className="flex flex-wrap gap-2">
                {steps.map((step) => {
                  const StepIcon = step.icon
                  return (
                    <div
                      key={step.id}
                      className={`flex items-center px-3 py-2 rounded-lg text-sm ${
                        currentStep === step.id
                          ? 'bg-blue-100 text-blue-700 border border-blue-300'
                          : currentStep > step.id
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <StepIcon className="h-4 w-4 mr-2" />
                      {step.title}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Step Content */}
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < 7 ? (
                <Button onClick={nextStep}>
                  Next
                </Button>
              ) : null}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

