const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Dummy user data
const users = [
  { username: 'admin', password: '1234' },
  { username: 'user', password: 'password' },
];

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Verify endpoint
app.post('/verify', (req, res) => {
  const { username } = req.body;
  const user = users.find(u => u.username === username);

  if (user) {
    res.json({ success: true, message: 'User verified' });
  } else {
    res.status(401).json({ success: false, message: 'User not found' });
  }
});

app.listen(3001, () => console.log('Auth service running on port 3001'));

