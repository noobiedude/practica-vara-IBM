const express = require('express');
const router = express.Router();
const { getPostsCreatedBy } = require('../controllers/profile.js');

router.get(`/:id/posts`, getPostsCreatedBy);

module.exports = router;