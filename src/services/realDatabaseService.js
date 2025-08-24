// Real Database Service connecting directly to PostgreSQL
import { createClient } from '@supabase/supabase-js'

// Direct PostgreSQL connection configuration
const supabaseUrl = 'https://xududbaqaaffcaejwuix.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1ZHVkYmFxYWFmZmNhZWp3dWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTE4OTQsImV4cCI6MjA2Njg2Nzg5NH0.rMPZCHgDfyho4sUOXNcA1PF4yZ3GFBJxXya_SPcq8fA'

// Create Supabase client for direct database access
const supabase = createClient(supabaseUrl, supabaseKey)

class RealDatabaseService {
  constructor() {
    this.supabase = supabase;
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

  // Counselor service functions
  async getAllCounselors() {
    try {
      const { data, error } = await supabase
        .from('counselors')
        .select(`
          *,
          users (
            id,
            first_name,
            last_name,
            email
          )
        `)
        .eq('is_available', true)
        .order('id', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching counselors:', error);
      return { data: null, error };
    }
  }

  async getCounselorById(counselorId) {
    try {
      const { data, error } = await supabase
        .from('counselors')
        .select('*')
        .eq('id', counselorId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching counselor:', error);
      return { data: null, error };
    }
  }

  async getCounselorByEmail(email) {
    try {
      const { data, error } = await supabase
        .from('counselors')
        .select('*')
        .eq('email', email)
        .single();

      if (error) throw error;
      return { success: true, data, error: null };
    } catch (error) {
      console.error('Error fetching counselor by email:', error);
      return { success: false, data: null, error };
    }
  }

  // Counselor Request service functions
  async getCounselorRequestByStudent(studentId) {
    try {
      const { data, error } = await supabase
        .from('counselor_requests')
        .select('*')
        .eq('student_id', studentId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching counselor request:', error);
      return { data: null, error };
    }
  }

  async getCounselorRequestsByCounselor(counselorId) {
    try {
      const { data, error } = await supabase
        .from('counselor_requests')
        .select('*')
        .eq('requested_counselor_id', counselorId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching counselor requests by counselor:', error);
      return { data: null, error };
    }
  }

  async createCounselorRequest(requestData) {
    try {
      const { data, error } = await supabase
        .from('counselor_requests')
        .insert([requestData])
        .select();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error creating counselor request:', error);
      return { data: null, error };
    }
  }

  async getAllCounselorRequests() {
    try {
      const { data, error } = await supabase
        .from('counselor_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching counselor requests:', error);
      return { data: null, error };
    }
  }

  async getCounselorRequestsByStatus(status) {
    try {
      const { data, error } = await supabase
        .from('counselor_requests')
        .select('*')
        .eq('status', status)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching counselor requests by status:', error);
      return { data: null, error };
    }
  }

  async updateCounselorRequestStatus(requestId, status, adminNotes = null) {
    try {
      const updateData = {
        status,
        updated_at: new Date().toISOString()
      };

      if (adminNotes) {
        updateData.admin_notes = adminNotes;
      }

      if (status === 'approved') {
        updateData.approved_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('counselor_requests')
        .update(updateData)
        .eq('id', requestId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error updating counselor request status:', error);
      return { data: null, error };
    }
  }

  async getCounselorStudents(counselorId) {
    try {
      const { data, error } = await supabase
        .from('counselor_requests')
        .select(`
          *,
          student_id
        `)
        .eq('counselor_id', counselorId)
        .eq('status', 'approved')
        .order('approved_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching counselor students:', error);
      return { data: null, error };
    }
  }

  // Get all users from the users table
  async getAllUsers() {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data, error: null };
    } catch (error) {
      console.error('Error fetching all users:', error);
      return { success: false, data: null, error };
    }
  }

  // Get user by email
  async getUserByEmail(email) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) throw error;
      return { success: true, data, error: null };
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return { success: false, data: null, error };
    }
  }

  // Clean up student data (remove all counselor connections and reset progress)
  async cleanupStudentData(studentEmail) {
    try {
      // Get student user ID
      const studentResult = await this.getUserByEmail(studentEmail);
      if (!studentResult.success || !studentResult.data) {
        return { success: false, error: 'Student not found' };
      }

      const studentId = studentResult.data.user_id;

      // Delete all counselor requests for this student
      const { error: deleteError } = await supabase
        .from('counselor_requests')
        .delete()
        .eq('student_id', studentId);

      if (deleteError) throw deleteError;

      console.log(`✅ Cleaned up all counselor connections for student: ${studentEmail}`);
      return { success: true, message: 'Student data cleaned successfully' };
    } catch (error) {
      console.error('Error cleaning up student data:', error);
      return { success: false, error };
    }
  }

  // Create a new student user
  async createStudentUser(userData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{
          email: userData.email,
          full_name: userData.fullName,
          role: 'student',
          nationality: userData.nationality || 'Indian',
          current_location: userData.currentLocation || 'Mumbai, India',
          phone: userData.phone || '+91-9876543210',
          current_institution: userData.currentInstitution || 'Delhi University',
          current_education_level: userData.educationLevel || "Bachelor's",
          expected_graduation_year: userData.graduationYear || '2024',
          current_gpa: userData.gpa || '8.5/10',
          intended_field_of_study: userData.fieldOfStudy || 'Computer Science',
          study_level: userData.studyLevel || "Master's Degree",
          career_interests: userData.careerInterests || 'Software Development',
          target_countries: userData.targetCountries || 'Australia',
          target_universities: userData.targetUniversities || 'University of Melbourne',
          interested_programs: userData.interestedPrograms || 'Computer Science',
          budget_range: userData.budgetRange || '$30,000 - $50,000 AUD',
          languages: userData.languages || 'English, Hindi',
          communication_style: userData.communicationStyle || 'Professional',
          timezone: userData.timezone || 'Asia/Kolkata (GMT+5:30)',
          areas_of_support: userData.areasOfSupport || 'University Selection, Application Process',
          urgency_level: userData.urgencyLevel || 'Medium Priority',
          extracurricular_activities: userData.extracurriculars || 'Debate Club, Volunteer Work',
          academic_achievements: userData.achievements || 'Merit Scholarship Recipient',
          created_at: new Date().toISOString()
        }])
        .select();

      if (error) throw error;
      
      console.log(`✅ Created new student user: ${userData.email}`);
      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Error creating student user:', error);
      return { success: false, error };
    }
  }

  // Get approved students assigned to a specific counselor
  async getApprovedStudentsForCounselor(counselorId) {
    try {
      // First get the counselor requests
      const { data: requests, error: requestError } = await this.supabase
        .from('counselor_requests')
        .select('*')
        .eq('requested_counselor_id', counselorId)
        .eq('status', 'approved')
        .order('approved_at', { ascending: false });

      if (requestError) throw requestError;
      
      if (!requests || requests.length === 0) {
        return { success: true, data: [] };
      }

      // Get student IDs from the requests
      const studentIds = requests.map(req => req.student_id);

      // Get student details
      const { data: students, error: studentError } = await this.supabase
        .from('students')
        .select('*')
        .in('id', studentIds);

      if (studentError) throw studentError;

      // Get user details for the students
      const userIds = students.map(student => student.user_id);
      const { data: users, error: userError } = await this.supabase
        .from('users')
        .select('*')
        .in('id', userIds);

      if (userError) throw userError;

      // Combine the data
      const combinedData = requests.map(request => {
        const student = students.find(s => s.id === request.student_id);
        const user = users.find(u => u.id === student?.user_id);
        
        return {
          ...request,
          students: {
            ...student,
            users: user
          }
        };
      });

      return { success: true, data: combinedData };
    } catch (error) {
      console.error('Error fetching approved students for counselor:', error);
      return { success: false, data: [], error };
    }
  }

  // Get students assigned to a specific counselor
  async getCounselorStudents(counselorId) {
    try {
      // First check counselor_assignments table
      const { data: assignments, error: assignError } = await this.supabase
        .from('counselor_assignments')
        .select(`
          *,
          students (
            id,
            email,
            student_type,
            nationality,
            user_id,
            users (
              first_name,
              last_name,
              phone,
              email
            )
          )
        `)
        .eq('counselor_id', counselorId)
        .eq('status', 'active');

      if (assignError) {
        console.log('No assignments found, checking counselor_requests...');
        
        // Fallback to counselor_requests table
        const { data: requests, error: reqError } = await this.supabase
          .from('counselor_requests')
          .select(`
            *,
            students (
              id,
              email,
              student_type,
              nationality,
              user_id,
              users (
                first_name,
                last_name,
                phone,
                email
              )
            )
          `)
          .eq('requested_counselor_id', counselorId)
          .eq('status', 'approved');

        if (reqError) throw reqError;
        return { success: true, data: requests || [] };
      }

      return { success: true, data: assignments || [] };
    } catch (error) {
      console.error('Error fetching counselor students:', error);
      return { success: false, data: [], error };
    }
  }

  // Session Management Functions
  
  // Create a new session
  async createSession(sessionData) {
    try {
      const { data, error } = await this.supabase
        .from('sessions')
        .insert([{
          student_id: sessionData.studentId,
          counselor_id: sessionData.counselorId,
          session_type: sessionData.sessionType || 'consultation',
          session_title: sessionData.sessionTitle,
          session_description: sessionData.sessionDescription,
          scheduled_date: sessionData.scheduledDate,
          scheduled_time: sessionData.scheduledTime,
          duration_minutes: sessionData.durationMinutes || 60,
          status: 'scheduled',
          meeting_link: sessionData.meetingLink,
          notes: sessionData.notes
        }])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating session:', error);
      return { success: false, error };
    }
  }

  // Get sessions for a counselor
  async getCounselorSessions(counselorId) {
    try {
      const { data, error } = await this.supabase
        .from('sessions')
        .select('*')
        .eq('counselor_id', counselorId)
        .order('scheduled_date', { ascending: true });

      if (error) throw error;
      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Error fetching counselor sessions:', error);
      return { success: false, data: [], error };
    }
  }

  // Get sessions for a student
  async getStudentSessions(studentId) {
    try {
      const { data, error } = await this.supabase
        .from('sessions')
        .select('*')
        .eq('student_id', studentId)
        .order('scheduled_date', { ascending: true });

      if (error) throw error;
      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Error fetching student sessions:', error);
      return { success: false, data: [], error };
    }
  }

  // Update session status
  async updateSessionStatus(sessionId, status, notes = null) {
    try {
      const updateData = { 
        status, 
        updated_at: new Date().toISOString() 
      };
      
      if (notes) {
        updateData.notes = notes;
      }

      const { data, error } = await this.supabase
        .from('sessions')
        .update(updateData)
        .eq('id', sessionId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error updating session status:', error);
      return { success: false, error };
    }
  }

  // Get session by ID
  async getSessionById(sessionId) {
    try {
      const { data, error } = await this.supabase
        .from('sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching session:', error);
      return { success: false, error };
    }
  }
}

// Export singleton instance
export const realDatabaseService = new RealDatabaseService();
export default realDatabaseService;

