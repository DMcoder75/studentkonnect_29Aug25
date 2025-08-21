import React, { useState } from 'react';
import realDatabaseService from '../services/realDatabaseService';

const DatabaseCleanupComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);

  const executeCleanup = async () => {
    setIsLoading(true);
    setResults(null);

    try {
      console.log('🧹 Starting database cleanup...');

      // 1. Clean up Priya's data
      const cleanupResult = await realDatabaseService.cleanupStudentData('priya.dubey@email.com');
      console.log('Priya cleanup result:', cleanupResult);

      // 2. Create new test student
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
        extracurriculars: 'Coding Club President, Hackathon Winner',
        achievements: 'Dean\'s List, Best Project Award'
      };

      const createResult = await realDatabaseService.createStudentUser(newStudentData);
      console.log('New student creation result:', createResult);

      setResults({
        cleanup: cleanupResult,
        newStudent: createResult,
        success: true
      });

    } catch (error) {
      console.error('Error in cleanup process:', error);
      setResults({
        error: error.message,
        success: false
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>🧹 Database Cleanup & Test Data Setup</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <p><strong>This will:</strong></p>
        <ul>
          <li>✅ Remove all counselor connections for Priya Dubey</li>
          <li>✅ Reset Priya to a fresh student state</li>
          <li>✅ Create a new test student: Rahul Sharma</li>
        </ul>
      </div>

      <button 
        onClick={executeCleanup}
        disabled={isLoading}
        style={{
          padding: '12px 24px',
          backgroundColor: isLoading ? '#ccc' : '#8b5cf6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        {isLoading ? '🔄 Processing...' : '🚀 Execute Cleanup & Setup'}
      </button>

      {results && (
        <div style={{ 
          marginTop: '20px', 
          padding: '16px', 
          backgroundColor: results.success ? '#f0f9ff' : '#fef2f2',
          border: `1px solid ${results.success ? '#3b82f6' : '#ef4444'}`,
          borderRadius: '8px'
        }}>
          <h3>{results.success ? '✅ Success!' : '❌ Error'}</h3>
          
          {results.success ? (
            <div>
              <p><strong>Cleanup Result:</strong> {results.cleanup.success ? '✅ Completed' : '⚠️ ' + results.cleanup.error}</p>
              <p><strong>New Student:</strong> {results.newStudent.success ? '✅ Created' : '❌ ' + results.newStudent.error}</p>
              
              <div style={{ marginTop: '16px' }}>
                <h4>🎯 Test Accounts Available:</h4>
                <ul>
                  <li><strong>Priya Dubey:</strong> priya.dubey@email.com / password123 (RESET)</li>
                  <li><strong>Rahul Sharma:</strong> rahul.sharma@email.com / password123 (NEW)</li>
                  <li><strong>Michael Kumar:</strong> michael.kumar@email.com / counselor123 (Counselor)</li>
                </ul>
              </div>
            </div>
          ) : (
            <p><strong>Error:</strong> {results.error}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DatabaseCleanupComponent;

