const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('author', 'username email')
      .select('-__v')
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

// Create a new project
router.post('/', authenticateToken, async (req, res) => {
  try {
    // First, get or create the user document
    let user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      user = await User.create({
        firebaseUid: req.user.uid,
        email: req.user.email,
        username: req.user.email.split('@')[0]
      });
    }

    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      techStack: req.body.techStack,
      githubLink: req.body.githubLink,
      thumbnail: req.body.thumbnail || 'https://via.placeholder.com/300x200?text=Project+Thumbnail',
      demoLink: req.body.demoLink,
      userId: req.user.uid,
      authorName: req.body.authorName,
      author: user._id
    });

    const savedProject = await project.save();
    const populatedProject = await Project.findById(savedProject._id)
      .populate('author', 'username email');

    res.status(201).json(populatedProject);
  } catch (error) {
    console.error('Project creation error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update a project
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    // First get the user
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Compare with MongoDB user._id instead of Firebase UID
    if (project.author.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(project, req.body);
    const updatedProject = await project.save();
    const populatedProject = await Project.findById(updatedProject._id)
      .populate('author', 'username email');
    
    res.json(populatedProject);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete a project
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Get the user
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is admin (from token) or the project author
    const isAdmin = req.user.isAdmin === true;
    const isAuthor = project.author.toString() === user._id.toString();

    if (!isAdmin && !isAuthor) {
      return res.status(403).json({ 
        message: 'Not authorized to delete this project',
        isAdmin: isAdmin,
        isAuthor: isAuthor
      });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get a single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('author', 'username email');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project' });
  }
});

module.exports = router; 