import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calculator, 
  TrendingUp, 
  BookOpen, 
  Target, 
  Award,
  Plus,
  Minus,
  Info,
  CheckCircle,
  AlertCircle,
  GraduationCap,
  BarChart3,
  MapPin
} from 'lucide-react'
import Sidebar from './Sidebar'

export default function ATARCalculatorPage({ isMobileMenuOpen, onMobileMenuClose }) {
  const [subjects, setSubjects] = useState([
    { id: 1, name: '', grade: '', scaledScore: 0, isEnglish: false }
  ])
  const [calculatedATAR, setCalculatedATAR] = useState(null)
  const [recommendedCourses, setRecommendedCourses] = useState([])
  const [allCourses, setAllCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('calculator')
  const [availableSubjects, setAvailableSubjects] = useState([])
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('')
  const [availableJurisdictions, setAvailableJurisdictions] = useState([])

  // Jurisdiction display names
  const jurisdictionNames = {
    'NSW-HSC': 'NSW (HSC)',
    'VIC-VCE': 'VIC (VCE)',
    'QLD-QCAA': 'QLD (QCAA)',
    'SA-SACE': 'SA (SACE)',
    'WA-WACE': 'WA (WACE)',
    'TAS-TASC': 'TAS (TASC)'
  }

  // Australian subject list with scaling factors (fallback if database fails)
  const fallbackSubjects = [
    { name: 'English (Standard)', scaling: 1.0, isEnglish: true },
    { name: 'English (Advanced)', scaling: 1.05, isEnglish: true },
    { name: 'English Extension 1', scaling: 1.1, isEnglish: true },
    { name: 'English Extension 2', scaling: 1.15, isEnglish: true },
    { name: 'Mathematics (Standard)', scaling: 1.0 },
    { name: 'Mathematics (Advanced)', scaling: 1.05 },
    { name: 'Mathematics Extension 1', scaling: 1.1 },
    { name: 'Mathematics Extension 2', scaling: 1.15 },
    { name: 'Physics', scaling: 1.05 },
    { name: 'Chemistry', scaling: 1.05 },
    { name: 'Biology', scaling: 1.0 },
    { name: 'Economics', scaling: 1.0 },
    { name: 'Business Studies', scaling: 0.95 },
    { name: 'Legal Studies', scaling: 0.95 },
    { name: 'Modern History', scaling: 1.0 },
    { name: 'Ancient History', scaling: 1.0 },
    { name: 'Geography', scaling: 0.95 },
    { name: 'Visual Arts', scaling: 0.9 },
    { name: 'Music', scaling: 0.95 },
    { name: 'Drama', scaling: 0.9 },
    { name: 'Design and Technology', scaling: 0.9 },
    { name: 'Information Technology', scaling: 0.95 },
    { name: 'Software Design & Development', scaling: 1.0 },
    { name: 'Personal Development, Health & PE', scaling: 0.85 },
    { name: 'Food Technology', scaling: 0.85 },
    { name: 'Textiles and Design', scaling: 0.85 }
  ]

  // Get scaling and English status for a subject
  const getSubjectData = (subjectName) => {
    const fallback = fallbackSubjects.find(s => s.name === subjectName)
    return fallback || { scaling: 1.0, isEnglish: false }
  }

  // Grade to mark conversion
  const gradeToMark = {
    'A': 90,
    'B': 80,
    'C': 70,
    'D': 60,
    'E': 50,
    'F': 40
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch courses
        setAllCourses(coursesData)
        
        // Fetch available jurisdictions
        console.log('Fetched jurisdictions:', jurisdictionsData)
        setAvailableJurisdictions(jurisdictionsData)
        
        // Set default jurisdiction to NSW-HSC if available
        if (jurisdictionsData.length > 0) {
          const defaultJurisdiction = jurisdictionsData.includes('NSW-HSC') ? 'NSW-HSC' : jurisdictionsData[0]
          setSelectedJurisdiction(defaultJurisdiction)
        }
        
      } catch (error) {
        console.error('Error fetching initial data:', error)
      }
    }
    fetchInitialData()
  }, [])

  // Organize subjects: key subjects first, then languages
  const organizeSubjects = (subjects) => {
    if (!subjects || subjects.length === 0) return []
    
    // Define key subjects that should appear first
    const keySubjectKeywords = [
      'english', 'mathematics', 'math', 'biology', 'chemistry', 'physics', 
      'history', 'geography', 'economics', 'business', 'accounting', 
      'psychology', 'sociology', 'philosophy', 'art', 'music', 'drama',
      'computing', 'information', 'technology', 'science', 'studies'
    ]
    
    // Define language keywords
    const languageKeywords = [
      'chinese', 'japanese', 'korean', 'french', 'german', 'italian', 'spanish',
      'arabic', 'hindi', 'indonesian', 'vietnamese', 'greek', 'latin',
      'albanian', 'armenian', 'bosnian', 'bulgarian', 'croatian', 'dutch',
      'hebrew', 'hungarian', 'macedonian', 'polish', 'portuguese', 'russian',
      'serbian', 'slovenian', 'turkish', 'ukrainian', 'auslan'
    ]
    
    const keySubjects = []
    const languageSubjects = []
    const otherSubjects = []
    
    subjects.forEach(subject => {
      const subjectNameLower = subject.name.toLowerCase()
      
      // Check if it's a language subject
      const isLanguage = languageKeywords.some(keyword => 
        subjectNameLower.includes(keyword)
      )
      
      // Check if it's a key subject
      const isKeySubject = keySubjectKeywords.some(keyword => 
        subjectNameLower.includes(keyword)
      )
      
      if (isLanguage) {
        languageSubjects.push(subject)
      } else if (isKeySubject) {
        keySubjects.push(subject)
      } else {
        otherSubjects.push(subject)
      }
    })
    
    // Sort each category alphabetically
    keySubjects.sort((a, b) => a.name.localeCompare(b.name))
    languageSubjects.sort((a, b) => a.name.localeCompare(b.name))
    otherSubjects.sort((a, b) => a.name.localeCompare(b.name))
    
    // Return organized subjects: key subjects first, then others, then languages
    return [...keySubjects, ...otherSubjects, ...languageSubjects]
  }

  // Fetch subjects when jurisdiction changes
  useEffect(() => {
    const fetchSubjects = async () => {
      if (!selectedJurisdiction) return
      
      try {
        // Fetch subjects for selected jurisdiction
        console.log(`Fetched subjects for ${selectedJurisdiction}:`, subjectsData)
        
        if (subjectsData && subjectsData.length > 0) {
          // Map database subjects to include scaling and English status
          const mappedSubjects = subjectsData.map(dbSubject => {
            const subjectData = getSubjectData(dbSubject.name)
            return {
              name: dbSubject.name,
              code: dbSubject.code,
              jurisdiction: dbSubject.jurisdiction,
              scaling: subjectData.scaling,
              isEnglish: subjectData.isEnglish
            }
          })
          
          // Organize subjects: key subjects first, then languages
          const organizedSubjects = organizeSubjects(mappedSubjects)
          setAvailableSubjects(organizedSubjects)
          console.log(`Using ${organizedSubjects.length} organized subjects from database for ${selectedJurisdiction}`)
        } else {
          // Fallback to hardcoded subjects if database is empty
          const organizedFallback = organizeSubjects(fallbackSubjects)
          setAvailableSubjects(organizedFallback)
          console.log('Using organized fallback subjects')
        }
        
        // Reset subjects when jurisdiction changes
        setSubjects([{ id: 1, name: '', grade: '', scaledScore: 0, isEnglish: false }])
        setCalculatedATAR(null)
        setRecommendedCourses([])
        
      } catch (error) {
        console.error('Error fetching subjects:', error)
        // Use fallback subjects on error
        setAvailableSubjects(fallbackSubjects)
        console.log('Using fallback subjects due to error')
      }
    }
    
    fetchSubjects()
  }, [selectedJurisdiction])

  const addSubject = () => {
    const newId = Math.max(...subjects.map(s => s.id)) + 1
    setSubjects([...subjects, { id: newId, name: '', grade: '', scaledScore: 0, isEnglish: false }])
  }

  const removeSubject = (id) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter(s => s.id !== id))
    }
  }

  const updateSubject = (id, field, value) => {
    setSubjects(subjects.map(subject => {
      if (subject.id === id) {
        const updated = { ...subject, [field]: value }
        
        if (field === 'name') {
          const subjectData = availableSubjects.find(s => s.name === value)
          updated.isEnglish = subjectData?.isEnglish || false
        }
        
        if (field === 'grade' || field === 'name') {
          updated.scaledScore = calculateScaledScore(updated.name, updated.grade)
        }
        
        return updated
      }
      return subject
    }))
  }

  const calculateScaledScore = (subjectName, grade) => {
    if (!subjectName || !grade) return 0
    
    const subject = availableSubjects.find(s => s.name === subjectName)
    const baseMark = gradeToMark[grade] || 0
    const scaling = subject?.scaling || 1.0
    
    return Math.round(baseMark * scaling)
  }
  const calculateATAR = () => {
    setLoading(true)
    
    setTimeout(() => {
      try {
        const validSubjects = subjects.filter(s => s.name && s.grade)
        
        if (validSubjects.length < 4) {
          alert('Please enter at least 4 subjects to calculate ATAR')
          setLoading(false)
          return
        }

        // State-specific ATAR calculation
        let atar = 0
        
        switch (selectedJurisdiction) {
          case 'NSW-HSC':
            atar = calculateNSWATAR(validSubjects)
            break
          case 'VIC-VCE':
            atar = calculateVICATAR(validSubjects)
            break
          case 'QLD-QCAA':
            atar = calculateQLDATAR(validSubjects)
            break
          case 'SA-SACE':
            atar = calculateSAATAR(validSubjects)
            break
          case 'WA-WACE':
            atar = calculateWAATAR(validSubjects)
            break
          case 'TAS-TASC':
            atar = calculateTASATAR(validSubjects)
            break
          default:
            atar = calculateNSWATAR(validSubjects) // Default to NSW
        }
        
        setCalculatedATAR(Math.round(atar * 100) / 100)
        
        // Get recommended courses based on ATAR
        const eligibleCourses = allCourses.filter(course => 
          course.atar_cutoff && course.atar_cutoff <= atar
        ).sort((a, b) => b.atar_cutoff - a.atar_cutoff).slice(0, 10)
        
        setRecommendedCourses(eligibleCourses)
        setActiveTab('results')
      } catch (error) {
        console.error('Error calculating ATAR:', error)
        alert('Error calculating ATAR. Please check your inputs.')
      }
      
      setLoading(false)
    }, 1500)
  }

  // NSW HSC ATAR Calculation
  const calculateNSWATAR = (validSubjects) => {
    // NSW uses best 10 units (5 subjects), with English mandatory
    const englishSubjects = validSubjects.filter(s => s.isEnglish)
    const nonEnglishSubjects = validSubjects.filter(s => !s.isEnglish)
    
    if (englishSubjects.length === 0) {
      throw new Error('English is mandatory for NSW HSC ATAR calculation')
    }
    
    // Take best English subject and best 4 other subjects
    const bestEnglish = englishSubjects.sort((a, b) => b.scaledScore - a.scaledScore)[0]
    const bestOthers = nonEnglishSubjects.sort((a, b) => b.scaledScore - a.scaledScore).slice(0, 4)
    
    const selectedSubjects = [bestEnglish, ...bestOthers]
    const totalScore = selectedSubjects.reduce((sum, s) => sum + s.scaledScore, 0)
    
    // Convert to ATAR (simplified calculation)
    return Math.min(99.95, Math.max(0, (totalScore / 500) * 99.95))
  }

  // VIC VCE ATAR Calculation
  const calculateVICATAR = (validSubjects) => {
    // VIC uses best 4 subjects plus 10% of 5th and 6th subjects
    const sortedSubjects = validSubjects.sort((a, b) => b.scaledScore - a.scaledScore)
    
    let totalScore = 0
    for (let i = 0; i < Math.min(4, sortedSubjects.length); i++) {
      totalScore += sortedSubjects[i].scaledScore
    }
    
    // Add 10% of 5th and 6th subjects if available
    if (sortedSubjects.length > 4) totalScore += sortedSubjects[4].scaledScore * 0.1
    if (sortedSubjects.length > 5) totalScore += sortedSubjects[5].scaledScore * 0.1
    
    return Math.min(99.95, Math.max(0, (totalScore / 400) * 99.95))
  }

  // QLD QCAA ATAR Calculation
  const calculateQLDATAR = (validSubjects) => {
    // QLD uses best 5 subjects with English mandatory
    const englishSubjects = validSubjects.filter(s => s.isEnglish)
    
    if (englishSubjects.length === 0) {
      throw new Error('English is mandatory for QLD ATAR calculation')
    }
    
    const sortedSubjects = validSubjects.sort((a, b) => b.scaledScore - a.scaledScore)
    const best5 = sortedSubjects.slice(0, 5)
    const totalScore = best5.reduce((sum, s) => sum + s.scaledScore, 0)
    
    return Math.min(99.95, Math.max(0, (totalScore / 500) * 99.95))
  }

  // SA SACE ATAR Calculation
  const calculateSAATAR = (validSubjects) => {
    // SA uses best 4 subjects
    const sortedSubjects = validSubjects.sort((a, b) => b.scaledScore - a.scaledScore)
    const best4 = sortedSubjects.slice(0, 4)
    const totalScore = best4.reduce((sum, s) => sum + s.scaledScore, 0)
    
    return Math.min(99.95, Math.max(0, (totalScore / 400) * 99.95))
  }

  // WA WACE ATAR Calculation
  const calculateWAATAR = (validSubjects) => {
    // WA uses best 4 subjects with English mandatory
    const englishSubjects = validSubjects.filter(s => s.isEnglish)
    
    if (englishSubjects.length === 0) {
      throw new Error('English is mandatory for WA ATAR calculation')
    }
    
    const sortedSubjects = validSubjects.sort((a, b) => b.scaledScore - a.scaledScore)
    const best4 = sortedSubjects.slice(0, 4)
    const totalScore = best4.reduce((sum, s) => sum + s.scaledScore, 0)
    
    return Math.min(99.95, Math.max(0, (totalScore / 400) * 99.95))
  }

  // TAS TASC ATAR Calculation
  const calculateTASATAR = (validSubjects) => {
    // TAS uses best 5 subjects
    const sortedSubjects = validSubjects.sort((a, b) => b.scaledScore - a.scaledScore)
    const best5 = sortedSubjects.slice(0, 5)
    const totalScore = best5.reduce((sum, s) => sum + s.scaledScore, 0)
    
    return Math.min(99.95, Math.max(0, (totalScore / 500) * 99.95))
  }

  const getATARColor = (atar) => {
    if (atar >= 95) return 'text-green-600'
    if (atar >= 85) return 'text-blue-600'
    if (atar >= 75) return 'text-yellow-600'
    if (atar >= 65) return 'text-orange-600'
    return 'text-red-600'
  }

  const getATARBadge = (atar) => {
    if (atar >= 95) return { text: 'Excellent', color: 'bg-green-100 text-green-700' }
    if (atar >= 85) return { text: 'Very Good', color: 'bg-blue-100 text-blue-700' }
    if (atar >= 75) return { text: 'Good', color: 'bg-yellow-100 text-yellow-700' }
    if (atar >= 65) return { text: 'Fair', color: 'bg-orange-100 text-orange-700' }
    return { text: 'Needs Improvement', color: 'bg-red-100 text-red-700' }
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-12 w-full">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                ATAR Calculator
              </h1>
            </div>
            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
              Calculate your estimated ATAR and discover which university courses you can access with your current grades.
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
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="calculator">Calculator</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
                <TabsTrigger value="guide">Guide</TabsTrigger>
              </TabsList>

              {/* Calculator Tab */}
              <TabsContent value="calculator" className="space-y-6">
                {/* Jurisdiction Selector */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-6 w-6 mr-2 text-purple-600" />
                      Select Your State/Territory
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Choose your state to load the correct subjects and ATAR calculation method.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">State/Territory</label>
                      <Select 
                        value={selectedJurisdiction} 
                        onValueChange={setSelectedJurisdiction}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your state/territory" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableJurisdictions.map((jurisdiction) => (
                            <SelectItem key={jurisdiction} value={jurisdiction}>
                              {jurisdictionNames[jurisdiction] || jurisdiction}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {selectedJurisdiction && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700">
                          <strong>{jurisdictionNames[selectedJurisdiction]}</strong> selected. 
                          Subjects and ATAR calculation will be specific to this jurisdiction.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Subjects Entry */}
                {selectedJurisdiction && (
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Target className="h-6 w-6 mr-2 text-purple-600" />
                        Enter Your Subjects and Grades
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        Showing subjects for {jurisdictionNames[selectedJurisdiction]}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    {subjects.map((subject, index) => (
                      <div key={subject.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Subject {index + 1}</label>
                          <Select 
                            value={subject.name} 
                            onValueChange={(value) => updateSubject(subject.id, 'name', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableSubjects.map((subj) => (
                                <SelectItem key={subj.name} value={subj.name}>
                                  {subj.name} {subj.isEnglish && '(English)'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Grade</label>
                          <Select 
                            value={subject.grade} 
                            onValueChange={(value) => updateSubject(subject.id, 'grade', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Grade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A">A (90-100)</SelectItem>
                              <SelectItem value="B">B (80-89)</SelectItem>
                              <SelectItem value="C">C (70-79)</SelectItem>
                              <SelectItem value="D">D (60-69)</SelectItem>
                              <SelectItem value="E">E (50-59)</SelectItem>
                              <SelectItem value="F">F (Below 50)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Scaled Score</label>
                          <div className="flex items-center h-10 px-3 border rounded-md bg-gray-50">
                            <span className="font-medium">{subject.scaledScore}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-end space-x-2">
                          {subject.isEnglish && (
                            <Badge className="bg-blue-100 text-blue-700 mb-2">English</Badge>
                          )}
                          {subjects.length > 1 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeSubject(subject.id)}
                              className="mb-2"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-between items-center">
                      <Button
                        variant="outline"
                        onClick={addSubject}
                        className="flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Subject
                      </Button>
                      
                      <Button
                        onClick={calculateATAR}
                        disabled={loading}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-8"
                      >
                        {loading ? 'Calculating...' : 'Calculate ATAR'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                )}
              </TabsContent>

              {/* Results Tab */}
              <TabsContent value="results" className="space-y-6">
                {calculatedATAR !== null ? (
                  <>
                    {/* ATAR Result */}
                    <Card className="shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Award className="h-6 w-6 mr-2 text-purple-600" />
                          Your Estimated ATAR
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center space-y-4">
                          <div className={`text-6xl font-bold ${getATARColor(calculatedATAR)}`}>
                            {calculatedATAR}
                          </div>
                          <Badge className={getATARBadge(calculatedATAR).color}>
                            {getATARBadge(calculatedATAR).text}
                          </Badge>
                          <p className="text-gray-600 max-w-2xl mx-auto">
                            This is an estimated ATAR based on your entered grades. Actual ATAR calculations 
                            involve complex scaling and moderation processes that may differ from this estimate.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Course Recommendations */}
                    <Card className="shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <GraduationCap className="h-6 w-6 mr-2 text-purple-600" />
                          Courses You Can Access ({recommendedCourses.length} found)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {recommendedCourses.length > 0 ? (
                          <div className="grid gap-4">
                            {recommendedCourses.map((course) => (
                              <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="font-semibold text-lg">{course.name}</h3>
                                  <Badge className="bg-green-100 text-green-700">
                                    ATAR: {course.atar_cutoff}
                                  </Badge>
                                </div>
                                <p className="text-gray-600 mb-2">{course.universities?.name}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span>{course.level}</span>
                                  <span>{course.duration_months} months</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">
                              No courses found for your current ATAR. Consider improving your grades 
                              or exploring alternative pathways.
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <Card className="shadow-lg border-0">
                    <CardContent className="text-center py-12">
                      <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Calculate Your ATAR</h3>
                      <p className="text-gray-600">
                        Enter your subjects and grades in the Calculator tab to see your estimated ATAR 
                        and course recommendations.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Guide Tab */}
              <TabsContent value="guide" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Info className="h-6 w-6 mr-2 text-blue-600" />
                        How ATAR Works
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Ranking System</h4>
                            <p className="text-sm text-gray-600">ATAR ranks you against all students in your year</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Best 4 Subjects</h4>
                            <p className="text-sm text-gray-600">Calculated from your best 4 subjects including English</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Subject Scaling</h4>
                            <p className="text-sm text-gray-600">Different subjects have different scaling factors</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
                        Improving Your ATAR
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <Target className="h-5 w-5 text-purple-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Choose Scaling Subjects</h4>
                            <p className="text-sm text-gray-600">Maths and Sciences typically have higher scaling</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Target className="h-5 w-5 text-purple-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Focus on Strengths</h4>
                            <p className="text-sm text-gray-600">Prioritize subjects where you can achieve higher grades</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Target className="h-5 w-5 text-purple-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Consider Pathways</h4>
                            <p className="text-sm text-gray-600">Alternative pathways can lead to the same destination</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* ATAR Ranges */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-6 w-6 mr-2 text-purple-600" />
                      ATAR Ranges & Course Access
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-green-600 mb-2">95+</div>
                        <div className="text-sm font-medium mb-1">Elite Programs</div>
                        <div className="text-xs text-gray-600">Medicine, Law, Engineering at top universities</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 mb-2">85-94</div>
                        <div className="text-sm font-medium mb-1">Competitive</div>
                        <div className="text-xs text-gray-600">Most university programs, popular courses</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600 mb-2">75-84</div>
                        <div className="text-sm font-medium mb-1">Good Access</div>
                        <div className="text-xs text-gray-600">Wide range of university options</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-orange-600 mb-2">65-74</div>
                        <div className="text-sm font-medium mb-1">Alternative Paths</div>
                        <div className="text-xs text-gray-600">Foundation programs, TAFE pathways</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

