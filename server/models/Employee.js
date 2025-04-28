const mongoose = require('mongoose');
// A mongo collection and defines what data each assignment document must have, how it connects and structured.
const employeeSchema = new mongoose.Schema({
  employee_id: { type: String, required: true, unique: true },
  full_name: String,
  email: String,
  hashed_password: String
});

module.exports = mongoose.model('Employee', employeeSchema);
