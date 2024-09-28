// src/components/Calendar.js
import React, { useState, useEffect } from 'react';
import { virtues as allVirtues } from '../utils/virtues';
import { getVirtues, updateVirtueRecords } from '../api'; // Importa las funciones de la API
import './Calendar.css';

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const Calendar = () => {
  const [currentWeekVirtue, setCurrentWeekVirtue] = useState(null);
  const [records, setRecords] = useState({});
  const [showDescription, setShowDescription] = useState({});

  useEffect(() => {
    initializeVirtue();
    loadRecords();
  }, []);

  const initializeVirtue = () => {
    const startDate = new Date();
    const currentWeekNumber = getWeekNumber(startDate);
    const virtueIndex = (currentWeekNumber - 1) % allVirtues.length;
    setCurrentWeekVirtue(allVirtues[virtueIndex]);
  };

  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const loadRecords = async () => {
    const data = await getVirtues();
    if (data.length === 0) {
      // Inicializar virtudes en la base de datos si no existen
      for (const virtue of allVirtues) {
        await updateVirtueRecords(virtue.id, {});
      }
    } else {
      const recordsData = {};
      data.forEach((virtue) => {
        recordsData[virtue.id] = virtue.weekRecords || {};
      });
      setRecords(recordsData);
    }
  };

  const toggleDescription = (virtueId) => {
    setShowDescription((prevState) => ({
      ...prevState,
      [virtueId]: !prevState[virtueId],
    }));
  };

  const handleMark = async (virtueId, day) => {
    const updatedRecords = { ...records };
    const currentStatus = updatedRecords[virtueId]?.[day];

    // Alternar entre true, false y null
    let newStatus;
    if (currentStatus === true) {
      newStatus = false; // Marcar como no cumplido (rojo)
    } else if (currentStatus === false) {
      newStatus = null; // Quitar la marca
    } else {
      newStatus = true; // Marcar como cumplido (verde)
    }

    updatedRecords[virtueId] = { ...updatedRecords[virtueId], [day]: newStatus };
    setRecords(updatedRecords);
    await updateVirtueRecords(virtueId, updatedRecords[virtueId]);
  };

  const getCurrentDay = () => {
    const date = new Date();
    const day = date.getDay();
    return day === 0 ? 'Domingo' : daysOfWeek[day - 1];
  };

  const calculateSuccess = (virtueId, weekIndex) => {
    if (!records[virtueId]) {
      return 0;
    }

    const weekDays = daysOfWeek.map(day => records[virtueId][day]);
    const successCount = weekDays.filter(status => status === true).length;
    return (successCount / 7) * 100;
  };

  const calculateWeeklyImprovement = () => {
    const currentWeekIndex = getWeekNumber(new Date()) - 1;
    const previousWeekIndex = currentWeekIndex > 0 ? currentWeekIndex - 1 : 0;

    const improvements = allVirtues.map((virtue) => {
      const currentWeekSuccess = calculateSuccess(virtue.id, currentWeekIndex);
      const previousWeekSuccess = calculateSuccess(virtue.id, previousWeekIndex);

      return {
        virtue: virtue.name,
        improvement: currentWeekSuccess - previousWeekSuccess,
      };
    });

    return improvements;
  };

  const improvements = calculateWeeklyImprovement();

  return (
    <div className="calendar-container">
      <h2>Semana Actual: {currentWeekVirtue ? currentWeekVirtue.name : 'Cargando...'}</h2>
      <table className="calendar-table">
        <thead>
          <tr>
            <th>Virtud</th>
            <th>Descripción</th>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allVirtues.map((virtue) => (
            <tr key={virtue.id}>
              <td>{virtue.name}</td>
              <td>
                <button onClick={() => toggleDescription(virtue.id)}>
                  {showDescription[virtue.id] ? 'Ocultar' : 'Mostrar'}
                </button>
                {showDescription[virtue.id] && <p>{virtue.description}</p>}
              </td>
              {daysOfWeek.map((day) => (
                <td key={day}>
                  <div
                    className={`marker ${
                      records[virtue.id]?.[day] === true
                        ? 'success'
                        : records[virtue.id]?.[day] === false
                        ? 'error'
                        : ''
                    }`}
                    onClick={() => handleMark(virtue.id, day)}
                    title={
                      records[virtue.id]?.[day] === true
                        ? 'Cumplido'
                        : records[virtue.id]?.[day] === false
                        ? 'No cumplido'
                        : 'Marcar como cumplido'
                    }
                  >
                    {records[virtue.id]?.[day] === true ? '🟢' : records[virtue.id]?.[day] === false ? '🔴' : '⚪️'}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="weekly-improvements">
        <h3>Mejoras de esta semana:</h3>
        <ul>
          {improvements.map((improvement) => (
            <li key={improvement.virtue}>
              {improvement.virtue}: {improvement.improvement > 0 ? `+${improvement.improvement.toFixed(2)}%` : `${improvement.improvement.toFixed(2)}%`}
            </li>
          ))}
        </ul>
      </div>

      <div className="current-day">
        <strong>Hoy es: {getCurrentDay()}</strong>
      </div>
    </div>
  );
};

export default Calendar;
