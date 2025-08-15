import React, { useState } from 'react'
import AdminLayout from './AdminLayout'
import { FileText, Download, Filter, Search, MoreVertical, Eye, AlertTriangle, Info, CheckCircle, XCircle, Clock } from 'lucide-react'

const SystemLogs = () => {
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const systemLogs = [
    {
      id: 1,
      timestamp: "2024-01-15 14:30:25",
      level: "error",
      category: "authentication",
      message: "Failed login attempt for user: john.doe@email.com",
      details: "Invalid password provided. IP: 192.168.1.100",
      user: "system",
      source: "auth_service"
    },
    {
      id: 2,
      timestamp: "2024-01-15 14:28:15",
      level: "info",
      category: "user_activity",
      message: "User successfully logged in",
      details: "User ID: 1247, Session ID: sess_abc123",
      user: "sarah.chen@email.com",
      source: "web_app"
    },
    {
      id: 3,
      timestamp: "2024-01-15 14:25:10",
      level: "warning",
      category: "system",
      message: "High memory usage detected",
      details: "Memory usage: 85% (8.5GB/10GB). Consider scaling.",
      user: "system",
      source: "monitoring"
    },
    {
      id: 4,
      timestamp: "2024-01-15 14:20:45",
      level: "info",
      category: "application",
      message: "New application submitted",
      details: "Application ID: APP-2024-156, University: Harvard",
      user: "priya.dubey@email.com",
      source: "application_service"
    },
    {
      id: 5,
      timestamp: "2024-01-15 14:18:30",
      level: "error",
      category: "payment",
      message: "Payment processing failed",
      details: "Transaction ID: txn_xyz789, Amount: $150, Error: Card declined",
      user: "rahul.sharma@email.com",
      source: "payment_gateway"
    },
    {
      id: 6,
      timestamp: "2024-01-15 14:15:20",
      level: "success",
      category: "email",
      message: "Email notification sent successfully",
      details: "Template: welcome_email, Recipient: new.user@email.com",
      user: "system",
      source: "email_service"
    },
    {
      id: 7,
      timestamp: "2024-01-15 14:12:05",
      level: "warning",
      category: "database",
      message: "Slow query detected",
      details: "Query execution time: 5.2s, Table: applications",
      user: "system",
      source: "database"
    },
    {
      id: 8,
      timestamp: "2024-01-15 14:10:15",
      level: "info",
      category: "backup",
      message: "Database backup completed",
      details: "Backup size: 2.4GB, Duration: 45 minutes",
      user: "system",
      source: "backup_service"
    }
  ]

  const logStats = [
    { label: "Total Logs", value: "12,847", change: "+234", icon: FileText, color: "blue" },
    { label: "Error Logs", value: "89", change: "+12", icon: XCircle, color: "red" },
    { label: "Warning Logs", value: "156", change: "+23", icon: AlertTriangle, color: "yellow" },
    { label: "Success Logs", value: "11,602", change: "+199", icon: CheckCircle, color: "green" }
  ]

  const logCategories = [
    { category: "Authentication", count: 1247, percentage: 15.2 },
    { category: "User Activity", count: 3456, percentage: 42.1 },
    { category: "System", count: 892, percentage: 10.9 },
    { category: "Application", count: 1678, percentage: 20.4 },
    { category: "Payment", count: 567, percentage: 6.9 },
    { category: "Email", count: 234, percentage: 2.9 },
    { category: "Database", count: 123, percentage: 1.5 }
  ]

  const getLevelColor = (level) => {
    switch (level) {
      case 'error': return 'bg-red-100 text-red-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'info': return 'bg-blue-100 text-blue-800'
      case 'success': return 'bg-green-100 text-green-800'
      case 'debug': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getLevelIcon = (level) => {
    switch (level) {
      case 'error': return <XCircle className="w-4 h-4 text-red-600" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case 'info': return <Info className="w-4 h-4 text-blue-600" />
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />
      default: return <Info className="w-4 h-4 text-gray-600" />
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      authentication: 'bg-red-100 text-red-800',
      user_activity: 'bg-blue-100 text-blue-800',
      system: 'bg-purple-100 text-purple-800',
      application: 'bg-green-100 text-green-800',
      payment: 'bg-orange-100 text-orange-800',
      email: 'bg-indigo-100 text-indigo-800',
      database: 'bg-gray-100 text-gray-800',
      backup: 'bg-teal-100 text-teal-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">System Logs</h1>
            <p className="text-gray-600">Monitor system activities and troubleshoot issues</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Logs
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              View Live Logs
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {logStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} today
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Log Categories */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Log Categories Distribution</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {logCategories.map((cat, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm font-medium text-gray-900 mb-2">{cat.category}</div>
                  <div className="bg-blue-100 rounded-lg p-3 mb-2">
                    <div className="text-lg font-bold text-blue-800">{cat.count.toLocaleString()}</div>
                  </div>
                  <div className="text-xs text-gray-600">{cat.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                <option value="error">Error</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="debug">Debug</option>
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="authentication">Authentication</option>
                <option value="user_activity">User Activity</option>
                <option value="system">System</option>
                <option value="application">Application</option>
                <option value="payment">Payment</option>
                <option value="email">Email</option>
                <option value="database">Database</option>
              </select>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {systemLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{log.timestamp}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getLevelIcon(log.level)}
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(log.level)}`}>
                          {log.level}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(log.category)}`}>
                        {log.category.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{log.message}</div>
                        <div className="text-sm text-gray-500 mt-1">{log.details}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{log.user}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{log.source}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default SystemLogs

