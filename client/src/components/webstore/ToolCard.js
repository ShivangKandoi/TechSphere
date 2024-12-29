import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function ToolCard({ tool, onDelete, currentUser }) {
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
      {/* Tool Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={tool.thumbnail || 'https://via.placeholder.com/300x200?text=Web+Tool'}
          alt={tool.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Web+Tool';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {tool.name}
          </h3>
          {(currentUser?.isAdmin || currentUser?.uid === tool.author?.firebaseUid) && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(tool._id)}
              className="text-red-500 hover:text-red-600 transition-colors duration-300"
              title="Delete tool"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </motion.button>
          )}
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {tool.description}
        </p>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
          <span className="px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900 
                         text-blue-800 dark:text-blue-200 font-medium">
            {tool.category}
          </span>
          <div className="flex gap-2">
            <Link
              to={`/webstore/${tool._id}`}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg 
                       transition-colors duration-300 text-sm font-medium"
            >
              View Details
            </Link>
            <a
              href={tool.accessLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-accent hover:bg-accent-secondary text-white rounded-lg 
                       transition-colors duration-300 text-sm font-medium"
            >
              Access Tool
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ToolCard; 