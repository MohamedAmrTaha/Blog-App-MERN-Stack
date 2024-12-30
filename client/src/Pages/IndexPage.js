import Post from "../Post";
import {useEffect, useState} from 'react';

export default function IndexPage(){
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:4000/posts")
        .then(res=>res.json())
        .then(data=>{
            setPosts(data);})
    },[]);
    return(
        <div>
            {posts.length > 0 && posts.map(post => (
                <Post key={post._id} post={post} />
            ))}
        </div>
    )
}