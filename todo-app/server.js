require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const path = require('path');

app.use(express.static('public')); // Ensure the 'public' directory exists and contains the required files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'task.html')); // Ensure 'task.html' exists in the 'public' directory
});

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/todos', todoRoutes); // Ensure this route is correctly implemented in 'todoRoutes'

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`server is running at http://localhost:${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
