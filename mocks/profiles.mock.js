import { randomHash, hashToString } from 'holochain-ui-test-utils';

export class ProfilesMock {
  constructor() {
    this.agents = [];
  }

  create_profile({ username }, provenance) {
    this.agents.push({
      agent_id: provenance,
      username,
    });

    return hashToString(provenance);
  }

  get_all_profiles() {
    return this.agents.map(a => ({ agent_id: hashToString(a.agent_id), ...a }));
  }

  get_my_profile(_, provenance) {
    const agent = this.findAgent(hashToString(provenance));
    return {
      agent_id: hashToString(agent.agent_id),
      username: agent.username,
    };
  }

  findAgent(agent_address) {
    const agent = this.agents.find(
      user => hashToString(user.agent_id) === agent_address
    );
    if (!agent) throw new Error('Given agent has not created any profile yet');
    return agent;
  }

  get_agent_username({ agent_address }) {
    return this.findAgent(agent_address).username;
  }
}
