/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVirtue = /* GraphQL */ `
  query GetVirtue($id: ID!) {
    getVirtue(id: $id) {
      id
      name
      description
      weekRecords
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listVirtues = /* GraphQL */ `
  query ListVirtues(
    $filter: ModelVirtueFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVirtues(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        weekRecords
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
