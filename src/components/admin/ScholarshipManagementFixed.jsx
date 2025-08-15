import { useState, useEffect } from 'react'
import AdminSidebar from '../AdminSidebar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { 
  Award,
  DollarSign,
  Users,
  TrendingUp,
  Search,
  Download,
  Eye,
  Edit,
  Plus,
  Calendar,
  MapPin,
  GraduationCap
} from 'lucide-react'

export default function ScholarshipManagementFixed() {
  const [scholarships, setScholarships] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Mock data for scholarships
  useEffect(() => {
    const mockScholarships = [
      {
        id: 1,
        name: 'Merit Excellence Scholarship',
        provider: 'University of Melbourne',
        amount: '$25,000',
        type: 'Merit-based',
        country: 'Australia',
        field: 'All Fields',
        deadline: '2024-12-31',
        applicants: 156,
        awarded: 25,
        status: 'active',
        description: 'Full tuition scholarship for outstanding academic performance'
      },
      {
        id: 2,
        name: 'International Student Grant',
        provider: 'University of Toronto',
        amount: '$15,000',
        type: 'Need-based',
        country: 'Canada',
        field: 'Engineering',
        deadline: '2024-11-30',
        applicants: 89,
        awarded: 15,
        status: 'active',
        description: 'Financial assistance for international engineering students'
      },
      {
        id: 3,
        name: 'Research Innovation Award',
        provider: 'Harvard University',
        amount: '$50,000',
        type: 'Research-based',
        country: 'USA',
        field: 'Science & Technology',
        deadline: '2024-10-15',
        applicants: 234,
        awarded: 10,
        status: 'closing_soon',
        description: 'Support for innovative research projects in STEM fields'
      }
    ]
    setScholarships(mockScholarships)
  }, [])

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'closing_soon':
        return <Badge className="bg-yellow-100 text-yellow-800">Closing Soon</Badge>
      case 'closed':
        return <Badge className="bg-red-100 text-red-800">Closed</Badge>
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Admin Sidebar */}
        <AdminSidebar />
        
        {/* Main Content */}
        <div className="flex-1 ml-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Scholarship Management</h1>
              <p className="mt-2 text-gray-600">Manage scholarship programs, applications, and awards</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Scholarships</p>
                    <p className="text-2xl font-bold text-gray-900">{scholarships.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Value</p>
                    <p className="text-2xl font-bold text-gray-900">$90,000</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Applicants</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {scholarships.reduce((sum, s) => sum + s.applicants, 0)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Awards Given</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {scholarships.reduce((sum, s) => sum + s.awarded, 0)}
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
                        placeholder="Search scholarships..."
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
                      <option value="closing_soon">Closing Soon</option>
                      <option value="closed">Closed</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Scholarship
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Scholarship List */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">All Scholarships</h2>
                <div className="space-y-4">
                  {scholarships.map((scholarship) => (
                    <div key={scholarship.id} className="border rounded-lg p-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900">{scholarship.name}</h3>
                              <p className="text-sm text-gray-600 mt-1">{scholarship.provider}</p>
                              <p className="text-sm text-gray-500 mt-2">{scholarship.description}</p>
                              
                              <div className="flex items-center space-x-6 mt-4">
                                <div className="flex items-center text-sm text-gray-500">
                                  <DollarSign className="w-4 h-4 mr-1" />
                                  <span className="font-semibold text-green-600">{scholarship.amount}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {scholarship.country}
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <GraduationCap className="w-4 h-4 mr-1" />
                                  {scholarship.field}
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  Deadline: {scholarship.deadline}
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-4 mt-3">
                                <Badge variant="outline">{scholarship.type}</Badge>
                                {getStatusBadge(scholarship.status)}
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-6 ml-6">
                              <div className="text-center">
                                <p className="text-sm font-medium text-gray-900">Applicants</p>
                                <p className="text-2xl font-bold text-blue-600">{scholarship.applicants}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm font-medium text-gray-900">Awarded</p>
                                <p className="text-2xl font-bold text-green-600">{scholarship.awarded}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm font-medium text-gray-900">Success Rate</p>
                                <p className="text-lg font-semibold text-purple-600">
                                  {Math.round((scholarship.awarded / scholarship.applicants) * 100)}%
                                </p>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

