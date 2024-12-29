import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../services/api';
import toast from 'react-hot-toast';

function NewsDetails() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNewsDetails = useCallback(async () => {
    try {
      const response = await api.get(`/news/${id}`);
      setNews(response.data);
    } catch (error) {
      toast.error('Failed to fetch news details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchNewsDetails();
  }, [fetchNewsDetails]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-gradient-dark flex flex-col items-center justify-center">
        <h2 className="text-2xl text-white mb-4">Article not found</h2>
        <Link to="/news" className="text-accent hover:text-accent-secondary">
          Back to News
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
          {/* News Header */}
          <div className="relative h-64 sm:h-96 overflow-hidden">
            <img
              src={news.thumbnail || 'https://via.placeholder.com/300x200?text=News+Article'}
              alt={news.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=News+Article';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="text-3xl font-bold text-white mb-2">{news.title}</h1>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 text-sm rounded-full bg-accent/10 text-accent">
                  {news.category}
                </span>
                <p className="text-gray-200">By {news.author?.username || 'Anonymous'}</p>
              </div>
            </div>
          </div>

          {/* News Content */}
          <div className="p-6 space-y-6">
            {/* Description */}
            <div className="text-lg text-gray-300 leading-relaxed font-medium">
              {news.description}
            </div>

            {/* Full Content */}
            <div className="space-y-4">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {news.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-700">
              <span className="text-gray-400">
                Published on {new Date(news.createdAt).toLocaleDateString()}
              </span>
              <Link
                to="/news"
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg 
                         transition-colors duration-300 text-sm font-medium"
              >
                Back to News
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default NewsDetails; 