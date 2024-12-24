import { Link } from "react-router-dom"
export default function Header() {
    return(
      <header>
    <Link className="logo" to="/">MyBlog</Link>
    <nav>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  </header>
    )
}