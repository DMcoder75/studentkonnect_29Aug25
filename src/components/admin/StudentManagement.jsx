import { useState, useEffect } from 'react'
import { useAdminAuth } from '../../contexts/AdminAuthContext'
import AdminSidebar from '../AdminSidebar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select } from '../ui/select'
import { 
  Users,
  FileText,
  Trophy,
  MessageSquare,
  TrendingUp,
  Search,
  Plus,
  Download,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  Clock
} from 'lucide-react'

export default function StudentManagement() {
  const { hasPermission } = useAdminAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  // Mock data for students
  useEffect(() => {
    const mockStudents = [
      {
        id: 1,
        name: 'Priya Dubey',
        email: 'priya.dubey@email.com',
        phone: '+91 98765 43210',
        country: 'India',
        targetCountry: 'Australia',
        fieldOfStudy: 'Law',
        status: 'active',
        joinDate: '2024-01-15',
        applications: 3,
        counselor: 'Michael Kumar'
      },
      {
        id: 2,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@email.com',
        phone: '+91 87654 32109',
        country: 'India',
        targetCountry: 'Canada',
        fieldOfStudy: 'Engineering',
        status: 'pending',
        joinDate: '2024-02-20',
        applications: 1,
        counselor: 'Sarah Johnson'
      }
    ]
    setStudents(mockStudents)
    setLoading(false)
  }, [])

  if (!hasPermission('manage_students')) {
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
              <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
              <p className="mt-2 text-gray-600">Manage student profiles, applications, and support requests</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900">{students.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Applications</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {students.reduce((sum, student) => sum + student.applications, 0)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold text-gray-900">85%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Support Requests</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg shadow">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === 'overview'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Student Overview</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('applications')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === 'applications'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Applications</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('support')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === 'support'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Support Requests</span>
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search students..."
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
                    <option value="inactive">Inactive</option>
                  </Select>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>

                {/* Student List */}
                <div className="space-y-4">
                  {students.map((student) => (
                    <div key={student.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                            <span className="text-indigo-600 font-semibold">
                              {student.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                            <p className="text-sm text-gray-600">{student.email}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-xs text-gray-500">
                                <MapPin className="w-3 h-3 inline mr-1" />
                                {student.country} → {student.targetCountry}
                              </span>
                              <span className="text-xs text-gray-500">
                                <Calendar className="w-3 h-3 inline mr-1" />
                                Joined {student.joinDate}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{student.fieldOfStudy}</p>
                            <p className="text-sm text-gray-600">{student.applications} applications</p>
                            <p className="text-xs text-gray-500">Counselor: {student.counselor}</p>
                          </div>
                          <Badge 
                            className={
                              student.status === 'active' ? 'bg-green-100 text-green-800' :
                              student.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }
                          >
                            {student.status}
                          </Badge>
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

