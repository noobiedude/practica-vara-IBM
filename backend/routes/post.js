const express = require('express');
const router = express.Router();
const { getPosts, getPost, addPost, editPost, deletePost } = require('../controllers/post');
const { requireAuth } = require('../middleware/auth');
const { hasPermission } = require('../middleware/post');

router.get(`/`, getPosts);
router.get(`/:id`, getPost);
router.post(`/`, requireAuth, addPost);
router.put(`/:id`, requireAuth, hasPermission, editPost);
router.delete(`/:id`, requireAuth, hasPermission, deletePost);
module.exports = router;
