import { useState } from 'react'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { AdminAuthProvider } from './contexts/AdminAuthContext'
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

// Import admin components
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import CounselorManagementFixed from './components/admin/CounselorManagementFixed'
import StudentManagementSimple from './components/admin/StudentManagementSimple'
import ScholarshipManagementWorking from './components/admin/ScholarshipManagementWorking'
import AnalyticsOverview from './components/admin/AnalyticsOverview'
import ContentUniversities from './components/admin/ContentUniversities'
import ContentCourses from './components/admin/ContentCourses'
import ContentBlog from './components/admin/ContentBlog'
import ContentFAQ from './components/admin/ContentFAQ'
import ModerationReviews from './components/admin/ModerationReviews'
import ModerationReports from './components/admin/ModerationReports'
import ModerationComplaints from './components/admin/ModerationComplaints'
import ModerationLogs from './components/admin/ModerationLogs'
import CommunicationsEmail from './components/admin/CommunicationsEmail'
import CommunicationsNotifications from './components/admin/CommunicationsNotifications'
import CommunicationsMessages from './components/admin/CommunicationsMessages'
import FinancialRevenue from './components/admin/FinancialRevenue'
import FinancialCommissions from './components/admin/FinancialCommissions'
import FinancialPayments from './components/admin/FinancialPayments'
import SystemSettings from './components/admin/SystemSettings'
import SystemUsers from './components/admin/SystemUsers'
import SystemLogs from './components/admin/SystemLogs'
import SupportManagement from './components/admin/SupportManagement'

const AnalyticsPerformance = () => <div className="p-6"><h1 className="text-2xl font-bold">Analytics Performance</h1><p>Coming soon...</p></div>
const AnalyticsFinancial = () => <div className="p-6"><h1 className="text-2xl font-bold">Analytics Financial</h1><p>Coming soon...</p></div>
const AnalyticsEngagement = () => <div className="p-6"><h1 className="text-2xl font-bold">Analytics Engagement</h1><p>Coming soon...</p></div>
const SystemRoles = () => <div className="p-6"><h1 className="text-2xl font-bold">System Roles</h1><p>Coming soon...</p></div>
const SystemAPI = () => <div className="p-6"><h1 className="text-2xl font-bold">System API</h1><p>Coming soon...</p></div>
const SystemBackup = () => <div className="p-6"><h1 className="text-2xl font-bold">System Backup</h1><p>Coming soon...</p></div>

function App() {
  // Track user state
  
  // Initialize engagement timer (60 seconds = 60000ms)
  const {
    shouldShowOnboarding,
    markOnboardingCompleted,
    dismissOnboarding,
    timeSpent,
    progressPercentage
  } = useEngagementTimer(60000)

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
      <AdminAuthProvider>
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
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            } 
          />
          
          {/* Counselor Management Routes */}
          <Route 
            path="/admin/counselors" 
            element={
              <AdminProtectedRoute>
                <CounselorManagementFixed />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/counselors/applications" 
            element={
              <AdminProtectedRoute>
                <CounselorManagementFixed />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/counselors/performance" 
            element={
              <AdminProtectedRoute>
                <CounselorManagementFixed />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/counselors/suspended" 
            element={
              <AdminProtectedRoute>
                <CounselorManagementFixed />
              </AdminProtectedRoute>
            } 
          />
          
          {/* Student Management Routes */}
          <Route 
            path="/admin/students" 
            element={
              <AdminProtectedRoute>
                <StudentManagementSimple />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/students/applications" 
            element={
              <AdminProtectedRoute>
                <StudentManagementSimple />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/students/support" 
            element={
              <AdminProtectedRoute>
                <StudentManagementSimple />
              </AdminProtectedRoute>
            } 
          />
          
          {/* Scholarship Management Routes */}
          <Route 
            path="/admin/scholarships" 
            element={
              <AdminProtectedRoute>
                <ScholarshipManagementWorking />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/scholarships/pending" 
            element={
              <AdminProtectedRoute>
                <ScholarshipManagementWorking />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/scholarships/awards" 
            element={
              <AdminProtectedRoute>
                <ScholarshipManagementWorking />
              </AdminProtectedRoute>
            } 
          />
          
          {/* Analytics Routes */}
          <Route 
            path="/admin/analytics/overview" 
            element={
              <AdminProtectedRoute>
                <AnalyticsOverview />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/analytics/performance" 
            element={
              <AdminProtectedRoute>
                <AnalyticsPerformance />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/analytics/financial" 
            element={
              <AdminProtectedRoute>
                <AnalyticsFinancial />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/analytics/engagement" 
            element={
              <AdminProtectedRoute>
                <AnalyticsEngagement />
              </AdminProtectedRoute>
            } 
          />
          
          {/* Content Management Routes */}
          <Route 
            path="/admin/content/universities" 
            element={
              <AdminProtectedRoute>
                <ContentUniversities />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/content/courses" 
            element={
              <AdminProtectedRoute>
                <ContentCourses />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/content/blog" 
            element={
              <AdminProtectedRoute>
                <ContentBlog />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/content/faq" 
            element={
              <AdminProtectedRoute>
                <ContentFAQ />
              </AdminProtectedRoute>
            } 
          />
          
          {/* Moderation Routes */}
          <Route 
            path="/admin/moderation/reviews" 
            element={
              <AdminProtectedRoute>
                <ModerationReviews />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/moderation/reports" 
            element={
              <AdminProtectedRoute>
                <ModerationReports />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/moderation/complaints" 
            element={
              <AdminProtectedRoute>
                <ModerationComplaints />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/moderation/logs" 
            element={
              <AdminProtectedRoute>
                <ModerationLogs />
              </AdminProtectedRoute>
            } 
          />
          
          {/* Financial Management Routes */}
          <Route 
            path="/admin/financial/revenue" 
            element={
              <AdminProtectedRoute>
                <FinancialRevenue />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/financial/commissions" 
            element={
              <AdminProtectedRoute>
                <FinancialCommissions />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/financial/payments" 
            element={
              <AdminProtectedRoute>
                <FinancialPayments />
              </AdminProtectedRoute>
            } 
          />
          
          {/* Communications Routes */}
          <Route 
            path="/admin/communications/email" 
            element={
              <AdminProtectedRoute>
                <CommunicationsEmail />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/communications/notifications" 
            element={
              <AdminProtectedRoute>
                <CommunicationsNotifications />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/communications/messages" 
            element={
              <AdminProtectedRoute>
                <CommunicationsMessages />
              </AdminProtectedRoute>
            } 
          />
          
          {/* System Management Routes */}
          <Route 
            path="/admin/system/settings" 
            element={
              <AdminProtectedRoute>
                <SystemSettings />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/system/users" 
            element={
              <AdminProtectedRoute>
                <SystemUsers />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/system/logs" 
            element={
              <AdminProtectedRoute>
                <SystemLogs />
              </AdminProtectedRoute>
            } 
          />
          
          {/* System Management Routes */}
          <Route 
            path="/admin/system/settings" 
            element={
              <AdminProtectedRoute>
                <SystemSettings />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/system/roles" 
            element={
              <AdminProtectedRoute>
                <SystemRoles />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/system/api" 
            element={
              <AdminProtectedRoute>
                <SystemAPI />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/system/logs" 
            element={
              <AdminProtectedRoute>
                <SystemLogs />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/system/backup" 
            element={
              <AdminProtectedRoute>
                <SystemBackup />
              </AdminProtectedRoute>
            } 
          />
          
          {/* Support Management Routes */}
          <Route 
            path="/admin/support/dashboard" 
            element={
              <AdminProtectedRoute>
                <SupportManagement />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/support/applications" 
            element={
              <AdminProtectedRoute>
                <SupportManagement />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/support/technical" 
            element={
              <AdminProtectedRoute>
                <SupportManagement />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/support/users" 
            element={
              <AdminProtectedRoute>
                <SupportManagement />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/support/knowledge" 
            element={
              <AdminProtectedRoute>
                <SupportManagement />
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/support/contact" 
            element={
              <AdminProtectedRoute>
                <SupportManagement />
              </AdminProtectedRoute>
            } 
          />
          
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
          timeSpent={timeSpent}
          progressPercentage={progressPercentage}
        />
      </div>
    </Router>
  </AdminAuthProvider>
</AuthProvider>
  )
}

export default App

