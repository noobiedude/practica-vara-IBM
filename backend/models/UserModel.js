const mongoose = require('mongoose');
import { isEmail } from 'validator';
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    type: { 
        type: String,
        enum: ["Guest, Company, Student, Admin"],
        default: "Guest",
        required: true
    },

    email: { 
        type: String,
        // in cazul in care utilizatorul introduce din greseala spatii la inceput/final aplicam trim
        trim: true,
        unique: true,
        validate: [isEmail, 'Invalid email'],
        minlength: 20,
        maxlength: 50,
        required: true
    },

    //in baza de date nu vom salva parola implicita, ci varianta hashed
    hashedPassword: { 
        type: String,
        required: true
    },

    salt: String,

    name: { 
        type: String,
        // in cazul in care utilizatorul introduce din greseala spatii la inceput/final aplicam trim
        trim: true,
        minlength: 10,
        maxlength: 100,
        required: true
    },

    description: { 
        type: String,
        minlength: 10,
        maxlength: 1000,
        required: true
    },

});

//PENTRU AUTENTIFICARE SETEAZA/VERIFICA PAROLA

//atribuim fiecarui user un salt si un hashedPassword
UserSchema.methods.setPassword = function(password) { 
     
    // Salt unic pentru fiecare user
       this.salt = crypto.randomBytes(16).toString('hex'); 
     
       // "Hash-uim" salt-ul si parola cu 100 de iteratii 
        
       this.hashedPassword = crypto.pbkdf2Sync(password, this.salt,  
       100, 64, `sha512`).toString(`hex`); 
   };

// metoda de validare a parolei, practic comparam hash-ul parolei introduse cu hash-ul din DB
UserSchema.methods.validPassword = function(password) { 
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`); 
    //daca hash-urile sunt identice returnam true
    return this.hash === hash; 
}; 

const UserModel =  mongoose.model(`User`, UserSchema, 'User');

module.exports = UserModel;