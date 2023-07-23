import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import install from '@twind/with-web-components'
import config from '../../twind.config'

@customElement('todo-list')
@install(config)
class TodoList extends LitElement {
    @property() todos = [{ id: 0, title: "" }]

    override render() {
        return html`
                <ul class="list-none font-sans">
                    ${this.todos.map((todo, index) => {
                        const isLastChild = index === this.todos.length - 1;

                        return html`<li class="py-2 ${!isLastChild ? "border-b" : ""}" data-id="${todo.id}">${todo.title}</li>`
                    })}
                <ul>
        `
    }
}

export default TodoList