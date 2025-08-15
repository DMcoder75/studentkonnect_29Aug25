import React, { useState, useEffect } from 'react'
import { useAdminAuth } from '../../contexts/AdminAuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  HelpCircle,
  Search,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Plus,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ThumbsUp,
  Clock
} from 'lucide-react'
import AdminLayout from './AdminLayout'

export default function ContentFAQ() {
  const { adminUser, hasPermission } = useAdminAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [expandedFAQ, setExpandedFAQ] = useState(null)

  // Sample FAQ data
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: 'What are the admission requirements for international students?',
      answer: 'International students typically need to provide academic transcripts, English proficiency test scores (IELTS/TOEFL), letters of recommendation, statement of purpose, and proof of financial support. Specific requirements vary by university and program.',
      category: 'Admissions',
      status: 'published',
      views: 1247,
      helpful: 89,
      lastUpdated: '2024-01-15',
      priority: 'high'
    },
    {
      id: 2,
      question: 'How do I apply for a student visa?',
      answer: 'Student visa application process varies by country. Generally, you need an acceptance letter from a recognized institution, proof of financial support, health insurance, and completed visa application forms. Processing times range from 2-8 weeks.',
      category: 'Visa',
      status: 'published',
      views: 2156,
      helpful: 156,
      lastUpdated: '2024-01-12',
      priority: 'high'
    },
    {
      id: 3,
      question: 'What scholarships are available for international students?',
      answer: 'Various scholarships are available including merit-based, need-based, country-specific, and program-specific scholarships. Popular options include Fulbright, Chevening, Australia Awards, and university-specific scholarships.',
      category: 'Scholarships',
      status: 'published',
      views: 1834,
      helpful: 134,
      lastUpdated: '2024-01-10',
      priority: 'high'
    },
    {
      id: 4,
      question: 'How much does it cost to study abroad?',
      answer: 'Costs vary significantly by country and institution. Tuition fees range from $10,000 to $60,000+ annually. Living expenses typically range from $10,000 to $25,000 per year depending on location and lifestyle.',
      category: 'Finances',
      status: 'published',
      views: 3421,
      helpful: 267,
      lastUpdated: '2024-01-08',
      priority: 'high'
    },
    {
      id: 5,
      question: 'What is the difference between IELTS and TOEFL?',
      answer: 'Both are English proficiency tests. IELTS is more widely accepted globally and includes a face-to-face speaking test. TOEFL is computer-based and more common in the US. Choose based on your target universities requirements.',
      category: 'Tests',
      status: 'published',
      views: 987,
      helpful: 78,
      lastUpdated: '2024-01-05',
      priority: 'medium'
    },
    {
      id: 6,
      question: 'Can I work while studying abroad?',
      answer: 'Work permissions vary by country and visa type. Many countries allow part-time work (15-20 hours/week) during studies and full-time work during breaks. Check specific regulations for your destination country.',
      category: 'Student Life',
      status: 'draft',
      views: 0,
      helpful: 0,
      lastUpdated: '2024-01-03',
      priority: 'medium'
    },
    {
      id: 7,
      question: 'How do I choose the right university?',
      answer: 'Consider factors like program quality, university rankings, location, cost, campus culture, career services, and alumni network. Research thoroughly and consider visiting campuses if possible.',
      category: 'University Selection',
      status: 'published',
      views: 1567,
      helpful: 112,
      lastUpdated: '2024-01-01',
      priority: 'medium'
    },
    {
      id: 8,
      question: 'What documents do I need for university application?',
      answer: 'Common documents include academic transcripts, diplomas, English proficiency scores, letters of recommendation, statement of purpose, CV/resume, passport copy, and financial documents.',
      category: 'Admissions',
      status: 'review',
      views: 0,
      helpful: 0,
      lastUpdated: '2023-12-28',
      priority: 'low'
    }
  ])

  const [stats, setStats] = useState({
    totalFAQs: 8,
    publishedFAQs: 6,
    draftFAQs: 1,
    totalViews: 11212
  })

  const refreshData = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === 'all' || faq.category === categoryFilter)
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'review': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id)
  }

  return (
    <AdminLayout 
      title="FAQ Management" 
      description="Manage frequently asked questions and help content"
    >
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add FAQ
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
                <p className="text-sm font-medium text-gray-600">Total FAQs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalFAQs}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <HelpCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-3xl font-bold text-gray-900">{stats.publishedFAQs}</p>
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
                <p className="text-3xl font-bold text-gray-900">{stats.draftFAQs}</p>
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
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Management */}
      <Card className="shadow-sm border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All FAQs</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Categories</option>
                <option value="Admissions">Admissions</option>
                <option value="Visa">Visa</option>
                <option value="Scholarships">Scholarships</option>
                <option value="Finances">Finances</option>
                <option value="Tests">Tests</option>
                <option value="Student Life">Student Life</option>
                <option value="University Selection">University Selection</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg">
                  <div className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-gray-900">{faq.question}</h3>
                          <Badge className={getStatusColor(faq.status)}>
                            {faq.status}
                          </Badge>
                          <Badge className={getPriorityColor(faq.priority)}>
                            {faq.priority}
                          </Badge>
                          <Badge variant="outline">{faq.category}</Badge>
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{faq.views} views</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{faq.helpful} helpful</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Updated {faq.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleFAQ(faq.id)}
                        >
                          {expandedFAQ === faq.id ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    {expandedFAQ === faq.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs Found</h3>
              <p className="text-gray-600">
                {isLoading ? 'Loading FAQs...' : 'No FAQs match your search criteria'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  )
}

