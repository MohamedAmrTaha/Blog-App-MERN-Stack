const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    file:{
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},
{timestamps: true});
const PostModel = mongoose.model('Post', PostSchema);
module.exports = PostModel;


    
