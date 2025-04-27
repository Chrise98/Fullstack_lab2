// Import all dependencies 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Initialize app 
const app = express();

// Middleware 
app.use(cors());
app.use(express.json());

// Serve static files in React frontend
app.use(express.static(path.join(__dirname, '../client/dist')));

// --- 5. Import and use routes ---
const employeeRoutes = require('./routes/employees');
const projectRoutes = require('./routes/projects');
const assignmentRoutes = require('./routes/projectAssignments');

app.use('/api/employees', employeeRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/project_assignments', assignmentRoutes);

// Frontend fallback route for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Root route 
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
