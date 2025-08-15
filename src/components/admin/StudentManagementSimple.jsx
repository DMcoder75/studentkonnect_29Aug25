import React, { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { 
  Users,
  FileText,
  Trophy,
  MessageSquare,
  Search,
  Download,
  Eye,
  Edit,
  MapPin,
  Calendar,
  Mail,
  Phone
} from 'lucide-react'

export default function StudentManagementSimple() {
  const [students, setStudents] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Mock data for students
  useEffect(() => {
    const mockStudents = [
      {
        id: 1,
        name: 'Priya Dubey',
        email: 'priya.dubey@email.com',
        phone: '+91 98765 43210',
        country: 'India',
        targetCountry: 'Australia',
        fieldOfStudy: 'Law',
        status: 'active',
        joinDate: '2024-01-15',
        applications: 3,
        counselor: 'Michael Kumar'
      },
      {
        id: 2,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@email.com',
        phone: '+91 87654 32109',
        country: 'India',
        targetCountry: 'Canada',
        fieldOfStudy: 'Engineering',
        status: 'pending',
        joinDate: '2024-02-20',
        applications: 1,
        counselor: 'Sarah Johnson'
      },
      {
        id: 3,
        name: 'Anita Patel',
        email: 'anita.patel@email.com',
        phone: '+91 76543 21098',
        country: 'India',
        targetCountry: 'UK',
        fieldOfStudy: 'Medicine',
        status: 'active',
        joinDate: '2024-01-10',
        applications: 2,
        counselor: 'Dr. Sarah Chen'
      }
    ]
    setStudents(mockStudents)
  }, [])

  return (
    <AdminLayout 
      title="Student Management" 
      description="Manage student profiles, applications, and support requests"
    >
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{students.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Applications</p>
              <p className="text-2xl font-bold text-gray-900">
                {students.reduce((sum, student) => sum + student.applications, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Success Stories</p>
              <p className="text-2xl font-bold text-gray-900">45</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Support Tickets</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">All Students</h2>
          <div className="space-y-4">
            {students.map((student) => (
              <div key={student.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 font-semibold">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-600">{student.email}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">
                          <MapPin className="w-3 h-3 inline mr-1" />
                          {student.country} → {student.targetCountry}
                        </span>
                        <span className="text-xs text-gray-500">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          Joined {student.joinDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{student.fieldOfStudy}</p>
                      <p className="text-sm text-gray-600">{student.applications} applications</p>
                      <Badge 
                        variant={student.status === 'active' ? 'default' : 'secondary'}
                        className="mt-1"
                      >
                        {student.status}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

