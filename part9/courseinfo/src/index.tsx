import { createRoot } from "react-dom/client";
import App from "./App";

const root = document.getElementById("root");
if (!root) {
  throw new Error("No element with id 'root' found!");
}
createRoot(root).render(<App />);
