const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

//handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {type: '', name: '' ,email: '', password: '', description: ''};

  //incorrect email
  if(err.message === 'Incorrect email') {
    errors.email = "The email doesn't exist";
  }

  //incorrect password
  if(err.message === 'Incorrect password') {
    errors.password = "The password is incorrect";
  }

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
};

const signupPost = async (req, res) => {
  const { type, name, email, password, description} = req.body;
  
  try {
    const user = await User.create({type, name, email, password, description});
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 100}); //maxAge is in milliseconds
    res.cookie('userId', user._id, {httpOnly: true, maxAge: maxAge * 100});
    res.status(201).json({user: user._id});
    //pe partea de front se trimit doar user._id si jwt token in cazul in care nu exista erori
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(err.status).json({ errors });
    //se trimite un obiect json cu {type, name, email, password, description} care specifica campurile care nu respecta cerintele
  }
};

//Login

const loginGet = (req, res) => {
  res.render(`login view here`);
};

const loginPost = async (req, res) => {
  const { email, password} = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 100});
    res.cookie('userId', user._id, {httpOnly: true, maxAge: maxAge * 100});
    res.status(200).json({ user: user._id });
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(err.status).json({ errors });
  }
};

//Logout
const logoutGet = (req, res) => {
  res.cookie('jwt', '', {maxAge: 1});
  res.cookie('userId', '', {maxAge: 1});
  //redirect to homepage
  // res.redirect('/');
  res.send("You logged out!");
};

module.exports = { signupGet, signupPost, loginGet, loginPost, logoutGet};