import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AssignmentTable from './components/AssignmentTable.jsx'; 

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Project Tracker</h1>
      <AssignmentTable />
      
      {/* Vite and React logos */}
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
      {/* Counter Button */}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
      </div>
      
      {/* Documentation Link */}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
