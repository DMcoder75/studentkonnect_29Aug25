import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Home,
  MapPin,
  Calendar,
  DollarSign,
  Star,
  Users,
  Wifi,
  Car,
  Shield,
  CheckCircle2,
  Heart,
  Search,
  Filter,
  Phone,
  MessageCircle,
  ArrowRight,
  Bed,
  Bath,
  ChefHat,
  Zap,
  AlertCircle,
  Clock
} from 'lucide-react'
import Sidebar from './Sidebar'

export default function AccommodationHelp({ isMobileMenuOpen, onMobileMenuClose }) {
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [searchForm, setSearchForm] = useState({
    city: '',
    university: '',
    moveInDate: '',
    duration: '12',
    budget: '500-800',
    roomType: 'shared',
    preferences: ''
  })
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false)

  const accommodationTypes = [
    {
      id: 1,
      title: 'Student Apartments',
      description: 'Modern furnished apartments near universities',
      icon: Home,
      features: ['Fully furnished', 'Utilities included', 'Study areas', 'Security'],
      priceRange: '$400-$800/week',
      availability: '95%',
      popular: true
    },
    {
      id: 2,
      title: 'Homestay',
      description: 'Live with local families for cultural immersion',
      icon: Heart,
      features: ['Meals included', 'Cultural experience', 'Language practice', 'Family support'],
      priceRange: '$300-$500/week',
      availability: '87%',
      popular: false
    },
    {
      id: 3,
      title: 'Shared Housing',
      description: 'Share with other international students',
      icon: Users,
      features: ['Cost effective', 'Social environment', 'Flexible terms', 'Peer support'],
      priceRange: '$250-$450/week',
      availability: '92%',
      popular: false
    },
    {
      id: 4,
      title: 'University Dorms',
      description: 'On-campus accommodation with campus life',
      icon: Bed,
      features: ['On-campus location', 'Meal plans available', 'Campus activities', 'Academic support'],
      priceRange: '$350-$600/week',
      availability: '78%',
      popular: false
    }
  ]

  const featuredProperties = [
    {
      id: 1,
      name: 'Sydney Student Residences',
      location: 'Ultimo, Sydney',
      university: 'University of Technology Sydney',
      distance: '5 min walk',
      price: 485,
      currency: 'AUD',
      period: 'week',
      rating: 4.7,
      reviews: 234,
      images: ['/api/placeholder/300/200'],
      features: ['Wifi', 'Gym', 'Study Room', 'Laundry'],
      roomTypes: ['Single', 'Twin Share', 'Studio'],
      available: true,
      verified: true
    },
    {
      id: 2,
      name: 'Melbourne Central Apartments',
      location: 'Carlton, Melbourne',
      university: 'University of Melbourne',
      distance: '10 min walk',
      price: 420,
      currency: 'AUD',
      period: 'week',
      rating: 4.5,
      reviews: 189,
      images: ['/api/placeholder/300/200'],
      features: ['Kitchen', 'Balcony', 'Security', 'Parking'],
      roomTypes: ['Single', 'Double', 'Ensuite'],
      available: true,
      verified: true
    },
    {
      id: 3,
      name: 'Brisbane Student Lodge',
      location: 'St Lucia, Brisbane',
      university: 'University of Queensland',
      distance: '3 min walk',
      price: 395,
      currency: 'AUD',
      period: 'week',
      rating: 4.8,
      reviews: 156,
      images: ['/api/placeholder/300/200'],
      features: ['Pool', 'BBQ Area', 'Study Hub', 'Bike Storage'],
      roomTypes: ['Single', 'Twin', 'Studio'],
      available: true,
      verified: true
    }
  ]

  const recentBookings = [
    {
      id: 1,
      student: 'Arjun Mehta',
      property: 'Sydney Student Residences',
      location: 'Sydney',
      moveIn: '2024-02-20',
      duration: '12 months',
      status: 'confirmed',
      amount: 485
    },
    {
      id: 2,
      student: 'Kavya Reddy',
      property: 'Melbourne Homestay',
      location: 'Melbourne',
      moveIn: '2024-03-01',
      duration: '6 months',
      status: 'processing',
      amount: 380
    },
    {
      id: 3,
      student: 'Rohit Kumar',
      property: 'Brisbane Shared House',
      location: 'Brisbane',
      moveIn: '2024-02-15',
      duration: '12 months',
      status: 'confirmed',
      amount: 320
    }
  ]

  const handlePropertyInquiry = (property) => {
    setSelectedProperty(property)
    setIsInquiryModalOpen(true)
  }

  const handleInquirySubmit = (e) => {
    e.preventDefault()
    // In real implementation, this would integrate with outsourced accommodation service API
    alert('Inquiry submitted! Our accommodation specialists will contact you within 4 hours with available options.')
    setIsInquiryModalOpen(false)
    setSelectedProperty(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'pending':
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
              <Home className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Accommodation Help
              </h1>
            </div>
            <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
              Find your perfect home away from home with our comprehensive accommodation services
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
                  <h2 className="text-2xl font-bold text-gray-900">Accommodation Services</h2>
                  <p className="text-gray-600 mt-1">
                    Comprehensive housing solutions for students
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
                <p className="text-sm text-gray-600">Properties Listed</p>
                <p className="text-2xl font-bold text-gray-900">8,450+</p>
              </div>
              <Home className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Students Housed</p>
                <p className="text-2xl font-bold text-gray-900">12,847</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.6★</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Response Time</p>
                  <p className="text-2xl font-bold text-gray-900">&lt; 4hrs</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accommodation Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Home className="h-5 w-5 mr-2" />
            Accommodation Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accommodationTypes.map((type) => {
              const IconComponent = type.icon
              return (
                <Card key={type.id} className="relative hover:shadow-lg transition-shadow">
                  {type.popular && (
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
                          <h3 className="font-semibold text-gray-900">{type.title}</h3>
                          <p className="text-sm text-gray-600">{type.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {type.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Price Range</p>
                        <p className="font-semibold text-gray-900">{type.priceRange}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Availability</p>
                        <p className="font-semibold text-green-600">{type.availability}</p>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      onClick={() => handlePropertyInquiry(type)}
                    >
                      Find Properties
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Featured Properties */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Featured Properties</CardTitle>
          <Button variant="outline" size="sm">View All Properties</Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-lg flex items-center justify-center">
                    <Home className="h-12 w-12 text-gray-400" />
                  </div>
                  {property.verified && (
                    <Badge className="absolute top-2 left-2 bg-green-600 text-white">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  {property.available && (
                    <Badge className="absolute top-2 right-2 bg-blue-600 text-white">
                      Available
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-gray-900 mb-1">{property.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Bed className="h-4 w-4 mr-1" />
                      {property.distance} to {property.university}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium ml-1">{property.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({property.reviews})</span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ${property.price}/{property.period}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {property.features.slice(0, 4).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    onClick={() => handlePropertyInquiry(property)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Student Bookings</CardTitle>
          <Button variant="outline" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {booking.student.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{booking.student}</p>
                    <p className="text-sm text-gray-600">
                      {booking.property} • {booking.location}
                    </p>
                    <p className="text-xs text-gray-500">
                      Move-in: {booking.moveIn} • {booking.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                  <p className="font-semibold text-gray-900">${booking.amount}/week</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Inquiry Modal */}
      {isInquiryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Accommodation Inquiry</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsInquiryModalOpen(false)}
                >
                  ×
                </Button>
              </div>
              
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <Input
                      placeholder="e.g., Sydney"
                      value={searchForm.city}
                      onChange={(e) => setSearchForm({...searchForm, city: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      University
                    </label>
                    <Input
                      placeholder="e.g., University of Sydney"
                      value={searchForm.university}
                      onChange={(e) => setSearchForm({...searchForm, university: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Move-in Date
                    </label>
                    <Input
                      type="date"
                      value={searchForm.moveInDate}
                      onChange={(e) => setSearchForm({...searchForm, moveInDate: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (months)
                    </label>
                    <Input
                      type="number"
                      placeholder="12"
                      value={searchForm.duration}
                      onChange={(e) => setSearchForm({...searchForm, duration: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget (per week)
                  </label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={searchForm.budget}
                    onChange={(e) => setSearchForm({...searchForm, budget: e.target.value})}
                  >
                    <option value="300-500">$300 - $500</option>
                    <option value="500-800">$500 - $800</option>
                    <option value="800-1200">$800 - $1200</option>
                    <option value="1200+">$1200+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferences
                  </label>
                  <Textarea
                    placeholder="Any specific requirements or preferences..."
                    value={searchForm.preferences}
                    onChange={(e) => setSearchForm({...searchForm, preferences: e.target.value})}
                    rows={3}
                  />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">What happens next?</p>
                      <p className="text-sm text-blue-700">
                        Our accommodation specialists will review your requirements and contact you within 4 hours with suitable property options.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setIsInquiryModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Submit Inquiry
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

