import React, { useState, useEffect } from 'react'
import { useAdminAuth } from '../../contexts/AdminAuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  AlertTriangle,
  Search,
  Download,
  RefreshCw,
  Eye,
  Check,
  X,
  Flag,
  User,
  Calendar,
  MessageSquare,
  Shield,
  Clock
} from 'lucide-react'
import AdminLayout from './AdminLayout'

export default function ModerationReports() {
  const { adminUser, hasPermission } = useAdminAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  // Sample report data
  const [reports, setReports] = useState([
    {
      id: 1,
      reporter: 'John Smith',
      reporterEmail: 'john.smith@email.com',
      reportedUser: 'Mike Chen',
      reportedContent: 'Review for University of Toronto',
      type: 'inappropriate_content',
      reason: 'Contains offensive language and false information',
      description: 'This review contains inappropriate language and seems to be spreading false information about the university program.',
      status: 'pending',
      priority: 'high',
      submittedDate: '2024-01-15',
      assignedTo: null,
      evidence: ['screenshot1.png', 'screenshot2.png'],
      category: 'content'
    },
    {
      id: 2,
      reporter: 'Sarah Johnson',
      reporterEmail: 'sarah.j@email.com',
      reportedUser: 'Anonymous User',
      reportedContent: 'Spam messages in forum',
      type: 'spam',
      reason: 'Multiple spam messages promoting external services',
      description: 'User is posting multiple spam messages in the forum promoting external tutoring services.',
      status: 'investigating',
      priority: 'medium',
      submittedDate: '2024-01-12',
      assignedTo: 'Admin Team',
      evidence: ['forum_posts.pdf'],
      category: 'behavior'
    },
    {
      id: 3,
      reporter: 'Emma Wilson',
      reporterEmail: 'emma.w@email.com',
      reportedUser: 'David Park',
      reportedContent: 'Harassment in private messages',
      type: 'harassment',
      reason: 'Sending threatening and harassing messages',
      description: 'User has been sending threatening messages and harassing behavior towards other students.',
      status: 'resolved',
      priority: 'high',
      submittedDate: '2024-01-10',
      assignedTo: 'Security Team',
      evidence: ['messages.pdf', 'conversation_log.txt'],
      category: 'behavior'
    },
    {
      id: 4,
      reporter: 'Lisa Rodriguez',
      reporterEmail: 'lisa.r@email.com',
      reportedUser: 'Fake University Account',
      reportedContent: 'Impersonation of official university',
      type: 'impersonation',
      reason: 'Account pretending to be official university representative',
      description: 'This account is impersonating Harvard University and providing false admission information.',
      status: 'pending',
      priority: 'high',
      submittedDate: '2024-01-08',
      assignedTo: null,
      evidence: ['profile_screenshot.png'],
      category: 'identity'
    },
    {
      id: 5,
      reporter: 'Michael Kumar',
      reporterEmail: 'michael.k@email.com',
      reportedUser: 'Bot Account',
      reportedContent: 'Automated fake reviews',
      type: 'fake_content',
      reason: 'Multiple fake reviews from bot accounts',
      description: 'Detected multiple fake reviews being posted by automated bot accounts to manipulate ratings.',
      status: 'investigating',
      priority: 'medium',
      submittedDate: '2024-01-05',
      assignedTo: 'Tech Team',
      evidence: ['bot_analysis.pdf', 'ip_logs.txt'],
      category: 'content'
    },
    {
      id: 6,
      reporter: 'System Alert',
      reporterEmail: 'system@yourunipathway.com',
      reportedUser: 'Multiple Users',
      reportedContent: 'Suspicious login activity',
      type: 'security',
      reason: 'Multiple failed login attempts from same IP',
      description: 'Automated security alert: Multiple failed login attempts detected from suspicious IP addresses.',
      status: 'dismissed',
      priority: 'low',
      submittedDate: '2024-01-03',
      assignedTo: 'Security Team',
      evidence: ['security_log.txt'],
      category: 'security'
    }
  ])

  const [stats, setStats] = useState({
    totalReports: 6,
    pendingReports: 2,
    investigatingReports: 2,
    resolvedReports: 2
  })

  const refreshData = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const filteredReports = reports.filter(report => 
    (report.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
     report.reportedUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
     report.reason.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || report.status === statusFilter) &&
    (typeFilter === 'all' || report.type === typeFilter) &&
    (priorityFilter === 'all' || report.priority === priorityFilter)
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'investigating': return 'bg-blue-100 text-blue-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'dismissed': return 'bg-gray-100 text-gray-800'
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

  const getTypeIcon = (type) => {
    switch (type) {
      case 'inappropriate_content': return <MessageSquare className="w-4 h-4" />
      case 'spam': return <Flag className="w-4 h-4" />
      case 'harassment': return <AlertTriangle className="w-4 h-4" />
      case 'impersonation': return <User className="w-4 h-4" />
      case 'fake_content': return <X className="w-4 h-4" />
      case 'security': return <Shield className="w-4 h-4" />
      default: return <AlertTriangle className="w-4 h-4" />
    }
  }

  const handleAssign = (reportId) => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, status: 'investigating', assignedTo: adminUser?.name } : report
    ))
  }

  const handleResolve = (reportId) => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, status: 'resolved' } : report
    ))
  }

  const handleDismiss = (reportId) => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, status: 'dismissed' } : report
    ))
  }

  return (
    <AdminLayout 
      title="Report Management" 
      description="Manage user reports and content moderation"
    >
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalReports}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pendingReports}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Investigating</p>
                <p className="text-3xl font-bold text-gray-900">{stats.investigatingReports}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-3xl font-bold text-gray-900">{stats.resolvedReports}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Check className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <Card className="shadow-sm border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Reports</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search reports..."
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
                <option value="pending">Pending</option>
                <option value="investigating">Investigating</option>
                <option value="resolved">Resolved</option>
                <option value="dismissed">Dismissed</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredReports.length > 0 ? (
            <div className="space-y-6">
              {filteredReports.map((report) => (
                <div key={report.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(report.type)}
                          <span className="font-medium text-gray-900">Report #{report.id}</span>
                        </div>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                        <Badge className={getPriorityColor(report.priority)}>
                          {report.priority} priority
                        </Badge>
                        <Badge variant="outline">{report.category}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Reporter:</span> {report.reporter}
                        </div>
                        <div>
                          <span className="font-medium">Reported User:</span> {report.reportedUser}
                        </div>
                        <div>
                          <span className="font-medium">Content:</span> {report.reportedContent}
                        </div>
                        <div>
                          <span className="font-medium">Submitted:</span> {report.submittedDate}
                        </div>
                      </div>
                      <div className="mb-3">
                        <p className="font-medium text-gray-900 mb-1">Reason:</p>
                        <p className="text-gray-700">{report.reason}</p>
                      </div>
                      <div className="mb-3">
                        <p className="font-medium text-gray-900 mb-1">Description:</p>
                        <p className="text-gray-700">{report.description}</p>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        {report.assignedTo && (
                          <div>
                            <span className="font-medium">Assigned to:</span> {report.assignedTo}
                          </div>
                        )}
                        <div>
                          <span className="font-medium">Evidence:</span> {report.evidence.length} files
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {report.status === 'pending' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleAssign(report.id)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <User className="w-4 h-4 mr-1" />
                          Assign
                        </Button>
                      )}
                      {(report.status === 'pending' || report.status === 'investigating') && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleResolve(report.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Resolve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDismiss(report.id)}
                            className="text-gray-600 hover:text-gray-700"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Dismiss
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Found</h3>
              <p className="text-gray-600">
                {isLoading ? 'Loading reports...' : 'No reports match your search criteria'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  )
}

