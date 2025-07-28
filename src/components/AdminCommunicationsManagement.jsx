import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import AdminSidebar from './AdminSidebar';
import { 
  Mail, 
  Bell, 
  MessageSquare, 
  FileText, 
  Search, 
  Filter, 
  Download,
  Plus,
  Send,
  Edit,
  Trash2,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  Settings
} from 'lucide-react';

const AdminCommunicationsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('notifications');
  const location = useLocation();

  // Sample notifications data
  const [notifications] = useState([
    {
      id: 1,
      title: 'New Student Registration',
      message: 'Emily Chen has registered for Computer Science pathway',
      type: 'info',
      recipients: 'All Counselors',
      status: 'Sent',
      createdAt: '2024-01-15 10:30:00',
      sentAt: '2024-01-15 10:35:00',
      readCount: 12,
      totalRecipients: 15
    },
    {
      id: 2,
      title: 'System Maintenance Notice',
      message: 'Scheduled maintenance on Sunday 2-4 AM',
      type: 'warning',
      recipients: 'All Users',
      status: 'Scheduled',
      createdAt: '2024-01-14 15:20:00',
      scheduledFor: '2024-01-21 02:00:00',
      readCount: 0,
      totalRecipients: 2847
    }
  ]);

  // Sample email campaigns data
  const [emailCampaigns] = useState([
    {
      id: 1,
      name: 'Welcome New Students',
      subject: 'Welcome to Your Uni Pathway!',
      template: 'welcome_template',
      recipients: 'New Students',
      status: 'Active',
      sentCount: 156,
      openRate: 68.5,
      clickRate: 12.3,
      createdAt: '2024-01-10',
      lastSent: '2024-01-15'
    },
    {
      id: 2,
      name: 'Monthly Newsletter',
      subject: 'Your Monthly University Updates',
      template: 'newsletter_template',
      recipients: 'All Students',
      status: 'Draft',
      sentCount: 0,
      openRate: 0,
      clickRate: 0,
      createdAt: '2024-01-15',
      lastSent: null
    }
  ]);

  // Sample system messages data
  const [systemMessages] = useState([
    {
      id: 1,
      type: 'Maintenance Alert',
      title: 'Scheduled System Maintenance',
      content: 'The platform will be under maintenance on Sunday from 2-4 AM AEST.',
      priority: 'High',
      status: 'Active',
      startDate: '2024-01-21',
      endDate: '2024-01-21',
      targetUsers: 'All Users',
      createdBy: 'System Admin'
    },
    {
      id: 2,
      type: 'Feature Update',
      title: 'New SOP Builder Features',
      content: 'We have added new templates and export options to the SOP Builder.',
      priority: 'Medium',
      status: 'Active',
      startDate: '2024-01-15',
      endDate: '2024-01-30',
      targetUsers: 'Students',
      createdBy: 'Product Team'
    }
  ]);

  // Sample communication logs data
  const [communicationLogs] = useState([
    {
      id: 1,
      type: 'Email',
      action: 'Campaign Sent',
      details: 'Welcome email sent to 25 new students',
      timestamp: '2024-01-15 10:30:00',
      user: 'System',
      status: 'Success',
      recipients: 25
    },
    {
      id: 2,
      type: 'Notification',
      action: 'Push Notification',
      details: 'New scholarship opportunity notification',
      timestamp: '2024-01-15 09:15:00',
      user: 'Admin User',
      status: 'Success',
      recipients: 156
    }
  ]);

  // Detect current route for tab selection
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/email')) {
      setActiveTab('email');
    } else if (path.includes('/system')) {
      setActiveTab('system');
    } else if (path.includes('/logs')) {
      setActiveTab('logs');
    } else {
      setActiveTab('notifications');
    }
  }, [location]);

  const handleRefresh = () => {
    alert('Communications data refreshed successfully!');
    console.log('Refreshing communications data...');
  };

  const handleExport = () => {
    alert('Communications data exported successfully!');
    console.log('Exporting communications data...');
  };

  const handleSendNotification = () => {
    alert('New notification form would open here');
    console.log('Creating new notification...');
  };

  const handleCreateCampaign = () => {
    alert('Email campaign builder would open here');
    console.log('Creating new email campaign...');
  };

  const handleSendCampaign = (id) => {
    alert(`Email campaign sent successfully!`);
    console.log('Sending campaign:', id);
  };

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'success': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
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

  const getTypeBadgeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'success': return 'bg-green-100 text-green-800';
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
              <h1 className="text-2xl font-bold text-gray-900">Communications</h1>
              <p className="text-gray-600">Manage notifications, email campaigns, and system messages</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleRefresh} variant="outline" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Refresh
              </Button>
              <Button onClick={handleSendNotification} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Notification
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
                placeholder="Search communications..."
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
              <option value="sent">Sent</option>
              <option value="scheduled">Scheduled</option>
              <option value="draft">Draft</option>
              <option value="active">Active</option>
            </select>
          </div>

          {/* Communications Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications ({notifications.length})
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Campaigns ({emailCampaigns.length})
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                System Messages ({systemMessages.length})
              </TabsTrigger>
              <TabsTrigger value="logs" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Communication Logs ({communicationLogs.length})
              </TabsTrigger>
            </TabsList>

            {/* Notifications */}
            <TabsContent value="notifications" className="space-y-4">
              <div className="grid gap-4">
                {notifications.map((notification) => (
                  <Card key={notification.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{notification.title}</h3>
                            <Badge className={getStatusBadgeColor(notification.status)}>
                              {notification.status}
                            </Badge>
                            <Badge className={getTypeBadgeColor(notification.type)}>
                              {notification.type}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-2">{notification.message}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Recipients: {notification.recipients}</span>
                            <span>Read: {notification.readCount}/{notification.totalRecipients}</span>
                            <span>Created: {notification.createdAt}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
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

            {/* Email Campaigns */}
            <TabsContent value="email" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Email Campaigns</h3>
                <Button onClick={handleCreateCampaign} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Campaign
                </Button>
              </div>
              <div className="grid gap-4">
                {emailCampaigns.map((campaign) => (
                  <Card key={campaign.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{campaign.name}</h3>
                            <Badge className={getStatusBadgeColor(campaign.status)}>
                              {campaign.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-2">Subject: {campaign.subject}</p>
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Recipients:</span>
                              <p className="font-medium">{campaign.recipients}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Sent:</span>
                              <p className="font-medium">{campaign.sentCount}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Open Rate:</span>
                              <p className="font-medium">{campaign.openRate}%</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Click Rate:</span>
                              <p className="font-medium">{campaign.clickRate}%</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSendCampaign(campaign.id)}
                            className="flex items-center gap-1"
                          >
                            <Send className="h-4 w-4" />
                            Send
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* System Messages */}
            <TabsContent value="system" className="space-y-4">
              <div className="grid gap-4">
                {systemMessages.map((message) => (
                  <Card key={message.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{message.title}</h3>
                            <Badge className={getStatusBadgeColor(message.status)}>
                              {message.status}
                            </Badge>
                            <Badge className={getPriorityBadgeColor(message.priority)}>
                              {message.priority}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-2">{message.content}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Type: {message.type}</span>
                            <span>Target: {message.targetUsers}</span>
                            <span>Duration: {message.startDate} - {message.endDate}</span>
                            <span>By: {message.createdBy}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                            Deactivate
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Communication Logs */}
            <TabsContent value="logs" className="space-y-4">
              <div className="grid gap-4">
                {communicationLogs.map((log) => (
                  <Card key={log.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <AlertCircle className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">{log.action}</span>
                            <Badge className={getStatusBadgeColor(log.status)}>
                              {log.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{log.details}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                            <span>Type: {log.type}</span>
                            <span>User: {log.user}</span>
                            <span>Recipients: {log.recipients}</span>
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

export default AdminCommunicationsManagement;

