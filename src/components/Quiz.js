
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import questions from '../data/questions';
import './Quiz.css';

const Quiz = ({ onQuizSubmit }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const selectAndShuffleQuestions = (selectedCategory) => {
      const allQuestions = questions[selectedCategory] || [];
  
      const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
        const selectedQuestions = shuffledQuestions.slice(0, Math.min(5, shuffledQuestions.length));
  
      setQuizQuestions(selectedQuestions);
    };
  
    selectAndShuffleQuestions(category);
  }, [category]);

  const handleAnswerSelect = (selectedOption) => {
    setUserAnswers((prevAnswers) => ({ ...prevAnswers, [currentQuestionIndex]: selectedOption }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmitQuiz = () => {
    const score = calculateScore();
    const mistakes = findMistakes();

    onQuizSubmit({ score, mistakes }); 

    navigate('/result');
  };

  const calculateScore = () => {
    if (quizQuestions.length === 0) {
      return 0;
    }

    const correctAnswers = Object.values(userAnswers).reduce((count, answer, index) => {
      const question = quizQuestions[index];
      return count + (answer === question.correctOption ? 1 : 0);
    }, 0);

    return (correctAnswers / quizQuestions.length) * 100;
  };

  const findMistakes = () => {
    const mistakes = [];
    quizQuestions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      if (userAnswer !== question.correctOption) {
        mistakes.push(question.id);
      }
    });
    return mistakes;
  };

  if (currentQuestionIndex >= quizQuestions.length) {
    return (
      <div className="quiz-container">
        <h2>Quiz - {category}</h2>
        <p>You have completed the quiz. Click the button below to view your results.</p>
        <button onClick={handleSubmitQuiz}>Submit Quiz</button>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h2>Quiz - {category}</h2>
      <div className="question">
        <p>{currentQuestion.text}</p>
        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <label key={option} className="option">
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                value={option}
                onChange={() => handleAnswerSelect(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      <button onClick={handleNextQuestion}>Next Question</button>
    </div>
  );
};

export default Quiz;
