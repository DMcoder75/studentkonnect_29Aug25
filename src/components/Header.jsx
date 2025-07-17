import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Search, User, Heart, Bell, Menu, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { dbHelpers } from '../lib/supabase'

export default function Header({ onMobileMenuToggle }) {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchQuery.trim().length > 2) {
        setIsSearching(true)
        try {
          const results = await dbHelpers.searchAll(searchQuery)
          setSearchResults(results)
          setShowResults(true)
        } catch (error) {
          console.error('Search error:', error)
        } finally {
          setIsSearching(false)
        }
      } else {
        setSearchResults(null)
        setShowResults(false)
      }
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [searchQuery])

  const handleSearchSelect = (item, type) => {
    setSearchQuery('')
    setShowResults(false)
    // Navigate to the selected item (implement navigation logic here)
    console.log('Selected:', type, item)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const getTotalResults = () => {
    if (!searchResults) return 0
    return (searchResults.universities?.length || 0) + 
           (searchResults.courses?.length || 0) + 
           (searchResults.pathways?.length || 0)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          >
            <div className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg p-2 font-bold text-lg">
              UP
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:block">Your Uni Pathway</span>
          </div>

          {/* Global Search - Visible on all devices */}
          <div className="flex-1 max-w-2xl mx-2 md:mx-8 relative" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search universities, courses, pathways..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 focus:border-purple-500 rounded-full"
                onFocus={() => searchQuery.length > 2 && setShowResults(true)}
              />
              {isSearching && (
                <div className="absolute right-3 top-3">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                </div>
              )}
            </div>

            {/* Search Results Dropdown */}
            {showResults && searchResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600">
                      {getTotalResults()} results found
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowResults(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </Button>
                  </div>

                  {/* Universities */}
                  {searchResults.universities && searchResults.universities.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-purple-600 mb-2">Universities</h4>
                      {searchResults.universities.map((uni) => (
                        <div
                          key={uni.id}
                          className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                          onClick={() => handleSearchSelect(uni, 'university')}
                        >
                          <div>
                            <div className="font-medium text-sm">{uni.name}</div>
                            <div className="text-xs text-gray-500">{uni.type}</div>
                          </div>
                          {uni.global_ranking && (
                            <Badge variant="secondary" className="text-xs">
                              #{uni.global_ranking}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Courses */}
                  {searchResults.courses && searchResults.courses.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-cyan-600 mb-2">Courses</h4>
                      {searchResults.courses.map((course) => (
                        <div
                          key={course.id}
                          className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                          onClick={() => handleSearchSelect(course, 'course')}
                        >
                          <div>
                            <div className="font-medium text-sm">{course.name}</div>
                            <div className="text-xs text-gray-500">
                              {course.universities?.name} • {course.level}
                            </div>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {course.level}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pathways */}
                  {searchResults.pathways && searchResults.pathways.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-pink-600 mb-2">Pathways</h4>
                      {searchResults.pathways.map((pathway) => (
                        <div
                          key={pathway.id}
                          className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                          onClick={() => handleSearchSelect(pathway, 'pathway')}
                        >
                          <div>
                            <div className="font-medium text-sm">{pathway.name}</div>
                            <div className="text-xs text-gray-500 line-clamp-1">
                              {pathway.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {getTotalResults() === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                      <div className="text-sm">No results found for "{searchQuery}"</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Actions - Simplified on mobile */}
          <div className="flex items-center space-x-1 md:space-x-4">
            {isAuthenticated() && (
              <>
                <Button variant="ghost" size="sm" className="relative hidden md:flex">
                  <Heart className="h-5 w-5" />
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 min-w-[1.25rem] h-5">
                    3
                  </Badge>
                </Button>
                
                <Button variant="ghost" size="sm" className="relative hidden md:flex">
                  <Bell className="h-5 w-5" />
                </Button>

                {/* User Profile Button */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                  onClick={() => navigate('/profile')}
                >
                  <User className="h-5 w-5 md:mr-2" />
                  <span className="hidden md:inline">
                    {user?.firstName || 'Profile'}
                  </span>
                </Button>

                {/* Logout Button */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 md:mr-2" />
                  <span className="hidden md:inline">Logout</span>
                </Button>
              </>
            )}

            {!isAuthenticated() && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                onClick={() => navigate('/sign-in')}
              >
                <User className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline">Sign In</span>
              </Button>
            )}

            {/* Mobile Menu Button - Positioned on the right */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden ml-2"
              onClick={onMobileMenuToggle}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

