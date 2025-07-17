import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowRight, Search, Filter, BookOpen, Clock, Star, Heart } from 'lucide-react'
import { dbHelpers } from '../lib/supabase'
import Sidebar from './Sidebar'

export default function CoursesPage({ favorites, setFavorites, isMobileMenuOpen, onMobileMenuClose }) {
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')
  const [universityFilter, setUniversityFilter] = useState('all')
  const [universities, setUniversities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [coursesData, universitiesData] = await Promise.all([
          dbHelpers.getCourses(),
          dbHelpers.getUniversities()
        ])
        setCourses(coursesData)
        setFilteredCourses(coursesData)
        setUniversities(universitiesData)
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
                    <Select value={levelFilter} onValueChange={setLevelFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                        <SelectItem value="Research">Research</SelectItem>
                        <SelectItem value="University Foundation">Foundation</SelectItem>
                        <SelectItem value="Enabling">Enabling</SelectItem>
                        <SelectItem value="Mixed Level">Mixed Level</SelectItem>
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

