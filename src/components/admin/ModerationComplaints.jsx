import React, { useState, useEffect } from 'react'
import { useAdminAuth } from '../../contexts/AdminAuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  MessageCircle,
  Search,
  Download,
  RefreshCw,
  Eye,
  Check,
  X,
  User,
  Calendar,
  Phone,
  Mail,
  Clock,
  AlertCircle,
  Star
} from 'lucide-react'
import AdminLayout from './AdminLayout'

export default function ModerationComplaints() {
  const { adminUser, hasPermission } = useAdminAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  // Sample complaint data
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      complainant: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 555-0123',
      subject: 'Incorrect university information provided',
      category: 'information_accuracy',
      description: 'The information provided about Harvard University admission requirements was completely wrong. This caused me to miss important deadlines.',
      status: 'open',
      priority: 'high',
      submittedDate: '2024-01-15',
      assignedTo: null,
      responseTime: null,
      satisfaction: null,
      followUpRequired: true,
      relatedService: 'University Information',
      attachments: ['admission_requirements.pdf']
    },
    {
      id: 2,
      complainant: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 555-0456',
      subject: 'Poor counselor service quality',
      category: 'service_quality',
      description: 'My assigned counselor was unprofessional and provided misleading advice about visa requirements. Very disappointed with the service.',
      status: 'in_progress',
      priority: 'high',
      submittedDate: '2024-01-12',
      assignedTo: 'Customer Service Team',
      responseTime: '2 hours',
      satisfaction: null,
      followUpRequired: true,
      relatedService: 'Counseling Services',
      attachments: ['conversation_log.txt']
    },
    {
      id: 3,
      complainant: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '+1 555-0789',
      subject: 'Website technical issues',
      category: 'technical_issue',
      description: 'The application form keeps crashing and I lost my progress multiple times. This is very frustrating and time-consuming.',
      status: 'resolved',
      priority: 'medium',
      submittedDate: '2024-01-10',
      assignedTo: 'Technical Support',
      responseTime: '1 hour',
      satisfaction: 4,
      followUpRequired: false,
      relatedService: 'Website Platform',
      attachments: ['error_screenshots.zip']
    },
    {
      id: 4,
      complainant: 'Emma Wilson',
      email: 'emma.w@email.com',
      phone: '+1 555-0321',
      subject: 'Billing discrepancy',
      category: 'billing',
      description: 'I was charged twice for the same service. I need a refund for the duplicate charge immediately.',
      status: 'open',
      priority: 'high',
      submittedDate: '2024-01-08',
      assignedTo: null,
      responseTime: null,
      satisfaction: null,
      followUpRequired: true,
      relatedService: 'Payment Processing',
      attachments: ['invoice_copy.pdf', 'bank_statement.pdf']
    },
    {
      id: 5,
      complainant: 'David Park',
      email: 'david.park@email.com',
      phone: '+1 555-0654',
      subject: 'Delayed response to urgent query',
      category: 'response_time',
      description: 'I submitted an urgent query about my visa application 5 days ago but still haven\'t received any response. This is unacceptable.',
      status: 'escalated',
      priority: 'high',
      submittedDate: '2024-01-05',
      assignedTo: 'Management Team',
      responseTime: null,
      satisfaction: null,
      followUpRequired: true,
      relatedService: 'Customer Support',
      attachments: []
    },
    {
      id: 6,
      complainant: 'Lisa Rodriguez',
      email: 'lisa.r@email.com',
      phone: '+1 555-0987',
      subject: 'Scholarship information was outdated',
      category: 'information_accuracy',
      description: 'The scholarship information on your website was outdated. I applied based on old criteria and wasted time and money.',
      status: 'closed',
      priority: 'medium',
      submittedDate: '2024-01-03',
      assignedTo: 'Content Team',
      responseTime: '3 hours',
      satisfaction: 3,
      followUpRequired: false,
      relatedService: 'Scholarship Information',
      attachments: ['scholarship_criteria.pdf']
    }
  ])

  const [stats, setStats] = useState({
    totalComplaints: 6,
    openComplaints: 2,
    inProgressComplaints: 1,
    resolvedComplaints: 3
  })

  const refreshData = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const filteredComplaints = complaints.filter(complaint => 
    (complaint.complainant.toLowerCase().includes(searchTerm.toLowerCase()) ||
     complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
     complaint.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || complaint.status === statusFilter) &&
    (categoryFilter === 'all' || complaint.category === categoryFilter) &&
    (priorityFilter === 'all' || complaint.priority === priorityFilter)
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'escalated': return 'bg-purple-100 text-purple-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
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

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'service_quality': return <User className="w-4 h-4" />
      case 'technical_issue': return <AlertCircle className="w-4 h-4" />
      case 'billing': return <MessageCircle className="w-4 h-4" />
      case 'information_accuracy': return <Eye className="w-4 h-4" />
      case 'response_time': return <Clock className="w-4 h-4" />
      default: return <MessageCircle className="w-4 h-4" />
    }
  }

  const renderSatisfactionStars = (rating) => {
    if (!rating) return <span className="text-gray-400">Not rated</span>
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating}/5)</span>
      </div>
    )
  }

  const handleAssign = (complaintId) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === complaintId ? { 
        ...complaint, 
        status: 'in_progress', 
        assignedTo: adminUser?.name,
        responseTime: '< 1 hour'
      } : complaint
    ))
  }

  const handleResolve = (complaintId) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === complaintId ? { ...complaint, status: 'resolved' } : complaint
    ))
  }

  const handleEscalate = (complaintId) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === complaintId ? { ...complaint, status: 'escalated', assignedTo: 'Management Team' } : complaint
    ))
  }

  return (
    <AdminLayout 
      title="Complaint Management" 
      description="Manage customer complaints and service issues"
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
                <p className="text-sm font-medium text-gray-600">Total Complaints</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalComplaints}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open</p>
                <p className="text-3xl font-bold text-gray-900">{stats.openComplaints}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-gray-900">{stats.inProgressComplaints}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-3xl font-bold text-gray-900">{stats.resolvedComplaints}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Check className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Complaints Table */}
      <Card className="shadow-sm border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Complaints</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search complaints..."
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
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="escalated">Escalated</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
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
          {filteredComplaints.length > 0 ? (
            <div className="space-y-6">
              {filteredComplaints.map((complaint) => (
                <div key={complaint.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(complaint.category)}
                          <span className="font-medium text-gray-900">Complaint #{complaint.id}</span>
                        </div>
                        <Badge className={getStatusColor(complaint.status)}>
                          {complaint.status.replace('_', ' ')}
                        </Badge>
                        <Badge className={getPriorityColor(complaint.priority)}>
                          {complaint.priority} priority
                        </Badge>
                        {complaint.followUpRequired && (
                          <Badge variant="outline" className="text-orange-600">Follow-up required</Badge>
                        )}
                      </div>
                      <h3 className="font-medium text-gray-900 mb-2">{complaint.subject}</h3>
                      <div className="grid grid-cols-2 gap-4 mb-3 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>{complaint.complainant}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>{complaint.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{complaint.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{complaint.submittedDate}</span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <p className="text-gray-700">{complaint.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Service:</span> {complaint.relatedService}
                        </div>
                        <div>
                          <span className="font-medium">Response Time:</span> {complaint.responseTime || 'Pending'}
                        </div>
                        <div>
                          <span className="font-medium">Assigned To:</span> {complaint.assignedTo || 'Unassigned'}
                        </div>
                        <div>
                          <span className="font-medium">Attachments:</span> {complaint.attachments.length} files
                        </div>
                      </div>
                      {complaint.satisfaction && (
                        <div className="mt-3">
                          <span className="font-medium text-sm text-gray-600">Customer Satisfaction: </span>
                          {renderSatisfactionStars(complaint.satisfaction)}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {complaint.status === 'open' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleAssign(complaint.id)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <User className="w-4 h-4 mr-1" />
                          Assign
                        </Button>
                      )}
                      {(complaint.status === 'open' || complaint.status === 'in_progress') && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleResolve(complaint.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Resolve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEscalate(complaint.id)}
                            className="text-purple-600 hover:text-purple-700"
                          >
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Escalate
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
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Complaints Found</h3>
              <p className="text-gray-600">
                {isLoading ? 'Loading complaints...' : 'No complaints match your search criteria'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  )
}

