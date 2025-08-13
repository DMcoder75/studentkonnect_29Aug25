import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xududbaqaaffcaejwuix.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1ZHVkYmFxYWFmZmNhZWp3dWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1MjI5NjIsImV4cCI6MjA1MDA5ODk2Mn0.placeholder'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testDatabaseConnection() {
  try {
    console.log('🔍 Testing Supabase connection...')
    
    // Test n_countries table
    console.log('\n📍 Testing n_countries table...')
    const { data: countries, error: countriesError } = await supabase
      .from('n_countries')
      .select('*')
      .limit(10)
    
    if (countriesError) {
      console.error('❌ Error fetching countries:', countriesError)
    } else {
      console.log(`✅ Countries table: ${countries.length} records found`)
      countries.forEach(country => {
        console.log(`   - ${country.country_name} (ID: ${country.country_id})`)
      })
    }
    
    // Test new_universities table
    console.log('\n🏛️ Testing new_universities table...')
    const { data: universities, error: universitiesError } = await supabase
      .from('new_universities')
      .select('*')
      .limit(10)
    
    if (universitiesError) {
      console.error('❌ Error fetching universities:', universitiesError)
    } else {
      console.log(`✅ Universities table: ${universities.length} records found`)
      universities.forEach(uni => {
        console.log(`   - ${uni.university_name} (Country: ${uni.country_id})`)
      })
    }
    
    // Test new_courses table
    console.log('\n📚 Testing new_courses table...')
    const { data: courses, error: coursesError } = await supabase
      .from('new_courses')
      .select('*')
      .limit(10)
    
    if (coursesError) {
      console.error('❌ Error fetching courses:', coursesError)
    } else {
      console.log(`✅ Courses table: ${courses.length} records found`)
      courses.forEach(course => {
        console.log(`   - ${course.course_name} (University: ${course.university_id})`)
      })
    }
    
    // Test pathways table
    console.log('\n🛤️ Testing pathways table...')
    const { data: pathways, error: pathwaysError } = await supabase
      .from('pathways')
      .select('*')
      .limit(10)
    
    if (pathwaysError) {
      console.error('❌ Error fetching pathways:', pathwaysError)
    } else {
      console.log(`✅ Pathways table: ${pathways.length} records found`)
      pathways.forEach(pathway => {
        console.log(`   - ${pathway.pathway_name || pathway.title || 'Unnamed pathway'} (ID: ${pathway.pathway_id || pathway.id})`)
      })
    }
    
    console.log('\n🎉 Database connection test completed!')
    
  } catch (error) {
    console.error('💥 Connection test failed:', error)
  }
}

testDatabaseConnection()

