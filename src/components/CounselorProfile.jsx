import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import SessionBooking from './SessionBooking'
import { 
  ArrowLeft,
  Star,
  Clock,
  TrendingUp,
  Users,
  DollarSign,
  MapPin,
  Calendar,
  Languages,
  Award,
  CheckCircle2,
  MessageCircle,
  Video,
  Phone,
  BookOpen
} from 'lucide-react'
import Sidebar from './Sidebar'

export default function CounselorProfile({ isMobileMenuOpen, onMobileMenuClose }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [counselor, setCounselor] = useState(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [bookingType, setBookingType] = useState('video')

  // Enhanced counselor data (same as in directory)
  const counselors = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      title: 'Senior Migration Counselor',
      rank: 'Expert Level',
      location: 'Sydney, NSW',
      profileImage: '/api/placeholder/200/200',
      bio: 'Registered Migration Agent (MARN: 1578963) with 8+ years helping international students navigate Australian immigration.',
      
      // Professional Details
      experience: '8+ years',
      qualification: 'PhD in International Education, Master of Migration Law',
      languages: ['English', 'Mandarin', 'Cantonese'],
      
      // Performance Metrics
      credibilityScore: 96,
      averageRating: 4.9,
      totalReviews: 127,
      responseTime: 0.8,
      successRate: 94,
      studentsHelped: 450,
      
      // Areas of Expertise
      specializations: [
        'Student Visa Applications',
        'Post-Study Work Visas',
        'Permanent Residency Pathways',
        'Visa Compliance & Extensions'
      ],
      
      // Services Offered
      services: [
        'Visa Application Assistance',
        'Document Preparation',
        'Immigration Consultation',
        'Compliance Monitoring'
      ],
      
      // Availability & Pricing
      hourlyRate: 120,
      currency: 'AUD',
      availableSlots: ['Morning', 'Afternoon'],
      timezone: 'AEST',
      
      // Status
      isAvailable: true,
      isVerified: true,
      isPremium: true,
      
      // Achievements & Badges
      badges: ['Top Performer', 'Quick Responder', 'Student Favorite', 'Migration Expert'],
      achievements: [
        '94% visa approval rate',
        '450+ students successfully placed',
        'MARA Registered Agent'
      ],

      // Additional Profile Details
      aboutMe: `I am a dedicated migration agent with over 8 years of experience helping international students achieve their dreams of studying in Australia. My expertise spans across all aspects of student visas, from initial applications to post-study work opportunities and permanent residency pathways.

Having personally navigated the immigration process myself, I understand the challenges and complexities that international students face. My approach is personalized, thorough, and focused on achieving the best possible outcomes for each student.

I hold a PhD in International Education and a Master's degree in Migration Law, ensuring that I stay current with all immigration policies and procedures. As a registered MARA agent, I maintain the highest professional standards and ethical practices.`,

      education: [
        'PhD in International Education - University of Sydney (2015)',
        'Master of Migration Law - Australian National University (2012)',
        'Bachelor of Arts - Peking University (2010)'
      ],

      certifications: [
        'MARA Registered Migration Agent (MARN: 1578963)',
        'Graduate Certificate in Australian Migration Law',
        'Professional Development Program - Department of Home Affairs'
      ],

      testimonials: [
        {
          name: 'Raj Patel',
          rating: 5,
          comment: 'Dr. Chen helped me navigate the complex visa process with ease. Her expertise and attention to detail ensured my application was successful on the first try.',
          date: '2024-01-15'
        },
        {
          name: 'Maria Rodriguez',
          rating: 5,
          comment: 'Exceptional service! Dr. Chen not only helped with my student visa but also guided me through the post-study work visa process. Highly recommended!',
          date: '2024-02-20'
        }
      ]
    },
    {
      id: 2,
      name: 'Michael Thompson',
      title: 'University Admissions Specialist',
      rank: 'Senior Level',
      location: 'Melbourne, VIC',
      profileImage: '/api/placeholder/200/200',
      bio: 'Former university admissions officer with 12+ years experience in Australian higher education sector.',
      
      // Professional Details
      experience: '12+ years',
      qualification: 'Master of Education Administration, Bachelor of Arts',
      languages: ['English', 'French'],
      
      // Performance Metrics
      credibilityScore: 92,
      averageRating: 4.7,
      totalReviews: 89,
      responseTime: 1.2,
      successRate: 89,
      studentsHelped: 320,
      
      // Areas of Expertise
      specializations: [
        'University Applications',
        'Course Selection Guidance',
        'Scholarship Applications',
        'Academic Planning'
      ],
      
      // Services Offered
      services: [
        'University Application Review',
        'Personal Statement Writing',
        'Interview Preparation',
        'Academic Pathway Planning'
      ],
      
      // Availability & Pricing
      hourlyRate: 95,
      currency: 'AUD',
      availableSlots: ['Evening', 'Weekend'],
      timezone: 'AEST',
      
      // Status
      isAvailable: true,
      isVerified: true,
      isPremium: false,
      
      // Achievements & Badges
      badges: ['University Insider', 'Verified Expert', 'Scholarship Specialist'],
      achievements: [
        '89% admission success rate',
        '320+ students placed',
        'Former Admissions Officer'
      ],

      aboutMe: `With over 12 years of experience in Australian higher education, including 8 years as a university admissions officer, I bring insider knowledge and expertise to help students navigate the complex world of university applications.

My background in admissions gives me unique insights into what universities are looking for in applicants. I've reviewed thousands of applications and understand the nuances that can make the difference between acceptance and rejection.

I specialize in helping students identify the right programs, craft compelling personal statements, and present their best selves in applications. My approach is collaborative and supportive, ensuring students feel confident throughout the application process.`,

      education: [
        'Master of Education Administration - University of Melbourne (2010)',
        'Bachelor of Arts (Psychology) - Monash University (2008)'
      ],

      certifications: [
        'Certified Education Consultant',
        'Professional Development in Higher Education',
        'Advanced Scholarship Application Strategies'
      ],

      testimonials: [
        {
          name: 'Sarah Kim',
          rating: 5,
          comment: 'Michael\'s insider knowledge of university admissions was invaluable. He helped me get into my dream program at Melbourne University!',
          date: '2024-01-10'
        }
      ]
    }
    // Add other counselors as needed...
  ]

  useEffect(() => {
    const foundCounselor = counselors.find(c => c.id === parseInt(id))
    setCounselor(foundCounselor)
  }, [id])

  const getRankColor = (rank) => {
    switch (rank) {
      case 'Master Level':
        return { bg: 'bg-gradient-to-r from-purple-500 to-pink-500', text: 'text-white' }
      case 'Expert Level':
        return { bg: 'bg-gradient-to-r from-blue-500 to-cyan-500', text: 'text-white' }
      case 'Senior Level':
        return { bg: 'bg-gradient-to-r from-green-500 to-emerald-500', text: 'text-white' }
      case 'Professional Level':
        return { bg: 'bg-gradient-to-r from-orange-500 to-yellow-500', text: 'text-white' }
      default:
        return { bg: 'bg-gray-500', text: 'text-white' }
    }
  }

  const getCredibilityLevel = (score) => {
    if (score >= 95) return { level: 'Exceptional', color: 'text-purple-600', bg: 'bg-purple-100' }
    if (score >= 90) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' }
    if (score >= 85) return { level: 'Very Good', color: 'text-blue-600', bg: 'bg-blue-100' }
    return { level: 'Good', color: 'text-yellow-600', bg: 'bg-yellow-100' }
  }

  if (!counselor) {
    return (
      <div className="w-full">
        <div className="flex">
          <Sidebar 
            isOpen={true}
            onClose={() => {}}
            isHomepage={false}
            isMobileMenuOpen={isMobileMenuOpen}
            onMobileMenuClose={onMobileMenuClose}
          />
          <main className="flex-1 w-full md:w-auto transition-all duration-300">
            <div className="container mx-auto px-6 py-8">
              <Card className="text-center py-12">
                <CardContent>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Counselor not found</h3>
                  <p className="text-gray-600 mb-4">The counselor you're looking for doesn't exist.</p>
                  <Button onClick={() => navigate('/counselor/directory')}>
                    Back to Directory
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    )
  }

  const credibilityLevel = getCredibilityLevel(counselor.credibilityScore)
  const rankColor = getRankColor(counselor.rank)

  return (
    <div className="w-full">
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
          <div className="container mx-auto px-6 py-8">
            {/* Back Button */}
            <Button 
              variant="outline" 
              onClick={() => navigate('/counselor/directory')}
              className="mb-6 flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Directory
            </Button>

            {/* Profile Header */}
            <Card className="mb-8 shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
                  {/* Profile Image */}
                  <div className="relative">
                    <img 
                      src={counselor.profileImage} 
                      alt={counselor.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    {counselor.isVerified && (
                      <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                        <CheckCircle2 className="h-6 w-6 text-white" />
                      </div>
                    )}
                    {counselor.isPremium && (
                      <div className="absolute -top-2 -left-2 bg-yellow-500 rounded-full p-2">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Basic Info */}
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{counselor.name}</h1>
                    <p className="text-xl font-medium text-gray-700 mb-3">{counselor.title}</p>
                    
                    {/* Professional Rank */}
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${rankColor.bg} ${rankColor.text}`}>
                      {counselor.rank}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 mr-2" />
                        {counselor.location}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-5 w-5 mr-2" />
                        {counselor.experience}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Globe className="h-5 w-5 mr-2" />
                        {counselor.languages.join(', ')}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${credibilityLevel.bg} ${credibilityLevel.color}`}>
                        {credibilityLevel.level} ({counselor.credibilityScore}%)
                      </div>
                      {counselor.isAvailable ? (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          Available
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-red-100 text-red-800">
                          Busy
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Contact Actions */}
                  <div className="flex flex-col space-y-3">
                    <Button 
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                      disabled={!counselor.isAvailable}
                      onClick={() => {
                        setBookingType('message')
                        setIsBookingOpen(true)
                      }}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-purple-200 text-purple-700 hover:bg-purple-50"
                      disabled={!counselor.isAvailable}
                      onClick={() => {
                        setBookingType('video')
                        setIsBookingOpen(true)
                      }}
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Book Video Call
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-green-200 text-green-700 hover:bg-green-50"
                      disabled={!counselor.isAvailable}
                      onClick={() => {
                        setBookingType('phone')
                        setIsBookingOpen(true)
                      }}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Schedule Call
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="h-6 w-6 text-yellow-500 fill-current" />
                    <span className="ml-2 text-2xl font-bold">{counselor.averageRating}</span>
                  </div>
                  <p className="text-sm text-gray-600">{counselor.totalReviews} reviews</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-6 w-6 text-blue-500" />
                    <span className="ml-2 text-2xl font-bold">{counselor.responseTime}h</span>
                  </div>
                  <p className="text-sm text-gray-600">Response time</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                    <span className="ml-2 text-2xl font-bold">{counselor.successRate}%</span>
                  </div>
                  <p className="text-sm text-gray-600">Success rate</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-6 w-6 text-purple-500" />
                    <span className="ml-2 text-2xl font-bold">{counselor.studentsHelped}</span>
                  </div>
                  <p className="text-sm text-gray-600">Students helped</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <DollarSign className="h-6 w-6 text-orange-500" />
                    <span className="ml-2 text-2xl font-bold">${counselor.hourlyRate}</span>
                  </div>
                  <p className="text-sm text-gray-600">{counselor.currency}/hour</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - About & Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* About Me */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2" />
                      About Me
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {counselor.aboutMe}
                    </p>
                  </CardContent>
                </Card>

                {/* Specializations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Areas of Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {counselor.specializations.map((spec, index) => (
                        <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                          <CheckCircle2 className="h-5 w-5 text-blue-500 mr-3" />
                          <span className="text-gray-800">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Services */}
                <Card>
                  <CardHeader>
                    <CardTitle>Services Offered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {counselor.services.map((service, index) => (
                        <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                          <span className="text-gray-800">{service}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Testimonials */}
                {counselor.testimonials && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Student Testimonials</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {counselor.testimonials.map((testimonial, index) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center mb-2">
                              <div className="flex">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                                ))}
                              </div>
                              <span className="ml-2 font-medium text-gray-800">{testimonial.name}</span>
                              <span className="ml-auto text-sm text-gray-500">{testimonial.date}</span>
                            </div>
                            <p className="text-gray-700 italic">"{testimonial.comment}"</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Column - Quick Info */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-medium">{counselor.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Success Rate:</span>
                      <span className="font-medium text-green-600">{counselor.successRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Response Time:</span>
                      <span className="font-medium">{counselor.responseTime}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Students Helped:</span>
                      <span className="font-medium">{counselor.studentsHelped}+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hourly Rate:</span>
                      <span className="font-medium">${counselor.hourlyRate} {counselor.currency}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Availability */}
                <Card>
                  <CardHeader>
                    <CardTitle>Availability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-600">Time Slots:</span>
                        <div className="mt-1">
                          {counselor.availableSlots.map((slot, index) => (
                            <Badge key={index} variant="outline" className="mr-2 mb-1">
                              {slot}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Timezone:</span>
                        <span className="ml-2 font-medium">{counselor.timezone}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Professional Badges */}
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Badges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {counselor.badges.map((badge, index) => (
                        <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Key Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="h-5 w-5 mr-2" />
                      Key Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {counselor.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Education & Certifications */}
                {counselor.education && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Education</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {counselor.education.map((edu, index) => (
                          <div key={index} className="text-sm text-gray-700">
                            • {edu}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {counselor.certifications && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Certifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {counselor.certifications.map((cert, index) => (
                          <div key={index} className="text-sm text-gray-700">
                            • {cert}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Session Booking Modal */}
      <SessionBooking
        counselor={counselor}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        sessionType={bookingType}
      />
    </div>
  )
}

