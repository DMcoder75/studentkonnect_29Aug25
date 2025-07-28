import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  Target, 
  Users, 
  CheckCircle, 
  Star,
  TrendingUp,
  GraduationCap,
  Briefcase,
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react'
import Sidebar from './Sidebar'

export default function PathwayDetailPage({ isMobileMenuOpen, onMobileMenuClose }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pathway, setPathway] = useState(null)
  const [relatedCourses, setRelatedCourses] = useState([])
  const [relatedProfessions, setRelatedProfessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const fetchPathwayDetails = async () => {
      try {
        setLoading(true)
        
        // Fetch pathway details
        const pathwayData = pathways.find(p => p.id === parseInt(id))
        
        if (!pathwayData) {
          navigate('/pathways')
          return
        }
        
        setPathway(pathwayData)
        
        // Fetch related courses and professions
        const [coursesData, professionsData] = await Promise.all([
        ])
        
        // Filter related courses based on pathway name keywords
        const pathwayKeywords = pathwayData.name.toLowerCase().split(' ')
        const filteredCourses = coursesData.filter(course => 
          pathwayKeywords.some(keyword => 
            course.name.toLowerCase().includes(keyword) ||
            (course.description && course.description.toLowerCase().includes(keyword))
          )
        ).slice(0, 6)
        
        // Filter related professions
        const filteredProfessions = professionsData.filter(profession =>
          pathwayKeywords.some(keyword =>
            profession.title.toLowerCase().includes(keyword)
          )
        ).slice(0, 4)
        
        setRelatedCourses(filteredCourses)
        setRelatedProfessions(filteredProfessions)
        
      } catch (error) {
        console.error('Error fetching pathway details:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPathwayDetails()
    }
  }, [id, navigate])

  const getCategoryColor = (pathwayName) => {
    const name = pathwayName.toLowerCase()
    if (name.includes('business') || name.includes('accounting') || name.includes('finance')) {
      return 'bg-blue-100 text-blue-700'
    }
    if (name.includes('engineering') || name.includes('technology')) {
      return 'bg-purple-100 text-purple-700'
    }
    if (name.includes('health') || name.includes('medical') || name.includes('nursing')) {
      return 'bg-green-100 text-green-700'
    }
    if (name.includes('education') || name.includes('teaching')) {
      return 'bg-orange-100 text-orange-700'
    }
    if (name.includes('arts') || name.includes('creative') || name.includes('design')) {
      return 'bg-pink-100 text-pink-700'
    }
    return 'bg-gray-100 text-gray-700'
  }

  const getStepProgress = () => {
    const steps = pathway?.typical_progression || []
    return steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!pathway) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Pathway Not Found</h2>
          <Button onClick={() => navigate('/pathways')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Pathways
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Reduced Height Hero Section - Full Width */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-12 w-full">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-6">
          <div className="max-w-6xl mx-auto">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20 mb-4"
              onClick={() => navigate('/pathways')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Pathways
            </Button>
            
            <div className="flex items-center mb-4">
              <Badge className={`mr-4 ${getCategoryColor(pathway.name)}`}>
                {pathway.name.includes('business') || pathway.name.includes('accounting') ? 'Business' :
                 pathway.name.includes('engineering') || pathway.name.includes('technology') ? 'Engineering' :
                 pathway.name.includes('health') || pathway.name.includes('medical') ? 'Health' :
                 pathway.name.includes('education') || pathway.name.includes('teaching') ? 'Education' :
                 pathway.name.includes('arts') || pathway.name.includes('creative') ? 'Arts' : 'General'}
              </Badge>
              <div className="flex items-center text-cyan-200">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">{pathway.duration || 'Flexible Duration'}</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              {pathway.name}
            </h1>
            
            <p className="text-lg md:text-xl text-purple-100 max-w-3xl">
              {pathway.description || 'Discover your pathway to success through structured learning and career development.'}
            </p>
          </div>
        </div>
      </section>

      {/* Two-Column Layout Starts Here */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={true}
          onClose={() => {}}
          isHomepage={false}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={onMobileMenuClose}
        />

        {/* Main Content Area - Full width on mobile, reduced width on desktop */}
        <main className="flex-1 w-full md:w-auto transition-all duration-300">
          <div className="container mx-auto px-6 py-12">
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="progression">Progression</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="careers">Careers</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    <Card className="shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Target className="h-5 w-5 mr-2 text-purple-600" />
                          Pathway Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          {pathway.description || 'This pathway is designed to provide you with comprehensive knowledge and skills needed to excel in your chosen field. Through a combination of theoretical learning and practical application, you\'ll develop the expertise required for a successful career.'}
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-4 mt-6">
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <GraduationCap className="h-5 w-5 text-purple-600 mr-2" />
                              <h4 className="font-semibold text-purple-800">Entry Requirements</h4>
                            </div>
                            <p className="text-sm text-purple-700">
                              Completion of Year 12 or equivalent qualification. Some pathways may require specific subject prerequisites.
                            </p>
                          </div>
                          
                          <div className="bg-cyan-50 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <Calendar className="h-5 w-5 text-cyan-600 mr-2" />
                              <h4 className="font-semibold text-cyan-800">Duration</h4>
                            </div>
                            <p className="text-sm text-cyan-700">
                              {pathway.duration || 'Flexible duration based on your pace and chosen study mode.'}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Key Benefits */}
                    <Card className="shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Star className="h-5 w-5 mr-2 text-yellow-600" />
                          Key Benefits
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                            <div>
                              <h4 className="font-semibold text-gray-800">Structured Learning</h4>
                              <p className="text-sm text-gray-600">Clear progression path with defined milestones</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                            <div>
                              <h4 className="font-semibold text-gray-800">Industry Recognition</h4>
                              <p className="text-sm text-gray-600">Qualifications recognized by industry leaders</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                            <div>
                              <h4 className="font-semibold text-gray-800">Career Support</h4>
                              <p className="text-sm text-gray-600">Guidance and mentorship throughout your journey</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                            <div>
                              <h4 className="font-semibold text-gray-800">Flexible Options</h4>
                              <p className="text-sm text-gray-600">Multiple study modes and entry points available</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Sidebar Stats */}
                  <div className="space-y-6">
                    <Card className="shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="text-lg">Quick Stats</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Related Courses</span>
                          <span className="font-semibold text-purple-600">{relatedCourses.length}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Career Options</span>
                          <span className="font-semibold text-green-600">{relatedProfessions.length}+</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Study Mode</span>
                          <span className="font-semibold text-cyan-600">Flexible</span>
                        </div>
                        
                        <div className="pt-4 border-t">
                          <Button 
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                            onClick={() => navigate('/courses')}
                          >
                            Start Your Journey
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Average Salary Info */}
                    {relatedProfessions.length > 0 && (
                      <Card className="shadow-lg border-0">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center">
                            <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                            Salary Insights
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {relatedProfessions.slice(0, 3).map((profession, index) => (
                              <div key={index} className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 truncate">{profession.title}</span>
                                <span className="font-semibold text-green-600">
                                  ${profession.average_salary ? profession.average_salary.toLocaleString() : 'N/A'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Progression Tab */}
              <TabsContent value="progression" className="space-y-8">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                      Your Learning Journey
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {pathway.typical_progression && pathway.typical_progression.length > 0 ? (
                      <div className="space-y-6">
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">Progress</span>
                            <span className="text-sm text-gray-500">{currentStep + 1} of {pathway.typical_progression.length}</span>
                          </div>
                          <Progress value={getStepProgress()} className="h-2" />
                        </div>
                        
                        <div className="space-y-4">
                          {pathway.typical_progression.map((step, index) => (
                            <div 
                              key={index} 
                              className={`flex items-start space-x-4 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                                index === currentStep 
                                  ? 'border-purple-500 bg-purple-50' 
                                  : index < currentStep 
                                    ? 'border-green-500 bg-green-50' 
                                    : 'border-gray-200 bg-gray-50'
                              }`}
                              onClick={() => setCurrentStep(index)}
                            >
                              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                                index === currentStep 
                                  ? 'bg-purple-500 text-white' 
                                  : index < currentStep 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-gray-300 text-gray-600'
                              }`}>
                                {index < currentStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-800 mb-1">Step {index + 1}</h4>
                                <p className="text-gray-600">{step}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex justify-between pt-4">
                          <Button 
                            variant="outline" 
                            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                            disabled={currentStep === 0}
                          >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Previous
                          </Button>
                          <Button 
                            onClick={() => setCurrentStep(Math.min(pathway.typical_progression.length - 1, currentStep + 1))}
                            disabled={currentStep === pathway.typical_progression.length - 1}
                          >
                            Next
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">Flexible Progression</h3>
                        <p className="text-gray-500">This pathway offers flexible progression based on your individual goals and pace.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Courses Tab */}
              <TabsContent value="courses" className="space-y-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedCourses.length > 0 ? relatedCourses.map((course) => (
                    <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                            {course.level}
                          </Badge>
                          <div className="flex items-center text-yellow-600">
                            <Star className="h-4 w-4 mr-1" />
                            <span className="text-sm font-semibold">4.5</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg group-hover:text-purple-600 transition-colors line-clamp-2">
                          {course.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="text-sm text-gray-600">
                            {course.universities?.name || 'Leading University'}
                          </div>
                          {course.atar_cutoff && (
                            <div className="text-sm">
                              <span className="text-gray-500">ATAR: </span>
                              <span className="font-semibold text-green-600">{course.atar_cutoff}</span>
                            </div>
                          )}
                          <Button 
                            variant="outline" 
                            className="w-full group-hover:bg-purple-600 group-hover:text-white transition-all duration-200"
                            onClick={() => window.open(course.course_url, '_blank')}
                          >
                            View Course <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )) : (
                    <div className="col-span-full text-center py-12">
                      <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">Courses Coming Soon</h3>
                      <p className="text-gray-500">We're working on adding more course recommendations for this pathway.</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Careers Tab */}
              <TabsContent value="careers" className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedProfessions.length > 0 ? relatedProfessions.map((profession) => (
                    <Card key={profession.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="group-hover:text-purple-600 transition-colors">{profession.title}</span>
                          <Briefcase className="h-5 w-5 text-purple-600" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Average Salary</span>
                            <span className="font-semibold text-green-600">
                              ${profession.average_salary ? profession.average_salary.toLocaleString() : 'N/A'}
                            </span>
                          </div>
                          
                          {profession.growth_forecast && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Growth Forecast</span>
                              <span className={`font-semibold ${profession.growth_forecast > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {profession.growth_forecast > 0 ? '+' : ''}{profession.growth_forecast}%
                              </span>
                            </div>
                          )}
                          
                          <div className="pt-3 border-t">
                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={() => {
                                // Open career information in a new tab
                                const searchQuery = encodeURIComponent(`${profession.title} career information Australia salary requirements`)
                                window.open(`https://www.seek.com.au/jobs?keywords=${encodeURIComponent(profession.title)}`, '_blank')
                              }}
                            >
                              Learn More <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )) : (
                    <div className="col-span-full text-center py-12">
                      <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">Career Options Coming Soon</h3>
                      <p className="text-gray-500">We're working on adding more career information for this pathway.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

