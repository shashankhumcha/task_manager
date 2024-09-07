import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/tasks');
      } else {
        alert('Login failed: Incorrect credentials');
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed: Incorrect credentials');
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const result = await axios.post('http://localhost:5000/api/auth/google', { tokenId: response.credential });
      localStorage.setItem('token', result.data.token);
      navigate('/tasks');
    } catch (error) {
      console.error('Google login failed', error);
      alert('Google login failed');
    }
  };

  const handleGoogleFailure = (response) => {
    console.error('Google login failed', response);
    alert('Google login failed');
  };

  

  return (
    <div className="login-page">
      <header className="header">
        <Link to="/login" className="login-button">Login</Link>
        <Link to="/register" className="signup-button">Signup</Link>
      </header>
      <div className="login-form-container">
        <h2 className="login-form-header">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input-field"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input-field"
            required
          />
          <button type="submit" className="submit-button">Login</button>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            logoAlignment="left"
          />
          
          <p>
            Don't have an account? <Link to="/register">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
