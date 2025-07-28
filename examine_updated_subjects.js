// Script to examine the updated subjects table with jurisdiction support
import { dbHelpers } from './src/lib/supabase.js'

async function examineUpdatedSubjects() {
  console.log('Examining updated subjects table with jurisdiction support...')
  
  try {
    const subjects = await dbHelpers.getSubjects()
    
    console.log(`\n✅ Found ${subjects.length} subjects in database`)
    
    if (subjects.length > 0) {
      // Analyze jurisdictions
      const jurisdictions = [...new Set(subjects.map(s => s.jurisdiction))].sort()
      console.log(`\n📍 Available jurisdictions: ${jurisdictions.join(', ')}`)
      
      // Count subjects per jurisdiction
      jurisdictions.forEach(jurisdiction => {
        const count = subjects.filter(s => s.jurisdiction === jurisdiction).length
        console.log(`   ${jurisdiction}: ${count} subjects`)
      })
      
      console.log('\n📋 Sample subjects by jurisdiction:')
      jurisdictions.forEach(jurisdiction => {
        const jurisdictionSubjects = subjects.filter(s => s.jurisdiction === jurisdiction)
        console.log(`\n${jurisdiction}:`)
        jurisdictionSubjects.slice(0, 5).forEach((subject, index) => {
          console.log(`  ${index + 1}. ${subject.name} (${subject.code})`)
        })
        if (jurisdictionSubjects.length > 5) {
          console.log(`  ... and ${jurisdictionSubjects.length - 5} more`)
        }
      })
      
      console.log('\nFull structure of first subject:')
      console.log(JSON.stringify(subjects[0], null, 2))
      
    } else {
      console.log('❌ No subjects found in database!')
    }
    
  } catch (error) {
    console.error('❌ Error fetching subjects:', error)
  }
}

// Run the examination
examineUpdatedSubjects()

