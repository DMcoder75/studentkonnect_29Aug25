import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, GraduationCap, Search } from 'lucide-react'
import { realDatabaseService } from '../services/realDatabaseService'

export default function UniversitiesPageSimple() {
  const navigate = useNavigate()
  const [allUniversities, setAllUniversities] = useState([])
  const [universities, setUniversities] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const ITEMS_PER_PAGE = 6

  // Fetch all universities
  useEffect(() => {
    const loadUniversities = async () => {
      try {
        setLoading(true)
        const result = await realDatabaseService.getAllUniversities()
        
        if (result.error) {
          console.error('Error loading universities:', result.error)
          return
        }

        console.log('Fetched universities:', result.data)
        
        // Debug: Check what fields are available in the first university
        if (result.data && result.data.length > 0) {
          console.log('=== DATABASE FIELD ANALYSIS ===')
          console.log('Total universities:', result.data.length)
          console.log('Sample university fields:', Object.keys(result.data[0]))
          console.log('Sample university data:', result.data[0])
          
          // Check specific fields we want to display
          const sampleUni = result.data[0]
          console.log('Available fields for cards:')
          console.log('- university_name:', sampleUni.university_name)
          console.log('- university_type:', sampleUni.university_type)
          console.log('- city:', sampleUni.city)
          console.log('- established_year:', sampleUni.established_year)
          console.log('- total_programs:', sampleUni.total_programs)
          console.log('- national_ranking:', sampleUni.national_ranking)
          console.log('- more_info:', sampleUni.more_info)
          console.log('- website_domain:', sampleUni.website_domain)
          console.log('=== END FIELD ANALYSIS ===')
          
          // Check for website-related fields
          const websiteFields = Object.keys(result.data[0]).filter(key => 
            key.toLowerCase().includes('website') || 
            key.toLowerCase().includes('url') ||
            key.toLowerCase().includes('link')
          )
          console.log('Website-related fields found:', websiteFields)
        }
        
        setAllUniversities(result.data || [])
      } catch (error) {
        console.error('Error loading universities:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUniversities()
  }, [])

  // Filter universities based on search query
  const filteredUniversities = useMemo(() => {
    if (!searchQuery.trim()) return allUniversities
    
    return allUniversities.filter(university => 
      university.university_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.state_province?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.university_type?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [allUniversities, searchQuery])

  // Group universities by first letter for alphabetic navigation
  const universitiesByLetter = useMemo(() => {
    const grouped = {}
    filteredUniversities.forEach(university => {
      const firstLetter = university.university_name?.charAt(0).toUpperCase() || '#'
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = []
      }
      grouped[firstLetter].push(university)
    })
    return grouped
  }, [filteredUniversities])

  // Update displayed universities when filter changes
  useEffect(() => {
    const startIndex = 0
    const endIndex = page * ITEMS_PER_PAGE
    const pageData = filteredUniversities.slice(startIndex, endIndex)
    setUniversities(pageData)
    setHasMore(endIndex < filteredUniversities.length)
  }, [filteredUniversities, page])

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true)
      setTimeout(() => {
        setPage(prev => prev + 1)
        setLoadingMore(false)
      }, 500)
    }
  }

  // Function to scroll to specific letter section
  const scrollToLetter = (letter) => {
    const element = document.getElementById(`letter-${letter}`)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // Scroll event handler for infinite scroll
  const handleScroll = useCallback(() => {
    if (loadingMore || !hasMore) return

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight

    if (scrollTop + windowHeight >= documentHeight - 200) {
      loadMore()
    }
  }, [loadingMore, hasMore])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50">
        {/* Mobile Back Button */}
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="font-medium">Back to Home</span>
          </button>
        </div>

        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading universities...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Mobile Back Button - Only visible on mobile */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="font-medium">Back to Home</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-12">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <GraduationCap className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Universities
              </h1>
            </div>
            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto mb-8">
              Explore Australia's leading universities and find the perfect institution for your academic journey.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search universities, cities, or types..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              {searchQuery && (
                <p className="text-sm text-purple-100 mt-2">
                  Found {filteredUniversities.length} universities
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Universities Grid with Alphabetic Navigation */}
      <section className="py-12 px-4 md:px-6 relative">
        <div className="max-w-7xl mx-auto">
          
          {/* Alphabetic Navigation - Fixed on right side */}
          <div className="fixed right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-lg shadow-lg p-2 hidden md:block">
            <div className="flex flex-col space-y-1">
              {Object.keys(universitiesByLetter).sort().map(letter => (
                <button
                  key={letter}
                  onClick={() => scrollToLetter(letter)}
                  className="w-8 h-8 text-xs font-medium text-purple-600 hover:bg-purple-100 rounded transition-colors"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {/* Universities by Letter */}
          {Object.keys(universitiesByLetter).sort().map(letter => (
            <div key={letter} id={`letter-${letter}`} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                {letter}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {universitiesByLetter[letter].slice(0, universities.length).map((university) => (
                  <div key={university.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{university.university_name}</h3>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {university.university_type || 'University'}
                          </span>
                          {university.global_ranking && (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              #{university.global_ranking}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center ml-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">
                          {university.average_rating || university.rating || '4.0'}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {university.more_info || (() => {
                        // Create 6 different random descriptions to avoid repetitive content
                        const randomDescriptions = [
                          `${university.university_name} is a prestigious institution known for its innovative research and academic excellence in ${university.city}.`,
                          `Located in ${university.city}, ${university.university_name} offers world-class education with a focus on student success and career development.`,
                          `${university.university_name} stands as a leading educational institution, providing comprehensive programs and fostering intellectual growth since ${university.established || 'its establishment'}.`,
                          `Renowned for its academic rigor and research contributions, ${university.university_name} in ${university.city} attracts students from around the globe.`,
                          `${university.university_name} combines traditional academic values with modern teaching methods, creating an exceptional learning environment in ${university.city}.`,
                          `As a distinguished ${(university.type || 'university').toLowerCase()}, ${university.university_name} is committed to excellence in education, research, and community engagement.`
                        ];
                        
                        // Use university ID to ensure consistent random selection for each university
                        const randomIndex = Math.abs(university.id?.charCodeAt(0) || 0) % randomDescriptions.length;
                        return randomDescriptions[randomIndex];
                      })()}
                    </p>

                    <div className="space-y-1 mb-4">
                      {/* University Type */}
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-medium">Type:</span>
                        <span className="text-gray-900">{university.university_type || 'University'}</span>
                      </div>
                      
                      {/* Location */}
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-medium">Location:</span>
                        <span className="text-gray-900">
                          {university.city}{university.state_province ? `, ${university.state_province}` : ''}{university.country ? `, ${university.country}` : ''}
                        </span>
                      </div>
                      
                      {/* Established Year */}
                      {university.established_year && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 font-medium">Established:</span>
                          <span className="text-gray-900">{university.established_year}</span>
                        </div>
                      )}
                      
                      {/* Total Programs */}
                      {university.total_programs && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 font-medium">Programs:</span>
                          <span className="text-gray-900">{university.total_programs}</span>
                        </div>
                      )}
                      
                      {/* Student Count */}
                      {university.total_students && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 font-medium">Students:</span>
                          <span className="text-gray-900">{university.total_students.toLocaleString()}</span>
                        </div>
                      )}
                      
                      {/* Rankings */}
                      {(university.national_ranking || university.global_ranking) && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 font-medium">Rankings:</span>
                          <div className="text-right">
                            {university.national_ranking && (
                              <div className="text-gray-900">National: #{university.national_ranking}</div>
                            )}
                            {university.global_ranking && (
                              <div className="text-gray-900">Global: #{university.global_ranking}</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Additional Info Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {university.campus_type && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                          {university.campus_type}
                        </span>
                      )}
                      {university.research_focus && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                          Research Focus
                        </span>
                      )}
                      {university.online_programs && (
                        <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded">
                          Online Programs
                        </span>
                      )}
                    </div>

                    <button 
                      onClick={() => {
                        // Use the correct website_domain field from database
                        let websiteUrl = university.website_domain
                        
                        // Add https:// if not present
                        if (websiteUrl && !websiteUrl.startsWith('http')) {
                          websiteUrl = 'https://' + websiteUrl
                        }
                        
                        // Fallback to Google search if no website domain
                        if (!websiteUrl) {
                          websiteUrl = `https://www.google.com/search?q=${encodeURIComponent(university.university_name + ' university official website')}`
                        }
                        
                        console.log('Opening website for:', university.university_name, 'URL:', websiteUrl)
                        window.open(websiteUrl, '_blank', 'noopener,noreferrer')
                      }}
                      className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                    >
                      Visit Website
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        
          {/* Loading More Indicator */}
          {loadingMore && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <span className="ml-3 text-gray-600">Loading more universities...</span>
            </div>
          )}
          
          {/* End of Results Indicator */}
          {!hasMore && filteredUniversities.length > 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">You've reached the end of the universities list</p>
              <p className="text-sm text-gray-400 mt-2">Total: {filteredUniversities.length} universities</p>
            </div>
          )}
          
          {/* No Results */}
          {searchQuery && filteredUniversities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No universities found for "{searchQuery}"</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

