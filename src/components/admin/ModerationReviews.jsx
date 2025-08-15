import React, { useState, useEffect } from 'react'
import { useAdminAuth } from '../../contexts/AdminAuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  Star,
  Search,
  Download,
  RefreshCw,
  Eye,
  Check,
  X,
  Flag,
  MessageSquare,
  User,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle
} from 'lucide-react'
import AdminLayout from './AdminLayout'

export default function ModerationReviews() {
  const { adminUser, hasPermission } = useAdminAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [ratingFilter, setRatingFilter] = useState('all')

  // Sample review data
  const [reviews, setReviews] = useState([
    {
      id: 1,
      reviewer: 'John Smith',
      reviewerEmail: 'john.smith@email.com',
      university: 'Harvard University',
      program: 'Computer Science',
      rating: 5,
      title: 'Excellent program with great faculty',
      content: 'The computer science program at Harvard exceeded my expectations. The faculty is world-class and the research opportunities are abundant. Highly recommend for anyone serious about CS.',
      status: 'pending',
      submittedDate: '2024-01-15',
      helpful: 12,
      reported: 0,
      verified: true,
      flags: []
    },
    {
      id: 2,
      reviewer: 'Sarah Johnson',
      reviewerEmail: 'sarah.j@email.com',
      university: 'University of Oxford',
      program: 'Medicine',
      rating: 4,
      title: 'Challenging but rewarding experience',
      content: 'The medical program is extremely rigorous but the clinical training is exceptional. The workload is intense but the support system is good.',
      status: 'approved',
      submittedDate: '2024-01-12',
      helpful: 8,
      reported: 1,
      verified: true,
      flags: ['language']
    },
    {
      id: 3,
      reviewer: 'Mike Chen',
      reviewerEmail: 'mike.chen@email.com',
      university: 'University of Toronto',
      program: 'Business Administration',
      rating: 2,
      title: 'Disappointing experience',
      content: 'The program was not what I expected. Poor organization and limited networking opportunities. Would not recommend.',
      status: 'flagged',
      submittedDate: '2024-01-10',
      helpful: 3,
      reported: 5,
      verified: false,
      flags: ['inappropriate', 'spam']
    },
    {
      id: 4,
      reviewer: 'Emma Wilson',
      reviewerEmail: 'emma.w@email.com',
      university: 'University of Melbourne',
      program: 'Engineering',
      rating: 5,
      title: 'Outstanding engineering program',
      content: 'World-class facilities and excellent industry connections. The practical approach to learning is fantastic. Great career prospects after graduation.',
      status: 'approved',
      submittedDate: '2024-01-08',
      helpful: 15,
      reported: 0,
      verified: true,
      flags: []
    },
    {
      id: 5,
      reviewer: 'David Park',
      reviewerEmail: 'david.park@email.com',
      university: 'ETH Zurich',
      program: 'Data Science',
      rating: 4,
      title: 'Great technical program',
      content: 'Excellent technical depth and research opportunities. The professors are leading experts in their fields. Highly competitive environment.',
      status: 'pending',
      submittedDate: '2024-01-05',
      helpful: 6,
      reported: 0,
      verified: true,
      flags: []
    },
    {
      id: 6,
      reviewer: 'Lisa Rodriguez',
      reviewerEmail: 'lisa.r@email.com',
      university: 'National University of Singapore',
      program: 'International Law',
      rating: 1,
      title: 'Terrible experience - avoid at all costs',
      content: 'This is the worst program ever. Complete waste of money and time. The professors are incompetent and the administration is horrible.',
      status: 'rejected',
      submittedDate: '2024-01-03',
      helpful: 0,
      reported: 8,
      verified: false,
      flags: ['inappropriate', 'spam', 'fake']
    }
  ])

  const [stats, setStats] = useState({
    totalReviews: 6,
    pendingReviews: 2,
    approvedReviews: 2,
    flaggedReviews: 2
  })

  const refreshData = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const filteredReviews = reviews.filter(review => 
    (review.reviewer.toLowerCase().includes(searchTerm.toLowerCase()) ||
     review.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
     review.program.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || review.status === statusFilter) &&
    (ratingFilter === 'all' || review.rating.toString() === ratingFilter)
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'flagged': return 'bg-red-100 text-red-800'
      case 'rejected': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const handleApprove = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, status: 'approved' } : review
    ))
  }

  const handleReject = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, status: 'rejected' } : review
    ))
  }

  const handleFlag = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, status: 'flagged' } : review
    ))
  }

  return (
    <AdminLayout 
      title="Review Moderation" 
      description="Moderate and manage user reviews and ratings"
    >
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button 
            onClick={refreshData} 
            disabled={isLoading}
            size="sm"
            variant="outline"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalReviews}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pendingReviews}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Eye className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-3xl font-bold text-gray-900">{stats.approvedReviews}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Check className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Flagged</p>
                <p className="text-3xl font-bold text-gray-900">{stats.flaggedReviews}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <Flag className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews Table */}
      <Card className="shadow-sm border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Reviews</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="flagged">Flagged</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredReviews.length > 0 ? (
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{review.reviewer}</span>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs">Verified</Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          {renderStars(review.rating)}
                        </div>
                        <Badge className={getStatusColor(review.status)}>
                          {review.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <span>{review.university} - {review.program}</span>
                        <span className="mx-2">•</span>
                        <span>{review.submittedDate}</span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-2">{review.title}</h3>
                      <p className="text-gray-700 mb-4">{review.content}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{review.helpful} helpful</span>
                        </div>
                        {review.reported > 0 && (
                          <div className="flex items-center space-x-1 text-red-600">
                            <Flag className="w-4 h-4" />
                            <span>{review.reported} reports</span>
                          </div>
                        )}
                        {review.flags.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                            <span>Flags: {review.flags.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {review.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleApprove(review.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleReject(review.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleFlag(review.id)}
                      >
                        <Flag className="w-4 h-4 mr-1" />
                        Flag
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Reviews Found</h3>
              <p className="text-gray-600">
                {isLoading ? 'Loading reviews...' : 'No reviews match your search criteria'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  )
}

