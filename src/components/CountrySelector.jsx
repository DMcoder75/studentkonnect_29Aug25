import React, { useState, useEffect } from 'react'
import { ChevronDown, Globe, MapPin } from 'lucide-react'
import { globalEducationService } from '../services/globalEducationService'

const CountrySelector = ({ onCountrySelect, selectedCountry = null, className = "" }) => {
  const [countries, setCountries] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCountries()
  }, [])

  const fetchCountries = async () => {
    try {
      setLoading(true)
      const { data, error } = await globalEducationService.getAllCountries()
      
      if (error) {
        setError('Failed to load countries')
        console.error('Error fetching countries:', error)
        return
      }

      setCountries(data || [])
    } catch (err) {
      setError('Failed to load countries')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCountrySelect = (country) => {
    onCountrySelect(country)
    setIsOpen(false)
  }

  const getSelectedCountryName = () => {
    if (!selectedCountry) return 'Select Country'
    return selectedCountry.country_name || 'Select Country'
  }

  if (loading) {
    return (
      <div className={`relative ${className}`}>
        <div className="flex items-center justify-between w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-gray-400" />
            <span className="text-gray-500">Loading countries...</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 animate-spin" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`relative ${className}`}>
        <div className="flex items-center justify-between w-full px-4 py-2 text-left bg-red-50 border border-red-300 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-red-400" />
            <span className="text-red-600 text-sm">{error}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        className="flex items-center justify-between w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-gray-500" />
          <span className="text-gray-900 font-medium">
            {getSelectedCountryName()}
          </span>
        </div>
        <ChevronDown 
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {/* All Countries Option */}
            <button
              type="button"
              className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors"
              onClick={() => handleCountrySelect(null)}
            >
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-blue-500" />
                <span className="text-gray-900 font-medium">All Countries</span>
              </div>
            </button>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Country List */}
            {countries.map((country) => (
              <button
                key={country.country_id}
                type="button"
                className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors ${
                  selectedCountry?.country_id === country.country_id 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-900'
                }`}
                onClick={() => handleCountrySelect(country)}
              >
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{country.country_name}</span>
                </div>
              </button>
            ))}

            {countries.length === 0 && (
              <div className="px-4 py-2 text-gray-500 text-sm">
                No countries available
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default CountrySelector

