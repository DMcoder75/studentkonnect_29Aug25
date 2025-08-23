import dotenv from 'dotenv';
dotenv.config();
import { supabase } from './src/lib/supabase.js'
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupDatabase() {
  console.log("Setting up Supabase database...")
  
  try {
    // Read the SQL schema file
    const schemaSQL = fs.readFileSync(
      path.join(__dirname, 'database_setup.sql'),
      'utf8'
    );
    
    // Split the schema into individual statements
    const statements = schemaSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))
    
    console.log(`Executing ${statements.length} SQL statements...`)
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      console.log(`Executing statement ${i + 1}/${statements.length}`)
      
      const { error } = await supabase.rpc('exec_sql', { sql: statement })
      
      if (error) {
        console.error(`Error executing statement ${i + 1}:`, error)
        // Continue with other statements
      } else {
        console.log(`Statement ${i + 1} executed successfully`)
      }
    }
    
    console.log('Database schema setup completed!')
    

    
  } catch (error) {
    console.error('Error setting up database:', error)
  }
}

// Alternative approach using direct table operations
async function setupDatabaseDirect() {
  console.log('Setting up database using direct table operations...')
  
  try {
    // Test connection
    const { data, error } = await supabase.from('universities').select('count', { count: 'exact' })
    
    if (error) {
      console.error('Error connecting to Supabase:', error)
      return
    }
    
    console.log('Connected to Supabase successfully!')
    console.log('Current universities count:', data)
    
    // Insert sample data if tables are empty
    const { data: universities } = await supabase.from('universities').select('id').limit(1)
    
    if (!universities || universities.length === 0) {
      console.log('Inserting sample university data...')
      
      const sampleUniversities = [
        {
          name: 'University of Melbourne',
          type: 'Group of Eight',
          global_ranking: 1,
          website_url: 'https://www.unimelb.edu.au',
          atar_profile_url: 'https://www.unimelb.edu.au/study'
        },
        {
          name: 'University of Sydney',
          type: 'Group of Eight',
          global_ranking: 2,
          website_url: 'https://www.sydney.edu.au',
          atar_profile_url: 'https://www.sydney.edu.au/study'
        },
        {
          name: 'Australian National University',
          type: 'Group of Eight',
          global_ranking: 3,
          website_url: 'https://www.anu.edu.au',
          atar_profile_url: 'https://www.anu.edu.au/study'
        }
      ]
      
      const { error: insertError } = await supabase
        .from('universities')
        .insert(sampleUniversities)
      
      if (insertError) {
        console.error('Error inserting universities:', insertError)
      } else {
        console.log('Sample universities inserted successfully!')
      }
    }
    
  } catch (error) {
    console.error('Error in direct database setup:', error)
  }
}

// Run the setup
if (process.argv[2] === 'direct') {
  setupDatabaseDirect()
} else {
  setupDatabaseDirect()
}


