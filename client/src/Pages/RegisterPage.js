import React, { useState } from "react"
export default function RegisterPage () {
    const [username,setUserName] = useState("")
    const[password,setPassword] = useState("")
    const register = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:4000/register",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username,password})
        })
        if(response.status === 200){
            alert("Register Success")
        }
        else{
            alert("Register Failed")
        }
      
    }
    return(
    <form className="register" onSubmit={register}>
        <h1>Register</h1>
        <input type="text" placeholder="username" value={username} onChange={e=>setUserName(e.target.value)}/>
        <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        <button type="submit">Register</button>
    </form>
    )
    
}