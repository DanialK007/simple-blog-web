// src/components/EditBlogForm.js

import React, { useState } from "react";

const EditBlogForm = ({ blog, onCancel, onSubmit }) => {
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [author, setAuthor] = useState(blog.author);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...blog, title, content, author });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border border-neutral-700 rounded">
      <div className="mb-4">
        <label className="block text-neutral-700">Title</label>
        <input
          type="text"
          className="bg-neutral-800 border-neutral-600 outline-none mt-1 p-2 w-full border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-neutral-700">Content</label>
        <textarea
          className="bg-neutral-800 border-neutral-600 outline-none mt-1 p-2 w-full border rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-neutral-700">Author</label>
        <input
          type="text"
          className="bg-neutral-800 border-neutral-600 outline-none mt-1 p-2 w-full border rounded"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div className="flex">
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mr-2">
          Save Changes
        </button>
        <button type="button" onClick={onCancel} className="bg-neutral-500 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditBlogForm;
