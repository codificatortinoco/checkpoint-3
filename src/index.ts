import Root from "./Root/Root";
import Register from "./screens/register";
import Login from "./screens/login";

customElements.define("root-element", Root);
customElements.define("register-component", Register);
customElements.define("login-component", Login);

export default Root;