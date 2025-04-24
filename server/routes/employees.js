
const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Add a new employee
router.post('/', async (req, res) => {
  try {
    const { employee_id, full_name, email, hashed_password } = req.body;

    // Check for unique employee_id
    const existing = await Employee.findOne({ employee_id });
    if (existing) return res.status(400).json({ error: 'Employee ID must be unique' });

    const employee = new Employee({ employee_id, full_name, email, hashed_password });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an existing employee by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});




module.exports = router;
