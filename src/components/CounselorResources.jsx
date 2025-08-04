import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Sidebar from './Sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BookOpen, 
  FileText, 
  Video, 
  Download, 
  ExternalLink, 
  Search,
  Filter,
  Star,
  Clock,
  Users,
  TrendingUp,
  Award,
  Globe,
  MessageCircle,
  Calendar,
  BarChart3,
  Target,
  Lightbulb,
  CheckCircle
} from 'lucide-react'

export default function CounselorResources({ isMobileMenuOpen, onMobileMenuClose }) {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading resources
    setTimeout(() => {
      setResources(mockResources)
      setLoading(false)
    }, 1000)
  }, [])

  const categories = [
    { id: 'all', name: 'All Resources', icon: BookOpen },
    { id: 'guides', name: 'Guides & Templates', icon: FileText },
    { id: 'training', name: 'Training Videos', icon: Video },
    { id: 'tools', name: 'Assessment Tools', icon: Target },
    { id: 'research', name: 'Market Research', icon: BarChart3 },
    { id: 'best-practices', name: 'Best Practices', icon: Star }
  ]

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={isMobileMenuOpen} 
          onClose={onMobileMenuClose}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={onMobileMenuClose}
        />
        
        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <div className="p-6">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Resources & Tools</h1>
                  <p className="text-gray-600 mt-2">
                    Access comprehensive resources to enhance your counseling effectiveness
                  </p>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {filteredResources.length} Resources Available
                </Badge>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  {categories.map((category) => {
                    const Icon = category.icon
                    return (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                        className="whitespace-nowrap"
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {category.name}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Resources</p>
                      <p className="text-2xl font-bold text-gray-900">156</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Recently Added</p>
                      <p className="text-2xl font-bold text-gray-900">12</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Most Popular</p>
                      <p className="text-2xl font-bold text-gray-900">24</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Award className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Favorites</p>
                      <p className="text-2xl font-bold text-gray-900">8</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="resources" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="resources">Resource Library</TabsTrigger>
                <TabsTrigger value="tools">Assessment Tools</TabsTrigger>
                <TabsTrigger value="training">Training Center</TabsTrigger>
              </TabsList>

              {/* Resource Library Tab */}
              <TabsContent value="resources" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Resource List */}
                  <div className="lg:col-span-2 space-y-4">
                    {loading ? (
                      <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                          <Card key={i} className="animate-pulse">
                            <CardContent className="p-6">
                              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                              <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                              <div className="h-3 bg-gray-200 rounded w-full"></div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      filteredResources.map((resource) => (
                        <Card key={resource.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className={`p-2 rounded-lg ${resource.iconBg}`}>
                                    <resource.icon className={`h-5 w-5 ${resource.iconColor}`} />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Badge variant="secondary" size="sm">{resource.categoryName}</Badge>
                                      <span className="text-sm text-gray-500">•</span>
                                      <span className="text-sm text-gray-500">{resource.readTime}</span>
                                    </div>
                                  </div>
                                </div>
                                <p className="text-gray-600 mb-4">{resource.description}</p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                      <Star className="h-4 w-4" />
                                      {resource.rating}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Download className="h-4 w-4" />
                                      {resource.downloads}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" />
                                      {resource.lastUpdated}
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button size="sm" variant="outline">
                                      <Download className="h-4 w-4 mr-2" />
                                      Download
                                    </Button>
                                    <Button size="sm">
                                      <ExternalLink className="h-4 w-4 mr-2" />
                                      View
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>

                  {/* Right Column - Quick Actions & Featured */}
                  <div className="space-y-6">
                    {/* Quick Actions */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button className="w-full justify-start" variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          Create New Template
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Request Resource
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Training
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Users className="h-4 w-4 mr-2" />
                          Join Discussion
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Featured Resource */}
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-lg text-blue-900">Featured Resource</CardTitle>
                        <CardDescription className="text-blue-700">
                          Most popular this week
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-blue-900">
                            Complete University Application Guide 2024
                          </h4>
                          <p className="text-sm text-blue-700">
                            Comprehensive guide covering all aspects of university applications for international students.
                          </p>
                          <div className="flex items-center gap-2 text-sm text-blue-600">
                            <Star className="h-4 w-4" />
                            <span>4.9 rating</span>
                            <span>•</span>
                            <span>2.3k downloads</span>
                          </div>
                          <Button className="w-full" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Recent Updates */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Recent Updates</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            { title: "Visa Processing Guide", time: "2 hours ago", type: "Updated" },
                            { title: "IELTS Preparation Kit", time: "1 day ago", type: "New" },
                            { title: "Scholarship Database", time: "3 days ago", type: "Updated" }
                          ].map((update, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{update.title}</p>
                                <p className="text-xs text-gray-500">{update.time}</p>
                              </div>
                              <Badge variant={update.type === 'New' ? 'default' : 'secondary'} size="sm">
                                {update.type}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Assessment Tools Tab */}
              <TabsContent value="tools" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {assessmentTools.map((tool) => (
                    <Card key={tool.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className={`p-3 rounded-lg ${tool.iconBg} w-fit mb-4`}>
                          <tool.icon className={`h-6 w-6 ${tool.iconColor}`} />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{tool.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="outline">{tool.category}</Badge>
                          <span className="text-sm text-gray-500">{tool.duration}</span>
                        </div>
                        <Button className="w-full">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Launch Tool
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Training Center Tab */}
              <TabsContent value="training" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {trainingModules.map((module) => (
                    <Card key={module.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${module.iconBg}`}>
                            <module.icon className={`h-6 w-6 ${module.iconColor}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">{module.title}</h3>
                            <p className="text-gray-600 text-sm mb-3">{module.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                              <span>{module.duration}</span>
                              <span>•</span>
                              <span>{module.lessons} lessons</span>
                              <span>•</span>
                              <span>{module.level}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-400" />
                                <span className="text-sm">{module.rating}</span>
                              </div>
                              <Button size="sm">
                                <Video className="h-4 w-4 mr-2" />
                                Start Course
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

// Mock data
const mockResources = [
  {
    id: 1,
    title: "University Application Checklist Template",
    description: "Comprehensive checklist to guide students through the university application process step by step.",
    category: "guides",
    categoryName: "Guides & Templates",
    icon: CheckCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    rating: "4.8",
    downloads: "1.2k",
    readTime: "5 min read",
    lastUpdated: "2 days ago"
  },
  {
    id: 2,
    title: "IELTS Preparation Roadmap",
    description: "Complete guide for IELTS preparation with timeline, resources, and practice materials.",
    category: "guides",
    categoryName: "Guides & Templates",
    icon: BookOpen,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    rating: "4.9",
    downloads: "2.1k",
    readTime: "8 min read",
    lastUpdated: "1 week ago"
  },
  {
    id: 3,
    title: "Scholarship Application Best Practices",
    description: "Proven strategies and tips for successful scholarship applications with real examples.",
    category: "best-practices",
    categoryName: "Best Practices",
    icon: Award,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    rating: "4.7",
    downloads: "856",
    readTime: "12 min read",
    lastUpdated: "3 days ago"
  },
  {
    id: 4,
    title: "Student Progress Tracking Tool",
    description: "Interactive tool to monitor and track student progress throughout their application journey.",
    category: "tools",
    categoryName: "Assessment Tools",
    icon: BarChart3,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    rating: "4.6",
    downloads: "743",
    readTime: "Tool",
    lastUpdated: "1 week ago"
  }
]

const assessmentTools = [
  {
    id: 1,
    title: "Career Interest Assessment",
    description: "Help students discover their career interests and suitable study paths.",
    category: "Assessment",
    duration: "15 min",
    icon: Target,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    id: 2,
    title: "University Readiness Checker",
    description: "Evaluate student readiness for university applications and identify areas for improvement.",
    category: "Evaluation",
    duration: "10 min",
    icon: CheckCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-600"
  },
  {
    id: 3,
    title: "Study Abroad Compatibility",
    description: "Assess student compatibility with different study abroad destinations.",
    category: "Matching",
    duration: "20 min",
    icon: Globe,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600"
  }
]

const trainingModules = [
  {
    id: 1,
    title: "Effective Student Counseling Techniques",
    description: "Master the art of student counseling with proven techniques and methodologies.",
    duration: "2.5 hours",
    lessons: 8,
    level: "Intermediate",
    rating: "4.9",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    id: 2,
    title: "University Application Process Mastery",
    description: "Complete guide to navigating university applications across different countries.",
    duration: "3 hours",
    lessons: 12,
    level: "Advanced",
    rating: "4.8",
    icon: GraduationCap,
    iconBg: "bg-green-100",
    iconColor: "text-green-600"
  },
  {
    id: 3,
    title: "Scholarship and Financial Aid Guidance",
    description: "Learn to effectively guide students through scholarship and financial aid opportunities.",
    duration: "1.5 hours",
    lessons: 6,
    level: "Beginner",
    rating: "4.7",
    icon: Award,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600"
  }
]

