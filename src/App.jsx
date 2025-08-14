import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import HeaderWithDropdowns from './components/HeaderWithDropdowns'
import HomePageEnhanced from './components/HomePageEnhanced'
import OnboardingModal from './components/OnboardingModal'
import useEngagementTimer from './hooks/useEngagementTimer'

// Import all the pages
import GlobalUniversitiesPage from './components/GlobalUniversitiesPage'
import GlobalCoursesPage from './components/GlobalCoursesPage'
import CounselorDirectory from './components/CounselorDirectory'
import CounselorSelectionPage from './components/CounselorSelectionPage'
import CounselorDashboard from './components/CounselorDashboard'
import CounselorProfile from './components/CounselorProfile'
import CounselorRegistration from './components/CounselorRegistration'
import CareerInsightsPage from './components/CareerInsightsPage'
import SOPBuilderProper from './components/SOPBuilderProper'
import ResumeBuilder from './components/ResumeBuilder'
import FAQPage from './components/FAQPage'
import HelpCenterPage from './components/HelpCenterPage'
import ContactUsPage from './components/ContactUsPage'
import ATARCalculatorPage from './components/ATARCalculatorPage'
import CourseFinderPage from './components/CourseFinderPage'
import ScholarshipFinder from './components/ScholarshipFinder'
import UniversityDetailPage from './components/UniversityDetailPage'
import SimpleAdminPortal from './components/SimpleAdminPortal'
import PathwaysPage from './components/PathwaysPage'
import UniversitiesPage from './components/UniversitiesPage'
import CoursesPage from './components/CoursesPage'
import StudentDashboard from './components/StudentDashboard'
import StudentForums from './components/StudentForums'
import StudentProfileDashboard from './components/StudentProfileDashboard'
import SignInPage from './components/SignInPage'
import PrivacyPolicyPage from './components/PrivacyPolicyPage'
import TermsOfServicePage from './components/TermsOfServicePage'
import TravelHelp from './components/TravelHelp'
import AccommodationHelp from './components/AccommodationHelp'

// Import new student components
import StudentProfile from './components/StudentProfile'
import SignInForm from './components/SignInForm'

function App() {
  const [user, setUser] = useState(null) // Track user state
  
  // Initialize engagement timer (60 seconds = 60000ms)
  const {
    shouldShowOnboarding,
    markOnboardingCompleted,
    dismissOnboarding,
    timeSpent,
    progressPercentage
  } = useEngagementTimer(60000, user)

  const handleOnboardingComplete = (formData) => {
    console.log('Onboarding completed with data:', formData)
    markOnboardingCompleted()
    // Here you could save the form data to your backend
  }

  const handleOnboardingClose = () => {
    dismissOnboarding()
  }

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          {/* Header appears on every page */}
          <HeaderWithDropdowns />
          
          <Routes>
            <Route path="/" element={<HomePageEnhanced />} />
          
          {/* Global Education Routes */}
          <Route path="/global/universities" element={<GlobalUniversitiesPage />} />
          <Route path="/global/courses" element={<GlobalCoursesPage />} />
          <Route path="/universities" element={<UniversitiesPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/pathways" element={<PathwaysPage />} />
          <Route path="/university/:id" element={<UniversityDetailPage />} />
          
          {/* Counselor Routes */}
          <Route path="/counselor/directory" element={<CounselorDirectory />} />
          <Route path="/counselor/select" element={<CounselorSelectionPage />} />
          <Route path="/counselor/selection" element={<CounselorSelectionPage />} />
          <Route path="/counselor/dashboard" element={<CounselorDashboard />} />
          <Route path="/counselor/profile" element={<CounselorProfile />} />
          <Route path="/counselor/register" element={<CounselorRegistration />} />
          
          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/forums" element={<StudentForums />} />
          
          {/* Authentication Routes */}
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/login" element={<SignInForm />} />
          
          {/* Tools & Utilities */}
          <Route path="/career-insights" element={<CareerInsightsPage />} />
          <Route path="/sop-builder" element={<SOPBuilderProper />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          
          {/* Smart Apply Routes */}
          <Route path="/smart-apply/sop-builder" element={<SOPBuilderProper />} />
          <Route path="/smart-apply/resume-builder" element={<ResumeBuilder />} />
          
          <Route path="/atar-calculator" element={<ATARCalculatorPage />} />
          <Route path="/course-finder" element={<CourseFinderPage />} />
          <Route path="/scholarship-finder" element={<ScholarshipFinder />} />
          
          {/* Information Pages */}
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/help-center" element={<HelpCenterPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          
          {/* Support Pages */}
          <Route path="/travel-help" element={<TravelHelp />} />
          <Route path="/accommodation-help" element={<AccommodationHelp />} />
          
          {/* Authentication */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<SimpleAdminPortal />} />
          
          {/* Legacy/Compatibility Routes */}
          <Route path="/destinations" element={<GlobalUniversitiesPage />} />
          <Route path="/featured" element={<GlobalUniversitiesPage />} />
          <Route path="/australia/application" element={<HelpCenterPage />} />
          <Route path="/australia/visa" element={<HelpCenterPage />} />
          <Route path="/australia/living" element={<HelpCenterPage />} />
          <Route path="/smart-apply/tracker" element={<SOPBuilderProper />} />
          <Route path="/smart-apply/documents" element={<ResumeBuilder />} />
          <Route path="/smart-apply/calendar" element={<ATARCalculatorPage />} />
          <Route path="/visa/guide" element={<HelpCenterPage />} />
          <Route path="/visa/support" element={<ContactUsPage />} />
          <Route path="/visa/predeparture" element={<HelpCenterPage />} />
          <Route path="/chat" element={<ContactUsPage />} />
        </Routes>

        {/* Onboarding Modal */}
        <OnboardingModal
          isOpen={shouldShowOnboarding}
          onClose={handleOnboardingClose}
          onComplete={handleOnboardingComplete}
        />

        {/* Debug info - remove in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-2 rounded text-xs z-50">
            <div>Time: {Math.floor(timeSpent / 1000)}s</div>
            <div>Progress: {Math.floor(progressPercentage)}%</div>
            <div>Modal: {shouldShowOnboarding ? 'Showing' : 'Hidden'}</div>
          </div>
        )}
      </div>
    </Router>
    </AuthProvider>
  )
}

export default App

