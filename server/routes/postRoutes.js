const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

router.post('/send', postController.sendPost);
router.get('/getall', postController.getAllPosts);
// router.get('/getusers', postController.getUserPosts);

module.exports = router;