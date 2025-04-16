import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BlogAdmin from './AdminBlog';
import UploadedList from './AdminNotes';
import Navbar from '../Navbar';
const AdminPanel = () => {
  const [selectedOption, setSelectedOption] = useState(null); // Start with nothing selected
  const [historyType, setHistoryType] = useState(null); // To store selected history type

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 p-6">
      
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">📋 Admin Panel</h1>
        <div className="flex items-center gap-4">
          <label className="text-gray-700 font-medium">Choose type:</label>
          <select
            value={selectedOption || ''}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="px-4 py-2 border rounded-md shadow-sm bg-white text-gray-700"
          >
            <option value="" disabled>-- Select --</option>
            <option value="blog">📝 Blogs</option>
            <option value="notes">📚 Notes</option>
          </select>
        </div>
      </div>

      {/* History Section */}
      {selectedOption && (
        <div className="flex gap-4 mb-8">
          {/* <label className="text-gray-700 font-medium">View History:</label> */}
          <Link to={"/history"} className="text-gray-700 font-medium"> View History:</Link>
        </div>
      )}

      {/* Only render components after a selection is made */}
      {selectedOption === 'blog' && (
        <>
          <BlogAdmin />
          {historyType && <BlogHistory historyType={historyType} />}
        </>
      )}
      {selectedOption === 'notes' && (
        <>
          <UploadedList />
          {historyType && <NotesHistory historyType={historyType} />}
        </>
      )}
    </div>
    </>
  );
};

// const BlogHistory = ({ historyType }) => {
//   // You can modify this to fetch data based on historyType (uploads or edits)
//   return (
//     <div className="mt-8">
//       <h3 className="text-2xl font-semibold mb-4">Blog {historyType === 'uploads' ? 'Upload' : 'Edit'} History</h3>
//       {/* Render the actual history data here based on historyType */}
//       <div className="bg-white p-4 rounded-lg shadow-md">
//         <p>{`Displaying ${historyType} history for blogs...`}</p>
//         {/* List of history entries */}
//       </div>
//     </div>
//   );
// };

// const NotesHistory = ({ historyType }) => {
//   // You can modify this to fetch data based on historyType (uploads or edits)
//   return (
//     <div className="mt-8">
//       <h3 className="text-2xl font-semibold mb-4">Notes {historyType === 'uploads' ? 'Upload' : 'Edit'} History</h3>
//       {/* Render the actual history data here based on historyType */}
//       <div className="bg-white p-4 rounded-lg shadow-md">
//         <p>{`Displaying ${historyType} history for notes...`}</p>
//         {/* List of history entries */}
//       </div>
//     </div>
//   );
// };


export default AdminPanel;
