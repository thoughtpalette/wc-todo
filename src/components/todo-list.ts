import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import install from '@twind/with-web-components'
import config from '../../twind.config'

@customElement('todo-list')
@install(config)
class TodoList extends LitElement {
    /**
     * Map of todos: ['id', { data }]
     */
    @property() todos = new Map()

    /**
     * Triggers event to parent component to add new value.
     * 
     * @param event Keyboard Event
     * @param id string
     */
    onAddTodo(event: KeyboardEvent, id: string) {
        if (event.key === 'Enter') {
            const inputValue = (event.target as HTMLInputElement).value

            // Disallow blank text entry
            // TODO: Actually add form validation
            if (inputValue.length === 0) { return }

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

    /**
     * Triggers event to parent component for Todo removal.
     * 
     * @param id string
     */
    onRemoveTodo(id: string) {
        const customEvent = new CustomEvent('remove-todo', {
            detail: { id },
            bubbles: true,
            composed: true
        })

        this.dispatchEvent(customEvent)
    }

    override render() {
        return html`
                ${this.todos.size === 0 ? html`<p class='font-sans p-5'>Please click 'Create Todo' to begin adding things to do.</p>` : ``}
                <ul class="list-none font-sans">
                    ${Array.from(this.todos.entries()).map(
                        ([id, todo], index) => {
                            const isLastChild = index === this.todos.size;

                            if (todo.isEditing) {
                                return html`
                                    <li class="py-2 pr-2 pl-2 flex justify-between group/item hover:bg-slate-100" data-id="${id}">
                                        <input 
                                            class="border border-slate-500 rounded-md p-2"
                                            type="text" 
                                            placeholder="What would you like to do?"
                                            .value=${todo.title}
                                            @keydown=${(event: KeyboardEvent) => this.onAddTodo(event, id)}
                                        />
                                        <button 
                                            class="flex justify-center align-center items-center invisible border border-slate-300 rounded-md group-hover/item:visible pl-2 pr-2 bg-slate-300 hover:bg-red-600 hover:text-white text-sm"
                                            @click=${() => this.onRemoveTodo(id)}>
                                                Remove
                                        </button>
                                    </li>
                                `
                            }
    
                            return html`
                            <li class="py-2 pr-2 pl-2 flex justify-between group/item hover:bg-slate-100 ${!isLastChild ? "border-b" : ""}" data-id="${todo.id}">
                                ${todo.title}
                                <button 
                                    class="flex justify-center align-center items-center invisible border border-slate-300 rounded-md group-hover/item:visible pl-2 pr-2 bg-slate-300 hover:bg-red-600 hover:text-white text-sm"
                                    @click=${() => this.onRemoveTodo(id)}>
                                        Remove
                                </button>
                            </li>
                            `
                        })}
                <ul>
        `
    }
}

export default TodoList