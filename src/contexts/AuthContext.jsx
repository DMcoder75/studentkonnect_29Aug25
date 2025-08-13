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
    // Predefined student data for demo
    const studentData = {
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
      }
    }

    if (studentData[email] && password === 'password123') {
      const userData = studentData[email]
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      return { success: true, user: userData }
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

  const value = {
    user,
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

