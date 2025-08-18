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

const sampleCounselors = [
  {
    full_name: 'Dr. Sarah Chen',
    email: 'sarah.chen@counselor.com',
    counselor_type: 'Academic',
    bio: 'Experienced Computer Science counselor specializing in AI and Software Engineering. Passionate about helping students achieve their academic goals in technology fields.',
    years_experience: 8,
    specializations: 'Computer Science,Engineering,AI,Software Development',
    hourly_rate: 150,
    currency: 'AUD',
    average_rating: 4.9,
    total_reviews: 18,
    total_students_helped: 23,
    success_rate: 95,
    is_available: true,
    languages: 'English,Mandarin',
    timezone: 'Australia/Sydney',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    full_name: 'Dr. Emma Wilson',
    email: 'emma.wilson@counselor.com',
    counselor_type: 'Academic',
    bio: 'Medical education specialist with a decade of experience in health sciences. Dedicated to guiding aspiring healthcare professionals through their academic journey.',
    years_experience: 10,
    specializations: 'Medicine,Health Sciences,Nursing,Pharmacy',
    hourly_rate: 180,
    currency: 'AUD',
    average_rating: 4.8,
    total_reviews: 12,
    total_students_helped: 15,
    success_rate: 93,
    is_available: true,
    languages: 'English',
    timezone: 'Australia/Melbourne',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    full_name: 'Michael Kumar',
    email: 'michael.kumar@counselor.com',
    counselor_type: 'Career',
    bio: 'Business and Finance expert with extensive experience in MBA programs and career guidance. Helping students navigate their path to business success.',
    years_experience: 6,
    specializations: 'Business,Finance,MBA,Economics',
    hourly_rate: 120,
    currency: 'AUD',
    average_rating: 4.7,
    total_reviews: 15,
    total_students_helped: 18,
    success_rate: 89,
    is_available: true,
    languages: 'English,Hindi',
    timezone: 'Australia/Sydney',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    full_name: 'Prof. James Anderson',
    email: 'james.anderson@counselor.com',
    counselor_type: 'Academic',
    bio: 'Engineering professor and counselor with expertise in mechanical and civil engineering. Committed to helping students excel in engineering disciplines.',
    years_experience: 12,
    specializations: 'Engineering,Mechanical Engineering,Civil Engineering,Architecture',
    hourly_rate: 200,
    currency: 'AUD',
    average_rating: 4.9,
    total_reviews: 22,
    total_students_helped: 35,
    success_rate: 97,
    is_available: true,
    languages: 'English',
    timezone: 'Australia/Perth',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    full_name: 'Dr. Lisa Rodriguez',
    email: 'lisa.rodriguez@counselor.com',
    counselor_type: 'Academic',
    bio: 'Law and International Relations specialist helping students navigate legal education pathways. Expert in university admissions and career planning.',
    years_experience: 9,
    specializations: 'Law,International Relations,Political Science,Human Rights',
    hourly_rate: 160,
    currency: 'AUD',
    average_rating: 4.8,
    total_reviews: 20,
    total_students_helped: 28,
    success_rate: 94,
    is_available: true,
    languages: 'English,Spanish',
    timezone: 'Australia/Brisbane',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    full_name: 'David Thompson',
    email: 'david.thompson@counselor.com',
    counselor_type: 'Career',
    bio: 'Creative industries counselor specializing in arts, design, and media studies. Passionate about helping creative students find their path.',
    years_experience: 7,
    specializations: 'Arts,Design,Media Studies,Creative Writing,Film',
    hourly_rate: 140,
    currency: 'AUD',
    average_rating: 4.6,
    total_reviews: 14,
    total_students_helped: 22,
    success_rate: 88,
    is_available: true,
    languages: 'English',
    timezone: 'Australia/Adelaide',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

async function addSampleCounselors() {
  try {
    console.log('Adding sample counselors to database...')
    
    // First, check if counselors table exists and has data
    const { data: existingCounselors, error: fetchError } = await supabase
      .from('counselors')
      .select('id, full_name')
      .limit(1)

    if (fetchError) {
      console.error('Error checking existing counselors:', fetchError)
      console.log('This might mean the counselors table does not exist yet.')
      return
    }

    if (existingCounselors && existingCounselors.length > 0) {
      console.log('Counselors already exist in database. Skipping insertion.')
      console.log('Existing counselors:', existingCounselors.map(c => c.full_name))
      return
    }

    // Insert sample counselors
    const { data, error } = await supabase
      .from('counselors')
      .insert(sampleCounselors)
      .select()

    if (error) {
      console.error('Error inserting counselors:', error)
      return
    }

    console.log(`Successfully added ${data.length} counselors:`)
    data.forEach(counselor => {
      console.log(`- ${counselor.full_name} (${counselor.counselor_type})`)
    })

  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

// Run the script
addSampleCounselors()

