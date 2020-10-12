import { LitElement } from 'lit-element';
import { ApolloClient } from '@apollo/client/core';
import '@material/mwc-textfield';
import '@material/mwc-circular-progress';
import '@material/mwc-button';
import { Agent } from '../types';
export declare abstract class UsernamePrompt extends LitElement {
    /** Public attributes */
    /** Dependencies */
    abstract get _apolloClient(): ApolloClient<any>;
    /** Private properties */
    _myProfile: Agent | undefined;
    static styles: import("lit-element").CSSResult[];
    firstUpdated(): Promise<void>;
    agentHasSetUsername(): string | undefined;
    usernameSet(e: CustomEvent): void;
    renderPrompt(): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
}
