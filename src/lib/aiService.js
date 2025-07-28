// AI Service for SOP Builder - OpenAI Integration
import OpenAI from 'openai'

class AIService {
  constructor() {
    // Initialize OpenAI client
    this.openai = new OpenAI({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true // Only for development - should use backend in production
    })
  }

  /**
   * Generate SOP content using OpenAI GPT
   * @param {string} sectionName - The SOP section (introduction, motivation, etc.)
   * @param {string} keywords - User-provided keywords
   * @param {Object} context - Additional context (university, course, etc.)
   * @param {string} template - AI prompt template from database
   * @returns {Promise<Object>} Generated content and metadata
   */
  async generateSOPContent(sectionName, keywords, context = {}, template = '') {
    try {
      const prompt = this.buildPrompt(sectionName, keywords, context, template)
      
      const startTime = Date.now()
      
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4", // or "gpt-3.5-turbo" for faster/cheaper option
        messages: [
          {
            role: "system",
            content: "You are an expert academic writing assistant specializing in Statement of Purpose (SOP) documents for university applications. Generate compelling, personalized, and authentic content that helps students showcase their unique strengths and aspirations."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 500, // Adjust based on section requirements
        temperature: 0.7, // Balance between creativity and consistency
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      })

      const generationTime = Date.now() - startTime
      const generatedContent = completion.choices[0].message.content.trim()
      const tokensUsed = completion.usage.total_tokens

      return {
        success: true,
        content: generatedContent,
        metadata: {
          tokensUsed,
          generationTime,
          model: completion.model,
          finishReason: completion.choices[0].finish_reason
        }
      }
    } catch (error) {
      console.error('AI Generation Error:', error)
      return {
        success: false,
        error: error.message,
        content: ''
      }
    }
  }

  /**
   * Build the AI prompt based on section and context
   * @param {string} sectionName - SOP section name
   * @param {string} keywords - User keywords
   * @param {Object} context - Application context
   * @param {string} template - Database template
   * @returns {string} Complete prompt for AI
   */
  buildPrompt(sectionName, keywords, context, template) {
    const basePrompts = {
      introduction: `Write a compelling introduction for a Statement of Purpose that:
- Opens with a strong hook that captures the reader's attention
- Introduces the applicant's passion for the field
- Briefly mentions key qualifications and experiences
- States the specific program and university
- Sets the tone for the entire SOP
- Is approximately 100-150 words`,

      motivation: `Write a motivation and interest section that:
- Explains what sparked the applicant's interest in this field
- Describes specific experiences that deepened their passion
- Shows genuine enthusiasm and curiosity
- Connects personal experiences to academic/career goals
- Demonstrates understanding of the field
- Is approximately 150-200 words`,

      future_goals: `Write a future goals section that:
- Outlines clear short-term and long-term career objectives
- Shows how the program fits into their career plan
- Demonstrates ambition balanced with realism
- Mentions specific roles, industries, or research areas
- Shows potential for making meaningful contributions
- Is approximately 150-200 words`,

      why_university: `Write a "why this university" section that:
- Shows specific knowledge about the university and program
- Mentions particular faculty, research, or facilities
- Explains how the university's strengths align with their goals
- Demonstrates genuine interest (not generic statements)
- Shows they've done their research
- Is approximately 100-150 words`,

      conclusion: `Write a strong conclusion that:
- Summarizes key qualifications and readiness
- Reaffirms commitment to the program
- Ends with confidence and forward-looking statement
- Ties together the main themes of the SOP
- Leaves a lasting positive impression
- Is approximately 75-100 words`
    }

    const sectionPrompt = template || basePrompts[sectionName] || basePrompts.introduction

    return `${sectionPrompt}

Context Information:
- Target University: ${context.targetUniversity || 'Not specified'}
- Target Course: ${context.targetCourse || 'Not specified'}
- Application Purpose: ${context.purpose || 'university_application'}
- Student Background: ${context.studentType || 'Not specified'}

Keywords to incorporate: ${keywords}

Additional Guidelines:
- Write in first person
- Use professional but engaging tone
- Be specific and avoid generic statements
- Show personality while maintaining professionalism
- Ensure content flows naturally
- Make it authentic and personal

Generate the content now:`
  }

  /**
   * Improve existing SOP content
   * @param {string} existingContent - Current content to improve
   * @param {string} improvementType - Type of improvement needed
   * @returns {Promise<Object>} Improved content
   */
  async improveContent(existingContent, improvementType = 'general') {
    try {
      const improvementPrompts = {
        general: "Improve this SOP content by making it more engaging, specific, and compelling while maintaining the original meaning and personal voice.",
        clarity: "Improve the clarity and flow of this SOP content. Make sentences clearer and ensure smooth transitions between ideas.",
        specificity: "Make this SOP content more specific by adding concrete details and examples while removing generic statements.",
        engagement: "Make this SOP content more engaging and memorable while maintaining professionalism and authenticity."
      }

      const prompt = `${improvementPrompts[improvementType]}

Original content:
${existingContent}

Improved version:`

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert editor specializing in academic writing and Statement of Purpose documents. Improve the given content while preserving the author's voice and intent."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 600,
        temperature: 0.5
      })

      return {
        success: true,
        content: completion.choices[0].message.content.trim(),
        metadata: {
          tokensUsed: completion.usage.total_tokens,
          improvementType
        }
      }
    } catch (error) {
      console.error('Content Improvement Error:', error)
      return {
        success: false,
        error: error.message,
        content: existingContent
      }
    }
  }

  /**
   * Get writing suggestions for a specific section
   * @param {string} sectionName - SOP section name
   * @param {Object} context - Application context
   * @returns {Promise<Object>} Writing suggestions
   */
  async getWritingSuggestions(sectionName, context = {}) {
    try {
      const prompt = `Provide 5 specific writing tips and suggestions for the ${sectionName} section of a Statement of Purpose for:
- University: ${context.targetUniversity || 'Any university'}
- Course: ${context.targetCourse || 'Any course'}
- Purpose: ${context.purpose || 'university application'}

Format as a numbered list with actionable advice.`

      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert academic advisor providing specific, actionable writing advice for Statement of Purpose documents."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.6
      })

      return {
        success: true,
        suggestions: completion.choices[0].message.content.trim()
      }
    } catch (error) {
      console.error('Writing Suggestions Error:', error)
      return {
        success: false,
        error: error.message,
        suggestions: ''
      }
    }
  }

  /**
   * Check if AI service is properly configured
   * @returns {boolean} Configuration status
   */
  isConfigured() {
    return !!(process.env.REACT_APP_OPENAI_API_KEY || process.env.OPENAI_API_KEY)
  }

  /**
   * Get configuration status and requirements
   * @returns {Object} Configuration information
   */
  getConfigInfo() {
    return {
      isConfigured: this.isConfigured(),
      requiredEnvVar: 'REACT_APP_OPENAI_API_KEY',
      instructions: 'Add your OpenAI API key to environment variables to enable AI features'
    }
  }
}

export default new AIService()

