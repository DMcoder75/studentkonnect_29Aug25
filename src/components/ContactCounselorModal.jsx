import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  X,
  MessageCircle,
  Video,
  Phone,
  Mail,
  Calendar,
  Clock,
  User,
  Send
} from 'lucide-react'

export default function ContactCounselorModal({ counselor, isOpen, onClose }) {
  const [contactMethod, setContactMethod] = useState('message')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredTime: '',
    urgency: 'normal'
  })

  if (!isOpen || !counselor) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the contact request to your backend
    console.log('Contact request:', { counselor: counselor.id, method: contactMethod, ...formData })
    
    // Show success message and close modal
    alert(`Your ${contactMethod} request has been sent to ${counselor.name}. They will respond within ${counselor.responseTime} hours.`)
    onClose()
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const contactMethods = [
    {
      id: 'message',
      name: 'Send Message',
      icon: MessageCircle,
      description: 'Send a direct message',
      responseTime: counselor.responseTime + 'h'
    },
    {
      id: 'video',
      name: 'Video Call',
      icon: Video,
      description: 'Schedule a video consultation',
      responseTime: '24h'
    },
    {
      id: 'phone',
      name: 'Phone Call',
      icon: Phone,
      description: 'Schedule a phone consultation',
      responseTime: '24h'
    },
    {
      id: 'email',
      name: 'Email',
      icon: Mail,
      description: 'Send a detailed email',
      responseTime: counselor.responseTime + 'h'
    }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Contact {counselor.name}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{counselor.title}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Counselor Quick Info */}
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <img 
              src={counselor.profileImage} 
              alt={counselor.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{counselor.name}</h3>
              <p className="text-sm text-gray-600">{counselor.location}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {counselor.responseTime}h response
                </Badge>
                <Badge variant="outline" className="text-xs">
                  ${counselor.hourlyRate}/{counselor.currency}
                </Badge>
              </div>
            </div>
          </div>

          {/* Contact Method Selection */}
          <div>
            <h4 className="font-medium mb-3">How would you like to connect?</h4>
            <div className="grid grid-cols-2 gap-3">
              {contactMethods.map((method) => {
                const Icon = method.icon
                return (
                  <button
                    key={method.id}
                    onClick={() => setContactMethod(method.id)}
                    className={`p-3 border rounded-lg text-left transition-colors ${
                      contactMethod === method.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon className="h-4 w-4" />
                      <span className="font-medium text-sm">{method.name}</span>
                    </div>
                    <p className="text-xs text-gray-600">{method.description}</p>
                    <p className="text-xs text-purple-600 mt-1">~{method.responseTime}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name *
                </label>
                <Input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
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
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Phone (for calls) */}
            {(contactMethod === 'phone' || contactMethod === 'video') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <Input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+61 xxx xxx xxx"
                />
              </div>
            )}

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <Input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                placeholder="Brief description of what you need help with"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {contactMethod === 'message' || contactMethod === 'email' ? 'Message' : 'Additional Details'} *
              </label>
              <Textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder={
                  contactMethod === 'message' || contactMethod === 'email'
                    ? "Describe your situation and what kind of help you're looking for..."
                    : "Any additional information for the consultation..."
                }
              />
            </div>

            {/* Preferred Time (for calls) */}
            {(contactMethod === 'phone' || contactMethod === 'video') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time
                </label>
                <Input
                  type="text"
                  value={formData.preferredTime}
                  onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                  placeholder="e.g., Weekdays 2-4 PM AEST, or specific date/time"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Available: {counselor.availableSlots.join(', ')} ({counselor.timezone})
                </p>
              </div>
            )}

            {/* Urgency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Urgency Level
              </label>
              <select
                value={formData.urgency}
                onChange={(e) => handleInputChange('urgency', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="low">Low - General inquiry</option>
                <option value="normal">Normal - Need help soon</option>
                <option value="high">High - Urgent assistance needed</option>
              </select>
            </div>

            {/* Estimated Cost */}
            {(contactMethod === 'phone' || contactMethod === 'video') && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-blue-800">Consultation Rate</span>
                </div>
                <p className="text-sm text-blue-700 mt-1">
                  ${counselor.hourlyRate} {counselor.currency}/hour - You'll be charged only for the actual consultation time
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                disabled={!counselor.isAvailable}
              >
                <Send className="h-4 w-4 mr-2" />
                Send {contactMethod === 'message' ? 'Message' : contactMethod === 'email' ? 'Email' : 'Request'}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-gray-500 text-center">
              By submitting this form, you agree to our terms of service and privacy policy. 
              {counselor.name} will respond within {counselor.responseTime} hours during business days.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

