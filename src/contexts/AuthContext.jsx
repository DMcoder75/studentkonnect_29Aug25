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
        // Check localStorage first
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser)
          
          // Validate the session is still valid by checking with Supabase
          const { data: { session }, error } = await supabase.auth.getSession()
          
          if (session && session.user) {
            // Session is valid, keep the user logged in
            setUser(parsedUser)
          } else {
            // Session expired, clear localStorage
            localStorage.removeItem('user')
            setUser(null)
          }
        } else {
          // No saved user, check if there's an active Supabase session
          const { data: { session }, error } = await supabase.auth.getSession()
          
          if (session && session.user) {
            // There's an active session but no saved user, restore from database
            const { data: profile, error: profileError } = await supabase
              .from('users')
              .select('*')
              .eq('email', session.user.email)
              .single()
            
            if (profile && !profileError) {
              const user = {
                id: profile.id,
                email: profile.email,
                full_name: profile.first_name + ' ' + profile.last_name,
                firstName: profile.first_name,
                role: profile.role_id === 1 ? 'student' : profile.role_id === 15 ? 'counselor' : 'admin',
                profile: profile
              }
              
              setUser(user)
              localStorage.setItem('user', JSON.stringify(user))
            }
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        localStorage.removeItem('user')
        setUser(null)
      } finally {
        setLoading(false)
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

  const isAuthenticated = () => {
    return user !== null
  }

  // Get user role for sidebar management
  const getUserRole = () => {
    if (!user) return 'guest'
    return user.role || 'student' // Default to student if no role specified
  }

  const value = {
    user,
    userRole: getUserRole(),
    login,
    logout,
    isAuthenticated,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

