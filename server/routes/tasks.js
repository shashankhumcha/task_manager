const express = require('express');
const db = require('../db'); 
const authMiddleware = require('../middleware/authMiddleware'); 
const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
  db.query(
    'SELECT id, title, description, status, created_at AS createdAt FROM tasks WHERE user_id = ?',
    [req.userId],
    (err, results) => {
      if (err) {
        console.error('Error fetching tasks:', err);
        return res.status(500).json({ message: 'Error fetching tasks' });
      }
      res.status(200).json(results);
    }
  );
});

router.post('/', (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !description || !['TODO', 'IN_PROGRESS', 'DONE'].includes(status)) {
    return res.status(400).json({ message: 'Invalid task data' });
  }

  db.query(
    'INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)',
    [title, description, status, req.userId],
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
    'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?',
    [title, description, status, taskId, req.userId],
    (err, result) => {
      if (err) {
        console.error('Error updating task:', err);
        return res.status(500).json({ message: 'Error updating task' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Task not found or not authorized' });
      }

      res.status(200).json({ message: 'Task updated successfully' });
    }
  );
});

router.delete('/:id', (req, res) => {
  const taskId = req.params.id;

  db.query(
    'DELETE FROM tasks WHERE id = ? AND user_id = ?',
    [taskId, req.userId],
    (err, result) => {
      if (err) {
        console.error('Error deleting task:', err);
        return res.status(500).json({ message: 'Error deleting task' });
      }

     
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Task not found or not authorized' });
      }

      res.status(200).json({ message: 'Task deleted successfully' });
    }
  );
});


router.get('/:id', (req, res) => {
  const taskId = req.params.id;

  db.query(
    'SELECT id, title, description, status, created_at AS createdAt FROM tasks WHERE id = ? AND user_id = ?',
    [taskId, req.userId],
    (err, results) => {
      if (err) {
        console.error('Error fetching task:', err);
        return res.status(500).json({ message: 'Error fetching task' });
      }

      
      if (results.length === 0) {
        return res.status(404).json({ message: 'Task not found or not authorized' });
      }

      res.status(200).json(results[0]);
    }
  );
});

module.exports = router;
