const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },

  post: { type: Schema.Types.ObjectId, ref: "posts" },

  comment: {
    type: String,
    required: true
  },
  likes: [
    {
      user: { type: Schema.Types.ObjectId, ref: "users" }
    }
  ],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Comment = mongoose.model("comments", CommentSchema);
