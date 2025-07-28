import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import AdminSidebar from './AdminSidebar';
import { 
  Settings, 
  Users, 
  Key, 
  FileText, 
  Database,
  Search, 
  Filter, 
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  Save,
  RefreshCw,
  Shield,
  Globe,
  Server,
  HardDrive,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const AdminSystemManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('settings');
  const location = useLocation();

  // Sample system settings data
  const [systemSettings] = useState([
    {
      id: 1,
      category: 'General',
      name: 'Platform Name',
      value: 'Your Uni Pathway',
      type: 'text',
      description: 'The display name of the platform',
      lastModified: '2024-01-15',
      modifiedBy: 'Admin User'
    },
    {
      id: 2,
      category: 'Security',
      name: 'Session Timeout',
      value: '30',
      type: 'number',
      description: 'Session timeout in minutes',
      lastModified: '2024-01-10',
      modifiedBy: 'System Admin'
    },
    {
      id: 3,
      category: 'Email',
      name: 'SMTP Server',
      value: 'smtp.gmail.com',
      type: 'text',
      description: 'SMTP server for email notifications',
      lastModified: '2024-01-05',
      modifiedBy: 'Tech Admin'
    },
    {
      id: 4,
      category: 'Features',
      name: 'Enable SOP Builder',
      value: 'true',
      type: 'boolean',
      description: 'Enable/disable SOP Builder feature',
      lastModified: '2024-01-12',
      modifiedBy: 'Product Manager'
    }
  ]);

  // Sample user roles data
  const [userRoles] = useState([
    {
      id: 1,
      name: 'Super Admin',
      description: 'Full system access and control',
      permissions: ['all'],
      userCount: 2,
      createdAt: '2024-01-01',
      lastModified: '2024-01-15',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Content Manager',
      description: 'Manage content and university data',
      permissions: ['manage_content', 'manage_universities', 'view_analytics'],
      userCount: 3,
      createdAt: '2024-01-01',
      lastModified: '2024-01-10',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Support Agent',
      description: 'Handle customer support and tickets',
      permissions: ['view_students', 'manage_tickets', 'view_counselors'],
      userCount: 5,
      createdAt: '2024-01-01',
      lastModified: '2024-01-08',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Analytics Viewer',
      description: 'View reports and analytics only',
      permissions: ['view_analytics', 'view_reports'],
      userCount: 2,
      createdAt: '2024-01-01',
      lastModified: '2024-01-05',
      status: 'Active'
    }
  ]);

  // Sample API management data
  const [apiData] = useState([
    {
      id: 1,
      name: 'Student API',
      endpoint: '/api/v1/students',
      method: 'GET',
      status: 'Active',
      requestsToday: 1247,
      avgResponseTime: 145,
      lastUsed: '2024-01-15 10:30:00',
      rateLimit: '1000/hour',
      version: 'v1.2.3'
    },
    {
      id: 2,
      name: 'Counselor API',
      endpoint: '/api/v1/counselors',
      method: 'GET',
      status: 'Active',
      requestsToday: 892,
      avgResponseTime: 98,
      lastUsed: '2024-01-15 10:25:00',
      rateLimit: '500/hour',
      version: 'v1.1.0'
    },
    {
      id: 3,
      name: 'University Search API',
      endpoint: '/api/v1/universities/search',
      method: 'POST',
      status: 'Active',
      requestsToday: 2156,
      avgResponseTime: 234,
      lastUsed: '2024-01-15 10:32:00',
      rateLimit: '2000/hour',
      version: 'v2.0.1'
    }
  ]);

  // Sample system logs data
  const [systemLogs] = useState([
    {
      id: 1,
      level: 'INFO',
      message: 'User login successful',
      timestamp: '2024-01-15 10:30:15',
      source: 'Authentication Service',
      userId: 'user_123',
      ipAddress: '192.168.1.100',
      details: 'User admin@yourunipathway.com logged in successfully'
    },
    {
      id: 2,
      level: 'WARNING',
      message: 'High API usage detected',
      timestamp: '2024-01-15 10:25:30',
      source: 'API Gateway',
      userId: null,
      ipAddress: '203.45.67.89',
      details: 'API endpoint /api/v1/universities exceeded 80% of rate limit'
    },
    {
      id: 3,
      level: 'ERROR',
      message: 'Database connection timeout',
      timestamp: '2024-01-15 09:45:12',
      source: 'Database Service',
      userId: null,
      ipAddress: null,
      details: 'Connection to primary database timed out after 30 seconds'
    }
  ]);

  // Sample backup data
  const [backupData] = useState([
    {
      id: 1,
      name: 'Daily Backup - 2024-01-15',
      type: 'Automated',
      size: '2.4 GB',
      status: 'Completed',
      createdAt: '2024-01-15 02:00:00',
      duration: '45 minutes',
      location: 'AWS S3 - Primary',
      retention: '30 days'
    },
    {
      id: 2,
      name: 'Weekly Backup - 2024-01-14',
      type: 'Automated',
      size: '2.3 GB',
      status: 'Completed',
      createdAt: '2024-01-14 02:00:00',
      duration: '42 minutes',
      location: 'AWS S3 - Secondary',
      retention: '90 days'
    },
    {
      id: 3,
      name: 'Manual Backup - Pre-Update',
      type: 'Manual',
      size: '2.2 GB',
      status: 'Completed',
      createdAt: '2024-01-12 15:30:00',
      duration: '38 minutes',
      location: 'Local Storage',
      retention: '7 days'
    }
  ]);

  // Detect current route for tab selection
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/roles')) {
      setActiveTab('roles');
    } else if (path.includes('/api')) {
      setActiveTab('api');
    } else if (path.includes('/logs')) {
      setActiveTab('logs');
    } else if (path.includes('/backup')) {
      setActiveTab('backup');
    } else {
      setActiveTab('settings');
    }
  }, [location]);

  const handleRefresh = () => {
    alert('System data refreshed successfully!');
    console.log('Refreshing system data...');
  };

  const handleExport = () => {
    alert('System data exported successfully!');
    console.log('Exporting system data...');
  };

  const handleSaveSetting = (id) => {
    alert(`Setting saved successfully!`);
    console.log('Saving setting:', id);
  };

  const handleCreateRole = () => {
    alert('Role creation form would open here');
    console.log('Creating new role...');
  };

  const handleCreateBackup = () => {
    alert('Manual backup started!');
    console.log('Starting manual backup...');
  };

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelBadgeColor = (level) => {
    switch (level.toLowerCase()) {
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'debug': return 'bg-gray-100 text-gray-800';
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
              <h1 className="text-2xl font-bold text-gray-900">System Management</h1>
              <p className="text-gray-600">Configure system settings, manage roles, and monitor system health</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleRefresh} variant="outline" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
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
          {/* System Health Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">System Status</p>
                    <p className="text-2xl font-bold text-green-600">Healthy</p>
                    <p className="text-sm text-gray-500">All services operational</p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Server Uptime</p>
                    <p className="text-2xl font-bold text-gray-900">99.9%</p>
                    <p className="text-sm text-gray-500">Last 30 days</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Server className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Database Size</p>
                    <p className="text-2xl font-bold text-gray-900">2.4 GB</p>
                    <p className="text-sm text-gray-500">+12% this month</p>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <HardDrive className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">API Requests</p>
                    <p className="text-2xl font-bold text-gray-900">4,295</p>
                    <p className="text-sm text-gray-500">Today</p>
                  </div>
                  <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Globe className="h-6 w-6 text-orange-600" />
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
                placeholder="Search system data..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          {/* System Management Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings ({systemSettings.length})
              </TabsTrigger>
              <TabsTrigger value="roles" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                User Roles ({userRoles.length})
              </TabsTrigger>
              <TabsTrigger value="api" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                API Management ({apiData.length})
              </TabsTrigger>
              <TabsTrigger value="logs" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                System Logs ({systemLogs.length})
              </TabsTrigger>
              <TabsTrigger value="backup" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Backups ({backupData.length})
              </TabsTrigger>
            </TabsList>

            {/* System Settings */}
            <TabsContent value="settings" className="space-y-4">
              <div className="grid gap-4">
                {systemSettings.map((setting) => (
                  <Card key={setting.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{setting.name}</h3>
                            <Badge className="bg-blue-100 text-blue-800">
                              {setting.category}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{setting.description}</p>
                          <div className="flex items-center gap-4">
                            {setting.type === 'boolean' ? (
                              <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <option value="true" selected={setting.value === 'true'}>Enabled</option>
                                <option value="false" selected={setting.value === 'false'}>Disabled</option>
                              </select>
                            ) : (
                              <input
                                type={setting.type}
                                defaultValue={setting.value}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            Last modified: {setting.lastModified} by {setting.modifiedBy}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSaveSetting(setting.id)}
                            className="flex items-center gap-1"
                          >
                            <Save className="h-4 w-4" />
                            Save
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* User Roles */}
            <TabsContent value="roles" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">User Roles & Permissions</h3>
                <Button onClick={handleCreateRole} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Role
                </Button>
              </div>
              <div className="grid gap-4">
                {userRoles.map((role) => (
                  <Card key={role.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{role.name}</h3>
                            <Badge className={getStatusBadgeColor(role.status)}>
                              {role.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{role.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {role.permissions.map((permission, index) => (
                              <Badge key={index} className="bg-gray-100 text-gray-800">
                                {permission}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Users: {role.userCount}</span>
                            <span>Created: {role.createdAt}</span>
                            <span>Modified: {role.lastModified}</span>
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

            {/* API Management */}
            <TabsContent value="api" className="space-y-4">
              <div className="grid gap-4">
                {apiData.map((api) => (
                  <Card key={api.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{api.name}</h3>
                            <Badge className={getStatusBadgeColor(api.status)}>
                              {api.status}
                            </Badge>
                            <Badge className="bg-gray-100 text-gray-800">
                              {api.method}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3 font-mono text-sm">{api.endpoint}</p>
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Requests Today:</span>
                              <p className="font-medium">{api.requestsToday.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Avg Response:</span>
                              <p className="font-medium">{api.avgResponseTime}ms</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Rate Limit:</span>
                              <p className="font-medium">{api.rateLimit}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Version:</span>
                              <p className="font-medium">{api.version}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">Last used: {api.lastUsed}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Eye className="h-4 w-4" />
                            View Docs
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Edit className="h-4 w-4" />
                            Configure
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* System Logs */}
            <TabsContent value="logs" className="space-y-4">
              <div className="grid gap-4">
                {systemLogs.map((log) => (
                  <Card key={log.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={getLevelBadgeColor(log.level)}>
                              {log.level}
                            </Badge>
                            <span className="font-medium">{log.message}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{log.details}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span>Source: {log.source}</span>
                            {log.userId && <span>User: {log.userId}</span>}
                            {log.ipAddress && <span>IP: {log.ipAddress}</span>}
                            <span>{log.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Backups */}
            <TabsContent value="backup" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">System Backups</h3>
                <Button onClick={handleCreateBackup} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Backup
                </Button>
              </div>
              <div className="grid gap-4">
                {backupData.map((backup) => (
                  <Card key={backup.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{backup.name}</h3>
                            <Badge className={getStatusBadgeColor(backup.status)}>
                              {backup.status}
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-800">
                              {backup.type}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Size:</span>
                              <p className="font-medium">{backup.size}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Duration:</span>
                              <p className="font-medium">{backup.duration}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Location:</span>
                              <p className="font-medium">{backup.location}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Retention:</span>
                              <p className="font-medium">{backup.retention}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">Created: {backup.createdAt}</p>
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
                            <RefreshCw className="h-4 w-4" />
                            Restore
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

export default AdminSystemManagement;

