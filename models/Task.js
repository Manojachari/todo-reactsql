const db = require('../db/database');

class Task {
  // Get all tasks
  static getAll(callback) {
    const sql = "SELECT * FROM tasks";
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error("Error fetching tasks:", err.message);
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }

  // Create a task
  static create({ title, description, status }, callback) {
    const sql = `INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)`;
    db.run(sql, [title, description, status], function (err) {
      if (err) {
        console.error("Error creating task:", err.message);
        callback(err);
      } else {
        callback(null);
      }
    });
  }

  // Update a task
  static update(id, data, callback) {
    const { title, description, status } = data;
  
    // Prepare the base query and an array to hold values
    let sql = 'UPDATE tasks SET';
    const updates = [];
    const values = [];
  
    // Conditionally add fields that are not null/undefined
    if (title !== undefined) {
      updates.push(' title = ?');
      values.push(title);
    }
    if (description !== undefined) {
      updates.push(' description = ?');
      values.push(description);
    }
    if (status !== undefined) {
      updates.push(' status = ?');
      values.push(status);
    }
  
    // Finalize the query
    sql += updates.join(',');
    sql += ' WHERE id = ?';
    values.push(id);
  
    // Execute the SQL query
    db.run(sql, values, function (err) {
      if (err) {
        console.error("Error updating task:", err.message);
        callback(err);
      } else {
        callback(null);
      }
    });
  }
  

  // Delete a task
  static delete(id, callback) {
    const sql = `DELETE FROM tasks WHERE id = ?`;
    db.run(sql, [id], function (err) {
      if (err) {
        console.error("Error deleting task:", err.message);
        callback(err);
      } else {
        callback(null);
      }
    });
  }
}

module.exports = Task;
