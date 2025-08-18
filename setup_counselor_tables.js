import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupCounselorTables() {
  try {
    console.log('Setting up counselor tables...')
    
    // Create counselors table
    const counselorTableSQL = `
      CREATE TABLE IF NOT EXISTS counselors (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        counselor_type VARCHAR(100) NOT NULL,
        bio TEXT,
        years_experience INTEGER DEFAULT 0,
        specializations TEXT,
        hourly_rate DECIMAL(10,2),
        currency VARCHAR(10) DEFAULT 'AUD',
        average_rating DECIMAL(3,2) DEFAULT 0.0,
        total_reviews INTEGER DEFAULT 0,
        total_students_helped INTEGER DEFAULT 0,
        success_rate INTEGER DEFAULT 0,
        is_available BOOLEAN DEFAULT true,
        languages TEXT,
        timezone VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `

    // Create counselor_requests table
    const requestsTableSQL = `
      CREATE TABLE IF NOT EXISTS counselor_requests (
        id SERIAL PRIMARY KEY,
        student_id INTEGER NOT NULL,
        counselor_id INTEGER NOT NULL REFERENCES counselors(id),
        status VARCHAR(50) DEFAULT 'pending',
        requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        approved_at TIMESTAMP WITH TIME ZONE,
        rejected_at TIMESTAMP WITH TIME ZONE,
        admin_notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `

    // Execute SQL using RPC (if available) or try direct execution
    console.log('Creating counselors table...')
    const { error: counselorError } = await supabase.rpc('exec_sql', { sql: counselorTableSQL })
    
    if (counselorError) {
      console.log('RPC method failed, trying alternative approach...')
      console.log('Error:', counselorError)
      
      // Alternative: Try to insert a test record to see table structure
      const { data: testData, error: testError } = await supabase
        .from('counselors')
        .select('*')
        .limit(1)
      
      if (testError) {
        console.log('Table might not exist. Error:', testError)
        console.log('Please create the counselors table manually in Supabase dashboard with the following structure:')
        console.log(counselorTableSQL)
        return
      } else {
        console.log('Counselors table already exists!')
        console.log('Current structure sample:', testData)
      }
    } else {
      console.log('Counselors table created successfully!')
    }

    console.log('Creating counselor_requests table...')
    const { error: requestsError } = await supabase.rpc('exec_sql', { sql: requestsTableSQL })
    
    if (requestsError) {
      console.log('RPC method failed for requests table')
      console.log('Error:', requestsError)
      console.log('Please create the counselor_requests table manually:')
      console.log(requestsTableSQL)
    } else {
      console.log('Counselor_requests table created successfully!')
    }

  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

// Run the script
setupCounselorTables()

