import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import install from '@twind/with-web-components'
import config from '../../twind.config'

@customElement('app-container')
@install(config)
export class AppContainer extends LitElement {
    @property() firstName = 'chris'

    override render() {
        return html`
            <main class="container mx-auto">yeet</main>
        `
    }
}