import React, { useState, useEffect } from 'react'
import { useAdminAuth } from '../../contexts/AdminAuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  UserCheck,
  Search,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Mail,
  Phone,
  MapPin,
  Star,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Users,
  TrendingUp,
  Award
} from 'lucide-react'
import AdminSidebar from '../AdminSidebar'

export default function CounselorManagementWorking() {
  const { adminUser, hasPermission } = useAdminAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Real data would come from API - no mock data as requested
  const [counselors, setCounselors] = useState([])
  const [stats, setStats] = useState({
    totalCounselors: 0,
    activeCounselors: 0,
    pendingRequests: 0,
    topPerformers: 0
  })

  useEffect(() => {
    // Load real counselor data from API
    loadCounselorData()
  }, [])

  const loadCounselorData = async () => {
    setIsLoading(true)
    try {
      // Replace with actual API call
      // const response = await fetch('/api/admin/counselors')
      // const data = await response.json()
      // setCounselors(data.counselors)
      // setStats(data.stats)
      
      // For now, show empty state until real API is connected
      setCounselors([])
      setStats({
        totalCounselors: 0,
        activeCounselors: 0,
        pendingRequests: 0,
        topPerformers: 0
      })
    } catch (error) {
      console.error('Error loading counselor data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshData = async () => {
    await loadCounselorData()
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
              <h1 className="text-2xl font-bold text-gray-900">Counselor Management</h1>
              <p className="text-gray-600">Manage counselor applications and performance</p>
            </div>
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
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Counselors</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalCounselors}</p>
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
                    <p className="text-sm font-medium text-gray-600">Active Counselors</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.activeCounselors}</p>
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
                    <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.pendingRequests}</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Top Performers</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.topPerformers}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Counselors Table */}
          <Card className="shadow-sm border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Counselors</CardTitle>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
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
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Counselors Found</h3>
                <p className="text-gray-600">
                  {isLoading ? 'Loading counselor data...' : 'Connect to database to display counselor information'}
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

