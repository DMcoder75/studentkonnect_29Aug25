import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../contexts/AdminAuthContext'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { 
  LayoutDashboard,
  Users,
  GraduationCap,
  Award,
  BarChart3,
  Settings,
  Shield,
  Bell,
  FileText,
  MessageSquare,
  DollarSign,
  Activity,
  AlertTriangle,
  LogOut,
  ChevronDown,
  ChevronRight,
  User,
  UserCheck,
  UserX,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Globe,
  Lock,
  Database,
  Mail,
  Calendar,
  Target,
  TrendingUp,
  PieChart,
  BarChart,
  LineChart,
  BookOpen,
  CreditCard,
  HelpCircle,
  LifeBuoy,
  Phone,
  Headphones,
  Clock
} from 'lucide-react'

export default function AdminSidebar() {
  const [expandedItems, setExpandedItems] = useState({})
  const location = useLocation()
  const navigate = useNavigate()
  const { adminUser, logout, hasPermission } = useAdminAuth()

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => {
      // If clicking on an already expanded item, collapse it
      if (prev[itemId]) {
        return {
          ...prev,
          [itemId]: false
        }
      }
      
      // If clicking on a collapsed item, expand it and keep others as they are
      return {
        ...prev,
        [itemId]: true
      }
    })
  }

  // Auto-expand parent menu if current route matches a submenu item
  React.useEffect(() => {
    const currentPath = location.pathname
    
    menuItems.forEach(item => {
      if (item.submenu) {
        const hasActiveSubmenu = item.submenu.some(subItem => subItem.path === currentPath)
        if (hasActiveSubmenu && !expandedItems[item.id]) {
          setExpandedItems(prev => ({
            ...prev,
            [item.id]: true
          }))
        }
      }
    })
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const menuItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: LayoutDashboard,
      permission: 'view_dashboard'
    },
    {
      id: 'consular-engagement',
      name: 'Consular-Student Engagement',
      icon: MessageSquare,
      permission: 'manage_engagement',
      submenu: [
        { name: 'Engagement Requests', path: '/admin/engagement/requests', icon: MessageSquare, badge: '15' },
        { name: 'Active Engagements', path: '/admin/engagement/active', icon: UserCheck },
        { name: 'Pending Approval', path: '/admin/engagement/pending', icon: Clock },
        { name: 'Rejected Mappings', path: '/admin/engagement/rejected', icon: UserX },
        { name: 'Reassignment Queue', path: '/admin/engagement/reassign', icon: RefreshCw },
        { name: 'Engagement Analytics', path: '/admin/engagement/analytics', icon: BarChart3 }
      ]
    },
    {
      id: 'counselors',
      name: 'Counselor Management',
      icon: Users,
      permission: 'manage_counselors',
      submenu: [
        { name: 'All Counselors', path: '/admin/counselors', icon: Users },
        { name: 'Pending Verification', path: '/admin/counselors/pending', icon: UserCheck, badge: '5' },
        { name: 'Performance Review', path: '/admin/counselors/performance', icon: TrendingUp },
        { name: 'Suspended Accounts', path: '/admin/counselors/suspended', icon: UserX }
      ]
    },
    {
      id: 'students',
      name: 'Student Management',
      icon: GraduationCap,
      permission: 'manage_students',
      submenu: [
        { name: 'All Students', path: '/admin/students', icon: GraduationCap },
        { name: 'Active Applications', path: '/admin/students/applications', icon: FileText },
        { name: 'Success Stories', path: '/admin/students/success', icon: Award },
        { name: 'Support Tickets', path: '/admin/students/support', icon: MessageSquare, badge: '12' }
      ]
    },
    {
      id: 'scholarships',
      name: 'Scholarship Management',
      icon: Award,
      permission: 'manage_scholarships',
      submenu: [
        { name: 'All Scholarships', path: '/admin/scholarships', icon: Award },
        { name: 'Add New Scholarship', path: '/admin/scholarships/new', icon: Plus },
        { name: 'Application Tracking', path: '/admin/scholarships/applications', icon: Target },
        { name: 'Provider Management', path: '/admin/scholarships/providers', icon: Globe }
      ]
    },
    {
      id: 'analytics',
      name: 'Analytics & Reports',
      icon: BarChart3,
      permission: 'view_analytics',
      submenu: [
        { name: 'Platform Overview', path: '/admin/analytics/overview', icon: BarChart3 },
        { name: 'Performance Metrics', path: '/admin/analytics/performance', icon: TrendingUp },
        { name: 'Financial Reports', path: '/admin/analytics/financial', icon: DollarSign },
        { name: 'User Engagement', path: '/admin/analytics/engagement', icon: Activity },
        { name: 'Custom Reports', path: '/admin/analytics/custom', icon: PieChart }
      ]
    },
    {
      id: 'content',
      name: 'Content Management',
      icon: FileText,
      permission: 'manage_content',
      submenu: [
        { name: 'University Database', path: '/admin/content/universities', icon: GraduationCap },
        { name: 'Course Information', path: '/admin/content/courses', icon: BookOpen },
        { name: 'Blog & Articles', path: '/admin/content/blog', icon: FileText },
        { name: 'FAQ Management', path: '/admin/content/faq', icon: MessageSquare }
      ]
    },
    {
      id: 'moderation',
      name: 'Content Moderation',
      icon: Shield,
      permission: 'moderate_reviews',
      submenu: [
        { name: 'Review Queue', path: '/admin/moderation/reviews', icon: Eye, badge: '8' },
        { name: 'Reported Content', path: '/admin/moderation/reports', icon: AlertTriangle, badge: '3' },
        { name: 'User Complaints', path: '/admin/moderation/complaints', icon: MessageSquare },
        { name: 'Moderation Logs', path: '/admin/moderation/logs', icon: FileText }
      ]
    },
    {
      id: 'communications',
      name: 'Communications',
      icon: Mail,
      permission: 'send_notifications',
      submenu: [
        { name: 'Send Notifications', path: '/admin/communications/notifications', icon: Bell },
        { name: 'Email Campaigns', path: '/admin/communications/email', icon: Mail },
        { name: 'System Messages', path: '/admin/communications/system', icon: MessageSquare },
        { name: 'Communication Logs', path: '/admin/communications/logs', icon: FileText }
      ]
    },
    {
      id: 'financial',
      name: 'Financial Management',
      icon: DollarSign,
      permission: 'view_financial_reports',
      submenu: [
        { name: 'Revenue Overview', path: '/admin/financial/revenue', icon: DollarSign },
        { name: 'Commission Tracking', path: '/admin/financial/commissions', icon: TrendingUp },
        { name: 'Payment Processing', path: '/admin/financial/payments', icon: CreditCard },
        { name: 'Financial Reports', path: '/admin/financial/reports', icon: BarChart }
      ]
    },
    {
      id: 'system',
      name: 'System Management',
      icon: Settings,
      permission: 'manage_system_settings',
      submenu: [
        { name: 'Platform Settings', path: '/admin/system/settings', icon: Settings },
        { name: 'User Roles', path: '/admin/system/roles', icon: Shield },
        { name: 'API Management', path: '/admin/system/api', icon: Database },
        { name: 'System Logs', path: '/admin/system/logs', icon: FileText },
        { name: 'Backup & Recovery', path: '/admin/system/backup', icon: Download }
      ]
    },
    {
      id: 'support',
      name: 'For Support',
      icon: LifeBuoy,
      permission: 'view_support',
      submenu: [
        { name: 'Support Dashboard', path: '/admin/support/dashboard', icon: LifeBuoy },
        { name: 'Application Support', path: '/admin/support/applications', icon: HelpCircle },
        { name: 'Technical Issues', path: '/admin/support/technical', icon: Settings, badge: '7' },
        { name: 'User Assistance', path: '/admin/support/users', icon: Headphones },
        { name: 'Knowledge Base', path: '/admin/support/knowledge', icon: BookOpen },
        { name: 'Contact Support', path: '/admin/support/contact', icon: Phone }
      ]
    }
  ]

  const isActive = (path) => {
    return location.pathname === path
  }

  const isParentActive = (submenu) => {
    return submenu?.some(item => location.pathname === item.path)
  }

  const filteredMenuItems = menuItems.filter(item => 
    !item.permission || hasPermission(item.permission)
  )

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Admin Portal</h2>
            <p className="text-xs text-gray-600">YourUniPathway</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{adminUser?.name}</p>
            <p className="text-xs text-gray-600 capitalize">{adminUser?.role?.replace('_', ' ')}</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon
            const hasSubmenu = item.submenu && item.submenu.length > 0
            const isExpanded = expandedItems[item.id]
            const isItemActive = item.path ? isActive(item.path) : isParentActive(item.submenu)

            return (
              <div key={item.id}>
                {/* Main Menu Item */}
                {item.path ? (
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isItemActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.name}
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                ) : (
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isItemActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.name}
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto mr-2">
                        {item.badge}
                      </Badge>
                    )}
                    {hasSubmenu && (
                      isExpanded ? (
                        <ChevronDown className="ml-auto h-4 w-4" />
                      ) : (
                        <ChevronRight className="ml-auto h-4 w-4" />
                      )
                    )}
                  </button>
                )}

                {/* Submenu */}
                {hasSubmenu && isExpanded && (
                  <div className="mt-1 ml-4 space-y-1">
                    {item.submenu.map((subItem) => {
                      const SubIcon = subItem.icon
                      return (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                            isActive(subItem.path)
                              ? 'bg-blue-50 text-blue-600 border-l-2 border-blue-600'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <SubIcon className="mr-3 h-3 w-3" />
                          {subItem.name}
                          {subItem.badge && (
                            <Badge variant="secondary" className="ml-auto text-xs">
                              {subItem.badge}
                            </Badge>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}

