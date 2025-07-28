// Script to populate the subjects table with current hardcoded subjects
import { supabase } from './src/lib/supabase.js'

// Australian subject list with scaling factors (from ATARCalculatorPage.jsx)
const australianSubjects = [
  { name: 'English (Standard)', scaling: 1.0, is_english: true },
  { name: 'English (Advanced)', scaling: 1.05, is_english: true },
  { name: 'English Extension 1', scaling: 1.1, is_english: true },
  { name: 'English Extension 2', scaling: 1.15, is_english: true },
  { name: 'Mathematics (Standard)', scaling: 1.0, is_english: false },
  { name: 'Mathematics (Advanced)', scaling: 1.05, is_english: false },
  { name: 'Mathematics Extension 1', scaling: 1.1, is_english: false },
  { name: 'Mathematics Extension 2', scaling: 1.15, is_english: false },
  { name: 'Physics', scaling: 1.05, is_english: false },
  { name: 'Chemistry', scaling: 1.05, is_english: false },
  { name: 'Biology', scaling: 1.0, is_english: false },
  { name: 'Economics', scaling: 1.0, is_english: false },
  { name: 'Business Studies', scaling: 0.95, is_english: false },
  { name: 'Legal Studies', scaling: 0.95, is_english: false },
  { name: 'Modern History', scaling: 1.0, is_english: false },
  { name: 'Ancient History', scaling: 1.0, is_english: false },
  { name: 'Geography', scaling: 0.95, is_english: false },
  { name: 'Visual Arts', scaling: 0.9, is_english: false },
  { name: 'Music', scaling: 0.95, is_english: false },
  { name: 'Drama', scaling: 0.9, is_english: false },
  { name: 'Design and Technology', scaling: 0.9, is_english: false },
  { name: 'Information Technology', scaling: 0.95, is_english: false },
  { name: 'Software Design & Development', scaling: 1.0, is_english: false },
  { name: 'Personal Development, Health & PE', scaling: 0.85, is_english: false },
  { name: 'Food Technology', scaling: 0.85, is_english: false },
  { name: 'Textiles and Design', scaling: 0.85, is_english: false }
]

async function populateSubjects() {
  console.log('Populating subjects table...')
  
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
    
    // Insert new subjects
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
      console.log(`${index + 1}. ${subject.name}${subject.scaling ? ` (scaling: ${subject.scaling})` : ''}${subject.is_english ? ' [English]' : ''}`)
    })
    
  } catch (error) {
    console.error('❌ Error in populateSubjects:', error)
  }
}

// Run the population script
populateSubjects()

