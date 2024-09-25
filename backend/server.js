// backend/server.js
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/tasks');

dotenv.config();


const db = require('./db/database');

const app = express();

app.use(cors());
app.use(express.json());




const JWT_SECRET = process.env.JWT_SECRET;

app.use('/api', taskRoutes);

// Registration endpoint
app.post('/auth/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) return res.status(500).send("Error checking username.");
    if (user) return res.status(400).send("Username already exists.");

    db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], function(err) {
      if (err) return res.status(500).send("Error registering user.");
      res.status(200).send("User registered successfully!");
    });
  });
});

// Login endpoint
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err || !user) return res.status(404).send("User not found.");

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send("Invalid password.");

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: 86400 });
    res.status(200).send({ auth: true, token });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});