import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowRight, Search, Filter, Route, BookOpen } from 'lucide-react'
import { dbHelpers } from '../lib/supabase'
import Sidebar from './Sidebar'

export default function PathwaysPage({ isMobileMenuOpen, onMobileMenuClose }) {
  const navigate = useNavigate()
  const [pathways, setPathways] = useState([])
  const [filteredPathways, setFilteredPathways] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPathways = async () => {
      try {
        setLoading(true)
        const data = await dbHelpers.getPathways()
        setPathways(data)
        setFilteredPathways(data)
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
        pathway.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (pathway.description && pathway.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(pathway => {
        const name = pathway.name.toLowerCase()
        if (categoryFilter === 'business') return name.includes('business') || name.includes('accounting') || name.includes('finance')
        if (categoryFilter === 'engineering') return name.includes('engineering') || name.includes('technology')
        if (categoryFilter === 'health') return name.includes('health') || name.includes('medical') || name.includes('nursing')
        if (categoryFilter === 'education') return name.includes('education') || name.includes('teaching')
        if (categoryFilter === 'arts') return name.includes('arts') || name.includes('creative') || name.includes('design')
        return true
      })
    }

    setFilteredPathways(filtered)
  }, [searchTerm, categoryFilter, pathways])

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
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
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
                    <Card key={pathway.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge 
                            variant="secondary" 
                            className={getCategoryColor(pathway.name)}
                          >
                            {pathway.name.includes('business') || pathway.name.includes('accounting') ? 'Business' :
                             pathway.name.includes('engineering') || pathway.name.includes('technology') ? 'Engineering' :
                             pathway.name.includes('health') || pathway.name.includes('medical') ? 'Health' :
                             pathway.name.includes('education') || pathway.name.includes('teaching') ? 'Education' :
                             pathway.name.includes('arts') || pathway.name.includes('creative') ? 'Arts' : 'General'}
                          </Badge>
                          <div className="flex items-center text-purple-600">
                            <BookOpen className="h-4 w-4 mr-1" />
                            <span className="text-sm font-semibold">{pathway.duration || 'Flexible'}</span>
                          </div>
                        </div>
                        <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
                          {pathway.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <p className="text-sm text-gray-600 line-clamp-3">
                            {pathway.description || 'Structured pathway designed to help you achieve your career goals through specialized courses and programs.'}
                          </p>
                          
                          {pathway.typical_progression && pathway.typical_progression.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-gray-700">Typical Progression:</h4>
                              <div className="flex flex-wrap gap-1">
                                {pathway.typical_progression.slice(0, 3).map((step, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {step}
                                  </Badge>
                                ))}
                                {pathway.typical_progression.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{pathway.typical_progression.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                          
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

