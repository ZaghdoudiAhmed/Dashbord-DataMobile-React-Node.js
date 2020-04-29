const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
// Load input validation
const UserConst = require("../../const/user");
const validateRegisterInput = require("../../validation/Register");
// Load User model
const User = require("../../models/User");

// @route POST /users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.send({
      success: false,
      message: errors,
    });
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.send({
        success: false,
        message: "Email already exists",
      });
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        roles: UserConst.ROLE_USER,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
