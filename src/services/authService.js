import { supabase } from '../lib/supabase'

// Demo student credentials for testing
const DEMO_STUDENTS = [
  { email: 'priya.dubey@email.com', password: 'student123', name: 'Priya Dubey' },
  { email: 'tanvi.kulkarni@email.com', password: 'student123', name: 'Tanvi Kulkarni' },
  { email: 'pranav.joshi@email.com', password: 'student123', name: 'Pranav Joshi' },
  { email: 'jiya.iyer@email.com', password: 'student123', name: 'Jiya Iyer' },
  { email: 'raj.tiwari@email.com', password: 'student123', name: 'Raj Tiwari' },
  { email: 'gaurav.jain@email.com', password: 'student123', name: 'Gaurav Jain' },
  { email: 'ananya.nair@email.com', password: 'student123', name: 'Ananya Nair' },
  { email: 'rohit.gupta@email.com', password: 'student123', name: 'Rohit Gupta' },
  { email: 'kavya.reddy@email.com', password: 'student123', name: 'Kavya Reddy' },
  { email: 'arjun.patel@email.com', password: 'student123', name: 'Arjun Patel' },
  { email: 'sneha.sharma@email.com', password: 'student123', name: 'Sneha Sharma' },
  { email: 'vikram.singh@email.com', password: 'student123', name: 'Vikram Singh' },
  { email: 'riya.agarwal@email.com', password: 'student123', name: 'Riya Agarwal' },
  { email: 'karan.malhotra@email.com', password: 'student123', name: 'Karan Malhotra' },
  { email: 'pooja.verma@email.com', password: 'student123', name: 'Pooja Verma' },
  { email: 'aditya.kumar@email.com', password: 'student123', name: 'Aditya Kumar' },
  { email: 'meera.pillai@email.com', password: 'student123', name: 'Meera Pillai' },
  { email: 'rahul.chopra@email.com', password: 'student123', name: 'Rahul Chopra' },
  { email: 'ishita.bansal@email.com', password: 'student123', name: 'Ishita Bansal' },
  { email: 'nikhil.rao@email.com', password: 'student123', name: 'Nikhil Rao' }
]

// Demo credentials for testing (fallback only)
const DEMO_CREDENTIALS = {
  counselors: [
    { email: 'sarah.johnson@studentkonnect.com', password: 'counselor123', name: 'Dr. Sarah Johnson' },
    { email: 'james.wilson@studentkonnect.com', password: 'counselor123', name: 'Dr. James Wilson' },
    { email: 'priya.sharma@studentkonnect.com', password: 'counselor123', name: 'Dr. Priya Sharma' },
    { email: 'michael.chen@studentkonnect.com', password: 'counselor123', name: 'Dr. Michael Chen' },
    { email: 'emma.davis@studentkonnect.com', password: 'counselor123', name: 'Dr. Emma Davis' }
  ],
  students: [
    { email: 'arjun.patel@email.com', password: 'student123', name: 'Arjun Patel' },
    { email: 'priya.singh@email.com', password: 'student123', name: 'Priya Singh' },
    { email: 'rahul.kumar@email.com', password: 'student123', name: 'Rahul Kumar' },
    { email: 'ishita.bansal@email.com', password: 'student123', name: 'Ishita Bansal' },
    { email: 'nikhil.rao@email.com', password: 'student123', name: 'Nikhil Rao' }
  ]
}

export const authService = {
  // Authenticate user with unified database view
  async authenticateUser(email, password) {
    try {
      // First, try to authenticate using the unified user_authentication view
      const { data: userData, error: userError } = await supabase
        .from('user_authentication')
        .select('*')
        .eq('email', email)
        .single()

      if (userData && !userError) {
        // Verify password (simplified for demo - use proper hashing in production)
        if (this.verifyPassword(password, userData.password_hash)) {
          return this.buildUserResponse(userData)
        } else {
          return {
            success: false,
            user: null,
            error: 'Invalid password'
          }
        }
      }

      // Fallback to demo accounts if not found in database
      return this.authenticateDemoUser(email, password)

    } catch (error) {
      console.error('Authentication error:', error)
      return {
        success: false,
        user: null,
        error: 'Authentication failed. Please try again.'
      }
    }
  },

  // Verify password (implement proper bcrypt in production)
  verifyPassword(inputPassword, storedHash) {
    // For demo purposes, accept specific passwords
    if (inputPassword === 'counselor123' || inputPassword === 'student123' || inputPassword === 'password123') {
      return true
    }
    
    // In production, use proper password verification:
    // return bcrypt.compare(inputPassword, storedHash)
    return inputPassword === storedHash
  },

  // Build standardized user response object
  buildUserResponse(userData) {
    const baseUser = {
      id: userData.id,
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      full_name: `${userData.first_name} ${userData.last_name}`,
      profile_image_url: userData.profile_image_url,
      phone: userData.phone,
      bio: userData.bio,
      role: userData.role_name,
      permissions: userData.permissions,
      status: userData.status,
      email_verified: userData.email_verified,
      last_login: userData.last_login,
      created_at: userData.created_at,
      updated_at: userData.updated_at
    }

    // Add role-specific data
    if (userData.role_name === 'counselor') {
      return {
        success: true,
        user: {
          ...baseUser,
          user_type: 'counselor',
          
          // Counselor-specific data
          counselor_id: userData.counselor_id,
          display_name: userData.display_name,
          counselor_type: userData.counselor_type,
          specializations: userData.specializations,
          years_experience: userData.years_experience,
          is_available: userData.is_available,
          average_rating: userData.average_rating,
          total_reviews: userData.total_reviews,
          current_active_students: userData.current_active_students,
          hourly_rate: userData.hourly_rate,
          currency: userData.currency,
          time_zone: userData.time_zone,
          languages_spoken: userData.languages_spoken,
          
          user_roles: [{
            role_name: 'counselor',
            role_description: userData.role_description,
            permissions: userData.permissions
          }]
        },
        message: 'Counselor authentication successful'
      }
    } else if (userData.role_name === 'student') {
      return {
        success: true,
        user: {
          ...baseUser,
          user_type: 'student',
          
          // Student-specific data
          student_type: userData.student_type,
          nationality: userData.nationality,
          year_level: userData.year_level,
          school_id: userData.school_id,
          
          user_roles: [{
            role_name: 'student',
            role_description: userData.role_description,
            permissions: userData.permissions
          }]
        },
        message: 'Student authentication successful'
      }
    } else {
      return {
        success: true,
        user: baseUser,
        message: 'Authentication successful'
      }
    }
  },

  // Fallback authentication for demo accounts
  async authenticateDemoUser(email, password) {
    // Check demo counselor accounts
    const demoCounselor = DEMO_CREDENTIALS.counselors.find(counselor => 
      counselor.email === email && counselor.password === password
    )

    if (demoCounselor) {
      console.warn('Using demo counselor account - database record not found')
      return {
        success: true,
        user: {
          id: `demo_counselor_${Date.now()}`,
          email: demoCounselor.email,
          first_name: demoCounselor.name.split(' ')[1] || demoCounselor.name,
          last_name: demoCounselor.name.split(' ')[2] || '',
          full_name: demoCounselor.name,
          user_type: 'counselor',
          role: 'counselor',
          is_demo: true,
          email_verified: true,
          is_available: true,
          user_roles: [{
            role_name: 'counselor',
            role_description: 'Education Counselor (Demo)',
            permissions: ['view_students', 'manage_applications', 'schedule_meetings']
          }]
        },
        message: 'Demo counselor authentication successful'
      }
    }

    // Check demo student accounts
    const demoStudent = DEMO_CREDENTIALS.students.find(student => 
      student.email === email && student.password === password
    )

    if (demoStudent) {
      console.warn('Using demo student account - database record not found')
      return {
        success: true,
        user: {
          id: `demo_student_${Date.now()}`,
          email: demoStudent.email,
          first_name: demoStudent.name.split(' ')[0],
          last_name: demoStudent.name.split(' ')[1] || '',
          full_name: demoStudent.name,
          user_type: 'student',
          role: 'student',
          is_demo: true,
          email_verified: true,
          user_roles: [{
            role_name: 'student',
            role_description: 'Student (Demo)',
            permissions: ['view_profile', 'apply_scholarships', 'contact_counselors']
          }]
        },
        message: 'Demo student authentication successful'
      }
    }

    // No valid credentials found
    return {
      success: false,
      user: null,
      error: 'Invalid email or password'
    }
  },

  // Get student profile data using unified view
  async getStudentProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('student_authentication')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching student profile:', error)
      return { data: null, error }
    }
  },

  // Update student profile in students table
  async updateStudentProfile(userId, profileData) {
    try {
      const { data, error } = await supabase
        .from('students')
        .update({
          ...profileData
        })
        .eq('user_id', userId)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error updating student profile:', error)
      return { data: null, error }
    }
  },

  // Get student connections (counselor relationships)
  async getStudentConnections(studentId) {
    try {
      // This would fetch from a connections/relationships table
      // For demo purposes, return mock data
      return {
        data: [
          {
            id: 1,
            counselor_id: 1,
            status: 'active',
            created_at: new Date().toISOString(),
            counselor: {
              first_name: 'Dr. Sarah',
              last_name: 'Chen',
              specializations: ['Migration Expert'],
              average_rating: 4.9
            }
          }
        ],
        error: null
      }
    } catch (error) {
      console.error('Error fetching student connections:', error)
      return { data: null, error }
    }
  },

  // Get student applications
  async getStudentApplications(studentId) {
    try {
      const { data, error } = await supabase
        .from('student_scholarship_applications')
        .select(`
          *,
          scholarships (
            name,
            provider,
            amount,
            scholarship_type
          )
        `)
        .eq('student_id', studentId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching student applications:', error)
      return { data: null, error }
    }
  },

  // Get counselor profile data
  async getCounselorProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('counselors')
        .select(`
          *,
          users (
            first_name,
            last_name,
            email,
            phone,
            country_code,
            email_verified,
            is_active
          )
        `)
        .eq('user_id', userId)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching counselor profile:', error)
      return { data: null, error }
    }
  },

  // Update counselor profile
  async updateCounselorProfile(userId, profileData) {
    try {
      const { data, error } = await supabase
        .from('counselors')
        .update({
          ...profileData,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error updating counselor profile:', error)
      return { data: null, error }
    }
  },

  // Get counselor's assigned students
  async getCounselorStudents(counselorId) {
    try {
      const { data, error } = await supabase
        .from('counselor_assignments')
        .select(`
          *,
          students (
            id,
            email,
            first_name,
            last_name,
            phone,
            current_country,
            target_country,
            field_of_study,
            study_level,
            created_at
          ),
          student_workflow_progress (
            stage_id,
            status,
            started_at,
            completed_at,
            workflow_stages (
              stage_name,
              stage_order
            )
          )
        `)
        .eq('counselor_id', counselorId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching counselor students:', error)
      return { data: null, error }
    }
  },

  // Get counselor's student applications
  async getCounselorApplications(counselorId) {
    try {
      const { data, error } = await supabase
        .from('student_applications')
        .select(`
          *,
          students (
            first_name,
            last_name,
            email
          ),
          universities (
            name,
            country,
            ranking
          ),
          programs (
            name,
            degree_level,
            duration
          )
        `)
        .eq('counselor_id', counselorId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching counselor applications:', error)
      return { data: null, error }
    }
  },

  // Get counselor's meetings
  async getCounselorMeetings(counselorId) {
    try {
      const { data, error } = await supabase
        .from('counselor_meetings')
        .select(`
          *,
          students (
            first_name,
            last_name,
            email,
            phone
          )
        `)
        .eq('counselor_id', counselorId)
        .gte('meeting_date', new Date().toISOString().split('T')[0])
        .order('meeting_date', { ascending: true })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching counselor meetings:', error)
      return { data: null, error }
    }
  },

  // Get counselor network (other counselors)
  async getCounselorNetwork(counselorId) {
    try {
      const { data, error } = await supabase
        .from('counselors')
        .select(`
          id,
          display_name,
          bio,
          years_experience,
          counselor_type,
          specializations,
          languages_spoken,
          average_rating,
          total_reviews,
          is_available,
          users (
            first_name,
            last_name,
            email,
            phone
          )
        `)
        .neq('id', counselorId)
        .eq('status', 'active')
        .eq('is_available', true)
        .order('average_rating', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching counselor network:', error)
      return { data: null, error }
    }
  },

  // Authenticate counselor specifically (helper method)
  async authenticateCounselor(email, password) {
    const result = await this.authenticateUser(email, password)
    
    if (result.success && result.user?.user_type === 'counselor') {
      return result
    } else if (result.success) {
      return {
        success: false,
        user: null,
        error: 'User is not a counselor'
      }
    } else {
      return result
    }
  },

  // Check if user is counselor
  isCounselor(user) {
    return user?.user_type === 'counselor' || user?.role === 'counselor'
  },

  // Check if user is student
  isStudent(user) {
    return user?.user_type === 'student' || user?.role === 'student'
  }
}

export default authService

