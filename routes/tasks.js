const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Get all tasks
router.get('/tasks', (req, res) => {
  Task.getAll((err, rows) => {
    if (err) {
      console.error("Error fetching tasks:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Create a task
router.post('/tasks', (req, res) => {
  const { title, description, status } = req.body;
  if (!title || !status) {
    return res.status(400).json({ error: 'Title and Status are required' });
  }

  Task.create({ title, description, status }, (err) => {
    if (err) {
      console.error("Error creating task:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Task created' });
  });
});

// Update a task
router.put('/tasks/:id', (req, res) => {
  const { title, description, status } = req.body;
  const { id } = req.params;

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  Task.update(id, { title, description, status }, (err) => {
    if (err) {
      console.error("Error updating task:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Task updated' });
  });
});

// Delete a task
router.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  Task.delete(id, (err) => {
    if (err) {
      console.error("Error deleting task:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Task deleted' });
  });
});

module.exports = router;
