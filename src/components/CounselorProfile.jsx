import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Star, 
  Award, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';

const CounselorProfile = ({ isMobileMenuOpen, onMobileMenuClose }) => {
  const { user } = useAuth();
  const [counselorData, setCounselorData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get counselor data based on logged-in user
  const getCounselorData = (userEmail) => {
    const counselorProfiles = {
      'sarah.johnson@studentkonnect.com': {
        id: 1,
        name: 'Dr. Sarah Johnson',
        title: 'Senior Education Counselor',
        email: 'sarah.johnson@studentkonnect.com',
        phone: '+1 (555) 123-4567',
        location: 'Toronto, Canada',
        joinDate: '2020-03-15',
        specializations: ['Computer Science', 'Engineering', 'Technology'],
        experience: '8 years',
        rating: 4.9,
        totalStudents: 523,
        activeStudents: 18,
        successRate: 95.5,
        languages: ['English', 'French'],
        education: 'PhD in Educational Psychology, University of Toronto',
        certifications: ['Certified Education Counselor', 'International Student Advisor'],
        bio: 'Passionate about helping students achieve their academic dreams through personalized guidance and support.',
        achievements: [
          'Top Counselor 2023',
          '500+ Successful Placements',
          'Excellence in Student Support'
        ]
      },
      'michael.chen@studentkonnect.com': {
        id: 2,
        name: 'Dr. Michael Chen',
        title: 'Business & Commerce Specialist',
        email: 'michael.chen@studentkonnect.com',
        phone: '+1 (555) 234-5678',
        location: 'Vancouver, Canada',
        joinDate: '2019-08-20',
        specializations: ['Business Administration', 'Commerce', 'Economics'],
        experience: '10 years',
        rating: 4.8,
        totalStudents: 445,
        activeStudents: 15,
        successRate: 94.2,
        languages: ['English', 'Mandarin', 'Cantonese'],
        education: 'PhD in Business Administration, UBC',
        certifications: ['Certified Business Counselor', 'MBA Admissions Specialist'],
        bio: 'Dedicated to guiding students toward successful business careers with comprehensive academic and career planning.',
        achievements: [
          'Business Excellence Award 2022',
          '400+ MBA Placements',
          'Industry Partnership Leader'
        ]
      },
      'james.wilson@studentkonnect.com': {
        id: 3,
        name: 'Dr. James Wilson',
        title: 'Medicine & Health Sciences Expert',
        email: 'james.wilson@studentkonnect.com',
        phone: '+1 (555) 345-6789',
        location: 'Montreal, Canada',
        joinDate: '2018-01-10',
        specializations: ['Medicine', 'Health Sciences', 'Nursing'],
        experience: '12 years',
        rating: 4.9,
        totalStudents: 380,
        activeStudents: 22,
        successRate: 96.8,
        languages: ['English', 'French'],
        education: 'MD, PhD in Medical Education, McGill University',
        certifications: ['Medical Education Specialist', 'Health Professions Advisor'],
        bio: 'Committed to helping aspiring healthcare professionals navigate the complex path to medical careers.',
        achievements: [
          'Medical Excellence Award 2023',
          '350+ Medical School Placements',
          'Healthcare Innovation Leader'
        ]
      },
      'priya.sharma@studentkonnect.com': {
        id: 4,
        name: 'Dr. Priya Sharma',
        title: 'Engineering & Technology Counselor',
        email: 'priya.sharma@studentkonnect.com',
        phone: '+1 (555) 456-7890',
        location: 'Calgary, Canada',
        joinDate: '2021-05-12',
        specializations: ['Engineering', 'Technology', 'Computer Science'],
        experience: '6 years',
        rating: 4.7,
        totalStudents: 290,
        activeStudents: 20,
        successRate: 93.5,
        languages: ['English', 'Hindi', 'Punjabi'],
        education: 'PhD in Engineering Education, University of Calgary',
        certifications: ['Engineering Education Specialist', 'STEM Career Advisor'],
        bio: 'Passionate about empowering students to excel in STEM fields through innovative guidance and mentorship.',
        achievements: [
          'STEM Excellence Award 2022',
          '250+ Engineering Placements',
          'Technology Innovation Mentor'
        ]
      },
      'emma.davis@studentkonnect.com': {
        id: 5,
        name: 'Dr. Emma Davis',
        title: 'Law & Legal Studies Advisor',
        email: 'emma.davis@studentkonnect.com',
        phone: '+1 (555) 567-8901',
        location: 'Ottawa, Canada',
        joinDate: '2020-09-01',
        specializations: ['Law', 'Legal Studies', 'Political Science'],
        experience: '7 years',
        rating: 4.8,
        totalStudents: 315,
        activeStudents: 16,
        successRate: 95.0,
        languages: ['English', 'Spanish'],
        education: 'JD, PhD in Legal Education, University of Ottawa',
        certifications: ['Legal Education Specialist', 'Pre-Law Advisor'],
        bio: 'Dedicated to guiding future legal professionals through comprehensive academic and career planning.',
        achievements: [
          'Legal Excellence Award 2023',
          '300+ Law School Placements',
          'Justice Education Leader'
        ]
      }
    };

    return counselorProfiles[userEmail] || counselorProfiles['sarah.johnson@studentkonnect.com'];
  };

  useEffect(() => {
    if (user?.email) {
      const data = getCounselorData(user.email);
      setCounselorData(data);
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex">
        <Sidebar 
          isOpen={true}
          onClose={() => {}}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={onMobileMenuClose}
        />
        <main className="flex-1 w-full md:w-auto transition-all duration-300 min-h-screen">
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading profile...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!counselorData) {
    return (
      <div className="flex">
        <Sidebar 
          isOpen={true}
          onClose={() => {}}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={onMobileMenuClose}
        />
        <main className="flex-1 w-full md:w-auto transition-all duration-300 min-h-screen">
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <p className="text-gray-600">Profile not found</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar 
        isOpen={true}
        onClose={() => {}}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={onMobileMenuClose}
      />
      <main className="flex-1 w-full md:w-auto transition-all duration-300 min-h-screen bg-gray-50">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-2">Manage your counselor profile and information</p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Profile Picture */}
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {counselorData.name.split(' ').map(n => n[0]).join('')}
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{counselorData.name}</h2>
                <p className="text-lg text-purple-600 font-medium">{counselorData.title}</p>
                <div className="flex items-center gap-4 mt-3 text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{counselorData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Since {new Date(counselorData.joinDate).getFullYear()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{counselorData.rating}/5.0</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-purple-600">{counselorData.activeStudents}</div>
                  <div className="text-sm text-gray-600">Active Students</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-green-600">{counselorData.successRate}%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-purple-600" />
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{counselorData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{counselorData.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{counselorData.location}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                Performance Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Students Helped</span>
                  <span className="font-semibold text-gray-900">{counselorData.totalStudents}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Years of Experience</span>
                  <span className="font-semibold text-gray-900">{counselorData.experience}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rating</span>
                  <span className="font-semibold text-gray-900">{counselorData.rating}/5.0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-600" />
                Specializations
              </h3>
              <div className="flex flex-wrap gap-2">
                {counselorData.specializations.map((spec, index) => (
                  <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {spec}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {counselorData.languages.map((lang, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-purple-600" />
                Achievements
              </h3>
              <div className="space-y-3">
                {counselorData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-gray-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education & Bio */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Background</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Education</h4>
                <p className="text-gray-700">{counselorData.education}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {counselorData.certifications.map((cert, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">About Me</h4>
                <p className="text-gray-700">{counselorData.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CounselorProfile;

