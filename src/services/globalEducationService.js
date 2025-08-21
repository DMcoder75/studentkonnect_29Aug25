// Global Education Service using local data
import { mockData } from '../data/mockData.js';

export const globalEducationService = {
  
  // Countries service functions
  async getAllCountries() {
    return { data: mockData.countries, error: null };
  },

  async getCountryById(countryId) {
    const country = mockData.countries.find(c => c.country_id === countryId);
    return { data: country, error: null };
  },

  // Universities service functions
  async getAllUniversities() {
    return { data: mockData.universities, error: null };
  },

  async getUniversitiesByCountry(countryId) {
    const universities = mockData.universities.filter(u => u.country_id === countryId);
    return { data: universities, error: null };
  },

  async getUniversityById(universityId) {
    const university = mockData.universities.find(u => u.university_id === universityId);
    return { data: university, error: null };
  },

  // Courses service functions
  async getAllCourses() {
    return { data: mockData.courses, error: null };
  },

  async getCoursesByUniversity(universityId) {
    const courses = mockData.courses.filter(c => c.university_id === universityId);
    return { data: courses, error: null };
  },

  async getCourseById(courseId) {
    const course = mockData.courses.find(c => c.course_id === courseId);
    return { data: course, error: null };
  },

  // Pathways service functions
  async getAllPathways() {
    return { data: mockData.pathways, error: null };
  },

  // Search functions
  async searchUniversities(query, filters = {}) {
    let universities = mockData.universities;
    
    if (query) {
      universities = universities.filter(u => 
        u.university_name.toLowerCase().includes(query.toLowerCase()) ||
        u.city.toLowerCase().includes(query.toLowerCase()) ||
        u.state_province.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (filters.country_id) {
      universities = universities.filter(u => u.country_id === parseInt(filters.country_id));
    }
    
    if (filters.university_type) {
      universities = universities.filter(u => 
        u.university_type.toLowerCase().includes(filters.university_type.toLowerCase())
      );
    }
    
    return { data: universities, error: null };
  },

  async searchCourses(query, filters = {}) {
    let courses = mockData.courses;
    
    if (query) {
      courses = courses.filter(c => 
        c.program_name.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (filters.university_id) {
      courses = courses.filter(c => c.university_id === parseInt(filters.university_id));
    }
    
    if (filters.degree_level) {
      courses = courses.filter(c => 
        c.degree_level.toLowerCase() === filters.degree_level.toLowerCase()
      );
    }
    
    return { data: courses, error: null };
  },

  // Statistics
  async getStatistics() {
    return {
      countries: mockData.countries.length,
      universities: mockData.universities.length,
      courses: mockData.courses.length,
      pathways: mockData.pathways.length
    };
  },

  // Global Statistics (alias for getStatistics)
  async getGlobalStatistics() {
    return {
      totalCountries: 8,
      totalUniversities: 850,
      totalCourses: 8500,
      totalPathways: 5000,
      totalCareerPaths: 100
    };
  },

  // Featured Universities
  async getFeaturedUniversities(limit = 6) {
    const featured = mockData.universities
      .filter(u => u.national_ranking)
      .sort((a, b) => a.national_ranking - b.national_ranking)
      .slice(0, limit);
    return { data: featured, error: null };
  },

  // Featured Pathways
  async getFeaturedPathways(limit = 4) {
    const featured = mockData.pathways.slice(0, limit);
    return { data: featured, error: null };
  }
};

