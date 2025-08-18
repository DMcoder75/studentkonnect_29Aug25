import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://xududbaqaaffcaejwuix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1ZHVkYmFxYWFmZmNhZWp3dWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTE4OTQsImV4cCI6MjA2Njg2Nzg5NH0.rMPZCHgDfyho4sUOXNcA1PF4yZ3GFBJxXya_SPcq8fA'
);

async function getCounts() {
  try {
    const [countries, universities, courses, counselors] = await Promise.all([
      supabase.from('n_countries').select('*', { count: 'exact', head: true }),
      supabase.from('new_universities').select('*', { count: 'exact', head: true }),
      supabase.from('new_courses').select('*', { count: 'exact', head: true }),
      supabase.from('counselors').select('*', { count: 'exact', head: true })
    ]);
    
    console.log('📊 Real Database Counts:');
    console.log('Countries:', countries.count);
    console.log('Universities:', universities.count);
    console.log('Courses:', courses.count);
    console.log('Counselors:', counselors.count);
    
    // Format for display
    console.log('\n🎯 Formatted for Homepage:');
    console.log('Countries:', countries.count + '+');
    console.log('Universities:', universities.count + '+');
    console.log('Courses:', courses.count + '+');
    console.log('Pathways: 5+ (estimated)');
    console.log('Career Paths:', (countries.count * 3) + '+ (estimated)');
  } catch (error) {
    console.error('Error:', error);
  }
}

getCounts();
