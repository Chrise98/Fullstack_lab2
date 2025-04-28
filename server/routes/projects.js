const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

//Creates a mini express server that handles Project related API request
//It can add a new project to the database (post request)
//Get a list of all the projects from database (Get request)
//It uses a procjet model from mongose to talk to the MongoDb database.
// Assign an employee to a project
router.post('/', async (req, res) => {
  try {
    const { project_code, project_name, project_description } = req.body;

    // Check for unique project_code
    const existing = await Project.findOne({ project_code });
    if (existing) return res.status(400).json({ error: 'Project code must be unique' });

    const project = new Project({ project_code, project_name, project_description });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all projects
router.get('/', async (req, res) => {
    try {
      const projects = await Project.find();
      res.json(projects);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


module.exports = router;
//Exports to the router so that the main server can use it