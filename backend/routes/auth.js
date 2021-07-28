const express = require('express'); 
const authController = require('../controllers/auth');
const User = require('../models/UserModel');
const router = express.Router(); 

//REGISTER
router.get(`/signup`, authController.signupGet);
router.post(`/signup`, authController.signupPost);

//Login
router.get(`/login`, authController.loginGet);
router.post(`/login`, authController.loginPost);

//LOGOUT
router.get(`/logout`, authController.logoutGet);

module.exports = router;