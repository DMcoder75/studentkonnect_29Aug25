import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  User, 
  GraduationCap, 
  Globe, 
  MessageCircle, 
  Target, 
  Calendar,
  Star,
  Save,
  ChevronRight,
  ChevronLeft,
  CheckCircle
} from 'lucide-react'
import Sidebar from './Sidebar'

export default function StudentProfileForm({ onComplete, initialData = {}, isMobileMenuOpen, onMobileMenuClose }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [profileData, setProfileData] = useState({
    // Personal Information (from users table)
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '', // from students table
    currentLocation: '', // from students table (location field)
    
    // Academic Information (from students table)
    currentEducationLevel: '', // degree_level
    currentGPA: '', // gpa
    testScores: {
      ielts: '', // ielts_score
      toefl: '', // toefl_score
      sat: '', // sat_score
      gre: '', // gre_score
      gmat: '', // gmat_score
      other: ''
    },
    
    // Additional Academic Info (from student_profiles table)
    currentInstitution: '', // current_institution
    graduationYear: '', // graduation_year
    academicAchievements: '', // achievements
    extracurricularActivities: '', // extracurricular_activities
    
    // Study Goals (from students table)
    intendedFieldOfStudy: '', // field_of_study
    studyLevel: '', // degree_level
    targetUniversity: '', // target_university
    preferredCountries: [], // target_country
    preferredLocation: '', // from student_profiles table
    universityPreferences: '', // from student_profiles table
    budgetRange: '', // budget_range
    timeline: '', // start_year
    intakePreference: '', // intake_preference
    scholarshipInterest: false, // scholarship_interest
    
    // Career Goals (from student_profiles table)
    careerInterests: '', // career_interests
    careerGoals: '',
    
    // Counseling Preferences
    counselingAreas: [],
    urgencyLevel: '',
    preferredCommunication: '',
    additionalInfo: '', // application_status or additional notes
    
    ...initialData
  })

  const totalSteps = 6
  const progress = (currentStep / totalSteps) * 100

  const countries = [
    'Australia', 'Canada', 'United States', 'United Kingdom', 
    'Germany', 'France', 'Netherlands', 'Sweden', 'New Zealand', 'Singapore'
  ]

  const fieldsOfStudy = [
    'Engineering', 'Computer Science', 'Business & Management', 'Medicine', 
    'Law', 'Psychology', 'Education', 'Arts & Humanities', 'Sciences', 
    'Architecture', 'Design', 'Nursing', 'Social Work', 'Environmental Studies'
  ]

  const counselingAreas = [
    'University Admissions', 'Visa & Immigration', 'Scholarship Applications',
    'Career Guidance', 'Academic Planning', 'Test Preparation',
    'Personal Statement Writing', 'Interview Preparation', 'Financial Planning'
  ]

  const communicationStyles = [
    'Direct & Structured', 'Supportive & Encouraging', 'Detailed & Analytical',
    'Creative & Flexible', 'Goal-Oriented & Practical'
  ]

  const updateProfileData = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateNestedData = (parent, field, value) => {
    setProfileData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }))
  }

  const toggleArrayItem = (field, item) => {
    setProfileData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const saveProfile = () => {
    // Save to localStorage and call onComplete
    localStorage.setItem('studentProfile', JSON.stringify(profileData))
    if (onComplete) {
      onComplete(profileData)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
              <p className="text-gray-600">Let's start with your basic details</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={profileData.firstName}
                  onChange={(e) => updateProfileData('firstName', e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={profileData.lastName}
                  onChange={(e) => updateProfileData('lastName', e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => updateProfileData('email', e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => updateProfileData('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={(e) => updateProfileData('dateOfBirth', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  value={profileData.nationality}
                  onChange={(e) => updateProfileData('nationality', e.target.value)}
                  placeholder="e.g., Indian, American, British"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="currentLocation">Current Location</Label>
              <Input
                id="currentLocation"
                value={profileData.currentLocation}
                onChange={(e) => updateProfileData('currentLocation', e.target.value)}
                placeholder="City, Country"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <GraduationCap className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">Academic Background</h3>
              <p className="text-gray-600">Tell us about your academic achievements</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currentEducationLevel">Current Education Level *</Label>
                <Select onValueChange={(value) => updateProfileData('currentEducationLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                    <SelectItem value="postgraduate">Postgraduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="currentInstitution">Current Institution</Label>
                <Input
                  id="currentInstitution"
                  value={profileData.currentInstitution}
                  onChange={(e) => updateProfileData('currentInstitution', e.target.value)}
                  placeholder="e.g., Delhi Public School, Mumbai University"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currentGPA">Current GPA/Grade</Label>
                <Input
                  id="currentGPA"
                  value={profileData.currentGPA}
                  onChange={(e) => updateProfileData('currentGPA', e.target.value)}
                  placeholder="e.g., 3.8/4.0 or 85%"
                />
              </div>
              <div>
                <Label htmlFor="graduationYear">Expected Graduation Year</Label>
                <Input
                  id="graduationYear"
                  type="number"
                  value={profileData.graduationYear}
                  onChange={(e) => updateProfileData('graduationYear', e.target.value)}
                  placeholder="e.g., 2025"
                  min="2024"
                  max="2030"
                />
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold">Test Scores</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                <div>
                  <Label htmlFor="ielts">IELTS</Label>
                  <Input
                    id="ielts"
                    value={profileData.testScores.ielts}
                    onChange={(e) => updateNestedData('testScores', 'ielts', e.target.value)}
                    placeholder="e.g., 7.5"
                  />
                </div>
                <div>
                  <Label htmlFor="toefl">TOEFL</Label>
                  <Input
                    id="toefl"
                    value={profileData.testScores.toefl}
                    onChange={(e) => updateNestedData('testScores', 'toefl', e.target.value)}
                    placeholder="e.g., 105"
                  />
                </div>
                <div>
                  <Label htmlFor="sat">SAT</Label>
                  <Input
                    id="sat"
                    value={profileData.testScores.sat}
                    onChange={(e) => updateNestedData('testScores', 'sat', e.target.value)}
                    placeholder="e.g., 1450"
                  />
                </div>
                <div>
                  <Label htmlFor="gre">GRE</Label>
                  <Input
                    id="gre"
                    value={profileData.testScores.gre}
                    onChange={(e) => updateNestedData('testScores', 'gre', e.target.value)}
                    placeholder="e.g., 320"
                  />
                </div>
                <div>
                  <Label htmlFor="gmat">GMAT</Label>
                  <Input
                    id="gmat"
                    value={profileData.testScores.gmat}
                    onChange={(e) => updateNestedData('testScores', 'gmat', e.target.value)}
                    placeholder="e.g., 720"
                  />
                </div>
                <div>
                  <Label htmlFor="other">Other</Label>
                  <Input
                    id="other"
                    value={profileData.testScores.other}
                    onChange={(e) => updateNestedData('testScores', 'other', e.target.value)}
                    placeholder="Specify test & score"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="academicAchievements">Academic Achievements & Awards</Label>
              <Textarea
                id="academicAchievements"
                value={profileData.academicAchievements}
                onChange={(e) => updateProfileData('academicAchievements', e.target.value)}
                placeholder="List your academic achievements, awards, honors, publications, etc."
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="extracurricularActivities">Extracurricular Activities</Label>
              <Textarea
                id="extracurricularActivities"
                value={profileData.extracurricularActivities}
                onChange={(e) => updateProfileData('extracurricularActivities', e.target.value)}
                placeholder="Describe your extracurricular activities, leadership roles, volunteer work, sports, clubs, etc."
                rows={4}
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Target className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">Career & Study Goals</h3>
              <p className="text-gray-600">What are your academic and career aspirations?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="intendedFieldOfStudy">Intended Field of Study *</Label>
                <Select onValueChange={(value) => updateProfileData('intendedFieldOfStudy', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select field of study" />
                  </SelectTrigger>
                  <SelectContent>
                    {fieldsOfStudy.map(field => (
                      <SelectItem key={field} value={field}>{field}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="studyLevel">Study Level *</Label>
                <Select onValueChange={(value) => updateProfileData('studyLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select study level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                    <SelectItem value="masters">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD/Doctorate</SelectItem>
                    <SelectItem value="diploma">Diploma/Certificate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="careerGoals">Career Goals & Aspirations</Label>
              <Textarea
                id="careerGoals"
                value={profileData.careerGoals}
                onChange={(e) => updateProfileData('careerGoals', e.target.value)}
                placeholder="Describe your long-term career goals and how your intended studies will help achieve them"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="careerInterests">Career Interests</Label>
              <Textarea
                id="careerInterests"
                value={profileData.careerInterests}
                onChange={(e) => updateProfileData('careerInterests', e.target.value)}
                placeholder="List specific career paths, industries, or job roles you're interested in (e.g., Software Engineering, Investment Banking, Research)"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="preferredStartDate">Preferred Start Date</Label>
              <Input
                id="preferredStartDate"
                type="month"
                value={profileData.preferredStartDate}
                onChange={(e) => updateProfileData('preferredStartDate', e.target.value)}
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Globe className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">Study Preferences</h3>
              <p className="text-gray-600">Where would you like to study?</p>
            </div>
            
            <div>
              <Label className="text-base font-semibold">Preferred Countries *</Label>
              <p className="text-sm text-gray-600 mb-3">Select all countries you're interested in</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {countries.map(country => (
                  <div key={country} className="flex items-center space-x-2">
                    <Checkbox
                      id={country}
                      checked={profileData.preferredCountries.includes(country)}
                      onCheckedChange={() => toggleArrayItem('preferredCountries', country)}
                    />
                    <Label htmlFor={country} className="text-sm">{country}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="preferredLocation">Preferred Study Location</Label>
              <Input
                id="preferredLocation"
                value={profileData.preferredLocation}
                onChange={(e) => updateProfileData('preferredLocation', e.target.value)}
                placeholder="e.g., Sydney, Toronto, London, or any specific city/region preference"
              />
            </div>

            <div>
              <Label htmlFor="universityPreferences">University Preferences</Label>
              <Textarea
                id="universityPreferences"
                value={profileData.universityPreferences}
                onChange={(e) => updateProfileData('universityPreferences', e.target.value)}
                placeholder="List specific universities you're interested in, or describe your preferences (e.g., research-focused, large campus, specific rankings)"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budgetRange">Budget Range (Annual)</Label>
                <Select onValueChange={(value) => updateProfileData('budgetRange', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-20k">Under $20,000</SelectItem>
                    <SelectItem value="20k-40k">$20,000 - $40,000</SelectItem>
                    <SelectItem value="40k-60k">$40,000 - $60,000</SelectItem>
                    <SelectItem value="60k-80k">$60,000 - $80,000</SelectItem>
                    <SelectItem value="over-80k">Over $80,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2 mt-6">
                <Checkbox
                  id="scholarshipInterest"
                  checked={profileData.scholarshipInterest}
                  onCheckedChange={(checked) => updateProfileData('scholarshipInterest', checked)}
                />
                <Label htmlFor="scholarshipInterest">Interested in scholarships</Label>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <MessageCircle className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">Communication Preferences</h3>
              <p className="text-gray-600">How would you like to communicate with counselors?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nativeLanguage">Native Language</Label>
                <Input
                  id="nativeLanguage"
                  value={profileData.nativeLanguage}
                  onChange={(e) => updateProfileData('nativeLanguage', e.target.value)}
                  placeholder="e.g., Hindi, Mandarin, Spanish"
                />
              </div>
              <div>
                <Label htmlFor="englishProficiency">English Proficiency</Label>
                <Select onValueChange={(value) => updateProfileData('englishProficiency', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select proficiency level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="native">Native</SelectItem>
                    <SelectItem value="fluent">Fluent</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="otherLanguages">Other Languages</Label>
              <Input
                id="otherLanguages"
                value={profileData.otherLanguages.join(', ')}
                onChange={(e) => updateProfileData('otherLanguages', e.target.value.split(', ').filter(l => l.trim()))}
                placeholder="List other languages you speak (comma-separated)"
              />
            </div>

            <div>
              <Label htmlFor="preferredCommunicationStyle">Preferred Communication Style</Label>
              <Select onValueChange={(value) => updateProfileData('preferredCommunicationStyle', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select communication style" />
                </SelectTrigger>
                <SelectContent>
                  {communicationStyles.map(style => (
                    <SelectItem key={style} value={style}>{style}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                value={profileData.timezone}
                onChange={(e) => updateProfileData('timezone', e.target.value)}
                placeholder="e.g., GMT+5:30, EST, PST"
              />
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Star className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">Counseling Needs & Availability</h3>
              <p className="text-gray-600">What kind of support do you need?</p>
            </div>
            
            <div>
              <Label className="text-base font-semibold">Areas Where You Need Counseling *</Label>
              <p className="text-sm text-gray-600 mb-3">Select all areas where you need guidance</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {counselingAreas.map(area => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={area}
                      checked={profileData.counselingAreas.includes(area)}
                      onCheckedChange={() => toggleArrayItem('counselingAreas', area)}
                    />
                    <Label htmlFor={area} className="text-sm">{area}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="specificChallenges">Specific Challenges or Questions</Label>
              <Textarea
                id="specificChallenges"
                value={profileData.specificChallenges}
                onChange={(e) => updateProfileData('specificChallenges', e.target.value)}
                placeholder="Describe any specific challenges you're facing or questions you have"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="urgencyLevel">Urgency Level</Label>
                <Select onValueChange={(value) => updateProfileData('urgencyLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate (within 1 week)</SelectItem>
                    <SelectItem value="soon">Soon (within 1 month)</SelectItem>
                    <SelectItem value="flexible">Flexible (within 3 months)</SelectItem>
                    <SelectItem value="planning">Long-term planning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="previousCounselingExperience">Previous Counseling Experience</Label>
                <Select onValueChange={(value) => updateProfileData('previousCounselingExperience', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No previous experience</SelectItem>
                    <SelectItem value="some">Some experience</SelectItem>
                    <SelectItem value="extensive">Extensive experience</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="extracurriculars">Extracurricular Activities & Interests</Label>
              <Textarea
                id="extracurriculars"
                value={profileData.extracurriculars}
                onChange={(e) => updateProfileData('extracurriculars', e.target.value)}
                placeholder="List your hobbies, sports, volunteer work, leadership roles, etc."
                rows={3}
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-12 w-full">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <User className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                My Profile
              </h1>
            </div>
            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
              Complete your profile to get matched with the perfect counselor
            </p>
          </div>
        </div>
      </section>

      {/* Two-Column Layout */}
      <div className="flex">
        <Sidebar 
          isOpen={true}
          onClose={() => {}}
          isHomepage={false}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={onMobileMenuClose}
        />

        <main className="flex-1 w-full md:w-auto transition-all duration-300">
          <div className="container mx-auto px-6 py-12">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-xl border-0">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">
                    Student Profile Setup
                  </CardTitle>
                  <p className="text-gray-600 mt-2">
                    Help us understand your goals and preferences
                  </p>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {renderStep()}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={saveProfile}
                className="flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Progress
              </Button>
              
              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 flex items-center"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={saveProfile}
                  className="bg-gradient-to-r from-green-600 to-blue-500 hover:from-green-700 hover:to-blue-600 flex items-center"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete Profile
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

