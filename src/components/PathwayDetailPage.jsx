import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  ArrowLeft, 
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
  CheckCircle
} from 'lucide-react';

const PathwayDetailPage = () => {
  const { id } = useParams();
  const [pathway, setPathway] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
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

      // Fetch related courses based on pathway name keywords
      const pathwayKeywords = pathwayData.name.toLowerCase().split(' ');
      
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select(`
          id,
          name,
          description,
          level,
          duration_months,
          annual_fees_min,
          annual_fees_max,
          university_id,
          universities (
            name,
            location
          )
        `)
        .limit(6);

      if (!coursesError && coursesData) {
        // Filter courses that match pathway keywords
        const filteredCourses = coursesData.filter(course => 
          pathwayKeywords.some(keyword => 
            course.name.toLowerCase().includes(keyword) ||
            (course.description && course.description.toLowerCase().includes(keyword))
          )
        );
        
        setRelatedCourses(filteredCourses.slice(0, 6));
      }

    } catch (err) {
      console.error('Error fetching pathway:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getFieldColor = (pathwayName) => {
    const name = pathwayName.toLowerCase();
    if (name.includes('business') || name.includes('accounting') || name.includes('finance')) {
      return 'from-blue-600 to-blue-800';
    }
    if (name.includes('engineering') || name.includes('technology')) {
      return 'from-purple-600 to-purple-800';
    }
    if (name.includes('health') || name.includes('medical') || name.includes('nursing')) {
      return 'from-green-600 to-green-800';
    }
    if (name.includes('education') || name.includes('teaching')) {
      return 'from-orange-600 to-orange-800';
    }
    if (name.includes('arts') || name.includes('creative') || name.includes('design')) {
      return 'from-pink-600 to-pink-800';
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
      {/* Hero Section */}
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Quick Stats */}
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

            {/* Pathway Progression */}
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

            {/* Related Courses */}
            {relatedCourses.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedCourses.map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <h3 className="font-semibold text-gray-900 mb-2">{course.name}</h3>
                      {course.universities && (
                        <p className="text-sm text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 inline mr-1" />
                          {course.universities.name}
                        </p>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{course.level}</span>
                        {course.annual_fees_min && (
                          <span className="text-sm font-medium text-green-600">
                            ${course.annual_fees_min.toLocaleString()}/year
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
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

            {/* CTA Button */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white text-center">
              <h3 className="text-lg font-bold mb-2">Ready to Start?</h3>
              <p className="text-sm mb-4 opacity-90">Get personalized guidance for this pathway</p>
              <Link 
                to="/counselor/directory"
                className="inline-block bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Find a Counselor
              </Link>
            </div>

            {/* Related Pathways */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
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
  );
};

export default PathwayDetailPage;

