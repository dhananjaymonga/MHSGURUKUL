// File: src/components/ClassSubjectSelector.jsx
import React from 'react';

const ClassSubjectSelector = ({ setClassValue, setSubject, startQuiz }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Start Your Quiz</h2>
      <div className="mb-4">
        <label className="block font-medium mb-1">Select Class</label>
        <select onChange={(e) => setClassValue(e.target.value)} className="w-full p-2 border rounded">
          <option value="">Choose Class</option>
          {[...Array(7)].map((_, i) => (
            <option key={i} value={i + 6}>{i + 6}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">Select Subject</label>
        <select onChange={(e) => setSubject(e.target.value)} className="w-full p-2 border rounded">
          <option value="">Choose Subject</option>
          <option value="biology">Biology</option>
          <option value="chemistry">Chemistry</option>
          <option value="physics">Physics</option>
        </select>
      </div>
      <button onClick={startQuiz} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-all">
        Start Quiz
      </button>
    </div>
  );
};

export default ClassSubjectSelector;
