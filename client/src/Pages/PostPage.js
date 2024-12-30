import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import formatISO9075 from 'date-fns/formatISO9075';

export default function PostPage() {
    const {id} = useParams()
    const [postInfo, setPostInfo] = useState(null)
    useEffect(()=>{
        fetch(`http://localhost:4000/posts/${id}`)
        .then(response=>response.json()
        .then(data=>setPostInfo(data)))

    },[])
    if (!postInfo) {
        return <div>Loading...</div>
    }
    return (
        <div className='post-page'>
            <h1>{postInfo?.title}</h1>
            <time>{formatISO9075(postInfo?.createdAt)}</time>
            <div className='author'>By @{postInfo?.author.userName}</div>
            <div className="image">
                <img src={`http://localhost:4000/${postInfo.file}`} alt=""/>
            </div>
            <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}} />
        </div>
        
       
    )

}