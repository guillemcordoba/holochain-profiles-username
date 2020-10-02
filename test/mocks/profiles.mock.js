import { randomHash } from './utils';

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
}