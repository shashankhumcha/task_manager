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
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      toast.success('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
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

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
  );

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  const categorizeTasks = (status) =>
    sortedTasks.filter((task) => task.status === status);

  return (
    <div className="task-page">
      <header className="header">
        <div className="avatar">
          <img src="path_to_avatar_image" alt="User Avatar" className="avatar-image" />
        </div>
        <button className="add-task-button" onClick={handleAddTask}>
          Add Task
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <div className="search-sort">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="recent">Recent</option>
          {/* Add more sorting options if needed */}
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
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                  <button onClick={() => handleEdit(task.id)}>Edit</button>
                  <button onClick={() => handleViewDetails(task.id)}>
                    View Details
                  </button>
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
