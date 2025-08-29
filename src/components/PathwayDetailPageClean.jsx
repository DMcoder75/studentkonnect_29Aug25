import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import UnifiedLeftSidebar from './UnifiedLeftSidebar';
import { 
  ArrowLeft, 
  ArrowRight,
  MapPin, 
  Clock, 
  DollarSign, 
  GraduationCap, 
  Users, 
  Star,
  BookOpen,
  Calendar,
  Award,
  Globe,
  TrendingUp,
  CheckCircle,
  Building,
  Target,
  Flag
} from 'lucide-react';

const PathwayDetailPageClean = () => {
  const { id } = useParams();
  const { user, userRole, isAuthenticated } = useAuth();
  const [pathway, setPathway] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [topCountries, setTopCountries] = useState([]);
  const [topUniversities, setTopUniversities] = useState([]);
  const [globalStats, setGlobalStats] = useState({
    countries: 0,
    universities: 0,
    courses: 0
  });

  useEffect(() => {
    fetchPathwayData();
    fetchGlobalData();
  }, [id]);

  const fetchPathwayData = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('pathways')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setPathway(data);
      
      // Generate mock related courses based on pathway
      generateMockCourses(data);
      
    } catch (error) {
      console.error('Error fetching pathway:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchGlobalData = async () => {
    try {
      // Fetch real countries from n_countries table
      const { data: countriesData, error: countriesError } = await supabase
        .from('n_countries')
        .select('country_id, country_name')
        .limit(8);

      if (countriesError) {
        console.error('Countries query error:', countriesError);
      } else {
        console.log('✅ Real countries data:', countriesData);
        
        // Get program counts for each country
        const countriesWithCounts = await Promise.all(
          countriesData.map(async (country) => {
            try {
              const { count } = await supabase
                .from('new_courses')
                .select('id', { count: 'exact' })
                .eq('new_universities.country_id', country.country_id, { foreignTable: 'new_universities' });
              
              return {
                ...country,
                program_count: count || 0
              };
            } catch (error) {
              console.error(`Error counting programs for ${country.country_name}:`, error);
              return {
                ...country,
                program_count: 0
              };
            }
          })
        );
        
        setTopCountries(countriesWithCounts);
      }

      // Fetch real universities from new_universities table
      const { data: universitiesData, error: universitiesError } = await supabase
        .from('new_universities')
        .select(`
          id,
          university_name,
          city,
          n_countries!inner(country_name)
        `)
        .limit(8);

      if (universitiesError) {
        console.error('Universities query error:', universitiesError);
      } else {
        console.log('✅ Real universities data:', universitiesData);
        setTopUniversities(universitiesData);
      }

      // Get global statistics
      const [countriesCount, universitiesCount, coursesCount] = await Promise.all([
        supabase.from('n_countries').select('country_id', { count: 'exact' }),
        supabase.from('new_universities').select('id', { count: 'exact' }),
        supabase.from('new_courses').select('id', { count: 'exact' })
      ]);

      setGlobalStats({
        countries: countriesCount.count || 8,
        universities: universitiesCount.count || 866,
        courses: coursesCount.count || 15162
      });

    } catch (error) {
      console.error('Error fetching global data:', error);
      
      // Fallback to mock data
      setTopCountries([
        { country_id: 1, country_name: 'Canada', program_count: 2456 },
        { country_id: 2, country_name: 'Australia', program_count: 1890 },
        { country_id: 3, country_name: 'United Kingdom', program_count: 3245 },
        { country_id: 4, country_name: 'United States', program_count: 4567 },
        { country_id: 5, country_name: 'Germany', program_count: 2134 },
        { country_id: 6, country_name: 'Netherlands', program_count: 1678 }
      ]);
      
      setTopUniversities([
        { id: 1, university_name: 'University of Toronto', city: 'Toronto', n_countries: { country_name: 'Canada' } },
        { id: 2, university_name: 'University of Melbourne', city: 'Melbourne', n_countries: { country_name: 'Australia' } },
        { id: 3, university_name: 'Oxford University', city: 'Oxford', n_countries: { country_name: 'United Kingdom' } },
        { id: 4, university_name: 'Harvard University', city: 'Cambridge', n_countries: { country_name: 'United States' } }
      ]);
    }
  };

  const generateMockCourses = (pathwayData) => {
    const coursesByField = {
      'Medicine & Health Sciences': [
        { id: 1, name: 'Bachelor of Medicine, Bachelor of Surgery (MBBS)', level: 'Undergraduate', duration: '6 years', fees: '$75,000' },
        { id: 2, name: 'Bachelor of Biomedical Science', level: 'Undergraduate', duration: '3 years', fees: '$45,000' },
        { id: 3, name: 'Master of Public Health', level: 'Postgraduate', duration: '2 years', fees: '$55,000' },
        { id: 4, name: 'Doctor of Medicine (MD)', level: 'Postgraduate', duration: '4 years', fees: '$85,000' },
        { id: 5, name: 'Bachelor of Nursing', level: 'Undergraduate', duration: '3 years', fees: '$42,000' },
        { id: 6, name: 'Master of Physiotherapy', level: 'Postgraduate', duration: '2 years', fees: '$48,000' },
        { id: 7, name: 'Bachelor of Pharmacy', level: 'Undergraduate', duration: '4 years', fees: '$52,000' },
        { id: 8, name: 'Master of Clinical Psychology', level: 'Postgraduate', duration: '2 years', fees: '$58,000' }
      ],
      'Engineering & Technology': [
        { id: 9, name: 'Bachelor of Engineering (Software)', level: 'Undergraduate', duration: '4 years', fees: '$48,000' },
        { id: 10, name: 'Master of Engineering (Electrical)', level: 'Postgraduate', duration: '2 years', fees: '$52,000' },
        { id: 11, name: 'Bachelor of Computer Science', level: 'Undergraduate', duration: '3 years', fees: '$45,000' },
        { id: 12, name: 'Master of Data Science', level: 'Postgraduate', duration: '2 years', fees: '$55,000' },
        { id: 13, name: 'Bachelor of Civil Engineering', level: 'Undergraduate', duration: '4 years', fees: '$46,000' },
        { id: 14, name: 'Master of Cybersecurity', level: 'Postgraduate', duration: '2 years', fees: '$58,000' },
        { id: 15, name: 'Bachelor of Mechanical Engineering', level: 'Undergraduate', duration: '4 years', fees: '$47,000' },
        { id: 16, name: 'Master of Artificial Intelligence', level: 'Postgraduate', duration: '2 years', fees: '$62,000' }
      ],
      'Business & Commerce': [
        { id: 17, name: 'Bachelor of Business Administration', level: 'Undergraduate', duration: '3 years', fees: '$42,000' },
        { id: 18, name: 'Master of Business Administration (MBA)', level: 'Postgraduate', duration: '2 years', fees: '$65,000' },
        { id: 19, name: 'Bachelor of Commerce', level: 'Undergraduate', duration: '3 years', fees: '$40,000' },
        { id: 20, name: 'Master of Finance', level: 'Postgraduate', duration: '2 years', fees: '$58,000' },
        { id: 21, name: 'Bachelor of Economics', level: 'Undergraduate', duration: '3 years', fees: '$41,000' },
        { id: 22, name: 'Master of Marketing', level: 'Postgraduate', duration: '2 years', fees: '$52,000' },
        { id: 23, name: 'Bachelor of Accounting', level: 'Undergraduate', duration: '3 years', fees: '$39,000' },
        { id: 24, name: 'Master of International Business', level: 'Postgraduate', duration: '2 years', fees: '$56,000' }
      ],
      'Law & Legal Studies': [
        { id: 25, name: 'Bachelor of Laws (LLB)', level: 'Undergraduate', duration: '4 years', fees: '$48,000' },
        { id: 26, name: 'Juris Doctor (JD)', level: 'Postgraduate', duration: '3 years', fees: '$68,000' },
        { id: 27, name: 'Master of Laws (LLM)', level: 'Postgraduate', duration: '1 year', fees: '$45,000' },
        { id: 28, name: 'Bachelor of Legal Studies', level: 'Undergraduate', duration: '3 years', fees: '$42,000' },
        { id: 29, name: 'Master of International Law', level: 'Postgraduate', duration: '2 years', fees: '$52,000' },
        { id: 30, name: 'Bachelor of Criminology', level: 'Undergraduate', duration: '3 years', fees: '$40,000' },
        { id: 31, name: 'Master of Commercial Law', level: 'Postgraduate', duration: '2 years', fees: '$55,000' },
        { id: 32, name: 'Bachelor of Justice Studies', level: 'Undergraduate', duration: '3 years', fees: '$41,000' }
      ]
    };

    const courses = coursesByField[pathwayData?.name] || coursesByField['Medicine & Health Sciences'];
    console.log('Generated mock courses:', courses.length);
    setRelatedCourses(courses);
  };

  const getFieldColor = (fieldName) => {
    const colors = {
      'Medicine & Health Sciences': 'from-red-600 to-pink-600',
      'Engineering & Technology': 'from-blue-600 to-indigo-600',
      'Business & Commerce': 'from-green-600 to-emerald-600',
      'Law & Legal Studies': 'from-purple-600 to-violet-600',
      'Education & Teaching': 'from-yellow-600 to-orange-600',
      'Arts & Creative Industries': 'from-pink-600 to-rose-600',
      'Science & Research': 'from-cyan-600 to-blue-600',
      'Information Technology': 'from-indigo-600 to-purple-600'
    };
    return colors[fieldName] || 'from-gray-600 to-gray-700';
  };

  const generateCourseSlug = (courseName) => {
    return courseName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const getCategoryFromPathway = (pathwayName) => {
    const categoryMap = {
      'Medicine & Health Sciences': 'medicine',
      'Engineering & Technology': 'engineering',
      'Business & Commerce': 'business',
      'Law & Legal Studies': 'law',
      'Education & Teaching': 'education',
      'Arts & Creative Industries': 'arts',
      'Science & Research': 'science',
      'Information Technology': 'technology'
    };
    return categoryMap[pathwayName] || 'general';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading pathway details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <Link to="/pathways" className="text-purple-600 hover:underline">
            ← Back to Pathways
          </Link>
        </div>
      </div>
    );
  }

  if (!pathway) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Pathway not found</p>
          <Link to="/pathways" className="text-purple-600 hover:underline">
            ← Back to Pathways
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full Width Hero Section - No Sidebar Here */}
      <div className={`relative h-96 bg-gradient-to-r ${getFieldColor(pathway.name)}`}>
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <Link 
              to="/pathways" 
              className="inline-flex items-center text-white hover:text-gray-200 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Pathways
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{pathway.name}</h1>
            <p className="text-xl text-gray-200 max-w-2xl">{pathway.description}</p>
          </div>
        </div>
      </div>

      {/* Content Area with Sidebar Layout - Starts AFTER Hero */}
      <div className="flex">
        {/* Left Sidebar - Only in Content Area */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <UnifiedLeftSidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Global Statistics */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Globe className="h-6 w-6 mr-2 text-blue-600" />
                    Global Opportunities
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <Flag className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">{globalStats.countries || 8}</p>
                      <p className="text-sm text-gray-600">Countries</p>
                    </div>
                    <div className="text-center">
                      <Building className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">{globalStats.universities || 866}</p>
                      <p className="text-sm text-gray-600">Universities</p>
                    </div>
                    <div className="text-center">
                      <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">{globalStats.courses || 15162}</p>
                      <p className="text-sm text-gray-600">Courses</p>
                    </div>
                    <div className="text-center">
                      <Target className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">{relatedCourses.length}</p>
                      <p className="text-sm text-gray-600">Related Programs</p>
                    </div>
                  </div>
                </div>

                {/* Pathway Overview */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Pathway Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Duration</p>
                        <p className="text-gray-600">3-8 years</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Fees Range</p>
                        <p className="text-gray-600">$35,000 - $85,000</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <GraduationCap className="h-5 w-5 text-purple-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Levels Available</p>
                        <p className="text-gray-600">Undergraduate, Postgraduate</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-orange-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Universities</p>
                        <p className="text-gray-600">200+ institutions</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Study Progression */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Study Progression</h2>
                  <div className="space-y-4">
                    {['Foundation Studies', 'Core Subjects', 'Specialization', 'Professional Practice'].map((stage, index) => (
                      <div key={index} className="flex items-center">
                        <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-gray-900">{stage}</p>
                          <p className="text-gray-600">Year {index + 1}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related Programs */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Related Programs ({relatedCourses.length})</h2>
                    <Link 
                      to="/courses"
                      className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      View All Programs
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {relatedCourses.slice(0, 6).map((course) => (
                      <Link
                        key={course.id}
                        to={`/courses/${getCategoryFromPathway(pathway.name)}/${generateCourseSlug(course.name)}`}
                        className="block p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
                      >
                        <h3 className="font-medium text-gray-900 mb-2">{course.name}</h3>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>{course.level}</span>
                          <span>{course.duration}</span>
                          <span>{course.fees}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Global Study Options */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Global Study Options</h2>
                    <Link 
                      to="/global/universities"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Explore Global Universities
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                  
                  {/* Top Study Destinations */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Study Destinations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {topCountries.slice(0, 6).map((country) => (
                        <Link
                          key={country.country_id}
                          to={`/global/universities?country=${encodeURIComponent(country.country_name)}`}
                          className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{country.country_name}</h4>
                              <p className="text-sm text-gray-600">{country.program_count || 0} Programs</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-gray-400" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Featured Universities */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Universities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {topUniversities.slice(0, 4).map((university) => (
                        <Link
                          key={university.id}
                          to={`/university/${university.id}`}
                          className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                        >
                          <h4 className="font-medium text-gray-900 mb-1">{university.university_name}</h4>
                          <p className="text-sm text-gray-600">
                            {university.city}, {university.n_countries?.country_name}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="lg:col-span-1">
                {/* Key Information */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Key Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-purple-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Pathway Name</p>
                        <p className="text-gray-600">{pathway.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Duration</p>
                        <p className="text-gray-600">3-8 years</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">General Pathway</p>
                        <p className="text-gray-600">#{pathway.id}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Global Reach */}
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-md p-6 text-white mb-6">
                  <h3 className="text-lg font-bold mb-4">Global Reach</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Available Countries</span>
                      <span className="font-bold">{globalStats.countries}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Partner Universities</span>
                      <span className="font-bold">{globalStats.universities}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Programs</span>
                      <span className="font-bold">{globalStats.courses}</span>
                    </div>
                  </div>
                </div>

                {/* Ready to Start */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Ready to Start?</h3>
                  <p className="text-gray-600 mb-4">
                    Get personalized guidance from our expert counselors to plan your educational journey.
                  </p>
                  <Link
                    to="/find-counselors"
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-center block"
                  >
                    Find a Counselor
                  </Link>
                </div>

                {/* Explore More */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Explore More</h3>
                  <div className="space-y-3">
                    <Link to="/pathways" className="block text-purple-600 hover:text-purple-700">
                      → All Pathways
                    </Link>
                    <Link to="/global/universities" className="block text-purple-600 hover:text-purple-700">
                      → Global Universities
                    </Link>
                    <Link to="/courses" className="block text-purple-600 hover:text-purple-700">
                      → Browse Courses
                    </Link>
                    <Link to="/scholarships" className="block text-purple-600 hover:text-purple-700">
                      → Scholarships
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathwayDetailPageClean;

