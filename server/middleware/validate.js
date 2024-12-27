const { validationResult, check } = require('express-validator');

const validateProject = [
  check('title').notEmpty().trim().escape(),
  check('description').notEmpty().trim(),
  check('techStack').isArray(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
]; 