import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import Sidebar from './Sidebar'
import StudentSidebar from './StudentSidebar'
import CounselorSidebar from './CounselorSidebar'
import AdminSidebar from './AdminSidebar'

const GlobalSidebarManager = ({ isMobileMenuOpen, onMobileMenuClose, isHomepage = false }) => {
  const { user, userRole } = useAuth()

  // Determine which sidebar to show based on user authentication and role
  const renderSidebar = () => {
    if (!user) {
      // Guest user - show regular sidebar
      return (
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={onMobileMenuClose}
          isHomepage={isHomepage}
        />
      )
    }

    // Authenticated user - show role-specific sidebar
    switch (userRole) {
      case 'student':
        return (
          <StudentSidebar 
            isMobileMenuOpen={isMobileMenuOpen}
            onMobileMenuClose={onMobileMenuClose}
          />
        )
      
      case 'counselor':
        return (
          <CounselorSidebar 
            isMobileMenuOpen={isMobileMenuOpen}
            onMobileMenuClose={onMobileMenuClose}
          />
        )
      
      case 'admin':
        return (
          <AdminSidebar 
            isMobileMenuOpen={isMobileMenuOpen}
            onMobileMenuClose={onMobileMenuClose}
          />
        )
      
      default:
        // Default to student sidebar for authenticated users without specific role
        return (
          <StudentSidebar 
            isMobileMenuOpen={isMobileMenuOpen}
            onMobileMenuClose={onMobileMenuClose}
          />
        )
    }
  }

  return renderSidebar()
}

export default GlobalSidebarManager

