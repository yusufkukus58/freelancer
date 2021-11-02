const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const PostSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User',
    },
  });

  const Post = mongoose.model('Post', PostSchema);

  module.exports = Post;