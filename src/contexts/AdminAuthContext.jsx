import React, { createContext, useContext, useState, useEffect } from 'react'

const AdminAuthContext = createContext()

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Admin permissions mapping
  const rolePermissions = {
    super_admin: [
      'view_dashboard',
      'manage_counselors',
      'manage_students',
      'manage_scholarships',
      'view_analytics',
      'manage_system_settings',
      'manage_users',
      'view_financial_reports',
      'manage_content',
      'moderate_reviews',
      'send_notifications',
      'export_data',
      'manage_permissions',
      'manage_universities',
      'manage_courses',
      'manage_blog',
      'manage_faq',
      'view_moderation',
      'manage_reports',
      'manage_complaints',
      'view_logs',
      'manage_communications',
      'manage_email_campaigns',
      'manage_system_messages',
      'view_communication_logs',
      'manage_financial',
      'view_revenue',
      'manage_commissions',
      'manage_payments',
      'view_financial_reports',
      'manage_system',
      'manage_settings',
      'manage_roles',
      'manage_api',
      'view_system_logs',
      'manage_backup',
      'view_engagement',
      'create_custom_reports',
      'full_admin_access'
    ],
    admin: [
      'view_dashboard',
      'manage_counselors',
      'manage_students',
      'manage_scholarships',
      'view_analytics',
      'view_financial_reports',
      'manage_content',
      'moderate_reviews',
      'send_notifications',
      'export_data'
    ]
  }

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const adminAuth = localStorage.getItem('adminAuth')
        if (adminAuth) {
          const parsedAuth = JSON.parse(adminAuth)
          
          // Check if session is still valid (24 hours)
          const loginTime = new Date(parsedAuth.loginTime)
          const now = new Date()
          const hoursDiff = (now - loginTime) / (1000 * 60 * 60)
          
          if (hoursDiff < 24) {
            setAdminUser(parsedAuth)
          } else {
            // Session expired
            localStorage.removeItem('adminAuth')
          }
        }
      } catch (error) {
        console.error('Error checking admin auth:', error)
        localStorage.removeItem('adminAuth')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email, password) => {
    try {
      // Mock authentication for demo purposes
      const mockAdminUsers = [
        { 
          email: 'admin@yourunipathway.com', 
          password: 'admin123', 
          role: 'super_admin',
          name: 'Super Admin',
          id: 1
        },
        { 
          email: 'manager@yourunipathway.com', 
          password: 'manager123', 
          role: 'admin',
          name: 'Platform Manager',
          id: 2
        },
        { 
          email: 'content@yourunipathway.com', 
          password: 'content123', 
          role: 'admin',
          name: 'Content Manager',
          id: 3
        },
        { 
          email: 'analytics@yourunipathway.com', 
          password: 'analytics123', 
          role: 'admin',
          name: 'Analytics Manager',
          id: 4
        },
        { 
          email: 'support@yourunipathway.com', 
          password: 'support123', 
          role: 'admin',
          name: 'Support Manager',
          id: 5
        }
      ]

      console.log('Attempting login with:', email, password)
      
      const user = mockAdminUsers.find(
        u => u.email === email && u.password === password
      )

      console.log('User found:', user)

      if (user) {
        const adminAuth = {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
          loginTime: new Date().toISOString()
        }

        localStorage.setItem('adminAuth', JSON.stringify(adminAuth))
        setAdminUser(adminAuth)
        console.log('Login successful, user set:', adminAuth)
        return { success: true, user: adminAuth }
      } else {
        console.log('Invalid credentials - user not found')
        return { success: false, error: 'Invalid credentials' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Login failed' }
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('adminAuth')
    setAdminUser(null)
  }

  // Check if user has specific permission
  const hasPermission = (permission) => {
    if (!adminUser) return false
    
    // Super Admin has access to everything
    if (adminUser.role === 'super_admin') return true
    
    const userPermissions = rolePermissions[adminUser.role] || []
    return userPermissions.includes(permission)
  }

  // Check if user has any of the specified permissions
  const hasAnyPermission = (permissions) => {
    if (!adminUser) return false
    
    // Super Admin has access to everything
    if (adminUser.role === 'super_admin') return true
    
    const userPermissions = rolePermissions[adminUser.role] || []
    return permissions.some(permission => userPermissions.includes(permission))
  }

  // Check if user has all specified permissions
  const hasAllPermissions = (permissions) => {
    if (!adminUser) return false
    
    // Super Admin has access to everything
    if (adminUser.role === 'super_admin') return true
    
    const userPermissions = rolePermissions[adminUser.role] || []
    return permissions.every(permission => userPermissions.includes(permission))
  }

  // Get user's role
  const getRole = () => {
    return adminUser?.role || null
  }

  // Check if user is super admin
  const isSuperAdmin = () => {
    return adminUser?.role === 'super_admin'
  }

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!adminUser
  }

  // Get user permissions
  const getPermissions = () => {
    if (!adminUser) return []
    return rolePermissions[adminUser.role] || []
  }

  // Update last activity
  const updateActivity = () => {
    if (adminUser) {
      const updatedAuth = {
        ...adminUser,
        lastActivity: new Date().toISOString()
      }
      localStorage.setItem('adminAuth', JSON.stringify(updatedAuth))
      setAdminUser(updatedAuth)
    }
  }

  const value = {
    adminUser,
    isLoading,
    login,
    logout,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getRole,
    isSuperAdmin,
    isAuthenticated,
    getPermissions,
    updateActivity
  }

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export default AdminAuthContext

