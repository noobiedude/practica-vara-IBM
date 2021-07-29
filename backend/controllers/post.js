const mongoose = require('mongoose');
const PostModel = require('../models/PostModel');
const CommentModel = require('../models/CommentModel');
const UserModel = require('../models/UserModel');

const PAGE_SIZE = 3;
const COMMENTS_NUM_PER_PAGE = 3;

const getPosts = (req, res) => {
    let lastPostId = req.body.lastPostId || null;
    let cursor;
    if (lastPostId === null)
    {
        cursor = PostModel.find({}).limit(PAGE_SIZE).lean().populate({path: 'createdBy', select: '-password'})
    }
    else{
        cursor = cursor = PostModel.find({'_id': {'$gt': lastPostId}}).limit(PAGE_SIZE).lean().populate({path: 'createdBy', select: '-password'})
    }
    cursor.exec((err, posts) => {
        if (!err){
            if (posts.length !== 0){
                lastPostId = posts[posts.length - 1]._id;
                res.json({posts, lastPostId});
            }
            else{
                res.json({posts, 'lastPostId': undefined});
            }
        }
        else{
            res.status(err.status).json({'err': err});
        }
    })    
}

const getPost = (req, res) => {
    const { id } = req.params;
    PostModel.findById(id).lean().populate({path: 'createdBy', select: '-password'}).exec((err, post) => {
        const lastCommentId = req.body.lastCommentId || null;
        let cursor;
        if (lastCommentId === null)
        {
            cursor = CommentModel.find({postId: post._id}).limit(COMMENTS_NUM_PER_PAGE).lean().populate({path: 'createdBy', select: '-password'});
        }
        else
        {
                cursor = CommentModel.find({postId: post._id, '_id': {'$gt': lastCommentId} }).limit(COMMENTS_NUM_PER_PAGE).lean().populate({path: 'createdBy', select: '-password'});
        }
        cursor.exec((err, comments) => {
            post = {...post, comments};
            if (!err){
                if (comments.length !== 0)
                    res.json({post, lastCommentId: comments[comments.length - 1]._id});
                else{
                    res.json({post, lastCommentId: undefined});
                }
            }
            else{
                res.json(err.status).json({err});
            }
        })
        })
}

module.exports = {getPosts, getPost};