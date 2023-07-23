import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('app-container')
export class AppContainer extends LitElement {
    @property() firstName = 'chris'

    render() {
        return html`
            <main class="container">yeet</main>
        `
    }
}