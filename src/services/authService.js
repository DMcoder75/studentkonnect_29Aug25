// Professional Authentication Service with Real Database Integration
import { supabase } from '../lib/supabase.js';

const API_BASE_URL = 'http://localhost:3002'; // Using the working auth API

export const authService = {
  async authenticateUser(email, password) {
    try {
      console.log('Authenticating user:', email);
      
      // Try demo credentials first for testing
      const demoResult = this.authenticateDemoUser(email, password);
      if (demoResult.success) {
        console.log('Demo authentication successful:', demoResult.user.full_name);
        return demoResult;
      }
      
      // Call the working database API as fallback
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      
      const result = await response.json();
      
      if (result.success && result.user) {
        console.log('Database authentication successful:', result.user.full_name);
        return {
          success: true,
          user: result.user
        };
      } else {
        console.log('Authentication failed:', result.error);
        return {
          success: false,
          error: result.error || 'Invalid credentials'
        };
      }
      
    } catch (error) {
      console.error('Authentication service error:', error);
      return {
        success: false,
        error: 'Invalid email or password'
      };
    }
  },

  // Fallback demo authentication
  authenticateDemoUser(email, password) {
    const DEMO_CREDENTIALS = {
      // Student credentials
      'priya.dubey@email.com': {
        password: 'password123',
        user: {
          id: 'student-1',
          email: 'priya.dubey@email.com',
          full_name: 'Priya Dubey',
          firstName: 'Priya',
          role: 'student',
          profile: {
            phone: '+91-9876543210',
            nationality: 'Indian',
            current_education_level: 'Bachelor\'s',
            target_country: 'Australia',
            target_university: 'University of Melbourne',
            profile_completion: 33
          }
        }
      },
      
      // Counselor credentials  
      'michael.kumar@email.com': {
        password: 'counselor123',
        user: {
          id: 'counselor-1',
          email: 'michael.kumar@email.com',
          full_name: 'Michael Kumar',
          firstName: 'Michael',
          role: 'counselor',
          profile: {
            phone: '8765 4321',
            bio: 'Business and Finance expert with extensive experience in MBA programs and career guidance.',
            years_experience: 6,
            counselor_type: 'career',
            specializations: 'business,finance',
            languages_spoken: ['English', 'Hindi', 'Tamil'],
            hourly_rate: '120.00',
            currency: 'AUD',
            total_students_helped: 18,
            success_rate: '89.00',
            average_rating: '4.70',
            total_reviews: 15,
            is_available: true
          }
        }
      },
      
      // Admin credentials
      'admin@email.com': {
        password: 'admin123',
        user: {
          id: 'admin-1',
          email: 'admin@email.com',
          full_name: 'System Administrator',
          firstName: 'Admin',
          role: 'admin'
        }
      }
    };

    const credential = DEMO_CREDENTIALS[email.toLowerCase()];
    
    if (credential && credential.password === password) {
      console.log('Demo authentication successful:', credential.user.full_name);
      return {
        success: true,
        user: credential.user
      };
    }
    
    console.log('Demo authentication failed for:', email);
    return {
      success: false,
      error: 'Invalid email or password'
    };
  }
};

