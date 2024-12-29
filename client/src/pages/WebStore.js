import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../services/api';
import ToolCard from '../components/webstore/ToolCard';

function WebStore() {
  const { currentUser } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toolForm, setToolForm] = useState({
    name: '',
    description: '',
    category: 'Productivity',
    accessLink: '',
    thumbnail: ''
  });
  const [tools, setTools] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Productivity', 'Development', 'Debugging', 'Testing', 'Other'];

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const response = await api.get('/tools');
      setTools(response.data);
    } catch (error) {
      toast.error('Failed to fetch tools');
    }
  };

  const filteredTools = tools
    .filter(tool => selectedCategory === 'all' || tool.category === selectedCategory)
    .filter(tool =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setToolForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/tools', toolForm);
      setTools([response.data, ...tools]);
      toast.success('Tool added successfully!');
      setShowCreateModal(false);
      setToolForm({
        name: '',
        description: '',
        category: 'Productivity',
        accessLink: '',
        thumbnail: ''
      });
    } catch (error) {
      toast.error('Failed to add tool');
    }
  };

  const handleDelete = async (toolId) => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
      try {
        await api.delete(`/tools/${toolId}`);
        setTools(tools.filter(tool => tool._id !== toolId));
        toast.success('Tool deleted successfully');
      } catch (error) {
        toast.error('Failed to delete tool');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-screen bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                Developer Tools Hub
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed">
                Discover and share powerful tools to enhance your development workflow
              </p>
              {currentUser?.isAdmin && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCreateModal(true)}
                  className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg
                             shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                >
                  Share Tool
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>

        {/* Floating Icons Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, 0]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="text-white/10 text-9xl"
            >
              ⚡
            </motion.div>
          </div>
          <div className="absolute top-2/3 right-1/4">
            <motion.div
              animate={{
                y: [0, 20, 0],
                rotate: [0, -10, 0]
              }}
              transition={{ duration: 7, repeat: Infinity }}
              className="text-white/10 text-8xl"
            >
              🛠️
            </motion.div>
          </div>
          <div className="absolute bottom-1/4 right-1/3">
            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="text-white/10 text-7xl"
            >
              💻
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg 
            className="w-6 h-6 text-white opacity-75"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>

        {/* Gradient Overlay at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool._id}
              tool={tool}
              onDelete={handleDelete}
              currentUser={currentUser}
            />
          ))}
        </motion.div>

        {filteredTools.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
              No tools found
            </h3>
            <p className="text-gray-500 dark:text-gray-500 mt-2">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Create Tool Modal */}
      {showCreateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Add New Tool</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tool Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={toolForm.name}
                    onChange={handleInputChange}
                    className="input mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={toolForm.description}
                    onChange={handleInputChange}
                    className="input mt-1"
                    rows="3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Access Link
                  </label>
                  <input
                    type="url"
                    name="accessLink"
                    value={toolForm.accessLink}
                    onChange={handleInputChange}
                    className="input mt-1"
                    placeholder="https://"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Category
                  </label>
                  <select
                    name="category"
                    value={toolForm.category}
                    onChange={handleInputChange}
                    className="input mt-1"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Thumbnail URL (Optional)
                  </label>
                  <input
                    type="url"
                    name="thumbnail"
                    value={toolForm.thumbnail}
                    onChange={handleInputChange}
                    className="mt-1 input w-full"
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty for default thumbnail
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
                >
                  Add Tool
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default WebStore; 