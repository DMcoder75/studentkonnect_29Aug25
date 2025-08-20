import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Globe, GraduationCap, BookOpen, TrendingUp, Users, Star, Target, ArrowRight } from 'lucide-react'
import Sidebar from './Sidebar'
import { realDatabaseService } from '../services/realDatabaseService'

export default function HomePageExact() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalCountries: 8,
    totalUniversities: 850,
    totalCourses: 8500,
    totalPathways: 5000,
    totalCareerPaths: 100
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await realDatabaseService.getStatistics()
        setStats({
          totalCountries: data.countries || 8,
          totalUniversities: data.universities || 866,
          totalCourses: data.courses || 1000,
          totalPathways: data.pathways || 2400,
          totalCareerPaths: 100
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section - Full Width */}
      <section 
        className="relative text-white py-20 overflow-hidden"
        style={{
          backgroundImage: `url('/HeroUniPathway.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.8) 0%, rgba(79, 70, 229, 0.8) 50%, rgba(59, 130, 246, 0.8) 100%)'
          }}
        ></div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Find Your Perfect
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-300">
            Global University
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-100">
            Discover your ideal university course through personalized pathways worldwide. Connect your passions with career 
            opportunities at top universities globally.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/pathways')}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold text-lg btn-enhanced ripple-effect glow-effect animate-fade-in-up animate-delay-300"
            >
              Explore Pathways →
            </button>
            
            <button 
              onClick={() => navigate('/global/universities')}
              className="border-2 border-white text-white hover:bg-white hover:text-purple-700 px-8 py-3 rounded-lg font-semibold text-lg btn-enhanced ripple-effect animate-fade-in-up animate-delay-400"
            >
              Browse Universities
            </button>
          </div>
        </div>
      </section>

      {/* Content Section with Sidebar */}
      <div className="flex">
        <Sidebar 
          isOpen={true}
          onClose={() => {}}
          isHomepage={true}
        />
        
        <main className="flex-1">

          {/* Global Education Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  🌸 Global Education at Your Fingertips 🌸
                </h2>
                <p className="text-xl text-gray-600">
                  Discover endless possibilities across the world
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {/* Countries Card */}
                <div className="text-center cursor-pointer group transform hover:scale-110 transition-all duration-300 hover:rotate-2">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-green-300 transition-all duration-300 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe h-10 w-10" aria-hidden="true">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                      <path d="M2 12h20"></path>
                    </svg>
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300 font-mono tracking-wider">{stats.totalCountries}+</div>
                  <div className="text-gray-700 font-bold text-base group-hover:text-green-700 transition-colors duration-200">Countries</div>
                </div>

                {/* Universities Card */}
                <div className="text-center cursor-pointer group transform hover:scale-110 transition-all duration-300 hover:-rotate-2">
                  <div className="bg-gradient-to-br from-purple-500 to-violet-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-purple-300 transition-all duration-300 animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap h-10 w-10" aria-hidden="true">
                      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
                      <path d="M22 10v6"></path>
                      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
                    </svg>
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-violet-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300 font-mono tracking-wider">{stats.totalUniversities}+</div>
                  <div className="text-gray-700 font-bold text-base group-hover:text-purple-700 transition-colors duration-200">Universities</div>
                </div>

                {/* Courses Card */}
                <div className="text-center cursor-pointer group transform hover:scale-110 transition-all duration-300 hover:rotate-1">
                  <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-pink-300 transition-all duration-300 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open h-10 w-10" aria-hidden="true">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-pink-600 to-rose-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300 font-mono tracking-wider">{stats.totalCourses}+</div>
                  <div className="text-gray-700 font-bold text-base group-hover:text-pink-700 transition-colors duration-200">Courses</div>
                </div>

                {/* Pathways Card */}
                <div className="text-center cursor-pointer group transform hover:scale-110 transition-all duration-300 hover:-rotate-1">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-blue-300 transition-all duration-300 animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up h-10 w-10" aria-hidden="true">
                      <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"></polyline>
                      <polyline points="16,7 22,7 22,13"></polyline>
                    </svg>
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300 font-mono tracking-wider">{stats.totalPathways}+</div>
                  <div className="text-gray-700 font-bold text-base group-hover:text-blue-700 transition-colors duration-200">Pathways</div>
                </div>

                {/* Career Paths Card */}
                <div className="text-center cursor-pointer group transform hover:scale-110 transition-all duration-300 hover:rotate-2">
                  <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-2xl group-hover:shadow-orange-300 transition-all duration-300 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-10 w-10" aria-hidden="true">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300 font-mono tracking-wider">{stats.totalCareerPaths}+</div>
                  <div className="text-gray-700 font-bold text-base group-hover:text-orange-700 transition-colors duration-200">Career Paths</div>
                </div>
              </div>
            </div>
          </section>

          {/* Start Your Journey Section */}
          <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                🎯 🚀 Start Your Journey! 🍎
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
                Begin your educational adventure by connecting with expert counselors and exploring university 
                pathways. <span className="text-purple-600 font-semibold">Your future starts here!</span> ✨
              </p>
              
              <div className="bg-yellow-100 rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center">
                <div className="w-16 h-16 bg-yellow-300 rounded-full"></div>
              </div>
            </div>
          </section>

          {/* Find Your Perfect Counselor Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  👥 Find Your Perfect Counselor
                </h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                  Connect with experienced education counselors who understand your unique journey and goals. Get 
                  personalized guidance for your university applications and career planning.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Academic Counselor */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Academic Counselor</h3>
                    <div className="flex items-center justify-center mt-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">4.9 (14 reviews)</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-center mb-4">
                    Expert guidance for course selection and academic planning
                  </p>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Connect Now
                  </button>
                </div>

                {/* Academic Counselor 2 */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Academic Counselor</h3>
                    <div className="flex items-center justify-center mt-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">4.8 (12 reviews)</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-center mb-4">
                    Specialized in international university applications
                  </p>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Connect Now
                  </button>
                </div>

                {/* Career Counselor */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Career Counselor</h3>
                    <div className="flex items-center justify-center mt-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">4.7 (15 reviews)</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-center mb-4">
                    Career pathway planning and industry insights
                  </p>
                  <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors">
                    Connect Now
                  </button>
                </div>
              </div>
              
              <div className="text-center mt-12">
                <button 
                  onClick={() => navigate('/counselor/directory')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  View All Counselors
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

