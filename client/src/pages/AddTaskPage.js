import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddTaskPage.css';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('TODO');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        setErrorMessage('Authentication token not found. Please log in again.');
        return;
      }
      console.log('Submitting task:', { title, description, status });
      const response = await axios.post(
        'http://localhost:5000/api/tasks',
        { title, description, status },
        { headers: { Authorization: `Bearer ${token}` } } 
      );
      console.log('Response:', response);
      if (response.status === 201) {
        setSuccessMessage('Task added successfully!');
        setTitle('');
        setDescription('');
        setStatus('TODO');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/tasks');
        }, 2000);
      }
    } catch (error) {
      console.error('Error adding task:', error.response || error.message);
      setErrorMessage(`Failed to add task: ${error.response ? error.response.data.message : error.message}. Please try again.`);
    }
  };

  return (
    <div className="add-task-page">
      <div className="add-task-form">
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="input-field"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <input
            className="input-field"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
          <select className="input-field" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
          <button className="submit-button" type="submit">Add Task</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="back-button" onClick={() => navigate('/tasks')}>Back</button>
      </div>
    </div>
  );
};

export default AddTask;
