import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { toast } from 'react-hot-toast';

function Admin() {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProjects: 0,
    totalTools: 0,
    totalNews: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Failed to fetch admin statistics');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser?.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 pb-12">
      {/* Hero Section */}
      <div className="relative h-screen bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white flex items-center mb-16 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, 0],
              opacity: [0.3, 0.2, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -5, 0],
              opacity: [0.3, 0.2, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 2 }}
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
          />
          
          {/* Decorative Lines */}
          <div className="absolute top-0 left-0 w-full h-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] rotate-12"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 shadow-lg"
            >
              <span className="text-5xl">👑</span>
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100"
            >
              Admin Dashboard
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            >
              Manage your platform and monitor its growth with powerful admin tools
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Stats Grid - Add container class for better spacing */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Users Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Total Users
              </h3>
              <span className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                👥
              </span>
            </div>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {loading ? "..." : stats.totalUsers}
            </p>
          </motion.div>

          {/* Projects Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Total Projects
              </h3>
              <span className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                💻
              </span>
            </div>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {loading ? "..." : stats.totalProjects}
            </p>
          </motion.div>

          {/* Tools Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Total Tools
              </h3>
              <span className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                🛠️
              </span>
            </div>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {loading ? "..." : stats.totalTools}
            </p>
          </motion.div>

          {/* News Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Total News
              </h3>
              <span className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                📰
              </span>
            </div>
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              {loading ? "..." : stats.totalNews}
            </p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* User Management */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                User Management
              </h2>
              <span className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                👤
              </span>
            </div>
            <div className="space-y-4">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View All Users
              </button>
              <button className="w-full px-4 py-2 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                Manage Permissions
              </button>
            </div>
          </div>

          {/* Content Management */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Content Management
              </h2>
              <span className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                📝
              </span>
            </div>
            <div className="space-y-4">
              <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Manage Projects
              </button>
              <button className="w-full px-4 py-2 bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors">
                Manage News
              </button>
            </div>
          </div>

          {/* System Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                System Settings
              </h2>
              <span className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                ⚙️
              </span>
            </div>
            <div className="space-y-4">
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Site Settings
              </button>
              <button className="w-full px-4 py-2 bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors">
                View Logs
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Admin; 