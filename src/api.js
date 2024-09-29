import { API, graphqlOperation } from '@aws-amplify/api-graphql';
import { listVirtues } from './graphql/queries';
import { updateVirtue, createVirtue } from './graphql/mutations';
import { virtues as allVirtues } from './utils/virtues'; // Importa las virtudes locales

// Obtener todas las virtudes desde DynamoDB
export const getVirtues = async () => {
  try {
    const response = await API.graphql(graphqlOperation(listVirtues));
    if (!response || !response.data || !response.data.listVirtues) {
      throw new Error("No se recibieron datos de GraphQL.");
    }
    return response.data.listVirtues.items;
  } catch (error) {
    console.error("Error al obtener las virtudes:", error);
    return [];
  }
};

// Actualizar los registros de una virtud en DynamoDB
export const updateVirtueRecords = async (virtueId, weekRecords) => {
  try {
    const response = await API.graphql(graphqlOperation(updateVirtue, {
      input: {
        id: virtueId,
        weekRecords
      }
    }));
    return response.data.updateVirtue;
  } catch (error) {
    console.error("Error actualizando los registros de la virtud:", error);
    return null;
  }
};

// Subir todas las virtudes locales a DynamoDB
export const uploadVirtues = async () => {
  try {
    for (const virtue of allVirtues) {
      const response = await API.graphql(graphqlOperation(createVirtue, {
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
    console.error('Error subiendo las virtudes:', error);
  }
};
