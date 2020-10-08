import { gql } from '@apollo/client/core';
export const SET_USERNAME = gql `
  mutation SetUsername($username: String!) {
    setUsername(username: $username) {
      id
      username
    }
  }
`;
export const GET_ALL_AGENTS = gql `
  query GetAllAgents {
    allAgents {
      id
      username
    }
  }
`;
export const GET_MY_PROFILE = gql `
  query GetMyProfile {
    me {
      id
      username
    }
  }
`;
//# sourceMappingURL=queries.js.map