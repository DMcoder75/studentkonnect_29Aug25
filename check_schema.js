// Script to check the actual schema of tables
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xududbaqaaffcaejwuix.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1ZHVkYmFxYWFmZmNhZWp3dWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTE4OTQsImV4cCI6MjA2Njg2Nzg5NH0.rMPZCHgDfyho4sUOXNcA1PF4yZ3GFBJxXya_SPcq8fA'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkSchema() {
  console.log('Checking actual table schemas...')
  
  try {
    // Check universities table structure
    console.log('\n1. Universities table structure:')
    const { data: universities, error: uniError } = await supabase
      .from('universities')
      .select('*')
      .limit(1)
    
    if (uniError) {
      console.error('Universities error:', uniError)
    } else if (universities && universities.length > 0) {
      console.log('Available columns:', Object.keys(universities[0]))
      console.log('Sample data:', universities[0])
    }
    
    // Check courses table structure
    console.log('\n2. Courses table structure:')
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('*')
      .limit(1)
    
    if (coursesError) {
      console.error('Courses error:', coursesError)
    } else if (courses && courses.length > 0) {
      console.log('Available columns:', Object.keys(courses[0]))
      console.log('Sample data:', courses[0])
    }
    
    // Check pathways table structure
    console.log('\n3. Pathways table structure:')
    const { data: pathways, error: pathwaysError } = await supabase
      .from('pathways')
      .select('*')
      .limit(1)
    
    if (pathwaysError) {
      console.error('Pathways error:', pathwaysError)
    } else if (pathways && pathways.length > 0) {
      console.log('Available columns:', Object.keys(pathways[0]))
      console.log('Sample data:', pathways[0])
    }
    
    // Check professions table structure
    console.log('\n4. Professions table structure:')
    const { data: professions, error: professionsError } = await supabase
      .from('professions')
      .select('*')
      .limit(1)
    
    if (professionsError) {
      console.error('Professions error:', professionsError)
    } else if (professions && professions.length > 0) {
      console.log('Available columns:', Object.keys(professions[0]))
      console.log('Sample data:', professions[0])
    }
    
    // Test a working complex query
    console.log('\n5. Testing working complex query...')
    const { data: workingQuery, error: workingError } = await supabase
      .from('courses')
      .select(`
        *,
        universities (
          id,
          name,
          type
        )
      `)
      .limit(3)
    
    if (workingError) {
      console.error('Working query error:', workingError)
    } else {
      console.log(`✅ Working query successful, found ${workingQuery?.length || 0} courses:`)
      workingQuery?.forEach((course, index) => {
        console.log(`  ${index + 1}. ${course.name} at ${course.universities?.name || 'Unknown University'}`)
      })
    }
    
  } catch (error) {
    console.error('Schema check failed:', error)
  }
}

checkSchema()

