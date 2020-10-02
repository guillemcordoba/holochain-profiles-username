import { gql } from '@apollo/client/core';

export const profilesUsernameTypeDefs = gql`
  type User {
    id: ID!
    username: String
  }

  extend type Query {
    allUsers: [User!]!
    me: User!
  }

  extend type Mutation {
    setUsername(username: String!): User!
  }
`;
