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

// Demo counselor credentials for testing
const DEMO_COUNSELORS = [
  { email: 'sarah.johnson@studentkonnect.com', password: 'counselor123', name: 'Dr. Sarah Johnson', role: 'counselor' },
  { email: 'james.wilson@studentkonnect.com', password: 'counselor123', name: 'Dr. James Wilson', role: 'counselor' },
  { email: 'priya.sharma@studentkonnect.com', password: 'counselor123', name: 'Dr. Priya Sharma', role: 'counselor' },
  { email: 'michael.chen@studentkonnect.com', password: 'counselor123', name: 'Dr. Michael Chen', role: 'counselor' },
  { email: 'emma.davis@studentkonnect.com', password: 'counselor123', name: 'Dr. Emma Davis', role: 'counselor' }
]

export const authService = {
  // Authenticate user with database
  async authenticateUser(email, password) {
    try {
      // First, check if it's a demo counselor account
      const demoCounselor = DEMO_COUNSELORS.find(counselor => 
        counselor.email === email && counselor.password === password
      )

      if (demoCounselor) {
        // Return counselor authentication data
        return {
          success: true,
          user: {
            id: `counselor_${demoCounselor.email.split('@')[0]}`,
            email: demoCounselor.email,
            first_name: demoCounselor.name.split(' ')[1] || demoCounselor.name,
            last_name: demoCounselor.name.split(' ')[2] || '',
            full_name: demoCounselor.name,
            role: 'counselor',
            user_roles: [{
              role_name: 'counselor',
              role_description: 'Education Counselor',
              permissions: ['view_students', 'manage_applications', 'schedule_meetings']
            }]
          },
          message: 'Counselor authentication successful'
        }
      }

      // Then, check if it's a demo student account
      const demoStudent = DEMO_STUDENTS.find(student => 
        student.email === email && student.password === password
      )

      if (demoStudent) {
        // Try to fetch student data from database
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select(`
            id,
            email,
            first_name,
            last_name,
            phone,
            status,
            email_verified,
            created_at,
            user_roles (
              role_name,
              role_description,
              permissions
            )
          `)
          .eq('email', email)
          .single()

        if (userData && !userError) {
          console.log('User data from database:', userData)
          
          // Fetch comprehensive student data from the students table
          const { data: studentData, error: studentError } = await supabase
            .from('students')
            .select('*')
            .eq('email', email)
            .single()

          console.log('Student data from database:', studentData)
          console.log('Student error:', studentError)

          // Fetch student profile details from student_profiles table
          const { data: profileData, error: profileError } = await supabase
            .from('student_profiles')
            .select(`
              id,
              current_institution,
              study_level,
              field_of_study,
              graduation_year,
              gpa,
              preferred_location,
              university_preferences,
              career_interests,
              extracurricular_activities,
              achievements,
              current_country,
              current_address1,
              current_address2,
              current_state,
              current_zipcode,
              languages,
              communication_style,
              budget_range,
              created_at,
              updated_at
            `)
            .eq('user_id', userData.id)
            .single()

          console.log('Profile data from database:', profileData)
          console.log('Profile error:', profileError)

          return {
            user: {
              id: userData.id,
              email: userData.email,
              first_name: userData.first_name,
              last_name: userData.last_name,
              phone: userData.phone,
              status: userData.status,
              emailVerified: userData.email_verified,
              role: userData.user_roles?.role_name || 'student',
              roleDescription: userData.user_roles?.role_description,
              permissions: userData.user_roles?.permissions,
              student_data: studentData, // This will contain the comprehensive student profile
              profile_data: profileData, // This will contain additional profile information
              createdAt: userData.created_at
            },
            error: null
          }
        } else {
          // If not in database, create a demo user object
          return {
            user: {
              id: `demo-${Date.now()}`,
              email: demoStudent.email,
              firstName: demoStudent.name.split(' ')[0],
              lastName: demoStudent.name.split(' ')[1] || '',
              role: 'student',
              roleDescription: 'Demo Student Account',
              status: 'active',
              emailVerified: true,
              isDemo: true,
              createdAt: new Date().toISOString()
            },
            error: null
          }
        }
      }

      // If not a demo account, try database authentication
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select(`
          id,
          email,
          first_name,
          last_name,
          phone,
          status,
          email_verified,
          created_at,
          user_roles (
            role_name,
            role_description,
            permissions
          )
        `)
        .eq('email', email)
        .single()

      if (userError || !userData) {
        return {
          user: null,
          error: 'Invalid email or password'
        }
      }

      // In a real implementation, you would verify the password hash here
      // For demo purposes, we'll accept any password for database users
      if (password === 'student123' || password === 'password123') {
        // Fetch additional student data if user is a student
        let studentData = null
        let profileData = null

        if (userData.user_roles?.role_name === 'student') {
          const { data: student } = await supabase
            .from('students')
            .select('*')
            .eq('email', userData.email)
            .single()

          const { data: profile } = await supabase
            .from('student_profiles')
            .select('*')
            .eq('user_id', userData.id)
            .single()

          studentData = student
          profileData = profile
        }

        return {
          user: {
            id: userData.id,
            email: userData.email,
            first_name: userData.first_name,
            last_name: userData.last_name,
            phone: userData.phone,
            status: userData.status,
            emailVerified: userData.email_verified,
            role: userData.user_roles?.role_name || 'student',
            roleDescription: userData.user_roles?.role_description,
            permissions: userData.user_roles?.permissions,
            student_data: studentData,
            profile_data: profileData,
            createdAt: userData.created_at
          },
          error: null
        }
      }

      return {
        user: null,
        error: 'Invalid email or password'
      }

    } catch (error) {
      console.error('Authentication error:', error)
      return {
        user: null,
        error: 'Authentication failed. Please try again.'
      }
    }
  },

  // Get student profile data
  async getStudentProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('student_profiles')
        .select(`
          *,
          users (
            first_name,
            last_name,
            email,
            phone
          )
        `)
        .eq('user_id', userId)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching student profile:', error)
      return { data: null, error }
    }
  },

  // Update student profile
  async updateStudentProfile(userId, profileData) {
    try {
      const { data, error } = await supabase
        .from('student_profiles')
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
  }
}

export default authService

