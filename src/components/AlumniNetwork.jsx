import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  GraduationCap,
  Users,
  MapPin,
  Calendar,
  Briefcase,
  Award,
  Heart,
  MessageCircle,
  Share,
  Plus,
  Search,
  Filter,
  TrendingUp,
  Star,
  Building,
  Globe,
  Camera,
  Upload,
  Edit,
  CheckCircle2,
  Clock,
  Target,
  Zap,
  BookOpen,
  Coffee
} from 'lucide-react'
import Sidebar from './Sidebar'

export default function AlumniNetwork({ isMobileMenuOpen, onMobileMenuClose }) {
  const [selectedAlumni, setSelectedAlumni] = useState(null)
  const [updateForm, setUpdateForm] = useState({
    title: '',
    content: '',
    category: '',
    image: null
  })
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('feed')

  const alumniStats = {
    totalAlumni: 8947,
    universities: 156,
    countries: 23,
    successStories: 2341
  }

  const universityGroups = [
    {
      id: 1,
      name: 'University of Sydney',
      location: 'Sydney, Australia',
      members: 1247,
      recentPosts: 45,
      image: 'USYD',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 2,
      name: 'University of Melbourne',
      location: 'Melbourne, Australia',
      members: 1089,
      recentPosts: 38,
      image: 'UMEL',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: 3,
      name: 'RMIT University',
      location: 'Melbourne, Australia',
      members: 756,
      recentPosts: 29,
      image: 'RMIT',
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 4,
      name: 'University of Queensland',
      location: 'Brisbane, Australia',
      members: 634,
      recentPosts: 22,
      image: 'UQ',
      color: 'bg-orange-100 text-orange-800'
    }
  ]

  const alumniUpdates = [
    {
      id: 1,
      author: 'Priya Sharma',
      authorAvatar: 'PS',
      university: 'University of Sydney',
      course: 'Computer Science',
      graduationYear: '2023',
      currentRole: 'Software Engineer at Google',
      location: 'Sydney, Australia',
      updateType: 'career',
      title: 'Just got promoted to Senior Software Engineer! 🎉',
      content: 'Excited to share that I\'ve been promoted to Senior Software Engineer at Google Sydney! The journey from being an international student to this role has been incredible. Special thanks to the StudentKonnect community for all the support during my university days.',
      image: null,
      likes: 156,
      comments: 23,
      shares: 12,
      timeAgo: '2 hours ago',
      tags: ['Career', 'Google', 'Promotion']
    },
    {
      id: 2,
      author: 'Rahul Patel',
      authorAvatar: 'RP',
      university: 'University of Melbourne',
      course: 'Business Analytics',
      graduationYear: '2022',
      currentRole: 'Data Scientist at Commonwealth Bank',
      location: 'Melbourne, Australia',
      updateType: 'achievement',
      title: 'Completed my first marathon in Melbourne! 🏃‍♂️',
      content: 'Just finished the Melbourne Marathon! It was challenging but so rewarding. Training for this while working full-time taught me so much about time management and perseverance.',
      image: '/api/placeholder/400/300',
      likes: 89,
      comments: 15,
      shares: 8,
      timeAgo: '1 day ago',
      tags: ['Marathon', 'Fitness', 'Achievement']
    },
    {
      id: 3,
      author: 'Ananya Singh',
      authorAvatar: 'AS',
      university: 'RMIT University',
      course: 'Graphic Design',
      graduationYear: '2023',
      currentRole: 'UX Designer at Canva',
      location: 'Sydney, Australia',
      updateType: 'project',
      title: 'My design featured in Canva\'s global campaign! ✨',
      content: 'Thrilled to share that my design work is now part of Canva\'s global marketing campaign! It\'s surreal to see my work being used by millions of users worldwide.',
      image: '/api/placeholder/400/300',
      likes: 234,
      comments: 45,
      shares: 67,
      timeAgo: '3 days ago',
      tags: ['Design', 'Canva', 'Campaign']
    },
    {
      id: 4,
      author: 'Vikram Gupta',
      authorAvatar: 'VG',
      university: 'University of Queensland',
      course: 'Engineering',
      graduationYear: '2021',
      currentRole: 'Startup Founder',
      location: 'Brisbane, Australia',
      updateType: 'milestone',
      title: 'Our startup just raised $2M in Series A funding! 🚀',
      content: 'Incredible milestone for our team! We\'ve successfully raised $2M in Series A funding for our EdTech startup. The journey from being a student to an entrepreneur has been amazing.',
      image: null,
      likes: 312,
      comments: 78,
      shares: 45,
      timeAgo: '1 week ago',
      tags: ['Startup', 'Funding', 'Entrepreneur']
    }
  ]

  const featuredAlumni = [
    {
      id: 1,
      name: 'Priya Sharma',
      avatar: 'PS',
      university: 'University of Sydney',
      course: 'Computer Science',
      graduationYear: '2023',
      currentRole: 'Senior Software Engineer',
      company: 'Google',
      location: 'Sydney, Australia',
      achievements: ['Promoted twice in 1 year', 'Led 3 major projects', 'Mentored 5 junior developers'],
      expertise: ['React', 'Node.js', 'Cloud Computing'],
      mentoring: true,
      connections: 456
    },
    {
      id: 2,
      name: 'Rahul Patel',
      avatar: 'RP',
      university: 'University of Melbourne',
      course: 'Business Analytics',
      graduationYear: '2022',
      currentRole: 'Senior Data Scientist',
      company: 'Commonwealth Bank',
      location: 'Melbourne, Australia',
      achievements: ['Published 3 research papers', 'Built ML models saving $2M', 'Speaker at 5 conferences'],
      expertise: ['Machine Learning', 'Python', 'Data Visualization'],
      mentoring: true,
      connections: 389
    },
    {
      id: 3,
      name: 'Ananya Singh',
      avatar: 'AS',
      university: 'RMIT University',
      course: 'Graphic Design',
      graduationYear: '2023',
      currentRole: 'Senior UX Designer',
      company: 'Canva',
      location: 'Sydney, Australia',
      achievements: ['Designed for 50M+ users', 'Won 2 design awards', 'Featured in Design Week'],
      expertise: ['UI/UX Design', 'Figma', 'User Research'],
      mentoring: true,
      connections: 234
    }
  ]

  const handleUpdateSubmit = (e) => {
    e.preventDefault()
    // In real implementation, this would save to database
    alert('Update posted successfully!')
    setIsUpdateModalOpen(false)
    setUpdateForm({ title: '', content: '', category: '', image: null })
  }

  const getUpdateIcon = (type) => {
    switch (type) {
      case 'career':
        return <Briefcase className="h-4 w-4" />
      case 'achievement':
        return <Award className="h-4 w-4" />
      case 'project':
        return <Target className="h-4 w-4" />
      case 'milestone':
        return <Zap className="h-4 w-4" />
      default:
        return <Star className="h-4 w-4" />
    }
  }

  const getUpdateColor = (type) => {
    switch (type) {
      case 'career':
        return 'bg-blue-100 text-blue-800'
      case 'achievement':
        return 'bg-green-100 text-green-800'
      case 'project':
        return 'bg-purple-100 text-purple-800'
      case 'milestone':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-12 w-full">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <GraduationCap className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Alumni Network
              </h1>
            </div>
            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
              Stay connected with fellow graduates and share your journey
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
                  <h2 className="text-2xl font-bold text-gray-900">Connect & Share</h2>
                  <p className="text-gray-600 mt-1">
                    Discover success stories and build meaningful connections
                  </p>
                </div>
        
        <div className="flex gap-3">
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Find Alumni
          </Button>
          <Button 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={() => setIsUpdateModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Share Update
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Alumni</p>
                <p className="text-2xl font-bold text-gray-900">{alumniStats.totalAlumni.toLocaleString()}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Universities</p>
                <p className="text-2xl font-bold text-gray-900">{alumniStats.universities}</p>
              </div>
              <Building className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Countries</p>
                <p className="text-2xl font-bold text-gray-900">{alumniStats.countries}</p>
              </div>
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Stories</p>
                <p className="text-2xl font-bold text-gray-900">{alumniStats.successStories.toLocaleString()}</p>
              </div>
              <Star className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('feed')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'feed'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Alumni Feed
          </button>
          <button
            onClick={() => setActiveTab('universities')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'universities'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            University Groups
          </button>
          <button
            onClick={() => setActiveTab('featured')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'featured'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Featured Alumni
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'feed' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {alumniUpdates.map((update) => (
                <Card key={update.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {update.authorAvatar}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{update.author}</h3>
                          <Badge className={getUpdateColor(update.updateType)}>
                            {getUpdateIcon(update.updateType)}
                            <span className="ml-1 capitalize">{update.updateType}</span>
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-3">
                          <p>{update.currentRole}</p>
                          <p>{update.university} • {update.course} • Class of {update.graduationYear}</p>
                          <p className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {update.location}
                          </p>
                        </div>
                        
                        <h4 className="font-semibold text-gray-900 mb-2">{update.title}</h4>
                        <p className="text-gray-700 mb-3">{update.content}</p>
                        
                        {update.image && (
                          <div className="mb-3">
                            <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                              <Camera className="h-12 w-12 text-gray-400" />
                            </div>
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {update.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{update.timeAgo}</span>
                          
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-1 hover:text-purple-600">
                              <Heart className="h-4 w-4" />
                              <span>{update.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-purple-600">
                              <MessageCircle className="h-4 w-4" />
                              <span>{update.comments}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-purple-600">
                              <Share className="h-4 w-4" />
                              <span>{update.shares}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Trending Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">#CareerGrowth</span>
                    <Badge variant="outline">234 posts</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">#TechJobs</span>
                    <Badge variant="outline">189 posts</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">#Startups</span>
                    <Badge variant="outline">156 posts</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">#Mentorship</span>
                    <Badge variant="outline">123 posts</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Coffee className="h-4 w-4 mr-2" />
                    Find Mentors
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Join Groups
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Share Knowledge
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Attend Events
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'universities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {universityGroups.map((group) => (
            <Card key={group.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${group.color} font-bold text-lg`}>
                    {group.image}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{group.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{group.location}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Members</span>
                      <span className="font-medium">{group.members.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Recent Posts</span>
                      <span className="font-medium">{group.recentPosts}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Join Group
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'featured' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredAlumni.map((alumni) => (
            <Card key={alumni.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                    {alumni.avatar}
                  </div>
                  <h3 className="font-semibold text-gray-900">{alumni.name}</h3>
                  <p className="text-sm text-gray-600">{alumni.currentRole}</p>
                  <p className="text-sm font-medium text-purple-600">{alumni.company}</p>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="text-sm">
                    <p className="text-gray-600">University: <span className="font-medium">{alumni.university}</span></p>
                    <p className="text-gray-600">Course: <span className="font-medium">{alumni.course}</span></p>
                    <p className="text-gray-600">Graduated: <span className="font-medium">{alumni.graduationYear}</span></p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Key Achievements:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {alumni.achievements.slice(0, 2).map((achievement, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle2 className="h-3 w-3 text-green-500 mr-1" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {alumni.expertise.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Connect
                  </Button>
                  {alumni.mentoring && (
                    <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" size="sm">
                      <Coffee className="h-4 w-4 mr-1" />
                      Mentor Me
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Share Update Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Share Your Update</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsUpdateModalOpen(false)}
                >
                  ×
                </Button>
              </div>
              
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Update Type
                  </label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={updateForm.category}
                    onChange={(e) => setUpdateForm({...updateForm, category: e.target.value})}
                    required
                  >
                    <option value="">Select update type</option>
                    <option value="career">Career Update</option>
                    <option value="achievement">Achievement</option>
                    <option value="project">Project</option>
                    <option value="milestone">Milestone</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <Input
                    placeholder="What's your exciting news?"
                    value={updateForm.title}
                    onChange={(e) => setUpdateForm({...updateForm, title: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Details
                  </label>
                  <Textarea
                    placeholder="Share more details about your update..."
                    value={updateForm.content}
                    onChange={(e) => setUpdateForm({...updateForm, content: e.target.value})}
                    rows={4}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Add Photo (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setIsUpdateModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Share Update
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

