import { GraphQLAPI as API, graphqlOperation } from '@aws-amplify/api-graphql';
import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries';
import { virtues as allVirtues } from './utils/virtues';

// Obtener todas las virtudes desde DynamoDB
export const getVirtues = async () => {
  try {
    const response = await API.graphql(graphqlOperation(queries.listVirtues));
    if (!response || !response.data || !response.data.listVirtues) {
      throw new Error("No se recibieron datos de GraphQL.");
    }
    return response.data.listVirtues.items;
  } catch (error) {
    console.error("Error al obtener las virtudes:", error.errors ? error.errors : error);
    return [];
  }
};

// Actualizar los registros de una virtud en DynamoDB
export const updateVirtueRecords = async (virtueId, weekRecords) => {
  try {
    // Validar que los parámetros no sean undefined o null
    if (!virtueId || typeof virtueId !== 'string') {
      throw new Error('El ID de la virtud es inválido o está vacío.');
    }

    if (!weekRecords || typeof weekRecords !== 'object') {
      throw new Error('El registro semanal (weekRecords) es inválido o está vacío.');
    }

    // Aquí continúas con la mutación una vez que estás seguro de que los valores son válidos
    console.log('Enviando a updateVirtue:', virtueId, weekRecords); // Log para depurar los datos enviados

    const response = await API.graphql(graphqlOperation(mutations.updateVirtue, {
      input: {
        id: virtueId,
        weekRecords
      }
    }));

    console.log('Respuesta de updateVirtue:', response); // Log para revisar la respuesta
    return response.data.updateVirtue;
  } catch (error) {
    console.error("Error actualizando los registros de la virtud:", error.errors ? error.errors : error);
    throw error;
  }
};

// Subir todas las virtudes locales a DynamoDB
export const uploadVirtues = async () => {
  try {
    for (const virtue of allVirtues) {
      const response = await API.graphql(graphqlOperation(mutations.createVirtue, {
        input: {
          id: virtue.id,
          name: virtue.name,
          description: virtue.description,
          weekRecords: {} // Inicializa weekRecords como un objeto vacío
        }
      }));
      console.log(`Virtud subida: ${virtue.name}`, response);
    }
  } catch (error) {
    console.error('Error subiendo las virtudes:', error.errors ? error.errors : error);
  }
};
