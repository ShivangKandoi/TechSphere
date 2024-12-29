import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

function CreateProject() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    githubLink: '',
    thumbnail: '',
    demoLink: '',
    detailedDescription: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const techStackArray = formData.techStack
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech !== '');

      const projectData = {
        title: formData.title,
        description: formData.description,
        techStack: techStackArray,
        githubLink: formData.githubLink || '',
        thumbnail: formData.thumbnail || 'https://via.placeholder.com/300x200?text=Project+Thumbnail',
        demoLink: formData.demoLink || '',
        detailedDescription: formData.detailedDescription || formData.description,
        userId: currentUser.uid,
        authorName: currentUser.email.split('@')[0]
      };

      await api.post('/projects', projectData);
      toast.success('Project created successfully!');
      navigate('/projects');
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
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
    <div className="min-h-screen bg-gradient-dark py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Create New Project</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-200 mb-2">Project Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="input w-full"
                placeholder="Enter project title"
              />
            </div>

            <div>
              <label className="block text-gray-200 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="input w-full h-32"
                placeholder="Enter project description"
              />
            </div>

            <div>
              <label className="block text-gray-200 mb-2">Tech Stack (comma-separated)</label>
              <input
                type="text"
                name="techStack"
                value={formData.techStack}
                onChange={handleChange}
                required
                className="input w-full"
                placeholder="React, Node.js, MongoDB"
              />
            </div>

            <div>
              <label className="block text-gray-200 mb-2">Thumbnail URL</label>
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

            <div>
              <label className="block text-gray-200 mb-2">Demo Link (Optional)</label>
              <input
                type="url"
                name="demoLink"
                value={formData.demoLink}
                onChange={handleChange}
                className="input w-full"
                placeholder="https://your-demo-link.com"
              />
            </div>

            <div>
              <label className="block text-gray-200 mb-2">GitHub Link (Optional)</label>
              <input
                type="url"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                className="input w-full"
                placeholder="https://github.com/username/project"
              />
            </div>

            <div>
              <label className="block text-gray-200 mb-2">Detailed Description (Optional)</label>
              <textarea
                name="detailedDescription"
                value={formData.detailedDescription}
                onChange={handleChange}
                className="input w-full h-48"
                placeholder="Enter a detailed description of your project..."
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/projects')}
                className="px-4 py-2 rounded-lg bg-gray-500/20 hover:bg-gray-500/30 transition-colors text-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Creating...' : 'Create Project'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default CreateProject; 