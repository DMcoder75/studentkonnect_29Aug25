import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Clock,
  CheckCircle2,
  XCircle,
  MessageCircle,
  Video,
  Phone,
  Mail,
  Calendar,
  User,
  AlertCircle,
  Eye
} from 'lucide-react'
import Sidebar from './Sidebar'

export default function ConnectionStatus({ isMobileMenuOpen, onMobileMenuClose }) {
  const [connections, setConnections] = useState([])
  const [filter, setFilter] = useState('all')

  // Mock data for demonstration
  useEffect(() => {
    const mockConnections = [
      {
        id: 1,
        counselor: {
          name: 'Dr. Sarah Chen',
          title: 'Senior Migration Counselor',
          avatar: '/api/placeholder/40/40',
          rating: 4.9
        },
        type: 'video',
        status: 'confirmed',
        requestDate: '2024-01-20',
        scheduledDate: '2024-01-25',
        scheduledTime: '14:00',
        duration: 60,
        topic: 'Student Visa Application',
        lastUpdate: '2024-01-21T10:30:00Z',
        messages: 3
      },
      {
        id: 2,
        counselor: {
          name: 'Michael Thompson',
          title: 'University Admissions Specialist',
          avatar: '/api/placeholder/40/40',
          rating: 4.7
        },
        type: 'message',
        status: 'pending',
        requestDate: '2024-01-22',
        topic: 'University Selection Guidance',
        lastUpdate: '2024-01-22T15:45:00Z',
        urgency: 'high'
      },
      {
        id: 3,
        counselor: {
          name: 'Prof. Rajesh Kumar',
          title: 'Academic Excellence Advisor',
          avatar: '/api/placeholder/40/40',
          rating: 4.95
        },
        type: 'phone',
        status: 'completed',
        requestDate: '2024-01-15',
        scheduledDate: '2024-01-18',
        scheduledTime: '10:00',
        duration: 45,
        topic: 'PhD Application Strategy',
        lastUpdate: '2024-01-18T11:00:00Z',
        rating: 5,
        feedback: 'Excellent guidance on research proposal'
      },
      {
        id: 4,
        counselor: {
          name: 'Emma Williams',
          title: 'Student Support Coordinator',
          avatar: '/api/placeholder/40/40',
          rating: 4.6
        },
        type: 'video',
        status: 'cancelled',
        requestDate: '2024-01-19',
        scheduledDate: '2024-01-24',
        scheduledTime: '16:00',
        topic: 'Cultural Adaptation Support',
        lastUpdate: '2024-01-23T09:15:00Z',
        cancelReason: 'Counselor unavailable'
      }
    ]
    setConnections(mockConnections)
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'confirmed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-blue-500" />
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />
      case 'phone':
        return <Phone className="h-4 w-4" />
      case 'message':
        return <MessageCircle className="h-4 w-4" />
      case 'email':
        return <Mail className="h-4 w-4" />
      default:
        return <MessageCircle className="h-4 w-4" />
    }
  }

  const filteredConnections = connections.filter(connection => {
    if (filter === 'all') return true
    return connection.status === filter
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatLastUpdate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    return formatDate(dateString)
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-12 w-full">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <MessageCircle className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                My Connections
              </h1>
            </div>
            <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
              Track your counselor connections and manage your sessions
            </p>
          </div>
        </div>
      </section>

      {/* Two-Column Layout */}
      <div className="flex">
        <Sidebar 
          isOpen={true}
          onClose={() => {}}
          isHomepage={false}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={onMobileMenuClose}
        />

        <main className="flex-1 w-full md:w-auto transition-all duration-300">
          <div className="container mx-auto px-6 py-12">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Connection Status</h2>
                  <p className="text-gray-600">Manage your counselor relationships</p>
                </div>
        
        {/* Status Filter */}
        <div className="flex flex-wrap gap-2">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(status)}
              className={filter === status ? 'bg-purple-600 hover:bg-purple-700' : ''}
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Connections List */}
      <div className="space-y-4">
        {filteredConnections.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No connections found</h3>
              <p className="text-gray-600">
                {filter === 'all' 
                  ? "You haven't connected with any counselors yet." 
                  : `No ${filter} connections found.`}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredConnections.map((connection) => (
            <Card key={connection.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Connection Info */}
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {connection.counselor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {connection.counselor.name}
                        </h3>
                        <Badge className={getStatusColor(connection.status)}>
                          {getStatusIcon(connection.status)}
                          <span className="ml-1 capitalize">{connection.status}</span>
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{connection.counselor.title}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          {getTypeIcon(connection.type)}
                          <span className="capitalize">{connection.type}</span>
                        </div>
                        
                        {connection.scheduledDate && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {formatDate(connection.scheduledDate)} at {connection.scheduledTime}
                            </span>
                          </div>
                        )}
                        
                        {connection.duration && (
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{connection.duration} min</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700">Topic: {connection.topic}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Last updated: {formatLastUpdate(connection.lastUpdate)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 lg:ml-4">
                    {connection.status === 'pending' && (
                      <>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          Cancel Request
                        </Button>
                      </>
                    )}
                    
                    {connection.status === 'confirmed' && (
                      <>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Join Session
                        </Button>
                        <Button size="sm" variant="outline">
                          Reschedule
                        </Button>
                      </>
                    )}
                    
                    {connection.status === 'completed' && (
                      <>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View Summary
                        </Button>
                        {!connection.rating && (
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            Rate Session
                          </Button>
                        )}
                      </>
                    )}
                    
                    {connection.status === 'cancelled' && (
                      <Button size="sm" variant="outline">
                        Book Again
                      </Button>
                    )}
                    
                    {connection.messages && connection.messages > 0 && (
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Messages ({connection.messages})
                      </Button>
                    )}
                  </div>
                </div>

                {/* Additional Info for specific statuses */}
                {connection.status === 'completed' && connection.feedback && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Your feedback:</strong> "{connection.feedback}"
                    </p>
                    {connection.rating && (
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-blue-700 mr-2">Your rating:</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < connection.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {connection.status === 'cancelled' && connection.cancelReason && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Cancellation reason:</strong> {connection.cancelReason}
                    </p>
                  </div>
                )}
                
                {connection.urgency === 'high' && connection.status === 'pending' && (
                  <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-orange-500 mr-2" />
                      <p className="text-sm text-orange-800">
                        <strong>High Priority:</strong> This is marked as urgent and will be prioritized.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

