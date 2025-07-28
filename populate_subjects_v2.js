// Updated script to populate the subjects table with proper schema
import { supabase } from './src/lib/supabase.js'

// Australian subject list with proper codes and scaling factors
const australianSubjects = [
  { code: 'ENG-STD', name: 'English (Standard)', scaling: 1.0 },
  { code: 'ENG-ADV', name: 'English (Advanced)', scaling: 1.05 },
  { code: 'ENG-EXT1', name: 'English Extension 1', scaling: 1.1 },
  { code: 'ENG-EXT2', name: 'English Extension 2', scaling: 1.15 },
  { code: 'MATH-STD', name: 'Mathematics (Standard)', scaling: 1.0 },
  { code: 'MATH-ADV', name: 'Mathematics (Advanced)', scaling: 1.05 },
  { code: 'MATH-EXT1', name: 'Mathematics Extension 1', scaling: 1.1 },
  { code: 'MATH-EXT2', name: 'Mathematics Extension 2', scaling: 1.15 },
  { code: 'PHYS', name: 'Physics', scaling: 1.05 },
  { code: 'CHEM', name: 'Chemistry', scaling: 1.05 },
  { code: 'BIOL', name: 'Biology', scaling: 1.0 },
  { code: 'ECON', name: 'Economics', scaling: 1.0 },
  { code: 'BUS', name: 'Business Studies', scaling: 0.95 },
  { code: 'LEGAL', name: 'Legal Studies', scaling: 0.95 },
  { code: 'HIST-MOD', name: 'Modern History', scaling: 1.0 },
  { code: 'HIST-ANC', name: 'Ancient History', scaling: 1.0 },
  { code: 'GEOG', name: 'Geography', scaling: 0.95 },
  { code: 'ART-VIS', name: 'Visual Arts', scaling: 0.9 },
  { code: 'MUSIC', name: 'Music', scaling: 0.95 },
  { code: 'DRAMA', name: 'Drama', scaling: 0.9 },
  { code: 'DT', name: 'Design and Technology', scaling: 0.9 },
  { code: 'IT', name: 'Information Technology', scaling: 0.95 },
  { code: 'SDD', name: 'Software Design & Development', scaling: 1.0 },
  { code: 'PDHPE', name: 'Personal Development, Health & PE', scaling: 0.85 },
  { code: 'FOOD', name: 'Food Technology', scaling: 0.85 },
  { code: 'TEXTILES', name: 'Textiles and Design', scaling: 0.85 }
]

async function populateSubjects() {
  console.log('Populating subjects table with proper schema...')
  
  try {
    // First, check if subjects already exist
    const { data: existingSubjects, error: checkError } = await supabase
      .from('subjects')
      .select('name')
    
    if (checkError) {
      console.error('Error checking existing subjects:', checkError)
      return
    }
    
    if (existingSubjects && existingSubjects.length > 0) {
      console.log(`Found ${existingSubjects.length} existing subjects. Clearing table first...`)
      
      // Clear existing subjects
      const { error: deleteError } = await supabase
        .from('subjects')
        .delete()
        .neq('id', 0) // Delete all records
      
      if (deleteError) {
        console.error('Error clearing subjects table:', deleteError)
        return
      }
      
      console.log('✅ Cleared existing subjects')
    }
    
    // Insert subjects one by one to handle any errors gracefully
    console.log('Inserting subjects...')
    let successCount = 0
    
    for (const subject of australianSubjects) {
      try {
        const { data, error } = await supabase
          .from('subjects')
          .insert([subject])
          .select()
        
        if (error) {
          console.error(`❌ Error inserting ${subject.name}:`, error)
        } else {
          console.log(`✅ Inserted: ${subject.name}`)
          successCount++
        }
      } catch (err) {
        console.error(`❌ Exception inserting ${subject.name}:`, err)
      }
    }
    
    console.log(`\n✅ Successfully inserted ${successCount} out of ${australianSubjects.length} subjects`)
    
    // Verify the insertion
    const { data: allSubjects, error: verifyError } = await supabase
      .from('subjects')
      .select('*')
      .order('name')
    
    if (verifyError) {
      console.error('Error verifying subjects:', verifyError)
    } else {
      console.log(`\n📊 Total subjects in database: ${allSubjects.length}`)
      console.log('\nFirst 5 subjects:')
      allSubjects.slice(0, 5).forEach((subject, index) => {
        console.log(`${index + 1}. ${subject.name} (${subject.code})${subject.scaling ? ` - scaling: ${subject.scaling}` : ''}`)
      })
    }
    
  } catch (error) {
    console.error('❌ Error in populateSubjects:', error)
  }
}

// Run the population script
populateSubjects()

