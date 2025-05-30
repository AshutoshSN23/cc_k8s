const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://ashutosh9655:Ashu9645@cluster0.vjrn8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Define a User model
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String,
}));

// Middleware to parse JSON
app.use(express.json());

// Middleware to verify username
app.use((req, res, next) => {
  const username = req.headers.username;

  if (!username) {
    return res.status(401).json({ success: false, message: 'No username provided' });
  }

  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid username' });
  }

  next();
});

// Route to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }
});

// Route to add a new user
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add user' });
  }
});

app.listen(3000, () => console.log('User service running on port 3000'));

