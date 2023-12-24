import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';  

const Login = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, age, category });

      
        navigate(`/quiz/${category}`);
    };

    return (
        <div>
            <h1 className='topic'>Prashnutari App</h1>
            <div className='login-container'>-
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <label className="form-label">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-input"
                    />

                    <label className="form-label">Age:</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="form-input"
                    />

                    <label className="form-label">Category:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="form-input"
                    >
                        <option value="Music">Music</option>
                        <option value="Technology">Technology</option>
                        <option value="Sports">Sports</option>
                        {/* Add more categories as needed */}
                    </select>

                    <button type="submit" className="submit-button">
                        Start Quiz
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
