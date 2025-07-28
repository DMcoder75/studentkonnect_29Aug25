import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  Star,
  Target,
  Award,
  MessageSquare,
  Calendar,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  Eye,
  ThumbsUp,
  BookOpen,
  GraduationCap,
  FileText,
  Phone,
  Video,
  Mail,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Shield,
  Trophy,
  Flame,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'
import Sidebar from './Sidebar'

export default function CounselorDashboard({ isMobileMenuOpen, onMobileMenuClose }) {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [performanceData, setPerformanceData] = useState({
    overview: {
      totalStudents: 47,
      activeStudents: 12,
      completedCases: 35,
      averageRating: 4.7,
      responseTime: 1.2, // hours
      successRate: 89,
      totalRevenue: 15750,
      monthlyGrowth: 12.5
    },
    goals: {
      monthlyTarget: 20,
      responseTimeTarget: 2,
      satisfactionTarget: 4.5,
      conversionTarget: 85
    },
    recentActivity: [
      { id: 1, type: 'new_student', student: 'Sarah Chen', time: '2 hours ago', status: 'pending' },
      { id: 2, type: 'meeting_completed', student: 'Michael Kumar', time: '5 hours ago', status: 'completed' },
      { id: 3, type: 'application_submitted', student: 'Emma Wilson', time: '1 day ago', status: 'success' },
      { id: 4, type: 'review_received', student: 'David Park', time: '2 days ago', status: 'positive', rating: 5 }
    ],
    upcomingMeetings: [
      { id: 1, student: 'Lisa Zhang', time: 'Today 2:00 PM', type: 'Initial Consultation', duration: '60 min' },
      { id: 2, student: 'James Rodriguez', time: 'Tomorrow 10:00 AM', type: 'Application Review', duration: '45 min' },
      { id: 3, student: 'Priya Patel', time: 'Friday 3:30 PM', type: 'Visa Guidance', duration: '30 min' }
    ],
    performanceMetrics: {
      thisMonth: {
        leadsAssigned: 18,
        leadsContacted: 17,
        leadsConverted: 15,
        averageResponseTime: 1.2,
        satisfactionRating: 4.7,
        revenue: 3200
      },
      lastMonth: {
        leadsAssigned: 16,
        leadsContacted: 15,
        leadsConverted: 13,
        averageResponseTime: 1.8,
        satisfactionRating: 4.5,
        revenue: 2850
      }
    },
    credibilityScore: 94,
    badges: [
      { name: 'Top Performer', icon: Trophy, color: 'text-yellow-600' },
      { name: 'Quick Responder', icon: Zap, color: 'text-blue-600' },
      { name: 'Student Favorite', icon: Star, color: 'text-purple-600' },
      { name: 'Verified Expert', icon: Shield, color: 'text-green-600' }
    ]
  })

  const getPerformanceChange = (current, previous) => {
    if (previous === 0) return { value: 0, trend: 'neutral' }
    const change = ((current - previous) / previous) * 100
    return {
      value: Math.abs(change).toFixed(1),
      trend: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral'
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <ArrowUp className="h-4 w-4 text-green-600" />
      case 'down': return <ArrowDown className="h-4 w-4 text-red-600" />
      default: return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-600'
      case 'down': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getGoalProgress = (current, target) => {
    return Math.min((current / target) * 100, 100)
  }

  const getCredibilityLevel = (score) => {
    if (score >= 90) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' }
    if (score >= 80) return { level: 'Very Good', color: 'text-blue-600', bg: 'bg-blue-100' }
    if (score >= 70) return { level: 'Good', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    if (score >= 60) return { level: 'Fair', color: 'text-orange-600', bg: 'bg-orange-100' }
    return { level: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-100' }
  }

  const credibilityLevel = getCredibilityLevel(performanceData.credibilityScore)

  return (
    <div className="w-full">
      {/* Hero Section - Full Width */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 text-white py-8 w-full">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Counselor Dashboard
                </h1>
                <p className="text-lg text-purple-100">
                  Track your performance, manage students, and build credibility
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <div className={`px-4 py-2 rounded-full ${credibilityLevel.bg} ${credibilityLevel.color} font-semibold`}>
                  Credibility Score: {performanceData.credibilityScore}% ({credibilityLevel.level})
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two-Column Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={true}
          onClose={() => {}}
          isHomepage={false}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={onMobileMenuClose}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full md:w-auto transition-all duration-300">
          <div className="container mx-auto px-6 py-8">
            
            {/* Performance Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Students</p>
                      <p className="text-3xl font-bold text-gray-900">{performanceData.overview.activeStudents}</p>
                      <div className="flex items-center mt-1">
                        {getTrendIcon('up')}
                        <span className={`text-sm ml-1 ${getTrendColor('up')}`}>
                          +{getPerformanceChange(performanceData.performanceMetrics.thisMonth.leadsConverted, performanceData.performanceMetrics.lastMonth.leadsConverted).value}%
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                      <p className="text-3xl font-bold text-gray-900">{performanceData.overview.responseTime}h</p>
                      <div className="flex items-center mt-1">
                        {getTrendIcon('up')}
                        <span className={`text-sm ml-1 ${getTrendColor('up')}`}>
                          Improved 33%
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Satisfaction Rating</p>
                      <p className="text-3xl font-bold text-gray-900">{performanceData.overview.averageRating}</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm ml-1 text-gray-600">
                          Based on 47 reviews
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-full">
                      <Star className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Success Rate</p>
                      <p className="text-3xl font-bold text-gray-900">{performanceData.overview.successRate}%</p>
                      <div className="flex items-center mt-1">
                        {getTrendIcon('up')}
                        <span className={`text-sm ml-1 ${getTrendColor('up')}`}>
                          +4% this month
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Target className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Goals Progress */}
            <Card className="shadow-lg border-0 mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-600" />
                  Performance Goals Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Monthly Students</span>
                      <span className="text-sm text-gray-600">
                        {performanceData.performanceMetrics.thisMonth.leadsConverted}/{performanceData.goals.monthlyTarget}
                      </span>
                    </div>
                    <Progress 
                      value={getGoalProgress(performanceData.performanceMetrics.thisMonth.leadsConverted, performanceData.goals.monthlyTarget)} 
                      className="mb-1"
                    />
                    <p className="text-xs text-gray-600">
                      {getGoalProgress(performanceData.performanceMetrics.thisMonth.leadsConverted, performanceData.goals.monthlyTarget).toFixed(0)}% of goal
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Response Time</span>
                      <span className="text-sm text-gray-600">
                        {performanceData.overview.responseTime}h / {performanceData.goals.responseTimeTarget}h
                      </span>
                    </div>
                    <Progress 
                      value={100 - ((performanceData.overview.responseTime / performanceData.goals.responseTimeTarget) * 100)} 
                      className="mb-1"
                    />
                    <p className="text-xs text-green-600">
                      {performanceData.goals.responseTimeTarget - performanceData.overview.responseTime}h ahead of target
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Satisfaction</span>
                      <span className="text-sm text-gray-600">
                        {performanceData.overview.averageRating} / {performanceData.goals.satisfactionTarget}
                      </span>
                    </div>
                    <Progress 
                      value={getGoalProgress(performanceData.overview.averageRating, performanceData.goals.satisfactionTarget)} 
                      className="mb-1"
                    />
                    <p className="text-xs text-green-600">
                      +{(performanceData.overview.averageRating - performanceData.goals.satisfactionTarget).toFixed(1)} above target
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Success Rate</span>
                      <span className="text-sm text-gray-600">
                        {performanceData.overview.successRate}% / {performanceData.goals.conversionTarget}%
                      </span>
                    </div>
                    <Progress 
                      value={getGoalProgress(performanceData.overview.successRate, performanceData.goals.conversionTarget)} 
                      className="mb-1"
                    />
                    <p className="text-xs text-green-600">
                      +{performanceData.overview.successRate - performanceData.goals.conversionTarget}% above target
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Credibility & Badges */}
            <Card className="shadow-lg border-0 mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-600" />
                  Credibility & Recognition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Credibility Score</h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <Progress value={performanceData.credibilityScore} className="mb-2" />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>0%</span>
                          <span className={credibilityLevel.color}>
                            {performanceData.credibilityScore}% - {credibilityLevel.level}
                          </span>
                          <span>100%</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Response Time Performance</span>
                        <span className="text-green-600">+25 points</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Student Satisfaction</span>
                        <span className="text-green-600">+30 points</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Success Rate</span>
                        <span className="text-green-600">+25 points</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Verified Reviews</span>
                        <span className="text-green-600">+14 points</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Achievement Badges</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {performanceData.badges.map((badge, index) => {
                        const BadgeIcon = badge.icon
                        return (
                          <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <BadgeIcon className={`h-6 w-6 mr-3 ${badge.color}`} />
                            <span className="text-sm font-medium">{badge.name}</span>
                          </div>
                        )
                      })}
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center">
                        <Eye className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-sm font-medium text-blue-800">Public Profile Views</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-900 mt-1">1,247</p>
                      <p className="text-sm text-blue-600">+18% this week</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Dashboard Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="earnings">Earnings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Activity className="h-5 w-5 mr-2 text-purple-600" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {performanceData.recentActivity.map((activity) => (
                          <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className={`p-2 rounded-full ${
                              activity.type === 'new_student' ? 'bg-blue-100' :
                              activity.type === 'meeting_completed' ? 'bg-green-100' :
                              activity.type === 'application_submitted' ? 'bg-purple-100' :
                              'bg-yellow-100'
                            }`}>
                              {activity.type === 'new_student' && <Users className="h-4 w-4 text-blue-600" />}
                              {activity.type === 'meeting_completed' && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                              {activity.type === 'application_submitted' && <FileText className="h-4 w-4 text-purple-600" />}
                              {activity.type === 'review_received' && <Star className="h-4 w-4 text-yellow-600" />}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                {activity.type === 'new_student' && `New student assigned: ${activity.student}`}
                                {activity.type === 'meeting_completed' && `Meeting completed with ${activity.student}`}
                                {activity.type === 'application_submitted' && `Application submitted for ${activity.student}`}
                                {activity.type === 'review_received' && `${activity.rating}-star review from ${activity.student}`}
                              </p>
                              <p className="text-xs text-gray-600">{activity.time}</p>
                            </div>
                            <Badge variant={
                              activity.status === 'success' || activity.status === 'completed' || activity.status === 'positive' ? 'default' :
                              activity.status === 'pending' ? 'secondary' : 'outline'
                            }>
                              {activity.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Upcoming Meetings */}
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-green-600" />
                        Upcoming Meetings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {performanceData.upcomingMeetings.map((meeting) => (
                          <div key={meeting.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                            <div className="p-2 bg-green-100 rounded-full">
                              <Video className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{meeting.student}</p>
                              <p className="text-xs text-gray-600">{meeting.type} • {meeting.duration}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">{meeting.time}</p>
                              <Button size="sm" variant="outline" className="mt-1">
                                Join
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="students" className="space-y-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Student Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Student management interface would be implemented here with detailed student profiles, communication history, and progress tracking.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="space-y-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Detailed Performance Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Comprehensive performance analytics with charts, trends, and detailed metrics would be implemented here.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="earnings" className="space-y-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Earnings & Financial Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Financial dashboard with earnings tracking, commission details, and payment history would be implemented here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

