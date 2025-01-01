import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
export default function EditPost() {
    const {id} = useParams()
    const [title,setTitle] = useState("");
    const [summary,setSummary] = useState("");
    const [content,setContent] = useState("");
    const [files,setFiles] = useState("");
    const navigate = useNavigate();
    useEffect( ()=>{
        fetch(`http://localhost:4000/posts/${id}`)
        .then(response=>response.json())
        .then(data=>{
            setTitle(data.title);
            setSummary(data.summary);
            setContent(data.content);
        }
        )
    },[])
    const editPost = async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("title",title);
        formData.append("summary",summary);
        formData.append("content",content);
        formData.append("id",id);
        if(files)
        {
            formData.append("files",files[0]);
        }
        const response = await fetch('http://localhost:4000/posts',{
            method:"PUT",
            body:formData,
            credentials:'include',
        })
        if (response.ok){
            navigate(`/post/${id}`);
        }
    }

    return (
        <form onSubmit={editPost}>
            <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
            <input type="text" placeholder="summary" value={summary} onChange={e=>setSummary(e.target.value)} />
            <input type="file" onChange={e=>setFiles(e.target.files)}/>
            <ReactQuill value={content} onChange={newValue=>setContent(newValue)} />
            <button style={{marginTop:'5px'}}>Update post</button>
            
        </form>
    );
    
}