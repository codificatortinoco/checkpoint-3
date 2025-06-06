import { Screen } from "../flux/Actions";
import { State, store } from "../flux/Store";

class Root extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    handleChange(state: State) {
        this.render(state);
    }

    async connectedCallback() {
        store.load();
        store.subscribe((state: State) => this.handleChange(state));
        this.render(store.getState());
    }
    
    async render(state = store.getState()) {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = ``;

        switch (state.screen) {
            case Screen.REGISTER:
                this.shadowRoot.innerHTML = `
                    <register-component></register-component>
                `;
                break;
            case Screen.LOGIN:
                this.shadowRoot.innerHTML = `
                    <login-component></login-component>
                `;
                break;
            case Screen.BOARD:
                this.shadowRoot.innerHTML = state.currentUser
                    ? `
                        <board-component></board-component>
                    `
                    : `
                        <login-component></login-component>
                    `;
                break;
            
            default:
                break;
        }
    }
}

export default Root;