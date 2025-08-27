import React, { useState } from 'react'
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
  ArrowLeft
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function CounselorBooking() {
  const { isAuthenticated, user, userRole } = useAuth()
  const navigate = useNavigate()
  const [selectedCounselor, setSelectedCounselor] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [sessionType, setSessionType] = useState('video')

  // Sample counselors data
  const counselors = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      specialization: 'Computer Science & Engineering',
      rating: 4.9,
      reviews: 18,
      hourlyRate: 150,
      currency: 'AUD',
      avatar: '/api/placeholder/64/64',
      availableSlots: [
        { date: '2025-08-21', times: ['09:00', '10:00', '14:00', '15:00'] },
        { date: '2025-08-22', times: ['09:00', '11:00', '13:00', '16:00'] },
        { date: '2025-08-23', times: ['10:00', '14:00', '15:00'] }
      ]
    },
    {
      id: 2,
      name: 'Dr. Emma Wilson',
      specialization: 'Medicine & Health Sciences',
      rating: 4.8,
      reviews: 12,
      hourlyRate: 180,
      currency: 'AUD',
      avatar: '/api/placeholder/64/64',
      availableSlots: [
        { date: '2025-08-21', times: ['10:00', '11:00', '15:00'] },
        { date: '2025-08-22', times: ['09:00', '14:00', '16:00'] },
        { date: '2025-08-24', times: ['09:00', '10:00', '13:00'] }
      ]
    }
  ]

  const handleBookSession = () => {
    if (!isAuthenticated) {
      navigate('/signin')
      return
    }

    if (!selectedCounselor || !selectedDate || !selectedTime) {
      alert('Please select a counselor, date, and time')
      return
    }

    // Here you would typically make an API call to book the session
    alert(`Session booked with ${selectedCounselor.name} on ${selectedDate} at ${selectedTime}`)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

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
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Book a Session</h1>
          <p className="text-gray-600">Schedule a consultation with our expert counselors</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Counselor Selection */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Select a Counselor</h2>
          
          {counselors.map((counselor) => (
            <Card 
              key={counselor.id} 
              className={`cursor-pointer transition-all ${
                selectedCounselor?.id === counselor.id 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedCounselor(counselor)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-500" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{counselor.name}</h3>
                      {selectedCounselor?.id === counselor.id && (
                        <CheckCircle2 className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-2">{counselor.specialization}</p>
                    
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{counselor.rating}</span>
                        <span className="text-sm text-gray-500">({counselor.reviews} reviews)</span>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        ${counselor.hourlyRate} {counselor.currency}/hour
                      </div>
                    </div>
                    
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Available for booking
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Booking Details */}
        <div className="space-y-6">
          {/* Date Selection */}
          {selectedCounselor && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Select Date</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedCounselor.availableSlots.map((slot) => (
                  <button
                    key={slot.date}
                    onClick={() => {
                      setSelectedDate(slot.date)
                      setSelectedTime('')
                    }}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedDate === slot.date
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{formatDate(slot.date)}</div>
                    <div className="text-sm text-gray-500">{slot.times.length} slots available</div>
                  </button>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Time Selection */}
          {selectedDate && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Select Time</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {selectedCounselor.availableSlots
                    .find(slot => slot.date === selectedDate)
                    ?.times.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 text-sm rounded border transition-colors ${
                          selectedTime === time
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Session Type */}
          {selectedTime && (
            <Card>
              <CardHeader>
                <CardTitle>Session Type</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <button
                  onClick={() => setSessionType('video')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                    sessionType === 'video'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Video className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Video Call</div>
                    <div className="text-sm text-gray-500">Face-to-face consultation</div>
                  </div>
                </button>
                
                <button
                  onClick={() => setSessionType('phone')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                    sessionType === 'phone'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Phone className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Phone Call</div>
                    <div className="text-sm text-gray-500">Voice consultation</div>
                  </div>
                </button>
              </CardContent>
            </Card>
          )}

          {/* Book Button */}
          {selectedCounselor && selectedDate && selectedTime && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold">
                      ${selectedCounselor.hourlyRate} {selectedCounselor.currency}
                    </div>
                    <div className="text-sm text-gray-500">for 1 hour session</div>
                  </div>
                  
                  <Button 
                    onClick={handleBookSession}
                    className="w-full"
                    size="lg"
                  >
                    Book Session
                  </Button>
                  
                  {!isAuthenticated && (
                    <p className="text-sm text-gray-500 text-center">
                      You'll need to sign in to complete the booking
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

