import { Navigate, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../contexts/AdminAuthContext'
import { Loader2 } from 'lucide-react'

export default function AdminProtectedRoute({ 
  children, 
  requiredPermissions = [], 
  requireAll = false,
  fallbackPath = '/admin/login' 
}) {
  const { 
    adminUser, 
    isLoading, 
    hasPermission, 
    hasAnyPermission, 
    hasAllPermissions,
    isAuthenticated,
    isSuperAdmin 
  } = useAdminAuth()
  const location = useLocation()

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />
  }

  // Super Admin has access to everything - skip permission checks
  if (isSuperAdmin()) {
    return children
  }

  // Check permissions if required (for non-super admin users)
  if (requiredPermissions.length > 0) {
    let hasRequiredPermissions = false

    if (requireAll) {
      // User must have ALL specified permissions
      hasRequiredPermissions = hasAllPermissions(requiredPermissions)
    } else {
      // User must have ANY of the specified permissions
      hasRequiredPermissions = hasAnyPermission(requiredPermissions)
    }

    if (!hasRequiredPermissions) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
              <p className="text-gray-600 mb-4">
                You don't have the required permissions to access this page.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  <strong>Your Role:</strong> {adminUser?.role}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Required Permissions:</strong> {requiredPermissions.join(', ')}
                </p>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => window.history.back()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  // User is authenticated and has required permissions
  return children
}

