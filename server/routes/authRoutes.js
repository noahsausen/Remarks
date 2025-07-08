const express = require('express');
const router = express.Router();
const authController = require('../controllers/userAuth');

router.post('/signup', authController.registerUser);
router.post('/login', authController.loginUser)

module.exports = router;