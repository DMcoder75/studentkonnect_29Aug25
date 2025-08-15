import React, { useState, useEffect } from 'react'
import { useAdminAuth } from '../../contexts/AdminAuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  FileText,
  Search,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Plus,
  Calendar,
  User,
  MessageSquare,
  Heart,
  Share,
  TrendingUp
} from 'lucide-react'
import AdminLayout from './AdminLayout'

export default function ContentBlog() {
  const { adminUser, hasPermission } = useAdminAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  // Sample blog data
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: 'Complete Guide to Studying in Australia',
      author: 'Sarah Johnson',
      category: 'Study Abroad',
      status: 'published',
      publishDate: '2024-01-15',
      views: 2847,
      likes: 156,
      comments: 23,
      excerpt: 'Everything you need to know about studying in Australia, from visa requirements to university selection.',
      tags: ['Australia', 'Study Abroad', 'Visa'],
      featured: true
    },
    {
      id: 2,
      title: 'Top 10 Universities for Computer Science',
      author: 'Michael Kumar',
      category: 'University Rankings',
      status: 'published',
      publishDate: '2024-01-12',
      views: 1923,
      likes: 89,
      comments: 15,
      excerpt: 'Discover the best universities worldwide for computer science programs and their admission requirements.',
      tags: ['Computer Science', 'Rankings', 'Technology'],
      featured: false
    },
    {
      id: 3,
      title: 'Scholarship Opportunities for International Students',
      author: 'Dr. Emma Wilson',
      category: 'Scholarships',
      status: 'published',
      publishDate: '2024-01-10',
      views: 3156,
      likes: 234,
      comments: 45,
      excerpt: 'Comprehensive list of scholarships available for international students across different countries.',
      tags: ['Scholarships', 'Financial Aid', 'International'],
      featured: true
    },
    {
      id: 4,
      title: 'IELTS Preparation Tips and Strategies',
      author: 'James Chen',
      category: 'Test Preparation',
      status: 'draft',
      publishDate: null,
      views: 0,
      likes: 0,
      comments: 0,
      excerpt: 'Expert tips and strategies to achieve your target IELTS score for university admission.',
      tags: ['IELTS', 'Test Prep', 'English'],
      featured: false
    },
    {
      id: 5,
      title: 'Student Life in Canadian Universities',
      author: 'Lisa Rodriguez',
      category: 'Student Life',
      status: 'published',
      publishDate: '2024-01-08',
      views: 1654,
      likes: 78,
      comments: 12,
      excerpt: 'Experience campus life, culture, and opportunities available at Canadian universities.',
      tags: ['Canada', 'Student Life', 'Culture'],
      featured: false
    },
    {
      id: 6,
      title: 'Career Prospects After Graduation',
      author: 'David Park',
      category: 'Career Guidance',
      status: 'review',
      publishDate: null,
      views: 0,
      likes: 0,
      comments: 0,
      excerpt: 'Explore career opportunities and job market trends for international graduates.',
      tags: ['Career', 'Jobs', 'Graduation'],
      featured: false
    }
  ])

  const [stats, setStats] = useState({
    totalPosts: 6,
    publishedPosts: 4,
    draftPosts: 1,
    totalViews: 9580
  })

  const refreshData = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'all' || post.status === statusFilter) &&
    (categoryFilter === 'all' || post.category === categoryFilter)
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'review': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <AdminLayout 
      title="Blog Management" 
      description="Manage blog posts, articles, and content"
    >
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
          <Button 
            onClick={refreshData} 
            disabled={isLoading}
            size="sm"
            variant="outline"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalPosts}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-3xl font-bold text-gray-900">{stats.publishedPosts}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-3xl font-bold text-gray-900">{stats.draftPosts}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Edit className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blog Posts Table */}
      <Card className="shadow-sm border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Blog Posts</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="review">Under Review</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Categories</option>
                <option value="Study Abroad">Study Abroad</option>
                <option value="University Rankings">University Rankings</option>
                <option value="Scholarships">Scholarships</option>
                <option value="Test Preparation">Test Preparation</option>
                <option value="Student Life">Student Life</option>
                <option value="Career Guidance">Career Guidance</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredPosts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Post</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Author</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Published</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Engagement</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="max-w-xs">
                            <p className="font-medium text-gray-900 truncate">{post.title}</p>
                            <p className="text-sm text-gray-500 truncate">{post.excerpt}</p>
                            {post.featured && (
                              <Badge variant="outline" className="mt-1 text-xs">Featured</Badge>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{post.author}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline">{post.category}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(post.status)}>
                          {post.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        {post.publishDate ? (
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900">{post.publishDate}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">Not published</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{post.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Blog Posts Found</h3>
              <p className="text-gray-600">
                {isLoading ? 'Loading blog posts...' : 'No posts match your search criteria'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  )
}

