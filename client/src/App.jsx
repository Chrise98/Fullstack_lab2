// client/src/App.jsx
import React from 'react';
import ProjectTable from './components/ProjectTable';
import './App.css';



function App() {
  return (
    <div className="App">
      <h1 className="main-heading">Latest Project Assignments</h1>
      <ProjectTable />
    </div>
  );
}

export default App;
