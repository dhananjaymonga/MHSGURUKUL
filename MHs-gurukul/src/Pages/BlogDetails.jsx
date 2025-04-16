// src/pages/SingleBlog.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from './Footer';
const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/blogs/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!blog) return <div className="p-6">Loading...</div>;

  return (
    <>
    <Navbar/>
    <div className="p-6 max-w-3xl mx-auto">
      {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} className="w-full h-64 object-cover rounded-lg mb-4" />}
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-700 text-lg whitespace-pre-line">{blog.content}</p>
    </div>
    {/* <Footer/> */}
    </>
  );
};

export default SingleBlog;
