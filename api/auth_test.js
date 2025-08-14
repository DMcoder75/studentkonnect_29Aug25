const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  user: 'postgres.xududbaqaaffcaejwuix',
  password: 'D#lveer@123',
  host: 'aws-0-ap-southeast-2.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  ssl: {
    rejectUnauthorized: false
  }
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Auth API is working!' });
});

// Authentication endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email and password are required' 
      });
    }

    // Check in counselors table
    const counselorResult = await pool.query(`
      SELECT *
      FROM counselors 
      WHERE LOWER(email) = LOWER($1)
    `, [email]);

    if (counselorResult.rows.length > 0) {
      const counselor = counselorResult.rows[0];
      console.log('Found counselor:', counselor);
      
      return res.json({
        success: true,
        user: {
          id: counselor.id,
          email: counselor.email,
          full_name: counselor.display_name || `${counselor.first_name} ${counselor.last_name}` || 'Unknown',
          firstName: counselor.first_name || 'Unknown',
          role: 'counselor',
          profile: {
            phone: counselor.phone,
            bio: counselor.bio,
            years_experience: counselor.years_experience,
            counselor_type: counselor.counselor_type,
            specializations: counselor.specializations,
            languages_spoken: counselor.languages_spoken,
            hourly_rate: counselor.hourly_rate,
            currency: counselor.currency,
            total_students_helped: counselor.total_students_helped,
            success_rate: counselor.success_rate,
            average_rating: counselor.average_rating,
            total_reviews: counselor.total_reviews,
            is_available: counselor.is_available
          }
        }
      });
    }

    // If no user found
    console.log('No user found for email:', email);
    return res.status(401).json({
      success: false,
      error: 'Invalid email or password'
    });

  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({
      success: false,
      error: 'Authentication failed: ' + error.message
    });
  }
});

// Debug endpoint to check database
app.get('/api/debug/counselors', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM counselors LIMIT 3');
    res.json({ 
      success: true, 
      counselors: result.rows,
      count: result.rows.length 
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Auth test server running on port ${PORT}`);
});

