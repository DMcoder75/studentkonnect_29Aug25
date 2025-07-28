// Simple script to populate the subjects table with only basic fields
import { supabase } from './src/lib/supabase.js'

// Australian subject list with only code and name
const australianSubjects = [
  { code: 'ENG-STD', name: 'English (Standard)' },
  { code: 'ENG-ADV', name: 'English (Advanced)' },
  { code: 'ENG-EXT1', name: 'English Extension 1' },
  { code: 'ENG-EXT2', name: 'English Extension 2' },
  { code: 'MATH-STD', name: 'Mathematics (Standard)' },
  { code: 'MATH-ADV', name: 'Mathematics (Advanced)' },
  { code: 'MATH-EXT1', name: 'Mathematics Extension 1' },
  { code: 'MATH-EXT2', name: 'Mathematics Extension 2' },
  { code: 'PHYS', name: 'Physics' },
  { code: 'CHEM', name: 'Chemistry' },
  { code: 'BIOL', name: 'Biology' },
  { code: 'ECON', name: 'Economics' },
  { code: 'BUS', name: 'Business Studies' },
  { code: 'LEGAL', name: 'Legal Studies' },
  { code: 'HIST-MOD', name: 'Modern History' },
  { code: 'HIST-ANC', name: 'Ancient History' },
  { code: 'GEOG', name: 'Geography' },
  { code: 'ART-VIS', name: 'Visual Arts' },
  { code: 'MUSIC', name: 'Music' },
  { code: 'DRAMA', name: 'Drama' },
  { code: 'DT', name: 'Design and Technology' },
  { code: 'IT', name: 'Information Technology' },
  { code: 'SDD', name: 'Software Design & Development' },
  { code: 'PDHPE', name: 'Personal Development, Health & PE' },
  { code: 'FOOD', name: 'Food Technology' },
  { code: 'TEXTILES', name: 'Textiles and Design' }
]

async function populateSubjects() {
  console.log('Populating subjects table with basic fields only...')
  
  try {
    // Insert all subjects at once
    const { data, error } = await supabase
      .from('subjects')
      .insert(australianSubjects)
      .select()
    
    if (error) {
      console.error('❌ Error inserting subjects:', error)
      return
    }
    
    console.log(`✅ Successfully inserted ${data.length} subjects into database:`)
    
    data.forEach((subject, index) => {
      console.log(`${index + 1}. ${subject.name} (${subject.code})`)
    })
    
  } catch (error) {
    console.error('❌ Error in populateSubjects:', error)
  }
}

// Run the population script
populateSubjects()

