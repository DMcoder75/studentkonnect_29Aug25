import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import AdminSidebar from './AdminSidebar';
import { 
  Shield, 
  AlertTriangle, 
  Flag, 
  FileText, 
  Search, 
  Filter, 
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  Clock,
  User,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const AdminModerationManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('reviews');
  const location = useLocation();

  // Sample moderation data
  const [reviews] = useState([
    {
      id: 1,
      type: 'University Review',
      content: 'Great university with excellent facilities...',
      author: 'John Smith',
      university: 'University of Sydney',
      rating: 5,
      status: 'Pending',
      reportedBy: 'Anonymous',
      reason: 'Inappropriate content',
      createdAt: '2024-01-15',
      priority: 'Medium'
    },
    {
      id: 2,
      type: 'Course Review',
      content: 'This course was challenging but rewarding...',
      author: 'Sarah Johnson',
      course: 'Computer Science',
      rating: 4,
      status: 'Approved',
      reportedBy: null,
      reason: null,
      createdAt: '2024-01-14',
      priority: 'Low'
    }
  ]);

  const [reports] = useState([
    {
      id: 1,
      type: 'Spam Content',
      reportedContent: 'Promotional message about external services',
      reportedBy: 'User123',
      reportedUser: 'SpamAccount',
      status: 'Under Review',
      priority: 'High',
      createdAt: '2024-01-15',
      description: 'User posting promotional content in reviews'
    },
    {
      id: 2,
      type: 'Inappropriate Language',
      reportedContent: 'Review contains offensive language',
      reportedBy: 'Student456',
      reportedUser: 'AngryUser',
      status: 'Resolved',
      priority: 'Medium',
      createdAt: '2024-01-13',
      description: 'Offensive language in university review'
    }
  ]);

  const [complaints] = useState([
    {
      id: 1,
      type: 'Service Complaint',
      subject: 'Counselor not responding',
      complainant: 'Emily Chen',
      against: 'Dr. Sarah Chen',
      status: 'Open',
      priority: 'High',
      createdAt: '2024-01-15',
      description: 'Counselor has not responded to messages for 3 days'
    },
    {
      id: 2,
      type: 'Platform Issue',
      subject: 'Application not submitted',
      complainant: 'James Wilson',
      against: 'System',
      status: 'Resolved',
      priority: 'Medium',
      createdAt: '2024-01-12',
      description: 'Technical issue prevented application submission'
    }
  ]);

  const [logs] = useState([
    {
      id: 1,
      action: 'Content Approved',
      moderator: 'Admin User',
      target: 'Review #123',
      timestamp: '2024-01-15 10:30:00',
      details: 'University review approved after manual review'
    },
    {
      id: 2,
      action: 'User Suspended',
      moderator: 'Admin User',
      target: 'User: SpamAccount',
      timestamp: '2024-01-15 09:15:00',
      details: 'User suspended for 7 days due to spam violations'
    }
  ]);

  // Detect current route for tab selection
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/reports')) {
      setActiveTab('reports');
    } else if (path.includes('/complaints')) {
      setActiveTab('complaints');
    } else if (path.includes('/logs')) {
      setActiveTab('logs');
    } else {
      setActiveTab('reviews');
    }
  }, [location]);

  const handleRefresh = () => {
    alert('Moderation data refreshed successfully!');
    console.log('Refreshing moderation data...');
  };

  const handleExport = () => {
    alert('Moderation data exported successfully!');
    console.log('Exporting moderation data...');
  };

  const handleApprove = (id) => {
    alert(`Content approved successfully!`);
    console.log('Approving content:', id);
  };

  const handleReject = (id) => {
    alert(`Content rejected successfully!`);
    console.log('Rejecting content:', id);
  };

  const handleResolve = (id) => {
    alert(`Issue resolved successfully!`);
    console.log('Resolving issue:', id);
  };

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'under review': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'open': return 'bg-red-100 text-red-800';
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
              <h1 className="text-2xl font-bold text-gray-900">Content Moderation</h1>
              <p className="text-gray-600">Review content, handle reports, and manage complaints</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleRefresh} variant="outline" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Refresh
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
                placeholder="Search moderation items..."
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
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {/* Moderation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="reviews" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Review Queue ({reviews.length})
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <Flag className="h-4 w-4" />
                Reported Content ({reports.length})
              </TabsTrigger>
              <TabsTrigger value="complaints" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Complaints ({complaints.length})
              </TabsTrigger>
              <TabsTrigger value="logs" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Moderation Logs ({logs.length})
              </TabsTrigger>
            </TabsList>

            {/* Review Queue */}
            <TabsContent value="reviews" className="space-y-4">
              <div className="grid gap-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{review.type}</h3>
                            <Badge className={getStatusBadgeColor(review.status)}>
                              {review.status}
                            </Badge>
                            <Badge className={getPriorityBadgeColor(review.priority)}>
                              {review.priority}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-2">{review.content}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {review.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {review.createdAt}
                            </span>
                            {review.rating && (
                              <span className="flex items-center gap-1">
                                ⭐ {review.rating}/5
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(review.id)}
                            className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReject(review.id)}
                            className="flex items-center gap-1 text-red-600 hover:text-red-700"
                          >
                            <XCircle className="h-4 w-4" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Reported Content */}
            <TabsContent value="reports" className="space-y-4">
              <div className="grid gap-4">
                {reports.map((report) => (
                  <Card key={report.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{report.type}</h3>
                            <Badge className={getStatusBadgeColor(report.status)}>
                              {report.status}
                            </Badge>
                            <Badge className={getPriorityBadgeColor(report.priority)}>
                              {report.priority}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-2">{report.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Reported by: {report.reportedBy}</span>
                            <span>Against: {report.reportedUser}</span>
                            <span>{report.createdAt}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleResolve(report.id)}
                            className="flex items-center gap-1"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Resolve
                          </Button>
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

            {/* Complaints */}
            <TabsContent value="complaints" className="space-y-4">
              <div className="grid gap-4">
                {complaints.map((complaint) => (
                  <Card key={complaint.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{complaint.subject}</h3>
                            <Badge className={getStatusBadgeColor(complaint.status)}>
                              {complaint.status}
                            </Badge>
                            <Badge className={getPriorityBadgeColor(complaint.priority)}>
                              {complaint.priority}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-2">{complaint.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>From: {complaint.complainant}</span>
                            <span>Against: {complaint.against}</span>
                            <span>{complaint.createdAt}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleResolve(complaint.id)}
                            className="flex items-center gap-1"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Resolve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <MessageSquare className="h-4 w-4" />
                            Respond
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Moderation Logs */}
            <TabsContent value="logs" className="space-y-4">
              <div className="grid gap-4">
                {logs.map((log) => (
                  <Card key={log.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <AlertCircle className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">{log.action}</span>
                            <span className="text-gray-500">by {log.moderator}</span>
                          </div>
                          <p className="text-sm text-gray-600">{log.details}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                            <span>Target: {log.target}</span>
                            <span>{log.timestamp}</span>
                          </div>
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

export default AdminModerationManagement;

