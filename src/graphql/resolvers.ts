import { AppWebsocket, CellId, AgentPubKey } from '@holochain/conductor-api';
import { Resolvers } from '@apollo/client/core';

function hashToString(hash: AgentPubKey) {
  return hash.hash_type.toString('hex') + hash.hash.toString('hex');
}

export const profilesUsernameResolvers = (
  appWebsocket: AppWebsocket,
  cellId: CellId,
  zomeName = 'profiles'
): Resolvers => ({
  Query: {
    async allUsers(_, __) {
      const allUsers = await appWebsocket.callZome({
        cap: null as any,
        cell_id: cellId,
        zome_name: zomeName,
        fn_name: 'get_all_profiles',
        payload: null,
        provenance: cellId[1],
      });
      return allUsers.map(
        (agent: { agent_id: AgentPubKey; username: string }) => ({
          id: hashToString(agent.agent_id),
          username: agent.username,
        })
      );
    },
    async me(_, __) {
      const profile = await appWebsocket.callZome({
        cap: null as any,
        cell_id: cellId,
        zome_name: zomeName,
        fn_name: 'get_my_profile',
        payload: null,
        provenance: cellId[1],
      });
      return profile;
    },
  },
  Mutation: {
    async setUsername(_, { username }) {
      const agent = await appWebsocket.callZome({
        cap: null as any,
        cell_id: cellId,
        zome_name: zomeName,
        fn_name: 'create_profile',
        payload: { username },
        provenance: cellId[1],
      });

      return {
        id: hashToString(cellId[1]),
        username,
      };
    },
  },
});
