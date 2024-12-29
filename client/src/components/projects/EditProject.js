import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import toast from 'react-hot-toast';

function EditProject({ project, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    title: project.title,
    description: project.description,
    techStack: project.techStack.join(', '),
    githubLink: project.githubLink || '',
    thumbnail: project.thumbnail || '',
    demoLink: project.demoLink || '',
    detailedDescription: project.detailedDescription || project.description
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const techStackArray = formData.techStack
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech !== '');

      const updatedProject = {
        ...formData,
        techStack: techStackArray
      };

      const response = await api.put(`/projects/${project._id}`, updatedProject);
      toast.success('Project updated successfully');
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
        className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Project</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Project Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="input w-full"
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
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Tech Stack (comma-separated)</label>
            <input
              type="text"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              required
              className="input w-full"
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
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Demo Link</label>
            <input
              type="url"
              name="demoLink"
              value={formData.demoLink}
              onChange={handleChange}
              className="input w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">GitHub Link</label>
            <input
              type="url"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              className="input w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Detailed Description</label>
            <textarea
              name="detailedDescription"
              value={formData.detailedDescription}
              onChange={handleChange}
              className="input w-full h-48"
            />
          </div>

          <div className="flex justify-end space-x-4">
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
              {loading ? 'Updating...' : 'Update Project'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default EditProject; 