import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  MapPin, 
  Clock, 
  Star,
  Briefcase,
  GraduationCap,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  ArrowUp,
  ArrowDown,
  ExternalLink
} from 'lucide-react'
import Sidebar from './Sidebar'

export default function CareerInsightsPage({ isMobileMenuOpen, onMobileMenuClose }) {
  const [professions, setProfessions] = useState([])
  const [pathways, setPathways] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Sample career data with numeric salary values
        const professionsData = [
          {
            id: 1,
            title: 'Software Engineer',
            category: 'Technology',
            averageSalary: '$95,000',
            average_salary: 95000,
            growth: '+22%',
            demand: 'High',
            education: 'Bachelor\'s in Computer Science',
            skills: ['Programming', 'Problem Solving', 'Teamwork'],
            description: 'Design and develop software applications and systems.'
          },
          {
            id: 2,
            title: 'Data Scientist',
            category: 'Technology',
            averageSalary: '$110,000',
            average_salary: 110000,
            growth: '+31%',
            demand: 'Very High',
            education: 'Master\'s in Data Science or Statistics',
            skills: ['Python', 'Machine Learning', 'Statistics'],
            description: 'Analyze complex data to help organizations make decisions.'
          },
          {
            id: 3,
            title: 'Registered Nurse',
            category: 'Healthcare',
            averageSalary: '$75,000',
            average_salary: 75000,
            growth: '+7%',
            demand: 'High',
            education: 'Bachelor\'s in Nursing',
            skills: ['Patient Care', 'Communication', 'Critical Thinking'],
            description: 'Provide patient care and support in healthcare settings.'
          },
          {
            id: 4,
            title: 'Financial Analyst',
            category: 'Finance',
            averageSalary: '$85,000',
            average_salary: 85000,
            growth: '+6%',
            demand: 'Medium',
            education: 'Bachelor\'s in Finance or Economics',
            skills: ['Financial Modeling', 'Excel', 'Analysis'],
            description: 'Analyze financial data to guide business decisions.'
          },
          {
            id: 5,
            title: 'Marketing Manager',
            category: 'Business',
            averageSalary: '$90,000',
            average_salary: 90000,
            growth: '+10%',
            demand: 'High',
            education: 'Bachelor\'s in Marketing or Business',
            skills: ['Strategy', 'Communication', 'Analytics'],
            description: 'Develop and execute marketing strategies for products and services.'
          }
        ]

        const pathwaysData = [
          {
            id: 1,
            field: 'Computer Science',
            universities: ['MIT', 'Stanford', 'Carnegie Mellon'],
            duration: '4 years',
            averageCost: '$200,000',
            careerOutcomes: ['Software Engineer', 'Data Scientist', 'Product Manager'],
            employmentRate: '95%'
          },
          {
            id: 2,
            field: 'Business Administration',
            universities: ['Harvard', 'Wharton', 'Stanford'],
            duration: '4 years',
            averageCost: '$250,000',
            careerOutcomes: ['Business Analyst', 'Consultant', 'Manager'],
            employmentRate: '92%'
          }
        ]
        
        setProfessions(professionsData)
        setPathways(pathwaysData)
      } catch (error) {
        console.error('Error fetching career data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getCareerCategories = () => {
    const categories = {}
    professions.forEach(profession => {
      const category = getCategoryFromTitle(profession.title)
      if (!categories[category]) {
        categories[category] = []
      }
      categories[category].push(profession)
    })
    return categories
  }

  const getCategoryFromTitle = (title) => {
    const titleLower = title.toLowerCase()
    if (titleLower.includes('engineer') || titleLower.includes('developer') || titleLower.includes('analyst') || titleLower.includes('technician')) {
      return 'Technology & Engineering'
    }
    if (titleLower.includes('doctor') || titleLower.includes('nurse') || titleLower.includes('health') || titleLower.includes('medical')) {
      return 'Healthcare'
    }
    if (titleLower.includes('teacher') || titleLower.includes('education') || titleLower.includes('professor')) {
      return 'Education'
    }
    if (titleLower.includes('manager') || titleLower.includes('business') || titleLower.includes('finance') || titleLower.includes('accounting')) {
      return 'Business & Finance'
    }
    if (titleLower.includes('designer') || titleLower.includes('artist') || titleLower.includes('creative') || titleLower.includes('media')) {
      return 'Creative & Media'
    }
    return 'Other'
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Technology & Engineering': return 'bg-blue-100 text-blue-700'
      case 'Healthcare': return 'bg-green-100 text-green-700'
      case 'Education': return 'bg-orange-100 text-orange-700'
      case 'Business & Finance': return 'bg-purple-100 text-purple-700'
      case 'Creative & Media': return 'bg-pink-100 text-pink-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTopProfessions = () => {
    return professions
      .filter(p => p.average_salary)
      .sort((a, b) => b.average_salary - a.average_salary)
      .slice(0, 10)
  }

  const getGrowthTrends = () => {
    // Mock growth data - in real app this would come from API
    return [
      { category: 'Technology & Engineering', growth: 15.2, trend: 'up' },
      { category: 'Healthcare', growth: 12.8, trend: 'up' },
      { category: 'Creative & Media', growth: 8.5, trend: 'up' },
      { category: 'Business & Finance', growth: 6.3, trend: 'up' },
      { category: 'Education', growth: 4.1, trend: 'up' },
      { category: 'Other', growth: 2.7, trend: 'up' }
    ]
  }

  const filteredProfessions = selectedCategory === 'all' 
    ? professions 
    : professions.filter(p => getCategoryFromTitle(p.title) === selectedCategory)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  const categories = getCareerCategories()
  const topProfessions = getTopProfessions()
  const growthTrends = getGrowthTrends()

  return (
    <div className="w-full">
      {/* Reduced Height Hero Section - Full Width */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-12 w-full">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              Career Insights & Trends
            </h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
              Discover salary insights, job market trends, and career growth opportunities across Australia's top industries.
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

        {/* Main Content Area */}
        <main className="flex-1 w-full md:w-auto transition-all duration-300">
          <div className="container mx-auto px-6 py-12">
            
            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <Card className="text-center shadow-lg border-0">
                <CardContent className="pt-6">
                  <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">{professions.length}</div>
                  <div className="text-sm text-gray-600">Career Paths</div>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-lg border-0">
                <CardContent className="pt-6">
                  <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    ${Math.round(professions.filter(p => p.average_salary).reduce((sum, p) => sum + p.average_salary, 0) / professions.filter(p => p.average_salary).length / 1000)}K
                  </div>
                  <div className="text-sm text-gray-600">Avg Salary</div>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-lg border-0">
                <CardContent className="pt-6">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">8.5%</div>
                  <div className="text-sm text-gray-600">Avg Growth</div>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-lg border-0">
                <CardContent className="pt-6">
                  <div className="bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold text-orange-600 mb-1">{Object.keys(categories).length}</div>
                  <div className="text-sm text-gray-600">Industries</div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="salaries">Salaries</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="explore">Explore</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Industry Categories */}
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <PieChart className="h-5 w-5 mr-2 text-purple-600" />
                        Career Categories
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(categories).map(([category, careers]) => (
                          <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                              <Badge className={`mr-3 ${getCategoryColor(category)}`}>
                                {category}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-gray-800">{careers.length}</div>
                              <div className="text-sm text-gray-600">careers</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Growth Trends */}
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
                        Industry Growth
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {growthTrends.map((trend, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                              <Badge className={`mr-3 ${getCategoryColor(trend.category)}`}>
                                {trend.category}
                              </Badge>
                            </div>
                            <div className="flex items-center">
                              <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
                              <span className="font-semibold text-green-600">{trend.growth}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Career Pathways Integration */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2 text-cyan-600" />
                      Popular Career Pathways
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {pathways.slice(0, 6).map((pathway) => (
                        <div key={pathway.id} className="p-4 bg-gradient-to-br from-purple-50 to-cyan-50 rounded-lg border border-purple-100">
                          <h4 className="font-semibold text-gray-800 mb-2">{pathway.name}</h4>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {pathway.description || 'Explore this career pathway with multiple opportunities.'}
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full text-purple-600 border-purple-200 hover:bg-purple-50"
                            onClick={() => window.open(`/pathways/${pathway.id}`, '_blank')}
                          >
                            View Pathway
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Salaries Tab */}
              <TabsContent value="salaries" className="space-y-8">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                      Top Paying Careers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topProfessions.map((profession, index) => (
                        <div key={profession.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center">
                            <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 text-sm font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800">{profession.title}</h4>
                              <Badge className={`mt-1 ${getCategoryColor(getCategoryFromTitle(profession.title))}`}>
                                {getCategoryFromTitle(profession.title)}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">
                              ${profession.average_salary?.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">per year</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Trends Tab */}
              <TabsContent value="trends" className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <LineChart className="h-5 w-5 mr-2 text-blue-600" />
                        Job Market Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">Technology Boom</h4>
                          <p className="text-sm text-blue-700">
                            Tech roles are experiencing unprecedented growth with AI, data science, and cybersecurity leading the charge.
                          </p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">Healthcare Expansion</h4>
                          <p className="text-sm text-green-700">
                            Aging population drives demand for healthcare professionals across all specializations.
                          </p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <h4 className="font-semibold text-purple-800 mb-2">Remote Work Revolution</h4>
                          <p className="text-sm text-purple-700">
                            Flexible work arrangements are becoming standard across industries, opening new opportunities.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Star className="h-5 w-5 mr-2 text-yellow-600" />
                        Emerging Careers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { title: 'AI/ML Engineer', growth: '+25%', salary: '$120K+' },
                          { title: 'Sustainability Consultant', growth: '+18%', salary: '$85K+' },
                          { title: 'UX/UI Designer', growth: '+15%', salary: '$90K+' },
                          { title: 'Data Scientist', growth: '+22%', salary: '$110K+' },
                          { title: 'Cybersecurity Analyst', growth: '+20%', salary: '$95K+' }
                        ].map((career, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                            <div>
                              <h4 className="font-semibold text-gray-800">{career.title}</h4>
                              <div className="flex items-center mt-1">
                                <Badge variant="secondary" className="bg-green-100 text-green-700 mr-2">
                                  {career.growth}
                                </Badge>
                                <span className="text-sm text-gray-600">{career.salary}</span>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => window.open(`https://seek.com.au/jobs?keywords=${encodeURIComponent(career.title)}`, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Explore Tab */}
              <TabsContent value="explore" className="space-y-8">
                {/* Category Filter */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Explore by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Button
                        variant={selectedCategory === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedCategory('all')}
                      >
                        All Categories
                      </Button>
                      {Object.keys(categories).map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>

                    {/* Career List */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredProfessions.slice(0, 12).map((profession) => (
                        <div key={profession.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <Badge className={`${getCategoryColor(getCategoryFromTitle(profession.title))}`}>
                              {getCategoryFromTitle(profession.title)}
                            </Badge>
                            {profession.average_salary && (
                              <span className="text-sm font-semibold text-green-600">
                                ${Math.round(profession.average_salary / 1000)}K
                              </span>
                            )}
                          </div>
                          <h4 className="font-semibold text-gray-800 mb-2">{profession.title}</h4>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => window.open(`https://seek.com.au/jobs?keywords=${encodeURIComponent(profession.title)}`, '_blank')}
                          >
                            View Jobs <ExternalLink className="ml-2 h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

