const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
const secret = 'fgtrgwrgtetrwg5wtgwtg';
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname + '/uploads'));
mongoose.connect('mongodb+srv://blog:blogblog@blog.bvvxh.mongodb.net/?retryWrites=true&w=majority&appName=Blog');
const salt = bcrypt.genSaltSync(10);
const upload = multer({dest:'uploads/'});

app.post('/register',async (req,res)=>{
    const{username,password} = req.body;
    try{
        const userDoc = await User.create({username,
        password:bcrypt.hashSync(password,salt)});
        res.json({username,password});
    }
    catch(err){
        
        res.status(400).json(err);
    }
});
app.post('/login', async (req,res)=>{
    const{username,password} = req.body;
    const userDoc = await User.findOne({userName:username});
    if(!userDoc){
        res.status(400).json({message:"User not found"});
    }
    if(!bcrypt.compareSync(password,userDoc.password)){
        res.status(400).json({message:"Wrong password"});
    }
    const token = jwt.sign({username,id:userDoc._id},secret,{},(err,token)=>{
        if (err) throw err;
        res.cookie('token',token).json({username,id:userDoc._id});
    }) 
})
app.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token,secret,{},(err,info)=>{
        if(err){
            res.status(400).json(err);
        }
        res.json(info);
    })
})
app.post('/logout',(req,res)=>{
    res.clearCookie('token').json('ok');
})

app.post('/posts',upload.single('files'),async (req,res)=>{
    const{originalname,path} = req.file;
    const parts = originalname.split('.');
    const extension = parts[parts.length-1];
    const newPath = path+'.'+extension
    fs.renameSync(path,newPath);
    const {token} = req.cookies;
    jwt.verify(token,secret,{},async (err,info)=>{
        if(err){
            res.status(400).json(err);
        }
        const{title,summary,content} = req.body;
        postDoc = await Post.create({title,summary,content,file:newPath,author:info.id});
        res.json(postDoc);
    })
    
})
app.get('/posts',async (req,res)=>{
    const posts = await Post.find().populate('author',['userName']).sort({createdAt:-1}).limit(20);
    res.json(posts);
})

app.get('/posts/:id',async (req,res)=>{
    const post = await Post.findById(req.params.id).populate('author',['userName']);
    res.json(post);
})
app.put('/posts',upload.single('files'),async (req,res)=>{
    let newPath = '';
    if(req.file){
        const{originalname,path} = req.file;
        const parts = originalname.split('.');
        const extension = parts[parts.length-1];
        newPath = path+'.'+extension
        fs.renameSync(path,newPath);
    }
    const {token} = req.cookies;
    jwt.verify(token,secret,{},async (err,info)=>{
        if(err){
            res.status(400).json(err);
        }
        const{title,summary,content,id} = req.body;
        const postDoc = await Post.findById(id);
        if(postDoc.author.toString() !== info.id){
            res.status(400).json({message:'Not authorized'});
        }
        await postDoc.updateOne({title,
            summary,
            content,
            file:newPath? newPath:postDoc.file
        });
        
        res.json(postDoc);
    })
})


    
app.listen(4000);