const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TechSphere API',
      version: '1.0.0',
      description: 'TechSphere API Documentation',
      contact: {
        name: 'API Support',
        url: 'http://localhost:4000'
      }
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Development server'
      }
    ]
  },
  apis: ['./routes/*.js']
};

module.exports = options; 