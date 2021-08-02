const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");

const hasPermissionToPost = (req, res, next) => {
    const userId = req.cookies.userId;
    const postId = req.params.id;
    UserModel.findById(userId, (err, user) => {
        if (err)
            res.status(err.status).json({err});
        else{
            PostModel.findById(postId, (err, post) => {
                if (err){
                    res.status(err.status).json({err});
                }
                else{
                    if (post.createdBy === userId || user.type === `Admin`)
                    {
                        res.locals.postId = postId;
                        next();
                    }
                        
                    else{
                        res.status(403).send(`You can only edit your own posts!`);
                    }
                }
            });
        }
    })
    
    
}

module.exports = {hasPermissionToPost};