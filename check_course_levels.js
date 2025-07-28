import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xududbaqaaffcaejwuix.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1ZHVkYmFxYWFmZmNhZWp3dWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTE4OTQsImV4cCI6MjA2Njg2Nzg5NH0.rMPZCHgDfyho4sUOXNcA1PF4yZ3GFBJxXya_SPcq8fA'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkCourseLevels() {
  try {
    console.log('🔍 Checking course levels in database...')
    
    // Get all courses with their levels
    const { data: courses, error } = await supabase
      .from('courses')
      .select('id, name, level')
      .order('level')
    
    if (error) {
      console.error('❌ Error fetching courses:', error)
      return
    }
    
    console.log(`📊 Found ${courses.length} courses total`)
    
    // Group courses by level
    const levelGroups = {}
    courses.forEach(course => {
      if (!levelGroups[course.level]) {
        levelGroups[course.level] = []
      }
      levelGroups[course.level].push(course)
    })
    
    console.log('\n📈 Course levels breakdown:')
    Object.keys(levelGroups).forEach(level => {
      console.log(`  ${level}: ${levelGroups[level].length} courses`)
    })
    
    console.log('\n🎯 Sample courses by level:')
    Object.keys(levelGroups).forEach(level => {
      console.log(`\n${level}:`)
      levelGroups[level].slice(0, 3).forEach(course => {
        console.log(`  - ${course.name}`)
      })
      if (levelGroups[level].length > 3) {
        console.log(`  ... and ${levelGroups[level].length - 3} more`)
      }
    })
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

checkCourseLevels()

