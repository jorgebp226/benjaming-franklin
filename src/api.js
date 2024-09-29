import { GraphQLAPI as API, graphqlOperation } from '@aws-amplify/api-graphql';
import { listVirtues } from './graphql/queries';
import { updateVirtue } from './graphql/mutations';

const response = await API.graphql(graphqlOperation(listVirtues));
console.log('Respuesta completa de GraphQL:', response);

// Obtener todas las virtudes
export const getVirtues = async () => {
  try {
    const response = await API.graphql(graphqlOperation(listVirtues));
    return response.data.listVirtues.items;
  } catch (error) {
    console.error("Error fetching virtues:", error);
    return [];
  }
};

// Actualizar los registros de una virtud
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
    console.error("Error updating virtue records:", error);
    return null;
  }
};