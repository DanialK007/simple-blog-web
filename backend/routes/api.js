// routes/api.js

const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Get all blogs
router.get('/', blogController.getBlogs);

// Create a blog
router.post('/', blogController.createBlog);

// Get a single blog
router.get('/:id', blogController.getBlogById);

// Update a blog
router.put('/:id', blogController.updateBlog);

// Delete a blog
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
