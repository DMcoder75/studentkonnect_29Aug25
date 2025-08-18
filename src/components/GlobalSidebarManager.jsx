import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import SidebarNew from './SidebarNew'

const GlobalSidebarManager = ({ isMobileMenuOpen, onMobileMenuClose, isHomepage = false }) => {
  const { user, userRole } = useAuth()

  // Use the new unified sidebar for all users
  return (
    <SidebarNew 
      onMobileMenuClose={onMobileMenuClose}
    />
  )
}

export default GlobalSidebarManager

