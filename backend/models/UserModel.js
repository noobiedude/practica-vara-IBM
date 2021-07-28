const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    type: { 
        type: String,
        enum: ["Company", "Student", "Admin"],
        required: [true, 'Please tell us if you are a Student or a Company']
    },

    name: { 
        type: String,
        // in cazul in care utilizatorul introduce din greseala spatii la inceput/final aplicam trim
        trim: true,
        minlength: [10, 'The minumum length is 10'],
        maxlength: [100, 'The maximum length is 100'],
        required: [true, 'Please enter your name']
    },

    email: { 
        type: String,
        // in cazul in care utilizatorul introduce din greseala spatii la inceput/final aplicam trim
        trim: true,
        unique: true,
        validate: [isEmail, 'Invalid email'],
        minlength: [20, 'The minumum length is 20'],
        maxlength: [50, 'The maximum length is 50'],
        required: [true, 'Please enter your email']
    },

    //in baza de date nu vom salva parola implicita, ci varianta hashed
    password: { 
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'The minumum length is 6']
    },

    description: { 
        type: String,
        minlength: [10, 'The minumum length is 10'],
        maxlength: [1000, 'The maximum length is 1000'],
        required: true
    },

});

// mongoose hooks
// fire a function before the data is saved in the DB
UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const UserModel =  mongoose.model(`User`, UserSchema, 'User');

module.exports = UserModel;
