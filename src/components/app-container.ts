import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import install from '@twind/with-web-components'
import config from '../../twind.config'

// Child Components
import './todo-list'
import './add-todo'

@customElement('app-container')
@install(config)
export class AppContainer extends LitElement {
    @property() todos = [
        { 
            id: crypto.randomUUID(),
            title: 'Clean car',
            completed: false 
        },
        { 
            id: crypto.randomUUID(),
            title: 'Go for a walk',
            completed: false 
        },
        { 
            id: crypto.randomUUID(),
            title: 'Put away dishwasher',
            completed: false 
        }
    ]

    override render() {
        return html`
            <main class="mx-auto max-w-screen-sm p-6 shadow-md border border-solid rounded-md border-slate-300 mt-8">
                <h1 class="text-2xl font-sans border-b border-solid border-slate-500">Todos</h1>
                <todo-list .todos=${this.todos}></todo-list>
                <add-todo></add-todo>
            </main>
        `
    }
}