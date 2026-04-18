import { createRoot } from "react-dom/client";
import "./index.css";
import Root from "./Root.jsx";
import { useAuthStore } from "./stores/authStore.js";

void useAuthStore.getState().checkAuth();

createRoot(document.getElementById("root")).render(<Root />);
