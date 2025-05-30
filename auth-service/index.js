const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const SECRET_KEY = 'your_secret_key';

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
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Verify token endpoint
app.post('/verify', (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ success: true, user: decoded });
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

app.listen(3001, () => console.log('Auth service running on port 3001'));

