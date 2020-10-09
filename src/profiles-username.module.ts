import { ApolloClient } from '@apollo/client/core';
import { SetUsername } from './elements/set-username';
import { UsernamePrompt } from './elements/username-prompt';
import { setupApolloClientElement } from './utils';

export class ProfilesUsernameModule {
  constructor(protected dependencies: { apolloClient: ApolloClient<any> }) {}

  async install(): Promise<void> {
    customElements.define(
      'hpu-set-username',
      setupApolloClientElement(SetUsername, this.dependencies.apolloClient)
    );
    customElements.define(
      'hpu-username-prompt',
      setupApolloClientElement(UsernamePrompt, this.dependencies.apolloClient)
    );
  }

  static isInstalled(): boolean {
    return customElements.get('hpu-set-username');
  }
}
