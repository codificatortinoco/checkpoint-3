import { authActions, Screen, screenActions } from "../flux/Actions";
import { State, store } from "../flux/Store";

class Login extends HTMLElement {
    connectedCallback() {
        store.subscribe((state: State) => this.handleChange(state));
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    handleChange(state: State) {
        this.render(state);
    }

    render(state = store.getState()) {
        if(!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <style>
                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top: 32px;
                }
                h1 { margin-bottom: 18px; text-align: center; }
                .botones {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 18px;
                    justify-content: center;
                }
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    padding: 18px 16px;
                    border-radius: 10px;
                    border: 1px solid #ccc;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.04);
                    max-width: 320px;
                    align-items: center;
                }
                input, button {
                    font-size: 1rem;
                    padding: 6px 8px;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                    text-align: center;
                }
                button { cursor: pointer; }
                button:hover { filter: brightness(0.97); }
            </style>
            <div class="container">
                <h1>LOGIN</h1>
                <div class="botones">
                    <button id="register">Register</button>
                </div>
                <form id="login-form">
                    <input type="text" id="username" placeholder="Username" required />
                    <button type="submit">Login</button>
                </form>
            </div>
        `
        
        this.shadowRoot.querySelector('#Board')?.addEventListener('click', () => {
            screenActions.changeScreen(Screen.BOARD);
        });
        this.shadowRoot.querySelector('#register')?.addEventListener('click', () => {
            screenActions.changeScreen(Screen.REGISTER);
        });

        const loginForm = this.shadowRoot.querySelector('#login-form') as HTMLFormElement;
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const usernameInput = this.shadowRoot?.querySelector('#username') as HTMLInputElement;

            authActions.login(usernameInput.value);
        });
    }
};

export default Login;