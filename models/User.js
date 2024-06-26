const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    unique: this.email != "" ? true : false,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "user",
  },
  status: {
    type: String,
    default: "active",
  },
  remember_token: {
    type: String,
  },
  courses: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", UserSchema);