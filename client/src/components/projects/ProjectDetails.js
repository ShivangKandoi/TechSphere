import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import toast from 'react-hot-toast';
import EditProject from './EditProject';
import { AnimatePresence } from 'framer-motion';

function ProjectDetails() {
  const { id } = useParams();
  const { currentUser } = useAuth(); // eslint-disable-line no-unused-vars
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchProjectDetails = useCallback(async () => {
    try {
      const response = await api.get(`/projects/${id}`);
      setProject(response.data);
    } catch (error) {
      toast.error('Failed to fetch project details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProjectDetails();
  }, [fetchProjectDetails]);

  const canEdit = currentUser?.isAdmin || currentUser?.uid === project?.author?.firebaseUid;

  const handleProjectUpdate = (updatedProject) => {
    setProject(updatedProject);
    toast.success('Project updated successfully');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-dark flex flex-col items-center justify-center">
        <h2 className="text-2xl text-white mb-4">Project not found</h2>
        <Link to="/projects" className="text-accent hover:text-accent-secondary">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="premium-glass rounded-xl overflow-hidden"
        >
          {/* Project Header */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="text-3xl font-bold text-white mb-2">{project.title}</h1>
              <p className="text-gray-200">By {project.authorName}</p>
            </div>
            {canEdit && (
              <div className="absolute top-4 right-4 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-accent/80 hover:bg-accent rounded-lg text-white backdrop-blur-sm"
                  onClick={() => setShowEditModal(true)}
                >
                  Edit Project
                </motion.button>
              </div>
            )}
          </div>

          {/* Project Content */}
          <div className="p-6 space-y-6">
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-accent/10 text-accent"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">About the Project</h2>
              <p className="text-gray-300 leading-relaxed">
                {project.detailedDescription || project.description}
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.115 2.504.337 1.909-1.29 2.747-1.022 2.747-1.022.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd"/>
                  </svg>
                  View on GitHub
                </a>
              )}
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-secondary rounded-lg text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {showEditModal && (
          <EditProject
            project={project}
            onClose={() => setShowEditModal(false)}
            onUpdate={handleProjectUpdate}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProjectDetails; 