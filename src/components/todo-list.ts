import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import install from '@twind/with-web-components'
import config from '../../twind.config'

@customElement('todo-list')
@install(config)
class TodoList extends LitElement {
    @property() todos = new Map()

    onAddTodo(event: Event, id: string) {
        if (event.key === 'Enter') {
            const customEvent = new CustomEvent('create-new-todo', {
                detail: {
                    id,
                    title: (event.target as HTMLInputElement).value
                },
                bubbles: true,
                composed: true,
            })
    
            this.dispatchEvent(customEvent)
        }
    }  

    override render() {
        return html`
                <ul class="list-none font-sans">
                    ${Array.from(this.todos.entries()).map(
                        ([id, todo], index) => {
                            const isLastChild = index === this.todos.size;

                            if (todo.isEditing) {
                                return html`
                                    <li class="py-2" data-id="${id}">
                                        <input 
                                            class="border border-slate-500 rounded-md p-2"
                                            type="text" 
                                            placeholder="What would you like to do?"
                                            .value=${todo.title}
                                            @keydown=${(event: Event) => this.onAddTodo(event, id)}
                                        />
                                    </li>
                                `
                            }
    
                            return html`
                            <li class="py-2 ${!isLastChild ? "border-b" : ""}" data-id="${todo.id}">
                                ${todo.title}
                            </li>
                            `
                        })}
                <ul>
        `
    }
}

export default TodoList