const PostModel = require("../models/PostModel");

const POSTS_PER_PAGE = 10;

const getPostsCreatedBy = (req, res) => {
    const { id } = req.params;
    const lastPostId = req.body.lastPostId || null;
        let cursor;
        if (lastPostId === null)
        {
            cursor = PostModel.find({createdBy: id}).sort({_id: -1}).limit(POSTS_PER_PAGE).lean().populate({path: 'createdBy', select: '-password'});
        }
        else
        {
                cursor = PostModel.find({createdBy: id, '_id': {'$lt': lastPostId} }).sort({_id: -1}).limit(POSTS_PER_PAGE).lean().populate({path: 'createdBy', select: '-password'});
        }
        cursor.exec((err, posts) => {
            if (!err){
                if (posts.length !== 0)
                    res.json({posts: posts, lastPostId: posts[posts.length - 1]._id});
                else{
                    res.json({lastPostId: null});
                }
            }
            else{
                res.json(err.status).json({err});
            }
        })

};

module.exports = { getPostsCreatedBy };