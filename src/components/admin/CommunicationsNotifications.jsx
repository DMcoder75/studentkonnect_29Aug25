import React, { useState } from 'react'
import AdminLayout from './AdminLayout'
import { Bell, Send, Users, Clock, Settings, Search, Filter, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react'

const CommunicationsNotifications = () => {
  const [selectedNotifications, setSelectedNotifications] = useState([])
  const [filterType, setFilterType] = useState('all')

  const notifications = [
    {
      id: 1,
      title: "Application Deadline Reminder",
      message: "Your university application deadline is approaching in 3 days",
      type: "reminder",
      recipients: 456,
      sent: "2024-01-15 14:30",
      status: "sent",
      priority: "high",
      channel: "push"
    },
    {
      id: 2,
      title: "New Scholarship Available",
      message: "A new scholarship opportunity matching your profile is now available",
      type: "scholarship",
      recipients: 1234,
      sent: "2024-01-15 10:15",
      status: "sent",
      priority: "medium",
      channel: "email"
    },
    {
      id: 3,
      title: "Counselor Session Scheduled",
      message: "Your counseling session with Dr. Sarah Chen is confirmed for tomorrow",
      type: "appointment",
      recipients: 23,
      sent: "2024-01-14 16:45",
      status: "sent",
      priority: "high",
      channel: "sms"
    },
    {
      id: 4,
      title: "Document Upload Required",
      message: "Please upload your academic transcripts to complete your application",
      type: "document",
      recipients: 89,
      sent: "2024-01-14 09:20",
      status: "sent",
      priority: "medium",
      channel: "push"
    },
    {
      id: 5,
      title: "Application Status Update",
      message: "Your application to University of Melbourne has been reviewed",
      type: "status",
      recipients: 67,
      sent: "2024-01-13 11:30",
      status: "sent",
      priority: "high",
      channel: "email"
    },
    {
      id: 6,
      title: "Weekly Progress Report",
      message: "Your weekly application progress summary is ready",
      type: "report",
      recipients: 2847,
      sent: "2024-01-12 08:00",
      status: "sent",
      priority: "low",
      channel: "email"
    }
  ]

  const notificationStats = [
    { label: "Total Notifications", value: "4,716", change: "+18.2%", icon: Bell, color: "blue" },
    { label: "Delivery Rate", value: "98.7%", change: "+2.1%", icon: Send, color: "green" },
    { label: "Open Rate", value: "76.4%", change: "+5.8%", icon: Eye, color: "purple" },
    { label: "Active Recipients", value: "3,247", change: "+156", icon: Users, color: "orange" }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'reminder': return 'bg-orange-100 text-orange-800'
      case 'scholarship': return 'bg-green-100 text-green-800'
      case 'appointment': return 'bg-blue-100 text-blue-800'
      case 'document': return 'bg-purple-100 text-purple-800'
      case 'status': return 'bg-indigo-100 text-indigo-800'
      case 'report': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'email': return '📧'
      case 'sms': return '📱'
      case 'push': return '🔔'
      default: return '📧'
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600">Manage push notifications and alerts</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Create Notification
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {notificationStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} vs last month
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="reminder">Reminders</option>
                <option value="scholarship">Scholarships</option>
                <option value="appointment">Appointments</option>
                <option value="document">Documents</option>
                <option value="status">Status Updates</option>
                <option value="report">Reports</option>
              </select>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          {/* Notifications Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notification
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recipients
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Channel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <tr key={notification.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{notification.title}</div>
                        <div className="text-sm text-gray-500 mt-1">{notification.message}</div>
                        <div className="flex gap-2 mt-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                            {notification.type}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{notification.recipients.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{getChannelIcon(notification.channel)}</span>
                        <span className="text-sm text-gray-900 capitalize">{notification.channel}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                        {notification.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{notification.sent}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(notification.status)}`}>
                        {notification.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
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

export default CommunicationsNotifications

