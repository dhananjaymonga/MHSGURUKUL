import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaStickyNote } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

function UploadedList() {
  const { noteId } = useParams();
  const [uploads, setUploads] = useState([]);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchUploads();
  }, []);

  const fetchUploads = () => {
    fetch('http://localhost:5000/uploads')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => setUploads(data))
      .catch((err) => setError(err.message));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await fetch(`http://localhost:5000/uploads/${id}`, { method: 'DELETE' });
      fetchUploads();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item._id);
    setTitle(item.title);
    setClassName(item.class);
    setSubject(item.subject);
    setFile(null); // Optional: keep previous file unless user uploads a new one
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingItem) {
      // Edit mode
      const updatedData = {
        title,
        class: className,
        subject,
      };

      try {
        await fetch(`http://localhost:5000/uploads/${editingItem}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData),
        });
        window.alert("Note updated successfully!");
      } catch (err) {
        console.error("Update failed:", err);
      }
    } else {
      // Create mode
      const formData = new FormData();
      formData.append('class', className);
      formData.append('subject', subject);
      formData.append('title', title);
      formData.append('file', file);

      try {
        const res = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) throw new Error('Upload failed');

        window.alert('Note uploaded successfully!');
      } catch (err) {
        console.error('Upload failed:', err);
      }
    }

    setEditingItem(null);
    setTitle('');
    setClassName('');
    setSubject('');
    setFile(null);
    fetchUploads();
  };

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📂 Uploaded PDFs</h2>

      {/* Upload or Edit Form */}
      <div className="bg-white p-6 rounded-xl shadow mb-12">
        <h3 className="text-xl font-semibold mb-4">
          {editingItem ? '✏️ Edit Note' : '📤 Upload New Note'}
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Enter note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-lg px-4 py-2"
            required
          />
          <select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="border rounded-lg px-4 py-2"
            required
          >
            <option value="">Select Class</option>
            {[6, 7, 8, 9, 10, 11, 12].map((cls) => (
              <option key={cls} value={cls}>{`Class ${cls}`}</option>
            ))}
          </select>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border rounded-lg px-4 py-2"
            required
          >
            <option value="">Select Subject</option>
            {['Biology', 'Chemistry', 'Physics'].map((subj) => (
              <option key={subj} value={subj}>{subj}</option>
            ))}
          </select>

          <div className="col-span-1 md:col-span-2">
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border rounded-lg px-4 py-2"
              accept="application/pdf"
              disabled={editingItem !== null} // Disable file input in edit mode
              required={!editingItem} // Make file required only in create mode
            />
            {!editingItem && <p className="text-gray-500 text-sm mt-1">Only PDF files are allowed.</p>}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 col-span-1 md:col-span-2"
          >
            {editingItem ? '💾 Save Changes' : '📥 Upload Note'}
          </button>
        </form>
      </div>

      {/* Grid Layout for PDFs */}
      {uploads.length === 0 ? (
        <p className="text-gray-600">No uploads yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {uploads.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-600">Class: {item.class}</p>
                <p className="text-gray-600">Subject: {item.subject}</p>

                <div className="space-x-4">
                  <button onClick={() => handleEditClick(item)}>
                    <FaEdit className="text-blue-600 hover:text-blue-800" />
                  </button>
                  <button onClick={() => handleDelete(item._id)}>
                    <FaTrash className="text-red-500 hover:text-red-700" />
                  </button>
                  <button>
                    <FaStickyNote className="text-yellow-600 hover:text-yellow-800" title="Add/View Notes" />
                  </button>
                </div>

                <div className="space-y-2">
                  <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View</a>
                  <br />
                  <a href={item.pdfUrl} download className="text-green-600">Download</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UploadedList;
