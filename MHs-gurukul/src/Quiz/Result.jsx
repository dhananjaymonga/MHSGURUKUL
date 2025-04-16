// File: src/components/Result.jsx
import React from 'react';

const Result = ({ questions, answers, onRetry }) => {
  const correct = answers.filter((ans, i) => ans === questions[i].answer).length;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Results</h2>
      <p className="text-center mb-4">You got {correct} out of {questions.length} correct</p>
      {questions.map((q, i) => (
        <div key={i} className="mb-4 p-4 rounded border bg-gray-50">
          <p className="font-medium">{i + 1}. {q.question}</p>
          <p>Your Answer: <span className={answers[i] === q.answer ? 'text-green-600' : 'text-red-600'}>{q.options[answers[i]]}</span></p>
          {answers[i] !== q.answer && (
            <p>Correct Answer: <span className="text-green-600">{q.options[q.answer]}</span></p>
          )}
        </div>
      ))}
      <button onClick={onRetry} className="w-full bg-blue-600 text-white p-2 mt-4 rounded hover:bg-blue-700 transition-all">
        Try Again
      </button>
    </div>
  );
};

export default Result;
