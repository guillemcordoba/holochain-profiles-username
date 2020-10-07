function hashToString(hash) {
    return hash.hash_type.toString('hex') + hash.hash.toString('hex');
}
export const profilesUsernameResolvers = (appWebsocket, cellId, zomeName = 'profiles') => ({
    Query: {
        async allAgents(_, __) {
            const allAgents = await appWebsocket.callZome({
                cap: null,
                cell_id: cellId,
                zome_name: zomeName,
                fn_name: 'get_all_profiles',
                payload: null,
                provenance: cellId[1],
            });
            return allAgents.map((agent) => ({
                id: hashToString(agent.agent_id),
                username: agent.username,
            }));
        },
        async me(_, __) {
            const profile = await appWebsocket.callZome({
                cap: null,
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
                cap: null,
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
//# sourceMappingURL=resolvers.js.map