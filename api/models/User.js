const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  profile_pic: {
    type: String
  },
  status: {
    type: String,
    default: "Member"
  },
  followers: [
    {
      user: { type: Schema.Types.ObjectId, ref: "users" }
    }
  ],
  following: [
    {
      user: { type: Schema.Types.ObjectId, ref: "users" }
    }
  ],
  joined: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
