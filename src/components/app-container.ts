import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import install from '@twind/with-web-components'
import config from '../../twind.config'
import './todo-list'

@customElement('app-container')
@install(config)
export class AppContainer extends LitElement {
    override render() {
        return html`
            <main class="container mx-auto">
                <todo-list></todo-list>
            </main>
        `
    }
}