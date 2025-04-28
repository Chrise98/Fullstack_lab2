// Import all dependencies 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Initialize app and handles API request
const app = express();

// Middleware lets you react frontend talk to the backend
// Express to automatically parse incoming JSON request when sending a post request.
app.use(cors());
app.use(express.json());

// Serve static files in React frontend. Serves the build of frontend files
// this makes sure that the frontend loads properly.
app.use(express.static(path.join(__dirname, '../client/dist')));

// Import and use routes 
const employeeRoutes = require('./routes/employees');
const projectRoutes = require('./routes/projects');
const assignmentRoutes = require('./routes/projectAssignments');

app.use('/api/employees', employeeRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/project_assignments', assignmentRoutes);

// Frontend fallback route for React Router
// Catches any routes that the frontend does not recognize. 
// This is important so that the reacts still works.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Root route mosyly checks if the backend is alive.
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection failed:', err));
