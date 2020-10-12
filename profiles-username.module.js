import { SetUsername } from './elements/set-username';
import { UsernamePrompt } from './elements/username-prompt';
import { setupApolloClientElement } from './utils';
export class ProfilesUsernameModule {
    constructor(dependencies) {
        this.dependencies = dependencies;
    }
    async install() {
        customElements.define('hpu-set-username', setupApolloClientElement(SetUsername, this.dependencies.apolloClient));
        customElements.define('hpu-username-prompt', setupApolloClientElement(UsernamePrompt, this.dependencies.apolloClient));
    }
    static isInstalled() {
        return customElements.get('hpu-set-username');
    }
}
//# sourceMappingURL=profiles-username.module.js.map