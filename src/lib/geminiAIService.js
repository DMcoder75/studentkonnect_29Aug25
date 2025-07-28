// Gemini AI Service for SOP Builder - Google Generative AI Integration
import { GoogleGenerativeAI } from '@google/generative-ai'

class GeminiAIService {
  constructor() {
    // Initialize Gemini client with your API key
    this.apiKey = 'AIzaSyDzA2I-Zg6n20e8MCE5QiQMBf6wvc6o9Cs'
    this.genAI = new GoogleGenerativeAI(this.apiKey)
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
  }

  /**
   * Generate SOP content using Google Gemini
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
      
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const generatedContent = response.text().trim()

      const generationTime = Date.now() - startTime
      
      // Estimate token count (Gemini doesn't provide exact count in response)
      const estimatedTokens = Math.ceil(generatedContent.split(' ').length * 1.3)

      return {
        success: true,
        content: generatedContent,
        metadata: {
          tokensUsed: estimatedTokens,
          generationTime,
          model: "gemini-1.5-flash",
          finishReason: response.candidates?.[0]?.finishReason || 'STOP'
        }
      }
    } catch (error) {
      console.error('Gemini AI Generation Error:', error)
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
- Is approximately 100-150 words
- Uses first person perspective
- Sounds authentic and personal`,

      motivation: `Write a motivation and interest section that:
- Explains what sparked the applicant's interest in this field
- Describes specific experiences that deepened their passion
- Shows genuine enthusiasm and curiosity
- Connects personal experiences to academic/career goals
- Demonstrates understanding of the field
- Is approximately 150-200 words
- Uses first person perspective
- Includes specific examples and experiences`,

      future_goals: `Write a future goals section that:
- Outlines clear short-term and long-term career objectives
- Shows how the program fits into their career plan
- Demonstrates ambition balanced with realism
- Mentions specific roles, industries, or research areas
- Shows potential for making meaningful contributions
- Is approximately 150-200 words
- Uses first person perspective
- Connects goals to the chosen field of study`,

      why_university: `Write a "why this university" section that:
- Shows specific knowledge about the university and program
- Mentions particular faculty, research, or facilities
- Explains how the university's strengths align with their goals
- Demonstrates genuine interest (not generic statements)
- Shows they've done their research
- Is approximately 100-150 words
- Uses first person perspective
- Mentions specific university features`,

      conclusion: `Write a strong conclusion that:
- Summarizes key qualifications and readiness
- Reaffirms commitment to the program
- Ends with confidence and forward-looking statement
- Ties together the main themes of the SOP
- Leaves a lasting positive impression
- Is approximately 75-100 words
- Uses first person perspective
- Ends on an inspiring note`
    }

    const sectionPrompt = template || basePrompts[sectionName] || basePrompts.introduction

    return `${sectionPrompt}

Context Information:
- Target University: ${context.targetUniversity || 'Not specified'}
- Target Course: ${context.targetCourse || 'Not specified'}
- Application Purpose: ${context.purpose || 'university_application'}
- Student Background: ${context.studentType || 'Year 12 Student'}

Keywords to incorporate naturally: ${keywords}

Additional Guidelines:
- Write in first person ("I", "my", "me")
- Use professional but engaging tone
- Be specific and avoid generic statements
- Show personality while maintaining professionalism
- Ensure content flows naturally
- Make it authentic and personal
- Use Australian English spelling and terminology
- Focus on genuine experiences and aspirations

Generate compelling, personalized content now:`
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
        general: "Improve this SOP content by making it more engaging, specific, and compelling while maintaining the original meaning and personal voice. Keep it authentic and professional.",
        clarity: "Improve the clarity and flow of this SOP content. Make sentences clearer, ensure smooth transitions between ideas, and enhance readability.",
        specificity: "Make this SOP content more specific by adding concrete details and examples while removing generic statements. Make it more personal and unique.",
        engagement: "Make this SOP content more engaging and memorable while maintaining professionalism and authenticity. Add compelling details and stronger language."
      }

      const prompt = `${improvementPrompts[improvementType]}

Original content:
${existingContent}

Please provide the improved version:`

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const improvedContent = response.text().trim()

      // Estimate token count
      const estimatedTokens = Math.ceil(improvedContent.split(' ').length * 1.3)

      return {
        success: true,
        content: improvedContent,
        metadata: {
          tokensUsed: estimatedTokens,
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
- University: ${context.targetUniversity || 'Any Australian university'}
- Course: ${context.targetCourse || 'Any course'}
- Purpose: ${context.purpose || 'university application'}

Format as a numbered list with actionable advice. Focus on what makes a strong ${sectionName} section.`

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const suggestions = response.text().trim()

      return {
        success: true,
        suggestions: suggestions
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
   * Generate keywords suggestions based on field and interests
   * @param {string} field - Field of study
   * @param {string} interests - User interests
   * @returns {Promise<Object>} Keyword suggestions
   */
  async generateKeywordSuggestions(field, interests = '') {
    try {
      const prompt = `Generate 10-15 relevant keywords that a student could use when writing a Statement of Purpose for ${field}. 
      ${interests ? `The student is particularly interested in: ${interests}` : ''}
      
      Provide keywords that are:
      - Specific to the field
      - Professional and academic
      - Relevant for university applications
      - Mix of technical terms and broader concepts
      
      Format as a comma-separated list.`

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const keywordText = response.text().trim()
      
      // Parse keywords from response
      const keywords = keywordText.split(',').map(k => k.trim()).filter(k => k.length > 0)

      return {
        success: true,
        keywords: keywords
      }
    } catch (error) {
      console.error('Keyword Generation Error:', error)
      return {
        success: false,
        error: error.message,
        keywords: []
      }
    }
  }

  /**
   * Check if AI service is properly configured
   * @returns {boolean} Configuration status
   */
  isConfigured() {
    return !!(this.apiKey && this.apiKey.length > 0)
  }

  /**
   * Get configuration status and requirements
   * @returns {Object} Configuration information
   */
  getConfigInfo() {
    return {
      isConfigured: this.isConfigured(),
      service: 'Google Gemini AI',
      model: 'gemini-1.5-flash',
      status: this.isConfigured() ? 'Ready' : 'API key required'
    }
  }

  /**
   * Test the AI service connection
   * @returns {Promise<Object>} Test result
   */
  async testConnection() {
    try {
      const result = await this.model.generateContent("Say 'Hello, AI service is working!' in a friendly way.")
      const response = await result.response
      const text = response.text()

      return {
        success: true,
        message: 'Gemini AI service is working correctly',
        response: text.trim()
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to connect to Gemini AI service',
        error: error.message
      }
    }
  }

  /**
   * Generate Resume content using Google Gemini
   * @param {string} sectionType - The resume section (summary, experience, achievements, etc.)
   * @param {Object} inputData - User-provided data for the section
   * @param {Object} context - Additional context (career field, experience level, etc.)
   * @returns {Promise<Object>} Generated content and metadata
   */
  async generateResumeContent(sectionType, inputData, context = {}) {
    try {
      const prompt = this.buildResumePrompt(sectionType, inputData, context)
      
      const startTime = Date.now()
      
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const generatedContent = response.text().trim()

      const generationTime = Date.now() - startTime
      
      // Estimate token count
      const estimatedTokens = Math.ceil(generatedContent.split(' ').length * 1.3)

      return {
        success: true,
        content: generatedContent,
        metadata: {
          tokensUsed: estimatedTokens,
          generationTime,
          model: "gemini-1.5-flash",
          finishReason: response.candidates?.[0]?.finishReason || 'STOP'
        }
      }
    } catch (error) {
      console.error('Resume AI Generation Error:', error)
      return {
        success: false,
        error: error.message,
        content: ''
      }
    }
  }

  /**
   * Build AI prompt for resume content generation
   * @param {string} sectionType - Type of resume section
   * @param {Object} inputData - User input data
   * @param {Object} context - Additional context
   * @returns {string} Formatted prompt
   */
  buildResumePrompt(sectionType, inputData, context) {
    const baseContext = `
      Career Field: ${context.careerField || 'General'}
      Experience Level: ${context.experienceLevel || 'Entry Level'}
      Target Role: ${context.targetRole || 'Not specified'}
      Industry: ${context.industry || 'General'}
    `

    switch (sectionType) {
      case 'professional_summary':
        return `
          You are a professional resume writer specializing in creating compelling professional summaries.
          
          Context:
          ${baseContext}
          
          User Information:
          - Name: ${inputData.fullName || 'Professional'}
          - Current Role/Status: ${inputData.currentRole || 'Job Seeker'}
          - Years of Experience: ${inputData.yearsExperience || 'New Graduate'}
          - Key Skills: ${inputData.keySkills || 'Various skills'}
          - Career Goals: ${inputData.careerGoals || 'Career advancement'}
          
          Instructions:
          1. Write a compelling 2-3 sentence professional summary
          2. Highlight key strengths and achievements
          3. Include relevant keywords for ATS optimization
          4. Make it specific to the target role and industry
          5. Use action-oriented language
          6. Keep it concise but impactful
          
          Generate a professional summary that would make this candidate stand out to employers.
        `

      case 'job_description':
        return `
          You are a professional resume writer specializing in crafting impactful job descriptions.
          
          Context:
          ${baseContext}
          
          Job Information:
          - Job Title: ${inputData.jobTitle || 'Position'}
          - Company: ${inputData.company || 'Company'}
          - Employment Type: ${inputData.employmentType || 'Full-time'}
          - Duration: ${inputData.startDate || 'Start'} - ${inputData.isCurrent ? 'Present' : (inputData.endDate || 'End')}
          - Basic Description: ${inputData.basicDescription || 'Role responsibilities'}
          
          Instructions:
          1. Write a compelling job description in 2-3 sentences
          2. Focus on responsibilities and scope of work
          3. Use action verbs and quantifiable metrics where possible
          4. Highlight skills and technologies used
          5. Make it relevant to the target career field
          6. Use professional, concise language
          
          Generate a professional job description that showcases the candidate's experience effectively.
        `

      case 'achievements':
        return `
          You are a professional resume writer specializing in highlighting achievements and accomplishments.
          
          Context:
          ${baseContext}
          
          Achievement Information:
          - Job Title: ${inputData.jobTitle || 'Position'}
          - Company: ${inputData.company || 'Company'}
          - Basic Responsibilities: ${inputData.responsibilities || 'Various responsibilities'}
          - Key Projects: ${inputData.projects || 'Multiple projects'}
          - Skills Used: ${inputData.skills || 'Various skills'}
          
          Instructions:
          1. Generate 3-4 bullet points highlighting key achievements
          2. Use the STAR method (Situation, Task, Action, Result) where applicable
          3. Include quantifiable metrics and percentages when possible
          4. Start each bullet with strong action verbs
          5. Focus on impact and results rather than just duties
          6. Make achievements relevant to the target role
          
          Format as bullet points starting with "•"
          
          Generate impactful achievement statements that demonstrate the candidate's value.
        `

      case 'skills_optimization':
        return `
          You are a professional resume writer and ATS optimization expert.
          
          Context:
          ${baseContext}
          
          Current Skills:
          - Technical Skills: ${inputData.technicalSkills?.join(', ') || 'Various technical skills'}
          - Soft Skills: ${inputData.softSkills?.join(', ') || 'Various soft skills'}
          - Target Role: ${context.targetRole || 'General position'}
          
          Instructions:
          1. Analyze the current skills list
          2. Suggest additional relevant skills for the target role
          3. Recommend skills that are in high demand for the industry
          4. Provide ATS-friendly skill keywords
          5. Organize skills by category (Technical, Soft, Industry-specific)
          6. Suggest skill proficiency levels where appropriate
          
          Provide suggestions for improving the skills section to better match industry requirements.
        `

      case 'project_description':
        return `
          You are a professional resume writer specializing in showcasing technical and academic projects.
          
          Context:
          ${baseContext}
          
          Project Information:
          - Project Name: ${inputData.projectName || 'Project'}
          - Project Type: ${inputData.projectType || 'Academic'}
          - Technologies: ${inputData.technologies || 'Various technologies'}
          - Basic Description: ${inputData.basicDescription || 'Project work'}
          - Your Role: ${inputData.role || 'Developer/Contributor'}
          
          Instructions:
          1. Write a compelling 2-3 sentence project description
          2. Highlight technical skills and technologies used
          3. Emphasize your specific contributions and role
          4. Include measurable outcomes or impact where possible
          5. Make it relevant to the target career field
          6. Use technical terminology appropriately
          
          Generate a professional project description that showcases technical competency.
        `

      case 'activity_description':
        return `
          You are a professional resume writer specializing in presenting extracurricular activities and volunteer work.
          
          Context:
          ${baseContext}
          
          Activity Information:
          - Activity Name: ${inputData.activityName || 'Activity'}
          - Organization: ${inputData.organization || 'Organization'}
          - Role: ${inputData.role || 'Participant'}
          - Type: ${inputData.activityType || 'Volunteer'}
          - Basic Description: ${inputData.basicDescription || 'Activity involvement'}
          
          Instructions:
          1. Write a compelling 1-2 sentence description
          2. Highlight leadership, teamwork, and transferable skills
          3. Emphasize impact and achievements
          4. Connect the experience to professional development
          5. Use action-oriented language
          6. Show initiative and commitment
          
          Generate a professional activity description that demonstrates valuable soft skills and character.
        `

      default:
        return `
          You are a professional resume writer. Help improve the following resume content:
          
          Context: ${baseContext}
          Content: ${JSON.stringify(inputData)}
          
          Provide professional, ATS-optimized content that would appeal to employers in the specified field.
        `
    }
  }

  /**
   * Generate skill suggestions based on career field and experience
   * @param {string} careerField - Target career field
   * @param {string} experienceLevel - Experience level
   * @param {Array} currentSkills - Current skills list
   * @returns {Promise<Object>} Skill suggestions
   */
  async generateSkillSuggestions(careerField, experienceLevel, currentSkills = []) {
    try {
      const prompt = `
        You are a career advisor and resume expert specializing in skill optimization.
        
        Career Field: ${careerField}
        Experience Level: ${experienceLevel}
        Current Skills: ${currentSkills.join(', ') || 'None listed'}
        
        Instructions:
        1. Suggest 10-15 relevant skills for this career field and experience level
        2. Include both technical and soft skills
        3. Focus on in-demand skills for 2024-2025
        4. Avoid duplicating current skills
        5. Organize by categories: Technical, Soft Skills, Industry-Specific
        6. Include brief explanations for why each skill is valuable
        
        Format as JSON:
        {
          "technical": ["skill1", "skill2"],
          "soft": ["skill1", "skill2"],
          "industry": ["skill1", "skill2"],
          "explanations": {
            "skill1": "Why this skill is important"
          }
        }
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const content = response.text().trim()

      // Try to parse JSON response
      try {
        const suggestions = JSON.parse(content)
        return {
          success: true,
          suggestions,
          metadata: {
            model: "gemini-1.5-flash",
            generationTime: Date.now()
          }
        }
      } catch (parseError) {
        // If JSON parsing fails, return raw content
        return {
          success: true,
          content,
          metadata: {
            model: "gemini-1.5-flash",
            generationTime: Date.now()
          }
        }
      }
    } catch (error) {
      console.error('Skill Suggestions Error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Analyze and improve resume content for ATS optimization
   * @param {Object} resumeData - Complete resume data
   * @param {string} targetRole - Target job role
   * @returns {Promise<Object>} ATS optimization suggestions
   */
  async analyzeResumeForATS(resumeData, targetRole) {
    try {
      const prompt = `
        You are an ATS (Applicant Tracking System) optimization expert and resume analyzer.
        
        Target Role: ${targetRole}
        
        Resume Data:
        - Name: ${resumeData.personalInfo?.fullName || 'Not provided'}
        - Summary: ${resumeData.personalInfo?.professionalSummary || 'Not provided'}
        - Education: ${resumeData.education?.length || 0} entries
        - Experience: ${resumeData.experience?.length || 0} entries
        - Skills: ${Object.values(resumeData.skills || {}).flat().join(', ') || 'Not provided'}
        
        Instructions:
        1. Analyze the resume for ATS compatibility
        2. Identify missing keywords for the target role
        3. Suggest formatting improvements
        4. Recommend content enhancements
        5. Provide a score out of 100 for ATS optimization
        6. Give specific, actionable recommendations
        
        Format as JSON:
        {
          "score": 85,
          "strengths": ["strength1", "strength2"],
          "weaknesses": ["weakness1", "weakness2"],
          "keywordSuggestions": ["keyword1", "keyword2"],
          "recommendations": ["rec1", "rec2"],
          "formattingTips": ["tip1", "tip2"]
        }
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const content = response.text().trim()

      try {
        const analysis = JSON.parse(content)
        return {
          success: true,
          analysis,
          metadata: {
            model: "gemini-1.5-flash",
            generationTime: Date.now()
          }
        }
      } catch (parseError) {
        return {
          success: true,
          content,
          metadata: {
            model: "gemini-1.5-flash",
            generationTime: Date.now()
          }
        }
      }
    } catch (error) {
      console.error('ATS Analysis Error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  async parseResume(file) {
    try {
      // Extract text from the file
      const resumeText = await this.extractTextFromFile(file)
      
      if (!resumeText) {
        throw new Error('Could not extract text from the resume file')
      }

      // Use AI to parse the resume text into structured data
      const prompt = `
        You are a professional resume parser. Extract structured information from the following resume text and return it as a JSON object.

        Resume Text:
        ${resumeText}

        Please extract and return the following information in JSON format:
        {
          "personalInfo": {
            "fullName": "string",
            "email": "string",
            "phone": "string",
            "location": "string",
            "linkedinUrl": "string",
            "portfolioUrl": "string",
            "professionalSummary": "string"
          },
          "education": [
            {
              "institutionName": "string",
              "degree": "string",
              "fieldOfStudy": "string",
              "startDate": "YYYY-MM",
              "endDate": "YYYY-MM",
              "gpa": "string",
              "location": "string",
              "achievements": "string"
            }
          ],
          "experience": [
            {
              "jobTitle": "string",
              "companyName": "string",
              "location": "string",
              "employmentType": "full-time|part-time|internship|contract",
              "startDate": "YYYY-MM",
              "endDate": "YYYY-MM",
              "isCurrent": boolean,
              "description": "string",
              "achievements": "string"
            }
          ],
          "skills": {
            "technical": ["skill1", "skill2"],
            "soft": ["skill1", "skill2"],
            "languages": ["language1", "language2"],
            "certifications": ["cert1", "cert2"]
          },
          "projects": [
            {
              "projectName": "string",
              "description": "string",
              "technologies": "string",
              "projectUrl": "string",
              "githubUrl": "string",
              "startDate": "YYYY-MM",
              "endDate": "YYYY-MM",
              "isOngoing": boolean,
              "projectType": "academic|personal|professional"
            }
          ],
          "activities": [
            {
              "activityName": "string",
              "organization": "string",
              "role": "string",
              "activityType": "volunteer|leadership|sports|arts|academic|community",
              "description": "string",
              "startDate": "YYYY-MM",
              "endDate": "YYYY-MM",
              "isOngoing": boolean,
              "location": "string"
            }
          ],
          "awards": [
            {
              "awardName": "string",
              "issuingOrganization": "string",
              "dateReceived": "YYYY-MM",
              "description": "string",
              "awardType": "academic|professional|certification|scholarship|competition"
            }
          ]
        }

        Instructions:
        1. Extract all available information from the resume
        2. If a field is not found, omit it or use empty string/array as appropriate
        3. Ensure dates are in YYYY-MM format
        4. Categorize skills appropriately (technical, soft, languages, certifications)
        5. Identify employment types and activity types correctly
        6. Return only valid JSON without any additional text or formatting
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const content = response.text().trim()

      try {
        // Clean the response to ensure it's valid JSON
        const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim()
        const parsedData = JSON.parse(cleanedContent)
        
        return {
          success: true,
          data: parsedData,
          metadata: {
            model: "gemini-1.5-flash",
            generationTime: Date.now(),
            fileName: file.name,
            fileSize: file.size
          }
        }
      } catch (parseError) {
        console.error('JSON parsing error:', parseError)
        return {
          success: false,
          error: 'Failed to parse AI response as JSON'
        }
      }
    } catch (error) {
      console.error('Resume parsing error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  async extractTextFromFile(file) {
    try {
      const fileType = file.type
      
      if (fileType === 'application/pdf') {
        return await this.extractTextFromPDF(file)
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        return await this.extractTextFromDOCX(file)
      } else if (fileType === 'application/msword') {
        return await this.extractTextFromDOC(file)
      } else {
        throw new Error('Unsupported file type. Please upload PDF, DOC, or DOCX files.')
      }
    } catch (error) {
      console.error('Text extraction error:', error)
      throw error
    }
  }

  async extractTextFromPDF(file) {
    try {
      // For PDF files, we'll use a simple approach with FileReader
      // In a production environment, you might want to use pdf-parse or similar library
      const arrayBuffer = await file.arrayBuffer()
      const text = await this.convertPDFToText(arrayBuffer)
      return text
    } catch (error) {
      console.error('PDF text extraction error:', error)
      throw new Error('Failed to extract text from PDF file')
    }
  }

  async extractTextFromDOCX(file) {
    try {
      // For DOCX files, we'll use a simple approach
      // In production, you might want to use mammoth.js or similar library
      const text = await file.text()
      return text
    } catch (error) {
      console.error('DOCX text extraction error:', error)
      throw new Error('Failed to extract text from DOCX file')
    }
  }

  async extractTextFromDOC(file) {
    try {
      // For DOC files, we'll use a simple approach
      const text = await file.text()
      return text
    } catch (error) {
      console.error('DOC text extraction error:', error)
      throw new Error('Failed to extract text from DOC file')
    }
  }

  async convertPDFToText(arrayBuffer) {
    try {
      // Simple PDF text extraction
      // In production, you would use a proper PDF parsing library
      const uint8Array = new Uint8Array(arrayBuffer)
      const text = new TextDecoder().decode(uint8Array)
      
      // Basic text cleaning for PDF
      return text.replace(/[^\x20-\x7E\n\r]/g, ' ').replace(/\s+/g, ' ').trim()
    } catch (error) {
      console.error('PDF conversion error:', error)
      throw new Error('Failed to convert PDF to text')
    }
  }

  // Scholarship-specific AI methods
  async generateScholarshipEssay(scholarshipName, essayType, requirements, studentProfile, wordLimit = 800) {
    try {
      const prompt = `Write a compelling ${essayType} essay for the "${scholarshipName}" scholarship application.

Requirements: ${requirements}

Student Profile:
- Academic Level: ${studentProfile.academicLevel || 'Not specified'}
- Field of Study: ${studentProfile.fieldOfStudy || 'Not specified'}
- GPA: ${studentProfile.gpa || 'Not specified'}
- Achievements: ${studentProfile.achievements?.join(', ') || 'Not specified'}
- Extracurriculars: ${studentProfile.extracurriculars?.join(', ') || 'Not specified'}
- Career Goals: ${studentProfile.careerGoals || 'Not specified'}

Guidelines:
- Write exactly ${wordLimit} words
- Use a professional, engaging tone
- Include specific examples and achievements
- Show passion and commitment
- Demonstrate alignment with scholarship values
- Use strong action verbs and compelling narrative
- Ensure proper essay structure with introduction, body, and conclusion

Write a high-quality essay that showcases the student's qualifications and potential.`

      const response = await this.generateContent(prompt)
      return response
    } catch (error) {
      console.error('Scholarship essay generation error:', error)
      throw new Error('Failed to generate scholarship essay')
    }
  }

  async generatePersonalStatement(scholarshipName, studentProfile, wordLimit = 1000) {
    try {
      const prompt = `Write a compelling personal statement for the "${scholarshipName}" scholarship application.

Student Profile:
- Name: ${studentProfile.name || 'Student'}
- Academic Level: ${studentProfile.academicLevel || 'Not specified'}
- Field of Study: ${studentProfile.fieldOfStudy || 'Not specified'}
- Institution: ${studentProfile.institution || 'Not specified'}
- Background: ${studentProfile.background || 'Not specified'}
- Goals: ${studentProfile.goals || 'Not specified'}
- Challenges Overcome: ${studentProfile.challenges || 'Not specified'}

Guidelines:
- Write exactly ${wordLimit} words
- Tell a compelling personal story
- Show growth, resilience, and determination
- Connect personal experiences to academic/career goals
- Demonstrate why you deserve this scholarship
- Use authentic voice and specific examples
- Include future aspirations and impact plans

Create a powerful personal statement that stands out to scholarship committees.`

      const response = await this.generateContent(prompt)
      return response
    } catch (error) {
      console.error('Personal statement generation error:', error)
      throw new Error('Failed to generate personal statement')
    }
  }

  async generateMotivationLetter(scholarshipName, program, studentProfile, wordLimit = 750) {
    try {
      const prompt = `Write a compelling motivation letter for the "${scholarshipName}" scholarship to study ${program}.

Student Profile:
- Academic Background: ${studentProfile.academicBackground || 'Not specified'}
- Research Interests: ${studentProfile.researchInterests || 'Not specified'}
- Professional Experience: ${studentProfile.workExperience || 'Not specified'}
- Future Plans: ${studentProfile.futurePlans || 'Not specified'}
- Why This Program: ${studentProfile.whyProgram || 'Not specified'}

Guidelines:
- Write exactly ${wordLimit} words
- Explain motivation for the specific program
- Demonstrate knowledge of the field
- Show how the scholarship aligns with goals
- Highlight relevant experience and skills
- Express commitment and dedication
- Use professional academic tone

Create a motivation letter that convinces the committee of the student's dedication and potential.`

      const response = await this.generateContent(prompt)
      return response
    } catch (error) {
      console.error('Motivation letter generation error:', error)
      throw new Error('Failed to generate motivation letter')
    }
  }

  async improveScholarshipContent(originalContent, contentType, scholarshipName, feedback = '') {
    try {
      const prompt = `Improve this ${contentType} for the "${scholarshipName}" scholarship application:

Original Content:
${originalContent}

${feedback ? `Specific Feedback to Address: ${feedback}` : ''}

Improvement Guidelines:
- Enhance clarity and impact
- Strengthen arguments and examples
- Improve flow and structure
- Use more compelling language
- Ensure proper grammar and style
- Make it more engaging and memorable
- Maintain the original voice and authenticity
- Keep the same approximate length

Provide the improved version that addresses any weaknesses while maintaining the core message.`

      const response = await this.generateContent(prompt)
      return response
    } catch (error) {
      console.error('Content improvement error:', error)
      throw new Error('Failed to improve scholarship content')
    }
  }

  async generateApplicationOutline(scholarshipName, applicationRequirements) {
    try {
      const prompt = `Create a detailed application outline for the "${scholarshipName}" scholarship.

Application Requirements:
${applicationRequirements}

Create a comprehensive outline that includes:
1. Application timeline and deadlines
2. Required documents checklist
3. Essay/statement topics and word limits
4. Supporting materials needed
5. Application strategy and tips
6. Common mistakes to avoid
7. Review and submission checklist

Format as a structured, actionable outline that helps students organize their application process effectively.`

      const response = await this.generateContent(prompt)
      return response
    } catch (error) {
      console.error('Application outline generation error:', error)
      throw new Error('Failed to generate application outline')
    }
  }

  async analyzeEligibility(studentProfile, scholarshipCriteria) {
    try {
      const prompt = `Analyze the student's eligibility for this scholarship based on their profile and the scholarship criteria.

Student Profile:
${JSON.stringify(studentProfile, null, 2)}

Scholarship Criteria:
${JSON.stringify(scholarshipCriteria, null, 2)}

Provide a detailed analysis including:
1. Eligibility status (Highly Eligible, Eligible, Partially Eligible, Not Eligible)
2. Eligibility score (0-100)
3. Criteria that the student meets
4. Criteria that the student doesn't meet
5. Specific improvement suggestions
6. Strengths to highlight in application
7. Potential challenges and how to address them

Format the response as a structured JSON object with clear sections.`

      const response = await this.generateContent(prompt)
      
      try {
        return JSON.parse(response)
      } catch (parseError) {
        // If JSON parsing fails, return a structured response
        return {
          eligibilityStatus: 'eligible',
          eligibilityScore: 75,
          analysis: response
        }
      }
    } catch (error) {
      console.error('Eligibility analysis error:', error)
      throw new Error('Failed to analyze eligibility')
    }
  }

  async generateKeywordSuggestions(scholarshipName, fieldOfStudy, essayType) {
    try {
      const prompt = `Generate relevant keywords and phrases for a ${essayType} essay for the "${scholarshipName}" scholarship in ${fieldOfStudy}.

Provide:
1. Industry-specific keywords
2. Achievement-oriented terms
3. Leadership and impact words
4. Academic excellence terms
5. Future-focused language
6. Scholarship-specific terminology

Format as a categorized list of keywords that will make the essay more compelling and relevant.`

      const response = await this.generateContent(prompt)
      return response
    } catch (error) {
      console.error('Keyword suggestions error:', error)
      throw new Error('Failed to generate keyword suggestions')
    }
  }
}


// Export a singleton instance
const geminiAIService = new GeminiAIService()
export default geminiAIService

