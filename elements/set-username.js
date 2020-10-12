import { __decorate } from "tslib";
import { LitElement, html, query, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import '@material/mwc-textfield';
import '@material/mwc-button';
import { SET_USERNAME } from '../graphql/queries';
import { sharedStyles } from '../sharedStyles';
export class SetUsername extends LitElement {
    constructor() {
        /** Public attributes */
        super(...arguments);
        /**
         * Minimum length that the username needs to have
         * @attr min-length
         */
        this.minLength = 3;
        this._existingUsernames = {};
    }
    firstUpdated() {
        this._usernameField.validityTransform = (newValue) => {
            this.requestUpdate();
            if (newValue.length < this.minLength) {
                this._usernameField.setCustomValidity(`Username is too shot, min. ${this.minLength} characters`);
                return {
                    valid: false,
                };
            }
            else if (this._existingUsernames[newValue]) {
                this._usernameField.setCustomValidity('This username already exists');
                return { valid: false };
            }
            return {
                valid: true,
            };
        };
    }
    async setUsername() {
        const username = this._usernameField.value;
        try {
            await this._apolloClient.mutate({
                mutation: SET_USERNAME,
                variables: {
                    username,
                },
            });
            this.dispatchEvent(new CustomEvent('username-set', {
                detail: { username },
                bubbles: true,
                composed: true,
            }));
        }
        catch (e) {
            this._existingUsernames[username] = true;
            this._usernameField.reportValidity();
        }
    }
    render() {
        return html `
      <div class="column">
        <mwc-textfield
          id="username-field"
          outlined
          @input=${() => this._usernameField.reportValidity()}
        ></mwc-textfield>
        <mwc-button
          id="set-username-button"
          raised
          class=${classMap({
            'small-margin': !!this._usernameField,
            'big-margin': !this._usernameField,
        })}
          .disabled=${!this._usernameField ||
            !this._usernameField.validity.valid}
          label="SET USERNAME"
          @click=${() => this.setUsername()}
        ></mwc-button>
      </div>
    `;
    }
}
SetUsername.styles = sharedStyles;
__decorate([
    property({ type: Number, attribute: 'min-length' })
], SetUsername.prototype, "minLength", void 0);
__decorate([
    query('#username-field')
], SetUsername.prototype, "_usernameField", void 0);
//# sourceMappingURL=set-username.js.map