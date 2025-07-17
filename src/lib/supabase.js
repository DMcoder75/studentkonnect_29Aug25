import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xududbaqaaffcaejwuix.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1ZHVkYmFxYWFmZmNhZWp3dWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTE4OTQsImV4cCI6MjA2Njg2Nzg5NH0.rMPZCHgDfyho4sUOXNcA1PF4yZ3GFBJxXya_SPcq8fA'

export const supabase = createClient(supabaseUrl, supabaseKey)

export const dbHelpers = {
  // ===== COURSES =====
  
  // Get all courses
  async getCourses() {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          universities (
            id,
            name,
            type,
            global_ranking
          )
        `)
        .order('name')
      
      if (error) {
        console.error('Error fetching courses:', error)
        return []
      }
      
      return data || []
    } catch (error) {
      console.error('Error in getCourses:', error)
      return []
    }
  },

  // Get course by ID with related pathways and professions
  async getCourseById(courseId) {
    try {
      const { data: course, error: courseError } = await supabase
        .from('courses')
        .select(`
          *,
          universities (
            id,
            name,
            type,
            global_ranking
          )
        `)
        .eq('id', courseId)
        .single()
      
      if (courseError) {
        console.error('Error fetching course:', courseError)
        return null
      }
      
      // Get related pathways
      const { data: pathways, error: pathwaysError } = await supabase
        .from('course_pathways')
        .select(`
          pathways (
            id,
            name,
            description
          )
        `)
        .eq('course_id', courseId)
      
      // Get related professions
      const { data: professions, error: professionsError } = await supabase
        .from('course_professions')
        .select(`
          professions (
            id,
            title,
            average_salary
          )
        `)
        .eq('course_id', courseId)
      
      return {
        ...course,
        pathways: pathways?.map(p => p.pathways) || [],
        professions: professions?.map(p => p.professions) || []
      }
    } catch (error) {
      console.error('Error in getCourseById:', error)
      return null
    }
  },

  // Get courses by ATAR cutoff
  async getCoursesByATAR(atarScore) {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          universities (
            id,
            name,
            type,
            global_ranking
          )
        `)
        .lte('atar_cutoff', atarScore)
        .not('atar_cutoff', 'is', null)
        .order('atar_cutoff', { ascending: false })
        .limit(50)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching courses by ATAR:', error)
      return []
    }
  },

  // Get courses for a specific pathway
  async getCoursesForPathway(pathwayId) {
    try {
      const { data, error } = await supabase
        .from('course_pathways')
        .select(`
          courses (
            id,
            name,
            university_id,
            atar_cutoff,
            universities (
              id,
              name,
              type,
              global_ranking
            )
          )
        `)
        .eq('pathway_id', pathwayId)
      
      if (error) {
        console.error('Error fetching courses for pathway:', error)
        return []
      }
      
      return data?.map(item => item.courses) || []
    } catch (error) {
      console.error('Error in getCoursesForPathway:', error)
      return []
    }
  },

  // Get courses for a specific profession
  async getCoursesForProfession(professionId) {
    try {
      const { data, error } = await supabase
        .from('course_professions')
        .select(`
          courses (
            id,
            name,
            university_id,
            universities (
              id,
              name,
              type,
              global_ranking
            )
          )
        `)
        .eq('profession_id', professionId)
      
      if (error) {
        console.error('Error fetching courses for profession:', error)
        return []
      }
      
      return data?.map(item => item.courses) || []
    } catch (error) {
      console.error('Error in getCoursesForProfession:', error)
      return []
    }
  },

  // ===== PATHWAYS =====
  
  // Get all pathways
  async getPathways() {
    try {
      const { data, error } = await supabase
        .from('pathways')
        .select('*')
        .order('name')
      
      if (error) {
        console.error('Error fetching pathways:', error)
        return []
      }
      
      return data || []
    } catch (error) {
      console.error('Error in getPathways:', error)
      return []
    }
  },

  // Get pathway by ID with related courses
  async getPathwayById(pathwayId) {
    try {
      const { data: pathway, error: pathwayError } = await supabase
        .from('pathways')
        .select('*')
        .eq('id', pathwayId)
        .single()
      
      if (pathwayError) {
        console.error('Error fetching pathway:', pathwayError)
        return null
      }

      // Get courses for this pathway
      const courses = await this.getCoursesForPathway(pathwayId)

      return {
        ...pathway,
        courses
      }
    } catch (error) {
      console.error('Error in getPathwayById:', error)
      return null
    }
  },

  // ===== PROFESSIONS =====
  
  // Get all professions
  async getProfessions() {
    try {
      const { data, error } = await supabase
        .from('professions')
        .select('*')
        .order('title')
      
      if (error) {
        console.error('Error fetching professions:', error)
        return []
      }
      
      return data || []
    } catch (error) {
      console.error('Error in getProfessions:', error)
      return []
    }
  },

  // Get profession by ID
  async getProfessionById(professionId) {
    try {
      const { data, error } = await supabase
        .from('professions')
        .select('*')
        .eq('id', professionId)
        .single()
      
      if (error) {
        console.error('Error fetching profession:', error)
        return null
      }
      
      return data
    } catch (error) {
      console.error('Error in getProfessionById:', error)
      return null
    }
  },

  // ===== UNIVERSITIES =====
  
  // Get all universities
  async getUniversities() {
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .order('global_ranking', { ascending: true, nullsLast: true })
      
      if (error) {
        console.error('Error fetching universities:', error)
        return []
      }
      
      return data || []
    } catch (error) {
      console.error('Error in getUniversities:', error)
      return []
    }
  },

  // Get university by ID with courses
  async getUniversityById(universityId) {
    try {
      const { data: university, error: universityError } = await supabase
        .from('universities')
        .select('*')
        .eq('id', universityId)
        .single()
      
      if (universityError) {
        console.error('Error fetching university:', universityError)
        return null
      }

      // Get courses for this university
      const { data: courses, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .eq('university_id', universityId)
        .order('name')

      if (coursesError) {
        console.error('Error fetching university courses:', coursesError)
      }

      return {
        ...university,
        courses: courses || []
      }
    } catch (error) {
      console.error('Error in getUniversityById:', error)
      return null
    }
  },

  // ===== SCHOOLS =====
  
  // Get all schools
  async getSchools() {
    try {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .order('name')
      
      if (error) {
        console.error('Error fetching schools:', error)
        return []
      }
      
      return data || []
    } catch (error) {
      console.error('Error in getSchools:', error)
      return []
    }
  },

  // ===== SEARCH FUNCTIONS =====

  // Global search across courses, pathways, professions
  async searchAll(query) {
    try {
      const searchTerm = `%${query}%`
      
      // Search in parallel
      const [coursesResult, pathwaysResult, professionsResult, universitiesResult] = await Promise.all([
        supabase
          .from('courses')
          .select(`
            *,
            universities (
              id,
              name,
              type
            )
          `)
          .ilike('name', searchTerm)
          .limit(10),
        
        supabase
          .from('pathways')
          .select('*')
          .ilike('name', searchTerm)
          .limit(10),
        
        supabase
          .from('professions')
          .select('*')
          .ilike('title', searchTerm)
          .limit(10),
        
        supabase
          .from('universities')
          .select('*')
          .ilike('name', searchTerm)
          .limit(10)
      ])

      return {
        courses: coursesResult.data || [],
        pathways: pathwaysResult.data || [],
        professions: professionsResult.data || [],
        universities: universitiesResult.data || []
      }
    } catch (error) {
      console.error('Error in searchAll:', error)
      return {
        courses: [],
        pathways: [],
        professions: [],
        universities: []
      }
    }
  },

  // ===== ATAR STATISTICS =====

  // Get ATAR statistics
  async getATARStatistics() {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('atar_cutoff')
        .not('atar_cutoff', 'is', null)

      if (error) throw error
      
      const atarScores = data.map(course => course.atar_cutoff).sort((a, b) => a - b)
      const total = atarScores.length
      
      return {
        total,
        min: atarScores[0] || 0,
        max: atarScores[total - 1] || 100,
        median: atarScores[Math.floor(total / 2)] || 0,
        q1: atarScores[Math.floor(total * 0.25)] || 0,
        q3: atarScores[Math.floor(total * 0.75)] || 0
      }
    } catch (error) {
      console.error('Error fetching ATAR statistics:', error)
      return { total: 0, min: 0, max: 100, median: 0, q1: 0, q3: 0 }
    }
  },

  // ===== USER AUTHENTICATION (Demo) =====
  
  // Enhanced user authentication with role support
  async loginUser(email, password) {
    try {
      // Demo authentication - check against demo users
      const demoUsers = {
        'student@unipath.com': 'password@123',
        'professor@unipath.com': 'password@123',
        'authority@unipath.com': 'password@123',
        'admin@unipath.com': 'password@123'
      }
      
      if (demoUsers[email] && demoUsers[email] === password) {
        // Create mock user data for demo
        const mockUser = {
          id: email.split('@')[0],
          email: email,
          first_name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
          last_name: 'User',
          role_name: email.split('@')[0],
          profile_image_url: null,
          phone: null,
          date_of_birth: null,
          bio: `I am a demo ${email.split('@')[0]} user.`,
          created_at: new Date().toISOString()
        }
        
        return { user: mockUser, error: null }
      } else {
        return { user: null, error: 'Invalid credentials' }
      }
    } catch (error) {
      console.error('Error in loginUser:', error)
      return { user: null, error: 'Login failed' }
    }
  },

  // Get user favorites (mock for demo)
  async getUserFavorites(userId) {
    try {
      // Mock favorites for demo
      return []
    } catch (error) {
      console.error('Error in getUserFavorites:', error)
      return []
    }
  },

  // Add favorite (mock for demo)
  async addFavorite(userId, itemType, itemId, notes = '', priority = 1) {
    try {
      // Mock implementation for demo
      return { success: true, favorite: { id: Date.now(), item_type: itemType, item_id: itemId, notes, priority } }
    } catch (error) {
      console.error('Error in addFavorite:', error)
      return { success: false, error: 'Failed to add favorite' }
    }
  },

  // Remove favorite (mock for demo)
  async removeFavorite(userId, itemType, itemId) {
    try {
      // Mock implementation for demo
      return { success: true }
    } catch (error) {
      console.error('Error in removeFavorite:', error)
      return { success: false, error: 'Failed to remove favorite' }
    }
  }
}

