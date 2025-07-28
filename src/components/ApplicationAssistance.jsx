import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  CheckCircle2,
  Circle,
  Clock,
  FileText,
  Upload,
  Wand2,
  AlertCircle,
  Calendar,
  Target,
  BookOpen,
  Users,
  Award,
  Download,
  Eye,
  Send,
  Plus,
  Trash2,
  Edit,
  Save,
  RefreshCw,
  Lightbulb,
  Zap,
  Star,
  CheckSquare
} from 'lucide-react'
import Sidebar from './Sidebar'
import geminiAIService from '../lib/geminiAIService'

export default function ApplicationAssistance({ isMobileMenuOpen, onMobileMenuClose }) {
  const [selectedScholarship, setSelectedScholarship] = useState(null)
  const [applications, setApplications] = useState([])
  const [currentApplication, setCurrentApplication] = useState(null)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [aiGenerating, setAiGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchApplications()
  }, [])

  useEffect(() => {
    if (currentApplication) {
      fetchApplicationTasks(currentApplication.scholarshipId)
    }
  }, [currentApplication])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      // Mock data - in real app this would come from Supabase
      const mockApplications = [
        {
          id: '1',
          scholarshipId: 'sch-1',
          scholarshipName: 'Women in STEM Excellence Scholarship',
          provider: 'Tech Industry Foundation',
          status: 'in_progress',
          completionPercentage: 65,
          deadline: '2024-08-31',
          amount: 10000,
          startedAt: '2024-06-01',
          priority: 5,
          estimatedTimeRemaining: 180 // minutes
        },
        {
          id: '2',
          scholarshipId: 'sch-2',
          scholarshipName: 'Australian Government Research Training Program',
          provider: 'Australian Government',
          status: 'not_started',
          completionPercentage: 0,
          deadline: '2024-10-31',
          amount: 28854,
          priority: 4,
          estimatedTimeRemaining: 360
        },
        {
          id: '3',
          scholarshipId: 'sch-3',
          scholarshipName: 'International Student Excellence Award',
          provider: 'Global Education Partners',
          status: 'submitted',
          completionPercentage: 100,
          deadline: '2024-07-15',
          amount: 20000,
          submittedAt: '2024-06-15',
          priority: 3
        }
      ]
      setApplications(mockApplications)
      if (mockApplications.length > 0) {
        setCurrentApplication(mockApplications[0])
      }
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchApplicationTasks = async (scholarshipId) => {
    try {
      // Mock tasks data
      const mockTasks = [
        {
          id: 'task-1',
          name: 'STEM Project Portfolio',
          description: 'Portfolio showcasing your best STEM work, projects, and innovations',
          type: 'document_upload',
          required: true,
          status: 'completed',
          estimatedTime: 90,
          aiAssistanceAvailable: true,
          completedAt: '2024-06-02',
          sequenceOrder: 1
        },
        {
          id: 'task-2',
          name: 'Leadership Essay',
          description: 'Essay describing your leadership experience and future goals in STEM',
          type: 'essay',
          required: true,
          status: 'in_progress',
          estimatedTime: 75,
          wordLimit: 800,
          aiAssistanceAvailable: true,
          sequenceOrder: 2,
          content: 'As a computer science student passionate about increasing diversity in technology, I have actively sought leadership opportunities...'
        },
        {
          id: 'task-3',
          name: 'Academic Transcript',
          description: 'Official transcript showing STEM coursework and grades',
          type: 'document_upload',
          required: true,
          status: 'pending',
          estimatedTime: 10,
          aiAssistanceAvailable: false,
          sequenceOrder: 3
        },
        {
          id: 'task-4',
          name: 'Reference Letters',
          description: 'Two academic or professional references',
          type: 'reference',
          required: true,
          status: 'pending',
          estimatedTime: 30,
          aiAssistanceAvailable: true,
          sequenceOrder: 4
        }
      ]
      setTasks(mockTasks)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const generateAIContent = async (taskId, contentType) => {
    try {
      setAiGenerating(true)
      const task = tasks.find(t => t.id === taskId)
      
      let prompt = ''
      switch (contentType) {
        case 'essay':
          prompt = `Write a ${task.wordLimit || 800}-word essay for "${task.name}". ${task.description}`
          break
        case 'outline':
          prompt = `Create an outline for "${task.name}". ${task.description}`
          break
        case 'improvement':
          prompt = `Improve this content for "${task.name}": ${task.content}`
          break
        default:
          prompt = `Help with "${task.name}". ${task.description}`
      }

      // Mock AI response - in real app would use geminiAIService
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const aiContent = `As a computer science student passionate about increasing diversity in technology, I have actively sought leadership opportunities that align with my values and career aspirations. During my time as President of the Programming Club at university, I initiated a mentorship program pairing female first-year students with senior students in STEM fields.

This program has successfully supported over 30 students, with a 95% retention rate in STEM programs among participants. Through organizing hackathons, coding workshops, and industry networking events, I've created inclusive spaces where underrepresented groups can thrive in technology.

My leadership philosophy centers on empowerment through education and creating opportunities for others. I believe that diverse perspectives drive innovation, and I'm committed to fostering environments where everyone can contribute their unique insights to solve complex technological challenges.

Looking forward, I aim to establish a nonprofit organization focused on STEM education in underserved communities, combining my technical skills with my passion for social impact to create lasting change in the technology landscape.`

      // Update task content
      setTasks(prevTasks => 
        prevTasks.map(t => 
          t.id === taskId 
            ? { ...t, content: aiContent, status: 'in_progress' }
            : t
        )
      )
    } catch (error) {
      console.error('Error generating AI content:', error)
    } finally {
      setAiGenerating(false)
    }
  }

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { 
              ...task, 
              status: newStatus,
              completedAt: newStatus === 'completed' ? new Date().toISOString() : null
            }
          : task
      )
    )

    // Update application completion percentage
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    )
    const completedTasks = updatedTasks.filter(t => t.status === 'completed').length
    const totalRequiredTasks = updatedTasks.filter(t => t.required).length
    const newCompletionPercentage = Math.round((completedTasks / totalRequiredTasks) * 100)

    setApplications(prevApps =>
      prevApps.map(app =>
        app.id === currentApplication?.id
          ? { ...app, completionPercentage: newCompletionPercentage }
          : app
      )
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600'
      case 'in_progress': return 'text-blue-600'
      case 'pending': return 'text-gray-600'
      case 'blocked': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case 'in_progress': return <Clock className="h-5 w-5 text-blue-600" />
      case 'pending': return <Circle className="h-5 w-5 text-gray-400" />
      case 'blocked': return <AlertCircle className="h-5 w-5 text-red-600" />
      default: return <Circle className="h-5 w-5 text-gray-400" />
    }
  }

  const getApplicationStatusColor = (status) => {
    switch (status) {
      case 'submitted': return 'bg-green-100 text-green-700'
      case 'in_progress': return 'bg-blue-100 text-blue-700'
      case 'not_started': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getDaysUntilDeadline = (deadline) => {
    const now = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getDeadlineColor = (days) => {
    if (days <= 7) return 'text-red-600'
    if (days <= 30) return 'text-orange-600'
    return 'text-green-600'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Hero Section - Full Width */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-12 w-full">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              Application Assistance
            </h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
              Get guided support through your scholarship applications with AI-powered writing assistance and progress tracking.
            </p>
          </div>
        </div>
      </section>

      {/* Two-Column Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={true}
          onClose={() => {}}
          isHomepage={false}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={onMobileMenuClose}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full md:w-auto transition-all duration-300">
          <div className="container mx-auto px-6 py-12">
            
            {/* Applications Overview */}
            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              {/* Application List */}
              <div className="lg:col-span-1">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-purple-600" />
                      My Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {applications.map((app) => {
                      const daysUntilDeadline = getDaysUntilDeadline(app.deadline)
                      const isSelected = currentApplication?.id === app.id
                      
                      return (
                        <div
                          key={app.id}
                          className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                            isSelected ? 'border-purple-300 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setCurrentApplication(app)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <Badge className={`${getApplicationStatusColor(app.status)} text-xs`}>
                              {app.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                            <div className="flex items-center text-xs text-gray-600">
                              <Star className="h-3 w-3 mr-1" />
                              Priority {app.priority}
                            </div>
                          </div>
                          
                          <h4 className="font-semibold text-sm mb-1 line-clamp-2">{app.scholarshipName}</h4>
                          <p className="text-xs text-gray-600 mb-2">{app.provider}</p>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs">
                              <span>Progress</span>
                              <span className="font-medium">{app.completionPercentage}%</span>
                            </div>
                            <Progress value={app.completionPercentage} className="h-2" />
                            
                            <div className="flex justify-between items-center text-xs">
                              <span className={getDeadlineColor(daysUntilDeadline)}>
                                {daysUntilDeadline > 0 ? `${daysUntilDeadline} days left` : 'Deadline passed'}
                              </span>
                              <span className="text-green-600 font-medium">
                                ${app.amount.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              </div>

              {/* Application Details */}
              <div className="lg:col-span-2">
                {currentApplication ? (
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl mb-2">{currentApplication.scholarshipName}</CardTitle>
                          <p className="text-gray-600">{currentApplication.provider}</p>
                        </div>
                        <Badge className={`${getApplicationStatusColor(currentApplication.status)}`}>
                          {currentApplication.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-6 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600 mb-1">
                            {currentApplication.completionPercentage}%
                          </div>
                          <div className="text-sm text-gray-600">Complete</div>
                          <Progress value={currentApplication.completionPercentage} className="mt-2" />
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600 mb-1">
                            ${currentApplication.amount.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">Award Amount</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-2xl font-bold mb-1 ${getDeadlineColor(getDaysUntilDeadline(currentApplication.deadline))}`}>
                            {getDaysUntilDeadline(currentApplication.deadline)}
                          </div>
                          <div className="text-sm text-gray-600">Days Remaining</div>
                        </div>
                      </div>

                      {currentApplication.estimatedTimeRemaining && (
                        <div className="bg-blue-50 p-4 rounded-lg mb-6">
                          <div className="flex items-center text-blue-700">
                            <Clock className="h-4 w-4 mr-2" />
                            <span className="font-medium">
                              Estimated {Math.round(currentApplication.estimatedTimeRemaining / 60)} hours remaining
                            </span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="shadow-lg border-0">
                    <CardContent className="text-center py-12">
                      <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">No Application Selected</h3>
                      <p className="text-gray-600">Select an application from the list to view details and tasks.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Application Tasks */}
            {currentApplication && (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="review">Review</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview">
                  <div className="grid lg:grid-cols-2 gap-6">
                    <Card className="shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Target className="h-5 w-5 mr-2 text-purple-600" />
                          Task Progress
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {tasks.map((task) => (
                            <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center">
                                {getStatusIcon(task.status)}
                                <div className="ml-3">
                                  <div className="font-medium text-sm">{task.name}</div>
                                  <div className="text-xs text-gray-600">
                                    {task.estimatedTime} min • {task.required ? 'Required' : 'Optional'}
                                  </div>
                                </div>
                              </div>
                              {task.aiAssistanceAvailable && (
                                <Badge variant="secondary" className="text-xs">
                                  <Wand2 className="h-3 w-3 mr-1" />
                                  AI
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
                          Application Tips
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-3 bg-yellow-50 rounded-lg">
                            <h4 className="font-medium text-yellow-800 mb-1">Start Early</h4>
                            <p className="text-sm text-yellow-700">
                              Begin your application at least 4 weeks before the deadline to allow time for revisions.
                            </p>
                          </div>
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <h4 className="font-medium text-blue-800 mb-1">Use AI Assistance</h4>
                            <p className="text-sm text-blue-700">
                              Take advantage of AI-powered writing assistance for essays and personal statements.
                            </p>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg">
                            <h4 className="font-medium text-green-800 mb-1">Get Feedback</h4>
                            <p className="text-sm text-green-700">
                              Have mentors or peers review your application before submission.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Tasks Tab */}
                <TabsContent value="tasks">
                  <div className="space-y-6">
                    {tasks.map((task) => (
                      <Card key={task.id} className="shadow-lg border-0">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              {getStatusIcon(task.status)}
                              <div className="ml-3">
                                <CardTitle className="text-lg">{task.name}</CardTitle>
                                <p className="text-gray-600 text-sm">{task.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {task.required && (
                                <Badge variant="destructive" className="text-xs">Required</Badge>
                              )}
                              {task.aiAssistanceAvailable && (
                                <Badge variant="secondary" className="text-xs">
                                  <Wand2 className="h-3 w-3 mr-1" />
                                  AI Available
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {task.type === 'essay' && (
                            <div className="space-y-4">
                              {task.wordLimit && (
                                <div className="text-sm text-gray-600">
                                  Word limit: {task.wordLimit} words
                                </div>
                              )}
                              
                              <Textarea
                                placeholder="Start writing your essay here..."
                                value={task.content || ''}
                                onChange={(e) => {
                                  setTasks(prevTasks =>
                                    prevTasks.map(t =>
                                      t.id === task.id ? { ...t, content: e.target.value } : t
                                    )
                                  )
                                }}
                                className="min-h-[200px]"
                              />
                              
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => generateAIContent(task.id, 'essay')}
                                  disabled={aiGenerating}
                                >
                                  {aiGenerating ? (
                                    <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                                  ) : (
                                    <Wand2 className="h-4 w-4 mr-1" />
                                  )}
                                  Generate with AI
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => generateAIContent(task.id, 'improvement')}
                                  disabled={aiGenerating || !task.content}
                                >
                                  <Zap className="h-4 w-4 mr-1" />
                                  Improve with AI
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => updateTaskStatus(task.id, 'completed')}
                                  disabled={!task.content}
                                >
                                  <Save className="h-4 w-4 mr-1" />
                                  Save & Complete
                                </Button>
                              </div>
                            </div>
                          )}

                          {task.type === 'document_upload' && (
                            <div className="space-y-4">
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 mb-2">
                                  Drag and drop your file here, or click to browse
                                </p>
                                <Button variant="outline">
                                  Choose File
                                </Button>
                              </div>
                              
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => updateTaskStatus(task.id, 'completed')}
                                >
                                  <CheckCircle2 className="h-4 w-4 mr-1" />
                                  Mark as Complete
                                </Button>
                              </div>
                            </div>
                          )}

                          {task.type === 'reference' && (
                            <div className="space-y-4">
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="ref1-name">Reference 1 Name</Label>
                                  <Input id="ref1-name" placeholder="Dr. Jane Smith" />
                                </div>
                                <div>
                                  <Label htmlFor="ref1-email">Reference 1 Email</Label>
                                  <Input id="ref1-email" type="email" placeholder="jane.smith@university.edu" />
                                </div>
                                <div>
                                  <Label htmlFor="ref2-name">Reference 2 Name</Label>
                                  <Input id="ref2-name" placeholder="Prof. John Doe" />
                                </div>
                                <div>
                                  <Label htmlFor="ref2-email">Reference 2 Email</Label>
                                  <Input id="ref2-email" type="email" placeholder="john.doe@company.com" />
                                </div>
                              </div>
                              
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Send className="h-4 w-4 mr-1" />
                                  Send Invitations
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => updateTaskStatus(task.id, 'completed')}
                                >
                                  <CheckCircle2 className="h-4 w-4 mr-1" />
                                  Mark as Complete
                                </Button>
                              </div>
                            </div>
                          )}

                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center text-sm text-gray-600">
                              <span>Estimated time: {task.estimatedTime} minutes</span>
                              <span className={getStatusColor(task.status)}>
                                Status: {task.status.replace('_', ' ')}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Documents Tab */}
                <TabsContent value="documents">
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-purple-600" />
                        Application Documents
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <FileText className="h-8 w-8 text-blue-600" />
                              <Badge className="bg-green-100 text-green-700">Uploaded</Badge>
                            </div>
                            <h4 className="font-medium mb-1">STEM Portfolio.pdf</h4>
                            <p className="text-sm text-gray-600 mb-2">2.3 MB • Uploaded Jun 2</p>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>

                          <div className="p-4 border border-dashed border-gray-300 rounded-lg">
                            <div className="text-center">
                              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <h4 className="font-medium mb-1">Leadership Essay</h4>
                              <p className="text-sm text-gray-600 mb-2">Draft in progress</p>
                              <Button variant="outline" size="sm">
                                <Plus className="h-4 w-4 mr-1" />
                                Upload Draft
                              </Button>
                            </div>
                          </div>

                          <div className="p-4 border border-dashed border-gray-300 rounded-lg">
                            <div className="text-center">
                              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <h4 className="font-medium mb-1">Academic Transcript</h4>
                              <p className="text-sm text-gray-600 mb-2">Required document</p>
                              <Button variant="outline" size="sm">
                                <Plus className="h-4 w-4 mr-1" />
                                Upload
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Review Tab */}
                <TabsContent value="review">
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CheckSquare className="h-5 w-5 mr-2 text-purple-600" />
                        Application Review
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-blue-800 mb-2">Pre-Submission Checklist</h3>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                              <span className="text-sm">All required documents uploaded</span>
                            </div>
                            <div className="flex items-center">
                              <Circle className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm">Essays reviewed and proofread</span>
                            </div>
                            <div className="flex items-center">
                              <Circle className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm">Reference letters confirmed</span>
                            </div>
                            <div className="flex items-center">
                              <Circle className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm">Application form completed</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-semibold mb-3">Application Summary</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Scholarship:</span>
                                <span className="font-medium">{currentApplication.scholarshipName}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Provider:</span>
                                <span>{currentApplication.provider}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Amount:</span>
                                <span className="font-medium text-green-600">
                                  ${currentApplication.amount.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Deadline:</span>
                                <span className={getDeadlineColor(getDaysUntilDeadline(currentApplication.deadline))}>
                                  {currentApplication.deadline}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Completion:</span>
                                <span className="font-medium">{currentApplication.completionPercentage}%</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold mb-3">Next Steps</h3>
                            <div className="space-y-2">
                              <div className="p-3 bg-yellow-50 rounded-lg">
                                <div className="flex items-center text-yellow-700">
                                  <AlertCircle className="h-4 w-4 mr-2" />
                                  <span className="text-sm font-medium">Complete Leadership Essay</span>
                                </div>
                              </div>
                              <div className="p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-center text-blue-700">
                                  <Clock className="h-4 w-4 mr-2" />
                                  <span className="text-sm font-medium">Upload Academic Transcript</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <Button className="flex-1" disabled={currentApplication.completionPercentage < 100}>
                            <Send className="h-4 w-4 mr-2" />
                            Submit Application
                          </Button>
                          <Button variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                          <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Export PDF
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

