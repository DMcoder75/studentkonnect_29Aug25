import { useState, useEffect } from 'react'
import { useAdminAuth } from '../../contexts/AdminAuthContext'
import AdminSidebar from '../AdminSidebar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select } from '../ui/select'
import { 
  Award,
  Search,
  Plus,
  Download,
  RefreshCw,
  Building,
  DollarSign,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Users,
  CheckCircle,
  TrendingUp,
  Clock
} from 'lucide-react'

export default function ScholarshipManagement() {
  const { hasPermission } = useAdminAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [scholarships, setScholarships] = useState([])
  const [loading, setLoading] = useState(true)

  // Mock data for scholarships
  useEffect(() => {
    const mockScholarships = [
      {
        id: 1,
        name: 'Excellence in Engineering Scholarship',
        provider: 'University of Sydney',
        amount: 25000,
        currency: 'AUD',
        deadline: '2025-03-15',
        status: 'active',
        category: 'Merit',
        field: 'Engineering',
        duration: '4 years',
        renewable: true,
        description: 'Supporting outstanding engineering students with financial assistance.',
        applicants: 156,
        awarded: 12
      },
      {
        id: 2,
        name: 'International Student Support Grant',
        provider: 'University of Melbourne',
        amount: 15000,
        currency: 'AUD',
        deadline: '2025-04-30',
        status: 'active',
        category: 'Need-based',
        field: 'All Fields',
        duration: '1 year',
        renewable: false,
        description: 'Financial support for international students facing hardship.',
        applicants: 89,
        awarded: 8
      }
    ]
    setScholarships(mockScholarships)
    setLoading(false)
  }, [])

  if (!hasPermission('manage_scholarships')) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1 ml-64">
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">You don't have permission to access this section.</p>
            </div>
          </div>
        </div>
      </div>
    )
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
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Applicants</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {scholarships.reduce((sum, scholarship) => sum + scholarship.applicants, 0)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Awards Given</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {scholarships.reduce((sum, scholarship) => sum + scholarship.awarded, 0)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Value</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${scholarships.reduce((sum, scholarship) => sum + scholarship.amount, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg shadow">
              {/* Header with Actions */}
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Scholarship Programs</h2>
                  <div className="flex space-x-3">
                    <Button variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Scholarship
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search scholarships..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="closed">Closed</option>
                  </Select>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>

                {/* Scholarship List */}
                <div className="space-y-4">
                  {scholarships.map((scholarship) => (
                    <div key={scholarship.id} className="border rounded-lg p-6 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="text-xl font-semibold text-gray-900">{scholarship.name}</h3>
                            <Badge 
                              className={
                                scholarship.status === 'active' ? 'bg-green-100 text-green-800' :
                                scholarship.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }
                            >
                              {scholarship.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center space-x-2">
                              <Building className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{scholarship.provider}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <DollarSign className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {scholarship.amount.toLocaleString()} {scholarship.currency}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">Due: {scholarship.deadline}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{scholarship.duration}</span>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-4">{scholarship.description}</p>

                          <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-blue-500" />
                              <span className="text-sm font-medium">{scholarship.applicants}</span>
                              <span className="text-sm text-gray-600">Applicants</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm font-medium">{scholarship.awarded}</span>
                              <span className="text-sm text-gray-600">Awarded</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Award className="w-4 h-4 text-purple-500" />
                              <span className="text-sm text-gray-600">{scholarship.category}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="w-4 h-4 text-orange-500" />
                              <span className="text-sm text-gray-600">{scholarship.field}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
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

