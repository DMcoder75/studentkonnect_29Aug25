import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'

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
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
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

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
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

