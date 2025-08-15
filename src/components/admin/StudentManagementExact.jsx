import { useState } from 'react'
import { useAdminAuth } from '../../contexts/AdminAuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Input } from '../ui/input'
import { 
  Users,
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Award,
  CheckCircle2,
  Clock,
  AlertTriangle,
  User,
  FileText,
  MessageSquare
} from 'lucide-react'
import AdminSidebar from '../AdminSidebar'

export default function StudentManagementExact() {
  const { adminUser, hasPermission } = useAdminAuth()
  const [selectedTab, setSelectedTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(false)

  // Real data would come from API - for now showing structure
  const [studentData, setStudentData] = useState({
    overview: {
      totalStudents: 2847,
      activeApplications: 156,
      successfulPlacements: 892,
      pendingReviews: 23
    },
    students: [
      {
        id: 1,
        name: 'Priya Dubey',
        email: 'priya.dubey@email.com',
        phone: '+91 9876543210',
        location: 'Mumbai, India',
        registrationDate: '2024-01-15',
        status: 'active',
        applications: 3,
        counselor: 'Michael Kumar',
        targetCountry: 'Australia',
        fieldOfStudy: 'Law'
      },
      {
        id: 2,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@email.com',
        phone: '+91 9876543211',
        location: 'Delhi, India',
        registrationDate: '2024-01-20',
        status: 'pending',
        applications: 1,
        counselor: 'Dr. Sarah Chen',
        targetCountry: 'Canada',
        fieldOfStudy: 'Engineering'
      },
      {
        id: 3,
        name: 'Anita Patel',
        email: 'anita.patel@email.com',
        phone: '+91 9876543212',
        location: 'Ahmedabad, India',
        registrationDate: '2024-02-01',
        status: 'completed',
        applications: 2,
        counselor: 'Dr. Emma Wilson',
        targetCountry: 'UK',
        fieldOfStudy: 'Medicine'
      }
    ]
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  const filteredStudents = studentData.students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
              <p className="text-gray-600">Manage all student profiles and applications</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsLoading(true)}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button 
                variant="outline" 
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-3xl font-bold text-gray-900">{studentData.overview.totalStudents}</p>
                    <p className="text-sm text-green-600 mt-1">+12.5% vs last month</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Applications</p>
                    <p className="text-3xl font-bold text-gray-900">{studentData.overview.activeApplications}</p>
                    <p className="text-sm text-green-600 mt-1">+8.3% vs last month</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Successful Placements</p>
                    <p className="text-3xl font-bold text-gray-900">{studentData.overview.successfulPlacements}</p>
                    <p className="text-sm text-green-600 mt-1">+15.7% vs last month</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                    <p className="text-3xl font-bold text-gray-900">{studentData.overview.pendingReviews}</p>
                    <p className="text-sm text-yellow-600 mt-1">Needs attention</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Student Management Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Students Overview</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="support">Support Tickets</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Search and Filter */}
              <Card className="shadow-sm border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search students by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      More Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Students List */}
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>All Students ({filteredStudents.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredStudents.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{student.name}</h4>
                            <div className="flex items-center space-x-4 text-xs text-gray-600 mt-1">
                              <span className="flex items-center">
                                <Mail className="h-3 w-3 mr-1" />
                                {student.email}
                              </span>
                              <span className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {student.location}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {student.registrationDate}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 text-xs text-gray-600 mt-1">
                              <span>Counselor: {student.counselor}</span>
                              <span>Target: {student.targetCountry}</span>
                              <span>Field: {student.fieldOfStudy}</span>
                              <span>Applications: {student.applications}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {getStatusBadge(student.status)}
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applications" className="space-y-6">
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Student Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Application management interface will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="support" className="space-y-6">
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Support Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Support ticket management interface will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Student Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Student analytics and reports will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

