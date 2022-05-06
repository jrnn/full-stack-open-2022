import { createRoot } from "react-dom/client";
import App from "./App";
import { StateProvider } from "./state";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StateProvider>
    <App />
  </StateProvider>
);
