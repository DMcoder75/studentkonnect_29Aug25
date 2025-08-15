import React, { useState, useEffect } from 'react'
import { useAdminAuth } from '../../contexts/AdminAuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  Award,
  Search,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Mail,
  DollarSign,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle
} from 'lucide-react'
import AdminSidebar from '../AdminSidebar'

export default function ScholarshipManagementWorking() {
  const { adminUser, hasPermission } = useAdminAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Real data would come from API - no mock data as requested
  const [scholarships, setScholarships] = useState([])
  const [stats, setStats] = useState({
    totalScholarships: 0,
    activeScholarships: 0,
    totalAwarded: 0,
    pendingApplications: 0
  })

  useEffect(() => {
    // Load real scholarship data from API
    loadScholarshipData()
  }, [])

  const loadScholarshipData = async () => {
    setIsLoading(true)
    try {
      // Replace with actual API call
      // const response = await fetch('/api/admin/scholarships')
      // const data = await response.json()
      // setScholarships(data.scholarships)
      // setStats(data.stats)
      
      // For now, show empty state until real API is connected
      setScholarships([])
      setStats({
        totalScholarships: 0,
        activeScholarships: 0,
        totalAwarded: 0,
        pendingApplications: 0
      })
    } catch (error) {
      console.error('Error loading scholarship data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshData = async () => {
    await loadScholarshipData()
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
              <h1 className="text-2xl font-bold text-gray-900">Scholarship Management</h1>
              <p className="text-gray-600">Manage scholarships and applications</p>
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
                    <p className="text-sm font-medium text-gray-600">Total Scholarships</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalScholarships}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Scholarships</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.activeScholarships}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Awarded</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalAwarded}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Applications</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.pendingApplications}</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scholarships Table */}
          <Card className="shadow-sm border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Scholarships</CardTitle>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
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
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Scholarships Found</h3>
                <p className="text-gray-600">
                  {isLoading ? 'Loading scholarship data...' : 'Connect to database to display scholarship information'}
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

