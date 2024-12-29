import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function ProjectCard({ project, onDelete, currentUser }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden 
                 border border-gray-100 dark:border-gray-700 hover:shadow-xl 
                 transition-all duration-300"
    >
      {/* Project Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.thumbnail || 'https://via.placeholder.com/300x200?text=Project+Thumbnail'}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Project+Thumbnail';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {project.title}
          </h3>
          {(currentUser?.isAdmin || currentUser?.uid === project.author?.firebaseUid) && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(project._id)}
              className="text-red-500 hover:text-red-600 transition-colors duration-300"
              title={currentUser?.isAdmin ? "Delete as Admin" : "Delete your project"}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </motion.button>
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900 
                       text-blue-800 dark:text-blue-200 font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 
                          flex items-center justify-center text-white font-medium">
              {project.author?.username?.[0]?.toUpperCase() || '?'}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {project.author?.username || 'Anonymous'}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 
                         dark:hover:text-gray-200 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.115 2.504.337 1.909-1.29 2.747-1.022 2.747-1.022.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            <Link
              to={`/projects/${project._id}`}
              className="px-4 py-2 bg-accent hover:bg-accent-secondary text-white rounded-lg 
                       transition-colors duration-300 text-sm font-medium"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard; 