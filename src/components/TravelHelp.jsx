import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Plane,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Star,
  CheckCircle2,
  Users,
  Shield,
  Phone,
  MessageCircle,
  ArrowRight,
  Search,
  Filter,
  Globe,
  Luggage,
  CreditCard,
  AlertCircle
} from 'lucide-react'
import Sidebar from './Sidebar'

export default function TravelHelp({ isMobileMenuOpen, onMobileMenuClose }) {
  const [selectedService, setSelectedService] = useState(null)
  const [bookingForm, setBookingForm] = useState({
    departure: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    travelClass: 'economy',
    specialRequests: ''
  })
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const travelServices = [
    {
      id: 1,
      title: 'Flight Booking',
      description: 'Best deals on international flights with student discounts',
      icon: Plane,
      features: ['Student discounts up to 25%', 'Flexible booking options', '24/7 support', 'Free date changes'],
      rating: 4.8,
      reviews: 2847,
      startingPrice: 899,
      currency: 'AUD',
      popular: true
    },
    {
      id: 2,
      title: 'Visa Assistance',
      description: 'Complete visa application support and documentation',
      icon: Shield,
      features: ['Document preparation', 'Application tracking', 'Interview prep', 'Success guarantee'],
      rating: 4.9,
      reviews: 1923,
      startingPrice: 299,
      currency: 'AUD',
      popular: false
    },
    {
      id: 3,
      title: 'Travel Insurance',
      description: 'Comprehensive coverage for international students',
      icon: Shield,
      features: ['Medical coverage', 'Trip cancellation', 'Baggage protection', 'Emergency assistance'],
      rating: 4.7,
      reviews: 1456,
      startingPrice: 89,
      currency: 'AUD',
      popular: false
    },
    {
      id: 4,
      title: 'Airport Transfers',
      description: 'Safe and reliable transportation to/from airports',
      icon: MapPin,
      features: ['Meet & greet service', 'Luggage assistance', 'Real-time tracking', 'Student rates'],
      rating: 4.6,
      reviews: 892,
      startingPrice: 45,
      currency: 'AUD',
      popular: false
    }
  ]

  const recentBookings = [
    {
      id: 1,
      student: 'Priya Sharma',
      service: 'Flight Booking',
      route: 'Delhi → Sydney',
      date: '2024-02-15',
      status: 'confirmed',
      amount: 1299
    },
    {
      id: 2,
      student: 'Rahul Patel',
      service: 'Visa Assistance',
      country: 'Australia',
      date: '2024-02-10',
      status: 'processing',
      amount: 299
    },
    {
      id: 3,
      student: 'Ananya Singh',
      service: 'Travel Insurance',
      coverage: 'Comprehensive',
      date: '2024-02-08',
      status: 'active',
      amount: 129
    }
  ]

  const handleServiceSelect = (service) => {
    setSelectedService(service)
    setIsBookingModalOpen(true)
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    // In real implementation, this would integrate with outsourced travel service API
    alert('Booking request submitted! Our travel specialists will contact you within 2 hours.')
    setIsBookingModalOpen(false)
    setSelectedService(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'active':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-12 w-full">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <Plane className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Travel Help
              </h1>
            </div>
            <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
              Complete travel solutions for your study abroad journey
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
              {/* Header */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Travel Services</h2>
                  <p className="text-gray-600 mt-1">
                    Comprehensive travel assistance for students
                  </p>
                </div>
        
        <div className="flex gap-3">
          <Button variant="outline">
            <Phone className="h-4 w-4 mr-2" />
            Emergency Support
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat with Expert
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Students Helped</p>
                <p className="text-2xl font-bold text-gray-900">15,847</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Savings</p>
                <p className="text-2xl font-bold text-gray-900">$485</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">98.5%</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Response Time</p>
                  <p className="text-2xl font-bold text-gray-900">&lt; 2hrs</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Travel Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Travel Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {travelServices.map((service) => {
              const IconComponent = service.icon
              return (
                <Card key={service.id} className="relative hover:shadow-lg transition-shadow">
                  {service.popular && (
                    <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      Most Popular
                    </Badge>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{service.title}</h3>
                          <p className="text-sm text-gray-600">{service.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium ml-1">{service.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">({service.reviews} reviews)</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Starting from</p>
                        <p className="text-lg font-bold text-gray-900">
                          ${service.startingPrice} {service.currency}
                        </p>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      onClick={() => handleServiceSelect(service)}
                    >
                      Get Started
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Student Bookings</CardTitle>
          <Button variant="outline" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">127</div>
              <div className="text-sm text-gray-600">This Week</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">98.5%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">$485</div>
              <div className="text-sm text-gray-600">Avg. Savings</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">24</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <Plane className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <div className="font-semibold text-gray-900">Flight Bookings</div>
                <div className="text-sm text-gray-600">89 bookings this week</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <Shield className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <div className="font-semibold text-gray-900">Visa Assistance</div>
                <div className="text-sm text-gray-600">23 applications processed</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <Luggage className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <div className="font-semibold text-gray-900">Travel Insurance</div>
                <div className="text-sm text-gray-600">15 policies activated</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Modal */}
      {isBookingModalOpen && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Book {selectedService.title}</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsBookingModalOpen(false)}
                >
                  ×
                </Button>
              </div>
              
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {selectedService.title === 'Flight Booking' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Departure City
                        </label>
                        <Input
                          placeholder="e.g., Delhi"
                          value={bookingForm.departure}
                          onChange={(e) => setBookingForm({...bookingForm, departure: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Destination
                        </label>
                        <Input
                          placeholder="e.g., Sydney"
                          value={bookingForm.destination}
                          onChange={(e) => setBookingForm({...bookingForm, destination: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Departure Date
                        </label>
                        <Input
                          type="date"
                          value={bookingForm.departureDate}
                          onChange={(e) => setBookingForm({...bookingForm, departureDate: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Return Date
                        </label>
                        <Input
                          type="date"
                          value={bookingForm.returnDate}
                          onChange={(e) => setBookingForm({...bookingForm, returnDate: e.target.value})}
                        />
                      </div>
                    </div>
                  </>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requests
                  </label>
                  <Textarea
                    placeholder="Any special requirements or preferences..."
                    value={bookingForm.specialRequests}
                    onChange={(e) => setBookingForm({...bookingForm, specialRequests: e.target.value})}
                    rows={3}
                  />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">What happens next?</p>
                      <p className="text-sm text-blue-700">
                        Our travel specialists will review your request and contact you within 2 hours with personalized options and pricing.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setIsBookingModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Submit Request
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

