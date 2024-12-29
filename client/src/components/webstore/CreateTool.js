import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import toast from 'react-hot-toast';

function CreateTool({ onClose, onToolCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Development',
    downloadLink: '',
    thumbnail: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const toolData = {
        ...formData,
        price: parseFloat(formData.price) || 0
      };

      const response = await api.post('/tools', toolData);
      toast.success('Tool created successfully!');
      onToolCreated(response.data);
      onClose();
    } catch (error) {
      console.error('Error creating tool:', error);
      toast.error('Failed to create tool');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Tool</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Tool Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input w-full"
              placeholder="Enter tool name"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="input w-full h-32"
              placeholder="Enter tool description"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="input w-full"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="input w-full"
            >
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Productivity">Productivity</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Download Link</label>
            <input
              type="url"
              name="downloadLink"
              value={formData.downloadLink}
              onChange={handleChange}
              className="input w-full"
              placeholder="https://example.com/download"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Thumbnail URL</label>
            <input
              type="url"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              className="input w-full"
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-sm text-gray-400 mt-1">
              Leave empty for default thumbnail
            </p>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-accent hover:bg-accent-secondary text-white rounded-lg"
            >
              {loading ? 'Creating...' : 'Create Tool'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default CreateTool; 