// src/components/BlogList.js
"use client";

import axios from "axios";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import EditBlogForm from "./EditBlogForm";

const BlogList = ({ blogs, setBlogs, loading, error }) => {
  const [editingBlog, setEditingBlog] = useState(null);

  if (loading)
    return (
      <div className="w-full h-full grid gap-5">
        <div className="bg-neutral-700 rounded-lg animate-pulse"></div>
        <div className="bg-neutral-700 rounded-lg animate-pulse"></div>
        <div className="bg-neutral-700 rounded-lg animate-pulse"></div>
      </div>
    );
  if (error) return <div>{error}</div>;

  // Sort blogs by createdAt date in descending order
  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Handle blog deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  // Edit blog
  const handleEditClick = (blog) => {
    setEditingBlog(blog);
  };

  const handleEditCancel = () => {
    setEditingBlog(null);
  };

  const handleEditSubmit = async (updatedBlog) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/blogs/${updatedBlog._id}`,
        updatedBlog
      );
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === updatedBlog._id ? response.data : blog
        )
      );
      setEditingBlog(null);
    } catch (err) {
      console.error("Error updating blog:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-semibold mb-4">Blog Posts</h2>
      {sortedBlogs.map((blog) => (
        <div
          key={blog._id}
          className="bg-neutral-900 p-6 rounded-lg shadow-md mb-4"
        >
          {editingBlog && editingBlog._id === blog._id ? (
            <EditBlogForm
              blog={editingBlog}
              onCancel={handleEditCancel}
              onSubmit={handleEditSubmit}
            />
          ) : (
            <>
              <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
              <p className="text-neutral-600 mb-2">{blog.content}</p>
              <p className="text-neutral-500 text-sm">By {blog.author}</p>
              <p className="text-neutral-500 text-sm">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <div className="flex pt-3">
                <button
                  onClick={() => handleEditClick(blog)}
                  className="bg-yellow-500 text-white text-sm px-3 py-1 rounded mr-2 flex items-center gap-1"
                >
                  Edit <FaEdit className="text-base" />
                </button>
                <button
                  className="bg-red-500 text-white text-sm px-3 py-1 rounded flex items-center gap-1"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete <MdDelete className="text-base" />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default BlogList;
