import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Filter, MapPin, Globe, Building2, Users, Calendar, ExternalLink, Star } from 'lucide-react'
import { realDatabaseService } from '../services/realDatabaseService'
import CountrySelector from './CountrySelector'
import Sidebar from './Sidebar'

const GlobalUniversitiesPage = ({ isMobileMenuOpen, onMobileMenuClose }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [universities, setUniversities] = useState([])
  const [filteredUniversities, setFilteredUniversities] = useState([])
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [typeFilter, setTypeFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    fetchInitialData()
  }, [])

  useEffect(() => {
    // Handle URL parameters
    const countryParam = searchParams.get('country')
    if (countryParam && countries.length > 0) {
      const country = countries.find(c => c.country_id.toString() === countryParam)
      if (country) {
        setSelectedCountry(country)
      }
    }
  }, [searchParams, countries])

  useEffect(() => {
    filterUniversities()
  }, [universities, searchTerm, selectedCountry, typeFilter, sortBy])

  const fetchInitialData = async () => {
    try {
      setLoading(true)
      
      // Fetch countries and universities in parallel
      const [countriesResult, universitiesResult] = await Promise.all([
        realDatabaseService.getAllCountries(),
        realDatabaseService.getAllUniversities()
      ])

      if (countriesResult.data) {
        setCountries(countriesResult.data)
      }

      if (universitiesResult.data) {
        setUniversities(universitiesResult.data)
      }

    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterUniversities = () => {
    let filtered = [...universities]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(uni =>
        uni.university_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (uni.state && uni.state.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (uni.n_countries && uni.n_countries.country_name.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by country
    if (selectedCountry) {
      filtered = filtered.filter(uni => uni.country_id === selectedCountry.country_id)
    }

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(uni => 
        uni.type && uni.type.toLowerCase().includes(typeFilter.toLowerCase())
      )
    }

    // Sort universities
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.university_name.localeCompare(b.university_name)
        case 'country':
          return (a.n_countries?.country_name || '').localeCompare(b.n_countries?.country_name || '')
        case 'ranking':
          return (a.national_ranking || 999) - (b.national_ranking || 999)
        case 'established':
          return (b.established || 0) - (a.established || 0)
        default:
          return 0
      }
    })

    setFilteredUniversities(filtered)
  }

  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
    
    // Update URL parameters
    const newSearchParams = new URLSearchParams(searchParams)
    if (country) {
      newSearchParams.set('country', country.country_id.toString())
    } else {
      newSearchParams.delete('country')
    }
    setSearchParams(newSearchParams)
  }

  const getUniversityTypeColor = (type) => {
    if (!type) return 'bg-gray-100 text-gray-700'
    
    const lowerType = type.toLowerCase()
    if (lowerType.includes('public')) return 'bg-blue-100 text-blue-700'
    if (lowerType.includes('private')) return 'bg-purple-100 text-purple-700'
    if (lowerType.includes('research')) return 'bg-green-100 text-green-700'
    return 'bg-gray-100 text-gray-700'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Hero Section - Full Width */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white py-12 w-full">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-6">
          <div className="max-w-6xl mx-auto text-center">
            <Globe className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
              Global Universities
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              Discover world-class universities across major educational destinations. 
              Find your perfect institution for overseas education.
            </p>
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
          {/* Search and Filters */}
          <div className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search universities..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Country Selector */}
                <CountrySelector
                  selectedCountry={selectedCountry}
                  onCountrySelect={handleCountrySelect}
                  className="w-full"
                />

                {/* Type Filter */}
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="research">Research</option>
                </select>

                {/* Sort By */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="name">Sort by Name</option>
                  <option value="country">Sort by Country</option>
                  <option value="ranking">Sort by Ranking</option>
                  <option value="established">Sort by Year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCountry 
                  ? `Universities in ${selectedCountry.country_name}` 
                  : 'All Universities'
                }
              </h2>
              <p className="text-gray-600">
                Showing {filteredUniversities.length} of {universities.length} universities
              </p>
            </div>

            {filteredUniversities.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No universities found</h3>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUniversities.map((university) => (
                  <div key={university.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {university.university_name}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">
                            {university.city}
                            {university.state && `, ${university.state}`}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-3">
                          <Globe className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">
                            {university.n_countries?.country_name || 'Unknown'}
                          </span>
                        </div>
                      </div>
                      {university.national_ranking && (
                        <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                          <Star className="h-3 w-3 mr-1" />
                          #{university.national_ranking}
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      {university.type && (
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getUniversityTypeColor(university.type)}`}>
                          {university.type}
                        </span>
                      )}

                      <div className="flex justify-between items-center text-sm text-gray-600">
                        {university.established && (
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Est. {university.established}</span>
                          </div>
                        )}
                        {university.student_count && (
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{university.student_count.toLocaleString()} students</span>
                          </div>
                        )}
                      </div>

                      {university.total_programs && (
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">{university.total_programs}</span> programs available
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-4 border-t">
                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                          View Programs
                        </button>
                        {university.website_domain && (
                          <a
                            href={`https://${university.website_domain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-600 hover:text-gray-700 text-sm"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Visit Website
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default GlobalUniversitiesPage

