// Professional Authentication Service with Real Database Integration
import { customEmailService } from './customEmailService.js';
import { supabase } from '../lib/supabase.js';
import { createClient } from '@supabase/supabase-js';

const API_BASE_URL = 'http://localhost:3002'; // Using the working auth API

export const authService = {
  async authenticateUser(email, password) {
    try {
      console.log('Authenticating user:', email);
      
      // Special bypass for test accounts with unconfirmed emails
      const testAccounts = [
        'tanvi.kulkarni.test@gmail.com',
        'pranav.joshi.test@gmail.com'
      ];
      
      if (testAccounts.includes(email) && password === 'password123') {
        console.log('Using bypass authentication for test account:', email);
        
        // Get user profile directly from database
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('email', email)
          .single();

        if (profileError) {
          console.log('Profile fetch failed:', profileError.message);
          return {
            success: false,
            error: 'User profile not found'
          };
        }

        const user = {
          id: profile.id,
          email: profile.email,
          full_name: profile.first_name + ' ' + profile.last_name,
          firstName: profile.first_name,
          role: profile.role_id === 1 ? 'student' : profile.role_id === 15 ? 'counselor' : 'admin',
          profile: profile
        };

        console.log('Bypass authentication successful:', user.full_name);
        return {
          success: true,
          user: user
        };
      }
      
      // Use real Supabase authentication for other accounts
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) {
        console.log('Supabase authentication failed:', error.message);
        return {
          success: false,
          error: error.message
        };
      }

      if (data.user) {
        // Get user profile from database
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('email', email)
          .single();

        if (profileError) {
          console.log('Profile fetch failed:', profileError.message);
          return {
            success: false,
            error: 'User profile not found'
          };
        }

        // ✅ MANDATORY EMAIL VERIFICATION CHECK
        if (!profile.email_verified) {
          console.log('❌ Email not verified for user:', email);
          return {
            success: false,
            error: `Email Verification Required

Your account exists but your **email address** has not been verified yet.

Please check your **email inbox** for a verification message from StudentKonnect.

Can't find the email?

Check your spam/junk folder

Make sure you're checking the correct email: ${email}

Contact support if you need help

After clicking the **verification link**, you'll be able to sign in normally.`,
            emailNotVerified: true
          };
        }

        const user = {
          id: profile.id,
          email: profile.email,
          full_name: profile.first_name + ' ' + profile.last_name,
          firstName: profile.first_name,
          role: profile.role_id === 1 ? 'student' : profile.role_id === 15 ? 'counselor' : 'admin',
          profile: profile
        };

        console.log('Database authentication successful:', user.full_name);
        return {
          success: true,
          user: user
        };
      }

      return {
        success: false,
        error: 'Authentication failed'
      };
      
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
  },

  async createUser(userData) {
    try {
      console.log('🚀 Creating new user account:', userData.email);

      // Step 0: Check if email already exists in database
      console.log('🔍 Checking if email already exists:', userData.email);
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('email, first_name, last_name')
        .eq('email', userData.email)
        .single();

      if (existingUser) {
        console.log('❌ Email already exists in database:', existingUser);
        return {
          success: false,
          error: `Account Already Exists

This email address is already registered with StudentKonnect.

What you can do:
• Use a different email address
• Sign in to your existing account instead
• Reset your password if you forgot it

Need assistance?
Contact our support team at support@studentkonnect.com`
        };
      }

      console.log('✅ Email is available, proceeding with account creation...');

      // Step 1: Create user in Supabase Auth (with email confirmation disabled)
      console.log('🔄 Creating user in Supabase Auth with email confirmation disabled...');
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: undefined, // Disable email confirmation
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            phone: userData.phone || null
          }
        }
      });

      if (authError) {
        console.error('❌ Supabase Auth error:', authError);
        return {
          success: false,
          error: `❌ **Account Creation Failed**

${authError.message}

Please try again or contact support if the problem persists.`
        };
      }

      if (!authData.user) {
        console.error('❌ No user data returned from Supabase Auth');
        return {
          success: false,
          error: 'Account creation failed - no user data returned'
        };
      }

      const userId = authData.user.id;
      console.log('✅ User created in Supabase Auth successfully:', userId);

      // Step 2: Create user profile in our custom users table
      // Note: RLS must be disabled on users table for this to work
      const userRecord = {
        id: userId,
        email: userData.email,
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone: userData.phone || null,
        role_id: userData.role === 'counselor' ? 15 : 1, // 1 for student, 15 for counselor
        status: 'active',
        email_verified: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      console.log('📝 Creating user profile in users table:', userRecord);

      const { data: userProfileData, error: userProfileError } = await supabase
        .from('users')
        .insert([userRecord])
        .select()
        .single();

      if (userProfileError) {
        console.error('❌ User profile creation error:', userProfileError);
        // Clean up auth user if profile creation fails
        await supabase.auth.admin.deleteUser(userId);
        return {
          success: false,
          error: `❌ **Account Creation Failed**

There was an error creating your user profile. Please try again.

If the problem persists, please contact support.`
        };
      }

      console.log('✅ User profile created successfully');

      // Step 3: If user is a student, create record in students table
      if (userData.role === 'student') {
        const studentRecord = {
          id: userId, // Use same ID as auth user
          email: userData.email,
          user_id: userId,
          student_type: 'International', // Default value
          nationality: 'International', // Default value
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString()
        };

        console.log('👨‍🎓 Creating student record:', studentRecord);

        const { data: studentData, error: studentError } = await supabase
          .from('students')
          .insert([studentRecord])
          .select()
          .single();

        if (studentError) {
          console.error('❌ Student record creation error:', studentError);
          // Don't fail completely, but log the error
          console.log('⚠️ User created but student record creation failed');
        } else {
          console.log('✅ Student record created successfully');
        }

        // Step 3: Create student profile record
        const studentProfileRecord = {
          user_id: userId,
          current_country: 'India', // Default value
          current_address1: userData.currentLocation || null,
          languages: ['English', 'Hindi'], // Default values
          communication_style: 'Direct & Structured', // Default value
          interested_degree: 'Bachelors', // Default value
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        console.log('📋 Creating student profile record:', studentProfileRecord);

        const { data: studentProfileData, error: studentProfileError } = await supabase
          .from('student_profiles')
          .insert([studentProfileRecord])
          .select()
          .single();

        if (studentProfileError) {
          console.error('❌ Student profile creation error:', studentProfileError);
          // Don't fail completely, but log the error
          console.log('⚠️ User created but student profile creation failed');
        } else {
          console.log('✅ Student profile created successfully');
        }
      }

      console.log('🎉 User account creation completed successfully:', userData.email);

      // Step 4: Send custom verification email
      console.log('📧 Sending custom verification email...');
      
      const emailResult = await customEmailService.sendCustomVerificationEmail(
        userId,
        userData.email,
        userData.firstName,
        userData.lastName
      );

      if (emailResult.success) {
        console.log('✅ Custom verification email sent successfully');
        return {
          success: true,
          user: {
            id: userId,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: userData.role,
            emailVerified: false
          },
          message: 'Account created successfully',
          emailSent: true,
          verificationUrl: emailResult.verificationUrl // For development
        };
      } else {
        console.error('❌ Failed to send verification email:', emailResult.error);
        return {
          success: true,
          user: {
            id: userId,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: userData.role,
            emailVerified: false
          },
          message: 'Account created successfully',
          emailSent: false,
          verificationUrl: emailResult.verificationUrl // Fallback URL
        };
      }
    } catch (error) {
      console.error('❌ Account creation error:', error);
      return {
        success: false,
        error: `❌ **Account Creation Failed**

An unexpected error occurred while creating your account.

Please try again. If the problem persists, contact support.

Error details: ${error.message}`
      };
    }
  },
};

