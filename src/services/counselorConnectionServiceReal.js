// Real Database-Driven Counselor Connection Service
import realDatabaseService from './realDatabaseService.js';

class CounselorConnectionService {
  constructor() {
    // Real database integration - no more in-memory storage
  }

  // Student functions
  async createConnectionRequest(studentId, studentName, studentEmail, counselorId, counselorName, notes = '') {
    try {
      // Check if student already has a pending request
      const existingRequests = await realDatabaseService.getCounselorRequestsByStudent(studentEmail);
      const existingPending = existingRequests.find(req => req.status === 'pending');

      if (existingPending) {
        return {
          success: false,
          error: 'You already have a pending connection request. Please wait for approval or cancel the existing request.',
          existingRequest: existingPending
        };
      }

      // Create new connection request in database
      const requestData = {
        student_email: studentEmail,
        student_name: studentName,
        counselor_email: counselorId, // Assuming counselorId is email
        counselor_name: counselorName,
        status: 'pending',
        request_date: new Date().toISOString(),
        notes: notes || '',
        approved_date: null,
        approved_by: null
      };

      const newRequest = await realDatabaseService.createCounselorRequest(requestData);

      // Update student dashboard stats
      await this.updateStudentStats(studentEmail);
      
      // Update counselor dashboard stats  
      await this.updateCounselorStats(counselorId);

      // Log activity
      await this.logActivity(studentEmail, 'connection_request', `Sent connection request to ${counselorName}`);

      return {
        success: true,
        request: newRequest,
        message: 'Connection request sent successfully! You will be notified when the counselor responds.'
      };

    } catch (error) {
      console.error('Error creating connection request:', error);
      return {
        success: false,
        error: 'Failed to send connection request. Please try again.'
      };
    }
  }

  async cancelConnectionRequest(studentEmail, requestId) {
    try {
      // Update request status to cancelled
      await realDatabaseService.updateCounselorRequestStatus(requestId, 'cancelled');

      // Update student dashboard stats
      await this.updateStudentStats(studentEmail);

      // Log activity
      await this.logActivity(studentEmail, 'connection_cancelled', 'Cancelled connection request');

      return {
        success: true,
        message: 'Connection request cancelled successfully.'
      };

    } catch (error) {
      console.error('Error cancelling connection request:', error);
      return {
        success: false,
        error: 'Failed to cancel connection request. Please try again.'
      };
    }
  }

  async getStudentConnections(studentEmail) {
    try {
      const connections = await realDatabaseService.getCounselorRequestsByStudent(studentEmail);
      return {
        success: true,
        connections: connections
      };
    } catch (error) {
      console.error('Error getting student connections:', error);
      return {
        success: false,
        connections: [],
        error: 'Failed to load connections.'
      };
    }
  }

  // Admin functions
  async approveConnectionRequest(requestId, adminEmail, notes = '') {
    try {
      // Update request status to approved
      const updateData = {
        status: 'approved',
        approved_date: new Date().toISOString(),
        approved_by: adminEmail,
        admin_notes: notes
      };

      await realDatabaseService.updateCounselorRequest(requestId, updateData);

      // Get request details for notifications
      const request = await realDatabaseService.getCounselorRequestById(requestId);

      // Update both student and counselor stats
      await this.updateStudentStats(request.student_email);
      await this.updateCounselorStats(request.counselor_email);

      // Log activities
      await this.logActivity(request.student_email, 'connection_approved', `Connection approved with ${request.counselor_name}`);
      await this.logActivity(request.counselor_email, 'student_assigned', `New student assigned: ${request.student_name}`);

      return {
        success: true,
        message: 'Connection request approved successfully.',
        request: request
      };

    } catch (error) {
      console.error('Error approving connection request:', error);
      return {
        success: false,
        error: 'Failed to approve connection request. Please try again.'
      };
    }
  }

  async rejectConnectionRequest(requestId, adminEmail, reason = '') {
    try {
      // Update request status to rejected
      const updateData = {
        status: 'rejected',
        approved_date: new Date().toISOString(),
        approved_by: adminEmail,
        admin_notes: reason
      };

      await realDatabaseService.updateCounselorRequest(requestId, updateData);

      // Get request details for notifications
      const request = await realDatabaseService.getCounselorRequestById(requestId);

      // Update student stats
      await this.updateStudentStats(request.student_email);

      // Log activity
      await this.logActivity(request.student_email, 'connection_rejected', `Connection request rejected: ${reason}`);

      return {
        success: true,
        message: 'Connection request rejected.',
        request: request
      };

    } catch (error) {
      console.error('Error rejecting connection request:', error);
      return {
        success: false,
        error: 'Failed to reject connection request. Please try again.'
      };
    }
  }

  async getAllPendingRequests() {
    try {
      const requests = await realDatabaseService.getCounselorRequestsByStatus('pending');
      return {
        success: true,
        requests: requests
      };
    } catch (error) {
      console.error('Error getting pending requests:', error);
      return {
        success: false,
        requests: [],
        error: 'Failed to load pending requests.'
      };
    }
  }

  // Counselor functions
  async getCounselorStudents(counselorEmail) {
    try {
      const students = await realDatabaseService.getCounselorStudents(counselorEmail);
      return {
        success: true,
        students: students
      };
    } catch (error) {
      console.error('Error getting counselor students:', error);
      return {
        success: false,
        students: [],
        error: 'Failed to load students.'
      };
    }
  }

  // Dashboard update functions
  async updateStudentStats(studentEmail) {
    try {
      // Get all connections for this student
      const connections = await realDatabaseService.getCounselorRequestsByStudent(studentEmail);
      
      // Calculate stats
      const activeConnections = connections.filter(conn => conn.status === 'approved').length;
      const pendingConnections = connections.filter(conn => conn.status === 'pending').length;
      
      // Update student profile with new stats
      await realDatabaseService.updateUserStats(studentEmail, {
        active_connections: activeConnections,
        pending_connections: pendingConnections,
        last_updated: new Date().toISOString()
      });

      return { success: true };
    } catch (error) {
      console.error('Error updating student stats:', error);
      return { success: false };
    }
  }

  async updateCounselorStats(counselorEmail) {
    try {
      // Get all students for this counselor
      const students = await realDatabaseService.getCounselorStudents(counselorEmail);
      
      // Calculate stats
      const activeStudents = students.filter(student => student.status === 'approved').length;
      const totalRequests = students.length;
      
      // Update counselor profile with new stats
      await realDatabaseService.updateUserStats(counselorEmail, {
        active_students: activeStudents,
        total_requests: totalRequests,
        last_updated: new Date().toISOString()
      });

      return { success: true };
    } catch (error) {
      console.error('Error updating counselor stats:', error);
      return { success: false };
    }
  }

  // Activity logging
  async logActivity(userEmail, activityType, description) {
    try {
      const activityData = {
        user_email: userEmail,
        activity_type: activityType,
        description: description,
        timestamp: new Date().toISOString()
      };

      await realDatabaseService.logUserActivity(activityData);
      return { success: true };
    } catch (error) {
      console.error('Error logging activity:', error);
      return { success: false };
    }
  }

  // Session management
  async createSession(studentEmail, counselorEmail, sessionType, scheduledDate, notes = '') {
    try {
      const sessionData = {
        student_email: studentEmail,
        counselor_email: counselorEmail,
        session_type: sessionType, // 'video', 'phone', 'chat'
        scheduled_date: scheduledDate,
        status: 'scheduled',
        notes: notes,
        created_date: new Date().toISOString()
      };

      const newSession = await realDatabaseService.createSession(sessionData);

      // Update stats for both users
      await this.updateStudentStats(studentEmail);
      await this.updateCounselorStats(counselorEmail);

      // Log activities
      await this.logActivity(studentEmail, 'session_scheduled', `${sessionType} session scheduled`);
      await this.logActivity(counselorEmail, 'session_scheduled', `Session scheduled with student`);

      return {
        success: true,
        session: newSession,
        message: 'Session scheduled successfully!'
      };

    } catch (error) {
      console.error('Error creating session:', error);
      return {
        success: false,
        error: 'Failed to schedule session. Please try again.'
      };
    }
  }

  async completeSession(sessionId, notes = '', rating = null) {
    try {
      const updateData = {
        status: 'completed',
        completed_date: new Date().toISOString(),
        completion_notes: notes,
        rating: rating
      };

      await realDatabaseService.updateSession(sessionId, updateData);

      // Get session details
      const session = await realDatabaseService.getSessionById(sessionId);

      // Update stats for both users
      await this.updateStudentStats(session.student_email);
      await this.updateCounselorStats(session.counselor_email);

      // Log activities
      await this.logActivity(session.student_email, 'session_completed', 'Counseling session completed');
      await this.logActivity(session.counselor_email, 'session_completed', 'Session completed with student');

      return {
        success: true,
        message: 'Session marked as completed!'
      };

    } catch (error) {
      console.error('Error completing session:', error);
      return {
        success: false,
        error: 'Failed to complete session. Please try again.'
      };
    }
  }
}

// Export singleton instance
const counselorConnectionService = new CounselorConnectionService();
export default counselorConnectionService;

