import React, { useState } from 'react'
import AdminLayout from './AdminLayout'
import { Mail, Send, Users, Calendar, Filter, Search, MoreVertical, Eye, Trash2, Archive } from 'lucide-react'

const CommunicationsEmail = () => {
  const [selectedEmails, setSelectedEmails] = useState([])
  const [filterStatus, setFilterStatus] = useState('all')

  const emailCampaigns = [
    {
      id: 1,
      subject: "Welcome to YourUniPathway - Start Your Journey",
      recipients: 2847,
      sent: "2024-01-15",
      status: "sent",
      openRate: "68.5%",
      clickRate: "12.3%",
      type: "welcome"
    },
    {
      id: 2,
      subject: "New Scholarship Opportunities Available",
      recipients: 1523,
      sent: "2024-01-14",
      status: "sent",
      openRate: "72.1%",
      clickRate: "18.7%",
      type: "scholarship"
    },
    {
      id: 3,
      subject: "University Application Deadlines Reminder",
      recipients: 956,
      sent: "2024-01-13",
      status: "sent",
      openRate: "85.2%",
      clickRate: "25.4%",
      type: "reminder"
    },
    {
      id: 4,
      subject: "Weekly Newsletter - Education Updates",
      recipients: 3241,
      sent: "2024-01-12",
      status: "sent",
      openRate: "45.8%",
      clickRate: "8.9%",
      type: "newsletter"
    },
    {
      id: 5,
      subject: "Counselor Session Confirmation",
      recipients: 89,
      sent: "2024-01-11",
      status: "sent",
      openRate: "92.1%",
      clickRate: "67.4%",
      type: "confirmation"
    },
    {
      id: 6,
      subject: "Application Status Update",
      recipients: 234,
      sent: "2024-01-10",
      status: "sent",
      openRate: "88.9%",
      clickRate: "45.2%",
      type: "update"
    }
  ]

  const emailStats = [
    { label: "Total Emails Sent", value: "8,890", change: "+12.5%", icon: Mail, color: "blue" },
    { label: "Average Open Rate", value: "72.1%", change: "+5.2%", icon: Eye, color: "green" },
    { label: "Average Click Rate", value: "21.3%", change: "+8.1%", icon: Send, color: "purple" },
    { label: "Active Subscribers", value: "3,247", change: "+156", icon: Users, color: "orange" }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'welcome': return 'bg-blue-100 text-blue-800'
      case 'scholarship': return 'bg-green-100 text-green-800'
      case 'reminder': return 'bg-orange-100 text-orange-800'
      case 'newsletter': return 'bg-purple-100 text-purple-800'
      case 'confirmation': return 'bg-teal-100 text-teal-800'
      case 'update': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Email Communications</h1>
            <p className="text-gray-600">Manage email campaigns and communications</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Send className="w-4 h-4" />
            Create Campaign
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {emailStats.map((stat, index) => (
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
                    placeholder="Search email campaigns..."
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
                <option value="sent">Sent</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
              </select>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          {/* Email Campaigns Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recipients
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sent Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Open Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Click Rate
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
                {emailCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{campaign.subject}</div>
                        <div className="flex gap-2 mt-1">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(campaign.type)}`}>
                            {campaign.type}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{campaign.recipients.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{campaign.sent}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-green-600">{campaign.openRate}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-blue-600">{campaign.clickRate}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Archive className="w-4 h-4" />
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

export default CommunicationsEmail

