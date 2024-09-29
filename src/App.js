import React, { useEffect } from 'react'; // Importa useEffect
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Calendar from './components/Calendar';
import ProgressChart from './components/ProgressChart';
import './App.css';
import { uploadVirtues } from './api'; // Importa la función uploadVirtues

function App() {
  // Este useEffect se ejecuta una sola vez cuando el componente carga
  useEffect(() => {
    // Subir virtudes a DynamoDB (solo la primera vez)
    uploadVirtues();
  }, []); // El array vacío asegura que solo se ejecute una vez al cargar

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
