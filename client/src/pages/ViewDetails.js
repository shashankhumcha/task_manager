import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ViewDetails.css';

const ViewDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
        if (error.response) {
          if (error.response.status === 401) {
            navigate('/login');
          }
          setError(`Server responded with status ${error.response.status}`);
        } else if (error.request) {
          setError('No response received from server.');
        } else {
          setError('Error in setting up request.');
        }
      }
    };

    fetchTask();
  }, [id, navigate]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="view-details">
      <h2>Task Details</h2>
      <p><strong>Title:</strong> {task.title}</p>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Created at:</strong> {new Date(task.createdAt).toLocaleString()}</p>
      <button onClick={() => navigate('/tasks')}>Close</button>
    </div>
  );
};

export default ViewDetails;
