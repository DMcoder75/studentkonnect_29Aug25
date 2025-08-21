import React, { useState, useEffect } from 'react'
import { realDatabaseService } from '../services/realDatabaseService'
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  User, 
  Mail, 
  Calendar,
  MessageSquare,
  AlertCircle,
  Filter,
  Search,
  RefreshCw
} from 'lucide-react'

export default function AdminConnectionsManager() {
  const [connections, setConnections] = useState([])
  const [pendingConnections, setPendingConnections] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  })
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all') // all, pending, approved, rejected
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadConnections()
  }, [])

  const loadConnections = async () => {
    setLoading(true)
    try {
      const result = await realDatabaseService.getAllCounselorRequests()
      if (result.data) {
        setConnections(result.data)
        setPendingConnections(result.data.filter(conn => conn.status === 'pending'))
        
        // Calculate stats
        const total = result.data.length
        const pending = result.data.filter(conn => conn.status === 'pending').length
        const approved = result.data.filter(conn => conn.status === 'approved').length
        const rejected = result.data.filter(conn => conn.status === 'rejected').length
        
        setStats({ total, pending, approved, rejected })
      }
    } catch (error) {
      console.error('Error loading connections:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (connectionId) => {
    try {
      const result = await realDatabaseService.updateCounselorRequestStatus(connectionId, 'approved')
      if (result.data) {
        await loadConnections() // Refresh the list
        alert('Connection approved successfully!')
      }
    } catch (error) {
      console.error('Error approving connection:', error)
      alert('Failed to approve connection')
    }
  }

  const handleReject = async (connectionId, reason = '') => {
    try {
      const result = await realDatabaseService.updateCounselorRequestStatus(connectionId, 'rejected', reason)
      if (result.data) {
        await loadConnections() // Refresh the list
        alert('Connection rejected successfully!')
      }
    } catch (error) {
      console.error('Error rejecting connection:', error)
      alert('Failed to reject connection')
    }
  }

  const filteredConnections = connections.filter(conn => {
    if (filter !== 'all' && conn.status !== filter) return false
    if (searchQuery && !conn.student_id.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Connection Requests</h1>
          <p className="text-gray-600">Manage student-counselor connection requests</p>
        </div>
        <button 
          onClick={loadConnections}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-blue-600">Total</p>
              <p className="text-xl font-bold text-blue-800">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-yellow-600">Pending</p>
              <p className="text-xl font-bold text-yellow-800">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-green-600">Approved</p>
              <p className="text-xl font-bold text-green-800">{stats.approved}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-red-600">Rejected</p>
              <p className="text-xl font-bold text-red-800">{stats.rejected}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Cancelled</p>
              <p className="text-xl font-bold text-gray-800">0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Connections</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <input
          type="text"
          placeholder="Search by student name, counselor, or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Connections List */}
      <div className="bg-white rounded-lg border border-gray-200">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading connections...</p>
          </div>
        ) : filteredConnections.length === 0 ? (
          <div className="p-8 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No connections found</h3>
            <p className="text-gray-600">No connection requests have been made yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredConnections.map((connection) => (
              <div key={connection.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Student ID: {connection.student_id}</h3>
                        <p className="text-sm text-gray-600">Counselor ID: {connection.requested_counselor_id}</p>
                      </div>
                    </div>
                    
                    <div className="ml-14">
                      <p className="text-sm text-gray-700 mb-2">{connection.request_reason}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(connection.created_at).toLocaleDateString()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          connection.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          connection.status === 'approved' ? 'bg-green-100 text-green-800' :
                          connection.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {connection.status.charAt(0).toUpperCase() + connection.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {connection.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(connection.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(connection.id, 'Rejected by admin')}
                        className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

