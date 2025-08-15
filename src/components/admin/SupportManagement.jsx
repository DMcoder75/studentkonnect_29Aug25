import React, { useState } from 'react'
import { useAdminAuth } from '../../contexts/AdminAuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  LifeBuoy,
  HelpCircle,
  Settings,
  Headphones,
  BookOpen,
  Phone,
  Search,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  MessageSquare,
  FileText,
  ExternalLink,
  Mail,
  Video,
  Globe,
  Zap,
  Shield,
  Database,
  Monitor,
  Smartphone,
  Wifi,
  Bug,
  Star,
  ThumbsUp,
  Eye,
  Edit,
  Plus
} from 'lucide-react'
import AdminSidebar from '../AdminSidebar'

export default function SupportManagement() {
  const { adminUser } = useAdminAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('dashboard')

  const refreshData = async () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  const supportStats = {
    totalTickets: 156,
    openTickets: 23,
    resolvedToday: 18,
    avgResponseTime: '2.3h',
    satisfactionRate: '94.5%',
    activeAgents: 8
  }

  const applicationSupportGuides = [
    {
      id: 1,
      title: 'University Application Process',
      description: 'Complete guide for students applying to universities worldwide',
      category: 'Applications',
      views: 2847,
      lastUpdated: '2024-01-15',
      status: 'published'
    },
    {
      id: 2,
      title: 'Visa Application Support',
      description: 'Step-by-step visa application process for different countries',
      category: 'Visa',
      views: 1923,
      lastUpdated: '2024-01-10',
      status: 'published'
    },
    {
      id: 3,
      title: 'Scholarship Application Guide',
      description: 'How to find and apply for scholarships effectively',
      category: 'Scholarships',
      views: 1654,
      lastUpdated: '2024-01-08',
      status: 'published'
    },
    {
      id: 4,
      title: 'Document Preparation Checklist',
      description: 'Essential documents needed for university applications',
      category: 'Documents',
      views: 3421,
      lastUpdated: '2024-01-12',
      status: 'published'
    }
  ]

  const technicalIssues = [
    {
      id: 1,
      title: 'Login Authentication Issues',
      description: 'Users unable to sign in to their accounts',
      priority: 'high',
      status: 'open',
      assignedTo: 'Tech Team',
      reportedBy: 'Multiple Users',
      createdAt: '2024-01-15 10:30'
    },
    {
      id: 2,
      title: 'Application Form Submission Error',
      description: 'Form not submitting properly on mobile devices',
      priority: 'medium',
      status: 'in-progress',
      assignedTo: 'Dev Team',
      reportedBy: 'Sarah Johnson',
      createdAt: '2024-01-14 15:45'
    },
    {
      id: 3,
      title: 'Payment Gateway Integration',
      description: 'Payment processing delays for scholarship applications',
      priority: 'high',
      status: 'resolved',
      assignedTo: 'Payment Team',
      reportedBy: 'Finance Dept',
      createdAt: '2024-01-13 09:15'
    }
  ]

  const knowledgeBaseArticles = [
    {
      id: 1,
      title: 'How to Choose the Right University',
      category: 'University Selection',
      readTime: '8 min',
      helpful: 245,
      views: 5632
    },
    {
      id: 2,
      title: 'Understanding IELTS Requirements',
      category: 'Language Tests',
      readTime: '6 min',
      helpful: 189,
      views: 4521
    },
    {
      id: 3,
      title: 'Financial Planning for International Students',
      category: 'Finance',
      readTime: '12 min',
      helpful: 312,
      views: 7834
    },
    {
      id: 4,
      title: 'Student Accommodation Guide',
      category: 'Accommodation',
      readTime: '10 min',
      helpful: 156,
      views: 3245
    }
  ]

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Support Tickets</p>
                <p className="text-3xl font-bold text-gray-900">{supportStats.totalTickets}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <LifeBuoy className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                <p className="text-3xl font-bold text-gray-900">{supportStats.openTickets}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved Today</p>
                <p className="text-3xl font-bold text-gray-900">{supportStats.resolvedToday}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-3xl font-bold text-gray-900">{supportStats.avgResponseTime}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Satisfaction Rate</p>
                <p className="text-3xl font-bold text-gray-900">{supportStats.satisfactionRate}</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <Star className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Agents</p>
                <p className="text-3xl font-bold text-gray-900">{supportStats.activeAgents}</p>
              </div>
              <div className="p-3 bg-teal-100 rounded-full">
                <Headphones className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-sm border-0">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <Plus className="h-6 w-6" />
              <span>Create Ticket</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <BookOpen className="h-6 w-6" />
              <span>Add Article</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Video className="h-6 w-6" />
              <span>Record Tutorial</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Mail className="h-6 w-6" />
              <span>Send Broadcast</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderApplicationSupport = () => (
    <div className="space-y-6">
      <Card className="shadow-sm border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Application Support Guides</CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Guide
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applicationSupportGuides.map((guide) => (
              <div key={guide.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{guide.title}</h3>
                    <p className="text-gray-600 mt-1">{guide.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge variant="secondary">{guide.category}</Badge>
                      <span className="text-sm text-gray-500">
                        <Eye className="w-3 h-3 inline mr-1" />
                        {guide.views} views
                      </span>
                      <span className="text-sm text-gray-500">
                        Updated {guide.lastUpdated}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderTechnicalIssues = () => (
    <div className="space-y-6">
      <Card className="shadow-sm border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Technical Issues & Bug Reports</CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Report Issue
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {technicalIssues.map((issue) => (
              <div key={issue.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
                      <Badge 
                        variant={issue.priority === 'high' ? 'destructive' : issue.priority === 'medium' ? 'default' : 'secondary'}
                      >
                        {issue.priority}
                      </Badge>
                      <Badge 
                        variant={issue.status === 'resolved' ? 'default' : issue.status === 'in-progress' ? 'secondary' : 'outline'}
                      >
                        {issue.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-2">{issue.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Assigned to: {issue.assignedTo}</span>
                      <span>Reported by: {issue.reportedBy}</span>
                      <span>Created: {issue.createdAt}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderKnowledgeBase = () => (
    <div className="space-y-6">
      <Card className="shadow-sm border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Knowledge Base Articles</CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Article
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {knowledgeBaseArticles.map((article) => (
              <div key={article.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary">{article.category}</Badge>
                  <span className="text-sm text-gray-500">{article.readTime} read</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>
                      <Eye className="w-3 h-3 inline mr-1" />
                      {article.views}
                    </span>
                    <span>
                      <ThumbsUp className="w-3 h-3 inline mr-1" />
                      {article.helpful}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Support Management</h1>
              <p className="text-gray-600">Comprehensive application support and assistance</p>
            </div>
            <div className="flex items-center space-x-4">
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
        </header>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200 px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Support Dashboard', icon: LifeBuoy },
              { id: 'applications', name: 'Application Support', icon: HelpCircle },
              { id: 'technical', name: 'Technical Issues', icon: Settings },
              { id: 'knowledge', name: 'Knowledge Base', icon: BookOpen }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'applications' && renderApplicationSupport()}
          {activeTab === 'technical' && renderTechnicalIssues()}
          {activeTab === 'knowledge' && renderKnowledgeBase()}
        </main>
      </div>
    </div>
  )
}

