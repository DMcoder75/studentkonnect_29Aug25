// Final test script to verify corrected database functions
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xududbaqaaffcaejwuix.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1ZHVkYmFxYWFmZmNhZWp3dWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTE4OTQsImV4cCI6MjA2Njg2Nzg5NH0.rMPZCHgDfyho4sUOXNcA1PF4yZ3GFBJxXya_SPcq8fA'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testCorrectedFunctions() {
  console.log('Testing corrected database functions...')
  
  try {
    // Test the exact query that the app uses for courses
    console.log('\n1. Testing getCourses() function query...')
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select(`
        *,
        universities (
          id,
          name,
          type,
          global_ranking
        )
      `)
      .order('name')
    
    if (coursesError) {
      console.error('❌ Courses query error:', coursesError)
    } else {
      console.log(`✅ Courses query successful! Found ${courses?.length || 0} courses`)
      if (courses && courses.length > 0) {
        console.log('Sample courses:')
        courses.slice(0, 3).forEach((course, index) => {
          console.log(`  ${index + 1}. ${course.name} at ${course.universities?.name || 'Unknown University'}`)
          console.log(`     Level: ${course.level}, Duration: ${course.duration_months} months, ATAR: ${course.atar_cutoff}`)
        })
      }
    }
    
    // Test pathways query
    console.log('\n2. Testing getPathways() function query...')
    const { data: pathways, error: pathwaysError } = await supabase
      .from('pathways')
      .select('*')
      .order('name')
    
    if (pathwaysError) {
      console.error('❌ Pathways query error:', pathwaysError)
    } else {
      console.log(`✅ Pathways query successful! Found ${pathways?.length || 0} pathways`)
      if (pathways && pathways.length > 0) {
        console.log('Sample pathways:')
        pathways.slice(0, 3).forEach((pathway, index) => {
          console.log(`  ${index + 1}. ${pathway.name} - ${pathway.description}`)
        })
      }
    }
    
    // Test universities query
    console.log('\n3. Testing getUniversities() function query...')
    const { data: universities, error: universitiesError } = await supabase
      .from('universities')
      .select('*')
      .order('global_ranking', { ascending: true, nullsLast: true })
    
    if (universitiesError) {
      console.error('❌ Universities query error:', universitiesError)
    } else {
      console.log(`✅ Universities query successful! Found ${universities?.length || 0} universities`)
      if (universities && universities.length > 0) {
        console.log('Top universities by ranking:')
        universities.slice(0, 3).forEach((uni, index) => {
          console.log(`  ${index + 1}. ${uni.name} (Ranking: ${uni.global_ranking || 'N/A'})`)
        })
      }
    }
    
    // Test a complex relationship query
    console.log('\n4. Testing complex relationship query...')
    const { data: courseWithPathways, error: complexError } = await supabase
      .from('course_pathways')
      .select(`
        courses (
          id,
          name,
          universities (
            name
          )
        ),
        pathways (
          id,
          name
        )
      `)
      .limit(3)
    
    if (complexError) {
      console.error('❌ Complex query error:', complexError)
    } else {
      console.log(`✅ Complex relationship query successful! Found ${courseWithPathways?.length || 0} relationships`)
      if (courseWithPathways && courseWithPathways.length > 0) {
        console.log('Sample course-pathway relationships:')
        courseWithPathways.forEach((rel, index) => {
          console.log(`  ${index + 1}. ${rel.courses?.name} (${rel.courses?.universities?.name}) → ${rel.pathways?.name}`)
        })
      }
    }
    
    console.log('\n✅ All database function tests completed!')
    
  } catch (error) {
    console.error('❌ Test failed with error:', error)
  }
}

testCorrectedFunctions()

