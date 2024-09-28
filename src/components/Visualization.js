// src/components/Visualization.js
import React, { useState, useEffect } from 'react';
import { virtues } from '../utils/virtues';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Visualization.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Visualization = () => {
  const [records, setRecords] = useState({});

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = () => {
    const savedRecords = localStorage.getItem('records');
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
  };

  const calculateStatistics = () => {
    const stats = {};
    virtues.forEach((virtue) => {
      let success = 0;
      let error = 0;
      Object.values(records[virtue.id] || {}).forEach((status) => {
        if (status === true) success += 1;
        if (status === false) error += 1;
      });
      const total = success + error;
      stats[virtue.name] = {
        success: total > 0 ? (success / total) * 100 : 0,
        error: total > 0 ? (error / total) * 100 : 0,
      };
    });
    return stats;
  };

  const stats = calculateStatistics();

  const data = {
    labels: virtues.map((v) => v.name),
    datasets: [
      {
        label: 'Cumplido (%)',
        data: virtues.map((v) => stats[v.name].success.toFixed(2)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Errores (%)',
        data: virtues.map((v) => stats[v.name].error.toFixed(2)),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Progreso de Virtudes',
      },
    },
  };

  return (
    <div className="visualization-container">
      <h2>Visualización de Progreso</h2>
      <Bar data={data} options={options} />
      {/* Aquí puedes agregar más visualizaciones y estadísticas */}
    </div>
  );
};

export default Visualization;
