/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getWeekRecords = /* GraphQL */ `
  query GetWeekRecords(
    $virtueId: ID!
    $startDate: AWSDate!
    $endDate: AWSDate!
  ) {
    getWeekRecords(
      virtueId: $virtueId
      startDate: $startDate
      endDate: $endDate
    ) {
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
export const getVirtue = /* GraphQL */ `
  query GetVirtue($id: ID!) {
    getVirtue(id: $id) {
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getVirtueRecord = /* GraphQL */ `
  query GetVirtueRecord($id: ID!) {
    getVirtueRecord(id: $id) {
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
export const listVirtueRecords = /* GraphQL */ `
  query ListVirtueRecords(
    $filter: ModelVirtueRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVirtueRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const virtueRecordsByVirtueId = /* GraphQL */ `
  query VirtueRecordsByVirtueId(
    $virtueId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelVirtueRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    virtueRecordsByVirtueId(
      virtueId: $virtueId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
