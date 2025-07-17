import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import HomePage from './components/HomePage'
import UniversitiesPage from './components/UniversitiesPage'
import PathwaysPage from './components/PathwaysPage'
import CoursesPage from './components/CoursesPage'
import ProfilePage from './components/ProfilePage'
import PathwayDetailPage from './components/PathwayDetailPage'
import CareerInsightsPage from './components/CareerInsightsPage'
import SignInPage from './components/SignInPage'
import ATARCalculatorPage from './components/ATARCalculatorPage'
import JourneyResults from './components/JourneyResults'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import './App.css'

function App() {
  const [favorites, setFavorites] = useState([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header onMobileMenuToggle={toggleMobileMenu} />
        <Routes>
          <Route path="/" element={<HomePage isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
          <Route path="/universities" element={<UniversitiesPage favorites={favorites} setFavorites={setFavorites} isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
          <Route path="/pathways" element={<PathwaysPage isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
          <Route path="/pathways/:id" element={<PathwayDetailPage isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
          <Route path="/courses" element={<CoursesPage favorites={favorites} setFavorites={setFavorites} isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
          <Route path="/career-insights" element={<CareerInsightsPage isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
          <Route path="/atar-calculator" element={<ATARCalculatorPage isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
          <Route path="/journey-results" element={<JourneyResults isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
          <Route path="/sign-in" element={<SignInPage isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage favorites={favorites} isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />
            </ProtectedRoute>
          } />
        </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

