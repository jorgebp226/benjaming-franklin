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
      records {
        nextToken
        __typename
      }
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
      records {
        nextToken
        __typename
      }
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
      records {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createVirtueRecord = /* GraphQL */ `
  mutation CreateVirtueRecord(
    $input: CreateVirtueRecordInput!
    $condition: ModelVirtueRecordConditionInput
  ) {
    createVirtueRecord(input: $input, condition: $condition) {
      id
      virtueId
      date
      status
      targetVirtueId
      createdAt
      updatedAt
      virtueRecordsId
      __typename
    }
  }
`;
export const updateVirtueRecord = /* GraphQL */ `
  mutation UpdateVirtueRecord(
    $input: UpdateVirtueRecordInput!
    $condition: ModelVirtueRecordConditionInput
  ) {
    updateVirtueRecord(input: $input, condition: $condition) {
      id
      virtueId
      date
      status
      targetVirtueId
      createdAt
      updatedAt
      virtueRecordsId
      __typename
    }
  }
`;
export const deleteVirtueRecord = /* GraphQL */ `
  mutation DeleteVirtueRecord(
    $input: DeleteVirtueRecordInput!
    $condition: ModelVirtueRecordConditionInput
  ) {
    deleteVirtueRecord(input: $input, condition: $condition) {
      id
      virtueId
      date
      status
      targetVirtueId
      createdAt
      updatedAt
      virtueRecordsId
      __typename
    }
  }
`;
