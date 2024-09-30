import { GraphQLAPI as API, graphqlOperation } from '@aws-amplify/api-graphql';
//import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries';
import { virtues as allVirtues } from './utils/virtues';

export const getWeekRecords = async (virtueId, startDate, endDate) => {
  try {
    const response = await API.graphql(graphqlOperation(queries.getWeekRecords, {
      virtueId,
      startDate,
      endDate
    }));
    return response.data.getWeekRecords;
  } catch (error) {
    console.error("Error al obtener los registros de la semana:", error);
    return [];
  }
};

export const updateVirtueRecord = async (virtueId, date, status, targetVirtueId) => {
  try {
    const input = {
      virtueId,
      date,
      status,
      targetVirtueId
    };

    const existingRecord = await API.graphql(graphqlOperation(queries.getWeekRecords, {
      virtueId,
      startDate: date,
      endDate: date
    }));

    if (existingRecord.data.getWeekRecords.length > 0) {
      input.id = existingRecord.data.getWeekRecords[0].id;
      await API.graphql(graphqlOperation(mutations.updateVirtueRecord, { input }));
    } else {
      await API.graphql(graphqlOperation(mutations.createVirtueRecord, { input }));
    }

    return true;
  } catch (error) {
    console.error("Error actualizando el registro de la virtud:", error);
    throw error;
  }
};

export const getTargetVirtueForWeek = (date) => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const weekNumber = Math.floor((date - startOfYear) / (7 * 24 * 60 * 60 * 1000));
  return allVirtues[weekNumber % allVirtues.length].id;
};

export const getVirtuesWithRecords = async (startDate, endDate) => {
  try {
    const virtuesWithRecords = [];
    for (const virtue of allVirtues) {
      const records = await getWeekRecords(virtue.id, startDate, endDate);
      virtuesWithRecords.push({
        ...virtue,
        records: records
      });
    }
    return virtuesWithRecords;
  } catch (error) {
    console.error("Error al obtener las virtudes con registros:", error);
    return [];
  }
};

export const getWeekNumber = (date) => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  return Math.ceil((date - startOfYear) / (7 * 24 * 60 * 60 * 1000));
};