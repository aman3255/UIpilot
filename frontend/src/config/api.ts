// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://uipilot.onrender.com',
  AUTH_ENDPOINTS: {
    SIGNUP: '/api/v1/auth/signup',
    SIGNIN: '/api/v1/auth/signin',
  },
  AI_ENDPOINTS: {
    GENERATE: '/api/v1/ai/generate',
    SESSIONS: '/api/v1/ai/sessions',
    MESSAGES: '/api/v1/ai/messages',
    PREVIEW: '/api/v1/ai/preview',
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}; 


