const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import models
const Employee = require('./models/Employee');
const Project = require('./models/Project');
const ProjectAssignment = require('./models/ProjectAssignment');

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected for seeding'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Seed function to populate data
const seedData = async () => {
  try {
    await Employee.deleteMany({});
    await Project.deleteMany({});
    await ProjectAssignment.deleteMany({});
    // Create sample Employees
    const employees = await Employee.insertMany([
      { employee_id: 'E001', full_name: 'Tom Cruise', email: 'Tom.Cruise@example.com', hashed_password: 'passwor' },
      { employee_id: 'E002', full_name: 'Will Smith', email: 'Will.Smith@example.com', hashed_password: 'password' },
      { employee_id: 'E003', full_name: 'Jennifer Lawrence', email: 'Jennifer@example.com', hashed_password: 'password123' },
      { employee_id: 'E004', full_name: 'Leonardo DiCaprio', email: 'leo@example.com', hashed_password: 'password123' },
      { employee_id: 'E005', full_name: 'Angelina Jolie', email: 'Angis@example.com', hashed_password: 'password123' },
    ]);
    
    // Create sample Projects
    const projects = await Project.insertMany([
      { project_code: 'P001', project_name: 'Project A', project_description: 'This is a test project.' },
      { project_code: 'P002', project_name: 'Project B', project_description: 'This is another test project.' },
      { project_code: 'P003', project_name: 'Project C', project_description: 'Test project for research.' },
      { project_code: 'P004', project_name: 'Project D', project_description: 'Project focusing on security.' },
      { project_code: 'P005', project_name: 'Project E', project_description: 'Project for marketing campaign.' },
    ]);

    // Assign employees to projects
    await ProjectAssignment.insertMany([
      { employee_id: employees[0]._id, project_code: projects[0]._id, start_date: new Date('2025-03-01') },
      { employee_id: employees[1]._id, project_code: projects[1]._id, start_date: new Date('2025-04-05') },
      { employee_id: employees[2]._id, project_code: projects[2]._id, start_date: new Date('2025-03-25') },
      { employee_id: employees[3]._id, project_code: projects[3]._id, start_date: new Date('2025-04-15') },
      { employee_id: employees[4]._id, project_code: projects[4]._id, start_date: new Date('2025-01-21') },
    ]);

    console.log('✅ Data seeded successfully');
    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error seeding data:', err);
    mongoose.disconnect();
  }
};

// Run the seeding
seedData();
