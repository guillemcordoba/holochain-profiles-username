import { gql } from '@apollo/client/core';
export const profilesUsernameTypeDefs = gql `
  type Agent {
    id: ID!
    username: String
  }

  extend type Query {
    allAgents: [Agent!]!
    me: Agent!
  }

  extend type Mutation {
    setUsername(username: String!): Agent!
  }
`;
//# sourceMappingURL=schema.js.map