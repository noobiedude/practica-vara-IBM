const express = require('express');
const router = express.Router();
const { getPosts, getPost, addPost, editPost, deletePost, getComments, addComment, editComment, deleteComment } = require('../controllers/post');
const { requireAuth } = require('../middleware/auth');
const { hasPermissionToPost } = require('../middleware/post');
const { hasPermissionToComment } = require('../middleware/comment');

router.post(`/`, getPosts);
router.get(`/:id`, getPost);
router.post(`/addPost`, requireAuth, addPost);
router.put(`/:id`, requireAuth, hasPermissionToPost, editPost);
router.delete(`/:id`, requireAuth, hasPermissionToPost, deletePost);
router.get(`/:id/comments/`, getComments);
router.post(`/:id/comments/`, requireAuth, addComment);
router.put(`/:id/comments/:commentId`, requireAuth, hasPermissionToComment, editComment);
router.delete(`/:id/comments/:commentId`, requireAuth, hasPermissionToComment, deleteComment);

module.exports = router;
