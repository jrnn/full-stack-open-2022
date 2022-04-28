import { Link, Outlet } from "react-router-dom"

const App = () => {
  return (
    <>
      <h1>Library</h1>
      <div>
        <Link to="/authors">
          <button type="button">Authors</button>
        </Link>
        <Link to="/books">
          <button type="button">Books</button>
        </Link>
        <Link to="/addbook">
          <button type="button">Add book</button>
        </Link>
      </div>
      <Outlet />
    </>
  )
}

export default App
