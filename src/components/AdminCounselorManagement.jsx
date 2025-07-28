import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAdminAuth } from '../contexts/AdminAuthContext'
import { counselorService } from '../lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Users,
  UserCheck,
  UserX,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  Star,
  TrendingUp,
  Clock,
  DollarSign,
  Award,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Save,
  X
} from 'lucide-react'
import AdminSidebar from './AdminSidebar'

export default function AdminCounselorManagement() {
  const { adminUser, hasPermission } = useAdminAuth()
  const location = useLocation()
  const [selectedTab, setSelectedTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isLoading, setIsLoading] = useState(false)
  const [editingCounselor, setEditingCounselor] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [counselors, setCounselors] = useState([])
  const [error, setError] = useState(null)

  // Fetch counselors from database
  useEffect(() => {
    fetchCounselors()
  }, [])

  const fetchCounselors = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const { data, error } = await counselorService.getAllCounselors()
      
      if (error) {
        setError('Failed to fetch counselors: ' + error.message)
        console.error('Error fetching counselors:', error)
      } else {
        setCounselors(data || [])
      }
    } catch (err) {
      setError('Failed to fetch counselors: ' + err.message)
      console.error('Error fetching counselors:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Detect current route and set appropriate tab
  useEffect(() => {
    const path = location.pathname
    if (path.includes('/pending')) {
      setSelectedTab('pending')
    } else if (path.includes('/performance')) {
      setSelectedTab('active') // Performance shows active counselors
    } else if (path.includes('/suspended')) {
      setSelectedTab('suspended')
    } else {
      setSelectedTab('all')
    }
  }, [location.pathname])

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  const getVerificationBadge = (status) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-blue-100 text-blue-800">Verified</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }
  // Filter counselors based on search and filters
  const filteredCounselors = counselors.filter(counselor => {
    const displayName = counselor.display_name || `${counselor.first_name} ${counselor.last_name}`;
    const searchFields = [
      displayName,
      counselor.email,
      ...(Array.isArray(counselor.specializations) ? counselor.specializations : [])
    ].join(' ').toLowerCase();
    
    const matchesSearch = searchTerm === '' || searchFields.includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || counselor.status === filterStatus;
    
    let matchesTab = true;
    if (selectedTab === 'pending') {
      matchesTab = counselor.status === 'pending' || !counselor.email_verified_at;
    } else if (selectedTab === 'active') {
      matchesTab = counselor.status === 'active';
    } else if (selectedTab === 'suspended') {
      matchesTab = counselor.status === 'suspended';
    }

    return matchesSearch && matchesFilter && matchesTab
  })

  const refreshData = async () => {
    await fetchCounselors()
    alert('Counselor data refreshed successfully!')
  }

  const handleEditCounselor = (counselorId) => {
    const counselor = counselors.find(c => c.id === counselorId);
    if (counselor) {
      setEditingCounselor(counselorId);
      setEditForm({
        first_name: counselor.first_name || '',
        last_name: counselor.last_name || '',
        display_name: counselor.display_name || '',
        email: counselor.email || '',
        phone: counselor.phone || '',
        country_code: counselor.country_code || '+61',
        bio: counselor.bio || '',
        years_experience: counselor.years_experience || 0,
        counselor_type: counselor.counselor_type || 'academic',
        status: counselor.status || 'pending',
        specializations: Array.isArray(counselor.specializations) ? counselor.specializations.join(', ') : '',
        languages_spoken: Array.isArray(counselor.languages_spoken) ? counselor.languages_spoken.join(', ') : '',
        hourly_rate: counselor.hourly_rate || 0,
        is_available: counselor.is_available || false,
        is_featured: counselor.is_featured || false
      });
    }
  };

  const handleSaveCounselor = async (counselorId) => {
    setIsLoading(true);
    
    try {
      const updates = {
        first_name: editForm.first_name,
        last_name: editForm.last_name,
        display_name: editForm.display_name,
        email: editForm.email,
        phone: editForm.phone,
        country_code: editForm.country_code,
        bio: editForm.bio,
        years_experience: parseInt(editForm.years_experience) || 0,
        counselor_type: editForm.counselor_type,
        status: editForm.status,
        specializations: editForm.specializations.split(',').map(s => s.trim()).filter(s => s),
        languages_spoken: editForm.languages_spoken.split(',').map(l => l.trim()).filter(l => l),
        hourly_rate: parseFloat(editForm.hourly_rate) || 0,
        is_available: editForm.is_available,
        is_featured: editForm.is_featured
      };

      const { data, error } = await counselorService.updateCounselor(counselorId, updates);
      
      if (error) {
        alert('Error updating counselor: ' + error.message);
      } else {
        // Update local state
        setCounselors(prev => prev.map(counselor => 
          counselor.id === counselorId ? { ...counselor, ...data } : counselor
        ));
        
        setEditingCounselor(null);
        setEditForm({});
        alert('Counselor details updated successfully!');
      }
    } catch (err) {
      alert('Error updating counselor: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingCounselor(null);
    setEditForm({});
  };

  const handleFormChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDeleteCounselor = async (counselorId) => {
    const counselor = counselors.find(c => c.id === counselorId);
    if (counselor) {
      const displayName = counselor.display_name || `${counselor.first_name} ${counselor.last_name}`;
      const confirmed = confirm(`Are you sure you want to delete counselor:\n\n${displayName} (${counselor.email})?\n\nThis action cannot be undone and will affect ${counselor.current_active_students || 0} active students.`);
      
      if (confirmed) {
        setIsLoading(true);
        
        try {
          const { error } = await counselorService.deleteCounselor(counselorId);
          
          if (error) {
            alert('Error deleting counselor: ' + error.message);
          } else {
            setCounselors(prev => prev.filter(c => c.id !== counselorId));
            alert(`Counselor ${displayName} has been deleted successfully!`);
          }
        } catch (err) {
          alert('Error deleting counselor: ' + err.message);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Counselor Management</h1>
              <p className="text-gray-600">Manage counselors, verifications, and performance</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshData}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Counselor
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 space-y-6">
          
          {/* Search and Filters */}
          <Card className="shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search counselors by name, email, or specialization..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Counselor Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Counselors ({counselors.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending Verification ({counselors.filter(c => c.status === 'pending' || !c.email_verified_at).length})</TabsTrigger>
              <TabsTrigger value="active">Active ({counselors.filter(c => c.status === 'active').length})</TabsTrigger>
              <TabsTrigger value="suspended">Suspended ({counselors.filter(c => c.status === 'suspended').length})</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="space-y-6">
              {/* Counselors List */}
              <div className="grid gap-6">
                {filteredCounselors.map((counselor) => (
                  <Card key={counselor.id} className="shadow-sm border-0">
                    <CardContent className="p-6">
                      {editingCounselor === counselor.id ? (
                        /* Edit Form */
                        <div className="space-y-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Edit Counselor Details</h3>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm"
                                onClick={() => handleSaveCounselor(counselor.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={handleCancelEdit}
                              >
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                              </Button>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Personal Information */}
                            <div className="space-y-4">
                              <h4 className="font-medium text-gray-900">Personal Information</h4>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input
                                  type="text"
                                  value={editForm.first_name || ''}
                                  onChange={(e) => handleFormChange('first_name', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input
                                  type="text"
                                  value={editForm.last_name || ''}
                                  onChange={(e) => handleFormChange('last_name', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                                <input
                                  type="text"
                                  value={editForm.display_name || ''}
                                  onChange={(e) => handleFormChange('display_name', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                  type="email"
                                  value={editForm.email || ''}
                                  onChange={(e) => handleFormChange('email', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Country Code</label>
                                  <input
                                    type="text"
                                    value={editForm.country_code || ''}
                                    onChange={(e) => handleFormChange('country_code', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                  <input
                                    type="tel"
                                    value={editForm.phone || ''}
                                    onChange={(e) => handleFormChange('phone', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                <textarea
                                  value={editForm.bio || ''}
                                  onChange={(e) => handleFormChange('bio', e.target.value)}
                                  rows={3}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                  <select
                                    value={editForm.status || ''}
                                    onChange={(e) => handleFormChange('status', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  >
                                    <option value="active">Active</option>
                                    <option value="pending">Pending</option>
                                    <option value="suspended">Suspended</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Counselor Type</label>
                                  <select
                                    value={editForm.counselor_type || ''}
                                    onChange={(e) => handleFormChange('counselor_type', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  >
                                    <option value="academic">Academic</option>
                                    <option value="career">Career</option>
                                    <option value="admissions">Admissions</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            {/* Professional Information */}
                            <div className="space-y-4">
                              <h4 className="font-medium text-gray-900">Professional Information</h4>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Specializations (comma-separated)</label>
                                <input
                                  type="text"
                                  value={editForm.specializations || ''}
                                  onChange={(e) => handleFormChange('specializations', e.target.value)}
                                  placeholder="computer_science, engineering"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Years Experience</label>
                                <input
                                  type="number"
                                  value={editForm.years_experience || ''}
                                  onChange={(e) => handleFormChange('years_experience', e.target.value)}
                                  min="0"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Languages Spoken (comma-separated)</label>
                                <input
                                  type="text"
                                  value={editForm.languages_spoken || ''}
                                  onChange={(e) => handleFormChange('languages_spoken', e.target.value)}
                                  placeholder="English, Spanish, French"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate (AUD)</label>
                                <input
                                  type="number"
                                  value={editForm.hourly_rate || ''}
                                  onChange={(e) => handleFormChange('hourly_rate', e.target.value)}
                                  min="0"
                                  step="0.01"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id="is_available"
                                    checked={editForm.is_available || false}
                                    onChange={(e) => handleFormChange('is_available', e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <label htmlFor="is_available" className="text-sm font-medium text-gray-700">Available</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id="is_featured"
                                    checked={editForm.is_featured || false}
                                    onChange={(e) => handleFormChange('is_featured', e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <label htmlFor="is_featured" className="text-sm font-medium text-gray-700">Featured</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Display Mode */
                        <>
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Users className="h-6 w-6 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h3 className="text-lg font-semibold text-gray-900">
                                    {counselor.display_name || `${counselor.first_name} ${counselor.last_name}`}
                                  </h3>
                                  {getStatusBadge(counselor.status)}
                                  {counselor.email_verified_at && (
                                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                                      <CheckCircle2 className="h-3 w-3 mr-1" />
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                                  <div className="space-y-1">
                                    <div className="flex items-center">
                                      <Mail className="h-4 w-4 mr-2" />
                                      {counselor.email}
                                    </div>
                                    <div className="flex items-center">
                                      <Phone className="h-4 w-4 mr-2" />
                                      {counselor.country_code} {counselor.phone}
                                    </div>
                                    <div className="flex items-center">
                                      <Award className="h-4 w-4 mr-2" />
                                      {counselor.counselor_type}
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    <div><strong>Specializations:</strong> {Array.isArray(counselor.specializations) ? counselor.specializations.join(', ') : 'None'}</div>
                                    <div><strong>Experience:</strong> {counselor.years_experience} years</div>
                                    <div><strong>Languages:</strong> {Array.isArray(counselor.languages_spoken) ? counselor.languages_spoken.join(', ') : 'None'}</div>
                                  </div>
                                </div>
                                {counselor.bio && (
                                  <div className="mt-2 text-sm text-gray-600">
                                    <strong>Bio:</strong> {counselor.bio}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditCounselor(counselor.id)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              {hasPermission('manage_counselors') && (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-red-600 hover:text-red-700"
                                  onClick={() => handleDeleteCounselor(counselor.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </Button>
                              )}
                            </div>
                          </div>

                          {/* Performance Metrics */}
                          {counselor.status === 'active' && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                                <div className="text-center">
                                  <div className="flex items-center justify-center mb-1">
                                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                    <span className="font-semibold">{counselor.average_rating || '0.0'}</span>
                                  </div>
                                  <div className="text-gray-600">Rating</div>
                                </div>
                                <div className="text-center">
                                  <div className="font-semibold text-blue-600">{counselor.total_students_helped || 0}</div>
                                  <div className="text-gray-600">Students</div>
                                </div>
                                <div className="text-center">
                                  <div className="font-semibold text-green-600">{counselor.success_rate || 0}%</div>
                                  <div className="text-gray-600">Success Rate</div>
                                </div>
                                <div className="text-center">
                                  <div className="font-semibold text-purple-600">${counselor.hourly_rate || 0}</div>
                                  <div className="text-gray-600">Hourly Rate</div>
                                </div>
                                <div className="text-center">
                                  <div className="font-semibold text-yellow-600">{counselor.current_active_students || 0}</div>
                                  <div className="text-gray-600">Active Students</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredCounselors.length === 0 && (
                <Card className="shadow-sm border-0">
                  <CardContent className="p-12 text-center">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No counselors found</h3>
                    <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

