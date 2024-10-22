const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },

  feed_id: { type: Schema.Types.ObjectId, ref: 'users' },

  caption: {
    type: String,
    required: true,
  },
  post_pic: {
    type: String,
  },
  post_pic: {
    type: String,
  },
  longitude: {
    type: String,
  },
  latitude: {
    type: String,
  },
  status: {
    type: String,
    default: 'Member',
  },
  likes: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'users' },
    },
  ],
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'users' },
      post: { type: Schema.Types.ObjectId, ref: 'posts' },
      comment: { type: String },
      created: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Post = mongoose.model('posts', PostSchema)
