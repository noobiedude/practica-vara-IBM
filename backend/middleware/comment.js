const CommentModel = require("../models/CommentModel");
const UserModel = require("../models/UserModel");

const hasPermissionToComment = (req, res, next) => {
    const userId = req.cookies.userId;
    const postId = req.params.id;
    const commentId = req.params.commentId;
    UserModel.findById(userId, (err, user) => {
        CommentModel.findById(commentId, (err, comment) => {
            if (err){
                res.status(err.status).json(err);
            }
            else{
                if ((comment.postId === postId && comment.createdBy === userId) || user.type === `Admin`){
                    next();
                }
                else{
                    res.send(`You can only edit your own comment!`);
                }
            }
        })
    })
}

module.exports = { hasPermissionToComment };