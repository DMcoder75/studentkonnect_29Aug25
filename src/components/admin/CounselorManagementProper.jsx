import { useState, useEffect } from 'react'
import AdminSidebar from '../AdminSidebar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { 
  Clock,
  Users,
  CircleCheckBig,
  TrendingUp,
  Search,
  CircleAlert,
  RefreshCw,
  CircleX,
  UserCheck
} from 'lucide-react'

export default function CounselorManagementProper() {
  const [activeTab, setActiveTab] = useState('requests')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch real counselor request data from database
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true)
        // This would connect to your actual database
        // const response = await fetch('/api/admin/counselor-requests')
        // const data = await response.json()
        // setRequests(data)
        
        // For now, we'll show empty state until database is connected
        setRequests([])
      } catch (error) {
        console.error('Error fetching counselor requests:', error)
        setRequests([])
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600'
      case 'medium':
        return 'text-yellow-600'
      case 'low':
        return 'text-green-600'
      default:
        return 'text-gray-600'
    }
  }

  const getAlertIcon = (priority) => {
    const colorClass = priority === 'high' ? 'text-red-600' : priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
    return <CircleAlert className={`w-4 h-4 ${colorClass}`} />
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
                    <p className="text-2xl font-bold text-gray-900">2</p>
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
                    <p className="text-2xl font-bold text-gray-900">2</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CircleCheckBig className="w-6 h-6 text-green-600" />
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

            {/* Main Content Card */}
            <div className="bg-white rounded-lg shadow">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 px-6">
                  <button 
                    className={`${activeTab === 'requests' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                    onClick={() => setActiveTab('requests')}
                  >
                    <Clock className="w-4 h-4" />
                    <span>Counselor Requests</span>
                  </button>
                  <button 
                    className={`${activeTab === 'assignments' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                    onClick={() => setActiveTab('assignments')}
                  >
                    <Users className="w-4 h-4" />
                    <span>Active Assignments</span>
                  </button>
                  <button 
                    className={`${activeTab === 'overview' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                    onClick={() => setActiveTab('overview')}
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Counselor Overview</span>
                  </button>
                </nav>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search students, counselors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="sm:w-48">
                    <select 
                      value={statusFilter} 
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                {/* Request Cards */}
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Loading counselor requests...</p>
                    </div>
                  ) : requests.length === 0 ? (
                    <div className="text-center py-8">
                      <Clock className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No counselor requests found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Connect to database to display real counselor request data.
                      </p>
                    </div>
                  ) : (
                    requests.map((request) => (
                      <div key={request.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{request.studentName}</h3>
                              {getStatusBadge(request.status)}
                              {getAlertIcon(request.priority)}
                            </div>
                            
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
                            
                            <div className="mb-4">
                              <p className="text-sm text-gray-600 mb-1">Reason for Request</p>
                              <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{request.reason}</p>
                            </div>
                            
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>Preferred meeting: {request.preferredMeeting}</span>
                              <span>Priority: <span className={getPriorityColor(request.priority)}>{request.priority}</span></span>
                            </div>
                          </div>
                          
                          {request.status === 'pending' && (
                            <div className="flex items-center space-x-2 ml-4">
                              <Button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-1">
                                <CircleCheckBig className="w-4 h-4" />
                                <span>Approve</span>
                              </Button>
                              <Button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-1">
                                <RefreshCw className="w-4 h-4" />
                                <span>Reassign</span>
                              </Button>
                              <Button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-1">
                                <CircleX className="w-4 h-4" />
                                <span>Reject</span>
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

