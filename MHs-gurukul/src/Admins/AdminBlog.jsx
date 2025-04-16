import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';

const BlogAdmin = () => {
  const [form, setForm] = useState({ title: '', content: '', image: null });
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    axios.get('http://localhost:5000/blogs')
      .then(res => setBlogs(res.data))
      .catch(err => console.error('Error fetching blogs', err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('content', form.content);
    if (form.image) formData.append('image', form.image);

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/blogs/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:5000/blogs', formData);
      }

      setForm({ title: '', content: '', image: null });
      setEditingId(null);
      fetchBlogs();
    } catch (err) {
      console.error('Error submitting blog', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error('Error deleting blog', err);
    }
  };

  const handleEdit = (blog) => {
    setForm({ title: blog.title, content: blog.content, image: null });
    setEditingId(blog._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        {editingId ? '✏️ Edit Blog' : '📝 Create a New Blog'}
      </h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-10 space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full p-2 border rounded"
          rows="5"
          required
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          className="w-full"
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {editingId ? 'Update Blog' : 'Post Blog'}
          </button>
          {editingId && (
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              onClick={() => {
                setForm({ title: '', content: '', image: null });
                setEditingId(null);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="text-3xl font-bold text-gray-800 mb-6">📚 All Blogs</h2>

      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs available.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
           <div key={blog._id} className="bg-white shadow-lg rounded-xl p-6 transition hover:shadow-xl">
                      {blog.imageUrl && <img src={blog.imageUrl} alt="blog" className="w-full h-48 object-cover rounded-lg mb-4" />}

           <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
           <p className="text-sm text-gray-500 mb-4">Posted by Admin</p>
         
           <div className="flex items-center gap-4">
             <button
               onClick={() => handleEdit(blog)}
               className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
             >
               <FaEdit />
               Edit
             </button>
         
             <button
               onClick={() => handleDelete(blog._id)}
               className="flex items-center gap-1 text-red-600 hover:text-red-800 font-medium"
             >
               <FaTrash />
               Delete
             </button>
           </div>
         </div>
         
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogAdmin;
