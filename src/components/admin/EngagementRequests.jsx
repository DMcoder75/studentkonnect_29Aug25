import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { 
  MessageSquare, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  UserCheck,
  Calendar,
  Star,
  MapPin,
  GraduationCap,
  Mail,
  Phone,
  RefreshCw
} from 'lucide-react'
import { supabase } from '../../lib/supabase'
import AdminLayout from './AdminLayout'

export default function EngagementRequests() {
  const [requests, setRequests] = useState([])
  const [counselors, setCounselors] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [showModifyModal, setShowModifyModal] = useState(false)
  const [selectedCounselor, setSelectedCounselor] = useState('')

  // Mock data for engagement requests
  const mockRequests = [
    {
      id: 'REQ-001',
      student_name: 'John Smith',
      student_email: 'john.smith@email.com',
      student_university: 'Harvard University',
      student_course: 'Computer Science',
      requested_counselor: 'Dr. Sarah Chen',
      counselor_id: 1,
      request_date: '2024-08-12',
      status: 'pending',
      priority: 'high',
      reason: 'Need guidance for PhD applications in AI/ML',
      student_location: 'Boston, MA',
      preferred_meeting: 'video_call'
    },
    {
      id: 'REQ-002',
      student_name: 'Emily Johnson',
      student_email: 'emily.j@email.com',
      student_university: 'MIT',
      student_course: 'Data Science',
      requested_counselor: 'Michael Kumar',
      counselor_id: 2,
      request_date: '2024-08-11',
      status: 'under_review',
      priority: 'medium',
      reason: 'Career transition guidance needed',
      student_location: 'Cambridge, MA',
      preferred_meeting: 'in_person'
    },
    {
      id: 'REQ-003',
      student_name: 'David Wilson',
      student_email: 'david.w@email.com',
      student_university: 'Stanford University',
      student_course: 'Business Administration',
      requested_counselor: 'Dr. Emma Wilson',
      counselor_id: 3,
      request_date: '2024-08-10',
      status: 'approved',
      priority: 'medium',
      reason: 'MBA program selection assistance',
      student_location: 'Palo Alto, CA',
      preferred_meeting: 'video_call'
    },
    {
      id: 'REQ-004',
      student_name: 'Sarah Davis',
      student_email: 'sarah.d@email.com',
      student_university: 'University of Toronto',
      student_course: 'Medicine',
      requested_counselor: 'Dr. Sarah Chen',
      counselor_id: 1,
      request_date: '2024-08-09',
      status: 'rejected',
      priority: 'low',
      reason: 'Medical school application support',
      student_location: 'Toronto, ON',
      preferred_meeting: 'phone_call'
    }
  ]

  useEffect(() => {
    fetchRequests()
    fetchCounselors()
  }, [])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      // For now, use mock data. In production, this would fetch from database
      setRequests(mockRequests)
    } catch (error) {
      console.error('Error fetching engagement requests:', error)
      setRequests(mockRequests)
    } finally {
      setLoading(false)
    }
  }

  const fetchCounselors = async () => {
    try {
      const { data, error } = await supabase
        .from('counselors')
        .select('*')
        .eq('status', 'active')
        .order('first_name')

      if (error) throw error
      setCounselors(data || [])
    } catch (error) {
      console.error('Error fetching counselors:', error)
      // Mock counselors data
      setCounselors([
        { id: 1, first_name: 'Sarah', last_name: 'Chen', email: 'sarah.chen@email.com', specialization: 'Computer Science' },
        { id: 2, first_name: 'Michael', last_name: 'Kumar', email: 'michael.kumar@email.com', specialization: 'Business' },
        { id: 3, first_name: 'Emma', last_name: 'Wilson', email: 'emma.wilson@email.com', specialization: 'Medicine' }
      ])
    }
  }

  const handleApprove = async (requestId) => {
    try {
      // Update request status to approved
      setRequests(prev => prev.map(req => 
        req.id === requestId ? { ...req, status: 'approved' } : req
      ))
    } catch (error) {
      console.error('Error approving request:', error)
    }
  }

  const handleReject = async (requestId) => {
    try {
      // Update request status to rejected
      setRequests(prev => prev.map(req => 
        req.id === requestId ? { ...req, status: 'rejected' } : req
      ))
    } catch (error) {
      console.error('Error rejecting request:', error)
    }
  }

  const handleModify = (request) => {
    setSelectedRequest(request)
    setSelectedCounselor(request.counselor_id.toString())
    setShowModifyModal(true)
  }

  const handleUpdateAssignment = async () => {
    try {
      const newCounselor = counselors.find(c => c.id.toString() === selectedCounselor)
      if (newCounselor && selectedRequest) {
        setRequests(prev => prev.map(req => 
          req.id === selectedRequest.id 
            ? { 
                ...req, 
                requested_counselor: `${newCounselor.first_name} ${newCounselor.last_name}`,
                counselor_id: newCounselor.id,
                status: 'under_review'
              } 
            : req
        ))
        setShowModifyModal(false)
        setSelectedRequest(null)
      }
    } catch (error) {
      console.error('Error updating assignment:', error)
    }
  }

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.student_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'under_review':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Under Review</Badge>
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Approved</Badge>
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>
      case 'medium':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Medium Priority</Badge>
      case 'low':
        return <Badge variant="outline">Low Priority</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    under_review: requests.filter(r => r.status === 'under_review').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <AdminLayout 
      title="Engagement Requests" 
      description="Manage student requests for counselor engagement"
    >
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <MessageSquare className="h-4 w-4 mr-2" />
            New Request
          </Button>
        </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Under Review</p>
                <p className="text-2xl font-bold text-gray-900">{stats.under_review}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by student name, email, or request ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="under_review">Under Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">Request {request.id}</h3>
                    {getPriorityBadge(request.priority)}
                    {getStatusBadge(request.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Student Information */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Student Information</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          <span className="font-medium">{request.student_name}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          {request.student_email}
                        </div>
                        <div className="flex items-center">
                          <GraduationCap className="h-4 w-4 mr-2" />
                          {request.student_university}
                        </div>
                        <div className="flex items-center">
                          <GraduationCap className="h-4 w-4 mr-2" />
                          {request.student_course}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {request.student_location}
                        </div>
                      </div>
                    </div>

                    {/* Counselor Information */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Requested Counselor</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <UserCheck className="h-4 w-4 mr-2" />
                          <span className="font-medium">{request.requested_counselor}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Requested on {new Date(request.request_date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          Preferred: {request.preferred_meeting.replace('_', ' ')}
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-900">Reason:</p>
                        <p className="text-sm text-gray-600 mt-1">{request.reason}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2 ml-6">
                  {request.status === 'pending' && (
                    <>
                      <Button 
                        size="sm" 
                        onClick={() => handleApprove(request.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleModify(request)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Modify
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleReject(request.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modify Modal */}
      {showModifyModal && selectedRequest && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Modify Counselor Assignment</h3>
            <p className="text-sm text-gray-600 mb-4">
              Request: {selectedRequest.id} - {selectedRequest.student_name}
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign to Counselor
              </label>
              <Select value={selectedCounselor} onValueChange={setSelectedCounselor}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a counselor" />
                </SelectTrigger>
                <SelectContent>
                  {counselors.map((counselor) => (
                    <SelectItem key={counselor.id} value={counselor.id.toString()}>
                      {counselor.first_name} {counselor.last_name} - {counselor.specialization}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-3">
              <Button onClick={handleUpdateAssignment} className="flex-1">
                Update Assignment
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowModifyModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      </div>
    </AdminLayout>
  )
}

