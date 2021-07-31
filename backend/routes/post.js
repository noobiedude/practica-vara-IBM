const express = require('express');
const router = express.Router();
const { getPosts, getPost, addPost } = require('../controllers/post');
const { requireAuth } = require('../middleware/auth');

router.get(`/`, getPosts);
router.get(`/:id`, getPost);
router.post(`/`, requireAuth, addPost);
//TODO
// router.put(`/`, requireAuth, hasPermission, editPost);
// router.delete(`/`, requireAuth, hasPermission, deletePost);
module.exports = router;
