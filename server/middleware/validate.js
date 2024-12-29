const { validationResult, check } = require('express-validator');

const validateProject = [
  check('title').notEmpty().trim().escape().withMessage('Title is required'),
  check('description').notEmpty().trim().withMessage('Description is required'),
  check('techStack').isArray().withMessage('Tech stack must be an array'),
  check('githubLink').optional().isURL().withMessage('Invalid GitHub URL'),
  check('demoLink').optional().isURL().withMessage('Invalid demo URL'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateNews = [
  check('title').notEmpty().trim().escape().withMessage('Title is required'),
  check('description').notEmpty().trim().withMessage('Description is required'),
  check('content').notEmpty().trim().withMessage('Content is required'),
  check('category').isIn(['AI', 'Web Dev', 'Cybersecurity', 'Mobile', 'Cloud', 'Other'])
    .withMessage('Invalid category'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateProject, validateNews }; 