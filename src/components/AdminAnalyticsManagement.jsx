import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAdminAuth } from '../contexts/AdminAuthContext'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Award,
  GraduationCap,
  Activity,
  Eye,
  Download,
  RefreshCw,
  Calendar,
  Target,
  PieChart,
  LineChart,
  BarChart,
  Globe,
  Clock,
  Star,
  MessageSquare,
  FileText,
  Mail
} from 'lucide-react'
import AdminSidebar from './AdminSidebar'

export default function AdminAnalyticsManagement() {
  const { adminUser, hasPermission } = useAdminAuth()
  const location = useLocation()
  const [selectedTab, setSelectedTab] = useState('overview')
  const [dateRange, setDateRange] = useState('last_30_days')
  const [isLoading, setIsLoading] = useState(false)

  // Detect current route and set appropriate tab
  useEffect(() => {
    const path = location.pathname
    if (path.includes('/performance')) {
      setSelectedTab('performance')
    } else if (path.includes('/financial')) {
      setSelectedTab('financial')
    } else if (path.includes('/users')) {
      setSelectedTab('users')
    } else {
      setSelectedTab('overview')
    }
  }, [location.pathname])

  // Mock analytics data - replace with real API calls
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalUsers: 15847,
      totalCounselors: 89,
      totalScholarships: 234,
      totalRevenue: 125750,
      monthlyGrowth: {
        users: 12.5,
        counselors: 8.3,
        scholarships: 15.7,
        revenue: 22.1
      }
    },
    performance: {
      pageViews: 45623,
      uniqueVisitors: 12456,
      bounceRate: 34.2,
      avgSessionDuration: '4m 32s',
      conversionRate: 3.8,
      topPages: [
        { page: '/universities', views: 8934, percentage: 19.6 },
        { page: '/courses', views: 7821, percentage: 17.1 },
        { page: '/pathways', views: 6543, percentage: 14.3 },
        { page: '/scholarships', views: 5432, percentage: 11.9 },
        { page: '/counselors', views: 4321, percentage: 9.5 }
      ]
    },
    financial: {
      totalRevenue: 125750,
      monthlyRevenue: 18500,
      averageOrderValue: 450,
      commissionsPaid: 23400,
      pendingPayments: 5600,
      revenueBySource: [
        { source: 'Counseling Services', amount: 78500, percentage: 62.4 },
        { source: 'Premium Features', amount: 28750, percentage: 22.9 },
        { source: 'Scholarship Applications', amount: 12300, percentage: 9.8 },
        { source: 'Course Recommendations', amount: 6200, percentage: 4.9 }
      ]
    },
    users: {
      totalUsers: 15847,
      activeUsers: 8934,
      newUsers: 1234,
      returningUsers: 7700,
      usersByLocation: [
        { location: 'Sydney', users: 4521, percentage: 28.5 },
        { location: 'Melbourne', users: 3876, percentage: 24.5 },
        { location: 'Brisbane', users: 2345, percentage: 14.8 },
        { location: 'Perth', users: 1987, percentage: 12.5 },
        { location: 'Adelaide', users: 1234, percentage: 7.8 },
        { location: 'Other', users: 1884, percentage: 11.9 }
      ],
      usersByAge: [
        { age: '16-18', users: 6234, percentage: 39.3 },
        { age: '19-21', users: 4521, percentage: 28.5 },
        { age: '22-24', users: 2876, percentage: 18.1 },
        { age: '25+', users: 2216, percentage: 14.0 }
      ]
    }
  })

  const refreshData = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toLocaleString()
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(amount)
  }

  const getTrendIcon = (growth) => {
    return growth >= 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    )
  }

  const getTrendColor = (growth) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600'
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
              <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
              <p className="text-gray-600">Platform performance and insights</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="last_7_days">Last 7 Days</option>
                <option value="last_30_days">Last 30 Days</option>
                <option value="last_90_days">Last 90 Days</option>
                <option value="last_year">Last Year</option>
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
                Export Report
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 space-y-6">
          
          {/* Analytics Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Platform Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
              <TabsTrigger value="financial">Financial Reports</TabsTrigger>
              <TabsTrigger value="users">User Analytics</TabsTrigger>
            </TabsList>

            {/* Platform Overview */}
            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="shadow-sm border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Users</p>
                        <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.overview.totalUsers)}</p>
                        <div className="flex items-center mt-2">
                          {getTrendIcon(analyticsData.overview.monthlyGrowth.users)}
                          <span className={`text-sm ml-1 ${getTrendColor(analyticsData.overview.monthlyGrowth.users)}`}>
                            {analyticsData.overview.monthlyGrowth.users}% vs last period
                          </span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
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
                        <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalCounselors}</p>
                        <div className="flex items-center mt-2">
                          {getTrendIcon(analyticsData.overview.monthlyGrowth.counselors)}
                          <span className={`text-sm ml-1 ${getTrendColor(analyticsData.overview.monthlyGrowth.counselors)}`}>
                            {analyticsData.overview.monthlyGrowth.counselors}% vs last period
                          </span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <GraduationCap className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Scholarships</p>
                        <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalScholarships}</p>
                        <div className="flex items-center mt-2">
                          {getTrendIcon(analyticsData.overview.monthlyGrowth.scholarships)}
                          <span className={`text-sm ml-1 ${getTrendColor(analyticsData.overview.monthlyGrowth.scholarships)}`}>
                            {analyticsData.overview.monthlyGrowth.scholarships}% vs last period
                          </span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Award className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.overview.totalRevenue)}</p>
                        <div className="flex items-center mt-2">
                          {getTrendIcon(analyticsData.overview.monthlyGrowth.revenue)}
                          <span className={`text-sm ml-1 ${getTrendColor(analyticsData.overview.monthlyGrowth.revenue)}`}>
                            {analyticsData.overview.monthlyGrowth.revenue}% vs last period
                          </span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-sm border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      User Growth Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Chart visualization would be displayed here</p>
                        <p className="text-sm text-gray-500">Integration with charting library needed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="h-5 w-5 mr-2" />
                      Revenue Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Pie chart visualization would be displayed here</p>
                        <p className="text-sm text-gray-500">Integration with charting library needed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Performance Metrics */}
            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="shadow-sm border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Page Views</p>
                        <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.performance.pageViews)}</p>
                      </div>
                      <Eye className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Unique Visitors</p>
                        <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.performance.uniqueVisitors)}</p>
                      </div>
                      <Users className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
                        <p className="text-2xl font-bold text-gray-900">{analyticsData.performance.bounceRate}%</p>
                      </div>
                      <Activity className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                        <p className="text-2xl font-bold text-gray-900">{analyticsData.performance.conversionRate}%</p>
                      </div>
                      <Target className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Pages */}
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Top Performing Pages</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {analyticsData.performance.topPages.map((page, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">{page.page}</span>
                            <span className="text-sm text-gray-600">{formatNumber(page.views)} views</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${page.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Financial Reports */}
            <TabsContent value="financial" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="shadow-sm border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.financial.totalRevenue)}</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.financial.monthlyRevenue)}</p>
                      </div>
                      <Calendar className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.financial.averageOrderValue)}</p>
                      </div>
                      <Star className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.financial.pendingPayments)}</p>
                      </div>
                      <Clock className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Revenue by Source */}
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Revenue by Source</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {analyticsData.financial.revenueBySource.map((source, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">{source.source}</span>
                            <span className="text-sm text-gray-600">{formatCurrency(source.amount)}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${source.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* User Analytics */}
            <TabsContent value="users" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="shadow-sm border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Users</p>
                        <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.users.totalUsers)}</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active Users</p>
                        <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.users.activeUsers)}</p>
                      </div>
                      <Activity className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">New Users</p>
                        <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.users.newUsers)}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Returning Users</p>
                        <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.users.returningUsers)}</p>
                      </div>
                      <RefreshCw className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Users by Location */}
                <Card className="shadow-sm border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="h-5 w-5 mr-2" />
                      Users by Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {analyticsData.users.usersByLocation.map((location, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">{location.location}</span>
                              <span className="text-sm text-gray-600">{formatNumber(location.users)} users</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${location.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Users by Age */}
                <Card className="shadow-sm border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Users by Age Group
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {analyticsData.users.usersByAge.map((age, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">{age.age} years</span>
                              <span className="text-sm text-gray-600">{formatNumber(age.users)} users</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-purple-600 h-2 rounded-full" 
                                style={{ width: `${age.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

