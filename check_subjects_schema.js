// Script to check the subjects table schema
import { supabase } from './src/lib/supabase.js'

async function checkSubjectsSchema() {
  console.log('Checking subjects table schema...')
  
  try {
    // Try to get table info by attempting to select with limit 0
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .limit(1)
    
    if (error) {
      console.error('❌ Error accessing subjects table:', error)
      return
    }
    
    console.log('✅ Successfully accessed subjects table')
    
    if (data && data.length > 0) {
      console.log('Sample record structure:')
      console.log(JSON.stringify(data[0], null, 2))
    } else {
      console.log('Table is empty, but accessible')
    }
    
    // Try inserting a simple test record to see what fields are expected
    console.log('\nTesting simple insert...')
    const testSubject = { name: 'Test Subject' }
    
    const { data: insertData, error: insertError } = await supabase
      .from('subjects')
      .insert([testSubject])
      .select()
    
    if (insertError) {
      console.error('Insert error (this helps us understand the schema):', insertError)
    } else {
      console.log('✅ Test insert successful:', insertData)
      
      // Clean up test record
      if (insertData && insertData.length > 0) {
        await supabase
          .from('subjects')
          .delete()
          .eq('id', insertData[0].id)
        console.log('✅ Cleaned up test record')
      }
    }
    
  } catch (error) {
    console.error('❌ Error in checkSubjectsSchema:', error)
  }
}

// Run the schema check
checkSubjectsSchema()

