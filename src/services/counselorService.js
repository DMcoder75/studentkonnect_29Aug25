// Counselor Service - Database integration for counselor matching
import { supabase } from '../lib/supabase.js';

export class CounselorService {
  /**
   * Get all active counselors with their coverage and credentials
   */
  async getAllCounselors() {
    try {
      const { data: counselors, error } = await supabase
        .from('counselors')
        .select(`
          *,
          counselor_coverage (
            country,
            state_province,
            city,
            is_primary_location
          ),
          counselor_credentials (
            credential_type,
            credential_name,
            issuing_organization,
            verification_status
          ),
          counselor_reviews (
            overall_rating,
            communication_rating,
            expertise_rating,
            review_content,
            would_recommend
          )
        `)
        .eq('status', 'active')
        .order('average_rating', { ascending: false });

      if (error) throw error;

      // Process and enhance counselor data
      return counselors.map(counselor => ({
        ...counselor,
        coverage: counselor.counselor_coverage || [],
        credentials: counselor.counselor_credentials || [],
        reviews: counselor.counselor_reviews || [],
        reviewCount: counselor.counselor_reviews?.length || 0,
        verifiedCredentials: counselor.counselor_credentials?.filter(
          cred => cred.verification_status === 'verified'
        ).length || 0
      }));
    } catch (error) {
      console.error('Error fetching counselors:', error);
      throw error;
    }
  }

  /**
   * Get counselor by ID with full details
   */
  async getCounselorById(counselorId) {
    try {
      const { data: counselor, error } = await supabase
        .from('counselors')
        .select(`
          *,
          counselor_coverage (
            country,
            state_province,
            city,
            is_primary_location
          ),
          counselor_credentials (
            credential_type,
            credential_name,
            issuing_organization,
            verification_status,
            issue_date,
            expiry_date
          ),
          counselor_reviews (
            overall_rating,
            communication_rating,
            expertise_rating,
            responsiveness_rating,
            value_rating,
            review_title,
            review_content,
            would_recommend,
            created_at,
            student_id
          ),
          counselor_availability (
            day_of_week,
            start_time,
            end_time,
            is_available
          )
        `)
        .eq('id', counselorId)
        .single();

      if (error) throw error;

      return {
        ...counselor,
        coverage: counselor.counselor_coverage || [],
        credentials: counselor.counselor_credentials || [],
        reviews: counselor.counselor_reviews || [],
        availability: counselor.counselor_availability || []
      };
    } catch (error) {
      console.error('Error fetching counselor:', error);
      throw error;
    }
  }

  /**
   * Find matching counselors for a student
   */
  async findMatchingCounselors(studentProfile, options = {}) {
    try {
      // Get all counselors first
      const counselors = await this.getAllCounselors();
      
      // Import and use the matching algorithm
      const { CounselorMatcher } = await import('/home/ubuntu/counselor_matching_algorithm.js');
      const matcher = new CounselorMatcher();
      
      // Find matches
      const matches = await matcher.findMatchingCounselors(
        studentProfile, 
        counselors, 
        options
      );

      return matches;
    } catch (error) {
      console.error('Error finding matching counselors:', error);
      throw error;
    }
  }

  /**
   * Create a counselor assignment (connection request)
   */
  async createCounselorAssignment(studentId, counselorId, assignmentData) {
    try {
      const { data, error } = await supabase
        .from('counselor_assignments')
        .insert({
          student_id: studentId,
          counselor_id: counselorId,
          assignment_type: assignmentData.type || 'general',
          service_description: assignmentData.description,
          priority_level: assignmentData.priority || 3,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      // Create notification for counselor
      await this.createNotification({
        recipient_type: 'counselor',
        recipient_id: counselorId,
        notification_type: 'new_assignment',
        title: 'New Student Assignment',
        message: `You have received a new assignment request from a student.`,
        action_url: `/counselor/assignments/${data.id}`
      });

      return data;
    } catch (error) {
      console.error('Error creating counselor assignment:', error);
      throw error;
    }
  }

  /**
   * Get student's counselor assignments
   */
  async getStudentAssignments(studentId) {
    try {
      const { data, error } = await supabase
        .from('counselor_assignments')
        .select(`
          *,
          counselors (
            first_name,
            last_name,
            profile_image_url,
            specializations,
            average_rating
          )
        `)
        .eq('student_id', studentId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching student assignments:', error);
      throw error;
    }
  }

  /**
   * Schedule a meeting with a counselor
   */
  async scheduleMeeting(assignmentId, meetingData) {
    try {
      const { data, error } = await supabase
        .from('meetings')
        .insert({
          assignment_id: assignmentId,
          counselor_id: meetingData.counselorId,
          student_id: meetingData.studentId,
          meeting_title: meetingData.title,
          meeting_description: meetingData.description,
          scheduled_start_time: meetingData.startTime,
          scheduled_end_time: meetingData.endTime,
          meeting_type: meetingData.type || 'consultation',
          status: 'scheduled'
        })
        .select()
        .single();

      if (error) throw error;

      // Create notifications for both parties
      await Promise.all([
        this.createNotification({
          recipient_type: 'counselor',
          recipient_id: meetingData.counselorId,
          notification_type: 'meeting_scheduled',
          title: 'Meeting Scheduled',
          message: `A new meeting has been scheduled with your student.`,
          action_url: `/counselor/meetings/${data.id}`
        }),
        this.createNotification({
          recipient_type: 'student',
          recipient_id: meetingData.studentId,
          notification_type: 'meeting_scheduled',
          title: 'Meeting Confirmed',
          message: `Your meeting with the counselor has been confirmed.`,
          action_url: `/student/meetings/${data.id}`
        })
      ]);

      return data;
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      throw error;
    }
  }

  /**
   * Submit a review for a counselor
   */
  async submitCounselorReview(reviewData) {
    try {
      const { data, error } = await supabase
        .from('counselor_reviews')
        .insert({
          counselor_id: reviewData.counselorId,
          student_id: reviewData.studentId,
          assignment_id: reviewData.assignmentId,
          overall_rating: reviewData.overallRating,
          communication_rating: reviewData.communicationRating,
          expertise_rating: reviewData.expertiseRating,
          responsiveness_rating: reviewData.responsivenessRating,
          value_rating: reviewData.valueRating,
          review_title: reviewData.title,
          review_content: reviewData.content,
          would_recommend: reviewData.wouldRecommend
        })
        .select()
        .single();

      if (error) throw error;

      // Update counselor's average rating
      await this.updateCounselorRating(reviewData.counselorId);

      return data;
    } catch (error) {
      console.error('Error submitting review:', error);
      throw error;
    }
  }

  /**
   * Update counselor's average rating
   */
  async updateCounselorRating(counselorId) {
    try {
      // Calculate new average rating
      const { data: reviews, error: reviewsError } = await supabase
        .from('counselor_reviews')
        .select('overall_rating')
        .eq('counselor_id', counselorId);

      if (reviewsError) throw reviewsError;

      const totalRating = reviews.reduce((sum, review) => sum + review.overall_rating, 0);
      const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

      // Update counselor record
      const { error: updateError } = await supabase
        .from('counselors')
        .update({
          average_rating: averageRating,
          total_reviews: reviews.length
        })
        .eq('id', counselorId);

      if (updateError) throw updateError;
    } catch (error) {
      console.error('Error updating counselor rating:', error);
      throw error;
    }
  }

  /**
   * Create a notification
   */
  async createNotification(notificationData) {
    try {
      const { error } = await supabase
        .from('notifications')
        .insert(notificationData);

      if (error) throw error;
    } catch (error) {
      console.error('Error creating notification:', error);
      // Don't throw - notifications are not critical
    }
  }

  /**
   * Search counselors with filters
   */
  async searchCounselors(filters = {}) {
    try {
      let query = supabase
        .from('counselors')
        .select(`
          *,
          counselor_coverage (
            country,
            state_province,
            city
          )
        `)
        .eq('status', 'active');

      // Apply filters
      if (filters.specialization) {
        query = query.contains('specializations', [filters.specialization]);
      }

      if (filters.country) {
        query = query.eq('counselor_coverage.country', filters.country);
      }

      if (filters.language) {
        query = query.contains('languages_spoken', [filters.language]);
      }

      if (filters.minRating) {
        query = query.gte('average_rating', filters.minRating);
      }

      if (filters.maxRate) {
        query = query.lte('hourly_rate', filters.maxRate);
      }

      const { data, error } = await query.order('average_rating', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error searching counselors:', error);
      throw error;
    }
  }

  /**
   * Get counselor statistics for dashboard
   */
  async getCounselorStats() {
    try {
      const { data: stats, error } = await supabase
        .from('counselors')
        .select('status, is_available, specializations')
        .eq('status', 'active');

      if (error) throw error;

      const totalActive = stats.length;
      const available = stats.filter(c => c.is_available).length;
      const specializations = [...new Set(stats.flatMap(c => c.specializations || []))];

      return {
        totalActive,
        available,
        unavailable: totalActive - available,
        topSpecializations: specializations.slice(0, 10)
      };
    } catch (error) {
      console.error('Error fetching counselor stats:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const counselorService = new CounselorService();

