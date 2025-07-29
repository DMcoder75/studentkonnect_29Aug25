import { supabase } from '../lib/supabase.js'

// Global Education Service for international database tables
export const globalEducationService = {
  
  // Countries service functions
  async getAllCountries() {
    try {
      const { data, error } = await supabase
        .from('n_countries')
        .select('*')
        .order('country_name', { ascending: true })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching countries:', error)
      return { data: null, error }
    }
  },

  async getCountryById(countryId) {
    try {
      const { data, error } = await supabase
        .from('n_countries')
        .select('*')
        .eq('country_id', countryId)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching country:', error)
      return { data: null, error }
    }
  },

  // Universities service functions
  async getAllUniversities() {
    try {
      const { data, error } = await supabase
        .from('new_universities')
        .select(`
          *,
          n_countries (
            country_id,
            country_name
          )
        `)
        .order('university_name', { ascending: true })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching universities:', error)
      return { data: null, error }
    }
  },

  async getUniversitiesByCountry(countryId) {
    try {
      const { data, error } = await supabase
        .from('new_universities')
        .select(`
          *,
          n_countries (
            country_id,
            country_name
          )
        `)
        .eq('country_id', countryId)
        .order('university_name', { ascending: true })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching universities by country:', error)
      return { data: null, error }
    }
  },

  async getUniversityById(universityId) {
    try {
      const { data, error } = await supabase
        .from('new_universities')
        .select(`
          *,
          n_countries (
            country_id,
            country_name
          )
        `)
        .eq('id', universityId)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching university:', error)
      return { data: null, error }
    }
  },

  async searchUniversities(searchTerm, countryId = null) {
    try {
      let query = supabase
        .from('new_universities')
        .select(`
          *,
          n_countries (
            country_id,
            country_name
          )
        `)

      if (searchTerm) {
        query = query.or(`university_name.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%,state.ilike.%${searchTerm}%`)
      }

      if (countryId) {
        query = query.eq('country_id', countryId)
      }

      const { data, error } = await query.order('university_name', { ascending: true })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error searching universities:', error)
      return { data: null, error }
    }
  },

  // Courses service functions
  async getAllCourses() {
    try {
      const { data, error } = await supabase
        .from('new_courses')
        .select(`
          *,
          new_universities (
            id,
            university_name,
            city,
            state,
            country_id,
            n_countries (
              country_id,
              country_name
            )
          )
        `)
        .order('program_name', { ascending: true })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching courses:', error)
      return { data: null, error }
    }
  },

  async getCoursesByUniversity(universityId) {
    try {
      const { data, error } = await supabase
        .from('new_courses')
        .select(`
          *,
          new_universities (
            id,
            university_name,
            city,
            state,
            country_id,
            n_countries (
              country_id,
              country_name
            )
          )
        `)
        .eq('university_id', universityId)
        .order('program_name', { ascending: true })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching courses by university:', error)
      return { data: null, error }
    }
  },

  async getCoursesByCountry(countryId) {
    try {
      const { data, error } = await supabase
        .from('new_courses')
        .select(`
          *,
          new_universities!inner (
            id,
            university_name,
            city,
            state,
            country_id,
            n_countries (
              country_id,
              country_name
            )
          )
        `)
        .eq('new_universities.country_id', countryId)
        .order('program_name', { ascending: true })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching courses by country:', error)
      return { data: null, error }
    }
  },

  async searchCourses(searchTerm, countryId = null, universityId = null, level = null, category = null) {
    try {
      let query = supabase
        .from('new_courses')
        .select(`
          *,
          new_universities (
            id,
            university_name,
            city,
            state,
            country_id,
            n_countries (
              country_id,
              country_name
            )
          )
        `)

      if (searchTerm) {
        query = query.or(`program_name.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`)
      }

      if (universityId) {
        query = query.eq('university_id', universityId)
      }

      if (level) {
        query = query.eq('level', level)
      }

      if (category) {
        query = query.eq('category', category)
      }

      // Filter by country through university relationship
      if (countryId) {
        query = query.eq('new_universities.country_id', countryId)
      }

      const { data, error } = await query.order('program_name', { ascending: true })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error searching courses:', error)
      return { data: null, error }
    }
  },

  // Statistics functions
  async getGlobalStatistics() {
    try {
      // Get countries count
      const { data: countriesData, error: countriesError } = await supabase
        .from('n_countries')
        .select('country_id', { count: 'exact' })

      if (countriesError) throw countriesError

      // Get universities count
      const { data: universitiesData, error: universitiesError } = await supabase
        .from('new_universities')
        .select('id', { count: 'exact' })

      if (universitiesError) throw universitiesError

      // Get courses count
      const { data: coursesData, error: coursesError } = await supabase
        .from('new_courses')
        .select('id', { count: 'exact' })

      if (coursesError) throw coursesError

      return {
        data: {
          countries: countriesData?.length || 0,
          universities: universitiesData?.length || 0,
          courses: coursesData?.length || 0
        },
        error: null
      }
    } catch (error) {
      console.error('Error fetching global statistics:', error)
      return { data: null, error }
    }
  },

  async getCountryStatistics(countryId) {
    try {
      // Get universities count for country
      const { data: universitiesData, error: universitiesError } = await supabase
        .from('new_universities')
        .select('id', { count: 'exact' })
        .eq('country_id', countryId)

      if (universitiesError) throw universitiesError

      // Get courses count for country
      const { data: coursesData, error: coursesError } = await supabase
        .from('new_courses')
        .select(`
          id,
          new_universities!inner (
            country_id
          )
        `, { count: 'exact' })
        .eq('new_universities.country_id', countryId)

      if (coursesError) throw coursesError

      return {
        data: {
          universities: universitiesData?.length || 0,
          courses: coursesData?.length || 0
        },
        error: null
      }
    } catch (error) {
      console.error('Error fetching country statistics:', error)
      return { data: null, error }
    }
  },

  // Career Pathways service functions
  async getGlobalCareerPathways() {
    try {
      const { data, error } = await supabase
        .from('temp_global_career_pathways')
        .select('*')
        .order('pathway_title', { ascending: true })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching career pathways:', error)
      return { data: null, error }
    }
  },

  async getCareerOpportunitiesByCountry(countryId = null) {
    try {
      let query = supabase
        .from('v_global_career_opportunities')
        .select('*')
        .order('pathway_title')
      
      if (countryId) {
        query = query.eq('country_id', countryId)
      }
      
      const { data, error } = await query
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching career opportunities:', error)
      return { data: null, error }
    }
  },

  async getCareerPathwayById(pathwayId) {
    try {
      const { data, error } = await supabase
        .from('temp_global_career_pathways')
        .select('*')
        .eq('id', pathwayId)
        .single()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching career pathway:', error)
      return { data: null, error }
    }
  },

  async searchCareerPathways(searchTerm, category = null, countryId = null) {
    try {
      let query = supabase
        .from('v_global_career_opportunities')
        .select('*')

      if (searchTerm) {
        query = query.or(`pathway_title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`)
      }

      if (category) {
        query = query.eq('category', category)
      }

      if (countryId) {
        query = query.eq('country_id', countryId)
      }

      const { data, error } = await query.order('pathway_title', { ascending: true })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error searching career pathways:', error)
      return { data: null, error }
    }
  }
}

export default globalEducationService

