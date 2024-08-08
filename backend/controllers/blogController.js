// controllers/blogController.js

const Blog = require("../models/blog");

// Get all blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Create a blog
const createBlog = async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const newBlog = new Blog({
      title,
      content,
      author,
    });

    const savedBlog = await newBlog.save();
    res.json(savedBlog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get a single blog
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Blog not found" });
    }
    res.status(500).send("Server Error");
  }
};

// Update a blog
const updateBlog = async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, author },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Blog not found" });
    }
    res.status(500).send("Server Error");
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {  // Corrected this line
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id); // Use findByIdAndDelete
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }
    res.json({ msg: "Blog removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog, // Ensure deleteBlog is exported
};
