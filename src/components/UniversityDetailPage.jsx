import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Users, Calendar, Star, Globe, BookOpen, Award } from 'lucide-react'

export default function UniversityDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [university, setUniversity] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock university data - replace with actual API call
    const mockUniversity = {
      id: id,
      name: "Harvard University",
      location: "Cambridge, Massachusetts, USA",
      country: "United States",
      established: 1636,
      type: "Private Research University",
      ranking: 1,
      students: 23000,
      acceptanceRate: "3.4%",
      tuitionFee: "$54,002",
      description: "Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Established in 1636, Harvard is the oldest institution of higher education in the United States.",
      programs: [
        "Medicine", "Law", "Business", "Engineering", "Computer Science", 
        "Psychology", "Economics", "Biology", "Chemistry", "Physics"
      ],
      facilities: [
        "World-class libraries", "Research laboratories", "Sports facilities",
        "Student housing", "Medical center", "Art museums"
      ],
      admissionRequirements: [
        "SAT: 1460-1580", "ACT: 33-35", "GPA: 3.9+", 
        "TOEFL: 100+", "Letters of recommendation", "Personal essays"
      ],
      scholarships: [
        "Need-based financial aid", "Merit scholarships", 
        "International student aid", "Research assistantships"
      ],
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=400&fit=crop"
    }

    setTimeout(() => {
      setUniversity(mockUniversity)
      setLoading(false)
    }, 1000)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  if (!university) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">University Not Found</h2>
          <button 
            onClick={() => navigate('/global/universities')}
            className="btn-primary"
          >
            Back to Universities
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                  #{university.ranking} Ranked
                </span>
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                  {university.type}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{university.name}</h1>
              <div className="flex items-center space-x-2 text-lg mb-6">
                <MapPin className="w-5 h-5" />
                <span>{university.location}</span>
              </div>
              <p className="text-xl text-gray-100 mb-8">{university.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Calendar className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{university.established}</div>
                  <div className="text-sm text-gray-200">Established</div>
                </div>
                <div className="text-center">
                  <Users className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{university.students.toLocaleString()}</div>
                  <div className="text-sm text-gray-200">Students</div>
                </div>
                <div className="text-center">
                  <Star className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{university.acceptanceRate}</div>
                  <div className="text-sm text-gray-200">Acceptance Rate</div>
                </div>
                <div className="text-center">
                  <Globe className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{university.tuitionFee}</div>
                  <div className="text-sm text-gray-200">Annual Tuition</div>
                </div>
              </div>
            </div>
            
            <div className="lg:text-right">
              <img 
                src={university.image} 
                alt={university.name}
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto lg:ml-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Programs */}
            <div className="bg-white rounded-2xl p-8 shadow-custom">
              <div className="flex items-center space-x-3 mb-6">
                <BookOpen className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">Academic Programs</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {university.programs.map((program, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 text-center hover:bg-purple-50 transition-colors">
                    <span className="font-medium text-gray-900">{program}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-2xl p-8 shadow-custom">
              <div className="flex items-center space-x-3 mb-6">
                <Award className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">Campus Facilities</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {university.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-gray-900">{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Admission Requirements */}
            <div className="bg-white rounded-2xl p-6 shadow-custom">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Admission Requirements</h3>
              <div className="space-y-3">
                {university.admissionRequirements.map((requirement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scholarships */}
            <div className="bg-white rounded-2xl p-6 shadow-custom">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Scholarships Available</h3>
              <div className="space-y-3">
                {university.scholarships.map((scholarship, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">{scholarship}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/counselor/directory')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Get Counseling
              </button>
              <button 
                onClick={() => navigate('/sop-builder')}
                className="w-full border-2 border-purple-600 text-purple-600 py-3 px-6 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300"
              >
                Start Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

