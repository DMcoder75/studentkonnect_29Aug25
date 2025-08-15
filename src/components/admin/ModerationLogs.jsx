import React, { useState, useEffect } from 'react'
import { useAdminAuth } from '../../contexts/AdminAuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  FileText,
  Search,
  Download,
  RefreshCw,
  Eye,
  Filter,
  Calendar,
  User,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Activity
} from 'lucide-react'
import AdminLayout from './AdminLayout'

export default function ModerationLogs() {
  const { adminUser, hasPermission } = useAdminAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [actionFilter, setActionFilter] = useState('all')
  const [userFilter, setUserFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')

  // Sample moderation log data
  const [logs, setLogs] = useState([
    {
      id: 1,
      timestamp: '2024-01-15 14:30:25',
      moderator: 'Admin User',
      action: 'review_approved',
      target: 'Review #123',
      targetUser: 'John Smith',
      details: 'Approved review for Harvard University Computer Science program',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      severity: 'info',
      category: 'content_moderation'
    },
    {
      id: 2,
      timestamp: '2024-01-15 13:45:12',
      moderator: 'Security Team',
      action: 'user_suspended',
      target: 'User Account',
      targetUser: 'Mike Chen',
      details: 'User suspended for posting inappropriate content and spam',
      ipAddress: '10.0.0.50',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      severity: 'warning',
      category: 'user_management'
    },
    {
      id: 3,
      timestamp: '2024-01-15 12:20:08',
      moderator: 'System',
      action: 'auto_flag',
      target: 'Comment #456',
      targetUser: 'Anonymous User',
      details: 'Automatically flagged comment for containing prohibited keywords',
      ipAddress: '172.16.0.25',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15',
      severity: 'warning',
      category: 'automated_moderation'
    },
    {
      id: 4,
      timestamp: '2024-01-15 11:15:33',
      moderator: 'Content Team',
      action: 'content_removed',
      target: 'Blog Post #789',
      targetUser: 'Lisa Rodriguez',
      details: 'Removed blog post for containing outdated and misleading information',
      ipAddress: '203.0.113.15',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0',
      severity: 'error',
      category: 'content_moderation'
    },
    {
      id: 5,
      timestamp: '2024-01-15 10:30:45',
      moderator: 'Admin User',
      action: 'report_resolved',
      target: 'Report #321',
      targetUser: 'David Park',
      details: 'Resolved harassment report and took appropriate action against reported user',
      ipAddress: '198.51.100.42',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      severity: 'info',
      category: 'report_management'
    },
    {
      id: 6,
      timestamp: '2024-01-15 09:45:17',
      moderator: 'System',
      action: 'login_failed',
      target: 'Login Attempt',
      targetUser: 'Unknown',
      details: 'Multiple failed login attempts detected from suspicious IP address',
      ipAddress: '185.220.101.5',
      userAgent: 'curl/7.68.0',
      severity: 'error',
      category: 'security'
    },
    {
      id: 7,
      timestamp: '2024-01-15 08:20:55',
      moderator: 'Customer Service',
      action: 'complaint_escalated',
      target: 'Complaint #654',
      targetUser: 'Emma Wilson',
      details: 'Escalated billing complaint to management team for urgent resolution',
      ipAddress: '192.168.1.200',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      severity: 'warning',
      category: 'complaint_management'
    },
    {
      id: 8,
      timestamp: '2024-01-15 07:15:22',
      moderator: 'Tech Support',
      action: 'bug_fixed',
      target: 'Application Form',
      targetUser: 'System',
      details: 'Fixed critical bug in university application form that was causing data loss',
      ipAddress: '10.0.0.100',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      severity: 'info',
      category: 'technical_support'
    }
  ])

  const [stats, setStats] = useState({
    totalLogs: 8,
    todayLogs: 8,
    warningLogs: 3,
    errorLogs: 2
  })

  const refreshData = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const filteredLogs = logs.filter(log => 
    (log.moderator.toLowerCase().includes(searchTerm.toLowerCase()) ||
     log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
     log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
     log.targetUser.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (actionFilter === 'all' || log.action.includes(actionFilter)) &&
    (userFilter === 'all' || log.moderator === userFilter) &&
    (dateFilter === 'all' || log.timestamp.includes(dateFilter))
  )

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'info': return 'bg-blue-100 text-blue-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'info': return <CheckCircle className="w-4 h-4 text-blue-600" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case 'error': return <XCircle className="w-4 h-4 text-red-600" />
      default: return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const getActionIcon = (action) => {
    if (action.includes('approved') || action.includes('resolved')) {
      return <CheckCircle className="w-4 h-4 text-green-600" />
    } else if (action.includes('suspended') || action.includes('removed') || action.includes('failed')) {
      return <XCircle className="w-4 h-4 text-red-600" />
    } else if (action.includes('flag') || action.includes('escalated')) {
      return <AlertTriangle className="w-4 h-4 text-yellow-600" />
    } else {
      return <Activity className="w-4 h-4 text-blue-600" />
    }
  }

  const formatAction = (action) => {
    return action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  return (
    <AdminLayout 
      title="Moderation Logs" 
      description="View and monitor all moderation activities and system logs"
    >
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
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
            Export Logs
          </Button>
          <Button size="sm" variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filter
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Logs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalLogs}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Logs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.todayLogs}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Warnings</p>
                <p className="text-3xl font-bold text-gray-900">{stats.warningLogs}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Errors</p>
                <p className="text-3xl font-bold text-gray-900">{stats.errorLogs}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logs Table */}
      <Card className="shadow-sm border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Activity Logs</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Actions</option>
                <option value="approved">Approved</option>
                <option value="suspended">Suspended</option>
                <option value="removed">Removed</option>
                <option value="resolved">Resolved</option>
                <option value="escalated">Escalated</option>
                <option value="failed">Failed</option>
              </select>
              <select
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Users</option>
                <option value="Admin User">Admin User</option>
                <option value="System">System</option>
                <option value="Security Team">Security Team</option>
                <option value="Content Team">Content Team</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Tech Support">Tech Support</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredLogs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Timestamp</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Action</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Moderator</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Target</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Details</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Severity</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{log.timestamp.split(' ')[1]}</p>
                            <p className="text-xs text-gray-500">{log.timestamp.split(' ')[0]}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          {getActionIcon(log.action)}
                          <span className="font-medium text-gray-900">{formatAction(log.action)}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{log.moderator}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{log.target}</p>
                          <p className="text-sm text-gray-500">{log.targetUser}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-gray-700 max-w-xs truncate" title={log.details}>
                          {log.details}
                        </p>
                        <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                          <span>IP: {log.ipAddress}</span>
                          <Badge variant="outline" className="text-xs">{log.category}</Badge>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          {getSeverityIcon(log.severity)}
                          <Badge className={getSeverityColor(log.severity)}>
                            {log.severity}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Logs Found</h3>
              <p className="text-gray-600">
                {isLoading ? 'Loading logs...' : 'No logs match your search criteria'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  )
}

