import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import AdminSidebar from './AdminSidebar';
import { 
  Database, 
  BookOpen, 
  FileText, 
  HelpCircle, 
  Search, 
  Filter, 
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Users,
  Star,
  Calendar,
  Globe,
  Phone,
  Mail,
  Building,
  GraduationCap,
  Clock,
  Tag
} from 'lucide-react';

const AdminContentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('universities');
  const location = useLocation();

  // Sample university data
  const [universities] = useState([
    {
      id: 1,
      name: 'University of Sydney',
      location: 'Sydney, NSW',
      type: 'Public',
      established: 1850,
      ranking: 42,
      students: 51394,
      internationalStudents: 22013,
      faculties: 16,
      courses: 400,
      website: 'https://sydney.edu.au',
      phone: '+61 2 9351 2222',
      email: 'info@sydney.edu.au',
      status: 'Active',
      lastUpdated: '2024-07-15',
      description: 'Australia\'s first university, established in 1850, is a leading global university known for its excellence in teaching and research.'
    },
    {
      id: 2,
      name: 'University of Melbourne',
      location: 'Melbourne, VIC',
      type: 'Public',
      established: 1853,
      ranking: 33,
      students: 48000,
      internationalStudents: 19000,
      faculties: 12,
      courses: 350,
      website: 'https://unimelb.edu.au',
      phone: '+61 3 9035 5511',
      email: 'info@unimelb.edu.au',
      status: 'Active',
      lastUpdated: '2024-07-18',
      description: 'A leading international university with a tradition of excellence in teaching and research.'
    },
    {
      id: 3,
      name: 'Australian National University',
      location: 'Canberra, ACT',
      type: 'Public',
      established: 1946,
      ranking: 30,
      students: 25500,
      internationalStudents: 11500,
      faculties: 7,
      courses: 200,
      website: 'https://anu.edu.au',
      phone: '+61 2 6125 5111',
      email: 'info@anu.edu.au',
      status: 'Active',
      lastUpdated: '2024-07-20',
      description: 'Australia\'s national university, consistently ranked among the world\'s top universities.'
    },
    {
      id: 4,
      name: 'UNSW Sydney',
      location: 'Sydney, NSW',
      type: 'Public',
      established: 1949,
      ranking: 45,
      students: 62000,
      internationalStudents: 26000,
      faculties: 9,
      courses: 900,
      website: 'https://unsw.edu.au',
      phone: '+61 2 9385 1000',
      email: 'info@unsw.edu.au',
      status: 'Active',
      lastUpdated: '2024-07-17',
      description: 'A world-leading university known for its innovation, cutting-edge research, and entrepreneurial spirit.'
    },
    {
      id: 5,
      name: 'Monash University',
      location: 'Melbourne, VIC',
      type: 'Public',
      established: 1958,
      ranking: 57,
      students: 86000,
      internationalStudents: 35000,
      faculties: 10,
      courses: 600,
      website: 'https://monash.edu',
      phone: '+61 3 9905 4000',
      email: 'info@monash.edu',
      status: 'Active',
      lastUpdated: '2024-07-16',
      description: 'A research-intensive university with a global outlook and innovative approach to education.'
    }
  ]);

  // Sample course data
  const [courses] = useState([
    {
      id: 1,
      name: 'Bachelor of Computer Science',
      university: 'University of Sydney',
      faculty: 'Engineering & IT',
      duration: '3 years',
      type: 'Undergraduate',
      atar: 95.0,
      fees: 47000,
      intake: 'February, July',
      status: 'Active',
      lastUpdated: '2024-07-15'
    },
    {
      id: 2,
      name: 'Master of Business Administration',
      university: 'University of Melbourne',
      faculty: 'Business School',
      duration: '2 years',
      type: 'Postgraduate',
      atar: null,
      fees: 89000,
      intake: 'February, July',
      status: 'Active',
      lastUpdated: '2024-07-18'
    },
    {
      id: 3,
      name: 'Bachelor of Medicine',
      university: 'Australian National University',
      faculty: 'Medicine',
      duration: '6 years',
      type: 'Undergraduate',
      atar: 99.5,
      fees: 75000,
      intake: 'February',
      status: 'Active',
      lastUpdated: '2024-07-20'
    }
  ]);

  // Sample blog articles
  const [blogArticles] = useState([
    {
      id: 1,
      title: 'Complete Guide to University Applications in Australia',
      author: 'Dr. Sarah Chen',
      category: 'Application Tips',
      status: 'Published',
      publishDate: '2024-07-15',
      views: 2847,
      likes: 156,
      excerpt: 'Everything you need to know about applying to Australian universities, from choosing the right course to submitting your application.'
    },
    {
      id: 2,
      title: 'Scholarship Opportunities for International Students',
      author: 'Michael Kumar',
      category: 'Scholarships',
      status: 'Published',
      publishDate: '2024-07-10',
      views: 1923,
      likes: 89,
      excerpt: 'Discover the best scholarship opportunities available for international students studying in Australia.'
    },
    {
      id: 3,
      title: 'Career Prospects in Engineering Fields',
      author: 'Emma Wilson',
      category: 'Career Guidance',
      status: 'Draft',
      publishDate: null,
      views: 0,
      likes: 0,
      excerpt: 'Explore the various career paths available in engineering and the skills needed to succeed in this dynamic field.'
    }
  ]);

  // Sample FAQ data
  const [faqs] = useState([
    {
      id: 1,
      question: 'What are the entry requirements for Australian universities?',
      answer: 'Entry requirements vary by university and course. Generally, you need to meet academic requirements (ATAR score or equivalent), English language requirements (IELTS/TOEFL), and any specific course prerequisites.',
      category: 'Admissions',
      status: 'Published',
      lastUpdated: '2024-07-15',
      views: 1250
    },
    {
      id: 2,
      question: 'How much does it cost to study in Australia?',
      answer: 'Tuition fees for international students range from AUD 20,000 to AUD 50,000 per year for undergraduate courses, and AUD 22,000 to AUD 55,000 for postgraduate courses. Living costs are approximately AUD 21,000 per year.',
      category: 'Fees & Costs',
      status: 'Published',
      lastUpdated: '2024-07-18',
      views: 2100
    },
    {
      id: 3,
      question: 'Can I work while studying in Australia?',
      answer: 'Yes, international students on a student visa can work up to 48 hours per fortnight during study periods and unlimited hours during scheduled course breaks.',
      category: 'Student Life',
      status: 'Published',
      lastUpdated: '2024-07-20',
      views: 890
    }
  ]);

  // Detect current route for tab selection
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/courses')) {
      setActiveTab('courses');
    } else if (path.includes('/blog')) {
      setActiveTab('blog');
    } else if (path.includes('/faq')) {
      setActiveTab('faq');
    } else {
      setActiveTab('universities');
    }
  }, [location]);

  // Filter functions
  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         uni.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || uni.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.faculty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const filteredArticles = blogArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || article.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || faq.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleRefresh = () => {
    console.log('Refreshing content data...');
  };

  const handleExport = () => {
    console.log('Exporting content data...');
  };

  const handleAdd = () => {
    console.log('Adding new content...');
  };

  const handleView = (id) => {
    console.log('Viewing content:', id);
  };

  const handleEdit = (id) => {
    console.log('Editing content:', id);
  };

  const handleDelete = (id) => {
    console.log('Deleting content:', id);
  };

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
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
              <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
              <p className="text-gray-600">Manage universities, courses, blog content, and FAQs</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleRefresh} variant="outline" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Refresh
              </Button>
              <Button onClick={handleAdd} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Content
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
            placeholder="Search content..."
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
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="universities" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Universities ({universities.length})
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Courses ({courses.length})
          </TabsTrigger>
          <TabsTrigger value="blog" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Blog & Articles ({blogArticles.length})
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            FAQ ({faqs.length})
          </TabsTrigger>
        </TabsList>

        {/* Universities Tab */}
        <TabsContent value="universities" className="space-y-4">
          <div className="grid gap-4">
            {filteredUniversities.map((university) => (
              <Card key={university.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{university.name}</h3>
                        <Badge className={getStatusBadgeColor(university.status)}>
                          {university.status}
                        </Badge>
                        <Badge variant="outline">#{university.ranking} Global</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {university.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          {university.type}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Est. {university.established}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Updated {university.lastUpdated}
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{university.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-900">Total Students</p>
                          <p className="text-gray-600">{university.students.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">International</p>
                          <p className="text-gray-600">{university.internationalStudents.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Faculties</p>
                          <p className="text-gray-600">{university.faculties}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Courses</p>
                          <p className="text-gray-600">{university.courses}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          <a href={university.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {university.website}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {university.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {university.email}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleView(university.id)}
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(university.id)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(university.id)}
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

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{course.name}</h3>
                        <Badge className={getStatusBadgeColor(course.status)}>
                          {course.status}
                        </Badge>
                        <Badge variant="outline">{course.type}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                        <div>
                          <p className="font-medium text-gray-900">University</p>
                          <p className="text-gray-600">{course.university}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Faculty</p>
                          <p className="text-gray-600">{course.faculty}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Duration</p>
                          <p className="text-gray-600">{course.duration}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Intake</p>
                          <p className="text-gray-600">{course.intake}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        {course.atar && (
                          <div>
                            <p className="font-medium text-gray-900">ATAR Required</p>
                            <p className="text-gray-600">{course.atar}</p>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">Annual Fees</p>
                          <p className="text-gray-600">AUD ${course.fees.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Last Updated</p>
                          <p className="text-gray-600">{course.lastUpdated}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleView(course.id)}
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(course.id)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(course.id)}
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

        {/* Blog & Articles Tab */}
        <TabsContent value="blog" className="space-y-4">
          <div className="grid gap-4">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{article.title}</h3>
                        <Badge className={getStatusBadgeColor(article.status)}>
                          {article.status}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {article.category}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{article.excerpt}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <p className="font-medium text-gray-900">Author</p>
                          <p className="text-gray-600">{article.author}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Published</p>
                          <p className="text-gray-600">{article.publishDate || 'Not published'}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Views</p>
                          <p className="text-gray-600">{article.views.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Likes</p>
                          <p className="text-gray-600">{article.likes}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleView(article.id)}
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(article.id)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(article.id)}
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

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-4">
          <div className="grid gap-4">
            {filteredFAQs.map((faq) => (
              <Card key={faq.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                        <Badge className={getStatusBadgeColor(faq.status)}>
                          {faq.status}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {faq.category}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{faq.answer}</p>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <p className="font-medium text-gray-900">Category</p>
                          <p className="text-gray-600">{faq.category}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Last Updated</p>
                          <p className="text-gray-600">{faq.lastUpdated}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Views</p>
                          <p className="text-gray-600">{faq.views.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleView(faq.id)}
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(faq.id)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(faq.id)}
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
      </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminContentManagement;

