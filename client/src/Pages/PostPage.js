import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import formatISO9075 from 'date-fns/formatISO9075';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

export default function PostPage() {
    const {id} = useParams()
    const [postInfo, setPostInfo] = useState(null)
    const {userInfo} = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(()=>{
        fetch(`http://localhost:4000/posts/${id}`)
        .then(response=> response.json())
        .then(data=>setPostInfo(data))

    },[])
    if (!postInfo) {
        return <div>Loading...</div>
    }
    const deletePost = async ()=>{
       const response =  await fetch(`http://localhost:4000/posts/${id}`,{
            method:'DELETE',
            credentials:'include',
        })
        if(response.ok){
            navigate('/')
        }

    }

    

    return (
        <div className='post-page'>
            <h1>{postInfo?.title}</h1>
            <time>{formatISO9075(postInfo?.createdAt)}</time>
            <div className='author'>By @{postInfo?.author.userName}</div>
            {userInfo?.id === postInfo?.author._id && (
                <div className="edit-row">
                    <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    Edit this post
                    </Link>
                    <button className="delete-btn" onClick={deletePost}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Delete this post
                    </button>
              </div>
              
            )}
            <div className="image">
                <img src={`http://localhost:4000/${postInfo.file}`} alt=""/>
            </div>
            <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}} />
        </div>
        
       
    )

}