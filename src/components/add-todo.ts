import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import install from '@twind/with-web-components'
import config from '../../twind.config'

@customElement('add-todo')
@install(config)
class AddTodo extends LitElement {
    /**
     * Triggers an event to add a blank todo in the parent component.
     */
    addTodo() {
        const customEvent = new CustomEvent('add-blank-todo', {
            bubbles: true,
            composed: true,
        })

        this.dispatchEvent(customEvent)
    }

    override render() {
        return html`
                <section class="flex justify-end font-sans border-t border-slate-500 pt-3">
                    <button 
                        class="bg-slate-200 p-2 border border-slate-300 rounded-md text-sm hover:bg-slate-300"
                        @click=${() => this.addTodo()}>Create Todo</button>
                </section>
        `
    }
}

export default AddTodo