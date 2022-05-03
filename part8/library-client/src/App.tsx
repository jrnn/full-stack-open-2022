import { useApolloClient } from "@apollo/client"
import { useEffect } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import Notification from "./components/Notification"
import { useBookAdded } from "./graphql"
import { useStore } from "./store"

const App = () => {
  const apolloClient = useApolloClient()
  const navigate = useNavigate()
  const token = useStore(store => store.token)
  const checkLocalToken = useStore(store => store.checkLocalToken)
  const clearToken = useStore(store => store.clearToken)
  const notifySuccess = useStore(store => store.notifySuccess)

  useBookAdded()

  const logout = () => {
    clearToken()
    apolloClient.resetStore()
    notifySuccess("You are now logged out. Hope to see you again soon!")
    navigate("/login")
  }

  useEffect(() => {
    checkLocalToken()
  }, [ checkLocalToken ])

  return (
    <>
      <Notification/>
      <h1>Library</h1>
      <div>
        <Link to="/authors">
          <button type="button">Authors</button>
        </Link>
        <Link to="/books">
          <button type="button">Books</button>
        </Link>
        {!!token && <>
          <Link to="/addbook">
            <button type="button">Add book</button>
          </Link>
          <Link to="/recommend">
            <button type="button">Recommend</button>
          </Link>
        </>}
        {!token
          ?
          <Link to="/login">
            <button type="button">Login</button>
          </Link>
          :
          <button onClick={logout} type="button">Logout</button>
        }
      </div>
      <Outlet />
    </>
  )
}

export default App
