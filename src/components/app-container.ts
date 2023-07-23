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
    @property() todos = new Map([
        [ crypto.randomUUID(), { title: 'Clean car', completed: false, isEditing: false} ],
        [ crypto.randomUUID(), { title: 'Go for a walk', completed: false, isEditing: false} ],
        [ crypto.randomUUID(), { title: 'Put away dishwasher', completed: false, isEditing: false} ]
    ])

    /**
     * Adds the User Input into the TodoList
     * 
     * @param event CustomEvent
     */
    onCreateNewTodo(event: CustomEvent) {
        const { detail } = event;
        const { id, title } = detail;
        // Make copy
        const copy = new Map(this.todos)
        // Update id with new title
        copy.set( id, { title, completed: false, isEditing: false });
        // Update property with new reference.
        this.todos = copy;
        // Trigger component refresh since data changed.
        this.requestUpdate();        
    }

    onRemoveTodo(event: CustomEvent) {
        // Make copy
        const copy = new Map(this.todos);
        // Delete from copy       
        copy.delete(event.detail.id);
        // Update property with new reference.
        this.todos = copy;
        // Trigger component refresh since data changed.
        this.requestUpdate();        
    }


    /**
     * Adds a blank Todo Item to List.
     */
    onAddBlankTodo() {
        // Make copy.
        const copy = new Map(this.todos)
        // Add blank todo.
        copy.set(crypto.randomUUID(),  { title: "", completed: false, isEditing: true });
        // Update property with new reference.
        this.todos = copy;
        // Trigger component refresh since data changed.
        this.requestUpdate();
    }

    override render() {
        return html`
            <main class="mx-auto max-w-screen-sm p-6 shadow-md border border-solid rounded-md border-slate-300 mt-8">
                <h1 class="text-2xl font-sans border-b border-solid border-slate-500">Todos</h1>
                <todo-list .todos=${this.todos} @create-new-todo=${this.onCreateNewTodo} @remove-todo=${this.onRemoveTodo}></todo-list>
                <add-todo @add-blank-todo=${() => this.onAddBlankTodo()}></add-todo>
            </main>
        `
    }
}