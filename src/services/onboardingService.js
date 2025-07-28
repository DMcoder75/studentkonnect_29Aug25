// Onboarding Service for managing user data and analytics
class OnboardingService {
  constructor() {
    this.storageKey = 'user_onboarding_data';
    this.analyticsKey = 'onboarding_analytics';
  }

  // Save onboarding data
  saveOnboardingData(data) {
    try {
      const enrichedData = {
        ...data,
        completedAt: new Date().toISOString(),
        sessionId: this.generateSessionId(),
        userAgent: navigator.userAgent,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language
      };

      localStorage.setItem(this.storageKey, JSON.stringify(enrichedData));
      this.trackAnalytics('onboarding_completed', enrichedData);
      
      return enrichedData;
    } catch (error) {
      console.error('Error saving onboarding data:', error);
      return null;
    }
  }

  // Get saved onboarding data
  getOnboardingData() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving onboarding data:', error);
      return null;
    }
  }

  // Check if user has completed onboarding
  hasCompletedOnboarding() {
    const data = this.getOnboardingData();
    return data && data.completedAt;
  }

  // Generate unique session ID
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Track analytics events
  trackAnalytics(event, data = {}) {
    try {
      const analytics = this.getAnalytics();
      const eventData = {
        event,
        timestamp: new Date().toISOString(),
        data,
        sessionId: this.generateSessionId()
      };

      analytics.events.push(eventData);
      localStorage.setItem(this.analyticsKey, JSON.stringify(analytics));
      
      // In a real application, you would send this to your analytics service
      console.log('Analytics tracked:', eventData);
    } catch (error) {
      console.error('Error tracking analytics:', error);
    }
  }

  // Get analytics data
  getAnalytics() {
    try {
      const data = localStorage.getItem(this.analyticsKey);
      return data ? JSON.parse(data) : { events: [], created: new Date().toISOString() };
    } catch (error) {
      console.error('Error retrieving analytics:', error);
      return { events: [], created: new Date().toISOString() };
    }
  }

  // Generate user profile from onboarding data
  generateUserProfile() {
    const data = this.getOnboardingData();
    if (!data) return null;

    return {
      personalInfo: {
        firstName: data.firstName,
        userType: data.userType,
        phoneNumber: data.phoneNumber,
        countryCode: data.countryCode
      },
      academicGoals: {
        degreeType: data.degreeType,
        coursesOfInterest: data.coursesOfInterest,
        studyCountries: data.studyCountries
      },
      timeline: {
        startYear: data.startYear,
        startIntake: data.startIntake
      },
      currentStatus: {
        currentGrade: data.currentGrade,
        schoolBoard: data.schoolBoard
      },
      preferences: {
        timezone: data.timezone,
        language: data.language
      },
      metadata: {
        completedAt: data.completedAt,
        sessionId: data.sessionId
      }
    };
  }

  // Get personalized recommendations based on onboarding data
  getPersonalizedRecommendations() {
    const profile = this.generateUserProfile();
    if (!profile) return [];

    const recommendations = [];

    // University recommendations based on study countries and degree type
    if (profile.academicGoals.studyCountries.length > 0) {
      recommendations.push({
        type: 'universities',
        title: 'Recommended Universities',
        description: `Explore top universities in ${profile.academicGoals.studyCountries.join(', ')} for ${profile.academicGoals.degreeType}`,
        action: '/universities',
        priority: 'high'
      });
    }

    // Course recommendations
    if (profile.academicGoals.coursesOfInterest.length > 0) {
      recommendations.push({
        type: 'courses',
        title: 'Relevant Courses',
        description: `Discover courses matching your interests`,
        action: '/courses',
        priority: 'high'
      });
    }

    // Timeline-based recommendations
    if (profile.timeline.startYear) {
      const currentYear = new Date().getFullYear();
      const yearsUntilStart = parseInt(profile.timeline.startYear) - currentYear;
      
      if (yearsUntilStart <= 1) {
        recommendations.push({
          type: 'application_assistance',
          title: 'Application Assistance',
          description: 'Get help with your application process',
          action: '/application-assistance',
          priority: 'urgent'
        });
      } else {
        recommendations.push({
          type: 'preparation',
          title: 'Preparation Resources',
          description: 'Start preparing for your study abroad journey',
          action: '/pathways',
          priority: 'medium'
        });
      }
    }

    // Scholarship recommendations
    recommendations.push({
      type: 'scholarships',
      title: 'Scholarship Opportunities',
      description: 'Find scholarships that match your profile',
      action: '/scholarships',
      priority: 'medium'
    });

    // Counselor recommendations
    if (profile.personalInfo.userType === 'student' && profile.currentStatus.currentGrade) {
      recommendations.push({
        type: 'counseling',
        title: 'Expert Counseling',
        description: 'Connect with experienced counselors',
        action: '/counselors',
        priority: 'medium'
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { urgent: 3, high: 2, medium: 1, low: 0 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  // Clear onboarding data (for testing or reset)
  clearOnboardingData() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.analyticsKey);
    localStorage.removeItem('onboarding_completed');
    localStorage.removeItem('onboarding_last_trigger');
    localStorage.removeItem('onboarding_dismissed');
  }

  // Export data for backup or migration
  exportData() {
    return {
      onboardingData: this.getOnboardingData(),
      analytics: this.getAnalytics(),
      profile: this.generateUserProfile(),
      recommendations: this.getPersonalizedRecommendations()
    };
  }

  // Validate onboarding data
  validateOnboardingData(data) {
    const required = ['firstName', 'degreeType', 'userType'];
    const missing = required.filter(field => !data[field]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }

    // Validate degree type
    const validDegreeTypes = ['bachelors', 'masters'];
    if (!validDegreeTypes.includes(data.degreeType)) {
      throw new Error('Invalid degree type');
    }

    // Validate user type
    const validUserTypes = ['student', 'parent'];
    if (!validUserTypes.includes(data.userType)) {
      throw new Error('Invalid user type');
    }

    // Validate phone number if provided
    if (data.phoneNumber && !/^\d{10}$/.test(data.phoneNumber.replace(/\D/g, ''))) {
      throw new Error('Invalid phone number format');
    }

    return true;
  }

  // Get onboarding completion statistics
  getCompletionStats() {
    const analytics = this.getAnalytics();
    const completionEvents = analytics.events.filter(e => e.event === 'onboarding_completed');
    
    return {
      totalCompletions: completionEvents.length,
      lastCompletion: completionEvents.length > 0 ? completionEvents[completionEvents.length - 1].timestamp : null,
      averageCompletionTime: this.calculateAverageCompletionTime(analytics.events)
    };
  }

  // Calculate average completion time
  calculateAverageCompletionTime(events) {
    const sessions = {};
    
    events.forEach(event => {
      if (!sessions[event.sessionId]) {
        sessions[event.sessionId] = { start: null, end: null };
      }
      
      if (event.event === 'onboarding_started') {
        sessions[event.sessionId].start = new Date(event.timestamp);
      } else if (event.event === 'onboarding_completed') {
        sessions[event.sessionId].end = new Date(event.timestamp);
      }
    });

    const completionTimes = Object.values(sessions)
      .filter(session => session.start && session.end)
      .map(session => session.end - session.start);

    if (completionTimes.length === 0) return 0;

    const average = completionTimes.reduce((sum, time) => sum + time, 0) / completionTimes.length;
    return Math.round(average / 1000); // Return in seconds
  }
}

// Create singleton instance
const onboardingService = new OnboardingService();

export default onboardingService;

