import React, { useState } from 'react'
import AdminLayout from './AdminLayout'
import { CreditCard, DollarSign, Users, TrendingUp, Download, Filter, Search, MoreVertical, Eye, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react'

const FinancialPayments = () => {
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [filterMethod, setFilterMethod] = useState('all')

  const paymentData = [
    {
      id: 1,
      transactionId: "TXN-2024-001",
      student: "Priya Dubey",
      service: "Counseling Session",
      amount: 150,
      method: "credit_card",
      status: "completed",
      date: "2024-01-15 14:30",
      fee: 4.50,
      netAmount: 145.50,
      gateway: "Stripe"
    },
    {
      id: 2,
      transactionId: "TXN-2024-002",
      student: "Rahul Sharma",
      service: "Application Fee",
      amount: 75,
      method: "paypal",
      status: "completed",
      date: "2024-01-15 11:20",
      fee: 2.25,
      netAmount: 72.75,
      gateway: "PayPal"
    },
    {
      id: 3,
      transactionId: "TXN-2024-003",
      student: "Anita Patel",
      service: "Premium Subscription",
      amount: 299,
      method: "bank_transfer",
      status: "pending",
      date: "2024-01-14 16:45",
      fee: 5.00,
      netAmount: 294.00,
      gateway: "Bank"
    },
    {
      id: 4,
      transactionId: "TXN-2024-004",
      student: "Vikram Singh",
      service: "Document Service",
      amount: 50,
      method: "credit_card",
      status: "failed",
      date: "2024-01-14 09:15",
      fee: 1.50,
      netAmount: 48.50,
      gateway: "Stripe"
    },
    {
      id: 5,
      transactionId: "TXN-2024-005",
      student: "Neha Gupta",
      service: "Course Recommendation",
      amount: 25,
      method: "digital_wallet",
      status: "completed",
      date: "2024-01-13 13:30",
      fee: 0.75,
      netAmount: 24.25,
      gateway: "Apple Pay"
    },
    {
      id: 6,
      transactionId: "TXN-2024-006",
      student: "Arjun Mehta",
      service: "Counseling Session",
      amount: 150,
      method: "credit_card",
      status: "refunded",
      date: "2024-01-12 10:45",
      fee: 4.50,
      netAmount: 145.50,
      gateway: "Stripe"
    }
  ]

  const paymentStats = [
    { label: "Total Payments", value: "$12,450", change: "+18.2%", icon: DollarSign, color: "green" },
    { label: "Success Rate", value: "96.8%", change: "+2.1%", icon: CheckCircle, color: "blue" },
    { label: "Processing Fees", value: "$187", change: "+$23", icon: CreditCard, color: "purple" },
    { label: "Active Customers", value: "847", change: "+67", icon: Users, color: "orange" }
  ]

  const paymentMethods = [
    { method: "Credit Card", transactions: 156, amount: 8750, percentage: 70.3 },
    { method: "PayPal", transactions: 89, amount: 3200, percentage: 25.7 },
    { method: "Bank Transfer", transactions: 23, amount: 1200, percentage: 9.6 },
    { method: "Digital Wallet", transactions: 45, amount: 890, percentage: 7.1 }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'refunded': return 'bg-gray-100 text-gray-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'pending': return <RefreshCw className="w-4 h-4 text-yellow-600" />
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-600" />
      case 'refunded': return <RefreshCw className="w-4 h-4 text-gray-600" />
      case 'processing': return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
      default: return <RefreshCw className="w-4 h-4 text-gray-600" />
    }
  }

  const getMethodIcon = (method) => {
    switch (method) {
      case 'credit_card': return '💳'
      case 'paypal': return '🅿️'
      case 'bank_transfer': return '🏦'
      case 'digital_wallet': return '📱'
      default: return '💳'
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
            <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
            <p className="text-gray-600">Monitor and manage payment transactions and processing</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Sync Payments
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {paymentStats.map((stat, index) => (
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

        {/* Payment Methods Summary */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Payment Methods Distribution</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {paymentMethods.map((method, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-gray-900">{method.method}</div>
                    <div className="text-lg">{getMethodIcon(method.method.toLowerCase().replace(' ', '_'))}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-600">Transactions: {method.transactions}</div>
                    <div className="text-xs text-gray-600">Amount: {formatCurrency(method.amount)}</div>
                    <div className="text-xs text-gray-600">Share: {method.percentage}%</div>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${method.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Transactions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search payments..."
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
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
                <option value="processing">Processing</option>
              </select>
              <select
                value={filterMethod}
                onChange={(e) => setFilterMethod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Methods</option>
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="digital_wallet">Digital Wallet</option>
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
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gateway
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentData.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{payment.transactionId}</div>
                        <div className="text-sm text-gray-500">Fee: {formatCurrency(payment.fee)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{payment.student}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{payment.service}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-bold text-green-600">{formatCurrency(payment.amount)}</div>
                        <div className="text-sm text-gray-500">Net: {formatCurrency(payment.netAmount)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{getMethodIcon(payment.method)}</span>
                        <span className="text-sm text-gray-900 capitalize">{payment.method.replace('_', ' ')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(payment.status)}
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{payment.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{payment.gateway}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <RefreshCw className="w-4 h-4" />
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

export default FinancialPayments

