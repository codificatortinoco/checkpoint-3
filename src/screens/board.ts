import { blocksActions, Screen, screenActions, authActions } from "../flux/Actions";
import { State, store } from "../flux/Store";


class Board extends HTMLElement{
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
        const postList = state.blockList || [];
        this.shadowRoot.innerHTML = `
            <style>
                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top: 32px;
                }
                h1 { margin-bottom: 18px; }
                .botones {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 18px;
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
                    width: 100%;
                    margin-bottom: 18px;
                }
                input, textarea, button {
                    font-size: 1rem;
                    padding: 6px 8px;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                }
                textarea { resize: vertical; }
                button { cursor: pointer; }
                button:hover { filter: brightness(0.97); }
                .post-list {
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                    width: 100%;
                    max-width: 340px;
                    margin-top: 18px;
                }
                li {
                    list-style: none;
                    margin: 0;
                    padding: 16px;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.04);
                    transition: transform 0.15s;
                }
                li:hover {
                    transform: translateY(-4px) scale(1.02);
                }
                    .plano {
                    display: grid;
                    grid: repeat(5, 60px) / auto-flow 80px;
}

                    .plano > div {
                    background-color: #8ca0ff;
                    width: 50px;
                    height: 50px;
}
            </style>

            <div class="container">
                <h1>DASHBOARD</h1>
                <div class="botones">
                    <button id="logout">Logout</button>
                </div>
                <div class="plano">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
</div>
        `
        
        this.shadowRoot.querySelector('#login')?.addEventListener('click', () => {
            screenActions.changeScreen(Screen.LOGIN);
        });
        this.shadowRoot.querySelector('#register')?.addEventListener('click', () => {
            screenActions.changeScreen(Screen.REGISTER);
        });
        this.shadowRoot.querySelector('#logout')?.addEventListener('click', () => {
            authActions.logout();
        });
};
}
export default Board;