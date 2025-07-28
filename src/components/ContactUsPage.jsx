import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react'
import Sidebar from './Sidebar'

export default function ContactUsPage({ isMobileMenuOpen, onMobileMenuClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full-width hero header */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-6 py-16 text-center">
          <div className="flex items-center justify-center mb-4">
            <MessageSquare className="h-12 w-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
          </div>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Get in touch with our team - we're here to help with your educational journey
          </p>
        </div>
      </div>

      {/* Main layout with sidebar */}
      <div className="flex">
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen} 
          onMobileMenuClose={onMobileMenuClose} 
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Contact Information Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Phone className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                  <p className="text-gray-600 mb-2">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-blue-600 font-medium text-lg">1800 UNI PATH</p>
                  <p className="text-gray-500 text-sm">(1800 864 7284)</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Mail className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-gray-600 mb-2">We typically respond within 24 hours</p>
                  <a href="mailto:contact@yourunipathway.com" className="text-purple-600 font-medium text-lg hover:text-purple-800 underline">
                    contact@yourunipathway.com
                  </a>
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="bg-pink-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-pink-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
                  <p className="text-gray-600 mb-2">Our office location</p>
                  <p className="text-pink-600 font-medium">Melbourne, Victoria</p>
                  <p className="text-gray-500 text-sm">Australia</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Contact Form */}
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 mr-3">
                      <Send className="h-4 w-4 mr-1" />
                      1
                    </Badge>
                    <CardTitle className="text-2xl font-bold text-gray-900">Send us a Message</CardTitle>
                  </div>
                  <p className="text-gray-600">
                    Have a question or need assistance? Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                          required
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What is your message about?"
                        required
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please provide details about your inquiry..."
                        required
                        rows={6}
                        className="w-full resize-none"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-200"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Office Information & Map */}
              <div className="space-y-6">
                
                {/* Office Hours */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800 mr-3">
                        <Clock className="h-4 w-4 mr-1" />
                        2
                      </Badge>
                      <CardTitle className="text-2xl font-bold text-gray-900">Office Hours</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Monday - Friday</span>
                        <span className="text-gray-600">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Saturday</span>
                        <span className="text-gray-600">10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="font-medium text-gray-700">Sunday</span>
                        <span className="text-gray-600">Closed</span>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> During peak periods (November - February), our hours may be extended to better serve students and families.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Google Map */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Badge variant="secondary" className="bg-pink-100 text-pink-800 mr-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        3
                      </Badge>
                      <CardTitle className="text-2xl font-bold text-gray-900">Our Location</CardTitle>
                    </div>
                    <p className="text-gray-600">
                      Located in the heart of Melbourne, we're easily accessible by public transport.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                        <p className="text-gray-700">
                          YourUniPathway.com<br />
                          Melbourne CBD<br />
                          Melbourne, Victoria 3000<br />
                          Australia
                        </p>
                      </div>
                      
                      {/* Embedded Google Map */}
                      <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093706!2d144.9537353153167!3d-37.81627997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1642678901234!5m2!1sen!2sus"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="YourUniPathway.com Office Location - Melbourne, Australia"
                        ></iframe>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">Getting Here</h4>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• 5 minutes walk from Flinders Street Station</li>
                          <li>• Multiple tram lines stop nearby</li>
                          <li>• Parking available in surrounding areas</li>
                          <li>• Accessible by wheelchair</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Additional Information */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">We're Here to Help</h3>
                  <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Whether you're a student exploring your options, a parent seeking guidance, or an educator looking for resources, 
                    our team is dedicated to providing you with the support and information you need. Don't hesitate to reach out 
                    with any questions about university pathways, course selection, or using our platform.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 mt-6">
                    <Badge variant="outline" className="px-4 py-2">Student Support</Badge>
                    <Badge variant="outline" className="px-4 py-2">Parent Guidance</Badge>
                    <Badge variant="outline" className="px-4 py-2">Educator Resources</Badge>
                    <Badge variant="outline" className="px-4 py-2">Technical Help</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </main>
      </div>
    </div>
  )
}

