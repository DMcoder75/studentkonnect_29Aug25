import React, { useState, useEffect } from 'react'
import { useAdminAuth } from '../../contexts/AdminAuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Progress } from '../ui/progress'
import { 
  Users,
  GraduationCap,
  Award,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Star,
  AlertTriangle,
  CheckCircle2,
  Eye,
  MessageSquare,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Shield,
  Settings,
  Bell,
  Download,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Minus,
  UserCheck,
  UserX,
  FileText,
  Target,
  Zap,
  Heart,
  Globe,
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Building
} from 'lucide-react'
import AdminSidebar from '../AdminSidebar'

export default function StudentManagementCopy() {
  const { adminUser, hasPermission } = useAdminAuth()
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Student management data - replace with real API calls
  const [studentData, setStudentData] = useState({
    overview: {
      totalStudents: 2847,
      activeStudents: 2156,
      newRegistrations: 89,
      pendingApplications: 234,
      successfulPlacements: 892,
      averageAge: 22.5,
      topCountries: ['India', 'China', 'Nigeria', 'Pakistan', 'Bangladesh']
    },
    students: [
      {
        id: 1,
        name: 'Priya Dubey',
        email: 'priya.dubey@email.com',
        phone: '+91 98765 43210',
        country: 'India',
        city: 'Mumbai',
        age: 22,
        education: 'Bachelor\'s in Computer Science',
        university: 'Delhi University',
        gpa: 8.5,
        targetCountry: 'Australia',
        targetUniversity: 'University of Melbourne',
        targetProgram: 'Master of Computer Science',
        status: 'active',
        registrationDate: '2024-01-15',
        lastActivity: '2 hours ago',
        counselor: 'Dr. Sarah Chen',
        applications: 3,
        documents: 8
      },
      {
        id: 2,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@email.com',
        phone: '+91 87654 32109',
        country: 'India',
        city: 'Delhi',
        age: 24,
        education: 'Bachelor\'s in Engineering',
        university: 'IIT Delhi',
        gpa: 9.2,
        targetCountry: 'Canada',
        targetUniversity: 'University of Toronto',
        targetProgram: 'Master of Engineering',
        status: 'pending',
        registrationDate: '2024-02-10',
        lastActivity: '1 day ago',
        counselor: 'Michael Kumar',
        applications: 2,
        documents: 6
      },
      {
        id: 3,
        name: 'Aisha Patel',
        email: 'aisha.patel@email.com',
        phone: '+91 76543 21098',
        country: 'India',
        city: 'Ahmedabad',
        age: 23,
        education: 'Bachelor\'s in Business',
        university: 'Gujarat University',
        gpa: 8.8,
        targetCountry: 'UK',
        targetUniversity: 'University of Oxford',
        targetProgram: 'MBA',
        status: 'accepted',
        registrationDate: '2023-11-20',
        lastActivity: '3 days ago',
        counselor: 'Dr. Emma Wilson',
        applications: 4,
        documents: 12
      }
    ]
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'accepted':
        return <Badge className="bg-blue-100 text-blue-800">Accepted</Badge>
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  const filteredStudents = studentData.students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.targetUniversity.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const refreshData = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

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
              <p className="text-gray-600">Manage student profiles and applications</p>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshData}
                disabled={isLoading}
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
        </header>

        {/* Student Management Content */}
        <main className="flex-1 p-6 space-y-6">
          
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-3xl font-bold text-gray-900">{studentData.overview.totalStudents.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 mt-1">All registered students</p>
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
                    <p className="text-sm font-medium text-gray-600">Active Students</p>
                    <p className="text-3xl font-bold text-gray-900">{studentData.overview.activeStudents.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 mt-1">Currently active profiles</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <UserCheck className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">New Registrations</p>
                    <p className="text-3xl font-bold text-gray-900">{studentData.overview.newRegistrations}</p>
                    <p className="text-sm text-gray-500 mt-1">This week</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
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
                    <p className="text-sm text-gray-500 mt-1">Total acceptances</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Award className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card className="shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search students by name, email, or university..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Students List */}
          <Card className="shadow-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-600" />
                  Student Profiles ({filteredStudents.length})
                </span>
                <Button size="sm">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{student.name}</h3>
                            <p className="text-sm text-gray-600">{student.education}</p>
                          </div>
                          {getStatusBadge(student.status)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="h-4 w-4 mr-2" />
                            {student.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-4 w-4 mr-2" />
                            {student.phone}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2" />
                            {student.city}, {student.country}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Building className="h-4 w-4 mr-2" />
                            {student.university}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <BookOpen className="h-4 w-4 mr-2" />
                            GPA: {student.gpa}/10
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Globe className="h-4 w-4 mr-2" />
                            Target: {student.targetCountry}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Counselor: {student.counselor}</span>
                            <span>Applications: {student.applications}</span>
                            <span>Documents: {student.documents}</span>
                            <span>Last active: {student.lastActivity}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Message
                            </Button>
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredStudents.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No students found matching your criteria</p>
                </div>
              )}
            </CardContent>
          </Card>

        </main>
      </div>
    </div>
  )
}

