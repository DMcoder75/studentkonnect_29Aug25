import React, { useState, useEffect } from 'react';
import { 
  User, 
  GraduationCap, 
  MapPin, 
  Calendar, 
  BookOpen, 
  Award, 
  Users, 
  TrendingUp,
  Clock,
  Star,
  ArrowRight,
  Target,
  Globe,
  Phone
} from 'lucide-react';
import onboardingService from '../services/onboardingService';

const PersonalizedDashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = () => {
      try {
        const profile = onboardingService.generateUserProfile();
        const recs = onboardingService.getPersonalizedRecommendations();
        
        setUserProfile(profile);
        setRecommendations(recs);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your personalized dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to YourUniPathway!</h2>
          <p className="text-gray-600 mb-6">
            Complete your profile setup to get personalized recommendations and guidance.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'universities': return <GraduationCap className="w-6 h-6" />;
      case 'courses': return <BookOpen className="w-6 h-6" />;
      case 'scholarships': return <Award className="w-6 h-6" />;
      case 'counseling': return <Users className="w-6 h-6" />;
      case 'application_assistance': return <Target className="w-6 h-6" />;
      default: return <Star className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {userProfile.personalInfo.firstName}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Your personalized study abroad journey continues here
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Journey Progress</p>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full w-1/4"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">25%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {userProfile.personalInfo.firstName}
                  </h3>
                  <p className="text-gray-600 capitalize">
                    {userProfile.personalInfo.userType}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Degree Goal</p>
                    <p className="font-medium capitalize">{userProfile.academicGoals.degreeType}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Target Start</p>
                    <p className="font-medium">
                      {userProfile.timeline.startIntake} {userProfile.timeline.startYear}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Preferred Countries</p>
                    <p className="font-medium">
                      {userProfile.academicGoals.studyCountries.join(', ') || 'Not specified'}
                    </p>
                  </div>
                </div>

                {userProfile.currentStatus.currentGrade && (
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Current Grade</p>
                      <p className="font-medium">
                        {userProfile.currentStatus.currentGrade} - {userProfile.currentStatus.schoolBoard}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium">
                      {userProfile.personalInfo.countryCode} {userProfile.personalInfo.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Journey Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">0</div>
                  <div className="text-sm text-gray-600">Applications</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-gray-600">Universities Saved</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-sm text-gray-600">Scholarships Found</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">1</div>
                  <div className="text-sm text-gray-600">Profile Complete</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Recommendations and Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personalized Recommendations */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recommended for You
                </h3>
                <TrendingUp className="w-5 h-5 text-orange-500" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.slice(0, 4).map((rec, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
                    onClick={() => window.location.href = rec.action}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                          {getRecommendationIcon(rec.type)}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                            {rec.title}
                          </h4>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                            {rec.priority}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                    </div>
                    <p className="text-sm text-gray-600">{rec.description}</p>
                  </div>
                ))}
              </div>

              {recommendations.length > 4 && (
                <div className="mt-4 text-center">
                  <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                    View All Recommendations ({recommendations.length})
                  </button>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group">
                  <BookOpen className="w-8 h-8 text-gray-400 group-hover:text-orange-500 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
                    Explore Courses
                  </div>
                </button>

                <button className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group">
                  <GraduationCap className="w-8 h-8 text-gray-400 group-hover:text-orange-500 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
                    Find Universities
                  </div>
                </button>

                <button className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group">
                  <Users className="w-8 h-8 text-gray-400 group-hover:text-orange-500 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
                    Connect with Counselors
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Profile setup completed
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(userProfile.metadata.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Welcome to YourUniPathway!
                    </p>
                    <p className="text-xs text-gray-500">
                      Start exploring universities and courses
                    </p>
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

export default PersonalizedDashboard;

