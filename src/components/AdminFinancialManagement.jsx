import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import AdminSidebar from './AdminSidebar';
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  FileText, 
  Search, 
  Filter, 
  Download,
  Plus,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  User,
  Calendar,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const AdminFinancialManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('revenue');
  const location = useLocation();

  // Sample revenue data
  const [revenueData] = useState([
    {
      id: 1,
      source: 'Student Subscriptions',
      amount: 45750,
      period: 'January 2024',
      growth: 12.5,
      transactions: 156,
      avgPerTransaction: 293.27,
      status: 'Completed'
    },
    {
      id: 2,
      source: 'Counselor Commissions',
      amount: 28900,
      period: 'January 2024',
      growth: 8.3,
      transactions: 89,
      avgPerTransaction: 324.72,
      status: 'Completed'
    },
    {
      id: 3,
      source: 'Premium Features',
      amount: 15600,
      period: 'January 2024',
      growth: 15.7,
      transactions: 78,
      avgPerTransaction: 200.00,
      status: 'Completed'
    }
  ]);

  // Sample commission data
  const [commissionData] = useState([
    {
      id: 1,
      counselor: 'Dr. Sarah Chen',
      studentCount: 23,
      totalRevenue: 6900,
      commissionRate: 15,
      commissionAmount: 1035,
      status: 'Pending',
      period: 'January 2024',
      lastPayment: '2023-12-31'
    },
    {
      id: 2,
      counselor: 'Michael Kumar',
      studentCount: 18,
      totalRevenue: 5400,
      commissionRate: 12,
      commissionAmount: 648,
      status: 'Paid',
      period: 'January 2024',
      lastPayment: '2024-01-15'
    },
    {
      id: 3,
      counselor: 'Emma Wilson',
      studentCount: 15,
      totalRevenue: 4500,
      commissionRate: 18,
      commissionAmount: 810,
      status: 'Processing',
      period: 'January 2024',
      lastPayment: '2023-12-31'
    }
  ]);

  // Sample payment data
  const [paymentData] = useState([
    {
      id: 1,
      student: 'Emily Chen',
      amount: 299,
      service: 'Premium Pathway Analysis',
      method: 'Credit Card',
      status: 'Completed',
      transactionId: 'TXN-2024-001',
      date: '2024-01-15 10:30:00',
      counselor: 'Dr. Sarah Chen'
    },
    {
      id: 2,
      student: 'James Wilson',
      amount: 199,
      service: 'SOP Review Service',
      method: 'PayPal',
      status: 'Completed',
      transactionId: 'TXN-2024-002',
      date: '2024-01-15 09:15:00',
      counselor: 'Michael Kumar'
    },
    {
      id: 3,
      student: 'Sophie Martinez',
      amount: 399,
      service: 'Complete Application Package',
      method: 'Bank Transfer',
      status: 'Pending',
      transactionId: 'TXN-2024-003',
      date: '2024-01-15 08:45:00',
      counselor: 'Emma Wilson'
    }
  ]);

  // Sample financial reports data
  const [reportData] = useState([
    {
      id: 1,
      name: 'Monthly Revenue Report',
      type: 'Revenue Analysis',
      period: 'January 2024',
      totalRevenue: 125750,
      totalExpenses: 45200,
      netProfit: 80550,
      profitMargin: 64.1,
      generatedAt: '2024-01-31',
      status: 'Available'
    },
    {
      id: 2,
      name: 'Commission Summary',
      type: 'Commission Report',
      period: 'January 2024',
      totalCommissions: 12450,
      paidCommissions: 8900,
      pendingCommissions: 3550,
      counselorCount: 89,
      generatedAt: '2024-01-31',
      status: 'Available'
    }
  ]);

  // Detect current route for tab selection
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/commissions')) {
      setActiveTab('commissions');
    } else if (path.includes('/payments')) {
      setActiveTab('payments');
    } else if (path.includes('/reports')) {
      setActiveTab('reports');
    } else {
      setActiveTab('revenue');
    }
  }, [location]);

  const handleRefresh = () => {
    alert('Financial data refreshed successfully!');
    console.log('Refreshing financial data...');
  };

  const handleExport = () => {
    alert('Financial data exported successfully!');
    console.log('Exporting financial data...');
  };

  const handlePayCommission = (id) => {
    alert(`Commission payment processed successfully!`);
    console.log('Processing commission payment:', id);
  };

  const handleGenerateReport = () => {
    alert('Financial report generation started!');
    console.log('Generating financial report...');
  };

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'available': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

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
              <h1 className="text-2xl font-bold text-gray-900">Financial Management</h1>
              <p className="text-gray-600">Monitor revenue, commissions, payments, and financial reports</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleRefresh} variant="outline" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Refresh
              </Button>
              <Button onClick={handleGenerateReport} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Generate Report
              </Button>
              <Button onClick={handleExport} variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          {/* Financial Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(125750)}</p>
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <ArrowUpRight className="h-4 w-4" />
                      {formatPercentage(12.5)} vs last month
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Commissions</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(3550)}</p>
                    <p className="text-sm text-yellow-600 flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      5 counselors
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Transactions</p>
                    <p className="text-2xl font-bold text-gray-900">323</p>
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <ArrowUpRight className="h-4 w-4" />
                      {formatPercentage(8.3)} vs last month
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Profit Margin</p>
                    <p className="text-2xl font-bold text-gray-900">64.1%</p>
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <ArrowUpRight className="h-4 w-4" />
                      {formatPercentage(2.1)} vs last month
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search financial records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          {/* Financial Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="revenue" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Revenue ({revenueData.length})
              </TabsTrigger>
              <TabsTrigger value="commissions" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Commissions ({commissionData.length})
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payments ({paymentData.length})
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Reports ({reportData.length})
              </TabsTrigger>
            </TabsList>

            {/* Revenue */}
            <TabsContent value="revenue" className="space-y-4">
              <div className="grid gap-4">
                {revenueData.map((revenue) => (
                  <Card key={revenue.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{revenue.source}</h3>
                            <Badge className={getStatusBadgeColor(revenue.status)}>
                              {revenue.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Amount:</span>
                              <p className="font-medium text-lg">{formatCurrency(revenue.amount)}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Growth:</span>
                              <p className={`font-medium ${revenue.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {formatPercentage(revenue.growth)}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Transactions:</span>
                              <p className="font-medium">{revenue.transactions}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Avg per Transaction:</span>
                              <p className="font-medium">{formatCurrency(revenue.avgPerTransaction)}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">Period: {revenue.period}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Eye className="h-4 w-4" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Commissions */}
            <TabsContent value="commissions" className="space-y-4">
              <div className="grid gap-4">
                {commissionData.map((commission) => (
                  <Card key={commission.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{commission.counselor}</h3>
                            <Badge className={getStatusBadgeColor(commission.status)}>
                              {commission.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Students:</span>
                              <p className="font-medium">{commission.studentCount}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Revenue Generated:</span>
                              <p className="font-medium">{formatCurrency(commission.totalRevenue)}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Commission Rate:</span>
                              <p className="font-medium">{commission.commissionRate}%</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Commission Amount:</span>
                              <p className="font-medium text-lg">{formatCurrency(commission.commissionAmount)}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            Period: {commission.period} | Last Payment: {commission.lastPayment}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {commission.status === 'Pending' && (
                            <Button
                              size="sm"
                              onClick={() => handlePayCommission(commission.id)}
                              className="flex items-center gap-1"
                            >
                              <CheckCircle className="h-4 w-4" />
                              Pay Commission
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Eye className="h-4 w-4" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Payments */}
            <TabsContent value="payments" className="space-y-4">
              <div className="grid gap-4">
                {paymentData.map((payment) => (
                  <Card key={payment.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{payment.student}</h3>
                            <Badge className={getStatusBadgeColor(payment.status)}>
                              {payment.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-2">{payment.service}</p>
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Amount:</span>
                              <p className="font-medium text-lg">{formatCurrency(payment.amount)}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Method:</span>
                              <p className="font-medium">{payment.method}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Counselor:</span>
                              <p className="font-medium">{payment.counselor}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Transaction ID:</span>
                              <p className="font-medium">{payment.transactionId}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">Date: {payment.date}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Eye className="h-4 w-4" />
                            View Receipt
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Financial Reports */}
            <TabsContent value="reports" className="space-y-4">
              <div className="grid gap-4">
                {reportData.map((report) => (
                  <Card key={report.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{report.name}</h3>
                            <Badge className={getStatusBadgeColor(report.status)}>
                              {report.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-2">{report.type} - {report.period}</p>
                          {report.totalRevenue && (
                            <div className="grid grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Total Revenue:</span>
                                <p className="font-medium">{formatCurrency(report.totalRevenue)}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Total Expenses:</span>
                                <p className="font-medium">{formatCurrency(report.totalExpenses)}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Net Profit:</span>
                                <p className="font-medium text-green-600">{formatCurrency(report.netProfit)}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Profit Margin:</span>
                                <p className="font-medium">{report.profitMargin}%</p>
                              </div>
                            </div>
                          )}
                          {report.totalCommissions && (
                            <div className="grid grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Total Commissions:</span>
                                <p className="font-medium">{formatCurrency(report.totalCommissions)}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Paid:</span>
                                <p className="font-medium text-green-600">{formatCurrency(report.paidCommissions)}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Pending:</span>
                                <p className="font-medium text-yellow-600">{formatCurrency(report.pendingCommissions)}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Counselors:</span>
                                <p className="font-medium">{report.counselorCount}</p>
                              </div>
                            </div>
                          )}
                          <p className="text-sm text-gray-500 mt-2">Generated: {report.generatedAt}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminFinancialManagement;

