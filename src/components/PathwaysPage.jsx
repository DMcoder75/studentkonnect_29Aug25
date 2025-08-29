import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowRight, Search, Filter, Route, BookOpen, ArrowLeft } from 'lucide-react'
import Sidebar from './Sidebar'

export default function PathwaysPage({ isMobileMenuOpen, onMobileMenuClose }) {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [pathways, setPathways] = useState([])
  const [filteredPathways, setFilteredPathways] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  // Read URL parameters and set initial filter state
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      setCategoryFilter(categoryParam)
    } else {
      setCategoryFilter('all')
    }
  }, [searchParams])

  useEffect(() => {
    const fetchPathways = async () => {
      try {
        setLoading(true)
        
        // Sample pathways data
        const sampleData = [
          {
            id: 635,
            title: "Medicine & Health Sciences",
            category: "Health",
            description: "Comprehensive pathway to medical careers including medicine, nursing, pharmacy, and allied health professions with multiple entry points and specialization options.",
            duration: "3-8 years",
            entry_requirements: "ATAR 85-99.95",
            career_prospects: "Doctor, Nurse, Pharmacist, Physiotherapist, Dentist",
            average_salary: "$85,000 - $200,000",
            universities: ["University of Melbourne", "University of Sydney", "Monash University"],
            courses_count: 45
          },
          {
            id: 636,
            title: "Engineering & Technology",
            category: "Engineering",
            description: "Diverse engineering disciplines from civil to software engineering, preparing students for the future of technology and innovation.",
            duration: "4-5 years",
            entry_requirements: "ATAR 80-96",
            career_prospects: "Software Engineer, Civil Engineer, Mechanical Engineer, Data Scientist",
            average_salary: "$75,000 - $150,000",
            universities: ["UNSW Sydney", "University of Melbourne", "University of Queensland"],
            courses_count: 38
          },
          {
            id: 637,
            title: "Business & Commerce",
            category: "Business",
            description: "Business pathways covering finance, marketing, management, and entrepreneurship with strong industry connections and practical experience.",
            duration: "3-4 years",
            entry_requirements: "ATAR 70-95",
            career_prospects: "Business Analyst, Marketing Manager, Financial Advisor, Consultant",
            average_salary: "$65,000 - $120,000",
            universities: ["University of Melbourne", "University of Sydney", "Monash University"],
            courses_count: 52
          },
          {
            id: 638,
            title: "Law & Legal Studies",
            category: "Law",
            description: "Legal education pathways from undergraduate law to specialized postgraduate programs in various areas of legal practice.",
            duration: "4-6 years",
            entry_requirements: "ATAR 95-99.5",
            career_prospects: "Lawyer, Barrister, Legal Advisor, Judge, Corporate Counsel",
            average_salary: "$80,000 - $180,000",
            universities: ["University of Melbourne", "University of Sydney", "ANU"],
            courses_count: 28
          },
          {
            id: 639,
            title: "Education & Teaching",
            category: "Education",
            description: "Teaching pathways for primary, secondary, and tertiary education with specializations in various subjects and age groups.",
            duration: "4 years",
            entry_requirements: "ATAR 65-85",
            career_prospects: "Primary Teacher, Secondary Teacher, Education Administrator, Curriculum Developer",
            average_salary: "$60,000 - $95,000",
            universities: ["Deakin University", "University of Melbourne", "University of Sydney"],
            courses_count: 35
          },
          {
            id: 640,
            title: "Arts & Creative Industries",
            category: "Arts",
            description: "Creative pathways including visual arts, performing arts, design, media, and creative writing with industry connections.",
            duration: "3-4 years",
            entry_requirements: "ATAR 60-90",
            career_prospects: "Graphic Designer, Artist, Writer, Film Producer, Art Director",
            average_salary: "$50,000 - $85,000",
            universities: ["RMIT University", "University of Technology Sydney", "Griffith University"],
            courses_count: 42
          },
          {
            id: 641,
            title: "Science & Research",
            category: "Science",
            description: "Scientific research pathways covering biology, chemistry, physics, environmental science, and emerging fields.",
            duration: "3-8 years",
            entry_requirements: "ATAR 75-95",
            career_prospects: "Research Scientist, Laboratory Technician, Environmental Consultant, Data Analyst",
            average_salary: "$65,000 - $110,000",
            universities: ["Australian National University", "University of Melbourne", "University of Queensland"],
            courses_count: 48
          },
          {
            id: 642,
            title: "Information Technology",
            category: "Technology",
            description: "IT pathways covering software development, cybersecurity, data science, and emerging technologies.",
            duration: "3-4 years",
            entry_requirements: "ATAR 70-95",
            career_prospects: "Software Developer, Cybersecurity Analyst, Data Scientist, IT Manager",
            average_salary: "$70,000 - $140,000",
            universities: ["University of Technology Sydney", "UNSW Sydney", "Monash University"],
            courses_count: 36
          }
        ]
        
        setPathways(sampleData)
        setFilteredPathways(sampleData)
      } catch (error) {
        console.error('Error fetching pathways:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPathways()
  }, [])

  useEffect(() => {
    let filtered = pathways

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(pathway =>
        pathway.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (pathway.description && pathway.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(pathway => {
        const title = pathway.title.toLowerCase()
        if (categoryFilter === 'business') return title.includes('business') || title.includes('commerce')
        if (categoryFilter === 'engineering') return title.includes('engineering') || title.includes('technology')
        if (categoryFilter === 'health') return title.includes('health') || title.includes('medicine')
        if (categoryFilter === 'education') return title.includes('education') || title.includes('teaching')
        if (categoryFilter === 'arts') return title.includes('arts') || title.includes('creative')
        return true
      })
    }

    setFilteredPathways(filtered)
  }, [searchTerm, categoryFilter, pathways])

  const handleCategoryFilterChange = (newCategory) => {
    setCategoryFilter(newCategory)
    
    // Update URL parameters
    const newSearchParams = new URLSearchParams(searchParams)
    if (newCategory === 'all') {
      newSearchParams.delete('category')
    } else {
      newSearchParams.set('category', newCategory)
    }
    setSearchParams(newSearchParams)
  }

  const getCategoryColor = (pathwayTitle) => {
    const title = pathwayTitle.toLowerCase()
    if (title.includes('business') || title.includes('commerce')) {
      return 'bg-blue-100 text-blue-700'
    }
    if (title.includes('engineering') || title.includes('technology')) {
      return 'bg-purple-100 text-purple-700'
    }
    if (title.includes('health') || title.includes('medicine')) {
      return 'bg-green-100 text-green-700'
    }
    if (title.includes('education') || title.includes('teaching')) {
      return 'bg-orange-100 text-orange-700'
    }
    if (title.includes('arts') || title.includes('creative')) {
      return 'bg-pink-100 text-pink-700'
    }
    if (title.includes('science') || title.includes('research')) {
      return 'bg-cyan-100 text-cyan-700'
    }
    if (title.includes('law') || title.includes('legal')) {
      return 'bg-indigo-100 text-indigo-700'
    }
    return 'bg-gray-100 text-gray-700'
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
      {/* Floating Back Button for Mobile - Always Visible */}
      <div className="fixed top-20 left-4 z-50 block md:hidden">
        <button
          onClick={() => navigate('/')}
          className="flex items-center bg-white text-gray-700 px-3 py-2 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      {/* Mobile Back Button */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="font-medium">Back to Home</span>
        </button>
      </div>

      {/* Reduced Height Hero Section - Full Width */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-12 w-full">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Route className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Career Pathways
              </h1>
            </div>
            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
              Discover structured pathways to your dream career through specialized courses and programs.
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
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search pathways..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-600" />
                  <Select value={categoryFilter} onValueChange={handleCategoryFilterChange}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="business">Business & Finance</SelectItem>
                      <SelectItem value="engineering">Engineering & Tech</SelectItem>
                      <SelectItem value="health">Health Sciences</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="arts">Arts & Creative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                Showing {filteredPathways.length} of {pathways.length} pathways
              </div>
            </div>
          </section>

          {/* Pathways Grid */}
          <section className="py-12">
            <div className="container mx-auto px-6">
              {filteredPathways.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Route className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No pathways found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPathways.map((pathway) => (
                    <Card key={pathway.id} className="group hover:shadow-lg transition-all duration-200 border-l-4 border-l-purple-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between mb-2">
                          <Badge 
                            variant="secondary" 
                            className={getCategoryColor(pathway.title)}
                          >
                            {pathway.category}
                          </Badge>
                          <div className="flex items-center text-purple-600">
                            <BookOpen className="h-4 w-4 mr-1" />
                            <span className="text-sm font-semibold">{pathway.duration || 'Flexible'}</span>
                          </div>
                        </div>
                        <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
                          {pathway.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <p className="text-sm text-gray-600 line-clamp-3">
                            {pathway.description || 'Structured pathway designed to help you achieve your career goals through specialized courses and programs.'}
                          </p>
                          
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-gray-700">Career Prospects:</h4>
                            <p className="text-xs text-gray-600">{pathway.career_prospects}</p>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-gray-700">Average Salary:</h4>
                            <p className="text-xs text-green-600 font-semibold">{pathway.average_salary}</p>
                          </div>
                          
                          <Button 
                            variant="outline" 
                            className="w-full group-hover:bg-purple-600 group-hover:text-white transition-all duration-200"
                            onClick={() => navigate(`/pathways/${pathway.id}`)}
                          >
                            Explore Pathway <ArrowRight className="ml-2 h-4 w-4" />
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

