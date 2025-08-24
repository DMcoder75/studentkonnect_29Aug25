import React, { useState, useEffect } from 'react';
import { Star, Heart, MapPin, Users, Award, Clock, MessageCircle, Phone } from 'lucide-react';
import realDatabaseService from '../services/realDatabaseService';

const HomePageFixed = () => {
  const [counselors, setCounselors] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      console.log('🔄 HomePageFixed: Starting data load...');
      
      try {
        // Load counselors
        console.log('📞 Loading counselors...');
        const counselorResponse = await realDatabaseService.getAllCounselors();
        console.log('📞 Counselor response:', counselorResponse);
        
        if (counselorResponse.data) {
          console.log('📞 Raw counselor data:', counselorResponse.data);
          console.log('📞 First counselor:', counselorResponse.data[0]);
          
          const transformedCounselors = counselorResponse.data.slice(0, 6).map(c => {
            const transformed = {
              id: c.id,
              name: c.users ? `${c.users.first_name} ${c.users.last_name}` : c.display_name,
              type: c.counselor_type || 'Education Counselor',
              location: c.location || 'Global',
              rating: c.average_rating || 4.8,
              reviews: c.total_reviews || 50,
              specializations: c.specializations ? c.specializations.split(',').slice(0, 2) : ['university_admissions'],
              image: c.profile_image_url || '/api/placeholder/64/64'
            };
            console.log(`📞 Transformed counselor ${c.id}:`, transformed);
            return transformed;
          });
          
          console.log('📞 Final transformed counselors:', transformedCounselors);
          setCounselors(transformedCounselors);
        } else {
          console.error('❌ No counselor data received');
        }

        // Load universities
        console.log('🏫 Loading universities...');
        const uniResponse = await realDatabaseService.getAllUniversities();
        console.log('🏫 University response:', uniResponse);
        
        if (uniResponse.data) {
          console.log('🏫 Raw university data:', uniResponse.data);
          console.log('🏫 First university:', uniResponse.data[0]);
          
          const transformedUnis = uniResponse.data.slice(0, 6).map(u => {
            const transformed = {
              id: u.id,
              name: u.university_name,
              type: u.university_type || 'University',
              location: `${u.city || 'Unknown'}, ${u.state || u.country || ''}`,
              rating: 4.5,
              ranking: u.national_ranking || 'N/A'
            };
            console.log(`🏫 Transformed university ${u.id}:`, transformed);
            return transformed;
          });
          
          console.log('🏫 Final transformed universities:', transformedUnis);
          setUniversities(transformedUnis);
        } else {
          console.error('❌ No university data received');
        }
        
      } catch (error) {
        console.error('❌ Error loading data:', error);
        console.error('❌ Error stack:', error.stack);
      } finally {
        console.log('✅ Data loading complete, setting loading to false');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Find Your Perfect<br />
              <span className="text-yellow-300">Global University</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Discover your ideal university course through personalized pathways worldwide. 
              Connect your passions with career opportunities at top universities globally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
                Explore Pathways
              </button>
              <button className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-full font-semibold transition-colors">
                Browse Universities
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/10 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              🌟 Global Education at Your Fingertips 🌟
            </h2>
            <p className="text-white/90">Discover endless possibilities across the world</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { number: '8+', label: 'Countries', color: 'bg-green-500' },
              { number: '850+', label: 'Universities', color: 'bg-purple-500' },
              { number: '8500+', label: 'Courses', color: 'bg-pink-500' },
              { number: '5000+', label: 'Pathways', color: 'bg-blue-500' },
              { number: '100+', label: 'Career Paths', color: 'bg-orange-500' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-2xl">🎓</span>
                </div>
                <div className="text-2xl font-bold text-white">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Counselors Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              👥 Find Your Perfect Counselor
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with experienced education counselors who understand your unique journey and goals. 
              Get personalized guidance for your university applications and career planning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {counselors.map((counselor) => (
              <div key={counselor.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {counselor.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">{counselor.name}</h3>
                    <p className="text-sm text-gray-600">{counselor.type}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">{counselor.rating}</span>
                  <span className="ml-1 text-sm text-gray-500">({counselor.reviews} reviews)</span>
                </div>
                
                <div className="flex items-center mb-4">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="ml-1 text-sm text-gray-600">{counselor.location}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {counselor.specializations.map((spec, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                      {spec.replace('_', ' ')}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    <MessageCircle className="w-4 h-4 inline mr-1" />
                    Message
                  </button>
                  <button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
              View All Counselors →
            </button>
          </div>
        </div>
      </div>

      {/* Universities Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Universities</h2>
            <p className="text-gray-600">Explore top-ranked universities and discover the programs that align with your career goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {universities.map((university) => (
              <div key={university.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      {university.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">{university.name}</h3>
                      <p className="text-sm text-gray-600">{university.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="ml-1 text-sm text-gray-600">{university.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{university.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">Ranking: {university.ranking}</span>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                      View Details
                    </button>
                    <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
              View All Universities →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageFixed;

