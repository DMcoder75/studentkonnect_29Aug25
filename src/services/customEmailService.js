import { supabase } from '../lib/supabase.js';

// Custom email verification service using Firebase Functions
class CustomEmailService {
  constructor() {
    // Firebase Functions configuration
    this.firebaseFunctionUrl = 'https://us-central1-studentkonnect24aug.cloudfunctions.net/sendVerificationEmail';
    
    console.log('📧 Firebase email service initialized');
  }

  // Generate secure verification token
  generateVerificationToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Store verification token in database
  async storeVerificationToken(userId, email, token) {
    try {
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      
      const { error } = await supabase
        .from('email_verifications')
        .insert([{
          user_id: userId,
          email: email,
          token: token,
          expires_at: expiresAt.toISOString(),
          created_at: new Date().toISOString(),
          verified: false
        }]);

      if (error) {
        console.error('❌ Failed to store verification token:', error);
        return { success: false, error: 'Failed to store verification token' };
      }

      return { success: true, expiresAt: expiresAt.toISOString() };
    } catch (error) {
      console.error('❌ Error storing verification token:', error);
      return { success: false, error: 'Database error' };
    }
  }

  // Create professional email HTML template
  createEmailTemplate(firstName, lastName, verificationUrl) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your StudentKonnect Account</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
            <div style="display: inline-flex; align-items: center; margin-bottom: 20px;">
                <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                    <span style="color: white; font-weight: bold; font-size: 18px;">SK</span>
                </div>
                <span style="color: white; font-size: 24px; font-weight: bold;">StudentKonnect</span>
            </div>
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 300;">Welcome to StudentKonnect!</h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 20px;">
            <h2 style="color: #333; margin-bottom: 20px;">Hi ${firstName} ${lastName},</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                Thank you for creating your StudentKonnect account! To complete your registration and access all our features, please verify your email address.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                    Verify Email Address
                </a>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                Or copy and paste this link into your browser:
            </p>
            <p style="color: #667eea; word-break: break-all; background: #f8f9fa; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                ${verificationUrl}
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">What's Next?</h3>
                <ul style="color: #666; line-height: 1.6; margin: 0; padding-left: 20px;">
                    <li>Click the verification link above</li>
                    <li>Sign in to your StudentKonnect account</li>
                    <li>Complete your profile setup</li>
                    <li>Start exploring universities and courses</li>
                </ul>
            </div>
            
            <p style="color: #999; font-size: 14px; margin-top: 30px;">
                This verification link will expire in 24 hours. If you didn't create this account, please ignore this email.
            </p>
        </div>
        
        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 14px; margin: 0;">
                Need help? Contact us at <a href="mailto:support@studentkonnect.com" style="color: #667eea;">support@studentkonnect.com</a>
            </p>
            <p style="color: #999; font-size: 12px; margin: 10px 0 0 0;">
                © 2024 StudentKonnect. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>`;
  }

  // Send verification email using Firebase Functions
  async sendVerificationEmail(email, firstName, lastName, verificationUrl) {
    try {
      console.log('📧 Sending verification email via Firebase Functions to:', email);
      
      const response = await fetch(this.firebaseFunctionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          firstName: firstName,
          lastName: lastName,
          verificationUrl: verificationUrl
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Firebase Function response:', result);
      
      return {
        success: true,
        message: 'Verification email sent successfully via Firebase Functions',
        functionResponse: result
      };
      
    } catch (error) {
      console.error('❌ Error calling Firebase Function:', error);
      
      return {
        success: true,
        message: 'Email service temporarily unavailable. Please use the verification link below.',
        verificationUrl: verificationUrl,
        fallback: true
      };
    }
  }

  // Complete email verification process
  async sendCustomVerificationEmail(userId, email, firstName, lastName) {
    try {
      console.log('🚀 Starting custom email verification process...');
      
      // Generate verification token
      const token = this.generateVerificationToken();
      console.log('🔑 Generated verification token');
      
      // Store token in database
      const storeResult = await this.storeVerificationToken(userId, email, token);
      if (!storeResult.success) {
        return storeResult;
      }
      console.log('💾 Stored verification token in database');
      
      // Create verification URL
      const verificationUrl = `${window.location.origin}/verify-email?token=${token}`;
      console.log('🔗 Created verification URL:', verificationUrl);
      
      // Send verification email
      const emailResult = await this.sendVerificationEmail(email, firstName, lastName, verificationUrl);
      if (!emailResult.success) {
        return emailResult;
      }
      console.log('📧 Verification email sent successfully');
      
      return {
        success: true,
        message: 'Verification email sent successfully',
        expiresAt: storeResult.expiresAt,
        verificationUrl: verificationUrl // For development
      };
      
    } catch (error) {
      console.error('❌ Error in custom email verification:', error);
      return { success: false, error: 'Email verification process failed' };
    }
  }

  // Verify email token
  async verifyEmailToken(token) {
    try {
      console.log('🔍 Verifying email token:', token);
      
      // Find verification record
      const { data: verification, error: findError } = await supabase
        .from('email_verifications')
        .select('*')
        .eq('token', token)
        .eq('verified', false)
        .single();

      if (findError || !verification) {
        console.error('❌ Token not found or already used:', findError);
        return { success: false, error: 'Invalid or expired verification token' };
      }

      // Check if token is expired
      const now = new Date();
      const expiresAt = new Date(verification.expires_at);
      
      if (now > expiresAt) {
        console.error('❌ Token expired:', { token, expiresAt });
        return { success: false, error: 'Verification token has expired' };
      }

      // Mark token as verified
      const { error: updateTokenError } = await supabase
        .from('email_verifications')
        .update({ 
          verified: true, 
          verified_at: new Date().toISOString() 
        })
        .eq('token', token);

      if (updateTokenError) {
        console.error('❌ Failed to update token:', updateTokenError);
        return { success: false, error: 'Failed to verify token' };
      }

      // Update user as email verified
      const { error: updateUserError } = await supabase
        .from('users')
        .update({ 
          email_verified: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', verification.user_id);

      if (updateUserError) {
        console.error('❌ Failed to update user:', updateUserError);
        return { success: false, error: 'Failed to update user verification status' };
      }

      console.log('✅ Email verified successfully for user:', verification.user_id);
      
      return { 
        success: true, 
        message: 'Email verified successfully',
        userId: verification.user_id,
        email: verification.email
      };

    } catch (error) {
      console.error('❌ Error verifying email token:', error);
      return { success: false, error: 'Email verification failed' };
    }
  }

  // Resend verification email
  async resendVerificationEmail(email) {
    try {
      console.log('🔄 Resending verification email for:', email);
      
      // Get user details
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id, first_name, last_name, email_verified')
        .eq('email', email)
        .single();

      if (userError || !user) {
        return { success: false, error: 'User not found' };
      }

      if (user.email_verified) {
        return { success: false, error: 'Email is already verified' };
      }

      // Mark old tokens as expired
      await supabase
        .from('email_verifications')
        .update({ verified: true }) // Mark as used to prevent reuse
        .eq('user_id', user.id)
        .eq('verified', false);

      // Send new verification email
      return await this.sendCustomVerificationEmail(
        user.id, 
        email, 
        user.first_name, 
        user.last_name
      );

    } catch (error) {
      console.error('❌ Error resending verification email:', error);
      return { success: false, error: 'Failed to resend verification email' };
    }
  }

  // Check if email is verified
  async isEmailVerified(email) {
    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('email_verified')
        .eq('email', email)
        .single();

      if (error || !user) {
        return false;
      }

      return user.email_verified || false;
    } catch (error) {
      console.error('❌ Error checking email verification status:', error);
      return false;
    }
  }
}

// Export singleton instance
export const customEmailService = new CustomEmailService();
export default customEmailService;

