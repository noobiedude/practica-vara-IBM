const UserModel = require("../models/UserModel");

const userPermission = (req, res, next) => {
    const userId = req.cookies.userId;
    // console.log(userId);
    const compId  = req.params.id;
    // console.log(compId);

    UserModel.findById(userId, (err, user) => {
        if (err)
            res.status(err.status).json({error: err});
        else{
            if(userId === compId || user.type === `Admin`) {
                res.locals.userId = userId;
                next();
            }
            else {
                res.status(401).send(`You can modify your own profile!`);
            }
        }
    });   
    
}

module.exports = {userPermission};