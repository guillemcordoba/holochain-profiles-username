import { randomHash, hashToString } from 'holochain-ui-test-utils';

export class ProfilesMock {
  constructor() {
    this.users = [];
  }

  create_profile({ username }) {
    const newId = randomHash();
    this.users.push({
      agent_id: newId,
      username,
    });

    return newId;
  }

  get_all_profiles() {
    return this.users;
  }
  get_my_profile() {
    return this.users[0];
  }

  get_agent_username({ agent_address }) {
    const agent = this.users.find(
      user => hashToString(user.agent_id) === agent_address
    );

    if (!agent) throw new Error('Given agent has not created any profile yet');
    return agent.username;
  }
}
