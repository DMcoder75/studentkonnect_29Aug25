// Test script to fetch subjects from Supabase database
import { dbHelpers } from './src/lib/supabase.js'

async function testSubjectsFetch() {
  console.log('Testing subjects fetch from Supabase...')
  
  try {
    const subjects = await dbHelpers.getSubjects()
    
    console.log(`\n✅ Successfully fetched ${subjects.length} subjects from database:`)
    
    if (subjects.length > 0) {
      console.log('\nSubjects found:')
      subjects.forEach((subject, index) => {
        console.log(`${index + 1}. ${subject.name}${subject.scaling ? ` (scaling: ${subject.scaling})` : ''}${subject.is_english ? ' [English]' : ''}`)
      })
      
      // Check if subjects have required fields
      const firstSubject = subjects[0]
      console.log('\nFirst subject structure:')
      console.log(JSON.stringify(firstSubject, null, 2))
      
    } else {
      console.log('⚠️  No subjects found in database. The subjects table might be empty.')
    }
    
  } catch (error) {
    console.error('❌ Error fetching subjects:', error)
  }
}

// Run the test
testSubjectsFetch()

