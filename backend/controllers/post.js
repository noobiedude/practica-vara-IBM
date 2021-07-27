const mongoose = require('mongoose');
const PostModel = require('../models/PostModel');
const CommentModel = require('../models/CommentModel');
const UserModel = require('../models/UserModel');

const getPosts = (req, res) => {
    PostModel.find({}).lean().populate({path: 'createdBy', select: '-password'}).exec((err, posts) => {
        res.json(posts);
    })

}

// const getPost = (req, res) => {
//     const { id } = req.params;
//     PostModel.findById(id).lean().exec((err, post) => {
//         if (!err){
//             CommentModel.find({postId: post._id}, (err, comments) => {
//                 if (!err){
//                     UserModel.findById(post.createdBy).lean().exec((err, user) => {
//                         if (!err){
//                             post = {...post, comments, user};
//                             return res.json(post);
//                         }
//                         else{
//                             res.status(404).json({err});
//                         }
//                     })
                
                    
                    
//                 }
//                 else{
//                     res.status(404).json({err});
//                 }
//             })
//         }
//         else{
//             res.status(404).json({err});
//         }
//     })
// }

const getPost = (req, res) => {
    const { id } = req.params;
         PostModel.findById(id).lean().populate({path: 'createdBy', select: '-password'}).exec((err, post) => {
             console.log(post);
            CommentModel.find({postId: post._id}).populate({path: 'createdBy', select: '-password'}).exec((err, comments) => {
                post = {...post, comments};
                res.json(post);
            })
         })
}
module.exports = {getPosts, getPost};