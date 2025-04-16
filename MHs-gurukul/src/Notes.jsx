import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaDownload } from 'react-icons/fa';

function StudyNotes() {
  const [uploads, setUploads] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUploads();
  }, []);

  const fetchUploads = async () => {
    try {
      const res = await fetch('http://localhost:5000/uploads');
      if (!res.ok) throw new Error('Failed to fetch study notes');
      const data = await res.json();
      setUploads(data);
    } catch (err) {
      console.error(err);
      setError('Something went wrong while fetching notes.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Study Notes</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {uploads.map((note, index) => (
          <motion.div
            key={note._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            {/* You can dynamically show note.image if you store it */}
            <img src="image.jpg" alt={note.title} className="h-48 w-full object-cover" />
            <div className="p-4">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span className="text-blue-600 font-medium">{note.subject}</span>
                <span>{note.class}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
              <div className="flex gap-4">
                <a href={note.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <FaEye className="text-gray-600 hover:text-black cursor-pointer" />
                </a>
                <a href={note.pdfUrl} download>
                  <FaDownload className="text-gray-600 hover:text-black cursor-pointer" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default StudyNotes;
