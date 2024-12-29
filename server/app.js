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
  origin: [
    'https://tech-sphere-seven.vercel.app',
    'http://localhost:3000',
    'https://tech-sphere-seven.vercel.app/',
    'http://tech-sphere-seven.vercel.app',
    'http://tech-sphere-seven.vercel.app/',
    undefined,
    'null'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400, // 24 hours
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Add security headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(apiLimiter);
app.use(logger);

// Add this after your existing logger middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
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