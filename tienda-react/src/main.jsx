import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from "./App.jsx";
import { inicializarAdminDemo } from "./data/usuarios.js";


inicializarAdminDemo();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App/>
  </StrictMode>
)