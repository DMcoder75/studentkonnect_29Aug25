import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BookOpen, Search, Filter, Globe, GraduationCap, Clock, Languages, MapPin } from 'lucide-react'
import Sidebar from './Sidebar'
import { globalEducationService } from '../services/globalEducationService'

export default function GlobalCoursesPage({ isMobileMenuOpen, onMobileMenuClose }) {
  const [courses, setCourses] = useState([])
  const [countries, setCountries] = useState([])
  const [universities, setUniversities] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedUniversity, setSelectedUniversity] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch countries, universities, and courses from global database
        const [countriesResult, universitiesResult, coursesResult] = await Promise.all([
          globalEducationService.getAllCountries(),
          globalEducationService.getAllUniversities(),
          globalEducationService.getAllCourses()
        ])

        if (countriesResult.data) {
          setCountries(countriesResult.data)
        }

        if (universitiesResult.data) {
          setUniversities(universitiesResult.data)
        }

        if (coursesResult.data) {
          setCourses(coursesResult.data)
        } else {
          // Fallback sample data for global courses
          const sampleCourses = [
            {
              id: 1,
              program_name: "Computer Science",
              university_name: "Harvard University",
              country: "United States",
              level: "Bachelor",
              duration: "4 years",
              category: "Technology",
              language: "English",
              description: "Comprehensive computer science program covering algorithms, software engineering, and AI."
            },
            {
              id: 2,
              program_name: "Medicine (MBBS)",
              university_name: "University of Oxford",
              country: "United Kingdom",
              level: "Bachelor",
              duration: "6 years",
              category: "Medicine",
              language: "English",
              description: "World-renowned medical program with clinical training and research opportunities."
            },
            {
              id: 3,
              program_name: "Business Administration (MBA)",
              university_name: "University of Toronto",
              country: "Canada",
              level: "Master",
              duration: "2 years",
              category: "Business",
              language: "English",
              description: "Top-ranked MBA program with global business focus and leadership development."
            },
            {
              id: 4,
              program_name: "Engineering (Mechanical)",
              university_name: "ETH Zurich",
              country: "Switzerland",
              level: "Bachelor",
              duration: "3 years",
              category: "Engineering",
              language: "English/German",
              description: "Premier engineering program with cutting-edge research and industry partnerships."
            },
            {
              id: 5,
              program_name: "International Law",
              university_name: "University of Melbourne",
              country: "Australia",
              level: "Master",
              duration: "1.5 years",
              category: "Law",
              language: "English",
              description: "Specialized law program focusing on international legal systems and human rights."
            },
            {
              id: 6,
              program_name: "Data Science",
              university_name: "National University of Singapore",
              country: "Singapore",
              level: "Master",
              duration: "1.5 years",
              category: "Technology",
              language: "English",
              description: "Advanced data science program with machine learning and big data analytics."
            },
            {
              id: 7,
              program_name: "Psychology",
              university_name: "University of Amsterdam",
              country: "Netherlands",
              level: "Bachelor",
              duration: "3 years",
              category: "Social Sciences",
              language: "English",
              description: "Comprehensive psychology program with research methods and clinical applications."
            },
            {
              id: 8,
              program_name: "Architecture",
              university_name: "Technical University of Munich",
              country: "Germany",
              level: "Master",
              duration: "2 years",
              category: "Design",
              language: "English/German",
              description: "Innovative architecture program combining design theory with sustainable practices."
            }
          ]
          setCourses(sampleCourses)
        }
      } catch (error) {
        console.error('Error fetching global courses data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter courses based on search and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.program_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.university_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.category?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCountry = !selectedCountry || course.country === selectedCountry
    const matchesLevel = !selectedLevel || course.level === selectedLevel
    const matchesCategory = !selectedCategory || course.category === selectedCategory
    const matchesUniversity = !selectedUniversity || course.university_name === selectedUniversity

    return matchesSearch && matchesCountry && matchesLevel && matchesCategory && matchesUniversity
  })

  const uniqueCountries = [...new Set(courses.map(course => course.country))].filter(Boolean)
  const uniqueLevels = [...new Set(courses.map(course => course.level))].filter(Boolean)
  const uniqueCategories = [...new Set(courses.map(course => course.category))].filter(Boolean)
  const uniqueUniversities = [...new Set(courses.map(course => course.university_name))].filter(Boolean)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="flex">
      <Sidebar 
        isOpen={true}
        onClose={() => {}}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={onMobileMenuClose}
      />

      <main className="flex-1 w-full md:w-auto transition-all duration-300 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-pink-600 via-purple-600 to-cyan-500 text-white py-12">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center">
                <BookOpen className="h-12 w-12 mr-4" />
                Global Courses
              </h1>
              <p className="text-xl mb-6 max-w-3xl mx-auto">
                Explore thousands of courses from top universities worldwide. Find your perfect program across different countries, levels, and disciplines.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="grid md:grid-cols-6 gap-4">
                {/* Search */}
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search courses, universities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Country Filter */}
                <div>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Countries</SelectItem>
                      {uniqueCountries.map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Level Filter */}
                <div>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Levels</SelectItem>
                      {uniqueLevels.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Category Filter */}
                <div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {uniqueCategories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                <div>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCountry('')
                      setSelectedLevel('')
                      setSelectedCategory('')
                      setSelectedUniversity('')
                    }}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredCourses.length} of {courses.length} courses
              </p>
            </div>

            {/* Courses Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className="bg-pink-100 text-pink-700">
                        {course.level}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {course.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl line-clamp-2">
                      {course.program_name}
                    </CardTitle>
                    <div className="flex items-center text-gray-600 text-sm">
                      <GraduationCap className="h-4 w-4 mr-1" />
                      {course.university_name}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600 text-sm">
                        <Globe className="h-4 w-4 mr-2" />
                        {course.country}
                      </div>
                      
                      <div className="flex items-center text-gray-600 text-sm">
                        <Clock className="h-4 w-4 mr-2" />
                        {course.duration}
                      </div>
                      
                      <div className="flex items-center text-gray-600 text-sm">
                        <Languages className="h-4 w-4 mr-2" />
                        {course.language}
                      </div>
                      
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {course.description}
                      </p>
                      
                      <div className="flex space-x-2 pt-4">
                        <Button size="sm" className="flex-1">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
                <p className="text-gray-500">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

