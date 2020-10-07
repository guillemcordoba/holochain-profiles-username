import { defineSetUsername } from './elements/set-username';
export class ProfilesUsernameModule {
    constructor(dependencies) {
        this.dependencies = dependencies;
    }
    async install() {
        defineSetUsername(this.dependencies.apolloClient);
    }
    static isInstalled() {
        return customElements.get('hpu-set-username');
    }
}
//# sourceMappingURL=profiles-username.module.js.map