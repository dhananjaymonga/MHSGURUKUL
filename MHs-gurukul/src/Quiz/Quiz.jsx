// File: src/components/Quiz.jsx
import React, { useState } from 'react';

const Quiz = ({ questions, setAnswers, onFinish }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState([]);

  const handleAnswer = (index) => {
    const newSelected = [...selected];
    newSelected[current] = index;
    setSelected(newSelected);
  };

  const next = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
    else {
      setAnswers(selected);
      onFinish();
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-semibold mb-4">Question {current + 1}</h3>
      <p className="mb-4">{questions[current].question}</p>
      <div className="space-y-2 mb-4">
        {questions[current].options.map((opt, idx) => (
          <button
            key={idx}
            className={`block w-full p-2 rounded border ${
              selected[current] === idx ? 'bg-blue-200' : 'bg-gray-100'
            } hover:bg-blue-100 transition-all duration-300`}
            onClick={() => handleAnswer(idx)}
          >
            {opt}
          </button>
        ))}
      </div>
      <button
        onClick={next}
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-all duration-300"
      >
        {current === questions.length - 1 ? 'Finish' : 'Next'}
      </button>
    </div>
  );
};

export default Quiz;
