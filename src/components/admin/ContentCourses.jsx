import React, { useState, useEffect } from 'react'
import { useAdminAuth } from '../../contexts/AdminAuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  BookOpen,
  Search,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Plus,
  Clock,
  DollarSign,
  Users,
  Star,
  GraduationCap,
  Building
} from 'lucide-react'
import AdminLayout from './AdminLayout'

export default function ContentCourses() {
  const { adminUser, hasPermission } = useAdminAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [fieldFilter, setFieldFilter] = useState('all')
  const [levelFilter, setLevelFilter] = useState('all')

  // Sample course data
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Computer Science',
      university: 'Harvard University',
      country: 'United States',
      level: 'Bachelor',
      duration: '4 years',
      field: 'Technology',
      tuitionFee: '$54,002',
      startDate: 'September 2024',
      language: 'English',
      credits: 120,
      rating: 4.8,
      enrollments: 450,
      status: 'active',
      description: 'Comprehensive computer science program covering algorithms, data structures, and software engineering.'
    },
    {
      id: 2,
      title: 'Medicine (MBBS)',
      university: 'University of Oxford',
      country: 'United Kingdom',
      level: 'Bachelor',
      duration: '6 years',
      field: 'Medicine',
      tuitionFee: '£9,250',
      startDate: 'October 2024',
      language: 'English',
      credits: 360,
      rating: 4.9,
      enrollments: 200,
      status: 'active',
      description: 'Medical degree program with clinical training and research opportunities.'
    },
    {
      id: 3,
      title: 'Business Administration (MBA)',
      university: 'University of Toronto',
      country: 'Canada',
      level: 'Master',
      duration: '2 years',
      field: 'Business',
      tuitionFee: 'CAD $58,160',
      startDate: 'September 2024',
      language: 'English',
      credits: 60,
      rating: 4.6,
      enrollments: 320,
      status: 'active',
      description: 'Advanced business administration program with focus on leadership and strategy.'
    },
    {
      id: 4,
      title: 'Engineering (Mechanical)',
      university: 'University of Melbourne',
      country: 'Australia',
      level: 'Bachelor',
      duration: '4 years',
      field: 'Engineering',
      tuitionFee: 'AUD $45,824',
      startDate: 'February 2024',
      language: 'English',
      credits: 192,
      rating: 4.5,
      enrollments: 280,
      status: 'active',
      description: 'Mechanical engineering program with hands-on laboratory experience.'
    },
    {
      id: 5,
      title: 'Data Science',
      university: 'ETH Zurich',
      country: 'Switzerland',
      level: 'Master',
      duration: '2 years',
      field: 'Technology',
      tuitionFee: 'CHF 1,298',
      startDate: 'September 2024',
      language: 'English',
      credits: 90,
      rating: 4.7,
      enrollments: 150,
      status: 'active',
      description: 'Advanced data science program with machine learning and AI focus.'
    },
    {
      id: 6,
      title: 'International Law',
      university: 'National University of Singapore',
      country: 'Singapore',
      level: 'Master',
      duration: '1 year',
      field: 'Law',
      tuitionFee: 'SGD $37,550',
      startDate: 'August 2024',
      language: 'English',
      credits: 40,
      rating: 4.6,
      enrollments: 80,
      status: 'active',
      description: 'Specialized program in international law and global legal systems.'
    }
  ])

  const [stats, setStats] = useState({
    totalCourses: 6,
    activeCourses: 6,
    universities: 6,
    totalEnrollments: 1480
  })

  const refreshData = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (fieldFilter === 'all' || course.field.toLowerCase() === fieldFilter.toLowerCase()) &&
    (levelFilter === 'all' || course.level.toLowerCase() === levelFilter.toLowerCase())
  )

  return (
    <AdminLayout 
      title="Course Management" 
      description="Manage course information and academic programs"
    >
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Course
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalCourses}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Courses</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeCourses}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <GraduationCap className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Universities</p>
                <p className="text-3xl font-bold text-gray-900">{stats.universities}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Building className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalEnrollments}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses Table */}
      <Card className="shadow-sm border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Courses</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={fieldFilter}
                onChange={(e) => setFieldFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Fields</option>
                <option value="technology">Technology</option>
                <option value="medicine">Medicine</option>
                <option value="business">Business</option>
                <option value="engineering">Engineering</option>
                <option value="law">Law</option>
              </select>
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Levels</option>
                <option value="bachelor">Bachelor</option>
                <option value="master">Master</option>
                <option value="phd">PhD</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredCourses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Course</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">University</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Level</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Duration</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Tuition</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Enrollments</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Rating</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => (
                    <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{course.title}</p>
                            <p className="text-sm text-gray-500">{course.field}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-gray-900">{course.university}</p>
                          <p className="text-sm text-gray-500">{course.country}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline">{course.level}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{course.duration}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{course.tuitionFee}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{course.enrollments}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium text-gray-900">{course.rating}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge 
                          variant={course.status === 'active' ? 'default' : 'secondary'}
                          className={course.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {course.status}
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
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Courses Found</h3>
              <p className="text-gray-600">
                {isLoading ? 'Loading course data...' : 'No courses match your search criteria'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  )
}

