import api from './api';

export const authService = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error.response?.data || error;
    }
  },
  
  getProfile: async () => {
    try {
      const response = await api.get('/auth/user');
      return response.data;
    } catch (error) {
      console.error('Profile fetch error:', error);
      throw error.response?.data || error;
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/auth/user', profileData);
      return response.data;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error.response?.data || error;
    }
  }
};

export default authService; 