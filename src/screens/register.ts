import { authActions, Screen, screenActions } from "../flux/Actions";
import { State, store } from "../flux/Store";

class Register extends HTMLElement {
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
                input, select, button {
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
                <h1>REGISTER</h1>
                <div class="botones">
                    <button id="login">Login</button>
                    <button id="Board">board</button>
                </div>
                <form id="register-form">
                    <input type="text" id="username" placeholder="Username" required />
                    <select id="letter-type" required>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                        <option value="G">G</option>
                        <option value="H">H</option>
                        <option value="I">I</option>
                        <option value="J">J</option>
                        <option value="K">K</option>
                        <option value="L">L</option>
                        <option value="M">M</option>
                        <option value="N">N</option>
                        <option value="O">O</option>
                        <option value="P">P</option>
                        <option value="Q">Q</option>
                        <option value="R">R</option>
                        <option value="S">S</option>
                        <option value="T">T</option>
                        <option value="U">U</option>
                        <option value="V">V</option>
                        <option value="W">W</option>
                        <option value="X">X</option>
                        <option value="Y">Y</option>
                        <option value="Z">Z</option>

                    </select>
                    <select id="color-type" required>
                        <option value="Red">Red</option>
                        <option value="Blue">Blue</option>
                        <option value="Yellow">Yellow</option>
                    </select>
                    <button type="submit">Register</button>
                </form>
            </div>
        `

        this.shadowRoot.querySelector('#login')?.addEventListener('click', () => {
            screenActions.changeScreen(Screen.LOGIN);
        });
        this.shadowRoot.querySelector('#board')?.addEventListener('click', () => {
            screenActions.changeScreen(Screen.BOARD);
        });

        const registerForm = this.shadowRoot.querySelector('#register-form') as HTMLFormElement;
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const usernameInput = this.shadowRoot?.querySelector('#username') as HTMLInputElement;
            const userLetterSelect = this.shadowRoot?.querySelector('#user-letter') as HTMLSelectElement;
            const userColorSelect = this.shadowRoot?.querySelector('#user-color') as HTMLSelectElement;

            if (usernameInput && userLetterSelect && userColorSelect) {
                const username = usernameInput.value;
                const userLetter = userLetterSelect.value;
                const userColor = userColorSelect.value;

                authActions.register(username, userLetter, userColor);
                
                screenActions.changeScreen(Screen.LOGIN);
            }
        });
    }
};

export default Register;