import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SidebarExact = () => {
  const navigate = useNavigate();
  const [smartApplyExpanded, setSmartApplyExpanded] = useState(true);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 bg-gradient-to-b from-white via-purple-50/30 to-cyan-50/30 border-r border-gray-200 transition-all duration-300 h-screen backdrop-blur-sm">
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="flex items-center mb-6 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleNavigation('/')}>
          <div className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg p-2 font-bold text-lg mr-3 shadow-lg">
            SK
          </div>
          <span className="text-xl font-bold text-gray-800">StudentKonnect</span>
        </div>

        <nav className="space-y-2">
          {/* Home */}
          <div>
            <button 
              onClick={() => handleNavigation('/')}
              className="w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house h-5 w-5 mr-3" aria-hidden="true">
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="font-medium">Home</span>
              </div>
              <div className="flex items-center"></div>
            </button>
          </div>

          {/* Global Education */}
          <div>
            <button 
              onClick={() => handleNavigation('/global/universities')}
              className="w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe h-5 w-5 mr-3" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                  <path d="M2 12h20"></path>
                </svg>
                <span className="font-medium">Global Education</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right h-4 w-4" aria-hidden="true">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </div>
            </button>
          </div>

          {/* Australia Process */}
          <div>
            <button 
              onClick={() => handleNavigation('/australia-process')}
              className="w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap h-5 w-5 mr-3" aria-hidden="true">
                  <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
                  <path d="M22 10v6"></path>
                  <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
                </svg>
                <span className="font-medium">Australia Process</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right h-4 w-4" aria-hidden="true">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </div>
            </button>
          </div>

          {/* Find Counselors */}
          <div>
            <button 
              onClick={() => handleNavigation('/counselor/directory')}
              className="w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user h-5 w-5 mr-3" aria-hidden="true">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="font-medium">Find Counselors</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right h-4 w-4" aria-hidden="true">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </div>
            </button>
          </div>

          {/* Career Insights */}
          <div>
            <button 
              onClick={() => handleNavigation('/career-insights')}
              className="w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up h-5 w-5 mr-3" aria-hidden="true">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                  <polyline points="16 7 22 7 22 13"></polyline>
                </svg>
                <span className="font-medium">Career Insights</span>
              </div>
              <div className="flex items-center"></div>
            </button>
          </div>

          {/* Smart Apply with Submenu */}
          <div>
            <button 
              onClick={() => setSmartApplyExpanded(!smartApplyExpanded)}
              className="w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text h-5 w-5 mr-3" aria-hidden="true">
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                  <path d="M10 9H8"></path>
                  <path d="M16 13H8"></path>
                  <path d="M16 17H8"></path>
                </svg>
                <span className="font-medium">Smart Apply</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-chevron-down h-4 w-4 transition-transform ${smartApplyExpanded ? 'rotate-180' : ''}`} aria-hidden="true">
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </div>
            </button>
            
            {/* Smart Apply Submenu */}
            {smartApplyExpanded && (
              <div className="ml-8 mt-2 space-y-1">
                <div>
                  <button 
                    onClick={() => handleNavigation('/sop-builder')}
                    className="w-full flex items-center justify-between px-4 py-2 text-sm rounded-md transition-colors text-gray-600 hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <span>SOP Builder</span>
                    </div>
                  </button>
                </div>
                <div>
                  <button 
                    onClick={() => handleNavigation('/resume-builder')}
                    className="w-full flex items-center justify-between px-4 py-2 text-sm rounded-md transition-colors bg-purple-50 text-purple-600"
                  >
                    <div className="flex items-center">
                      <span>Resume Builder</span>
                    </div>
                  </button>
                </div>
                <div>
                  <button 
                    onClick={() => handleNavigation('/reference-letter')}
                    className="w-full flex items-center justify-between px-4 py-2 text-sm rounded-md transition-colors text-gray-600 hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <span>Reference Letter Toolkit</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Scholarships Assist */}
          <div>
            <button 
              onClick={() => handleNavigation('/scholarships')}
              className="w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award h-5 w-5 mr-3" aria-hidden="true">
                  <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                  <circle cx="12" cy="8" r="6"></circle>
                </svg>
                <span className="font-medium">Scholarships Assist</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right h-4 w-4" aria-hidden="true">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </div>
            </button>
          </div>

          {/* Visa & International Students */}
          <div>
            <button 
              onClick={() => handleNavigation('/visa-international')}
              className="w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe h-5 w-5 mr-3" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                  <path d="M2 12h20"></path>
                </svg>
                <span className="font-medium">Visa &amp; International Students</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right h-4 w-4" aria-hidden="true">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </div>
            </button>
          </div>

          {/* Help & Resources */}
          <div>
            <button 
              onClick={() => handleNavigation('/help-resources')}
              className="w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-help h-5 w-5 mr-3" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <path d="M12 17h.01"></path>
                </svg>
                <span className="font-medium">Help &amp; Resources</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right h-4 w-4" aria-hidden="true">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </div>
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default SidebarExact;

