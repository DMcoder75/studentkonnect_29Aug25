import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Counselor service functions
export const counselorService = {
  // Fetch all counselors
  async getAllCounselors() {
    try {
      const { data, error } = await supabase
        .from('counselors')
        .select(`
          id,
          uuid,
          email,
          first_name,
          last_name,
          display_name,
          phone,
          country_code,
          bio,
          years_experience,
          counselor_type,
          status,
          specializations,
          languages_spoken,
          hourly_rate,
          currency,
          total_students_helped,
          success_rate,
          average_rating,
          total_reviews,
          is_featured,
          is_available,
          current_active_students,
          last_active_at,
          email_verified_at,
          profile_completed_at,
          created_at,
          updated_at
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching counselors:', error)
      return { data: null, error }
    }
  },

  // Fetch counselor by ID
  async getCounselorById(id) {
    try {
      const { data, error } = await supabase
        .from('counselors')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching counselor:', error)
      return { data: null, error }
    }
  },

  // Update counselor
  async updateCounselor(id, updates) {
    try {
      const { data, error } = await supabase
        .from('counselors')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error updating counselor:', error)
      return { data: null, error }
    }
  },

  // Delete counselor
  async deleteCounselor(id) {
    try {
      const { error } = await supabase
        .from('counselors')
        .delete()
        .eq('id', id)

      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Error deleting counselor:', error)
      return { error }
    }
  },

  // Create new counselor
  async createCounselor(counselorData) {
    try {
      const { data, error } = await supabase
        .from('counselors')
        .insert([counselorData])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error creating counselor:', error)
      return { data: null, error }
    }
  }
}

// Student service functions
export const studentService = {
  async getAllStudents() {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching students:', error)
      return { data: null, error }
    }
  }
}

// Scholarship service functions
export const scholarshipService = {
  async getAllScholarships() {
    try {
      const { data, error } = await supabase
        .from('scholarships')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching scholarships:', error)
      return { data: null, error }
    }
  }
}

export default supabase

