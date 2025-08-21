import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { counselorConnectionService } from '../services/counselorConnectionService'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  User, 
  Mail, 
  Calendar,
  MessageSquare,
  AlertCircle,
  RefreshCw,
  Phone,
  Video
} from 'lucide-react'

export default function StudentConnectionsPage() {
  const { user, userRole } = useAuth()
  const [connections, setConnections] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user?.id && userRole === 'student') {
      loadConnections()
    }
  }, [user, userRole])

  const loadConnections = async () => {
    setLoading(true)
    try {
      const result = await counselorConnectionService.getStudentConnections(user.id)
      if (result.success) {
        setConnections(result.connections)
      }
    } catch (error) {
      console.error('Error loading connections:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (connectionId) => {
    const confirmed = window.confirm('Are you sure you want to cancel this connection request?')
    if (!confirmed) return

    try {
      const result = await counselorConnectionService.cancelConnectionRequest(connectionId, user.id)
      if (result.success) {
        await loadConnections()
        alert('Connection request cancelled successfully')
      } else {
        alert(result.error)
      }
    } catch (error) {
      alert('Failed to cancel connection request')
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><Clock className="h-3 w-3 mr-1" />Pending Approval</Badge>
      case 'approved':
        return <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle2 className="h-3 w-3 mr-1" />Approved</Badge>
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-600"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>
      case 'cancelled':
        return <Badge variant="outline" className="text-gray-600 border-gray-600"><XCircle className="h-3 w-3 mr-1" />Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusMessage = (connection) => {
    switch (connection.status) {
      case 'pending':
        return {
          title: 'Request Pending',
          message: 'Your connection request is being reviewed by our admin team. You will be notified once approved.',
          color: 'yellow'
        }
      case 'approved':
        return {
          title: 'Connection Approved!',
          message: 'Congratulations! Your connection has been approved. You can now contact your counselor.',
          color: 'green'
        }
      case 'rejected':
        return {
          title: 'Request Rejected',
          message: 'Unfortunately, your connection request was not approved. You can submit a new request with a different counselor.',
          color: 'red'
        }
      case 'cancelled':
        return {
          title: 'Request Cancelled',
          message: 'You cancelled this connection request. You can submit a new request anytime.',
          color: 'gray'
        }
      default:
        return {
          title: 'Unknown Status',
          message: 'Please contact support for assistance.',
          color: 'gray'
        }
    }
  }

  if (userRole !== 'student') {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-400" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Denied</h3>
            <p className="text-gray-600">This page is only accessible to students.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Connections</h1>
          <p className="text-gray-600">View and manage your counselor connection requests</p>
        </div>
        <Button onClick={loadConnections} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Connections List */}
      <div className="space-y-4">
        {loading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">Loading your connections...</p>
            </CardContent>
          </Card>
        ) : connections.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Connections Yet</h3>
              <p className="text-gray-600 mb-4">
                You haven't made any counselor connection requests yet. Browse our counselor directory to find the perfect match for your needs.
              </p>
              <Button onClick={() => window.location.href = '/counselor/directory'}>
                Find Counselors
              </Button>
            </CardContent>
          </Card>
        ) : (
          connections.map((connection) => {
            const statusInfo = getStatusMessage(connection)
            return (
              <Card key={connection.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{connection.counselorName}</h3>
                          <p className="text-sm text-gray-600">Counselor</p>
                        </div>
                      </div>

                      <div className={`p-4 rounded-lg mb-4 ${
                        statusInfo.color === 'yellow' ? 'bg-yellow-50 border border-yellow-200' :
                        statusInfo.color === 'green' ? 'bg-green-50 border border-green-200' :
                        statusInfo.color === 'red' ? 'bg-red-50 border border-red-200' :
                        'bg-gray-50 border border-gray-200'
                      }`}>
                        <div className="flex items-center space-x-2 mb-2">
                          {statusInfo.color === 'yellow' && <Clock className="h-5 w-5 text-yellow-600" />}
                          {statusInfo.color === 'green' && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                          {statusInfo.color === 'red' && <XCircle className="h-5 w-5 text-red-600" />}
                          {statusInfo.color === 'gray' && <XCircle className="h-5 w-5 text-gray-600" />}
                          <h4 className={`font-semibold ${
                            statusInfo.color === 'yellow' ? 'text-yellow-800' :
                            statusInfo.color === 'green' ? 'text-green-800' :
                            statusInfo.color === 'red' ? 'text-red-800' :
                            'text-gray-800'
                          }`}>{statusInfo.title}</h4>
                        </div>
                        <p className={`text-sm ${
                          statusInfo.color === 'yellow' ? 'text-yellow-700' :
                          statusInfo.color === 'green' ? 'text-green-700' :
                          statusInfo.color === 'red' ? 'text-red-700' :
                          'text-gray-700'
                        }`}>{statusInfo.message}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Request Date</p>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{formatDate(connection.requestDate)}</span>
                          </div>
                        </div>
                        {connection.approvedDate && (
                          <div>
                            <p className="text-sm text-gray-600">Approved Date</p>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{formatDate(connection.approvedDate)}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {connection.notes && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-600">Request Notes</p>
                          <p className="text-sm bg-gray-50 p-2 rounded">{connection.notes}</p>
                        </div>
                      )}

                      {connection.rejectionReason && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-600">Rejection Reason</p>
                          <p className="text-sm bg-red-50 p-2 rounded text-red-800">{connection.rejectionReason}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end space-y-3">
                      {getStatusBadge(connection.status)}
                      
                      <div className="flex flex-col space-y-2">
                        {connection.status === 'pending' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => handleCancel(connection.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Cancel Request
                          </Button>
                        )}
                        
                        {connection.status === 'approved' && (
                          <>
                            <Button 
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Message
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                            >
                              <Video className="h-4 w-4 mr-1" />
                              Video Call
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}

