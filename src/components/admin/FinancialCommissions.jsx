import React, { useState } from 'react'
import AdminLayout from './AdminLayout'
import { Percent, Users, DollarSign, Calendar, Download, Filter, Search, MoreVertical, Eye, CheckCircle, Clock } from 'lucide-react'

const FinancialCommissions = () => {
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [filterPartner, setFilterPartner] = useState('all')

  const commissionData = [
    {
      id: 1,
      partner: "University of Melbourne",
      counselor: "Dr. Sarah Chen",
      student: "Priya Dubey",
      applicationId: "APP-2024-001",
      commissionRate: 15,
      applicationFee: 2500,
      commissionAmount: 375,
      status: "paid",
      dateEarned: "2024-01-15",
      datePaid: "2024-01-20",
      type: "application"
    },
    {
      id: 2,
      partner: "Harvard University",
      counselor: "Michael Kumar",
      student: "Rahul Sharma",
      applicationId: "APP-2024-002",
      commissionRate: 12,
      applicationFee: 3000,
      commissionAmount: 360,
      status: "pending",
      dateEarned: "2024-01-14",
      datePaid: null,
      type: "application"
    },
    {
      id: 3,
      partner: "Oxford University",
      counselor: "Dr. Emma Wilson",
      student: "Anita Patel",
      applicationId: "APP-2024-003",
      commissionRate: 18,
      applicationFee: 2800,
      commissionAmount: 504,
      status: "paid",
      dateEarned: "2024-01-13",
      datePaid: "2024-01-18",
      type: "application"
    },
    {
      id: 4,
      partner: "University of Toronto",
      counselor: "Dr. Sarah Chen",
      student: "Vikram Singh",
      applicationId: "APP-2024-004",
      commissionRate: 14,
      applicationFee: 2200,
      commissionAmount: 308,
      status: "processing",
      dateEarned: "2024-01-12",
      datePaid: null,
      type: "application"
    },
    {
      id: 5,
      partner: "ETH Zurich",
      counselor: "Michael Kumar",
      student: "Neha Gupta",
      applicationId: "APP-2024-005",
      commissionRate: 16,
      applicationFee: 1800,
      commissionAmount: 288,
      status: "paid",
      dateEarned: "2024-01-11",
      datePaid: "2024-01-16",
      type: "application"
    },
    {
      id: 6,
      partner: "NUS Singapore",
      counselor: "Dr. Emma Wilson",
      student: "Arjun Mehta",
      applicationId: "APP-2024-006",
      commissionRate: 13,
      applicationFee: 2600,
      commissionAmount: 338,
      status: "pending",
      dateEarned: "2024-01-10",
      datePaid: null,
      type: "application"
    }
  ]

  const commissionStats = [
    { label: "Total Commissions", value: "$2,173", change: "+24.5%", icon: DollarSign, color: "green" },
    { label: "Commission Rate", value: "14.8%", change: "+1.2%", icon: Percent, color: "blue" },
    { label: "Active Partners", value: "12", change: "+2", icon: Users, color: "purple" },
    { label: "Pending Payments", value: "$698", change: "-$156", icon: Clock, color: "orange" }
  ]

  const partnerSummary = [
    { partner: "University of Melbourne", applications: 45, totalCommissions: 6750, avgRate: 15 },
    { partner: "Harvard University", applications: 32, totalCommissions: 5760, avgRate: 12 },
    { partner: "Oxford University", applications: 28, totalCommissions: 5040, avgRate: 18 },
    { partner: "University of Toronto", applications: 38, totalCommissions: 5320, avgRate: 14 },
    { partner: "ETH Zurich", applications: 22, totalCommissions: 3520, avgRate: 16 }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />
      case 'processing': return <Clock className="w-4 h-4 text-blue-600" />
      default: return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Commission Management</h1>
            <p className="text-gray-600">Track and manage partner commissions and payments</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Process Payments
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {commissionStats.map((stat, index) => (
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

        {/* Partner Summary */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Top Partners by Commission</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {partnerSummary.map((partner, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 mb-2">{partner.partner}</div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-600">Applications: {partner.applications}</div>
                    <div className="text-xs text-gray-600">Total: {formatCurrency(partner.totalCommissions)}</div>
                    <div className="text-xs text-gray-600">Avg Rate: {partner.avgRate}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Commission Transactions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search commissions..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="failed">Failed</option>
              </select>
              <select
                value={filterPartner}
                onChange={(e) => setFilterPartner(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Partners</option>
                <option value="melbourne">University of Melbourne</option>
                <option value="harvard">Harvard University</option>
                <option value="oxford">Oxford University</option>
                <option value="toronto">University of Toronto</option>
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
                    Application
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Partner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Counselor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commission
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Earned
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {commissionData.map((commission) => (
                  <tr key={commission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{commission.applicationId}</div>
                        <div className="text-sm text-gray-500">Fee: {formatCurrency(commission.applicationFee)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{commission.partner}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{commission.counselor}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{commission.student}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-green-600">{formatCurrency(commission.commissionAmount)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Percent className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{commission.commissionRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(commission.status)}
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(commission.status)}`}>
                          {commission.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{commission.dateEarned}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <DollarSign className="w-4 h-4" />
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

export default FinancialCommissions

