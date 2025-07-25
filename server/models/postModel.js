const mongoose = require('mongoose');
const user = require('./userModel');

const postSchema = new mongoose.Schema ({
  author: {type: String, required: true, ref: user},
  content: {type: String, required: true},

});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;