const User = require('../models/UserModel');
const Post = require('../models/PostModel');
const { getFile, uploadFile } = require('./ibmCos');

//obiectul users e un tablou de users de la care primesti _id, type, email, name, description
/*
    {
    "users": [
        {
            "_id": "60fc3b3219eb7add381ea44b",
            "type": "company",
            "email": "ibm@ibm.com",
            "name": "IBM",
            "description": "We are a company that blablablablabla"
        },
        {
            "_id": "60feb56135492f93f3aeac31",
            "type": "student",
            "email": "student@e-uvt.ro",
            "name": "Ion Popescu",
            "description": "hello i am a student"
        }
    }
*/

const getUsers = async (req, res) => {    

    const query = req.query;
    
    if(query.name || query.type) {
        if(query.name) {
            await User.find({"name": { "$regex": `${query.name}`, "$options": "i"}} , (err, users) => {
            if(err) {
                return res.status(err.status).json({ error: err });
            }
            res.status(201).json({ users });
        }).select("type name email description");
        }
        else if(query.type) {
            await User.find({"type": { "$regex": `${query.type}`, "$options": "i"}} , (err, users) => {
            if(err) {
                return res.status(err.status).json({ error: err });
            }
            res.status(201).json({ users });
        }).select("type name email description");
        }
        else {
            await User.find({"type": { "$regex": `${query.type}`, "$options": "i"},
                             "name": { "$regex": `${query.name}`, "$options": "i"}} , (err, users) => {
                if(err) {
                    return res.status(err.status).json({ error: err });
                }
                res.status(201).json({ users });
            }).select("type name email description");
        }
    }
    else {
        await User.find((err, users) => {
            if(err) {
                return res.status(err.status).json({ error: err });
            }
            res.status(201).json({ users });
        }).select("type name email description");
    }

};


const getUser = async (req, res) => {
    const { id } = req.params;

    await User.findById(id, function (err, user) {
        if (err) return res.status(err.status).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).json(user);
       }).select('-password');
};

const updateUser = (req, res) => {
     User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}, (err, user) => {
        if(err) return res.status(err.status).send("There was a problem updating the profile.");
        res.status(200).json({user});
    });
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
     const user = await User.findByIdAndDelete(id);
     await Post.deleteMany({ createdBy: user.id });
     await Comment.deleteMany({ createdBy: user.id });
     
     if (!user) return res.status(404).json({error: "User not found"});
     return res.send(user);
    } 
    catch (e) {
     return res.status(400).json({error: e.message});
    }
};

const getProfilePicture = (req, res) => {
    console.log(`Getting the picture!`);
    getFile(req.params.id).on(`error`, () => getFile(`default`).pipe(res)).pipe(res);
}

const addProfilePicture = (req, res) => {
    uploadFile(req.cookies.id, req.body.profilePicture).then(res.send(`uploaded!`));
}

module.exports = { getUsers, getUser, updateUser, deleteUser, getProfilePicture, addProfilePicture };
