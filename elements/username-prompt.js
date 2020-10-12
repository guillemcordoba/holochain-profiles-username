import { __decorate } from "tslib";
import { LitElement, css, html, property } from 'lit-element';
import '@material/mwc-textfield';
import '@material/mwc-circular-progress';
import '@material/mwc-button';
import { GET_MY_PROFILE } from '../graphql/queries';
import { sharedStyles } from '../sharedStyles';
export class UsernamePrompt extends LitElement {
    constructor() {
        /** Public attributes */
        super(...arguments);
        /** Private properties */
        this._myProfile = undefined;
    }
    async firstUpdated() {
        const result = await this._apolloClient.query({
            query: GET_MY_PROFILE,
        });
        this._myProfile = result.data.me;
    }
    agentHasSetUsername() {
        return this._myProfile && this._myProfile.username;
    }
    usernameSet(e) {
        var _a;
        this._myProfile = {
            id: (_a = this._myProfile) === null || _a === void 0 ? void 0 : _a.id,
            username: e.detail.username,
        };
    }
    renderPrompt() {
        return html ` <div
      class="column"
      style="align-items: center; justify-content: center"
    >
      ${this._myProfile
            ? html `<hpu-set-username
            @username-set=${this.usernameSet}
          ></hpu-set-username>`
            : html `<mwc-circular-progress></mwc-circular-progress>`}
    </div>`;
    }
    render() {
        return html `
      ${this.agentHasSetUsername() ? html `<slot></slot>` : this.renderPrompt()}
    `;
    }
}
UsernamePrompt.styles = [
    sharedStyles,
    css `
      :host {
        display: contents;
      }
    `,
];
__decorate([
    property({ type: Object })
], UsernamePrompt.prototype, "_myProfile", void 0);
//# sourceMappingURL=username-prompt.js.map