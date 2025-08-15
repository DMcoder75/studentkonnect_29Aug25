import { useState, useEffect } from 'react'
import { useAdminAuth } from '../../contexts/AdminAuthContext'
import AdminSidebar from '../AdminSidebar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select } from '../ui/select'
import { 
  Clock,
  Users,
  CheckCircle2,
  TrendingUp,
  Search,
  UserCheck,
  RefreshCw,
  CircleX,
  AlertCircle,
  Mail,
  Calendar,
  MapPin,
  Star,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Download
} from 'lucide-react'

export default function CounselorManagement() {
  const { hasPermission } = useAdminAuth()
  const [activeTab, setActiveTab] = useState('requests')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [counselorRequests, setCounselorRequests] = useState([])
  const [loading, setLoading] = useState(true)

  // Mock data for counselor requests
  useEffect(() => {
    const mockRequests = [
      {
        id: 1,
        studentName: 'Arjun Patel',
        studentEmail: 'arjun.patel@email.com',
        requestedCounselor: 'Sarah Johnson',
        requestDate: '2024-07-28 10:30',
        targetCountry: 'Canada',
        fieldOfStudy: 'Law',
        reason: 'I am interested in studying law in Canada and Sarah has excellent reviews for Canadian university admissions. Her expertise in visa guidance would be very helpful for my application process.',
        preferredMeeting: 'Morning (9 AM - 12 PM)',
        priority: 'high',
        status: 'pending'
      },
      {
        id: 2,
        studentName: 'Meera Singh',
        studentEmail: 'meera.singh@email.com',
        requestedCounselor: 'Michael Chen',
        requestDate: '2024-07-27 15:45',
        targetCountry: 'Singapore',
        fieldOfStudy: 'Computer Engineering',
        reason: 'Looking for guidance on engineering programs in Singapore and Australia. Michael\'s global expertise and high success rate make him ideal for my needs.',
        preferredMeeting: 'Afternoon (12 PM - 5 PM)',
        priority: 'medium',
        status: 'pending'
      },
      {
        id: 3,
        studentName: 'Rohit Kumar',
        studentEmail: 'rohit.kumar@email.com',
        requestedCounselor: 'James Wilson',
        requestDate: '2024-07-26 09:15',
        targetCountry: 'United Kingdom',
        fieldOfStudy: 'Business Administration',
        reason: 'Interested in UK universities for business studies. James specializes in UK education system and has good experience with business programs.',
        preferredMeeting: 'Evening (5 PM - 8 PM)',
        priority: 'low',
        status: 'approved'
      }
    ]
    
    setCounselorRequests(mockRequests)
    setLoading(false)
  }, [])

  const handleApprove = (requestId) => {
    setCounselorRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'approved' } : req
      )
    )
  }

  const handleReject = (requestId) => {
    setCounselorRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'rejected' } : req
      )
    )
  }

  const handleReassign = (requestId) => {
    // Logic for reassigning counselor
    console.log('Reassigning request:', requestId)
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { variant: 'secondary', className: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      approved: { variant: 'secondary', className: 'bg-green-100 text-green-800', label: 'Approved' },
      rejected: { variant: 'secondary', className: 'bg-red-100 text-red-800', label: 'Rejected' }
    }
    
    const config = statusConfig[status] || statusConfig.pending
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    )
  }

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-red-600',
      medium: 'text-yellow-600',
      low: 'text-green-600'
    }
    return colors[priority] || colors.medium
  }

  const getAlertIcon = (priority) => {
    const iconColor = priority === 'high' ? 'text-red-600' : 
                     priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
    return <AlertCircle className={`w-4 h-4 ${iconColor}`} />
  }

  const filteredRequests = counselorRequests.filter(request => {
    const matchesSearch = request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requestedCounselor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (!hasPermission('manage_counselors')) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">You don't have permission to access this section.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Admin Sidebar */}
        <AdminSidebar />
        
        {/* Main Content */}
        <div className="flex-1 ml-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Requests</p>
              <p className="text-2xl font-bold text-gray-900">
                {counselorRequests.filter(r => r.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Assignments</p>
              <p className="text-2xl font-bold text-gray-900">
                {counselorRequests.filter(r => r.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved Today</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">94%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('requests')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === 'requests'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Counselor Requests</span>
            </button>
            <button
              onClick={() => setActiveTab('assignments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === 'assignments'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Active Assignments</span>
            </button>
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Counselor Overview</span>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search students, counselors..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </Select>
            </div>
          </div>

          {/* Request Cards */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading requests...</p>
              </div>
            ) : filteredRequests.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No requests found.</p>
              </div>
            ) : (
              filteredRequests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{request.studentName}</h3>
                        {getStatusBadge(request.status)}
                        {getAlertIcon(request.priority)}
                      </div>

                      {/* Basic Info */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Student Email</p>
                          <p className="font-medium">{request.studentEmail}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Requested Counselor</p>
                          <p className="font-medium">{request.requestedCounselor}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Request Date</p>
                          <p className="font-medium">{request.requestDate}</p>
                        </div>
                      </div>

                      {/* Study Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Target Country</p>
                          <p className="font-medium">{request.targetCountry}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Field of Study</p>
                          <p className="font-medium">{request.fieldOfStudy}</p>
                        </div>
                      </div>

                      {/* Reason */}
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-1">Reason for Request</p>
                        <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{request.reason}</p>
                      </div>

                      {/* Footer Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Preferred meeting: {request.preferredMeeting}</span>
                        <span>
                          Priority: <span className={getPriorityColor(request.priority)}>{request.priority}</span>
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {request.status === 'pending' && (
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          onClick={() => handleApprove(request.id)}
                          className="bg-green-600 hover:bg-green-700"
                          size="sm"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleReassign(request.id)}
                          variant="outline"
                          size="sm"
                        >
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Reassign
                        </Button>
                        <Button
                          onClick={() => handleReject(request.id)}
                          variant="destructive"
                          size="sm"
                        >
                          <CircleX className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
          </div>
        </div>
      </div>
    </div>
  )
}

