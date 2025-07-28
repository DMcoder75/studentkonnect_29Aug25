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
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Target,
  User,
  GraduationCap,
  MapPin,
  DollarSign,
  Calendar,
  Award,
  TrendingUp,
  Lightbulb,
  Search,
  Filter,
  RefreshCw,
  BookOpen,
  Users,
  Globe,
  Heart,
  Zap,
  Star,
  Info,
  ArrowRight,
  CheckSquare,
  AlertCircle
} from 'lucide-react'
import Sidebar from './Sidebar'

export default function EligibilityChecker({ isMobileMenuOpen, onMobileMenuClose }) {
  const [studentProfile, setStudentProfile] = useState({
    academicLevel: '',
    gpa: '',
    gpaScale: '7.0',
    fieldOfStudy: '',
    currentYear: '',
    graduationYear: '',
    institutionName: '',
    locationState: '',
    citizenshipStatus: '',
    indigenousStatus: false,
    firstGeneration: false,
    financialNeedLevel: '',
    householdIncome: '',
    gender: '',
    age: '',
    languages: [],
    extracurriculars: [],
    achievements: [],
    volunteerHours: '',
    workExperience: '',
    sportsLevel: '',
    disabilityStatus: false
  })

  const [eligibilityResults, setEligibilityResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [profileComplete, setProfileComplete] = useState(false)
  const [selectedScholarship, setSelectedScholarship] = useState(null)
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    checkProfileCompleteness()
  }, [studentProfile])

  const checkProfileCompleteness = () => {
    const requiredFields = [
      'academicLevel', 'gpa', 'fieldOfStudy', 'currentYear', 
      'institutionName', 'locationState', 'citizenshipStatus'
    ]
    
    const completedFields = requiredFields.filter(field => 
      studentProfile[field] && studentProfile[field].toString().trim() !== ''
    )
    
    const completionPercentage = (completedFields.length / requiredFields.length) * 100
    setProfileComplete(completionPercentage >= 80)
  }

  const runEligibilityCheck = async () => {
    if (!profileComplete) {
      alert('Please complete your profile first')
      return
    }

    try {
      setLoading(true)
      
      // Mock eligibility check - in real app would use AI service and database
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockResults = [
        {
          scholarshipId: '1',
          scholarshipName: 'Women in STEM Excellence Scholarship',
          provider: 'Tech Industry Foundation',
          amount: 10000,
          eligibilityStatus: 'highly_eligible',
          eligibilityScore: 95,
          matchReasons: [
            'Female gender matches requirement',
            'STEM field of study requirement met',
            'GPA exceeds minimum requirement (6.2 > 5.0)',
            'Undergraduate level matches criteria'
          ],
          missingCriteria: [],
          improvementSuggestions: [
            'Consider highlighting leadership experience in STEM contexts',
            'Document any relevant project work or internships'
          ],
          deadline: '2024-08-31',
          tags: ['women', 'stem', 'merit-based']
        },
        {
          scholarshipId: '2',
          scholarshipName: 'Australian Government Research Training Program',
          provider: 'Australian Government',
          amount: 28854,
          eligibilityStatus: 'partially_eligible',
          eligibilityScore: 65,
          matchReasons: [
            'Australian citizenship requirement met',
            'Strong academic performance (GPA 6.2/7.0)'
          ],
          missingCriteria: [
            'Requires postgraduate enrollment (currently undergraduate)',
            'Research proposal required for application'
          ],
          improvementSuggestions: [
            'Consider applying after completing undergraduate degree',
            'Start developing research interests and connect with potential supervisors',
            'Maintain high GPA for future eligibility'
          ],
          deadline: '2024-10-31',
          tags: ['research', 'postgraduate', 'government']
        },
        {
          scholarshipId: '3',
          scholarshipName: 'Rural and Regional Student Support',
          provider: 'Regional Education Foundation',
          amount: 8000,
          eligibilityStatus: 'not_eligible',
          eligibilityScore: 25,
          matchReasons: [
            'Australian citizenship requirement met',
            'Enrolled in eligible program'
          ],
          missingCriteria: [
            'Requires rural/regional area residence',
            'Demonstrated financial need required'
          ],
          improvementSuggestions: [
            'This scholarship is specifically for rural/regional students',
            'Consider other need-based scholarships if financial support is needed'
          ],
          deadline: '2024-12-31',
          tags: ['rural', 'regional', 'need-based']
        },
        {
          scholarshipId: '4',
          scholarshipName: 'First Generation University Student Grant',
          provider: 'Education Access Foundation',
          amount: 5000,
          eligibilityStatus: 'eligible',
          eligibilityScore: 85,
          matchReasons: [
            'First-generation university student status',
            'Academic merit demonstrated',
            'Enrolled in eligible program'
          ],
          missingCriteria: [
            'Financial need assessment required'
          ],
          improvementSuggestions: [
            'Complete financial need documentation',
            'Prepare personal statement about first-generation experience'
          ],
          deadline: '2024-10-31',
          tags: ['first-generation', 'equity', 'access']
        },
        {
          scholarshipId: '5',
          scholarshipName: 'International Student Excellence Award',
          provider: 'Global Education Partners',
          amount: 20000,
          eligibilityStatus: 'not_eligible',
          eligibilityScore: 15,
          matchReasons: [
            'Strong academic performance',
            'Enrolled in eligible program'
          ],
          missingCriteria: [
            'Requires international student status',
            'Community involvement documentation needed'
          ],
          improvementSuggestions: [
            'This scholarship is specifically for international students',
            'Consider domestic student scholarships instead'
          ],
          deadline: '2024-07-15',
          tags: ['international', 'excellence', 'merit-based']
        }
      ]
      
      setEligibilityResults(mockResults)
      setActiveTab('results')
    } catch (error) {
      console.error('Error running eligibility check:', error)
    } finally {
      setLoading(false)
    }
  }

  const getEligibilityColor = (status) => {
    switch (status) {
      case 'highly_eligible': return 'text-green-600'
      case 'eligible': return 'text-blue-600'
      case 'partially_eligible': return 'text-yellow-600'
      case 'not_eligible': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getEligibilityBadgeColor = (status) => {
    switch (status) {
      case 'highly_eligible': return 'bg-green-100 text-green-700'
      case 'eligible': return 'bg-blue-100 text-blue-700'
      case 'partially_eligible': return 'bg-yellow-100 text-yellow-700'
      case 'not_eligible': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getEligibilityIcon = (status) => {
    switch (status) {
      case 'highly_eligible': return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case 'eligible': return <CheckCircle2 className="h-5 w-5 text-blue-600" />
      case 'partially_eligible': return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case 'not_eligible': return <XCircle className="h-5 w-5 text-red-600" />
      default: return <AlertCircle className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'highly_eligible': return 'Highly Eligible'
      case 'eligible': return 'Eligible'
      case 'partially_eligible': return 'Partially Eligible'
      case 'not_eligible': return 'Not Eligible'
      default: return 'Unknown'
    }
  }

  const updateProfile = (field, value) => {
    setStudentProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addToArray = (field, value) => {
    if (value.trim()) {
      setStudentProfile(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }))
    }
  }

  const removeFromArray = (field, index) => {
    setStudentProfile(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const getDaysUntilDeadline = (deadline) => {
    const now = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getDeadlineColor = (days) => {
    if (days <= 7) return 'text-red-600'
    if (days <= 30) return 'text-orange-600'
    return 'text-green-600'
  }

  return (
    <div className="w-full">
      {/* Hero Section - Full Width */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-12 w-full">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              Eligibility Checker
            </h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
              Automatically assess your eligibility for scholarships based on your academic profile and personal circumstances.
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
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Student Profile</TabsTrigger>
                <TabsTrigger value="results">Eligibility Results</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>

              {/* Student Profile Tab */}
              <TabsContent value="profile">
                <div className="space-y-6">
                  {/* Profile Completion Status */}
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <User className="h-5 w-5 mr-2 text-purple-600" />
                        Profile Completion
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-600">Complete your profile to get accurate eligibility results</span>
                        <span className="font-medium">
                          {Math.round((Object.values(studentProfile).filter(v => v && v.toString().trim() !== '').length / Object.keys(studentProfile).length) * 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={(Object.values(studentProfile).filter(v => v && v.toString().trim() !== '').length / Object.keys(studentProfile).length) * 100} 
                        className="mb-4" 
                      />
                      <Button 
                        onClick={runEligibilityCheck}
                        disabled={!profileComplete || loading}
                        className="w-full"
                      >
                        {loading ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Checking Eligibility...
                          </>
                        ) : (
                          <>
                            <Target className="h-4 w-4 mr-2" />
                            Run Eligibility Check
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Academic Information */}
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                        Academic Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="academicLevel">Academic Level *</Label>
                          <Select value={studentProfile.academicLevel} onValueChange={(value) => updateProfile('academicLevel', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="undergraduate">Undergraduate</SelectItem>
                              <SelectItem value="postgraduate">Postgraduate</SelectItem>
                              <SelectItem value="phd">PhD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="fieldOfStudy">Field of Study *</Label>
                          <Input
                            id="fieldOfStudy"
                            value={studentProfile.fieldOfStudy}
                            onChange={(e) => updateProfile('fieldOfStudy', e.target.value)}
                            placeholder="e.g., Computer Science"
                          />
                        </div>

                        <div>
                          <Label htmlFor="gpa">GPA *</Label>
                          <div className="flex gap-2">
                            <Input
                              id="gpa"
                              type="number"
                              step="0.1"
                              value={studentProfile.gpa}
                              onChange={(e) => updateProfile('gpa', e.target.value)}
                              placeholder="6.2"
                              className="flex-1"
                            />
                            <Select value={studentProfile.gpaScale} onValueChange={(value) => updateProfile('gpaScale', value)}>
                              <SelectTrigger className="w-20">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="4.0">4.0</SelectItem>
                                <SelectItem value="7.0">7.0</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="currentYear">Current Year *</Label>
                          <Select value={studentProfile.currentYear} onValueChange={(value) => updateProfile('currentYear', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Year 1</SelectItem>
                              <SelectItem value="2">Year 2</SelectItem>
                              <SelectItem value="3">Year 3</SelectItem>
                              <SelectItem value="4">Year 4</SelectItem>
                              <SelectItem value="5+">Year 5+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="graduationYear">Expected Graduation Year</Label>
                          <Input
                            id="graduationYear"
                            type="number"
                            value={studentProfile.graduationYear}
                            onChange={(e) => updateProfile('graduationYear', e.target.value)}
                            placeholder="2025"
                          />
                        </div>

                        <div>
                          <Label htmlFor="institutionName">Institution Name *</Label>
                          <Input
                            id="institutionName"
                            value={studentProfile.institutionName}
                            onChange={(e) => updateProfile('institutionName', e.target.value)}
                            placeholder="University of Sydney"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Personal Information */}
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <User className="h-5 w-5 mr-2 text-green-600" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="citizenshipStatus">Citizenship Status *</Label>
                          <Select value={studentProfile.citizenshipStatus} onValueChange={(value) => updateProfile('citizenshipStatus', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Australian">Australian Citizen</SelectItem>
                              <SelectItem value="Permanent Resident">Permanent Resident</SelectItem>
                              <SelectItem value="New Zealand">New Zealand Citizen</SelectItem>
                              <SelectItem value="International">International Student</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="locationState">State/Territory *</Label>
                          <Select value={studentProfile.locationState} onValueChange={(value) => updateProfile('locationState', value)}>
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
                          <Label htmlFor="gender">Gender</Label>
                          <Select value={studentProfile.gender} onValueChange={(value) => updateProfile('gender', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Non-binary">Non-binary</SelectItem>
                              <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="age">Age</Label>
                          <Input
                            id="age"
                            type="number"
                            value={studentProfile.age}
                            onChange={(e) => updateProfile('age', e.target.value)}
                            placeholder="20"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="indigenousStatus"
                            checked={studentProfile.indigenousStatus}
                            onCheckedChange={(checked) => updateProfile('indigenousStatus', checked)}
                          />
                          <Label htmlFor="indigenousStatus">I identify as Aboriginal or Torres Strait Islander</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="firstGeneration"
                            checked={studentProfile.firstGeneration}
                            onCheckedChange={(checked) => updateProfile('firstGeneration', checked)}
                          />
                          <Label htmlFor="firstGeneration">I am the first in my family to attend university</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="disabilityStatus"
                            checked={studentProfile.disabilityStatus}
                            onCheckedChange={(checked) => updateProfile('disabilityStatus', checked)}
                          />
                          <Label htmlFor="disabilityStatus">I have a disability</Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Financial Information */}
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-2 text-yellow-600" />
                        Financial Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="financialNeedLevel">Financial Need Level</Label>
                          <Select value={studentProfile.financialNeedLevel} onValueChange={(value) => updateProfile('financialNeedLevel', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="critical">Critical</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="householdIncome">Household Income Bracket</Label>
                          <Select value={studentProfile.householdIncome} onValueChange={(value) => updateProfile('householdIncome', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select bracket" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under_20k">Under $20,000</SelectItem>
                              <SelectItem value="20k_40k">$20,000 - $40,000</SelectItem>
                              <SelectItem value="40k_60k">$40,000 - $60,000</SelectItem>
                              <SelectItem value="60k_80k">$60,000 - $80,000</SelectItem>
                              <SelectItem value="80k_100k">$80,000 - $100,000</SelectItem>
                              <SelectItem value="over_100k">Over $100,000</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Additional Information */}
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Award className="h-5 w-5 mr-2 text-purple-600" />
                        Additional Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="volunteerHours">Volunteer Hours (per year)</Label>
                          <Input
                            id="volunteerHours"
                            type="number"
                            value={studentProfile.volunteerHours}
                            onChange={(e) => updateProfile('volunteerHours', e.target.value)}
                            placeholder="50"
                          />
                        </div>

                        <div>
                          <Label htmlFor="workExperience">Work Experience (years)</Label>
                          <Input
                            id="workExperience"
                            type="number"
                            step="0.5"
                            value={studentProfile.workExperience}
                            onChange={(e) => updateProfile('workExperience', e.target.value)}
                            placeholder="1.5"
                          />
                        </div>

                        <div>
                          <Label htmlFor="sportsLevel">Sports Competition Level</Label>
                          <Select value={studentProfile.sportsLevel} onValueChange={(value) => updateProfile('sportsLevel', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="local">Local</SelectItem>
                              <SelectItem value="regional">Regional</SelectItem>
                              <SelectItem value="state">State</SelectItem>
                              <SelectItem value="national">National</SelectItem>
                              <SelectItem value="international">International</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Eligibility Results Tab */}
              <TabsContent value="results">
                {eligibilityResults.length > 0 ? (
                  <div className="space-y-6">
                    {/* Results Summary */}
                    <Card className="shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Target className="h-5 w-5 mr-2 text-purple-600" />
                          Eligibility Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600 mb-1">
                              {eligibilityResults.filter(r => r.eligibilityStatus === 'highly_eligible' || r.eligibilityStatus === 'eligible').length}
                            </div>
                            <div className="text-sm text-gray-600">Eligible</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600 mb-1">
                              {eligibilityResults.filter(r => r.eligibilityStatus === 'partially_eligible').length}
                            </div>
                            <div className="text-sm text-gray-600">Partially Eligible</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-600 mb-1">
                              {eligibilityResults.filter(r => r.eligibilityStatus === 'not_eligible').length}
                            </div>
                            <div className="text-sm text-gray-600">Not Eligible</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600 mb-1">
                              ${eligibilityResults
                                .filter(r => r.eligibilityStatus === 'highly_eligible' || r.eligibilityStatus === 'eligible')
                                .reduce((sum, r) => sum + r.amount, 0)
                                .toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">Potential Value</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Individual Results */}
                    <div className="space-y-4">
                      {eligibilityResults
                        .sort((a, b) => b.eligibilityScore - a.eligibilityScore)
                        .map((result) => {
                          const daysUntilDeadline = getDaysUntilDeadline(result.deadline)
                          
                          return (
                            <Card key={result.scholarshipId} className="shadow-lg border-0">
                              <CardHeader>
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center">
                                    {getEligibilityIcon(result.eligibilityStatus)}
                                    <div className="ml-3">
                                      <CardTitle className="text-lg">{result.scholarshipName}</CardTitle>
                                      <p className="text-gray-600">{result.provider}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge className={getEligibilityBadgeColor(result.eligibilityStatus)}>
                                      {getStatusText(result.eligibilityStatus)}
                                    </Badge>
                                    <div className="text-right">
                                      <div className="font-semibold text-green-600">
                                        ${result.amount.toLocaleString()}
                                      </div>
                                      <div className={`text-sm ${getDeadlineColor(daysUntilDeadline)}`}>
                                        {daysUntilDeadline > 0 ? `${daysUntilDeadline} days left` : 'Deadline passed'}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  {/* Eligibility Score */}
                                  <div>
                                    <div className="flex justify-between items-center mb-2">
                                      <span className="text-sm font-medium">Eligibility Score</span>
                                      <span className="text-sm font-bold">{result.eligibilityScore}%</span>
                                    </div>
                                    <Progress value={result.eligibilityScore} className="h-2" />
                                  </div>

                                  {/* Match Reasons */}
                                  {result.matchReasons.length > 0 && (
                                    <div>
                                      <h4 className="font-medium text-green-700 mb-2 flex items-center">
                                        <CheckCircle2 className="h-4 w-4 mr-1" />
                                        Why You Match
                                      </h4>
                                      <ul className="space-y-1">
                                        {result.matchReasons.map((reason, index) => (
                                          <li key={index} className="text-sm text-green-600 flex items-start">
                                            <CheckCircle2 className="h-3 w-3 mr-2 mt-0.5 flex-shrink-0" />
                                            {reason}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Missing Criteria */}
                                  {result.missingCriteria.length > 0 && (
                                    <div>
                                      <h4 className="font-medium text-red-700 mb-2 flex items-center">
                                        <XCircle className="h-4 w-4 mr-1" />
                                        Missing Requirements
                                      </h4>
                                      <ul className="space-y-1">
                                        {result.missingCriteria.map((criteria, index) => (
                                          <li key={index} className="text-sm text-red-600 flex items-start">
                                            <XCircle className="h-3 w-3 mr-2 mt-0.5 flex-shrink-0" />
                                            {criteria}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Improvement Suggestions */}
                                  {result.improvementSuggestions.length > 0 && (
                                    <div>
                                      <h4 className="font-medium text-blue-700 mb-2 flex items-center">
                                        <Lightbulb className="h-4 w-4 mr-1" />
                                        Suggestions for Improvement
                                      </h4>
                                      <ul className="space-y-1">
                                        {result.improvementSuggestions.map((suggestion, index) => (
                                          <li key={index} className="text-sm text-blue-600 flex items-start">
                                            <Lightbulb className="h-3 w-3 mr-2 mt-0.5 flex-shrink-0" />
                                            {suggestion}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Tags */}
                                  <div className="flex flex-wrap gap-1">
                                    {result.tags.map((tag) => (
                                      <Badge key={tag} variant="secondary" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>

                                  {/* Actions */}
                                  <div className="flex gap-2 pt-2">
                                    {(result.eligibilityStatus === 'highly_eligible' || result.eligibilityStatus === 'eligible') && (
                                      <Button size="sm">
                                        <ArrowRight className="h-4 w-4 mr-1" />
                                        Start Application
                                      </Button>
                                    )}
                                    <Button variant="outline" size="sm">
                                      <Info className="h-4 w-4 mr-1" />
                                      View Details
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      <Heart className="h-4 w-4 mr-1" />
                                      Bookmark
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )
                        })}
                    </div>
                  </div>
                ) : (
                  <Card className="shadow-lg border-0">
                    <CardContent className="text-center py-12">
                      <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">No Eligibility Results</h3>
                      <p className="text-gray-600 mb-4">
                        Complete your profile and run the eligibility check to see your scholarship matches.
                      </p>
                      <Button onClick={() => setActiveTab('profile')}>
                        Complete Profile
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Recommendations Tab */}
              <TabsContent value="recommendations">
                <div className="space-y-6">
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
                        Personalized Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h3 className="font-semibold text-blue-800 mb-2">Profile Optimization</h3>
                          <ul className="space-y-2 text-sm text-blue-700">
                            <li className="flex items-start">
                              <Star className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                              Consider adding more extracurricular activities to strengthen your profile
                            </li>
                            <li className="flex items-start">
                              <Star className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                              Document your volunteer work and community involvement
                            </li>
                            <li className="flex items-start">
                              <Star className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                              Maintain or improve your GPA for better scholarship eligibility
                            </li>
                          </ul>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                          <h3 className="font-semibold text-green-800 mb-2">Application Strategy</h3>
                          <ul className="space-y-2 text-sm text-green-700">
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                              Focus on scholarships where you have high eligibility scores (80%+)
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                              Apply early to scholarships with approaching deadlines
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                              Use AI assistance for essay writing and application optimization
                            </li>
                          </ul>
                        </div>

                        <div className="p-4 bg-yellow-50 rounded-lg">
                          <h3 className="font-semibold text-yellow-800 mb-2">Future Opportunities</h3>
                          <ul className="space-y-2 text-sm text-yellow-700">
                            <li className="flex items-start">
                              <TrendingUp className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                              Research postgraduate scholarships for future study plans
                            </li>
                            <li className="flex items-start">
                              <TrendingUp className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                              Consider developing research interests for research-based scholarships
                            </li>
                            <li className="flex items-start">
                              <TrendingUp className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                              Build leadership experience for leadership-focused scholarships
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

