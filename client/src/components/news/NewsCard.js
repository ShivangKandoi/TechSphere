import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function NewsCard({ news, onDelete, currentUser }) {
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
      {/* News Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={news.thumbnail || 'https://via.placeholder.com/300x200?text=News+Article'}
          alt={news.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=News+Article';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {news.title}
          </h3>
          {currentUser?.isAdmin && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(news._id)}
              className="text-red-500 hover:text-red-600 transition-colors duration-300"
              title="Delete news"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </motion.button>
          )}
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {news.description}
        </p>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(news.createdAt).toLocaleDateString()}
          </span>
          <Link
            to={`/news/${news._id}`}
            className="px-4 py-2 bg-accent hover:bg-accent-secondary text-white rounded-lg 
                     transition-colors duration-300 text-sm font-medium"
          >
            Read More
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default NewsCard; 