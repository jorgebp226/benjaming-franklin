/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createVirtue = /* GraphQL */ `
  mutation CreateVirtue(
    $input: CreateVirtueInput!
    $condition: ModelVirtueConditionInput
  ) {
    createVirtue(input: $input, condition: $condition) {
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
export const updateVirtue = /* GraphQL */ `
  mutation UpdateVirtue(
    $input: UpdateVirtueInput!
    $condition: ModelVirtueConditionInput
  ) {
    updateVirtue(input: $input, condition: $condition) {
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
export const deleteVirtue = /* GraphQL */ `
  mutation DeleteVirtue(
    $input: DeleteVirtueInput!
    $condition: ModelVirtueConditionInput
  ) {
    deleteVirtue(input: $input, condition: $condition) {
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
