import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../services/api';
import toast from 'react-hot-toast';

function ToolDetails() {
  const { id } = useParams();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchToolDetails = useCallback(async () => {
    try {
      const response = await api.get(`/tools/${id}`);
      setTool(response.data);
    } catch (error) {
      toast.error('Failed to fetch tool details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchToolDetails();
  }, [fetchToolDetails]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-gradient-dark flex flex-col items-center justify-center">
        <h2 className="text-2xl text-white mb-4">Tool not found</h2>
        <Link to="/webstore" className="text-accent hover:text-accent-secondary">
          Back to Web Store
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
          {/* Tool Header */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={tool.thumbnail || 'https://via.placeholder.com/300x200?text=Web+Tool'}
              alt={tool.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=Web+Tool';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="text-3xl font-bold text-white mb-2">{tool.name}</h1>
              <p className="text-gray-200">By {tool.author?.username || 'Anonymous'}</p>
            </div>
          </div>

          {/* Tool Content */}
          <div className="p-6 space-y-6">
            {/* Category */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-sm rounded-full bg-accent/10 text-accent">
                {tool.category}
              </span>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">About the Tool</h2>
              <p className="text-gray-300 leading-relaxed">
                {tool.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href={tool.accessLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-accent hover:bg-accent-secondary text-white rounded-lg 
                         transition-colors duration-300 text-sm font-medium"
              >
                Access Tool
              </a>
              <a
                href={`${tool.accessLink}/docs`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg 
                         transition-colors duration-300 text-sm font-medium"
              >
                View Developer Docs
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ToolDetails; 