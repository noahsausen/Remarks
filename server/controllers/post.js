const Post = require('../models/postModel');
const User = require("../models/userModel");
require('dotenv').config();

exports.sendPost = async (req, res) => {
  // console.log("sendPost started");
  try {
    //console.log(req.body);
    const newPost = new Post({
      author: req.body.author,
      content: req.body.content,
      timestamp: Date.now(),
    });
    const user = await User.findOne({username: newPost.author});
    if (!user) {
      return res.status(401).send({message: 'Account not found'});
    }
    await newPost.save();
    res.status(200).send({message: "Post created successfully"});
  } catch (error) {
    return res.status(500).send({message: 'Internal Server Error'});
  }
  // console.log("sendPost finished");
}

exports.getAllPosts = async (req, res) => {
  // console.log("getAllPosts started");
  try {
    const posts = await Post.find();
    res.status(200).send({message: 'Got all posts successfully', posts: posts});
  } catch (error) {
    return res.status(500).send({message: 'Internal Server Error'});
  }
}

exports.getUserPosts = async (req, res) => {
  console.log("getUserPosts started");
  try {
    console.log(req);
    const posts = await Post.find({author: req.body.author});
    console.log(posts);
    res.status(200).send({message: 'Got user posts successfully', posts: posts});
  } catch (error) {
    console.log(error);
    return res.status(500).send({message: 'Internal Server Error'});
  }
}