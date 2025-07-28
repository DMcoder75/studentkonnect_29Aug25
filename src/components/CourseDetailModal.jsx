import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  X, 
  GraduationCap, 
  MapPin, 
  Clock, 
  DollarSign, 
  Award, 
  BookOpen,
  TrendingUp,
  Users,
  ExternalLink,
  Heart,
  GitCompare,
  Star,
  Calendar,
  FileText,
  Briefcase,
  Target
} from 'lucide-react'

export default function CourseDetailModal({ 
  isOpen, 
  onClose, 
  course, 
  onToggleFavorite, 
  onToggleComparison, 
  isFavorite = false, 
  isInComparison = false 
}) {
  const [courseDetails, setCourseDetails] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen && course) {
      loadCourseDetails()
    }
  }, [isOpen, course])

  const loadCourseDetails = async () => {
    if (!course?.id) return
    
    setLoading(true)
    try {
      setCourseDetails(details)
    } catch (error) {
      console.error('Error loading course details:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen || !course) return null

  const displayCourse = courseDetails || course

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50" 
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <div 
            className="relative bg-white rounded-lg shadow-xl max-h-[95vh] overflow-y-auto"
            style={{ 
              width: '98vw',
              maxWidth: 'none',
              margin: '0 1vw'
            }}
          >
            <div className="p-4 sm:p-6" style={{ width: '100%' }}>
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 pr-4">
                      {displayCourse.name}
                    </h2>
                    <div className="flex items-center text-gray-600 mb-2">
                      <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                      <span className="text-base sm:text-lg truncate">{displayCourse.universities?.name}</span>
                    </div>
                    {displayCourse.universities?.state && (
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                        <span className="text-sm sm:text-base">{displayCourse.universities.state}, Australia</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggleFavorite?.(displayCourse.id)}
                      className={`p-2 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
                    >
                      <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isFavorite ? 'fill-current' : ''}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggleComparison?.(displayCourse)}
                      className={`p-2 ${isInComparison ? 'text-blue-500' : 'text-gray-400'}`}
                    >
                      <GitCompare className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
                      <X className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </div>
                </div>
              </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3">Loading course details...</span>
          </div>
        ) : (
          <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 h-auto">
              <TabsTrigger value="overview" className="text-xs sm:text-sm px-2 py-2">Overview</TabsTrigger>
              <TabsTrigger value="requirements" className="text-xs sm:text-sm px-2 py-2">Requirements</TabsTrigger>
              <TabsTrigger value="structure" className="text-xs sm:text-sm px-2 py-2">Structure</TabsTrigger>
              <TabsTrigger value="careers" className="text-xs sm:text-sm px-2 py-2">Careers</TabsTrigger>
              <TabsTrigger value="apply" className="text-xs sm:text-sm px-2 py-2">Apply</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="flex items-center text-base sm:text-lg">
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Course Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                      {displayCourse.description || 
                        "This course provides comprehensive education and training in the field, preparing students for successful careers with both theoretical knowledge and practical skills. Students will engage with industry-standard practices and emerging trends in the discipline."}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="flex items-center text-base sm:text-lg">
                      <Award className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Quick Facts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4 pt-0">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Level</p>
                      <Badge variant="secondary" className="text-xs sm:text-sm">{displayCourse.level || 'Bachelor'}</Badge>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Duration</p>
                      <p className="font-medium text-sm sm:text-base">{displayCourse.duration || '3-4 years'}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Delivery Mode</p>
                      <Badge variant="outline" className="text-xs sm:text-sm">{displayCourse.delivery_mode || 'On Campus'}</Badge>
                    </div>
                    {displayCourse.atar_cutoff && (
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">ATAR Cutoff</p>
                        <Badge variant="default" className="bg-green-100 text-green-800 text-xs sm:text-sm">
                          {displayCourse.atar_cutoff}
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card>
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="flex items-center text-base sm:text-lg">
                      <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Fees & Funding
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                      <span className="text-gray-600 text-xs sm:text-sm">Annual Fee (Domestic)</span>
                      <span className="font-medium text-sm sm:text-base">
                        {displayCourse.annual_fee ? 
                          `$${displayCourse.annual_fee.toLocaleString()}` : 
                          'Contact university'
                        }
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                      <span className="text-gray-600 text-xs sm:text-sm">CSP Available</span>
                      <Badge variant={displayCourse.csp_available ? "default" : "secondary"} className="text-xs sm:text-sm w-fit">
                        {displayCourse.csp_available ? "Yes" : "Check with university"}
                      </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                      <span className="text-gray-600 text-xs sm:text-sm">HECS-HELP</span>
                      <span className="font-medium text-sm sm:text-base">Available</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="flex items-center text-base sm:text-lg">
                      <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Graduate Outcomes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                      <span className="text-gray-600 text-xs sm:text-sm">Employment Rate</span>
                      <span className="font-medium text-green-600 text-sm sm:text-base">
                        {displayCourse.graduate_employment_rate || '85'}%
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                      <span className="text-gray-600 text-xs sm:text-sm">Starting Salary</span>
                      <span className="font-medium text-green-600 text-sm sm:text-base">
                        ${displayCourse.average_starting_salary?.toLocaleString() || '65,000'}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                      <span className="text-gray-600 text-xs sm:text-sm">Further Study</span>
                      <span className="font-medium text-sm sm:text-base">15%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Requirements Tab */}
            <TabsContent value="requirements" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Entry Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {displayCourse.atar_cutoff && (
                    <div>
                      <h4 className="font-semibold mb-2">ATAR Requirement</h4>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {displayCourse.atar_cutoff}
                      </Badge>
                      <p className="text-sm text-gray-600 mt-1">
                        Based on previous year's cutoff. May vary by year.
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-semibold mb-2">Subject Prerequisites</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">
                        {displayCourse.prerequisites || 
                          "Completion of Year 12 or equivalent. Specific subject requirements may apply. Check with the university for detailed prerequisites."}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">English Language Requirements</h4>
                    <p className="text-gray-700">
                      IELTS 6.5 overall (no band less than 6.0) or equivalent for international students.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Additional Requirements</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Portfolio submission (if applicable)</li>
                      <li>Interview or audition (if required)</li>
                      <li>Work experience (for some programs)</li>
                      <li>Police check (for education/health programs)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Structure Tab */}
            <TabsContent value="structure" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Course Structure
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Duration & Study Load</h4>
                    <p className="text-gray-700">
                      {displayCourse.duration || '3-4 years'} full-time or equivalent part-time study.
                      Typically 24 credit points per semester (4 subjects).
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Core Subjects</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">
                        Core subjects provide fundamental knowledge and skills in the discipline.
                        These are mandatory for all students in the program.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Electives & Specializations</h4>
                    <p className="text-gray-700">
                      Choose from a range of elective subjects to tailor your degree to your interests
                      and career goals. Specialization options may be available in later years.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Practical Experience</h4>
                    <p className="text-gray-700">
                      Industry placements, internships, or practical projects are integrated
                      throughout the program to provide real-world experience.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Careers Tab */}
            <TabsContent value="careers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Career Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Graduate Roles</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {displayCourse.professions?.length > 0 ? (
                        displayCourse.professions.map((profession, index) => (
                          <Badge key={index} variant="outline" className="justify-start">
                            {profession.title}
                          </Badge>
                        ))
                      ) : (
                        <>
                          <Badge variant="outline">Graduate Analyst</Badge>
                          <Badge variant="outline">Junior Consultant</Badge>
                          <Badge variant="outline">Assistant Manager</Badge>
                          <Badge variant="outline">Research Assistant</Badge>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Industry Sectors</h4>
                    <p className="text-gray-700">
                      Graduates find employment across various sectors including government,
                      private industry, non-profit organizations, and research institutions.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Professional Development</h4>
                    <p className="text-gray-700">
                      Opportunities for professional registration, continuing education,
                      and career advancement through professional associations and industry bodies.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Further Study Options</h4>
                    <p className="text-gray-700">
                      Graduates may pursue postgraduate study including Honours, Masters,
                      or PhD programs to specialize further or enter research careers.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Apply Tab */}
            <TabsContent value="apply" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    How to Apply
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Application Process</h4>
                    <ol className="list-decimal list-inside text-gray-700 space-y-2">
                      <li>Check entry requirements and prerequisites</li>
                      <li>Submit application through UAC or direct to university</li>
                      <li>Provide supporting documents (transcripts, portfolio, etc.)</li>
                      <li>Attend interview or audition if required</li>
                      <li>Receive offer and accept by deadline</li>
                      <li>Enroll and pay fees</li>
                    </ol>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Important Dates</h4>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-yellow-800">
                        <strong>Applications close:</strong> September 30 (main round)<br/>
                        <strong>Late applications:</strong> Check with university<br/>
                        <strong>Semester starts:</strong> February/March
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Contact Information</h4>
                    <p className="text-gray-700">
                      For specific questions about this course, contact the university's
                      admissions office or course coordinator directly.
                    </p>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit University Website
                    </Button>
                    {displayCourse.application_link && (
                      <Button variant="outline" className="flex-1">
                        Apply Now
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

