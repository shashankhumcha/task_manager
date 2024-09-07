import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditTask.css';

const EditTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState({ title: '', description: '', status: 'TODO' });
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
        setError('Error fetching task. Please try again.');
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      await axios.put(`http://localhost:5000/api/tasks/${id}`, task, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success('Task updated successfully!');
      navigate('/tasks');
    } catch (error) {
      console.error('Error updating task:', error);
      if (error.response) {
        if (error.response.status === 401) {
          navigate('/login'); 
        }
        toast.error(`Error: ${error.response.data.message || 'Error updating task. Please try again.'}`);
      } else {
        toast.error('Error updating task. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    navigate('/tasks');
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="edit-task-container">
      <div className="edit-task-form">
        <h2>Edit Task</h2>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <select
          name="status"
          value={task.status}
          onChange={handleChange}
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
        <div className="button-group">
          <button className="save-button" onClick={handleSave}>Save</button>
          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditTask;
