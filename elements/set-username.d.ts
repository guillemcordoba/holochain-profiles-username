import { LitElement } from 'lit-element';
import { ApolloClient } from '@apollo/client/core';
import type { TextField } from '@material/mwc-textfield';
import '@material/mwc-textfield';
import '@material/mwc-button';
export declare abstract class SetUsername extends LitElement {
    /** Public attributes */
    /**
     * Minimum length that the username needs to have
     * @attr min-length
     */
    minLength: number;
    /** Dependencies */
    abstract get _apolloClient(): ApolloClient<any>;
    /** Private properties */
    _usernameField: TextField;
    _existingUsernames: {
        [key: string]: boolean;
    };
    firstUpdated(): void;
    static styles: import("lit-element").CSSResult;
    setUsername(): Promise<void>;
    render(): import("lit-element").TemplateResult;
}
