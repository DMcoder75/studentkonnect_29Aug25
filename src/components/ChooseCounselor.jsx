import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { realDatabaseService } from '../services/realDatabaseService'
import { Badge } from './ui/badge'
import { 
  Users, 
  Star, 
  MessageCircle, 
  Clock, 
  Globe,
  Award,
  CheckCircle,
  Loader2
} from 'lucide-react'

export default function ChooseCounselor() {
  const { user, isAdmin } = useAuth()
  const [counselors, setCounselors] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCounselor, setSelectedCounselor] = useState(null)
  const [requestStatus, setRequestStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchCounselors()
    checkExistingRequest()
  }, [user])

  const fetchCounselors = async () => {
    try {
      setLoading(true)
      const { data, error } = await realDatabaseService.getAllCounselors()
      
      if (error) {
        console.error('Error fetching counselors:', error)
        return
      }

      // Filter only available counselors
      const availableCounselors = data?.filter(counselor => counselor.is_available) || []
      setCounselors(availableCounselors)
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const checkExistingRequest = async () => {
    if (!user?.id) return

    try {
      // Check if student already has a pending or approved counselor request
      const { data, error } = await realDatabaseService.getCounselorRequestByStudent(user.id)
      
      if (error) {
        console.error('Error checking existing request:', error)
        return
      }

      if (data && data.length > 0) {
        const request = data[0]
        setRequestStatus(request.status)
        if (request.status === 'pending' || request.status === 'approved') {
          setSelectedCounselor(request.counselor_id)
        }
      }
    } catch (err) {
      console.error('Error checking existing request:', err)
    }
  }

  const handleCounselorSelect = async (counselorId) => {
    if (!user?.id || submitting) return

    try {
      setSubmitting(true)
      
      // Create counselor request
      const requestData = {
        student_id: user.id || '550e8400-e29b-41d4-a716-446655440000', // Use actual user UUID or proper UUID fallback
        requested_counselor_id: counselorId, // Fixed column name
        status: 'pending'
        // Remove requested_at - will use created_at automatically
      }

      const { data, error } = await realDatabaseService.createCounselorRequest(requestData)
      
      if (error) {
        console.error('Error creating counselor request:', error)
        alert('Failed to submit counselor request. Please try again.')
        return
      }

      setSelectedCounselor(counselorId)
      setRequestStatus('pending')
      alert('Counselor request submitted successfully! Waiting for admin approval.')
      
    } catch (err) {
      console.error('Error submitting request:', err)
      alert('Failed to submit counselor request. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const getSelectedCounselorData = () => {
    return counselors.find(c => c.id === selectedCounselor)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-600" />
            <p className="text-gray-600">Loading counselors...</p>
          </div>
        </div>
      </div>
    )
  }

  // Show selected counselor status if already selected
  if (selectedCounselor && requestStatus) {
    const counselorData = getSelectedCounselorData()
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Counselor Request</h1>
            <p className="text-gray-600">Your counselor selection status</p>
          </div>

          {counselorData && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Selected Counselor</h2>
                <Badge 
                  className={`px-3 py-1 text-sm font-semibold ${
                    requestStatus === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      : requestStatus === 'approved'
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}
                >
                  {requestStatus === 'pending' && '⏳ Waiting Approval'}
                  {requestStatus === 'approved' && '✅ Approved'}
                  {requestStatus === 'rejected' && '❌ Rejected'}
                </Badge>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="bg-gradient-to-br from-purple-100 to-cyan-100 rounded-xl p-6 text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Users className="h-10 w-10 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{counselorData.display_name || counselorData.first_name + ' ' + counselorData.last_name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{counselorData.counselor_type} Counselor</p>
                    <div className="flex items-center justify-center mb-2">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-semibold">{counselorData.average_rating || '4.8'}</span>
                      <span className="text-sm text-gray-500 ml-1">({counselorData.total_reviews || '15'} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Experience & Specialization</h4>
                      <p className="text-gray-600 mb-2">{counselorData.years_experience || '5'}+ years experience</p>
                      <p className="text-gray-600">{counselorData.bio || 'Experienced counselor helping students achieve their academic goals.'}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Specializations</h4>
                      <div className="flex flex-wrap gap-2">
                        {(counselorData.specializations || 'general,academic').split(',').map((spec, index) => (
                          <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            {spec.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{counselorData.total_students_helped || '25'}</div>
                        <div className="text-sm text-gray-600">Students Helped</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{counselorData.success_rate || '92'}%</div>
                        <div className="text-sm text-gray-600">Success Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {requestStatus === 'pending' && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                    <p className="text-yellow-800 font-medium">Your request is pending admin approval. You will be notified once approved.</p>
                  </div>
                </div>
              )}

              {requestStatus === 'approved' && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <p className="text-green-800 font-medium">Your counselor request has been approved! You can now connect with your counselor.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Counselor</h1>
          <p className="text-gray-600">Select an experienced counselor to guide your academic journey</p>
        </div>

        {counselors.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Counselors Available</h3>
            <p className="text-gray-600">Please check back later for available counselors.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {counselors.map((counselor) => (
              <div key={counselor.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{counselor.display_name || counselor.first_name + ' ' + counselor.last_name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{counselor.counselor_type} Counselor</p>
                  <div className="flex items-center justify-center mb-2">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-semibold">{counselor.average_rating || '4.8'}</span>
                    <span className="text-sm text-gray-500 ml-1">({counselor.total_reviews || '15'})</span>
                  </div>
                  <Badge variant="outline" className="bg-white text-purple-700 border-purple-200">
                    {counselor.years_experience || '5'}+ years exp
                  </Badge>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {counselor.bio || 'Experienced counselor helping students achieve their academic goals.'}
                  </p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Specializations</h4>
                      <div className="flex flex-wrap gap-1">
                        {(Array.isArray(counselor.specializations) ? counselor.specializations : (counselor.specializations || 'general,academic').split(',')).slice(0, 3).map((spec, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                            {typeof spec === 'string' ? spec.trim() : spec}
                          </Badge>
                        ))}
                      </div>
                    </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-center">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">{counselor.total_students_helped || '25'}</div>
                      <div className="text-xs text-gray-600">Students</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">{counselor.success_rate || '92'}%</div>
                      <div className="text-xs text-gray-600">Success</div>
                    </div>
                  </div>

                  {/* Only show rate for admin users */}
                  {isAdmin && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Rate:</span>
                        <span className="font-semibold text-gray-900">
                          ${counselor.hourly_rate || '120'}/{counselor.currency || 'AUD'}/hour
                        </span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => handleCounselorSelect(counselor.id)}
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Choose This Counselor
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

