import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAdminAuth } from '../contexts/AdminAuthContext'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Award,
  Users,
  DollarSign,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  Star,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Building,
  GraduationCap,
  FileText,
  Target
} from 'lucide-react'
import AdminSidebar from './AdminSidebar'

export default function AdminScholarshipManagement() {
  const { adminUser, hasPermission } = useAdminAuth()
  const location = useLocation()
  const [selectedTab, setSelectedTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isLoading, setIsLoading] = useState(false)

  // Detect current route and set appropriate tab
  useEffect(() => {
    const path = location.pathname
    if (path.includes('/new')) {
      setSelectedTab('new')
    } else if (path.includes('/applications')) {
      setSelectedTab('applications')
    } else if (path.includes('/providers')) {
      setSelectedTab('providers')
    } else if (path.includes('/pending')) {
      setSelectedTab('pending')
    } else {
      setSelectedTab('all')
    }
  }, [location.pathname])

  // Mock scholarship data - replace with real API calls
  const [scholarships, setScholarships] = useState([
    {
      id: 1,
      name: 'Excellence in Engineering Scholarship',
      provider: 'University of Sydney',
      amount: 25000,
      currency: 'AUD',
      type: 'Merit-based',
      deadline: '2025-03-15',
      status: 'active',
      applicants: 156,
      awarded: 12,
      category: 'Engineering',
      duration: '4 years',
      renewable: true,
      requirements: ['GPA 3.5+', 'Engineering program', 'Australian citizen'],
      description: 'Supporting outstanding engineering students with financial assistance.',
      contactEmail: 'scholarships@sydney.edu.au',
      lastUpdated: '2025-01-15'
    },
    {
      id: 2,
      name: 'Future Leaders in Business',
      provider: 'Melbourne Business School',
      amount: 15000,
      currency: 'AUD',
      type: 'Leadership-based',
      deadline: '2025-04-30',
      status: 'active',
      applicants: 89,
      awarded: 8,
      category: 'Business',
      duration: '2 years',
      renewable: true,
      requirements: ['Leadership experience', 'Business program', 'Essay required'],
      description: 'Developing the next generation of business leaders.',
      contactEmail: 'mbs-scholarships@unimelb.edu.au',
      lastUpdated: '2025-01-10'
    },
    {
      id: 3,
      name: 'Medical Research Innovation Grant',
      provider: 'Australian Medical Association',
      amount: 30000,
      currency: 'AUD',
      type: 'Research-based',
      deadline: '2025-02-28',
      status: 'pending',
      applicants: 45,
      awarded: 0,
      category: 'Medicine',
      duration: '3 years',
      renewable: false,
      requirements: ['Medical program', 'Research proposal', 'Faculty recommendation'],
      description: 'Supporting innovative medical research by students.',
      contactEmail: 'research@ama.com.au',
      lastUpdated: '2025-01-20'
    },
    {
      id: 4,
      name: 'Indigenous Student Support',
      provider: 'Australian Government',
      amount: 20000,
      currency: 'AUD',
      type: 'Need-based',
      deadline: '2025-06-01',
      status: 'active',
      applicants: 234,
      awarded: 45,
      category: 'General',
      duration: '4 years',
      renewable: true,
      requirements: ['Indigenous heritage', 'Financial need', 'Academic merit'],
      description: 'Supporting Indigenous students in higher education.',
      contactEmail: 'indigenous.support@education.gov.au',
      lastUpdated: '2025-01-05'
    },
    {
      id: 5,
      name: 'International Excellence Award',
      provider: 'UNSW Sydney',
      amount: 40000,
      currency: 'AUD',
      type: 'Merit-based',
      deadline: '2025-01-31',
      status: 'expired',
      applicants: 312,
      awarded: 25,
      category: 'International',
      duration: '3 years',
      renewable: true,
      requirements: ['International student', 'GPA 3.8+', 'English proficiency'],
      description: 'Attracting top international talent to UNSW.',
      contactEmail: 'international@unsw.edu.au',
      lastUpdated: '2024-12-15'
    }
  ])

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'expired':
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  const getTypeBadge = (type) => {
    switch (type) {
      case 'Merit-based':
        return <Badge className="bg-blue-100 text-blue-800">Merit</Badge>
      case 'Need-based':
        return <Badge className="bg-purple-100 text-purple-800">Need</Badge>
      case 'Leadership-based':
        return <Badge className="bg-orange-100 text-orange-800">Leadership</Badge>
      case 'Research-based':
        return <Badge className="bg-teal-100 text-teal-800">Research</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{type}</Badge>
    }
  }

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || scholarship.status === filterStatus

    const matchesTab = selectedTab === 'all' || 
                      (selectedTab === 'pending' && scholarship.status === 'pending') ||
                      (selectedTab === 'active' && scholarship.status === 'active') ||
                      (selectedTab === 'expired' && scholarship.status === 'expired')

    return matchesSearch && matchesFilter && matchesTab
  })

  const refreshData = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    alert('Scholarship data refreshed successfully!')
  }

  const handleViewScholarship = (id) => {
    const scholarship = scholarships.find(s => s.id === id);
    if (scholarship) {
      alert(`Viewing Scholarship Details:\n\nName: ${scholarship.name}\nProvider: ${scholarship.provider}\nAmount: $${scholarship.amount.toLocaleString()} ${scholarship.currency}\nType: ${scholarship.type}\nCategory: ${scholarship.category}\nDeadline: ${scholarship.deadline}\nStatus: ${scholarship.status}\nApplicants: ${scholarship.applicants}\nAwarded: ${scholarship.awarded}\nDuration: ${scholarship.duration}\nRenewable: ${scholarship.renewable ? 'Yes' : 'No'}\nRequirements: ${scholarship.requirements.join(', ')}\nDescription: ${scholarship.description}`);
    }
    console.log('View scholarship:', id)
  }

  const handleEditScholarship = (id) => {
    const scholarship = scholarships.find(s => s.id === id);
    if (scholarship) {
      alert(`Edit Scholarship Form would open for:\n\nName: ${scholarship.name}\nProvider: ${scholarship.provider}\n\nThis would allow editing all scholarship details, requirements, and status.`);
    }
    console.log('Edit scholarship:', id)
  }

  const handleDeleteScholarship = (id) => {
    const scholarship = scholarships.find(s => s.id === id);
    if (scholarship) {
      const confirmed = confirm(`Are you sure you want to delete scholarship:\n\n${scholarship.name} by ${scholarship.provider}?\n\nThis action cannot be undone and will affect ${scholarship.applicants} applicants.`);
      if (confirmed) {
        alert(`Scholarship "${scholarship.name}" has been deleted successfully!`);
        console.log('Scholarship deleted:', id);
      }
    }
  }

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
              <h1 className="text-2xl font-bold text-gray-900">Scholarship Management</h1>
              <p className="text-gray-600">Manage scholarships, applications, and providers</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshData}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Scholarship
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 space-y-6">
          
          {/* Search and Filters */}
          <Card className="shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search scholarships by name, provider, or category..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="expired">Expired</option>
                    <option value="draft">Draft</option>
                  </select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scholarship Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Scholarships ({scholarships.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({scholarships.filter(s => s.status === 'active').length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({scholarships.filter(s => s.status === 'pending').length})</TabsTrigger>
              <TabsTrigger value="expired">Expired ({scholarships.filter(s => s.status === 'expired').length})</TabsTrigger>
              <TabsTrigger value="new">New Scholarship</TabsTrigger>
            </TabsList>

            {/* New Scholarship Form */}
            <TabsContent value="new" className="space-y-6">
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="h-5 w-5 mr-2" />
                    Create New Scholarship
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Scholarship Name *
                        </label>
                        <input
                          type="text"
                          placeholder="Enter scholarship name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Provider *
                        </label>
                        <input
                          type="text"
                          placeholder="University or organization name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Amount (AUD) *
                        </label>
                        <input
                          type="number"
                          placeholder="25000"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Type *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="">Select type</option>
                          <option value="Merit-based">Merit-based</option>
                          <option value="Need-based">Need-based</option>
                          <option value="Leadership-based">Leadership-based</option>
                          <option value="Research-based">Research-based</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="">Select category</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Business">Business</option>
                          <option value="Medicine">Medicine</option>
                          <option value="Arts">Arts</option>
                          <option value="Science">Science</option>
                          <option value="General">General</option>
                          <option value="International">International</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Application Deadline *
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Duration *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 4 years, 1 semester"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Email *
                        </label>
                        <input
                          type="email"
                          placeholder="scholarships@university.edu.au"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="draft">Draft</option>
                          <option value="active">Active</option>
                          <option value="pending">Pending Review</option>
                        </select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="renewable"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="renewable" className="text-sm font-medium text-gray-700">
                          Renewable scholarship
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe the scholarship, its purpose, and what it offers to students..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Requirements
                    </label>
                    <textarea
                      rows={3}
                      placeholder="List the requirements (one per line)&#10;e.g., GPA 3.5+&#10;Australian citizen&#10;Engineering program"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <Button variant="outline">
                      Save as Draft
                    </Button>
                    <Button>
                      Create Scholarship
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value={selectedTab} className="space-y-6">
              {/* Scholarships List */}
              <div className="grid gap-6">
                {filteredScholarships.map((scholarship) => (
                  <Card key={scholarship.id} className="shadow-sm border-0">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                            <Award className="h-6 w-6 text-yellow-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{scholarship.name}</h3>
                              {getStatusBadge(scholarship.status)}
                              {getTypeBadge(scholarship.type)}
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                              <div className="space-y-1">
                                <div className="flex items-center">
                                  <Building className="h-4 w-4 mr-2" />
                                  {scholarship.provider}
                                </div>
                                <div className="flex items-center">
                                  <DollarSign className="h-4 w-4 mr-2" />
                                  ${scholarship.amount.toLocaleString()} {scholarship.currency}
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div><strong>Category:</strong> {scholarship.category}</div>
                                <div><strong>Duration:</strong> {scholarship.duration}</div>
                                <div><strong>Renewable:</strong> {scholarship.renewable ? 'Yes' : 'No'}</div>
                              </div>
                            </div>
                            <div className="mt-3">
                              <p className="text-sm text-gray-600">{scholarship.description}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewScholarship(scholarship.id)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditScholarship(scholarship.id)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          {hasPermission('manage_scholarships') && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteScholarship(scholarship.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Statistics */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="text-center">
                            <div className="font-semibold text-blue-600">{scholarship.applicants}</div>
                            <div className="text-gray-600">Applicants</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-green-600">{scholarship.awarded}</div>
                            <div className="text-gray-600">Awarded</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-purple-600">
                              {scholarship.applicants > 0 ? Math.round((scholarship.awarded / scholarship.applicants) * 100) : 0}%
                            </div>
                            <div className="text-gray-600">Success Rate</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-orange-600">
                              {Math.ceil((new Date(scholarship.deadline) - new Date()) / (1000 * 60 * 60 * 24))} days
                            </div>
                            <div className="text-gray-600">Days Left</div>
                          </div>
                        </div>
                      </div>

                      {/* Requirements */}
                      <div className="mt-4">
                        <div className="text-sm font-medium text-gray-900 mb-2">Requirements:</div>
                        <div className="flex flex-wrap gap-2">
                          {scholarship.requirements.map((req, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredScholarships.length === 0 && (
                <Card className="shadow-sm border-0">
                  <CardContent className="p-12 text-center">
                    <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No scholarships found</h3>
                    <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

