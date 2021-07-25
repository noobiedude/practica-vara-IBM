const mongoose = require('mongoose');
const PostModel = require('../models/PostModel');

const getPosts = (req, res) => {
    PostModel.find({}, (err, posts) => {
        if (!err)
            return res.json(posts);
        else{
            res.status(404).json({err});
        }
    })
}

module.exports = {getPosts};