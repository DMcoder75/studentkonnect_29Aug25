// Script to check actual subjects in the Supabase database
import { dbHelpers } from './src/lib/supabase.js'

async function checkActualSubjects() {
  console.log('Checking actual subjects in Supabase database...')
  
  try {
    const subjects = await dbHelpers.getSubjects()
    
    console.log(`\n✅ Found ${subjects.length} subjects in database:`)
    
    if (subjects.length > 0) {
      console.log('\nActual subjects in database:')
      subjects.forEach((subject, index) => {
        console.log(`${index + 1}. ${subject.name} (ID: ${subject.id}, Code: ${subject.code || 'N/A'})`)
      })
      
      console.log('\nFull structure of first subject:')
      console.log(JSON.stringify(subjects[0], null, 2))
      
      console.log('\nAll subject names for easy copying:')
      const subjectNames = subjects.map(s => s.name)
      console.log(JSON.stringify(subjectNames, null, 2))
      
    } else {
      console.log('❌ No subjects found in database!')
    }
    
  } catch (error) {
    console.error('❌ Error fetching subjects:', error)
  }
}

// Run the check
checkActualSubjects()

