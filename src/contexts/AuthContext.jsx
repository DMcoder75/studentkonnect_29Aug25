import { createContext, useContext, useState, useEffect } from 'react'

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

  const login = (email, password) => {
    // Predefined user data for demo - multiple user types
    const userData = {
      'priya.dubey@email.com': {
        id: 1,
        email: 'priya.dubey@email.com',
        name: 'Priya Dubey',
        firstName: 'Priya',
        role: 'student',
        profileCompletion: 33,
        personalInfo: {
          fullName: 'Priya Dubey',
          nationality: 'Not specified',
          currentLocation: 'Not specified',
          phone: '+91-9876543210'
        },
        academicBackground: {
          currentInstitution: 'Not specified',
          currentEducationLevel: 'Not Specified',
          expectedGraduationYear: 'Not specified',
          currentGPA: 'Not specified',
          previousEducation: 'Not specified'
        },
        preferences: {
          targetCountries: [],
          targetUniversities: [],
          interestedPrograms: [],
          budgetRange: 'Not specified'
        },
        connections: 2,
        joinedDate: '2024-01-15'
      },
      'counselor@email.com': {
        id: 2,
        email: 'counselor@email.com',
        name: 'Dr. Sarah Chen',
        firstName: 'Sarah',
        lastName: 'Chen',
        role: 'counselor',
        specializations: ['Computer Science', 'Engineering'],
        experience: '8 years',
        rating: 4.9,
        studentsHelped: 23,
        successRate: 95,
        joinedDate: '2023-06-10'
      },
      'admin@email.com': {
        id: 3,
        email: 'admin@email.com',
        name: 'System Administrator',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        permissions: ['all'],
        joinedDate: '2023-01-01'
      }
    }

    if (userData[email] && password === 'password123') {
      const user = userData[email]
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      return { success: true, user: user }
    }
    
    return { success: false, error: 'Invalid credentials' }
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

