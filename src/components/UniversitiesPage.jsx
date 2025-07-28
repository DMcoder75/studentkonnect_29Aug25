import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowRight, Star, Heart, Search, Filter, GraduationCap } from 'lucide-react'
import Sidebar from './Sidebar'

export default function UniversitiesPage({ favorites, setFavorites, isMobileMenuOpen, onMobileMenuClose }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [universities, setUniversities] = useState([])
  const [filteredUniversities, setFilteredUniversities] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  // Read URL parameters and set initial filter state
  useEffect(() => {
    const typeParam = searchParams.get('type')
    if (typeParam) {
      setTypeFilter(typeParam)
    } else {
      setTypeFilter('all')
    }
  }, [searchParams])

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true)
        
        // Sample universities data
        const sampleData = [
          {
            id: 1,
            name: "University of Melbourne",
            type: "Group of Eight",
            global_ranking: 33,
            location: "Melbourne, VIC",
            website_url: "https://www.unimelb.edu.au",
            description: "Australia's leading university with world-class research and teaching excellence.",
            established: 1853,
            student_count: 50000,
            international_students: 18000
          },
          {
            id: 2,
            name: "University of Sydney",
            type: "Group of Eight",
            global_ranking: 41,
            location: "Sydney, NSW",
            website_url: "https://www.sydney.edu.au",
            description: "Australia's first university, established in 1850 with a rich history of academic excellence.",
            established: 1850,
            student_count: 52000,
            international_students: 22000
          },
          {
            id: 3,
            name: "Australian National University",
            type: "Group of Eight",
            global_ranking: 30,
            location: "Canberra, ACT",
            website_url: "https://www.anu.edu.au",
            description: "Australia's national university with excellence in research and education.",
            established: 1946,
            student_count: 25000,
            international_students: 12000
          },
          {
            id: 4,
            name: "UNSW Sydney",
            type: "Group of Eight",
            global_ranking: 45,
            location: "Sydney, NSW",
            website_url: "https://www.unsw.edu.au",
            description: "Leading university in engineering, business and medicine with strong industry connections.",
            established: 1949,
            student_count: 65000,
            international_students: 25000
          },
          {
            id: 5,
            name: "University of Queensland",
            type: "Group of Eight",
            global_ranking: 50,
            location: "Brisbane, QLD",
            website_url: "https://www.uq.edu.au",
            description: "Premier research university in Queensland with beautiful campus and excellent facilities.",
            established: 1909,
            student_count: 55000,
            international_students: 20000
          },
          {
            id: 6,
            name: "Monash University",
            type: "Group of Eight",
            global_ranking: 57,
            location: "Melbourne, VIC",
            website_url: "https://www.monash.edu",
            description: "Global university with campuses worldwide and strong research focus.",
            established: 1958,
            student_count: 80000,
            international_students: 30000
          },
          {
            id: 7,
            name: "University of Western Australia",
            type: "Group of Eight",
            global_ranking: 90,
            location: "Perth, WA",
            website_url: "https://www.uwa.edu.au",
            description: "Leading university in Western Australia with beautiful campus and strong research programs.",
            established: 1911,
            student_count: 25000,
            international_students: 8000
          },
          {
            id: 8,
            name: "University of Adelaide",
            type: "Group of Eight",
            global_ranking: 106,
            location: "Adelaide, SA",
            website_url: "https://www.adelaide.edu.au",
            description: "Historic university with strong traditions in research and education.",
            established: 1874,
            student_count: 27000,
            international_students: 9000
          },
          {
            id: 9,
            name: "University of Technology Sydney",
            type: "Technology Network",
            global_ranking: 133,
            location: "Sydney, NSW",
            website_url: "https://www.uts.edu.au",
            description: "Modern technology-focused university with strong industry partnerships.",
            established: 1988,
            student_count: 45000,
            international_students: 15000
          },
          {
            id: 10,
            name: "Queensland University of Technology",
            type: "Technology Network",
            global_ranking: 213,
            location: "Brisbane, QLD",
            website_url: "https://www.qut.edu.au",
            description: "Technology-focused university with practical, career-oriented programs.",
            established: 1989,
            student_count: 50000,
            international_students: 12000
          },
          {
            id: 11,
            name: "Griffith University",
            type: "Regional",
            global_ranking: 300,
            location: "Gold Coast, QLD",
            website_url: "https://www.griffith.edu.au",
            description: "Innovative university with strong focus on sustainability and social justice.",
            established: 1971,
            student_count: 50000,
            international_students: 15000
          },
          {
            id: 12,
            name: "Macquarie University",
            type: "Regional",
            global_ranking: 195,
            location: "Sydney, NSW",
            website_url: "https://www.mq.edu.au",
            description: "Research-intensive university with beautiful campus and strong business programs.",
            established: 1964,
            student_count: 45000,
            international_students: 18000
          }
        ]
        
        setUniversities(sampleData)
        setFilteredUniversities(sampleData)
      } catch (error) {
        console.error('Error fetching universities:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUniversities()
  }, [])

  useEffect(() => {
    let filtered = universities

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(uni =>
        uni.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(uni => {
        if (typeFilter === 'go8') return uni.type === 'Group of Eight'
        if (typeFilter === 'tech') return uni.type === 'Technology Network'
        if (typeFilter === 'regional') return uni.type === 'Regional'
        if (typeFilter === 'private') return uni.type === 'Private'
        return true
      })
    }

    setFilteredUniversities(filtered)
  }, [searchTerm, typeFilter, universities])

  const handleTypeFilterChange = (newType) => {
    setTypeFilter(newType)
    
    // Update URL parameters
    const newSearchParams = new URLSearchParams(searchParams)
    if (newType === 'all') {
      newSearchParams.delete('type')
    } else {
      newSearchParams.set('type', newType)
    }
    setSearchParams(newSearchParams)
  }

  const toggleFavorite = (universityId) => {
    setFavorites(prev => 
      prev.includes(universityId) 
        ? prev.filter(id => id !== universityId)
        : [...prev, universityId]
    )
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
              <GraduationCap className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Universities
              </h1>
            </div>
            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
              Explore Australia's leading universities and find the perfect institution for your academic journey.
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
                    placeholder="Search universities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-600" />
                  <Select value={typeFilter} onValueChange={handleTypeFilterChange}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Universities</SelectItem>
                      <SelectItem value="go8">Group of Eight</SelectItem>
                      <SelectItem value="tech">Technology Network</SelectItem>
                      <SelectItem value="regional">Regional</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                Showing {filteredUniversities.length} of {universities.length} universities
              </div>
            </div>
          </section>

          {/* Universities Grid */}
          <section className="py-12">
            <div className="container mx-auto px-6">
              {filteredUniversities.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <GraduationCap className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No universities found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredUniversities.map((university) => (
                    <Card key={university.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge 
                            variant="secondary" 
                            className={`${
                              university.type === 'Group of Eight' ? 'bg-purple-100 text-purple-700' :
                              university.type === 'Technology Network' ? 'bg-blue-100 text-blue-700' :
                              university.type === 'Regional' ? 'bg-green-100 text-green-700' :
                              'bg-orange-100 text-orange-700'
                            }`}
                          >
                            {university.type || 'University'}
                          </Badge>
                          <div className="flex items-center gap-2">
                            {university.global_ranking && (
                              <div className="flex items-center text-yellow-600">
                                <Star className="h-4 w-4 mr-1" />
                                <span className="text-sm font-semibold">#{university.global_ranking}</span>
                              </div>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleFavorite(university.id)}
                              className="p-1 h-8 w-8"
                            >
                              <Heart 
                                className={`h-4 w-4 ${
                                  favorites.includes(university.id) 
                                    ? 'fill-red-500 text-red-500' 
                                    : 'text-gray-400 hover:text-red-500'
                                }`} 
                              />
                            </Button>
                          </div>
                        </div>
                        <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
                          {university.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="text-sm text-gray-600">
                            {university.global_ranking ? `Global Ranking: #${university.global_ranking}` : 'Leading Australian University'}
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              className="flex-1 group-hover:bg-purple-600 group-hover:text-white transition-all duration-200"
                              onClick={() => window.open(university.website_url, '_blank')}
                            >
                              Visit Website <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            {university.atar_profile_url && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => window.open(university.atar_profile_url, '_blank')}
                                className="px-3"
                              >
                                ATAR
                              </Button>
                            )}
                          </div>
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

