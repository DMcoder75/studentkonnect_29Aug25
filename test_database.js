// Test script to check database connection and data
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xududbaqaaffcaejwuix.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1ZHVkYmFxYWFmZmNhZWp3dWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTE4OTQsImV4cCI6MjA2Njg2Nzg5NH0.rMPZCHgDfyho4sUOXNcA1PF4yZ3GFBJxXya_SPcq8fA'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testDatabase() {
  console.log('Testing database connection...')
  
  try {
    // Test 1: Check if we can connect to the database
    console.log('\n1. Testing basic connection...')
    const { data: connectionTest, error: connectionError } = await supabase
      .from('courses')
      .select('count')
      .limit(1)
    
    if (connectionError) {
      console.error('Connection error:', connectionError)
      return
    }
    
    console.log('✅ Database connection successful')
    
    // Test 2: Check if courses table exists and has data
    console.log('\n2. Checking courses table...')
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('*')
      .limit(5)
    
    if (coursesError) {
      console.error('Courses query error:', coursesError)
    } else {
      console.log(`✅ Found ${courses?.length || 0} courses (showing first 5):`)
      courses?.forEach((course, index) => {
        console.log(`  ${index + 1}. ${course.name} (ID: ${course.id})`)
      })
    }
    
    // Test 3: Check if universities table exists
    console.log('\n3. Checking universities table...')
    const { data: universities, error: uniError } = await supabase
      .from('universities')
      .select('*')
      .limit(5)
    
    if (uniError) {
      console.error('Universities query error:', uniError)
    } else {
      console.log(`✅ Found ${universities?.length || 0} universities (showing first 5):`)
      universities?.forEach((uni, index) => {
        console.log(`  ${index + 1}. ${uni.name} (ID: ${uni.id})`)
      })
    }
    
    // Test 4: Check if pathways table exists
    console.log('\n4. Checking pathways table...')
    const { data: pathways, error: pathwaysError } = await supabase
      .from('pathways')
      .select('*')
      .limit(5)
    
    if (pathwaysError) {
      console.error('Pathways query error:', pathwaysError)
    } else {
      console.log(`✅ Found ${pathways?.length || 0} pathways (showing first 5):`)
      pathways?.forEach((pathway, index) => {
        console.log(`  ${index + 1}. ${pathway.name} (ID: ${pathway.id})`)
      })
    }
    
    // Test 5: Check if professions table exists
    console.log('\n5. Checking professions table...')
    const { data: professions, error: professionsError } = await supabase
      .from('professions')
      .select('*')
      .limit(5)
    
    if (professionsError) {
      console.error('Professions query error:', professionsError)
    } else {
      console.log(`✅ Found ${professions?.length || 0} professions (showing first 5):`)
      professions?.forEach((profession, index) => {
        console.log(`  ${index + 1}. ${profession.title} (ID: ${profession.id})`)
      })
    }
    
    // Test 6: Check relationship tables
    console.log('\n6. Checking relationship tables...')
    const { data: coursePathways, error: cpError } = await supabase
      .from('course_pathways')
      .select('*')
      .limit(5)
    
    if (cpError) {
      console.error('Course-pathways query error:', cpError)
    } else {
      console.log(`✅ Found ${coursePathways?.length || 0} course-pathway relationships`)
    }
    
    const { data: courseProfessions, error: cprError } = await supabase
      .from('course_professions')
      .select('*')
      .limit(5)
    
    if (cprError) {
      console.error('Course-professions query error:', cprError)
    } else {
      console.log(`✅ Found ${courseProfessions?.length || 0} course-profession relationships`)
    }
    
    // Test 7: Test a complex query like the app would use
    console.log('\n7. Testing complex query (courses with universities)...')
    const { data: coursesWithUni, error: complexError } = await supabase
      .from('courses')
      .select(`
        *,
        universities (
          id,
          name,
          type,
          state
        )
      `)
      .limit(3)
    
    if (complexError) {
      console.error('Complex query error:', complexError)
    } else {
      console.log(`✅ Complex query successful, found ${coursesWithUni?.length || 0} courses with university data:`)
      coursesWithUni?.forEach((course, index) => {
        console.log(`  ${index + 1}. ${course.name} at ${course.universities?.name || 'Unknown University'}`)
      })
    }
    
  } catch (error) {
    console.error('Test failed with error:', error)
  }
}

testDatabase()

