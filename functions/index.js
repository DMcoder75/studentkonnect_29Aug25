const { onRequest } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions");
const nodemailer = require("nodemailer");

// Email transporter configuration
const createEmailTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'studentkonnectnoreply@gmail.com', // Real Gmail account
      pass: 'chgm ahcy cult mepj' // Gmail app password
    }
  });
};

// Send verification email function
exports.sendVerificationEmail = onRequest(
  { cors: true },
  async (req, res) => {
    try {
      logger.info("📧 Sending verification email...", { structuredData: true });
      
      const { email, firstName, lastName, verificationUrl } = req.body;
      
      if (!email || !firstName || !verificationUrl) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields: email, firstName, verificationUrl"
        });
      }

      // Email content
      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Verify Your StudentKonnect Account</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to StudentKonnect!</h1>
              <p>Verify your email to get started</p>
            </div>
            <div class="content">
              <h2>Hi ${firstName} ${lastName || ''},</h2>
              <p>Thank you for creating your StudentKonnect account! To complete your registration and access all features, please verify your email address.</p>
              
              <p><strong>Click the button below to verify your email:</strong></p>
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
              
              <p>Or copy and paste this link in your browser:</p>
              <p style="word-break: break-all; background: #eee; padding: 10px; border-radius: 5px;">${verificationUrl}</p>
              
              <p><strong>This verification link will expire in 24 hours.</strong></p>
              
              <p>Once verified, you'll have access to:</p>
              <ul>
                <li>Connect with expert counselors</li>
                <li>Explore 850+ universities worldwide</li>
                <li>Apply for scholarships</li>
                <li>Join student forums and sessions</li>
              </ul>
              
              <p>If you didn't create this account, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>© 2025 StudentKonnect. All rights reserved.</p>
              <p>Need help? Contact us at support@studentkonnect.com</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // Send email
      const transporter = createEmailTransporter();
      const mailOptions = {
        from: '"StudentKonnect" <studentkonnectnoreply@gmail.com>',
        to: email,
        subject: 'Verify Your StudentKonnect Account - Action Required',
        html: emailHtml
      };

      await transporter.sendMail(mailOptions);

      logger.info("✅ Verification email sent successfully", { email });
      
      res.json({
        success: true,
        message: "Verification email sent successfully"
      });

    } catch (error) {
      logger.error("❌ Error sending verification email:", error);
      res.status(500).json({
        success: false,
        error: "Failed to send verification email: " + error.message
      });
    }
  }
);

// Verify email token function
exports.verifyEmailToken = onRequest(
  { cors: true },
  async (req, res) => {
    try {
      logger.info("🔍 Verifying email token...", { structuredData: true });
      
      const { token } = req.query;
      
      if (!token) {
        return res.status(400).json({
          success: false,
          error: "Verification token is required"
        });
      }

      // Find verification record
      const { data: verification, error: findError } = await supabase
        .from('email_verifications')
        .select('*')
        .eq('token', token)
        .eq('verified', false)
        .single();

      if (findError || !verification) {
        logger.error("Token not found or already used:", findError);
        return res.status(400).json({
          success: false,
          error: "Invalid or expired verification token"
        });
      }

      // Check if token is expired
      const now = new Date();
      const expiresAt = new Date(verification.expires_at);
      
      if (now > expiresAt) {
        logger.error("Token expired:", { token, expiresAt });
        return res.status(400).json({
          success: false,
          error: "Verification token has expired"
        });
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
        logger.error("Failed to update token:", updateTokenError);
        return res.status(500).json({
          success: false,
          error: "Failed to verify token"
        });
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
        logger.error("Failed to update user:", updateUserError);
        return res.status(500).json({
          success: false,
          error: "Failed to update user verification status"
        });
      }

      logger.info("✅ Email verified successfully", { userId: verification.user_id });
      
      // Redirect to success page
      res.redirect('https://studentkonnect24aug.web.app/email-verified?success=true');

    } catch (error) {
      logger.error("❌ Error verifying email:", error);
      res.redirect('https://studentkonnect24aug.web.app/email-verified?success=false');
    }
  }
);