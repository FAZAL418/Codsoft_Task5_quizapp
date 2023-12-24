import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Quiz from './components/Quiz';
import Result from './components/Result';

function App() {
  const [userData, setUserData] = useState(null);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState([]);

  const handleLoginSubmit = (data) => {
    setUserData(data);
  };

  const handleQuizSubmit = (quizResult) => {
    setScore(quizResult.score);
    setMistakes(quizResult.mistakes);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login onSubmit={handleLoginSubmit} />} />
          <Route
            path="/quiz/:category"
            element={<Quiz
              onQuizSubmit={handleQuizSubmit}  
            />}
          />
          <Route
            path="/result"
            element={
              userData ? (
                <Result
                  user={userData}
                  score={score}
                  mistakes={mistakes}
                />
              ) : (
                <Login onSubmit={handleLoginSubmit} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
