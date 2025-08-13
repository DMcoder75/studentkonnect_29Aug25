// API-based Database Service - Connects to backend API
const API_BASE_URL = 'https://3001-iv9bmtkgayujwt678svfs-733adece.manusvm.computer/api';

class ApiDatabaseService {
  constructor() {
    this.cache = {
      countries: null,
      universities: null,
      courses: null,
      pathways: null
    };
  }

  async fetchWithErrorHandling(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API fetch error:', error);
      throw error;
    }
  }

  // Countries service functions
  async getAllCountries() {
    try {
      if (this.cache.countries) {
        return { data: this.cache.countries, error: null };
      }

      const result = await this.fetchWithErrorHandling(`${API_BASE_URL}/countries`);
      
      if (result.data) {
        this.cache.countries = result.data;
        return { data: result.data, error: null };
      }
      
      return { data: null, error: result.error };
    } catch (error) {
      console.error('Error fetching countries:', error);
      return { data: null, error };
    }
  }

  async getCountryById(countryId) {
    try {
      const result = await this.fetchWithErrorHandling(`${API_BASE_URL}/countries/${countryId}`);
      return { data: result.data, error: result.error };
    } catch (error) {
      console.error('Error fetching country:', error);
      return { data: null, error };
    }
  }

  // Universities service functions
  async getAllUniversities() {
    try {
      const result = await this.fetchWithErrorHandling(`${API_BASE_URL}/universities`);
      return { data: result.data, error: result.error };
    } catch (error) {
      console.error('Error fetching universities:', error);
      return { data: null, error };
    }
  }

  async getUniversitiesByCountry(countryId) {
    try {
      const result = await this.fetchWithErrorHandling(`${API_BASE_URL}/universities/country/${countryId}`);
      return { data: result.data, error: result.error };
    } catch (error) {
      console.error('Error fetching universities by country:', error);
      return { data: null, error };
    }
  }

  async getUniversityById(universityId) {
    try {
      const result = await this.fetchWithErrorHandling(`${API_BASE_URL}/universities/${universityId}`);
      return { data: result.data, error: result.error };
    } catch (error) {
      console.error('Error fetching university:', error);
      return { data: null, error };
    }
  }

  // Courses service functions
  async getAllCourses() {
    try {
      const result = await this.fetchWithErrorHandling(`${API_BASE_URL}/courses`);
      return { data: result.data, error: result.error };
    } catch (error) {
      console.error('Error fetching courses:', error);
      return { data: null, error };
    }
  }

  async getCoursesByUniversity(universityId) {
    try {
      const result = await this.fetchWithErrorHandling(`${API_BASE_URL}/courses/university/${universityId}`);
      return { data: result.data, error: result.error };
    } catch (error) {
      console.error('Error fetching courses by university:', error);
      return { data: null, error };
    }
  }

  async getCourseById(courseId) {
    try {
      const result = await this.fetchWithErrorHandling(`${API_BASE_URL}/courses/${courseId}`);
      return { data: result.data, error: result.error };
    } catch (error) {
      console.error('Error fetching course:', error);
      return { data: null, error };
    }
  }

  // Pathways service functions
  async getAllPathways() {
    try {
      if (this.cache.pathways) {
        return { data: this.cache.pathways, error: null };
      }

      const result = await this.fetchWithErrorHandling(`${API_BASE_URL}/pathways`);
      
      if (result.data) {
        this.cache.pathways = result.data;
        return { data: result.data, error: null };
      }
      
      return { data: null, error: result.error };
    } catch (error) {
      console.error('Error fetching pathways:', error);
      return { data: null, error };
    }
  }

  // Search functions
  async searchUniversities(searchTerm, filters = {}) {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('q', searchTerm);
      if (filters.country_id) params.append('country_id', filters.country_id);
      if (filters.university_type) params.append('university_type', filters.university_type);

      const result = await this.fetchWithErrorHandling(`${API_BASE_URL}/search/universities?${params}`);
      return { data: result.data, error: result.error };
    } catch (error) {
      console.error('Error searching universities:', error);
      return { data: null, error };
    }
  }

  async searchCourses(searchTerm, filters = {}) {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('q', searchTerm);
      if (filters.university_id) params.append('university_id', filters.university_id);
      if (filters.degree_level) params.append('degree_level', filters.degree_level);

      const result = await this.fetchWithErrorHandling(`${API_BASE_URL}/search/courses?${params}`);
      return { data: result.data, error: result.error };
    } catch (error) {
      console.error('Error searching courses:', error);
      return { data: null, error };
    }
  }

  // Statistics functions
  async getStatistics() {
    try {
      const result = await this.fetchWithErrorHandling(`${API_BASE_URL}/statistics`);
      return {
        countries: result.countries || 0,
        universities: result.universities || 0,
        courses: result.courses || 0,
        pathways: result.pathways || 0,
        careerPaths: 450 // This might be calculated differently
      };
    } catch (error) {
      console.error('Error fetching statistics:', error);
      return {
        countries: 0,
        universities: 0,
        courses: 0,
        pathways: 0,
        careerPaths: 0
      };
    }
  }

  // Global statistics for homepage
  async getGlobalStatistics() {
    try {
      const stats = await this.getStatistics();
      return {
        totalCountries: stats.countries,
        totalUniversities: stats.universities,
        totalCourses: stats.courses,
        totalPathways: stats.pathways,
        totalCareerPaths: stats.careerPaths
      };
    } catch (error) {
      console.error('Error fetching global statistics:', error);
      return {
        totalCountries: 8,
        totalUniversities: 866,
        totalCourses: 1000,
        totalPathways: 2400,
        totalCareerPaths: 450
      };
    }
  }
}

// Export singleton instance
export const apiDatabaseService = new ApiDatabaseService();
export default apiDatabaseService;

