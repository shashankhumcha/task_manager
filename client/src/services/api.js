 
// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

export const login = (email, password) => api.post('/login', { email, password });
export const register = (email, password) => api.post('/register', { email, password });
export const getTasks = () => api.get('/tasks');
export const createTask = (task) => api.post('/tasks', task);
export const updateTask = (id, task) => api.put(`/tasks/${id}`, task);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
// src/routes/api.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('API root is working!');
});

module.exports = router;
