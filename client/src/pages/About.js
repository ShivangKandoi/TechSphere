import React from 'react';
import { motion } from 'framer-motion';

function About() {
  const sections = [
    {
      id: 'about',
      title: 'About TechSphere',
      description: 'TechSphere is a dynamic platform built for developers, by developers. Our mission is to create a thriving ecosystem where developers can showcase their work, discover tools, and stay updated with the latest in technology.',
      icon: '🌐',
      gradient: 'from-blue-600 via-indigo-600 to-purple-700'
    },
    {
      id: 'tech',
      title: 'Technology Stack',
      content: [
        { name: 'Frontend', items: ['React.js', 'Tailwind CSS', 'Framer Motion'] },
        { name: 'Backend', items: ['Node.js', 'Express.js', 'MongoDB'] },
        { name: 'Authentication', items: ['Firebase Auth', 'JWT'] },
        { name: 'Deployment', items: ['AWS', 'Docker', 'Nginx'] }
      ],
      icon: '⚡',
      gradient: 'from-blue-600 via-indigo-600 to-purple-700'
    },
    {
      id: 'api',
      title: 'API Architecture',
      description: 'Our RESTful API is built with scalability and security in mind. We use JWT for authentication, rate limiting for protection, and follow best practices for endpoint design.',
      features: ['RESTful Endpoints', 'JWT Authentication', 'Rate Limiting', 'Error Handling', 'Data Validation', 'Swagger Documentation'],
      icon: '🔧',
      gradient: 'from-teal-600 via-emerald-600 to-green-600'
    },
    {
      id: 'future',
      title: 'Future Roadmap',
      plans: [
        'Real-time Collaboration Features',
        'AI-Powered Code Review',
        'Advanced Analytics Dashboard',
        'Mobile Application',
        'Integration with Popular Dev Tools',
        'Community Events Platform'
      ],
      icon: '🚀',
      gradient: 'from-orange-600 via-amber-600 to-yellow-600'
    },
    {
      id: 'team',
      title: 'Development Team',
      description: 'Built with passion by developers who understand the needs of the community.',
      team: [
        { name: 'John Doe', role: 'Full Stack Developer', github: 'johndoe' },
        { name: 'Jane Smith', role: 'UI/UX Designer', github: 'janesmith' },
        { name: 'Mike Johnson', role: 'Backend Developer', github: 'mikej' }
      ],
      icon: '👥',
      gradient: 'from-cyan-600 via-blue-600 to-indigo-600'
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-dark overscroll-none">
      {sections.map((section, index) => (
        <div 
          key={section.id}
          className="relative h-screen snap-start flex items-center justify-center overflow-hidden"
        >
          {/* Background with website theme */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 opacity-90"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, 0],
                opacity: [0.3, 0.2, 0.3]
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -5, 0],
                opacity: [0.3, 0.2, 0.3]
              }}
              transition={{ duration: 8, repeat: Infinity, delay: 2 }}
              className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
            />
          </div>

          {/* Pattern Overlay */}
          <div className="absolute inset-0 bg-pattern opacity-10"></div>

          {/* Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              {/* Section Header */}
              <div className="text-center mb-12">
                <span className="text-6xl mb-6 block">{section.icon}</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100">
                  {section.title}
                </h2>
              </div>

              {/* Section Content with enhanced styling */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20
                            hover:bg-white/15 transition-all duration-300">
                {section.description && (
                  <p className="text-lg text-center mb-8">{section.description}</p>
                )}

                {section.content && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {section.content.map((tech, i) => (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="bg-white/5 rounded-xl p-4"
                      >
                        <h3 className="font-semibold mb-3">{tech.name}</h3>
                        <ul className="space-y-2">
                          {tech.items.map((item, j) => (
                            <li key={j} className="text-sm opacity-80">{item}</li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                )}

                {section.features && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {section.features.map((feature, i) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="bg-white/5 rounded-xl p-4 text-center"
                      >
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                )}

                {section.plans && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.plans.map((plan, i) => (
                      <motion.div
                        key={plan}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="flex items-center space-x-3 bg-white/5 rounded-xl p-4"
                      >
                        <span className="text-xl">📍</span>
                        <span>{plan}</span>
                      </motion.div>
                    ))}
                  </div>
                )}

                {section.team && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {section.team.map((member, i) => (
                      <motion.div
                        key={member.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="text-center bg-white/5 rounded-xl p-6"
                      >
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center text-3xl">
                          👤
                        </div>
                        <h3 className="font-semibold text-xl mb-2">{member.name}</h3>
                        <p className="text-sm opacity-80 mb-4">{member.role}</p>
                        <a
                          href={`https://github.com/${member.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 text-sm hover:text-blue-300 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.115 2.504.337 1.909-1.29 2.747-1.022 2.747-1.022.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd"/>
                          </svg>
                          <span>@{member.github}</span>
                        </a>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default About; 