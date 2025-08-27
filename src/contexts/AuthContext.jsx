import React, { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'
import { supabase } from '../lib/supabase'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('🔍 AuthContext: Initializing authentication...')
        
        // Check localStorage first
        const savedUser = localStorage.getItem('user')
        console.log('🔍 AuthContext: savedUser from localStorage:', savedUser)
        
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser)
          console.log('🔍 AuthContext: parsedUser:', parsedUser)
          
          // For now, just trust the localStorage user without Supabase validation
          // This should fix the immediate session persistence issue
          setUser(parsedUser)
          console.log('✅ AuthContext: User restored from localStorage')
        } else {
          console.log('❌ AuthContext: No saved user found')
          setUser(null)
        }
      } catch (error) {
        console.error('❌ AuthContext: Error initializing auth:', error)
        localStorage.removeItem('user')
        setUser(null)
      } finally {
        setLoading(false)
        console.log('🔍 AuthContext: Authentication initialization complete')
      }
    }

    initializeAuth()
  }, [])

  const login = async (email, password) => {
    try {
      setLoading(true)
      
      // Use professional database authentication
      const result = await authService.authenticateUser(email, password)
      
      if (result.success && result.user) {
        setUser(result.user)
        localStorage.setItem('user', JSON.stringify(result.user))
        setLoading(false)
        return { success: true, user: result.user }
      } else {
        setLoading(false)
        return { success: false, error: result.error || 'Authentication failed' }
      }
    } catch (error) {
      console.error('Login error:', error)
      setLoading(false)
      return { success: false, error: 'Login service error' }
    }
  }

  const logout = async () => {
    try {
      // Sign out from Supabase
      await supabase.auth.signOut()
      
      // Clear local state and storage
      setUser(null)
      localStorage.removeItem('user')
    } catch (error) {
      console.error('Logout error:', error)
      // Still clear local state even if Supabase logout fails
      setUser(null)
      localStorage.removeItem('user')
    }
  }

  // Get user role for sidebar management
  const getUserRole = () => {
    if (!user) return 'guest'
    return user.role || 'student' // Default to student if no role specified
  }

  const value = {
    user,
    userRole: getUserRole(),
    isAuthenticated: user !== null, // Boolean value instead of function
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

