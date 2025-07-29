import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { AdminAuthProvider } from './contexts/AdminAuthContext'
import OnboardingModal from './components/OnboardingModal'
import useEngagementTimer from './hooks/useEngagementTimer'
import PersonalizedDashboard from './components/PersonalizedDashboard'
import HomePage from './components/HomePage'
import UniversitiesPage from './components/UniversitiesPage'
import PathwaysPage from './components/PathwaysPage'
import CoursesPage from './components/CoursesPage'
import GlobalUniversitiesPage from './components/GlobalUniversitiesPage'
import GlobalCoursesPage from './components/GlobalCoursesPage'
import ProfilePage from './components/ProfilePage'
import PathwayDetailPage from './components/PathwayDetailPage'
import CareerInsightsPage from './components/CareerInsightsPage'
import SignInPage from './components/SignInPage'
import ATARCalculatorPage from './components/ATARCalculatorPage'
import TermsOfServicePage from './components/TermsOfServicePage'
import PrivacyPolicyPage from './components/PrivacyPolicyPage'
import FAQPage from './components/FAQPage'
import HelpCenterPage from './components/HelpCenterPage'
import AboutUsPage from './components/AboutUsPage'
import ContactUsPage from './components/ContactUsPage'
import CourseFinderPage from './components/CourseFinderPage'
import SOPBuilderProper from './components/SOPBuilderProper'
import ResumeBuilder from './components/ResumeBuilder'
import ScholarshipFinder from './components/ScholarshipFinder'
import ApplicationAssistance from './components/ApplicationAssistance'
import EligibilityChecker from './components/EligibilityChecker'
import CounselorRegistration from './components/CounselorRegistration'
import CounselorDashboard from './components/CounselorDashboard'
import CounselorDirectory from './components/CounselorDirectory'
import CounselorDirectoryNew from './components/CounselorDirectoryNew'
import CounselorProfilePage from './components/CounselorProfilePage'
import CounselorDirectorySimple from './components/CounselorDirectorySimple'
import StudentDashboard from './components/StudentDashboard'
import ConnectionStatus from './components/ConnectionStatus'
import StudentProfileForm from './components/StudentProfileForm'
import StudentProfileDashboard from './components/StudentProfileDashboard'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import AdminCounselorManagement from './components/AdminCounselorManagement'
import AdminStudentManagement from './components/AdminStudentManagement'
import AdminScholarshipManagement from './components/AdminScholarshipManagement'
import AdminAnalyticsManagement from './components/AdminAnalyticsManagement'
import AdminContentManagement from './components/AdminContentManagement'
import AdminModerationManagement from './components/AdminModerationManagement'
import AdminCommunicationsManagement from './components/AdminCommunicationsManagement'
import AdminFinancialManagement from './components/AdminFinancialManagement'
import AdminSystemManagement from './components/AdminSystemManagement'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import CounselorProfile from './components/CounselorProfile'
import TravelHelp from './components/TravelHelp'
import AccommodationHelp from './components/AccommodationHelp'
import StudentForums from './components/StudentForums'
import AlumniNetwork from './components/AlumniNetwork'
import JourneyResults from './components/JourneyResults'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import HelperMenu from './components/HelperMenu'
import Footer from './components/Footer'
import './App.css'

function AppContent() {
  const [favorites, setFavorites] = useState([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()

  // Engagement timer for onboarding trigger - pass user to prevent modal when logged in
  const {
    shouldShowOnboarding,
    markOnboardingCompleted,
    dismissOnboarding,
    restartTimerOnLogout
  } = useEngagementTimer(60000, user) // 1 minute trigger, pass user

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleOnboardingComplete = (formData) => {
    // Save onboarding data to localStorage or send to backend
    localStorage.setItem('user_onboarding_data', JSON.stringify(formData))
    markOnboardingCompleted()
    
    // You can also send this data to your backend here
    console.log('Onboarding completed with data:', formData)
    
    // Redirect to personalized dashboard
    window.location.href = '/dashboard'
  }

  const handleLogout = async () => {
    await logout()
    // Restart the engagement timer when user logs out
    restartTimerOnLogout()
  }

  // Check if current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={shouldShowOnboarding}
        onClose={dismissOnboarding}
        onComplete={handleOnboardingComplete}
      />
      
      {/* Helper Menu - Show for non-admin routes */}
      {!isAdminRoute && <HelperMenu />}
      
      {/* Show header only for non-admin routes */}
      {!isAdminRoute && <Header onLogout={handleLogout} />}
      
      <Routes>
        <Route path="/" element={<HomePage isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
        <Route path="/dashboard" element={<PersonalizedDashboard />} />
        <Route path="/universities" element={<UniversitiesPage favorites={favorites} setFavorites={setFavorites} isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
        <Route path="/pathways" element={<PathwaysPage isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
        <Route path="/pathways/:id" element={<PathwayDetailPage isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
        <Route path="/courses" element={<CoursesPage favorites={favorites} setFavorites={setFavorites} isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
        <Route path="/global/universities/:country" element={<GlobalUniversitiesPage isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
        <Route path="/global/courses/:country" element={<GlobalCoursesPage isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
        <Route path="/global/universities" element={<GlobalUniversitiesPage isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
        <Route path="/global/courses" element={<GlobalCoursesPage isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
        <Route path="/career-insights" element={<CareerInsightsPage isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
        <Route path="/atar-calculator" element={<ATARCalculatorPage isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
        <Route path="/faq" element={<FAQPage isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
        <Route path="/help-center" element={<HelpCenterPage isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
        <Route path="/about-us" element={<AboutUsPage isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
        <Route path="/contact-us" element={<ContactUsPage isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
        <Route path="/course-finder" element={<CourseFinderPage isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
        <Route path="/smart-apply/sop-builder" element={
          <SOPBuilderProper 
            isMobileMenuOpen={isMobileMenuOpen} 
            onMobileMenuClose={closeMobileMenu} 
          />
        } />
        <Route path="/smart-apply/resume-builder" element={
          <ResumeBuilder 
            isMobileMenuOpen={isMobileMenuOpen} 
            onMobileMenuClose={closeMobileMenu} 
          />
        } />
        <Route path="/scholarships-assist/scholarship-finder" element={
          <ScholarshipFinder 
            isMobileMenuOpen={isMobileMenuOpen} 
            onMobileMenuClose={closeMobileMenu} 
          />
        } />
        <Route path="/scholarships-assist/eligibility-checker" element={
          <EligibilityChecker 
            isMobileMenuOpen={isMobileMenuOpen} 
            onMobileMenuClose={closeMobileMenu} 
          />
        } />
        <Route path="/scholarships-assist/application-assistance" element={
          <ApplicationAssistance 
            isMobileMenuOpen={isMobileMenuOpen} 
            onMobileMenuClose={closeMobileMenu} 
          />
        } />
        <Route path="/counselor/register" element={
          <CounselorRegistration 
            isMobileMenuOpen={isMobileMenuOpen} 
            onMobileMenuClose={closeMobileMenu} 
          />
        } />
        <Route path="/counselor/dashboard" element={
          <CounselorDashboard 
            isMobileMenuOpen={isMobileMenuOpen} 
            onMobileMenuClose={closeMobileMenu} 
          />
        } />
        <Route path="/counselor/directory" element={
          <CounselorDirectoryNew 
            isMobileMenuOpen={isMobileMenuOpen} 
            onMobileMenuClose={closeMobileMenu} 
          />
        } />
        <Route path="/find-counselors" element={
          <CounselorDirectoryNew 
            isMobileMenuOpen={isMobileMenuOpen} 
            onMobileMenuClose={closeMobileMenu} 
          />
        } />
        <Route path="/counselor/profile/:counselorId" element={
          <CounselorProfilePage 
            isMobileMenuOpen={isMobileMenuOpen} 
            onMobileMenuClose={closeMobileMenu} 
          />
        } />
        
        {/* Student Journey Routes */}
        <Route path="/student/dashboard" element={
          <StudentDashboard isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />
        } />
        <Route path="/student/profile/setup" element={<StudentProfileForm isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
        <Route path="/student/profile" element={<StudentProfileDashboard isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
        <Route path="/student/connections" element={
          <ConnectionStatus isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />
        } />

        {/* New Module Routes */}
        <Route path="/travel-help" element={
          <TravelHelp isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />
        } />
        <Route path="/accommodation-help" element={
          <AccommodationHelp isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />
        } />
        <Route path="/student-forums" element={
          <StudentForums isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />
        } />
        <Route path="/alumni-network" element={
          <AlumniNetwork isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />
        } />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <AdminProtectedRoute requiredPermissions={['view_dashboard']}>
            <AdminDashboard />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/counselors" element={
          <AdminProtectedRoute requiredPermissions={['manage_counselors']}>
            <AdminCounselorManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/counselors/pending" element={
          <AdminProtectedRoute requiredPermissions={['manage_counselors']}>
            <AdminCounselorManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/counselors/performance" element={
          <AdminProtectedRoute requiredPermissions={['manage_counselors']}>
            <AdminCounselorManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/counselors/suspended" element={
          <AdminProtectedRoute requiredPermissions={['manage_counselors']}>
            <AdminCounselorManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/scholarships" element={
          <AdminProtectedRoute requiredPermissions={['manage_scholarships']}>
            <AdminScholarshipManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/scholarships/new" element={
          <AdminProtectedRoute requiredPermissions={['manage_scholarships']}>
            <AdminScholarshipManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/scholarships/applications" element={
          <AdminProtectedRoute requiredPermissions={['manage_scholarships']}>
            <AdminScholarshipManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/scholarships/providers" element={
          <AdminProtectedRoute requiredPermissions={['manage_scholarships']}>
            <AdminScholarshipManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/analytics" element={
          <AdminProtectedRoute requiredPermissions={['view_analytics']}>
            <AdminAnalyticsManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/analytics/overview" element={
          <AdminProtectedRoute requiredPermissions={['view_analytics']}>
            <AdminAnalyticsManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/analytics/performance" element={
          <AdminProtectedRoute requiredPermissions={['view_analytics']}>
            <AdminAnalyticsManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/analytics/financial" element={
          <AdminProtectedRoute requiredPermissions={['view_analytics']}>
            <AdminAnalyticsManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/analytics/users" element={
          <AdminProtectedRoute requiredPermissions={['view_analytics']}>
            <AdminAnalyticsManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/students" element={
          <AdminProtectedRoute requiredPermissions={['manage_students']}>
            <AdminStudentManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/students/applications" element={
          <AdminProtectedRoute requiredPermissions={['manage_students']}>
            <AdminStudentManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/students/success-stories" element={
          <AdminProtectedRoute requiredPermissions={['manage_students']}>
            <AdminStudentManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/students/support-tickets" element={
          <AdminProtectedRoute requiredPermissions={['manage_students']}>
            <AdminStudentManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/content" element={
          <AdminProtectedRoute requiredPermissions={['manage_content']}>
            <AdminContentManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/content/universities" element={
          <AdminProtectedRoute requiredPermissions={['manage_content']}>
            <AdminContentManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/content/courses" element={
          <AdminProtectedRoute requiredPermissions={['manage_content']}>
            <AdminContentManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/content/blog" element={
          <AdminProtectedRoute requiredPermissions={['manage_content']}>
            <AdminContentManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/content/faq" element={
          <AdminProtectedRoute requiredPermissions={['manage_content']}>
            <AdminContentManagement />
          </AdminProtectedRoute>
        } />

        {/* Student Management Sub-routes */}
        <Route path="/admin/students/success" element={
          <AdminProtectedRoute requiredPermissions={['manage_students']}>
            <AdminStudentManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/students/support" element={
          <AdminProtectedRoute requiredPermissions={['manage_students']}>
            <AdminStudentManagement />
          </AdminProtectedRoute>
        } />

        {/* Moderation Management Routes */}
        <Route path="/admin/moderation/reviews" element={
          <AdminProtectedRoute requiredPermissions={['manage_moderation']}>
            <AdminModerationManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/moderation/reports" element={
          <AdminProtectedRoute requiredPermissions={['manage_moderation']}>
            <AdminModerationManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/moderation/complaints" element={
          <AdminProtectedRoute requiredPermissions={['manage_moderation']}>
            <AdminModerationManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/moderation/logs" element={
          <AdminProtectedRoute requiredPermissions={['manage_moderation']}>
            <AdminModerationManagement />
          </AdminProtectedRoute>
        } />

        {/* Communications Management Routes */}
        <Route path="/admin/communications/notifications" element={
          <AdminProtectedRoute requiredPermissions={['manage_communications']}>
            <AdminCommunicationsManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/communications/email" element={
          <AdminProtectedRoute requiredPermissions={['manage_communications']}>
            <AdminCommunicationsManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/communications/system" element={
          <AdminProtectedRoute requiredPermissions={['manage_communications']}>
            <AdminCommunicationsManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/communications/logs" element={
          <AdminProtectedRoute requiredPermissions={['manage_communications']}>
            <AdminCommunicationsManagement />
          </AdminProtectedRoute>
        } />

        {/* Financial Management Routes */}
        <Route path="/admin/financial/revenue" element={
          <AdminProtectedRoute requiredPermissions={['manage_financial']}>
            <AdminFinancialManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/financial/commissions" element={
          <AdminProtectedRoute requiredPermissions={['manage_financial']}>
            <AdminFinancialManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/financial/payments" element={
          <AdminProtectedRoute requiredPermissions={['manage_financial']}>
            <AdminFinancialManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/financial/reports" element={
          <AdminProtectedRoute requiredPermissions={['manage_financial']}>
            <AdminFinancialManagement />
          </AdminProtectedRoute>
        } />

        {/* System Management Routes */}
        <Route path="/admin/system/settings" element={
          <AdminProtectedRoute requiredPermissions={['manage_system']}>
            <AdminSystemManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/system/roles" element={
          <AdminProtectedRoute requiredPermissions={['manage_system']}>
            <AdminSystemManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/system/api" element={
          <AdminProtectedRoute requiredPermissions={['manage_system']}>
            <AdminSystemManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/system/logs" element={
          <AdminProtectedRoute requiredPermissions={['manage_system']}>
            <AdminSystemManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/system/backup" element={
          <AdminProtectedRoute requiredPermissions={['manage_system']}>
            <AdminSystemManagement />
          </AdminProtectedRoute>
        } />

        {/* Analytics Sub-routes */}
        <Route path="/admin/analytics/engagement" element={
          <AdminProtectedRoute requiredPermissions={['view_analytics']}>
            <AdminAnalyticsManagement />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/analytics/custom" element={
          <AdminProtectedRoute requiredPermissions={['view_analytics']}>
            <AdminAnalyticsManagement />
          </AdminProtectedRoute>
        } />
        
        <Route path="/journey-results" element={<JourneyResults isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
        <Route path="/sign-in" element={<SignInPage isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <StudentProfileDashboard isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />
          </ProtectedRoute>
        } />
      </Routes>
      
      {/* Show footer only for non-admin routes */}
      {!isAdminRoute && <Footer />}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <Router>
          <ScrollToTop />
          <AppContent />
        </Router>
      </AdminAuthProvider>
    </AuthProvider>
  )
}

export default App

