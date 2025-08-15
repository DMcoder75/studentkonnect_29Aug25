import React, { useState, useEffect } from 'react'
import { useAdminAuth } from '../../contexts/AdminAuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  GraduationCap,
  Search,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Plus,
  Globe,
  MapPin,
  Star,
  Users,
  BookOpen,
  Building
} from 'lucide-react'
import AdminSidebar from '../AdminSidebar'

export default function ContentUniversities() {
  const { adminUser, hasPermission } = useAdminAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [countryFilter, setCountryFilter] = useState('all')

  // Sample university data - replace with API call in production
  const [universities, setUniversities] = useState([
    {
      id: 1,
      name: 'Harvard University',
      country: 'United States',
      city: 'Cambridge, MA',
      ranking: 1,
      type: 'Private Research University',
      established: 1636,
      students: 23000,
      acceptanceRate: 3.4,
      tuitionFee: '$54,002',
      status: 'active',
      programs: 130,
      rating: 4.9,
      website: 'https://harvard.edu'
    },
    {
      id: 2,
      name: 'University of Oxford',
      country: 'United Kingdom',
      city: 'Oxford',
      ranking: 2,
      type: 'Public Research University',
      established: 1096,
      students: 24000,
      acceptanceRate: 17.5,
      tuitionFee: '£9,250',
      status: 'active',
      programs: 350,
      rating: 4.8,
      website: 'https://ox.ac.uk'
    },
    {
      id: 3,
      name: 'University of Toronto',
      country: 'Canada',
      city: 'Toronto, ON',
      ranking: 18,
      type: 'Public Research University',
      established: 1827,
      students: 97000,
      acceptanceRate: 43.0,
      tuitionFee: 'CAD $58,160',
      status: 'active',
      programs: 700,
      rating: 4.6,
      website: 'https://utoronto.ca'
    },
    {
      id: 4,
      name: 'University of Melbourne',
      country: 'Australia',
      city: 'Melbourne, VIC',
      ranking: 33,
      type: 'Public Research University',
      established: 1853,
      students: 51000,
      acceptanceRate: 70.0,
      tuitionFee: 'AUD $45,824',
      status: 'active',
      programs: 400,
      rating: 4.5,
      website: 'https://unimelb.edu.au'
    },
    {
      id: 5,
      name: 'ETH Zurich',
      country: 'Switzerland',
      city: 'Zurich',
      ranking: 7,
      type: 'Public Technical University',
      established: 1855,
      students: 22200,
      acceptanceRate: 8.0,
      tuitionFee: 'CHF 1,298',
      status: 'active',
      programs: 100,
      rating: 4.7,
      website: 'https://ethz.ch'
    },
    {
      id: 6,
      name: 'National University of Singapore',
      country: 'Singapore',
      city: 'Singapore',
      ranking: 11,
      type: 'Public Research University',
      established: 1905,
      students: 40000,
      acceptanceRate: 5.0,
      tuitionFee: 'SGD $37,550',
      status: 'active',
      programs: 150,
      rating: 4.6,
      website: 'https://nus.edu.sg'
    }
  ])
  const [stats, setStats] = useState({
    totalUniversities: 6,
    activeUniversities: 6,
    countries: 6,
    pendingReviews: 3
  })

  useEffect(() => {
    // Load real university data from API
    loadUniversityData()
  }, [])

  const loadUniversityData = async () => {
    setIsLoading(true)
    try {
      // Replace with actual API call
      // const response = await fetch('/api/admin/universities')
      // const data = await response.json()
      // setUniversities(data.universities)
      // setStats(data.stats)
      
      // For now, show empty state until real API is connected
      setUniversities([])
      setStats({
        totalUniversities: 0,
        activeUniversities: 0,
        countries: 0,
        pendingReviews: 0
      })
    } catch (error) {
      console.error('Error loading university data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshData = async () => {
    await loadUniversityData()
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
              <h1 className="text-2xl font-bold text-gray-900">University Database</h1>
              <p className="text-gray-600">Manage university information and content</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add University
              </Button>
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
                Export
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Universities</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalUniversities}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Universities</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.activeUniversities}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <Building className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Countries</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.countries}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Globe className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.pendingReviews}</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Eye className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Universities Table */}
          <Card className="shadow-sm border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Universities</CardTitle>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search universities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <select
                    value={countryFilter}
                    onChange={(e) => setCountryFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="all">All Countries</option>
                    <option value="australia">Australia</option>
                    <option value="canada">Canada</option>
                    <option value="uk">United Kingdom</option>
                    <option value="usa">United States</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {universities.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">University</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Country</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Ranking</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Students</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Acceptance Rate</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Tuition</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {universities
                        .filter(uni => 
                          uni.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                          (countryFilter === 'all' || uni.country.toLowerCase().includes(countryFilter))
                        )
                        .map((university) => (
                        <tr key={university.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <GraduationCap className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{university.name}</p>
                                <p className="text-sm text-gray-500">{university.city}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <Globe className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-900">{university.country}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="font-medium text-gray-900">#{university.ranking}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-900">{university.students.toLocaleString()}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-gray-900">{university.acceptanceRate}%</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-medium text-gray-900">{university.tuitionFee}</span>
                          </td>
                          <td className="py-4 px-4">
                            <Badge 
                              variant={university.status === 'active' ? 'default' : 'secondary'}
                              className={university.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                            >
                              {university.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Universities Found</h3>
                  <p className="text-gray-600">
                    {isLoading ? 'Loading university data...' : 'No universities match your search criteria'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

