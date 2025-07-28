import React from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Plus, Trash2, Edit, Calendar, MapPin, Building, Award, Users, Download, Eye, FileText, Wand2, Sparkles } from 'lucide-react'

// Education Step Component
export const renderEducationStep = (formData, updateFormData, addArrayItem, removeArrayItem, updateArrayData, aiHelpers = {}) => {
  const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      institutionName: '',
      degreeType: '',
      fieldOfStudy: '',
      gpa: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      location: '',
      achievements: '',
      description: ''
    }
    addArrayItem('education', newEducation)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Education</h2>
          <p className="text-gray-600">Add your educational background and qualifications</p>
        </div>
        <Button onClick={addEducation}>
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>

      {formData.education.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <Building className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">No education entries yet</p>
          <Button onClick={addEducation} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Education Entry
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {formData.education.map((edu, index) => (
            <div key={edu.id} className="border rounded-lg p-6 bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-900">Education Entry {index + 1}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeArrayItem('education', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Institution Name *</label>
                  <Input
                    placeholder="University of Sydney"
                    value={edu.institutionName}
                    onChange={(e) => updateArrayData('education', index, 'institutionName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Degree Type *</label>
                  <Select
                    value={edu.degreeType}
                    onValueChange={(value) => updateArrayData('education', index, 'degreeType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select degree type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School Diploma</SelectItem>
                      <SelectItem value="certificate">Certificate</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="associate">Associate Degree</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
                  <Input
                    placeholder="Computer Science"
                    value={edu.fieldOfStudy}
                    onChange={(e) => updateArrayData('education', index, 'fieldOfStudy', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GPA (Optional)</label>
                  <Input
                    placeholder="3.8"
                    value={edu.gpa}
                    onChange={(e) => updateArrayData('education', index, 'gpa', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <Input
                    type="date"
                    value={edu.startDate}
                    onChange={(e) => updateArrayData('education', index, 'startDate', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <Input
                    type="date"
                    value={edu.endDate}
                    onChange={(e) => updateArrayData('education', index, 'endDate', e.target.value)}
                    disabled={edu.isCurrent}
                  />
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      id={`current-${index}`}
                      checked={edu.isCurrent}
                      onChange={(e) => updateArrayData('education', index, 'isCurrent', e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={`current-${index}`} className="text-sm text-gray-600">
                      Currently studying here
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <Input
                    placeholder="Sydney, NSW, Australia"
                    value={edu.location}
                    onChange={(e) => updateArrayData('education', index, 'location', e.target.value)}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Achievements & Honors</label>
                  <Textarea
                    placeholder="Dean's List, Magna Cum Laude, Relevant coursework..."
                    rows={2}
                    value={edu.achievements}
                    onChange={(e) => updateArrayData('education', index, 'achievements', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Work Experience Step Component
export const renderExperienceStep = (formData, updateFormData, addArrayItem, removeArrayItem, updateArrayData, aiHelpers = {}) => {
  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      jobTitle: '',
      companyName: '',
      employmentType: 'full-time',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
      achievements: ''
    }
    addArrayItem('experience', newExperience)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Work Experience</h2>
          <p className="text-gray-600">Add your work experience, internships, and volunteer work</p>
        </div>
        <Button onClick={addExperience}>
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {formData.experience.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <Building className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">No work experience entries yet</p>
          <Button onClick={addExperience} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Experience
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {formData.experience.map((exp, index) => (
            <div key={exp.id} className="border rounded-lg p-6 bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-900">Experience {index + 1}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeArrayItem('experience', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                  <Input
                    placeholder="Software Engineer"
                    value={exp.jobTitle}
                    onChange={(e) => updateArrayData('experience', index, 'jobTitle', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                  <Input
                    placeholder="Google"
                    value={exp.companyName}
                    onChange={(e) => updateArrayData('experience', index, 'companyName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
                  <Select
                    value={exp.employmentType}
                    onValueChange={(value) => updateArrayData('experience', index, 'employmentType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="volunteer">Volunteer</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <Input
                    placeholder="Sydney, NSW, Australia"
                    value={exp.location}
                    onChange={(e) => updateArrayData('experience', index, 'location', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <Input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => updateArrayData('experience', index, 'startDate', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <Input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) => updateArrayData('experience', index, 'endDate', e.target.value)}
                    disabled={exp.isCurrent}
                  />
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      id={`current-exp-${index}`}
                      checked={exp.isCurrent}
                      onChange={(e) => updateArrayData('experience', index, 'isCurrent', e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={`current-exp-${index}`} className="text-sm text-gray-600">
                      Currently working here
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Job Description</label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => aiHelpers.generateJobDescription && aiHelpers.generateJobDescription(index)}
                      disabled={aiHelpers.isLoading}
                      className="flex items-center"
                    >
                      <Wand2 className="h-4 w-4 mr-2" />
                      {aiHelpers.isLoading ? 'Generating...' : 'Generate with AI'}
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Describe your role and responsibilities..."
                    rows={3}
                    value={exp.description}
                    onChange={(e) => updateArrayData('experience', index, 'description', e.target.value)}
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Key Achievements</label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => aiHelpers.generateAchievements && aiHelpers.generateAchievements(index)}
                      disabled={aiHelpers.isLoading}
                      className="flex items-center"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      {aiHelpers.isLoading ? 'Generating...' : 'Generate with AI'}
                    </Button>
                  </div>
                  <Textarea
                    placeholder="• Increased team productivity by 25%&#10;• Led a team of 5 developers&#10;• Implemented new features that improved user engagement"
                    rows={3}
                    value={exp.achievements}
                    onChange={(e) => updateArrayData('experience', index, 'achievements', e.target.value)}
                  />
                  <p className="text-sm text-gray-500 mt-1">Use bullet points to highlight your key accomplishments</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Skills Step Component
export const renderSkillsStep = (formData, updateFormData, addSkill, removeSkill, aiHelpers = {}) => {
  const skillCategories = [
    { id: 'technical', name: 'Technical Skills', placeholder: 'e.g., Python, JavaScript, React' },
    { id: 'soft', name: 'Soft Skills', placeholder: 'e.g., Leadership, Communication, Problem Solving' },
    { id: 'languages', name: 'Languages', placeholder: 'e.g., English (Native), Spanish (Intermediate)' },
    { id: 'certifications', name: 'Certifications', placeholder: 'e.g., AWS Certified, Google Analytics' }
  ]

  const handleAddSkill = (category, inputElement) => {
    const skill = inputElement.value.trim()
    if (skill) {
      addSkill(category, skill)
      inputElement.value = ''
    }
  }

  const handleKeyPress = (e, category) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill(category, e.target)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills</h2>
          <p className="text-gray-600">Add your technical skills, soft skills, languages, and certifications</p>
        </div>
        <Button
          variant="outline"
          onClick={() => aiHelpers.generateSkillSuggestions && aiHelpers.generateSkillSuggestions()}
          disabled={aiHelpers.isLoading}
          className="flex items-center"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {aiHelpers.isLoading ? 'Analyzing...' : 'Get AI Suggestions'}
        </Button>
      </div>

      {skillCategories.map((category) => (
        <div key={category.id} className="border rounded-lg p-6 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{category.name}</h3>
          
          <div className="flex gap-2 mb-4">
            <Input
              placeholder={category.placeholder}
              onKeyPress={(e) => handleKeyPress(e, category.id)}
              id={`skill-input-${category.id}`}
            />
            <Button onClick={() => {
              const inputElement = document.getElementById(`skill-input-${category.id}`)
              handleAddSkill(category.id, inputElement)
            }}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.skills[category.id].map((skill, index) => (
              <div
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {skill}
                <button
                  onClick={() => removeSkill(category.id, index)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

          {formData.skills[category.id].length === 0 && (
            <p className="text-gray-500 text-sm">No {category.name.toLowerCase()} added yet</p>
          )}
        </div>
      ))}
    </div>
  )
}

// Projects Step Component
export const renderProjectsStep = (formData, updateFormData, addArrayItem, removeArrayItem, updateArrayData, aiHelpers = {}) => {
  const addProject = () => {
    const newProject = {
      id: Date.now(),
      projectName: '',
      projectType: 'academic',
      description: '',
      technologiesUsed: '',
      projectUrl: '',
      githubUrl: '',
      startDate: '',
      endDate: '',
      isOngoing: false
    }
    addArrayItem('projects', newProject)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Projects</h2>
          <p className="text-gray-600">Showcase your academic, personal, and professional projects</p>
        </div>
        <Button onClick={addProject}>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {formData.projects.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">No projects added yet</p>
          <Button onClick={addProject} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Project
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {formData.projects.map((project, index) => (
            <div key={project.id} className="border rounded-lg p-6 bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-900">Project {index + 1}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeArrayItem('projects', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Name *</label>
                  <Input
                    placeholder="E-commerce Website"
                    value={project.projectName}
                    onChange={(e) => updateArrayData('projects', index, 'projectName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                  <Select
                    value={project.projectType}
                    onValueChange={(value) => updateArrayData('projects', index, 'projectType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="open-source">Open Source</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => aiHelpers.generateProjectDescription && aiHelpers.generateProjectDescription(index)}
                      disabled={aiHelpers.isLoading}
                      className="flex items-center"
                    >
                      <Wand2 className="h-4 w-4 mr-2" />
                      {aiHelpers.isLoading ? 'Generating...' : 'Generate with AI'}
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Describe your project, its purpose, and your role..."
                    rows={3}
                    value={project.description}
                    onChange={(e) => updateArrayData('projects', index, 'description', e.target.value)}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Technologies Used</label>
                  <Input
                    placeholder="React, Node.js, MongoDB, AWS"
                    value={project.technologiesUsed}
                    onChange={(e) => updateArrayData('projects', index, 'technologiesUsed', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project URL</label>
                  <Input
                    placeholder="https://myproject.com"
                    value={project.projectUrl}
                    onChange={(e) => updateArrayData('projects', index, 'projectUrl', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
                  <Input
                    placeholder="https://github.com/username/project"
                    value={project.githubUrl}
                    onChange={(e) => updateArrayData('projects', index, 'githubUrl', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <Input
                    type="date"
                    value={project.startDate}
                    onChange={(e) => updateArrayData('projects', index, 'startDate', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <Input
                    type="date"
                    value={project.endDate}
                    onChange={(e) => updateArrayData('projects', index, 'endDate', e.target.value)}
                    disabled={project.isOngoing}
                  />
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      id={`ongoing-${index}`}
                      checked={project.isOngoing}
                      onChange={(e) => updateArrayData('projects', index, 'isOngoing', e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={`ongoing-${index}`} className="text-sm text-gray-600">
                      Ongoing project
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Activities Step Component
export const renderActivitiesStep = (formData, updateFormData, addArrayItem, removeArrayItem, updateArrayData, aiHelpers = {}) => {
  const addActivity = () => {
    const newActivity = {
      id: Date.now(),
      activityName: '',
      organization: '',
      role: '',
      activityType: 'volunteer',
      description: '',
      startDate: '',
      endDate: '',
      isOngoing: false,
      location: ''
    }
    addArrayItem('activities', newActivity)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Activities & Volunteering</h2>
          <p className="text-gray-600">Add your extracurricular activities, volunteer work, and leadership roles</p>
        </div>
        <Button onClick={addActivity}>
          <Plus className="h-4 w-4 mr-2" />
          Add Activity
        </Button>
      </div>

      {formData.activities.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">No activities added yet</p>
          <Button onClick={addActivity} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Activity
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {formData.activities.map((activity, index) => (
            <div key={activity.id} className="border rounded-lg p-6 bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-900">Activity {index + 1}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeArrayItem('activities', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Activity Name *</label>
                  <Input
                    placeholder="Student Council President"
                    value={activity.activityName}
                    onChange={(e) => updateArrayData('activities', index, 'activityName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                  <Input
                    placeholder="University Student Union"
                    value={activity.organization}
                    onChange={(e) => updateArrayData('activities', index, 'organization', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Role</label>
                  <Input
                    placeholder="President, Volunteer, Member"
                    value={activity.role}
                    onChange={(e) => updateArrayData('activities', index, 'role', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Activity Type</label>
                  <Select
                    value={activity.activityType}
                    onValueChange={(value) => updateArrayData('activities', index, 'activityType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="volunteer">Volunteer</SelectItem>
                      <SelectItem value="leadership">Leadership</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="arts">Arts</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="community">Community</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => aiHelpers.generateActivityDescription && aiHelpers.generateActivityDescription(index)}
                      disabled={aiHelpers.isLoading}
                      className="flex items-center"
                    >
                      <Wand2 className="h-4 w-4 mr-2" />
                      {aiHelpers.isLoading ? 'Generating...' : 'Generate with AI'}
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Describe your involvement and achievements..."
                    rows={3}
                    value={activity.description}
                    onChange={(e) => updateArrayData('activities', index, 'description', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <Input
                    placeholder="Sydney, NSW, Australia"
                    value={activity.location}
                    onChange={(e) => updateArrayData('activities', index, 'location', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <Input
                    type="date"
                    value={activity.startDate}
                    onChange={(e) => updateArrayData('activities', index, 'startDate', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <Input
                    type="date"
                    value={activity.endDate}
                    onChange={(e) => updateArrayData('activities', index, 'endDate', e.target.value)}
                    disabled={activity.isOngoing}
                  />
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      id={`ongoing-activity-${index}`}
                      checked={activity.isOngoing}
                      onChange={(e) => updateArrayData('activities', index, 'isOngoing', e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={`ongoing-activity-${index}`} className="text-sm text-gray-600">
                      Ongoing activity
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Awards Step Component
export const renderAwardsStep = (formData, updateFormData, addArrayItem, removeArrayItem, updateArrayData, aiHelpers = {}) => {
  const addAward = () => {
    const newAward = {
      id: Date.now(),
      awardName: '',
      issuingOrganization: '',
      awardType: 'academic',
      dateReceived: '',
      description: '',
      credentialId: '',
      credentialUrl: '',
      expiryDate: ''
    }
    addArrayItem('awards', newAward)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Awards & Certifications</h2>
          <p className="text-gray-600">Add your awards, honors, certifications, and achievements</p>
        </div>
        <Button onClick={addAward}>
          <Plus className="h-4 w-4 mr-2" />
          Add Award
        </Button>
      </div>

      {formData.awards.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <Award className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">No awards or certifications added yet</p>
          <Button onClick={addAward} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Award
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {formData.awards.map((award, index) => (
            <div key={award.id} className="border rounded-lg p-6 bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-900">Award {index + 1}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeArrayItem('awards', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Award/Certification Name *</label>
                  <Input
                    placeholder="Dean's List, AWS Certified Solutions Architect"
                    value={award.awardName}
                    onChange={(e) => updateArrayData('awards', index, 'awardName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Issuing Organization</label>
                  <Input
                    placeholder="University of Sydney, Amazon Web Services"
                    value={award.issuingOrganization}
                    onChange={(e) => updateArrayData('awards', index, 'issuingOrganization', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Award Type</label>
                  <Select
                    value={award.awardType}
                    onValueChange={(value) => updateArrayData('awards', index, 'awardType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select award type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="certification">Certification</SelectItem>
                      <SelectItem value="scholarship">Scholarship</SelectItem>
                      <SelectItem value="competition">Competition</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Received</label>
                  <Input
                    type="date"
                    value={award.dateReceived}
                    onChange={(e) => updateArrayData('awards', index, 'dateReceived', e.target.value)}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <Textarea
                    placeholder="Describe the award and what you achieved..."
                    rows={2}
                    value={award.description}
                    onChange={(e) => updateArrayData('awards', index, 'description', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Credential ID</label>
                  <Input
                    placeholder="Certificate ID or Badge Number"
                    value={award.credentialId}
                    onChange={(e) => updateArrayData('awards', index, 'credentialId', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Credential URL</label>
                  <Input
                    placeholder="https://verify.certificate.com"
                    value={award.credentialUrl}
                    onChange={(e) => updateArrayData('awards', index, 'credentialUrl', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date (if applicable)</label>
                  <Input
                    type="date"
                    value={award.expiryDate}
                    onChange={(e) => updateArrayData('awards', index, 'expiryDate', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// References Step Component
export const renderReferencesStep = (formData, updateFormData, addArrayItem, removeArrayItem, updateArrayData) => {
  const addReference = () => {
    const newReference = {
      id: Date.now(),
      referenceName: '',
      jobTitle: '',
      company: '',
      email: '',
      phone: '',
      relationship: ''
    }
    addArrayItem('references', newReference, 'referenceList')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">References</h2>
        <p className="text-gray-600">Add professional references or indicate they're available upon request</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            id="include-references"
            checked={formData.references.includeReferences}
            onChange={(e) => updateFormData('references', 'includeReferences', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="include-references" className="text-sm font-medium text-gray-700">
            Include references on resume
          </label>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            id="available-on-request"
            checked={formData.references.availableOnRequest}
            onChange={(e) => updateFormData('references', 'availableOnRequest', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="available-on-request" className="text-sm font-medium text-gray-700">
            References available upon request
          </label>
        </div>
      </div>

      {formData.references.includeReferences && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Reference List</h3>
            <Button onClick={addReference}>
              <Plus className="h-4 w-4 mr-2" />
              Add Reference
            </Button>
          </div>

          {formData.references.referenceList.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <Users className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-gray-600 mb-4">No references added yet</p>
              <Button onClick={addReference} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Reference
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.references.referenceList.map((reference, index) => (
                <div key={reference.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-md font-medium text-gray-900">Reference {index + 1}</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem('references', index, 'referenceList')}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <Input
                        placeholder="Dr. Jane Smith"
                        value={reference.referenceName}
                        onChange={(e) => updateArrayData('references', 'referenceList', index, 'referenceName', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                      <Input
                        placeholder="Professor, Senior Manager"
                        value={reference.jobTitle}
                        onChange={(e) => updateArrayData('references', 'referenceList', index, 'jobTitle', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company/Organization</label>
                      <Input
                        placeholder="University of Sydney, Google"
                        value={reference.company}
                        onChange={(e) => updateArrayData('references', 'referenceList', index, 'company', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                      <Input
                        placeholder="Professor, Supervisor, Colleague"
                        value={reference.relationship}
                        onChange={(e) => updateArrayData('references', 'referenceList', index, 'relationship', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <Input
                        type="email"
                        placeholder="jane.smith@university.edu"
                        value={reference.email}
                        onChange={(e) => updateArrayData('references', 'referenceList', index, 'email', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <Input
                        placeholder="+61 2 9000 0000"
                        value={reference.phone}
                        onChange={(e) => updateArrayData('references', 'referenceList', index, 'phone', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Review Step Component
export const renderReviewStep = (formData, exportResume, analyzeResumeATS) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Export</h2>
        <p className="text-gray-600">Review your complete resume and export in your preferred format</p>
      </div>

      {/* Resume Preview */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Complete Resume Preview</h3>
        
        {/* Personal Information */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Personal Information</h4>
          <p><strong>Name:</strong> {formData.personalInfo.fullName || 'Not provided'}</p>
          <p><strong>Email:</strong> {formData.personalInfo.email || 'Not provided'}</p>
          <p><strong>Phone:</strong> {formData.personalInfo.phone || 'Not provided'}</p>
          {formData.personalInfo.linkedinUrl && <p><strong>LinkedIn:</strong> {formData.personalInfo.linkedinUrl}</p>}
        </div>

        {/* Professional Summary */}
        {formData.personalInfo.professionalSummary && (
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-2">Professional Summary</h4>
            <p>{formData.personalInfo.professionalSummary}</p>
          </div>
        )}

        {/* Education */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Education</h4>
          {formData.education.length > 0 ? (
            formData.education.map((edu, index) => (
              <div key={index} className="mb-2">
                <p><strong>{edu.degreeType}</strong> in {edu.fieldOfStudy}</p>
                <p>{edu.institutionName} - {edu.location}</p>
                <p>{edu.startDate} - {edu.isCurrent ? 'Present' : edu.endDate}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No education entries</p>
          )}
        </div>

        {/* Experience */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Work Experience</h4>
          {formData.experience.length > 0 ? (
            formData.experience.map((exp, index) => (
              <div key={index} className="mb-2">
                <p><strong>{exp.jobTitle}</strong> at {exp.companyName}</p>
                <p>{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                <p>{exp.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No work experience entries</p>
          )}
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Skills</h4>
          {Object.entries(formData.skills).map(([category, skills]) => (
            skills.length > 0 && (
              <div key={category} className="mb-2">
                <p><strong>{category.charAt(0).toUpperCase() + category.slice(1)}:</strong> {skills.join(', ')}</p>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Export & Analysis Options</h3>
        
        {/* ATS Analysis */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-md font-medium text-blue-900 mb-2 flex items-center">
            <Sparkles className="h-5 w-5 mr-2" />
            ATS Optimization Analysis
          </h4>
          <p className="text-sm text-blue-700 mb-3">
            Get AI-powered insights on how to optimize your resume for Applicant Tracking Systems (ATS)
          </p>
          <Button onClick={analyzeResumeATS} variant="outline" className="flex items-center">
            <Sparkles className="h-4 w-4 mr-2" />
            Analyze Resume for ATS
          </Button>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => exportResume('pdf')} className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export as PDF
          </Button>
          <Button onClick={() => exportResume('word')} variant="outline" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export as Word
          </Button>
          <Button onClick={() => exportResume('txt')} variant="outline" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export as Text
          </Button>
        </div>
      </div>
    </div>
  )
}

