import './App.css';
import Header from './Header';
import Post from './Post';
import {Routes, Route} from "react-router-dom"
import Layout from './Layout'
import IndexPage from './Pages/IndexPage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import { UserContext } from './UserContext';
import { useState } from 'react';
import CreatePost from './Pages/CreatePost';
import PostPage from './Pages/PostPage';

function App() {
  const [userInfo, setUserInfo] = useState(null);
  return (
    <UserContext.Provider value={{userInfo, setUserInfo}}>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='/create' element={<CreatePost />}/>
          <Route path="/post/:id" element={<PostPage />} />
        </Route>
      </Routes>
    </UserContext.Provider>
   
    
  );
}

export default App;
