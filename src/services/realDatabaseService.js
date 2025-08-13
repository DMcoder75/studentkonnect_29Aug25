// Real Database Service connecting directly to PostgreSQL
import { createClient } from '@supabase/supabase-js'

// Direct PostgreSQL connection configuration
const supabaseUrl = 'https://xududbaqaaffcaejwuix.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1ZHVkYmFxYWFmZmNhZWp3dWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1MjI5NjIsImV4cCI6MjA1MDA5ODk2Mn0.placeholder'

// Create Supabase client for direct database access
const supabase = createClient(supabaseUrl, supabaseKey)

class RealDatabaseService {
  constructor() {
    this.cache = {
      countries: null,
      universities: null,
      courses: null,
      pathways: null
    };
  }

  // Countries service functions - fetch from n_countries table
  async getAllCountries() {
    try {
      if (this.cache.countries) {
        return { data: this.cache.countries, error: null };
      }

      const { data, error } = await supabase
        .from('n_countries')
        .select('*')
        .order('country_name', { ascending: true });

      if (error) throw error;
      
      this.cache.countries = data;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching countries:', error);
      return { data: null, error };
    }
  }

  async getCountryById(countryId) {
    try {
      const { data, error } = await supabase
        .from('n_countries')
        .select('*')
        .eq('country_id', countryId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching country:', error);
      return { data: null, error };
    }
  }

  // Universities service functions - fetch from new_universities table
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
        .order('university_name', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching universities:', error);
      return { data: null, error };
    }
  }

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
        .order('university_name', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching universities by country:', error);
      return { data: null, error };
    }
  }

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
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching university:', error);
      return { data: null, error };
    }
  }

  // Courses service functions - fetch from new_courses table
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
        .order('program_name', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching courses:', error);
      return { data: null, error };
    }
  }

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
        .order('program_name', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching courses by university:', error);
      return { data: null, error };
    }
  }

  async getCourseById(courseId) {
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
        .eq('id', courseId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching course:', error);
      return { data: null, error };
    }
  }

  // Pathways service functions - fetch from pathways table
  async getAllPathways() {
    try {
      if (this.cache.pathways) {
        return { data: this.cache.pathways, error: null };
      }

      const { data, error } = await supabase
        .from('pathways')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      
      this.cache.pathways = data;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching pathways:', error);
      return { data: null, error };
    }
  }

  // Search functions
  async searchUniversities(searchTerm, filters = {}) {
    try {
      let query = supabase
        .from('new_universities')
        .select(`
          *,
          n_countries (
            country_id,
            country_name,
            country_code
          )
        `);

      // Apply search term
      if (searchTerm) {
        query = query.or(`university_name.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%,state_province.ilike.%${searchTerm}%`);
      }

      // Apply filters
      if (filters.country_id) {
        query = query.eq('country_id', filters.country_id);
      }

      if (filters.university_type) {
        query = query.ilike('university_type', `%${filters.university_type}%`);
      }

      const { data, error } = await query.order('university_name', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error searching universities:', error);
      return { data: null, error };
    }
  }

  async searchCourses(searchTerm, filters = {}) {
    try {
      let query = supabase
        .from('new_courses')
        .select(`
          *,
          new_universities (
            university_id,
            university_name,
            city,
            state_province,
            country_id,
            n_countries (
              country_id,
              country_name,
              country_code
            )
          )
        `);

      // Apply search term
      if (searchTerm) {
        query = query.ilike('program_name', `%${searchTerm}%`);
      }

      // Apply filters
      if (filters.university_id) {
        query = query.eq('university_id', filters.university_id);
      }

      if (filters.degree_level) {
        query = query.eq('degree_level', filters.degree_level);
      }

      const { data, error } = await query.order('program_name', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error searching courses:', error);
      return { data: null, error };
    }
  }

  // Statistics functions
  async getStatistics() {
    try {
      const [countriesResult, universitiesResult, coursesResult, pathwaysResult] = await Promise.all([
        this.getAllCountries(),
        this.getAllUniversities(),
        this.getAllCourses(),
        this.getAllPathways()
      ]);

      return {
        countries: countriesResult.data?.length || 0,
        universities: universitiesResult.data?.length || 0,
        courses: coursesResult.data?.length || 0,
        pathways: pathwaysResult.data?.length || 0
      };
    } catch (error) {
      console.error('Error fetching statistics:', error);
      return {
        countries: 0,
        universities: 0,
        courses: 0,
        pathways: 0
      };
    }
  }
}

// Export singleton instance
export const realDatabaseService = new RealDatabaseService();
export default realDatabaseService;

