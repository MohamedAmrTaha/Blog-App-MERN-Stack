import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";
export default function LoginPage () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {setUserInfo} = useContext(UserContext);
    const navigate = useNavigate();
    const login = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:4000/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username,password}),
            credentials:'include',
        });
        if(response.ok){
            response.json().then(userInfo=>{
                setUserInfo(userInfo);
                //navigate to home page
                navigate("/");
            })
            
        }
        else{
            alert("Login failed");
        }
    }
    return(
    <form className="login" onSubmit={login}>
        <h1>Login</h1>
        <input type="text" placeholder="username" value={username} onChange={e=>setUsername(e.target.value)}/>
        <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        <button type="submit">Login</button>
    </form>
    )
   
}