import { supabase } from './supabase.js'

// SOP Service for database operations
export class SOPService {
  
  // Get academic background samples by country and education level
  static async getAcademicSamples(country = null, educationLevel = null) {
    try {
      let query = supabase
        .from('academic_background_samples')
        .select('*')
        .eq('is_active', true)
        .order('country', { ascending: true })
        .order('education_level', { ascending: true })

      if (country) {
        query = query.eq('country', country)
      }
      
      if (educationLevel) {
        query = query.eq('education_level', educationLevel)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching academic samples:', error)
        return { success: false, error: error.message, data: [] }
      }

      return { success: true, data: data || [] }
    } catch (error) {
      console.error('Error in getAcademicSamples:', error)
      return { success: false, error: error.message, data: [] }
    }
  }

  // Get SOP templates for AI assistance
  static async getSOPTemplates(sectionName, templateType = 'ai_prompt', purpose = 'university_application') {
    try {
      const { data, error } = await supabase
        .from('sop_templates')
        .select('*')
        .eq('section_name', sectionName)
        .eq('template_type', templateType)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching SOP templates:', error)
        return { success: false, error: error.message, data: [] }
      }

      return { success: true, data: data || [] }
    } catch (error) {
      console.error('Error in getSOPTemplates:', error)
      return { success: false, error: error.message, data: [] }
    }
  }

  // Save or update SOP
  static async saveSOP(sopData, userId) {
    try {
      const sopRecord = {
        user_id: userId,
        title: sopData.title || `SOP for ${sopData.targetCourse} at ${sopData.targetUniversity}`,
        purpose: sopData.purpose || 'university_application',
        target_university: sopData.targetUniversity,
        target_course: sopData.targetCourse,
        introduction: sopData.sections?.introduction || '',
        academic_background: sopData.sections?.academicBackground || '',
        motivation_and_interest: sopData.sections?.motivationAndInterest || '',
        future_goals: sopData.sections?.futureGoals || '',
        why_this_university: sopData.sections?.whyThisUniversity || '',
        conclusion: sopData.sections?.conclusion || '',
        status: sopData.status || 'draft',
        updated_at: new Date().toISOString()
      }

      let result
      if (sopData.id) {
        // Update existing SOP
        result = await supabase
          .from('sops')
          .update(sopRecord)
          .eq('id', sopData.id)
          .eq('user_id', userId)
          .select()
      } else {
        // Create new SOP
        result = await supabase
          .from('sops')
          .insert([sopRecord])
          .select()
      }

      const { data, error } = result

      if (error) {
        console.error('Error saving SOP:', error)
        return { success: false, error: error.message }
      }

      return { success: true, data: data[0] }
    } catch (error) {
      console.error('Error in saveSOP:', error)
      return { success: false, error: error.message }
    }
  }

  // Get user's SOPs
  static async getUserSOPs(userId) {
    try {
      const { data, error } = await supabase
        .from('sops')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })

      if (error) {
        console.error('Error fetching user SOPs:', error)
        return { success: false, error: error.message, data: [] }
      }

      return { success: true, data: data || [] }
    } catch (error) {
      console.error('Error in getUserSOPs:', error)
      return { success: false, error: error.message, data: [] }
    }
  }

  // Delete SOP
  static async deleteSOP(sopId, userId) {
    try {
      const { error } = await supabase
        .from('sops')
        .delete()
        .eq('id', sopId)
        .eq('user_id', userId)

      if (error) {
        console.error('Error deleting SOP:', error)
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      console.error('Error in deleteSOP:', error)
      return { success: false, error: error.message }
    }
  }

  // Log AI generation for analytics
  static async logAIGeneration(userId, sopId, sectionName, keywords, generatedContent, tokensUsed, generationTime) {
    try {
      const logRecord = {
        user_id: userId,
        sop_id: sopId,
        section_name: sectionName,
        keywords_used: keywords,
        generated_content: generatedContent,
        tokens_used: tokensUsed,
        generation_time_ms: generationTime
      }

      const { error } = await supabase
        .from('ai_generation_logs')
        .insert([logRecord])

      if (error) {
        console.error('Error logging AI generation:', error)
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      console.error('Error in logAIGeneration:', error)
      return { success: false, error: error.message }
    }
  }

  // Get or create user profile
  static async getOrCreateUserProfile(authUser) {
    try {
      // First, try to get existing user
      let { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error fetching user:', fetchError)
        return { success: false, error: fetchError.message }
      }

      if (existingUser) {
        return { success: true, data: existingUser }
      }

      // Create new user profile
      const newUser = {
        id: authUser.id,
        email: authUser.email,
        full_name: authUser.user_metadata?.full_name || '',
        created_at: new Date().toISOString()
      }

      const { data: createdUser, error: createError } = await supabase
        .from('users')
        .insert([newUser])
        .select()
        .single()

      if (createError) {
        console.error('Error creating user:', createError)
        return { success: false, error: createError.message }
      }

      return { success: true, data: createdUser }
    } catch (error) {
      console.error('Error in getOrCreateUserProfile:', error)
      return { success: false, error: error.message }
    }
  }

  // Update user profile
  static async updateUserProfile(userId, profileData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          full_name: profileData.fullName,
          phone_number: profileData.phoneNumber,
          nationality: profileData.nationality,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single()

      if (error) {
        console.error('Error updating user profile:', error)
        return { success: false, error: error.message }
      }

      return { success: true, data }
    } catch (error) {
      console.error('Error in updateUserProfile:', error)
      return { success: false, error: error.message }
    }
  }

  // Get user preferences
  static async getUserPreferences(userId) {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user preferences:', error)
        return { success: false, error: error.message }
      }

      // Return default preferences if none exist
      if (!data) {
        return {
          success: true,
          data: {
            ai_assistance_enabled: true,
            auto_save_enabled: true,
            export_format_preference: 'pdf',
            preferred_universities: [],
            preferred_fields: []
          }
        }
      }

      return { success: true, data }
    } catch (error) {
      console.error('Error in getUserPreferences:', error)
      return { success: false, error: error.message }
    }
  }

  // Update user preferences
  static async updateUserPreferences(userId, preferences) {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: userId,
          ...preferences,
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) {
        console.error('Error updating user preferences:', error)
        return { success: false, error: error.message }
      }

      return { success: true, data }
    } catch (error) {
      console.error('Error in updateUserPreferences:', error)
      return { success: false, error: error.message }
    }
  }
}

