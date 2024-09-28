// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Calendar from './components/Calendar';
import ProgressChart from './components/ProgressChart';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <ul>
            <li>
              <Link to="/">Calendario</Link>
            </li>
            <li>
              <Link to="/progress-chart">Gráfico de Progreso</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/progress-chart" element={<ProgressChart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
