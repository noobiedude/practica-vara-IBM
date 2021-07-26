const mongoose = require('mongoose');
const PostModel = require('../models/PostModel');
const CommentModel = require('../models/CommentModel');

const getPosts = (req, res) => {
    PostModel.find({}, (err, posts) => {
        if (!err){
            return res.json(posts);
        }
        else{
            res.status(404).json({err});
        }
    })
}

const getPost = (req, res) => {
    const { id } = req.params;
    PostModel.findById(id).lean().exec((err, post) => {
        if (!err){
            CommentModel.find({postId: post._id}, (err, comments) => {
                if (!err){
                    console.log(post);
                    post = {...post, comments};
                    return res.json(post);
                }
                else{
                    res.status(404).json({err});
                }
            })
        }
        else{
            res.status(404).json({err});
        }
    })
}

module.exports = {getPosts, getPost};