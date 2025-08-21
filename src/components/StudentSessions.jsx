import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { 
  Calendar, 
  Clock, 
  User, 
  Video, 
  Phone, 
  MessageSquare,
  Star,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Plus,
  FileText,
  Download
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function StudentSessions() {
  const { isAuthenticated, user, userRole } = useAuth()
  const navigate = useNavigate()
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all') // all, upcoming, completed, cancelled

  // Sample sessions data
  const sampleSessions = [
    {
      id: 1,
      counselorName: 'Dr. Sarah Chen',
      counselorSpecialization: 'Computer Science & Engineering',
      date: '2025-08-25',
      time: '14:00',
      duration: 60,
      type: 'video',
      status: 'confirmed',
      price: 150,
      currency: 'AUD',
      notes: 'Discuss university applications for Computer Science programs',
      sessionLink: 'https://meet.google.com/abc-defg-hij',
      createdAt: '2025-08-20T10:30:00Z'
    },
    {
      id: 2,
      counselorName: 'Dr. Emma Wilson',
      counselorSpecialization: 'Medicine & Health Sciences',
      date: '2025-08-22',
      time: '10:00',
      duration: 60,
      type: 'phone',
      status: 'completed',
      price: 180,
      currency: 'AUD',
      notes: 'Career guidance for medical school applications',
      rating: 5,
      feedback: 'Excellent session! Very helpful guidance.',
      createdAt: '2025-08-15T09:15:00Z'
    },
    {
      id: 3,
      counselorName: 'Michael Kumar',
      counselorSpecialization: 'Business & Finance',
      date: '2025-08-28',
      time: '16:00',
      duration: 60,
      type: 'video',
      status: 'pending',
      price: 120,
      currency: 'AUD',
      notes: 'MBA program selection and application strategy',
      createdAt: '2025-08-19T14:20:00Z'
    }
  ]

  useEffect(() => {
    if (isAuthenticated() && userRole === 'student') {
      loadSessions()
    }
  }, [isAuthenticated, userRole])

  const loadSessions = async () => {
    setLoading(true)
    try {
      // Simulate API call
      setTimeout(() => {
        setSessions(sampleSessions)
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error loading sessions:', error)
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle2 className="h-3 w-3 mr-1" />Confirmed</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200"><CheckCircle2 className="h-3 w-3 mr-1" />Completed</Badge>
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 border-red-200"><XCircle className="h-3 w-3 mr-1" />Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const isUpcoming = (date, time) => {
    const sessionDateTime = new Date(`${date}T${time}`)
    return sessionDateTime > new Date()
  }

  const filteredSessions = sessions.filter(session => {
    switch (filter) {
      case 'upcoming':
        return isUpcoming(session.date, session.time) && session.status !== 'cancelled'
      case 'completed':
        return session.status === 'completed'
      case 'cancelled':
        return session.status === 'cancelled'
      default:
        return true
    }
  })

  if (userRole && userRole !== 'student') {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-8 text-center">
            <User className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Restricted</h3>
            <p className="text-gray-600">This page is only accessible to students.</p>
            <Button onClick={() => navigate('/')} className="mt-4">
              Go to Homepage
            </Button>
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
          <h1 className="text-3xl font-bold text-gray-900">My Sessions</h1>
          <p className="text-gray-600">Manage your counseling sessions and appointments</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={loadSessions} disabled={loading} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={() => navigate('/counselors/book')}>
            <Plus className="h-4 w-4 mr-2" />
            Book Session
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        {[
          { key: 'all', label: 'All Sessions' },
          { key: 'upcoming', label: 'Upcoming' },
          { key: 'completed', label: 'Completed' },
          { key: 'cancelled', label: 'Cancelled' }
        ].map((filterOption) => (
          <button
            key={filterOption.key}
            onClick={() => setFilter(filterOption.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === filterOption.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filterOption.label}
          </button>
        ))}
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {loading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">Loading your sessions...</p>
            </CardContent>
          </Card>
        ) : filteredSessions.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Sessions Found</h3>
              <p className="text-gray-600 mb-4">
                {filter === 'all' 
                  ? "You haven't booked any sessions yet." 
                  : `No ${filter} sessions found.`}
              </p>
              <Button onClick={() => navigate('/counselors/book')}>
                <Plus className="h-4 w-4 mr-2" />
                Book Your First Session
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredSessions.map((session) => (
            <Card key={session.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{session.counselorName}</h3>
                        <p className="text-sm text-gray-600">{session.counselorSpecialization}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{formatDate(session.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{formatTime(session.time)} ({session.duration} min)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {session.type === 'video' ? (
                          <Video className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Phone className="h-4 w-4 text-gray-400" />
                        )}
                        <span className="text-sm capitalize">{session.type} call</span>
                      </div>
                    </div>

                    {session.notes && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600">
                          <strong>Notes:</strong> {session.notes}
                        </p>
                      </div>
                    )}

                    {session.status === 'completed' && session.feedback && (
                      <div className="mb-4 p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < session.rating 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">Your Rating</span>
                        </div>
                        <p className="text-sm text-gray-700">{session.feedback}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold text-gray-900">
                        ${session.price} {session.currency}
                      </div>
                      <div className="flex items-center space-x-3">
                        {getStatusBadge(session.status)}
                        
                        {session.status === 'confirmed' && isUpcoming(session.date, session.time) && (
                          <div className="flex space-x-2">
                            {session.sessionLink && (
                              <Button 
                                size="sm"
                                onClick={() => window.open(session.sessionLink, '_blank')}
                              >
                                {session.type === 'video' ? (
                                  <Video className="h-4 w-4 mr-1" />
                                ) : (
                                  <Phone className="h-4 w-4 mr-1" />
                                )}
                                Join Session
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Message
                            </Button>
                          </div>
                        )}
                        
                        {session.status === 'completed' && (
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-1" />
                              Download Notes
                            </Button>
                            <Button size="sm" variant="outline">
                              <Star className="h-4 w-4 mr-1" />
                              Rate Session
                            </Button>
                          </div>
                        )}
                        
                        {session.status === 'pending' && (
                          <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                            <XCircle className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

