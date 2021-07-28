const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

//handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {type: '', name: '' ,email: '', password: '', description: ''};

  //duplicate key error
  if(err.code === 11000) {
    errors.email = "The email is already used";
  }

  //validation errors
  if(err.message.includes('User validation failed')) {
   Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
   });
  }

  return errors;
};

//Create tokens
const maxAge = 24 * 60 * 60; //one day in seconds 
const createToken = (id) => {
  return jwt.sign({ id }, 'secret key that sould not be published', { expiresIn: maxAge });
}

//REGISTER
//TO DO: Hook from the front-end too

const signupGet = (req, res) => {
  res.render(`signup view here`);
}

const signupPost = async (req, res) => {
  const { type, name, email, password, description} = req.body;
  
  try {
    const user = await User.create({type, name, email, password, description});
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 100});
    res.status(201).json({user: user._id});
    //pe partea de front se trimit doar user._id si jwt token in cazul in care nu exista erori
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
    //se trimite un obiect json cu {type, name, email, password, description} care specifica campurile care nu respecta cerintele
  }
}

//Login

const loginGet = (req, res) => {
  res.render(`login view here`);
}

const loginPost = async (req, res) => {
  const { email, password} = req.body;
  res.send(`login`);
}

//Logout
const logoutGet = (req, res) => {
  res.render(`logout view here`);
}

module.exports = { signupGet, signupPost, loginGet, loginPost, logoutGet};