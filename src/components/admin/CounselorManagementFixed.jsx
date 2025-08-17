import React, { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { counselorService } from '../../lib/supabase'
import { 
  Users,
  Star,
  TrendingUp,
  Clock,
  Search,
  Download,
  Eye,
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'

export default function CounselorManagementFixed() {
  const [counselors, setCounselors] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Fetch real counselors from database
  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        setLoading(true)
        console.log('Fetching counselors from Supabase...')
        const { data, error } = await counselorService.getAllCounselors()
        
        if (error) {
          console.error('Error fetching counselors:', error)
          return
        }
        
        console.log('Counselors fetched:', data)
        
        // Transform the data to match the expected format
        const transformedCounselors = data?.map(counselor => ({
          id: counselor.id,
          name: `${counselor.first_name || ''} ${counselor.last_name || ''}`.trim() || counselor.display_name || 'Unknown',
          email: counselor.email,
          phone: counselor.phone || 'N/A',
          specialization: counselor.specializations || [],
          experience: `${counselor.years_experience || 0} years`,
          rating: counselor.average_rating || 0,
          reviews: counselor.total_reviews || 0,
          students: counselor.total_students_helped || 0,
          successRate: `${counselor.success_rate || 0}%`,
          status: counselor.status || 'pending',
          joinDate: counselor.created_at ? new Date(counselor.created_at).toLocaleDateString() : 'N/A',
          languages: counselor.languages_spoken || []
        })) || []
        
        setCounselors(transformedCounselors)
      } catch (error) {
        console.error('Error in fetchCounselors:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCounselors()
  }, [])

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <AdminLayout 
      title="Counselor Management" 
      description="Manage counselor applications, profiles, and performance"
    >

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Counselors</p>
                    <p className="text-2xl font-bold text-gray-900">{counselors.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Counselors</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {counselors.filter(c => c.status === 'active').length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending Applications</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {counselors.filter(c => c.status === 'pending').length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Average Rating</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {(counselors.reduce((sum, c) => sum + c.rating, 0) / counselors.length).toFixed(1)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search counselors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <select 
                      value={statusFilter} 
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button>
                      Add Counselor
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Counselor List */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">All Counselors</h2>
                <div className="space-y-4">
                  {counselors.map((counselor) => (
                    <div key={counselor.id} className="border rounded-lg p-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                            <span className="text-indigo-600 font-semibold text-lg">
                              {counselor.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{counselor.name}</h3>
                            <p className="text-sm text-gray-600">{counselor.email}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-sm text-gray-500">
                                <Phone className="w-3 h-3 inline mr-1" />
                                {counselor.phone}
                              </span>
                              <span className="text-sm text-gray-500">
                                <Calendar className="w-3 h-3 inline mr-1" />
                                Joined {counselor.joinDate}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {counselor.specialization.map((spec, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {spec}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <p className="text-sm font-medium text-gray-900">Rating</p>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="ml-1 text-sm font-semibold">{counselor.rating}</span>
                              <span className="ml-1 text-xs text-gray-500">({counselor.reviews})</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium text-gray-900">Students</p>
                            <p className="text-lg font-semibold text-gray-900">{counselor.students}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium text-gray-900">Success Rate</p>
                            <p className="text-lg font-semibold text-green-600">{counselor.successRate}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium text-gray-900">Status</p>
                            {getStatusBadge(counselor.status)}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Mail className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
    </AdminLayout>
  )
}

