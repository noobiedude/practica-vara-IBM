const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    //grab the jwt cookie
    const token = req.cookies.jwt;

    //validare token
    if(token) {
        jwt.verify(token, 'secret key that sould not be published', (err, decodedToken) => {
            //daca intalnim o eroare, redirectionam user-ul spre login
            if(err) {
                res.redirect('/login');
            }
            else {
                next();
            }
        });
    }
    else {
        res.redirect('/login');
    }

};

//check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    //validare token
    if(token) {
        jwt.verify(token, 'secret key that sould not be published', async (err, decodedToken) => {
            //daca intalnim o eroare, redirectionam user-ul spre login
            if(err) {
                res.locals.user = null;
                next();
            }
            else {
                let user = await User.findById(decodedToken.id).exclude("password");
                // console.log(user);
                res.locals.user = user;
                next();
            }
        });
    }
    else {
        res.locals.user = null;
        next();
    }
};

module.exports = {requireAuth, checkUser};