const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'fgtrgwrgtetrwg5wtgwtg';
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
mongoose.connect('mongodb+srv://blog:blogblog@blog.bvvxh.mongodb.net/?retryWrites=true&w=majority&appName=Blog');
const salt = bcrypt.genSaltSync(10);
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
        res.cookie('token',token).json('ok');
    }) 

})


    //mongodb+srv://blog:blogblog@blog.bvvxh.mongodb.net/?retryWrites=true&w=majority&appName=Blog
app.listen(4000);