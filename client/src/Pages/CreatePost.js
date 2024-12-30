import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function CreatePost() {
    const [title,setTitle] = useState("");
    const [summary,setSummary] = useState("");
    const [content,setContent] = useState("");
    const [files,setFiles] = useState("");
    const navigate = useNavigate();
    const createPost = async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("title",title);
        formData.append("summary",summary);
        formData.append("content",content);
        formData.append("files",files[0]);
        const response = await fetch("http://localhost:4000/posts",{
            method:"POST",
            body:formData,
            credentials:'include',
        })
        if(response.ok){
            //navigate to home page
            navigate("/");
        }

        
    }

    return (
        <form onSubmit={createPost}>
            <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
            <input type="text" placeholder="summary" value={summary} onChange={e=>setSummary(e.target.value)} />
            <input type="file" onChange={e=>setFiles(e.target.files)}/>
            <ReactQuill value={content} onChange={newValue=>setContent(newValue)} />
            <button style={{marginTop:'5px'}}>Create post</button>
            
        </form>
    );
}