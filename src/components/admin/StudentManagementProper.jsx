import { useState, useEffect } from 'react'
import AdminSidebar from '../AdminSidebar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { 
  TrendingUp,
  Plus,
  Download,
  Search,
  Users,
  FileText,
  Trophy,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Eye,
  SquarePen,
  Trash2
} from 'lucide-react'

export default function StudentManagementProper() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch real student data from database
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true)
        // This would connect to your actual database
        // const response = await fetch('/api/admin/students')
        // const data = await response.json()
        // setStudents(data)
        
        // For now, we'll show empty state until database is connected
        setStudents([])
      } catch (error) {
        console.error('Error fetching students:', error)
        setStudents([])
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'graduated':
        return <Badge className="bg-blue-100 text-blue-800">Graduated</Badge>
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
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
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
                  <p className="text-gray-600">Manage students, applications, and success stories</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Refresh
                  </Button>
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Student
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </header>

            {/* Content */}
            <div className="flex-1 p-6 space-y-6">
              {/* Search and Filter */}
              <div className="flex gap-4 items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search students by name, email, or program..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="graduated">Graduated</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Tab Navigation */}
              <div className="w-full">
                <div className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 grid w-full grid-cols-5">
                  <button 
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'} flex items-center gap-2`}
                    onClick={() => setActiveTab('all')}
                  >
                    <Users className="h-4 w-4" />
                    All Students ({students.length})
                  </button>
                  <button 
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === 'applications' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'} flex items-center gap-2`}
                    onClick={() => setActiveTab('applications')}
                  >
                    <FileText className="h-4 w-4" />
                    Active Applications
                  </button>
                  <button 
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === 'success' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'} flex items-center gap-2`}
                    onClick={() => setActiveTab('success')}
                  >
                    <Trophy className="h-4 w-4" />
                    Success Stories
                  </button>
                  <button 
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === 'support' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'} flex items-center gap-2`}
                    onClick={() => setActiveTab('support')}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Support Tickets (2)
                  </button>
                  <button 
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === 'analytics' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'} flex items-center gap-2`}
                    onClick={() => setActiveTab('analytics')}
                  >
                    <TrendingUp className="h-4 w-4" />
                    Analytics
                  </button>
                </div>

                {/* Content Area */}
                <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-4">
                  <div className="grid gap-4">
                    {loading ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">Loading students...</p>
                      </div>
                    ) : students.length === 0 ? (
                      <div className="text-center py-8">
                        <Users className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Connect to database to display real student data.
                        </p>
                        <div className="mt-6">
                          <Button className="bg-blue-600 text-white hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Student
                          </Button>
                        </div>
                      </div>
                    ) : (
                      students.map((student) => (
                        <div key={student.id} className="rounded-lg border bg-white text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                          <div className="p-6">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <h3 className="text-xl font-semibold text-gray-900">{student.name}</h3>
                                  {getStatusBadge(student.status)}
                                </div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    {student.email}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    {student.phone}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    {student.location}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Joined {student.joinDate}
                                  </div>
                                </div>
                                
                                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">Program</p>
                                    <p className="text-sm text-gray-600">{student.program}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">University</p>
                                    <p className="text-sm text-gray-600">{student.university}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">GPA</p>
                                    <p className="text-sm text-gray-600">{student.gpa}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">Counselor</p>
                                    <p className="text-sm text-gray-600">{student.counselor}</p>
                                  </div>
                                </div>
                                
                                <div className="mt-4 flex items-center gap-6 text-sm">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-blue-500" />
                                    <span className="font-medium">{student.applications}</span>
                                    <span className="text-gray-600">Applications</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Trophy className="h-4 w-4 text-green-500" />
                                    <span className="font-medium">{student.acceptances}</span>
                                    <span className="text-gray-600">Acceptances</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4 text-purple-500" />
                                    <span className="font-medium">${student.totalSpent}</span>
                                    <span className="text-gray-600">Total Spent</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-orange-500" />
                                    <span className="text-gray-600">Last active {student.lastActive}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex gap-2 ml-4">
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                  <Eye className="h-4 w-4" />
                                  View
                                </Button>
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                  <SquarePen className="h-4 w-4" />
                                  Edit
                                </Button>
                                <Button variant="outline" size="sm" className="flex items-center gap-1 text-red-600 hover:text-red-700">
                                  <Trash2 className="h-4 w-4" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

