import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { counselorConnectionService } from '../services/counselorConnectionService'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import Sidebar from './Sidebar'
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
  Video,
  Users
} from 'lucide-react'

export default function StudentConnectionsPage({ isMobileMenuOpen, onMobileMenuClose }) {
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

  if (userRole && userRole !== 'student') {
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
    <div className="w-full">
      {/* Hero Section - Full Width */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white py-12 w-full">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
              My Connections
            </h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
              View and manage your counselor connection requests and approved connections.
            </p>
          </div>
        </div>
      </section>

      {/* Two-Column Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={true}
          onClose={() => {}}
          isHomepage={false}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={onMobileMenuClose}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full md:w-auto transition-all duration-300">
          <div className="container mx-auto px-6 py-12">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Connection Requests</h2>
                <p className="text-gray-600">Track the status of your counselor connections</p>
              </div>
              <Button onClick={loadConnections} disabled={loading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="shadow-lg border-0">
                <CardContent className="pt-6">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-1 text-center">{connections.length}</div>
                  <div className="text-sm text-gray-600 text-center">Total Requests</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg border-0">
                <CardContent className="pt-6">
                  <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-1 text-center">
                    {connections.filter(c => c.status === 'approved').length}
                  </div>
                  <div className="text-sm text-gray-600 text-center">Approved</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg border-0">
                <CardContent className="pt-6">
                  <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold text-yellow-600 mb-1 text-center">
                    {connections.filter(c => c.status === 'pending').length}
                  </div>
                  <div className="text-sm text-gray-600 text-center">Pending</div>
                </CardContent>
              </Card>
            </div>

            {/* Connections List */}
            <div className="space-y-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </div>
              ) : connections.length === 0 ? (
                <Card className="shadow-lg border-0">
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Connections Yet</h3>
                    <p className="text-gray-600 mb-6">
                      You haven't made any counselor connection requests yet. Browse our counselor directory to find the perfect match for your needs.
                    </p>
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => window.location.href = '/counselor/directory'}
                    >
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
        </main>
      </div>
    </div>
  )
}

