// Counselor Connection Service
// Manages student-counselor connection requests and approvals with real database integration
import realDatabaseService from './realDatabaseService'

class CounselorConnectionService {
  constructor() {
    // Real database integration - no more in-memory storage
  }

  // Student functions
  async createConnectionRequest(studentId, studentName, studentEmail, counselorEmail, counselorName, notes = '') {
    try {
      console.log('Creating connection request:', { studentId, studentEmail, counselorEmail, counselorName });

      // Get student user data from database
      const studentResult = await realDatabaseService.getUserByEmail(studentEmail);
      if (!studentResult.success || !studentResult.data) {
        return {
          success: false,
          error: 'Student account not found. Please ensure you are logged in correctly.'
        };
      }

      const studentUserId = studentResult.data.id; // Fix: use 'id' instead of 'user_id'

      // Check if student already has a pending request
      const existingRequestsResult = await realDatabaseService.getCounselorRequestByStudent(studentUserId);
      if (existingRequestsResult.data && existingRequestsResult.data.length > 0) {
        const existingPending = existingRequestsResult.data.find(req => req.status === 'pending');
        
        if (existingPending) {
          return {
            success: false,
            error: 'You already have a pending connection request. Please wait for approval or cancel the existing request.',
            existingRequest: existingPending
          };
        }
      }

      // Get counselor data from counselors table by email (not users table)
      const counselorResult = await realDatabaseService.getCounselorByEmail(counselorEmail);
      if (!counselorResult.success || !counselorResult.data) {
        return {
          success: false,
          error: 'Counselor not found. Please try again.'
        };
      }

      const counselorId = counselorResult.data.id; // Use bigint ID from counselors table

      // Create connection request with correct database schema
      const connectionData = {
        student_id: studentUserId,
        requested_counselor_id: counselorId, // Use bigint ID from counselors table
        request_reason: notes || `Student ${studentName} is interested in connecting with ${counselorName} for guidance`,
        status: 'pending'
      };

      // Create the connection request
      const result = await realDatabaseService.createCounselorRequest(connectionData);
      
      if (result.success) {
        return {
          success: true,
          message: `Connection request sent to ${counselorName}! They will be notified and can approve your request.`,
          connectionId: result.data?.id
        };
      } else {
        return {
          success: false,
          error: result.error || 'Failed to create connection request'
        };
      }
    } catch (error) {
      console.error('Error creating connection request:', error);
      return {
        success: false,
        error: 'Failed to create connection request. Please try again.'
      };
    }
  }

  async getStudentConnections(studentId) {
    try {
      // Get student user data
      const studentResult = await realDatabaseService.getUserByEmail(studentId);
      if (!studentResult.success || !studentResult.data) {
        return { success: false, error: 'Student not found' };
      }

      const studentUserId = studentResult.data.user_id;
      const connectionsResult = await realDatabaseService.getCounselorRequestByStudent(studentUserId);
      
      return {
        success: true,
        connections: connectionsResult.data || []
      };
    } catch (error) {
      console.error('Error fetching student connections:', error);
      return { success: false, error: 'Failed to fetch connections' };
    }
  }

  async cancelConnectionRequest(connectionId, studentId) {
    try {
      // Update the request status to cancelled in database
      const result = await realDatabaseService.updateCounselorRequestStatus(connectionId, 'cancelled');
      
      if (result.data) {
        await this.logActivity(studentId, 'connection_cancelled', 'Cancelled connection request');
        return {
          success: true,
          message: 'Connection request cancelled successfully'
        };
      } else {
        return {
          success: false,
          error: 'Connection request not found or cannot be cancelled'
        };
      }
    } catch (error) {
      console.error('Error cancelling connection request:', error);
      return { success: false, error: 'Failed to cancel connection request' };
    }
  }

  // Admin functions
  async getAllPendingConnections() {
    try {
      const result = await realDatabaseService.getCounselorRequestsByStatus('pending');
      return {
        success: true,
        connections: result.data || []
      };
    } catch (error) {
      console.error('Error fetching pending connections:', error);
      return { success: false, error: 'Failed to fetch pending connections' };
    }
  }

  async getAllConnections() {
    try {
      const result = await realDatabaseService.getAllCounselorRequests();
      return {
        success: true,
        connections: result.data || []
      };
    } catch (error) {
      console.error('Error fetching all connections:', error);
      return { success: false, error: 'Failed to fetch all connections' };
    }
  }

  async approveConnection(connectionId, adminId) {
    try {
      const result = await realDatabaseService.updateCounselorRequestStatus(connectionId, 'approved');
      
      if (result.data) {
        // Log activity for both student and counselor
        const connection = result.data;
        await this.logActivity(connection.student_id, 'connection_approved', 'Connection request approved');
        await this.logActivity(connection.counselor_id, 'connection_approved', 'Connection request approved');
        
        return {
          success: true,
          connection: result.data,
          message: 'Connection approved successfully'
        };
      } else {
        return {
          success: false,
          error: 'Connection request not found or already processed'
        };
      }
    } catch (error) {
      console.error('Error approving connection:', error);
      return { success: false, error: 'Failed to approve connection' };
    }
  }

  async rejectConnection(connectionId, adminId, rejectionReason = '') {
    try {
      const result = await realDatabaseService.updateCounselorRequestStatus(connectionId, 'rejected', rejectionReason);
      
      if (result.data) {
        // Log activity
        const connection = result.data;
        await this.logActivity(connection.student_id, 'connection_rejected', `Connection request rejected: ${rejectionReason}`);
        
        return {
          success: true,
          connection: result.data,
          message: 'Connection rejected successfully'
        };
      } else {
        return {
          success: false,
          error: 'Connection request not found or already processed'
        };
      }
    } catch (error) {
      console.error('Error rejecting connection:', error);
      return { success: false, error: 'Failed to reject connection' };
    }
  }

  // Activity logging for real-time updates
  async logActivity(userId, activityType, description) {
    try {
      // This would create entries in an activity_log table for real-time dashboard updates
      console.log(`Activity logged: ${userId} - ${activityType} - ${description}`);
      // TODO: Implement actual activity logging to database
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  }

  // Utility functions
  async getConnectionStats() {
    try {
      const allConnectionsResult = await realDatabaseService.getAllCounselorRequests();
      const connections = allConnectionsResult.data || [];
      
      const stats = {
        total: connections.length,
        pending: connections.filter(conn => conn.status === 'pending').length,
        approved: connections.filter(conn => conn.status === 'approved').length,
        rejected: connections.filter(conn => conn.status === 'rejected').length,
        cancelled: connections.filter(conn => conn.status === 'cancelled').length
      };

      return { success: true, stats };
    } catch (error) {
      console.error('Error fetching connection stats:', error);
      return { success: false, error: 'Failed to fetch connection stats' };
    }
  }
}

// Export singleton instance
export const counselorConnectionService = new CounselorConnectionService();

