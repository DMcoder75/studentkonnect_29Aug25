import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  User, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  UserPlus,
  LogIn
} from 'lucide-react'
import Sidebar from './Sidebar'

export default function SignInPage({ isMobileMenuOpen, onMobileMenuClose }) {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required')
      return false
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address')
      return false
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return false
    }

    if (isSignUp) {
      if (!formData.firstName || !formData.lastName) {
        setError('First name and last name are required')
        return false
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    setError('')

    try {
      if (isSignUp) {
        // For demo purposes, show available demo accounts
        setSuccess(`Account creation is disabled in demo mode. Please use one of these demo accounts:
        
        priya.dubey@email.com / student123
        tanvi.kulkarni@email.com / student123
        pranav.joshi@email.com / student123
        rohit.gupta@email.com / student123
        
        And 16 more student accounts with password: student123`)
        setIsSignUp(false)
        setFormData({
          email: 'priya.dubey@email.com',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: ''
        })
      } else {
        // Import and use database authentication
        const { authService } = await import('../services/authService')
        const result = await authService.authenticateUser(formData.email, formData.password)
        
        if (result.error) {
          setError(result.error)
          return
        }
        
        if (result.user) {
          // Use the login function from auth context
          login(result.user)
          setSuccess(`Welcome back, ${result.user.first_name || result.user.firstName}! Redirecting to your dashboard...`)
          
          setTimeout(() => {
            // Redirect based on user role
            if (result.user.role === 'counselor') {
              navigate('/counselor/dashboard')
            } else {
              navigate('/student/profile')
            }
          }, 1500)
        } else {
          setError('Invalid credentials')
        }
      }
    } catch (err) {
      console.error('Authentication error:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    setError('')
    setSuccess('')
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    })
  }

  return (
    <div className="w-full">
      {/* Reduced Height Hero Section - Full Width */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-12 w-full">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-6">
          <div className="max-w-6xl mx-auto">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20 mb-4"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                {isSignUp ? 'Create Your Account' : 'Welcome Back'}
              </h1>
              <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
                {isSignUp 
                  ? 'Join thousands of students discovering their perfect university pathway'
                  : 'Sign in to continue your educational journey'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two-Column Layout Starts Here */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={true}
          onClose={() => {}}
          isHomepage={false}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={onMobileMenuClose}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full md:w-auto transition-all duration-300">
          <div className="container mx-auto px-6 py-12">
            <div className="max-w-md mx-auto">
              <Card className="shadow-xl border-0">
                <CardHeader className="text-center pb-6">
                  <div className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    {isSignUp ? <UserPlus className="h-8 w-8" /> : <LogIn className="h-8 w-8" />}
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  {error && (
                    <Alert className="mb-6 border-red-200 bg-red-50">
                      <AlertDescription className="text-red-700">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert className="mb-6 border-green-200 bg-green-50">
                      <AlertDescription className="text-green-700">
                        {success}
                      </AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {isSignUp && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="firstName"
                              name="firstName"
                              type="text"
                              placeholder="John"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              className="pl-10"
                              required={isSignUp}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="lastName"
                              name="lastName"
                              type="text"
                              placeholder="Doe"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              className="pl-10"
                              required={isSignUp}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="pl-10 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1 h-8 w-8 p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    {isSignUp && (
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="pl-10"
                            required={isSignUp}
                          />
                        </div>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {isSignUp ? 'Creating Account...' : 'Signing In...'}
                        </div>
                      ) : (
                        <>
                          {isSignUp ? <UserPlus className="mr-2 h-4 w-4" /> : <LogIn className="mr-2 h-4 w-4" />}
                          {isSignUp ? 'Create Account' : 'Sign In'}
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                    </p>
                    <Button
                      variant="link"
                      onClick={toggleMode}
                      className="text-purple-600 hover:text-purple-700 p-0 h-auto font-semibold"
                    >
                      {isSignUp ? 'Sign in here' : 'Create one here'}
                    </Button>
                  </div>

                  {!isSignUp && (
                    <div className="mt-4 text-center">
                      <Button
                        variant="link"
                        className="text-sm text-gray-500 hover:text-gray-700 p-0 h-auto"
                        onClick={() => setError('Password reset functionality coming soon!')}
                      >
                        Forgot your password?
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Additional Info */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 mb-4">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
                <div className="flex justify-center space-x-6 text-xs text-gray-400">
                  <a href="#" className="hover:text-gray-600">Terms of Service</a>
                  <a href="#" className="hover:text-gray-600">Privacy Policy</a>
                  <a href="#" className="hover:text-gray-600">Help Center</a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

