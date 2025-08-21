import realDatabaseService from '../services/realDatabaseService.js';

// Clean up Priya's data and create a new test student
export const cleanupAndCreateTestData = async () => {
  try {
    console.log('🧹 Starting database cleanup and test data creation...');

    // 1. Clean up Priya's existing data
    console.log('🔄 Cleaning up Priya\'s data...');
    const cleanupResult = await realDatabaseService.cleanupStudentData('priya.dubey@email.com');
    
    if (cleanupResult.success) {
      console.log('✅ Priya\'s data cleaned successfully');
    } else {
      console.log('⚠️ Priya cleanup result:', cleanupResult.error);
    }

    // 2. Create a new test student
    console.log('👤 Creating new test student...');
    const newStudentData = {
      email: 'rahul.sharma@email.com',
      fullName: 'Rahul Sharma',
      nationality: 'Indian',
      currentLocation: 'Delhi, India',
      phone: '+91-9876543211',
      currentInstitution: 'IIT Delhi',
      educationLevel: "Bachelor's",
      graduationYear: '2024',
      gpa: '9.2/10',
      fieldOfStudy: 'Engineering, Computer Science',
      studyLevel: "Master's Degree",
      careerInterests: 'Artificial Intelligence, Machine Learning',
      targetCountries: 'Canada, Australia',
      targetUniversities: 'University of Toronto, University of Melbourne',
      interestedPrograms: 'Computer Science, AI/ML',
      budgetRange: '$40,000 - $60,000 CAD',
      languages: 'English, Hindi, Punjabi',
      communicationStyle: 'Professional',
      timezone: 'Asia/Kolkata (GMT+5:30)',
      areasOfSupport: 'University Selection, Application Process, Visa Guidance',
      urgencyLevel: 'High Priority',
      extracurriculars: 'Coding Club President, Hackathon Winner, Open Source Contributor',
      achievements: 'Dean\'s List, Best Project Award, Google Summer of Code Participant'
    };

    const createResult = await realDatabaseService.createStudentUser(newStudentData);
    
    if (createResult.success) {
      console.log('✅ New test student created successfully:', createResult.data.email);
    } else {
      console.log('❌ Failed to create new student:', createResult.error);
    }

    // 3. Summary
    console.log('📋 Database cleanup and setup complete!');
    console.log('🎯 Test accounts available:');
    console.log('   - Priya Dubey (priya.dubey@email.com) - RESET to fresh student');
    console.log('   - Rahul Sharma (rahul.sharma@email.com) - NEW test student');
    console.log('   - Michael Kumar (michael.kumar@email.com) - Counselor');

    return {
      success: true,
      message: 'Database cleanup and test data creation completed',
      accounts: {
        resetStudent: 'priya.dubey@email.com',
        newStudent: 'rahul.sharma@email.com',
        counselor: 'michael.kumar@email.com'
      }
    };

  } catch (error) {
    console.error('❌ Error in database cleanup and setup:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Execute the cleanup and setup
cleanupAndCreateTestData().then(result => {
  console.log('🏁 Final result:', result);
}).catch(error => {
  console.error('🚨 Script failed:', error);
});

