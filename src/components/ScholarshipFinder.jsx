import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Search, 
  Filter, 
  BookmarkPlus,
  DollarSign,
  Calendar,
  MapPin,
  Users,
  Award,
  TrendingUp,
  Star,
  ExternalLink,
  Heart,
  Clock,
  Target,
  Zap,
  CheckCircle
} from 'lucide-react'
import Sidebar from './Sidebar'

export default function ScholarshipFinder({ isMobileMenuOpen, onMobileMenuClose }) {
  const [scholarships, setScholarships] = useState([])
  const [filteredScholarships, setFilteredScholarships] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    scholarshipType: 'all',
    amountMin: '',
    amountMax: '',
    academicLevel: 'all',
    fieldOfStudy: '',
    location: 'all',
    deadline: 'all'
  })
  const [bookmarkedScholarships, setBookmarkedScholarships] = useState(new Set())
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('relevance')

  useEffect(() => {
    fetchScholarships()
  }, [])

  useEffect(() => {
    applyFiltersAndSearch()
  }, [scholarships, searchQuery, filters, sortBy])

  const fetchScholarships = async () => {
    try {
      setLoading(true)
      // Mock data - in real app this would come from Supabase
      const mockScholarships = [
        {
          id: '1',
          name: 'Australian Government Research Training Program (RTP)',
          provider: 'Australian Government',
          description: 'The Research Training Program provides funding support to higher degree by research students at Australian universities.',
          amount: 28854,
          scholarshipType: 'research',
          renewable: true,
          durationMonths: 36,
          applicationEndDate: '2024-10-31',
          eligibilitySummary: 'Australian citizens, permanent residents, and New Zealand citizens undertaking research higher degrees',
          tags: ['research', 'phd', 'masters', 'government', 'australian'],
          featured: true,
          viewCount: 1250,
          applicationCount: 89,
          matchScore: 95
        },
        {
          id: '2',
          name: 'Women in STEM Excellence Scholarship',
          provider: 'Tech Industry Foundation',
          description: 'Encouraging women to pursue careers in Science, Technology, Engineering, and Mathematics.',
          amount: 10000,
          scholarshipType: 'equity',
          renewable: false,
          durationMonths: 12,
          applicationEndDate: '2024-08-31',
          eligibilitySummary: 'Female students enrolled in STEM undergraduate or postgraduate programs',
          tags: ['women', 'stem', 'technology', 'engineering', 'science'],
          featured: true,
          viewCount: 634,
          applicationCount: 78,
          matchScore: 88
        },
        {
          id: '3',
          name: 'Indigenous Commonwealth Scholarship',
          provider: 'Australian Government',
          description: 'Supporting Indigenous Australian students in their higher education journey.',
          amount: 15000,
          scholarshipType: 'equity',
          renewable: false,
          durationMonths: 12,
          applicationEndDate: '2024-11-15',
          eligibilitySummary: 'Indigenous Australian students enrolled in undergraduate or postgraduate programs',
          tags: ['indigenous', 'equity', 'undergraduate', 'postgraduate', 'government'],
          featured: true,
          viewCount: 756,
          applicationCount: 45,
          matchScore: 75
        },
        {
          id: '4',
          name: 'International Student Excellence Award',
          provider: 'Global Education Partners',
          description: 'Recognizing outstanding international students studying in Australia.',
          amount: 20000,
          scholarshipType: 'international',
          renewable: false,
          durationMonths: 12,
          applicationEndDate: '2024-07-15',
          eligibilitySummary: 'International students with exceptional academic records and community involvement',
          tags: ['international', 'excellence', 'community', 'leadership'],
          featured: true,
          viewCount: 567,
          applicationCount: 23,
          matchScore: 82
        },
        {
          id: '5',
          name: 'Rural and Regional Student Support',
          provider: 'Regional Education Foundation',
          description: 'Financial assistance for students from rural and regional areas to access higher education.',
          amount: 8000,
          scholarshipType: 'need-based',
          renewable: false,
          durationMonths: 12,
          applicationEndDate: '2024-12-31',
          eligibilitySummary: 'Students from rural/regional areas with demonstrated financial need',
          tags: ['rural', 'regional', 'financial-need', 'access', 'equity'],
          featured: false,
          viewCount: 423,
          applicationCount: 34,
          matchScore: 65
        },
        {
          id: '6',
          name: 'Sports Excellence Scholarship',
          provider: 'Australian Sports Foundation',
          description: 'Supporting student-athletes who excel in both academics and sports.',
          amount: 12000,
          scholarshipType: 'sports',
          renewable: true,
          durationMonths: 24,
          applicationEndDate: '2024-09-30',
          eligibilitySummary: 'Student-athletes with state or national level competition experience',
          tags: ['sports', 'athletics', 'excellence', 'leadership'],
          featured: false,
          viewCount: 289,
          applicationCount: 12,
          matchScore: 70
        }
      ]
      
      setScholarships(mockScholarships)
    } catch (error) {
      console.error('Error fetching scholarships:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFiltersAndSearch = () => {
    let filtered = [...scholarships]

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(scholarship =>
        scholarship.name.toLowerCase().includes(query) ||
        scholarship.description.toLowerCase().includes(query) ||
        scholarship.provider.toLowerCase().includes(query) ||
        scholarship.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Apply filters
    if (filters.scholarshipType !== 'all') {
      filtered = filtered.filter(s => s.scholarshipType === filters.scholarshipType)
    }

    if (filters.amountMin) {
      filtered = filtered.filter(s => s.amount >= parseInt(filters.amountMin))
    }

    if (filters.amountMax) {
      filtered = filtered.filter(s => s.amount <= parseInt(filters.amountMax))
    }

    if (filters.deadline !== 'all') {
      const now = new Date()
      const oneMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
      const threeMonths = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)

      filtered = filtered.filter(s => {
        const deadline = new Date(s.applicationEndDate)
        switch (filters.deadline) {
          case 'closing_soon':
            return deadline <= oneMonth
          case 'next_3_months':
            return deadline <= threeMonths
          case 'open':
            return deadline > now
          default:
            return true
        }
      })
    }

    // Apply sorting
    switch (sortBy) {
      case 'amount_high':
        filtered.sort((a, b) => b.amount - a.amount)
        break
      case 'amount_low':
        filtered.sort((a, b) => a.amount - b.amount)
        break
      case 'deadline':
        filtered.sort((a, b) => new Date(a.applicationEndDate) - new Date(b.applicationEndDate))
        break
      case 'match_score':
        filtered.sort((a, b) => b.matchScore - a.matchScore)
        break
      case 'popularity':
        filtered.sort((a, b) => b.viewCount - a.viewCount)
        break
      default: // relevance
        filtered.sort((a, b) => b.matchScore - a.matchScore)
    }

    setFilteredScholarships(filtered)
  }

  const handleBookmark = (scholarshipId) => {
    const newBookmarks = new Set(bookmarkedScholarships)
    if (newBookmarks.has(scholarshipId)) {
      newBookmarks.delete(scholarshipId)
    } else {
      newBookmarks.add(scholarshipId)
    }
    setBookmarkedScholarships(newBookmarks)
  }

  const getScholarshipTypeColor = (type) => {
    switch (type) {
      case 'merit-based': return 'bg-blue-100 text-blue-700'
      case 'need-based': return 'bg-green-100 text-green-700'
      case 'equity': return 'bg-purple-100 text-purple-700'
      case 'research': return 'bg-orange-100 text-orange-700'
      case 'sports': return 'bg-red-100 text-red-700'
      case 'international': return 'bg-cyan-100 text-cyan-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getDaysUntilDeadline = (deadline) => {
    const now = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getDeadlineColor = (days) => {
    if (days <= 7) return 'text-red-600'
    if (days <= 30) return 'text-orange-600'
    return 'text-green-600'
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
      {/* Hero Section - Full Width */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-12 w-full">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              Scholarship Finder
            </h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
              Discover scholarships that match your profile and aspirations. Find funding opportunities tailored to your academic journey.
            </p>
          </div>
        </div>
      </section>

      {/* Two-Column Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={true}
          onClose={() => {}}
          isHomepage={false}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={onMobileMenuClose}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full md:w-auto transition-all duration-300">
          <div className="container mx-auto px-6 py-12">
            
            {/* Search and Filter Section */}
            <Card className="mb-8 shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2 text-purple-600" />
                  Find Your Perfect Scholarship
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search Bar */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search scholarships by name, provider, or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-12 text-lg"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="h-12 px-6"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>

                {/* Advanced Filters */}
                {showFilters && (
                  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <Label htmlFor="scholarshipType">Scholarship Type</Label>
                      <Select value={filters.scholarshipType} onValueChange={(value) => setFilters({...filters, scholarshipType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="merit-based">Merit-Based</SelectItem>
                          <SelectItem value="need-based">Need-Based</SelectItem>
                          <SelectItem value="equity">Equity</SelectItem>
                          <SelectItem value="research">Research</SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="international">International</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="amountMin">Min Amount (AUD)</Label>
                      <Input
                        id="amountMin"
                        type="number"
                        placeholder="5000"
                        value={filters.amountMin}
                        onChange={(e) => setFilters({...filters, amountMin: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="amountMax">Max Amount (AUD)</Label>
                      <Input
                        id="amountMax"
                        type="number"
                        placeholder="50000"
                        value={filters.amountMax}
                        onChange={(e) => setFilters({...filters, amountMax: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="deadline">Application Deadline</Label>
                      <Select value={filters.deadline} onValueChange={(value) => setFilters({...filters, deadline: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Deadlines" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Deadlines</SelectItem>
                          <SelectItem value="closing_soon">Closing Soon (30 days)</SelectItem>
                          <SelectItem value="next_3_months">Next 3 Months</SelectItem>
                          <SelectItem value="open">Currently Open</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Sort and Results Count */}
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Found {filteredScholarships.length} scholarships
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="sortBy" className="text-sm">Sort by:</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="match_score">Match Score</SelectItem>
                        <SelectItem value="amount_high">Amount (High to Low)</SelectItem>
                        <SelectItem value="amount_low">Amount (Low to High)</SelectItem>
                        <SelectItem value="deadline">Deadline</SelectItem>
                        <SelectItem value="popularity">Popularity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Tabs defaultValue="grid" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>

              {/* Grid View */}
              <TabsContent value="grid">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredScholarships.map((scholarship) => {
                    const daysUntilDeadline = getDaysUntilDeadline(scholarship.applicationEndDate)
                    const isBookmarked = bookmarkedScholarships.has(scholarship.id)
                    
                    return (
                      <Card key={scholarship.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start mb-2">
                            <Badge className={`${getScholarshipTypeColor(scholarship.scholarshipType)} text-xs`}>
                              {scholarship.scholarshipType.replace('-', ' ').toUpperCase()}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleBookmark(scholarship.id)}
                              className={`p-1 ${isBookmarked ? 'text-red-500' : 'text-gray-400'}`}
                            >
                              <Heart className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                            </Button>
                          </div>
                          <CardTitle className="text-lg leading-tight">{scholarship.name}</CardTitle>
                          <p className="text-sm text-gray-600">{scholarship.provider}</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-gray-700 line-clamp-3">{scholarship.description}</p>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-green-600">
                                <DollarSign className="h-4 w-4 mr-1" />
                                <span className="font-semibold">{formatCurrency(scholarship.amount)}</span>
                              </div>
                              {scholarship.matchScore && (
                                <div className="flex items-center text-purple-600">
                                  <Target className="h-4 w-4 mr-1" />
                                  <span className="text-sm font-medium">{scholarship.matchScore}% match</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center text-gray-600">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{scholarship.durationMonths} months</span>
                              </div>
                              <div className={`flex items-center ${getDeadlineColor(daysUntilDeadline)}`}>
                                <Calendar className="h-4 w-4 mr-1" />
                                <span className="font-medium">
                                  {daysUntilDeadline > 0 ? `${daysUntilDeadline} days left` : 'Deadline passed'}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {scholarship.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {scholarship.tags.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{scholarship.tags.length - 3} more
                              </Badge>
                            )}
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Button className="flex-1" size="sm">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Check Eligibility
                            </Button>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>

              {/* List View */}
              <TabsContent value="list">
                <div className="space-y-4">
                  {filteredScholarships.map((scholarship) => {
                    const daysUntilDeadline = getDaysUntilDeadline(scholarship.applicationEndDate)
                    const isBookmarked = bookmarkedScholarships.has(scholarship.id)
                    
                    return (
                      <Card key={scholarship.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <Badge className={`${getScholarshipTypeColor(scholarship.scholarshipType)} text-xs`}>
                                  {scholarship.scholarshipType.replace('-', ' ').toUpperCase()}
                                </Badge>
                                {scholarship.featured && (
                                  <Badge className="bg-yellow-100 text-yellow-700 text-xs">
                                    <Star className="h-3 w-3 mr-1" />
                                    Featured
                                  </Badge>
                                )}
                                {scholarship.matchScore && (
                                  <Badge className="bg-purple-100 text-purple-700 text-xs">
                                    <Target className="h-3 w-3 mr-1" />
                                    {scholarship.matchScore}% match
                                  </Badge>
                                )}
                              </div>
                              
                              <h3 className="text-xl font-semibold mb-1">{scholarship.name}</h3>
                              <p className="text-gray-600 mb-2">{scholarship.provider}</p>
                              <p className="text-gray-700 mb-4">{scholarship.description}</p>
                              
                              <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center text-green-600">
                                  <DollarSign className="h-4 w-4 mr-1" />
                                  <span className="font-semibold">{formatCurrency(scholarship.amount)}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{scholarship.durationMonths} months</span>
                                </div>
                                <div className={`flex items-center ${getDeadlineColor(daysUntilDeadline)}`}>
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span className="font-medium">
                                    {daysUntilDeadline > 0 ? `${daysUntilDeadline} days left` : 'Deadline passed'}
                                  </span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <Users className="h-4 w-4 mr-1" />
                                  <span>{scholarship.applicationCount} applicants</span>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-1 mt-3">
                                {scholarship.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end gap-2 ml-6">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleBookmark(scholarship.id)}
                                className={`p-2 ${isBookmarked ? 'text-red-500' : 'text-gray-400'}`}
                              >
                                <Heart className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                              </Button>
                              
                              <div className="flex flex-col gap-2">
                                <Button size="sm" className="w-32">
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Check Eligibility
                                </Button>
                                <Button variant="outline" size="sm" className="w-32">
                                  <ExternalLink className="h-4 w-4 mr-1" />
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>
            </Tabs>

            {/* No Results */}
            {filteredScholarships.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No scholarships found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or filters to find more scholarships.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery('')
                      setFilters({
                        scholarshipType: 'all',
                        amountMin: '',
                        amountMax: '',
                        academicLevel: 'all',
                        fieldOfStudy: '',
                        location: 'all',
                        deadline: 'all'
                      })
                    }}
                  >
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

