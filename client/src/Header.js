import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
export default function Header() {
  const [username,setUsername] = useState(null);
  useEffect(()=>{
    fetch('http://localhost:4000/profile',
    {credentials:'include'}).then(res=>res.json().then(userInfo=>{
      setUsername(userInfo.username);
    }))
  },[])
  const logout = ()=>{
    fetch('http://localhost:4000/logout',
    {credentials:'include',
      method:'POST',
    }).then(()=>setUsername(null));
  }
    return(
    <header>
      <Link className="logo" to="/">MyBlog</Link>
      <nav>
        {username && <>
          <Link to="/create">Create New Post</Link>
          <a onClick={logout}>Logout</a>
          </>}
        {!username && <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        </>}
    </nav>
  </header>
    )
}