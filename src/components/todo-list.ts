import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import install from '@twind/with-web-components'
import config from '../../twind.config'

@customElement('todo-list')
@install(config)
class TodoList extends LitElement {
    @property() todos = [{ id: crypto.randomUUID(), title: 'this is a todo', completed: false }]

    override render() {
        return html`
                <p>${this.todos.map(todo => todo.title)}<p>
        `
    }
}