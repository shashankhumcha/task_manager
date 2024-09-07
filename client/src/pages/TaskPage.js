import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TaskPage.css';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      toast.success('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-task/${id}`);
  };

  const handleViewDetails = (id) => {
    navigate(`/view-task/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleAddTask = () => {
    navigate('/add-task');
  };

  // Filter tasks by search query
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
  );

  // Sort tasks based on the selected sorting option
  const sortedTasks = filteredTasks.sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt) - new Date(a.createdAt); // Sort by creation date (most recent first)
      case 'lastUpdated':
        return new Date(b.updatedAt) - new Date(a.updatedAt); // Sort by last updated (most recent first)
      case 'alphabetical':
        return a.title.localeCompare(b.title); // Sort alphabetically by title
      case 'status':
        return a.status.localeCompare(b.status); // Sort by status (e.g., TODO, IN_PROGRESS, DONE)
      default:
        return 0;
    }
  });

  // Categorize tasks by their status
  const categorizeTasks = (status) =>
    sortedTasks.filter((task) => task.status === status);

  return (
    <div className="task-page">
      <header className="header">
        <div className="avatar">
          <img src="path_to_avatar_image" alt="User Avatar" className="avatar-image" />
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <div className="add-task-container">
        <button className="add-task-button" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      <div className="search-sort">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="recent">Sort by Creation Date</option>
          <option value="lastUpdated">Sort by Last Updated</option>
          <option value="alphabetical">Sort by Alphabetical Order</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>
      <div className="task-columns">
        {['TODO', 'IN_PROGRESS', 'DONE'].map((status) => (
          <div className="task-column" key={status}>
            <h2>{status.replace('_', ' ')}</h2>
            {categorizeTasks(status).map((task) => (
              <div className="task-card" key={task.id}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>Created at: {new Date(task.createdAt).toLocaleString()}</p>
                
                <div className="task-actions">
                  <button className="delete-button" onClick={() => handleDelete(task.id)}>Delete</button>
                  <button onClick={() => handleEdit(task.id)}>Edit</button>
                  <button onClick={() => handleViewDetails(task.id)}>View Details</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default TaskPage;
