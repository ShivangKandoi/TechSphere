import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';

const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

class ProfileErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Profile Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-400">Something went wrong</h2>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ProfileErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

function Profile() {
  const { currentUser } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({
    displayName: '',
    linkedinUrl: '',
    githubUrl: ''
  });

  const initialFormState = {
    displayName: '',
    college: '',
    linkedinUrl: '',
    githubUrl: '',
    bio: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const validateForm = () => {
    const errors = {};
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    if (!formData.displayName.trim()) {
      errors.displayName = 'Display name is required';
    }

    if (formData.linkedinUrl && !urlRegex.test(formData.linkedinUrl)) {
      errors.linkedinUrl = 'Please enter a valid LinkedIn URL';
    }

    if (formData.githubUrl && !urlRegex.test(formData.githubUrl)) {
      errors.githubUrl = 'Please enter a valid GitHub URL';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    try {
      setIsSubmitting(true);
      const updatedUser = await authService.updateProfile(formData);
      
      const normalizedData = {
        displayName: updatedUser.displayName || '',
        college: updatedUser.college || '',
        linkedinUrl: updatedUser.linkedinUrl || '',
        githubUrl: updatedUser.githubUrl || '',
        bio: updatedUser.bio || '',
        ...updatedUser
      };

      setUserProfile(normalizedData);
      setFormData(normalizedData);
      setIsEditing(false);
      setFieldErrors({});
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormField = ({ label, name, type = 'text', error }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        disabled={isSubmitting}
        className={`w-full px-4 py-2 rounded-lg border ${
          error 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-gray-600 focus:ring-blue-500'
        } bg-gray-700 text-white focus:ring-2 
        focus:border-transparent transition-all duration-200`}
      />
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );

  FormField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    error: PropTypes.string
  };

  useEffect(() => {
    if (currentUser) {
      fetchUserProfile();
    }
  }, [currentUser]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const userData = await authService.getProfile();
      
      const normalizedData = {
        displayName: userData.displayName || '',
        college: userData.college || '',
        linkedinUrl: userData.linkedinUrl || '',
        githubUrl: userData.githubUrl || '',
        bio: userData.bio || '',
        ...userData
      };

      setUserProfile(normalizedData);
      setFormData(normalizedData);
      
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
      
      setUserProfile(null);
      setFormData({
        displayName: '',
        college: '',
        linkedinUrl: '',
        githubUrl: '',
        bio: ''
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, 0],
              opacity: [0.3, 0.2, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-24 -right-24 w-96 h-96 bg-blue-800 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -5, 0],
              opacity: [0.3, 0.2, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 2 }}
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-800 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-32 h-32 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 shadow-lg mb-6"
            >
              <span className="text-5xl font-bold">
                {userProfile?.displayName?.[0]?.toUpperCase() || currentUser?.email?.[0]?.toUpperCase()}
              </span>
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100"
            >
              {userProfile?.displayName || currentUser?.email?.split('@')[0]}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-blue-100 mb-6"
            >
              {currentUser?.email}
            </motion.p>
            {!isEditing && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-white/10 rounded-full text-sm font-medium hover:bg-white/20 transition-all backdrop-blur-sm border border-white/10"
              >
                Edit Profile
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-12 -mt-10">
        {isEditing ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-xl p-8 space-y-6 relative backdrop-blur-sm border border-gray-700"
          >
            <FormField 
              label="Display Name" 
              name="displayName" 
              error={fieldErrors.displayName}
            />
            <FormField 
              label="College/University" 
              name="college"
            />
            <FormField 
              label="LinkedIn URL" 
              name="linkedinUrl" 
              type="url"
              error={fieldErrors.linkedinUrl}
            />
            <FormField 
              label="GitHub URL" 
              name="githubUrl" 
              type="url"
              error={fieldErrors.githubUrl}
            />
            <div className="flex justify-end space-x-4 pt-6">
              <motion.button
                type="button"
                onClick={() => setIsEditing(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="px-6 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                  transition-all duration-200 shadow-md hover:shadow-lg 
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </motion.button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-xl p-8 space-y-8 backdrop-blur-sm border border-gray-700"
          >
            {/* Profile sections */}
            {userProfile?.college && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-100">
                  🎓 College/University
                </h3>
                <p className="text-gray-300 pl-7">
                  {userProfile.college}
                </p>
              </div>
            )}

            {userProfile?.bio && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-100">
                  📝 Bio
                </h3>
                <p className="text-gray-300 pl-7">
                  {userProfile.bio}
                </p>
              </div>
            )}

            {/* Social links */}
            <div className="flex space-x-4 pt-4">
              {userProfile?.linkedinUrl && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={userProfile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-900 rounded-full text-blue-300 hover:bg-blue-800 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </motion.a>
              )}

              {userProfile?.githubUrl && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={userProfile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-700 rounded-full text-gray-300 hover:bg-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.115 2.504.337 1.909-1.29 2.747-1.022 2.747-1.022.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd"/>
                  </svg>
                </motion.a>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

Profile.propTypes = {
  // Add prop types if needed
};

export default function ProfileWithErrorBoundary() {
  return (
    <ProfileErrorBoundary>
      <Profile />
    </ProfileErrorBoundary>
  );
} 