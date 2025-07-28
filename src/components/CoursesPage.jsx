import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowRight, Search, Filter, BookOpen, Clock, Star, Heart } from 'lucide-react'
import Sidebar from './Sidebar'

export default function CoursesPage({ favorites, setFavorites, isMobileMenuOpen, onMobileMenuClose }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')
  const [universityFilter, setUniversityFilter] = useState('all')
  const [universities, setUniversities] = useState([])
  const [loading, setLoading] = useState(true)

  // Read URL parameters and set initial filter state
  useEffect(() => {
    const levelParam = searchParams.get('level')
    if (levelParam) {
      // Map URL parameter values to filter values (handle case-insensitive matching)
      const levelMapping = {
        'undergraduate': 'Undergraduate',
        'postgraduate': 'Postgraduate', 
        'research': 'Research',
        'mixed': 'Mixed Level'
      }
      const mappedLevel = levelMapping[levelParam.toLowerCase()] || 'all'
      setLevelFilter(mappedLevel)
    }
  }, [searchParams])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Sample courses data
        const sampleCourses = [
          {
            id: 1,
            name: "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
            university: "University of Melbourne",
            level: "Undergraduate",
            duration: "6 years",
            atar_requirement: 99.95,
            description: "Comprehensive medical degree preparing students for careers in medicine and healthcare.",
            field: "Medicine",
            fees_domestic: 11000,
            fees_international: 75000
          },
          {
            id: 2,
            name: "Bachelor of Engineering (Software)",
            university: "UNSW Sydney",
            level: "Undergraduate", 
            duration: "4 years",
            atar_requirement: 96.00,
            description: "Leading software engineering program with strong industry connections.",
            field: "Engineering",
            fees_domestic: 12000,
            fees_international: 49000
          },
          {
            id: 3,
            name: "Bachelor of Laws (LLB)",
            university: "University of Sydney",
            level: "Undergraduate",
            duration: "4 years",
            atar_requirement: 99.50,
            description: "Prestigious law degree with excellent career prospects.",
            field: "Law",
            fees_domestic: 13000,
            fees_international: 52000
          },
          {
            id: 4,
            name: "Master of Business Administration (MBA)",
            university: "Melbourne Business School",
            level: "Postgraduate",
            duration: "2 years",
            atar_requirement: null,
            description: "World-class MBA program for business leaders.",
            field: "Business",
            fees_domestic: 95000,
            fees_international: 95000
          },
          {
            id: 5,
            name: "Bachelor of Computer Science",
            university: "Australian National University",
            level: "Undergraduate",
            duration: "3 years",
            atar_requirement: 95.00,
            description: "Comprehensive computer science program with research opportunities.",
            field: "Computer Science",
            fees_domestic: 11500,
            fees_international: 47000
          },
          {
            id: 6,
            name: "Bachelor of Nursing",
            university: "University of Technology Sydney",
            level: "Undergraduate",
            duration: "3 years",
            atar_requirement: 85.00,
            description: "Professional nursing program with clinical placements.",
            field: "Nursing",
            fees_domestic: 10000,
            fees_international: 38000
          },
          {
            id: 7,
            name: "Master of Architecture",
            university: "University of Melbourne",
            level: "Postgraduate",
            duration: "2 years",
            atar_requirement: null,
            description: "Professional architecture degree with design focus.",
            field: "Architecture",
            fees_domestic: 15000,
            fees_international: 45000
          },
          {
            id: 8,
            name: "Bachelor of Psychology",
            university: "Monash University",
            level: "Undergraduate",
            duration: "3 years",
            atar_requirement: 90.00,
            description: "Comprehensive psychology program with research opportunities.",
            field: "Psychology",
            fees_domestic: 11000,
            fees_international: 42000
          }
        ]
        
        const sampleUniversities = [
          { id: 1, name: "University of Melbourne" },
          { id: 2, name: "University of Sydney" },
          { id: 3, name: "Australian National University" },
          { id: 4, name: "UNSW Sydney" },
          { id: 5, name: "University of Queensland" },
          { id: 6, name: "Monash University" },
          { id: 7, name: "University of Technology Sydney" },
          { id: 8, name: "Melbourne Business School" }
        ]
        
        setCourses(sampleCourses)
        setFilteredCourses(sampleCourses)
        setUniversities(sampleUniversities)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    let filtered = courses

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by level
    if (levelFilter !== 'all') {
      filtered = filtered.filter(course => course.level === levelFilter)
    }

    // Filter by university
    if (universityFilter !== 'all') {
      filtered = filtered.filter(course => course.university_id === parseInt(universityFilter))
    }

    setFilteredCourses(filtered)
  }, [searchTerm, levelFilter, universityFilter, courses])

  const handleLevelFilterChange = (newLevel) => {
    setLevelFilter(newLevel)
    
    // Update URL parameters
    const newSearchParams = new URLSearchParams(searchParams)
    if (newLevel === 'all') {
      newSearchParams.delete('level')
    } else {
      // Map filter values back to URL parameter values
      const urlMapping = {
        'Undergraduate': 'undergraduate',
        'Postgraduate': 'postgraduate',
        'Research': 'research',
        'Mixed Level': 'mixed'
      }
      const urlValue = urlMapping[newLevel]
      if (urlValue) {
        newSearchParams.set('level', urlValue)
      }
    }
    setSearchParams(newSearchParams)
  }

  const toggleFavorite = (courseId) => {
    setFavorites(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    )
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 'Undergraduate':
        return 'bg-blue-100 text-blue-700'
      case 'Postgraduate':
        return 'bg-purple-100 text-purple-700'
      case 'Research':
        return 'bg-green-100 text-green-700'
      case 'University Foundation':
        return 'bg-orange-100 text-orange-700'
      case 'Enabling':
        return 'bg-yellow-100 text-yellow-700'
      case 'Mixed Level':
        return 'bg-pink-100 text-pink-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getUniversityName = (universityId) => {
    const university = universities.find(uni => uni.id === universityId)
    return university ? university.name : 'Unknown University'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Reduced Height Hero Section - Full Width */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-12 w-full">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Courses
              </h1>
            </div>
            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
              Explore thousands of courses across Australia's leading universities and find your perfect academic match.
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
          {/* Search and Filter Section */}
          <section className="py-8 bg-gray-50 border-b">
            <div className="container mx-auto px-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-600" />
                    <Select value={levelFilter} onValueChange={handleLevelFilterChange}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                        <SelectItem value="Research">Research</SelectItem>
                        <SelectItem value="Mixed Level">Mixed Level</SelectItem>
                        <SelectItem value="University Foundation">Foundation</SelectItem>
                        <SelectItem value="Enabling">Enabling</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Select value={universityFilter} onValueChange={setUniversityFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by university" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Universities</SelectItem>
                      {universities.map((university) => (
                        <SelectItem key={university.id} value={university.id.toString()}>
                          {university.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                Showing {filteredCourses.length} of {courses.length} courses
              </div>
            </div>
          </section>

          {/* Courses Grid */}
          <section className="py-12">
            <div className="container mx-auto px-6">
              {filteredCourses.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <BookOpen className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCourses.map((course) => (
                    <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge 
                            variant="secondary" 
                            className={getLevelColor(course.level)}
                          >
                            {course.level}
                          </Badge>
                          <div className="flex items-center gap-2">
                            {course.atar_cutoff && (
                              <div className="flex items-center text-yellow-600">
                                <Star className="h-4 w-4 mr-1" />
                                <span className="text-sm font-semibold">{course.atar_cutoff}</span>
                              </div>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleFavorite(course.id)}
                              className="p-1 h-8 w-8"
                            >
                              <Heart 
                                className={`h-4 w-4 ${
                                  favorites.includes(course.id) 
                                    ? 'fill-red-500 text-red-500' 
                                    : 'text-gray-400 hover:text-red-500'
                                }`} 
                              />
                            </Button>
                          </div>
                        </div>
                        <CardTitle className="text-lg group-hover:text-purple-600 transition-colors line-clamp-2">
                          {course.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600 font-medium">
                          {getUniversityName(course.university_id)}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {course.description && (
                            <p className="text-sm text-gray-600 line-clamp-3">
                              {course.description}
                            </p>
                          )}
                          
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            {course.duration_months && (
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{course.duration_months} months</span>
                              </div>
                            )}
                            {course.atar_cutoff && (
                              <div className="text-right">
                                <span className="font-semibold">ATAR: {course.atar_cutoff}</span>
                              </div>
                            )}
                          </div>

                          {course.career_paths && course.career_paths.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-gray-700">Career Paths:</h4>
                              <div className="flex flex-wrap gap-1">
                                {course.career_paths.slice(0, 2).map((path, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {path}
                                  </Badge>
                                ))}
                                {course.career_paths.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{course.career_paths.length - 2} more
                                  </Badge>
                                )}
                              </div>
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
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

