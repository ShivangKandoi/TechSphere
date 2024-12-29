const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
const apiLimiter = require('./middleware/rateLimit');
const options = require('./swagger');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const logger = require('./middleware/logger');

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://techsphere-v2.vercel.app', 'http://localhost:3000']
    : ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(apiLimiter);
app.use(logger);

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL
  })
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to TechSphere API' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
const apiRouter = express.Router();

// API root route
apiRouter.get('/', (req, res) => {
  res.json({
    message: 'Welcome to TechSphere API',
    version: '1.0',
    endpoints: {
      auth: '/api/auth',
      projects: '/api/projects',
      news: '/api/news',
      tools: '/api/tools',
      webstore: '/api/webstore',
      admin: '/api/admin'
    }
  });
});

// Mount routes on the API router
apiRouter.use('/auth', require('./routes/auth'));
apiRouter.use('/admin', require('./routes/admin'));
apiRouter.use('/projects', require('./routes/projects'));
apiRouter.use('/news', require('./routes/news'));
apiRouter.use('/tools', require('./routes/tools'));
apiRouter.use('/webstore', require('./routes/webstore'));

// Mount API router at /api
app.use('/api', apiRouter);

// Swagger Documentation
const swaggerDocs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ 
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: [
      '/',
      '/api/auth',
      '/api/projects',
      '/api/news',
      '/api/tools',
      '/api/webstore',
      '/api/admin',
      '/health',
      '/api-docs'
    ]
  });
});

module.exports = app; 