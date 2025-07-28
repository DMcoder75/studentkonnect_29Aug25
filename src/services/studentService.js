import { supabase } from '../lib/supabase'

export const studentService = {
  // Get student dashboard data
  async getStudentDashboard(userId) {
    try {
      // Get student profile
      const { data: profile, error: profileError } = await supabase
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

      // Get scholarship applications
      const { data: applications, error: appsError } = await supabase
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
        .eq('student_id', userId)
        .limit(5)

      // Get bookmarked scholarships
      const { data: bookmarks, error: bookmarksError } = await supabase
        .from('student_scholarship_bookmarks')
        .select(`
          *,
          scholarships (
            name,
            provider,
            amount,
            scholarship_type
          )
        `)
        .eq('student_id', userId)
        .limit(5)

      return {
        data: {
          profile: profile || null,
          applications: applications || [],
          bookmarks: bookmarks || [],
          stats: {
            totalApplications: applications?.length || 0,
            pendingApplications: applications?.filter(app => app.application_status === 'in_progress')?.length || 0,
            submittedApplications: applications?.filter(app => app.application_status === 'submitted')?.length || 0,
            bookmarkedScholarships: bookmarks?.length || 0
          }
        },
        error: null
      }
    } catch (error) {
      console.error('Error fetching student dashboard:', error)
      return { data: null, error }
    }
  },

  // Get student connections with counselors
  async getStudentConnections(userId) {
    try {
      // For demo purposes, return mock data since we don't have a connections table yet
      const mockConnections = [
        {
          id: 1,
          counselor_id: 1,
          student_id: userId,
          status: 'active',
          connection_type: 'consultation',
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          last_interaction: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          counselor: {
            id: 1,
            first_name: 'Dr. Sarah',
            last_name: 'Chen',
            display_name: 'Dr. Sarah Chen',
            specializations: ['Migration Expert', 'University Applications'],
            average_rating: 4.9,
            total_reviews: 127,
            hourly_rate: 150,
            currency: 'AUD',
            is_available: true
          },
          sessions: [
            {
              id: 1,
              type: 'video_call',
              status: 'completed',
              scheduled_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
              duration: 60,
              rating: 5,
              feedback: 'Very helpful session about university applications'
            },
            {
              id: 2,
              type: 'message',
              status: 'pending',
              scheduled_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
              duration: null,
              rating: null,
              feedback: null
            }
          ]
        },
        {
          id: 2,
          counselor_id: 2,
          student_id: userId,
          status: 'pending',
          connection_type: 'consultation',
          created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          last_interaction: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          counselor: {
            id: 2,
            first_name: 'Michael',
            last_name: 'Thompson',
            display_name: 'Michael Thompson',
            specializations: ['University Expert', 'Academic Planning'],
            average_rating: 4.7,
            total_reviews: 89,
            hourly_rate: 120,
            currency: 'AUD',
            is_available: true
          },
          sessions: []
        }
      ]

      return {
        data: mockConnections,
        error: null
      }
    } catch (error) {
      console.error('Error fetching student connections:', error)
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

  // Get available scholarships for student
  async getAvailableScholarships(userId, filters = {}) {
    try {
      let query = supabase
        .from('scholarships')
        .select('*')
        .eq('is_active', true)

      // Apply filters
      if (filters.scholarship_type) {
        query = query.eq('scholarship_type', filters.scholarship_type)
      }

      if (filters.min_amount) {
        query = query.gte('amount', filters.min_amount)
      }

      if (filters.max_amount) {
        query = query.lte('amount', filters.max_amount)
      }

      const { data, error } = await query
        .order('amount', { ascending: false })
        .limit(20)

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching scholarships:', error)
      return { data: null, error }
    }
  },

  // Apply for scholarship
  async applyForScholarship(studentId, scholarshipId, applicationData = {}) {
    try {
      const { data, error } = await supabase
        .from('student_scholarship_applications')
        .insert([{
          student_id: studentId,
          scholarship_id: scholarshipId,
          application_status: 'in_progress',
          started_at: new Date().toISOString(),
          completion_percentage: 0.0,
          priority_level: applicationData.priority_level || 2,
          ...applicationData
        }])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error applying for scholarship:', error)
      return { data: null, error }
    }
  },

  // Bookmark scholarship
  async bookmarkScholarship(studentId, scholarshipId, notes = '') {
    try {
      const { data, error } = await supabase
        .from('student_scholarship_bookmarks')
        .insert([{
          student_id: studentId,
          scholarship_id: scholarshipId,
          notes: notes,
          priority_level: 2
        }])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error bookmarking scholarship:', error)
      return { data: null, error }
    }
  },

  // Get forum posts for student community
  async getForumPosts(category = null, limit = 20) {
    try {
      // For demo purposes, return mock forum data
      const mockPosts = [
        {
          id: 1,
          title: 'Tips for IELTS preparation - scored 8.5!',
          content: 'Just wanted to share some tips that helped me achieve 8.5 in IELTS...',
          category: 'Study Groups',
          author: 'Priya Sharma',
          author_email: 'priya.sharma@email.com',
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          likes: 45,
          replies: 12,
          views: 234
        },
        {
          id: 2,
          title: 'University of Melbourne vs University of Sydney - Help me decide!',
          content: 'I got accepted to both universities for Computer Science. Need advice...',
          category: 'University Life',
          author: 'Rahul Gupta',
          author_email: 'rahul.gupta@email.com',
          created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          likes: 23,
          replies: 8,
          views: 156
        },
        {
          id: 3,
          title: 'Visa interview experience - Australia student visa',
          content: 'Just had my visa interview yesterday. Here\'s what they asked...',
          category: 'Visa & Immigration',
          author: 'Ananya Patel',
          author_email: 'ananya.patel@email.com',
          created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          likes: 67,
          replies: 15,
          views: 289
        },
        {
          id: 4,
          title: 'Affordable accommodation near University of Toronto',
          content: 'Looking for budget-friendly housing options. Any recommendations?',
          category: 'Accommodation',
          author: 'Vikram Singh',
          author_email: 'vikram.singh@email.com',
          created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          likes: 34,
          replies: 9,
          views: 178
        },
        {
          id: 5,
          title: 'Part-time job opportunities for international students in Canada',
          content: 'Sharing my experience finding part-time work as an international student...',
          category: 'Jobs & Career',
          author: 'Kavya Reddy',
          author_email: 'kavya.reddy@email.com',
          created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
          likes: 89,
          replies: 23,
          views: 445
        }
      ]

      let filteredPosts = mockPosts
      if (category) {
        filteredPosts = mockPosts.filter(post => post.category === category)
      }

      return {
        data: filteredPosts.slice(0, limit),
        error: null
      }
    } catch (error) {
      console.error('Error fetching forum posts:', error)
      return { data: null, error }
    }
  },

  // Get alumni updates
  async getAlumniUpdates(limit = 10) {
    try {
      // For demo purposes, return mock alumni data
      const mockUpdates = [
        {
          id: 1,
          student_name: 'Arjun Mehta',
          university: 'Stanford University',
          degree: 'MS Computer Science',
          graduation_year: 2023,
          current_company: 'Google',
          current_position: 'Software Engineer',
          update_type: 'Career Milestone',
          content: 'Excited to share that I just completed my first year at Google! The journey from StudentKonnect to here has been incredible.',
          achievement_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          likes: 156,
          comments: 23,
          shares: 8,
          image_url: null
        },
        {
          id: 2,
          student_name: 'Shreya Patel',
          university: 'University of Melbourne',
          degree: 'MBA',
          graduation_year: 2022,
          current_company: 'McKinsey & Company',
          current_position: 'Business Analyst',
          update_type: 'Professional Development',
          content: 'Just completed my certification in Data Analytics. Always learning and growing!',
          achievement_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          likes: 89,
          comments: 12,
          shares: 5,
          image_url: null
        },
        {
          id: 3,
          student_name: 'Rohan Kumar',
          university: 'University of Toronto',
          degree: 'MS Engineering',
          graduation_year: 2023,
          current_company: 'Tesla',
          current_position: 'Design Engineer',
          update_type: 'Recognition',
          content: 'Honored to receive the Innovation Award at Tesla for my work on battery optimization!',
          achievement_date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
          likes: 234,
          comments: 45,
          shares: 18,
          image_url: null
        }
      ]

      return {
        data: mockUpdates.slice(0, limit),
        error: null
      }
    } catch (error) {
      console.error('Error fetching alumni updates:', error)
      return { data: null, error }
    }
  }
}

export default studentService

