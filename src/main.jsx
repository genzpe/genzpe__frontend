import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure styles are imported

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
    <ToastContainer autoClose={3000} />
  </AuthProvider>
);
