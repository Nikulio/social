const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    isRequired: true
  },
  login: {
    type: String,
    isRequired: true
  },
  friends: {
    type: Array,
  },
  requests: {
    type: Array
  },
  posts: {
    type: Array,
  },
  email: {
    type: String,
    isRequired: true
  },
  password: {
    type: String,
    isRequired: true
  },
});

module.exports = mongoose.model("UserSchema", UserSchema, "users");