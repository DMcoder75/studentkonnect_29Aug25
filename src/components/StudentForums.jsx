import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  MessageSquare,
  Users,
  TrendingUp,
  Clock,
  Heart,
  MessageCircle,
  Search,
  Plus,
  Pin,
  Eye,
  ThumbsUp,
  Reply,
  Share,
  Flag,
  Filter,
  Hash,
  Globe,
  BookOpen,
  GraduationCap,
  MapPin,
  Calendar,
  Star,
  Award
} from 'lucide-react'
import Sidebar from './Sidebar'

export default function StudentForums({ isMobileMenuOpen, onMobileMenuClose }) {
  const [selectedForum, setSelectedForum] = useState(null)
  const [selectedPost, setSelectedPost] = useState(null)
  const [newPostForm, setNewPostForm] = useState({
    title: '',
    content: '',
    category: '',
    tags: ''
  })
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false)

  const forumCategories = [
    {
      id: 1,
      name: 'University Life',
      description: 'Campus experiences, academics, and student life',
      icon: GraduationCap,
      color: 'bg-blue-100 text-blue-800',
      posts: 1247,
      members: 3456,
      lastActivity: '2 min ago'
    },
    {
      id: 2,
      name: 'Visa & Immigration',
      description: 'Visa applications, documentation, and immigration help',
      icon: Globe,
      color: 'bg-green-100 text-green-800',
      posts: 892,
      members: 2134,
      lastActivity: '5 min ago'
    },
    {
      id: 3,
      name: 'Accommodation',
      description: 'Housing, roommates, and living arrangements',
      icon: MapPin,
      color: 'bg-purple-100 text-purple-800',
      posts: 634,
      members: 1876,
      lastActivity: '12 min ago'
    },
    {
      id: 4,
      name: 'Jobs & Internships',
      description: 'Career opportunities and work experiences',
      icon: BookOpen,
      color: 'bg-orange-100 text-orange-800',
      posts: 456,
      members: 1543,
      lastActivity: '18 min ago'
    },
    {
      id: 5,
      name: 'Social & Events',
      description: 'Meetups, events, and social activities',
      icon: Calendar,
      color: 'bg-pink-100 text-pink-800',
      posts: 789,
      members: 2987,
      lastActivity: '25 min ago'
    },
    {
      id: 6,
      name: 'Study Groups',
      description: 'Academic collaboration and study partnerships',
      icon: Users,
      color: 'bg-indigo-100 text-indigo-800',
      posts: 345,
      members: 1234,
      lastActivity: '1 hour ago'
    }
  ]

  const trendingPosts = [
    {
      id: 1,
      title: 'First week at University of Sydney - My experience!',
      author: 'Priya Sharma',
      authorAvatar: 'PS',
      category: 'University Life',
      content: 'Just completed my first week at USYD and wanted to share my experience with incoming students...',
      likes: 45,
      replies: 23,
      views: 234,
      timeAgo: '2 hours ago',
      tags: ['USYD', 'FirstWeek', 'Experience'],
      isPinned: false,
      isHot: true
    },
    {
      id: 2,
      title: 'Student visa approved in 3 weeks! Here\'s how I did it',
      author: 'Rahul Patel',
      authorAvatar: 'RP',
      category: 'Visa & Immigration',
      content: 'Finally got my student visa approved! Sharing the complete process and documents that helped...',
      likes: 78,
      replies: 34,
      views: 567,
      timeAgo: '4 hours ago',
      tags: ['StudentVisa', 'Australia', 'Success'],
      isPinned: true,
      isHot: true
    },
    {
      id: 3,
      title: 'Looking for roommate in Melbourne CBD - Female only',
      author: 'Ananya Singh',
      authorAvatar: 'AS',
      category: 'Accommodation',
      content: 'Hi everyone! I\'m looking for a female roommate to share a 2BR apartment in Melbourne CBD...',
      likes: 12,
      replies: 8,
      views: 89,
      timeAgo: '6 hours ago',
      tags: ['Melbourne', 'Roommate', 'CBD'],
      isPinned: false,
      isHot: false
    },
    {
      id: 4,
      title: 'Part-time job opportunities for international students',
      author: 'Vikram Gupta',
      authorAvatar: 'VG',
      category: 'Jobs & Internships',
      content: 'Compiled a list of part-time job opportunities that are friendly to international students...',
      likes: 56,
      replies: 19,
      views: 345,
      timeAgo: '8 hours ago',
      tags: ['PartTime', 'Jobs', 'International'],
      isPinned: false,
      isHot: true
    },
    {
      id: 5,
      title: 'Indian Students Meetup - Sydney this weekend!',
      author: 'Kavya Reddy',
      authorAvatar: 'KR',
      category: 'Social & Events',
      content: 'Organizing a meetup for Indian students in Sydney this weekend. Let\'s connect and have fun!',
      likes: 34,
      replies: 15,
      views: 156,
      timeAgo: '12 hours ago',
      tags: ['Meetup', 'Sydney', 'Indian'],
      isPinned: false,
      isHot: false
    }
  ]

  const activeMembers = [
    {
      id: 1,
      name: 'Priya Sharma',
      avatar: 'PS',
      university: 'University of Sydney',
      course: 'Computer Science',
      posts: 45,
      reputation: 234,
      badges: ['Top Contributor', 'Helpful']
    },
    {
      id: 2,
      name: 'Rahul Patel',
      avatar: 'RP',
      university: 'University of Melbourne',
      course: 'Business Analytics',
      posts: 67,
      reputation: 456,
      badges: ['Visa Expert', 'Community Helper']
    },
    {
      id: 3,
      name: 'Ananya Singh',
      avatar: 'AS',
      university: 'RMIT University',
      course: 'Design',
      posts: 23,
      reputation: 123,
      badges: ['Creative', 'Active Member']
    },
    {
      id: 4,
      name: 'Vikram Gupta',
      avatar: 'VG',
      university: 'University of Queensland',
      course: 'Engineering',
      posts: 89,
      reputation: 567,
      badges: ['Job Hunter', 'Mentor']
    }
  ]

  const handleForumSelect = (forum) => {
    setSelectedForum(forum)
  }

  const handlePostSelect = (post) => {
    setSelectedPost(post)
  }

  const handleNewPost = () => {
    setIsNewPostModalOpen(true)
  }

  const handlePostSubmit = (e) => {
    e.preventDefault()
    // In real implementation, this would save to database
    alert('Post created successfully!')
    setIsNewPostModalOpen(false)
    setNewPostForm({ title: '', content: '', category: '', tags: '' })
  }

  const formatTimeAgo = (timeAgo) => {
    return timeAgo
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-12 w-full">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <MessageSquare className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Student Forums
              </h1>
            </div>
            <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
              Connect with fellow students, share experiences, and get help from the community
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
                  <h2 className="text-2xl font-bold text-gray-900">Community Discussions</h2>
                  <p className="text-gray-600 mt-1">
                    Join conversations and share your experiences
                  </p>
                </div>
        
        <div className="flex gap-3">
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search Forums
          </Button>
          <Button 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={handleNewPost}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900">4,363</p>
              </div>
              <MessageSquare className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Members</p>
                <p className="text-2xl font-bold text-gray-900">13,230</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Posts</p>
                <p className="text-2xl font-bold text-gray-900">127</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Online Now</p>
                <p className="text-2xl font-bold text-gray-900">456</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Forum Categories */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Hash className="h-5 w-5 mr-2" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {forumCategories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <div 
                      key={category.id}
                      className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleForumSelect(category)}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${category.color}`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm">{category.name}</h4>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{category.description}</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{category.posts} posts</span>
                        <span>{category.members} members</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Last: {category.lastActivity}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Trending Discussions</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Hot
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingPosts.map((post) => (
                  <div 
                    key={post.id} 
                    className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handlePostSelect(post)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {post.authorAvatar}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          {post.isPinned && (
                            <Pin className="h-4 w-4 text-green-600" />
                          )}
                          {post.isHot && (
                            <Badge className="bg-red-100 text-red-800 text-xs">
                              🔥 Hot
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                        </div>
                        
                        <h3 className="font-semibold text-gray-900 mb-1 hover:text-purple-600">
                          {post.title}
                        </h3>
                        
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {post.content}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-2">
                          {post.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span>by {post.author}</span>
                            <span>{post.timeAgo}</span>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <ThumbsUp className="h-4 w-4" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="h-4 w-4" />
                              <span>{post.replies}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{post.views}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Active Members */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 mr-2" />
                Top Contributors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activeMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                      {member.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm">{member.name}</p>
                      <p className="text-xs text-gray-600">{member.university}</p>
                      <p className="text-xs text-gray-500">{member.posts} posts • {member.reputation} rep</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Ask a Question
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Find Study Group
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Join Event
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share className="h-4 w-4 mr-2" />
                  Share Experience
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* New Post Modal */}
      {isNewPostModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Create New Post</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsNewPostModalOpen(false)}
                >
                  ×
                </Button>
              </div>
              
              <form onSubmit={handlePostSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <Input
                    placeholder="What's your post about?"
                    value={newPostForm.title}
                    onChange={(e) => setNewPostForm({...newPostForm, title: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newPostForm.category}
                    onChange={(e) => setNewPostForm({...newPostForm, category: e.target.value})}
                    required
                  >
                    <option value="">Select a category</option>
                    {forumCategories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <Textarea
                    placeholder="Share your thoughts, experiences, or questions..."
                    value={newPostForm.content}
                    onChange={(e) => setNewPostForm({...newPostForm, content: e.target.value})}
                    rows={6}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (comma separated)
                  </label>
                  <Input
                    placeholder="e.g., visa, sydney, accommodation"
                    value={newPostForm.tags}
                    onChange={(e) => setNewPostForm({...newPostForm, tags: e.target.value})}
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setIsNewPostModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Create Post
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

