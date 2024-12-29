import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

function Signup() {
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signup(formData.email, formData.password, formData.username);
      toast.success('Account created successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGoogleSignup = async () => {
    try {
      setIsLoading(true);
      await loginWithGoogle();
      toast.success('Account created successfully with Google!');
      navigate('/profile');
    } catch (error) {
      console.error('Google signup error:', error);
      toast.error(error.message || 'Failed to create account with Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700"
      >
        <div>
          <h2 className="text-3xl font-bold text-center text-white">
            Create Account
          </h2>
          <p className="mt-2 text-center text-gray-300">
            Join our community today
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg 
                         text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Choose a username"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg 
                         text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg 
                         text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Choose a password"
              />
            </div>
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
                       transition-all duration-200 font-medium focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-blue-500 
                       ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Creating Account...' : 'Sign up'}
            </motion.button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
            </div>
          </div>

          <div>
            <button
              onClick={handleGoogleSignup}
              type="button"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-600 
                       rounded-lg shadow-sm text-sm font-medium text-gray-200 bg-gray-700 
                       hover:bg-gray-600 transition-colors"
            >
              <img
                className="h-5 w-5 mr-2"
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google logo"
              />
              Sign up with Google
            </button>
          </div>

          <div className="text-center">
            <Link 
              to="/login" 
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Signup; 