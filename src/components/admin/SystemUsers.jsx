import React, { useState } from 'react'
import AdminLayout from './AdminLayout'
import { Users, UserPlus, Shield, Clock, Search, Filter, MoreVertical, Eye, Edit, Trash2, Ban, CheckCircle } from 'lucide-react'

const SystemUsers = () => {
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const systemUsers = [
    {
      id: 1,
      name: "John Admin",
      email: "john.admin@yourunipathway.com",
      role: "super_admin",
      status: "active",
      lastLogin: "2024-01-15 14:30",
      createdAt: "2023-06-15",
      permissions: ["all"],
      avatar: "JA"
    },
    {
      id: 2,
      name: "Sarah Manager",
      email: "sarah.manager@yourunipathway.com",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-15 11:20",
      createdAt: "2023-08-22",
      permissions: ["users", "content", "analytics"],
      avatar: "SM"
    },
    {
      id: 3,
      name: "Mike Moderator",
      email: "mike.mod@yourunipathway.com",
      role: "moderator",
      status: "active",
      lastLogin: "2024-01-14 16:45",
      createdAt: "2023-10-10",
      permissions: ["content", "moderation"],
      avatar: "MM"
    },
    {
      id: 4,
      name: "Lisa Support",
      email: "lisa.support@yourunipathway.com",
      role: "support",
      status: "active",
      lastLogin: "2024-01-14 09:15",
      createdAt: "2023-11-05",
      permissions: ["support", "messages"],
      avatar: "LS"
    },
    {
      id: 5,
      name: "David Editor",
      email: "david.editor@yourunipathway.com",
      role: "editor",
      status: "inactive",
      lastLogin: "2024-01-10 13:30",
      createdAt: "2023-12-01",
      permissions: ["content"],
      avatar: "DE"
    },
    {
      id: 6,
      name: "Emma Analyst",
      email: "emma.analyst@yourunipathway.com",
      role: "analyst",
      status: "active",
      lastLogin: "2024-01-13 10:45",
      createdAt: "2024-01-02",
      permissions: ["analytics", "reports"],
      avatar: "EA"
    }
  ]

  const userStats = [
    { label: "Total Users", value: "24", change: "+3", icon: Users, color: "blue" },
    { label: "Active Users", value: "21", change: "+2", icon: CheckCircle, color: "green" },
    { label: "Admin Users", value: "6", change: "+1", icon: Shield, color: "purple" },
    { label: "Last 24h Logins", value: "18", change: "+5", icon: Clock, color: "orange" }
  ]

  const rolePermissions = {
    super_admin: ["All Permissions"],
    admin: ["User Management", "Content Management", "Analytics", "System Settings"],
    moderator: ["Content Moderation", "User Reports", "Comments"],
    support: ["Support Tickets", "Messages", "User Assistance"],
    editor: ["Content Creation", "Blog Posts", "FAQ Management"],
    analyst: ["Analytics", "Reports", "Data Export"]
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800'
      case 'admin': return 'bg-blue-100 text-blue-800'
      case 'moderator': return 'bg-purple-100 text-purple-800'
      case 'support': return 'bg-green-100 text-green-800'
      case 'editor': return 'bg-orange-100 text-orange-800'
      case 'analyst': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'inactive': return <Clock className="w-4 h-4 text-gray-600" />
      case 'suspended': return <Ban className="w-4 h-4 text-red-600" />
      default: return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">System Users</h1>
            <p className="text-gray-600">Manage admin users and their permissions</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Add User
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {userStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} this month
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Role Permissions Overview */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Role Permissions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(rolePermissions).map(([role, permissions]) => (
                <div key={role} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(role)}`}>
                      {role.replace('_', ' ').toUpperCase()}
                    </span>
                    <Shield className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="space-y-1">
                    {permissions.map((permission, index) => (
                      <div key={index} className="text-xs text-gray-600">• {permission}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="super_admin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="support">Support</option>
                <option value="editor">Editor</option>
                <option value="analyst">Analyst</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
              </select>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {systemUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-800">{user.avatar}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(user.status)}
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{user.lastLogin}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{user.createdAt}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {rolePermissions[user.role]?.slice(0, 2).map((permission, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-800">
                            {permission}
                          </span>
                        ))}
                        {rolePermissions[user.role]?.length > 2 && (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-800">
                            +{rolePermissions[user.role].length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Ban className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default SystemUsers

