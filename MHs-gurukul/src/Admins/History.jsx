import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowLeftCircle } from 'lucide-react';
import {Link, useNavigate } from 'react-router-dom';

const AdminHistory = () => {
  const [uploads, setUploads] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [filterType, setFilterType] = useState('all'); // Updated filter options
  const [sortOrder, setSortOrder] = useState('desc');
  const [historyType, setHistoryType] = useState('uploads'); // Tracks whether to view uploads or edits history
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [uploadRes, blogRes] = await Promise.all([
        axios.get('http://localhost:5000/uploads'),
        axios.get('http://localhost:5000/blogs')
      ]);
      setUploads(uploadRes.data);
      setBlogs(blogRes.data);
    } catch (err) {
      console.error('Error fetching admin history', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortByDate = (data) => {
    return [...data].sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt);
      const dateB = new Date(b.updatedAt || b.createdAt);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  };

  const filteredUploads = filterType === 'notes' || filterType === 'all' ? sortByDate(uploads) : [];
  const filteredBlogs = filterType === 'blog' || filterType === 'all' ? sortByDate(blogs) : [];

  // Filtering by historyType (Uploaded or Edited)
  const getFilteredHistory = (data) => {
    if (historyType === 'uploads') {
      return data.filter(item => item.createdAt); // Items that have createdAt
    } else if (historyType === 'edits') {
      return data.filter(item => item.updatedAt); // Items that have updatedAt
    }
    return data;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
        <Link to={"/admin"}><ArrowLeftCircle  size={40} /></Link>  

      <div className="max-w-5xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >

          Admin Activity History
        </motion.h2>

        {/* Filter Controls */}
        <div className="flex justify-between items-center mb-6">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border px-3 py-2 rounded shadow-sm"
          >
            <option value="all">All</option>
            <option value="notes">Notes Only</option>
            <option value="blog">Blogs Only</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border px-3 py-2 rounded shadow-sm"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>

          <select
            value={historyType}
            onChange={(e) => setHistoryType(e.target.value)}
            className="border px-3 py-2 rounded shadow-sm"
          >
            <option value="uploads">Uploaded History</option>
            <option value="edits">Edited History</option>
          </select>
        </div>

        {/* Render Filtered Uploads History */}
        {filteredUploads.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h3 className="text-xl font-semibold mb-4">Uploaded Notes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getFilteredHistory(filteredUploads).map((upload) => (
                <div key={upload._id} className="bg-white p-4 rounded-lg shadow">
                  <div className="font-medium text-lg">{upload.title}</div>
                  <div className="text-sm text-gray-700">
                    Class: {upload.class} | Subject: {upload.subject}
                  </div>
                  <div className="text-xs text-gray-500">
                    {historyType === 'uploads' 
                      ? `Uploaded on: ${new Date(upload.createdAt).toLocaleString()}`
                      : `Last edited: ${new Date(upload.updatedAt).toLocaleString()}`
                    }
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Render Filtered Blog History */}
        {filteredBlogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4">Blog Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getFilteredHistory(filteredBlogs).map((blog) => (
                <div key={blog._id} className="bg-white p-4 rounded-lg shadow">
                  <div className="font-medium text-lg">{blog.title}</div>
                  <div className="text-sm text-gray-700">
                    Posted on: {new Date(blog.createdAt).toLocaleString()}
                  </div>
                  {blog.updatedAt && (
                    <div className="text-xs text-gray-500">
                      Last edited: {new Date(blog.updatedAt).toLocaleString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminHistory;
