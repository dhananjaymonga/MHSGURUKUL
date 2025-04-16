import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/blogs')
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Blogs</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {blogs.map(blog => (
          <div key={blog._id} className="border p-4 rounded-xl shadow-sm">
            {blog.imageUrl && <img src={blog.imageUrl} alt="blog" className="w-full h-48 object-cover rounded-lg mb-4" />}
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600">{blog.content.slice(0, 150)}...</p>
            <p className="text-sm text-gray-500 mb-1">
    Posted on {new Date(blog.createdAt).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}
  </p>
            <Link to={`/blog/${blog._id}`} className="text-blue-600 mt-2 inline-block">Read More</Link>
            </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
