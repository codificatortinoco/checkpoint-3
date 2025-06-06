import Root from "./Root/Root";
import Register from "./screens/register";
import Login from "./screens/login";
import Board from "./screens/board"

customElements.define("root-element", Root);
customElements.define("register-component", Register);
customElements.define("login-component", Login);
customElements.define("board-component", Board)

export default Root;