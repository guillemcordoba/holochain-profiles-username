function hashToString(hash) {
    return hash.hash_type.toString('hex') + hash.hash.toString('hex');
}
export function profilesUsernameResolvers(appWebsocket, cellId, zomeName = 'profiles') {
    function callZome(fn_name, payload) {
        return appWebsocket.callZome({
            cap: null,
            cell_id: cellId,
            zome_name: zomeName,
            fn_name: fn_name,
            payload: payload,
            provenance: cellId[1],
        });
    }
    return {
        Agent: {
            async username(parent) {
                if (parent.username)
                    return parent.username;
                return callZome('get_agent_username', { agent_address: parent.id });
            },
        },
        Query: {
            async allAgents(_, __) {
                const allAgents = await callZome('get_all_profiles', null);
                return allAgents.map((agent) => ({
                    id: hashToString(agent.agent_id),
                    username: agent.username,
                }));
            },
            async me(_, __) {
                const profile = await callZome('get_my_profile', null);
                return profile;
            },
        },
        Mutation: {
            async setUsername(_, { username }) {
                const agent = await callZome('create_profile', { username });
                return {
                    id: hashToString(cellId[1]),
                    username,
                };
            },
        },
    };
}
//# sourceMappingURL=resolvers.js.map