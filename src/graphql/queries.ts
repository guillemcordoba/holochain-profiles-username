import { gql } from '@apollo/client/core';

export const SET_USERNAME = gql`
  mutation SetUsername($username: String!) {
    setUsername(username: $username) {
      id
      username
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    allUsers {
      id
      username
    }
  }
`;
