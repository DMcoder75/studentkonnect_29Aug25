import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, MapPin, Users, Calendar, Globe, GraduationCap, Award, BookOpen, DollarSign } from 'lucide-react'
import { realDatabaseService } from '../services/realDatabaseService'

export default function UniversityDetailMobile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [university, setUniversity] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const { data, error } = await realDatabaseService.getUniversityById(parseInt(id))
        if (error) {
          console.error('Error fetching university:', error)
        } else {
          console.log('Fetched university:', data)
          setUniversity(data)
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUniversity()
  }, [id])

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50">
        {/* Mobile Back Button */}
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
          <button
            onClick={() => navigate('/universities')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="font-medium">Back to Universities</span>
          </button>
        </div>

        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading university details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!university) {
    return (
      <div className="w-full min-h-screen bg-gray-50">
        {/* Mobile Back Button */}
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
          <button
            onClick={() => navigate('/universities')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="font-medium">Back to Universities</span>
          </button>
        </div>

        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">University Not Found</h2>
            <p className="text-gray-600 mb-6">The university you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/universities')}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Back to Universities
            </button>
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
          onClick={() => navigate('/universities')}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="font-medium">Back to Universities</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-8 md:py-12">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <GraduationCap className="h-8 w-8 md:h-12 md:w-12 mr-3 md:mr-4" />
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                {university.university_name}
              </h1>
            </div>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <span className="bg-white/20 text-white text-sm font-medium px-3 py-1 rounded-full">
                {university.university_type || 'University'}
              </span>
              {university.global_ranking && (
                <span className="bg-yellow-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                  #{university.global_ranking} Global
                </span>
              )}
            </div>
            <p className="text-base md:text-lg text-purple-100 max-w-2xl mx-auto">
              {university.description || university.university_description || 'Leading university with excellent academic programs.'}
            </p>
          </div>
        </div>
      </section>

      {/* University Details */}
      <section className="py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2 text-purple-600" />
              Quick Facts
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Calendar className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Established</p>
                <p className="font-semibold">{university.established_year || 'N/A'}</p>
              </div>
              <div className="text-center">
                <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Students</p>
                <p className="font-semibold">{university.total_students ? university.total_students.toLocaleString() : 'N/A'}</p>
              </div>
              <div className="text-center">
                <Globe className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-gray-500">International</p>
                <p className="font-semibold">{university.international_students ? university.international_students.toLocaleString() : 'N/A'}</p>
              </div>
              <div className="text-center">
                <MapPin className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-semibold">{university.city}, {university.state_province}</p>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About the University</h2>
            <p className="text-gray-600 leading-relaxed">
              {university.university_description || university.description || 
               `${university.university_name} is a leading institution of higher education known for its academic excellence and research contributions.`}
            </p>
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-purple-600" />
              University Information
            </h2>
            <div className="space-y-4">
              {university.website_url && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Website</h3>
                  <a href={university.website_url} target="_blank" rel="noopener noreferrer" 
                     className="text-purple-600 hover:text-purple-800 underline">
                    {university.website_url}
                  </a>
                </div>
              )}
              
              {university.university_type && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">University Type</h3>
                  <p className="text-gray-600">{university.university_type}</p>
                </div>
              )}

              {(university.national_ranking || university.global_ranking) && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Rankings</h3>
                  <div className="space-y-1">
                    {university.national_ranking && (
                      <p className="text-gray-600">National Ranking: #{university.national_ranking}</p>
                    )}
                    {university.global_ranking && (
                      <p className="text-gray-600">Global Ranking: #{university.global_ranking}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                Apply Now
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                Download Brochure
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

