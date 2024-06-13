// src/components/Login.js

import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9092/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        onLogin(data.token);  // Pass token to parent component
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
    <div className="login-box">
    <h2>Hi User !! </h2>
    <form onSubmit={handleSubmit}>
      <div className="textbox">
        <label>UserName:</label>
        <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}/>
      </div>
      <div className="textbox">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className="btn btn-primary mb-3" type="submit">Login</button>
    </form>
    </div>
    </div>
  );
};

export default Login;
