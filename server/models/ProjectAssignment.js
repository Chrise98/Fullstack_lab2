const mongoose = require('mongoose');
// A mongo collection and defines what data each assignment document must have, how it connects and structured.
const assignmentSchema = new mongoose.Schema({
  employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  project_code: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  start_date: Date
});

module.exports = mongoose.model('ProjectAssignment', assignmentSchema);
