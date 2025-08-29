import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
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
  Flag,
  Target,
  BarChart3
} from 'lucide-react';

const PathwayDetailPageEnhanced = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [pathway, setPathway] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [globalStats, setGlobalStats] = useState({});
  const [topCountries, setTopCountries] = useState([]);
  const [topUniversities, setTopUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPathwayDetails();
  }, [id]);

  const fetchPathwayDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch pathway details from database
      const { data: pathwayData, error: pathwayError } = await supabase
        .from('pathways')
        .select('*')
        .eq('id', id)
        .single();

      if (pathwayError) {
        throw new Error(`Pathway not found: ${pathwayError.message}`);
      }

      setPathway(pathwayData);

      // Fetch global data to enrich the pathway
      await fetchGlobalData(pathwayData);

    } catch (err) {
      console.error('Error fetching pathway:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchGlobalData = async (pathwayData) => {
    try {
      console.log('🔍 Fetching real global data from database...');
      
      // Get pathway-related keywords for filtering
      const pathwayKeywords = pathwayData.name.toLowerCase().split(' ');
      
      // Fetch real countries and count programs separately (more reliable approach)
      const { data: countriesData, error: countriesError } = await supabase
        .from('n_countries')
        .select('country_id, country_name')
        .limit(8);

      if (countriesError) {
        console.error('Error fetching countries:', countriesError);
        setTopCountries([]);
      } else {
        console.log('✅ Real countries data:', countriesData);
        
        // For each country, count the programs
        const countriesWithCounts = await Promise.all(
          countriesData.map(async (country) => {
            try {
              // Count programs for this country by joining universities and courses
              const { data: programsData, error: programsError } = await supabase
                .from('new_universities')
                .select(`
                  id,
                  new_courses(id)
                `)
                .eq('country_id', country.country_id);

              if (programsError) {
                console.error(`Error counting programs for ${country.country_name}:`, programsError);
                return {
                  ...country,
                  program_count: 0
                };
              }

              // Count total courses across all universities in this country
              const totalPrograms = programsData?.reduce((total, uni) => {
                return total + (uni.new_courses?.length || 0);
              }, 0) || 0;

              console.log(`📊 ${country.country_name}: ${totalPrograms} programs`);

              return {
                ...country,
                program_count: totalPrograms
              };
            } catch (error) {
              console.error(`Error processing ${country.country_name}:`, error);
              return {
                ...country,
                program_count: 0
              };
            }
          })
        );
        
        setTopCountries(countriesWithCounts);
      }

      // Fetch real universities with country information
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
        console.error('Error fetching universities:', universitiesError);
      } else {
        console.log('✅ Real universities data:', universitiesData);
        // Transform the data to match expected format
        const transformedUniversities = universitiesData?.map(uni => ({
          id: uni.id,
          university_name: uni.university_name,
          city: uni.city,
          country_name: uni.n_countries?.country_name
        })) || [];
        setTopUniversities(transformedUniversities);
      }

      // Get real global statistics
      const { data: statsData, error: statsError } = await supabase
        .rpc('get_global_stats');

      if (statsError) {
        console.error('Error fetching global stats:', statsError);
        // Fallback to counting manually
        const [countriesCount, universitiesCount, coursesCount] = await Promise.all([
          supabase.from('n_countries').select('country_id', { count: 'exact', head: true }),
          supabase.from('new_universities').select('id', { count: 'exact', head: true }),
          supabase.from('new_courses').select('id', { count: 'exact', head: true })
        ]);

        setGlobalStats({
          countries: countriesCount.count || 8,
          universities: universitiesCount.count || 866,
          courses: coursesCount.count || 15162
        });
      } else {
        setGlobalStats(statsData || {
          countries: 8,
          universities: 866,
          courses: 15162
        });
      }

      // Create mock related courses based on pathway (this can stay as mock for now)
      const mockCourses = generateMockCourses(pathwayData.name, pathwayKeywords);
      console.log('🔍 Generated mock courses:', mockCourses.length, mockCourses);
      setRelatedCourses(mockCourses);

      console.log('✅ Global data loaded successfully');
    } catch (err) {
      console.error('Error fetching global data:', err);
      // Fallback to mock data if database fails
      setTopCountries([
        { country_id: 1, country_name: 'Canada' },
        { country_id: 2, country_name: 'Australia' },
        { country_id: 3, country_name: 'United Kingdom' },
        { country_id: 4, country_name: 'United States' },
        { country_id: 5, country_name: 'Germany' },
        { country_id: 6, country_name: 'Netherlands' }
      ]);
      
      setTopUniversities([
        { id: 1, university_name: 'University of Toronto', city: 'Toronto', country_name: 'Canada' },
        { id: 2, university_name: 'University of Melbourne', city: 'Melbourne', country_name: 'Australia' },
        { id: 3, university_name: 'Oxford University', city: 'Oxford', country_name: 'United Kingdom' },
        { id: 4, university_name: 'Harvard University', city: 'Cambridge', country_name: 'United States' },
        { id: 5, university_name: 'Technical University of Munich', city: 'Munich', country_name: 'Germany' },
        { id: 6, university_name: 'University of Amsterdam', city: 'Amsterdam', country_name: 'Netherlands' }
      ]);

      setGlobalStats({
        countries: 8,
        universities: 866,
        courses: 15162
      });
    }
  };

  const generateCourseSlug = (courseName) => {
    return courseName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  };

  const getPathwayCategory = (pathwayName) => {
    const name = pathwayName.toLowerCase();
    if (name.includes('medicine') || name.includes('health')) return 'medicine';
    if (name.includes('engineering') || name.includes('technology')) return 'engineering';
    if (name.includes('business') || name.includes('commerce')) return 'business';
    if (name.includes('law') || name.includes('legal')) return 'law';
    if (name.includes('education') || name.includes('teaching')) return 'education';
    if (name.includes('arts') || name.includes('creative')) return 'arts';
    if (name.includes('science') || name.includes('research')) return 'science';
    return 'general';
  };

  const generateMockCourses = (pathwayName, keywords) => {
    const courseTemplates = {
      'medicine': [
        { name: 'Bachelor of Medicine, Bachelor of Surgery (MBBS)', level: 'Undergraduate', duration: '6 years' },
        { name: 'Doctor of Medicine (MD)', level: 'Graduate', duration: '4 years' },
        { name: 'Bachelor of Nursing', level: 'Undergraduate', duration: '3 years' },
        { name: 'Master of Public Health', level: 'Postgraduate', duration: '2 years' },
        { name: 'Bachelor of Pharmacy', level: 'Undergraduate', duration: '4 years' },
        { name: 'Master of Physiotherapy', level: 'Postgraduate', duration: '2 years' },
        { name: 'Bachelor of Biomedical Science', level: 'Undergraduate', duration: '3 years' },
        { name: 'Doctor of Pharmacy (PharmD)', level: 'Graduate', duration: '4 years' }
      ],
      'engineering': [
        { name: 'Bachelor of Engineering (Civil)', level: 'Undergraduate', duration: '4 years' },
        { name: 'Master of Engineering (Software)', level: 'Postgraduate', duration: '2 years' },
        { name: 'Bachelor of Computer Science', level: 'Undergraduate', duration: '4 years' },
        { name: 'Master of Information Technology', level: 'Postgraduate', duration: '2 years' },
        { name: 'Bachelor of Mechanical Engineering', level: 'Undergraduate', duration: '4 years' },
        { name: 'Master of Data Science', level: 'Postgraduate', duration: '2 years' },
        { name: 'Bachelor of Electrical Engineering', level: 'Undergraduate', duration: '4 years' },
        { name: 'Master of Cybersecurity', level: 'Postgraduate', duration: '2 years' }
      ],
      'business': [
        { name: 'Bachelor of Business Administration', level: 'Undergraduate', duration: '3 years' },
        { name: 'Master of Business Administration (MBA)', level: 'Postgraduate', duration: '2 years' },
        { name: 'Bachelor of Commerce', level: 'Undergraduate', duration: '3 years' },
        { name: 'Master of Finance', level: 'Postgraduate', duration: '2 years' },
        { name: 'Bachelor of Economics', level: 'Undergraduate', duration: '3 years' },
        { name: 'Master of Marketing', level: 'Postgraduate', duration: '2 years' },
        { name: 'Bachelor of Accounting', level: 'Undergraduate', duration: '3 years' },
        { name: 'Master of International Business', level: 'Postgraduate', duration: '2 years' }
      ],
      'law': [
        { name: 'Bachelor of Laws (LLB)', level: 'Undergraduate', duration: '3 years' },
        { name: 'Juris Doctor (JD)', level: 'Graduate', duration: '3 years' },
        { name: 'Master of Laws (LLM)', level: 'Postgraduate', duration: '1 year' },
        { name: 'Bachelor of Legal Studies', level: 'Undergraduate', duration: '3 years' },
        { name: 'Master of International Law', level: 'Postgraduate', duration: '2 years' },
        { name: 'Bachelor of Criminology', level: 'Undergraduate', duration: '3 years' },
        { name: 'Master of Commercial Law', level: 'Postgraduate', duration: '2 years' },
        { name: 'Graduate Diploma in Legal Practice', level: 'Graduate', duration: '1 year' }
      ]
    };

    let selectedCourses = [];
    
    if (pathwayName.toLowerCase().includes('medicine') || pathwayName.toLowerCase().includes('health')) {
      selectedCourses = courseTemplates.medicine;
    } else if (pathwayName.toLowerCase().includes('engineering') || pathwayName.toLowerCase().includes('technology')) {
      selectedCourses = courseTemplates.engineering;
    } else if (pathwayName.toLowerCase().includes('business') || pathwayName.toLowerCase().includes('commerce')) {
      selectedCourses = courseTemplates.business;
    } else if (pathwayName.toLowerCase().includes('law') || pathwayName.toLowerCase().includes('legal')) {
      selectedCourses = courseTemplates.law;
    } else {
      selectedCourses = courseTemplates.business; // Default
    }

    const universities = [
      { name: 'University of Toronto', city: 'Toronto', country: 'Canada' },
      { name: 'University of Melbourne', city: 'Melbourne', country: 'Australia' },
      { name: 'Oxford University', city: 'Oxford', country: 'United Kingdom' },
      { name: 'Harvard University', city: 'Cambridge', country: 'United States' },
      { name: 'Technical University of Munich', city: 'Munich', country: 'Germany' },
      { name: 'University of Amsterdam', city: 'Amsterdam', country: 'Netherlands' },
      { name: 'University of Sydney', city: 'Sydney', country: 'Australia' },
      { name: 'Stanford University', city: 'Stanford', country: 'United States' }
    ];

    return selectedCourses.map((course, index) => ({
      id: index + 1,
      program_name: course.name,
      level: course.level,
      duration: course.duration,
      university_name: universities[index % universities.length].name,
      city: universities[index % universities.length].city,
      country_name: universities[index % universities.length].country,
      category: pathwayName
    }));
  };

  const getFieldColor = (pathwayName) => {
    const name = pathwayName.toLowerCase();
    if (name.includes('business') || name.includes('accounting') || name.includes('finance') || name.includes('commerce')) {
      return 'from-blue-600 to-blue-800';
    }
    if (name.includes('engineering') || name.includes('technology')) {
      return 'from-purple-600 to-purple-800';
    }
    if (name.includes('health') || name.includes('medical') || name.includes('nursing') || name.includes('medicine')) {
      return 'from-green-600 to-green-800';
    }
    if (name.includes('education') || name.includes('teaching')) {
      return 'from-orange-600 to-orange-800';
    }
    if (name.includes('arts') || name.includes('creative') || name.includes('design')) {
      return 'from-pink-600 to-pink-800';
    }
    if (name.includes('law') || name.includes('legal')) {
      return 'from-indigo-600 to-indigo-800';
    }
    if (name.includes('science') || name.includes('research')) {
      return 'from-teal-600 to-teal-800';
    }
    return 'from-gray-600 to-gray-800';
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
              <ArrowLeft className="h-5 w-5 mr-2" />
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
          <div className="h-full bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              {/* Logo */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SK</span>
                </div>
                <span className="font-semibold text-gray-900">StudentKonnect</span>
              </div>
              
              {/* Navigation Menu */}
              <nav className="space-y-1">
                <div>
                  <a href="/" className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors bg-purple-100 text-purple-700">
                    <div className="flex items-center space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      </svg>
                      <span>Home</span>
                    </div>
                  </a>
                </div>

                {/* Student-specific menu items */}
                {isAuthenticated && user?.role === 'student' && (
                  <>
                    <div>
                      <a href="/student/profile" className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                        <div className="flex items-center space-x-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          <span>My Profile</span>
                        </div>
                      </a>
                    </div>
                    
                    <div>
                      <a href="/student/dashboard" className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                        <div className="flex items-center space-x-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                            <path d="M18 17V9"></path>
                            <path d="M13 17V5"></path>
                            <path d="M8 17v-3"></path>
                          </svg>
                          <span>My Dashboard</span>
                        </div>
                      </a>
                    </div>
                    
                    <div>
                      <a href="/student/applications" className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                        <div className="flex items-center space-x-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                          </svg>
                          <span>My Applications</span>
                        </div>
                      </a>
                    </div>

                    <div>
                      <a href="/counselor-directory" className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                        <div className="flex items-center space-x-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <polyline points="16 11 18 13 22 9"></polyline>
                          </svg>
                          <span>Find Counselor</span>
                        </div>
                        <div className="ml-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="m9 18 6-6-6-6"></path>
                          </svg>
                        </div>
                      </a>
                    </div>

                    <div>
                      <a href="/student/connections" className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                        <div className="flex items-center space-x-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                          </svg>
                          <span>My Connections</span>
                          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded-full">0</span>
                        </div>
                      </a>
                    </div>

                    <div>
                      <a href="/student/forums" className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                        <div className="flex items-center space-x-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                          </svg>
                          <span>Student Forums</span>
                        </div>
                      </a>
                    </div>

                    <div>
                      <a href="/alumni" className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                        <div className="flex items-center space-x-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                          </svg>
                          <span>Alumni Network</span>
                        </div>
                      </a>
                    </div>

                    <div>
                      <a href="/travel-help" className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                        <div className="flex items-center space-x-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
                          </svg>
                          <span>Travel Help</span>
                        </div>
                      </a>
                    </div>

                    <div>
                      <a href="/accommodation" className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                        <div className="flex items-center space-x-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                            <path d="M10 6h4"></path>
                            <path d="M10 10h4"></path>
                            <path d="M10 14h4"></path>
                            <path d="M10 18h4"></path>
                          </svg>
                          <span>Accommodation Help</span>
                        </div>
                      </a>
                    </div>
                  </>
                )}

                {/* Counselor-specific menu items */}
                {isAuthenticated && user?.role === 'counselor' && (
                  <>
                    <div>
                      <a href="/counselor/dashboard" className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                        <div className="flex items-center space-x-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                            <path d="M18 17V9"></path>
                            <path d="M13 17V5"></path>
                            <path d="M8 17v-3"></path>
                          </svg>
                          <span>Counselor Dashboard</span>
                        </div>
                      </a>
                    </div>
                    
                    <div>
                      <a href="/counselor/students" className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                        <div className="flex items-center space-x-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          </svg>
                          <span>My Students</span>
                        </div>
                      </a>
                    </div>
                    
                    <div>
                      <a href="/counselor/profile" className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                        <div className="flex items-center space-x-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          <span>My Profile</span>
                        </div>
                      </a>
                    </div>
                  </>
                )}

                {/* Common menu items */}
                <div>
                  <a href="/global/universities" className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                    <div className="flex items-center space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                        <path d="M2 12h20"></path>
                      </svg>
                      <span>Global Education</span>
                    </div>
                    <div className="ml-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </div>
                  </a>
                </div>
                
                <div>
                  <a href="/australia-process" className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                    <div className="flex items-center space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
                        <path d="M22 10v6"></path>
                        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
                      </svg>
                      <span>Australia Process</span>
                    </div>
                    <div className="ml-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </div>
                  </a>
                </div>
                
                <div>
                  <a href="/career-insights" className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                    <div className="flex items-center space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                        <polyline points="16 7 22 7 22 13"></polyline>
                      </svg>
                      <span>Career Insights</span>
                    </div>
                  </a>
                </div>
                
                <div>
                  <a href="/smart-apply" className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                    <div className="flex items-center space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                        <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                        <path d="M10 9H8"></path>
                        <path d="M16 13H8"></path>
                        <path d="M16 17H8"></path>
                      </svg>
                      <span>Smart Apply</span>
                    </div>
                    <div className="ml-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </div>
                  </a>
                </div>
                
                <div>
                  <a href="/scholarships" className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                    <div className="flex items-center space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                        <circle cx="12" cy="8" r="6"></circle>
                      </svg>
                      <span>Scholarships Assist</span>
                    </div>
                    <div className="ml-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </div>
                  </a>
                </div>
                
                <div>
                  <a href="/visa-international" className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                    <div className="flex items-center space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                        <path d="M2 12h20"></path>
                      </svg>
                      <span>Visa & International Students</span>
                    </div>
                    <div className="ml-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </div>
                  </a>
                </div>
                
                <div>
                  <a href="/help" className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                    <div className="flex items-center space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <path d="M12 17h.01"></path>
                      </svg>
                      <span>Help & Resources</span>
                    </div>
                    <div className="ml-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </div>
                  </a>
                </div>

                {/* Logout - Moved to end */}
                {isAuthenticated && (
                  <div>
                    <button 
                      onClick={() => {/* Add logout handler */}}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        <span>Logout</span>
                      </div>
                    </button>
                  </div>
                )}
              </nav>

              {/* User Profile Section */}
              {isAuthenticated && user && (
                <div className="mt-8 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {user.name ? user.name.charAt(0).toLowerCase() : 'U'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.role === 'student' ? 'Student' : user.role === 'counselor' ? 'Counselor' : 'User'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold">{pathway.duration}</p>
                </div>
                <div className="text-center">
                  <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Related Courses</p>
                  <p className="font-semibold">{relatedCourses.length}+</p>
                </div>
                <div className="text-center">
                  <GraduationCap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Pathway ID</p>
                  <p className="font-semibold">#{pathway.id}</p>
                </div>
              </div>
            </div>

            {/* Study Progression */}
            {pathway.typical_progression && pathway.typical_progression.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Study Progression</h2>
                <div className="space-y-4">
                  {pathway.typical_progression.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-gray-900 font-medium">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top Study Destinations */}
            {topCountries.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Flag className="h-6 w-6 mr-2 text-blue-600" />
                  Top Study Destinations
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {topCountries.map((country) => (
                    <a 
                      key={country.country_id} 
                      href={`/global/universities?country=${encodeURIComponent(country.country_name)}`}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:border-blue-300 transition-colors cursor-pointer block"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Flag className="h-5 w-5 text-blue-600 mr-2" />
                          <h3 className="font-semibold text-gray-900">{country.country_name}</h3>
                        </div>
                        <span className="text-sm font-medium text-blue-600">
                          {country.program_count || 0} Programs
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Popular destination for {pathway.name.toLowerCase()}</p>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Related Courses */}
            {relatedCourses.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <BookOpen className="h-6 w-6 mr-2 text-green-600" />
                    Related Programs ({relatedCourses.length})
                  </h2>
                  <a 
                    href="/courses" 
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                  >
                    View All Programs
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedCourses.map((course) => {
                    const category = getPathwayCategory(pathway.name);
                    const courseSlug = generateCourseSlug(course.program_name);
                    const courseUrl = `/courses/${category}/${courseSlug}`;
                    
                    return (
                      <a 
                        key={course.id} 
                        href={courseUrl}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:border-green-300 transition-colors cursor-pointer block"
                      >
                        <h3 className="font-semibold text-gray-900 mb-2 hover:text-green-600">{course.program_name}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          <Building className="h-4 w-4 inline mr-1" />
                          {course.university_name}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 inline mr-1" />
                          {course.country_name}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">{course.level}</span>
                          <span className="text-sm text-gray-500">{course.duration}</span>
                        </div>
                        <div className="mt-2 text-xs text-gray-400">
                          {courseUrl}
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Country >> University >> Courses Hierarchy */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Globe className="h-6 w-6 mr-2 text-purple-600" />
                  Global Study Options
                </h2>
                <a 
                  href="/global/universities" 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                >
                  Explore Global Universities
                  <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </div>
              <div className="space-y-6">
                {topCountries.slice(0, 3).map((country) => {
                  const countryUniversities = topUniversities.filter(uni => uni.country_name === country.country_name);
                  const countryCourses = relatedCourses.filter(course => course.country_name === country.country_name);
                  
                  return (
                    <a 
                      key={country.country_id} 
                      href={`/global/universities?country=${encodeURIComponent(country.country_name)}`}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:border-purple-300 transition-colors cursor-pointer block"
                    >
                      <div className="flex items-center mb-4">
                        <Flag className="h-5 w-5 text-blue-600 mr-2" />
                        <h3 className="text-lg font-bold text-gray-900 hover:text-purple-600">{country.country_name}</h3>
                        <span className="ml-auto text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {countryCourses.length} Programs
                        </span>
                      </div>
                      
                      {countryUniversities.length > 0 && (
                        <div className="ml-6 space-y-3">
                          {countryUniversities.slice(0, 2).map((university) => {
                            const universityCourses = countryCourses.filter(course => 
                              course.university_name === university.university_name
                            );
                            
                            return (
                              <a 
                                key={university.id} 
                                href={`/university/${university.id}`}
                                className="border-l-2 border-gray-200 pl-4 hover:border-green-400 transition-colors cursor-pointer block"
                              >
                                <div className="flex items-center mb-2">
                                  <Building className="h-4 w-4 text-green-600 mr-2" />
                                  <h4 className="font-semibold text-gray-800 hover:text-green-600">{university.university_name}</h4>
                                  <span className="ml-auto text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                    {universityCourses.length} Programs
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">
                                  <MapPin className="h-3 w-3 inline mr-1" />
                                  {university.city}
                                </p>
                                
                                {universityCourses.length > 0 && (
                                  <div className="ml-4 space-y-2">
                                    {universityCourses.slice(0, 2).map((course) => (
                                      <div key={course.id} className="bg-gray-50 rounded p-3 hover:bg-gray-100 transition-colors">
                                        <h5 className="font-medium text-gray-900 text-sm mb-1">{course.program_name}</h5>
                                        <div className="flex justify-between items-center">
                                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">{course.level}</span>
                                          <span className="text-xs text-gray-500">{course.duration}</span>
                                        </div>
                                      </div>
                                    ))}
                                    {universityCourses.length > 2 && (
                                      <p className="text-xs text-gray-500 italic">
                                        +{universityCourses.length - 2} more programs available
                                      </p>
                                    )}
                                  </div>
                                )}
                              </a>
                            );
                          })}
                          {countryUniversities.length > 2 && (
                            <p className="text-sm text-gray-500 italic ml-4">
                              +{countryUniversities.length - 2} more universities in {country.country_name}
                            </p>
                          )}
                        </div>
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
            {/* Key Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Key Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <BookOpen className="h-5 w-5 text-purple-600 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Pathway Name</p>
                    <p className="font-medium">{pathway.name}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-medium">{pathway.duration}</p>
                  </div>
                </div>
                {pathway.general_pathway_id && (
                  <div className="flex items-start">
                    <Award className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">General Pathway</p>
                      <p className="font-medium">#{pathway.general_pathway_id}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Global Statistics Summary */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white mb-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Global Reach
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Available Countries</span>
                  <span className="font-bold">{globalStats.countries || 8}</span>
                </div>
                <div className="flex justify-between">
                  <span>Partner Universities</span>
                  <span className="font-bold">{globalStats.universities || 866}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Programs</span>
                  <span className="font-bold">{globalStats.courses || 15162}</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white text-center mb-6">
              <h3 className="text-lg font-bold mb-2">Ready to Start?</h3>
              <p className="text-sm mb-4 opacity-90">Get personalized guidance for this pathway</p>
              <Link 
                to="/counselor/directory"
                className="inline-block bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Find a Counselor
              </Link>
            </div>

            {/* Related Links */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Explore More</h3>
              <div className="space-y-3">
                <Link 
                  to="/pathways"
                  className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <p className="font-medium text-gray-900">All Pathways</p>
                  <p className="text-sm text-gray-600">Browse all available study pathways</p>
                </Link>
                <Link 
                  to="/global/universities"
                  className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <p className="font-medium text-gray-900">Global Universities</p>
                  <p className="text-sm text-gray-600">Explore universities worldwide</p>
                </Link>
                <Link 
                  to="/courses"
                  className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <p className="font-medium text-gray-900">Course Search</p>
                  <p className="text-sm text-gray-600">Find specific courses and programs</p>
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

export default PathwayDetailPageEnhanced;

