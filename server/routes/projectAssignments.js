const express = require('express');
const router = express.Router();
const ProjectAssignment = require('../models/ProjectAssignment');
const Employee = require('../models/Employee');
const Project = require('../models/Project');

// Assign an employee to a project
router.post('/', async (req, res) => {
  try {
    const { employee_id, project_code, start_date } = req.body;

    // Find referenced employee and project
    const employee = await Employee.findOne({ employee_id });
    const project = await Project.findOne({ project_code });

    if (!employee || !project) {
      return res.status(400).json({ error: 'Invalid employee ID or project code' });
    }

    const assignment = new ProjectAssignment({
      employee_id: employee._id,
      project_code: project._id,
      start_date: new Date(start_date)
    });

    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all assignments with populated data
router.get('/', async (req, res) => {
  try {
    const assignments = await ProjectAssignment.find()
      .populate('employee_id')
      .populate('project_code')
      .sort({ start_date: -1 });

    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
