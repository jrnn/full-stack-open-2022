import { lazy } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import App from "./App"
import GraphQLProvider from "./graphql"
import { lazyLoading } from "./util/LazyLoading"

const Authors = lazyLoading(lazy(() => import("./components/Authors")))
const Books = lazyLoading(lazy(() => import("./components/Books")))
const AddBookForm = lazyLoading(lazy(() => import("./components/AddBookForm")))
const LoginForm = lazyLoading(lazy(() => import("./components/LoginForm")))

const root = createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <BrowserRouter>
    <GraphQLProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="authors" element={<Authors />} />
          <Route path="books" element={<Books />} />
          <Route path="addbook" element={<AddBookForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route index element={<Navigate to="/authors" />} />
        </Route>
      </Routes>
    </GraphQLProvider>
  </BrowserRouter>
)
