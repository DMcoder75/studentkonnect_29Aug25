// API Configuration
export const API_BASE_URL = 'https://19hninc1m30j.manussite.space/api';

// API Endpoints
export const API_ENDPOINTS = {
  universities: '/universities',
  programs: '/programs',
  courses: '/courses'
};

// Helper function to build API URLs
export const buildApiUrl = (endpoint, params = {}) => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
      url.searchParams.append(key, params[key]);
    }
  });
  return url.toString();
};

