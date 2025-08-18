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

async function createCounselorRequestsTable() {
  try {
    console.log('Creating counselor_requests table...')
    
    // First, let's check if the table exists by trying to query it
    const { data: existingData, error: existingError } = await supabase
      .from('counselor_requests')
      .select('*')
      .limit(1)
    
    if (existingError) {
      console.log('Table does not exist, need to create it manually in Supabase dashboard')
      console.log('Error:', existingError)
      
      console.log('\n=== MANUAL SETUP REQUIRED ===')
      console.log('Please create the counselor_requests table in Supabase dashboard with this SQL:')
      console.log(`
CREATE TABLE counselor_requests (
  id SERIAL PRIMARY KEY,
  student_id TEXT NOT NULL,
  counselor_id INTEGER NOT NULL REFERENCES counselors(id),
  status VARCHAR(50) DEFAULT 'pending',
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_at TIMESTAMP WITH TIME ZONE,
  rejected_at TIMESTAMP WITH TIME ZONE,
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE counselor_requests ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own requests
CREATE POLICY "Users can view own requests" ON counselor_requests
  FOR SELECT USING (true);

-- Allow users to create requests
CREATE POLICY "Users can create requests" ON counselor_requests
  FOR INSERT WITH CHECK (true);

-- Allow admins to update requests
CREATE POLICY "Admins can update requests" ON counselor_requests
  FOR UPDATE USING (true);
      `)
      
    } else {
      console.log('Table already exists!')
      console.log('Sample data:', existingData)
    }

    // Test creating a sample request
    console.log('\nTesting counselor request creation...')
    
    const { data: testRequest, error: testError } = await supabase
      .from('counselor_requests')
      .insert({
        student_id: 'test-student-1',
        counselor_id: 2, // Michael Kumar's ID from the database
        status: 'pending'
      })
      .select()
    
    if (testError) {
      console.log('Error creating test request:', testError)
    } else {
      console.log('Test request created successfully:', testRequest)
    }

  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

// Run the script
createCounselorRequestsTable()

