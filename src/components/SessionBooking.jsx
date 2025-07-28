import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Calendar,
  Clock,
  Video,
  Phone,
  MessageCircle,
  User,
  DollarSign,
  CheckCircle2,
  X,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'

export default function SessionBooking({ counselor, isOpen, onClose, sessionType = 'video' }) {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [sessionDetails, setSessionDetails] = useState({
    duration: '60',
    topic: '',
    description: '',
    urgency: 'normal',
    studentName: '',
    studentEmail: '',
    studentPhone: ''
  })
  const [currentStep, setCurrentStep] = useState(1)

  if (!isOpen || !counselor) return null

  // Generate available dates (next 14 days, excluding weekends for this example)
  const generateAvailableDates = () => {
    const dates = []
    const today = new Date()
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      // Skip weekends for this example
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          date: date.toISOString().split('T')[0],
          display: date.toLocaleDateString('en-AU', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          }),
          available: Math.random() > 0.3 // Random availability for demo
        })
      }
    }
    return dates
  }

  // Generate time slots based on counselor availability
  const generateTimeSlots = () => {
    const slots = []
    const availableHours = counselor.availableSlots || ['Morning', 'Afternoon']
    
    if (availableHours.includes('Morning')) {
      slots.push(
        { time: '09:00', display: '9:00 AM', available: true },
        { time: '10:00', display: '10:00 AM', available: Math.random() > 0.4 },
        { time: '11:00', display: '11:00 AM', available: true }
      )
    }
    
    if (availableHours.includes('Afternoon')) {
      slots.push(
        { time: '13:00', display: '1:00 PM', available: Math.random() > 0.3 },
        { time: '14:00', display: '2:00 PM', available: true },
        { time: '15:00', display: '3:00 PM', available: Math.random() > 0.4 },
        { time: '16:00', display: '4:00 PM', available: true }
      )
    }
    
    if (availableHours.includes('Evening')) {
      slots.push(
        { time: '17:00', display: '5:00 PM', available: true },
        { time: '18:00', display: '6:00 PM', available: Math.random() > 0.5 }
      )
    }
    
    return slots
  }

  const availableDates = generateAvailableDates()
  const timeSlots = generateTimeSlots()

  const sessionTypes = {
    video: {
      icon: Video,
      name: 'Video Call',
      description: 'Face-to-face consultation via video call',
      duration: ['30', '60', '90'],
      rate: counselor.hourlyRate
    },
    phone: {
      icon: Phone,
      name: 'Phone Call',
      description: 'Voice consultation via phone call',
      duration: ['30', '60'],
      rate: counselor.hourlyRate * 0.8 // Slightly lower rate for phone
    },
    message: {
      icon: MessageCircle,
      name: 'Extended Messaging',
      description: 'Detailed consultation via messaging',
      duration: ['60', '120'],
      rate: counselor.hourlyRate * 0.6 // Lower rate for messaging
    }
  }

  const currentSessionType = sessionTypes[sessionType]
  const SessionIcon = currentSessionType.icon

  const calculateTotal = () => {
    const duration = parseInt(sessionDetails.duration)
    const rate = currentSessionType.rate
    return ((duration / 60) * rate).toFixed(0)
  }

  const handleInputChange = (field, value) => {
    setSessionDetails(prev => ({ ...prev, [field]: value }))
  }

  const handleBooking = () => {
    const bookingData = {
      counselor: counselor.id,
      sessionType,
      date: selectedDate,
      time: selectedTime,
      duration: sessionDetails.duration,
      total: calculateTotal(),
      ...sessionDetails
    }
    
    console.log('Booking data:', bookingData)
    alert(`Session booked successfully! You will receive a confirmation email shortly.`)
    onClose()
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const canProceedStep1 = selectedDate && selectedTime
  const canProceedStep2 = sessionDetails.topic && sessionDetails.studentName && sessionDetails.studentEmail

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center">
              <SessionIcon className="h-5 w-5 mr-2" />
              Book {currentSessionType.name} with {counselor.name}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">{currentSessionType.description}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step < currentStep ? <CheckCircle2 className="h-4 w-4" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step < currentStep ? 'bg-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Date & Time Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Select Date & Time
                </h3>
                
                {/* Date Selection */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Available Dates</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {availableDates.map((date) => (
                      <button
                        key={date.date}
                        onClick={() => date.available && setSelectedDate(date.date)}
                        disabled={!date.available}
                        className={`p-3 border rounded-lg text-sm transition-colors ${
                          selectedDate === date.date
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : date.available
                            ? 'border-gray-200 hover:border-gray-300'
                            : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {date.display}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div>
                    <h4 className="font-medium mb-3">Available Times ({counselor.timezone})</h4>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() => slot.available && setSelectedTime(slot.time)}
                          disabled={!slot.available}
                          className={`p-2 border rounded-lg text-sm transition-colors ${
                            selectedTime === slot.time
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : slot.available
                              ? 'border-gray-200 hover:border-gray-300'
                              : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {slot.display}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Duration Selection */}
                {selectedTime && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-3">Session Duration</h4>
                    <div className="flex space-x-3">
                      {currentSessionType.duration.map((duration) => (
                        <button
                          key={duration}
                          onClick={() => handleInputChange('duration', duration)}
                          className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                            sessionDetails.duration === duration
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {duration} min
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Session Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Session Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <Input
                    type="text"
                    required
                    value={sessionDetails.studentName}
                    onChange={(e) => handleInputChange('studentName', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    required
                    value={sessionDetails.studentEmail}
                    onChange={(e) => handleInputChange('studentEmail', e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {sessionType !== 'message' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={sessionDetails.studentPhone}
                    onChange={(e) => handleInputChange('studentPhone', e.target.value)}
                    placeholder="+61 xxx xxx xxx"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Session Topic *
                </label>
                <Input
                  type="text"
                  required
                  value={sessionDetails.topic}
                  onChange={(e) => handleInputChange('topic', e.target.value)}
                  placeholder="e.g., Student visa application, University selection"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Detailed Description
                </label>
                <Textarea
                  rows={4}
                  value={sessionDetails.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Provide more details about what you'd like to discuss..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Urgency Level
                </label>
                <select
                  value={sessionDetails.urgency}
                  onChange={(e) => handleInputChange('urgency', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="low">Low - General consultation</option>
                  <option value="normal">Normal - Need guidance soon</option>
                  <option value="high">High - Urgent assistance needed</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation & Payment */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                Confirm Booking
              </h3>

              {/* Booking Summary */}
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Counselor:</span>
                      <span className="font-medium">{counselor.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Session Type:</span>
                      <span className="font-medium">{currentSessionType.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date & Time:</span>
                      <span className="font-medium">
                        {new Date(selectedDate).toLocaleDateString('en-AU', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })} at {timeSlots.find(slot => slot.time === selectedTime)?.display}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{sessionDetails.duration} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Topic:</span>
                      <span className="font-medium">{sessionDetails.topic}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span className="text-purple-600">${calculateTotal()} AUD</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-blue-800">Payment Information</span>
                </div>
                <p className="text-sm text-blue-700">
                  Payment will be processed securely after the session is completed. 
                  You will only be charged for the actual consultation time used.
                </p>
              </div>

              {/* Terms and Conditions */}
              <div className="text-xs text-gray-500">
                <p>
                  By booking this session, you agree to our terms of service and cancellation policy. 
                  Sessions can be cancelled up to 24 hours before the scheduled time for a full refund.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <div>
              {currentStep > 1 && (
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
              )}
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              
              {currentStep < 3 ? (
                <Button 
                  onClick={nextStep}
                  disabled={currentStep === 1 ? !canProceedStep1 : !canProceedStep2}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleBooking}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Confirm Booking
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

