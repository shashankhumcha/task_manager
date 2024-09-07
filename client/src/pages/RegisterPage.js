import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import './RegisterPage.css';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        alert('Registration successful! You are now logged in.');
        navigate('/tasks'); 
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Registration failed', error.response ? error.response.data : error.message);
      alert('Registration failed: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const result = await axios.post('http://localhost:5000/api/auth/google', { tokenId: response.credential });
      if (result.data.token) {
        localStorage.setItem('token', result.data.token);
        navigate('/tasks');
      } else {
        alert('Google signup failed: No token received');
      }
    } catch (error) {
      console.error('Google signup failed', error);
      alert('Google signup failed: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google signup failed', error);
    alert('Google signup failed');
  };

  return (
    <div className="register-container">
      <header>
        <Link to="/login" className="login-button">Login</Link>
        <Link to="/register" className="signup-button">Signup</Link>
      </header>
      <div className="register-form-container">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <button type="submit">Signup</button>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />
          <p className="login-link-inside-form">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
