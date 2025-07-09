const User  = require('../models/userModel');
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.registerUser = async (req, res) => {
  // console.log("registerUser started");
  try {
    const user = await User.findOne({username: req.body.username});
    if (user) {
      return res.status(409).send({message: 'An account with this username already exists'});
    }
    // console.log("User check completed");
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();

    const getNewUser = await User.findOne({username: req.body.username});
    const token = jwt.sign({user:{_id: getNewUser._id, username: getNewUser.username, email: getNewUser.email}}, process.env.JWT_PRIVATE_KEY, {expiresIn: '7d'});
    res.status(201).send({message: 'Account created successfully'}, token);
  } catch (error) {
    console.log(error);
    return res.status(500).send({message: 'Internal Server Error'});
  }
}

exports.loginUser = async (req, res) => {
  // console.log("loginUser started");
  try {
    // Check for user
    const user = await User.findOne({username: req.body.username});
    const token = jwt.sign({user:{_id: user._id, username: user.username, email: user.email}}, process.env.JWT_PRIVATE_KEY, {expiresIn: '7d'});
    if (!user) {
      return res.status(404).send({message: 'Account does not exist'});
    } else {
      // If exists, check auth
      if (user.password === req.body.password) {
        return res.status(200).send({message: 'Login successful', token});
      } else {
        return res.status(401).send({message: 'Wrong password'});
      }
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).send({message: 'Internal Server Error'});
  }
}

exports.verifyToken = async (req, res) => {
  // console.log("verifyToken started");
  const token = req.body.token;
  try {

    const verifiedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    // console.log(verifiedToken);
    return res.status(200).send({message: 'Token verified', valid: true, token: verifiedToken});
  } catch (error) {
    return res.status(401).send({message: 'Invalid token', valid: false, error: error});
  }
}