import React, { useState } from 'react'
import AdminLayout from './AdminLayout'
import { MessageSquare, Send, Users, Clock, Search, Filter, MoreVertical, Eye, Reply, Archive, Star } from 'lucide-react'

const CommunicationsMessages = () => {
  const [selectedMessages, setSelectedMessages] = useState([])
  const [filterStatus, setFilterStatus] = useState('all')

  const messages = [
    {
      id: 1,
      from: "sarah.chen@email.com",
      fromName: "Sarah Chen",
      subject: "Question about University Application Process",
      preview: "Hi, I need help understanding the application requirements for...",
      received: "2024-01-15 14:30",
      status: "unread",
      priority: "high",
      category: "support",
      hasAttachment: false
    },
    {
      id: 2,
      from: "michael.kumar@email.com",
      fromName: "Michael Kumar",
      subject: "Scholarship Application Assistance",
      preview: "Could you please guide me through the scholarship application...",
      received: "2024-01-15 11:20",
      status: "read",
      priority: "medium",
      category: "scholarship",
      hasAttachment: true
    },
    {
      id: 3,
      from: "emma.wilson@email.com",
      fromName: "Emma Wilson",
      subject: "Counselor Session Rescheduling",
      preview: "I need to reschedule my upcoming counseling session due to...",
      received: "2024-01-14 16:45",
      status: "replied",
      priority: "medium",
      category: "appointment",
      hasAttachment: false
    },
    {
      id: 4,
      from: "admin@university.edu",
      fromName: "University Admin",
      subject: "Document Verification Required",
      preview: "Your submitted documents require additional verification...",
      received: "2024-01-14 09:15",
      status: "read",
      priority: "high",
      category: "document",
      hasAttachment: true
    },
    {
      id: 5,
      from: "support@yourunipathway.com",
      fromName: "Support Team",
      subject: "Technical Issue Report",
      preview: "User reported login issues with the mobile application...",
      received: "2024-01-13 13:30",
      status: "in_progress",
      priority: "high",
      category: "technical",
      hasAttachment: false
    },
    {
      id: 6,
      from: "priya.dubey@email.com",
      fromName: "Priya Dubey",
      subject: "Course Selection Guidance",
      preview: "I'm confused about which courses to select for my major...",
      received: "2024-01-12 10:45",
      status: "read",
      priority: "low",
      category: "guidance",
      hasAttachment: false
    }
  ]

  const messageStats = [
    { label: "Total Messages", value: "1,247", change: "+23.1%", icon: MessageSquare, color: "blue" },
    { label: "Unread Messages", value: "89", change: "+12", icon: Eye, color: "orange" },
    { label: "Response Rate", value: "94.2%", change: "+2.8%", icon: Reply, color: "green" },
    { label: "Avg Response Time", value: "2.4h", change: "-0.6h", icon: Clock, color: "purple" }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'unread': return 'bg-red-100 text-red-800'
      case 'read': return 'bg-blue-100 text-blue-800'
      case 'replied': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
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

  const getCategoryColor = (category) => {
    switch (category) {
      case 'support': return 'bg-blue-100 text-blue-800'
      case 'scholarship': return 'bg-green-100 text-green-800'
      case 'appointment': return 'bg-purple-100 text-purple-800'
      case 'document': return 'bg-orange-100 text-orange-800'
      case 'technical': return 'bg-red-100 text-red-800'
      case 'guidance': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-600">Manage incoming messages and support requests</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Send className="w-4 h-4" />
            Compose Message
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {messageStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith('+') || stat.change.startsWith('-') ? 
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600' : 'text-gray-600'}`}>
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
                    placeholder="Search messages..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
                <option value="in_progress">In Progress</option>
                <option value="archived">Archived</option>
              </select>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          {/* Messages Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    From
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Received
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
                {messages.map((message) => (
                  <tr key={message.id} className={`hover:bg-gray-50 ${message.status === 'unread' ? 'bg-blue-50' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className={`text-sm font-medium ${message.status === 'unread' ? 'font-bold' : ''} text-gray-900`}>
                            {message.fromName}
                          </div>
                          <div className="text-sm text-gray-500">{message.from}</div>
                        </div>
                        {message.hasAttachment && (
                          <div className="ml-2">
                            <span className="text-gray-400">📎</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className={`text-sm ${message.status === 'unread' ? 'font-bold' : 'font-medium'} text-gray-900`}>
                          {message.subject}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">{message.preview}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(message.category)}`}>
                        {message.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(message.priority)}`}>
                        {message.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{message.received}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                        {message.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Reply className="w-4 h-4" />
                        </button>
                        <button className="text-yellow-600 hover:text-yellow-900">
                          <Star className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Archive className="w-4 h-4" />
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

export default CommunicationsMessages

