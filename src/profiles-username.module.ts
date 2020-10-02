import { ApolloClient } from '@apollo/client/core';
import { defineSetUsername } from './elements/set-username';

export class ProfilesUsernameModule {
  constructor(protected dependencies: { apolloClient: ApolloClient<any> }) {}

  async install(): Promise<void> {
    defineSetUsername(this.dependencies.apolloClient);
  }

  static isInstalled(): boolean {
    return customElements.get('hpu-set-username');
  }
}
