// File: src/App.jsx
import React, { useState } from 'react';
import Quiz from './Quiz';
import ClassSubjectSelector from './ClassesSub';
import Result from './Result';

function QuizMain() {
  const [stage, setStage] = useState('select');
  const [classValue, setClassValue] = useState('');
  const [subject, setSubject] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const startQuiz = async () => {
    const sampleQuestions = {
      biology: [
        { question: 'What is the basic unit of life?', options: ['Atom', 'Cell', 'Tissue', 'Organ'], answer: 1 },
      ],
      chemistry: [
        { question: 'Water is made of?', options: ['H2O', 'CO2', 'O2', 'NaCl'], answer: 0 },
      ],
      physics: [
        { question: 'What is force?', options: ['Push or pull', 'Speed', 'Power', 'Energy'], answer: 0 },
      ],
    };
    setQuestions(sampleQuestions[subject] || []);
    setStage('quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      {stage === 'select' && (
        <ClassSubjectSelector
          setClassValue={setClassValue}
          setSubject={setSubject}
          startQuiz={startQuiz}
        />
      )}
      {stage === 'quiz' && (
        <Quiz
          questions={questions}
          setAnswers={setAnswers}
          onFinish={() => setStage('result')}
        />
      )}
      {stage === 'result' && (
        <Result
          questions={questions}
          answers={answers}
          onRetry={() => setStage('select')}
        />
      )}
    </div>
  );
}

export default QuizMain;
