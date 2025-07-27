const mongoose = require('mongoose');
const user = require('./userModel');

const postSchema = new mongoose.Schema ({
  author: {type: String, required: true, ref: user},
  content: {type: String, required: true},
  timestamp: {type: Date, default: Date.now},
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;