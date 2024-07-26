const express = require('express');
const cors = require('cors');
const db = require('../db'); 
const router = express.Router();

router.use(cors());

router.get('/', (req, res) => {
  db.query('SELECT id, title, description, status, created_at AS createdAt FROM tasks', (err, results) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      return res.status(500).json({ message: 'Error fetching tasks' });
    }
    res.status(200).json(results); 
  });
});

router.post('/', (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !description || !['TODO', 'IN_PROGRESS', 'DONE'].includes(status)) {
    console.log('Invalid task data');
    return res.status(400).json({ message: 'Invalid task data' });
  }

  db.query(
    'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
    [title, description, status],
    (err, result) => {
      if (err) {
        console.error('Error creating task:', err);
        return res.status(500).json({ message: 'Error creating task' });
      }
      res.status(201).json({ id: result.insertId, title, description, status });
    }
  );
});

router.put('/:id', (req, res) => {
  const taskId = req.params.id;
  const { title, description, status } = req.body;

  if (!title || !description || !['TODO', 'IN_PROGRESS', 'DONE'].includes(status)) {
    return res.status(400).json({ message: 'Invalid task data' });
  }

  db.query(
    'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
    [title, description, status, taskId],
    (err, result) => {
      if (err) {
        console.error('Error updating task:', err);
        return res.status(500).json({ message: 'Error updating task' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Task not found' });
      }

      res.status(200).json({ message: 'Task updated successfully' });
    }
  );
});

router.delete('/:id', (req, res) => {
  const taskId = req.params.id;

  db.query('DELETE FROM tasks WHERE id = ?', [taskId], (err, result) => {
    if (err) {
      console.error('Error deleting task:', err);
      return res.status(500).json({ message: 'Error deleting task' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  });
});

router.get('/:id', (req, res) => {
  const taskId = req.params.id;

  db.query('SELECT id, title, description, status, created_at AS createdAt FROM tasks WHERE id = ?', [taskId], (err, results) => {
    if (err) {
      console.error('Error fetching task:', err);
      return res.status(500).json({ message: 'Error fetching task' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(results[0]);
  });
});

module.exports = router;
