import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  GraduationCap,
  Briefcase,
  Camera,
  Edit,
  Save,
  X,
  Upload,
  Heart,
  Star,
  BookOpen,
  Building,
  Award,
  Users,
  Settings,
  Shield
} from 'lucide-react'
import Sidebar from './Sidebar'

export default function ProfilePage({ favorites, isMobileMenuOpen, onMobileMenuClose }) {
  const { user, login } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [userFavorites, setUserFavorites] = useState([])
  const fileInputRef = useRef(null)
  
  const [profileData, setProfileData] = useState({
    // Basic profile data
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    bio: '',
    profile_image_url: '',
    
    // Role-specific data
    roleSpecific: {}
  })

  useEffect(() => {
    if (user) {
      setProfileData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        date_of_birth: user.date_of_birth || '',
        bio: user.bio || '',
        profile_image_url: user.profile_image_url || '',
        roleSpecific: getRoleSpecificData(user)
      })
      loadUserFavorites()
    }
  }, [user])

  const getRoleSpecificData = (userData) => {
    switch (userData.role_name) {
      case 'student':
        return {
          student_id: userData.student_id || '',
          current_institution: userData.student_institution || '',
          study_level: userData.study_level || '',
          field_of_study: userData.field_of_study || '',
          graduation_year: userData.graduation_year || '',
          gpa: userData.gpa || '',
          university_preferences: userData.university_preferences || [],
          career_interests: userData.career_interests || [],
          extracurricular_activities: userData.extracurricular_activities || [],
          achievements: userData.achievements || []
        }
      case 'professor':
        return {
          employee_id: userData.professor_employee_id || '',
          institution_name: userData.professor_institution || '',
          department: userData.professor_department || '',
          position: userData.professor_position || '',
          specialization: userData.specialization || [],
          qualifications: userData.qualifications || [],
          research_interests: userData.research_interests || [],
          publications_count: userData.publications_count || 0,
          years_of_experience: userData.years_of_experience || '',
          office_location: userData.office_location || '',
          office_hours: userData.office_hours || '',
          courses_taught: userData.courses_taught || []
        }
      case 'authority':
        return {
          employee_id: userData.employee_id || '',
          institution_name: userData.authority_institution || '',
          institution_type: userData.institution_type || '',
          position: userData.authority_position || '',
          department: userData.department || '',
          responsibilities: userData.responsibilities || [],
          managed_programs: userData.managed_programs || [],
          institution_address: userData.institution_address || '',
          institution_website: userData.institution_website || '',
          years_in_position: userData.years_in_position || ''
        }
      case 'admin':
        return {
          admin_level: userData.admin_level || '',
          access_level: userData.access_level || 1,
          managed_modules: userData.managed_modules || [],
          admin_notes: userData.admin_notes || ''
        }
      default:
        return {}
    }
  }

  const loadUserFavorites = async () => {
    if (user?.id) {
      setUserFavorites(favorites)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleRoleSpecificChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      roleSpecific: {
        ...prev.roleSpecific,
        [name]: value
      }
    }))
    setError('')
  }

  const handleArrayInputChange = (field, value, isRoleSpecific = false) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item)
    if (isRoleSpecific) {
      setProfileData(prev => ({
        ...prev,
        roleSpecific: {
          ...prev.roleSpecific,
          [field]: items
        }
      }))
    } else {
      setProfileData(prev => ({
        ...prev,
        [field]: items
      }))
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    setImageUploading(true)
    setError('')

    try {
      
      if (result.success) {
        setProfileData(prev => ({
          ...prev,
          profile_image_url: result.imageUrl
        }))
        
        login(result.user)
        setSuccess('Profile image updated successfully!')
      } else {
        setError(result.error || 'Failed to upload image')
      }
    } catch (error) {
      setError('Failed to upload image')
    } finally {
      setImageUploading(false)
    }
  }

  const handleSaveProfile = async () => {
    setLoading(true)
    setError('')

    try {
      // Update basic profile
      const basicData = {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        phone: profileData.phone,
        date_of_birth: profileData.date_of_birth,
        bio: profileData.bio
      }

      
      if (!basicResult.success) {
        setError(basicResult.error || 'Failed to update basic profile')
        return
      }

      // Role-specific profile update would go here
      // const roleResult = await updateRoleSpecificProfile(user.id, profileData.roleSpecific, user.role_name)
      
      // For now, just show success
      login({ ...user, ...profileData.basic })
      setSuccess('Profile updated successfully!')
      setIsEditing(false)
    } catch (error) {
      setError('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelEdit = () => {
    if (user) {
      setProfileData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        date_of_birth: user.date_of_birth || '',
        bio: user.bio || '',
        profile_image_url: user.profile_image_url || '',
        roleSpecific: getRoleSpecificData(user)
      })
    }
    setIsEditing(false)
    setError('')
  }

  const getRoleIcon = (roleName) => {
    switch (roleName) {
      case 'student': return <GraduationCap className="h-5 w-5" />
      case 'professor': return <BookOpen className="h-5 w-5" />
      case 'authority': return <Building className="h-5 w-5" />
      case 'admin': return <Shield className="h-5 w-5" />
      default: return <User className="h-5 w-5" />
    }
  }

  const getRoleColor = (roleName) => {
    switch (roleName) {
      case 'student': return 'bg-blue-100 text-blue-800'
      case 'professor': return 'bg-green-100 text-green-800'
      case 'authority': return 'bg-purple-100 text-purple-800'
      case 'admin': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const renderRoleSpecificFields = () => {
    if (!user) return null

    switch (user.role_name) {
      case 'student':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="student_id">Student ID</Label>
                <Input
                  id="student_id"
                  name="student_id"
                  value={profileData.roleSpecific.student_id || ''}
                  onChange={handleRoleSpecificChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="current_institution">Current Institution</Label>
                <Input
                  id="current_institution"
                  name="current_institution"
                  value={profileData.roleSpecific.current_institution || ''}
                  onChange={handleRoleSpecificChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="study_level">Study Level</Label>
                <select
                  id="study_level"
                  name="study_level"
                  value={profileData.roleSpecific.study_level || ''}
                  onChange={handleRoleSpecificChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                >
                  <option value="">Select level</option>
                  <option value="high_school">High School</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="postgraduate">Postgraduate</option>
                  <option value="phd">PhD</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="field_of_study">Field of Study</Label>
                <Input
                  id="field_of_study"
                  name="field_of_study"
                  value={profileData.roleSpecific.field_of_study || ''}
                  onChange={handleRoleSpecificChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="graduation_year">Graduation Year</Label>
                <Input
                  id="graduation_year"
                  name="graduation_year"
                  type="number"
                  value={profileData.roleSpecific.graduation_year || ''}
                  onChange={handleRoleSpecificChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="university_preferences">University Preferences</Label>
              <Input
                id="university_preferences"
                value={(profileData.roleSpecific.university_preferences || []).join(', ')}
                onChange={(e) => handleArrayInputChange('university_preferences', e.target.value, true)}
                disabled={!isEditing}
                placeholder="Enter universities separated by commas"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {(profileData.roleSpecific.university_preferences || []).map((uni, index) => (
                  <Badge key={index} variant="secondary">
                    {uni}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="career_interests">Career Interests</Label>
              <Input
                id="career_interests"
                value={(profileData.roleSpecific.career_interests || []).join(', ')}
                onChange={(e) => handleArrayInputChange('career_interests', e.target.value, true)}
                disabled={!isEditing}
                placeholder="Enter career interests separated by commas"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {(profileData.roleSpecific.career_interests || []).map((interest, index) => (
                  <Badge key={index} variant="secondary">
                    <Briefcase className="h-3 w-3 mr-1" />
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )

      case 'professor':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="employee_id">Employee ID</Label>
                <Input
                  id="employee_id"
                  name="employee_id"
                  value={profileData.roleSpecific.employee_id || ''}
                  onChange={handleRoleSpecificChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="institution_name">Institution</Label>
                <Input
                  id="institution_name"
                  name="institution_name"
                  value={profileData.roleSpecific.institution_name || ''}
                  onChange={handleRoleSpecificChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  name="department"
                  value={profileData.roleSpecific.department || ''}
                  onChange={handleRoleSpecificChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  name="position"
                  value={profileData.roleSpecific.position || ''}
                  onChange={handleRoleSpecificChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                value={(profileData.roleSpecific.specialization || []).join(', ')}
                onChange={(e) => handleArrayInputChange('specialization', e.target.value, true)}
                disabled={!isEditing}
                placeholder="Enter specializations separated by commas"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {(profileData.roleSpecific.specialization || []).map((spec, index) => (
                  <Badge key={index} variant="secondary">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="research_interests">Research Interests</Label>
              <Input
                id="research_interests"
                value={(profileData.roleSpecific.research_interests || []).join(', ')}
                onChange={(e) => handleArrayInputChange('research_interests', e.target.value, true)}
                disabled={!isEditing}
                placeholder="Enter research interests separated by commas"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {(profileData.roleSpecific.research_interests || []).map((interest, index) => (
                  <Badge key={index} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )

      case 'authority':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="employee_id">Employee ID</Label>
                <Input
                  id="employee_id"
                  name="employee_id"
                  value={profileData.roleSpecific.employee_id || ''}
                  onChange={handleRoleSpecificChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="institution_name">Institution</Label>
                <Input
                  id="institution_name"
                  name="institution_name"
                  value={profileData.roleSpecific.institution_name || ''}
                  onChange={handleRoleSpecificChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="institution_type">Institution Type</Label>
                <select
                  id="institution_type"
                  name="institution_type"
                  value={profileData.roleSpecific.institution_type || ''}
                  onChange={handleRoleSpecificChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                >
                  <option value="">Select type</option>
                  <option value="university">University</option>
                  <option value="college">College</option>
                  <option value="school">School</option>
                  <option value="institute">Institute</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  name="position"
                  value={profileData.roleSpecific.position || ''}
                  onChange={handleRoleSpecificChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsibilities">Responsibilities</Label>
              <Input
                id="responsibilities"
                value={(profileData.roleSpecific.responsibilities || []).join(', ')}
                onChange={(e) => handleArrayInputChange('responsibilities', e.target.value, true)}
                disabled={!isEditing}
                placeholder="Enter responsibilities separated by commas"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {(profileData.roleSpecific.responsibilities || []).map((resp, index) => (
                  <Badge key={index} variant="secondary">
                    {resp}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )

      case 'admin':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="admin_level">Admin Level</Label>
                <select
                  id="admin_level"
                  name="admin_level"
                  value={profileData.roleSpecific.admin_level || ''}
                  onChange={handleRoleSpecificChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                >
                  <option value="">Select level</option>
                  <option value="super_admin">Super Admin</option>
                  <option value="system_admin">System Admin</option>
                  <option value="content_admin">Content Admin</option>
                  <option value="support_admin">Support Admin</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="access_level">Access Level (1-5)</Label>
                <Input
                  id="access_level"
                  name="access_level"
                  type="number"
                  min="1"
                  max="5"
                  value={profileData.roleSpecific.access_level || ''}
                  onChange={handleRoleSpecificChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="managed_modules">Managed Modules</Label>
              <Input
                id="managed_modules"
                value={(profileData.roleSpecific.managed_modules || []).join(', ')}
                onChange={(e) => handleArrayInputChange('managed_modules', e.target.value, true)}
                disabled={!isEditing}
                placeholder="Enter managed modules separated by commas"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {(profileData.roleSpecific.managed_modules || []).map((module, index) => (
                  <Badge key={index} variant="secondary">
                    <Settings className="h-3 w-3 mr-1" />
                    {module}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-12 w-full">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                {user.role_name.charAt(0).toUpperCase() + user.role_name.slice(1)} Profile
              </h1>
              <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
                Manage your {user.role_name} profile and preferences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two-Column Layout */}
      <div className="flex">
        <Sidebar 
          isOpen={true}
          onClose={() => {}}
          isHomepage={false}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={onMobileMenuClose}
        />

        <main className="flex-1 w-full md:w-auto transition-all duration-300">
          <div className="container mx-auto px-6 py-12">
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <Card className="shadow-xl border-0">
                  <CardHeader className="text-center pb-6">
                    <div className="relative mx-auto mb-4">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 p-1">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                          {profileData.profile_image_url ? (
                            <img 
                              src={profileData.profile_image_url} 
                              alt="Profile" 
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <User className="h-16 w-16 text-gray-400" />
                          )}
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={imageUploading}
                      >
                        {imageUploading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                        ) : (
                          <Camera className="h-4 w-4" />
                        )}
                      </Button>
                      
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                    
                    <CardTitle className="text-2xl font-bold text-gray-800">
                      {profileData.first_name} {profileData.last_name}
                    </CardTitle>
                    <p className="text-gray-600">{profileData.email}</p>
                    
                    <Badge className={`mx-auto mt-2 ${getRoleColor(user.role_name)}`}>
                      {getRoleIcon(user.role_name)}
                      <span className="ml-1 capitalize">{user.role_name}</span>
                    </Badge>
                    
                    {!isEditing && (
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="mt-4 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    )}
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-gray-600">
                        <Mail className="h-4 w-4 mr-3" />
                        <span className="text-sm">{profileData.email}</span>
                      </div>
                      
                      {profileData.phone && (
                        <div className="flex items-center text-gray-600">
                          <Phone className="h-4 w-4 mr-3" />
                          <span className="text-sm">{profileData.phone}</span>
                        </div>
                      )}
                      
                      {user.role_name === 'student' && profileData.roleSpecific.current_institution && (
                        <div className="flex items-center text-gray-600">
                          <GraduationCap className="h-4 w-4 mr-3" />
                          <span className="text-sm">{profileData.roleSpecific.current_institution}</span>
                        </div>
                      )}
                      
                      {(user.role_name === 'professor' || user.role_name === 'authority') && profileData.roleSpecific.institution_name && (
                        <div className="flex items-center text-gray-600">
                          <Building className="h-4 w-4 mr-3" />
                          <span className="text-sm">{profileData.roleSpecific.institution_name}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Profile Details */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="personal" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="role-specific">
                      {user.role_name.charAt(0).toUpperCase() + user.role_name.slice(1)} Details
                    </TabsTrigger>
                    <TabsTrigger value="favorites">Favorites</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal">
                    <Card className="shadow-xl border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>Personal Information</span>
                          {isEditing && (
                            <div className="space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={handleCancelEdit}
                              >
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                onClick={handleSaveProfile}
                                disabled={loading}
                                className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
                              >
                                {loading ? (
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                ) : (
                                  <Save className="mr-2 h-4 w-4" />
                                )}
                                Save
                              </Button>
                            </div>
                          )}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="first_name">First Name</Label>
                            <Input
                              id="first_name"
                              name="first_name"
                              value={profileData.first_name}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="last_name">Last Name</Label>
                            <Input
                              id="last_name"
                              name="last_name"
                              value={profileData.last_name}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={profileData.email}
                              disabled={true}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={profileData.phone}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="date_of_birth">Date of Birth</Label>
                          <Input
                            id="date_of_birth"
                            name="date_of_birth"
                            type="date"
                            value={profileData.date_of_birth}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            name="bio"
                            value={profileData.bio}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            rows={4}
                            placeholder="Tell us about yourself..."
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="role-specific">
                    <Card className="shadow-xl border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          {getRoleIcon(user.role_name)}
                          <span className="ml-2 capitalize">{user.role_name} Information</span>
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent>
                        {renderRoleSpecificFields()}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="favorites">
                    <Card className="shadow-xl border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Heart className="mr-2 h-5 w-5 text-red-500" />
                          My Favorites
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent>
                        {userFavorites.length > 0 ? (
                          <div className="space-y-4">
                            {userFavorites.map((favorite) => (
                              <div key={favorite.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-500 mr-2" />
                                  <span className="font-medium capitalize">{favorite.item_type}</span>
                                  <span className="text-gray-500 ml-2">ID: {favorite.item_id}</span>
                                  {favorite.notes && (
                                    <span className="text-sm text-gray-600 ml-2">- {favorite.notes}</span>
                                  )}
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Badge variant="outline">
                                    Priority: {favorite.priority}
                                  </Badge>
                                  <Badge variant="outline">
                                    {new Date(favorite.created_at).toLocaleDateString()}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-center py-8">
                            No favorites yet. Start exploring universities, courses, and pathways to add them to your favorites!
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

