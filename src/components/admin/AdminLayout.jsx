import AdminSidebar from '../AdminSidebar'

export default function AdminLayout({ children, title, description }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {/* Header */}
          {(title || description) && (
            <div className="mb-8">
              {title && <h1 className="text-3xl font-bold text-gray-900">{title}</h1>}
              {description && <p className="mt-2 text-gray-600">{description}</p>}
            </div>
          )}
          
          {/* Page Content */}
          {children}
        </div>
      </div>
    </div>
  )
}

