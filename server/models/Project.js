const mongoose = require('mongoose');
// A mongo collection and defines what data each assignment document must have, how it connects and structured.
const projectSchema = new mongoose.Schema({
  project_code: { type: String, required: true, unique: true },
  project_name: String,
  project_description: String
});

module.exports = mongoose.model('Project', projectSchema);
