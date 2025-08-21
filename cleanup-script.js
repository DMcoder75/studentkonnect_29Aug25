// Direct database cleanup script
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ybgdxqjhqgdqjhqgdqjh.supabase.co';
const supabaseKey = 'your-anon-key-here';
const supabase = createClient(supabaseUrl, supabaseKey);

async function executeCleanup() {
  try {
    console.log('🧹 Starting database cleanup...');

    // 1. Get Priya's user ID
    const { data: priyaUser, error: priyaError } = await supabase
      .from('users')
      .select('user_id')
      .eq('email', 'priya.dubey@email.com')
      .single();

    if (priyaError) {
      console.log('⚠️ Priya not found in database:', priyaError.message);
    } else {
      console.log('👤 Found Priya, user_id:', priyaUser.user_id);

      // 2. Delete all counselor requests for Priya
      const { error: deleteError } = await supabase
        .from('counselor_requests')
        .delete()
        .eq('student_id', priyaUser.user_id);

      if (deleteError) {
        console.log('❌ Error deleting Priya\'s counselor requests:', deleteError.message);
      } else {
        console.log('✅ Deleted all counselor connections for Priya');
      }
    }

    // 3. Create new student: Rahul Sharma
    console.log('👤 Creating new student: Rahul Sharma...');
    
    const { data: newStudent, error: createError } = await supabase
      .from('users')
      .insert([{
        email: 'rahul.sharma@email.com',
        full_name: 'Rahul Sharma',
        role: 'student',
        nationality: 'Indian',
        current_location: 'Delhi, India',
        phone: '+91-9876543211',
        current_institution: 'IIT Delhi',
        current_education_level: "Bachelor's",
        expected_graduation_year: '2024',
        current_gpa: '9.2/10',
        intended_field_of_study: 'Engineering, Computer Science',
        study_level: "Master's Degree",
        career_interests: 'Artificial Intelligence, Machine Learning',
        target_countries: 'Canada, Australia',
        target_universities: 'University of Toronto, University of Melbourne',
        interested_programs: 'Computer Science, AI/ML',
        budget_range: '$40,000 - $60,000 CAD',
        languages: 'English, Hindi, Punjabi',
        communication_style: 'Professional',
        timezone: 'Asia/Kolkata (GMT+5:30)',
        areas_of_support: 'University Selection, Application Process, Visa Guidance',
        urgency_level: 'High Priority',
        extracurricular_activities: 'Coding Club President, Hackathon Winner',
        academic_achievements: 'Dean\'s List, Best Project Award',
        created_at: new Date().toISOString()
      }])
      .select();

    if (createError) {
      console.log('❌ Error creating Rahul:', createError.message);
    } else {
      console.log('✅ Created new student: Rahul Sharma');
    }

    console.log('🏁 Database cleanup completed!');
    console.log('📋 Summary:');
    console.log('   - Priya Dubey: RESET (all counselor connections removed)');
    console.log('   - Rahul Sharma: CREATED (fresh student account)');
    console.log('   - Michael Kumar: UNCHANGED (counselor account)');

  } catch (error) {
    console.error('🚨 Script failed:', error);
  }
}

executeCleanup();

