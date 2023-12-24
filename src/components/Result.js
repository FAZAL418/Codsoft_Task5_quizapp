
import React from 'react';
import './Result.css';

const Result = ({ user, score, averageTime }) => {
  const getMessage = () => {
    if (score < 40) {
      return 'Poor performance. Better luck next time!';
    } else if (score < 70) {
      return 'Good effort! You can do better.';
    } else if (score < 90) {
      return 'Well done! A solid performance.';
    } else {
      return 'Excellent! You are a quiz master!';
    }
  };

  const getResultClass = () => {
    if (score < 40) {
      return 'poor';
    } else if (score < 70) {
      return 'average';
    } else if (score < 90) {
      return 'good';
    } else {
      return 'excellent';
    }
  };

  return (
    <div className={`result-container ${getResultClass()}`}>
      <h2>Result</h2>
      <p className="result-details">Name: {user.name}</p>
      <p className="result-details">Age: {user.age}</p>
      <p className="result-details">Category: {user.category}</p>
      <p className={`result-details ${getResultClass()}`}>Score: {score}%</p>
      <p className="result-details">Average Time: {averageTime} seconds</p>
      <p className={`result-message ${getResultClass()}`}>{getMessage()}</p>
    </div>
  );
};

export default Result;
