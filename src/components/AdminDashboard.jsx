import React, { useState, useEffect } from 'react'
import { useAdminAuth } from '../contexts/AdminAuthContext'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
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
  Globe
} from 'lucide-react'
import AdminSidebar from './AdminSidebar'

export default function AdminDashboard() {
  const { adminUser, hasPermission } = useAdminAuth()
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [isLoading, setIsLoading] = useState(false)

  // Mock dashboard data - replace with real API calls
  const [dashboardData, setDashboardData] = useState({
    overview: {
      totalStudents: 2847,
      totalCounselors: 156,
      activeCounselors: 89,
      totalScholarships: 247,
      totalApplications: 1523,
      successfulApplications: 892,
      totalRevenue: 125750,
      avgResponseTime: 2.3,
      avgSatisfactionRating: 4.6,
      platformUptime: 99.8
    },
    trends: {
      studentsGrowth: 12.5,
      counselorsGrowth: 8.3,
      applicationsGrowth: 15.7,
      revenueGrowth: 22.1,
      satisfactionChange: 0.2,
      responseTimeChange: -0.5
    },
    recentActivity: [
      { id: 1, type: 'new_counselor', message: 'Dr. Sarah Chen completed verification', time: '2 hours ago', status: 'success' },
      { id: 2, type: 'application_success', message: 'Student accepted to University of Melbourne', time: '3 hours ago', status: 'success' },
      { id: 3, type: 'system_alert', message: 'High response time detected for 3 counselors', time: '4 hours ago', status: 'warning' },
      { id: 4, type: 'new_student', message: '15 new student registrations today', time: '6 hours ago', status: 'info' },
      { id: 5, type: 'payment_received', message: 'Commission payment processed: $2,450', time: '8 hours ago', status: 'success' }
    ],
    alerts: [
      { id: 1, type: 'warning', title: 'Response Time Alert', message: '3 counselors have response times > 24 hours', priority: 'medium' },
      { id: 2, type: 'info', title: 'System Maintenance', message: 'Scheduled maintenance on Sunday 2:00 AM', priority: 'low' },
      { id: 3, type: 'urgent', title: 'Review Required', message: '5 counselor applications pending verification', priority: 'high' }
    ],
    topPerformers: [
      { id: 1, name: 'Dr. Sarah Chen', type: 'counselor', metric: '4.9 rating', students: 23, revenue: 8450 },
      { id: 2, name: 'Michael Kumar', type: 'counselor', metric: '0.8h response', students: 18, revenue: 6200 },
      { id: 3, name: 'Emma Wilson', type: 'counselor', metric: '95% success', students: 15, revenue: 5800 }
    ],
    systemHealth: {
      apiResponseTime: 145, // ms
      databaseConnections: 23,
      activeUsers: 156,
      errorRate: 0.02, // percentage
      memoryUsage: 68, // percentage
      cpuUsage: 34 // percentage
    }
  })

  const getTrendIcon = (value) => {
    if (value > 0) return <ArrowUp className="h-4 w-4 text-green-600" />
    if (value < 0) return <ArrowDown className="h-4 w-4 text-red-600" />
    return <Minus className="h-4 w-4 text-gray-600" />
  }

  const getTrendColor = (value) => {
    if (value > 0) return 'text-green-600'
    if (value < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'urgent': return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'info': return <CheckCircle2 className="h-4 w-4 text-blue-600" />
      default: return <CheckCircle2 className="h-4 w-4 text-gray-600" />
    }
  }

  const getAlertBadgeColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

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
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {adminUser?.name}</p>
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

        {/* Dashboard Content */}
        <main className="flex-1 p-6 space-y-6">
          
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-3xl font-bold text-gray-900">{dashboardData.overview.totalStudents.toLocaleString()}</p>
                    <div className="flex items-center mt-1">
                      {getTrendIcon(dashboardData.trends.studentsGrowth)}
                      <span className={`text-sm ml-1 ${getTrendColor(dashboardData.trends.studentsGrowth)}`}>
                        {Math.abs(dashboardData.trends.studentsGrowth)}% vs last period
                      </span>
                    </div>
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
                    <p className="text-3xl font-bold text-gray-900">{dashboardData.overview.activeCounselors}</p>
                    <div className="flex items-center mt-1">
                      {getTrendIcon(dashboardData.trends.counselorsGrowth)}
                      <span className={`text-sm ml-1 ${getTrendColor(dashboardData.trends.counselorsGrowth)}`}>
                        {Math.abs(dashboardData.trends.counselorsGrowth)}% vs last period
                      </span>
                    </div>
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
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {((dashboardData.overview.successfulApplications / dashboardData.overview.totalApplications) * 100).toFixed(1)}%
                    </p>
                    <div className="flex items-center mt-1">
                      {getTrendIcon(dashboardData.trends.applicationsGrowth)}
                      <span className={`text-sm ml-1 ${getTrendColor(dashboardData.trends.applicationsGrowth)}`}>
                        {Math.abs(dashboardData.trends.applicationsGrowth)}% vs last period
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">${dashboardData.overview.totalRevenue.toLocaleString()}</p>
                    <div className="flex items-center mt-1">
                      {getTrendIcon(dashboardData.trends.revenueGrowth)}
                      <span className={`text-sm ml-1 ${getTrendColor(dashboardData.trends.revenueGrowth)}`}>
                        {Math.abs(dashboardData.trends.revenueGrowth)}% vs last period
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <DollarSign className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.overview.avgResponseTime}h</p>
                  <p className="text-sm text-gray-600 mb-4">Average response time</p>
                  <Progress value={75} className="mb-2" />
                  <p className="text-xs text-gray-500">Target: &lt; 2 hours</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-600" />
                  Satisfaction Rating
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.overview.avgSatisfactionRating}</p>
                  <p className="text-sm text-gray-600 mb-4">Average rating</p>
                  <Progress value={92} className="mb-2" />
                  <p className="text-xs text-gray-500">Target: &gt; 4.5 stars</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-green-600" />
                  Platform Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.overview.platformUptime}%</p>
                  <p className="text-sm text-gray-600 mb-4">Uptime</p>
                  <Progress value={99.8} className="mb-2" />
                  <p className="text-xs text-gray-500">Target: &gt; 99.5%</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="alerts">Alerts & Issues</TabsTrigger>
              <TabsTrigger value="performance">Top Performers</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* System Health */}
                <Card className="shadow-sm border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-green-600" />
                      System Health
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">API Response Time</span>
                        <span className="text-sm text-gray-600">{dashboardData.systemHealth.apiResponseTime}ms</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Active Users</span>
                        <span className="text-sm text-gray-600">{dashboardData.systemHealth.activeUsers}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Error Rate</span>
                        <span className="text-sm text-gray-600">{dashboardData.systemHealth.errorRate}%</span>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Memory Usage</span>
                          <span className="text-sm text-gray-600">{dashboardData.systemHealth.memoryUsage}%</span>
                        </div>
                        <Progress value={dashboardData.systemHealth.memoryUsage} />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">CPU Usage</span>
                          <span className="text-sm text-gray-600">{dashboardData.systemHealth.cpuUsage}%</span>
                        </div>
                        <Progress value={dashboardData.systemHealth.cpuUsage} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="shadow-sm border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-blue-600" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
                        <Users className="h-6 w-6 mb-2 text-blue-600" />
                        <span className="text-sm">Manage Counselors</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
                        <GraduationCap className="h-6 w-6 mb-2 text-green-600" />
                        <span className="text-sm">View Students</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
                        <Award className="h-6 w-6 mb-2 text-purple-600" />
                        <span className="text-sm">Scholarships</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
                        <BarChart3 className="h-6 w-6 mb-2 text-yellow-600" />
                        <span className="text-sm">Analytics</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Recent Platform Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`p-2 rounded-full ${
                          activity.status === 'success' ? 'bg-green-100' :
                          activity.status === 'warning' ? 'bg-yellow-100' :
                          activity.status === 'info' ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          {activity.status === 'success' && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                          {activity.status === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                          {activity.status === 'info' && <Eye className="h-4 w-4 text-blue-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-600">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>System Alerts & Issues</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.alerts.map((alert) => (
                      <div key={alert.id} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                            <Badge className={getAlertBadgeColor(alert.priority)}>
                              {alert.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{alert.message}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Resolve
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Top Performing Counselors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.topPerformers.map((performer, index) => (
                      <div key={performer.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                          <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{performer.name}</h4>
                          <p className="text-xs text-gray-600">{performer.metric}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{performer.students} students</p>
                          <p className="text-xs text-gray-600">${performer.revenue.toLocaleString()} revenue</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

