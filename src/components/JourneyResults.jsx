import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, TrendingUp, Users, BookOpen, GraduationCap, Star, ChevronDown, ChevronUp, DollarSign, Calendar, Award, Briefcase } from 'lucide-react'
import Sidebar from './Sidebar'

const JourneyResults = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [pathwayData, setPathwayData] = useState(null)
  const [expandedPathways, setExpandedPathways] = useState({})
  const [error, setError] = useState(null)
  
  const profession = searchParams.get('profession')
  const state = searchParams.get('state')
  const university = searchParams.get('university')

  useEffect(() => {
    fetchPathwayData()
  }, [profession, state, university])

  const fetchPathwayData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams()
      if (profession) params.append('profession', profession)
      if (state) params.append('state', state)
      if (university) params.append('university', university)
      
      const response = await fetch(`https://y0h0i3cq8oqw.manussite.space/api/pathways?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch pathway data')
      }
      
      const data = await response.json()
      setPathwayData(data)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching pathway data:', err)
    } finally {
      setLoading(false)
    }
  }

  const togglePathwayDetails = (pathwayId) => {
    setExpandedPathways(prev => ({
      ...prev,
      [pathwayId]: !prev[pathwayId]
    }))
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Finding your perfect pathway...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <BookOpen className="h-12 w-12 mx-auto mb-2" />
              <p className="text-lg font-semibold">Error Loading Pathway Data</p>
              <p className="text-sm">{error}</p>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!pathwayData) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No pathway data available</p>
            <button 
              onClick={() => navigate('/')}
              className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'very high': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount) => {
    if (!amount) return 'N/A'
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white py-8">
          <div className="container mx-auto px-6">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </button>
            
            <h1 className="text-3xl font-bold mb-2">Your Pathway Results</h1>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">
                <strong>Profession:</strong> {profession}
              </span>
              {state && (
                <span className="bg-white/20 px-3 py-1 rounded-full">
                  <strong>State:</strong> {state}
                </span>
              )}
              {university && (
                <span className="bg-white/20 px-3 py-1 rounded-full">
                  <strong>University:</strong> {university}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          {/* General Pathways */}
          {pathwayData.generalPathways && pathwayData.generalPathways.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 mr-3 text-purple-600" />
                General Pathways for {profession}
              </h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                {pathwayData.generalPathways.map((pathway, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{pathway.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(pathway.difficulty)}`}>
                        {pathway.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{pathway.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-purple-600" />
                        <span>{pathway.duration}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="h-4 w-4 mr-2 text-yellow-500" />
                        <span>ATAR: {pathway.averageATAR}</span>
                      </div>
                    </div>
                    
                    {pathway.prerequisites && pathway.prerequisites.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Prerequisites:</h4>
                        <div className="flex flex-wrap gap-2">
                          {pathway.prerequisites.map((prereq, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                              {prereq}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* University-Specific Course Combinations */}
          {pathwayData.courseCombinations && pathwayData.courseCombinations.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <GraduationCap className="h-6 w-6 mr-3 text-cyan-600" />
                University-Specific Course Packages
              </h2>
              
              <div className="space-y-6">
                {pathwayData.courseCombinations.map((program) => (
                  <div key={program.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {program.program_name}
                          </h3>
                          <p className="text-lg text-cyan-600 font-medium">
                            {program.university_name || program.university?.name}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                              {program.program_type}
                            </span>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                              {program.total_duration}
                            </span>
                            {program.atar_requirement && (
                              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                                ATAR: {program.atar_requirement}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{program.description}</p>
                      
                      {/* Quick Info Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <DollarSign className="h-5 w-5 text-green-600 mx-auto mb-1" />
                          <p className="text-sm text-gray-600">Annual Fees</p>
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(program.annual_fees_min)} - {formatCurrency(program.annual_fees_max)}
                          </p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <Calendar className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                          <p className="text-sm text-gray-600">Applications</p>
                          <p className="font-semibold text-gray-900">{program.application_period}</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <Users className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                          <p className="text-sm text-gray-600">Employment Rate</p>
                          <p className="font-semibold text-gray-900">{program.employment_rate}%</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <Clock className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                          <p className="text-sm text-gray-600">Duration</p>
                          <p className="font-semibold text-gray-900">{program.duration_years} years</p>
                        </div>
                      </div>
                      
                      {/* Learn More Button */}
                      <button
                        onClick={() => togglePathwayDetails(program.id)}
                        className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        {expandedPathways[program.id] ? (
                          <>
                            <ChevronUp className="h-5 w-5" />
                            Show Less Details
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-5 w-5" />
                            Learn More About This Pathway
                          </>
                        )}
                      </button>
                    </div>
                    
                    {/* Expanded Details */}
                    {expandedPathways[program.id] && (
                      <div className="border-t border-gray-200 bg-gray-50 p-6">
                        <div className="grid md:grid-cols-2 gap-8">
                          {/* Financial Overview */}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                              Financial Overview
                            </h4>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Total Program Cost:</span>
                                <span className="font-semibold">
                                  {formatCurrency(program.total_cost_min)} - {formatCurrency(program.total_cost_max)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Employment Rate:</span>
                                <span className="font-semibold text-green-600">{program.employment_rate}%</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Application Requirements */}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                              Application Requirements
                            </h4>
                            <div className="space-y-2">
                              {program.additional_requirements && program.additional_requirements.map((req, idx) => (
                                <div key={idx} className="flex items-start">
                                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                  <span className="text-gray-700 text-sm">{req}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Course Breakdown */}
                        {program.courses && program.courses.length > 0 && (
                          <div className="mt-8">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <GraduationCap className="h-5 w-5 mr-2 text-purple-600" />
                              Course Breakdown
                            </h4>
                            <div className="space-y-4">
                              {program.courses.map((course, idx) => (
                                <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200">
                                  <div className="flex justify-between items-start mb-3">
                                    <h5 className="font-semibold text-gray-900">{course.course_name}</h5>
                                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                                      {course.year_level}
                                    </span>
                                  </div>
                                  <div className="grid md:grid-cols-3 gap-4 mb-3">
                                    <div>
                                      <span className="text-sm text-gray-600">Duration:</span>
                                      <p className="font-medium">{course.duration}</p>
                                    </div>
                                    <div>
                                      <span className="text-sm text-gray-600">Clinical Hours:</span>
                                      <p className="font-medium">{course.clinical_hours}</p>
                                    </div>
                                    <div>
                                      <span className="text-sm text-gray-600">ATAR:</span>
                                      <p className="font-medium">{course.atar_requirement}</p>
                                    </div>
                                  </div>
                                  {course.core_subjects && course.core_subjects.length > 0 && (
                                    <div>
                                      <span className="text-sm text-gray-600 block mb-2">Core Subjects:</span>
                                      <div className="flex flex-wrap gap-2">
                                        {course.core_subjects.map((subject, subIdx) => (
                                          <span key={subIdx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                                            {subject}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Career Outcomes */}
                        {program.career_outcomes && program.career_outcomes.length > 0 && (
                          <div className="mt-8">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <Briefcase className="h-5 w-5 mr-2 text-green-600" />
                              Career Outcomes
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              {program.career_outcomes.map((outcome, idx) => (
                                <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200">
                                  <h5 className="font-semibold text-gray-900 mb-2">{outcome.job_title}</h5>
                                  <p className="text-green-600 font-medium mb-2">
                                    {formatCurrency(outcome.salary_min)} - {formatCurrency(outcome.salary_max)}
                                  </p>
                                  <p className="text-gray-600 text-sm">{outcome.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Scholarships */}
                        {program.scholarships && program.scholarships.length > 0 && (
                          <div className="mt-8">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <Award className="h-5 w-5 mr-2 text-yellow-600" />
                              Available Scholarships
                            </h4>
                            <div className="space-y-3">
                              {program.scholarships.map((scholarship, idx) => (
                                <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200">
                                  <div className="flex justify-between items-start mb-2">
                                    <h5 className="font-semibold text-gray-900">{scholarship.name}</h5>
                                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                                      {scholarship.amount}
                                    </span>
                                  </div>
                                  <p className="text-gray-600 text-sm mb-2">{scholarship.criteria}</p>
                                  <p className="text-sm text-gray-500">
                                    <strong>Deadline:</strong> {scholarship.application_deadline}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {(!pathwayData.courseCombinations || pathwayData.courseCombinations.length === 0) && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Programs Found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any programs matching your criteria. Try adjusting your search parameters.
              </p>
              <button 
                onClick={() => navigate('/')}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Start New Search
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default JourneyResults

