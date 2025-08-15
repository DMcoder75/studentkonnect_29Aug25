import React, { useState } from 'react'
import AdminLayout from './AdminLayout'
import { DollarSign, TrendingUp, Users, Calendar, Download, Filter, Search, MoreVertical, Eye, FileText } from 'lucide-react'

const FinancialRevenue = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly')
  const [filterType, setFilterType] = useState('all')

  const revenueData = [
    {
      id: 1,
      source: "Counseling Services",
      amount: 45750,
      transactions: 305,
      period: "January 2024",
      growth: "+12.5%",
      type: "service"
    },
    {
      id: 2,
      source: "Application Fees",
      amount: 28900,
      transactions: 578,
      period: "January 2024",
      growth: "+8.3%",
      type: "fee"
    },
    {
      id: 3,
      source: "Premium Subscriptions",
      amount: 34200,
      transactions: 171,
      period: "January 2024",
      growth: "+15.7%",
      type: "subscription"
    },
    {
      id: 4,
      source: "Document Services",
      amount: 12400,
      transactions: 248,
      period: "January 2024",
      growth: "+6.2%",
      type: "service"
    },
    {
      id: 5,
      source: "Partnership Commissions",
      amount: 18650,
      transactions: 89,
      period: "January 2024",
      growth: "+22.1%",
      type: "commission"
    },
    {
      id: 6,
      source: "Course Recommendations",
      amount: 9800,
      transactions: 156,
      period: "January 2024",
      growth: "+4.8%",
      type: "commission"
    }
  ]

  const revenueStats = [
    { label: "Total Revenue", value: "$149,700", change: "+18.2%", icon: DollarSign, color: "green" },
    { label: "Monthly Growth", value: "+12.5%", change: "+2.1%", icon: TrendingUp, color: "blue" },
    { label: "Active Customers", value: "1,547", change: "+156", icon: Users, color: "purple" },
    { label: "Avg Transaction", value: "$97.50", change: "+$8.20", icon: Calendar, color: "orange" }
  ]

  const monthlyTrends = [
    { month: "Jul 2023", revenue: 98500, growth: "+5.2%" },
    { month: "Aug 2023", revenue: 105200, growth: "+6.8%" },
    { month: "Sep 2023", revenue: 112800, growth: "+7.2%" },
    { month: "Oct 2023", revenue: 118900, growth: "+5.4%" },
    { month: "Nov 2023", revenue: 125600, growth: "+5.6%" },
    { month: "Dec 2023", revenue: 134200, growth: "+6.8%" },
    { month: "Jan 2024", revenue: 149700, growth: "+11.5%" }
  ]

  const getTypeColor = (type) => {
    switch (type) {
      case 'service': return 'bg-blue-100 text-blue-800'
      case 'fee': return 'bg-green-100 text-green-800'
      case 'subscription': return 'bg-purple-100 text-purple-800'
      case 'commission': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
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
            <h1 className="text-2xl font-bold text-gray-900">Revenue Management</h1>
            <p className="text-gray-600">Track and analyze revenue streams and financial performance</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Generate Report
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {revenueStats.map((stat, index) => (
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

        {/* Revenue Trends Chart */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Revenue Trends</h2>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {monthlyTrends.map((trend, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm text-gray-600 mb-2">{trend.month}</div>
                  <div className="bg-blue-100 rounded-lg p-4 mb-2">
                    <div className="text-lg font-bold text-blue-800">{formatCurrency(trend.revenue)}</div>
                  </div>
                  <div className={`text-xs ${trend.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {trend.growth}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Sources */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search revenue sources..."
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
                <option value="service">Services</option>
                <option value="fee">Fees</option>
                <option value="subscription">Subscriptions</option>
                <option value="commission">Commissions</option>
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
                    Revenue Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transactions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Growth
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {revenueData.map((revenue) => (
                  <tr key={revenue.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-500 mr-3" />
                        <div className="text-sm font-medium text-gray-900">{revenue.source}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-green-600">{formatCurrency(revenue.amount)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{revenue.transactions.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(revenue.type)}`}>
                        {revenue.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm font-medium text-green-600">{revenue.growth}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{revenue.period}</span>
                      </div>
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

export default FinancialRevenue

