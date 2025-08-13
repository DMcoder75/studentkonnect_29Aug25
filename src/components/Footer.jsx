import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { GraduationCap, Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="bg-gray-900 text-white w-full">
      {/* Main Footer Content */}
      <div className="w-full max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand and Newsletter Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg p-2">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Your Uni Pathway</h3>
                  <p className="text-gray-400 text-sm">Find Your Perfect University Course</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Discover your ideal university course through personalized pathways. Connect your passions with career opportunities at Australia's top universities.
              </p>
            </div>
            
            {/* Newsletter Signup */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-3 flex items-center">
                <Mail className="h-5 w-5 mr-2 text-cyan-400" />
                Stay Updated
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                Get the latest updates on university courses, pathways, and career insights.
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
                <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 px-4 py-2 rounded-lg transition-all duration-200">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-cyan-400">Navigation</h4>
            <ul className="space-y-3">
              <li><button onClick={() => navigate('/')} className="text-gray-300 hover:text-white transition-colors duration-200 text-left">Home</button></li>
              <li><button onClick={() => navigate('/universities')} className="text-gray-300 hover:text-white transition-colors duration-200 text-left">Universities</button></li>
              <li><button onClick={() => navigate('/courses')} className="text-gray-300 hover:text-white transition-colors duration-200 text-left">Courses</button></li>
              <li><button onClick={() => navigate('/pathways')} className="text-gray-300 hover:text-white transition-colors duration-200 text-left">Career Pathways</button></li>
              <li><button onClick={() => navigate('/career-insights')} className="text-gray-300 hover:text-white transition-colors duration-200 text-left">Career Insights</button></li>
            </ul>
          </div>

          {/* Academic Tools */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-purple-400">Academic Tools</h4>
            <ul className="space-y-3">
              <li><button onClick={() => navigate('/atar-calculator')} className="text-gray-300 hover:text-white transition-colors duration-200 text-left">ATAR Calculator</button></li>
              <li><button onClick={() => navigate('/course-finder')} className="text-gray-300 hover:text-white transition-colors duration-200 text-left">Course Finder</button></li>
              <li><button className="text-gray-300 hover:text-white transition-colors duration-200 text-left">University Rankings</button></li>
              <li><button className="text-gray-300 hover:text-white transition-colors duration-200 text-left">Scholarship Search</button></li>
              <li><button className="text-gray-300 hover:text-white transition-colors duration-200 text-left">Study Planner</button></li>
            </ul>
          </div>

          {/* Support & Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-pink-400">Support & Info</h4>
            <ul className="space-y-3">
              <li><button onClick={() => navigate('/about-us')} className="text-gray-300 hover:text-white transition-colors duration-200 text-left">About Us</button></li>
              <li><button onClick={() => navigate('/contact-us')} className="text-gray-300 hover:text-white transition-colors duration-200 text-left">Contact Us</button></li>
              <li><button onClick={() => navigate('/faq')} className="text-gray-300 hover:text-white transition-colors duration-200 text-left">FAQ</button></li>
              <li><button onClick={() => navigate('/help-center')} className="text-gray-300 hover:text-white transition-colors duration-200 text-left">Help Center</button></li>
              <li><button onClick={() => navigate('/privacy-policy')} className="text-gray-300 hover:text-white transition-colors duration-200 text-left">Privacy Policy</button></li>
              <li><button onClick={() => navigate('/terms-of-service')} className="text-gray-300 hover:text-white transition-colors duration-200 text-left">Terms of Service</button></li>
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-600 rounded-full p-2">
                <Phone className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Call Us</p>
                <p className="text-white font-medium">1800 UNI PATH</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-cyan-600 rounded-full p-2">
                <Mail className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email Us</p>
                <p className="text-white font-medium">info@yourunipathway.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-pink-600 rounded-full p-2">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Visit Us</p>
                <p className="text-white font-medium">Sydney, Australia</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 bg-gray-950 w-full">
        <div className="w-full max-w-[1200px] mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © 2025 <span className="text-white font-medium">StudentKonnect</span>. All rights reserved.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center space-x-4">
              <p className="text-gray-400 text-sm mr-4">Follow Us:</p>
              <div className="flex space-x-3">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition-all duration-200 transform hover:scale-110"
                >
                  <Facebook className="h-4 w-4 text-white" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-blue-400 p-2 rounded-full transition-all duration-200 transform hover:scale-110"
                >
                  <Twitter className="h-4 w-4 text-white" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-pink-600 p-2 rounded-full transition-all duration-200 transform hover:scale-110"
                >
                  <Instagram className="h-4 w-4 text-white" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-blue-700 p-2 rounded-full transition-all duration-200 transform hover:scale-110"
                >
                  <Linkedin className="h-4 w-4 text-white" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-red-600 p-2 rounded-full transition-all duration-200 transform hover:scale-110"
                >
                  <Youtube className="h-4 w-4 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

