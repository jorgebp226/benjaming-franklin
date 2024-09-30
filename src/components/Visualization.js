import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { virtues as allVirtues } from '../utils/virtues';
import { getVirtuesWithRecords } from '../api';
import './Visualization.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Visualization = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30); // Obtener datos de los últimos 30 días
    const endDate = new Date();
    const data = await getVirtuesWithRecords(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]);
    setRecords(data);
  };

  const calculateStatistics = () => {
    const stats = {};
    records.forEach((virtue) => {
      let success = 0;
      let error = 0;
      virtue.records.forEach((record) => {
        if (record.status === true) success += 1;
        if (record.status === false) error += 1;
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
    labels: allVirtues.map((v) => v.name),
    datasets: [
      {
        label: 'Cumplido (%)',
        data: allVirtues.map((v) => stats[v.name]?.success.toFixed(2) || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Errores (%)',
        data: allVirtues.map((v) => stats[v.name]?.error.toFixed(2) || 0),
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
        text: 'Progreso de Virtudes (Últimos 30 días)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Porcentaje (%)',
        },
      },
    },
  };

  return (
    <div className="visualization-container">
      <h2>Visualización de Progreso</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Visualization;