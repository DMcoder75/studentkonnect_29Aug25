import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  ArrowRight, TrendingUp, Users, BookOpen, GraduationCap, Star, Heart, 
  Globe, Target, Building, Search, ChevronDown, Mail, Phone, MapPin 
} from 'lucide-react'
import Footer from './Footer'
import UnifiedLeftSidebar from './UnifiedLeftSidebar'
import { globalEducationService } from '../services/globalEducationService'
import { counselorService } from '../services/counselorService'
import { realDatabaseService } from '../services/realDatabaseService';

// Featured Universities Content Component
const FeaturedUniversitiesContent = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUniversities = async () => {
      try {
        setLoading(true);
        const { data, error } = await realDatabaseService.getAllUniversities();
        
        if (error) {
          console.error('Error loading universities:', error);
          setUniversities([]);
        } else {
          // Take first 6 universities and format them
          const formattedUniversities = (data || []).slice(0, 6).map(uni => ({
            id: uni.id,
            name: uni.university_name,
            type: uni.type,
            location: `${uni.city}, ${uni.state}`,
            rating: '4.5',
            ranking: uni.national_ranking || 'N/A',
            website: uni.website_domain
          }));
          setUniversities(formattedUniversities);
        }
      } catch (err) {
        console.error('Error in loadUniversities:', err);
        setUniversities([]);
      } finally {
        setLoading(false);
      }
    };

    loadUniversities();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <p className="mt-2 text-gray-600">Loading universities...</p>
      </div>
    );
  }

  if (universities.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No universities available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {universities.map((university) => (
        <div key={university.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  {university.name ? university.name.charAt(0) : 'U'}
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-bold text-gray-900">{university.name}</h3>
                  <p className="text-sm text-gray-600">{university.type}</p>
                </div>
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Heart className="h-5 w-5 text-gray-400 hover:text-red-500" />
              </button>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <span className="font-medium">Location:</span>
                <span className="ml-1">{university.location}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="font-medium">{university.rating}</span>
                </div>
                <span className="text-gray-600">Ranking: {university.ranking}</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => navigate('/universities')}
                className="flex-1 px-4 py-2 text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                View Details
              </button>
              <button 
                onClick={() => navigate('/universities')}
                className="flex-1 px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-md transition-colors"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Helper function to get counselor type
const getCounselorType = (type) => {
  switch (type) {
    case 'career': return 'Career Counselor'
    case 'academic': return 'Academic Advisor'
    case 'visa': return 'Migration Counselor'
    default: return 'Education Counselor'
  }
}

const HomePageEnhanced = () => {
  const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
  
  @keyframes float-delayed {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(-180deg); }
  }
  
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-float-delayed {
    animation: float-delayed 8s ease-in-out infinite;
    animation-delay: 2s;
  }
  
  .animate-spin-slow {
    animation: spin-slow 8s linear infinite;
  }
  
  .gradient-text {
    background: linear-gradient(135deg, #8b5cf6, #06b6d4, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(139, 92, 246, 0.2);
  }
  `;

  const navigate = useNavigate()
  const { user, isAdmin } = useAuth()
  const [universities, setUniversities] = useState([])
  const [stats, setStats] = useState({
    totalCountries: 8,
    totalUniversities: 850,
    totalCourses: 8500,
    totalPathways: 5000,
    totalCareerPaths: 100
  })
  const [loading, setLoading] = useState(true)
  const [selectedProfession, setSelectedProfession] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedUniversity, setSelectedUniversity] = useState('')

  // Mobile detection state
  const [isMobileView, setIsMobileView] = useState(false)

  // Sample data for enhanced sections
  const [counselors, setCounselors] = useState([])
  const [featuredUniversities, setFeaturedUniversities] = useState([])

  const careerPathways = [
    {
      id: 1,
      title: "Medicine & Health Sciences",
      status: "Popular",
      growth: "Growing",
      description: "Global pathway to medical careers including medicine, nursing, pharmacy, and allied health professions with international recognition and mobility.",
      trending: true
    },
    {
      id: 2,
      title: "Engineering & Technology",
      status: "Popular",
      growth: "Growing",
      description: "International engineering disciplines from civil to software engineering, preparing students for global technology careers and innovation.",
      trending: true
    },
    {
      id: 3,
      title: "Business & Commerce",
      status: "Popular",
      growth: "Stable",
      description: "Global business pathways covering international finance, marketing, management, and entrepreneurship with worldwide industry connections.",
      trending: false
    },
    {
      id: 4,
      title: "Law & Legal Studies",
      status: "Popular",
      growth: "Growing",
      description: "International legal education pathways from comparative law to specialized legal practice in global legal systems.",
      trending: true
    }
  ]

  const professions = [
    "Software Engineer", "Doctor", "Business Analyst", "Data Scientist", 
    "Lawyer", "Teacher", "Architect", "Pharmacist", "Nurse", "Accountant"
  ]

  const countries = [
    "All countries...", "Australia", "United States", "United Kingdom", 
    "Canada", "Germany", "Switzerland", "Singapore", "Netherlands"
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Starting data fetch...')
        setLoading(true)
        
        // Fetch real data from Supabase - properly destructure the response
        const [universitiesResponse, statsData, counselorsData] = await Promise.all([
          realDatabaseService.getAllUniversities(), // Returns { data, error }
          globalEducationService.getGlobalStatistics(),
          realDatabaseService.getAllCounselors() // Use the real database service with user joins
        ])

        console.log("✅ Fetched universitiesResponse:", universitiesResponse);
        console.log("✅ Fetched statsData:", statsData);
        console.log("✅ Fetched counselorsData:", counselorsData);

        // Extract the actual data from the response
        const universitiesData = universitiesResponse?.data || [];
        
        setUniversities(universitiesData)
        setStats(statsData || stats)
        // Process counselors data with proper user name mapping
        if (counselorsData?.data && counselorsData.data.length > 0) {
          console.log('📞 Processing counselors data:', counselorsData.data);
          const transformedCounselors = counselorsData.data.slice(0, 8).map(counselor => {
            const name = counselor.users?.first_name && counselor.users?.last_name 
                  ? `${counselor.users.first_name} ${counselor.users.last_name}` 
                  : counselor.display_name || 'Education Counselor';
            const type = getCounselorType(counselor.counselor_type);
            
            const transformed = {
              id: counselor.id,
              name: name,
              title: type, // Add title field for display
              type: type,
              location: counselor.location || 'Australia',
              rating: counselor.average_rating || 4.5,
              reviews: counselor.total_reviews || Math.floor(Math.random() * 100) + 50,
              helped: counselor.students_helped || Math.floor(Math.random() * 400) + 100,
              success: `${counselor.success_rate || Math.floor(Math.random() * 15) + 85}%`,
              languages: counselor.languages_spoken || ['English'],
              specializations: counselor.specializations ? counselor.specializations.split(',').slice(0, 2) : ['University Applications', 'Career Guidance'],
              image: '/api/placeholder/150/150'
            };
            console.log(`📞 Transformed counselor ${counselor.id}:`, transformed);
            return transformed;
          });
          console.log('📞 Final transformed counselors:', transformedCounselors);
          setCounselors(transformedCounselors)
        } else {
          console.log('📞 No counselor data available');
          setCounselors([]) // Use empty array if no data
        }
        
        // Set featured universities from real database data (first 6 universities)
        if (universitiesData && universitiesData.length > 0) {
          console.log('🏫 Processing featured universities from', universitiesData.length, 'total universities')
          const featured = universitiesData.slice(0, 6).map(uni => ({
            id: uni.id,
            name: uni.university_name || uni.name || 'University',
            type: uni.university_type || uni.type || 'University',
            location: uni.city || uni.country || uni.n_countries?.country_name || 'Australia',
            rating: uni.rating || '4.5',
            ranking: uni.national_ranking || uni.global_ranking || 'N/A',
            globalRanking: uni.global_ranking ? `#${uni.global_ranking}` : (uni.national_ranking ? `#${uni.national_ranking}` : '#N/A'),
            country: uni.country || uni.n_countries?.country_name || 'N/A',
            description: uni.more_info || uni.university_description || uni.description || `${uni.university_name || uni.name || 'This university'} is a leading institution offering excellent academic programs and research opportunities.`
          }))
          console.log('🎯 Setting featured universities:', featured)
          setFeaturedUniversities(featured)
        } else {
          console.log('❌ No universities data available, using mock data for testing')
          // Temporary mock data to test component rendering
          const mockUniversities = [
            {
              id: 1,
              name: "Harvard University",
              type: "Private Research University",
              location: "United States",
              rating: "4.9",
              ranking: "1"
            },
            {
              id: 2,
              name: "University of Oxford",
              type: "Public Research University", 
              location: "United Kingdom",
              rating: "4.8",
              ranking: "2"
            },
            {
              id: 3,
              name: "MIT",
              type: "Private Research University",
              location: "United States",
              rating: "4.9",
              ranking: "3"
            }
          ]
          setFeaturedUniversities(mockUniversities)
        }
        
      } catch (error) {
        console.error("❌ Error fetching data:", error)
      } finally {
        setLoading(false)
        console.log('✅ Data fetch completed')
      }
    }

    fetchData()
  }, [])

  // Mobile detection useEffect
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobileView(mobile)
      console.log('Mobile detection:', mobile, 'Width:', window.innerWidth, 'UserAgent mobile:', /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }

    // Check on mount
    checkMobile()

    // Add resize listener
    window.addEventListener('resize', checkMobile)

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleStartJourney = () => {
    if (!selectedProfession) {
      alert('Please select a profession to continue')
      return
    }
    
    const params = new URLSearchParams({
      profession: selectedProfession,
      country: selectedCountry || '',
      university: selectedUniversity || ''
    })
    
    navigate(`/journey-results?${params.toString()}`)
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
      {/* Inject Custom CSS */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-4 w-full h-[320px] flex items-center mt-12 sm:mt-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(/HeroUniPathway.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="relative min-h-[280px] sm:min-h-[300px] flex items-center">
              <div className="w-full text-center">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent animate-pulse">
                  Find Your Perfect
                  <br />
                  <span className="text-yellow-300">Global University</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 text-purple-100 max-w-4xl mx-auto px-2">
                  Discover your ideal university course through personalized pathways worldwide. 
                  Connect your passions with career opportunities at top universities globally.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                  <button 
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                    onClick={() => scrollToSection('pathways')}
                  >
                    Explore Pathways <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-purple-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                    onClick={() => navigate('/universities')}
                  >
                    Browse Universities
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content with Sidebar Layout - Desktop Only */}
      {!isMobileView ? (
        <div className="flex">
          {/* Left Sidebar */}
          <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
            <UnifiedLeftSidebar />
          </div>
          
          {/* Main Content */}
          <div className="flex-1 bg-gradient-to-br from-purple-50 via-white to-cyan-50">
            
            {/* Global Statistics Section */}
            <section className="py-12 bg-gradient-to-br from-purple-100 via-pink-50 to-cyan-100 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="absolute top-20 right-20 w-24 h-24 bg-cyan-500 rounded-full animate-bounce"></div>
              <div className="absolute bottom-10 left-1/4 w-20 h-20 bg-pink-500 rounded-full animate-ping"></div>
              <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-yellow-500 rounded-full animate-pulse"></div>
            </div>
            <div className="container mx-auto px-6 relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                  🌟 Global Education at Your Fingertips 🌟
                </h2>
                <p className="text-base text-gray-700 font-medium">Discover endless possibilities across the world</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div className="text-center cursor-pointer group transform hover:scale-110 transition-all duration-300 hover:rotate-2">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-green-300 transition-all duration-300 animate-pulse">
                    <Globe className="h-10 w-10" />
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300 font-mono tracking-wider">
                    {stats.totalCountries}+
                  </div>
                  <div className="text-gray-700 font-bold text-base group-hover:text-green-700 transition-colors duration-200">Countries</div>
                </div>
                
                <div className="text-center cursor-pointer group transform hover:scale-110 transition-all duration-300 hover:-rotate-2">
                  <div className="bg-gradient-to-br from-purple-500 to-violet-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-purple-300 transition-all duration-300 animate-bounce">
                    <GraduationCap className="h-10 w-10" />
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-violet-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300 font-mono tracking-wider">
                    {stats.totalUniversities}+
                  </div>
                  <div className="text-gray-700 font-bold text-base group-hover:text-purple-700 transition-colors duration-200">Universities</div>
                </div>
                
                <div className="text-center cursor-pointer group transform hover:scale-110 transition-all duration-300 hover:rotate-2">
                  <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-pink-300 transition-all duration-300 animate-pulse">
                    <BookOpen className="h-10 w-10" />
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-pink-600 to-rose-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300 font-mono tracking-wider">
                    {stats.totalCourses}+
                  </div>
                  <div className="text-gray-700 font-bold text-base group-hover:text-pink-700 transition-colors duration-200">Courses</div>
                </div>
                
                <div className="text-center cursor-pointer group transform hover:scale-110 transition-all duration-300 hover:-rotate-2">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-cyan-300 transition-all duration-300 animate-bounce">
                    <TrendingUp className="h-10 w-10" />
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300 font-mono tracking-wider">
                    {stats.totalPathways}+
                  </div>
                  <div className="text-gray-700 font-bold text-base group-hover:text-cyan-700 transition-colors duration-200">Pathways</div>
                </div>
                
                <div className="text-center cursor-pointer group transform hover:scale-110 transition-all duration-300 hover:rotate-2">
                  <div className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-yellow-300 transition-all duration-300 animate-pulse">
                    <Users className="h-10 w-10" />
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-yellow-600 to-orange-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300 font-mono tracking-wider">
                    {stats.totalCareerPaths}+
                  </div>
                  <div className="text-gray-700 font-bold text-base group-hover:text-yellow-700 transition-colors duration-200">Career Paths</div>
                </div>
              </div>
            </div>
          </section>

          {/* Start Your Journey Section */}
          <section className="py-12 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-5 left-5 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float"></div>
              <div className="absolute top-10 right-10 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-float-delayed"></div>
              <div className="absolute bottom-5 left-1/3 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-float"></div>
            </div>
            <div className="container mx-auto px-6 relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 flex items-center justify-center animate-pulse">
                  <Target className="h-12 w-12 mr-4 text-purple-600 animate-spin-slow" />
                  🚀 Start Your Journey! 🎯
                </h2>
                <p className="text-xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed">
                  Begin your educational adventure by connecting with expert counselors and exploring university pathways.
                  <span className="text-purple-600 font-bold"> Your future starts here! ✨</span>
                </p>
              </div>
            </div>
          </section>

          {/* Build Your Perfect Pathway Section */}
          <section className="py-12 bg-gradient-to-br from-purple-50 via-purple-100 to-pink-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                  🍎 Build Your Perfect Pathway ⚙️
                </h2>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                  Discover your perfect university pathway by selecting your preferred profession, country, and university. 
                  <span className="text-blue-600 font-bold"> Get personalized course combinations and admission requirements globally! 🚀</span>
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      🎓 Key Profession *
                    </label>
                    <select 
                      value={selectedProfession}
                      onChange={(e) => setSelectedProfession(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a profession...</option>
                      {professions.map((profession) => (
                        <option key={profession} value={profession}>{profession}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      🌍 Country (Optional)
                    </label>
                    <select 
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      🏛️ University (Optional)
                    </label>
                    <select 
                      value={selectedUniversity}
                      onChange={(e) => setSelectedUniversity(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All universities...</option>
                      <option value="Harvard University">Harvard University</option>
                      <option value="University of Oxford">University of Oxford</option>
                      <option value="MIT">MIT</option>
                      <option value="University of Melbourne">University of Melbourne</option>
                    </select>
                  </div>
                </div>
                
                <div className="text-center">
                  <button 
                    onClick={handleStartJourney}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
                  >
                    <Search className="mr-2 h-5 w-5" />
                    Get Started Now →
                  </button>
                  {!selectedProfession && (
                    <p className="text-gray-500 text-sm mt-2">Please select a profession to continue</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Find Your Perfect Counselor Section */}
          <section className="py-6 bg-gradient-to-br from-purple-50 via-white to-pink-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 mr-3 text-orange-600" />
                  Find Your Perfect Counselor
                </h2>
                <p className="text-base text-gray-600 max-w-3xl mx-auto">
                  Connect with experienced education counselors who understand your unique journey and goals. 
                  Get personalized guidance for your university applications and career planning.
                </p>
              </div>
              
              <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide max-w-6xl mx-auto">
                {counselors.map((counselor) => (
                  <div key={counselor.id} className="flex-none w-80 rounded-lg border bg-white text-card-foreground shadow-sm group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-white">
                    <div className="flex flex-col space-y-1.5 p-6 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-orange-100 text-orange-700">
                          {counselor.type}
                        </div>
                        <div className="flex items-center text-yellow-600">
                          <Star className="h-4 w-4 mr-1 fill-current" />
                          <span className="text-sm font-semibold">{counselor.rating}</span>
                          <span className="text-xs text-gray-500 ml-1">({counselor.reviews} reviews)</span>
                        </div>
                      </div>
                      <h3 className="text-xl group-hover:text-orange-600 transition-colors font-semibold">
                        {counselor.name}
                      </h3>
                      <div className="text-sm text-gray-600">{counselor.experience}</div>
                    </div>
                    
                    <div className="p-6 pt-0">
                      <div className="space-y-4">
              <div className="flex flex-wrap gap-1">
                {(counselor.specializations || []).map((spec, idx) => (
                  <div key={idx} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-gray-700 border-gray-300 text-xs">
                    {spec}
                  </div>
                ))}
              </div>
              
              <p className="text-gray-600 text-sm line-clamp-3">
                {counselor.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  {counselor.studentsHelped} helped
                </div>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {counselor.successRate}% success
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <span className="font-medium">Languages: </span>
                {(counselor.languages || []).join(", ")}
              </div>
                        
                        <div className="flex space-x-2 pt-2">
                          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 h-9 rounded-md px-3 flex-1">
                            Message
                          </button>
                          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-9 rounded-md px-3 flex-1">
                            Connect Now
                          </button>
                        </div>
                        
                        {isAdmin && (
                          <div className="text-center pt-2 border-t">
                            <span className="text-base font-bold text-gray-900">
                              ${counselor.price}
                            </span>
                            <span className="text-sm text-gray-600 ml-1">
                              /{counselor.currency}/hour
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <button 
                  onClick={() => navigate('/counselor/directory')}
                  className="inline-flex items-center rounded-full border px-6 py-3 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-orange-300 text-orange-700 hover:bg-orange-50"
                >
                  View All Counselors →
                </button>
              </div>
            </div>
          </section>

          {/* Popular Career Pathways Section */}
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Popular Career Pathways</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Trending career paths chosen by students like you
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {careerPathways.map((pathway) => (
                  <div key={pathway.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-purple-100 text-purple-700">
                          {pathway.status}
                        </div>
                        {pathway.trending && (
                          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-green-100 text-green-700">
                            📈 {pathway.growth}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{pathway.title}</h3>
                    <p className="text-gray-600 mb-6">{pathway.description}</p>
                    
                    <button 
                      onClick={() => navigate(`/pathway/${pathway.id}`)}
                      className="inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 h-9 rounded-md px-3"
                    >
                      Explore Pathway →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Universities Section */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Universities</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Explore top-ranked universities and discover the programs that align with your career goals.
                </p>
              </div>
              
              <FeaturedUniversitiesContent />
              
              <div className="text-center mt-8">
                <button 
                  onClick={() => navigate('/universities')}
                  className="inline-flex items-center rounded-full border px-6 py-3 text-sm font-semibold border-purple-300 text-purple-700 hover:bg-purple-50 transition-colors"
                >
                  View All Universities →
                </button>
              </div>
            </div>
          </section>

        </div>
      </div>
      ) : (
        /* Mobile Layout - No Sidebar */
        <div className="bg-gradient-to-br from-purple-50 via-white to-cyan-50">
          
          {/* Global Statistics Section */}
          <section className="py-12 bg-gradient-to-br from-purple-100 via-pink-50 to-cyan-100 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="absolute top-20 right-20 w-24 h-24 bg-cyan-500 rounded-full animate-bounce"></div>
              <div className="absolute bottom-10 left-1/4 w-20 h-20 bg-pink-500 rounded-full animate-ping"></div>
              <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-yellow-500 rounded-full animate-pulse"></div>
            </div>
            <div className="container mx-auto px-6 relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                  🌟 Global Education at Your Fingertips 🌟
                </h2>
                <p className="text-base text-gray-700 font-medium">Discover endless possibilities across the world</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div className="text-center cursor-pointer group transform hover:scale-110 transition-all duration-300 hover:rotate-2">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-green-300 transition-all duration-300 animate-pulse">
                    <Globe className="h-10 w-10" />
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300 font-mono tracking-wider">
                    {stats.totalCountries}+
                  </div>
                  <div className="text-gray-700 font-bold text-base group-hover:text-green-700 transition-colors duration-200">Countries</div>
                </div>
                <div className="text-center cursor-pointer group transform hover:scale-110 transition-all duration-300 hover:-rotate-2">
                  <div className="bg-gradient-to-br from-purple-500 to-violet-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-purple-300 transition-all duration-300 animate-bounce">
                    <GraduationCap className="h-10 w-10" />
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-violet-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300 font-mono tracking-wider">
                    {stats.totalUniversities}+
                  </div>
                  <div className="text-gray-700 font-bold text-base group-hover:text-purple-700 transition-colors duration-200">Universities</div>
                </div>
                <div className="text-center cursor-pointer group transform hover:scale-110 transition-all duration-300 hover:rotate-2">
                  <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-pink-300 transition-all duration-300 animate-pulse">
                    <BookOpen className="h-10 w-10" />
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-pink-600 to-rose-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300 font-mono tracking-wider">
                    {stats.totalCourses}+
                  </div>
                  <div className="text-gray-700 font-bold text-base group-hover:text-pink-700 transition-colors duration-200">Courses</div>
                </div>
                <div className="text-center cursor-pointer group transform hover:scale-110 transition-all duration-300 hover:-rotate-2">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-cyan-300 transition-all duration-300 animate-bounce">
                    <TrendingUp className="h-10 w-10" />
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300 font-mono tracking-wider">
                    {stats.totalPathways}+
                  </div>
                  <div className="text-gray-700 font-bold text-base group-hover:text-cyan-700 transition-colors duration-200">Pathways</div>
                </div>
                <div className="text-center cursor-pointer group transform hover:scale-110 transition-all duration-300 hover:rotate-2">
                  <div className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-yellow-300 transition-all duration-300 animate-pulse">
                    <Users className="h-10 w-10" />
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-yellow-600 to-orange-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300 font-mono tracking-wider">
                    +
                  </div>
                  <div className="text-gray-700 font-bold text-base group-hover:text-yellow-700 transition-colors duration-200">Career Paths</div>
                </div>
              </div>
            </div>
          </section>

          {/* Find Your Perfect Counselor Section - Desktop */}
          <section className="hidden md:block py-12 bg-white">
            <div className="container mx-auto px-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">👥 Find Your Perfect Counselor</h2>
                <p className="text-lg text-gray-600">
                  Connect with experienced education counselors who understand your unique journey and goals. Get personalized guidance for your university applications and career planning.
                </p>
              </div>
              
              {counselors.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading counselors...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {counselors.slice(0, 6).map((counselor) => (
                    <div key={counselor.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {counselor.name?.charAt(0) || 'C'}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-lg">{counselor.name}</h3>
                          <p className="text-gray-600 text-sm">{counselor.title}</p>
                          <div className="flex items-center text-yellow-500 mt-1">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm font-semibold ml-1">{counselor.rating}</span>
                            <span className="text-gray-500 text-sm ml-1">({counselor.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {(counselor.specializations || []).slice(0, 3).map((spec, idx) => (
                            <span key={idx} className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                              {spec}
                            </span>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="text-center">
                            <div className="font-semibold text-gray-900">{counselor.helped}</div>
                            <div className="text-gray-600">Students Helped</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-gray-900">{counselor.success}</div>
                            <div className="text-gray-600">Success Rate</div>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-600">
                          <strong>Languages:</strong> {(counselor.languages || []).join(', ')}
                        </div>
                        
                        <div className="flex space-x-2 pt-4">
                          <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                            Message
                          </button>
                          <button className="flex-1 border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium">
                            Connect
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="text-center">
                <button 
                  onClick={() => navigate('/counselor/directory')}
                  className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                >
                  View All Counselors →
                </button>
              </div>
            </div>
          </section>

          {/* Find Your Perfect Counselor Section - Mobile */}
          <section className="block md:hidden py-12 bg-white">
            <div className="container mx-auto px-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Find Your Perfect Counselor</h2>
                <p className="text-lg text-gray-600">
                  Connect with expert counselors who understand your journey
                </p>
              </div>
              
              {counselors.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Failed to load counselors</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
                    {counselors.map((counselor) => (
                      <div key={counselor.id} className="flex-shrink-0 w-72 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                        <div className="p-4">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {counselor.name?.charAt(0) || 'C'}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 text-sm">{counselor.name}</h3>
                              <p className="text-gray-600 text-xs">{counselor.title}</p>
                            </div>
                            <div className="flex items-center text-yellow-500">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="text-sm font-semibold ml-1">{counselor.rating}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex flex-wrap gap-1">
                              {(counselor.specializations || []).map((spec, idx) => (
                                <div key={idx} className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold text-gray-700 border-gray-300">
                                  {spec}
                                </div>
                              ))}
                            </div>
                            
                            <p className="text-gray-600 text-xs line-clamp-2">
                              {counselor.description}
                            </p>
                            
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="flex items-center text-gray-600">
                                <Users className="h-3 w-3 mr-1" />
                                {counselor.studentsHelped} helped
                              </div>
                              <div className="flex items-center text-green-600">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                {counselor.successRate}% success
                              </div>
                            </div>
                            
                            <div className="text-xs text-gray-600">
                              <span className="font-medium">Languages: </span>
                              {(counselor.languages || []).join(", ")}
                            </div>
                            
                            <div className="flex space-x-2 pt-2">
                              <button className="flex-1 px-3 py-2 text-xs font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-md">
                                Message
                              </button>
                              <button className="flex-1 px-3 py-2 text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-md">
                                Connect
                              </button>
                            </div>
                            
                            {isAdmin && (
                              <div className="text-center pt-2 border-t">
                                <span className="text-sm font-bold text-gray-900">
                                  ${counselor.price}
                                </span>
                                <span className="text-xs text-gray-600 ml-1">
                                  /{counselor.currency}/hour
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="text-center mt-6">
                <button 
                  onClick={() => navigate('/counselor/directory')}
                  className="inline-flex items-center rounded-full border px-6 py-3 text-sm font-semibold border-orange-300 text-orange-700 hover:bg-orange-50"
                >
                  View All Counselors →
                </button>
              </div>
            </div>
          </section>

          {/* Featured Universities Section - Mobile */}
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Universities</h2>
                <p className="text-lg text-gray-600">
                  Explore top-ranked universities worldwide
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {featuredUniversities.slice(0, 3).map((university) => (
                  <div key={university.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-purple-100 text-purple-700">
                          {university.category}
                        </div>
                        <div className="flex items-center text-yellow-600">
                          <Star className="h-4 w-4 mr-1 fill-current" />
                          <span className="text-sm font-semibold">{university.globalRanking}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{university.name}</h3>
                      <p className="text-gray-600 mb-4">{university.description}</p>
                      
                      <button 
                        onClick={() => navigate(`/university/${university.id}`)}
                        className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 h-9 px-3"
                      >
                        View Courses →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <button 
                  onClick={() => navigate('/universities')}
                  className="inline-flex items-center rounded-full border px-6 py-3 text-sm font-semibold border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  View All Universities →
                </button>
              </div>
            </div>
          </section>
          
        </div>
      )}
      
      {/* CSS-based Mobile Counselor Section - Always rendered, shown only on mobile */}
      <div className="block md:hidden bg-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Find Your Perfect Counselor</h2>
            <p className="text-lg text-gray-600">
              Connect with expert counselors who understand your journey
            </p>
          </div>
          
          {counselors.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Failed to load counselors</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
                {counselors.map((counselor) => (
                  <div key={counselor.id} className="flex-shrink-0 w-72 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {counselor.name?.charAt(0) || 'C'}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm">{counselor.name}</h3>
                          <p className="text-gray-600 text-xs">{counselor.title}</p>
                        </div>
                        <div className="flex items-center text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm font-semibold ml-1">{counselor.rating}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {(counselor.specializations || []).map((spec, idx) => (
                            <div key={idx} className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold text-gray-700 border-gray-300">
                              {spec}
                            </div>
                          ))}
                        </div>
                        
                        <p className="text-gray-600 text-xs line-clamp-2">
                          {counselor.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center text-gray-600">
                            <Users className="h-3 w-3 mr-1" />
                            {counselor.studentsHelped} helped
                          </div>
                          <div className="flex items-center text-green-600">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {counselor.successRate}% success
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-600">
                          <span className="font-medium">Languages: </span>
                          {(counselor.languages || []).join(", ")}
                        </div>
                        
                        <div className="flex space-x-2 pt-2">
                          <button className="flex-1 px-3 py-2 text-xs font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-md">
                            Message
                          </button>
                          <button className="flex-1 px-3 py-2 text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-md">
                            Connect
                          </button>
                        </div>
                        
                        {isAdmin && (
                          <div className="text-center pt-2 border-t">
                            <span className="text-sm font-bold text-gray-900">
                              ${counselor.price}
                            </span>
                            <span className="text-xs text-gray-600 ml-1">
                              /{counselor.currency}/hour
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="text-center mt-6">
            <button 
              onClick={() => navigate('/counselor/directory')}
              className="inline-flex items-center rounded-full border px-6 py-3 text-sm font-semibold border-orange-300 text-orange-700 hover:bg-orange-50"
            >
              View All Counselors →
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default HomePageEnhanced
