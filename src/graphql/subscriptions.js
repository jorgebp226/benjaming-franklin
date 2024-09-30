/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateVirtue = /* GraphQL */ `
  subscription OnCreateVirtue($filter: ModelSubscriptionVirtueFilterInput) {
    onCreateVirtue(filter: $filter) {
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
export const onUpdateVirtue = /* GraphQL */ `
  subscription OnUpdateVirtue($filter: ModelSubscriptionVirtueFilterInput) {
    onUpdateVirtue(filter: $filter) {
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
export const onDeleteVirtue = /* GraphQL */ `
  subscription OnDeleteVirtue($filter: ModelSubscriptionVirtueFilterInput) {
    onDeleteVirtue(filter: $filter) {
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
export const onCreateVirtueRecord = /* GraphQL */ `
  subscription OnCreateVirtueRecord(
    $filter: ModelSubscriptionVirtueRecordFilterInput
  ) {
    onCreateVirtueRecord(filter: $filter) {
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
export const onUpdateVirtueRecord = /* GraphQL */ `
  subscription OnUpdateVirtueRecord(
    $filter: ModelSubscriptionVirtueRecordFilterInput
  ) {
    onUpdateVirtueRecord(filter: $filter) {
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
export const onDeleteVirtueRecord = /* GraphQL */ `
  subscription OnDeleteVirtueRecord(
    $filter: ModelSubscriptionVirtueRecordFilterInput
  ) {
    onDeleteVirtueRecord(filter: $filter) {
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
