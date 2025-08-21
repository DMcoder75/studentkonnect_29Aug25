import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminConnectionsManager from './AdminConnectionsManager'

const SimpleAdminPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  
  const stats = {
    totalUsers: 1247,
    totalUniversities: 850,
    totalCourses: 8500,
    totalApplications: 523,
    totalCounselors: 45,
    monthlyGrowth: 12.5,
    activeUsers: 892,
    pendingApplications: 67
  }

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊', description: 'Overview & Analytics' },
    { id: 'connections', name: 'Connection Requests', icon: '🔗', description: 'Manage Student-Counselor Connections' },
    { id: 'universities', name: 'Universities', icon: '🏛️', description: 'University Management' },
    { id: 'users', name: 'User Management', icon: '👥', description: 'Students, Counselors & Admins' },
    { id: 'settings', name: 'System Settings', icon: '⚙️', description: 'Platform Configuration' }
  ]

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to StudentKonnect Administration Portal</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Users</p>
              <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-700 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Universities</p>
              <p className="text-3xl font-bold">{stats.totalUniversities}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
                <path d="M12 14l9-5-9-5-9 5 9 5z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Courses</p>
              <p className="text-3xl font-bold">{stats.totalCourses.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-700 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Applications</p>
              <p className="text-3xl font-bold">{stats.totalApplications}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-gray-600">New user registration</p>
              <span className="text-xs text-gray-400">John Doe joined 2 minutes ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-600">University added</p>
              <span className="text-xs text-gray-400">MIT added to database</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Application submitted</p>
              <span className="text-xs text-gray-400">Sarah applied to Oxford</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Users</span>
              <span className="font-semibold text-gray-800">{stats.activeUsers}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending Applications</span>
              <span className="font-semibold text-orange-600">{stats.pendingApplications}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Counselors</span>
              <span className="font-semibold text-gray-800">{stats.totalCounselors}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Monthly Growth</span>
              <span className="font-semibold text-green-600">+{stats.monthlyGrowth}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPlaceholder = (title) => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <p className="text-gray-500">This section is under development.</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SK</span>
                </div>
                <span className="text-lg font-semibold text-gray-800">StudentKonnect Admin</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Admin Portal
              </div>
              <Link 
                to="/" 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                ← Back to Main Site
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Admin Menu</h2>
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-start space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'connections' && <AdminConnectionsManager />}
          {activeTab === 'universities' && renderPlaceholder('University Management')}
          {activeTab === 'users' && renderPlaceholder('User Management')}
          {activeTab === 'settings' && renderPlaceholder('System Settings')}
        </div>
      </div>
    </div>
  )
}

export default SimpleAdminPortal

