import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(()=>{
    fetch('http://localhost:4000/profile',
    {credentials:'include'}).then(res=>res.json().then(userInfo=>{
      setUserInfo(userInfo);
    }))
  },[])
  const logout = ()=>{
    fetch('http://localhost:4000/logout',
    {credentials:'include',
      method:'POST',
    }).then(()=>setUserInfo(null));
  }
  const username = userInfo?.username;
  
    return(
    <header>
      <Link className="logo" to="/">MyBlog</Link>
      <nav>
        {username && <>
          <span>{username}</span>
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