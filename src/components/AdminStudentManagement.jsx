import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import AdminSidebar from './AdminSidebar';
import { 
  Users, 
  FileText, 
  Trophy, 
  MessageSquare, 
  Search, 
  Filter, 
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Star,
  TrendingUp,
  Clock,
  DollarSign
} from 'lucide-react';

const AdminStudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const location = useLocation();

  // Sample student data
  const [students] = useState([
    {
      id: 1,
      name: 'Emily Chen',
      email: 'emily.chen@student.edu.au',
      phone: '+61 2 9876 5432',
      location: 'Sydney, NSW',
      status: 'Active',
      joinDate: '2024-01-15',
      program: 'Computer Science',
      university: 'University of Sydney',
      gpa: 3.8,
      applications: 5,
      acceptances: 2,
      counselor: 'Dr. Sarah Chen',
      totalSpent: 1250,
      lastActivity: '2 hours ago'
    },
    {
      id: 2,
      name: 'James Wilson',
      email: 'james.wilson@student.edu.au',
      phone: '+61 3 8765 4321',
      location: 'Melbourne, VIC',
      status: 'Active',
      joinDate: '2024-02-20',
      program: 'Business Administration',
      university: 'University of Melbourne',
      gpa: 3.6,
      applications: 3,
      acceptances: 1,
      counselor: 'Michael Kumar',
      totalSpent: 850,
      lastActivity: '1 day ago'
    },
    {
      id: 3,
      name: 'Sophie Martinez',
      email: 'sophie.martinez@student.edu.au',
      phone: '+61 7 7654 3210',
      location: 'Brisbane, QLD',
      status: 'Graduated',
      joinDate: '2023-08-10',
      program: 'Medicine',
      university: 'University of Queensland',
      gpa: 3.9,
      applications: 8,
      acceptances: 3,
      counselor: 'Emma Wilson',
      totalSpent: 2100,
      lastActivity: '1 week ago'
    },
    {
      id: 4,
      name: 'Alex Thompson',
      email: 'alex.thompson@student.edu.au',
      phone: '+61 8 6543 2109',
      location: 'Perth, WA',
      status: 'Inactive',
      joinDate: '2024-03-05',
      program: 'Engineering',
      university: 'University of Western Australia',
      gpa: 3.4,
      applications: 2,
      acceptances: 0,
      counselor: 'David Park',
      totalSpent: 450,
      lastActivity: '2 weeks ago'
    },
    {
      id: 5,
      name: 'Isabella Rodriguez',
      email: 'isabella.rodriguez@student.edu.au',
      phone: '+61 2 5432 1098',
      location: 'Sydney, NSW',
      status: 'Active',
      joinDate: '2024-01-30',
      program: 'Arts & Humanities',
      university: 'Macquarie University',
      gpa: 3.7,
      applications: 4,
      acceptances: 2,
      counselor: 'Lisa Thompson',
      totalSpent: 950,
      lastActivity: '3 hours ago'
    }
  ]);

  // Sample support tickets
  const [supportTickets] = useState([
    {
      id: 1,
      studentName: 'Emily Chen',
      subject: 'Application Status Inquiry',
      priority: 'Medium',
      status: 'Open',
      created: '2024-07-20',
      lastUpdate: '2 hours ago'
    },
    {
      id: 2,
      studentName: 'James Wilson',
      subject: 'Payment Processing Issue',
      priority: 'High',
      status: 'In Progress',
      created: '2024-07-19',
      lastUpdate: '1 day ago'
    },
    {
      id: 3,
      studentName: 'Sophie Martinez',
      subject: 'Document Upload Problem',
      priority: 'Low',
      status: 'Resolved',
      created: '2024-07-18',
      lastUpdate: '3 days ago'
    }
  ]);

  // Sample success stories
  const [successStories] = useState([
    {
      id: 1,
      studentName: 'Sophie Martinez',
      university: 'University of Queensland',
      program: 'Medicine',
      achievement: 'Accepted with Full Scholarship',
      story: 'Sophie successfully gained admission to her dream medical program with a full scholarship worth $120,000.',
      date: '2024-06-15',
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      studentName: 'Michael Chang',
      university: 'University of Sydney',
      program: 'Computer Science',
      achievement: 'Top 1% Graduate',
      story: 'Michael graduated with first-class honors and secured a position at a leading tech company.',
      date: '2024-05-20',
      image: '/api/placeholder/300/200'
    }
  ]);

  // Detect current route for tab selection
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/applications')) {
      setActiveTab('applications');
    } else if (path.includes('/success-stories')) {
      setActiveTab('success');
    } else if (path.includes('/support-tickets') || path.includes('/support')) {
      setActiveTab('support');
    } else {
      setActiveTab('all');
    }
  }, [location]);

  // Filter students based on search and status
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.program.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Filter by tab
  const getFilteredData = () => {
    switch (activeTab) {
      case 'active':
        return filteredStudents.filter(s => s.status === 'Active');
      case 'graduated':
        return filteredStudents.filter(s => s.status === 'Graduated');
      case 'inactive':
        return filteredStudents.filter(s => s.status === 'Inactive');
      default:
        return filteredStudents;
    }
  };

  const handleRefresh = () => {
    alert('Student data refreshed successfully!');
    console.log('Refreshing student data...');
  };

  const handleExport = () => {
    alert('Student data exported successfully!');
    console.log('Exporting student data...');
  };

  const handleAddStudent = () => {
    alert('Add Student form would open here');
    console.log('Adding new student...');
  };

  const handleViewStudent = (studentId) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      alert(`Viewing Student Details:\n\nName: ${student.name}\nEmail: ${student.email}\nProgram: ${student.program}\nUniversity: ${student.university}\nGPA: ${student.gpa}\nStatus: ${student.status}\nCounselor: ${student.counselor}\nApplications: ${student.applications}\nAcceptances: ${student.acceptances}\nTotal Spent: $${student.totalSpent}`);
    }
    console.log('Viewing student:', studentId);
  };

  const handleEditStudent = (studentId) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      alert(`Edit Student Form would open for:\n\nName: ${student.name}\nEmail: ${student.email}\n\nThis would allow editing all student details.`);
    }
    console.log('Editing student:', studentId);
  };

  const handleDeleteStudent = (studentId) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      const confirmed = confirm(`Are you sure you want to delete student:\n\n${student.name} (${student.email})?\n\nThis action cannot be undone.`);
      if (confirmed) {
        alert(`Student ${student.name} has been deleted successfully!`);
        console.log('Student deleted:', studentId);
      }
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'graduated': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTicketStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
              <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
              <p className="text-gray-600">Manage students, applications, and success stories</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleRefresh} variant="outline" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Refresh
              </Button>
              <Button onClick={handleAddStudent} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Student
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
          {/* Search and Filters */}
          <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search students by name, email, or program..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="graduated">Graduated</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            All Students ({students.length})
          </TabsTrigger>
          <TabsTrigger value="applications" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Active Applications
          </TabsTrigger>
          <TabsTrigger value="success" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Success Stories
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Support Tickets ({supportTickets.filter(t => t.status !== 'Resolved').length})
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* All Students Tab */}
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {getFilteredData().map((student) => (
              <Card key={student.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{student.name}</h3>
                        <Badge className={getStatusBadgeColor(student.status)}>
                          {student.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {student.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {student.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {student.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Joined {student.joinDate}
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Program</p>
                          <p className="text-sm text-gray-600">{student.program}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">University</p>
                          <p className="text-sm text-gray-600">{student.university}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">GPA</p>
                          <p className="text-sm text-gray-600">{student.gpa}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Counselor</p>
                          <p className="text-sm text-gray-600">{student.counselor}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <span className="font-medium">{student.applications}</span>
                          <span className="text-gray-600">Applications</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-green-500" />
                          <span className="font-medium">{student.acceptances}</span>
                          <span className="text-gray-600">Acceptances</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-purple-500" />
                          <span className="font-medium">${student.totalSpent}</span>
                          <span className="text-gray-600">Total Spent</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-orange-500" />
                          <span className="text-gray-600">Last active {student.lastActivity}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewStudent(student.id)}
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditStudent(student.id)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteStudent(student.id)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Application tracking functionality would be implemented here.</p>
              <div className="mt-4 space-y-2">
                <p className="text-sm">• Real-time application status updates</p>
                <p className="text-sm">• Document submission tracking</p>
                <p className="text-sm">• Deadline management</p>
                <p className="text-sm">• University response tracking</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Success Stories Tab */}
        <TabsContent value="success" className="space-y-4">
          <div className="grid gap-4">
            {successStories.map((story) => (
              <Card key={story.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                      <GraduationCap className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{story.studentName}</h3>
                        <Badge className="bg-green-100 text-green-800">{story.achievement}</Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{story.university} - {story.program}</p>
                      <p className="text-gray-700 mb-3">{story.story}</p>
                      <p className="text-sm text-gray-500">Published on {story.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Support Tickets Tab */}
        <TabsContent value="support" className="space-y-4">
          <div className="grid gap-4">
            {supportTickets.map((ticket) => (
              <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{ticket.subject}</h3>
                        <Badge className={getPriorityBadgeColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                        <Badge className={getTicketStatusBadgeColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">Student: {ticket.studentName}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Created: {ticket.created}</span>
                        <span>Last update: {ticket.lastUpdate}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm">Respond</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900">{students.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">↗ 12% vs last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Students</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {students.filter(s => s.status === 'Active').length}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">↗ 8% vs last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold text-gray-900">67%</p>
                  </div>
                  <Trophy className="h-8 w-8 text-yellow-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">↗ 5% vs last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {supportTickets.filter(t => t.status !== 'Resolved').length}
                    </p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-red-500" />
                </div>
                <p className="text-xs text-red-600 mt-2">↗ 2 new today</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Student Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Application Success Rate</span>
                    <span>67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Student Satisfaction</span>
                    <span>89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Counselor Response Rate</span>
                    <span>94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentManagement;

