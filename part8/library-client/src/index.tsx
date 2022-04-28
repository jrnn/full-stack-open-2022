import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import GraphQLProvider from "./graphql"

const root = createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <BrowserRouter>
    <GraphQLProvider>
      <App />
    </GraphQLProvider>
  </BrowserRouter>
)
