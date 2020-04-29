const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// Create  a schema
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  roles: {
    type: [String],
    required: true,
  },
});

// Create a model + Export it
module.exports = mongoose.model("User", UserSchema);
