import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  BookOpen, 
  Award,
  Building,
  Globe,
  Calendar,
  Star,
  Home,
  UserCheck,
  GraduationCap,
  CheckCircle,
  TrendingUp,
  DollarSign as DollarSignIcon,
  HelpCircle,
  Plane,
  MapPin as MapPinIcon,
  LogOut
} from 'lucide-react';

const CourseDetailPage = () => {
  const { category, slug } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedCourses, setRelatedCourses] = useState([]);

  useEffect(() => {
    fetchCourseDetails();
  }, [category, slug]);

  const getNavigationItems = () => {
    const baseItems = [
      { name: 'Home', href: '/', icon: Home },
      { name: 'Global Education', href: '/global/universities', icon: Globe },
      { name: 'Australia Process', href: '/australia-process', icon: MapPinIcon },
      { name: 'Career Insights', href: '/career-insights', icon: TrendingUp },
      { name: 'Smart Apply', href: '/smart-apply', icon: CheckCircle },
      { name: 'Scholarships Assist', href: '/scholarships', icon: DollarSignIcon },
      { name: 'Visa & International Students', href: '/visa-help', icon: Plane },
      { name: 'Help & Resources', href: '/help', icon: HelpCircle }
    ];

    if (user) {
      if (user.role === 'student') {
        return [
          { name: 'Home', href: '/', icon: Home },
          { name: 'My Profile', href: '/student/profile', icon: UserCheck },
          { name: 'My Dashboard', href: '/student/dashboard', icon: GraduationCap },
          { name: 'My Applications', href: '/student/applications', icon: CheckCircle },
          { name: 'Find Counselor', href: '/counselor/directory', icon: UserCheck },
          { name: 'My Connections', href: '/student/connections', icon: Users, badge: '0' },
          { name: 'Student Forums', href: '/student/forums', icon: Users },
          { name: 'Alumni Network', href: '/alumni', icon: GraduationCap },
          { name: 'Travel Help', href: '/travel-help', icon: Plane },
          { name: 'Accommodation Help', href: '/accommodation', icon: Building },
          ...baseItems.slice(1),
          { name: 'Logout', href: '#', icon: LogOut, onClick: logout }
        ];
      } else if (user.role === 'counselor') {
        return [
          { name: 'Home', href: '/', icon: Home },
          { name: 'Counselor Dashboard', href: '/counselor/dashboard', icon: GraduationCap },
          { name: 'My Students', href: '/counselor/students', icon: Users },
          { name: 'My Profile', href: '/counselor/profile', icon: UserCheck },
          ...baseItems.slice(1),
          { name: 'Logout', href: '#', icon: LogOut, onClick: logout }
        ];
      }
    }

    return baseItems;
  };

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      
      // Convert slug back to course name for matching
      const courseName = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // Generate mock course data based on category and slug
      const mockCourse = generateMockCourseData(category, courseName, slug);
      setCourse(mockCourse);
      
      // Generate related courses
      const related = generateRelatedCourses(category, courseName);
      setRelatedCourses(related);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching course details:', error);
      setLoading(false);
    }
  };

  const generateMockCourseData = (category, courseName, slug) => {
    const categoryData = {
      medicine: {
        color: 'red',
        icon: '🏥',
        universities: ['University of Melbourne', 'University of Sydney', 'Monash University'],
        duration: '3-6 years',
        fees: '$45,000 - $75,000',
        description: 'Comprehensive medical education program preparing students for healthcare careers.'
      },
      engineering: {
        color: 'blue',
        icon: '⚙️',
        universities: ['MIT', 'Stanford University', 'University of Cambridge'],
        duration: '3-4 years',
        fees: '$35,000 - $65,000',
        description: 'Advanced engineering program focusing on innovation and technical excellence.'
      },
      business: {
        color: 'green',
        icon: '💼',
        universities: ['Harvard Business School', 'Wharton School', 'London Business School'],
        duration: '2-4 years',
        fees: '$40,000 - $80,000',
        description: 'Comprehensive business education for future leaders and entrepreneurs.'
      },
      law: {
        color: 'purple',
        icon: '⚖️',
        universities: ['Harvard Law School', 'Yale Law School', 'Oxford University'],
        duration: '3-4 years',
        fees: '$50,000 - $85,000',
        description: 'Rigorous legal education preparing students for legal practice.'
      }
    };

    const data = categoryData[category] || categoryData.medicine;

    return {
      id: Math.floor(Math.random() * 1000),
      name: courseName,
      category: category,
      slug: slug,
      description: data.description,
      duration: data.duration,
      fees: data.fees,
      level: courseName.toLowerCase().includes('master') || courseName.toLowerCase().includes('phd') ? 'Postgraduate' : 'Undergraduate',
      universities: data.universities,
      icon: data.icon,
      color: data.color,
      requirements: [
        'High school diploma or equivalent',
        'English proficiency (IELTS/TOEFL)',
        'Academic transcripts',
        'Statement of purpose',
        'Letters of recommendation'
      ],
      careerOutcomes: [
        'Industry specialist',
        'Research positions',
        'Consulting roles',
        'Leadership positions',
        'Entrepreneurship opportunities'
      ],
      modules: [
        'Foundation Studies',
        'Core Subjects',
        'Specialization Areas',
        'Practical Training',
        'Final Project/Thesis'
      ]
    };
  };

  const generateRelatedCourses = (category, currentCourse) => {
    const coursesByCategory = {
      medicine: [
        'Bachelor of Medicine, Bachelor of Surgery (MBBS)',
        'Doctor of Medicine (MD)',
        'Bachelor of Nursing',
        'Master of Public Health',
        'Bachelor of Pharmacy'
      ],
      engineering: [
        'Bachelor of Engineering (Civil)',
        'Master of Engineering (Software)',
        'Bachelor of Computer Science',
        'Master of Data Science',
        'Bachelor of Mechanical Engineering'
      ],
      business: [
        'Bachelor of Business Administration',
        'Master of Business Administration (MBA)',
        'Bachelor of Commerce',
        'Master of Finance',
        'Bachelor of Economics'
      ],
      law: [
        'Bachelor of Laws (LLB)',
        'Juris Doctor (JD)',
        'Master of Laws (LLM)',
        'Bachelor of Legal Studies',
        'Master of International Law'
      ]
    };

    const courses = coursesByCategory[category] || coursesByCategory.medicine;
    return courses
      .filter(course => course !== currentCourse)
      .slice(0, 4)
      .map((course, index) => ({
        id: index + 1,
        name: course,
        category: category,
        slug: course.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-'),
        university: 'Top University',
        duration: '3-4 years'
      }));
  };

  const getCategoryColor = (category) => {
    const colors = {
      medicine: 'red',
      engineering: 'blue',
      business: 'green',
      law: 'purple',
      education: 'yellow',
      arts: 'pink',
      science: 'indigo'
    };
    return colors[category] || 'gray';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/courses')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
          >
            Browse All Courses
          </button>
        </div>
      </div>
    );
  }

  const colorClass = getCategoryColor(course.category);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`bg-${colorClass}-600 text-white py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white hover:text-gray-200 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Courses
          </button>
          
          <div className="flex items-start">
            <div className="text-4xl mr-4">{course.icon}</div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{course.name}</h1>
              <p className="text-lg opacity-90 mb-4">{course.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  {course.level}
                </span>
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content with Sidebar */}
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-3">
                SK
              </div>
              <span className="text-xl font-bold text-gray-900">StudentKonnect</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1">
            {getNavigationItems().map((item, index) => {
              const Icon = item.icon;
              const isActive = item.name === 'Career Insights'; // Highlight current section
              
              return (
                <div key={index}>
                  {item.onClick ? (
                    <button
                      onClick={item.onClick}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  )}
                </div>
              );
            })}
          </nav>

          {/* User Profile Section */}
          {user && (
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                  {user.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.name || 'User'}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role || 'Student'}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Facts */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Facts</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Clock className={`h-8 w-8 text-${colorClass}-600 mx-auto mb-2`} />
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold">{course.duration}</p>
                </div>
                <div className="text-center">
                  <DollarSign className={`h-8 w-8 text-${colorClass}-600 mx-auto mb-2`} />
                  <p className="text-sm text-gray-600">Annual Fees</p>
                  <p className="font-semibold">{course.fees}</p>
                </div>
                <div className="text-center">
                  <Award className={`h-8 w-8 text-${colorClass}-600 mx-auto mb-2`} />
                  <p className="text-sm text-gray-600">Level</p>
                  <p className="font-semibold">{course.level}</p>
                </div>
                <div className="text-center">
                  <Building className={`h-8 w-8 text-${colorClass}-600 mx-auto mb-2`} />
                  <p className="text-sm text-gray-600">Universities</p>
                  <p className="font-semibold">{course.universities.length}+</p>
                </div>
              </div>
            </div>

            {/* Course Modules */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpen className={`h-6 w-6 mr-2 text-${colorClass}-600`} />
                Course Modules
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.modules.map((module, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <span className={`bg-${colorClass}-100 text-${colorClass}-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3`}>
                        {index + 1}
                      </span>
                      <h3 className="font-semibold text-gray-900">{module}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Entry Requirements */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Entry Requirements</h2>
              <ul className="space-y-3">
                {course.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <span className={`bg-${colorClass}-100 text-${colorClass}-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5`}>
                      ✓
                    </span>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Career Outcomes */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Career Outcomes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.careerOutcomes.map((outcome, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center">
                      <Star className={`h-5 w-5 text-${colorClass}-600 mr-2`} />
                      <span className="text-gray-900">{outcome}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Universities Offering This Course */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Top Universities</h3>
              <div className="space-y-3">
                {course.universities.map((university, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                    <div className="flex items-center">
                      <Building className="h-5 w-5 text-gray-600 mr-2" />
                      <span className="font-medium text-gray-900">{university}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className={`w-full mt-4 bg-${colorClass}-600 hover:bg-${colorClass}-700 text-white py-2 px-4 rounded-lg`}>
                View All Universities
              </button>
            </div>

            {/* Related Courses */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Related Courses</h3>
              <div className="space-y-3">
                {relatedCourses.map((relatedCourse) => (
                  <a
                    key={relatedCourse.id}
                    href={`/courses/${relatedCourse.category}/${relatedCourse.slug}`}
                    className="block border border-gray-200 rounded-lg p-3 hover:bg-gray-50 hover:border-gray-300"
                  >
                    <h4 className="font-medium text-gray-900 mb-1">{relatedCourse.name}</h4>
                    <p className="text-sm text-gray-600">{relatedCourse.duration}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Apply Now */}
            <div className={`bg-${colorClass}-50 rounded-lg p-6 border border-${colorClass}-200`}>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Apply?</h3>
              <p className="text-gray-700 mb-4">Get personalized guidance for this course</p>
              <button className={`w-full bg-${colorClass}-600 hover:bg-${colorClass}-700 text-white py-2 px-4 rounded-lg mb-3`}>
                Find a Counselor
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50">
                Save Course
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;

