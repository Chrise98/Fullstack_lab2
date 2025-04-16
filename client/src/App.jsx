// client/src/App.jsx
import React from 'react';
import ProjectTable from './components/ProjectTable';

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Latest Project Assignments</h1>
      <ProjectTable />
    </div>
  );
}

export default App;
