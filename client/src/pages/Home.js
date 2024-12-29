import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const { currentUser } = useAuth();

  const features = [
    {
      title: "Project Showcase",
      description: "Share and discover innovative projects from our community of developers.",
      icon: "💻",
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Developer Tools",
      description: "Access a curated collection of essential development tools and resources.",
      icon: "🛠️",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Tech News",
      description: "Stay updated with the latest trends and developments in technology.",
      icon: "📱",
      color: "from-teal-500 to-emerald-500"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-dark overscroll-none">
      {/* Hero Section */}
      <div className="relative h-screen snap-start">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 opacity-90"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-blue-500/30 rounded-full blur-3xl"
          />
          
          {/* Decorative Lines */}
          <div className="absolute top-0 left-0 w-full h-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] rotate-12"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="h-screen flex flex-col justify-center items-center text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold text-white mb-8"
            >
              Welcome to TechSphere
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-200 mb-12 max-w-2xl"
            >
              A community platform for developers to showcase projects, discover tools, and stay updated with tech news.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6"
            >
              <Link to="/projects" className="btn-primary">
                Explore Projects
              </Link>
              {!currentUser && (
                <Link to="/login" className="premium-glass px-8 py-4 rounded-full text-white">
                  Join Community
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="h-screen snap-start bg-gradient-dark">
        <div className="h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                Everything You Need
              </h2>
              <p className="text-xl text-gray-300">
                Discover all the features that make TechSphere unique
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="premium-glass p-8 rounded-xl"
                >
                  <div className="text-5xl mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="h-screen snap-start bg-gradient-primary">
        <div className="h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="premium-glass p-8 rounded-xl text-center"
              >
                <div className="text-6xl font-bold text-white mb-4">500+</div>
                <div className="text-xl text-gray-200">Projects Shared</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="premium-glass p-8 rounded-xl text-center"
              >
                <div className="text-6xl font-bold text-white mb-4">1,000+</div>
                <div className="text-xl text-gray-200">Community Members</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="premium-glass p-8 rounded-xl text-center"
              >
                <div className="text-6xl font-bold text-white mb-4">50+</div>
                <div className="text-xl text-gray-200">Developer Tools</div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="h-screen snap-start bg-gradient-dark">
        <div className="h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                Join our community of developers and start sharing your projects today.
              </p>
              <Link
                to="/projects"
                className="btn-primary inline-block"
              >
                Get Started Now →
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 