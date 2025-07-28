import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  Filter, 
  BookOpen, 
  GraduationCap, 
  MapPin, 
  Star, 
  Heart,
  GitCompare,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Award,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Bookmark,
  Grid,
  List
} from 'lucide-react'
import Sidebar from './Sidebar'
import CourseComparisonModal from './CourseComparisonModal'
import CourseDetailModal from './CourseDetailModal'

export default function CourseFinderPage({ isMobileMenuOpen, onMobileMenuClose }) {
  // State management
  const [searchQuery, setSearchQuery] = useState('')
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [universities, setUniversities] = useState([])
  const [pathways, setPathways] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [selectedCourses, setSelectedCourses] = useState([]) // For comparison
  const [favorites, setFavorites] = useState([])
  
  // Modal states
  const [showComparisonModal, setShowComparisonModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  
  // Filter states
  const [filters, setFilters] = useState({
    university: '',
    state: '',
    level: '',
    deliveryMode: '',
    atarRange: [0, 100],
    category: '',
    showFavoritesOnly: false
  })
  
  // UI states
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('name') // 'name', 'atar', 'university', 'popularity'

  // Load initial data
  useEffect(() => {
    loadInitialData()
  }, [])

  // Apply filters when search query or filters change
  useEffect(() => {
    applyFilters()
  }, [searchQuery, filters, courses, sortBy])

  const loadInitialData = async () => {
    setLoading(true)
    try {
      const [coursesData, universitiesData, pathwaysData] = await Promise.all([
      ])
      
      setCourses(coursesData)
      setUniversities(universitiesData)
      setPathways(pathwaysData)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...courses]

    // Text search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(course => 
        course.name.toLowerCase().includes(query) ||
        course.universities?.name.toLowerCase().includes(query) ||
        course.description?.toLowerCase().includes(query)
      )
    }

    // University filter
    if (filters.university) {
      filtered = filtered.filter(course => course.university_id === parseInt(filters.university))
    }

    // State filter
    if (filters.state) {
      filtered = filtered.filter(course => course.universities?.state === filters.state)
    }

    // Level filter
    if (filters.level) {
      filtered = filtered.filter(course => course.level === filters.level)
    }

    // Delivery mode filter
    if (filters.deliveryMode) {
      filtered = filtered.filter(course => course.delivery_mode === filters.deliveryMode)
    }

    // ATAR range filter
    if (filters.atarRange[0] > 0 || filters.atarRange[1] < 100) {
      filtered = filtered.filter(course => {
        if (!course.atar_cutoff) return true // Include courses without ATAR requirement
        return course.atar_cutoff >= filters.atarRange[0] && course.atar_cutoff <= filters.atarRange[1]
      })
    }

    // Category filter (based on course name patterns)
    if (filters.category) {
      const categoryKeywords = {
        'health': ['nursing', 'medicine', 'health', 'physiotherapy', 'psychology', 'dentistry'],
        'business': ['business', 'commerce', 'management', 'accounting', 'finance', 'economics'],
        'technology': ['computer', 'software', 'engineering', 'information', 'technology', 'data'],
        'education': ['education', 'teaching', 'teacher', 'pedagogy'],
        'arts': ['arts', 'creative', 'design', 'music', 'theatre', 'literature'],
        'science': ['science', 'biology', 'chemistry', 'physics', 'mathematics']
      }
      
      const keywords = categoryKeywords[filters.category] || []
      if (keywords.length > 0) {
        filtered = filtered.filter(course => 
          keywords.some(keyword => course.name.toLowerCase().includes(keyword))
        )
      }
    }

    // Favorites filter
    if (filters.showFavoritesOnly) {
      filtered = filtered.filter(course => favorites.includes(course.id))
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'atar':
          return (b.atar_cutoff || 0) - (a.atar_cutoff || 0)
        case 'university':
          return (a.universities?.name || '').localeCompare(b.universities?.name || '')
        case 'popularity':
          return (b.popularity_score || 0) - (a.popularity_score || 0)
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredCourses(filtered)
  }

  const toggleFavorite = (courseId) => {
    setFavorites(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    )
  }

  const toggleComparison = (course) => {
    setSelectedCourses(prev => {
      const isSelected = prev.find(c => c.id === course.id)
      if (isSelected) {
        return prev.filter(c => c.id !== course.id)
      } else if (prev.length < 3) {
        return [...prev, course]
      } else {
        alert('You can compare up to 3 courses at a time')
        return prev
      }
    })
  }

  const clearFilters = () => {
    setFilters({
      university: '',
      state: '',
      level: '',
      deliveryMode: '',
      atarRange: [0, 100],
      category: '',
      showFavoritesOnly: false
    })
    setSearchQuery('')
  }

  const showCourseDetails = (course) => {
    setSelectedCourse(course)
    setShowDetailModal(true)
  }

  const showComparison = () => {
    if (selectedCourses.length > 0) {
      setShowComparisonModal(true)
    }
  }

  const getUniqueStates = () => {
    if (!universities || universities.length === 0) return []
    const states = universities.map(uni => uni?.state).filter(Boolean)
    return [...new Set(states)].sort()
  }

  const getUniqueLevels = () => {
    if (!courses || courses.length === 0) return []
    const levels = courses.map(course => course?.level).filter(Boolean)
    return [...new Set(levels)].sort()
  }

  const getUniqueDeliveryModes = () => {
    if (!courses || courses.length === 0) return []
    const modes = courses.map(course => course?.delivery_mode).filter(Boolean)
    return [...new Set(modes)].sort()
  }

  const CourseCard = ({ course, isGridView = true }) => (
    <Card className={`shadow-lg hover:shadow-xl transition-all duration-300 ${isGridView ? 'h-full' : 'mb-4'} ${selectedCourses.find(c => c.id === course.id) ? 'ring-2 ring-blue-500' : ''}`}>
      <CardContent className={`p-6 ${isGridView ? 'h-full flex flex-col' : ''}`}>
        <div className={`${isGridView ? 'flex-1' : 'flex items-start justify-between'}`}>
          <div className={isGridView ? '' : 'flex-1'}>
            <div className="flex items-start justify-between mb-3">
              <div className={isGridView ? 'flex-1' : 'flex-1 mr-4'}>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{course.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <GraduationCap className="h-4 w-4 mr-1" />
                  <span>{course.universities?.name}</span>
                </div>
                {course.universities?.state && (
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{course.universities.state}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-end space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(course.id)}
                  className={favorites.includes(course.id) ? 'text-red-500' : 'text-gray-400'}
                >
                  <Heart className={`h-4 w-4 ${favorites.includes(course.id) ? 'fill-current' : ''}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleComparison(course)}
                  className={selectedCourses.find(c => c.id === course.id) ? 'text-blue-500' : 'text-gray-400'}
                >
                  <GitCompare className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              {course.level && (
                <Badge variant="secondary" className="mr-2">
                  {course.level}
                </Badge>
              )}
              {course.delivery_mode && (
                <Badge variant="outline" className="mr-2">
                  {course.delivery_mode}
                </Badge>
              )}
              {course.atar_cutoff && (
                <Badge variant="default" className="bg-green-100 text-green-800">
                  ATAR: {course.atar_cutoff}
                </Badge>
              )}
            </div>
            
            {course.description && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {course.description}
              </p>
            )}
          </div>
          
          {!isGridView && (
            <div className="flex flex-col space-y-2 ml-4">
              <Button size="sm" variant="outline" onClick={() => showCourseDetails(course)}>
                <ExternalLink className="h-4 w-4 mr-1" />
                View Details
              </Button>
              {course.application_link && (
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Apply Now
                </Button>
              )}
            </div>
          )}
        </div>
        
        {isGridView && (
          <div className="flex flex-col space-y-2 mt-auto pt-4">
            <Button size="sm" variant="outline" className="w-full" onClick={() => showCourseDetails(course)}>
              <ExternalLink className="h-4 w-4 mr-1" />
              View Details
            </Button>
            {course.application_link && (
              <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                Apply Now
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full-width hero header */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-6 py-16 text-center">
          <div className="flex items-center justify-center mb-4">
            <Search className="h-12 w-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Course Finder</h1>
          </div>
          <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto mb-8">
            Discover your perfect university course with smart search and advanced filtering
          </p>
          
          {/* Hero Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search courses, universities, or career goals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-white/90 backdrop-blur-sm border-0 rounded-xl shadow-lg text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main layout with sidebar */}
      <div className="flex">
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen} 
          onMobileMenuClose={onMobileMenuClose} 
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Filters and Controls */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                      {showFilters ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                    </Button>
                    
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name (A-Z)</SelectItem>
                        <SelectItem value="atar">ATAR (High to Low)</SelectItem>
                        <SelectItem value="university">University</SelectItem>
                        <SelectItem value="popularity">Popularity</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      {filteredCourses.length} courses found
                    </span>
                    
                    {selectedCourses.length > 0 && (
                      <Button variant="default" className="bg-blue-600 hover:bg-blue-700" onClick={showComparison}>
                        <GitCompare className="h-4 w-4 mr-2" />
                        Compare ({selectedCourses.length})
                      </Button>
                    )}
                  </div>
                </div>
                
                {/* Advanced Filters */}
                {showFilters && (
                  <div className="border-t pt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
                        <select 
                          value={filters.university} 
                          onChange={(e) => setFilters(prev => ({ ...prev, university: e.target.value }))}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">All Universities</option>
                          {universities && universities.map(uni => (
                            <option key={uni.id} value={uni.id.toString()}>
                              {uni.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                        <select 
                          value={filters.state} 
                          onChange={(e) => setFilters(prev => ({ ...prev, state: e.target.value }))}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">All States</option>
                          {getUniqueStates().map(state => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                        <select 
                          value={filters.level} 
                          onChange={(e) => setFilters(prev => ({ ...prev, level: e.target.value }))}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">All Levels</option>
                          {getUniqueLevels().map(level => (
                            <option key={level} value={level}>
                              {level}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select 
                          value={filters.category} 
                          onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">All Categories</option>
                          <option value="health">Health & Medicine</option>
                          <option value="business">Business & Commerce</option>
                          <option value="technology">Technology & Engineering</option>
                          <option value="education">Education</option>
                          <option value="arts">Arts & Creative</option>
                          <option value="science">Science & Research</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ATAR Range: {filters.atarRange[0]} - {filters.atarRange[1]}
                        </label>
                        <div className="flex items-center space-x-4">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={filters.atarRange[0]}
                            onChange={(e) => setFilters(prev => ({ 
                              ...prev, 
                              atarRange: [parseInt(e.target.value), prev.atarRange[1]] 
                            }))}
                            className="flex-1"
                          />
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={filters.atarRange[1]}
                            onChange={(e) => setFilters(prev => ({ 
                              ...prev, 
                              atarRange: [prev.atarRange[0], parseInt(e.target.value)] 
                            }))}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="favorites"
                          checked={filters.showFavoritesOnly}
                          onChange={(e) => setFilters(prev => ({ ...prev, showFavoritesOnly: e.target.checked }))}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="favorites" className="text-sm font-medium text-gray-700">
                          Show favorites only
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button 
                        onClick={clearFilters}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading courses...</p>
              </div>
            ) : filteredCourses.length === 0 ? (
              <Card className="shadow-lg">
                <CardContent className="p-12 text-center">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or filters to find more courses.
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredCourses.map(course => (
                  <CourseCard key={course.id} course={course} isGridView={viewMode === 'grid'} />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {filteredCourses.length > 0 && filteredCourses.length >= 20 && (
              <div className="text-center">
                <Button variant="outline" size="lg">
                  Load More Courses
                </Button>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Modals */}
      <CourseComparisonModal
        isOpen={showComparisonModal}
        onClose={() => setShowComparisonModal(false)}
        courses={selectedCourses}
      />

      <CourseDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        course={selectedCourse}
        onToggleFavorite={toggleFavorite}
        onToggleComparison={toggleComparison}
        isFavorite={selectedCourse ? favorites.includes(selectedCourse.id) : false}
        isInComparison={selectedCourse ? selectedCourses.find(c => c.id === selectedCourse.id) : false}
      />
    </div>
  )
}

