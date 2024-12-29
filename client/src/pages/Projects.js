import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/projects/ProjectCard';

function Projects() {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    techStack: '',
    thumbnail: '',
    githubLink: '',
    liveLink: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      console.log('Fetched projects:', response.data);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await api.delete(`/projects/${projectId}`);
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const techStackArray = projectForm.techStack
        ? projectForm.techStack.split(',').map(tech => tech.trim()).filter(Boolean)
        : [];

      const projectData = {
        title: projectForm.title,
        description: projectForm.description,
        techStack: techStackArray,
        githubLink: projectForm.githubLink || '',
        thumbnail: projectForm.thumbnail || '',
        demoLink: projectForm.liveLink || '',
        userId: currentUser.uid,
        authorName: currentUser.displayName || currentUser.email.split('@')[0]
      };

      const response = await api.post('/projects', projectData);
      setProjects([response.data, ...projects]);
      toast.success('Project created successfully!');
      setShowCreateModal(false);
      setProjectForm({
        title: '',
        description: '',
        techStack: '',
        thumbnail: '',
        githubLink: '',
        liveLink: ''
      });
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error(error.response?.data?.message || 'Failed to create project');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Hero Section */}
      <div className="relative h-screen bg-gradient-primary overflow-hidden">
        {/* Background Illustrations */}
        <div className="absolute inset-0">
          {/* Code Editor Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 0.1, x: 0 }}
            transition={{ duration: 1 }}
            className="absolute left-10 top-1/4 transform -translate-y-1/2"
          >
            <svg width="400" height="400" viewBox="0 0 24 24" fill="white">
              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
            </svg>
          </motion.div>

          {/* Circuit Board Pattern */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 0.1, x: 0 }}
            transition={{ duration: 1 }}
            className="absolute right-10 bottom-1/4 transform translate-y-1/2"
          >
            <svg width="400" height="400" viewBox="0 0 24 24" fill="white">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z"/>
              <path d="M6 10h2v2H6zm0 4h8v2H6zm10 0h2v2h-2zm-6-4h8v2h-8z"/>
            </svg>
          </motion.div>

          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/10 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/50 to-primary/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
              Developer Projects
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12">
              Discover innovative projects from our community of developers or share your own creations
            </p>
            <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
              <Link
                to="#projects"
                className="btn-primary text-lg px-8 py-4"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Projects
              </Link>
              {currentUser && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="premium-glass text-lg px-8 py-4 rounded-full text-white hover:scale-105 transition-all duration-300"
                >
                  Share Your Project
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Projects Section */}
      <div id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-300 mb-4">No projects found</h3>
            {currentUser && (
              <p className="text-gray-400">
                Be the first to share a project!
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <ProjectCard
                key={project._id}
                project={project}
                onDelete={handleDeleteProject}
                currentUser={currentUser}
              />
            ))}
          </div>
        )}
      </div>

      {showCreateModal && (
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
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Create New Project
              </h2>

              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Project Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={projectForm.title}
                      onChange={handleInputChange}
                      className="input mt-1 w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={projectForm.description}
                      onChange={handleInputChange}
                      className="input mt-1 w-full h-32"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Tech Stack (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="techStack"
                      value={projectForm.techStack}
                      onChange={handleInputChange}
                      className="input mt-1 w-full"
                      placeholder="React, Node.js, MongoDB"
                      required
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Thumbnail URL
                    </label>
                    <input
                      type="url"
                      name="thumbnail"
                      value={projectForm.thumbnail}
                      onChange={handleInputChange}
                      className="input mt-1 w-full"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      GitHub Link
                    </label>
                    <input
                      type="url"
                      name="githubLink"
                      value={projectForm.githubLink}
                      onChange={handleInputChange}
                      className="input mt-1 w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Live Demo Link (Optional)
                    </label>
                    <input
                      type="url"
                      name="liveLink"
                      value={projectForm.liveLink}
                      onChange={handleInputChange}
                      className="input mt-1 w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3 border-t dark:border-gray-700 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-accent hover:bg-accent-secondary text-white rounded-lg transition-colors duration-200"
                >
                  Create Project
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Projects; 