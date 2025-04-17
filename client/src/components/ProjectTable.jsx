import { useEffect, useState } from 'react';
import axios from 'axios';
import './ProjectTable.css'; 



const ProjectTable = () => {
  const [assignments, setAssignments] = useState([]);
  const [sortBy, setSortBy] = useState('start_date');
  const [asc, setAsc] = useState(true);

  const fetchData = async () => {
    const res = await axios.get('http://localhost:5000/api/project_assignments');
    setAssignments(res.data);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, []);

  const sortedData = [...assignments].sort((a, b) => {
    if (asc) return a[sortBy] > b[sortBy] ? 1 : -1;
    else return a[sortBy] < b[sortBy] ? 1 : -1;
  });

  const handleSort = (key) => {
    if (key === sortBy) setAsc(!asc);
    else {
      setSortBy(key);
      setAsc(true);
    }
  };

  return (
    <div className="App">
      {/* Bubble container added here, affecting the entire body */}
      <div className="bubble-container">
        <div className="bubble" style={{ '--i': 1 }}></div>
        <div className="bubble" style={{ '--i': 2 }}></div>
        <div className="bubble" style={{ '--i': 3 }}></div>
        <div className="bubble" style={{ '--i': 4 }}></div>
        <div className="bubble" style={{ '--i': 5 }}></div>
        <div className="bubble" style={{ '--i': 6 }}></div>
        <div className="bubble" style={{ '--i': 7 }}></div>
        <div className="bubble" style={{ '--i': 8 }}></div>
        <div className="bubble" style={{ '--i': 9 }}></div>
        <div className="bubble" style={{ '--i': 10 }}></div>
      </div>

      {/* Table displaying project assignments */}
      <div className="table-container">
        <table className="assignment-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('employee_id')}>Employee ID</th>
              <th onClick={() => handleSort('employee_name')}>Employee Name</th>
              <th onClick={() => handleSort('project_name')}>Project</th>
              <th onClick={() => handleSort('start_date')}>Start</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.slice(0, 5).map((item, idx) => (
              <tr key={idx}>
                <td>{item.employee_id.employee_id}</td>
                <td>{item.employee_id.full_name}</td>
                <td>{item.project_code.project_name}</td>
                <td>{new Date(item.start_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTable; 