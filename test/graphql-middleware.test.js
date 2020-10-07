import { gql, ApolloClient, InMemoryCache } from '@apollo/client/core';
import { expect } from '@open-wc/testing';
import { GET_ALL_AGENTS, SET_USERNAME } from '../dist';

import { setupApolloClientMock } from './mocks';

describe('Apollo middleware', () => {
  it('set a username and retrieve all users', async () => {
    const client = await setupApolloClientMock();

    const setUsernameResult = await client.mutate({
      mutation: SET_USERNAME,
      variables: {
        username: 'alice',
      },
    });

    const result = await client.query({
      query: GET_ALL_AGENTS,
    });

    expect(result.data.allAgents.length).to.equal(1);
    expect(result.data.allAgents[0].username).to.equal('alice');
  });
});
