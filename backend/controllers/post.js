const mongoose = require('mongoose');
const PostModel = require('../models/PostModel');
const CommentModel = require('../models/CommentModel');
const UserModel = require('../models/UserModel');

const PAGE_SIZE = 10;
const COMMENTS_NUM_PER_PAGE = 10;
const QUERY_CONSTANTS_ABREVIATIONS = {
    pl: `programmingLanguage`,
    wh: `workHours`,
    l: `location`,
    type: `type`
}

const getPosts = (req, res) => {
    let lastPostId = req.body.lastPostId || null;
    let cursor;

    const queryFromUrl = req.query;
    let mongooseQuery = {};
    for (let [key, value] of Object.entries(queryFromUrl)){
        mongooseQuery = {...mongooseQuery, [QUERY_CONSTANTS_ABREVIATIONS[key]] : value}
    }

    if (lastPostId === null)
    {
        cursor = PostModel.find({...mongooseQuery}).sort({_id: -1}).limit(PAGE_SIZE).lean().populate({path: 'createdBy', select: '-password'})
    }
    else{
        cursor = cursor = PostModel.find({...mongooseQuery, '_id': {'$lt': lastPostId}}).sort({_id: -1}).limit(PAGE_SIZE).lean().populate({path: 'createdBy', select: '-password'})
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
        if (!err){
            res.json({post});
        }
        else{
            res.status(err.status).json({err});
        }
        });
}

const addPost = (req, res) => {
    /*
    req.body contains the post details
    
        |
        |
        V


        req.body = {
                title,
                description,
                workHours,
                location,
                programmingLanguage
        }
    */
    UserModel.findById(req.cookies.userId, (err, user) => {
       if (err)
        res.redirect(`/login`);
        else{
            const postType = user.type === `Student` ? `request` : `offer`;
            const newPost = {...req.body, type: postType, createdBy: user._id};
            //validation
            PostModel.create(newPost, (err, newPost) => {
                if (err)
                    res.status(400).json({err});
                else{
                    res.status(201).json(newPost);
                    //res.redirect(`/`);
                }
            })
        }
   });
    
}

const editPost = (req, res) => {
    const postId = res.locals.postId;
    PostModel.findById(postId, (err, post) => {
        if (err)
            res.status(err.status).json({err});
        else{
            Object.assign(post, req.body);
            post.save().then(editedPost => {
                res.status(200).json(editedPost);
            });
        }
    })
};

const deletePost = (req, res) => {
    const postId = res.locals.postId;
    PostModel.deleteOne({'_id': postId}, err => {
        if (err)
            res.status(err.status).json({err});
        else res.send(`deleted!`);
    })
};

const getComments = (req, res) => {
    const { id } = req.params;
    const lastCommentId = req.body.lastCommentId || null;
        let cursor;
        if (lastCommentId === null)
        {
            cursor = CommentModel.find({postId: id}).sort({_id: -1}).limit(COMMENTS_NUM_PER_PAGE).lean().populate({path: 'createdBy', select: '-password'});
        }
        else
        {
                cursor = CommentModel.find({postId: id, '_id': {'$lt': lastCommentId} }).sort({_id: -1}).limit(COMMENTS_NUM_PER_PAGE).lean().populate({path: 'createdBy', select: '-password'});
        }
        cursor.exec((err, comments) => {
            if (!err){
                if (comments.length !== 0)
                    res.json({comments, lastCommentId: comments[comments.length - 1]._id});
                else{
                    res.json({lastCommentId: null});
                }
            }
            else{
                res.json(err.status).json({err});
            }
        })
}

const addComment = (req, res) => {
    const postId = req.params.id;
    const createdBy = req.cookies.userId;
    const { content } = req.body;
    const newComment = {createdBy, postId, content};
    CommentModel.create(newComment, (err, newComment) => {
        if (err){
            res.status(err.status).json({err});
        }
        else{
            res.status(201).json(newComment);
        }
    });
};

const editComment = (req, res) => {
    const commentId = req.params.commentId;
    CommentModel.findById(commentId, (err, comment) => {
        if (err){
            res.status(err.status).json({err});
        }
        else{
            const content = req.body?.content;
            if (content){
                comment.content = content;
                comment.save().then(editedComment => {
                    res.json(editedComment);
                })
            }
            else{
                res.send(`comment cannot be empty`);
            }
        }
        }
    )
};

const deleteComment = (req, res) => {
    const commentId = req.params.commentId;
    CommentModel.deleteOne({'_id': commentId}, err => {
        if (err)
            res.status(err.status).json({err});
        else res.send(`comment deleted!`);
    })
};

module.exports = {getPosts, getPost, addPost, editPost, deletePost, getComments, addComment, editComment, deleteComment};