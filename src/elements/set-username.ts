import { LitElement, css, html, query, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { ApolloClient } from '@apollo/client/core';

import type { TextField } from '@material/mwc-textfield';
import '@material/mwc-textfield';
import '@material/mwc-button';
import { SET_USERNAME } from '../graphql/queries';

export abstract class SetUsername extends LitElement {
  /** Public attributes */

  /**
   * Minimum length that the username needs to have
   * @attr username-min-length
   */
  @property({ type: Number, attribute: 'username-min-length' })
  usernameMinLength = 3;

  /** Dependencies */
  abstract get _apolloClient(): ApolloClient<any>;

  /** Private properties */

  @query('#username-field')
  _usernameField!: TextField;

  _existingUsernames: { [key: string]: boolean } = {};

  firstUpdated() {
    this._usernameField.validityTransform = (newValue: string) => {
      this.requestUpdate();
      if (newValue.length < this.usernameMinLength) {
        this._usernameField.setCustomValidity(
          `Username is too shot, min. ${this.usernameMinLength} characters`
        );
        return {
          valid: false,
        };
      } else if (this._existingUsernames[newValue]) {
        this._usernameField.setCustomValidity('This username already exists');
        return { valid: false };
      }

      return {
        valid: true,
      };
    };
  }

  static get styles() {
    return css`
      .row {
        display: flex;
        flex-direction: row;
      }
      .column {
        display: flex;
        flex-direction: column;
      }
      .small-margin {
        margin-top: 6px;
      }
      .big-margin {
        margin-top: 23px;
      }
    `;
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

      this.dispatchEvent(
        new CustomEvent('username-set', {
          detail: { username },
          bubbles: true,
          composed: true,
        })
      );
    } catch (e) {
      this._existingUsernames[username] = true;
      this._usernameField.reportValidity();
    }
  }

  render() {
    return html`
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

export function defineSetUsername(apolloClient: ApolloClient<any>): void {
  customElements.define(
    'hpu-set-username',
    class extends SetUsername {
      get _apolloClient() {
        return apolloClient;
      }
    }
  );
}
